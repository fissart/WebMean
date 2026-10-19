import './polyfills.server.mjs';
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  RequiredValidator
} from "./chunk-GIGPJXHS.mjs";
import {
  environment
} from "./chunk-SF7RHBD5.mjs";
import {
  Navbar
} from "./chunk-QGEJ4V6S.mjs";
import {
  isAuth
} from "./chunk-NIVJ4KPM.mjs";
import "./chunk-IESDD46D.mjs";
import {
  HttpClient,
  HttpHeaders
} from "./chunk-JRMDAGFP.mjs";
import {
  CommonModule
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
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GYAE75W3.mjs";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-TB3YAHZW.mjs";

// src/app/componentes/documents.ts
var _forTrack0 = ($index, $item) => $item._id;
function AdminDashboardComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "button", 6);
    \u0275\u0275listener("click", function AdminDashboardComponent_Conditional_3_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openCreateModal());
    });
    \u0275\u0275text(2, " Generar documentos ");
    \u0275\u0275elementEnd()();
  }
}
function AdminDashboardComponent_For_6_Conditional_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 14)(2, "button", 15);
    \u0275\u0275listener("click", function AdminDashboardComponent_For_6_Conditional_3_Conditional_3_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const \u0275$index_15_r6 = \u0275\u0275nextContext(2).$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openSubclassModal(\u0275$index_15_r6));
    });
    \u0275\u0275text(3, " Agregar Subclase ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 16);
    \u0275\u0275listener("click", function AdminDashboardComponent_For_6_Conditional_3_Conditional_3_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r6 = \u0275\u0275nextContext(2);
      const note_r4 = ctx_r6.$implicit;
      const \u0275$index_15_r6 = ctx_r6.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openEditModal(note_r4, \u0275$index_15_r6));
    });
    \u0275\u0275text(5, " Editar Clase ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 17);
    \u0275\u0275listener("click", function AdminDashboardComponent_For_6_Conditional_3_Conditional_3_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r5);
      const note_r4 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeLink(note_r4._id));
    });
    \u0275\u0275text(7, " Eliminar ");
    \u0275\u0275elementEnd()()();
  }
}
function AdminDashboardComponent_For_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "button", 12);
    \u0275\u0275listener("click", function AdminDashboardComponent_For_6_Conditional_3_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const note_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleCollapse(note_r4._id));
    });
    \u0275\u0275text(2, " Controles de Estructura ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, AdminDashboardComponent_For_6_Conditional_3_Conditional_3_Template, 8, 0, "div", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const note_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.collapsedStates()[note_r4._id] ? 3 : -1);
  }
}
function AdminDashboardComponent_For_6_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 9);
  }
  if (rf & 2) {
    const note_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("innerHTML", note_r4.description, \u0275\u0275sanitizeHtml);
  }
}
function AdminDashboardComponent_For_6_For_7_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const notte_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", notte_r9.detail, "\n");
  }
}
function AdminDashboardComponent_For_6_For_7_Conditional_5_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 22)(2, "button", 23);
    \u0275\u0275listener("click", function AdminDashboardComponent_For_6_For_7_Conditional_5_Conditional_3_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r12);
      const \u0275$index_46_r11 = \u0275\u0275nextContext(2).$index;
      const \u0275$index_15_r6 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openSubclassModal(\u0275$index_15_r6, \u0275$index_46_r11));
    });
    \u0275\u0275text(3, " + ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 24);
    \u0275\u0275listener("click", function AdminDashboardComponent_For_6_For_7_Conditional_5_Conditional_3_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r12 = \u0275\u0275nextContext(2);
      const notte_r9 = ctx_r12.$implicit;
      const \u0275$index_46_r11 = ctx_r12.$index;
      const \u0275$index_15_r6 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openEditSubclassModal(notte_r9, \u0275$index_15_r6, \u0275$index_46_r11));
    });
    \u0275\u0275text(5, " Editar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 25);
    \u0275\u0275listener("click", function AdminDashboardComponent_For_6_For_7_Conditional_5_Conditional_3_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r12);
      const \u0275$index_46_r11 = \u0275\u0275nextContext(2).$index;
      const \u0275$index_15_r6 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeSubtask(\u0275$index_15_r6, \u0275$index_46_r11));
    });
    \u0275\u0275text(7, " X ");
    \u0275\u0275elementEnd()()();
  }
}
function AdminDashboardComponent_For_6_For_7_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "button", 20);
    \u0275\u0275listener("click", function AdminDashboardComponent_For_6_For_7_Conditional_5_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r10);
      const \u0275$index_46_r11 = \u0275\u0275nextContext().$index;
      const \u0275$index_15_r6 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleSubCollapse(\u0275$index_15_r6, \u0275$index_46_r11));
    });
    \u0275\u0275text(2, " Acciones de Nodo ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, AdminDashboardComponent_For_6_For_7_Conditional_5_Conditional_3_Template, 8, 0, "div", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const \u0275$index_46_r11 = \u0275\u0275nextContext().$index;
    const \u0275$index_15_r6 = \u0275\u0275nextContext().$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.subCollapsedStates()[\u0275$index_15_r6 + "_" + \u0275$index_46_r11] ? 3 : -1);
  }
}
function AdminDashboardComponent_For_6_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "button", 18);
    \u0275\u0275listener("click", function AdminDashboardComponent_For_6_For_7_Template_button_click_1_listener() {
      const notte_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openExternalLink(notte_r9.detail));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 8);
    \u0275\u0275conditionalCreate(4, AdminDashboardComponent_For_6_For_7_Conditional_4_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, AdminDashboardComponent_For_6_For_7_Conditional_5_Template, 4, 1, "div", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const notte_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", notte_r9.title, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r1.isLink(notte_r9.detail) ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isAdministrator() ? 5 : -1);
  }
}
function AdminDashboardComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 7);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, AdminDashboardComponent_For_6_Conditional_3_Template, 4, 1, "div", 8);
    \u0275\u0275conditionalCreate(4, AdminDashboardComponent_For_6_Conditional_4_Template, 1, 1, "div", 9);
    \u0275\u0275elementStart(5, "div", 10);
    \u0275\u0275repeaterCreate(6, AdminDashboardComponent_For_6_For_7_Template, 6, 3, "div", 11, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const note_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(note_r4.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isAdministrator() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(note_r4.description ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(note_r4.usertask);
  }
}
function AdminDashboardComponent_Conditional_7_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "input", 42);
    \u0275\u0275listener("change", function AdminDashboardComponent_Conditional_7_Conditional_8_Template_input_change_1_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.fileSelectHandler($event));
    });
    \u0275\u0275elementEnd()();
  }
}
function AdminDashboardComponent_Conditional_7_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "textarea", 43);
    \u0275\u0275twoWayListener("ngModelChange", function AdminDashboardComponent_Conditional_7_Conditional_12_Template_textarea_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.formState.detail, $event) || (ctx_r1.formState.detail = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formState.detail);
  }
}
function AdminDashboardComponent_Conditional_7_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "textarea", 44);
    \u0275\u0275twoWayListener("ngModelChange", function AdminDashboardComponent_Conditional_7_Conditional_13_Template_textarea_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.formState.detail, $event) || (ctx_r1.formState.detail = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formState.detail);
  }
}
function AdminDashboardComponent_Conditional_7_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function AdminDashboardComponent_Conditional_7_Conditional_15_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.crearGeneral($event));
    });
    \u0275\u0275text(1, "Crear Documento");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_7_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function AdminDashboardComponent_Conditional_7_Conditional_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updateSubTaskText());
    });
    \u0275\u0275text(1, "Actualizar Subclase");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_7_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function AdminDashboardComponent_Conditional_7_Conditional_17_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onSubmitUpdate($event));
    });
    \u0275\u0275text(1, "Actualizar Clase");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_7_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function AdminDashboardComponent_Conditional_7_Conditional_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.createSesion());
    });
    \u0275\u0275text(1, "Confirmar Subclase");
    \u0275\u0275elementEnd();
  }
}
function AdminDashboardComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 26)(2, "div", 27)(3, "div", 28)(4, "h5", 29);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 30);
    \u0275\u0275listener("click", function AdminDashboardComponent_Conditional_7_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resetFormModal());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 31);
    \u0275\u0275conditionalCreate(8, AdminDashboardComponent_Conditional_7_Conditional_8_Template, 2, 0, "div", 32);
    \u0275\u0275elementStart(9, "div", 33)(10, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", function AdminDashboardComponent_Conditional_7_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formState.title, $event) || (ctx_r1.formState.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 35);
    \u0275\u0275conditionalCreate(12, AdminDashboardComponent_Conditional_7_Conditional_12_Template, 1, 1, "textarea", 36)(13, AdminDashboardComponent_Conditional_7_Conditional_13_Template, 1, 1, "textarea", 37);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 38);
    \u0275\u0275conditionalCreate(15, AdminDashboardComponent_Conditional_7_Conditional_15_Template, 2, 0, "button", 39);
    \u0275\u0275conditionalCreate(16, AdminDashboardComponent_Conditional_7_Conditional_16_Template, 2, 0, "button", 39);
    \u0275\u0275conditionalCreate(17, AdminDashboardComponent_Conditional_7_Conditional_17_Template, 2, 0, "button", 39);
    \u0275\u0275conditionalCreate(18, AdminDashboardComponent_Conditional_7_Conditional_18_Template, 2, 0, "button", 39);
    \u0275\u0275elementStart(19, "button", 40);
    \u0275\u0275listener("click", function AdminDashboardComponent_Conditional_7_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.createSesionw());
    });
    \u0275\u0275text(20, "Inyectar Sub-Nodo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 41);
    \u0275\u0275listener("click", function AdminDashboardComponent_Conditional_7_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resetFormModal());
    });
    \u0275\u0275text(22, "Cerrar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.selectMode() || "Formulario de Gesti\xF3n");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.selectMode() === "subclase" || ctx_r1.typePayload() === "nuevas" ? 8 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formState.title);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.selectMode() === "subclase" ? 12 : 13);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.selectMode() === "crear" ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectMode() === "subclase" ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectMode() === "clase" ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectMode() === "newclass" ? 18 : -1);
  }
}
var AdminDashboardComponent = class _AdminDashboardComponent {
  http = inject(HttpClient);
  apiUrl = `${environment.apiURL}/api` || "";
  zz = signal([], ...ngDevMode ? [{ debugName: "zz" }] : []);
  showFormModal = signal(false, ...ngDevMode ? [{ debugName: "showFormModal" }] : []);
  selectMode = signal("", ...ngDevMode ? [{ debugName: "selectMode" }] : []);
  typePayload = signal("", ...ngDevMode ? [{ debugName: "typePayload" }] : []);
  subtype = signal("", ...ngDevMode ? [{ debugName: "subtype" }] : []);
  targetId = signal("", ...ngDevMode ? [{ debugName: "targetId" }] : []);
  indices = signal({ i: "", j: "", k: "" }, ...ngDevMode ? [{ debugName: "indices" }] : []);
  formState = {
    title: "",
    detail: "",
    files: []
  };
  currentUser = null;
  isAdministrator = signal(false, ...ngDevMode ? [{ debugName: "isAdministrator" }] : []);
  collapsedStates = signal({}, ...ngDevMode ? [{ debugName: "collapsedStates" }] : []);
  subCollapsedStates = signal({}, ...ngDevMode ? [{ debugName: "subCollapsedStates" }] : []);
  ngOnInit() {
    this.currentUser = isAuth();
    this.isAdministrator.set(this.currentUser?.rol === "1");
    this.getNotes();
    const storageKeys = ["idc", "idcat", "curse"];
    storageKeys.forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
  }
  ngOnDestroy() {
  }
  getToken() {
    return localStorage.getItem("token") || "";
  }
  getNotes = async () => {
    try {
      const headers = new HttpHeaders().set("Authorization", `Bearer ${this.getToken()}`);
      this.http.get(`${this.apiUrl}/links/lands`, { headers }).subscribe({
        next: (data) => {
          this.zz.set(data);
          console.log(data);
        },
        error: (err) => console.error("Error al cargar documentos", err)
      });
    } catch (err) {
      console.error(err);
    }
  };
  resetFormModal = () => {
    this.showFormModal.set(false);
    this.formState = { title: "", detail: "", files: [] };
    this.selectMode.set("");
    this.typePayload.set("");
    this.subtype.set("");
    this.targetId.set("");
    this.indices.set({ i: "", j: "", k: "" });
  };
  fileSelectHandler = (event) => {
    const selectedFiles = event.target.files;
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml"];
    if (selectedFiles?.length > 0) {
      if (selectedFiles[0].size < 105048576 && allowedTypes.includes(selectedFiles[0].type)) {
        this.formState.files = [selectedFiles[0]];
      } else {
        alert("Solo se aceptan im\xE1genes menores a 1MB");
      }
    }
  };
  crearGeneral = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("type", this.typePayload());
    data.append("subtype", this.subtype());
    data.append("title", this.formState.title);
    data.append("detail", this.formState.detail);
    data.append("foreign", this.currentUser?._id || "");
    data.append("user", this.currentUser?._id || "");
    if (this.formState.files[0])
      data.append("foto", this.formState.files[0]);
    console.log(data);
    this.http.post(`${this.apiUrl}/links/lands`, data).subscribe({
      next: () => {
        this.resetFormModal();
        this.getNotes();
        if (this.typePayload() === "general")
          this.getNotes();
      },
      error: (err) => console.error(err)
    });
  };
  onSubmitUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", this.formState.title);
    data.append("description", this.formState.detail);
    data.append("user", this.currentUser?._id || "");
    if (this.formState.files[0])
      data.append("foto", this.formState.files[0]);
    this.http.put(`${this.apiUrl}/links/lands/${this.targetId()}`, data).subscribe({
      next: () => {
        this.resetFormModal();
        this.getNotes();
      },
      error: (err) => console.error(err)
    });
  };
  saveCollectionDirectly = async (dataToSave, id) => {
    try {
      this.http.put(`${this.apiUrl}/links/landswithoutfile/${id}`, dataToSave).subscribe({
        next: () => this.resetFormModal(),
        error: (err) => console.error(err)
      });
    } catch (error) {
      console.error(error);
    }
  };
  removeLink = async (idLink) => {
    if (!window.confirm("\xBFDeseas eliminar este item definitivo?"))
      return;
    this.http.delete(`${this.apiUrl}/links/${idLink}`).subscribe({
      next: () => this.getNotes(),
      error: (err) => console.error(err)
    });
  };
  removeSubtask = (i, j) => {
    if (!window.confirm("\xBFDeseas eliminar este item de la lista?"))
      return;
    const data = [...this.zz()];
    data[i].usertask.splice(j, 1);
    this.zz.set(data);
    this.saveCollectionDirectly(data[i], data[i]._id);
  };
  updateSubTaskText = () => {
    const idx = this.indices();
    if (this.typePayload() === "general") {
      const data = [...this.zz()];
      data[idx.i].usertask[idx.j].title = this.formState.title;
      data[idx.i].usertask[idx.j].detail = this.formState.detail;
      this.zz.set(data);
      this.saveCollectionDirectly(data[idx.i], data[idx.i]._id);
    }
  };
  createSesion = () => {
    const idx = this.indices();
    const data = [...this.zz()];
    if (data[idx.i]) {
      data[idx.i].usertask.push({ title: this.formState.title, detail: this.formState.detail, link: "" });
      this.zz.set(data);
      this.saveCollectionDirectly(data[idx.i], data[idx.i]._id);
    }
  };
  createSesionw = () => {
    const idx = this.indices();
    const data = [...this.zz()];
    const targetTask = data[idx.i]?.usertask[idx.j];
    if (targetTask) {
      if (!targetTask.usertast)
        targetTask.usertast = [];
      targetTask.usertast.push({ title: this.formState.title, detail: this.formState.detail, link: "" });
      this.zz.set(data);
      this.saveCollectionDirectly(data[idx.i], data[idx.i]._id);
    }
  };
  openCreateModal() {
    this.selectMode.set("crear");
    this.typePayload.set("general");
    this.subtype.set("image");
    this.showFormModal.set(true);
  }
  openSubclassModal(i, j = "") {
    this.selectMode.set("newclass");
    this.typePayload.set("general");
    this.indices.set({ i, j, k: "" });
    this.showFormModal.set(true);
  }
  openEditModal(note, i) {
    this.selectMode.set("clase");
    this.typePayload.set("general");
    this.formState = { title: note.title, detail: note.description, files: [] };
    this.targetId.set(note._id);
    this.showFormModal.set(true);
  }
  openEditSubclassModal(notte, i, j) {
    this.selectMode.set("subclase");
    this.typePayload.set("general");
    this.formState = { title: notte.title, detail: notte.detail, files: [] };
    this.indices.set({ i, j, k: "" });
    this.showFormModal.set(true);
  }
  toggleCollapse(id) {
    this.collapsedStates.update((state) => __spreadProps(__spreadValues({}, state), { [id]: !state[id] }));
  }
  toggleSubCollapse(i, j) {
    const key = `${i}_${j}`;
    this.subCollapsedStates.update((state) => __spreadProps(__spreadValues({}, state), { [key]: !state[key] }));
  }
  openExternalLink(url) {
    window.open(url, "_blank", "noreferrer");
  }
  isLink(value) {
    if (!value)
      return false;
    return /^https?:\/\//i.test(value.trim());
  }
  static \u0275fac = function AdminDashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminDashboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminDashboardComponent, selectors: [["app-admin-dashboard"]], decls: 8, vars: 2, consts: [[1, "py-5"], [1, "container", "p-1"], [1, "card-body", "p-3", "text-center"], ["id", "section-one", 1, "my-1", 2, "min-height", "100vh"], [1, "border", "border-primary", "p-1", "mt-3", "rounded", "bg-white", "shadow-sm"], ["tabindex", "-1", 1, "modal", "show", "d-block", 2, "background", "rgba(0,0,0,0.5)"], [1, "btn", "btn-secondary", "px-4", 3, "click"], [1, "text-primary", "text-center", "h2", "p-1"], [1, "text-center"], [1, "text-muted", "p-2", "bg-light", "rounded", 3, "innerHTML"], [1, "row", "d-flex", "justify-content-center", "align-items-center", "mt-3", "g-2"], [1, "col-md-6", "col-lg-4", "p-1"], ["type", "button", 1, "btn", "btn-warning", "btn-sm", "w-50", 3, "click"], [1, "mt-2"], [1, "btn-group", "w-100", "shadow-sm"], [1, "btn", "btn-info", 3, "click"], [1, "btn", "btn-success", 3, "click"], [1, "btn", "btn-danger", 3, "click"], [1, "btn", "btn-outline-primary", "text-truncate", "w-100", 3, "click"], [1, "mt-2", "text-center"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", "w-100", 2, "font-size", "11px", 3, "click"], [1, "mt-1"], [1, "btn-group", "w-100", "size-sm"], [1, "btn", "btn-sm", "btn-outline-info", 3, "click"], [1, "btn", "btn-sm", "btn-outline-success", 3, "click"], [1, "btn", "btn-sm", "btn-outline-danger", 3, "click"], [1, "modal-dialog", "modal-lg"], [1, "modal-content"], [1, "modal-header"], [1, "modal-title", "text-capitalize"], ["type", "button", 1, "btn-close", 3, "click"], [1, "modal-body"], [1, "card", "form-group", "p-2", "mb-2"], [1, "card", "form-group", "mb-2", "p-2"], ["type", "text", "placeholder", "T\xEDtulo corporativo", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "card", "form-group", "p-2"], ["placeholder", "Detalles de URL o texto plano...", "rows", "4", "required", "", 1, "form-control", 3, "ngModel"], ["placeholder", "Descripci\xF3n acad\xE9mica...", "rows", "6", 1, "form-control", 3, "ngModel"], [1, "modal-footer"], [1, "btn", "btn-info"], [1, "btn", "btn-outline-dark", 3, "click"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "file", 1, "form-control", 3, "change"], ["placeholder", "Detalles de URL o texto plano...", "rows", "4", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["placeholder", "Descripci\xF3n acad\xE9mica...", "rows", "6", 1, "form-control", 3, "ngModelChange", "ngModel"]], template: function AdminDashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-navbar")(1, "div", 0);
      \u0275\u0275elementStart(2, "div", 1);
      \u0275\u0275conditionalCreate(3, AdminDashboardComponent_Conditional_3_Template, 3, 0, "div", 2);
      \u0275\u0275elementStart(4, "div", 3);
      \u0275\u0275repeaterCreate(5, AdminDashboardComponent_For_6_Template, 8, 3, "div", 4, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(7, AdminDashboardComponent_Conditional_7_Template, 23, 8, "div", 5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.isAdministrator() ? 3 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.zz());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showFormModal() ? 7 : -1);
    }
  }, dependencies: [Navbar, CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, RequiredValidator, NgModel], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminDashboardComponent, [{
    type: Component,
    args: [{
      selector: "app-admin-dashboard",
      standalone: true,
      imports: [Navbar, CommonModule, FormsModule],
      template: `
  <app-navbar></app-navbar>
            <div class="py-5"></div>

    <div class="container p-1">
      <!-- Bot\xF3n Administrador -->
      @if (isAdministrator()) {
        <div class="card-body p-3 text-center">
          <button class="btn btn-secondary px-4" (click)="openCreateModal()">
            Generar documentos
          </button>
        </div>
      }

      <!-- Listado de Documentos del Servidor -->
      <div id="section-one" class="my-1" style="min-height: 100vh;">
        @for (note of zz(); track note._id; let i = $index) {
          <div class="border border-primary p-1 mt-3 rounded bg-white shadow-sm">
            <div class="text-primary text-center h2 p-1">{{ note.title }}</div>
            
            @if (isAdministrator()) {
              <div class="text-center">
                <button class="btn btn-warning btn-sm w-50" type="button" (click)="toggleCollapse(note._id)">
                  Controles de Estructura
                </button>
                @if (collapsedStates()[note._id]) {
                  <div class="mt-2">
                    <div class="btn-group w-100 shadow-sm">
                      <button class="btn btn-info" (click)="openSubclassModal(i)">
                        Agregar Subclase
                      </button>
                      <button class="btn btn-success" (click)="openEditModal(note, i)">
                        Editar Clase
                      </button>
                      <button class="btn btn-danger" (click)="removeLink(note._id)">
                        Eliminar
                      </button>
                    </div>
                  </div>
                }
              </div>
            }

            @if (note.description) {
              <div class="text-muted p-2 bg-light rounded" [innerHTML]="note.description"></div>
            }

            <div class="row d-flex justify-content-center align-items-center mt-3 g-2">
              @for (notte of note.usertask; track $index; let j = $index) {
                <div class="col-md-6 col-lg-4 p-1">
                  <button class="btn btn-outline-primary text-truncate w-100" (click)="openExternalLink(notte.detail)">
                    {{ notte.title }}
                  </button>
                    <div class="text-center">
 @if (!isLink(notte.detail)) {
  {{ notte.detail }}
}
</div>
                  
                  @if (isAdministrator()) {
                    <div class="mt-2 text-center">
                      <button class="btn btn-primary btn-sm w-100" style="font-size: 11px;" type="button" (click)="toggleSubCollapse(i, j)">
                        Acciones de Nodo
                      </button>
                      @if (subCollapsedStates()[i + '_' + j]) {
                        <div class="mt-1">
                          <div class="btn-group w-100 size-sm">
                            <button class="btn btn-sm btn-outline-info" (click)="openSubclassModal(i, j)">
                              +
                            </button>
                            <button class="btn btn-sm btn-outline-success" (click)="openEditSubclassModal(notte, i, j)">
                              Editar
                            </button>
                            <button class="btn btn-sm btn-outline-danger" (click)="removeSubtask(i, j)">
                              X
                            </button>
                          </div>
                        </div>
                      }
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        }
      </div>

      <!-- MODAL UNIFICADO (Simulado con Bootstrap/HTML nativo) -->
      @if (showFormModal()) {
        <div class="modal show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5);">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-capitalize">{{ selectMode() || 'Formulario de Gesti\xF3n' }}</h5>
                <button type="button" class="btn-close" (click)="resetFormModal()"></button>
              </div>
              <div class="modal-body">
                @if (selectMode() === 'subclase' || typePayload() === 'nuevas') {
                  <div class="card form-group p-2 mb-2">
                    <input type="file" class="form-control" (change)="fileSelectHandler($event)" />
                  </div>
                }
                <div class="card form-group mb-2 p-2">
                  <input type="text" placeholder="T\xEDtulo corporativo" class="form-control" [(ngModel)]="formState.title" required />
                </div>
                <div class="card form-group p-2">
                  @if (selectMode() === 'subclase') {
                    <textarea placeholder="Detalles de URL o texto plano..." class="form-control" rows="4" [(ngModel)]="formState.detail" required></textarea>
                  } @else {
                    <textarea placeholder="Descripci\xF3n acad\xE9mica..." class="form-control" rows="6" [(ngModel)]="formState.detail"></textarea>
                  }
                </div>
              </div>
              <div class="modal-footer">
                @if (selectMode() === 'crear') {
                  <button class="btn btn-info" (click)="crearGeneral($event)">Crear Documento</button>
                }
                @if (selectMode() === 'subclase') {
                  <button class="btn btn-info" (click)="updateSubTaskText()">Actualizar Subclase</button>
                }
                @if (selectMode() === 'clase') {
                  <button class="btn btn-info" (click)="onSubmitUpdate($event)">Actualizar Clase</button>
                }
                @if (selectMode() === 'newclass') {
                  <button class="btn btn-info" (click)="createSesion()">Confirmar Subclase</button>
                }
                <button class="btn btn-outline-dark" (click)="createSesionw()">Inyectar Sub-Nodo</button>
                <button type="button" class="btn btn-secondary" (click)="resetFormModal()">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminDashboardComponent, { className: "AdminDashboardComponent", filePath: "src/app/componentes/documents.ts", lineNumber: 154 });
})();
export {
  AdminDashboardComponent
};
//# sourceMappingURL=chunk-NIOXSQGC.mjs.map
