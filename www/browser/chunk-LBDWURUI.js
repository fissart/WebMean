import {
  ffontt
} from "./chunk-5V6YZDRU.js";
import {
  fonnt,
  wfont
} from "./chunk-GFHMMU7L.js";
import {
  logo,
  logowww
} from "./chunk-AWCERLVS.js";
import {
  E
} from "./chunk-USHPRP53.js";
import "./chunk-7YWLATDR.js";
import {
  wwfont
} from "./chunk-ZOL4C762.js";
import {
  __spreadValues
} from "./chunk-3WPM564S.js";

// src/app/componentes/articulofront.ts
var DEFAULT_INFO_DATA = {
  TITLE: "",
  YEAR: "",
  SUBTITLE: "",
  PARAGRAPHS: [],
  INSTITUTION: "",
  INSTITUTIONABREV: "",
  FRASE: "",
  COMITE: [],
  LOCATION: "",
  ISSN_PRINT: "",
  ISSN_ONLINE: "",
  DOI_PREFIX: "",
  VOL: "",
  NUM: "",
  LICENSE: "",
  WEB: ""
};
var MENCION_MAP = {
  P: "Artes Pl\xE1sticas (Pintura, Qu\xEDmica Croma y An\xE1lisis Espectral)",
  E: "Artes Pl\xE1sticas (Escultura, Morfolog\xEDa y Geometr\xEDa Espacial)",
  G: "Artes Pl\xE1sticas y Visuales (Grabado, Biomateriales y Matrizer\xEDa)"
};
var PALETTE = {
  DARK_NAVY: [15, 23, 42],
  ACADEMIC_BLUE: [130, 158, 138],
  TERRACOTTA: [194, 65, 12],
  GOLD_ACCENT: [180, 130, 45],
  CREAM_BG: [255, 255, 255],
  LIGHT_BOX: [241, 245, 249],
  TEXT_DARK: [15, 23, 42],
  TEXT_BODY: [51, 65, 85],
  TEXT_MUTED: [100, 116, 139],
  WHITE: [255, 255, 255],
  BORDER: [203, 213, 225]
};
var FONT_GOTHIC = "SketchGothicSchool";
var FONT_MONO = "MLMMono8";
var FONT_HEI = "HEIDHwww";
var FONT_MODERN = "LModern";
var MARGINS = {
  TOP: 22,
  BOTTOM: 22,
  INNER: 25,
  OUTER: 20,
  HEAD_HEIGHT: 4.93
};
var getMargins = (pageNum, pageWidth, pageHeight) => {
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
    height: pageHeight - MARGINS.TOP - MARGINS.BOTTOM
  };
};
var getSafeFont = (doc, preferredFont, fallback = "helvetica") => {
  try {
    return doc.getFontList()[preferredFont] ? preferredFont : fallback;
  } catch {
    return fallback;
  }
};
var setTextStyle = (doc, { font = "helvetica", style = "normal", size = 11, color = PALETTE.TEXT_DARK }) => {
  doc.setFont(getSafeFont(doc, font), style);
  doc.setFontSize(size);
  doc.setTextColor(...color);
};
var safeAddImage = (doc, base64Str, format, x, y, w, h) => {
  if (!base64Str || typeof base64Str !== "string")
    return;
  try {
    const src = base64Str.startsWith("data:") ? base64Str : `data:image/${format.toLowerCase()};base64,${base64Str}`;
    doc.addImage(src, format.toUpperCase(), x, y, w, h, void 0, "FAST");
  } catch (err) {
    console.warn("Advertencia: No se pudo renderizar la imagen en el PDF:", err);
  }
};
var drawInnerPageHeader = (doc, pageTitle, pageNum, pageWidth, journalInfo) => {
  const m = getMargins(pageNum, pageWidth, 297);
  doc.setFillColor(...PALETTE.CREAM_BG);
  doc.rect(0, 0, pageWidth, 297, "F");
  const headerY = m.top - MARGINS.HEAD_HEIGHT;
  setTextStyle(doc, { font: FONT_MODERN, style: "normal", size: 11, color: PALETTE.TEXT_MUTED });
  doc.text(`ISSN: ${journalInfo.ISSN_ONLINE} (en l\xEDnea) \u2022 ${pageTitle}`, m.right, headerY, { align: "right" });
  doc.setDrawColor(...PALETTE.BORDER);
  doc.setLineWidth(0.3);
  doc.line(m.left, m.top - 2, m.right, m.top - 2);
};
var drawInnerPageFooter = (doc, pageNum, pageWidth, pageHeight, journalInfo) => {
  const m = getMargins(pageNum, pageWidth, pageHeight);
  const footerY = m.bottom + 7;
  doc.setDrawColor(...PALETTE.BORDER);
  doc.setLineWidth(0.3);
  doc.line(m.left, m.bottom + 2, m.right, m.bottom + 2);
  setTextStyle(doc, { font: FONT_MODERN, style: "normal", size: 11, color: PALETTE.TEXT_MUTED });
  doc.text(`Publicaci\xF3n arbitrada e indexada bajo licencia ${journalInfo.LICENSE}`, m.left, footerY);
  doc.text(`P\xE1gina ${pageNum}`, m.right, footerY, { align: "right" });
};
var generateMagazineNewSections = (data = [], cicle = "1", customJournalInfo) => {
  const infoDataParent = __spreadValues(__spreadValues({}, DEFAULT_INFO_DATA), customJournalInfo);
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear().toString();
  let user = { name: "Investigador / Artista Destacado", mencion: "" };
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser)
        user = JSON.parse(storedUser);
    } catch (e) {
      console.error("Error al leer usuario de localStorage:", e);
    }
  }
  const userMencionText = MENCION_MAP[user.mencion || ""] || "Artes Pl\xE1sticas, Visuales y Ciencias del Arte";
  const doc = new E({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });
  const registerFont = (fontData, fileName2, fontAlias) => {
    if (fontData && typeof fontData === "string") {
      try {
        const cleanBase64 = fontData.includes(",") ? fontData.split(",")[1] : fontData;
        doc.addFileToVFS(fileName2, cleanBase64);
        doc.addFont(fileName2, fontAlias, "normal");
      } catch (e) {
        console.error(`Error registrando la fuente ${fontAlias}:`, e);
      }
    }
  };
  registerFont(wfont, "SketchGothicSchool.ttf", FONT_GOTHIC);
  registerFont(fonnt, "HEIDH.ttf", FONT_HEI);
  registerFont(ffontt, "MLMMono8.ttf", FONT_MONO);
  registerFont(wwfont, "LModern.ttf", FONT_MODERN);
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const m1 = getMargins(1, pageWidth, pageHeight);
  doc.setFillColor(...PALETTE.DARK_NAVY);
  doc.rect(0, 0, pageWidth, pageHeight, "F");
  doc.setFillColor(...PALETTE.TERRACOTTA);
  doc.rect(0, pageHeight - 50, pageWidth, 50, "F");
  doc.setFillColor(...PALETTE.GOLD_ACCENT);
  doc.rect(0, 0, pageWidth, 3.5, "F");
  let currentY = m1.top + 2;
  setTextStyle(doc, { font: FONT_MODERN, size: 9, color: PALETTE.TEXT_MUTED });
  doc.text((infoDataParent.INSTITUTION || "INSTITUCI\xD3N ACAD\xC9MICA").toUpperCase(), pageWidth / 2, currentY, { align: "center" });
  currentY += 5;
  setTextStyle(doc, { font: FONT_MODERN, style: "normal", size: 8.5, color: PALETTE.TEXT_MUTED });
  doc.text(`ISSN-L ${infoDataParent.ISSN_PRINT} | ${infoDataParent.VOL}, ${infoDataParent.NUM}`, pageWidth / 2, currentY, { align: "center" });
  currentY += 16;
  setTextStyle(doc, { font: FONT_MODERN, style: "normal", size: 26, color: PALETTE.ACADEMIC_BLUE });
  const titleText = doc.splitTextToSize(infoDataParent.TITLE || "T\xEDtulo del Volumen Acad\xE9mico", m1.width);
  doc.text(titleText, pageWidth / 2, currentY, { align: "center" });
  currentY += titleText.length * 8.5 + 6;
  setTextStyle(doc, { font: FONT_MODERN, style: "normal", size: 10, color: PALETTE.TEXT_BODY });
  const subtitleText = doc.splitTextToSize(infoDataParent.SUBTITLE || "", m1.width);
  doc.text(subtitleText, pageWidth / 2, currentY, { align: "center" });
  currentY += subtitleText.length * 4.5 + 10;
  safeAddImage(doc, logo, "JPEG", pageWidth / 2 - 24, currentY, 48, 46);
  currentY += 46 + 14;
  setTextStyle(doc, { font: FONT_MODERN, size: 9.5, color: PALETTE.TERRACOTTA });
  doc.text("DOSSIER DE INVESTIGACI\xD3N PL\xC1STICA Y CIENT\xCDFICA (STEAM)", pageWidth / 2, currentY, { align: "center" });
  currentY += 6;
  setTextStyle(doc, { font: FONT_MODERN, size: 8, color: PALETTE.WHITE });
  doc.text("INVESTIGADOR / AUTOR REGISTRADO", pageWidth / 2, currentY, { align: "center" });
  currentY += 5;
  setTextStyle(doc, { font: FONT_MODERN, style: "normal", size: 11.5, color: PALETTE.WHITE });
  const formattedName = (user.name || "Investigador Destacado").toUpperCase();
  doc.text(formattedName, pageWidth / 2, currentY, { align: "center" });
  currentY += 5.5;
  setTextStyle(doc, { font: FONT_MODERN, style: "normal", size: 8.5, color: PALETTE.BORDER });
  doc.text(`Especialidad / L\xEDnea: ${userMencionText}`, pageWidth / 2, currentY, { align: "center" });
  currentY += 4.5;
  doc.text(`Edici\xF3n: ${infoDataParent.VOL} \u2014 ${infoDataParent.NUM} (${infoDataParent.YEAR})`, pageWidth / 2, currentY, { align: "center" });
  const containerTopY = pageHeight - 50;
  const footerBlockY = containerTopY + 8;
  setTextStyle(doc, { font: FONT_MODERN, size: 8.5, color: PALETTE.WHITE });
  doc.text("REGISTRO AUDITADO DE PRODUCCI\xD3N ACAD\xC9MICA Y EPISTEMOLOG\xCDA VISUAL", pageWidth / 2, footerBlockY, { align: "center" });
  setTextStyle(doc, { font: FONT_MODERN, style: "normal", size: 8, color: PALETTE.LIGHT_BOX });
  const certText = doc.splitTextToSize("Documento verificado por la Direcci\xF3n de Investigaci\xF3n y Registro Acad\xE9mico. Certifica la validez de los experimentos de cromatograf\xEDa, geometr\xEDa fractal e iconograf\xEDa regional.", m1.width - 20);
  doc.text(certText, pageWidth / 2, footerBlockY + 4, { align: "center" });
  safeAddImage(doc, logowww, "JPEG", pageWidth / 2 - 22.5, containerTopY - 55, 45, 45);
  setTextStyle(doc, { font: FONT_MODERN, style: "normal", size: 8, color: PALETTE.WHITE });
  doc.text(`${infoDataParent.LOCATION} | DOI: ${infoDataParent.DOI_PREFIX}`, pageWidth / 2, pageHeight - 6, { align: "center" });
  doc.addPage();
  const m2 = getMargins(2, pageWidth, pageHeight);
  drawInnerPageHeader(doc, "EDITORIAL & COMIT\xC9 CIENT\xCDFICO", 2, pageWidth, infoDataParent);
  const colWidthLeft = m2.width * 0.6 - 4;
  const colWidthRight = m2.width * 0.4 - 4;
  const rightColX = m2.left + colWidthLeft + 8;
  setTextStyle(doc, { font: FONT_MODERN, size: 11, color: PALETTE.TERRACOTTA });
  doc.text("ART\xCDCULO EDITORIAL", m2.left, m2.top + 5);
  setTextStyle(doc, { font: FONT_MODERN, style: "normal", size: 15, color: PALETTE.TEXT_DARK });
  const editorialTitleLines = doc.splitTextToSize("Convergencia entre Artes y Ciencias: Epistemolog\xEDa y An\xE1lisis del Color", colWidthLeft);
  doc.text(editorialTitleLines, m2.left, m2.top + 13);
  const titleBottomY = m2.top + 13 + editorialTitleLines.length * 6;
  doc.setFillColor(...PALETTE.GOLD_ACCENT);
  doc.rect(m2.left, titleBottomY + 3, 1.5, 14, "F");
  setTextStyle(doc, { font: FONT_MODERN, style: "normal", size: 11, color: PALETTE.TEXT_BODY });
  const quoteText = doc.splitTextToSize(`${infoDataParent.FRASE}`, colWidthLeft - 6);
  doc.text(quoteText, m2.left + 4, titleBottomY + 6);
  let pY = titleBottomY + 24;
  infoDataParent.PARAGRAPHS.forEach((pText) => {
    const splitP = doc.splitTextToSize(pText, colWidthLeft);
    doc.text(splitP, m2.left, pY);
    pY += splitP.length * 5 + 4;
  });
  setTextStyle(doc, { font: FONT_MODERN, size: 11, color: PALETTE.TEXT_DARK });
  doc.text("Direcci\xF3n Cient\xEDfica y Decanato de Investigaci\xF3n", m2.left, pY + 2);
  setTextStyle(doc, { font: FONT_MODERN, style: "normal", size: 11, color: PALETTE.TEXT_MUTED });
  doc.text(`${infoDataParent.INSTITUTIONABREV}`, m2.left, pY + 7);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(rightColX - 4, m2.top, rightColX - 4, m2.bottom);
  doc.setFillColor(...PALETTE.LIGHT_BOX);
  doc.rect(rightColX, m2.top, colWidthRight, m2.height, "F");
  setTextStyle(doc, { font: FONT_MODERN, size: 8, color: PALETTE.TEXT_DARK });
  doc.text("COMIT\xC9 CIENT\xCDFICO Y ARBITRAJE", rightColX + 4, m2.top + 6);
  doc.setDrawColor(...PALETTE.TERRACOTTA);
  doc.setLineWidth(0.8);
  doc.line(rightColX + 4, m2.top + 8.5, rightColX + 26, m2.top + 8.5);
  let currentYComite = m2.top + 15;
  infoDataParent.COMITE.forEach((item) => {
    setTextStyle(doc, { font: FONT_MODERN, size: 8, color: PALETTE.TERRACOTTA });
    doc.text(item.label, rightColX + 4, currentYComite);
    setTextStyle(doc, { font: FONT_MODERN, style: "normal", size: 8, color: [30, 41, 59] });
    const splitVal = doc.splitTextToSize(item.val, colWidthRight - 8);
    doc.text(splitVal, rightColX + 4, currentYComite + 4);
    currentYComite += 7 + splitVal.length * 4.2;
  });
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...PALETTE.BORDER);
  doc.rect(rightColX + 4, currentYComite + 2, colWidthRight - 8, 26, "FD");
  setTextStyle(doc, { font: FONT_MODERN, size: 8, color: PALETTE.TEXT_DARK });
  doc.text("INDIZACI\xD3N Y BASES DE DATOS:", rightColX + 6, currentYComite + 7);
  setTextStyle(doc, { font: FONT_MODERN, style: "normal", size: 8, color: PALETTE.TEXT_MUTED });
  doc.text("\u2022 Latindex Cat\xE1logo 2.0\n\u2022 REDIB / DOAJ System\n\u2022 Crossref DOI Register\n\u2022 Google Scholar STEAM", rightColX + 6, currentYComite + 12);
  drawInnerPageFooter(doc, 2, pageWidth, pageHeight, infoDataParent);
  let currentPageNum = 3;
  doc.addPage();
  let mCurrent = getMargins(currentPageNum, pageWidth, pageHeight);
  drawInnerPageHeader(doc, "SUMARIO DE CONTENIDOS", currentPageNum, pageWidth, infoDataParent);
  setTextStyle(doc, { font: FONT_MODERN, style: "normal", size: 14, color: PALETTE.TEXT_DARK });
  doc.text("Sumario Anal\xEDtico de Investigaci\xF3n", mCurrent.left, mCurrent.top + 6);
  setTextStyle(doc, { font: FONT_MODERN, style: "normal", size: 11, color: PALETTE.TEXT_MUTED });
  doc.text("ESTRUCTURA DE ART\xCDCULOS CIENT\xCDFICOS", mCurrent.left, mCurrent.top + 12);
  doc.setDrawColor(...PALETTE.TEXT_DARK);
  doc.setLineWidth(0.4);
  doc.line(mCurrent.left, mCurrent.top + 15, mCurrent.right, mCurrent.top + 15);
  const defaultScientificArticles = [
    {
      page: "01",
      number: "ART-01",
      title: "Portada Oficial, Datos de Registro e Indizaci\xF3n DOI",
      user: "DIRECCI\xD3N DE INVESTIGACI\xD3N Y REGISTRO ACAD\xC9MICO",
      description: "Ficha de presentaci\xF3n, asignaci\xF3n de c\xF3digo DOI y certificaci\xF3n institucional."
    },
    {
      page: "02",
      number: "ART-02",
      title: "Editorial: Convergencia entre Artes y Ciencias en el Per\xFA",
      user: "COMIT\xC9 CIENT\xCDFICO ARBITRADO",
      description: "An\xE1lisis epistemol\xF3gico sobre la ciencia de los materiales de arte y el m\xE9todo cient\xEDfico visual."
    }
  ];
  const indexSections = [
    {
      header: "SECCI\xD3N I: MARCO INSTITUCIONAL Y METADATOS EDITORIALES",
      items: defaultScientificArticles
    },
    {
      header: "SECCI\xD3N II: PROYECTOS DE INVESTIGACI\xD3N ARTE-CIENCIA Y EVALUACI\xD3N",
      items: data.length > 0 ? data : [
        {
          number: "INV-01",
          title: "An\xE1lisis Cromatogr\xE1fico de Pigmentos Naturales en la Pintura Andina",
          user: user.name || "Estudiante Investigador",
          description: "Estudio espectrogr\xE1fico de aglutinantes org\xE1nicos y fijaci\xF3n en lienzos de lino tradicional."
        },
        {
          number: "INV-02",
          title: "Morfolog\xEDa Espacial y Geometr\xEDa en la Escultura Contempor\xE1nea",
          user: user.name || "Estudiante Investigador",
          description: "Modelado tridimensional sustentado en fractales y resistencia de aleaciones en fundici\xF3n."
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
      drawInnerPageHeader(doc, "SUMARIO DE CONTENIDOS", currentPageNum, pageWidth, infoDataParent);
      indexY = mCurrent.top;
    }
    doc.setFillColor(...PALETTE.ACADEMIC_BLUE);
    doc.rect(mCurrent.left, indexY, mCurrent.width, 6, "F");
    setTextStyle(doc, { font: FONT_MODERN, size: 10, color: PALETTE.WHITE });
    doc.text(sec.header, mCurrent.left + 4, indexY + 4);
    indexY += 9;
    sec.items.forEach((item) => {
      const title = item.title || "T\xEDtulo del Proyecto";
      const desc = item.description || "Sin descripci\xF3n disponible.";
      setTextStyle(doc, { font: FONT_MODERN, size: 10 });
      const splitTitle = doc.splitTextToSize(title, mCurrent.width - 18);
      setTextStyle(doc, { font: FONT_MODERN, style: "normal", size: 10 });
      const splitDesc = doc.splitTextToSize(desc, mCurrent.width - 18);
      const itemHeight = 9 + splitTitle.length * 4.2 + splitDesc.length * 4.2;
      if (indexY + itemHeight > mCurrent.bottom) {
        drawInnerPageFooter(doc, currentPageNum, pageWidth, pageHeight, infoDataParent);
        doc.addPage();
        currentPageNum++;
        mCurrent = getMargins(currentPageNum, pageWidth, pageHeight);
        drawInnerPageHeader(doc, "SUMARIO DE CONTENIDOS", currentPageNum, pageWidth, infoDataParent);
        indexY = mCurrent.top;
      }
      setTextStyle(doc, { font: FONT_MODERN, style: "normal", size: 10, color: PALETTE.TERRACOTTA });
      doc.text(item.page || item.number || "ART-00", mCurrent.left, indexY + 3);
      setTextStyle(doc, { font: FONT_MODERN, size: 10, color: PALETTE.TEXT_DARK });
      doc.text(splitTitle, mCurrent.left + 15, indexY + 3);
      const titleOffsetY = indexY + 3 + splitTitle.length * 4.2;
      setTextStyle(doc, { font: "courier", style: "normal", size: 10, color: PALETTE.ACADEMIC_BLUE });
      doc.text(item.user || "Autor no especificado", mCurrent.left + 15, titleOffsetY);
      setTextStyle(doc, { font: FONT_MODERN, style: "normal", size: 10, color: [71, 85, 105] });
      doc.text(splitDesc, mCurrent.left + 15, titleOffsetY + 4.5);
      const lineY = titleOffsetY + 4.5 + splitDesc.length * 4.2;
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.2);
      doc.line(mCurrent.left + 15, lineY, mCurrent.right, lineY);
      indexY = lineY + 5;
    });
    indexY += 2;
  });
  const noteY = Math.min(indexY + 2, mCurrent.bottom - 20);
  setTextStyle(doc, { font: FONT_MODERN, size: 10, color: PALETTE.TERRACOTTA });
  doc.text("DECLARACI\xD3N DE AUDITOR\xCDA CIENT\xCDFICA Y PROPIEDAD INTELECTUAL", mCurrent.left + 4, noteY + 3);
  setTextStyle(doc, { font: FONT_MODERN, style: "normal", size: 10, color: [68, 64, 60] });
  const noteText = doc.splitTextToSize("Los proyectos de investigaci\xF3n y an\xE1lisis cromatogr\xE1ficos han sido arbitrados mediante evaluaci\xF3n ciega por pares. Los derechos morales pertenecen a los autores bajo la reglamentaci\xF3n institucional.", mCurrent.width - 8);
  doc.text(noteText, mCurrent.left + 4, noteY + 8);
  drawInnerPageFooter(doc, currentPageNum, pageWidth, pageHeight, infoDataParent);
  const pdfBlob = doc.output("blob");
  const sanitizedUserName = (user.name || "Estudiante").replace(/[^a-zA-Z0-9_-]/g, "_");
  const fileName = `Revista_Cientifica_ArtesCiencias_${sanitizedUserName}_Ciclo_${cicle}.pdf`;
  if (typeof File !== "undefined") {
    return new File([pdfBlob], fileName, { type: "application/pdf" });
  }
  return pdfBlob;
};
export {
  generateMagazineNewSections
};
//# sourceMappingURL=chunk-LBDWURUI.js.map
