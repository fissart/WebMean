import './polyfills.server.mjs';
import {
  MarkdownComponent
} from "./chunk-ZSE5J3GM.mjs";
import {
  CKEditorComponent,
  CKEditorModule,
  require_ckeditor
} from "./chunk-ME3KNJBH.mjs";
import {
  require_jspdf_node_min
} from "./chunk-6AXZZUXX.mjs";
import {
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
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
import "./chunk-NIVJ4KPM.mjs";
import {
  ActivatedRoute,
  Router
} from "./chunk-IESDD46D.mjs";
import {
  HttpClient
} from "./chunk-JRMDAGFP.mjs";
import {
  CommonModule,
  NgClass
} from "./chunk-TDOK3CTI.mjs";
import {
  Component,
  Injectable,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
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
  ɵɵtextInterpolate1
} from "./chunk-GYAE75W3.mjs";
import {
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-TB3YAHZW.mjs";

// src/app/componentes/substats.ts
var import_ckeditor5_build_classic = __toESM(require_ckeditor());
var import_jspdf = __toESM(require_jspdf_node_min());
function TestsComponent_Conditional_5_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("ID Registro: ", ctx_r0.id());
  }
}
function TestsComponent_Conditional_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "h2", 4);
    \u0275\u0275text(2, "\xA1Muchas gracias por participar!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 5);
    \u0275\u0275text(4, "Tus respuestas han sido registradas correctamente en la base de datos.");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, TestsComponent_Conditional_5_Conditional_0_Conditional_5_Template, 2, 1, "p", 6);
    \u0275\u0275elementStart(6, "div", 7)(7, "span", 8);
    \u0275\u0275text(8, "Cargando...");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r0.id() ? 5 : -1);
  }
}
function TestsComponent_Conditional_5_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Seleccionaste ", ctx_r0.formatSubtipo(ctx_r0.subtipo()), " ");
  }
}
function TestsComponent_Conditional_5_Conditional_1_For_3_Conditional_6_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const guest_r5 = ctx.$implicit;
    \u0275\u0275property("value", guest_r5[0]);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(guest_r5[0]);
  }
}
function TestsComponent_Conditional_5_Conditional_1_For_3_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "select", 18);
    \u0275\u0275listener("ngModelChange", function TestsComponent_Conditional_5_Conditional_1_For_3_Conditional_6_Template_select_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const \u0275$index_36_r4 = \u0275\u0275nextContext().$index;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.handleItemChange(\u0275$index_36_r4, $event));
    });
    \u0275\u0275elementStart(2, "option", 19);
    \u0275\u0275text(3, "Seleccione opci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, TestsComponent_Conditional_5_Conditional_1_For_3_Conditional_6_For_5_Template, 2, 2, "option", 20, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const number_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", number_r6.std);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(number_r6.alt);
  }
}
function TestsComponent_Conditional_5_Conditional_1_For_3_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ckeditor", 21);
    \u0275\u0275listener("blur", function TestsComponent_Conditional_5_Conditional_1_For_3_Conditional_7_Template_ckeditor_blur_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const \u0275$index_36_r4 = \u0275\u0275nextContext().$index;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.handleItemChange(\u0275$index_36_r4, $event.editor.getData()));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const number_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("editor", ctx_r0.Editor)("config", ctx_r0.editorConfig)("data", number_r6.std || "");
  }
}
function TestsComponent_Conditional_5_Conditional_1_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 13);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "p", 14);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "markdown", 15);
    \u0275\u0275conditionalCreate(6, TestsComponent_Conditional_5_Conditional_1_For_3_Conditional_6_Template, 6, 1, "div", 16)(7, TestsComponent_Conditional_5_Conditional_1_For_3_Conditional_7_Template, 1, 3, "ckeditor", 17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const number_r6 = ctx.$implicit;
    const \u0275$index_36_r4 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.cardBorderClass());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" [", \u0275$index_36_r4 + 1, "] ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(number_r6.prg);
    \u0275\u0275advance();
    \u0275\u0275property("katex", true)("data", number_r6.std);
    \u0275\u0275advance();
    \u0275\u0275conditional(number_r6.alt ? 6 : 7);
  }
}
function TestsComponent_Conditional_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, TestsComponent_Conditional_5_Conditional_1_Conditional_0_Template, 2, 1, "div", 9);
    \u0275\u0275elementStart(1, "div", 10);
    \u0275\u0275repeaterCreate(2, TestsComponent_Conditional_5_Conditional_1_For_3_Template, 8, 6, "div", 11, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 12);
    \u0275\u0275listener("click", function TestsComponent_Conditional_5_Conditional_1_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.sendTest());
    });
    \u0275\u0275text(5, " Enviar ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r0.subtipo() ? 0 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.items());
  }
}
function TestsComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, TestsComponent_Conditional_5_Conditional_0_Template, 9, 1, "div", 3)(1, TestsComponent_Conditional_5_Conditional_1_Template, 6, 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.isSubmitted() ? 0 : 1);
  }
}
function isAuth() {
  const authData = localStorage.getItem("user");
  return authData ? JSON.parse(authData) : null;
}
var SurveyService = class _SurveyService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiURL}/api`;
  getSurveyBySubtipo(subtipo) {
    return this.http.get(`${this.apiUrl}/surveys/www/${subtipo}`);
  }
  saveSurvey(payload) {
    return this.http.post(`${this.apiUrl}/surveys/savesurvey`, payload);
  }
  updateSurvey(id, items) {
    return this.http.put(`${this.apiUrl}/surveys/${id}`, { items });
  }
  static \u0275fac = function SurveyService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SurveyService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SurveyService, factory: _SurveyService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SurveyService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var TestsComponent = class _TestsComponent {
  surveyService = inject(SurveyService);
  toastr = inject(ToastrService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  // CKEditor 5
  Editor = import_ckeditor5_build_classic.default;
  editorConfig = {
    language: "es",
    placeholder: "Descripci\xF3n",
    toolbar: ["undo", "redo", "|", "bold", "italic", "link", "bulletedList", "numberedList"]
  };
  // State Management con Signals
  items = signal([], ...ngDevMode ? [{ debugName: "items" }] : []);
  subtipo = signal("", ...ngDevMode ? [{ debugName: "subtipo" }] : []);
  subtipostats = signal("", ...ngDevMode ? [{ debugName: "subtipostats" }] : []);
  id = signal("", ...ngDevMode ? [{ debugName: "id" }] : []);
  author = signal("nauth", ...ngDevMode ? [{ debugName: "author" }] : []);
  isSubmitted = signal(false, ...ngDevMode ? [{ debugName: "isSubmitted" }] : []);
  // Parámetros de ruta
  emailParam = signal("", ...ngDevMode ? [{ debugName: "emailParam" }] : []);
  tipoParam = signal("", ...ngDevMode ? [{ debugName: "tipoParam" }] : []);
  // Propiedades Computadas
  isTargetHostname = computed(() => window.location.hostname === "www.esfapa.edu.pe", ...ngDevMode ? [{ debugName: "isTargetHostname" }] : []);
  instituteName = computed(() => this.isTargetHostname() ? "ESFAPA Web" : environment.title, ...ngDevMode ? [{ debugName: "instituteName" }] : []);
  cardBorderClass = computed(() => {
    switch (this.emailParam()) {
      case "estudiantecole":
      case "estudianteesfa":
      case "estudianteuni":
      case "estudianteinst":
        return "border-info";
      case "egresado":
      case "apoderado":
        return "border-success";
      case "empresarioinversor":
      case "empresarioproductor":
      case "empresariointermediario":
        return "border-primary";
      case "docenteuni":
      case "docenteesfa":
        return "border-warning";
      default:
        return "border-info";
    }
  }, ...ngDevMode ? [{ debugName: "cardBorderClass" }] : []);
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const email = params["email"] || "";
      const tipo = params["tipo"] || "egresado";
      this.emailParam.set(email);
      this.tipoParam.set(tipo);
      sessionStorage.setItem("auth", JSON.stringify(email));
      const itemGuardado = JSON.parse(sessionStorage.getItem("auth") || '""');
      if (itemGuardado === "nauth") {
        this.author.set("nauth");
      } else if (itemGuardado) {
        const datosAuth = Number(itemGuardado);
        const ahora = (/* @__PURE__ */ new Date()).getTime();
        if (!isNaN(datosAuth) && ahora > datosAuth) {
          this.author.set("nauth");
        } else {
          this.author.set("auth");
        }
      }
      this.subtipo.set(tipo);
      this.getSurveysStatsSubtipo(tipo);
    });
  }
  getSurveysStatsSubtipo(subtipoVal) {
    this.surveyService.getSurveyBySubtipo(subtipoVal).subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.subtipo.set(subtipoVal);
          this.subtipostats.set(subtipoVal);
          this.items.set(res[0].items || []);
        }
      },
      error: () => this.toastr.error("Error al cargar la encuesta y estad\xEDsticas")
    });
  }
  handleItemChange(index, value) {
    const updated = [...this.items()];
    updated[index] = __spreadProps(__spreadValues({}, updated[index]), { std: value });
    this.items.set(updated);
  }
  updatesurveyStd(data) {
    const user = isAuth();
    if (!this.id()) {
      const payload = {
        user: user?._id || "6a382709c284038205961561",
        email: user?.email || "an\xF3nimo",
        name: user?.name || "an\xF3nimo",
        ip: [],
        items: data,
        author: this.author(),
        tipo: "std",
        subtipo: this.subtipo()
      };
      this.surveyService.saveSurvey(payload).subscribe({
        next: (res) => {
          this.items.set(res.items);
          this.subtipo.set(res.subtipo);
          this.id.set(res._id);
          this.generateSurveyPDF(res._id, res.items, res.subtipo, user);
        },
        error: () => this.toastr.error("Error al procesar la encuesta")
      });
    } else {
      this.surveyService.updateSurvey(this.id(), data).subscribe({
        next: () => {
          this.generateSurveyPDF(this.id(), data, this.subtipo(), user);
        },
        error: () => this.toastr.error("Error al actualizar la encuesta")
      });
    }
  }
  sendTest() {
    const currentItems = this.items();
    for (let i = 0; i < currentItems.length; i++) {
      const stdValue = currentItems[i]?.std;
      if (stdValue === void 0 || stdValue === null || String(stdValue).trim() === "") {
        this.toastr.warning(`Por favor, completa el item ${i + 1}.`, "Campos incompletos");
        return;
      }
    }
    this.isSubmitted.set(true);
    this.toastr.success("\xA1Encuesta enviada con \xE9xito!");
    this.updatesurveyStd(currentItems);
    setTimeout(() => {
      this.router.navigate(["/stats"]);
    }, 5500);
  }
  formatSubtipo(text) {
    if (!text)
      return "";
    return text.replace(/(empresario|estudiante|docente)(inversor|productor|intermediario|cole|inst|esfa|uni)/i, "$1 $2").replace(/cole/i, " colegio").replace(/inst/i, " instituto").replace(/uni/i, " universitario").replace(/egresado/i, " egresado esfa").replace(/esfa/i, " ESFAPA FGPA").toUpperCase();
  }
  // --- LÓGICA DE GENERACIÓN DE REPORTE CON JSPDF ---
  generateSurveyPDF(surveyId, items, subtipoVal, user) {
    const doc = new import_jspdf.jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFillColor(13, 110, 253);
    doc.rect(0, 0, pageWidth, 25, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`Comprobante de Respuesta - ${this.instituteName()}`, 10, 16);
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Estado en Base de Datos:", 10, 35);
    doc.setTextColor(25, 135, 84);
    doc.text("GUARDADO CORRECTAMENTE", 60, 35);
    doc.setTextColor(40, 40, 40);
    doc.text("ID de Encuesta:", 10, 43);
    doc.setFont("helvetica", "normal");
    doc.text(surveyId || "N/A", 60, 43);
    doc.setFont("helvetica", "bold");
    doc.text("Tipo/Subtipo:", 10, 51);
    doc.setFont("helvetica", "normal");
    doc.text(this.formatSubtipo(subtipoVal), 60, 51);
    doc.setFont("helvetica", "bold");
    doc.text("Usuario:", 10, 59);
    doc.setFont("helvetica", "normal");
    doc.text(`${user?.name || "An\xF3nimo"} (${user?.email || "Sin correo"})`, 60, 59);
    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.line(10, 65, pageWidth - 10, 65);
    const fecha = (/* @__PURE__ */ new Date()).toLocaleString();
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Reporte generado el: ${fecha}`, 10, 290);
    doc.save(`encuesta_${surveyId || "registro"}.pdf`);
  }
  // Método auxiliar para eliminar etiquetas HTML de textos ricos
  stripHtml(html) {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
  static \u0275fac = function TestsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TestsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TestsComponent, selectors: [["app-tests"]], decls: 6, vars: 2, consts: [[1, "py-5"], [1, "container", "w-100", "p-1", "my-3", "rounded"], [1, "text-center", "w-100", "ffont", "d-block", "mb-3"], [1, "text-center", "p-5", "bg-light", "border", "rounded", "my-4"], [1, "text-success", "fw-bold", "mb-3"], [1, "text-muted"], [1, "badge", "bg-secondary", "fs-6", "p-2"], ["role", "status", 1, "spinner-border", "text-info", "mt-3", "d-block", "mx-auto"], [1, "visually-hidden"], [1, "text-uppercase", "text-center", "w-100", "my-1"], [1, "row", "justify-content-center", "align-items-center", 2, "margin", "0.5em"], [1, "col-sm-12", "col-md-6", "col-lg-6", "col-xl-4", "p-1"], ["type", "button", 1, "btn", "btn-info", "w-100", 2, "margin", "0.1em", 3, "click"], [1, "p-1", "bg-light", "rounded", "border", 3, "ngClass"], [1, "mb-1", "fw-bold"], [3, "katex", "data"], [1, "marginbottomp"], [3, "editor", "config", "data"], [1, "form-select", 3, "ngModelChange", "ngModel"], ["value", "", "disabled", "", "selected", ""], [3, "value"], [3, "blur", "editor", "config", "data"]], template: function TestsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-navbar")(1, "div", 0);
      \u0275\u0275elementStart(2, "div", 1)(3, "h3", 2);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(5, TestsComponent_Conditional_5_Template, 2, 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" Estudio de mercado de la ", ctx.instituteName(), " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.items().length > 0 ? 5 : -1);
    }
  }, dependencies: [MarkdownComponent, Navbar, CommonModule, NgClass, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel, CKEditorModule, CKEditorComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TestsComponent, [{
    type: Component,
    args: [{
      selector: "app-tests",
      standalone: true,
      imports: [MarkdownComponent, Navbar, CommonModule, FormsModule, CKEditorModule],
      template: `
    <app-navbar></app-navbar>
    <div class="py-5"></div>
    <div class="container w-100 p-1 my-3 rounded">
      <h3 class="text-center w-100 ffont d-block mb-3">
        Estudio de mercado de la {{ instituteName() }}
      </h3>

      @if (items().length > 0) {
        @if (isSubmitted()) {
          <div class="text-center p-5 bg-light border rounded my-4">
            <h2 class="text-success fw-bold mb-3">\xA1Muchas gracias por participar!</h2>
            <p class="text-muted">Tus respuestas han sido registradas correctamente en la base de datos.</p>
            @if (id()) {
              <p class="badge bg-secondary fs-6 p-2">ID Registro: {{ id() }}</p>
            }
            <div class="spinner-border text-info mt-3 d-block mx-auto" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
          </div>
        } @else {
          @if (subtipo()) {
            <div class="text-uppercase text-center w-100 my-1">
              Seleccionaste {{ formatSubtipo(subtipo()) }}
            </div>
          }

          <div class="row justify-content-center align-items-center" style="margin: 0.5em;">
            @for (number of items(); track $index; let i = $index) {
              <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 p-1">
                <div class="p-1 bg-light rounded border" [ngClass]="cardBorderClass()">
                  [{{ i + 1 }}]
                  <p class="mb-1 fw-bold">{{ number.prg }}</p>
                  <!-- <p class="text-info mb-2">{{ number.std }}</p> -->
                  <markdown [katex]="true" [data]="number.std"></markdown>

                  @if (number.alt) {
                    <div class="marginbottomp">
                      <select
                        class="form-select"
                        [ngModel]="number.std"
                        (ngModelChange)="handleItemChange(i, $event)"
                      >
                        <option value="" disabled selected>Seleccione opci\xF3n</option>
                        @for (guest of number.alt; track $index) {
                          <option [value]="guest[0]">{{ guest[0] }}</option>
                        }
                      </select>
                    </div>
                  } @else {
                    <ckeditor
                      [editor]="Editor"
                      [config]="editorConfig"
                      [data]="number.std || ''"
                      (blur)="handleItemChange(i, $event.editor.getData())"
                    ></ckeditor>
                  }
                </div>
              </div>
            }
          </div>

          <button
            type="button"
            class="btn btn-info w-100"
            style="margin: 0.1em;"
            (click)="sendTest()"
          >
            Enviar
          </button>
        }
      }
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TestsComponent, { className: "TestsComponent", filePath: "src/app/componentes/substats.ts", lineNumber: 136 });
})();
export {
  SurveyService,
  TestsComponent,
  isAuth
};
//# sourceMappingURL=chunk-AO257QF4.mjs.map
