import { jsPDF } from 'jspdf';
import { logo, logoperu, logofisart } from './logo';

// Importación de fuentes tipográficas
import { fonnt } from './FONTHEIDH';
import { wfont } from './FONTSketch Gothic';
import { ffontt } from './FONTMLMMono';
import { wwfont } from './FONTlmodern';

// =========================================================================
// INTERFACES Y VALORES POR DEFECTO
// =========================================================================
export interface UserData {
  name?: string;
  mencion?: 'P' | 'E' | 'G' | string;
}

export interface JournalInfo {
  TITLE?: string;
  SUBTITLE?: string;
  YEAR?: string;
  INSTITUTION?: string;
  LOCATION?: string;
  ISSN_PRINT?: string;
  ISSN_ONLINE?: string;
  DOI_PREFIX?: string;
  VOL?: string;
  NUM?: string;
  LICENSE?: string;
  WEB?: string;
}

const DEFAULT_JOURNAL_INFO: Required<JournalInfo> = {
  TITLE: 'ARTES & VISIÓN',
  YEAR: '2026',
  SUBTITLE: 'ÓRGANO DE DIFUSIÓN CIENTÍFICO-PLÁSTICA',
  INSTITUTION: 'Escuela Superior de Bellas Artes Pública "Felipe Guamán Poma de Ayala"',
  LOCATION: 'Ayacucho, Perú',
  ISSN_PRINT: '2708-8324',
  ISSN_ONLINE: '2708-8332',
  DOI_PREFIX: '10.5281/zenodo',
  VOL: '1',
  NUM: '1',
  LICENSE: 'CC BY-NC-SA 4.0 INTERNATIONAL',
  WEB: 'www.esfapayacucho.edu.pe',
};

const MONTHS: string[] = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const MENCION_MAP: Record<string, string> = {
  P: 'ARTES PLÁSTICAS (Pintura y Semiótica Visual)',
  E: 'ARTES PLÁSTICAS (Escultura y Morfología Espacial)',
  G: 'ARTES PLÁSTICAS Y VISUALES (Grabado e Investigación Gráfica)',
};

const FONT_SKETCH = 'SketchGothicSchool';
const FONT_HEI = 'HEIDHwww';
const FONT_MONO = 'MLMMono8';
const FONT_MODERN = 'LModern';

const MARGIN_CONFIG = {
  TOP: 25,
  BOTTOM: 25,
  INNER: 30,
  OUTER: 20,
  HEAD_HEIGHT: 4.94
};

const getMargins = (pageNum: number, pageWidth: number, pageHeight: number) => {
  const isOdd = pageNum % 2 !== 0;
  const leftMargin = isOdd ? MARGIN_CONFIG.INNER : MARGIN_CONFIG.OUTER;
  const rightMargin = isOdd ? MARGIN_CONFIG.OUTER : MARGIN_CONFIG.INNER;

  return {
    isOdd,
    left: leftMargin,
    right: pageWidth - rightMargin,
    top: MARGIN_CONFIG.TOP,
    bottom: pageHeight - MARGIN_CONFIG.BOTTOM,
    width: pageWidth - leftMargin - rightMargin,
    height: pageHeight - MARGIN_CONFIG.TOP - MARGIN_CONFIG.BOTTOM,
  };
};

const registerCustomFont = (doc: jsPDF, fontData: string, fileName: string, fontAlias: string): void => {
  if (fontData && typeof fontData === 'string') {
    try {
      const cleanBase64 = fontData.includes(',') ? fontData.split(',')[1] : fontData;
      doc.addFileToVFS(fileName, cleanBase64);
      doc.addFont(fileName, fontAlias, 'normal');
    } catch (e) {
      console.warn(`No se pudo registrar la fuente ${fontAlias}:`, e);
    }
  }
};

const setSafeFont = (
  doc: jsPDF,
  fontAlias: string,
  style = 'normal',
  size = 9,
  color: [number, number, number] = [18, 24, 38]
): void => {
  try {
    const available = doc.getFontList();
    const fontToUse = available[fontAlias] ? fontAlias : 'helvetica';
    doc.setFont(fontToUse, style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
  } catch {
    doc.setFont('helvetica', style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
  }
};

// =========================================================================
// GENERACIÓN DE PDF
// =========================================================================
export const generateMagazineSections = (
  year: string,
  cicle = '1',
  journalInfoParam?: JournalInfo
): Blob => {
  const infoDataParent: Required<JournalInfo> = {
    ...DEFAULT_JOURNAL_INFO,
    ...journalInfoParam
  };

  let user: UserData = { name: 'Investigador / Estudiante', mencion: '' };

  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) user = JSON.parse(storedUser);
    } catch (e) {
      console.error('Error al leer usuario de localStorage:', e);
    }
  }

  const now = new Date();
  const formattedDate = `${MONTHS[now.getMonth()]} ${now.getFullYear()}`;
  const userMencionText = MENCION_MAP[user.mencion || ''] || 'ARTES PLÁSTICAS E INVESTIGACIÓN VISUAL';

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  doc.setProperties({
    title: `${infoDataParent.TITLE} Publicación de Ciencias y Artes (${year})`,
    subject: `Dossier de Investigación Plástica - Vol. ${infoDataParent.VOL} N° ${infoDataParent.NUM}`,
    author: user.name || infoDataParent.INSTITUTION,
    keywords: 'Artes, Ciencias, Epistemología Visual, Investigación Plástica, STEAM, Ética Editorial',
    creator: infoDataParent.INSTITUTION
  });

  registerCustomFont(doc, wfont, 'SketchGothicSchool.ttf', FONT_SKETCH);
  registerCustomFont(doc, fonnt, 'GOTHIC.ttf', FONT_HEI);
  registerCustomFont(doc, ffontt, 'MODERN.ttf', FONT_MONO);
  registerCustomFont(doc, wwfont, 'LMODERN.ttf', FONT_MODERN);

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // -------------------------------------------------------------------------
  // SECCIÓN 1: NORMAS EDITORIALES Y ÉTICA
  // -------------------------------------------------------------------------
  const m1 = getMargins(1, pageWidth, pageHeight);

  doc.setFillColor(250, 249, 246);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  const headerY1 = m1.top - MARGIN_CONFIG.HEAD_HEIGHT;
  setSafeFont(doc, FONT_MODERN, 'normal', 7.5, [140, 140, 140]);
  doc.text('NORMAS EDITORIALES, CÓDIGO DE ÉTICA Y EVALUACIÓN POR PARES', m1.left, headerY1);

  doc.setDrawColor(210, 215, 220);
  doc.setLineWidth(0.3);
  doc.line(m1.left, m1.top - 2, m1.right, m1.top - 2);

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(215, 220, 225);
  doc.rect(m1.left, m1.top + 2, m1.width, 110, 'FD');

  setSafeFont(doc, FONT_MODERN, 'normal', 6.5, [150, 150, 150]);
  doc.text('DECLARACIÓN DE COMPROMISO ACADÉMICO Y RIGOR CIENTÍFICO', m1.right - 4, m1.top + 7, { align: 'right' });

  setSafeFont(doc, FONT_MODERN, 'normal', 12, [194, 65, 12]);
  doc.text('CÓDIGO DE ÉTICA Y DECLARACIÓN ANTI-PLAGIO', m1.left + 8, m1.top + 20);

  setSafeFont(doc, FONT_MODERN, 'normal', 11, [15, 23, 42]);
  doc.text('Estándares COPE (Committee on Publication Ethics)\nTransparencia en Artes y Ciencias', m1.left + 8, m1.top + 28);

  setSafeFont(doc, FONT_MODERN, 'normal', 11, [51, 65, 85]);
  const ethicsText = doc.splitTextToSize(
    `La Revista Científica ${infoDataParent.TITLE} exige estricta originalidad e integridad científica en todas sus contribuciones. Todos los artículos y proyectos plásticos son sometidos a verificación mediante software de coincidencia textual e inspección cromatográfica de laboratorio. Los autores garantizan la autoría intelectual de las obras y la veracidad de los datos experimentales.`,
    m1.width - 16
  );
  doc.text(ethicsText, m1.left + 8, m1.top + 39.5);

  doc.setFillColor(15, 23, 42);
  doc.rect(m1.left + 8, m1.top + 65, m1.width - 8, 21, 'F');

  setSafeFont(doc, FONT_MODERN, 'normal', 11, [242, 167, 75]);
  doc.text(`LICENCIA EDITORIAL: ${infoDataParent.LICENSE}`, m1.left + 12, m1.top + 76);

  if (typeof logofisart !== 'undefined' && logofisart) {
    try {
      const srcWww = logofisart.startsWith('data:') ? logofisart : `data:image/png;base64,${logofisart}`;
      doc.addImage(srcWww, 'PNG', 38, m1.top + 91, 25, 12);
    } catch (e) {
      console.warn('No se pudo renderizar la imagen logofisart:', e);
    }
  }

  const gap = 6;
  const cardWidth = (m1.width - gap) / 2;

  // Banner Izquierdo: Peer Review
  doc.setFillColor(255, 255, 255);
  doc.rect(m1.left, m1.top + 118, cardWidth, 118, 'FD');

  setSafeFont(doc, FONT_MODERN, 'normal', 6.5, [150, 150, 150]);
  doc.text('SISTEMA ARBITRADO', m1.left + cardWidth - 4, m1.top + 123, { align: 'right' });

  setSafeFont(doc, FONT_MODERN, 'normal', 11, [15, 23, 42]);
  doc.text('EVALUACIÓN POR PARES\nCIEGOS (DOUBLE-BLIND)', m1.left + 6, m1.top + 133);

  setSafeFont(doc, FONT_MODERN, 'normal', 11, [70, 70, 70]);
  const peerText = doc.splitTextToSize(
    'Cada manuscrito o propuesta de investigación plástica es evaluado por dos especialistas independientes según criterios de originalidad, metodología visual, análisis cromático/morfométrico y contribución a la epistemología andina.',
    cardWidth - 12
  );
  doc.text(peerText, m1.left + 6, m1.top + 148);

  setSafeFont(doc, FONT_MODERN, 'normal', 11, [194, 65, 12]);
  doc.text(`arbitraje@${infoDataParent.WEB.replace('www.', '')}`, m1.left + 6, m1.top + 228);

  // Banner Derecho: Repositorio
  const rightCardX = m1.left + cardWidth + gap;
  doc.setFillColor(255, 255, 255);
  doc.rect(rightCardX, m1.top + 118, cardWidth, 118, 'FD');

  setSafeFont(doc, FONT_MODERN, 'normal', 6.5, [150, 150, 150]);
  doc.text('PRESERVACIÓN DIGITAL', rightCardX + cardWidth - 4, m1.top + 123, { align: 'right' });

  setSafeFont(doc, FONT_MODERN, 'normal', 11, [15, 23, 42]);
  doc.text('REPOSITORIO Y\nPRESERVACIÓN PKP-PN', rightCardX + 6, m1.top + 133);

  setSafeFont(doc, FONT_MODERN, 'normal', 11, [70, 70, 70]);
  const archiveText = doc.splitTextToSize(
    `Los artículos aprobados quedan archivados permanentemente en la red de preservación LOCKSS/CLOCKSS y en el Repositorio Institucional con asignación de DOI (${infoDataParent.DOI_PREFIX}) para garantizar su trazabilidad.`,
    cardWidth - 12
  );
  doc.text(archiveText, rightCardX + 6, m1.top + 148);

  setSafeFont(doc, FONT_MODERN, 'normal', 11, [194, 65, 12]);
  doc.text(`repositorio.${infoDataParent.WEB.replace('www.', '')}`, rightCardX + 6, m1.top + 228);

  setSafeFont(doc, FONT_MODERN, 'normal', 11, [140, 140, 140]);
  doc.text('Normas Editoriales e Integridad Académica', m1.left, m1.bottom + 6);

  // -------------------------------------------------------------------------
  // SECCIÓN 2: CONTRAPORTADA (Elementos Centrados)
  // -------------------------------------------------------------------------
  doc.addPage();
  const m2 = getMargins(2, pageWidth, pageHeight);

  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setFillColor(180, 130, 45);
  doc.rect(0, 0, pageWidth, 6, 'F');

  doc.setFillColor(194, 65, 12);
  doc.rect(0, pageHeight - 45, pageWidth, 45, 'F');

  setSafeFont(doc, FONT_MODERN, 'normal', 8, [203, 213, 225]);
  doc.text(infoDataParent.INSTITUTION.toUpperCase(), pageWidth / 2, m2.top - 2, { align: 'center' });

  setSafeFont(doc, FONT_MODERN, 'normal', 8, [148, 163, 184]);
  doc.text(`UBICACIÓN: ${infoDataParent.LOCATION.toUpperCase()}`, pageWidth / 2, m2.top + 3, { align: 'center' });

  if (typeof logo !== 'undefined' && logo) {
    try {
      const srcLogo = logo.startsWith('data:') ? logo : `data:image/jpeg;base64,${logo}`;
      doc.addImage(srcLogo, 'JPEG', (pageWidth / 2) - 22, m2.top + 10, 43, 41);
    } catch (e) {
      console.warn('No se pudo renderizar el logo institucional:', e);
    }
  }

  setSafeFont(doc, FONT_MODERN, 'normal', 24, [255, 255, 255]);
  const titleLines = doc.splitTextToSize(infoDataParent.TITLE, m2.width);
  doc.text(titleLines, pageWidth / 2, m2.top + 62, { align: 'center' });
  
  // setSafeFont(doc, FONT_MODERN, 'normal', 9, [180, 190, 210]);
  // doc.text(`${infoDataParent.SUBTITLE} — ${infoDataParent.YEAR}`, pageWidth / 2, m2.top + 70, { align: 'center' });

  setSafeFont(doc, FONT_MODERN, 'normal', 8, [226, 232, 240]);
  const closingSummary = doc.splitTextToSize(
    'Esta publicación documenta el desempeño lectivo, las evidencias de rigor técnico y el desarrollo de la investigación plástica del estudiante dentro de la institución. Documento auditado y reconocido con carácter oficial acreditativo.',
    m2.width - 20
  );
  doc.text(closingSummary, pageWidth / 2, m2.top + 78, { align: 'center' });

  // Caja de Datos del Investigador (Centrada horizontalmente)
  const boxWidth = m2.width - 10;
  const boxX = (pageWidth - boxWidth) / 2;
  doc.setFillColor(30, 41, 59);
  doc.setDrawColor(71, 85, 105);
  doc.setLineWidth(0.4);
  doc.rect(boxX, m2.top + 94, boxWidth, 44, 'FD');

  setSafeFont(doc, FONT_MODERN, 'normal', 8, [242, 167, 75]);
  doc.text('INVESTIGADOR / AUTOR REGISTRADO', pageWidth / 2, m2.top + 101, { align: 'center' });

  setSafeFont(doc, FONT_MODERN, 'normal', 11, [255, 255, 255]);
  const formattedName = (user.name || 'Estudiante / Investigador Destacado').toUpperCase();
  doc.text(formattedName, pageWidth / 2, m2.top + 109, { align: 'center' });

  setSafeFont(doc, FONT_MODERN, 'normal', 8, [203, 213, 225]);
  doc.text(`Especialidad / Línea: ${userMencionText}`, pageWidth / 2, m2.top + 116, { align: 'center' });
  doc.text(`Edición: Vol. ${infoDataParent.VOL} — Num. ${infoDataParent.NUM} (${infoDataParent.YEAR})`, pageWidth / 2, m2.top + 123, { align: 'center' });
  doc.text(`Fecha de Registro y Expedición: ${formattedDate}`, pageWidth / 2, m2.top + 130, { align: 'center' });

  // Código de Barras e ISSN
  doc.setFillColor(255, 255, 255);
  doc.rect((pageWidth / 2) - 30, m2.top + 142, 60, 16, 'F');

  doc.setFillColor(15, 23, 42);
  const barX = (pageWidth / 2) - 24;
  const barWidths = [1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2];
  let currentBarX = barX;

  barWidths.forEach((w, idx) => {
    if (idx % 2 === 0) {
      doc.rect(currentBarX, m2.top + 144, w, 8, 'F');
    }
    currentBarX += w + 0.8;
  });

  setSafeFont(doc, FONT_MODERN, 'normal', 7, [15, 23, 42]);
  doc.text(`ISSN-L ${infoDataParent.ISSN_PRINT} | DOI: ${infoDataParent.DOI_PREFIX}`, pageWidth / 2, m2.top + 164, { align: 'center' });

  if (typeof logoperu !== 'undefined' && logoperu) {
    try {
      const srcPeru = logoperu.startsWith('data:') ? logoperu : `data:image/jpeg;base64,${logoperu}`;
      doc.addImage(srcPeru, 'JPEG', m2.left, pageHeight - 35, 22, 22);
    } catch (e) {
      console.warn('No se pudo renderizar logoperu:', e);
    }
  }

  setSafeFont(doc, FONT_MODERN, 'normal', 11, [255, 255, 255]);
  doc.text('DIRECCIÓN DE INVESTIGACIÓN Y REGISTRO ACADÉMICO', m2.left + 28, pageHeight - 27);

  setSafeFont(doc, FONT_MODERN, 'normal', 7.5, [241, 245, 249]);
  doc.text(`${infoDataParent.LOCATION} — ${infoDataParent.WEB}`, m2.left + 28, pageHeight - 22);
  doc.text(`Contacto: revista@${infoDataParent.WEB.replace('www.', '')}`, m2.left + 28, pageHeight - 17);

  setSafeFont(doc, FONT_MODERN, 'normal', 10, [255, 255, 255]);
  doc.text(`${infoDataParent.LOCATION} — ${infoDataParent.YEAR}`, m2.right, pageHeight - 10, { align: 'right' });

  // Exportar Blob/File
  const pdfBlob = doc.output('blob');
  const sanitizedUserName = (user.name || 'Estudiante').replace(/[^a-zA-Z0-9_-]/g, '_');
  const fileName = `Revista_Cientifica_${sanitizedUserName}_${year}.pdf`;

  if (typeof File !== 'undefined') {
    return new File([pdfBlob], fileName, { type: 'application/pdf' });
  }

  return pdfBlob;
}