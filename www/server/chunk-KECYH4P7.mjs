import './polyfills.server.mjs';
import {
  CKEditorComponent,
  CKEditorModule,
  require_ckeditor
} from "./chunk-ME3KNJBH.mjs";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  ɵNgNoValidate
} from "./chunk-GIGPJXHS.mjs";
import {
  environment
} from "./chunk-SF7RHBD5.mjs";
import {
  Navbar
} from "./chunk-QGEJ4V6S.mjs";
import {
  getCokie,
  isAuth,
  signout
} from "./chunk-NIVJ4KPM.mjs";
import {
  Router
} from "./chunk-IESDD46D.mjs";
import {
  HttpClient,
  HttpHeaders
} from "./chunk-JRMDAGFP.mjs";
import {
  CommonModule
} from "./chunk-TDOK3CTI.mjs";
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  computed,
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
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuerySignal
} from "./chunk-GYAE75W3.mjs";
import {
  __toESM
} from "./chunk-TB3YAHZW.mjs";

// src/app/componentes/userupdate.ts
var import_ckeditor5_build_classic = __toESM(require_ckeditor());
var _c0 = ["fileInput"];
function PrivateComponent_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.namefile(), " ");
  }
}
var PrivateComponent = class _PrivateComponent {
  http = inject(HttpClient);
  router = inject(Router);
  fileInputRef = viewChild("fileInput", ...ngDevMode ? [{ debugName: "fileInputRef" }] : []);
  authSvgwww = "/logo.svg";
  Editor = import_ckeditor5_build_classic.default;
  filosophyContent = "";
  // Propiedad estándar de clase usada con [(ngModel)] en CKEditor
  editorConfig = {
    placeholder: "Actualiza tu rese\xF1a personal...",
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
  name = signal("", ...ngDevMode ? [{ debugName: "name" }] : []);
  email = signal("", ...ngDevMode ? [{ debugName: "email" }] : []);
  celular = signal("", ...ngDevMode ? [{ debugName: "celular" }] : []);
  rol = signal("", ...ngDevMode ? [{ debugName: "rol" }] : []);
  foto = signal("", ...ngDevMode ? [{ debugName: "foto" }] : []);
  password = signal("", ...ngDevMode ? [{ debugName: "password" }] : []);
  photoSelected = signal("", ...ngDevMode ? [{ debugName: "photoSelected" }] : []);
  namefile = signal("", ...ngDevMode ? [{ debugName: "namefile" }] : []);
  selectedFile = signal(null, ...ngDevMode ? [{ debugName: "selectedFile" }] : []);
  textChange = signal("Actualizar perfil", ...ngDevMode ? [{ debugName: "textChange" }] : []);
  avatarSrc = computed(() => {
    if (this.photoSelected()) {
      return this.photoSelected();
    }
    if (this.foto()) {
      const urlApp = `${environment.apiURL}`;
      return `${urlApp}/collections/${this.foto()}`;
    }
    return this.authSvgwww;
  }, ...ngDevMode ? [{ debugName: "avatarSrc" }] : []);
  ngOnInit() {
    this.loadProfile();
  }
  loadProfile() {
    const user = isAuth();
    const token = getCokie("token");
    if (!user?._id)
      return;
    const apiUrl = `${environment.apiURL}/api`;
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http.get(`${apiUrl}/users/user/${user._id}`, { headers }).subscribe({
      next: (res) => {
        this.rol.set(res.rol || "");
        this.name.set(res.name || "");
        this.celular.set(res.celular || "");
        this.password.set(res.password || "");
        this.filosophyContent = res.filosophy || "";
        this.email.set(res.email || "");
        this.foto.set(res.foto || "");
      },
      error: (err) => {
        console.error("Error al cargar perfil:", err);
        const errorMsg = err.error?.error || err.statusText || err.message;
        alert(`Error al cargar la informaci\xF3n: ${errorMsg}`);
        if (err.status === 401) {
          signout(() => this.router.navigate(["/login"]));
        }
      }
    });
  }
  fileSelectHandler(event) {
    const input = event.target;
    const file = input.files?.[0];
    if (file) {
      this.selectedFile.set(file);
      this.photoSelected.set(URL.createObjectURL(file));
      this.namefile.set(file.name);
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const user = isAuth();
    const token = getCokie("token");
    if (!user?._id)
      return;
    this.textChange.set("Actualizando...");
    const formData = new FormData();
    const file = this.selectedFile();
    if (file) {
      formData.append("foto", file);
    }
    formData.append("rol", this.rol());
    formData.append("celular", this.celular());
    formData.append("name", this.name());
    formData.append("filosophy", this.filosophyContent);
    formData.append("email", this.email());
    if (this.password()) {
      formData.append("password", this.password());
    }
    const apiUrl = `${environment.apiURL}/api`;
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http.put(`${apiUrl}/users/user/${user._id}`, formData, { headers }).subscribe({
      next: () => {
        this.textChange.set("Actualizar perfil");
        this.password.set("");
        this.selectedFile.set(null);
        this.namefile.set("");
        alert("Perfil actualizado satisfactoriamente");
        this.loadProfile();
      },
      error: (err) => {
        this.textChange.set("Actualizar perfil");
        console.error("Error al actualizar:", err);
        const errorMsg = err.error?.error || err.statusText || err.message;
        alert(`Error al actualizar: ${errorMsg}`);
      }
    });
  }
  handleLogout() {
    signout(() => this.router.navigate(["/login"]));
  }
  handleButtonClick() {
    this.fileInputRef()?.nativeElement.click();
  }
  handleImageError(event) {
    const imgElement = event.target;
    imgElement.onerror = null;
    imgElement.src = this.authSvgwww;
  }
  static \u0275fac = function PrivateComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PrivateComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PrivateComponent, selectors: [["app-private"]], viewQuery: function PrivateComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.fileInputRef, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, decls: 77, vars: 11, consts: [["fileInput", ""], [1, "py-5"], [1, "container", "py-4"], [1, "row", "justify-content-center"], [1, "col-lg-10", "col-xl-9"], [1, "card", "bg-dark", "text-light", "border-secondary", "shadow-lg", "rounded-4", "overflow-hidden"], [1, "card-header", "border-secondary", "bg-dark", "bg-gradient", "p-3", "p-md-4", "d-flex", "justify-content-between", "align-items-center"], [1, "card-title", "fw-bold", "text-info", "mb-1"], [1, "bi", "bi-person-circle", "me-2"], [1, "small", "mb-0"], ["type", "button", 1, "btn", "btn-outline-danger", "btn-sm", "px-3", "rounded-pill", "d-flex", "align-items-center", "gap-2", 3, "click"], [1, "bi", "bi-box-arrow-right"], [1, "d-none", "d-sm-inline"], [1, "card-body", "p-4", "p-md-5"], [1, "row", "g-4", "align-items-center", "flex-column-reverse", "flex-md-row"], [1, "col-md-7"], [1, "d-flex", "flex-column", "gap-3", 3, "ngSubmit"], [1, "form-label", "text-info-emphasis", "small", "fw-semibold"], [1, "input-group"], [1, "input-group-text", "bg-secondary", "border-secondary", "text-light"], [1, "bi", "bi-shield-lock"], ["disabled", "", "type", "text", 1, "form-control", "bg-dark", "text-light", "border-secondary", "shadow-none", 3, "value"], [1, "bi", "bi-envelope"], ["disabled", "", "type", "email", 1, "form-control", "bg-dark", "text-light", "border-secondary", "shadow-none", 3, "value"], [1, "bi", "bi-person"], [1, "form-label", "text-info", "small", "fw-semibold"], [1, "ckeditor-wrapper", "text-dark", "rounded", "overflow-hidden"], ["name", "filosophyContent", 3, "ngModelChange", "editor", "config", "ngModel"], [1, "bi", "bi-telephone"], ["type", "text", "placeholder", "Escribe el n\xFAmero del celular", "name", "celular", "autocomplete", "tel", 1, "form-control", "bg-dark", "text-light", "border-secondary", "shadow-none", 3, "ngModelChange", "ngModel"], [1, "bi", "bi-key"], ["type", "password", "placeholder", "Escribe la nueva contrase\xF1a", "name", "password", "autocomplete", "new-password", 1, "form-control", "bg-dark", "text-light", "border-secondary", "shadow-none", 3, "ngModelChange", "ngModel"], ["type", "file", "accept", "image/*", 1, "d-none", 3, "change"], ["type", "submit", 1, "btn", "btn-warning", "fw-bold", "py-2.5", "mt-3", "shadow-sm", "rounded-3", "d-flex", "justify-content-center", "align-items-center", "gap-2"], [1, "bi", "bi-save"], [1, "badge", "bg-dark", "text-warning", "ms-1", "text-truncate", 2, "max-width", "150px"], [1, "col-md-5", "text-center"], [1, "avatar-container", "position-relative", "d-inline-block", "mx-auto", "mb-2"], ["alt", "Avatar Perfil", 1, "rounded-circle", "border", "border-3", "border-info", "shadow-lg", "cursor-pointer", "avatar-img", 3, "click", "error", "src"], [1, "avatar-overlay", "rounded-circle", "d-flex", "flex-column", "align-items-center", "justify-content-center", "text-light", 3, "click"], [1, "bi", "bi-camera-fill", "fs-3"], [1, "small", "fw-semibold", "mt-1"], [1, "text-secondary", "small", "mt-2", "mb-0"]], template: function PrivateComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275element(0, "app-navbar")(1, "div", 1);
      \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "div", 6)(7, "div")(8, "h4", 7);
      \u0275\u0275element(9, "i", 8);
      \u0275\u0275text(10, "Perfil de Usuario ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "p", 9);
      \u0275\u0275text(12, "Gestiona la informaci\xF3n personal y de seguridad");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "button", 10);
      \u0275\u0275listener("click", function PrivateComponent_Template_button_click_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.handleLogout());
      });
      \u0275\u0275element(14, "i", 11);
      \u0275\u0275elementStart(15, "span", 12);
      \u0275\u0275text(16, "Cerrar sesi\xF3n");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(17, "div", 13)(18, "div", 14)(19, "div", 15)(20, "form", 16);
      \u0275\u0275listener("ngSubmit", function PrivateComponent_Template_form_ngSubmit_20_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.handleSubmit($event));
      });
      \u0275\u0275elementStart(21, "div")(22, "label", 17);
      \u0275\u0275text(23, "Rol del Sistema");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 18)(25, "span", 19);
      \u0275\u0275element(26, "i", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275element(27, "input", 21);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "div")(29, "label", 17);
      \u0275\u0275text(30, "Correo Electr\xF3nico");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "div", 18)(32, "span", 19);
      \u0275\u0275element(33, "i", 22);
      \u0275\u0275elementEnd();
      \u0275\u0275element(34, "input", 23);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "div")(36, "label", 17);
      \u0275\u0275text(37, "Nombre Completo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "div", 18)(39, "span", 19);
      \u0275\u0275element(40, "i", 24);
      \u0275\u0275elementEnd();
      \u0275\u0275element(41, "input", 21);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(42, "div")(43, "label", 25);
      \u0275\u0275text(44, "Actualizar tu rese\xF1a");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "div", 26)(46, "ckeditor", 27);
      \u0275\u0275twoWayListener("ngModelChange", function PrivateComponent_Template_ckeditor_ngModelChange_46_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.filosophyContent, $event) || (ctx.filosophyContent = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(47, "div")(48, "label", 25);
      \u0275\u0275text(49, "Actualizar celular");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "div", 18)(51, "span", 19);
      \u0275\u0275element(52, "i", 28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "input", 29);
      \u0275\u0275listener("ngModelChange", function PrivateComponent_Template_input_ngModelChange_53_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.celular.set($event));
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(54, "div")(55, "label", 25);
      \u0275\u0275text(56, "Cambiar Contrase\xF1a");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "div", 18)(58, "span", 19);
      \u0275\u0275element(59, "i", 30);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "input", 31);
      \u0275\u0275listener("ngModelChange", function PrivateComponent_Template_input_ngModelChange_60_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.password.set($event));
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(61, "input", 32, 0);
      \u0275\u0275listener("change", function PrivateComponent_Template_input_change_61_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.fileSelectHandler($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "button", 33);
      \u0275\u0275element(64, "i", 34);
      \u0275\u0275elementStart(65, "span");
      \u0275\u0275text(66);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(67, PrivateComponent_Conditional_67_Template, 2, 1, "span", 35);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(68, "div", 36)(69, "div", 37)(70, "img", 38);
      \u0275\u0275listener("click", function PrivateComponent_Template_img_click_70_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.handleButtonClick());
      })("error", function PrivateComponent_Template_img_error_70_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.handleImageError($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "div", 39);
      \u0275\u0275listener("click", function PrivateComponent_Template_div_click_71_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.handleButtonClick());
      });
      \u0275\u0275element(72, "i", 40);
      \u0275\u0275elementStart(73, "span", 41);
      \u0275\u0275text(74, "Cambiar");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(75, "p", 42);
      \u0275\u0275text(76, "Haz clic en la imagen para actualizar tu foto");
      \u0275\u0275elementEnd()()()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(27);
      \u0275\u0275property("value", ctx.rol());
      \u0275\u0275advance(7);
      \u0275\u0275property("value", ctx.email());
      \u0275\u0275advance(7);
      \u0275\u0275property("value", ctx.name());
      \u0275\u0275advance(5);
      \u0275\u0275property("editor", ctx.Editor)("config", ctx.editorConfig);
      \u0275\u0275twoWayProperty("ngModel", ctx.filosophyContent);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngModel", ctx.celular());
      \u0275\u0275advance(7);
      \u0275\u0275property("ngModel", ctx.password());
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.textChange());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.namefile() ? 67 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275property("src", ctx.avatarSrc(), \u0275\u0275sanitizeUrl);
    }
  }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm, Navbar, CKEditorModule, CKEditorComponent], styles: ["\n\n.avatar-container[_ngcontent-%COMP%] {\n  width: 180px;\n  height: 180px;\n  cursor: pointer;\n}\n.avatar-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.3s ease;\n}\n.avatar-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(218, 47, 47, 0.6);\n  opacity: 0;\n  transition: opacity 0.3s ease;\n}\n.avatar-container[_ngcontent-%COMP%]:hover   .avatar-overlay[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.avatar-container[_ngcontent-%COMP%]:hover   .avatar-img[_ngcontent-%COMP%] {\n  transform: scale(1.03);\n}\n.form-control[_ngcontent-%COMP%]:disabled {\n  background-color: #1a1e21 !important;\n  opacity: 0.7;\n}\n  .ck-editor__editable_inline {\n  min-height: 150px;\n  color: #212529 !important;\n  background-color: #ffffff !important;\n}\n/*# sourceMappingURL=userupdate.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PrivateComponent, [{
    type: Component,
    args: [{ selector: "app-private", standalone: true, imports: [CommonModule, FormsModule, Navbar, CKEditorModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <app-navbar />
    
    <div class="py-5"></div>
    <div class="container py-4">
      <div class="row justify-content-center">
        <div class="col-lg-10 col-xl-9">
          
          <!-- Card Contenedora Principal -->
          <div class="card bg-dark text-light border-secondary shadow-lg rounded-4 overflow-hidden">
            
            <!-- Encabezado de la Card -->
            <div class="card-header border-secondary bg-dark bg-gradient p-3 p-md-4 d-flex justify-content-between align-items-center">
              <div>
                <h4 class="card-title fw-bold text-info mb-1">
                  <i class="bi bi-person-circle me-2"></i>Perfil de Usuario
                </h4>
                <p class="small mb-0">Gestiona la informaci\xF3n personal y de seguridad</p>
              </div>
              <button
                (click)="handleLogout()"
                type="button"
                class="btn btn-outline-danger btn-sm px-3 rounded-pill d-flex align-items-center gap-2"
              >
                <i class="bi bi-box-arrow-right"></i>
                <span class="d-none d-sm-inline">Cerrar sesi\xF3n</span>
              </button>
            </div>

            <!-- Cuerpo de la Card -->
            <div class="card-body p-4 p-md-5">
              <div class="row g-4 align-items-center flex-column-reverse flex-md-row">
                
                <!-- Columna Izquierda: Formulario -->
                <div class="col-md-7">
                  <form (ngSubmit)="handleSubmit($event)" class="d-flex flex-column gap-3">
                    
                    <div>
                      <label class="form-label text-info-emphasis small fw-semibold">Rol del Sistema</label>
                      <div class="input-group">
                        <span class="input-group-text bg-secondary border-secondary text-light">
                          <i class="bi bi-shield-lock"></i>
                        </span>
                        <input
                          class="form-control bg-dark text-light border-secondary shadow-none"
                          disabled
                          type="text"
                          [value]="rol()"
                        />
                      </div>
                    </div>

                    <div>
                      <label class="form-label text-info-emphasis small fw-semibold">Correo Electr\xF3nico</label>
                      <div class="input-group">
                        <span class="input-group-text bg-secondary border-secondary text-light">
                          <i class="bi bi-envelope"></i>
                        </span>
                        <input
                          class="form-control bg-dark text-light border-secondary shadow-none"
                          disabled
                          type="email"
                          [value]="email()"
                        />
                      </div>
                    </div>

                    <div>
                      <label class="form-label text-info-emphasis small fw-semibold">Nombre Completo</label>
                      <div class="input-group">
                        <span class="input-group-text bg-secondary border-secondary text-light">
                          <i class="bi bi-person"></i>
                        </span>
                        <input
                          class="form-control bg-dark text-light border-secondary shadow-none"
                          disabled
                          type="text"
                          [value]="name()"
                        />
                      </div>
                    </div>

                    <!-- Editor CKEditor -->
                    <div>
                      <label class="form-label text-info small fw-semibold">Actualizar tu rese\xF1a</label>
                      <div class="ckeditor-wrapper text-dark rounded overflow-hidden">
                        <ckeditor
                          [editor]="Editor"
                          [config]="editorConfig"
                          [(ngModel)]="filosophyContent"
                          name="filosophyContent"
                        ></ckeditor>
                      </div>
                    </div>

                    <div>
                      <label class="form-label text-info small fw-semibold">Actualizar celular</label>
                      <div class="input-group">
                        <span class="input-group-text bg-secondary border-secondary text-light">
                          <i class="bi bi-telephone"></i>
                        </span>
                        <input
                          class="form-control bg-dark text-light border-secondary shadow-none"
                          type="text"
                          placeholder="Escribe el n\xFAmero del celular"
                          [ngModel]="celular()"
                          (ngModelChange)="celular.set($event)"
                          name="celular"
                          autocomplete="tel"
                        />
                      </div>
                    </div>

                    <div>
                      <label class="form-label text-info small fw-semibold">Cambiar Contrase\xF1a</label>
                      <div class="input-group">
                        <span class="input-group-text bg-secondary border-secondary text-light">
                          <i class="bi bi-key"></i>
                        </span>
                        <input
                          class="form-control bg-dark text-light border-secondary shadow-none"
                          type="password"
                          placeholder="Escribe la nueva contrase\xF1a"
                          [ngModel]="password()"
                          (ngModelChange)="password.set($event)"
                          name="password"
                          autocomplete="new-password"
                        />
                      </div>
                    </div>

                    <input
                      #fileInput
                      type="file"
                      class="d-none"
                      (change)="fileSelectHandler($event)"
                      accept="image/*"
                    />

                    <button 
                      type="submit" 
                      class="btn btn-warning fw-bold py-2.5 mt-3 shadow-sm rounded-3 d-flex justify-content-center align-items-center gap-2"
                    >
                      <i class="bi bi-save"></i>
                      <span>{{ textChange() }}</span>
                      @if (namefile()) {
                        <span class="badge bg-dark text-warning ms-1 text-truncate" style="max-width: 150px;">
                          {{ namefile() }}
                        </span>
                      }
                    </button>
                  </form>
                </div>

                <!-- Columna Derecha: Avatar de Perfil -->
                <div class="col-md-5 text-center">
                  <div class="avatar-container position-relative d-inline-block mx-auto mb-2">
                    <img
                      class="rounded-circle border border-3 border-info shadow-lg cursor-pointer avatar-img"
                      [src]="avatarSrc()"
                      alt="Avatar Perfil"
                      (click)="handleButtonClick()"
                      (error)="handleImageError($event)"
                    />
                    <div 
                      class="avatar-overlay rounded-circle d-flex flex-column align-items-center justify-content-center text-light"
                      (click)="handleButtonClick()"
                    >
                      <i class="bi bi-camera-fill fs-3"></i>
                      <span class="small fw-semibold mt-1">Cambiar</span>
                    </div>
                  </div>
                  <p class="text-secondary small mt-2 mb-0">Haz clic en la imagen para actualizar tu foto</p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;0a5313e95c2d8de1a19fbbe1167c3f80519aec1dcafa65f677612b5106bdcc50;/home/linuxlite/WebMEAN/src/app/componentes/userupdate.ts */\n.avatar-container {\n  width: 180px;\n  height: 180px;\n  cursor: pointer;\n}\n.avatar-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.3s ease;\n}\n.avatar-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(218, 47, 47, 0.6);\n  opacity: 0;\n  transition: opacity 0.3s ease;\n}\n.avatar-container:hover .avatar-overlay {\n  opacity: 1;\n}\n.avatar-container:hover .avatar-img {\n  transform: scale(1.03);\n}\n.form-control:disabled {\n  background-color: #1a1e21 !important;\n  opacity: 0.7;\n}\n::ng-deep .ck-editor__editable_inline {\n  min-height: 150px;\n  color: #212529 !important;\n  background-color: #ffffff !important;\n}\n/*# sourceMappingURL=userupdate.css.map */\n"] }]
  }], null, { fileInputRef: [{ type: ViewChild, args: ["fileInput", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PrivateComponent, { className: "PrivateComponent", filePath: "src/app/componentes/userupdate.ts", lineNumber: 257 });
})();
export {
  PrivateComponent
};
//# sourceMappingURL=chunk-KECYH4P7.mjs.map
