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
  _id: string;
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
  selector: 'app-export-to-pdf',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // CORREGIDO AQUÍ
  template: `
    <button (click)="generatePdf()" class="btn btn-info btn-sm d-inline-flex align-items-center gap-1">
      <i class="bi bi-file-earmark-pdf"></i>
      <span>Imprimir boleta {{ cicle() }} {{ yyear() }}</span>
    </button>
  `
})
export class ExportToPdfComponent {
  // Entradas reactivas basadas en Signals (Angular 21)
  data = input<CycleGroup[]>([]);
  cicle = input<string>('');
  yyear = input<string>('');

  generatePdf(): void {
    // 1. Obtener información del usuario con fallback de seguridad
    let user: User = { name: 'Estudiante', mencion: '' };
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        user = JSON.parse(storedUser);
      }
    } catch (e) {
      console.error('Error al leer usuario de localStorage', e);
    }

    const currentCicle = this.cicle();
    const currentYyear = this.yyear();

    // 2. Localizar el grupo de ciclo y la mención correcta
    const cycleGroup = this.data()?.find((item) => item._id === currentCicle);
    const targetMencion =
      cycleGroup?.mencions?.find((m) => m._id === currentYyear) ||
      cycleGroup?.mencions?.[0];

    const rawCourses = targetMencion?.cycles || [];

    // 3. Procesar datos para la tabla y calcular promedios
    let totalCreditos = 0;
    let totalPuntaje = 0;

    const tableBody = rawCourses
      .filter((course) => course.ciclo === currentCicle)
      .map((course) => {
        const rawNota = course.nota;
        const numNota = Number(rawNota);
        const credit = Number(course.credito) || 0;

        // Comprobación de Licencia cuando la nota es -0
        const isLicencia = Object.is(numNota, -0);

        if (isLicencia) {
          return [course.title, course.year, credit, 'Licencia', '-'];
        }

        const notaValida = isNaN(numNota) ? 0 : numNota;
        const puntaje = credit * notaValida;

        totalCreditos += credit;
        totalPuntaje += puntaje;

        return [course.title, course.year, credit, notaValida, puntaje];
      });

    const promedioSemestral =
      totalCreditos > 0 ? (totalPuntaje / totalCreditos).toFixed(2) : '0.00';

    // 4. Configurar el documento PDF
    const doc = new jsPDF();
    const centerX = doc.internal.pageSize.width / 2;

    // Elementos decorativos superiores
    doc.setLineWidth(16);
    doc.setDrawColor(255, 255, 255);
    doc.circle(2 * centerX - 36.9, 43.9, 23.5, 'S');
    doc.setLineWidth(0);
    doc.setDrawColor(0);

    // Renderizar Tabla con autoTable
    autoTable(doc, {
      margin: { horizontal: 12, top: 59 },
      startY: 0.25 * doc.internal.pageSize.height,
      styles: { overflow: 'linebreak', fillColor: 'wheat' },
      columnStyles: { 0: { halign: 'left' }, 3: { halign: 'center' } },
      head: [['CURSO', 'AÑO', 'CRÉDITO', 'NOTA', 'PUNTAJE']],
      body: tableBody,
      foot: [
        ['TOTAL', '', totalCreditos, '', totalPuntaje],
        ['PROMEDIO SEMESTRAL', '', '', '', promedioSemestral],
      ],
    });

    // Encabezados e información institucional
    const now = new Date();
    const formattedDate = `Ayacucho, ${now.getDate()} de ${MONTHS[now.getMonth()]} del ${now.getFullYear()}`;
    const userMencionText =
      MENCION_MAP[user.mencion] ||
      'ARTES PLÁSTICAS Y VISUALES (Educación Artística)';

    doc.setFontSize(18);
    doc.text('BOLETA DE NOTAS SEMESTRAL', centerX, 29, { align: 'center' });

    doc.setFontSize(16);
    doc.text(`CICLO ${currentCicle}`, centerX, 36, { align: 'center' });

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Escuela Superior de Bellas Artes Pública Ayacucho', centerX, 43, {
      align: 'center',
    });

    doc.setFontSize(9);
    doc.text("ESFAP 'FELIPE GUAMÁN POMA DE AYALA'", centerX, 48, {
      align: 'center',
    });

    doc.setFontSize(7);
    doc.text(formattedDate, centerX, 51, { align: 'center' });

    doc.setFontSize(12);
    doc.text(user.name, centerX, 59, { align: 'center' });
    doc.text(userMencionText, centerX, 65, { align: 'center' });

    // Imágenes del documento (Logos / Sellos)
    if (logo) {
      doc.addImage(
        `data:image/jpeg;base64,${logo}`,
        'JPEG',
        centerX - 95,
        25,
        35,
        35,
        '',
        'NONE',
        0
      );
    }
    if (logoperu) {
      doc.addImage(
        `data:image/jpeg;base64,${logoperu}`,
        'JPEG',
        centerX + 61,
        25,
        35,
        35,
        '',
        'NONE',
        0
      );
    }

    if (subdir) {
      doc.addImage(
        `data:image/jpeg;base64,${subdir}`,
        'JPEG',
        centerX - 21,
        235,
        95,
        37,
        '',
        'NONE',
        -5
      );
    }

    if (wwwdir) {
      doc.addImage(
        `data:image/jpeg;base64,${wwwdir}`,
        'PNG',
        centerX - 65,
        205,
        89.8,
        39,
        '',
        'NONE',
        19
      );
    }

    // 5. Descargar archivo PDF
    doc.save(`${user.name} Calificaciones del ciclo ${currentCicle}.pdf`);
  }
}