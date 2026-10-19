import {
  require_browser
} from "./chunk-BJ3OIYMH.js";
import {
  autoTable
} from "./chunk-HVALOX5F.js";
import {
  CKEditorComponent,
  CKEditorModule,
  require_ckeditor
} from "./chunk-BVMCNHEU.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-OAEVIACX.js";
import {
  logo,
  logoperu
} from "./chunk-AWCERLVS.js";
import {
  E
} from "./chunk-USHPRP53.js";
import "./chunk-7YWLATDR.js";
import {
  ToastrService
} from "./chunk-JEAYVHF3.js";
import {
  environment
} from "./chunk-5ESGTH3B.js";
import {
  Navbar
} from "./chunk-U3CDTOVP.js";
import {
  isAuth
} from "./chunk-DJCOHPHY.js";
import {
  ThreeHtmlCanvasComponent
} from "./chunk-WGBKUFOR.js";
import "./chunk-FUFS4GQK.js";
import "./chunk-TPI4OM5L.js";
import "./chunk-ZUJZQ355.js";
import "./chunk-PFU5G7MY.js";
import {
  HttpClient
} from "./chunk-MMWGUNZC.js";
import {
  CommonModule,
  DatePipe,
  NgClass
} from "./chunk-6QD4DAAM.js";
import {
  Component,
  Injectable,
  ViewChild,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction3,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵviewQuery
} from "./chunk-FXWIEX65.js";
import {
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-3WPM564S.js";

// src/app/componentes/tramite.ts
var import_ckeditor5_build_classic = __toESM(require_ckeditor());

// src/app/componentes/tramitepdf.ts
var import_qrcode = __toESM(require_browser());
var PdfGeneratorService = class _PdfGeneratorService {
  async generateTramiteReport(tramite, remiter, pdfUrlLink) {
    const doc = new E({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const lineHeight = 4.2;
    if (logoperu) {
      doc.addImage(logoperu, "PNG", margin, 8, 21, 21);
    }
    if (logo) {
      doc.addImage(logo, "PNG", pageWidth - margin - 21, 8, 22, 21);
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("COMPROBANTE DE TRAMITE DOCUMENTARIO", pageWidth / 2, 22, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("DOCUMENTO OFICIAL DE SEGUIMIENTO", pageWidth / 2, 27, { align: "center" });
    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, 31, pageWidth - margin, 31);
    const qrData = pdfUrlLink || `https://tuservicio.gob.pe/tramite/${tramite._id || tramite.dni}`;
    const qrDataUrl = await import_qrcode.default.toDataURL(qrData, {
      width: 150,
      margin: 1,
      color: { dark: "#000000", light: "#ffffff" }
    });
    doc.addImage(qrDataUrl, "PNG", pageWidth - margin - 28, 34, 28, 28);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("INFORMACI\xD3N GENERAL", margin, 36);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const nombresCompleto = remiter ? `${remiter.nombres} ${remiter.apellidoPaterno} ${remiter.apellidoMaterno}` : `${tramite.nombres || ""} ${tramite.apellidopaterno || ""} ${tramite.apellidomaterno || ""}`.trim();
    const dniUsuario = remiter?.dni || tramite.dni || "N/A";
    const fechaCreacion = tramite.createdAt ? new Date(tramite.createdAt).toLocaleString("es-PE") : (/* @__PURE__ */ new Date()).toLocaleString("es-PE");
    let currentY = 42;
    doc.text(`Solicitante: ${nombresCompleto}`, margin, currentY);
    currentY += lineHeight;
    doc.text(`DNI / Documento: ${dniUsuario}`, margin, currentY);
    currentY += lineHeight;
    doc.text(`Fecha de Emisi\xF3n: ${fechaCreacion}`, margin, currentY);
    currentY += lineHeight;
    const splitTitle = doc.splitTextToSize(`Asunto: ${tramite.title}`, pageWidth - margin * 2 - 32);
    doc.text(splitTitle, margin, currentY);
    currentY += splitTitle.length * lineHeight + 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("DETALLE / RESUMEN", margin, currentY);
    currentY += 4;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const formattedDetail = this.parseHtmlToPlainText(tramite.detail || "");
    const splitDetail = doc.splitTextToSize(formattedDetail || "Sin detalle provisto.", pageWidth - margin * 2);
    doc.text(splitDetail, margin, currentY);
    currentY += splitDetail.length * lineHeight + 6;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("HISTORIAL DE PROVE\xCDDOS Y DEPENDENCIAS", margin, currentY);
    currentY += 2;
    const tableRows = (tramite.proveido || []).map((p, index) => [
      (index + 1).toString(),
      p.dependencel || "General",
      p.user || "Sistema",
      p.createdAt ? new Date(p.createdAt).toLocaleDateString("es-PE") : "-",
      p.recibido ? new Date(p.recibido).toLocaleDateString("es-PE") : "Pendiente",
      p.archivado ? new Date(p.archivado).toLocaleDateString("es-PE") : "En Tr\xE1nsito"
    ]);
    autoTable(doc, {
      startY: currentY,
      head: [["#", "Dependencia Destino", "Enviado por", "Fecha Env\xEDo", "Recibido", "Estado/Archivado"]],
      body: tableRows,
      theme: "striped",
      headStyles: {
        fillColor: [30, 60, 114],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 8,
        cellPadding: 2
      },
      bodyStyles: {
        fontSize: 8,
        cellPadding: 2
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250]
      },
      margin: { left: margin, right: margin }
    });
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(120);
      doc.text(`P\xE1gina ${i} de ${totalPages} - Escanee el c\xF3digo QR para validar la autenticidad del documento.`, pageWidth / 2, pageHeight - 8, { align: "center" });
    }
    doc.save(`Tramite_${dniUsuario}_${Date.now()}.pdf`);
  }
  /**
   * Convierte HTML limpio evitando saltos de línea excesivos.
   */
  parseHtmlToPlainText(html) {
    if (!html)
      return "";
    let cleanText = html.replace(/<\/p>/gi, "\n").replace(/<br\s*[\/]?>/gi, "\n").replace(/<li>/gi, "  \u2022 ").replace(/<p>/gi, "- ").replace(/<\/li>/gi, "\n").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    cleanText = cleanText.replace(/<[^>]*>?/gm, "");
    return cleanText.replace(/\n\s*\n/g, "\n").trim();
  }
  static \u0275fac = function PdfGeneratorService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PdfGeneratorService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PdfGeneratorService, factory: _PdfGeneratorService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PdfGeneratorService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/componentes/tramite.ts
var _c0 = ["fileInput"];
var _c1 = (a0, a1, a2) => ({ "bg-danger text-white border-danger": a0, "bg-light text-dark border-light": a1, "bg-success text-white border-success": a2 });
var _forTrack0 = ($index, $item) => $item._id || $index;
var _forTrack1 = ($index, $item) => $item.value;
function CreateNoteComponent_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("(", user_r1.cargo, ")");
  }
}
function CreateNoteComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 4);
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, CreateNoteComponent_Conditional_4_Conditional_2_Template, 2, 1, "span", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r1 = ctx;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", user_r1.name, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(user_r1.cargo ? 2 : -1);
  }
}
function CreateNoteComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "app-three-html-canvas");
    \u0275\u0275elementEnd();
  }
}
function CreateNoteComponent_Conditional_14_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r4 = ctx.$implicit;
    \u0275\u0275property("value", opt_r4.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r4.label);
  }
}
function CreateNoteComponent_Conditional_14_For_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r5 = ctx.$implicit;
    \u0275\u0275property("value", opt_r5.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r5.label);
  }
}
function CreateNoteComponent_Conditional_14_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275text(1, " Por favor, ingrese un correo electr\xF3nico v\xE1lido. ");
    \u0275\u0275elementEnd();
  }
}
function CreateNoteComponent_Conditional_14_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275text(1, " Ingrese un n\xFAmero de celular v\xE1lido (m\xEDnimo 9 d\xEDgitos). ");
    \u0275\u0275elementEnd();
  }
}
function CreateNoteComponent_Conditional_14_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "ckeditor", 37);
    \u0275\u0275listener("ngModelChange", function CreateNoteComponent_Conditional_14_Conditional_50_Template_ckeditor_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.detail.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(2, "button", 38);
    \u0275\u0275listener("click", function CreateNoteComponent_Conditional_14_Conditional_50_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r6);
      \u0275\u0275nextContext();
      const fileInput_r7 = \u0275\u0275reference(15);
      return \u0275\u0275resetView(fileInput_r7.click());
    });
    \u0275\u0275element(3, "i", 39);
    \u0275\u0275text(4, " Cargar archivo adjunto ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("editor", ctx_r2.Editor)("config", ctx_r2.editorConfig)("ngModel", ctx_r2.detail());
  }
}
function CreateNoteComponent_Conditional_14_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275text(1, " Rellene todos los campos necesarios (email, celular y asunto) para generar la descripci\xF3n y cargar archivo. ");
    \u0275\u0275elementEnd();
  }
}
function CreateNoteComponent_Conditional_14_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36)(1, "div", 40)(2, "span")(3, "strong");
    \u0275\u0275text(4, "Nombre:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7, "Tama\xF1o:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 41);
    \u0275\u0275listener("click", function CreateNoteComponent_Conditional_14_Conditional_52_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.fileData.set({ file: null, name: "", size: 0, type: "" }));
    });
    \u0275\u0275text(10, " Cerrar ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 42);
    \u0275\u0275listener("click", function CreateNoteComponent_Conditional_14_Conditional_52_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.sendSurvey());
    });
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r2.fileData().name, " | ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", (ctx_r2.fileData().size / (1024 * 1024)).toFixed(2), " MB ");
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r2.loading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.loading() ? "Enviando..." : "Enviar tr\xE1mite con archivo", " ");
  }
}
function CreateNoteComponent_Conditional_14_Conditional_53_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", function CreateNoteComponent_Conditional_14_Conditional_53_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.sendSurvey());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r2.loading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.loading() ? "Enviando..." : "Enviar tr\xE1mite sin archivo", " ");
  }
}
function CreateNoteComponent_Conditional_14_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CreateNoteComponent_Conditional_14_Conditional_53_Conditional_0_Template, 2, 2, "button", 43);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r2.email() && ctx_r2.celular() && ctx_r2.title() ? 0 : -1);
  }
}
function CreateNoteComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 18)(2, "strong");
    \u0275\u0275text(3, "Nombres:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6, "Apellido Paterno:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275elementStart(8, "strong");
    \u0275\u0275text(9, "Apellido Materno:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementStart(11, "strong");
    \u0275\u0275text(12, "DNI:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementStart(14, "input", 19, 0);
    \u0275\u0275listener("change", function CreateNoteComponent_Conditional_14_Template_input_change_14_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.handleFileSelect($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 20)(17, "div", 21)(18, "label", 22);
    \u0275\u0275text(19, "Dependencia a enviar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "select", 23);
    \u0275\u0275listener("ngModelChange", function CreateNoteComponent_Conditional_14_Template_select_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDependenceChange($event));
    })("change", function CreateNoteComponent_Conditional_14_Template_select_change_20_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onFieldBlur());
    });
    \u0275\u0275repeaterCreate(21, CreateNoteComponent_Conditional_14_For_22_Template, 2, 2, "option", 24, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 21)(24, "label", 25);
    \u0275\u0275text(25, "Tipo de documento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "select", 23);
    \u0275\u0275listener("ngModelChange", function CreateNoteComponent_Conditional_14_Template_select_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onTipoChange($event));
    })("change", function CreateNoteComponent_Conditional_14_Template_select_change_26_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onFieldBlur());
    });
    \u0275\u0275repeaterCreate(27, CreateNoteComponent_Conditional_14_For_28_Template, 2, 2, "option", 24, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 21)(30, "label", 22);
    \u0275\u0275text(31, "Correo electr\xF3nico (necesario)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "input", 26);
    \u0275\u0275listener("ngModelChange", function CreateNoteComponent_Conditional_14_Template_input_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.email.set($event));
    })("blur", function CreateNoteComponent_Conditional_14_Template_input_blur_32_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onFieldBlur());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(33, CreateNoteComponent_Conditional_14_Conditional_33_Template, 2, 0, "div", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 28)(35, "label", 22);
    \u0275\u0275text(36, "Celular (necesario)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "input", 29);
    \u0275\u0275listener("ngModelChange", function CreateNoteComponent_Conditional_14_Template_input_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.celular.set($event));
    })("blur", function CreateNoteComponent_Conditional_14_Template_input_blur_37_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onFieldBlur());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(38, CreateNoteComponent_Conditional_14_Conditional_38_Template, 2, 0, "div", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 28)(40, "label", 22);
    \u0275\u0275text(41, "Nro. de Folios");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "input", 30);
    \u0275\u0275listener("ngModelChange", function CreateNoteComponent_Conditional_14_Template_input_ngModelChange_42_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.folios.set($event));
    })("blur", function CreateNoteComponent_Conditional_14_Template_input_blur_42_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onFieldBlur());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 31)(44, "label", 22);
    \u0275\u0275text(45, "Asunto (necesario)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "input", 32);
    \u0275\u0275listener("ngModelChange", function CreateNoteComponent_Conditional_14_Template_input_ngModelChange_46_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.title.set($event));
    })("blur", function CreateNoteComponent_Conditional_14_Template_input_blur_46_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onFieldBlur());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div", 33)(48, "label", 34);
    \u0275\u0275text(49, "Detalles");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(50, CreateNoteComponent_Conditional_14_Conditional_50_Template, 5, 3)(51, CreateNoteComponent_Conditional_14_Conditional_51_Template, 2, 0, "div", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(52, CreateNoteComponent_Conditional_14_Conditional_52_Template, 13, 4, "div", 36)(53, CreateNoteComponent_Conditional_14_Conditional_53_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const currentRemiter_r10 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", currentRemiter_r10.nombres, " | ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", currentRemiter_r10.apellidoPaterno, " | ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", currentRemiter_r10.apellidoMaterno, " | ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", currentRemiter_r10.dni, " ");
    \u0275\u0275advance(7);
    \u0275\u0275property("ngModel", ctx_r2.dependence().value);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.dependenceOptions);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r2.tipo().value);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.tipoOptions);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("is-invalid", ctx_r2.email() && !ctx_r2.isEmailValid(ctx_r2.email()));
    \u0275\u0275property("ngModel", ctx_r2.email());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.email() && !ctx_r2.isEmailValid(ctx_r2.email()) ? 33 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("is-invalid", ctx_r2.celular() && !ctx_r2.isCellValid(ctx_r2.celular()));
    \u0275\u0275property("ngModel", ctx_r2.celular());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.celular() && !ctx_r2.isCellValid(ctx_r2.celular()) ? 38 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.folios());
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.title());
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.email() && ctx_r2.celular() && ctx_r2.title() ? 50 : 51);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.fileData().file ? 52 : 53);
  }
}
function CreateNoteComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h4", 13);
    \u0275\u0275text(1, "Tr\xE1mites en Sistema");
    \u0275\u0275elementEnd();
  }
}
function CreateNoteComponent_For_18_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const number_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Creado: ", \u0275\u0275pipeBind2(2, 1, number_r12.createdAt, "medium"));
  }
}
function CreateNoteComponent_For_18_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 65);
    \u0275\u0275listener("click", function CreateNoteComponent_For_18_Conditional_22_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const \u0275$index_170_r14 = \u0275\u0275nextContext().$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.recibido(\u0275$index_170_r14, ""));
    });
    \u0275\u0275element(1, "i", 66);
    \u0275\u0275text(2, " Revisar ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const number_r12 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("href", ctx_r2.apiUrlfile + "/tramite/" + number_r12.file, \u0275\u0275sanitizeUrl);
  }
}
function CreateNoteComponent_For_18_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 67);
    \u0275\u0275listener("click", function CreateNoteComponent_For_18_Conditional_29_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const number_r12 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteSurvey(number_r12._id));
    });
    \u0275\u0275element(1, "i", 68);
    \u0275\u0275elementEnd();
  }
}
function CreateNoteComponent_For_18_For_32_Conditional_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 80);
    \u0275\u0275listener("click", function CreateNoteComponent_For_18_For_32_Conditional_5_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const \u0275$index_234_r18 = \u0275\u0275nextContext(2).$index;
      const \u0275$index_170_r14 = \u0275\u0275nextContext().$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.archivado(\u0275$index_170_r14, \u0275$index_234_r18));
    });
    \u0275\u0275element(1, "i", 81);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const nnumber_r19 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("disabled", !!nnumber_r19.archivado)("title", nnumber_r19.archivado ? "archivado" : "archivar");
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", nnumber_r19.archivado ? "#d1e7dd" : "#ffc107");
  }
}
function CreateNoteComponent_For_18_For_32_Conditional_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 82);
    \u0275\u0275listener("click", function CreateNoteComponent_For_18_For_32_Conditional_5_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const \u0275$index_234_r18 = \u0275\u0275nextContext(2).$index;
      const \u0275$index_170_r14 = \u0275\u0275nextContext().$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeSubTheme(\u0275$index_170_r14, \u0275$index_234_r18));
    });
    \u0275\u0275element(1, "i", 83);
    \u0275\u0275elementEnd();
  }
}
function CreateNoteComponent_For_18_For_32_Conditional_5_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 84);
    \u0275\u0275listener("click", function CreateNoteComponent_For_18_For_32_Conditional_5_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r21);
      const \u0275$index_234_r18 = \u0275\u0275nextContext(2).$index;
      const \u0275$index_170_r14 = \u0275\u0275nextContext().$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeSubTheme(\u0275$index_170_r14, \u0275$index_234_r18));
    });
    \u0275\u0275text(1, " \u2715 ");
    \u0275\u0275elementEnd();
  }
}
function CreateNoteComponent_For_18_For_32_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71);
    \u0275\u0275conditionalCreate(1, CreateNoteComponent_For_18_For_32_Conditional_5_Conditional_1_Template, 2, 4, "button", 77);
    \u0275\u0275conditionalCreate(2, CreateNoteComponent_For_18_For_32_Conditional_5_Conditional_2_Template, 2, 0, "button", 78);
    \u0275\u0275conditionalCreate(3, CreateNoteComponent_For_18_For_32_Conditional_5_Conditional_3_Template, 2, 0, "button", 79);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_25_0;
    const ctx_r21 = \u0275\u0275nextContext();
    const nnumber_r19 = ctx_r21.$implicit;
    const \u0275$index_234_r18 = ctx_r21.$index;
    const number_r12 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(\u0275$index_234_r18 + 1 === number_r12.proveido.length && nnumber_r19.recibido ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(\u0275$index_234_r18 + 1 === number_r12.proveido.length && !nnumber_r19.archivado ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_25_0 = ctx_r2.authUser()) == null ? null : tmp_25_0.rol) === "1" ? 3 : -1);
  }
}
function CreateNoteComponent_For_18_For_32_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 74)(1, "label", 85);
    \u0275\u0275text(2, " Observaci\xF3n ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "textarea", 86);
    \u0275\u0275listener("blur", function CreateNoteComponent_For_18_For_32_Conditional_12_Template_textarea_blur_3_listener($event) {
      \u0275\u0275restoreView(_r23);
      const \u0275$index_170_r14 = \u0275\u0275nextContext(2).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.recibido(\u0275$index_170_r14, ctx_r2.getInputValue($event)));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const nnumber_r19 = \u0275\u0275nextContext().$implicit;
    const \u0275$index_170_r14 = \u0275\u0275nextContext().$index;
    \u0275\u0275advance();
    \u0275\u0275property("for", "observacion-" + \u0275$index_170_r14);
    \u0275\u0275advance(2);
    \u0275\u0275property("id", "observacion-" + \u0275$index_170_r14)("value", nnumber_r19.observacion);
  }
}
function CreateNoteComponent_For_18_For_32_Conditional_13_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 87)(1, "strong");
    \u0275\u0275text(2, "Observaci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const nnumber_r19 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", nnumber_r19.observacion, " ");
  }
}
function CreateNoteComponent_For_18_For_32_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CreateNoteComponent_For_18_For_32_Conditional_13_Conditional_0_Template, 4, 1, "div", 87);
  }
  if (rf & 2) {
    const nnumber_r19 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(nnumber_r19.observacion ? 0 : -1);
  }
}
function CreateNoteComponent_For_18_For_32_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 75)(1, "strong");
    \u0275\u0275element(2, "i", 88);
    \u0275\u0275text(3, " Recibido:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const nnumber_r19 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(5, 1, nnumber_r19.recibido, "medium"), " ");
  }
}
function CreateNoteComponent_For_18_For_32_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 76)(1, "strong");
    \u0275\u0275element(2, "i", 89);
    \u0275\u0275text(3, " Archivado:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const nnumber_r19 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(5, 1, nnumber_r19.archivado, "medium"), " ");
  }
}
function CreateNoteComponent_For_18_For_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63)(1, "div", 69)(2, "strong", 70);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275conditionalCreate(5, CreateNoteComponent_For_18_For_32_Conditional_5_Template, 4, 3, "div", 71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 72)(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 73);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(12, CreateNoteComponent_For_18_For_32_Conditional_12_Template, 4, 3, "div", 74)(13, CreateNoteComponent_For_18_For_32_Conditional_13_Template, 1, 1);
    \u0275\u0275conditionalCreate(14, CreateNoteComponent_For_18_For_32_Conditional_14_Template, 6, 4, "div", 75);
    \u0275\u0275conditionalCreate(15, CreateNoteComponent_For_18_For_32_Conditional_15_Template, 6, 4, "div", 76);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_25_0;
    let tmp_28_0;
    const nnumber_r19 = ctx.$implicit;
    const \u0275$index_234_r18 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(13, _c1, !!nnumber_r19.observacion, !nnumber_r19.recibido && !nnumber_r19.observacion, !!nnumber_r19.recibido && !nnumber_r19.observacion));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", \u0275$index_234_r18 + 1, ". ", nnumber_r19.dependencel || "General");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\n", nnumber_r19.dependencev, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_25_0 = ctx_r2.authUser()) == null ? null : tmp_25_0.rol) === "1" || ((tmp_25_0 = ctx_r2.authUser()) == null ? null : tmp_25_0.rol) === "4" ? 5 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Enviado por: ", nnumber_r19.user || "Sistema", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("[", \u0275\u0275pipeBind2(11, 10, nnumber_r19.createdAt, "short"), "]");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_28_0 = ctx_r2.authUser()) == null ? null : tmp_28_0.cargo) === nnumber_r19.dependencev && !nnumber_r19.archivado ? 12 : 13);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(nnumber_r19.recibido ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(nnumber_r19.archivado ? 15 : -1);
  }
}
function CreateNoteComponent_For_18_Conditional_33_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r25 = ctx.$implicit;
    \u0275\u0275property("value", opt_r25.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r25.label);
  }
}
function CreateNoteComponent_For_18_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 64)(1, "select", 90);
    \u0275\u0275listener("change", function CreateNoteComponent_For_18_Conditional_33_Template_select_change_1_listener($event) {
      \u0275\u0275restoreView(_r24);
      const \u0275$index_170_r14 = \u0275\u0275nextContext().$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.proveidoChange(ctx_r2.getSelectValue($event), \u0275$index_170_r14));
    });
    \u0275\u0275elementStart(2, "option", 91);
    \u0275\u0275text(3, "Enviar a dependencia...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, CreateNoteComponent_For_18_Conditional_33_For_5_Template, 2, 2, "option", 24, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.dependenceOptions);
  }
}
function CreateNoteComponent_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 45)(2, "div", 46);
    \u0275\u0275element(3, "i", 47);
    \u0275\u0275elementStart(4, "h5", 48);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 49)(7, "span", 50);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 51);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 52);
    \u0275\u0275conditionalCreate(12, CreateNoteComponent_For_18_Conditional_12_Template, 3, 4, "span");
    \u0275\u0275elementStart(13, "span", 53);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 54);
    \u0275\u0275element(16, "i", 39);
    \u0275\u0275text(17);
    \u0275\u0275elementStart(18, "strong");
    \u0275\u0275text(19, "Folios:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 55);
    \u0275\u0275conditionalCreate(22, CreateNoteComponent_For_18_Conditional_22_Template, 3, 1, "a", 56);
    \u0275\u0275elementStart(23, "button", 57);
    \u0275\u0275listener("click", function CreateNoteComponent_For_18_Template_button_click_23_listener() {
      const ctx_r14 = \u0275\u0275restoreView(_r11);
      const number_r12 = ctx_r14.$implicit;
      const \u0275$index_170_r14 = ctx_r14.$index;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.openModal(number_r12.title, number_r12.detail || "");
      return \u0275\u0275resetView(ctx_r2.recibido(\u0275$index_170_r14, ""));
    });
    \u0275\u0275element(24, "i", 58);
    \u0275\u0275text(25, " Recibir ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 59);
    \u0275\u0275listener("click", function CreateNoteComponent_For_18_Template_button_click_26_listener() {
      const number_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.exportToPdf(number_r12));
    });
    \u0275\u0275element(27, "i", 60);
    \u0275\u0275text(28, " PDF ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(29, CreateNoteComponent_For_18_Conditional_29_Template, 2, 0, "button", 61);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 62);
    \u0275\u0275repeaterCreate(31, CreateNoteComponent_For_18_For_32_Template, 16, 17, "div", 63, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(33, CreateNoteComponent_For_18_Conditional_33_Template, 6, 0, "div", 64);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_21_0;
    let tmp_23_0;
    const number_r12 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("title", number_r12.title);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", number_r12.title, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate3("", number_r12.nombres, " ", number_r12.apellidopaterno, " ", number_r12.apellidomaterno);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(DNI ", number_r12.dni, ")");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(number_r12.createdAt ? 12 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(number_r12.tipo);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", number_r12.size ? (number_r12.size / (1024 * 1024)).toFixed(2) + " MB" : "Sin archivo", " ", number_r12.type ? "(" + number_r12.type + ")" : "", " | ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", number_r12.folios || 1, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(number_r12.file !== "" ? 22 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.loading());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.isRecentTramite(number_r12.createdAt) || ((tmp_21_0 = ctx_r2.authUser()) == null ? null : tmp_21_0.rol) === "1" ? 29 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(number_r12.proveido);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((((tmp_23_0 = ctx_r2.authUser()) == null ? null : tmp_23_0.rol) === "1" || ((tmp_23_0 = ctx_r2.authUser()) == null ? null : tmp_23_0.rol) === "4") && number_r12.proveido[number_r12.proveido.length - 1] && !number_r12.proveido[number_r12.proveido.length - 1].archivado || number_r12.proveido.length === 0 || ((tmp_23_0 = ctx_r2.authUser()) == null ? null : tmp_23_0.rol) === "1" ? 33 : -1);
  }
}
function CreateNoteComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 92)(2, "div", 93)(3, "div", 94)(4, "h5", 95);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(6, "div", 96);
    \u0275\u0275elementStart(7, "div", 97)(8, "button", 98);
    \u0275\u0275listener("click", function CreateNoteComponent_Conditional_19_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showModal.set(false));
    });
    \u0275\u0275text(9, "Cerrar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.tittleModal());
    \u0275\u0275advance();
    \u0275\u0275property("innerHTML", ctx_r2.resumen(), \u0275\u0275sanitizeHtml);
  }
}
function CreateNoteComponent_Conditional_20_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 103)(1, "label", 104);
    \u0275\u0275text(2, "B\xFAsqueda por DNI");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 105)(4, "input", 106);
    \u0275\u0275listener("ngModelChange", function CreateNoteComponent_Conditional_20_Conditional_7_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r28);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.dni.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 107);
    \u0275\u0275listener("click", function CreateNoteComponent_Conditional_20_Conditional_7_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.getRemiterData());
    });
    \u0275\u0275text(6, " Buscar ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "small", 108);
    \u0275\u0275text(8, "Consulte los tr\xE1mites vinculados a su n\xFAmero de documento.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.loading())("ngModel", ctx_r2.dni());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.loading());
  }
}
function CreateNoteComponent_Conditional_20_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 103)(1, "label", 104);
    \u0275\u0275text(2, "Identificaci\xF3n de Remitente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 105)(4, "input", 109);
    \u0275\u0275listener("ngModelChange", function CreateNoteComponent_Conditional_20_Conditional_8_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r29);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.dni.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 110);
    \u0275\u0275listener("click", function CreateNoteComponent_Conditional_20_Conditional_8_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r29);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.getRemiter());
    });
    \u0275\u0275text(6, " Identificarte ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "small", 108);
    \u0275\u0275text(8, "Ingrese su DNI para verificar sus datos y proceder con el env\xEDo.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.loading())("ngModel", ctx_r2.dni());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.loading());
  }
}
function CreateNoteComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 99)(2, "div", 93)(3, "div", 100)(4, "h5", 101);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 102);
    \u0275\u0275conditionalCreate(7, CreateNoteComponent_Conditional_20_Conditional_7_Template, 9, 3, "div", 103)(8, CreateNoteComponent_Conditional_20_Conditional_8_Template, 9, 3, "div", 103);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 97)(10, "button", 98);
    \u0275\u0275listener("click", function CreateNoteComponent_Conditional_20_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showModalw.set(false));
    });
    \u0275\u0275text(11, "Cerrar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.tittleModal());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.tittleModal() !== "Enviar tramite" ? 7 : 8);
  }
}
var CreateNoteComponent = class _CreateNoteComponent {
  http = inject(HttpClient);
  toastr = inject(ToastrService);
  pdfService = inject(PdfGeneratorService);
  apiUrl = `${environment.apiURL}/api`;
  apiUrlfile = `${environment.apiURL}`;
  Editor = import_ckeditor5_build_classic.default;
  editorConfig = {
    language: "es",
    placeholder: "Descripci\xF3n de tr\xE1mite",
    toolbar: [
      "undo",
      "redo",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "indent",
      "outdent",
      "|",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "heading"
    ]
  };
  dependenceOptions = [
    { value: "direccion", label: "DIRECCI\xD3N" },
    { value: "unidadacademica", label: "UNIDAD ACAD\xC9MICA" },
    { value: "unidadadministrativa", label: "UNIDAD ADMINISTRATIVA" },
    { value: "secretariogeneral", label: "SECRETAR\xCDA GENERAL" },
    { value: "uaeducacion", label: "UNIDAD ACAD\xC9MICA DE EDUCACI\xD3N ART\xCDSTICA" },
    { value: "uaartista", label: "UNIDAD ACAD\xC9MICA DE ARTISTA PROFESIONAL" },
    { value: "jefeservicio", label: "UNIDAD EN SERVICIO" },
    { value: "biblioteca", label: "BIBLIOTECA" }
  ];
  tipoOptions = [
    { value: "ACTA", label: "ACTA" },
    { value: "ACTA DE CONCILIACION", label: "ACTA DE CONCILIACION" },
    { value: "ACTA DE ENTREGA DE CARGO", label: "ACTA DE ENTREGA DE CARGO" },
    { value: "ACTA DE ENTREGA-RECEPCION DE CARGO", label: "ACTA DE ENTREGA-RECEPCION DE CARGO" },
    { value: "CARTA", label: "CARTA" },
    { value: "OFICIO", label: "OFICIO" },
    { value: "SOLICITUD", label: "SOLICITUD" },
    { value: "INFORME", label: "INFORME" },
    { value: "MEMORANDO", label: "MEMORANDO" }
  ];
  MAX_FILE_SIZE = 105048576;
  // ~100MB
  ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
  showModal = signal(false, ...ngDevMode ? [{ debugName: "showModal" }] : []);
  showModalw = signal(false, ...ngDevMode ? [{ debugName: "showModalw" }] : []);
  title = signal("", ...ngDevMode ? [{ debugName: "title" }] : []);
  dependence = signal({ label: "DIRECCI\xD3N", value: "direccion" }, ...ngDevMode ? [{ debugName: "dependence" }] : []);
  tipo = signal({ label: "SOLICITUD", value: "SOLICITUD" }, ...ngDevMode ? [{ debugName: "tipo" }] : []);
  email = signal("", ...ngDevMode ? [{ debugName: "email" }] : []);
  celular = signal("", ...ngDevMode ? [{ debugName: "celular" }] : []);
  folios = signal(1, ...ngDevMode ? [{ debugName: "folios" }] : []);
  observacion = signal("", ...ngDevMode ? [{ debugName: "observacion" }] : []);
  dni = signal("", ...ngDevMode ? [{ debugName: "dni" }] : []);
  remiter = signal(null, ...ngDevMode ? [{ debugName: "remiter" }] : []);
  fileData = signal({
    file: null,
    name: "",
    size: 0,
    type: ""
  }, ...ngDevMode ? [{ debugName: "fileData" }] : []);
  detail = signal("", ...ngDevMode ? [{ debugName: "detail" }] : []);
  tramites = signal([], ...ngDevMode ? [{ debugName: "tramites" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  resumen = signal("", ...ngDevMode ? [{ debugName: "resumen" }] : []);
  tittleModal = signal("", ...ngDevMode ? [{ debugName: "tittleModal" }] : []);
  authUser = signal(isAuth(), ...ngDevMode ? [{ debugName: "authUser" }] : []);
  fileInput;
  ngOnInit() {
    this.resetTemplate();
    const user = this.authUser();
    if (user && (user.rol === "1" || user.rol === "4")) {
      this.getTramites();
    }
  }
  resetTemplate() {
    this.detail.set(this.generateTemplate());
    this.toastr.info("Plantilla cargada");
  }
  onFieldBlur() {
    this.detail.set(this.generateTemplate());
  }
  generateTemplate() {
    const dep = this.dependence();
    const t = this.tipo();
    const rem = this.remiter();
    const em = this.email();
    const ce = this.celular();
    const fo = this.folios();
    const asunto = this.title();
    return `
<p><strong>Sr./Sra. encargado(a) de la ${dep.label} de la Escuela Superior de Formaci\xF3n Art\xEDstica P\xFAblica \u201CFELIPE GUAM\xC1N POMA DE AYALA\u201D Ayacucho R.M. No 0195-ED</strong></p>
<p>Yo, con <strong>APELLIDOS Y NOMBRES: </strong>${rem?.apellidoPaterno || ""} ${rem?.apellidoMaterno || ""} ${rem?.nombreCompleto || ""}, <strong>DNI: </strong> ${rem?.dni || ""}, <strong>EMAIL: </strong> ${em} y <strong>CELULAR: </strong> ${ce}</p>
<p><strong>DEPENDENCIA A LA SE DIRIGE:</strong> ${dep.label} | <strong>TIPO DE TRAMITE:</strong> ${t.label} | <strong>NRO. FOLIOS:</strong> ${fo}</p>
<p><strong>DOMICILIADO EN</strong>: </p>
<p><strong>CARGO ACTUAL</strong>: </p>
<p><strong>ASUNTO</strong>: ${asunto}</p>
<p><strong>DESCRIPCI\xD3N</strong>: </p>
<p><strong>DOCUMENTOS QUE SE ADJUNTA:</strong> </p>
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
<p><strong>Lugar y Fecha: </strong> Huamanga Ayacucho ${(/* @__PURE__ */ new Date()).toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" })}</p>
<p><a href="https://esfapa.edu.pe" target="_blank" class="text-decoration-none">https://esfapa.edu.pe</a> <a href="mailto:mesadepartes@esfapa.edu.pe" class="text-decoration-none">mesadepartes@esfapa.edu.pe</a></p>      
    `;
  }
  onDependenceChange(value) {
    const selected = this.dependenceOptions.find((opt) => opt.value === value);
    if (selected) {
      this.dependence.set(selected);
    }
  }
  onTipoChange(value) {
    const selected = this.tipoOptions.find((opt) => opt.value === value);
    if (selected) {
      this.tipo.set(selected);
    }
  }
  cleanProveidoList(list) {
    if (!Array.isArray(list))
      return [];
    return list.map((item) => {
      if (typeof item !== "object" || item === null) {
        return {
          dependencel: "General",
          dependencev: "general",
          user: "Sistema",
          observacion: "",
          recibido: null,
          archivado: null,
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        };
      }
      const typedItem = item;
      return {
        dependencel: String(typedItem["dependencel"] || "General"),
        dependencev: String(typedItem["dependencev"] || "general"),
        user: String(typedItem["user"] || "Sistema"),
        observacion: String(typedItem["observacion"] || ""),
        recibido: typedItem["recibido"] ? String(typedItem["recibido"]) : null,
        archivado: typedItem["archivado"] ? String(typedItem["archivado"]) : null,
        createdAt: String(typedItem["createdAt"] || (/* @__PURE__ */ new Date()).toISOString())
      };
    });
  }
  getTramites() {
    this.http.get(`${this.apiUrl}/tramites`).subscribe({
      next: (rawData) => {
        const formattedData = (rawData || []).map((t) => __spreadProps(__spreadValues({}, t), {
          proveido: this.cleanProveidoList(t.proveido)
        }));
        const user = this.authUser();
        if (user && (user.cargo === "control" || user.rol === "1")) {
          this.tramites.set(formattedData);
        } else {
          const selectedData = formattedData.filter((t) => t.proveido.some((prov) => prov.dependencev === user?.cargo));
          this.tramites.set(selectedData);
        }
      },
      error: () => this.toastr.error("Error obteniendo los tr\xE1mites.")
    });
  }
  validateDni() {
    if (this.dni().length <= 5) {
      this.toastr.warning("Ingrese un DNI v\xE1lido");
      return false;
    }
    return true;
  }
  getRemiter() {
    if (!this.validateDni())
      return;
    this.loading.set(true);
    this.http.post(`${this.apiUrl}/users/userDni`, { dni: this.dni() }).subscribe({
      next: (res) => {
        this.remiter.set(res.data);
        this.showModalw.set(false);
      },
      error: () => this.toastr.error("Error al verificar los datos del DNI"),
      complete: () => this.loading.set(false)
    });
  }
  getRemiterData() {
    if (!this.validateDni())
      return;
    this.loading.set(true);
    this.http.get(`${this.apiUrl}/tramites/${this.dni()}`).subscribe({
      next: (rawData) => {
        const formattedData = (rawData || []).map((t) => __spreadProps(__spreadValues({}, t), {
          proveido: this.cleanProveidoList(t.proveido)
        }));
        this.tramites.set(formattedData);
        this.showModalw.set(false);
      },
      error: () => this.toastr.error("Error al buscar tr\xE1mites"),
      complete: () => this.loading.set(false)
    });
  }
  isEmailValid(email) {
    if (!email)
      return true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  isCellValid(celular) {
    if (!celular)
      return true;
    const cellRegex = /^\+?([0-9]{9,9})$/;
    return cellRegex.test(celular);
  }
  sendSurvey() {
    const rem = this.remiter();
    if (!this.title() || !this.detail() || !rem || !this.email() || !this.celular()) {
      this.toastr.info("Complete los campos obligatorios");
      return;
    }
    if (!this.isEmailValid(this.email())) {
      this.toastr.warning("El formato del correo electr\xF3nico no es v\xE1lido");
      return;
    }
    this.loading.set(true);
    const user = this.authUser();
    const proveidoItem = {
      dependencel: this.dependence().label,
      dependencev: this.dependence().value,
      user: user?.email || `${rem.nombres} ${rem.apellidoPaterno} ${rem.apellidoMaterno}`,
      observacion: this.observacion(),
      recibido: null,
      archivado: null,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const formData = new FormData();
    formData.append("title", this.title());
    formData.append("dependence", JSON.stringify(this.dependence()));
    formData.append("proveido", JSON.stringify([proveidoItem]));
    const fileObj = this.fileData().file;
    if (fileObj)
      formData.append("archivo", fileObj);
    formData.append("size", this.fileData().size.toString());
    formData.append("type", this.fileData().type);
    formData.append("dni", rem.dni);
    formData.append("nombres", rem.nombres);
    formData.append("apellidomaterno", rem.apellidoMaterno);
    formData.append("apellidopaterno", rem.apellidoPaterno);
    formData.append("asunto", this.title());
    formData.append("celular", this.celular());
    formData.append("folios", this.folios().toString());
    formData.append("tipo", this.tipo().value);
    formData.append("email", this.email());
    formData.append("detail", this.detail());
    this.http.post(`${this.apiUrl}/tramites/`, formData).subscribe({
      next: async (res) => {
        if (res?.saved) {
          const savedItem = __spreadProps(__spreadValues({}, res.saved), {
            proveido: this.cleanProveidoList(res.saved.proveido)
          });
          this.tramites.update((prev) => [savedItem, ...prev]);
          const currentLocal = JSON.parse(localStorage.getItem("tramite") || "[]");
          currentLocal.push(savedItem);
          localStorage.setItem("tramite", JSON.stringify(currentLocal));
          try {
            await this.pdfService.generateTramiteReport(savedItem, rem);
            this.toastr.success("Tr\xE1mite enviado y PDF generado exitosamente");
          } catch {
            this.toastr.warning("Tr\xE1mite enviado, pero hubo un error al generar el PDF");
          }
        }
        this.remiter.set(null);
        this.title.set("");
        this.email.set("");
        this.celular.set("");
        this.folios.set(1);
        this.dependence.set({ label: "DIRECCI\xD3N", value: "direccion" });
        this.fileData.set({ file: null, name: "", size: 0, type: "" });
        this.dni.set("");
        this.resetTemplate();
      },
      error: () => this.toastr.error("Error al enviar el tr\xE1mite"),
      complete: () => this.loading.set(false)
    });
  }
  handleFileSelect(event) {
    const input = event.target;
    if (!input.files || input.files.length === 0)
      return;
    const selectedFile = input.files[0];
    if (selectedFile.size <= this.MAX_FILE_SIZE && this.ALLOWED_TYPES.includes(selectedFile.type)) {
      this.fileData.set({
        file: selectedFile,
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type
      });
    } else {
      this.toastr.info("Formatos permitidos: PDF, JPEG, JPG, PNG (m\xE1x. 100MB)");
    }
  }
  deleteSurvey(id) {
    if (!confirm("\xBFDeseas eliminar este tr\xE1mite?"))
      return;
    this.http.delete(`${this.apiUrl}/tramites/${id}`).subscribe({
      next: () => {
        this.tramites.update((prev) => prev.filter((t) => t._id !== id));
        this.toastr.success("Tr\xE1mite eliminado");
      },
      error: () => this.toastr.error("Error al eliminar el tr\xE1mite")
    });
  }
  proveidoChange(selectedOptionValue, index) {
    const selectedOption = this.dependenceOptions.find((d) => d.value === selectedOptionValue);
    if (!selectedOption)
      return;
    const user = this.authUser();
    if (user?.cargo === selectedOption.value) {
      this.toastr.warning("No puede enviar a la dependencia a la que pertenece");
      return;
    }
    const updated = [...this.tramites()];
    const target = __spreadValues({}, updated[index]);
    target.proveido = this.cleanProveidoList(target.proveido);
    const now = (/* @__PURE__ */ new Date()).toISOString();
    target.proveido.push({
      dependencel: selectedOption.label,
      dependencev: selectedOption.value,
      user: user?.email || "usuario@demo.com",
      observacion: this.observacion(),
      recibido: null,
      archivado: null,
      createdAt: now
    });
    updated[index] = target;
    this.tramites.set(updated);
    if (target._id) {
      this.http.put(`${this.apiUrl}/tramites/${target._id}`, target.proveido).subscribe({
        next: () => this.toastr.success("Prove\xEDdo actualizado"),
        error: () => this.toastr.error("Error actualizando el prove\xEDdo")
      });
    }
  }
  recibido(i, observacion) {
    const cargoUser = this.authUser()?.cargo;
    if (!cargoUser) {
      this.toastr.warning("No se pudo identificar el cargo del usuario actual.");
      return;
    }
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const tramitesActuales = this.tramites();
    if (!tramitesActuales[i]) {
      this.toastr.warning("El tr\xE1mite seleccionado no es v\xE1lido.");
      return;
    }
    const target = __spreadValues({}, tramitesActuales[i]);
    let proveidosLimpios = this.cleanProveidoList(target.proveido);
    let updatedCount = 0;
    proveidosLimpios = proveidosLimpios.map((p) => {
      if (p.dependencev?.includes(cargoUser)) {
        updatedCount++;
        return __spreadProps(__spreadValues({}, p), {
          recibido: p.recibido ?? timestamp,
          observacion
        });
      }
      return p;
    });
    if (updatedCount === 0) {
      this.toastr.warning("No se encontr\xF3 ning\xFAn prove\xEDdo asociado a tu cargo.");
      return;
    }
    target.proveido = proveidosLimpios;
    const updatedTramites = [...tramitesActuales];
    updatedTramites[i] = target;
    this.tramites.set(updatedTramites);
    if (target._id) {
      this.http.put(`${this.apiUrl}/tramites/${target._id}`, target.proveido).subscribe({
        next: () => this.toastr.success("Recibidos actualizados"),
        error: () => this.toastr.error("Error actualizando los prove\xEDdos")
      });
    }
  }
  archivado(i, j) {
    if (!confirm("\xBFDeseas archivar este \xEDtem?"))
      return;
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const updated = [...this.tramites()];
    const target = __spreadValues({}, updated[i]);
    let proveido = this.cleanProveidoList(target.proveido);
    if (!proveido[j])
      return;
    proveido[j] = __spreadProps(__spreadValues({}, proveido[j]), { archivado: timestamp });
    target.proveido = proveido;
    updated[i] = target;
    this.tramites.set(updated);
    if (target._id) {
      this.http.put(`${this.apiUrl}/tramites/${target._id}`, target.proveido).subscribe({
        next: () => this.toastr.success("Archivado actualizado"),
        error: () => this.toastr.error("Error actualizando el prove\xEDdo")
      });
    }
  }
  removeSubTheme(i, j) {
    if (!confirm("\xBFDeseas eliminar este \xEDtem?"))
      return;
    const updated = [...this.tramites()];
    const target = __spreadValues({}, updated[i]);
    target.proveido = this.cleanProveidoList(target.proveido).filter((_, idx) => idx !== j);
    updated[i] = target;
    this.tramites.set(updated);
    if (target._id) {
      this.http.put(`${this.apiUrl}/tramites/${target._id}`, target.proveido).subscribe({
        next: () => this.toastr.success("\xCDtem eliminado"),
        error: () => this.toastr.error("Error al eliminar subtema")
      });
    }
  }
  isRecentTramite(createdAt) {
    if (!createdAt)
      return false;
    const targetDate = new Date(createdAt);
    const limitDate = new Date(targetDate.getTime() + 60 * 60 * 1e3);
    return /* @__PURE__ */ new Date() < limitDate;
  }
  openModal(title, summary = "") {
    this.tittleModal.set(title);
    this.resumen.set(summary);
    this.showModal.set(true);
  }
  openModalW(title) {
    this.tittleModal.set(title);
    this.showModalw.set(true);
  }
  async exportToPdf(tramiteItem) {
    try {
      this.loading.set(true);
      await this.pdfService.generateTramiteReport(tramiteItem, this.remiter());
      this.toastr.success("Reporte PDF generado exitosamente");
    } catch (error) {
      console.error(error);
      this.toastr.error("Error al generar el reporte PDF");
    } finally {
      this.loading.set(false);
    }
  }
  getInputValue(event) {
    return event.target?.value || "";
  }
  getSelectValue(event) {
    return event.target?.value || "";
  }
  static \u0275fac = function CreateNoteComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CreateNoteComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateNoteComponent, selectors: [["app-create-note"]], viewQuery: function CreateNoteComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.fileInput = _t.first);
    }
  }, decls: 21, vars: 6, consts: [["fileInput", ""], [1, "py-5"], [1, "container", "py-1"], [1, "text-center", "py-1"], [1, "user-info", "fw-bold", "text-secondary"], [1, "mb-3"], [1, "btn-group", "text-center", "w-100", "shadow-sm"], ["type", "button", 1, "btn", "btn-primary", "py-2", 3, "click"], [1, "bi", "bi-file-earmark-text", "me-1"], ["type", "button", 1, "btn", "btn-warning", "text-dark", "fw-semibold", "py-2", 3, "click"], [1, "bi", "bi-file-earmark-arrow-up", "me-1"], [1, "text-center", "mb-1", 2, "height", "11cm"], [1, "card", "card-body", "bg-light", "mb-4", "shadow-sm", "border-0"], [1, "mt-4", "mb-3", "text-secondary", "border-bottom", "pb-2"], [1, "row"], [1, "col-sm-12", "col-md-6", "col-lg-4", "mb-4"], ["tabindex", "-1", 1, "modal", "d-block", "bg-dark", "bg-opacity-50"], [1, "text-muted"], [1, "text-center", "mb-3", "text-secondary", "p-2", "bg-white", "rounded", "shadow-sm"], ["type", "file", 1, "d-none", 3, "change"], [1, "form-group", "mb-3", "row", "d-flex", "justify-content-center", "align-items-center"], [1, "col-sm-12", "col-md-6", "col-lg-4"], [1, "form-label", "fw-bold", "text-info"], [1, "form-control", "mb-3", "shadow-sm", 3, "ngModelChange", "change", "ngModel"], [3, "value"], [1, "form-label", "fw-bold", "text-info", "mt-1"], ["type", "email", "placeholder", "Correo electr\xF3nico", 1, "form-control", "mb-3", "shadow-sm", 3, "ngModelChange", "blur", "ngModel"], [1, "invalid-feedback", "d-block", "mb-2"], [1, "col-sm-12", "col-md-3", "col-lg-3"], ["type", "text", "placeholder", "N\xFAmero de celular", 1, "form-control", "mb-3", "shadow-sm", 3, "ngModelChange", "blur", "ngModel"], ["type", "number", "placeholder", "Total de folios", "min", "1", 1, "form-control", "mb-3", "shadow-sm", 3, "ngModelChange", "blur", "ngModel"], [1, "col-sm-12", "col-md-9", "col-lg-6"], ["type", "text", "placeholder", "Asunto del tr\xE1mite", 1, "form-control", "mb-3", "shadow-sm", 3, "ngModelChange", "blur", "ngModel"], [1, "d-flex", "justify-content-between", "align-items-center", "mt-3", "mb-1"], [1, "form-label", "fw-bold", "text-info", "m-0"], [1, "text-muted", "text-center", "py-3", "bg-white", "rounded", "shadow-sm", "my-2"], [1, "alert", "alert-success", "text-center", "shadow-sm"], [3, "ngModelChange", "editor", "config", "ngModel"], ["type", "button", 1, "btn", "btn-outline-info", "w-100", "my-2", "py-2", 3, "click"], [1, "bi", "bi-paperclip", "me-1"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-2"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-danger", 3, "click"], ["type", "button", 1, "btn", "btn-success", "w-15", "py-2", "fw-bold", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-success", "w-100", "py-2", "fw-bold", "shadow-sm", 3, "disabled"], ["type", "button", 1, "btn", "btn-success", "w-100", "py-2", "fw-bold", "shadow-sm", 3, "click", "disabled"], [1, "card", "h-100", "p-3", "bg-white", "shadow-sm", "border-0", "rounded-3"], [1, "d-flex", "align-items-center", "gap-2", "mb-2"], [1, "bi", "bi-file-earmark-text", "text-primary", "fs-4"], [1, "card-title", "text-dark", "text-uppercase", "fw-bold", "m-0", "text-truncate", 3, "title"], [1, "text-muted", "small", "mb-2"], [1, "fw-semibold", "text-secondary"], [1, "text-info", "fw-bold"], [1, "text-muted", "text-end", "mt-1", 2, "font-size", "11px"], [1, "badge", "bg-secondary", "ms-1"], [1, "small", "text-muted", "mb-3", "bg-light", "p-2", "rounded"], [1, "btn-group", "w-100", "mb-3", "shadow-sm"], ["target", "_blank", "rel", "noopener noreferrer", "title", "Descargar archivo", 1, "btn", "btn-outline-info", "btn-sm", 3, "href"], ["type", "button", "title", "Abrir modal detalles", 1, "btn", "btn-outline-primary", "btn-sm", 3, "click"], [1, "bi", "bi-info-circle"], ["type", "button", "title", "Descargar cargo y procesos", 1, "btn", "btn-outline-secondary", "btn-sm", "text-dark", 3, "click", "disabled"], [1, "bi", "bi-file-earmark-pdf", "text-danger"], ["type", "button", "title", "Eliminar tramite", 1, "btn", "btn-outline-danger", "btn-sm"], [1, "proveidos-container", "mb-3"], [1, "p-2", "small", "rounded", "my-2", "shadow-sm", "border", 3, "ngClass"], [1, "mt-auto", "pt-2"], ["target", "_blank", "rel", "noopener noreferrer", "title", "Descargar archivo", 1, "btn", "btn-outline-info", "btn-sm", 3, "click", "href"], [1, "bi", "bi-download"], ["type", "button", "title", "Eliminar tramite", 1, "btn", "btn-outline-danger", "btn-sm", 3, "click"], [1, "bi", "bi-dash-circle"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-1"], [1, "text-truncate", 2, "max-width", "75%"], [1, "d-flex", "gap-1"], [1, "text-opacity-75", "small"], [1, "", 2, "font-size", "10px"], [1, "mt-2"], [1, "small", "mt-1", "text-warning"], [1, "small", "mt-1", "text-info", "bg-danger", "bg-opacity-75", "p-1", "rounded", "text-light"], ["type", "button", 1, "btn", "btn-sm", "border-0", "p-1", "bg-transparent", "text-white", 3, "disabled", "title"], ["type", "button", "title", "Eliminar prove\xEDdo", 1, "btn", "btn-sm", "border-0", "p-1"], ["type", "button", "title", "Remover", 1, "btn", "btn-sm", "border-0", "p-1", "fw-bold"], ["type", "button", 1, "btn", "btn-sm", "border-0", "p-1", "bg-transparent", "text-white", 3, "click", "disabled", "title"], [1, "bi-folder-fill", "fs-6"], ["type", "button", "title", "Eliminar prove\xEDdo", 1, "btn", "btn-sm", "border-0", "p-1", 3, "click"], [1, "bi", "bi-trash"], ["type", "button", "title", "Remover", 1, "btn", "btn-sm", "border-0", "p-1", "fw-bold", 3, "click"], [1, "form-label", "small", "fw-bold", "mb-1", 3, "for"], ["placeholder", "Escribe una observaci\xF3n...", 1, "form-control", "form-control-sm", "bg-white", "text-dark", "border-0", "shadow-sm", 3, "blur", "id", "value"], [1, "small", "mt-1", "p-1", "rounded", "bg-black", "bg-opacity-10"], [1, "bi-check-circle-fill"], [1, "bi-folder-check"], [1, "form-select", "form-select-sm", "border-primary", "shadow-sm", 3, "change"], ["value", "", "disabled", "", "selected", ""], [1, "modal-dialog", "modal-lg", "modal-dialog-centered"], [1, "modal-content", "border-0", "shadow-lg"], [1, "modal-header", "bg-primary", "text-white"], [1, "modal-title"], [1, "modal-body", "p-4", 3, "innerHTML"], [1, "modal-footer", "bg-light"], ["type", "button", 1, "btn", "btn-secondary", "px-4", 3, "click"], [1, "modal-dialog", "modal-md", "modal-dialog-centered"], [1, "modal-header", "text-dark"], [1, "modal-title", "fw-bold"], [1, "modal-body", "p-4"], [1, "form-group"], [1, "form-label", "fw-bold"], [1, "input-group", "my-2"], ["type", "text", "placeholder", "Ingrese su DNI", 1, "form-control", "border-warning", "shadow-sm", 3, "ngModelChange", "disabled", "ngModel"], ["type", "button", 1, "btn", "btn-warning", "px-3", "fw-semibold", 3, "click", "disabled"], [1, "form-text", "text-muted"], ["type", "text", "placeholder", "Ingrese su DNI", 1, "form-control", "border-primary", "shadow-sm", 3, "ngModelChange", "disabled", "ngModel"], ["type", "button", 1, "btn", "btn-primary", "px-3", "fw-semibold", 3, "click", "disabled"]], template: function CreateNoteComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-navbar")(1, "div", 1);
      \u0275\u0275elementStart(2, "div", 2)(3, "div", 3);
      \u0275\u0275conditionalCreate(4, CreateNoteComponent_Conditional_4_Template, 3, 2, "span", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 5)(6, "div", 6)(7, "button", 7);
      \u0275\u0275listener("click", function CreateNoteComponent_Template_button_click_7_listener() {
        return ctx.openModalW("Enviar tramite");
      });
      \u0275\u0275element(8, "i", 8);
      \u0275\u0275text(9, " Enviar tr\xE1mite ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "button", 9);
      \u0275\u0275listener("click", function CreateNoteComponent_Template_button_click_10_listener() {
        return ctx.openModalW("Tramites enviados");
      });
      \u0275\u0275element(11, "i", 10);
      \u0275\u0275text(12, " Tr\xE1mites enviados ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(13, CreateNoteComponent_Conditional_13_Template, 2, 0, "div", 11);
      \u0275\u0275conditionalCreate(14, CreateNoteComponent_Conditional_14_Template, 54, 18, "div", 12);
      \u0275\u0275conditionalCreate(15, CreateNoteComponent_Conditional_15_Template, 2, 0, "h4", 13);
      \u0275\u0275elementStart(16, "div", 14);
      \u0275\u0275repeaterCreate(17, CreateNoteComponent_For_18_Template, 34, 15, "div", 15, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(19, CreateNoteComponent_Conditional_19_Template, 10, 2, "div", 16);
      \u0275\u0275conditionalCreate(20, CreateNoteComponent_Conditional_20_Template, 12, 2, "div", 16);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      let tmp_2_0;
      \u0275\u0275advance(4);
      \u0275\u0275conditional((tmp_0_0 = ctx.authUser()) ? 4 : -1, tmp_0_0);
      \u0275\u0275advance(9);
      \u0275\u0275conditional(!ctx.remiter() && ctx.tramites().length === 0 ? 13 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_2_0 = ctx.remiter()) ? 14 : -1, tmp_2_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.tramites().length > 0 ? 15 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.tramites());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showModal() ? 19 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showModalw() ? 20 : -1);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    FormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    DefaultValueAccessor,
    NumberValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    MinValidator,
    NgModel,
    Navbar,
    CKEditorModule,
    CKEditorComponent,
    ThreeHtmlCanvasComponent,
    DatePipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateNoteComponent, [{
    type: Component,
    args: [{
      selector: "app-create-note",
      standalone: true,
      imports: [
        CommonModule,
        FormsModule,
        Navbar,
        CKEditorModule,
        ThreeHtmlCanvasComponent,
        DatePipe
      ],
      template: `
    <app-navbar></app-navbar>
    <div class="py-5"></div>
    <div class="container py-1">
      <div class="text-center py-1">
        @if (authUser(); as user) {
          <span class="user-info fw-bold text-secondary">
            {{ user.name }}
            @if (user.cargo) {
              <span class="text-muted">({{ user.cargo }})</span>
            }
          </span>
        }
      </div>
      <div class="mb-3">
        <div class="btn-group text-center w-100 shadow-sm">
          <button class="btn btn-primary py-2" type="button" (click)="openModalW('Enviar tramite')">
            <i class="bi bi-file-earmark-text me-1"></i> Enviar tr\xE1mite
          </button>
          <button class="btn btn-warning text-dark fw-semibold py-2" type="button" (click)="openModalW('Tramites enviados')">
            <i class="bi bi-file-earmark-arrow-up me-1"></i> Tr\xE1mites enviados
          </button>
        </div>
      </div>
      
      @if(!remiter() && tramites().length === 0) {
        <div class="text-center mb-1" style="height: 11cm;">
          <app-three-html-canvas></app-three-html-canvas>
        </div>
      }

      <!-- Formulario de Remitente -->
      @if (remiter(); as currentRemiter) {
        <div class="card card-body bg-light mb-4 shadow-sm border-0">
          <div class="text-center mb-3 text-secondary p-2 bg-white rounded shadow-sm">
            <strong>Nombres:</strong> {{ currentRemiter.nombres }} |
            <strong>Apellido Paterno:</strong> {{ currentRemiter.apellidoPaterno }} |
            <strong>Apellido Materno:</strong> {{ currentRemiter.apellidoMaterno }} |
            <strong>DNI:</strong> {{ currentRemiter.dni }} 
            <input #fileInput type="file" class="d-none" (change)="handleFileSelect($event)" />
          </div>

          <div class="form-group mb-3 row d-flex justify-content-center align-items-center">
            <div class="col-sm-12 col-md-6 col-lg-4">
              <label class="form-label fw-bold text-info">Dependencia a enviar</label>
              <select 
                class="form-control mb-3 shadow-sm" 
                [ngModel]="dependence().value" 
                (ngModelChange)="onDependenceChange($event)"
                (change)="onFieldBlur()">
                @for (opt of dependenceOptions; track opt.value) {
                  <option [value]="opt.value">{{ opt.label }}</option>
                }
              </select>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-4">
              <label class="form-label fw-bold text-info mt-1">Tipo de documento</label>
              <select 
                class="form-control mb-3 shadow-sm" 
                [ngModel]="tipo().value" 
                (ngModelChange)="onTipoChange($event)"
                (change)="onFieldBlur()">
                @for (opt of tipoOptions; track opt.value) {
                  <option [value]="opt.value">{{ opt.label }}</option>
                }
              </select>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-4">
              <label class="form-label fw-bold text-info">Correo electr\xF3nico (necesario)</label>
              <input
                type="email"
                class="form-control mb-3 shadow-sm" 
                [class.is-invalid]="email() && !isEmailValid(email())"
                placeholder="Correo electr\xF3nico"
                [ngModel]="email()"
                (ngModelChange)="email.set($event)"
                (blur)="onFieldBlur()"
              />
              @if (email() && !isEmailValid(email())) {
                <div class="invalid-feedback d-block mb-2">
                  Por favor, ingrese un correo electr\xF3nico v\xE1lido.
                </div>
              }
            </div>
            
            <div class="col-sm-12 col-md-3 col-lg-3">
              <label class="form-label fw-bold text-info">Celular (necesario)</label>
              <input
                type="text"
                class="form-control mb-3 shadow-sm"
                [class.is-invalid]="celular() && !isCellValid(celular())"
                placeholder="N\xFAmero de celular"
                [ngModel]="celular()"
                (ngModelChange)="celular.set($event)"
                (blur)="onFieldBlur()"
              />
              @if (celular() && !isCellValid(celular())) {
                <div class="invalid-feedback d-block mb-2">
                  Ingrese un n\xFAmero de celular v\xE1lido (m\xEDnimo 9 d\xEDgitos).
                </div>
              }
            </div>

            <div class="col-sm-12 col-md-3 col-lg-3">
              <label class="form-label fw-bold text-info">Nro. de Folios</label>
              <input
                type="number"
                class="form-control mb-3 shadow-sm"
                placeholder="Total de folios"
                min="1"
                [ngModel]="folios()"
                (ngModelChange)="folios.set($event)"
                (blur)="onFieldBlur()"
              />
            </div>

            <div class="col-sm-12 col-md-9 col-lg-6">
              <label class="form-label fw-bold text-info">Asunto (necesario)</label>
              <input
                type="text"
                class="form-control mb-3 shadow-sm"
                placeholder="Asunto del tr\xE1mite"
                [ngModel]="title()"
                (ngModelChange)="title.set($event)"
                (blur)="onFieldBlur()"
              />
            </div>

            <div class="d-flex justify-content-between align-items-center mt-3 mb-1">
              <label class="form-label fw-bold text-info m-0">Detalles</label>
            </div>
            @if (email() && celular() && title()) {          
              <div class="mb-3">
                <ckeditor
                  [editor]="Editor"
                  [config]="editorConfig"
                  [ngModel]="detail()"
                  (ngModelChange)="detail.set($event)">
                </ckeditor>
              </div>
              <button class="btn btn-outline-info w-100 my-2 py-2" type="button" (click)="fileInput.click()">
                <i class="bi bi-paperclip me-1"></i> Cargar archivo adjunto
              </button>
            } @else {
              <div class="text-muted text-center py-3 bg-white rounded shadow-sm my-2">
                Rellene todos los campos necesarios (email, celular y asunto) para generar la descripci\xF3n y cargar archivo.
              </div>
            }
          </div>

          @if (fileData().file) {
            <div class="alert alert-success text-center shadow-sm">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span>
                  <strong>Nombre:</strong> {{ fileData().name }} |
                  <strong>Tama\xF1o:</strong> {{ (fileData().size / (1024 * 1024)).toFixed(2) }} MB
                </span>
                <button class="btn btn-sm btn-outline-danger" type="button" (click)="fileData.set({ file: null, name: '', size: 0, type: '' })">
                  Cerrar
                </button>
              </div>
              <button class="btn btn-success w-15 py-2 fw-bold" type="button" (click)="sendSurvey()" [disabled]="loading()">
                {{ loading() ? 'Enviando...' : 'Enviar tr\xE1mite con archivo' }}
              </button>
            </div>
          } @else {
            @if (email() && celular() && title()) {          
              <button class="btn btn-success w-100 py-2 fw-bold shadow-sm" type="button" (click)="sendSurvey()" [disabled]="loading()">
                {{ loading() ? 'Enviando...' : 'Enviar tr\xE1mite sin archivo' }}
              </button>
            }  
          }
        </div>
      }

      <!-- Lista de Tr\xE1mites -->
      @if (tramites().length > 0) {
        <h4 class="mt-4 mb-3 text-secondary border-bottom pb-2">Tr\xE1mites en Sistema</h4>
      }

      <div class="row">
        @for (number of tramites(); track number._id || $index; let i = $index) {
          <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
            <div class="card h-100 p-3 bg-white shadow-sm border-0 rounded-3">
              <div class="d-flex align-items-center gap-2 mb-2">
                <i class="bi bi-file-earmark-text text-primary fs-4"></i>
                <h5 class="card-title text-dark text-uppercase fw-bold m-0 text-truncate" [title]="number.title">
                  {{ number.title }}
                </h5>
              </div>
              <div class="text-muted small mb-2">
                <span class="fw-semibold text-secondary">{{ number.nombres }} {{ number.apellidopaterno }} {{ number.apellidomaterno }}</span> <span class="text-info fw-bold">(DNI {{ number.dni }})</span>
                <div class="text-muted text-end mt-1" style="font-size: 11px;">
                  @if (number.createdAt) {
                    <span>Creado: {{ number.createdAt | date:'medium' }}</span>
                  } 
                  <span class="badge bg-secondary ms-1">{{ number.tipo }}</span>
                </div>
              </div>
              <div class="small text-muted mb-3 bg-light p-2 rounded">
                <i class="bi bi-paperclip me-1"></i>
                {{ number.size ? (number.size / (1024 * 1024)).toFixed(2) + ' MB' : 'Sin archivo' }}
                {{ number.type ? '(' + number.type + ')' : '' }} | <strong>Folios:</strong> {{ number.folios || 1 }}
              </div>

              <div class="btn-group w-100 mb-3 shadow-sm">
                @if (number.file !== '') {
                  <a 
                    class="btn btn-outline-info btn-sm" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Descargar archivo"
                    [href]="apiUrlfile + '/tramite/' + number.file" 
                    (click)="recibido(i, '')">
                    <i class="bi bi-download"></i> Revisar
                  </a>
                }
                <button 
                  class="btn btn-outline-primary btn-sm" 
                  type="button"
                  title="Abrir modal detalles"
                  (click)="openModal(number.title, number.detail || ''); recibido(i, '')">
                  <i class="bi bi-info-circle"></i> Recibir
                </button>

                <button class="btn btn-outline-secondary btn-sm text-dark" type="button" 
                  title="Descargar cargo y procesos"
                  (click)="exportToPdf(number)" [disabled]="loading()">
                  <i class="bi bi-file-earmark-pdf text-danger"></i> PDF
                </button>

                @if (isRecentTramite(number.createdAt) || authUser()?.rol === '1') {
                  <button class="btn btn-outline-danger btn-sm" type="button" 
                    title="Eliminar tramite"
                    (click)="deleteSurvey(number._id!)">
                    <i class="bi bi-dash-circle"></i>
                  </button>
                }
              </div>

              <div class="proveidos-container mb-3">
                @for (nnumber of number.proveido; track $index; let j = $index) {
                  <div class="p-2 small rounded my-2 shadow-sm border"
                      [ngClass]="{
                        'bg-danger text-white border-danger': !!nnumber.observacion,
                        'bg-light text-dark border-light': !nnumber.recibido && !nnumber.observacion,
                        'bg-success text-white border-success': !!nnumber.recibido && !nnumber.observacion
                      }">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                      <strong class="text-truncate" style="max-width: 75%;">{{ j + 1 }}. {{ nnumber.dependencel || 'General' }}</strong>
{{nnumber.dependencev}}
                      @if (authUser()?.rol === '1' || authUser()?.rol === '4') {
                        <div class="d-flex gap-1">
                          @if (j + 1 === number.proveido.length && nnumber.recibido) {
                            <button
                              class="btn btn-sm border-0 p-1 bg-transparent text-white"
                              type="button"
                              [disabled]="!!nnumber.archivado"
                              [title]="nnumber.archivado ? 'archivado' : 'archivar'"
                              (click)="archivado(i, j)"
                            >
                              <i class="bi-folder-fill fs-6" [style.color]="nnumber.archivado ? '#d1e7dd' : '#ffc107'"></i>
                            </button>
                          }
                          
                          @if (j + 1 === number.proveido.length && !nnumber.archivado) {
                            <button class="btn btn-sm border-0 p-1" type="button" title="Eliminar prove\xEDdo" (click)="removeSubTheme(i, j)">
                              <i class="bi bi-trash"></i>
                            </button>
                          }
                          
                          @if (authUser()?.rol === '1') {
                            <button class="btn btn-sm border-0 p-1 fw-bold" type="button" title="Remover" (click)="removeSubTheme(i, j)">
                              \u2715
                            </button>
                          }
                        </div>
                      }
                    </div>
                    <div class="text-opacity-75 small">
                      <span>Enviado por: {{ nnumber.user || 'Sistema' }} </span> <span class="" style="font-size: 10px;">[{{ nnumber.createdAt | date:'short' }}]</span>
                    </div> 

                    @if (authUser()?.cargo === nnumber.dependencev && !nnumber.archivado) {
                      <div class="mt-2">
                        <label [for]="'observacion-' + i" class="form-label small fw-bold mb-1">
                          Observaci\xF3n
                        </label>
                        <textarea 
                          class="form-control form-control-sm bg-white text-dark border-0 shadow-sm" 
                          [id]="'observacion-' + i"
                          (blur)="recibido(i, getInputValue($event))" 
                          [value]="nnumber.observacion" 
                          placeholder="Escribe una observaci\xF3n..."
                        ></textarea>
                      </div>
                    } @else {
                      @if (nnumber.observacion) {
                        <div class="small mt-1 p-1 rounded bg-black bg-opacity-10">
                          <strong>Observaci\xF3n:</strong> {{ nnumber.observacion }}
                        </div>
                      }
                    }

                    @if (nnumber.recibido) {
                      <div class="small mt-1 text-warning">
                        <strong><i class="bi-check-circle-fill"></i> Recibido:</strong> {{ nnumber.recibido | date:'medium' }}
                      </div>
                    }

                    @if (nnumber.archivado) {
                      <div class="small mt-1 text-info bg-danger bg-opacity-75 p-1 rounded text-light">
                        <strong><i class="bi-folder-check"></i> Archivado:</strong> {{ nnumber.archivado | date:'medium' }}
                      </div>
                    }
                  </div>
                }
              </div>

              @if (((authUser()?.rol === '1' || authUser()?.rol === '4') && number.proveido[number.proveido.length - 1] && !number.proveido[number.proveido.length - 1].archivado) || number.proveido.length === 0 || authUser()?.rol === '1') {
                <div class="mt-auto pt-2">
                  <select class="form-select form-select-sm border-primary shadow-sm" (change)="proveidoChange(getSelectValue($event), i)">
                    <option value="" disabled selected>Enviar a dependencia...</option>
                    @for (opt of dependenceOptions; track opt.value) {
                      <option [value]="opt.value">{{ opt.label }}</option>
                    }
                  </select>
                </div>
              }
            </div>
          </div>
        }
      </div>

      <!-- Modal Detalle -->
      @if (showModal()) {
        <div class="modal d-block bg-dark bg-opacity-50" tabindex="-1">
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg">
              <div class="modal-header bg-primary text-white">
                <h5 class="modal-title">{{ tittleModal() }}</h5>
                <!-- <button type="button" class="btn-close btn-close-white" (click)="showModal.set(false)"></button> -->
              </div>
              <div class="modal-body p-4" [innerHTML]="resumen()"></div>
              <div class="modal-footer bg-light">
                <button type="button" class="btn btn-secondary px-4" (click)="showModal.set(false)">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Modal B\xFAsqueda / Identificaci\xF3n -->
      @if (showModalw()) {
        <div class="modal d-block bg-dark bg-opacity-50" tabindex="-1">
          <div class="modal-dialog modal-md modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg">
              <div class="modal-header text-dark">
                <h5 class="modal-title fw-bold">{{ tittleModal() }}</h5>
                <!-- <button type="button" class="btn-close" (click)="showModalw.set(false)"></button> -->
              </div>
              <div class="modal-body p-4">
                @if (tittleModal() !== 'Enviar tramite') {
                  <div class="form-group">
                    <label class="form-label fw-bold">B\xFAsqueda por DNI</label>
                    <div class="input-group my-2">
                      <input
                        type="text"
                        class="form-control border-warning shadow-sm"
                        placeholder="Ingrese su DNI"
                        [disabled]="loading()"
                        [ngModel]="dni()"
                        (ngModelChange)="dni.set($event)"
                      />
                      <button class="btn btn-warning px-3 fw-semibold" type="button" (click)="getRemiterData()" [disabled]="loading()">
                        Buscar
                      </button>
                    </div>
                    <small class="form-text text-muted">Consulte los tr\xE1mites vinculados a su n\xFAmero de documento.</small>
                  </div>
                } @else {
                  <div class="form-group">
                    <label class="form-label fw-bold">Identificaci\xF3n de Remitente</label>
                    <div class="input-group my-2">
                      <input
                        type="text"
                        class="form-control border-primary shadow-sm"
                        placeholder="Ingrese su DNI"
                        [disabled]="loading()"
                        [ngModel]="dni()"
                        (ngModelChange)="dni.set($event)"
                      />
                      <button class="btn btn-primary px-3 fw-semibold" type="button" (click)="getRemiter()" [disabled]="loading()">
                        Identificarte
                      </button>
                    </div>
                    <small class="form-text text-muted">Ingrese su DNI para verificar sus datos y proceder con el env\xEDo.</small>
                  </div>
                }
              </div>
              <div class="modal-footer bg-light">
                <button type="button" class="btn btn-secondary px-4" (click)="showModalw.set(false)">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `
    }]
  }], null, { fileInput: [{
    type: ViewChild,
    args: ["fileInput"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateNoteComponent, { className: "CreateNoteComponent", filePath: "src/app/componentes/tramite.ts", lineNumber: 491 });
})();
export {
  CreateNoteComponent
};
//# sourceMappingURL=chunk-5XWWR6FL.js.map
