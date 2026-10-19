import './polyfills.server.mjs';
import {
  ffontt
} from "./chunk-SU5OLLYA.mjs";
import {
  fonnt,
  wfont
} from "./chunk-2ZO6A3HM.mjs";
import {
  wwfont
} from "./chunk-OSFHO3EH.mjs";
import {
  logo,
  logofisart,
  logoperu
} from "./chunk-N7IN2DN5.mjs";
import {
  require_jspdf_node_min
} from "./chunk-6AXZZUXX.mjs";
import {
  __spreadValues,
  __toESM
} from "./chunk-TB3YAHZW.mjs";

// src/app/componentes/articuloback.ts
var import_jspdf = __toESM(require_jspdf_node_min());
var DEFAULT_JOURNAL_INFO = {
  TITLE: "ARTES & VISI\xD3N",
  YEAR: "2026",
  SUBTITLE: "\xD3RGANO DE DIFUSI\xD3N CIENT\xCDFICO-PL\xC1STICA",
  INSTITUTION: 'Escuela Superior de Bellas Artes P\xFAblica "Felipe Guam\xE1n Poma de Ayala"',
  LOCATION: "Ayacucho, Per\xFA",
  ISSN_PRINT: "2708-8324",
  ISSN_ONLINE: "2708-8332",
  DOI_PREFIX: "10.5281/zenodo",
  VOL: "1",
  NUM: "1",
  LICENSE: "CC BY-NC-SA 4.0 INTERNATIONAL",
  WEB: "www.esfapayacucho.edu.pe"
};
var MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Setiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];
var MENCION_MAP = {
  P: "ARTES PL\xC1STICAS (Pintura y Semi\xF3tica Visual)",
  E: "ARTES PL\xC1STICAS (Escultura y Morfolog\xEDa Espacial)",
  G: "ARTES PL\xC1STICAS Y VISUALES (Grabado e Investigaci\xF3n Gr\xE1fica)"
};
var FONT_SKETCH = "SketchGothicSchool";
var FONT_HEI = "HEIDHwww";
var FONT_MONO = "MLMMono8";
var FONT_MODERN = "LModern";
var MARGIN_CONFIG = {
  TOP: 25,
  BOTTOM: 25,
  INNER: 30,
  OUTER: 20,
  HEAD_HEIGHT: 4.94
};
var getMargins = (pageNum, pageWidth, pageHeight) => {
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
    height: pageHeight - MARGIN_CONFIG.TOP - MARGIN_CONFIG.BOTTOM
  };
};
var registerCustomFont = (doc, fontData, fileName, fontAlias) => {
  if (fontData && typeof fontData === "string") {
    try {
      const cleanBase64 = fontData.includes(",") ? fontData.split(",")[1] : fontData;
      doc.addFileToVFS(fileName, cleanBase64);
      doc.addFont(fileName, fontAlias, "normal");
    } catch (e) {
      console.warn(`No se pudo registrar la fuente ${fontAlias}:`, e);
    }
  }
};
var setSafeFont = (doc, fontAlias, style = "normal", size = 9, color = [18, 24, 38]) => {
  try {
    const available = doc.getFontList();
    const fontToUse = available[fontAlias] ? fontAlias : "helvetica";
    doc.setFont(fontToUse, style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
  } catch {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
  }
};
var generateMagazineSections = (year, cicle = "1", journalInfoParam) => {
  const infoDataParent = __spreadValues(__spreadValues({}, DEFAULT_JOURNAL_INFO), journalInfoParam);
  let user = { name: "Investigador / Estudiante", mencion: "" };
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser)
        user = JSON.parse(storedUser);
    } catch (e) {
      console.error("Error al leer usuario de localStorage:", e);
    }
  }
  const now = /* @__PURE__ */ new Date();
  const formattedDate = `${MONTHS[now.getMonth()]} ${now.getFullYear()}`;
  const userMencionText = MENCION_MAP[user.mencion || ""] || "ARTES PL\xC1STICAS E INVESTIGACI\xD3N VISUAL";
  const doc = new import_jspdf.jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });
  doc.setProperties({
    title: `${infoDataParent.TITLE} Publicaci\xF3n de Ciencias y Artes (${year})`,
    subject: `Dossier de Investigaci\xF3n Pl\xE1stica - Vol. ${infoDataParent.VOL} N\xB0 ${infoDataParent.NUM}`,
    author: user.name || infoDataParent.INSTITUTION,
    keywords: "Artes, Ciencias, Epistemolog\xEDa Visual, Investigaci\xF3n Pl\xE1stica, STEAM, \xC9tica Editorial",
    creator: infoDataParent.INSTITUTION
  });
  registerCustomFont(doc, wfont, "SketchGothicSchool.ttf", FONT_SKETCH);
  registerCustomFont(doc, fonnt, "GOTHIC.ttf", FONT_HEI);
  registerCustomFont(doc, ffontt, "MODERN.ttf", FONT_MONO);
  registerCustomFont(doc, wwfont, "LMODERN.ttf", FONT_MODERN);
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const m1 = getMargins(1, pageWidth, pageHeight);
  doc.setFillColor(250, 249, 246);
  doc.rect(0, 0, pageWidth, pageHeight, "F");
  const headerY1 = m1.top - MARGIN_CONFIG.HEAD_HEIGHT;
  setSafeFont(doc, FONT_MODERN, "normal", 7.5, [140, 140, 140]);
  doc.text("NORMAS EDITORIALES, C\xD3DIGO DE \xC9TICA Y EVALUACI\xD3N POR PARES", m1.left, headerY1);
  doc.setDrawColor(210, 215, 220);
  doc.setLineWidth(0.3);
  doc.line(m1.left, m1.top - 2, m1.right, m1.top - 2);
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(215, 220, 225);
  doc.rect(m1.left, m1.top + 2, m1.width, 110, "FD");
  setSafeFont(doc, FONT_MODERN, "normal", 6.5, [150, 150, 150]);
  doc.text("DECLARACI\xD3N DE COMPROMISO ACAD\xC9MICO Y RIGOR CIENT\xCDFICO", m1.right - 4, m1.top + 7, { align: "right" });
  setSafeFont(doc, FONT_MODERN, "normal", 12, [194, 65, 12]);
  doc.text("C\xD3DIGO DE \xC9TICA Y DECLARACI\xD3N ANTI-PLAGIO", m1.left + 8, m1.top + 20);
  setSafeFont(doc, FONT_MODERN, "normal", 11, [15, 23, 42]);
  doc.text("Est\xE1ndares COPE (Committee on Publication Ethics)\nTransparencia en Artes y Ciencias", m1.left + 8, m1.top + 28);
  setSafeFont(doc, FONT_MODERN, "normal", 11, [51, 65, 85]);
  const ethicsText = doc.splitTextToSize(`La Revista Cient\xEDfica ${infoDataParent.TITLE} exige estricta originalidad e integridad cient\xEDfica en todas sus contribuciones. Todos los art\xEDculos y proyectos pl\xE1sticos son sometidos a verificaci\xF3n mediante software de coincidencia textual e inspecci\xF3n cromatogr\xE1fica de laboratorio. Los autores garantizan la autor\xEDa intelectual de las obras y la veracidad de los datos experimentales.`, m1.width - 16);
  doc.text(ethicsText, m1.left + 8, m1.top + 39.5);
  doc.setFillColor(15, 23, 42);
  doc.rect(m1.left + 8, m1.top + 65, m1.width - 8, 21, "F");
  setSafeFont(doc, FONT_MODERN, "normal", 11, [242, 167, 75]);
  doc.text(`LICENCIA EDITORIAL: ${infoDataParent.LICENSE}`, m1.left + 12, m1.top + 76);
  if (typeof logofisart !== "undefined" && logofisart) {
    try {
      const srcWww = logofisart.startsWith("data:") ? logofisart : `data:image/png;base64,${logofisart}`;
      doc.addImage(srcWww, "PNG", 38, m1.top + 91, 25, 12);
    } catch (e) {
      console.warn("No se pudo renderizar la imagen logofisart:", e);
    }
  }
  const gap = 6;
  const cardWidth = (m1.width - gap) / 2;
  doc.setFillColor(255, 255, 255);
  doc.rect(m1.left, m1.top + 118, cardWidth, 118, "FD");
  setSafeFont(doc, FONT_MODERN, "normal", 6.5, [150, 150, 150]);
  doc.text("SISTEMA ARBITRADO", m1.left + cardWidth - 4, m1.top + 123, { align: "right" });
  setSafeFont(doc, FONT_MODERN, "normal", 11, [15, 23, 42]);
  doc.text("EVALUACI\xD3N POR PARES\nCIEGOS (DOUBLE-BLIND)", m1.left + 6, m1.top + 133);
  setSafeFont(doc, FONT_MODERN, "normal", 11, [70, 70, 70]);
  const peerText = doc.splitTextToSize("Cada manuscrito o propuesta de investigaci\xF3n pl\xE1stica es evaluado por dos especialistas independientes seg\xFAn criterios de originalidad, metodolog\xEDa visual, an\xE1lisis crom\xE1tico/morfom\xE9trico y contribuci\xF3n a la epistemolog\xEDa andina.", cardWidth - 12);
  doc.text(peerText, m1.left + 6, m1.top + 148);
  setSafeFont(doc, FONT_MODERN, "normal", 11, [194, 65, 12]);
  doc.text(`arbitraje@${infoDataParent.WEB.replace("www.", "")}`, m1.left + 6, m1.top + 228);
  const rightCardX = m1.left + cardWidth + gap;
  doc.setFillColor(255, 255, 255);
  doc.rect(rightCardX, m1.top + 118, cardWidth, 118, "FD");
  setSafeFont(doc, FONT_MODERN, "normal", 6.5, [150, 150, 150]);
  doc.text("PRESERVACI\xD3N DIGITAL", rightCardX + cardWidth - 4, m1.top + 123, { align: "right" });
  setSafeFont(doc, FONT_MODERN, "normal", 11, [15, 23, 42]);
  doc.text("REPOSITORIO Y\nPRESERVACI\xD3N PKP-PN", rightCardX + 6, m1.top + 133);
  setSafeFont(doc, FONT_MODERN, "normal", 11, [70, 70, 70]);
  const archiveText = doc.splitTextToSize(`Los art\xEDculos aprobados quedan archivados permanentemente en la red de preservaci\xF3n LOCKSS/CLOCKSS y en el Repositorio Institucional con asignaci\xF3n de DOI (${infoDataParent.DOI_PREFIX}) para garantizar su trazabilidad.`, cardWidth - 12);
  doc.text(archiveText, rightCardX + 6, m1.top + 148);
  setSafeFont(doc, FONT_MODERN, "normal", 11, [194, 65, 12]);
  doc.text(`repositorio.${infoDataParent.WEB.replace("www.", "")}`, rightCardX + 6, m1.top + 228);
  setSafeFont(doc, FONT_MODERN, "normal", 11, [140, 140, 140]);
  doc.text("Normas Editoriales e Integridad Acad\xE9mica", m1.left, m1.bottom + 6);
  doc.addPage();
  const m2 = getMargins(2, pageWidth, pageHeight);
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, pageHeight, "F");
  doc.setFillColor(180, 130, 45);
  doc.rect(0, 0, pageWidth, 6, "F");
  doc.setFillColor(194, 65, 12);
  doc.rect(0, pageHeight - 45, pageWidth, 45, "F");
  setSafeFont(doc, FONT_MODERN, "normal", 8, [203, 213, 225]);
  doc.text(infoDataParent.INSTITUTION.toUpperCase(), pageWidth / 2, m2.top - 2, { align: "center" });
  setSafeFont(doc, FONT_MODERN, "normal", 8, [148, 163, 184]);
  doc.text(`UBICACI\xD3N: ${infoDataParent.LOCATION.toUpperCase()}`, pageWidth / 2, m2.top + 3, { align: "center" });
  if (typeof logo !== "undefined" && logo) {
    try {
      const srcLogo = logo.startsWith("data:") ? logo : `data:image/jpeg;base64,${logo}`;
      doc.addImage(srcLogo, "JPEG", pageWidth / 2 - 22, m2.top + 10, 43, 41);
    } catch (e) {
      console.warn("No se pudo renderizar el logo institucional:", e);
    }
  }
  setSafeFont(doc, FONT_MODERN, "normal", 24, [255, 255, 255]);
  const titleLines = doc.splitTextToSize(infoDataParent.TITLE, m2.width);
  doc.text(titleLines, pageWidth / 2, m2.top + 62, { align: "center" });
  setSafeFont(doc, FONT_MODERN, "normal", 8, [226, 232, 240]);
  const closingSummary = doc.splitTextToSize("Esta publicaci\xF3n documenta el desempe\xF1o lectivo, las evidencias de rigor t\xE9cnico y el desarrollo de la investigaci\xF3n pl\xE1stica del estudiante dentro de la instituci\xF3n. Documento auditado y reconocido con car\xE1cter oficial acreditativo.", m2.width - 20);
  doc.text(closingSummary, pageWidth / 2, m2.top + 78, { align: "center" });
  const boxWidth = m2.width - 10;
  const boxX = (pageWidth - boxWidth) / 2;
  doc.setFillColor(30, 41, 59);
  doc.setDrawColor(71, 85, 105);
  doc.setLineWidth(0.4);
  doc.rect(boxX, m2.top + 94, boxWidth, 44, "FD");
  setSafeFont(doc, FONT_MODERN, "normal", 8, [242, 167, 75]);
  doc.text("INVESTIGADOR / AUTOR REGISTRADO", pageWidth / 2, m2.top + 101, { align: "center" });
  setSafeFont(doc, FONT_MODERN, "normal", 11, [255, 255, 255]);
  const formattedName = (user.name || "Estudiante / Investigador Destacado").toUpperCase();
  doc.text(formattedName, pageWidth / 2, m2.top + 109, { align: "center" });
  setSafeFont(doc, FONT_MODERN, "normal", 8, [203, 213, 225]);
  doc.text(`Especialidad / L\xEDnea: ${userMencionText}`, pageWidth / 2, m2.top + 116, { align: "center" });
  doc.text(`Edici\xF3n: Vol. ${infoDataParent.VOL} \u2014 Num. ${infoDataParent.NUM} (${infoDataParent.YEAR})`, pageWidth / 2, m2.top + 123, { align: "center" });
  doc.text(`Fecha de Registro y Expedici\xF3n: ${formattedDate}`, pageWidth / 2, m2.top + 130, { align: "center" });
  doc.setFillColor(255, 255, 255);
  doc.rect(pageWidth / 2 - 30, m2.top + 142, 60, 16, "F");
  doc.setFillColor(15, 23, 42);
  const barX = pageWidth / 2 - 24;
  const barWidths = [1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2];
  let currentBarX = barX;
  barWidths.forEach((w, idx) => {
    if (idx % 2 === 0) {
      doc.rect(currentBarX, m2.top + 144, w, 8, "F");
    }
    currentBarX += w + 0.8;
  });
  setSafeFont(doc, FONT_MODERN, "normal", 7, [15, 23, 42]);
  doc.text(`ISSN-L ${infoDataParent.ISSN_PRINT} | DOI: ${infoDataParent.DOI_PREFIX}`, pageWidth / 2, m2.top + 164, { align: "center" });
  if (typeof logoperu !== "undefined" && logoperu) {
    try {
      const srcPeru = logoperu.startsWith("data:") ? logoperu : `data:image/jpeg;base64,${logoperu}`;
      doc.addImage(srcPeru, "JPEG", m2.left, pageHeight - 35, 22, 22);
    } catch (e) {
      console.warn("No se pudo renderizar logoperu:", e);
    }
  }
  setSafeFont(doc, FONT_MODERN, "normal", 11, [255, 255, 255]);
  doc.text("DIRECCI\xD3N DE INVESTIGACI\xD3N Y REGISTRO ACAD\xC9MICO", m2.left + 28, pageHeight - 27);
  setSafeFont(doc, FONT_MODERN, "normal", 7.5, [241, 245, 249]);
  doc.text(`${infoDataParent.LOCATION} \u2014 ${infoDataParent.WEB}`, m2.left + 28, pageHeight - 22);
  doc.text(`Contacto: revista@${infoDataParent.WEB.replace("www.", "")}`, m2.left + 28, pageHeight - 17);
  setSafeFont(doc, FONT_MODERN, "normal", 10, [255, 255, 255]);
  doc.text(`${infoDataParent.LOCATION} \u2014 ${infoDataParent.YEAR}`, m2.right, pageHeight - 10, { align: "right" });
  const pdfBlob = doc.output("blob");
  const sanitizedUserName = (user.name || "Estudiante").replace(/[^a-zA-Z0-9_-]/g, "_");
  const fileName = `Revista_Cientifica_${sanitizedUserName}_${year}.pdf`;
  if (typeof File !== "undefined") {
    return new File([pdfBlob], fileName, { type: "application/pdf" });
  }
  return pdfBlob;
};
export {
  generateMagazineSections
};
//# sourceMappingURL=chunk-MQY4HRCE.mjs.map
