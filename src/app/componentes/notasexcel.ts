import { Component, input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { environment } from '../../environments/environment';

// Sustituye o ajusta estas importaciones de logos según la ubicación real de tu archivo
import { logo, logoperu } from './logo';

@Component({
  selector: 'app-export-to-excel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      (click)="exportExcel()" 
      [disabled]="loading()"
      class="btn btn-primary" 
      style="margin-bottom: .1em;"
    >
      {{ loading() ? 'Generando Excel...' : 'Acta en excel [' + year() + ' ' + mencion() + ' ' + ciclo() + ']' }}
    </button>
  `
})
export class ExportToExcelComponent {
  // Inputs requeridos de Angular 21 (Signal Inputs)
  year = input.required<string | number>();
  ciclo = input.required<string | number>();
  mencion = input.required<string>();

  // Inyección del cliente HTTP de Angular
  private http = inject(HttpClient);

  // Estado reactivo para la carga
  loading = signal<boolean>(false);

  // Reemplazar con la URL base de tu entorno o servicio
  private readonly apiUrl = environment.apiURL; 

  async exportExcel(): Promise<void> {
    this.loading.set(true);
    try {
      // 1. OBTENCIÓN DE DATOS
      const url = `${this.apiUrl}/api/users/report/${this.ciclo()}/${this.mencion()}/${this.year()}`;
      const www: any = await firstValueFrom(this.http.get(url));

      // ==========================================
      // 1. PROCESAMIENTO DE DATA (Cursos, Créditos y Docentes)
      // ==========================================
      const cursses = www.ordercurses || [];
      const user = www.order || [];

      const codigo = cursses.map((c: any) => c.codigo);
      const curses = cursses.map((c: any) => c.title);
      const creditos = cursses.map((c: any) => c.credito);
      const creditosuma = creditos.reduce((acc: number, curr: any) => acc + Number(curr), 0);

      const amautas: string[] = [];
      const dnis: string[] = [];
      (www.orderTEACHER || []).forEach((t: any) => {
        if (t.uSSer?.length >= 1 && t.uSSer[0].rol === '2') {
          amautas.push(t.uSSer[0].name.toUpperCase());
          dnis.push(t.uSSer[0].dni);
        }
      });

      // ==========================================
      // 2. ESTRUCTURACIÓN LÓGICA DE NOTAS (O(N × M))
      // ==========================================
      const tipo = ['[L]', '[I]', '[C]', '[E]', '[N]', '[C]', '[I]', '[A]', '', '', '', ''];
      const tipowww = ['[R]', '[E]', '[T]', '[I]', '[R]', '[A]', '[D]', '[O]', '', '', '', ''];
      const notas: any[] = [];

      user.forEach((u: any, k: number) => {
        const calftns: any[] = Array(35).fill("");
        const avggs = u.records || [];
        const recordMap = new Map(avggs.map((rec: any) => [rec.codigo, rec]));

        cursses.forEach((currCurso: any, i: number) => {
          const currentRecord: any = recordMap.get(currCurso.codigo);

          if (currentRecord) {
            const isLicencia = currentRecord.nota === '-0';
            const isRetirado = currentRecord.nota === '0';

            calftns[2 * i] = isLicencia ? tipo[i] : isRetirado ? tipowww[i] : Number(currentRecord.nota);
            calftns[2 * i + 1] = (isLicencia || isRetirado) ? '' : Number(currentRecord.nota * currentRecord.credito);
          } else {
            calftns[2 * i] = tipowww[i];
          }
        });

        const firstRecordNota = avggs[0]?.nota;
        const avgPonderado = creditosuma > 0 ? u.total / creditosuma : 0;
        const isRetiradoParcial = avgPonderado > 0 && avgPonderado <= 5;

        calftns[26] = firstRecordNota === '-0' ? 'L' : u.total === 0 ? 'R' : isRetiradoParcial ? 'RP' : u.total;
        calftns[27] = creditosuma;
        calftns[28] = firstRecordNota === '-0' ? 'L' : u.total === 0 ? 'R' : isRetiradoParcial ? 'RP' : Number(avgPonderado.toFixed(2));

        const dniText = u.usser?.length > 0 ? u.usser[0].dni : "";
        const nameText = u.usser?.length > 0 ? u.usser[0].name : "";

        notas.push([k + 1, dniText, nameText, ...calftns]);
      });

      // Menciones e inicialización de segmentos
      const mencionesMap: Record<string, string> = {
        "ED": "EDUCACIÓN ARTÍSTICA - ARTES PLÁSTICAS",
        "P": "ARTISTA PROFESIONAL - ARTES PLÁSTICAS Y VISUALES (PINTURA)",
        "E": "ARTISTA PROFESIONAL - ARTES PLÁSTICAS Y VISUALES (ESCULTURA)"
      };
      const menccion = mencionesMap[this.mencion()] || "ARTISTA PROFESIONAL - ARTES PLÁSTICAS Y VISUALES (GRABADO)";

      const amautas1 = amautas.slice(0, 6);
      const amautas2 = amautas.slice(6);
      const dnis1 = dnis.slice(0, 6);
      const dnis2 = dnis.slice(6);

      const notas1 = notas.slice(0, 32);
      const notas2 = notas.slice(32);

      // ==========================================
      // 3. CONFIGURACIÓN EXCELJS Y METADATOS
      // ==========================================
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('1', {
        pageSetup: { paperSize: 8 as ExcelJS.PaperSize, orientation: 'landscape' },
        properties: { showGridLines: false }
      });

      worksheet.pageSetup.margins = { left: 0.8, right: 0.35, top: 0.35, bottom: 0.35, header: 0.0, footer: 0.0 };
      worksheet.pageSetup.printArea = 'A1:AJ110';

      // Multimedia
      worksheet.addImage(workbook.addImage({ base64: logo, extension: 'jpeg' }), { tl: { col: 1, row: 0 }, ext: { width: 185, height: 185 } });
      worksheet.addImage(workbook.addImage({ base64: logoperu, extension: 'jpeg' }), { tl: { col: 32.999, row: 0 }, ext: { width: 185, height: 185 }, editAs: 'absolute' });

      // Títulos principales
      worksheet.mergeCells('C4:AG4');
      worksheet.mergeCells('C6:AG6');
      worksheet.getCell('C4').value = 'ESCUELA SUPERIOR DE FORMACIÓN ARTÍSTICA PÚBLICA "FELIPE GUAMÁN POMA DE AYALA" DE AYACUCHO';
      worksheet.getCell('C6').value = 'ACTA CONSOLIDADA DE EVALUACIÓN DEL RENDIMIENTO ACADÉMICO';

      const titleFont: Partial<ExcelJS.Font> = { name: 'arial', family: 4, size: 19, bold: true };
      const centerAlign: Partial<ExcelJS.Alignment> = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell('C4').font = titleFont;
      worksheet.getCell('C6').font = titleFont;
      worksheet.getCell('C4').alignment = centerAlign;
      worksheet.getCell('C6').alignment = centerAlign;

      // ==========================================
      // 4. MAQUETACIÓN DECLARATIVA
      // ==========================================
      const leyendaConfig = [
        { m: 'AE11:AJ11', c: 'AE11', v: 'LEYENDA' },
        { m: 'AE12:AF12', c: 'AF12', v: 'CLTF ', ms: 'AG12:AJ12', cs: 'AG12', vs: 'CALIFICACIÓN' },
        { m: 'AE13:AF13', c: 'AE13', v: 'PTJ ', ms: 'AG13:AJ13', cs: 'AG13', vs: 'PUNTAJE' },
        { m: 'AE14:AF14', c: 'AE14', v: 'L ', ms: 'AG14:AJ14', cs: 'AG14', vs: 'LICENCIA' },
        { m: 'AE15:AF15', c: 'AE15', v: 'R ', ms: 'AG15:AJ15', cs: 'AG15', vs: 'RETIRADO' },
        { m: 'AE16:AF16', c: 'AE16', v: 'RP ', ms: 'AG16:AJ16', cs: 'AG16', vs: 'RETIRADO PARCIAL' },
        { m: 'AE17:AF17', c: 'AE17', v: 'CT ', ms: 'AG17:AJ17', cs: 'AG17', vs: 'CANTIDAD' }
      ];

      leyendaConfig.forEach(item => {
        worksheet.mergeCells(item.m);
        worksheet.getCell(item.c).value = item.v;
        if (item.ms) {
          worksheet.mergeCells(item.ms);
          worksheet.getCell(item.cs).value = item.vs;
        }
      });

      const institucionalConfig = [
        { m1: 'A11:B11', m2: 'A12:B12', c1: 'A11', c2: 'A12', v1: 'Código Modular', v2: '0419978' },
        { c1: 'C11', c2: 'C12', v1: 'D.S./R.D de Creación y R.D. de Revalidación', v2: 'RESOLUCIÓN Nº 0266-2012-ANR-13-03-2012' },
        { m1: 'D11:G11', m2: 'D12:G12', c1: 'D11', c2: 'D12', v1: 'Denominación', v2: 'ESFA Púb' },
        { m1: 'H11:K11', m2: 'H12:K12', c1: 'H11', c2: 'H12', v1: 'Gestión', v2: 'Público' },
        { m1: 'L11:O11', m2: 'L12:O12', c1: 'L11', c2: 'L12', v1: 'Dirección', v2: 'Provincia' },
        { m1: 'P11:AC11', m2: 'P12:S12', c1: 'P11', c2: 'P12', v1: 'Jr. Mariano Melgar Nº 398', v2: 'HUAMANGA' },
        { m1: 'T12:X12', m2: 'Y12:AC12', c1: 'T12', c2: 'Y12', v1: 'Distrito', v2: 'JESÚS NAZARENO' },
        { m1: 'A14:B14', m2: 'A15:B15', c1: 'A14', c2: 'A15', v1: 'Carrera - Especialidad', v2: 'Autorización' },
        { m1: 'C14:G14', m2: 'C15:G15', c1: 'C14', c2: 'C15', v1: menccion, v2: 'R. Nº 0266-2012 - ANR - 13-03-2012' },
        { m1: 'H14:L14', m2: 'H15:L15', c1: 'H14', c2: 'H15', v1: 'Periodo Académico', v2: 'Ciclo Académico' },
        { m1: 'M14:O14', m2: 'M15:O15', c1: 'M14', c2: 'M15', v1: String(this.year()), v2: String(this.ciclo()) },
        { m1: 'A17:B17', c1: 'A17', c2: 'C17', v1: 'Director(a) General', v2: 'TAIPE CARBAJAL, MARCELINO EFRAIN' },
        { m1: 'D17:N17', m2: 'O17:AC17', c1: 'D17', c2: 'O17', v1: 'R.D. de Nombramiento o Encargatura', v2: 'R.D.R.S. N° 00165-202-GRA/GOB-GG-GRDS-DREA-DR' }
      ];

      institucionalConfig.forEach(item => {
        if (item.m1) worksheet.mergeCells(item.m1);
        if (item.m2) worksheet.mergeCells(item.m2);
        worksheet.getCell(item.c1).value = item.v1;
        worksheet.getCell(item.c2).value = item.v2;
      });

      // Cabeceras de bloque superior
      worksheet.mergeCells('D19:AC19');
      worksheet.getCell('D19').value = 'ASIGNAGTURAS/ÁREAS';

      const cabecerasTabla = [
        { m: 'A19:A24', c: 'A19', v: 'NÚMERO DE ORDEN' },
        { m: 'B19:B24', c: 'B19', v: 'DNI' },
        { m: 'C19:C24', c: 'C19', v: 'APELLIDOS Y NOMBRES (Por orden alfabético)' },
        { m: 'AD19:AD24', c: 'AD19', v: 'Puntaje del semestre académico' },
        { m: 'AE19:AE24', c: 'AE19', v: 'Crédito del semestre académico' },
        { m: 'AF19:AF24', c: 'AF19', v: 'Promedio ponderado del semestre académico' },
        { m: 'AG19:AJ24', c: 'AG19', v: 'OBSERVACIONES' }
      ];

      cabecerasTabla.forEach(item => {
        worksheet.mergeCells(item.m);
        worksheet.getCell(item.c).value = item.v;
      });

      worksheet.addRows(notas1);
      const baseFont: Partial<ExcelJS.Font> = { name: 'arial', family: 4, size: 11, bold: true };
      worksheet.getCell('A24').font = baseFont;

      // ==========================================
      // 5. COLUMNAS DINÁMICAS
      // ==========================================
      const columnPairs = [
        { start: 'D', end: 'E' }, { start: 'F', end: 'G' }, { start: 'H', end: 'I' },
        { start: 'J', end: 'K' }, { start: 'L', end: 'M' }, { start: 'N', end: 'O' },
        { start: 'P', end: 'Q' }, { start: 'R', end: 'S' }, { start: 'T', end: 'U' },
        { start: 'V', end: 'W' }, { start: 'X', end: 'Y' }, { start: 'Z', end: 'AA' },
        { start: 'AB', end: 'AC' }
      ];

      columnPairs.forEach((col, index) => {
        const numStr = String(index + 1);
        const cursc = curses[index] || "";
        const credc = creditos[index] || "";

        // Bloque Superior
        worksheet.mergeCells(`${col.start}20:${col.end}20`);
        worksheet.getCell(`${col.start}20`).value = numStr;
        worksheet.mergeCells(`${col.start}21:${col.end}21`);
        worksheet.getCell(`${col.start}21`).value = cursc;
        worksheet.mergeCells(`${col.start}22:${col.end}22`);
        worksheet.getCell(`${col.start}22`).value = 'Créditos';
        worksheet.mergeCells(`${col.start}23:${col.end}23`);
        worksheet.getCell(`${col.start}23`).value = credc;
        worksheet.getCell(`${col.start}24`).value = 'CLF';
        worksheet.getCell(`${col.end}24`).value = 'PTJ';

        // Bloque Inferior
        worksheet.mergeCells(`${col.start}58:${col.end}58`);
        worksheet.getCell(`${col.start}58`).value = numStr;
        worksheet.mergeCells(`${col.start}59:${col.end}59`);
        worksheet.getCell(`${col.start}59`).value = cursc;
        worksheet.mergeCells(`${col.start}60:${col.end}60`);
        worksheet.getCell(`${col.start}60`).value = 'Créditos';
        worksheet.mergeCells(`${col.start}61:${col.end}61`);
        worksheet.getCell(`${col.start}61`).value = credc;
        worksheet.getCell(`${col.start}62`).value = 'CLF';
        worksheet.getCell(`${col.end}62`).value = 'PTJ';
      });

      worksheet.getCell('A62').font = baseFont;
      if (user.length > 32) {
        worksheet.addRows(notas2);
      }

      // Cabeceras de bloque inferior
      worksheet.mergeCells('D57:AC57');
      worksheet.getCell('D57').value = 'ASIGNATURAS/ÁREAS';

      const mainHeaders = [
        { range: 'A57:A62', cell: 'A57', val: 'NÚMERO DE ORDEN' },
        { range: 'B57:B62', cell: 'B57', val: 'DNI' },
        { range: 'C57:C62', cell: 'C57', val: 'APELLIDOS Y NOMBRES (Por orden alfabético)' },
        { range: 'AD57:AD62', cell: 'AD57', val: 'Puntaje del semestre académico' },
        { range: 'AE57:AE62', cell: 'AE57', val: 'Crédito del semestre académico' },
        { range: 'AF57:AF62', cell: 'AF57', val: 'Promedio ponderado del semestre académico' },
        { range: 'AG57:AJ62', cell: 'AG57', val: 'OBSERVACIONES' }
      ];

      mainHeaders.forEach(h => {
        worksheet.mergeCells(h.range);
        worksheet.getCell(h.cell).value = h.val;
      });

      for (let x = 63; x <= 92; x++) {
        worksheet.mergeCells(`AG${x}:AJ${x}`);
      }

      // ==========================================
      // 6. DISEÑO, ESTILOS Y COLORES
      // ==========================================
      const mediumBorder: Partial<ExcelJS.Borders> = { 
        top: { style: 'medium' }, 
        left: { style: 'medium' }, 
        bottom: { style: 'medium' }, 
        right: { style: 'medium' } 
      };
      const greyFill: ExcelJS.Fill = { 
        type: 'pattern', 
        pattern: 'solid', 
        fgColor: { argb: 'D3D3D3' }, 
        bgColor: { argb: 'D3D3D3' } 
      };

      const grupoGris = [
        'A11', 'C11', 'D11', 'H11', 'L11', 'L12', 'T12', 'A14', 'A15', 'H14', 'H15', 'A17', 'D17',
        'AE11', 'AE12', 'B12', 'C12', 'D12', 'H12', 'P12', 'P11', 'Y12', 'AE13', 'AE14', 'C14',
        'M14', 'C15', 'M15', 'AE15', 'AE16', 'AE17', 'C17', 'O17', 'C95', 'AB95', 'B95', 'I95',
        'D95', 'M95', 'W95', 'AC95'
      ];

      grupoGris.forEach(key => {
        const cell = worksheet.getCell(key);
        cell.font = baseFont;
        cell.alignment = centerAlign;
        cell.border = mediumBorder;
        cell.fill = greyFill;
      });

      [
        'A12', 'AG12', 'AG13', 'AG14', 'AG15', 'AG16', 'AG17'
      ].forEach(key => {
        const cell = worksheet.getCell(key);
        cell.font = baseFont;
        cell.border = mediumBorder;
      });

      // Estructuración de filas del bloque inferior (Firmas/Docentes)
      for (let x = 95; x <= 101; x++) {
        worksheet.mergeCells(`D${x}:G${x}`);
        worksheet.mergeCells(`I${x}:L${x}`);
        worksheet.mergeCells(`M${x}:V${x}`);
        worksheet.mergeCells(`W${x}:Z${x}`);
        worksheet.mergeCells(`AC${x}:AI${x}`);

        ['B', 'C', 'D', 'I', 'M', 'W', 'AB', 'AC'].forEach(col => {
          worksheet.getCell(`${col}${x}`).border = mediumBorder;
        });
        worksheet.getRow(x).alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
      }

      worksheet.getCell('B95').value = 'DNI';
      worksheet.getCell('C95').value = 'APELLIDOS Y NOMBRES DEL DOCENTE';
      worksheet.getCell('D95').value = 'FIRMA';
      worksheet.getCell('I95').value = 'DNI';
      worksheet.getCell('M95').value = 'APELLIDOS Y NOMBRES DEL DOCENTE';
      worksheet.getCell('W95').value = 'FIRMA';
      worksheet.getCell('AB95').value = 'CT';
      worksheet.getCell('AC95').value = 'RESUMEN';

      // ==========================================
      // 7. FÓRMULAS DINÁMICAS Y SECCIÓN DE CIERRE
      // ==========================================
      const isShortList = notas.length <= 32;
      const limitRow = 62 + (notas.length - 32);

      const formulaConfig = [
        { cell: 'AC96', val: 'APROBADOS', fShort: '=countif(AF25:AF56,">=10.5")', fLong: `=countif(AF25:AF56,">=10.5")+countif(AF63:AF${limitRow}, ">=10.5")` },
        { cell: 'AC97', val: 'DESAPROBADOS', fShort: '=countifs(AF25:AF56, "<=10.5", AF25: AF56,">0")', fLong: `=countifs(AF25:AF56, "<=10.5", AF25: AF56,">0")+countifs(AF63:AF${limitRow}, "<=10.5", AF63:AF${limitRow}, ">0")` },
        { cell: 'AC98', val: 'RETIRADOS', fShort: '=countif(AF25: AF56, "R")', fLong: `=countif(AF25: AF56, "R")+countif(AF63:AF${limitRow}, "R")` },
        { cell: 'AC99', val: 'RETIRADOS PARCIALES', fShort: '=countif(AF25: AF56, "RP")', fLong: `=countif(AF25: AF56, "RP")+countif(AF63:AF${limitRow}, "RP")` },
        { cell: 'AC100', val: 'LICENCIA', fShort: '=countif(AF25: AF56, "L")', fLong: `=countif(AF25: AF56, "L")+countif(AF63:AF${limitRow}, "L")` }
      ];

      formulaConfig.forEach(f => {
        worksheet.getCell(f.cell).value = f.val;
        worksheet.getCell(f.cell.replace('AC', 'AB')).value = {
          formula: isShortList ? f.fShort : f.fLong,
          date1904: true
        };
      });

      worksheet.getCell('AC101').value = 'TOTAL';
      worksheet.getCell('AB101').value = user.length;

      // Volcado de firmas y datos de docentes recalculados
      for (let x = 96; x <= 101; x++) {
        const idx = x - 96;
        worksheet.getCell(`B${x}`).value = dnis1[idx] || "";
        worksheet.getCell(`C${x}`).value = amautas1[idx] || "";
        worksheet.getCell(`I${x}`).value = dnis2[idx] || "";
        worksheet.getCell(`M${x}`).value = amautas2[idx] || "";
      }

      const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SETIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
      const today = new Date();
      worksheet.mergeCells('D92:AF92');
      worksheet.getCell('D92').value = `AYACUCHO, ${today.getDate()} DE ${meses[today.getMonth()]} DEL ${today.getFullYear()}`;
      worksheet.getCell('D92').alignment = centerAlign;
      worksheet.getCell('D92').font = { ...baseFont, bold: true };

      // Bucle de estilos unificado para la grilla central
      const headerFontNormal: Partial<ExcelJS.Font> = { color: { argb: '3a80d5' }, name: 'arial', family: 4, size: 11, bold: false };
      const headerFontBold: Partial<ExcelJS.Font> = { color: { argb: '3a80d5' }, name: 'arial', family: 4, size: 11, bold: false };
      const verticalAlignRotated: Partial<ExcelJS.Alignment> = { vertical: 'middle', horizontal: 'center', textRotation: 90, wrapText: true };

      const cols = Array.from({ length: 36 }, (_, i) => i < 26 ? String.fromCharCode(65 + i) : 'A' + String.fromCharCode(65 + (i - 26)));

      for (let x = 19; x <= 89; x++) {
        cols.forEach(col => {
          const key = `${col}${x}`;
          const cell = worksheet.getCell(key);
          cell.border = mediumBorder;

          if (col !== 'C' || key === 'C19' || key === 'C57') {
            cell.alignment = centerAlign;
          }
          if (((x >= 19 && x <= 24) && x !== 21) || ((x >= 57 && x <= 62) && x !== 59)) {
            cell.fill = greyFill;
          }
        });
      }

      // Alineaciones específicas
      for (let x = 25; x <= 56; x++) {
        worksheet.getCell(`C${x}`).alignment = { vertical: 'middle', horizontal: 'left' };
        worksheet.mergeCells(`AG${x}:AJ${x}`);
      }
      for (let x = 63; x <= 89; x++) {
        worksheet.getCell(`C${x}`).alignment = { vertical: 'middle', horizontal: 'left' };
      }
      for (let x = 12; x <= 18; x++) {
        worksheet.getCell(`AE${x}`).alignment = { vertical: 'middle', horizontal: 'right' };
        worksheet.getCell(`AG${x}`).alignment = { vertical: 'middle', horizontal: 'left' };
      }
      for (let x = 96; x <= 101; x++) {
        worksheet.getCell(`C${x}`).alignment = { vertical: 'middle', horizontal: 'left' };
        worksheet.getCell(`M${x}`).alignment = { vertical: 'middle', horizontal: 'left' };
        worksheet.getCell(`AB${x}`).alignment = { vertical: 'middle', horizontal: 'right' };
        worksheet.getCell(`AC${x}`).alignment = { vertical: 'middle', horizontal: 'left' };
      }

      // Geometría de columnas y filas
      worksheet.getColumn(1).width = 7;
      worksheet.getColumn(2).width = 19;
      worksheet.getColumn(3).width = 57;
      worksheet.getColumn(33).width = 22.5;
      worksheet.getColumn(35).width = 2.5;
      worksheet.getColumn(36).width = 7;
      for (let x = 4; x <= 32; x++) worksheet.getColumn(x).width = 6;

      for (let x = 11; x <= 110; x++) {
        worksheet.getRow(x).height = 21.5;
        worksheet.getRow(x).font = { name: 'arial', family: 4, size: 11 };
      }
      worksheet.getRow(4).height = 25;
      worksheet.getRow(6).height = 25;
      worksheet.getRow(21).height = 110;
      worksheet.getRow(59).height = 110;

      // Tipografía de cabeceras rotadas
      ['B19', 'C19'].forEach(key => worksheet.getCell(key).font = headerFontNormal);
      ['A19', 'D21', 'F21', 'H21', 'J21', 'L21', 'N21', 'P21', 'R21', 'T21', 'AD19', 'AE19', 'AF19'].forEach(key => {
        const cell = worksheet.getCell(key);
        cell.font = headerFontNormal;
        cell.alignment = verticalAlignRotated;
      });
      ['A57', 'D59', 'G59', 'H59', 'J59', 'L59', 'N59', 'P59', 'R59', 'T59', 'AD57', 'AE57', 'AF57'].forEach(key => {
        const cell = worksheet.getCell(key);
        cell.font = headerFontBold;
        cell.alignment = verticalAlignRotated;
      });

      // Formato condicional (Notas Rojas)
      worksheet.addConditionalFormatting({
        ref: 'D25:AF56',
        rules: [{ priority: 1, type: 'expression', formulae: ['D25<11'], style: { font: { color: { argb: 'FF0000' } } } }]
      });
      if (notas.length > 32) {
        worksheet.addConditionalFormatting({
          ref: `D63:AF${63 + (notas.length - 32)}`,
          rules: [{ priority: 1, type: 'expression', formulae: ['D63<11'], style: { font: { color: { argb: 'FF0000' } } } }]
        });
      }

      // Firmas finales
      const firmas = [
        { mergeV: 'B106:L109', cellV: 'B106', textV: 'DIRECTOR(A) GENERAL', mergeS: 'B110:L110', cellS: 'B110' },
        { mergeV: 'P106:AI109', cellV: 'P106', textV: 'SECRETARÍA ACADÉMICA', mergeS: 'P110:AI110', cellS: 'P110' }
      ];

      firmas.forEach(f => {
        worksheet.mergeCells(f.mergeV);
        worksheet.getCell(f.cellV).value = f.textV;
        worksheet.getCell(f.cellV).alignment = { vertical: 'bottom', horizontal: 'center' };
        worksheet.mergeCells(f.mergeS);
        worksheet.getCell(f.cellS).value = 'Firma, Post Firma y Sello';
        worksheet.getCell(f.cellS).alignment = centerAlign;
      });

      // Escritura y descarga del documento
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `${menccion} CICLO ${this.ciclo()} AÑO ${this.year()}.xlsx`);

    } catch (error) {
      console.error("Error durante la generación del Excel:", error);
      alert("Ocurrió un error al exportar el archivo Excel. Por favor, inténtelo de nuevo.");
    } finally {
      this.loading.set(false);
    }
  }
}