import {
  parseISO
} from "./chunk-Y6ZT7BXL.js";
import {
  MathRendererDirective
} from "./chunk-DK4ZT7VK.js";
import {
  CKEditorComponent,
  CKEditorModule,
  require_ckeditor
} from "./chunk-BVMCNHEU.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  RequiredValidator,
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
  ActivatedRoute
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
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-FXWIEX65.js";
import {
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-3WPM564S.js";

// src/app/componentes/actualizacionupdatetest.ts
var import_ckeditor5_build_classic = __toESM(require_ckeditor());
function TestsComponent_Conditional_6_For_1_Conditional_5_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r4 = ctx.$implicit;
    \u0275\u0275property("value", option_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(option_r4);
  }
}
function TestsComponent_Conditional_6_For_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "select", 10);
    \u0275\u0275listener("ngModelChange", function TestsComponent_Conditional_6_For_1_Conditional_5_Template_select_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const $index_r2 = \u0275\u0275nextContext().$index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onChangeSelect($index_r2, $event));
    });
    \u0275\u0275repeaterCreate(2, TestsComponent_Conditional_6_For_1_Conditional_5_For_3_Template, 2, 2, "option", 11, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const number_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", number_r5.std);
    \u0275\u0275advance();
    \u0275\u0275repeater(number_r5.alt);
  }
}
function TestsComponent_Conditional_6_For_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "ckeditor", 12);
    \u0275\u0275listener("blur", function TestsComponent_Conditional_6_For_1_Conditional_6_Template_ckeditor_blur_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      const $index_r2 = \u0275\u0275nextContext().$index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onChangeText($event.editor.getData(), $index_r2, "obs"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "ckeditor", 12);
    \u0275\u0275listener("blur", function TestsComponent_Conditional_6_For_1_Conditional_6_Template_ckeditor_blur_2_listener($event) {
      \u0275\u0275restoreView(_r6);
      const $index_r2 = \u0275\u0275nextContext().$index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onChangeText($event.editor.getData(), $index_r2, "std"));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const number_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("editor", ctx_r2.Editor)("config", ctx_r2.editorConfig)("data", ctx_r2.formatEditorData(number_r5.obs || ""));
    \u0275\u0275advance();
    \u0275\u0275property("editor", ctx_r2.Editor)("config", ctx_r2.editorConfig)("data", ctx_r2.formatEditorData(number_r5.std || ""));
  }
}
function TestsComponent_Conditional_6_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div");
    \u0275\u0275text(2);
    \u0275\u0275element(3, "div", 7);
    \u0275\u0275elementStart(4, "div", 8);
    \u0275\u0275conditionalCreate(5, TestsComponent_Conditional_6_For_1_Conditional_5_Template, 4, 1, "div", 9)(6, TestsComponent_Conditional_6_For_1_Conditional_6_Template, 3, 6, "div");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const number_r5 = ctx.$implicit;
    const $index_r2 = ctx.$index;
    \u0275\u0275classMap(number_r5.alt ? "col-sm-12 col-md-6 col-lg-6 col-xl-4 p-1" : "col-sm-12 col-md-12 col-lg-12");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" [", $index_r2 + 1, "] ");
    \u0275\u0275advance();
    \u0275\u0275property("appMathRenderer", number_r5.prg);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(number_r5.alt ? 5 : 6);
  }
}
function TestsComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, TestsComponent_Conditional_6_For_1_Template, 7, 5, "div", 6, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.itemsnewnew());
  }
}
var TestsComponent = class _TestsComponent {
  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  toastr = inject(ToastrService);
  // CKEditor
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
  // Reactividad con Signals
  idtest = signal("", ...ngDevMode ? [{ debugName: "idtest" }] : []);
  solution = signal("", ...ngDevMode ? [{ debugName: "solution" }] : []);
  task = signal("", ...ngDevMode ? [{ debugName: "task" }] : []);
  items = signal([], ...ngDevMode ? [{ debugName: "items" }] : []);
  itemsnew = signal("", ...ngDevMode ? [{ debugName: "itemsnew" }] : []);
  itemsnewnew = signal([], ...ngDevMode ? [{ debugName: "itemsnewnew" }] : []);
  theme = signal(null, ...ngDevMode ? [{ debugName: "theme" }] : []);
  dateb = signal(/* @__PURE__ */ new Date(), ...ngDevMode ? [{ debugName: "dateb" }] : []);
  datee = signal(null, ...ngDevMode ? [{ debugName: "datee" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idtest.set(params["idtest"] || "");
      if (this.idtest()) {
        this.getNotes();
      }
    });
  }
  getNotes() {
    const url = `${environment.apiURL}/api/tasks/${this.idtest()}`;
    this.http.get(url).subscribe({
      next: (data) => {
        if (data && Object.keys(data).length !== 0) {
          if (data.dateb)
            this.dateb.set(parseISO(data.dateb));
          if (data.datee)
            this.datee.set(parseISO(data.datee));
          this.theme.set(data);
          this.items.set(data.items || []);
          this.itemsnew.set(JSON.stringify(data.items));
          this.solution.set(data.solution || "");
          this.task.set(data.task || "");
          localStorage.setItem("test", JSON.stringify(data.items));
          this.cargarStorage();
        }
      },
      error: (error) => console.error("Error obteniendo notas:", error)
    });
  }
  submitTest(currentItems) {
    const payload = {
      task: this.task(),
      solution: this.solution(),
      items: currentItems
    };
    const url = `${environment.apiURL}/api/tasks/${this.idtest()}`;
    this.http.put(url, payload).subscribe({
      next: (res) => {
        this.toastr.info(typeof res === "string" ? res : res?.message || "Guardado");
      },
      error: (error) => console.error("Error al enviar test:", error)
    });
  }
  cargarStorage() {
    const storedTest = localStorage.getItem("test");
    if (storedTest) {
      try {
        console.log(storedTest);
        this.itemsnewnew.set(JSON.parse(storedTest));
      } catch (e) {
        console.error("Error al parsear el LocalStorage", e);
      }
    }
  }
  onChangeSelect(index, selectedValue) {
    const updated = [...this.items()];
    updated[index] = __spreadProps(__spreadValues({}, updated[index]), {
      std: selectedValue ? selectedValue[0] : ""
    });
    this.items.set(updated);
  }
  onChangeText(text, i, obsstd) {
    const newww = this.itemsnewnew().map((item) => __spreadValues({}, item));
    for (let j = 0; j < newww.length; j++) {
      if (!newww[j].alt) {
        const rrr = this.cleanString(newww[j].std || "");
        const rrrobs = this.cleanString(newww[j].obs || "");
        newww[j].nstring = rrr.length;
        newww[j].pctgsimilar = this.getLevenshteinSimilarity(rrr, rrrobs);
      }
    }
    if (obsstd === "std") {
      newww[i].std = text;
    } else {
      newww[i].obs = text;
    }
    this.itemsnewnew.set(newww);
    if (newww !== null) {
      this.submitTest(newww);
    }
  }
  onTextareaChange(value) {
    console.log(value);
    this.itemsnew.set(value);
    localStorage.setItem("test", value);
    const parsed = localStorage.getItem("test");
    try {
      console.log(parsed ? JSON.parse(parsed) : "none");
    } catch {
      console.log("Error parseando JSON");
    }
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
  formatEditorData(content) {
    if (!content)
      return "";
    return content.includes("math-tex") ? content : content.replace(/\\\]/g, "\\]</span>").replace(/\\\[/g, '<span class="math-tex">\\[').replace(/\\\)/g, "\\)</span>").replace(/\\\(/g, '<span class="math-tex">\\(');
  }
  cleanString(str) {
    return (str || "").replace(/&nbsp;/g, "").replace(/<\/?[^>]+(>|$)/g, "").replace(/\s+/g, "");
  }
  static \u0275fac = function TestsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TestsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TestsComponent, selectors: [["app-tests"]], decls: 13, vars: 4, consts: [[1, "py-5"], [1, "container", "my-3"], [1, "row", "justify-content-center", "align-items-center", "border", "d-flex", 2, "margin", ".5em"], ["rows", "8", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-warning", "w-100", "my-1", 3, "click", "disabled"], [1, "btn", "btn-info", "w-100", "my-1", 3, "click", "disabled"], [3, "class"], [3, "appMathRenderer"], [1, "p-1", "bg-warning"], [1, "mb-2"], [1, "form-select", 3, "ngModelChange", "ngModel"], [3, "value"], [3, "blur", "editor", "config", "data"]], template: function TestsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div");
      \u0275\u0275element(1, "app-navbar")(2, "div", 0);
      \u0275\u0275elementStart(3, "div", 1)(4, "div")(5, "div", 2);
      \u0275\u0275conditionalCreate(6, TestsComponent_Conditional_6_Template, 2, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "textarea", 3);
      \u0275\u0275listener("ngModelChange", function TestsComponent_Template_textarea_ngModelChange_7_listener($event) {
        return ctx.onTextareaChange($event);
      });
      \u0275\u0275text(8, "        ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "button", 4);
      \u0275\u0275listener("click", function TestsComponent_Template_button_click_9_listener() {
        return ctx.cargarStorage();
      });
      \u0275\u0275text(10, " Cargar Storage ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "button", 5);
      \u0275\u0275listener("click", function TestsComponent_Template_button_click_11_listener() {
        return ctx.submitTest(ctx.itemsnewnew());
      });
      \u0275\u0275text(12, " Guardar ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.itemsnewnew().length > 0 ? 6 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("ngModel", ctx.itemsnew());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.loading());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.loading());
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    DefaultValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    RequiredValidator,
    NgModel,
    MathRendererDirective,
    Navbar,
    CKEditorModule,
    CKEditorComponent
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TestsComponent, [{
    type: Component,
    args: [{
      selector: "app-tests",
      standalone: true,
      imports: [
        CommonModule,
        FormsModule,
        MathRendererDirective,
        Navbar,
        CKEditorModule
      ],
      template: `
    <div>
<app-navbar></app-navbar>
    <div class="py-5"></div>
    
      <div class="container my-3">
        <div>
          <div class="row justify-content-center align-items-center border d-flex" style="margin: .5em;">
            @if (itemsnewnew().length > 0) {
              @for (number of itemsnewnew(); track $index) {
                <div [class]="number.alt ? 'col-sm-12 col-md-6 col-lg-6 col-xl-4 p-1' : 'col-sm-12 col-md-12 col-lg-12'">
                  <div>
                    [{{ $index + 1 }}]

                  <div [appMathRenderer]="number.prg"></div>

                    <div class="p-1 bg-warning">
                      @if (number.alt) {
                        <div class="mb-2">
                          <select
                            class="form-select"
                            [ngModel]="number.std"
                            (ngModelChange)="onChangeSelect($index, $event)">
                            @for (option of number.alt; track $index) {
                              <option [value]="option">{{ option }}</option>
                            }
                          </select>
                        </div>
                      } @else {
                        <div>
                          <!-- CKEditor para 'obs' -->
                          <ckeditor
                            [editor]="Editor"
                            [config]="editorConfig"
                            [data]="formatEditorData(number.obs || '')"
                            (blur)="onChangeText($event.editor.getData(), $index, 'obs')">
                          </ckeditor>

                          <!-- CKEditor para 'std' -->
                          <ckeditor
                            [editor]="Editor"
                            [config]="editorConfig"
                            [data]="formatEditorData(number.std || '')"
                            (blur)="onChangeText($event.editor.getData(), $index, 'std')">
                          </ckeditor>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              }
            }
          </div>
        </div>

        <textarea
          class="form-control"
          [ngModel]="itemsnew()"
          (ngModelChange)="onTextareaChange($event)"
          rows="8"
          required>
        </textarea>

        <button
          class="btn btn-warning w-100 my-1"
          (click)="cargarStorage()"
          [disabled]="loading()">
          Cargar Storage
        </button>
        <button
          class="btn btn-info w-100 my-1"
          (click)="submitTest(this.itemsnewnew())"
          [disabled]="loading()">
          Guardar
        </button>
      </div>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TestsComponent, { className: "TestsComponent", filePath: "src/app/componentes/actualizacionupdatetest.ts", lineNumber: 122 });
})();
export {
  TestsComponent
};
//# sourceMappingURL=chunk-P5LEZOOG.js.map
