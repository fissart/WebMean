import './polyfills.server.mjs';
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-GIGPJXHS.mjs";
import {
  environment
} from "./chunk-SF7RHBD5.mjs";
import {
  Navbar
} from "./chunk-QGEJ4V6S.mjs";
import {
  authenticate,
  isAuth
} from "./chunk-NIVJ4KPM.mjs";
import {
  Router,
  RouterLink
} from "./chunk-IESDD46D.mjs";
import {
  HttpClient
} from "./chunk-JRMDAGFP.mjs";
import {
  CommonModule
} from "./chunk-TDOK3CTI.mjs";
import {
  Component,
  ViewChild,
  inject,
  setClassMetadata,
  signal,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵqueryAdvance,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuerySignal
} from "./chunk-GYAE75W3.mjs";
import "./chunk-TB3YAHZW.mjs";

// src/app/componentes/login.ts
var _c0 = ["googleBtnRef"];
function LoginComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 29);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.textChange(), "...");
  }
}
function LoginComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 30);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.textChange());
  }
}
var LoginComponent = class _LoginComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  http = inject(HttpClient);
  // Reference to the div where the Google Button will be rendered
  googleBtnRef = viewChild("googleBtnRef", ...ngDevMode ? [{ debugName: "googleBtnRef" }] : []);
  // Signals for local state control
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  textChange = signal("Iniciar sesi\xF3n", ...ngDevMode ? [{ debugName: "textChange" }] : []);
  ipData = null;
  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]]
  });
  ngOnInit() {
    this.initGoogleAuth();
  }
  initGoogleAuth() {
    setTimeout(() => {
      if (typeof google !== "undefined") {
        google.accounts.id.initialize({
          client_id: environment.googleClientId,
          // Ensure this exists in your environment files
          callback: (response) => this.handleGoogleResponse(response.credential)
        });
        const container = this.googleBtnRef()?.nativeElement;
        if (container) {
          google.accounts.id.renderButton(container, {
            theme: "outline",
            size: "large",
            width: "320"
            // Matches your React styling
          });
        }
      } else {
        console.warn("Google scripts no cargada");
      }
    }, 500);
  }
  handleGoogleResponse(idToken) {
    const apiUrl = environment.apiURL;
    this.http.post(`${apiUrl}/api/auth/googlelogin`, {
      idToken,
      ip: this.ipData
    }).subscribe({
      next: (res) => {
        this.informParent(res);
      },
      error: (error) => {
        console.error("GOOGLE SIGNIN ERROR", error);
      }
    });
  }
  informParent(response) {
    authenticate(response, () => {
      const auth = isAuth();
      if (auth && auth.rol === 3) {
        this.router.navigate(["/carpeta"]);
      } else {
        this.router.navigate(["/carpeta"]);
      }
    });
  }
  handleSubmit() {
    if (this.loginForm.valid) {
      this.loading.set(true);
      this.textChange.set("Cargando");
      const { email, password } = this.loginForm.value;
      const apiUrl = environment.apiURL;
      this.http.post(`${apiUrl}/api/auth/login`, {
        email,
        password,
        ip: this.ipData
      }).subscribe({
        next: (res) => {
          this.loading.set(false);
          authenticate(res, () => {
            const auth = isAuth();
            if (auth && auth.rol === 1) {
              this.router.navigate(["/"]);
            } else {
              this.router.navigate(["/carpeta"]);
            }
          });
        },
        error: (err) => {
          this.loading.set(false);
          this.textChange.set("Iniciar sesi\xF3n");
          console.error(err);
          alert(err.error?.errors || "Error en el servidor");
        }
      });
    } else {
      alert("Rellene todos los campos correctamente");
    }
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], viewQuery: function LoginComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.googleBtnRef, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, decls: 43, vars: 3, consts: [["googleBtnRef", ""], [1, "py-4", "py-md-5"], [1, "container", "my-4", "col-12", "col-md-8", "col-lg-6", "col-xl-5"], [1, "card", "border-0", "shadow-lg", "rounded-4", "overflow-hidden"], [1, "p-2", "text-center", "position-relative"], [1, "bi", "bi-person-fill-lock", "fs-2"], [1, "fw-bold", "mb-1"], [1, "small", "mb-0"], [1, "card-body", "p-2", "p-md-2"], [1, "text-center", "mb-2"], [1, "small", "text-muted", "mb-2", "fw-semibold"], [1, "bi", "bi-shield-check", "text-primary", "me-1"], [1, "d-flex", "justify-content-center", "google-btn-wrapper"], [1, "d-flex", "align-items-center", "text-muted"], [1, "flex-grow-1", "my-0"], [1, "px-2", "small", "text-uppercase", "fw-semibold", "text-secondary"], [1, "mt-2", 3, "ngSubmit", "formGroup"], [1, "mb-2", "input-icon-wrapper"], [1, "bi", "bi-envelope", "input-icon"], [1, "form-floating"], ["type", "email", "id", "loginEmail", "placeholder", "correo@ejemplo.com", "formControlName", "email", 1, "form-control", "form-control-icon", "shadow-sm"], ["for", "loginEmail", 1, "text-secondary"], [1, "bi", "bi-key", "input-icon"], ["type", "password", "id", "loginPassword", "placeholder", "Contrase\xF1a", "formControlName", "password", 1, "form-control", "form-control-icon", "shadow-sm"], ["for", "loginPassword", 1, "text-secondary"], ["type", "submit", 1, "btn", "btn-primary", "text-uppercase", "fw-bold", "shadow-sm", "py-1", "mt-2", "w-100", "d-flex", "align-items-center", "justify-content-center", "gap-1", 3, "disabled"], [1, "text-center", "mt-1"], ["routerLink", "/users/password/forget", 1, "text-decoration-none", "small", "text-muted", "hover-underline"], [1, "bi", "bi-question-circle", "me-1"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm"], [1, "bi", "bi-box-arrow-in-right", "fs-5"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275element(0, "app-navbar")(1, "div", 1);
      \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "div", 4);
      \u0275\u0275element(5, "i", 5);
      \u0275\u0275elementStart(6, "h4", 6);
      \u0275\u0275text(7, "Iniciar Sesi\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 7);
      \u0275\u0275text(9, "Ingrese sus credenciales para acceder al sistema");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 8)(11, "div", 9)(12, "p", 10);
      \u0275\u0275element(13, "i", 11);
      \u0275\u0275text(14, " Inicie con Google para mayor seguridad ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 12);
      \u0275\u0275element(16, "div", null, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 13);
      \u0275\u0275element(19, "hr", 14);
      \u0275\u0275elementStart(20, "span", 15);
      \u0275\u0275text(21, "o ingrese con correo");
      \u0275\u0275elementEnd();
      \u0275\u0275element(22, "hr", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "form", 16);
      \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_23_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.handleSubmit());
      });
      \u0275\u0275elementStart(24, "div", 17);
      \u0275\u0275element(25, "i", 18);
      \u0275\u0275elementStart(26, "div", 19);
      \u0275\u0275element(27, "input", 20);
      \u0275\u0275elementStart(28, "label", 21);
      \u0275\u0275text(29, "Correo Electr\xF3nico");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "div", 17);
      \u0275\u0275element(31, "i", 22);
      \u0275\u0275elementStart(32, "div", 19);
      \u0275\u0275element(33, "input", 23);
      \u0275\u0275elementStart(34, "label", 24);
      \u0275\u0275text(35, "Contrase\xF1a");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(36, "button", 25);
      \u0275\u0275conditionalCreate(37, LoginComponent_Conditional_37_Template, 3, 1)(38, LoginComponent_Conditional_38_Template, 3, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "div", 26)(40, "a", 27);
      \u0275\u0275element(41, "i", 28);
      \u0275\u0275text(42, " \xBFOlvidaste tu contrase\xF1a? ");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(23);
      \u0275\u0275property("formGroup", ctx.loginForm);
      \u0275\u0275advance(13);
      \u0275\u0275property("disabled", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 37 : 38);
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink, Navbar], styles: ["\n\n.form-floating[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n  padding-left: 2.75rem;\n}\n.input-icon-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n}\n.input-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 1rem;\n  transform: translateY(-50%);\n  z-index: 5;\n  color: #6c757d;\n  font-size: 1.15rem;\n  transition: color 0.2s ease-in-out;\n}\n.form-control-icon[_ngcontent-%COMP%] {\n  padding-left: 2.85rem !important;\n}\n.input-icon-wrapper[_ngcontent-%COMP%]:focus-within   .input-icon[_ngcontent-%COMP%] {\n  color: #0d6efd;\n}\n.card-gradient-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #0d6efd 0%,\n      #0a58ca 100%);\n}\n.google-btn-wrapper[_ngcontent-%COMP%] {\n  min-height: 44px;\n}\n/*# sourceMappingURL=login.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink, Navbar], template: `
    <app-navbar />
    <div class="py-4 py-md-5"></div>

    <div class="container my-4 col-12 col-md-8 col-lg-6 col-xl-5">
      <!-- Tarjeta Principal -->
      <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
        
        <!-- Encabezado de la Tarjeta -->
        <div class="p-2 text-center position-relative">
            <i class="bi bi-person-fill-lock fs-2"></i>
          <h4 class="fw-bold mb-1">Iniciar Sesi\xF3n</h4>
          <p class="small mb-0">Ingrese sus credenciales para acceder al sistema</p>
        </div>

        <div class="card-body p-2 p-md-2">
          
          <!-- Banner Google -->
          <div class="text-center mb-2">
            <p class="small text-muted mb-2 fw-semibold">
              <i class="bi bi-shield-check text-primary me-1"></i> Inicie con Google para mayor seguridad
            </p>
            <div class="d-flex justify-content-center google-btn-wrapper">
              <div #googleBtnRef></div>
            </div>
          </div>

          <!-- Separador Visual -->
          <div class="d-flex align-items-center text-muted">
            <hr class="flex-grow-1 my-0" />
            <span class="px-2 small text-uppercase fw-semibold text-secondary">o ingrese con correo</span>
            <hr class="flex-grow-1 my-0" />
          </div>

          <!-- Formulario Tradicional -->
          <form [formGroup]="loginForm" (ngSubmit)="handleSubmit()" class="mt-2">
            
            <!-- Campo: Email -->
            <div class="mb-2 input-icon-wrapper">
              <i class="bi bi-envelope input-icon"></i>
              <div class="form-floating">
                <input
                  type="email"
                  class="form-control form-control-icon shadow-sm"
                  id="loginEmail"
                  placeholder="correo@ejemplo.com"
                  formControlName="email"
                />
                <label for="loginEmail" class="text-secondary">Correo Electr\xF3nico</label>
              </div>
            </div>

            <!-- Campo: Contrase\xF1a -->
            <div class="mb-2 input-icon-wrapper">
              <i class="bi bi-key input-icon"></i>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control form-control-icon shadow-sm"
                  id="loginPassword"
                  placeholder="Contrase\xF1a"
                  formControlName="password"
                />
                <label for="loginPassword" class="text-secondary">Contrase\xF1a</label>
              </div>
            </div>

            <!-- Bot\xF3n Submit -->
            <button
              type="submit"
              class="btn btn-primary text-uppercase fw-bold shadow-sm py-1 mt-2 w-100 d-flex align-items-center justify-content-center gap-1"
              [disabled]="loading()"
            >
              @if (loading()) {
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>{{ textChange() }}...</span>
              } @else {
                <i class="bi bi-box-arrow-in-right fs-5"></i>
                <span>{{ textChange() }}</span>
              }
            </button>

            <!-- Enlace Recuperar Contrase\xF1a -->
            <div class="text-center mt-1">
              <a routerLink="/users/password/forget" class="text-decoration-none small text-muted hover-underline">
                <i class="bi bi-question-circle me-1"></i> \xBFOlvidaste tu contrase\xF1a?
              </a>
            </div>

          </form>

        </div>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;574a8ad73455e60ed930be9df1bfdef15fbde2bddf9f3ff790251da458a0dbf6;/home/linuxlite/WebMEAN/src/app/componentes/login.ts */\n.form-floating > label {\n  padding-left: 2.75rem;\n}\n.input-icon-wrapper {\n  position: relative;\n}\n.input-icon {\n  position: absolute;\n  top: 50%;\n  left: 1rem;\n  transform: translateY(-50%);\n  z-index: 5;\n  color: #6c757d;\n  font-size: 1.15rem;\n  transition: color 0.2s ease-in-out;\n}\n.form-control-icon {\n  padding-left: 2.85rem !important;\n}\n.input-icon-wrapper:focus-within .input-icon {\n  color: #0d6efd;\n}\n.card-gradient-header {\n  background:\n    linear-gradient(\n      135deg,\n      #0d6efd 0%,\n      #0a58ca 100%);\n}\n.google-btn-wrapper {\n  min-height: 44px;\n}\n/*# sourceMappingURL=login.css.map */\n"] }]
  }], null, { googleBtnRef: [{ type: ViewChild, args: ["googleBtnRef", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/componentes/login.ts", lineNumber: 143 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-CNRJDTRT.mjs.map
