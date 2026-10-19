import './polyfills.server.mjs';
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-GIGPJXHS.mjs";
import {
  environment
} from "./chunk-SF7RHBD5.mjs";
import {
  Navbar
} from "./chunk-QGEJ4V6S.mjs";
import "./chunk-NIVJ4KPM.mjs";
import {
  Router,
  RouterModule
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
  inject,
  setClassMetadata,
  signal,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GYAE75W3.mjs";
import {
  __spreadValues
} from "./chunk-TB3YAHZW.mjs";

// src/app/componentes/useradd.ts
var _forTrack0 = ($index, $item) => $item.value;
function UserFormComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "i", 32);
    \u0275\u0275elementStart(2, "div", 33);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r0.toastType() === "success" ? "alert-success border-success" : "alert-danger border-danger");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.toastType() === "success" ? "bi-check-circle-fill text-success" : "bi-exclamation-triangle-fill text-danger");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.toastMessage());
  }
}
function UserFormComponent_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r2 = ctx.$implicit;
    \u0275\u0275property("value", opt_r2.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r2.label);
  }
}
function UserFormComponent_Conditional_47_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r4 = ctx.$implicit;
    \u0275\u0275property("value", opt_r4.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r4.label);
  }
}
function UserFormComponent_Conditional_47_For_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    \u0275\u0275property("value", c_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Ciclo ", c_r5);
  }
}
function UserFormComponent_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 34)(2, "div", 35);
    \u0275\u0275element(3, "i", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h6", 37);
    \u0275\u0275text(5, "Datos Acad\xE9micos (Estudiante)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 38)(7, "div", 23);
    \u0275\u0275element(8, "i", 39);
    \u0275\u0275elementStart(9, "div", 13)(10, "select", 40);
    \u0275\u0275twoWayListener("ngModelChange", function UserFormComponent_Conditional_47_Template_select_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.mencion, $event) || (ctx_r0.mencion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(11, "option", 41);
    \u0275\u0275text(12, "-- Seleccionar Menci\xF3n --");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(13, UserFormComponent_Conditional_47_For_14_Template, 2, 2, "option", 15, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "label", 42);
    \u0275\u0275text(16, "Menci\xF3n *");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 23);
    \u0275\u0275element(18, "i", 43);
    \u0275\u0275elementStart(19, "div", 13)(20, "select", 44);
    \u0275\u0275twoWayListener("ngModelChange", function UserFormComponent_Conditional_47_Template_select_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.ciclo, $event) || (ctx_r0.ciclo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(21, "option", 41);
    \u0275\u0275text(22, "-- Seleccionar Ciclo --");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(23, UserFormComponent_Conditional_47_For_24_Template, 2, 2, "option", 15, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "label", 45);
    \u0275\u0275text(26, "Ciclo Acad\xE9mico *");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.mencion);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.mencionOptions);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.ciclo);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.cicloOptions);
  }
}
function UserFormComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 46);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "Guardando Usuario...");
    \u0275\u0275elementEnd();
  }
}
function UserFormComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 47);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "Guardar Usuario");
    \u0275\u0275elementEnd();
  }
}
var UserFormComponent = class _UserFormComponent {
  http = inject(HttpClient);
  router = inject(Router);
  apiUrl = `${environment.apiURL}/api`;
  rolOptions = [
    { value: "1", label: "Administrador (1)" },
    { value: "2", label: "Docente (2)" },
    { value: "3", label: "Estudiante (3)" },
    { value: "4", label: "Rol 4" },
    { value: "5", label: "Rol 5" }
  ];
  mencionOptions = [
    { value: "ED", label: "Educaci\xF3n Art\xEDstica (ED)" },
    { value: "E", label: "Escultura (E)" },
    { value: "G", label: "Grabado (G)" },
    { value: "P", label: "Pintura (P)" }
  ];
  cicloOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  isPending = signal(false, ...ngDevMode ? [{ debugName: "isPending" }] : []);
  selectedRol = signal("3", ...ngDevMode ? [{ debugName: "selectedRol" }] : []);
  name = signal("", ...ngDevMode ? [{ debugName: "name" }] : []);
  email = signal("", ...ngDevMode ? [{ debugName: "email" }] : []);
  dni = signal("", ...ngDevMode ? [{ debugName: "dni" }] : []);
  password = signal("", ...ngDevMode ? [{ debugName: "password" }] : []);
  mencion = signal("", ...ngDevMode ? [{ debugName: "mencion" }] : []);
  ciclo = signal("", ...ngDevMode ? [{ debugName: "ciclo" }] : []);
  toastMessage = signal("", ...ngDevMode ? [{ debugName: "toastMessage" }] : []);
  toastType = signal("success", ...ngDevMode ? [{ debugName: "toastType" }] : []);
  showToast(message, type) {
    this.toastMessage.set(message);
    this.toastType.set(type);
    setTimeout(() => {
      this.toastMessage.set("");
    }, 3e3);
  }
  handleFormAction(event) {
    event.preventDefault();
    const rolVal = this.selectedRol();
    const nameVal = this.name().trim();
    const emailVal = this.email().trim();
    const dniVal = this.dni().trim();
    const passVal = this.password();
    const mencionVal = rolVal === "3" ? this.mencion() : null;
    const cicloVal = rolVal === "3" ? this.ciclo() : null;
    if (!nameVal || !emailVal || !dniVal || !rolVal || !passVal) {
      this.showToast("Por favor, rellene todos los campos obligatorios.", "error");
      return;
    }
    if (rolVal === "3" && (!mencionVal || !cicloVal)) {
      this.showToast("Los estudiantes requieren una Menci\xF3n y un Ciclo.", "error");
      return;
    }
    const payload = __spreadValues({
      rol: rolVal,
      name: nameVal,
      email: emailVal,
      dni: dniVal,
      password: passVal
    }, rolVal === "3" && { mencion: mencionVal, ciclo: cicloVal });
    this.isPending.set(true);
    this.http.post(`${this.apiUrl}/auth/adduser`, payload).subscribe({
      next: (res) => {
        this.isPending.set(false);
        this.showToast(res?.message || "Usuario registrado con \xE9xito.", "success");
        this.name.set("");
        this.email.set("");
        this.dni.set("");
        this.password.set("");
        this.mencion.set("");
        this.ciclo.set("");
        this.selectedRol.set("3");
        setTimeout(() => {
          this.router.navigate(["/carpeta"]);
        }, 1500);
      },
      error: (err) => {
        this.isPending.set(false);
        console.error(err);
        const errMsg = err.error?.message || err.statusText || err.message;
        this.showToast(`Error al registrar usuario: ${errMsg}`, "error");
      }
    });
  }
  static \u0275fac = function UserFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserFormComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserFormComponent, selectors: [["app-user-form"]], decls: 51, vars: 9, consts: [[1, "py-5", "py-md-5"], [1, "container", "my-4", "col-12", "col-md-10", "col-lg-10", "col-xl-8"], [1, "card", "border-0", "shadow-lg", "rounded-4", "overflow-hidden"], [1, "p-1", "text-center", "position-relative"], [1, "bi", "bi-person-plus-fill", "fs-2"], [1, "fw-bold", "mb-1"], [1, "small", "mb-0"], [1, "card-body", "p-1", "p-md-2"], ["role", "alert", 1, "alert", "alert-dismissible", "fade", "show", "d-flex", "align-items-center", "rounded-3", "mb-4", "shadow-sm", "border-start", "border-4", 3, "ngClass"], ["id", "new-user-form", 3, "ngSubmit"], [1, "row", "g-3", "mb-3"], [1, "col-12", "col-md-4", "input-icon-wrapper"], [1, "bi", "bi-shield-lock", "input-icon"], [1, "form-floating"], ["id", "rolSelect", "name", "rol", "required", "", 1, "form-select", "form-control-icon", "rounded-3", "shadow-sm", 3, "ngModelChange", "ngModel"], [3, "value"], ["for", "rolSelect", 1, "text-secondary"], [1, "bi", "bi-person", "input-icon"], ["type", "text", "id", "nameInput", "placeholder", "Ej. Juan P\xE9rez", "name", "name", "required", "", 1, "form-control", "form-control-icon", "rounded-3", "shadow-sm", 3, "ngModelChange", "ngModel"], ["for", "nameInput", 1, "text-secondary"], [1, "bi", "bi-envelope", "input-icon"], ["type", "email", "id", "emailInput", "placeholder", "correo@ejemplo.com", "name", "email", "required", "", 1, "form-control", "form-control-icon", "rounded-3", "shadow-sm", 3, "ngModelChange", "ngModel"], ["for", "emailInput", 1, "text-secondary"], [1, "col-12", "col-md-6", "input-icon-wrapper"], [1, "bi", "bi-card-heading", "input-icon"], ["type", "text", "id", "dniInput", "placeholder", "N\xFAmero de documento", "name", "dni", "maxlength", "12", "required", "", 1, "form-control", "form-control-icon", "rounded-3", "shadow-sm", 3, "ngModelChange", "ngModel"], ["for", "dniInput", 1, "text-secondary"], [1, "bi", "bi-key", "input-icon"], ["type", "password", "id", "passInput", "placeholder", "Contrase\xF1a", "name", "password", "required", "", 1, "form-control", "form-control-icon", "rounded-3", "shadow-sm", 3, "ngModelChange", "ngModel"], ["for", "passInput", 1, "text-secondary"], [1, "p-2", "rounded-1", "academic-section", "my-1"], ["type", "submit", 1, "btn", "btn-primary", "text-uppercase", "fw-bold", "shadow-sm", "mt-4", "w-100", "d-flex", "align-items-center", "justify-content-center", "gap-2", 3, "disabled"], [1, "bi", "me-2", "fs-4", 3, "ngClass"], [1, "small", "fw-semibold"], [1, "d-flex", "align-items-center", "text-primary", "mb-3"], [1, "p-2", "rounded-3", "bg-primary", "bg-opacity-10", "me-2"], [1, "bi", "bi-mortarboard-fill", "fs-5", "text-primary"], [1, "fw-bold", "mb-0"], [1, "row", "g-3"], [1, "bi", "bi-journal-bookmark", "input-icon"], ["id", "mencionSelect", "name", "mencion", "required", "", 1, "form-select", "form-control-icon", "rounded-3", "shadow-sm", 3, "ngModelChange", "ngModel"], ["value", "", "disabled", ""], ["for", "mencionSelect", 1, "text-secondary"], [1, "bi", "bi-collection", "input-icon"], ["id", "cicloSelect", "name", "ciclo", "required", "", 1, "form-select", "form-control-icon", "rounded-3", "shadow-sm", 3, "ngModelChange", "ngModel"], ["for", "cicloSelect", 1, "text-secondary"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm"], [1, "bi", "bi-person-check-fill", "fs-5"]], template: function UserFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-navbar")(1, "div", 0);
      \u0275\u0275elementStart(2, "div", 1)(3, "div", 2)(4, "div", 3);
      \u0275\u0275element(5, "i", 4);
      \u0275\u0275elementStart(6, "h4", 5);
      \u0275\u0275text(7, "Registrar Nuevo Usuario");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 6);
      \u0275\u0275text(9, "Complete la informaci\xF3n requerida para dar de alta un usuario");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 7);
      \u0275\u0275conditionalCreate(11, UserFormComponent_Conditional_11_Template, 4, 3, "div", 8);
      \u0275\u0275elementStart(12, "form", 9);
      \u0275\u0275listener("ngSubmit", function UserFormComponent_Template_form_ngSubmit_12_listener($event) {
        return ctx.handleFormAction($event);
      });
      \u0275\u0275elementStart(13, "div", 10)(14, "div", 11);
      \u0275\u0275element(15, "i", 12);
      \u0275\u0275elementStart(16, "div", 13)(17, "select", 14);
      \u0275\u0275twoWayListener("ngModelChange", function UserFormComponent_Template_select_ngModelChange_17_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedRol, $event) || (ctx.selectedRol = $event);
        return $event;
      });
      \u0275\u0275repeaterCreate(18, UserFormComponent_For_19_Template, 2, 2, "option", 15, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "label", 16);
      \u0275\u0275text(21, "Rol del Usuario *");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(22, "div", 11);
      \u0275\u0275element(23, "i", 17);
      \u0275\u0275elementStart(24, "div", 13)(25, "input", 18);
      \u0275\u0275twoWayListener("ngModelChange", function UserFormComponent_Template_input_ngModelChange_25_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.name, $event) || (ctx.name = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "label", 19);
      \u0275\u0275text(27, "Nombre Completo *");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "div", 11);
      \u0275\u0275element(29, "i", 20);
      \u0275\u0275elementStart(30, "div", 13)(31, "input", 21);
      \u0275\u0275twoWayListener("ngModelChange", function UserFormComponent_Template_input_ngModelChange_31_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "label", 22);
      \u0275\u0275text(33, "Correo Electr\xF3nico *");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(34, "div", 10)(35, "div", 23);
      \u0275\u0275element(36, "i", 24);
      \u0275\u0275elementStart(37, "div", 13)(38, "input", 25);
      \u0275\u0275twoWayListener("ngModelChange", function UserFormComponent_Template_input_ngModelChange_38_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.dni, $event) || (ctx.dni = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "label", 26);
      \u0275\u0275text(40, "DNI / Documento *");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(41, "div", 23);
      \u0275\u0275element(42, "i", 27);
      \u0275\u0275elementStart(43, "div", 13)(44, "input", 28);
      \u0275\u0275twoWayListener("ngModelChange", function UserFormComponent_Template_input_ngModelChange_44_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "label", 29);
      \u0275\u0275text(46, "Contrase\xF1a *");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(47, UserFormComponent_Conditional_47_Template, 27, 2, "div", 30);
      \u0275\u0275elementStart(48, "button", 31);
      \u0275\u0275conditionalCreate(49, UserFormComponent_Conditional_49_Template, 3, 0)(50, UserFormComponent_Conditional_50_Template, 3, 0);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275conditional(ctx.toastMessage() ? 11 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedRol);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.rolOptions);
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.name);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.email);
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.dni);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.password);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.selectedRol() === "3" ? 47 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isPending());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isPending() ? 49 : 50);
    }
  }, dependencies: [CommonModule, NgClass, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, NgModel, NgForm, RouterModule, Navbar], styles: ["\n\n.form-floating[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n  padding-left: 2.75rem;\n}\n.input-icon-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n}\n.input-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 1rem;\n  transform: translateY(-50%);\n  z-index: 5;\n  color: #6c757d;\n  font-size: 1.15rem;\n  transition: color 0.2s ease-in-out;\n}\n.form-control-icon[_ngcontent-%COMP%] {\n  padding-left: 2.85rem !important;\n}\n.input-icon-wrapper[_ngcontent-%COMP%]:focus-within   .input-icon[_ngcontent-%COMP%] {\n  color: #0d6efd;\n}\n.card-gradient-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #0d6efd 0%,\n      #0a58ca 100%);\n}\n.academic-section[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border: 1px dashed #dee2e6;\n}\n/*# sourceMappingURL=useradd.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserFormComponent, [{
    type: Component,
    args: [{ selector: "app-user-form", standalone: true, imports: [CommonModule, FormsModule, RouterModule, Navbar], template: `
    <app-navbar />
    <div class="py-5 py-md-5"></div>

    <div class="container my-4 col-12 col-md-10 col-lg-10 col-xl-8">
      <!-- Tarjeta Principal -->
      <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
        
        <!-- Encabezado de la Tarjeta -->
        <div class=" p-1 text-center position-relative">
            <i class="bi bi-person-plus-fill fs-2"></i>
          <h4 class="fw-bold mb-1">Registrar Nuevo Usuario</h4>
          <p class="small mb-0">Complete la informaci\xF3n requerida para dar de alta un usuario</p>
        </div>

        <div class="card-body p-1 p-md-2">
          <!-- Toast / Alert de notificaciones -->
          @if (toastMessage()) {
            <div 
              class="alert alert-dismissible fade show d-flex align-items-center rounded-3 mb-4 shadow-sm border-start border-4"
              [ngClass]="toastType() === 'success' ? 'alert-success border-success' : 'alert-danger border-danger'" 
              role="alert"
            >
              <i class="bi me-2 fs-4" [ngClass]="toastType() === 'success' ? 'bi-check-circle-fill text-success' : 'bi-exclamation-triangle-fill text-danger'"></i>
              <div class="small fw-semibold">{{ toastMessage() }}</div>
            </div>
          }

          <form id="new-user-form" (ngSubmit)="handleFormAction($event)">
            
            <!-- Fila 1: Rol, Nombre, Correo -->
            <div class="row g-3 mb-3">
              <!-- Campo: Rol -->
              <div class="col-12 col-md-4 input-icon-wrapper">
                <i class="bi bi-shield-lock input-icon"></i>
                <div class="form-floating">
                  <select
                    class="form-select form-control-icon rounded-3 shadow-sm"
                    id="rolSelect"
                    name="rol"
                    [(ngModel)]="selectedRol"
                    required
                  >
                    @for (opt of rolOptions; track opt.value) {
                      <option [value]="opt.value">{{ opt.label }}</option>
                    }
                  </select>
                  <label for="rolSelect" class="text-secondary">Rol del Usuario *</label>
                </div>
              </div>

              <!-- Campo: Nombre Completo -->
              <div class="col-12 col-md-4 input-icon-wrapper">
                <i class="bi bi-person input-icon"></i>
                <div class="form-floating">
                  <input 
                    type="text" 
                    class="form-control form-control-icon rounded-3 shadow-sm" 
                    id="nameInput"
                    placeholder="Ej. Juan P\xE9rez" 
                    [(ngModel)]="name" 
                    name="name" 
                    required 
                  />
                  <label for="nameInput" class="text-secondary">Nombre Completo *</label>
                </div>
              </div>

              <!-- Campo: Correo Electr\xF3nico -->
              <div class="col-12 col-md-4 input-icon-wrapper">
                <i class="bi bi-envelope input-icon"></i>
                <div class="form-floating">
                  <input 
                    type="email" 
                    class="form-control form-control-icon rounded-3 shadow-sm" 
                    id="emailInput"
                    placeholder="correo@ejemplo.com" 
                    [(ngModel)]="email" 
                    name="email" 
                    required 
                  />
                  <label for="emailInput" class="text-secondary">Correo Electr\xF3nico *</label>
                </div>
              </div>
            </div>

            <!-- Fila 2: Documento y Contrase\xF1a -->
            <div class="row g-3 mb-3">
              <!-- Campo: DNI -->
              <div class="col-12 col-md-6 input-icon-wrapper">
                <i class="bi bi-card-heading input-icon"></i>
                <div class="form-floating">
                  <input 
                    type="text" 
                    class="form-control form-control-icon rounded-3 shadow-sm" 
                    id="dniInput"
                    placeholder="N\xFAmero de documento" 
                    [(ngModel)]="dni" 
                    name="dni" 
                    maxlength="12" 
                    required 
                  />
                  <label for="dniInput" class="text-secondary">DNI / Documento *</label>
                </div>
              </div>

              <!-- Campo: Contrase\xF1a -->
              <div class="col-12 col-md-6 input-icon-wrapper">
                <i class="bi bi-key input-icon"></i>
                <div class="form-floating">
                  <input 
                    type="password" 
                    class="form-control form-control-icon rounded-3 shadow-sm" 
                    id="passInput"
                    placeholder="Contrase\xF1a" 
                    [(ngModel)]="password" 
                    name="password" 
                    required 
                  />
                  <label for="passInput" class="text-secondary">Contrase\xF1a *</label>
                </div>
              </div>
            </div>

            <!-- Secci\xF3n Din\xE1mica: Estudiante -->
            @if (selectedRol() === '3') {
              <div class="p-2 rounded-1 academic-section my-1">
                <div class="d-flex align-items-center text-primary mb-3">
                  <div class="p-2 rounded-3 bg-primary bg-opacity-10 me-2">
                    <i class="bi bi-mortarboard-fill fs-5 text-primary"></i>
                  </div>
                  <h6 class="fw-bold mb-0">Datos Acad\xE9micos (Estudiante)</h6>
                </div>

                <div class="row g-3">
                  <!-- Campo: Menci\xF3n -->
                  <div class="col-12 col-md-6 input-icon-wrapper">
                    <i class="bi bi-journal-bookmark input-icon"></i>
                    <div class="form-floating">
                      <select class="form-select form-control-icon rounded-3 shadow-sm" id="mencionSelect" [(ngModel)]="mencion" name="mencion" required>
                        <option value="" disabled>-- Seleccionar Menci\xF3n --</option>
                        @for (opt of mencionOptions; track opt.value) {
                          <option [value]="opt.value">{{ opt.label }}</option>
                        }
                      </select>
                      <label for="mencionSelect" class="text-secondary">Menci\xF3n *</label>
                    </div>
                  </div>

                  <!-- Campo: Ciclo Acad\xE9mico -->
                  <div class="col-12 col-md-6 input-icon-wrapper">
                    <i class="bi bi-collection input-icon"></i>
                    <div class="form-floating">
                      <select class="form-select form-control-icon rounded-3 shadow-sm" id="cicloSelect" [(ngModel)]="ciclo" name="ciclo" required>
                        <option value="" disabled>-- Seleccionar Ciclo --</option>
                        @for (c of cicloOptions; track c) {
                          <option [value]="c">Ciclo {{ c }}</option>
                        }
                      </select>
                      <label for="cicloSelect" class="text-secondary">Ciclo Acad\xE9mico *</label>
                    </div>
                  </div>
                </div>
              </div>
            }

            <!-- Bot\xF3n de Env\xEDo -->
            <button
              type="submit"
              class="btn btn-primary text-uppercase fw-bold shadow-sm mt-4 w-100 d-flex align-items-center justify-content-center gap-2"
              [disabled]="isPending()"
            >
              @if (isPending()) {
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Guardando Usuario...</span>
              } @else {
                <i class="bi bi-person-check-fill fs-5"></i>
                <span>Guardar Usuario</span>
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;3a3ff197789ee8be179d4308dface526b167dd5137a7549dcb45fe285ce4c7dc;/home/linuxlite/WebMEAN/src/app/componentes/useradd.ts */\n.form-floating > label {\n  padding-left: 2.75rem;\n}\n.input-icon-wrapper {\n  position: relative;\n}\n.input-icon {\n  position: absolute;\n  top: 50%;\n  left: 1rem;\n  transform: translateY(-50%);\n  z-index: 5;\n  color: #6c757d;\n  font-size: 1.15rem;\n  transition: color 0.2s ease-in-out;\n}\n.form-control-icon {\n  padding-left: 2.85rem !important;\n}\n.input-icon-wrapper:focus-within .input-icon {\n  color: #0d6efd;\n}\n.card-gradient-header {\n  background:\n    linear-gradient(\n      135deg,\n      #0d6efd 0%,\n      #0a58ca 100%);\n}\n.academic-section {\n  background-color: #f8f9fa;\n  border: 1px dashed #dee2e6;\n}\n/*# sourceMappingURL=useradd.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserFormComponent, { className: "UserFormComponent", filePath: "src/app/componentes/useradd.ts", lineNumber: 240 });
})();
export {
  UserFormComponent
};
//# sourceMappingURL=chunk-QDX6MXOJ.mjs.map
