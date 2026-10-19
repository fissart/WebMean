import {
  MathRendererDirective
} from "./chunk-DK4ZT7VK.js";
import {
  CKEditorComponent,
  CKEditorModule,
  require_ckeditor
} from "./chunk-BVMCNHEU.js";
import {
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
import {
  isAuth
} from "./chunk-DJCOHPHY.js";
import {
  ActivatedRoute,
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
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
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
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtextInterpolate4
} from "./chunk-FXWIEX65.js";
import {
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-3WPM564S.js";

// src/app/componentes/actualizaciontest.ts
var import_ckeditor5_build_classic = __toESM(require_ckeditor());
function ExportToExcelComponent_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "span", 3);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "br");
    \u0275\u0275elementStart(4, "span", 4);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "br");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" Culmin\xF3 la evaluaci\xF3n ", ctx_r0.value(), " - ", ctx_r0.idtheme(), " ", ctx_r0.codetheme(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Cr\xE9dito: ", ctx_r0.evaluacion());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", (tmp_4_0 = ctx_r0.taskss()) == null ? null : tmp_4_0.dateb, " ", (tmp_4_0 = ctx_r0.taskss()) == null ? null : tmp_4_0.datee, " ");
  }
}
function ExportToExcelComponent_Conditional_3_Conditional_3_Conditional_0_For_3_Conditional_4_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const guest_r5 = ctx.$implicit;
    \u0275\u0275property("value", guest_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(guest_r5);
  }
}
function ExportToExcelComponent_Conditional_3_Conditional_3_Conditional_0_For_3_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275element(0, "div", 11);
    \u0275\u0275elementStart(1, "div", 12)(2, "select", 13);
    \u0275\u0275listener("ngModelChange", function ExportToExcelComponent_Conditional_3_Conditional_3_Conditional_0_For_3_Conditional_4_Template_select_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r3);
      const $index_r4 = \u0275\u0275nextContext().$index;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.onChange($index_r4, $event));
    });
    \u0275\u0275repeaterCreate(3, ExportToExcelComponent_Conditional_3_Conditional_3_Conditional_0_For_3_Conditional_4_For_4_Template, 2, 2, "option", 14, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const number_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("appMathRenderer", number_r6.std);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", number_r6.std);
    \u0275\u0275advance();
    \u0275\u0275repeater(number_r6.alt);
  }
}
function ExportToExcelComponent_Conditional_3_Conditional_3_Conditional_0_For_3_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "ckeditor", 15);
    \u0275\u0275listener("blur", function ExportToExcelComponent_Conditional_3_Conditional_3_Conditional_0_For_3_Conditional_5_Template_ckeditor_blur_2_listener($event) {
      \u0275\u0275restoreView(_r7);
      const $index_r4 = \u0275\u0275nextContext().$index;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.onChangett($event.editor.getData(), $index_r4));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const number_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate4(" [", number_r6.nstring, "n] (", number_r6.pctgsimilar, "%) [", ctx_r0.cleanStringLength(number_r6.obs || ""), "obs] [", ctx_r0.cleanStringLength(number_r6.std || ""), "std] ");
    \u0275\u0275advance();
    \u0275\u0275property("editor", ctx_r0.Editor)("config", ctx_r0.editorConfig)("data", ctx_r0.formatEditorData(number_r6.std));
  }
}
function ExportToExcelComponent_Conditional_3_Conditional_3_Conditional_0_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 9);
    \u0275\u0275text(2);
    \u0275\u0275element(3, "div", 10);
    \u0275\u0275conditionalCreate(4, ExportToExcelComponent_Conditional_3_Conditional_3_Conditional_0_For_3_Conditional_4_Template, 5, 2)(5, ExportToExcelComponent_Conditional_3_Conditional_3_Conditional_0_For_3_Conditional_5_Template, 3, 7, "div");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const number_r6 = ctx.$implicit;
    const $index_r4 = ctx.$index;
    \u0275\u0275classMap(number_r6.alt ? "col-sm-12 col-md-6 col-lg-6 col-xl-4 p-1" : "col-sm-12 col-md-12 col-lg-12 p-1");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" [", $index_r4 + 1, "] ");
    \u0275\u0275advance();
    \u0275\u0275property("appMathRenderer", number_r6.prg);
    \u0275\u0275advance();
    \u0275\u0275conditional(number_r6.alt ? 4 : 5);
  }
}
function ExportToExcelComponent_Conditional_3_Conditional_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 5);
    \u0275\u0275repeaterCreate(2, ExportToExcelComponent_Conditional_3_Conditional_3_Conditional_0_For_3_Template, 6, 5, "div", 6, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 7)(5, "button", 8);
    \u0275\u0275listener("click", function ExportToExcelComponent_Conditional_3_Conditional_3_Conditional_0_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.EndTest());
    });
    \u0275\u0275text(6, " Guardar y evaluar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.items());
  }
}
function ExportToExcelComponent_Conditional_3_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275text(1, " Mantener la ventana en foco (Actualiza solo esta vez) ");
    \u0275\u0275elementEnd();
  }
}
function ExportToExcelComponent_Conditional_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ExportToExcelComponent_Conditional_3_Conditional_3_Conditional_0_Template, 7, 0, "div")(1, ExportToExcelComponent_Conditional_3_Conditional_3_Conditional_1_Template, 2, 0, "div", 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r0.show() ? 0 : 1);
  }
}
function ExportToExcelComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div");
    \u0275\u0275conditionalCreate(2, ExportToExcelComponent_Conditional_3_Conditional_2_Template, 8, 6, "div", 2)(3, ExportToExcelComponent_Conditional_3_Conditional_3_Template, 2, 1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.secondsRemaining() === 0 ? 2 : 3);
  }
}
var ExportToExcelComponent = class _ExportToExcelComponent {
  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  router = inject(Router);
  toastr = inject(ToastrService);
  // Editor Config
  Editor = import_ckeditor5_build_classic.default;
  editorConfig = {
    language: "es",
    placeholder: "Descripci\xF3n",
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
  // State via Signals
  value = signal("", ...ngDevMode ? [{ debugName: "value" }] : []);
  evaluacion = signal("2", ...ngDevMode ? [{ debugName: "evaluacion" }] : []);
  show = signal(true, ...ngDevMode ? [{ debugName: "show" }] : []);
  items = signal([], ...ngDevMode ? [{ debugName: "items" }] : []);
  taskId = signal(null, ...ngDevMode ? [{ debugName: "taskId" }] : []);
  taskss = signal(null, ...ngDevMode ? [{ debugName: "taskss" }] : []);
  datee = signal(null, ...ngDevMode ? [{ debugName: "datee" }] : []);
  secondsRemaining = signal(5, ...ngDevMode ? [{ debugName: "secondsRemaining" }] : []);
  // Route Params
  idtheme = signal("", ...ngDevMode ? [{ debugName: "idtheme" }] : []);
  codetheme = signal("", ...ngDevMode ? [{ debugName: "codetheme" }] : []);
  // Current User como Signal
  currentUser = signal(null, ...ngDevMode ? [{ debugName: "currentUser" }] : []);
  ngOnInit() {
    this.currentUser.set(isAuth());
    this.route.params.subscribe((params) => {
      this.idtheme.set(params["curseid"] || "");
      this.codetheme.set(params["themeid"] || "");
      this.getTask();
    });
  }
  getTask() {
    const userId = this.currentUser()?._id;
    if (!userId)
      return;
    const url = `${environment.apiURL}/api/tasks/test/${this.idtheme()}/${this.codetheme()}/${userId}`;
    this.http.get(url).subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          const task = response[0];
          this.taskss.set(task);
          this.items.set(task.items || []);
          this.datee.set(task.datee);
          this.taskId.set(task._id);
          this.evaluacion.set(task.note);
        }
      },
      error: (error) => console.error("Error obteniendo tareas:", error)
    });
  }
  EndTest() {
    if (window.confirm("Desea guardar y evaluar su test?")) {
      const url = `${environment.apiURL}/api/tasks/test/${this.taskId()}`;
      this.http.put(url, { datee: /* @__PURE__ */ new Date() }).subscribe({
        next: (res) => {
          this.toastr.success(typeof res === "string" ? res : res?.message || "Actualizado");
          this.router.navigate([`/actualizacion/${this.idtheme()}`]);
        },
        error: (error) => console.error("ERROR", error)
      });
    }
  }
  sendTest(updatedItems) {
    const countalt = updatedItems.filter((item) => item.alt !== void 0).length;
    const rptas = [];
    for (let j = 0; j < updatedItems.length; j++) {
      if (updatedItems[j].alt) {
        if (updatedItems[j].std === updatedItems[j].rpta) {
          rptas.push(1);
        } else {
          rptas.push(0);
        }
      } else {
        const rrr = this.cleanString(updatedItems[j].std || "");
        const rrrobs = this.cleanString(updatedItems[j].obs || "");
        const percent = this.getLevenshteinSimilarity(rrr, rrrobs);
        const score = (20 - countalt) / (updatedItems.length - countalt) / 20 * (20 - 20 * Math.abs(100 - percent) / (100 - (updatedItems[j].pctgsimilar || 0)));
        rptas.push(score);
        updatedItems[j].nota = score;
      }
    }
    const totalSum = rptas.reduce((acc, curr) => acc + curr, 0);
    const url = `${environment.apiURL}/api/tasks/test/${this.taskId()}`;
    this.http.put(url, {
      items: updatedItems,
      note: Math.round(totalSum * 100) / 100
    }).subscribe({
      next: (res) => {
        this.toastr.success(typeof res === "string" ? res : res?.message || "Guardado");
        this.getTask();
      },
      error: (error) => console.error("ERROR", error)
    });
  }
  onChange(index, selectedValue) {
    const encuestas = [...this.items()];
    encuestas[index] = __spreadProps(__spreadValues({}, encuestas[index]), {
      std: selectedValue || ""
    });
    if (encuestas.length > 0) {
      this.sendTest(encuestas);
    }
  }
  onChangett(text, i) {
    const encuestas = [...this.items()];
    const rrr = this.cleanString(text);
    const rrrobs = this.cleanString(encuestas[i].obs || "");
    if (rrr.length > rrrobs.length) {
      this.toastr.info("Exceso de texto");
    } else {
      const minLen = encuestas[i].nstring || 0;
      if (minLen <= rrr.length && rrr.length <= rrrobs.length) {
        encuestas[i].std = text;
        console.log(encuestas);
        this.items.set(encuestas);
        this.sendTest(encuestas);
      } else {
        this.toastr.info("No puedes eliminar el texto establecido");
      }
    }
  }
  handleDataFromChild() {
    this.router.navigate([`/curso/${this.idtheme()}`]);
    this.show.set(false);
  }
  handleFromChild() {
    this.secondsRemaining.set(0);
    this.show.set(false);
  }
  getLevenshteinSimilarity(str1, str2) {
    const track = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    for (let i = 0; i <= str1.length; i += 1)
      track[0][i] = i;
    for (let j = 0; j <= str2.length; j += 1)
      track[j][0] = j;
    for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(track[j - 1][i] + 1, track[j][i - 1] + 1, track[j - 1][i - 1] + indicator);
      }
    }
    const distance = track[str2.length][str1.length];
    const maxLength = Math.max(str1.length, str2.length);
    if (maxLength === 0)
      return 100;
    return (maxLength - distance) / maxLength * 100;
  }
  cleanString(str) {
    return (str || "").replace(/&nbsp;/g, "").replace(/<\/?[^>]+(>|$)/g, "").replace(/\s+/g, "");
  }
  cleanStringLength(str) {
    return this.cleanString(str).length;
  }
  formatEditorData(data) {
    if (!data)
      return "";
    return data.includes("math-tex") ? data : data.replace(/\\\]/g, "\\]</span>").replace(/\\\[/g, '<span class="math-tex">\\[').replace(/\\\)/g, "\\)</span>").replace(/\\\(/g, '<span class="math-tex">\\(');
  }
  static \u0275fac = function ExportToExcelComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ExportToExcelComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExportToExcelComponent, selectors: [["app-export-to-excel"]], decls: 4, vars: 1, consts: [[1, "py-5"], [1, "container"], [1, "text-center", "w-100"], [1, "text-center", "text-warning"], [1, "text-center", "text-info"], [1, "row", "justify-content-center", "align-items-center", 2, "margin", ".5em"], [3, "class"], [1, "text-center", "text-warning", "h5"], ["type", "button", 1, "btn", "btn-warning", 3, "click"], [1, "p-1", "border", "border-light", "rounded"], [1, "text-primary", 3, "appMathRenderer"], [1, "text-warning", 3, "appMathRenderer"], [1, "marginbottomp", "mt-2"], [1, "form-select", 3, "ngModelChange", "ngModel"], [3, "value"], [3, "blur", "editor", "config", "data"]], template: function ExportToExcelComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div");
      \u0275\u0275element(1, "app-navbar")(2, "div", 0);
      \u0275\u0275conditionalCreate(3, ExportToExcelComponent_Conditional_3_Template, 4, 1, "div", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.taskss() && ((tmp_0_0 = ctx.currentUser()) == null ? null : tmp_0_0.rol) !== "1" ? 3 : -1);
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    SelectControlValueAccessor,
    NgControlStatus,
    NgModel,
    CKEditorModule,
    CKEditorComponent,
    MathRendererDirective,
    Navbar
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExportToExcelComponent, [{
    type: Component,
    args: [{
      selector: "app-export-to-excel",
      standalone: true,
      imports: [
        CommonModule,
        FormsModule,
        CKEditorModule,
        MathRendererDirective,
        Navbar
      ],
      template: `
    <div>
      <app-navbar></app-navbar>
      <div class="py-5"></div>

      @if (taskss() && currentUser()?.rol !== '1') {
        <div class="container">
          <div>
            @if (secondsRemaining() === 0) {
              <div class="text-center w-100">
                <span class="text-center text-warning">
                  Culmin\xF3 la evaluaci\xF3n {{ value() }} - {{ idtheme() }} {{ codetheme() }}
                </span>
                <br />
                <span class="text-center text-info">Cr\xE9dito: {{ evaluacion() }}</span>
                <br />
                {{ taskss()?.dateb }} {{ taskss()?.datee }}
              </div>
            } @else {
              @if (show()) {
                <div>
                  <div class="row justify-content-center align-items-center" style="margin: .5em;">
                    @for (number of items(); track $index) {
                      <div [class]="number.alt ? 'col-sm-12 col-md-6 col-lg-6 col-xl-4 p-1' : 'col-sm-12 col-md-12 col-lg-12 p-1'">
                        <div class="p-1 border border-light rounded">
                          [{{ $index + 1 }}]
                          
                          <div class="text-primary" [appMathRenderer]="number.prg"></div>

                          @if (number.alt) {
                            <div class="text-warning" [appMathRenderer]="number.std"></div>
                            
                            <div class="marginbottomp mt-2">
                              <select
                                class="form-select"
                                [ngModel]="number.std"
                                (ngModelChange)="onChange($index, $event)">
                                @for (guest of number.alt; track guest) {
                                  <option [value]="guest">{{ guest }}</option>
                                }
                              </select>
                            </div>
                          } @else {
                            <div>
                              [{{ number.nstring }}n] ({{ number.pctgsimilar }}%)
                              [{{ cleanStringLength(number.obs || '') }}obs]
                              [{{ cleanStringLength(number.std || '') }}std]

                              <ckeditor
                                [editor]="Editor"
                                [config]="editorConfig"
                                [data]="formatEditorData(number.std)"
                                (blur)="onChangett($event.editor.getData(), $index)">
                              </ckeditor>
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </div>

                  <div class="text-center text-warning h5">
                    <button type="button" (click)="EndTest()" class="btn btn-warning">
                      Guardar y evaluar
                    </button>
                  </div>
                </div>
              } @else {
                <div class="text-center text-warning">
                  Mantener la ventana en foco (Actualiza solo esta vez)
                </div>
              }
            }
          </div>
        </div>
      }
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExportToExcelComponent, { className: "ExportToExcelComponent", filePath: "src/app/componentes/actualizaciontest.ts", lineNumber: 125 });
})();
export {
  ExportToExcelComponent
};
//# sourceMappingURL=chunk-BIDNQGMD.js.map
