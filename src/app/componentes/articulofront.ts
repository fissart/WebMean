import jsPDF from 'jspdf';
import { logo, logowww, logofisart } from './logo';

// Importación unificada de fuentes tipográficas en formato base64 / VFS
import { fonnt } from './FONTHEIDH';
import { wfont } from './FONTSketch Gothic';
import { ffontt } from './FONTMLMMono';
import { wwfont } from './FONTlmodern';

// ==========================================
// INTERFACES Y TIPOS
// ==========================================

export interface MagazineItem {
  page?: string;
  number?: string;
  title?: string;
  user?: string;
  description?: string;
}

export interface UserData {
  name?: string;
  mencion?: 'P' | 'E' | 'G' | string;
}

export interface JournalInfo {
  TITLE?: string;
  YEAR?: string;
  SUBTITLE?: string;
  PARAGRAPHS?: string[];
  INSTITUTION?: string;
  INSTITUTIONABREV?: string;
  COMITE?: { label: string; val: string }[];
  FRASE?: string;
  LOCATION?: string;
  ISSN_PRINT?: string;
  ISSN_ONLINE?: string;
  DOI_PREFIX?: string;
  VOL?: string;
  NUM?: string;
  LICENSE?: string;
  WEB?: string;
}

// ==========================================
// CONSTANTES Y CONFIGURACIÓN GLOBAL
// ==========================================

const DEFAULT_INFO_DATA: Required<JournalInfo> = {
  TITLE: '',
  YEAR: '',
  SUBTITLE: '',
  PARAGRAPHS: [],
  INSTITUTION: '',
  INSTITUTIONABREV: '',
  FRASE: '',
  COMITE: [],
  LOCATION: '',
  ISSN_PRINT: '',
  ISSN_ONLINE: '',
  DOI_PREFIX: '',
  VOL: '',
  NUM: '',
  LICENSE: '',
  WEB: '',
};

const MENCION_MAP: Record<string, string> = {
  P: 'Artes Plásticas (Pintura, Química Croma y Análisis Espectral)',
  E: 'Artes Plásticas (Escultura, Morfología y Geometría Espacial)',
  G: 'Artes Plásticas y Visuales (Grabado, Biomateriales y Matrizería)',
};

const PALETTE = {
  DARK_NAVY: [15, 23, 42] as [number, number, number],
  ACADEMIC_BLUE: [130, 158, 138] as [number, number, number],
  TERRACOTTA: [194, 65, 12] as [number, number, number],
  GOLD_ACCENT: [180, 130, 45] as [number, number, number],
  CREAM_BG: [255, 255, 255] as [number, number, number],
  LIGHT_BOX: [241, 245, 249] as [number, number, number],
  TEXT_DARK: [15, 23, 42] as [number, number, number],
  TEXT_BODY: [51, 65, 85] as [number, number, number],
  TEXT_MUTED: [100, 116, 139] as [number, number, number],
  WHITE: [255, 255, 255] as [number, number, number],
  BORDER: [203, 213, 225] as [number, number, number],
};

const FONT_GOTHIC = 'SketchGothicSchool';
const FONT_MONO = 'MLMMono8';
const FONT_HEI = 'HEIDHwww';
const FONT_MODERN = 'LModern';

const MARGINS = {
  TOP: 22,
  BOTTOM: 22,
  INNER: 25,
  OUTER: 20,
  HEAD_HEIGHT: 4.93,
};

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================

const getMargins = (pageNum: number, pageWidth: number, pageHeight: number) => {
  const isOdd = pageNum % 2 !== 0;
  const left = isOdd ? MARGINS.INNER : MARGINS.OUTER;
  const right = pageWidth - (isOdd ? MARGINS.OUTER : MARGINS.INNER);
  
  return {
    isOdd,
    left,
    right,
    top: MARGINS.TOP,
    bottom: pageHeight - MARGINS.BOTTOM,
    width: right - left,
    height: pageHeight - MARGINS.TOP - MARGINS.BOTTOM,
  };
};

const getSafeFont = (doc: jsPDF, preferredFont: string, fallback = 'helvetica'): string => {
  try {
    return doc.getFontList()[preferredFont] ? preferredFont : fallback;
  } catch {
    return fallback;
  }
};

interface TextStyleOptions {
  font?: string;
  style?: string;
  size?: number;
  color?: [number, number, number];
}

const setTextStyle = (
  doc: jsPDF, 
  { font = 'helvetica', style = 'normal', size = 11, color = PALETTE.TEXT_DARK }: TextStyleOptions
) => {
  doc.setFont(getSafeFont(doc, font), style);
  doc.setFontSize(size);
  doc.setTextColor(...color);
};

const safeAddImage = (doc: jsPDF, base64Str: string, format: string, x: number, y: number, w: number, h: number) => {
  if (!base64Str || typeof base64Str !== 'string') return;
  try {
    const src = base64Str.startsWith('data:') ? base64Str : `data:image/${format.toLowerCase()};base64,${base64Str}`;
    doc.addImage(src, format.toUpperCase(), x, y, w, h, undefined, 'FAST');
  } catch (err) {
    console.warn('Advertencia: No se pudo renderizar la imagen en el PDF:', err);
  }
};

const drawInnerPageHeader = (
  doc: jsPDF, 
  pageTitle: string, 
  pageNum: number, 
  pageWidth: number, 
  journalInfo: Required<JournalInfo>
) => {
  const m = getMargins(pageNum, pageWidth, 297);

  doc.setFillColor(...PALETTE.CREAM_BG);
  doc.rect(0, 0, pageWidth, 297, 'F');

  const headerY = m.top - MARGINS.HEAD_HEIGHT;

  setTextStyle(doc, { font: FONT_MODERN, style: 'normal', size: 11, color: PALETTE.TEXT_MUTED });
  doc.text(`ISSN: ${journalInfo.ISSN_ONLINE} (en línea) • ${pageTitle}`, m.right, headerY, { align: 'right' });

  doc.setDrawColor(...PALETTE.BORDER);
  doc.setLineWidth(0.3);
  doc.line(m.left, m.top - 2, m.right, m.top - 2);
};

const drawInnerPageFooter = (
  doc: jsPDF, 
  pageNum: number, 
  pageWidth: number, 
  pageHeight: number,
  journalInfo: Required<JournalInfo>
) => {
  const m = getMargins(pageNum, pageWidth, pageHeight);
  const footerY = m.bottom + 7;

  doc.setDrawColor(...PALETTE.BORDER);
  doc.setLineWidth(0.3);
  doc.line(m.left, m.bottom + 2, m.right, m.bottom + 2);

  setTextStyle(doc, { font: FONT_MODERN, style: 'normal', size: 11, color: PALETTE.TEXT_MUTED });
  doc.text(`Publicación arbitrada e indexada bajo licencia ${journalInfo.LICENSE}`, m.left, footerY);
  doc.text(`Página ${pageNum}`, m.right, footerY, { align: 'right' });
};

// ==========================================
// GENERADOR PRINCIPAL
// ==========================================

export const generateMagazineNewSections = (
  data: MagazineItem[] = [], 
  cicle = '1',
  customJournalInfo?: JournalInfo
): Blob | File => {
  const infoDataParent: Required<JournalInfo> = {
    ...DEFAULT_INFO_DATA,
    ...customJournalInfo,
  };

  const currentYear = new Date().getFullYear().toString();
  let user: UserData = { name: 'Investigador / Artista Destacado', mencion: '' };

  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) user = JSON.parse(storedUser);
    } catch (e) {
      console.error('Error al leer usuario de localStorage:', e);
    }
  }

  const userMencionText = MENCION_MAP[user.mencion || ''] || 'Artes Plásticas, Visuales y Ciencias del Arte';

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const registerFont = (fontData: string, fileName: string, fontAlias: string) => {
    if (fontData && typeof fontData === 'string') {
      try {
        const cleanBase64 = fontData.includes(',') ? fontData.split(',')[1] : fontData;
        doc.addFileToVFS(fileName, cleanBase64);
        doc.addFont(fileName, fontAlias, 'normal');
      } catch (e) {
        console.error(`Error registrando la fuente ${fontAlias}:`, e);
      }
    }
  };

  registerFont(wfont, 'SketchGothicSchool.ttf', FONT_GOTHIC);
  registerFont(fonnt, 'HEIDH.ttf', FONT_HEI);
  registerFont(ffontt, 'MLMMono8.ttf', FONT_MONO);
  registerFont(wwfont, 'LModern.ttf', FONT_MODERN);

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // -------------------------------------------------------------------------
  // PÁGINA 1: PORTADA CENTRADA
  // -------------------------------------------------------------------------
  const m1 = getMargins(1, pageWidth, pageHeight);

  doc.setFillColor(...PALETTE.DARK_NAVY);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setFillColor(...PALETTE.TERRACOTTA);
  doc.rect(0, pageHeight - 50, pageWidth, 50, 'F');

  doc.setFillColor(...PALETTE.GOLD_ACCENT);
  doc.rect(0, 0, pageWidth, 3.5, 'F');

  let currentY = m1.top + 2;
  
  // Encabezado superior institucional y ISSN centrados / distribuidos simétricamente
  setTextStyle(doc, { font: FONT_MODERN, size: 9, color: PALETTE.TEXT_MUTED });
  doc.text((infoDataParent.INSTITUTION || 'INSTITUCIÓN ACADÉMICA').toUpperCase(), pageWidth / 2, currentY, { align: 'center' });

  currentY += 5;
  setTextStyle(doc, { font: FONT_MODERN, style: 'normal', size: 8.5, color: PALETTE.TEXT_MUTED });
  doc.text(`ISSN-L ${infoDataParent.ISSN_PRINT} | ${infoDataParent.VOL}, ${infoDataParent.NUM}`, pageWidth / 2, currentY, { align: 'center' });

  // Título y Subtítulo centrados
  currentY += 16;
  setTextStyle(doc, { font: FONT_MODERN, style: 'normal', size: 26, color: PALETTE.ACADEMIC_BLUE });
  const titleText = doc.splitTextToSize(infoDataParent.TITLE || 'Título del Volumen Académico', m1.width);
  doc.text(titleText, pageWidth / 2, currentY, { align: 'center' });

  currentY += (titleText.length * 8.5) + 6;
  setTextStyle(doc, { font: FONT_MODERN, style: 'normal', size: 10, color: PALETTE.TEXT_BODY });
  const subtitleText = doc.splitTextToSize(infoDataParent.SUBTITLE || '', m1.width);
  doc.text(subtitleText, pageWidth / 2, currentY, { align: 'center' });

  // Logo central
  currentY += (subtitleText.length * 4.5) + 10;
  safeAddImage(doc, logo, 'JPEG', (pageWidth / 2) - 24, currentY, 48, 46);
  
  currentY += 46 + 14;
  
  // Bloque del autor y metadatos centrados
  setTextStyle(doc, { font: FONT_MODERN, size: 9.5, color: PALETTE.TERRACOTTA });
  doc.text('DOSSIER DE INVESTIGACIÓN PLÁSTICA Y CIENTÍFICA (STEAM)', pageWidth / 2, currentY, { align: 'center' });

  currentY += 6;
  setTextStyle(doc, { font: FONT_MODERN, size: 8, color: PALETTE.WHITE });
  doc.text('INVESTIGADOR / AUTOR REGISTRADO', pageWidth / 2, currentY, { align: 'center' });

  currentY += 5;
  setTextStyle(doc, { font: FONT_MODERN, style: 'normal', size: 11.5, color: PALETTE.WHITE });
  const formattedName = (user.name || 'Investigador Destacado').toUpperCase();
  doc.text(formattedName, pageWidth / 2, currentY, { align: 'center' });

  currentY += 5.5;
  setTextStyle(doc, { font: FONT_MODERN, style: 'normal', size: 8.5, color: PALETTE.BORDER });
  doc.text(`Especialidad / Línea: ${userMencionText}`, pageWidth / 2, currentY, { align: 'center' });

  currentY += 4.5;
  doc.text(`Edición: ${infoDataParent.VOL} — ${infoDataParent.NUM} (${infoDataParent.YEAR})`, pageWidth / 2, currentY, { align: 'center' });

  // Bloque inferior (Pie de portada) centrado / alineado armónicamente
  const containerTopY = pageHeight - 50;
  const footerBlockY = containerTopY + 8;
  
  setTextStyle(doc, { font: FONT_MODERN, size: 8.5, color: PALETTE.WHITE });
  doc.text('REGISTRO AUDITADO DE PRODUCCIÓN ACADÉMICA Y EPISTEMOLOGÍA VISUAL', pageWidth / 2, footerBlockY, { align: 'center' });

  setTextStyle(doc, { font: FONT_MODERN, style: 'normal', size: 8, color: PALETTE.LIGHT_BOX });
  const certText = doc.splitTextToSize(
    'Documento verificado por la Dirección de Investigación y Registro Académico. Certifica la validez de los experimentos de cromatografía, geometría fractal e iconografía regional.',
    m1.width - 20
  );
  doc.text(certText, pageWidth / 2, footerBlockY + 4, { align: 'center' });

  // Logos de soporte inferior (Izquierda y Derecha simétricos)
  // safeAddImage(doc, logofisart, 'PNG', m1.left, containerTopY + 21, 28, 15);
  safeAddImage(doc, logowww, 'JPEG', pageWidth / 2 - 22.5, containerTopY - 55, 45, 45);

  setTextStyle(doc, { font: FONT_MODERN, style: 'normal', size: 8, color: PALETTE.WHITE });
  doc.text(`${infoDataParent.LOCATION} | DOI: ${infoDataParent.DOI_PREFIX}`, pageWidth / 2, pageHeight - 6, { align: 'center' });

  // -------------------------------------------------------------------------
  // PÁGINA 2: EDITORIAL
  // -------------------------------------------------------------------------
  doc.addPage();
  const m2 = getMargins(2, pageWidth, pageHeight);
  drawInnerPageHeader(doc, 'EDITORIAL & COMITÉ CIENTÍFICO', 2, pageWidth, infoDataParent);

  const colWidthLeft = (m2.width * 0.6) - 4;
  const colWidthRight = (m2.width * 0.4) - 4;
  const rightColX = m2.left + colWidthLeft + 8;

  setTextStyle(doc, { font: FONT_MODERN, size: 11, color: PALETTE.TERRACOTTA });
  doc.text('ARTÍCULO EDITORIAL', m2.left, m2.top + 5);

  setTextStyle(doc, { font: FONT_MODERN, style: 'normal', size: 15, color: PALETTE.TEXT_DARK });
  const editorialTitleLines = doc.splitTextToSize(
    'Convergencia entre Artes y Ciencias: Epistemología y Análisis del Color', 
    colWidthLeft
  );
  doc.text(editorialTitleLines, m2.left, m2.top + 13);

  const titleBottomY = m2.top + 13 + (editorialTitleLines.length * 6);

  doc.setFillColor(...PALETTE.GOLD_ACCENT);
  doc.rect(m2.left, titleBottomY + 3, 1.5, 14, 'F');

  setTextStyle(doc, { font: FONT_MODERN, style: 'normal', size: 11, color: PALETTE.TEXT_BODY });
  const quoteText = doc.splitTextToSize(`${infoDataParent.FRASE}`, colWidthLeft - 6);
  doc.text(quoteText, m2.left + 4, titleBottomY + 6);

  let pY = titleBottomY + 24;
  infoDataParent.PARAGRAPHS.forEach((pText) => {
    const splitP = doc.splitTextToSize(pText, colWidthLeft);
    doc.text(splitP, m2.left, pY);
    pY += (splitP.length * 5) + 4;
  });

  setTextStyle(doc, { font: FONT_MODERN, size: 11, color: PALETTE.TEXT_DARK });
  doc.text('Dirección Científica y Decanato de Investigación', m2.left, pY + 2);

  setTextStyle(doc, { font: FONT_MODERN, style: 'normal', size: 11, color: PALETTE.TEXT_MUTED });
  doc.text(`${infoDataParent.INSTITUTIONABREV}`, m2.left, pY + 7);

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(rightColX - 4, m2.top, rightColX - 4, m2.bottom);

  doc.setFillColor(...PALETTE.LIGHT_BOX);
  doc.rect(rightColX, m2.top, colWidthRight, m2.height, 'F');

  setTextStyle(doc, { font: FONT_MODERN, size: 8, color: PALETTE.TEXT_DARK });
  doc.text('COMITÉ CIENTÍFICO Y ARBITRAJE', rightColX + 4, m2.top + 6);

  doc.setDrawColor(...PALETTE.TERRACOTTA);
  doc.setLineWidth(0.8);
  doc.line(rightColX + 4, m2.top + 8.5, rightColX + 26, m2.top + 8.5);

  let currentYComite = m2.top + 15;
  infoDataParent.COMITE.forEach((item) => {
    setTextStyle(doc, { font: FONT_MODERN, size: 8, color: PALETTE.TERRACOTTA });
    doc.text(item.label, rightColX + 4, currentYComite);

    setTextStyle(doc, { font: FONT_MODERN, style: 'normal', size: 8, color: [30, 41, 59] });
    const splitVal = doc.splitTextToSize(item.val, colWidthRight - 8);
    doc.text(splitVal, rightColX + 4, currentYComite + 4);

    currentYComite += 7 + (splitVal.length * 4.2);
  });

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...PALETTE.BORDER);
  doc.rect(rightColX + 4, currentYComite + 2, colWidthRight - 8, 26, 'FD');

  setTextStyle(doc, { font: FONT_MODERN, size: 8, color: PALETTE.TEXT_DARK });
  doc.text('INDIZACIÓN Y BASES DE DATOS:', rightColX + 6, currentYComite + 7);

  setTextStyle(doc, { font: FONT_MODERN, style: 'normal', size: 8, color: PALETTE.TEXT_MUTED });
  doc.text('• Latindex Catálogo 2.0\n• REDIB / DOAJ System\n• Crossref DOI Register\n• Google Scholar STEAM', rightColX + 6, currentYComite + 12);

  drawInnerPageFooter(doc, 2, pageWidth, pageHeight, infoDataParent);

  // -------------------------------------------------------------------------
  // PÁGINA 3+: SUMARIO
  // -------------------------------------------------------------------------
  let currentPageNum = 3;
  doc.addPage();
  let mCurrent = getMargins(currentPageNum, pageWidth, pageHeight);
  drawInnerPageHeader(doc, 'SUMARIO DE CONTENIDOS', currentPageNum, pageWidth, infoDataParent);

  setTextStyle(doc, { font: FONT_MODERN, style: 'normal', size: 14, color: PALETTE.TEXT_DARK });
  doc.text('Sumario Analítico de Investigación', mCurrent.left, mCurrent.top + 6);

  setTextStyle(doc, { font: FONT_MODERN, style: 'normal', size: 11, color: PALETTE.TEXT_MUTED });
  doc.text('ESTRUCTURA DE ARTÍCULOS CIENTÍFICOS', mCurrent.left, mCurrent.top + 12);

  doc.setDrawColor(...PALETTE.TEXT_DARK);
  doc.setLineWidth(0.4);
  doc.line(mCurrent.left, mCurrent.top + 15, mCurrent.right, mCurrent.top + 15);

  const defaultScientificArticles: MagazineItem[] = [
    {
      page: '01',
      number: 'ART-01',
      title: 'Portada Oficial, Datos de Registro e Indización DOI',
      user: 'DIRECCIÓN DE INVESTIGACIÓN Y REGISTRO ACADÉMICO',
      description: 'Ficha de presentación, asignación de código DOI y certificación institucional.'
    },
    {
      page: '02',
      number: 'ART-02',
      title: 'Editorial: Convergencia entre Artes y Ciencias en el Perú',
      user: 'COMITÉ CIENTÍFICO ARBITRADO',
      description: 'Análisis epistemológico sobre la ciencia de los materiales de arte y el método científico visual.'
    }
  ];

  const indexSections = [
    {
      header: 'SECCIÓN I: MARCO INSTITUCIONAL Y METADATOS EDITORIALES',
      items: defaultScientificArticles
    },
    {
      header: 'SECCIÓN II: PROYECTOS DE INVESTIGACIÓN ARTE-CIENCIA Y EVALUACIÓN',
      items: data.length > 0 ? data : [
        {
          number: 'INV-01',
          title: 'Análisis Cromatográfico de Pigmentos Naturales en la Pintura Andina',
          user: user.name || 'Estudiante Investigador',
          description: 'Estudio espectrográfico de aglutinantes orgánicos y fijación en lienzos de lino tradicional.'
        },
        {
          number: 'INV-02',
          title: 'Morfología Espacial y Geometría en la Escultura Contemporánea',
          user: user.name || 'Estudiante Investigador',
          description: 'Modelado tridimensional sustentado en fractales y resistencia de aleaciones en fundición.'
        }
      ]
    }
  ];

  let indexY = mCurrent.top + 19;

  indexSections.forEach((sec) => {
    if (indexY + 12 > mCurrent.bottom) {
      drawInnerPageFooter(doc, currentPageNum, pageWidth, pageHeight, infoDataParent);
      doc.addPage();
      currentPageNum++;
      mCurrent = getMargins(currentPageNum, pageWidth, pageHeight);
      drawInnerPageHeader(doc, 'SUMARIO DE CONTENIDOS', currentPageNum, pageWidth, infoDataParent);
      indexY = mCurrent.top;
    }

    doc.setFillColor(...PALETTE.ACADEMIC_BLUE);
    doc.rect(mCurrent.left, indexY, mCurrent.width, 6, 'F');

    setTextStyle(doc, { font: FONT_MODERN, size: 10, color: PALETTE.WHITE });
    doc.text(sec.header, mCurrent.left + 4, indexY + 4);

    indexY += 9;

    sec.items.forEach((item) => {
      const title = item.title || 'Título del Proyecto';
      const desc = item.description || 'Sin descripción disponible.';

      setTextStyle(doc, { font: FONT_MODERN, size: 10 });
      const splitTitle = doc.splitTextToSize(title, mCurrent.width - 18);

      setTextStyle(doc, { font: FONT_MODERN, style: 'normal', size: 10 });
      const splitDesc = doc.splitTextToSize(desc, mCurrent.width - 18);

      const itemHeight = 9 + (splitTitle.length * 4.2) + (splitDesc.length * 4.2);

      if (indexY + itemHeight > mCurrent.bottom) {
        drawInnerPageFooter(doc, currentPageNum, pageWidth, pageHeight, infoDataParent);
        doc.addPage();
        currentPageNum++;
        mCurrent = getMargins(currentPageNum, pageWidth, pageHeight);
        drawInnerPageHeader(doc, 'SUMARIO DE CONTENIDOS', currentPageNum, pageWidth, infoDataParent);
        indexY = mCurrent.top;
      }

      setTextStyle(doc, { font: FONT_MODERN, style: 'normal', size: 10, color: PALETTE.TERRACOTTA });
      doc.text(item.page || item.number || 'ART-00', mCurrent.left, indexY + 3);

      setTextStyle(doc, { font: FONT_MODERN, size: 10, color: PALETTE.TEXT_DARK });
      doc.text(splitTitle, mCurrent.left + 15, indexY + 3);

      const titleOffsetY = indexY + 3 + (splitTitle.length * 4.2);

      setTextStyle(doc, { font: 'courier', style: 'normal', size: 10, color: PALETTE.ACADEMIC_BLUE });
      doc.text(item.user || 'Autor no especificado', mCurrent.left + 15, titleOffsetY);

      setTextStyle(doc, { font: FONT_MODERN, style: 'normal', size: 10, color: [71, 85, 105] });
      doc.text(splitDesc, mCurrent.left + 15, titleOffsetY + 4.5);

      const lineY = titleOffsetY + 4.5 + (splitDesc.length * 4.2);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.2);
      doc.line(mCurrent.left + 15, lineY, mCurrent.right, lineY);

      indexY = lineY + 5;
    });

    indexY += 2;
  });

  const noteY = Math.min(indexY + 2, mCurrent.bottom - 20);

  setTextStyle(doc, { font: FONT_MODERN, size: 10, color: PALETTE.TERRACOTTA });
  doc.text('DECLARACIÓN DE AUDITORÍA CIENTÍFICA Y PROPIEDAD INTELECTUAL', mCurrent.left + 4, noteY + 3);

  setTextStyle(doc, { font: FONT_MODERN, style: 'normal', size: 10, color: [68, 64, 60] });
  const noteText = doc.splitTextToSize(
    'Los proyectos de investigación y análisis cromatográficos han sido arbitrados mediante evaluación ciega por pares. Los derechos morales pertenecen a los autores bajo la reglamentación institucional.',
    mCurrent.width - 8
  );
  doc.text(noteText, mCurrent.left + 4, noteY + 8);

  drawInnerPageFooter(doc, currentPageNum, pageWidth, pageHeight, infoDataParent);

  // -------------------------------------------------------------------------
  // SALIDA
  // -------------------------------------------------------------------------
  const pdfBlob = doc.output('blob');
  const sanitizedUserName = (user.name || 'Estudiante').replace(/[^a-zA-Z0-9_-]/g, '_');
  const fileName = `Revista_Cientifica_ArtesCiencias_${sanitizedUserName}_Ciclo_${cicle}.pdf`;

  if (typeof File !== 'undefined') {
    return new File([pdfBlob], fileName, { type: 'application/pdf' });
  }

  return pdfBlob;
}