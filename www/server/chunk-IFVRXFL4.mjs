import './polyfills.server.mjs';
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  RequiredValidator
} from "./chunk-GIGPJXHS.mjs";
import {
  ToastrService
} from "./chunk-UOBCH2C2.mjs";
import {
  environment
} from "./chunk-SF7RHBD5.mjs";
import {
  Navbar
} from "./chunk-QGEJ4V6S.mjs";
import {
  isAuth
} from "./chunk-NIVJ4KPM.mjs";
import "./chunk-IESDD46D.mjs";
import {
  HttpClient
} from "./chunk-JRMDAGFP.mjs";
import {
  CommonModule
} from "./chunk-TDOK3CTI.mjs";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GYAE75W3.mjs";
import "./chunk-TB3YAHZW.mjs";

// src/app/componentes/latexedit.ts
function CreateNoteComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function CreateNoteComponent_Conditional_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.viewPdf());
    });
    \u0275\u0275element(1, "i", 30);
    \u0275\u0275text(2, " Ver PDF Reciente ");
    \u0275\u0275elementEnd();
  }
}
function CreateNoteComponent_Conditional_26_Conditional_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 34);
    \u0275\u0275listener("click", function CreateNoteComponent_Conditional_26_Conditional_0_For_2_Template_li_click_0_listener() {
      const file_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      ctx_r2.selectFile(file_r5);
      return \u0275\u0275resetView(ctx_r2.selectAndCompile(file_r5._id));
    });
    \u0275\u0275elementStart(1, "div", 35)(2, "span", 36);
    \u0275\u0275listener("blur", function CreateNoteComponent_Conditional_26_Conditional_0_For_2_Template_span_blur_2_listener($event) {
      const file_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.updateNote(file_r5._id, $event));
    })("click", function CreateNoteComponent_Conditional_26_Conditional_0_For_2_Template_span_click_2_listener($event) {
      \u0275\u0275restoreView(_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small", 37);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 38);
    \u0275\u0275listener("click", function CreateNoteComponent_Conditional_26_Conditional_0_For_2_Template_div_click_6_listener($event) {
      \u0275\u0275restoreView(_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(7, "button", 39);
    \u0275\u0275listener("click", function CreateNoteComponent_Conditional_26_Conditional_0_For_2_Template_button_click_7_listener() {
      const file_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.selectAndCompile(file_r5._id));
    });
    \u0275\u0275element(8, "i", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 41);
    \u0275\u0275listener("click", function CreateNoteComponent_Conditional_26_Conditional_0_For_2_Template_button_click_9_listener() {
      const file_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.removeText(file_r5._id));
    });
    \u0275\u0275element(10, "i", 42);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const file_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("border-primary", ctx_r2.selectedTitle() === file_r5.title)("bg-warning", ctx_r2.selectedTitle() === file_r5.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.getDisplayName(file_r5.title));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Autor: ", file_r5.email || "N/A", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.isCompiling());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.isCompiling());
  }
}
function CreateNoteComponent_Conditional_26_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 31);
    \u0275\u0275repeaterCreate(1, CreateNoteComponent_Conditional_26_Conditional_0_For_2_Template, 11, 8, "li", 33, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.noteFiles());
  }
}
function CreateNoteComponent_Conditional_26_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.noteFiles(), " ");
  }
}
function CreateNoteComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CreateNoteComponent_Conditional_26_Conditional_0_Template, 3, 0, "ul", 31)(1, CreateNoteComponent_Conditional_26_Conditional_1_Template, 2, 1, "div", 32);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.isArray(ctx_r2.noteFiles()) ? 0 : 1);
  }
}
function CreateNoteComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, "No hay archivos asociados.");
    \u0275\u0275elementEnd();
  }
}
function CreateNoteComponent_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 43);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "Compilando...");
    \u0275\u0275elementEnd();
  }
}
function CreateNoteComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 44);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "Guardar y Compilar PDF 3D");
    \u0275\u0275elementEnd();
  }
}
function CreateNoteComponent_For_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const $index_r6 = ctx.$index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate($index_r6 + 1);
  }
}
function CreateNoteComponent_Conditional_48_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "hr", 49);
    \u0275\u0275elementStart(1, "pre", 50);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_4_0 = ctx_r2.compilationError()) == null ? null : tmp_4_0.details);
  }
}
function CreateNoteComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "div", 45)(2, "div")(3, "h6", 46);
    \u0275\u0275element(4, "i", 47);
    \u0275\u0275text(5, " Error de compilaci\xF3n ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 48);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(8, CreateNoteComponent_Conditional_48_Conditional_8_Template, 3, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate((tmp_3_0 = ctx_r2.compilationError()) == null ? null : tmp_3_0.message);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_4_0 = ctx_r2.compilationError()) == null ? null : tmp_4_0.details) ? 8 : -1);
  }
}
function CreateNoteComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 51)(2, "div", 52)(3, "div", 53)(4, "h5", 54);
    \u0275\u0275element(5, "i", 55);
    \u0275\u0275text(6, " Crear Nuevo Documento ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 56)(8, "div", 57)(9, "label", 58);
    \u0275\u0275text(10, "T\xEDtulo del Archivo / Documento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 59);
    \u0275\u0275twoWayListener("ngModelChange", function CreateNoteComponent_Conditional_49_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newFileTitle, $event) || (ctx_r2.newFileTitle = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "small", 60);
    \u0275\u0275text(13, "Se guardar\xE1 con la extensi\xF3n .tex autom\xE1ticamente.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 61)(15, "button", 62);
    \u0275\u0275listener("click", function CreateNoteComponent_Conditional_49_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeCreateModal());
    });
    \u0275\u0275text(16, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 63);
    \u0275\u0275listener("click", function CreateNoteComponent_Conditional_49_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.createText());
    });
    \u0275\u0275text(18, " Confirmar y Crear ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newFileTitle);
  }
}
var CreateNoteComponent = class _CreateNoteComponent {
  http = inject(HttpClient);
  toastr = inject(ToastrService);
  cdr = inject(ChangeDetectorRef);
  auth = isAuth();
  apiUrl = `${environment.apiURL}/api`;
  apiUrlfile = `${environment.apiURL}`;
  // Signals reactivos
  noteText = signal("", ...ngDevMode ? [{ debugName: "noteText" }] : []);
  noteFiles = signal("", ...ngDevMode ? [{ debugName: "noteFiles" }] : []);
  selectedTitle = signal("www.tex", ...ngDevMode ? [{ debugName: "selectedTitle" }] : []);
  isCompiling = signal(false, ...ngDevMode ? [{ debugName: "isCompiling" }] : []);
  lastPdfBlob = signal(null, ...ngDevMode ? [{ debugName: "lastPdfBlob" }] : []);
  // Estados del modal de creación
  showCreateModal = signal(false, ...ngDevMode ? [{ debugName: "showCreateModal" }] : []);
  newFileTitle = signal("documento_nuevo", ...ngDevMode ? [{ debugName: "newFileTitle" }] : []);
  // Signal para manejar el error integrado en la vista
  compilationError = signal(null, ...ngDevMode ? [{ debugName: "compilationError" }] : []);
  // Computed signal para calcular dinámicamente la cantidad de líneas en base al texto
  lineCountArray = computed(() => {
    const text = this.noteText() || "";
    const lines = text.split("\n").length;
    return new Array(Math.max(lines, 1));
  }, ...ngDevMode ? [{ debugName: "lineCountArray" }] : []);
  ngOnInit() {
    const user = this.authUser();
    if (user && user._id) {
      this.loadNoteData();
    }
  }
  authUser() {
    return typeof this.auth === "function" ? this.auth() : this.auth;
  }
  isArray(value) {
    return Array.isArray(value);
  }
  clearError() {
    this.compilationError.set(null);
    this.cdr.markForCheck();
  }
  // Método para sincronizar el scroll vertical del número de líneas con el textarea
  syncScroll(event) {
    const textarea = event.target;
    const lineNumbersDiv = textarea.previousElementSibling;
    if (lineNumbersDiv) {
      lineNumbersDiv.scrollTop = textarea.scrollTop;
    }
  }
  openCreateModal() {
    this.newFileTitle.set("");
    this.showCreateModal.set(true);
    this.cdr.markForCheck();
  }
  closeCreateModal() {
    this.showCreateModal.set(false);
    this.cdr.markForCheck();
  }
  viewPdf() {
    const blob = this.lastPdfBlob();
    if (!blob)
      return;
    const url = window.URL.createObjectURL(blob);
    window.open(url, "_blank");
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 1e4);
  }
  selectFile(file) {
    if (file) {
      this.selectedTitle.set(file.title || "www.tex");
      this.noteText.set(file.contenido || "");
      this.cdr.markForCheck();
    }
  }
  selectAndCompile(id) {
    this.loadNote(id);
  }
  loadNoteData() {
    const userId = this.auth?._id;
    if (!userId)
      return;
    this.http.get(`${this.apiUrl}/articles/newwwww/${userId}`).subscribe({
      next: (rawData) => {
        const item = Array.isArray(rawData) ? rawData[0] : rawData;
        if (item) {
          this.noteFiles.set(item.files || "");
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.toastr.error("Error obteniendo los datos de la nota.");
        this.cdr.markForCheck();
      }
    });
  }
  loadNote(id) {
    if (!id)
      return;
    this.http.get(`${this.apiUrl}/articles/zzzone/${id}`).subscribe({
      next: (rawData) => {
        const item = Array.isArray(rawData) ? rawData[0] : rawData;
        if (item) {
          this.noteText.set(item.contenido || "");
          if (item.title) {
            this.selectedTitle.set(item.title);
          }
          this.toastr.info(`Cargado archivo: ${item.title || "Sin t\xEDtulo"}`);
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.toastr.error("Error obteniendo los datos de la nota.");
        this.cdr.markForCheck();
      }
    });
  }
  updateNote(id, event) {
    if (!id)
      return;
    const target = event.target;
    const newTitleText = target.innerText.trim();
    if (!newTitleText) {
      this.toastr.warning("El t\xEDtulo no puede estar vac\xEDo.");
      this.loadNoteData();
      return;
    }
    const titleToSend = newTitleText.endsWith(".tex") ? newTitleText : `${newTitleText}.tex`;
    this.http.put(`${this.apiUrl}/articles/newwwww/${id}`, { title: `${titleToSend}` }).subscribe({
      next: (response) => {
        this.toastr.success("T\xEDtulo actualizado correctamente");
        if (this.selectedTitle() === id || target.classList.contains("border-primary")) {
          this.selectedTitle.set(response.title || titleToSend);
        }
        this.loadNoteData();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error("Error al actualizar el t\xEDtulo:", err);
        this.toastr.error("No se pudo actualizar el t\xEDtulo del archivo.");
        this.loadNoteData();
        this.cdr.markForCheck();
      }
    });
  }
  getDisplayName(title) {
    if (!title)
      return "Sin t\xEDtulo";
    return title.endsWith(".tex") ? title.slice(0, -4) : title;
  }
  sendEditedText(title) {
    this.isCompiling.set(true);
    this.clearError();
    this.cdr.markForCheck();
    const currentText = this.noteText();
    const targetTitle = title || this.selectedTitle() || "www.tex";
    const payload = {
      contenido: currentText,
      title: targetTitle,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.http.post(`${this.apiUrl}/articles/wwnewwwww`, payload, {
      observe: "response",
      responseType: "blob"
    }).subscribe({
      next: (response) => {
        const pdf = response.body;
        const compileTime = response.headers.get("X-Compile-Time") || "0";
        if (!pdf) {
          this.toastr.error("El servidor no devolvi\xF3 el PDF.");
          this.isCompiling.set(false);
          this.cdr.markForCheck();
          return;
        }
        const blob = new Blob([pdf], { type: "application/pdf" });
        this.lastPdfBlob.set(blob);
        this.toastr.success(`PDF generado para "${targetTitle}" en ${compileTime} segundos`);
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 1e4);
        this.isCompiling.set(false);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error("Error al compilar:", err);
        if (err.error instanceof Blob) {
          err.error.text().then((text) => {
            let mensajePrincipal = "Error al compilar el documento LaTeX/Asymptote.";
            let detalleLog = "";
            try {
              const data = JSON.parse(text);
              mensajePrincipal = data.message || data.error || mensajePrincipal;
              if (data.details || data.stderr) {
                detalleLog = data.details || data.stderr;
              }
            } catch {
              if (text && text.trim().length > 0) {
                detalleLog = text;
              }
            }
            this.compilationError.set({
              message: mensajePrincipal,
              details: detalleLog
            });
            this.isCompiling.set(false);
            this.cdr.markForCheck();
          }).catch(() => {
            this.compilationError.set({
              message: "Error al leer la respuesta de error del servidor."
            });
            this.isCompiling.set(false);
            this.cdr.markForCheck();
          });
        } else {
          const mensajeError = err?.error?.details || err?.error?.message || err?.error?.error || err?.message || "Error al conectar con el servidor de compilaci\xF3n 3D.";
          this.compilationError.set({
            message: mensajeError
          });
          this.isCompiling.set(false);
          this.cdr.markForCheck();
        }
      }
    });
  }
  removeText(id) {
    if (!confirm("\xBFConfirma que desea eliminar este archivo/documento?")) {
      return;
    }
    this.isCompiling.set(true);
    this.clearError();
    this.cdr.markForCheck();
    this.http.delete(`${this.apiUrl}/articles/newwwww/${id}`).subscribe({
      next: () => {
        this.toastr.success("Documento eliminado correctamente");
        this.loadNoteData();
        this.isCompiling.set(false);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error("Error al eliminar:", err);
        this.toastr.error("No se pudo eliminar el documento");
        this.isCompiling.set(false);
        this.cdr.markForCheck();
      }
    });
  }
  createText() {
    this.closeCreateModal();
    this.isCompiling.set(true);
    const defaultLatexContent = `\\documentclass[a4paper, 12pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[spanish]{babel}
\\usepackage{amsmath, amssymb}
\\usepackage{graphicx}
\\usepackage{asymptote}
\\usepackage{mlmodern}
\\usepackage[margin=2.5cm]{geometry}

\\title{Ejemplo de LaTeX con Ecuaciones y Gr\xE1fico 3D en Asymptote}
\\author{Generado por Asistente IA}
\\date{\\today}

\\begin{document}

\\maketitle

\\section{Introducci\xF3n}
En este documento se muestra la representaci\xF3n matem\xE1tica y visual de una superficie param\xE9trica tridimensional. Las herramientas de gr\xE1ficos vectoriales como \\textbf{Asymptote} permiten renderizar figuras geom\xE9tricas con calidad tipogr\xE1fica exacta a la del documento.

\\section{Formulaci\xF3n Matem\xE1tica}
La superficie analizada corresponde a un \\textbf{paraboloide hiperb\xF3lico} (com\xFAnmente conocido como "silla de montar"), definido por la siguiente funci\xF3n escalar en coordenadas cartesianas:

\\begin{equation}
    f(x, y) = \\frac{x^2}{a^2} - \\frac{y^2}{b^2}
    \\label{eq:paraboloide}
\\end{equation}

Alternativamente, podemos expresarlo mediante su parametrizaci\xF3n vectorial en funci\xF3n de los par\xE1metros $u$ y $v$:

\\begin{align}
    x(u, v) &= u \\\\
    y(u, v) &= v \\\\
    z(u, v) &= u^2 - v^2
    \\label{eq:param}
\\end{align}

\\section{Gr\xE1fico 3D con Asymptote}
El siguiente gr\xE1fico generado mediante Asymptote muestra la superficie descrita por la ecuaci\xF3n \\eqref{eq:paraboloide} in el dominio $x, y \\in [-2, 2]$:

% --- BLOQUE DE ASYMPTOTE ---
\\begin{center}
\\begin{asy}
import graph3;
size(300);

pen yellow=rgb("F1FA8C");
pen purple=rgb("BB95FF");
pen blue=rgb("7A8FFE");
pen darkblack=rgb("101010");

currentprojection=orthographic(3,3,1,up=Z);
currentlight=light((1,0,1),(-1.5,0,-1));
currentlight.background=darkblack;

real aS=2.5;
draw(Label("$x$",EndPoint),-aS*X--aS*X,white,Arrow3);
draw(Label("$y$",EndPoint),-aS*Y--aS*Y,white,Arrow3);
draw(Label("$z$",EndPoint),-aS*Z--aS*Z,white,Arrow3);

draw(shift(0.5,0,-2)*scale(0.5,0.5,4)*unitcylinder,
     material(blue+opacity(0.8),shininess=0.3));

draw(unitsphere,material(purple,shininess=0.3));

triple f(real t) {return(cos(t)^2,cos(t)*sin(t),sin(t));}

path3 curve=graph(f,0,8pi,operator ..);
draw(curve,yellow+linewidth(1));
\\end{asy}
\\end{center}

\\section{Conclusi\xF3n} 
La combinaci\xF3n de \\LaTeX{} para las expresiones formales descritas en \\eqref{eq:param} y Asymptote para los modelos espaciales ofrece una soluci\xF3n robusta y limpia para publicaciones cient\xEDficas, tesis y art\xEDculos t\xE9cnicos.
www
\\end{document}`;
    const titleToSend = this.newFileTitle() || "documento_nuevo";
    this.http.post(`${this.apiUrl}/articles/createnewtext`, {
      contenido: defaultLatexContent,
      title: titleToSend,
      description: "Documento LaTeX con Asymptote 3D generado autom\xE1ticamente",
      user: this.auth?._id,
      email: this.auth?.email,
      folder: "folder"
    }).subscribe({
      next: (response) => {
        if (response?.contenido) {
          this.noteText.set(defaultLatexContent);
          this.selectedTitle.set(titleToSend);
          this.toastr.success(`Documento "${titleToSend}" creado y cargado correctamente`);
          this.loadNoteData();
        }
        this.isCompiling.set(false);
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.isCompiling.set(false);
        console.error("Error al enviar el texto:", error);
        this.toastr.error("No se pudo enviar ni cargar el texto predeterminado");
        this.cdr.markForCheck();
      }
    });
  }
  static \u0275fac = function CreateNoteComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CreateNoteComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateNoteComponent, selectors: [["app-create-note"]], decls: 50, vars: 12, consts: [["lineNumbers", ""], ["editorTextArea", ""], [1, "py-5"], [1, "container-fluid", "px-4", 2, "max-width", "1400px"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4", "p-3", "bg-white", "border", "rounded", "shadow-sm"], [1, "fw-bold", "text-dark", "m-0"], [1, "bi", "bi-file-earmark-code", "text-primary", "me-2"], [1, "text-muted", "font-monospace"], [1, "d-flex", "align-items-center", "gap-2"], ["type", "button", "title", "Ver el \xFAltimo PDF compilado", 1, "btn", "btn-sm", "btn-outline-primary", "d-flex", "align-items-center", "gap-1", "shadow-sm", "px-3", "py-2"], [1, "row", "g-4"], [1, "col-lg-4", "col-md-5"], [1, "card", "border-0", "shadow-sm", "h-100"], [1, "card-header", "bg-white", "d-flex", "justify-content-between", "align-items-center", "py-3"], [1, "bi", "bi-folder2-open", "text-primary", "me-1"], ["type", "button", 1, "btn", "btn-sm", "btn-primary", "d-flex", "align-items-center", "gap-1", "shadow-sm", "px-2", "py-1", 3, "click", "disabled"], [1, "card-body", "p-3", "overflow-auto", 2, "max-height", "70vh"], [1, "text-muted", "small", "text-center", "my-4"], [1, "col-lg-8", "col-md-7"], [1, "card", "border-0", "shadow-sm", "p-4", "bg-white"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-2"], ["for", "textContent", 1, "form-label", "fw-bold", "m-0", "text-secondary"], [1, "bi", "bi-code-square"], [1, "editor-main-wrapper", "position-relative", "border", "rounded", "bg-light", "d-flex", "overflow-hidden", "shadow-sm"], ["type", "button", 1, "btn", "btn-info", "text-white", "px-3", "py-2", "fw-semibold", "shadow-lg", "d-flex", "align-items-center", "gap-2", "position-absolute", "top-0", "end-0", "m-3", "floating-compile-btn", 2, "z-index", "10", 3, "click", "disabled"], [1, "line-numbers", "py-2", "px-1", "text-end", "select-none", "font-monospace", "text-muted", "bg-light", "border-end"], ["id", "textContent", "placeholder", "Seleccione o cree un archivo...", 1, "form-control", "w-100", "code-editor", "border-0", "shadow-none", "pb-5", 3, "ngModelChange", "scroll", "ngModel", "disabled"], ["role", "alert", 1, "alert", "alert-danger", "shadow-sm", "mt-3", "position-relative"], ["tabindex", "-1", 1, "modal", "fade", "show", "d-block", 2, "background-color", "rgba(0,0,0,0.5)"], ["type", "button", "title", "Ver el \xFAltimo PDF compilado", 1, "btn", "btn-sm", "btn-outline-primary", "d-flex", "align-items-center", "gap-1", "shadow-sm", "px-3", "py-2", 3, "click"], [1, "bi", "bi-file-earmark-pdf"], [1, "list-group", "list-group-flush"], [1, "font-monospace", "small", "text-muted", "bg-light", "p-2", "rounded"], [1, "list-group-item", "px-3", "py-3", "d-flex", "justify-content-between", "align-items-center", "border", "rounded", "mb-2", "shadow-sm", "file-item", 2, "cursor", "pointer", 3, "border-primary", "bg-warning"], [1, "list-group-item", "px-3", "py-3", "d-flex", "justify-content-between", "align-items-center", "border", "rounded", "mb-2", "shadow-sm", "file-item", 2, "cursor", "pointer", 3, "click"], [1, "text-truncate", "me-2", "w-100"], ["contenteditable", "true", "title", "Haz clic para editar el t\xEDtulo", 1, "fw-bold", "text-dark", "d-block", "text-truncate", "border-bottom", "border-transparent", "px-1", 2, "outline", "none", 3, "blur", "click"], [1, "text-muted", "text-truncate", "d-block", "mt-1", 2, "font-size", "0.75rem"], [1, "d-flex", "align-items-center", "gap-1", "flex-shrink-0", 3, "click"], ["type", "button", "title", "Cargar archivo", 1, "btn", "btn-sm", "btn-outline-info", "px-2", "py-1", "shadow-sm", 3, "click", "disabled"], [1, "bi", "bi-folder-symlink"], ["type", "button", "title", "Eliminar archivo", 1, "btn", "btn-sm", "btn-outline-danger", "px-2", "py-1", "shadow-sm", 3, "click", "disabled"], [1, "bi", "bi-trash"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm"], [1, "bi", "bi-play-fill"], [1, "d-flex", "justify-content-between", "align-items-start"], [1, "alert-heading", "fw-bold", "mb-1"], [1, "bi", "bi-exclamation-triangle-fill"], [1, "mb-1", "text-break"], [1, "my-2"], [1, "error-log-box", "m-0"], [1, "modal-dialog", "modal-dialog-centered"], [1, "modal-content", "shadow-lg", "border-0"], [1, "modal-header", "bg-dark", "text-white", "py-3"], [1, "modal-title"], [1, "bi", "bi-file-earmark-plus", "me-2"], [1, "modal-body", "p-4"], [1, "mb-3"], [1, "form-label", "fw-semibold"], ["type", "text", "placeholder", "Ej: mi_articulo_cientifico", "name", "newFileTitle", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "text-muted", "mt-1", "d-block"], [1, "modal-footer", "bg-light", "py-3"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn", "btn-primary", 3, "click"]], template: function CreateNoteComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275element(0, "app-navbar")(1, "div", 2);
      \u0275\u0275elementStart(2, "div", 3)(3, "div", 4)(4, "div")(5, "h5", 5);
      \u0275\u0275element(6, "i", 6);
      \u0275\u0275text(7, " Gestor de Documentos LaTeX / Asymptote ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "small", 7)(9, "span");
      \u0275\u0275text(10);
      \u0275\u0275elementEnd();
      \u0275\u0275text(11, " | ");
      \u0275\u0275elementStart(12, "span");
      \u0275\u0275text(13);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(14, "div", 8);
      \u0275\u0275conditionalCreate(15, CreateNoteComponent_Conditional_15_Template, 3, 0, "button", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 10)(17, "div", 11)(18, "div", 12)(19, "div", 13)(20, "h6", 5);
      \u0275\u0275element(21, "i", 14);
      \u0275\u0275text(22, " Archivos Asociados ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "button", 15);
      \u0275\u0275listener("click", function CreateNoteComponent_Template_button_click_23_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openCreateModal());
      });
      \u0275\u0275text(24, " Nuevo documento ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 16);
      \u0275\u0275conditionalCreate(26, CreateNoteComponent_Conditional_26_Template, 2, 1)(27, CreateNoteComponent_Conditional_27_Template, 2, 0, "p", 17);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "div", 18)(29, "div", 19)(30, "div", 20)(31, "label", 21);
      \u0275\u0275element(32, "i", 22);
      \u0275\u0275text(33, " C\xF3digo LaTeX / Asymptote: ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "small", 7);
      \u0275\u0275text(35, "Activo: ");
      \u0275\u0275elementStart(36, "strong");
      \u0275\u0275text(37);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(38, "div", 23)(39, "button", 24);
      \u0275\u0275listener("click", function CreateNoteComponent_Template_button_click_39_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.sendEditedText(ctx.selectedTitle()));
      });
      \u0275\u0275conditionalCreate(40, CreateNoteComponent_Conditional_40_Template, 3, 0)(41, CreateNoteComponent_Conditional_41_Template, 3, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "div", 25, 0);
      \u0275\u0275repeaterCreate(44, CreateNoteComponent_For_45_Template, 2, 1, "div", null, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "textarea", 26, 1);
      \u0275\u0275listener("ngModelChange", function CreateNoteComponent_Template_textarea_ngModelChange_46_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.noteText.set($event));
      })("scroll", function CreateNoteComponent_Template_textarea_scroll_46_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.syncScroll($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(48, CreateNoteComponent_Conditional_48_Template, 9, 2, "div", 27);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(49, CreateNoteComponent_Conditional_49_Template, 19, 1, "div", 28);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate1("Rol: ", ctx.auth == null ? null : ctx.auth.rol);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("Email: ", ctx.auth == null ? null : ctx.auth.email);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.lastPdfBlob() ? 15 : -1);
      \u0275\u0275advance(8);
      \u0275\u0275property("disabled", ctx.isCompiling());
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.noteFiles() ? 26 : 27);
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate(ctx.selectedTitle());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isCompiling());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isCompiling() ? 40 : 41);
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.lineCountArray());
      \u0275\u0275advance(2);
      \u0275\u0275property("ngModel", ctx.noteText())("disabled", ctx.isCompiling());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.compilationError() ? 48 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showCreateModal() ? 49 : -1);
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    RequiredValidator,
    NgModel,
    Navbar
  ], styles: ['\n\n.editor-main-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  background-color: #fafbfc;\n  height: 65vh;\n}\n.line-numbers[_ngcontent-%COMP%] {\n  width: 50px;\n  font-size: 0.95rem;\n  line-height: 1.5;\n  -webkit-user-select: none;\n  user-select: none;\n  background-color: #f1f3f5;\n  overflow: hidden;\n  white-space: pre;\n}\n.code-editor[_ngcontent-%COMP%] {\n  font-family:\n    "Fira Code",\n    Consolas,\n    Monaco,\n    "Andale Mono",\n    monospace;\n  font-size: 0.95rem;\n  line-height: 1.5;\n  background-color: transparent !important;\n  color: #24292e;\n  resize: vertical;\n  tab-size: 2;\n  white-space: pre;\n  height: 100%;\n  overflow-y: auto;\n}\n.code-editor[_ngcontent-%COMP%]:focus {\n  outline: none;\n  box-shadow: none;\n}\n.floating-compile-btn[_ngcontent-%COMP%] {\n  border-radius: 50rem;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\n}\n.floating-compile-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15) !important;\n}\n.file-item[_ngcontent-%COMP%] {\n  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;\n}\n.file-item[_ngcontent-%COMP%]:hover {\n  background-color: #f1f3f5;\n}\n.error-log-box[_ngcontent-%COMP%] {\n  font-family:\n    "Fira Code",\n    Consolas,\n    monospace;\n  font-size: 0.8rem;\n  overflow-y: auto;\n  background-color: #f8d7da;\n  color: #842029;\n  padding: 10px;\n  border-radius: 4px;\n  white-space: pre-wrap;\n  word-break: break-all;\n}\n/*# sourceMappingURL=latexedit.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateNoteComponent, [{
    type: Component,
    args: [{ selector: "app-create-note", standalone: true, imports: [
      CommonModule,
      FormsModule,
      Navbar
    ], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <app-navbar></app-navbar>
    <div class="py-5"></div>
    <div class="container-fluid px-4" style="max-width: 1400px;">
        <!-- Cabecera Superior -->
        <div class="d-flex justify-content-between align-items-center mb-4 p-3 bg-white border rounded shadow-sm">
          <div>
            <h5 class="fw-bold text-dark m-0">
              <i class="bi bi-file-earmark-code text-primary me-2"></i> Gestor de Documentos LaTeX / Asymptote
            </h5>
            <!-- Informaci\xF3n de Usuario -->
            <small class="text-muted font-monospace">
              <span>Rol: {{ auth?.rol }}</span> | <span>Email: {{ auth?.email }}</span>
            </small>
          </div>
          
          <!-- Controles de la cabecera: Bot\xF3n de Visualizaci\xF3n condicional -->
          <div class="d-flex align-items-center gap-2">
            @if (lastPdfBlob()) {
              <button
                type="button"
                (click)="viewPdf()"
                class="btn btn-sm btn-outline-primary d-flex align-items-center gap-1 shadow-sm px-3 py-2"
                title="Ver el \xFAltimo PDF compilado"
              >
                <i class="bi bi-file-earmark-pdf"></i> Ver PDF Reciente
              </button>
            }
          </div>
        </div>

        <!-- LAYOUT DE DOS COLUMNAS: Izquierda (Archivos) | Derecha (Editor) -->
        <div class="row g-4">
          
          <!-- COLUMNA IZQUIERDA: Archivos Asociados -->
          <div class="col-lg-4 col-md-5">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-header bg-white d-flex justify-content-between align-items-center py-3">
                <h6 class="fw-bold text-dark m-0">
                  <i class="bi bi-folder2-open text-primary me-1"></i> Archivos Asociados
                </h6>
                <button
                  type="button"
                  (click)="openCreateModal()"
                  [disabled]="isCompiling()"
                  class="btn btn-sm btn-primary d-flex align-items-center gap-1 shadow-sm px-2 py-1"
                >
                  Nuevo documento
                </button>
              </div>

              <div class="card-body p-3 overflow-auto" style="max-height: 70vh;">
                @if (noteFiles()) {
                  @if (isArray(noteFiles())) {
                    <ul class="list-group list-group-flush">
                      @for (file of noteFiles(); track $index) {
                        <li 
                          class="list-group-item px-3 py-3 d-flex justify-content-between align-items-center border rounded mb-2 shadow-sm file-item"
                          [class.border-primary]="selectedTitle() === file.title"
                          [class.bg-warning]="selectedTitle() === file.title"
                          style="cursor: pointer;"
                          (click)="selectFile(file); selectAndCompile(file._id)"
                        >
                          <div class="text-truncate me-2 w-100">
                            <!-- Muestra el t\xEDtulo sin la extensi\xF3n .tex y permite editarlo -->
                            <span 
                              contenteditable="true" 
                              (blur)="updateNote(file._id, $event)"
                              class="fw-bold text-dark d-block text-truncate border-bottom border-transparent px-1"
                              style="outline: none;"
                              title="Haz clic para editar el t\xEDtulo"
                              (click)="$event.stopPropagation()"
                            >{{ getDisplayName(file.title) }}</span>

                            <small class="text-muted text-truncate d-block mt-1" style="font-size: 0.75rem;">
                              Autor: {{ file.email || 'N/A' }}
                            </small>
                          </div>
                          
                          <div class="d-flex align-items-center gap-1 flex-shrink-0" (click)="$event.stopPropagation()">
                            <button
                              type="button"
                              (click)="selectAndCompile(file._id)"
                              [disabled]="isCompiling()"
                              class="btn btn-sm btn-outline-info px-2 py-1 shadow-sm"
                              title="Cargar archivo"
                            >
                              <i class="bi bi-folder-symlink"></i>
                            </button>

                            <button
                              type="button"
                              (click)="removeText(file._id)"
                              [disabled]="isCompiling()"
                              class="btn btn-sm btn-outline-danger px-2 py-1 shadow-sm"
                              title="Eliminar archivo"
                            >
                              <i class="bi bi-trash"></i>
                            </button>
                          </div>
                        </li>
                      }
                    </ul>
                  } @else {
                    <div class="font-monospace small text-muted bg-light p-2 rounded">
                      {{ noteFiles() }}
                    </div>
                  }
                } @else {
                  <p class="text-muted small text-center my-4">No hay archivos asociados.</p>
                }
              </div>
            </div>
          </div>

          <!-- COLUMNA DERECHA: Editor y Acciones con Numeraci\xF3n de L\xEDneas -->
          <div class="col-lg-8 col-md-7">
            <div class="card border-0 shadow-sm p-4 bg-white">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <label for="textContent" class="form-label fw-bold m-0 text-secondary">
                  <i class="bi bi-code-square"></i> C\xF3digo LaTeX / Asymptote:
                </label>
                <small class="text-muted font-monospace">Activo: <strong>{{ selectedTitle() }}</strong></small>
              </div>

              <!-- EDITOR CON ALTURA FLUIDA Y BOT\xD3N FLOTANTE -->
              <div class="editor-main-wrapper position-relative border rounded bg-light d-flex overflow-hidden shadow-sm">
                
                <!-- BOT\xD3N FLOTANTE EN LA ESQUINA INFERIOR DERECHA -->
                <button
                  type="button"
                  (click)="sendEditedText(selectedTitle())"
                  [disabled]="isCompiling()"
                  class="btn btn-info text-white px-3 py-2 fw-semibold shadow-lg d-flex align-items-center gap-2 position-absolute top-0 end-0 m-3 floating-compile-btn"
                  style="z-index: 10;"
                >
                  @if (isCompiling()) {
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>Compilando...</span>
                  } @else {
                    <i class="bi bi-play-fill"></i> <span>Guardar y Compilar PDF 3D</span>
                  }
                </button>

                <!-- Columna de N\xFAmeros de L\xEDnea -->
                <div #lineNumbers class="line-numbers py-2 px-1 text-end select-none font-monospace text-muted bg-light border-end">
                  @for (line of lineCountArray(); track $index) {
                    <div>{{ $index + 1 }}</div>
                  }
                </div>

                <!-- \xC1rea de Texto del Editor sin l\xEDmite fijo de filas -->
                <textarea
                  #editorTextArea
                  id="textContent"
                  [ngModel]="noteText()"
                  (ngModelChange)="noteText.set($event)"
                  (scroll)="syncScroll($event)"
                  class="form-control w-100 code-editor border-0 shadow-none pb-5"
                  placeholder="Seleccione o cree un archivo..."
                  [disabled]="isCompiling()"
                ></textarea>
              </div>
              
              <!-- NOTIFICACI\xD3N INTEGRADA DE ERROR -->
              @if (compilationError()) {
                <div class="alert alert-danger shadow-sm mt-3 position-relative" role="alert">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 class="alert-heading fw-bold mb-1">
                        <i class="bi bi-exclamation-triangle-fill"></i> Error de compilaci\xF3n
                      </h6>
                      <p class="mb-1 text-break">{{ compilationError()?.message }}</p>
                    </div>
                  </div>
                  
                  @if (compilationError()?.details) {
                    <hr class="my-2">
                    <pre class="error-log-box m-0">{{ compilationError()?.details }}</pre>
                  }
                </div>
              }
            </div>
          </div>

        </div>

        <!-- MODAL PARA INGRESAR T\xCDTULO DE NUEVO DOCUMENTO -->
        @if (showCreateModal()) {
          <div class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content shadow-lg border-0">
                <div class="modal-header bg-dark text-white py-3">
                  <h5 class="modal-title">
                    <i class="bi bi-file-earmark-plus me-2"></i> Crear Nuevo Documento
                  </h5>
                </div>

                <div class="modal-body p-4">
                  <div class="mb-3">
                    <label class="form-label fw-semibold">T\xEDtulo del Archivo / Documento</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Ej: mi_articulo_cientifico"
                      [(ngModel)]="newFileTitle"
                      name="newFileTitle"
                      required
                    />
                    <small class="text-muted mt-1 d-block">Se guardar\xE1 con la extensi\xF3n .tex autom\xE1ticamente.</small>
                  </div>
                </div>

                <div class="modal-footer bg-light py-3">
                  <button type="button" class="btn btn-secondary" (click)="closeCreateModal()">Cancelar</button>
                  <button type="button" class="btn btn-primary" (click)="createText()">
                    Confirmar y Crear
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
    </div>
  `, styles: ['/* angular:styles/component:css;0e0596a68970dd9eec4e255be511e4a9c9af2eeac640a38d826a63023fcbb29c;/home/linuxlite/WebMEAN/src/app/componentes/latexedit.ts */\n.editor-main-wrapper {\n  position: relative;\n  background-color: #fafbfc;\n  height: 65vh;\n}\n.line-numbers {\n  width: 50px;\n  font-size: 0.95rem;\n  line-height: 1.5;\n  -webkit-user-select: none;\n  user-select: none;\n  background-color: #f1f3f5;\n  overflow: hidden;\n  white-space: pre;\n}\n.code-editor {\n  font-family:\n    "Fira Code",\n    Consolas,\n    Monaco,\n    "Andale Mono",\n    monospace;\n  font-size: 0.95rem;\n  line-height: 1.5;\n  background-color: transparent !important;\n  color: #24292e;\n  resize: vertical;\n  tab-size: 2;\n  white-space: pre;\n  height: 100%;\n  overflow-y: auto;\n}\n.code-editor:focus {\n  outline: none;\n  box-shadow: none;\n}\n.floating-compile-btn {\n  border-radius: 50rem;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\n}\n.floating-compile-btn:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15) !important;\n}\n.file-item {\n  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;\n}\n.file-item:hover {\n  background-color: #f1f3f5;\n}\n.error-log-box {\n  font-family:\n    "Fira Code",\n    Consolas,\n    monospace;\n  font-size: 0.8rem;\n  overflow-y: auto;\n  background-color: #f8d7da;\n  color: #842029;\n  padding: 10px;\n  border-radius: 4px;\n  white-space: pre-wrap;\n  word-break: break-all;\n}\n/*# sourceMappingURL=latexedit.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateNoteComponent, { className: "CreateNoteComponent", filePath: "src/app/componentes/latexedit.ts", lineNumber: 327 });
})();
export {
  CreateNoteComponent
};
//# sourceMappingURL=chunk-IFVRXFL4.mjs.map
