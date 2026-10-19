import {
  SurveyDashboardComponent
} from "./chunk-JC6IANBO.js";
import "./chunk-QMNH6UDY.js";
import "./chunk-DK4ZT7VK.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-OAEVIACX.js";
import {
  ToastrService
} from "./chunk-JEAYVHF3.js";
import {
  environment
} from "./chunk-5ESGTH3B.js";
import {
  Navbar
} from "./chunk-U3CDTOVP.js";
import "./chunk-DJCOHPHY.js";
import {
  Router
} from "./chunk-PFU5G7MY.js";
import {
  HttpClient
} from "./chunk-MMWGUNZC.js";
import {
  CommonModule
} from "./chunk-6QD4DAAM.js";
import {
  Component,
  Injectable,
  afterNextRender,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdeclareLet,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreadContextLet,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstoreLet,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-FXWIEX65.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-3WPM564S.js";

// src/app/componentes/statbegin.ts
var _forTrack0 = ($index, $item) => $item._id;
var _forTrack1 = ($index, $item) => $item.value;
function SStats_Conditional_5_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r3 = ctx.$implicit;
    \u0275\u0275property("value", opt_r3.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r3.label);
  }
}
function SStats_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "label", 10);
    \u0275\u0275text(2, " Agregar encuesta, seleccione el tipo: ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 11);
    \u0275\u0275listener("ngModelChange", function SStats_Conditional_5_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.subtipo.set($event));
    });
    \u0275\u0275elementStart(4, "option", 12);
    \u0275\u0275text(5, "Seleccione item");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(6, SStats_Conditional_5_For_7_Template, 2, 2, "option", 13, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 14);
    \u0275\u0275listener("click", function SStats_Conditional_5_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.registerDefaultSurvey());
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r1.subtipo());
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.techOptions);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.isLoading() || !ctx_r1.subtipo());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Registrar encuesta fuente ", ctx_r1.subtipo(), " ");
  }
}
function SStats_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Seleccionaste ", ctx_r1.formatSubtipo(ctx_r1.selectedSubtipoStats()), " ");
  }
}
function SStats_For_9_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function SStats_For_9_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const item_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.getNotes(item_r6._id));
    });
    \u0275\u0275element(1, "i", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 21);
    \u0275\u0275listener("click", function SStats_For_9_Conditional_4_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const item_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeSurvey(item_r6._id, item_r6.subtipo));
    });
    \u0275\u0275element(3, "i", 22);
    \u0275\u0275elementEnd();
  }
}
function SStats_For_9_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function SStats_For_9_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const item_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleCopyLink(item_r6.subtipo));
    });
    \u0275\u0275element(1, "i", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 25);
    \u0275\u0275listener("click", function SStats_For_9_Conditional_7_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r7);
      const item_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleShareLink(item_r6.subtipo));
    });
    \u0275\u0275element(3, "i", 26);
    \u0275\u0275elementEnd();
  }
}
function SStats_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 15);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "div", 16);
    \u0275\u0275conditionalCreate(4, SStats_For_9_Conditional_4_Template, 4, 0);
    \u0275\u0275elementStart(5, "button", 17);
    \u0275\u0275listener("click", function SStats_For_9_Template_button_click_5_listener() {
      const item_r6 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.getSurveysSourceSubtipo(item_r6.subtipo));
    });
    \u0275\u0275element(6, "i", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, SStats_For_9_Conditional_7_Template, 4, 0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" (", ctx_r1.formatSubtipo(item_r6.subtipo), ") ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.userRole() === "1" ? 4 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.userRole() === "1" || ctx_r1.userRole() === "2" ? 7 : -1);
  }
}
function SStats_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "label", 27);
    \u0275\u0275text(2, "Editor de Encuesta (JSON):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "textarea", 28);
    \u0275\u0275listener("ngModelChange", function SStats_Conditional_10_Template_textarea_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.itemsJsonString.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 29);
    \u0275\u0275listener("click", function SStats_Conditional_10_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateSurveysId());
    });
    \u0275\u0275text(5, " Actualizar JSON ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r1.itemsJsonString());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.isLoading());
  }
}
function SStats_Conditional_11_For_2_Conditional_8_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const altItem_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("value", ctx_r1.getOptionValue(altItem_r11));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getOptionValue(altItem_r11), " ");
  }
}
function SStats_Conditional_11_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 37);
    \u0275\u0275listener("ngModelChange", function SStats_Conditional_11_For_2_Conditional_8_Template_select_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const \u0275$index_78_r10 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.handleItemSelectChange(\u0275$index_78_r10, $event));
    });
    \u0275\u0275elementStart(1, "option", 38);
    \u0275\u0275text(2, "Seleccione respuesta...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, SStats_Conditional_11_For_2_Conditional_8_For_4_Template, 2, 2, "option", 13, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const question_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("ngModel", question_r12.std);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(question_r12.alt);
  }
}
function SStats_Conditional_11_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 39);
    \u0275\u0275listener("ngModelChange", function SStats_Conditional_11_For_2_Conditional_9_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const \u0275$index_78_r10 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.handleInputTextChange(\u0275$index_78_r10, $event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const question_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("ngModel", question_r12.std || "");
  }
}
function SStats_Conditional_11_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 31)(2, "div", 32)(3, "span", 33);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 34);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div");
    \u0275\u0275conditionalCreate(8, SStats_Conditional_11_For_2_Conditional_8_Template, 5, 1, "select", 35)(9, SStats_Conditional_11_For_2_Conditional_9_Template, 1, 1, "input", 36);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const question_r12 = ctx.$implicit;
    const \u0275$index_78_r10 = ctx.$index;
    \u0275\u0275classMap(question_r12.alt ? "col-12 col-md-6 col-lg-6 col-xl-4 px-3 mb-4" : "col-12 px-3 mb-4");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275$index_78_r10 + 1, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", question_r12.prg, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(question_r12.alt ? 8 : 9);
  }
}
function SStats_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275repeaterCreate(1, SStats_Conditional_11_For_2_Template, 10, 5, "div", 30, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.items());
  }
}
function SStats_Conditional_12_For_4_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const minutesDiff_r16 = \u0275\u0275readContextLet(0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("[", minutesDiff_r16, " mnts]");
  }
}
function SStats_Conditional_12_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275declareLet(0);
    \u0275\u0275elementStart(1, "div", 41)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 42);
    \u0275\u0275listener("click", function SStats_Conditional_12_For_4_Template_button_click_4_listener() {
      const std_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeSurvey(std_r15[3], std_r15[4]));
    });
    \u0275\u0275element(5, "i", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 44);
    \u0275\u0275text(9);
    \u0275\u0275conditionalCreate(10, SStats_Conditional_12_For_4_Conditional_10_Template, 2, 1, "span", 45);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const std_r15 = ctx.$implicit;
    const \u0275$index_112_r17 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    const minutesDiff_r18 = \u0275\u0275storeLet(ctx_r1.getMinutesDiff(std_r15[1], std_r15[2]));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275$index_112_r17 + 1, ".");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(std_r15[0] || "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatDate(std_r15[1]), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(minutesDiff_r18 !== null ? 10 : -1);
  }
}
function SStats_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "h5", 40);
    \u0275\u0275text(2, "Respuestas Registradas:");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, SStats_Conditional_12_For_4_Template, 11, 5, "div", 41, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.stds());
  }
}
function isAuth() {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }
  const authData = localStorage.getItem("user");
  return authData ? JSON.parse(authData) : null;
}
var StatsService = class _StatsService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiURL}/api`;
  getSurveysSource() {
    return this.http.get(`${this.apiUrl}/surveys/source`);
  }
  getSurveysStatsSubtipo(subtipo) {
    return this.http.get(`${this.apiUrl}/surveys/newwww/${subtipo}`);
  }
  getSurveyById(id) {
    return this.http.get(`${this.apiUrl}/surveys/${id}`);
  }
  updateSurvey(id, items) {
    return this.http.put(`${this.apiUrl}/surveys/${id}`, { items });
  }
  saveSurvey(data) {
    return this.http.post(`${this.apiUrl}/surveys`, data);
  }
  deleteSurvey(id) {
    return this.http.delete(`${this.apiUrl}/surveys/${id}`);
  }
  static \u0275fac = function StatsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StatsService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _StatsService, factory: _StatsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StatsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var SStats = class _SStats {
  statsService = inject(StatsService);
  toastr = inject(ToastrService);
  router = inject(Router);
  techOptions = [
    { value: "empresarioinversor", label: "Empresario inversor" },
    { value: "empresarioproductor", label: "Empresario productor" },
    { value: "empresariointermediario", label: "Empresario intermediario" },
    { value: "egresado", label: "Egresado" },
    { value: "estudiantecole", label: "Estudiante colegio" },
    { value: "estudianteinst", label: "Estudiante instituto" },
    { value: "estudianteesfa", label: "Estudiante ESFA" },
    { value: "estudianteuni", label: "Estudiante universitario" },
    { value: "docenteuni", label: "Docente Universitario" },
    { value: "docenteesfa", label: "Docente ESFA" },
    { value: "apoderado", label: "Apoderado" }
  ];
  // Reactividad nativa con Signals
  items = signal([], ...ngDevMode ? [{ debugName: "items" }] : []);
  itemsJsonString = signal("", ...ngDevMode ? [{ debugName: "itemsJsonString" }] : []);
  stds = signal([], ...ngDevMode ? [{ debugName: "stds" }] : []);
  prgs = signal([], ...ngDevMode ? [{ debugName: "prgs" }] : []);
  subtipo = signal("", ...ngDevMode ? [{ debugName: "subtipo" }] : []);
  selectedSubtipoStats = signal("", ...ngDevMode ? [{ debugName: "selectedSubtipoStats" }] : []);
  nsurveys = signal(0, ...ngDevMode ? [{ debugName: "nsurveys" }] : []);
  id = signal("", ...ngDevMode ? [{ debugName: "id" }] : []);
  source = signal([], ...ngDevMode ? [{ debugName: "source" }] : []);
  isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  userRole = signal("", ...ngDevMode ? [{ debugName: "userRole" }] : []);
  hostname = signal("", ...ngDevMode ? [{ debugName: "hostname" }] : []);
  // Computados
  isTargetHostname = computed(() => this.hostname() === "www.esfapa.edu.pe", ...ngDevMode ? [{ debugName: "isTargetHostname" }] : []);
  instituteName = computed(() => this.isTargetHostname() ? "ESFAPA Web" : environment.title, ...ngDevMode ? [{ debugName: "instituteName" }] : []);
  constructor() {
    afterNextRender(() => {
      this.hostname.set(window.location.hostname);
    });
  }
  ngOnInit() {
    const user = isAuth();
    this.userRole.set(user?.rol || "");
    this.getSurveysSource();
  }
  getSurveysSource() {
    this.statsService.getSurveysSource().subscribe({
      next: (data) => this.source.set(data || []),
      error: () => this.toastr.error("Error al obtener fuentes de encuestas")
    });
  }
  getSurveysSourceSubtipo(subtipoVal) {
    this.router.navigate([`/statest/${subtipoVal}/nauth`]);
  }
  getSurveyUrl(subtipoVal) {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const minutos = 5;
    const ahora = (/* @__PURE__ */ new Date()).getTime();
    return `${baseUrl}/statest/${subtipoVal}/${ahora + minutos * 60 * 1e3}`;
  }
  handleCopyLink(subtipoVal) {
    const url = this.getSurveyUrl(subtipoVal);
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(url).then(() => this.toastr.success("Enlace copiado al portapapeles")).catch(() => this.toastr.error("Error al copiar el enlace"));
    }
  }
  handleShareLink(subtipoVal) {
    const url = this.getSurveyUrl(subtipoVal);
    if (navigator?.share) {
      navigator.share({
        title: `Encuesta: ${subtipoVal}`,
        text: `Participa en la encuesta de ${subtipoVal}`,
        url
      }).catch(() => {
      });
    } else {
      this.handleCopyLink(subtipoVal);
    }
  }
  getNotes(idVal) {
    this.statsService.getSurveyById(idVal).subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          const loadedItems = res[0].items || [];
          this.items.set(loadedItems);
          this.itemsJsonString.set(JSON.stringify(loadedItems, null, 2));
          this.id.set(res[0]._id);
        } else {
          this.items.set([]);
          this.itemsJsonString.set("");
          this.id.set("");
        }
      },
      error: () => this.toastr.error("Error al obtener datos")
    });
  }
  updateSurveysId() {
    this.isLoading.set(true);
    try {
      const parsedItems = JSON.parse(this.itemsJsonString());
      this.statsService.updateSurvey(this.id(), parsedItems).subscribe({
        next: (res) => {
          this.items.set(parsedItems);
          this.toastr.info(typeof res === "string" ? res : "Actualizado correctamente");
          this.isLoading.set(false);
        },
        error: () => {
          this.toastr.error("Error al actualizar");
          this.isLoading.set(false);
        }
      });
    } catch {
      this.toastr.error("JSON inv\xE1lido");
      this.isLoading.set(false);
    }
  }
  registerDefaultSurvey() {
    const defaultItems = [
      {
        prg: "\xBFEst\xE1 satisfecho con nuestro servicio de atenci\xF3n al cliente?",
        alt: [["Si"], ["No"]],
        std: ""
      },
      {
        prg: "\xBFCon qu\xE9 frecuencia utiliza plataformas de streaming para ver pel\xEDculas?",
        alt: [
          ["Todos los d\xEDas"],
          ["Varias veces por semana"],
          ["Una vez por semana"],
          ["Rara vez"],
          ["Nunca"]
        ],
        std: ""
      },
      {
        prg: "\xBFQu\xE9 es lo que m\xE1s te gusta de tu nuevo trabajo?",
        obs: [],
        std: ""
      }
    ];
    this.submitTest("source", defaultItems);
  }
  submitTest(tipo, itemsData) {
    this.isLoading.set(true);
    const user = isAuth();
    const data = {
      user: user?._id,
      ip: [],
      items: itemsData,
      tipo,
      subtipo: this.subtipo()
    };
    this.statsService.saveSurvey(data).subscribe({
      next: (res) => {
        this.toastr.success(typeof res === "string" ? res : "Guardado exitosamente");
        this.getSurveysSource();
        this.isLoading.set(false);
      },
      error: () => {
        this.toastr.error("Error al registrar la encuesta");
        this.isLoading.set(false);
      }
    });
  }
  removeSurvey(idVal, subtipoVal) {
    if (confirm("\xBFDeseas eliminar este item?")) {
      this.statsService.deleteSurvey(idVal).subscribe({
        next: () => {
          this.toastr.info("Removido correctamente");
          this.getSurveysSource();
        },
        error: () => this.toastr.error("Error al eliminar")
      });
    }
  }
  handleItemSelectChange(index, value) {
    this.items.update((currentItems) => {
      const updated = [...currentItems];
      updated[index] = __spreadProps(__spreadValues({}, updated[index]), { std: value });
      this.itemsJsonString.set(JSON.stringify(updated, null, 2));
      return updated;
    });
  }
  handleInputTextChange(index, value) {
    this.items.update((currentItems) => {
      const updated = [...currentItems];
      updated[index] = __spreadProps(__spreadValues({}, updated[index]), { std: value });
      this.itemsJsonString.set(JSON.stringify(updated, null, 2));
      return updated;
    });
  }
  formatSubtipo(text) {
    if (!text)
      return "";
    return text.replace(/(empresario|estudiante|docente)(inversor|productor|intermediario|cole|inst|esfa|uni)/i, "$1 $2").replace(/cole/i, " colegio").replace(/inst/i, " instituto").replace(/egresado/i, " egresado esfa").replace(/uni/i, " universitario").replace(/esfa/i, " ESFAPA FGPA").toUpperCase();
  }
  getOptionValue(altItem) {
    return Array.isArray(altItem) ? altItem[0] : altItem;
  }
  getMinutesDiff(start, end) {
    if (!start || !end)
      return null;
    const diff = (new Date(end).getTime() - new Date(start).getTime()) / (1e3 * 60);
    return Math.round(diff * 100) / 100;
  }
  formatDate(dateStr) {
    if (!dateStr)
      return "";
    return new Date(dateStr).toLocaleString();
  }
  static \u0275fac = function SStats_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SStats)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SStats, selectors: [["app-stats"]], decls: 14, vars: 6, consts: [[1, "py-5"], [1, "container", "mt-5"], [1, "text-center", "w-100", "ffont", "h3", "mb-4"], [1, "mb-4", "p-3", "border", "rounded", "bg-light"], [1, "text-center", "w-100", "ffont", "h4", "text-primary", "my-3"], [1, "row", "p-2", "justify-content-center", "align-items-center", "g-2", "my-2"], [1, "col-sm-12", "col-md-6", "col-lg-6", "col-xl-4", "p-1"], [1, "my-4", "p-3", "border", "rounded", "bg-white", "shadow-sm"], [1, "row", "justify-content-center", "align-items-stretch", "g-4", "my-3"], [1, "mt-4", "p-3", "border-top"], ["for", "techSelect", 1, "form-label", "fw-bold"], ["id", "techSelect", 1, "form-select", "mb-3", 3, "ngModelChange", "ngModel"], ["value", "", "disabled", ""], [3, "value"], ["type", "button", 1, "btn", "btn-primary", "w-100", 3, "click", "disabled"], [1, "p-2", "bg-light", "text-center", "rounded", "border", "shadow-sm"], [1, "btn-group", "d-flex", "justify-content-center", "align-items-center", "mt-2"], ["type", "button", "title", "Responder la encuesta", 1, "btn", "btn-outline-primary", 3, "click"], [1, "bi", "bi-arrows-fullscreen"], ["type", "button", "title", "Editar JSON", 1, "btn", "btn-outline-info", 3, "click"], [1, "bi", "bi-pencil", 2, "font-size", "14px", "color", "#272cc1"], ["type", "button", "title", "Eliminar", 1, "btn", "btn-outline-danger", 3, "click"], [1, "bi", "bi-trash", 2, "font-size", "14px", "color", "#ff006a"], ["type", "button", "title", "Copiar enlace", 1, "btn", "btn-outline-success", 3, "click"], [1, "bi", "bi-copy", 2, "font-size", "14px", "color", "#20b6d7"], ["type", "button", "title", "Compartir enlace", 1, "btn", "btn-outline-warning", 3, "click"], [1, "bi", "bi-share", 2, "font-size", "14px", "color", "#0f72ab"], ["for", "jsonEditor", 1, "form-label", "fw-bold"], ["id", "jsonEditor", "rows", "8", 1, "form-control", "mb-2", "font-monospace", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "btn", "btn-info", "w-100", "text-white", "fw-bold", 3, "click", "disabled"], [3, "class"], [1, "card", "h-100", "shadow-sm", "border", "p-3", "border-info"], [1, "d-flex", "align-items-start", "gap-3", "mb-3"], [1, "badge", "bg-primary", "text-white", "rounded-pill", "fs-6", "px-3", "py-2"], [1, "flex-grow-1", "fw-bold", "text-dark", "mb-0"], [1, "form-select", 3, "ngModel"], ["type", "text", "placeholder", "Ingrese su observaci\xF3n/respuesta...", 1, "form-control", 3, "ngModel"], [1, "form-select", 3, "ngModelChange", "ngModel"], ["value", "", "disabled", "", "selected", ""], ["type", "text", "placeholder", "Ingrese su observaci\xF3n/respuesta...", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "mb-3"], [1, "small", "text-muted", "mb-1", "d-flex", "align-items-center", "gap-2"], ["type", "button", "title", "Eliminar respuesta", 1, "btn", "btn-sm", "btn-link", "text-danger", "p-0", "border-0", 3, "click"], [1, "bi", "bi-trash", 2, "font-size", "14px"], [1, "ms-2", 2, "font-size", "0.85em"], [1, "text-info"]], template: function SStats_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-navbar")(1, "div", 0);
      \u0275\u0275elementStart(2, "div", 1)(3, "div", 2);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(5, SStats_Conditional_5_Template, 10, 3, "div", 3);
      \u0275\u0275conditionalCreate(6, SStats_Conditional_6_Template, 2, 1, "div", 4);
      \u0275\u0275elementStart(7, "div", 5);
      \u0275\u0275repeaterCreate(8, SStats_For_9_Template, 8, 3, "div", 6, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(10, SStats_Conditional_10_Template, 6, 2, "div", 7);
      \u0275\u0275conditionalCreate(11, SStats_Conditional_11_Template, 3, 0, "div", 8);
      \u0275\u0275conditionalCreate(12, SStats_Conditional_12_Template, 5, 0, "div", 9);
      \u0275\u0275element(13, "app-survey-dashboard");
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.instituteName(), " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.userRole() === "1" ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.selectedSubtipoStats() ? 6 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.source());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.id() ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.items().length > 0 ? 11 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.userRole() === "1" && ctx.stds().length > 0 ? 12 : -1);
    }
  }, dependencies: [
    CommonModule,
    Navbar,
    FormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    DefaultValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    NgModel,
    SurveyDashboardComponent
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SStats, [{
    type: Component,
    args: [{
      selector: "app-stats",
      standalone: true,
      imports: [
        CommonModule,
        Navbar,
        FormsModule,
        SurveyDashboardComponent
      ],
      template: `
    <app-navbar></app-navbar>
    <div class="py-5"></div>

    <div class="container mt-5">
      <div class="text-center w-100 ffont h3 mb-4">
        {{ instituteName() }}
      </div>

      <!-- Secci\xF3n Administrador: Agregar encuesta -->
      @if (userRole() === '1') {
        <div class="mb-4 p-3 border rounded bg-light">
          <label for="techSelect" class="form-label fw-bold">
            Agregar encuesta, seleccione el tipo:
          </label>
          <select
            id="techSelect"
            class="form-select mb-3"
            [ngModel]="subtipo()"
            (ngModelChange)="subtipo.set($event)"
          >
            <option value="" disabled>Seleccione item</option>
            @for (opt of techOptions; track opt.value) {
              <option [value]="opt.value">{{ opt.label }}</option>
            }
          </select>

          <button
            type="button"
            class="btn btn-primary w-100"
            (click)="registerDefaultSurvey()"
            [disabled]="isLoading() || !subtipo()"
          >
            Registrar encuesta fuente {{ subtipo() }}
          </button>
        </div>
      }

      <!-- Listado de Fuentes Header -->
      @if (selectedSubtipoStats()) {
        <div class="text-center w-100 ffont h4 text-primary my-3">
          Seleccionaste {{ formatSubtipo(selectedSubtipoStats()) }}
        </div>
      }

      <!-- Tarjetas de Encuestas -->
      <div class="row p-2 justify-content-center align-items-center g-2 my-2">
        @for (item of source(); track item._id) {
          <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 p-1">
            <div class="p-2 bg-light text-center rounded border shadow-sm">
              ({{ formatSubtipo(item.subtipo) }})

              <div class="btn-group d-flex justify-content-center align-items-center mt-2">
                @if (userRole() === '1') {
                  <button
                    type="button"
                    class="btn btn-outline-info"
                    title="Editar JSON"
                    (click)="getNotes(item._id)"
                  >
                    <i class="bi bi-pencil" style="font-size: 14px; color: #272cc1;"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    title="Eliminar"
                    (click)="removeSurvey(item._id, item.subtipo)"
                  >
                    <i class="bi bi-trash" style="font-size: 14px; color: #ff006a;"></i>
                  </button>
                }

                <button
                  type="button"
                  title="Responder la encuesta"
                  class="btn btn-outline-primary"
                  (click)="getSurveysSourceSubtipo(item.subtipo)"
                >
                  <i class="bi bi-arrows-fullscreen"></i>
                </button>
              
                @if (userRole() === '1' || userRole() === '2') {
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    title="Copiar enlace"
                    (click)="handleCopyLink(item.subtipo)"
                  >
                    <i class="bi bi-copy" style="font-size: 14px; color: #20b6d7;"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-warning"
                    title="Compartir enlace"
                    (click)="handleShareLink(item.subtipo)"
                  >
                    <i class="bi bi-share" style="font-size: 14px; color: #0f72ab;"></i>
                  </button>
                }
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Editor JSON de Encuesta -->
      @if (id()) {
        <div class="my-4 p-3 border rounded bg-white shadow-sm">
          <label class="form-label fw-bold" for="jsonEditor">Editor de Encuesta (JSON):</label>
          <textarea
            id="jsonEditor"
            class="form-control mb-2 font-monospace"
            [ngModel]="itemsJsonString()"
            (ngModelChange)="itemsJsonString.set($event)"
            rows="8"
          ></textarea>
          <button
            type="button"
            class="btn btn-info w-100 text-white fw-bold"
            (click)="updateSurveysId()"
            [disabled]="isLoading()"
          >
            Actualizar JSON
          </button>
        </div>
      }

      <!-- Formulario Din\xE1mico de Preguntas Cargadas -->
      @if (items().length > 0) {
        <div class="row justify-content-center align-items-stretch g-4 my-3">
          @for (question of items(); track $index; let i = $index) {
            <div
              [class]="question.alt ? 'col-12 col-md-6 col-lg-6 col-xl-4 px-3 mb-4' : 'col-12 px-3 mb-4'"
            >
              <div class="card h-100 shadow-sm border p-3 border-info">
                <div class="d-flex align-items-start gap-3 mb-3">
                  <span class="badge bg-primary text-white rounded-pill fs-6 px-3 py-2">
                    {{ i + 1 }}
                  </span>
                  <div class="flex-grow-1 fw-bold text-dark mb-0">
                    {{ question.prg }}
                  </div>
                </div>

                <div>
                  @if (question.alt) {
                    <select
                      class="form-select"
                      [ngModel]="question.std"
                      (ngModelChange)="handleItemSelectChange(i, $event)"
                    >
                      <option value="" disabled selected>Seleccione respuesta...</option>
                      @for (altItem of question.alt; track $index) {
                        <option [value]="getOptionValue(altItem)">
                          {{ getOptionValue(altItem) }}
                        </option>
                      }
                    </select>
                  } @else {
                    <input
                      type="text"
                      class="form-control"
                      [ngModel]="question.std || ''"
                      placeholder="Ingrese su observaci\xF3n/respuesta..."
                      (ngModelChange)="handleInputTextChange(i, $event)"
                    />
                  }
                </div>
              </div>
            </div>
          }
        </div>
      }

      <!-- Panel de Registro de Respuestas (Admin) -->
      @if (userRole() === '1' && stds().length > 0) {
        <div class="mt-4 p-3 border-top">
          <h5 class="mb-3">Respuestas Registradas:</h5>
          @for (std of stds(); track $index; let i = $index) {
            @let minutesDiff = getMinutesDiff(std[1], std[2]);

            <div class="small text-muted mb-1 d-flex align-items-center gap-2">
              <span>{{ i + 1 }}.</span>
              <button
                type="button"
                class="btn btn-sm btn-link text-danger p-0 border-0"
                (click)="removeSurvey(std[3], std[4])"
                title="Eliminar respuesta"
              >
                <i class="bi bi-trash" style="font-size: 14px;"></i>
              </button>
              <span>{{ std[0] || '' }}</span>
              <span class="ms-2" style="font-size: 0.85em;">
                {{ formatDate(std[1]) }}
                @if (minutesDiff !== null) {
                  <span class="text-info">[{{ minutesDiff }} mnts]</span>
                }
              </span>
            </div>
          }
        </div>
      }

      <app-survey-dashboard></app-survey-dashboard>
    </div>
  `
    }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SStats, { className: "SStats", filePath: "src/app/componentes/statbegin.ts", lineNumber: 303 });
})();
export {
  SStats,
  StatsService,
  isAuth
};
//# sourceMappingURL=chunk-P3KVKJOE.js.map
