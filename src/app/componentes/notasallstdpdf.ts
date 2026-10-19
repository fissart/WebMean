import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { logoperu, logo, subdir, wwwdir } from './logo';

// Interfaces para tipado estricto
export interface Course {
  ciclo: string;
  nota: number | string;
  credito: number | string;
  title: string;
  year: string;
}

export interface Mencion {
  _id: string;
  cycles: Course[];
}

export interface CycleGroup {
  _id: string; // Ciclo (ej. "1", "2", etc.)
  mencions: Mencion[];
}

export interface User {
  name: string;
  mencion: string;
}

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const MENCION_MAP: Record<string, string> = {
  P: 'ARTES PLÁSTICAS (Pintura)',
  E: 'ARTES PLÁSTICAS (Escultura)',
  G: 'ARTES PLÁSTICAS Y VISUALES (Grabado)',
};

@Component({
  selector: 'app-export-to-pdfall',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button (click)="generatePdf()" class="btn btn-primary align-items-center gap-1 ffont w-100">
      <i class="bi bi-file-earmark-pdf"></i>
      <span>Imprimir todas las notas por ciclo</span>
    </button>
  `
})
export class ExportToPdfallComponent {
  // Entradas de datos globales (Signals)
  data = input<CycleGroup[]>([]);
  student = input<User[]>([]);

  generatePdf(): void {
    // 1. Obtener y asegurar el estudiante actual desde el array input
    const studentsList = this.student();
    const currentUser: User = (Array.isArray(studentsList) && studentsList.length > 0) 
      ? studentsList[0] 
      : { name: 'ESTUDIANTE', mencion: 'P' };

    const cycleGroupsMap = new Map<string, Course[]>();
    const cycleGroups = this.data();

    if (Array.isArray(cycleGroups)) {
      for (const cycleGroup of cycleGroups) {
        if (cycleGroup && Array.isArray(cycleGroup.mencions)) {
          for (const mencionGroup of cycleGroup.mencions) {
            if (mencionGroup && Array.isArray(mencionGroup.cycles)) {
              for (const course of mencionGroup.cycles) {
                // Usamos el ciclo del curso o el del grupo contenedor como clave
                const cicloKey = course.ciclo || cycleGroup._id || '1';
                
                if (!cycleGroupsMap.has(cicloKey)) {
                  cycleGroupsMap.set(cicloKey, []);
                }
                cycleGroupsMap.get(cicloKey)!.push(course);
              }
            }
          }
        }
      }
    }

    // Ordenar las claves de los ciclos numéricamente si es posible
    const sortedCiclos = Array.from(cycleGroupsMap.keys()).sort((a, b) => Number(a) - Number(b));

    // 2. Construir el cuerpo de la tabla intercalando filas de título por ciclo
    let tableBody: any[] = [];
    let totalCreditosGeneral = 0;
    let totalPuntajeGeneral = 0;

    for (const ciclo of sortedCiclos) {
      const courses = cycleGroupsMap.get(ciclo)!;

      // Fila de cabecera de sección para el ciclo actual
      tableBody.push([
        { content: `CICLO ACADÉMICO: ${ciclo}`, colSpan: 6, styles: { fontStyle: 'bold', fillColor: [220, 224, 230], textColor: [0, 0, 0], halign: 'left' } }
      ]);

      let cicloCreditos = 0;
      let cicloPuntaje = 0;

      for (const course of courses) {
        const rawNota = course.nota;
        const numNota = Number(rawNota);
        const credit = Number(course.credito) || 0;

        const isLicencia = Object.is(numNota, -0);

        if (isLicencia) {
          tableBody.push([course.title, course.ciclo, course.year, credit, 'Licencia', '-']);
          continue;
        }

        const notaValida = isNaN(numNota) ? 0 : numNota;
        const puntaje = credit * notaValida;

        cicloCreditos += credit;
        cicloPuntaje += puntaje;

        tableBody.push([course.title, course.ciclo, course.year, credit, notaValida, puntaje]);
      }

      totalCreditosGeneral += cicloCreditos;
      totalPuntajeGeneral += cicloPuntaje;

      // Subtotal / Promedio del ciclo
      const promedioCiclo = cicloCreditos > 0 ? (cicloPuntaje / cicloCreditos).toFixed(2) : '0.00';
      tableBody.push([
        { content: `SUBTOTALES / PROMEDIO - CICLO ${ciclo}`, colSpan: 3, styles: { fontStyle: 'bold', halign: 'right' } },
        { content: cicloCreditos, styles: { fontStyle: 'bold' } },
        { content: promedioCiclo, styles: { fontStyle: 'bold', halign: 'center' } },
        { content: cicloPuntaje, styles: { fontStyle: 'bold' } }
      ]);
    }

    const promedioGeneral = totalCreditosGeneral > 0 ? (totalPuntajeGeneral / totalCreditosGeneral).toFixed(2) : '0.00';

    // 3. Configurar el documento PDF
    const doc = new jsPDF();
    const centerX = doc.internal.pageSize.width / 2;

    doc.setLineWidth(16);
    doc.setDrawColor(255, 255, 255);
    doc.circle(2 * centerX - 36.9, 43.9, 23.5, 'S');
    doc.setLineWidth(0);
    doc.setDrawColor(0);

    // Encabezados institucionales
    const now = new Date();
    const formattedDate = `Ayacucho, ${now.getDate()} de ${MONTHS[now.getMonth()]} del ${now.getFullYear()}`;
    const userMencionText = MENCION_MAP[currentUser.mencion] || 'ARTES PLÁSTICAS Y VISUALES (Educación Artística)';

    doc.setFontSize(18);
    doc.text('CONSOLIDADO GENERAL DE CALIFICACIONES', centerX, 25, { align: 'center' });

    doc.setFontSize(14);
    doc.text('HISTORIAL ACADÉMICO SEPARADO POR CICLOS', centerX, 36, { align: 'center' });

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Escuela Superior de Bellas Artes Pública Ayacucho', centerX, 43, { align: 'center' });

    doc.setFontSize(9);
    doc.text("ESFAP 'FELIPE GUAMÁN POMA DE AYALA'", centerX, 48, { align: 'center' });

    doc.setFontSize(7);
    doc.text(formattedDate, centerX, 51, { align: 'center' });

    doc.setFontSize(12);
    doc.text(currentUser.name, centerX, 59, { align: 'center' });
    doc.text(userMencionText, centerX, 65, { align: 'center' });

    // Imágenes institucionales
    if (logo) doc.addImage(`data:image/jpeg;base64,${logo}`, 'JPEG', centerX - 95, 25, 35, 35, '', 'NONE', 0);
    if (logoperu) doc.addImage(`data:image/jpeg;base64,${logoperu}`, 'JPEG', centerX + 61, 25, 35, 35, '', 'NONE', 0);
    if (subdir) doc.addImage(`data:image/jpeg;base64,${subdir}`, 'JPEG', centerX - 21, 235, 95, 37, '', 'NONE', -5);
    if (wwwdir) doc.addImage(`data:image/jpeg;base64,${wwwdir}`, 'PNG', centerX - 65, 205, 89.8, 39, '', 'NONE', 19);

    // Renderizar Tabla con autoTable
    autoTable(doc, {
      margin: { horizontal: 12, top: 59 },
      startY: 0.25 * doc.internal.pageSize.height,
      styles: { overflow: 'linebreak', fillColor: [245, 222, 179] },
      columnStyles: { 
        0: { halign: 'left' }, 
        1: { halign: 'center' },
        3: { halign: 'center' },
        4: { halign: 'center' } 
      },
      head: [['CURSO', 'CICLO', 'AÑO', 'CRÉDITO', 'NOTA', 'PUNTAJE']],
      body: tableBody,
      foot: [
        ['TOTAL GENERAL', '', '', totalCreditosGeneral, '', totalPuntajeGeneral],
        ['PROMEDIO GENERAL', '', '', '', '', promedioGeneral],
      ],
    });

    // 4. Descargar archivo PDF
    doc.save(`${currentUser.name} - Consolidado por Ciclos.pdf`);
  }
}