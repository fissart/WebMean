import './polyfills.server.mjs';
import {
  isAuth,
  signout
} from "./chunk-NIVJ4KPM.mjs";
import {
  Router,
  RouterLink,
  RouterLinkActive
} from "./chunk-IESDD46D.mjs";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵpureFunction0,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-GYAE75W3.mjs";

// src/app/componentes/navbar.ts
var _c0 = () => ({ exact: true });
function Navbar_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 8)(1, "a", 11);
    \u0275\u0275listener("click", function Navbar_Conditional_14_Template_a_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275text(2, " Panel ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "li", 8)(4, "a", 12);
    \u0275\u0275listener("click", function Navbar_Conditional_14_Template_a_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", (ctx_r1.auth == null ? null : ctx_r1.auth.name == null ? null : ctx_r1.auth.name.initial) || ctx_r1.userInitials, " ");
  }
}
function Navbar_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 8)(1, "a", 13);
    \u0275\u0275listener("click", function Navbar_Conditional_15_Template_a_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275text(2, " Iniciar ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("routerLinkActiveOptions", \u0275\u0275pureFunction0(1, _c0));
  }
}
var Navbar = class _Navbar {
  router = inject(Router);
  elementRef = inject(ElementRef);
  isMenuOpen = signal(false, ...ngDevMode ? [{ debugName: "isMenuOpen" }] : []);
  auth = isAuth();
  onDocumentClick(event) {
    if (this.isMenuOpen() && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }
  onWindowScroll() {
    if (this.isMenuOpen()) {
      this.closeMenu();
    }
  }
  toggleMenu() {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }
  closeMenu() {
    this.isMenuOpen.set(false);
  }
  get userInitials() {
    if (!this.auth?.name)
      return "";
    const parts = this.auth.name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  }
  onSignOut() {
    signout(() => {
      this.auth = isAuth();
      this.closeMenu();
      this.router.navigate(["/"]);
    });
  }
  static \u0275fac = function Navbar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Navbar)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Navbar, selectors: [["app-navbar"]], hostBindings: function Navbar_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function Navbar_click_HostBindingHandler($event) {
        return ctx.onDocumentClick($event);
      }, \u0275\u0275resolveDocument)("scroll", function Navbar_scroll_HostBindingHandler() {
        return ctx.onWindowScroll();
      }, \u0275\u0275resolveWindow);
    }
  }, decls: 16, vars: 4, consts: [[1, "navbar", "navbar-expand-lg", "px-0"], [1, "container", "px-2", "d-flex", "justify-content-between", "align-items-center", "flex-nowrap", "position-relative"], ["routerLink", "/", 1, "navbar-brand", 3, "click"], [1, "bi", "bi-house", "brand-icon"], ["type", "button", "aria-label", "Alternar navegaci\xF3n", 1, "navbar-toggler", "border-0", "shadow-none", 3, "click"], [1, "bi", "bi-list", "brand-icon"], [1, "collapse", "navbar-collapse", "flex-grow-0", "text-end"], [1, "navbar-nav", "ms-auto", "mb-2", "mb-lg-0", "custom-nav-links"], [1, "nav-item"], ["routerLink", "/documentos", "routerLinkActive", "active", 1, "nav-link", 3, "click"], ["routerLink", "/land", "routerLinkActive", "active", 1, "nav-link", 3, "click"], ["routerLink", "/panel", "routerLinkActive", "active", 1, "nav-link", 3, "click"], ["routerLink", "/actualizarusuario", "routerLinkActive", "active", 1, "nav-link", "text-warning", "fw-semibold", "ffont", 3, "click"], ["routerLink", "/login", "routerLinkActive", "active", 1, "nav-link", 3, "click", "routerLinkActiveOptions"]], template: function Navbar_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "nav", 0)(1, "div", 1)(2, "a", 2);
      \u0275\u0275listener("click", function Navbar_Template_a_click_2_listener() {
        return ctx.closeMenu();
      });
      \u0275\u0275element(3, "i", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 4);
      \u0275\u0275listener("click", function Navbar_Template_button_click_4_listener($event) {
        ctx.toggleMenu();
        return $event.stopPropagation();
      });
      \u0275\u0275element(5, "i", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 6)(7, "ul", 7)(8, "li", 8)(9, "a", 9);
      \u0275\u0275listener("click", function Navbar_Template_a_click_9_listener() {
        return ctx.closeMenu();
      });
      \u0275\u0275text(10, " Documentos ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "li", 8)(12, "a", 10);
      \u0275\u0275listener("click", function Navbar_Template_a_click_12_listener() {
        return ctx.closeMenu();
      });
      \u0275\u0275text(13, " Vector ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(14, Navbar_Conditional_14_Template, 6, 1)(15, Navbar_Conditional_15_Template, 3, 2, "li", 8);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275attribute("aria-expanded", ctx.isMenuOpen());
      \u0275\u0275advance(2);
      \u0275\u0275classProp("show", ctx.isMenuOpen());
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.auth ? 14 : 15);
    }
  }, dependencies: [RouterLink, RouterLinkActive], styles: ["\n\n.navbar[_ngcontent-%COMP%] {\n  z-index: 12;\n  position: absolute;\n  width: 100%;\n  background: transparent;\n  box-shadow: none;\n}\n.brand-icon[_ngcontent-%COMP%] {\n  color: #25053aff;\n  font-size: 34px;\n}\n.custom-nav-links[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.custom-nav-links[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\n  color: #25053aff !important;\n}\n.custom-nav-links[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]:hover {\n  color: #25053aff !important;\n}\n@media (max-width: 991.98px) {\n  .navbar-collapse[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 100%;\n    right: 0.5rem;\n    min-width: 200px;\n  }\n  .navbar-collapse.show[_ngcontent-%COMP%] {\n    background: rgba(2, 6, 23, 0.90);\n    -webkit-backdrop-filter: blur(12px);\n    backdrop-filter: blur(12px);\n    padding: 1.25rem;\n    border-radius: 1rem;\n    margin-top: 0.5rem;\n    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);\n  }\n}\n/*# sourceMappingURL=navbar.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Navbar, [{
    type: Component,
    args: [{ selector: "app-navbar", standalone: true, imports: [RouterLink, RouterLinkActive], template: `
    <nav class="navbar navbar-expand-lg px-0">
      <div class="container px-2 d-flex justify-content-between align-items-center flex-nowrap position-relative">
        
        <!-- 1. Marca / Logo (Izquierda) -->
        <a class="navbar-brand" routerLink="/" (click)="closeMenu()">
          <i class="bi bi-house brand-icon"></i>
        </a>

        <!-- 2. Bot\xF3n Hamburguesa (Derecha) -->
        <button
          class="navbar-toggler border-0 shadow-none"
          type="button"
          (click)="toggleMenu(); $event.stopPropagation()"
          [attr.aria-expanded]="isMenuOpen()"
          aria-label="Alternar navegaci\xF3n">
          <i class="bi bi-list brand-icon"></i>
        </button>

        <!-- 3. Contenido colapsable (Men\xFA desplegable absoluto debajo del icono) -->
        <div class="collapse navbar-collapse flex-grow-0 text-end" [class.show]="isMenuOpen()">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 custom-nav-links">
            <li class="nav-item">
              <a class="nav-link" routerLink="/documentos" routerLinkActive="active" (click)="closeMenu()">
                Documentos
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/land" routerLinkActive="active" (click)="closeMenu()">
                Vector
              </a>
            </li>
            @if (auth) {
              <li class="nav-item">
                <a class="nav-link" routerLink="/panel" routerLinkActive="active" (click)="closeMenu()">
                  Panel
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link text-warning fw-semibold ffont"
                  routerLink="/actualizarusuario"
                  routerLinkActive="active"
                  (click)="closeMenu()">
                  {{ auth?.name?.initial || userInitials }}
                </a>
              </li>
            } @else {
              <li class="nav-item">
                <a class="nav-link" routerLink="/login" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="closeMenu()">
                  Iniciar
                </a>
              </li>
            }
          </ul>
        </div>

      </div>
    </nav>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["/* angular:styles/component:css;0de80b25867761c8fddb28f695b537eb3c29136074bb3fb2852307276aae1d05;/home/linuxlite/WebMEAN/src/app/componentes/navbar.ts */\n.navbar {\n  z-index: 12;\n  position: absolute;\n  width: 100%;\n  background: transparent;\n  box-shadow: none;\n}\n.brand-icon {\n  color: #25053aff;\n  font-size: 34px;\n}\n.custom-nav-links {\n  font-size: 18px;\n}\n.custom-nav-links .nav-link {\n  color: #25053aff !important;\n}\n.custom-nav-links .nav-link:hover {\n  color: #25053aff !important;\n}\n@media (max-width: 991.98px) {\n  .navbar-collapse {\n    position: absolute;\n    top: 100%;\n    right: 0.5rem;\n    min-width: 200px;\n  }\n  .navbar-collapse.show {\n    background: rgba(2, 6, 23, 0.90);\n    -webkit-backdrop-filter: blur(12px);\n    backdrop-filter: blur(12px);\n    padding: 1.25rem;\n    border-radius: 1rem;\n    margin-top: 0.5rem;\n    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);\n  }\n}\n/*# sourceMappingURL=navbar.css.map */\n"] }]
  }], null, { onDocumentClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }], onWindowScroll: [{
    type: HostListener,
    args: ["window:scroll"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Navbar, { className: "Navbar", filePath: "src/app/componentes/navbar.ts", lineNumber: 111 });
})();

export {
  Navbar
};
//# sourceMappingURL=chunk-QGEJ4V6S.mjs.map
