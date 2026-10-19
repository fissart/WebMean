import {
  FormsModule
} from "./chunk-OAEVIACX.js";
import {
  environment
} from "./chunk-5ESGTH3B.js";
import {
  HttpClient
} from "./chunk-MMWGUNZC.js";
import {
  CommonModule
} from "./chunk-6QD4DAAM.js";
import {
  Component,
  Input,
  Output,
  effect,
  inject,
  input,
  output,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-FXWIEX65.js";

// src/app/componentes/actualizacionai.ts
var _forTrack0 = ($index, $item) => $item.value;
function GeminiChatComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 7);
    \u0275\u0275domListener("click", function GeminiChatComponent_For_6_Template_button_click_0_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectedModel.set(item_r2.value));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("btn btn-sm ", ctx_r2.selectedModel() === item_r2.value ? "btn-primary shadow-sm" : "btn-outline-secondary"));
    \u0275\u0275domProperty("disabled", ctx_r2.loading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r2.label, " ");
  }
}
function GeminiChatComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "span", 8);
    \u0275\u0275text(1, " Pensando... ");
  }
}
function GeminiChatComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "i", 9);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Enviar prompt ", ctx_r2.type(), " asociado al tema ");
  }
}
function GeminiChatComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "textarea", 6);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("value", ctx_r2.response());
  }
}
var GeminiChatComponent = class _GeminiChatComponent {
  http = inject(HttpClient);
  // Inputs
  tittle = input("", ...ngDevMode ? [{ debugName: "tittle" }] : []);
  type = input("", ...ngDevMode ? [{ debugName: "type" }] : []);
  // Output hacia el padre
  responseEmitted = output();
  // Opciones de modelos
  modelOptions = [
    { value: "gemini-3.5-flash", label: "Flash 3.5" },
    { value: "gemini-3.1-flash-lite", label: "Flash 3.1 Lite" },
    { value: "gemini-3-pro-preview", label: "Pro 3" },
    { value: "gemini-2.5-flash", label: "Flash 2.5" },
    { value: "gemini-2.5-pro", label: "Pro 2.5" }
  ];
  // Estado del componente con Signals
  prompt = signal("", ...ngDevMode ? [{ debugName: "prompt" }] : []);
  selectedModel = signal("gemini-3.5-flash", ...ngDevMode ? [{ debugName: "selectedModel" }] : []);
  response = signal("", ...ngDevMode ? [{ debugName: "response" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  API_URL = `${environment.apiURL}/api`;
  constructor() {
    effect(() => {
      const currentTitle = this.tittle();
      this.prompt.set(currentTitle);
    });
  }
  generarContenido() {
    const currentPrompt = this.prompt();
    if (!currentPrompt)
      return;
    this.loading.set(true);
    this.response.set("");
    console.log("Enviando datos al servidor:", {
      prompt: currentPrompt,
      model: this.selectedModel()
    });
    this.http.post(`${this.API_URL}/users/userCr`, {
      prompt: currentPrompt,
      model: this.selectedModel()
    }).subscribe({
      next: (res) => {
        this.response.set(res.response);
        this.responseEmitted.emit(res.response);
        this.loading.set(false);
      },
      error: (err) => {
        console.error("Error al generar contenido:", err);
        this.loading.set(false);
      }
    });
  }
  static \u0275fac = function GeminiChatComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GeminiChatComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GeminiChatComponent, selectors: [["app-gemini-chat"]], inputs: { tittle: [1, "tittle"], type: [1, "type"] }, outputs: { responseEmitted: "responseEmitted" }, decls: 12, vars: 3, consts: [[1, "card", "shadow-sm", "border-0", "p-3", "bg-white", "mb-4"], [1, "mb-3"], [1, "form-label", "small", "fw-bold", "text-muted", "text-uppercase", "tracking-wider"], ["role", "group", "aria-label", "Selecci\xF3n de modelos", 1, "d-flex", "flex-wrap", "gap-1"], ["type", "button", 3, "class", "disabled"], [1, "btn", "btn-outline-info", "w-100", "fw-semibold", "mb-3", "py-2", 3, "click", "disabled"], ["rows", "6", "readonly", "", 1, "form-control", "bg-light", "text-secondary", "small", 3, "value"], ["type", "button", 3, "click", "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "bi", "bi-cpu", "me-1"]], template: function GeminiChatComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "label", 2);
      \u0275\u0275text(3, "Seleccionar Modelo IA");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "div", 3);
      \u0275\u0275repeaterCreate(5, GeminiChatComponent_For_6_Template, 2, 5, "button", 4, _forTrack0);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(7, "button", 5);
      \u0275\u0275domListener("click", function GeminiChatComponent_Template_button_click_7_listener() {
        return ctx.generarContenido();
      });
      \u0275\u0275conditionalCreate(8, GeminiChatComponent_Conditional_8_Template, 2, 0)(9, GeminiChatComponent_Conditional_9_Template, 2, 1);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "div");
      \u0275\u0275conditionalCreate(11, GeminiChatComponent_Conditional_11_Template, 1, 1, "textarea", 6);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.modelOptions);
      \u0275\u0275advance(2);
      \u0275\u0275domProperty("disabled", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 8 : 9);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.response() ? 11 : -1);
    }
  }, dependencies: [CommonModule, FormsModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GeminiChatComponent, [{
    type: Component,
    args: [{
      selector: "app-gemini-chat",
      standalone: true,
      imports: [CommonModule, FormsModule],
      template: `
    <div class="card shadow-sm border-0 p-3 bg-white mb-4">
      <div class="mb-3">
        <label class="form-label small fw-bold text-muted text-uppercase tracking-wider">Seleccionar Modelo IA</label>
        
        <!-- Botones en Grupo (Btn Group) modernos y responsivos -->
        <div class="d-flex flex-wrap gap-1" role="group" aria-label="Selecci\xF3n de modelos">
          @for (item of modelOptions; track item.value) {
            <button
              type="button"
              class="btn btn-sm {{ selectedModel() === item.value ? 'btn-primary shadow-sm' : 'btn-outline-secondary' }}"
              [disabled]="loading()"
              (click)="selectedModel.set(item.value)"
            >
              {{ item.label }}
            </button>
          }
        </div>
      </div>

      <button
        class="btn btn-outline-info w-100 fw-semibold mb-3 py-2"
        (click)="generarContenido()"
        [disabled]="loading()"
      >
        @if (loading()) {
          <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Pensando...
        } @else {
          <i class="bi bi-cpu me-1"></i> Enviar prompt {{ type() }} asociado al tema
        }
      </button>

      <div>
        @if (response()) {
          <textarea
            class="form-control bg-light text-secondary small"
            [value]="response()"
            rows="6"
            readonly
          ></textarea>
        }
      </div>
    </div>
  `
    }]
  }], () => [], { tittle: [{ type: Input, args: [{ isSignal: true, alias: "tittle", required: false }] }], type: [{ type: Input, args: [{ isSignal: true, alias: "type", required: false }] }], responseEmitted: [{ type: Output, args: ["responseEmitted"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GeminiChatComponent, { className: "GeminiChatComponent", filePath: "src/app/componentes/actualizacionai.ts", lineNumber: 69 });
})();

export {
  GeminiChatComponent
};
//# sourceMappingURL=chunk-QMNH6UDY.js.map
