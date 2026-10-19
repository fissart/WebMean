import {
  MarkdownComponent
} from "./chunk-3QOIHUY2.js";
import {
  Navbar
} from "./chunk-U3CDTOVP.js";
import "./chunk-DJCOHPHY.js";
import "./chunk-PFU5G7MY.js";
import "./chunk-MMWGUNZC.js";
import "./chunk-6QD4DAAM.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵtext
} from "./chunk-FXWIEX65.js";
import "./chunk-3WPM564S.js";

// src/app/componentes/acerca.ts
var Acerca = class _Acerca {
  combinedMathContent = `
    The equation $E = mc^{2}$ revolutionized physics. 

    Below is a more complex integral formula:

    $$
    f(x) = \\int_{-\\infty} ^ {\\infty} \\hat{f}(\\xi)\\,e^{2\\pi i \\xi x}\\,d\\xi
    $$

    And you can continue writing normal text with more inline math like $\\alpha + \\beta = \\gamma$ right here.
  `;
  static \u0275fac = function Acerca_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Acerca)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Acerca, selectors: [["app-math-demo"]], decls: 8, vars: 4, consts: [[1, "py-5"], [1, "container"], [3, "katex", "data"], [3, "katex"]], template: function Acerca_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-navbar")(1, "div", 0);
      \u0275\u0275elementStart(2, "div", 1);
      \u0275\u0275element(3, "markdown", 2);
      \u0275\u0275elementStart(4, "markdown", 3);
      \u0275\u0275text(5, " $$ e = mc^2 $$ ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "markdown", 3);
      \u0275\u0275text(7, " La formula de la relatividad es $e = mc^2$. ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275property("katex", true)("data", ctx.combinedMathContent);
      \u0275\u0275advance();
      \u0275\u0275property("katex", true);
      \u0275\u0275advance(2);
      \u0275\u0275property("katex", true);
    }
  }, dependencies: [MarkdownComponent, Navbar], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Acerca, [{
    type: Component,
    args: [{
      selector: "app-math-demo",
      standalone: true,
      imports: [MarkdownComponent, Navbar],
      template: `
    <app-navbar></app-navbar>
    <div class="py-5"></div>

    <div class="container">  
      <markdown [katex]="true" [data]="combinedMathContent"></markdown>

      <markdown [katex]="true">
        $$
         e = mc^2 
         $$
      </markdown>

      <markdown [katex]="true">
        La formula de la relatividad es $e = mc^2$.
      </markdown>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Acerca, { className: "Acerca", filePath: "src/app/componentes/acerca.ts", lineNumber: 28 });
})();
export {
  Acerca
};
//# sourceMappingURL=chunk-REPTPLTH.js.map
