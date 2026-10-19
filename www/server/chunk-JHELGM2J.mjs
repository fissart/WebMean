import './polyfills.server.mjs';
import {
  Component,
  ViewChild,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵloadQuery,
  ɵɵqueryRefresh,
  ɵɵtrustConstantResourceUrl,
  ɵɵviewQuery
} from "./chunk-GYAE75W3.mjs";
import "./chunk-TB3YAHZW.mjs";

// src/app/componentes/editorimg.ts
var _c0 = ["miniPaintIframe"];
var ContenedorIframeComponent = class _ContenedorIframeComponent {
  // Obtenemos una referencia al iframe del template
  iframeRef;
  static \u0275fac = function ContenedorIframeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContenedorIframeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContenedorIframeComponent, selectors: [["app-contenedor-iframe"]], viewQuery: function ContenedorIframeComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.iframeRef = _t.first);
    }
  }, decls: 3, vars: 0, consts: [["miniPaintIframe", ""], [1, "editor-container"], ["src", \u0275\u0275trustConstantResourceUrl`/www/index.html`, "width", "100%", "height", "600px", 2, "border", "none"]], template: function ContenedorIframeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 1);
      \u0275\u0275domElement(1, "iframe", 2, 0);
      \u0275\u0275domElementEnd();
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContenedorIframeComponent, [{
    type: Component,
    args: [{
      selector: "app-contenedor-iframe",
      standalone: true,
      template: `
    <div class="editor-container">
      <iframe 
        #miniPaintIframe 
        src="/www/index.html" 
        width="100%" 
        height="600px" 
        style="border: none;">
      </iframe>
      
    </div>
  `
    }]
  }], null, { iframeRef: [{
    type: ViewChild,
    args: ["miniPaintIframe"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContenedorIframeComponent, { className: "ContenedorIframeComponent", filePath: "src/app/componentes/editorimg.ts", lineNumber: 19 });
})();
export {
  ContenedorIframeComponent
};
//# sourceMappingURL=chunk-JHELGM2J.mjs.map
