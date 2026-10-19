import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-OAEVIACX.js";
import {
  environment
} from "./chunk-5ESGTH3B.js";
import {
  Navbar
} from "./chunk-U3CDTOVP.js";
import {
  isAuth
} from "./chunk-DJCOHPHY.js";
import "./chunk-PFU5G7MY.js";
import {
  HttpClient
} from "./chunk-MMWGUNZC.js";
import {
  CommonModule,
  NgClass
} from "./chunk-6QD4DAAM.js";
import {
  Component,
  Injectable,
  ViewChild,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-FXWIEX65.js";
import "./chunk-3WPM564S.js";

// src/app/componentes/articulos.ts
var _c0 = ["fileInput"];
var _forTrack0 = ($index, $item) => $item._id;
function ScientificArticlesManagerComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function ScientificArticlesManagerComponent_Conditional_7_Template_button_click_0_listener() {
      let tmp_2_0;
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openModal("numberblock", null, { tipoarticulo: "numberblock", parentId: (tmp_2_0 = ctx_r1.currentUser()) == null ? null : tmp_2_0._id }));
    });
    \u0275\u0275element(1, "i", 10);
    \u0275\u0275text(2, " Nuevo n\xFAmero ");
    \u0275\u0275elementEnd();
  }
}
function ScientificArticlesManagerComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("alert alert-", ctx_r1.toastType(), " alert-dismissible fade show shadow-sm mb-4"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.toastMessage(), " ");
  }
}
function ScientificArticlesManagerComponent_For_10_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function ScientificArticlesManagerComponent_For_10_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r7 = \u0275\u0275nextContext();
      const group_r5 = ctx_r7.$implicit;
      const \u0275$index_24_r6 = ctx_r7.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openModal("create", null, { number: \u0275$index_24_r6 + 1, tipoarticulo: "articulo", parentId: group_r5._id }));
    });
    \u0275\u0275element(1, "i", 26);
    \u0275\u0275elementEnd();
  }
}
function ScientificArticlesManagerComponent_For_10_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275listener("click", function ScientificArticlesManagerComponent_For_10_Conditional_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const group_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openModal("update", group_r5));
    });
    \u0275\u0275element(1, "i", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 29);
    \u0275\u0275listener("click", function ScientificArticlesManagerComponent_For_10_Conditional_11_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r9);
      const group_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleDelete(group_r5._id));
    });
    \u0275\u0275element(3, "i", 30);
    \u0275\u0275elementEnd();
  }
}
function ScientificArticlesManagerComponent_For_10_Conditional_26_For_1_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275listener("click", function ScientificArticlesManagerComponent_For_10_Conditional_26_For_1_Conditional_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const article_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openModal("update", article_r11));
    });
    \u0275\u0275element(1, "i", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 29);
    \u0275\u0275listener("click", function ScientificArticlesManagerComponent_For_10_Conditional_26_For_1_Conditional_11_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r10);
      const article_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.handleDelete(article_r11._id));
    });
    \u0275\u0275element(3, "i", 30);
    \u0275\u0275elementEnd();
  }
}
function ScientificArticlesManagerComponent_For_10_Conditional_26_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 21);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 22)(8, "div", 31)(9, "a", 32);
    \u0275\u0275element(10, "i", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, ScientificArticlesManagerComponent_For_10_Conditional_26_For_1_Conditional_11_Template, 4, 0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_26_0;
    const article_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(article_r11.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getUserName(article_r11.user));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", article_r11.email || "Comit\xE9 Editorial", " ", article_r11.filename);
    \u0275\u0275advance(3);
    \u0275\u0275property("href", ctx_r1.apiUrlfile + "/article/" + article_r11.filename, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_26_0 = ctx_r1.currentUser()) == null ? null : tmp_26_0.email) === article_r11.email || ((tmp_26_0 = ctx_r1.currentUser()) == null ? null : tmp_26_0.rol) === "1" ? 11 : -1);
  }
}
function ScientificArticlesManagerComponent_For_10_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ScientificArticlesManagerComponent_For_10_Conditional_26_For_1_Template, 12, 6, "tr", null, _forTrack0);
  }
  if (rf & 2) {
    const group_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275repeater(group_r5.arTicles);
  }
}
function ScientificArticlesManagerComponent_For_10_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 34);
    \u0275\u0275text(2, " No se registran art\xEDculos activos en este n\xFAmero. ");
    \u0275\u0275elementEnd()();
  }
}
function ScientificArticlesManagerComponent_For_10_Conditional_29_For_1_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275listener("click", function ScientificArticlesManagerComponent_For_10_Conditional_29_For_1_Conditional_20_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const article_r13 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openModal("update", article_r13));
    });
    \u0275\u0275element(1, "i", 28);
    \u0275\u0275text(2, " Editar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 29);
    \u0275\u0275listener("click", function ScientificArticlesManagerComponent_For_10_Conditional_29_For_1_Conditional_20_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r12);
      const article_r13 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.handleDelete(article_r13._id));
    });
    \u0275\u0275element(4, "i", 30);
    \u0275\u0275text(5, " Retirar ");
    \u0275\u0275elementEnd();
  }
}
function ScientificArticlesManagerComponent_For_10_Conditional_29_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 36)(2, "h6", 37);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 38)(5, "strong", 39);
    \u0275\u0275text(6, "Autor:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 38)(9, "strong", 39);
    \u0275\u0275text(10, "Vol / N\xFAm:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 40)(13, "strong", 39);
    \u0275\u0275text(14, "Editor/Revisor:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 41)(17, "a", 42);
    \u0275\u0275element(18, "i", 33);
    \u0275\u0275text(19, " Ver ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(20, ScientificArticlesManagerComponent_For_10_Conditional_29_For_1_Conditional_20_Template, 6, 0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_27_0;
    const article_r13 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(article_r13.title);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getUserName(article_r13.user), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" Vol. ", article_r13.volumen, " - N\xB0 ", article_r13.number, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", article_r13.email || "Comit\xE9 Editorial", " ", article_r13.filename, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("href", ctx_r1.apiUrlfile + "/article/" + article_r13.filename, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(((tmp_27_0 = ctx_r1.currentUser()) == null ? null : tmp_27_0.email) === article_r13.email || ((tmp_27_0 = ctx_r1.currentUser()) == null ? null : tmp_27_0.rol) === "1" ? 20 : -1);
  }
}
function ScientificArticlesManagerComponent_For_10_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ScientificArticlesManagerComponent_For_10_Conditional_29_For_1_Template, 21, 8, "div", 35, _forTrack0);
  }
  if (rf & 2) {
    const group_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275repeater(group_r5.arTicles);
  }
}
function ScientificArticlesManagerComponent_For_10_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1, " No se registran art\xEDculos activos en este n\xFAmero. ");
    \u0275\u0275elementEnd();
  }
}
function ScientificArticlesManagerComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 12)(2, "div")(3, "h4", 13);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 14)(6, "button", 15);
    \u0275\u0275listener("click", function ScientificArticlesManagerComponent_For_10_Template_button_click_6_listener() {
      const ctx_r3 = \u0275\u0275restoreView(_r3);
      const group_r5 = ctx_r3.$implicit;
      const \u0275$index_24_r6 = ctx_r3.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleAddGeneratedSections(\u0275$index_24_r6, group_r5.title));
    });
    \u0275\u0275element(7, "i", 16);
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(10, ScientificArticlesManagerComponent_For_10_Conditional_10_Template, 2, 0, "button", 17);
    \u0275\u0275conditionalCreate(11, ScientificArticlesManagerComponent_For_10_Conditional_11_Template, 4, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 18)(13, "div", 19)(14, "table", 20)(15, "thead")(16, "tr")(17, "th", 21);
    \u0275\u0275text(18, "T\xEDtulo del Art\xEDculo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th");
    \u0275\u0275text(20, "Autor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th");
    \u0275\u0275text(22, "Editor / Revisor Asignado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th", 22);
    \u0275\u0275text(24, "Gesti\xF3n");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "tbody");
    \u0275\u0275conditionalCreate(26, ScientificArticlesManagerComponent_For_10_Conditional_26_Template, 2, 0)(27, ScientificArticlesManagerComponent_For_10_Conditional_27_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "div", 23);
    \u0275\u0275conditionalCreate(29, ScientificArticlesManagerComponent_For_10_Conditional_29_Template, 2, 0)(30, ScientificArticlesManagerComponent_For_10_Conditional_30_Template, 2, 0, "div", 24);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_15_0;
    const group_r5 = ctx.$implicit;
    const \u0275$index_24_r6 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate3("N.", \u0275$index_24_r6 + 1, " V.", group_r5.volumen === "2026" ? "1" : "2", ": ", group_r5.title);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.isMerging());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.isMerging() ? "Procesando..." : "Generar");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.currentUser() ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_15_0 = ctx_r1.currentUser()) == null ? null : tmp_15_0.rol) === "1" ? 11 : -1);
    \u0275\u0275advance(15);
    \u0275\u0275conditional(group_r5.arTicles && group_r5.arTicles.length > 0 ? 26 : 27);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(group_r5.arTicles && group_r5.arTicles.length > 0 ? 29 : 30);
  }
}
function ScientificArticlesManagerComponent_Conditional_11_Conditional_17_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 59);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Seleccionado: ", ctx_r1.fileData().name);
  }
}
function ScientificArticlesManagerComponent_Conditional_11_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 54)(1, "label", 51);
    \u0275\u0275text(2, "Archivo Adjunto (PDF o Imagen)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 58, 0);
    \u0275\u0275listener("change", function ScientificArticlesManagerComponent_Conditional_11_Conditional_17_Template_input_change_3_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.handleFileSelect($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, ScientificArticlesManagerComponent_Conditional_11_Conditional_17_Conditional_5_Template, 2, 1, "small", 59);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.fileData().name ? 5 : -1);
  }
}
function ScientificArticlesManagerComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 43)(2, "div", 44)(3, "form", 45);
    \u0275\u0275listener("ngSubmit", function ScientificArticlesManagerComponent_Conditional_11_Template_form_ngSubmit_3_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmitForm());
    });
    \u0275\u0275elementStart(4, "div", 46)(5, "h5", 47);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 48);
    \u0275\u0275listener("click", function ScientificArticlesManagerComponent_Conditional_11_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 49)(9, "div", 50)(10, "label", 51);
    \u0275\u0275text(11, "T\xEDtulo del Art\xEDculo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 52);
    \u0275\u0275twoWayListener("ngModelChange", function ScientificArticlesManagerComponent_Conditional_11_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formTitle, $event) || (ctx_r1.formTitle = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 50)(14, "label", 51);
    \u0275\u0275text(15, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "textarea", 53);
    \u0275\u0275twoWayListener("ngModelChange", function ScientificArticlesManagerComponent_Conditional_11_Template_textarea_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formDescription, $event) || (ctx_r1.formDescription = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(17, ScientificArticlesManagerComponent_Conditional_11_Conditional_17_Template, 6, 1, "div", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 55)(19, "button", 56);
    \u0275\u0275listener("click", function ScientificArticlesManagerComponent_Conditional_11_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(20, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 57);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.modalType() === "create" || ctx_r1.modalType() === "numberblock" ? "Indexar Nuevo Art\xEDculo" : "Actualizar Metadatos del Art\xEDculo", " ");
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formTitle);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formDescription);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.modalType() === "create" || ctx_r1.modalType() === "update" ? 17 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r1.modalType() === "create" || ctx_r1.modalType() === "numberblock" ? "btn-primary" : "btn-warning");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.modalType() === "create" || ctx_r1.modalType() === "numberblock" ? "Registrar Art\xEDculo" : "Guardar Cambios", " ");
  }
}
var ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
var MAX_FILE_SIZE = 105048576;
var INITIAL_FILE_STATE = { file: null, name: "", size: 0, type: "" };
var AuthService = class _AuthService {
  _currentUser = signal(isAuth(), ...ngDevMode ? [{ debugName: "_currentUser" }] : []);
  isAuth() {
    return this._currentUser();
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ScientificArticlesManagerComponent = class _ScientificArticlesManagerComponent {
  fileInputRef;
  auth = isAuth();
  http = inject(HttpClient);
  authService = inject(AuthService);
  apiUrl = `${environment.apiURL}/api`;
  apiUrlfile = `${environment.apiURL}`;
  articles = signal([], ...ngDevMode ? [{ debugName: "articles" }] : []);
  filesToMerge = signal([], ...ngDevMode ? [{ debugName: "filesToMerge" }] : []);
  isMerging = signal(false, ...ngDevMode ? [{ debugName: "isMerging" }] : []);
  showModal = signal(false, ...ngDevMode ? [{ debugName: "showModal" }] : []);
  modalType = signal("create", ...ngDevMode ? [{ debugName: "modalType" }] : []);
  selectedArticleId = signal(null, ...ngDevMode ? [{ debugName: "selectedArticleId" }] : []);
  formTitle = "";
  formVolumen = (/* @__PURE__ */ new Date()).getFullYear().toString();
  formNumber = "1";
  formDescription = "";
  tipoarticulo = "";
  parentArticuloId = "";
  fileData = signal(INITIAL_FILE_STATE, ...ngDevMode ? [{ debugName: "fileData" }] : []);
  toastMessage = signal(null, ...ngDevMode ? [{ debugName: "toastMessage" }] : []);
  toastType = signal("info", ...ngDevMode ? [{ debugName: "toastType" }] : []);
  currentUser = computed(() => this.authService.isAuth(), ...ngDevMode ? [{ debugName: "currentUser" }] : []);
  downloadedFiles = /* @__PURE__ */ new Set();
  ngOnInit() {
    this.getArticles();
  }
  showToast(msg, type = "info") {
    this.toastMessage.set(msg);
    this.toastType.set(type);
    setTimeout(() => this.toastMessage.set(null), 4e3);
  }
  getArticles() {
    this.http.get(`${this.apiUrl}/articles`).subscribe({
      next: (data) => this.articles.set(data),
      error: (err) => {
        console.error(err);
        this.showToast("Error al sincronizar el repositorio de art\xEDculos", "danger");
      }
    });
  }
  getUserName(user) {
    if (typeof user === "string")
      return user;
    return user?.name || "N/A";
  }
  handleFileSelect(event) {
    const input = event.target;
    const selectedFile = input.files?.[0];
    if (!selectedFile)
      return;
    if (selectedFile.size <= MAX_FILE_SIZE && ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      this.fileData.set({
        file: selectedFile,
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type
      });
      this.showToast("Archivo adjuntado correctamente", "success");
    } else {
      this.showToast("Formatos permitidos: PDF, JPG, PNG (m\xE1x. 100MB)", "warning");
      input.value = "";
    }
  }
  openModal(type, article = null, extraProps = {}) {
    this.modalType.set(type);
    this.resetFormState();
    if (extraProps.tipoarticulo)
      this.tipoarticulo = extraProps.tipoarticulo;
    if (extraProps.parentId)
      this.parentArticuloId = extraProps.parentId;
    if (extraProps.number)
      this.formNumber = extraProps.number.toString();
    if (type === "update" && article) {
      this.selectedArticleId.set(article._id);
      this.formTitle = article.title || "";
      this.formVolumen = article.volumen || (/* @__PURE__ */ new Date()).getFullYear().toString();
      this.formNumber = article.number || "1";
      this.formDescription = article.description || "";
    }
    this.showModal.set(true);
  }
  closeModal() {
    this.showModal.set(false);
    this.resetFormState();
  }
  resetFormState() {
    this.formTitle = "";
    this.formVolumen = (/* @__PURE__ */ new Date()).getFullYear().toString();
    this.formNumber = "1";
    this.formDescription = "";
    this.fileData.set(INITIAL_FILE_STATE);
    this.selectedArticleId.set(null);
  }
  onSubmitForm() {
    if (this.modalType() === "create" || this.modalType() === "numberblock") {
      this.handleCreate();
    } else {
      this.handleUpdate();
    }
  }
  handleCreate() {
    const user = this.currentUser();
    if (!user) {
      this.showToast("Se requiere autenticaci\xF3n de comit\xE9 editorial", "danger");
      return;
    }
    const formData = new FormData();
    formData.append("title", this.formTitle);
    formData.append("volumen", this.formVolumen);
    formData.append("number", this.formNumber);
    formData.append("description", this.formDescription);
    formData.append("tipoarticulo", this.tipoarticulo);
    formData.append("parentArticuloId", this.parentArticuloId);
    formData.append("user", user.name);
    formData.append("email", user.email);
    formData.append("userid", user._id);
    const currentFile = this.fileData();
    if (currentFile.file) {
      formData.append("archivo", currentFile.file);
      formData.append("size", currentFile.size.toString());
      formData.append("type", currentFile.type);
    }
    this.http.post(`${this.apiUrl}/articles`, formData).subscribe({
      next: () => {
        this.getArticles();
        this.showToast("Art\xEDculo indexado exitosamente", "success");
        this.closeModal();
      },
      error: (err) => {
        console.error(err);
        this.showToast("Error al registrar la publicaci\xF3n", "danger");
      }
    });
  }
  handleUpdate() {
    const id = this.selectedArticleId();
    if (!id)
      return;
    const formData = new FormData();
    formData.append("title", this.formTitle);
    formData.append("volumen", this.formVolumen);
    formData.append("number", this.formNumber);
    formData.append("description", this.formDescription);
    const currentFile = this.fileData();
    if (currentFile.file) {
      formData.append("archivo", currentFile.file);
      formData.append("size", currentFile.size.toString());
      formData.append("type", currentFile.type);
    }
    this.http.put(`${this.apiUrl}/articles/${id}`, formData).subscribe({
      next: () => {
        this.getArticles();
        this.showToast("Metadatos actualizados correctamente", "info");
        this.closeModal();
      },
      error: (err) => {
        console.error(err);
        this.showToast("Error al actualizar la informaci\xF3n del art\xEDculo", "danger");
      }
    });
  }
  handleDelete(id) {
    if (confirm("\xBFConfirma que desea retirar esta publicaci\xF3n del repositorio activo?")) {
      this.http.delete(`${this.apiUrl}/articles/${id}`).subscribe({
        next: () => {
          this.getArticles();
          this.showToast("Publicaci\xF3n retirada del sistema", "info");
        },
        error: (err) => {
          console.error(err);
          this.showToast("Error al procesar la solicitud de eliminaci\xF3n", "danger");
        }
      });
    }
  }
  async urlToFile(url, filename) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: "application/pdf" });
  }
  base64ToUint8Array(base64) {
    const cleanBase64 = base64.includes(",") ? base64.split(",")[1] : base64;
    const raw = window.atob(cleanBase64.trim());
    const array = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }
  async mergePdfs(filesToMerge) {
    if (!filesToMerge || filesToMerge.length < 2) {
      this.showToast("Por favor, se necesitan al menos 2 archivos PDF para fusionar.", "warning");
      return;
    }
    this.isMerging.set(true);
    this.showToast("Uniendo archivos PDF y aplicando numeraci\xF3n de p\xE1ginas...", "info");
    try {
      const [pdfLibModule, fontkitModule, lmodernModule] = await Promise.all([
        import("./chunk-W2GBNXFZ.js"),
        import("./chunk-BH7HE454.js"),
        import("./chunk-LXVWZXHF.js")
      ]);
      const { PDFDocument, StandardFonts, PageSizes } = pdfLibModule;
      const fontkit = fontkitModule.default;
      const wwfont = lmodernModule.wwfont;
      const mergedPdf = await PDFDocument.create();
      mergedPdf.registerFontkit(fontkit);
      let customFont;
      try {
        const fontBytes = this.base64ToUint8Array(wwfont);
        customFont = await mergedPdf.embedFont(fontBytes);
      } catch (fontError) {
        console.warn("No se pudo embeber fuente, usando Courier:", fontError);
        customFont = await mergedPdf.embedFont(StandardFonts.Courier);
      }
      const loadedPdfs = [];
      for (const item of filesToMerge) {
        if (!item)
          continue;
        let pdfDoc = null;
        try {
          if (typeof item.arrayBuffer === "function") {
            const fileBuffer = await item.arrayBuffer();
            pdfDoc = await PDFDocument.load(fileBuffer, { ignoreEncryption: true });
          } else if (item instanceof ArrayBuffer || item instanceof Uint8Array) {
            pdfDoc = await PDFDocument.load(item, { ignoreEncryption: true });
          } else if (item.blob && typeof item.blob.arrayBuffer === "function") {
            const fileBuffer = await item.blob.arrayBuffer();
            pdfDoc = await PDFDocument.load(fileBuffer, { ignoreEncryption: true });
          } else if (typeof item === "string") {
            const bytes = this.base64ToUint8Array(item);
            pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
          } else if (item.getPageCount && typeof item.getPageCount === "function") {
            pdfDoc = item;
          } else {
            continue;
          }
          if (pdfDoc) {
            loadedPdfs.push({ file: item, pdfDoc });
          }
        } catch (itemError) {
          console.error("Error al procesar PDF individual:", itemError);
        }
      }
      if (loadedPdfs.length === 0) {
        throw new Error("No se pudo cargar ning\xFAn documento PDF v\xE1lido.");
      }
      const pageMetadata = [];
      const [targetWidth, targetHeight] = PageSizes.A4;
      for (const { file, pdfDoc } of loadedPdfs) {
        const authorName = file.user || (typeof file.user === "string" ? file.user : "");
        const idarticle = file.id || (typeof file.id === "string" ? file.id : "");
        const fileName = file.name || "Documento";
        if (mergedPdf.getPageCount() % 2 !== 0 && mergedPdf.getPageCount() > 0) {
          const blankPage = mergedPdf.addPage(PageSizes.A4);
          pageMetadata.push({ newPage: blankPage, idarticle, fileName, authorName, isBlankPage: true });
        }
        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        for (const page of copiedPages) {
          const { width: originalWidth, height: originalHeight } = page.getSize();
          const newPage = mergedPdf.addPage(PageSizes.A4);
          const scale = Math.min(targetWidth / originalWidth, targetHeight / originalHeight);
          const embeddedPage = await mergedPdf.embedPage(page);
          const scaledWidth = originalWidth * scale;
          const scaledHeight = originalHeight * scale;
          newPage.drawPage(embeddedPage, {
            x: (targetWidth - scaledWidth) / 2,
            y: (targetHeight - scaledHeight) / 2,
            width: scaledWidth,
            height: scaledHeight
          });
          pageMetadata.push({ newPage, idarticle, fileName, authorName, isBlankPage: false });
        }
      }
      const totalPages = mergedPdf.getPageCount();
      pageMetadata.forEach(({ newPage, fileName, authorName, idarticle, isBlankPage }, index) => {
        const currentPageNumber = index + 1;
        const shouldDrawHeaderFooter = currentPageNumber > 4 && currentPageNumber <= totalPages - 2;
        if (shouldDrawHeaderFooter) {
          const isOdd = currentPageNumber % 2 !== 0;
          const text = isBlankPage ? "Revista Cient\xEDfica" : authorName ? `Autor - ${authorName}` : `Autor - ${fileName}`;
          const idArticle = isBlankPage ? "" : idarticle ? `ID - ${idarticle}` : `Autor - ${fileName}`;
          const fontSize = 11;
          const textWidth = customFont.widthOfTextAtSize(text, fontSize);
          const numberpage = `${currentPageNumber}`;
          const numberpageWidth = customFont.widthOfTextAtSize(numberpage, fontSize);
          if (isOdd) {
            if (!isBlankPage) {
              newPage.drawText(text, {
                x: targetWidth - 56 - textWidth,
                y: targetHeight - 45,
                size: fontSize,
                font: customFont
              });
              newPage.drawText(`${idArticle}`, {
                x: 85,
                y: targetHeight - 45,
                size: fontSize,
                font: customFont
              });
            }
            newPage.drawText(numberpage, {
              x: targetWidth - 56 - numberpageWidth,
              y: 41,
              size: fontSize,
              font: customFont
            });
          } else {
            const headerEvenLabel = isBlankPage ? "Revista Cient\xEDfica" : `Revista Cient\xEDfica - ${fileName}`;
            newPage.drawText(headerEvenLabel, {
              x: 57,
              y: targetHeight - 45,
              size: fontSize,
              font: customFont
            });
            newPage.drawText(numberpage, {
              x: targetWidth - 84 - numberpageWidth,
              y: 42,
              size: fontSize,
              font: customFont
            });
          }
        }
      });
      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `documento-fusionado-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      this.downloadedFiles.clear();
      this.showToast("PDF fusionado y descargado con \xE9xito", "success");
    } catch (error) {
      console.error("Error al fusionar PDFs:", error);
      this.showToast("Ocurri\xF3 un error general al fusionar los archivos PDF.", "danger");
    } finally {
      this.isMerging.set(false);
    }
  }
  journalData = {
    TITLE: "Onto-epistemolog\xEDas de la Creaci\xF3n: El arte como producci\xF3n de mundos",
    SUBTITLE: "Publicaci\xF3n Arbitrada de Investigaci\xF3n, Epistemolog\xEDa Visual y Ciencias del Arte",
    INSTITUTION: 'ESCUELA SUPERIOR DE FORMACI\xD3N ART\xCDSTICA "Felipe Guam\xE1n Poma de Ayala"',
    INSTITUTIONABREV: 'ESFAP "Felipe Guam\xE1n Poma de Ayala"',
    LOCATION: "Ayacucho, Per\xFA",
    COMITE: [
      { label: "DIRECTOR CIENT\xCDFICO", val: "Dr. Mario Aguilar Ramos\n(Qu\xEDmica Aplicada al Arte, ESFAP)" },
      { label: "EDITORA EN JEFE", val: "Dra. Elena Mendoza Castro\n(Semi\xF3tica e Iconograf\xEDa, UNMSM)" },
      { label: "COMIT\xC9 EVALUADOR STEAM", val: "Dr. Carlos Holgu\xEDn V. (F\xEDsica \xD3ptica, UNAM)\nMtr. Rosa Palomino K. (Restauraci\xF3n, USP)\nDr. Javier R\xEDos T. (Geometr\xEDa, PUCP)" },
      { label: "DISE\xD1O Y METADATOS", val: "Unidad de Publicaciones Cient\xEDficas" },
      { label: "INDIZACI\xD3N Y OJS", val: "Oficina de Biblioteca y Repositorio" },
      { label: "CONTACTO EDITORIAL", val: "revista.artes@esfapayacucho.edu.pe\nJr. 28 de Julio N\xBA 448, Ayacucho" }
    ],
    FRASE: "La presente edici\xF3n de la Revista Cient\xEDfica de Artes & Visi\xF3n aborda la producci\xF3n art\xEDstica...",
    PARAGRAPHS: [
      "La presente edici\xF3n de la Revista Cient\xEDfica de Artes & Visi\xF3n aborda la producci\xF3n art\xEDstica no solo como expresi\xF3n est\xE9tica, sino como una disciplina metodol\xF3gica e interconectada con las ciencias exactas y humanas.",
      "A trav\xE9s de los laboratorios de conservaci\xF3n de materiales, caracterizaci\xF3n fisicoqu\xEDmica de aglutinantes org\xE1nicos y an\xE1lisis iconogr\xE1fico, nuestros estudiantes y docentes consolidan proyectos que integran la innovaci\xF3n cient\xEDfica con la tradici\xF3n pl\xE1stica regional."
    ],
    ISSN_PRINT: "2708-8324",
    ISSN_ONLINE: "2708-8332",
    DOI_PREFIX: "10.5281/zenodo.artesvision",
    VOL: "Vol. 1",
    YEAR: "2026",
    NUM: "No. 1",
    LICENSE: "CC BY-NC-SA 4.0 Internacional",
    WEB: "www.esfapa.edu.pe/articulo"
  };
  async handleAddGeneratedSections(i, groupTitle) {
    try {
      this.showToast("Iniciando la generaci\xF3n de secciones y lectura de publicaciones...", "info");
      if (groupTitle) {
        this.journalData.TITLE = groupTitle;
      }
      if (i) {
        this.journalData.NUM = `No. ${i + 1}`;
      }
      const [{ generateMagazineNewSections }, { generateMagazineSections }, pdfLibModule] = await Promise.all([
        import("./chunk-LBDWURUI.js"),
        import("./chunk-SAM3OSE2.js"),
        import("./chunk-W2GBNXFZ.js")
      ]);
      const articlesSection = this.articles()[i]?.arTicles || [];
      if (articlesSection.length === 0) {
        this.showToast("Este bloque no contiene art\xEDculos para generar la revista.", "warning");
        return;
      }
      const filePromises = articlesSection.map(async (art, index) => {
        if (art.filename?.endsWith(".pdf")) {
          const url = `${this.apiUrlfile}/article/${art.filename}`;
          const fileKey = `${i}_${index + 1}_${art.filename}`;
          if (!this.downloadedFiles.has(fileKey)) {
            this.downloadedFiles.add(fileKey);
          }
          const file = await this.urlToFile(url, fileKey);
          file.user = typeof art.user === "string" ? art.user : art.user?.name || "Comit\xE9 Editorial";
          file.id = typeof art._id === "string" ? art._id : art._id?.name || "Comit\xE9 Editorial";
          return file;
        }
        return null;
      });
      const fetchedFiles = (await Promise.all(filePromises)).filter(Boolean);
      const inicioTemp = await generateMagazineNewSections(articlesSection, i, this.journalData);
      const inicioArrayBuffer = await inicioTemp.arrayBuffer();
      const inicioPdfDoc = await pdfLibModule.PDFDocument.load(inicioArrayBuffer);
      let currentStartPage = inicioPdfDoc.getPageCount() + 1;
      for (let idx = 0; idx < fetchedFiles.length; idx++) {
        if (currentStartPage % 2 === 0) {
          currentStartPage += 1;
        }
        const pageFormatted = currentStartPage.toString().padStart(2, "0");
        if (articlesSection[idx]) {
          articlesSection[idx].page = pageFormatted;
        }
        const pdfBytes = await fetchedFiles[idx].arrayBuffer();
        const pdfDoc = await pdfLibModule.PDFDocument.load(pdfBytes);
        currentStartPage += pdfDoc.getPageCount();
      }
      const Inicio = await generateMagazineNewSections(articlesSection, "I", this.journalData);
      const Last = generateMagazineSections(articlesSection, "I", this.journalData);
      if (Inicio && typeof Inicio === "object")
        Inicio.user = "Editorial";
      if (Last && typeof Last === "object")
        Last.user = "Editorial";
      const finalFileList = [Inicio, ...fetchedFiles, Last];
      this.showToast("Secciones y tabla de contenidos generadas correctamente.", "success");
      await this.mergePdfs(finalFileList);
    } catch (error) {
      console.error("Error al generar secciones y fusionar:", error);
      this.showToast("Ocurri\xF3 un error al preparar las secciones de la revista.", "danger");
    }
  }
  static \u0275fac = function ScientificArticlesManagerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScientificArticlesManagerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ScientificArticlesManagerComponent, selectors: [["app-scientific-articles-manager"]], viewQuery: function ScientificArticlesManagerComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.fileInputRef = _t.first);
    }
  }, decls: 12, vars: 3, consts: [["fileInput", ""], [1, "py-5"], [1, "container", "my-4"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], [1, "bi", "bi-journal-text", "text-primary", "me-2"], [1, "btn", "btn-primary", "d-flex", "align-items-center", "gap-2"], ["role", "alert", 3, "class"], [1, "card", "shadow", "border-0", "mb-5", "border", "bg-info"], ["tabindex", "-1", 1, "modal", "fade", "show", "d-block", 2, "background-color", "rgba(0,0,0,0.5)"], [1, "btn", "btn-primary", "d-flex", "align-items-center", "gap-2", 3, "click"], [1, "bi", "bi-plus-circle", "fs-5"], ["role", "alert"], [1, "card-header", "bg-info", "py-3", "d-flex", "justify-content-between", "align-items-center"], [1, "text-light", "m-0"], [1, "d-flex", "align-items-center", "gap-2"], [1, "btn", "d-flex", "align-items-center", "gap-1", 3, "click", "disabled"], [1, "bi", "bi-printer"], ["title", "A\xF1adir Art\xEDculo", 1, "btn"], [1, "card-body", "p-0"], [1, "table-responsive", "d-none", "d-md-block"], [1, "table", "table-hover", "mb-0", "align-middle"], [1, "ps-3"], [1, "text-center", "pe-3"], [1, "d-block", "d-md-none", "p-3"], [1, "text-center", "text-muted", "py-4"], ["title", "A\xF1adir Art\xEDculo", 1, "btn", 3, "click"], [1, "bi", "bi-plus-circle"], ["title", "Editar Metadatos", 1, "btn", 3, "click"], [1, "bi", "bi-pencil"], ["title", "Retirar Publicaci\xF3n", 1, "btn", 3, "click"], [1, "bi", "bi-trash"], [1, "btn-group", "btn-group-sm"], ["target", "_blank", "rel", "noopener noreferrer", "title", "Ver Archivo", 1, "btn", 3, "href"], [1, "bi", "bi-arrows-angle-expand"], ["colspan", "6", 1, "text-center", "text-muted", "py-4"], [1, "card", "mb-3", "border-secondary", "bg-dark", "text-white", "shadow-sm"], [1, "card-body"], [1, "fw-bold", "text-warning", "mb-2"], [1, "mb-1", "small", "text-secondary"], [1, "text-light"], [1, "mb-3", "small", "text-secondary"], [1, "d-flex", "justify-content-end", "gap-2", "pt-2", "border-top", "border-secondary"], ["target", "_blank", "rel", "noopener noreferrer", "title", "Ver Art\xEDculo", 1, "btn", 3, "href"], [1, "modal-dialog", "modal-dialog-centered"], [1, "modal-content", "shadow-lg", "border-0"], [3, "ngSubmit"], [1, "modal-header", "bg-dark", "text-white", "py-3"], [1, "modal-title"], ["type", "button", "aria-label", "Cerrar", 1, "btn-close", "btn-close-white", 3, "click"], [1, "modal-body", "p-4"], [1, "mb-3"], [1, "form-label", "fw-semibold"], ["type", "text", "placeholder", "Ej: Avances en Computaci\xF3n Cu\xE1ntica Aplicada", "name", "title", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["rows", "3", "placeholder", "Breve resumen o descripci\xF3n del art\xEDculo...", "name", "description", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "mb-2"], [1, "modal-footer", "bg-light", "py-3"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "submit", 1, "btn", 3, "ngClass"], ["type", "file", "accept", ".pdf, .jpg, .jpeg, .png", 1, "form-control", 3, "change"], [1, "text-muted", "mt-2", "d-block"]], template: function ScientificArticlesManagerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-navbar")(1, "div", 1);
      \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "h2");
      \u0275\u0275element(5, "i", 4);
      \u0275\u0275text(6, " Gesti\xF3n de Art\xEDculos y Publicaciones Cient\xEDficas ");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(7, ScientificArticlesManagerComponent_Conditional_7_Template, 3, 0, "button", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(8, ScientificArticlesManagerComponent_Conditional_8_Template, 2, 4, "div", 6);
      \u0275\u0275repeaterCreate(9, ScientificArticlesManagerComponent_For_10_Template, 31, 9, "div", 7, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(11, ScientificArticlesManagerComponent_Conditional_11_Template, 23, 6, "div", 8);
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(7);
      \u0275\u0275conditional(((tmp_0_0 = ctx.currentUser()) == null ? null : tmp_0_0.rol) === "1" ? 7 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.toastMessage() ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.articles());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showModal() ? 11 : -1);
    }
  }, dependencies: [CommonModule, NgClass, Navbar, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScientificArticlesManagerComponent, [{
    type: Component,
    args: [{
      selector: "app-scientific-articles-manager",
      standalone: true,
      imports: [CommonModule, Navbar, FormsModule],
      template: `
    <app-navbar></app-navbar>
    <div class="py-5"></div>
    
    <div class="container my-4">
      <!-- Encabezado Principal -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i class="bi bi-journal-text text-primary me-2"></i>
          Gesti\xF3n de Art\xEDculos y Publicaciones Cient\xEDficas
        </h2>

        @if (currentUser()?.rol === '1') {
          <button
            class="btn btn-primary d-flex align-items-center gap-2"
            (click)="openModal('numberblock', null, { tipoarticulo: 'numberblock', parentId: currentUser()?._id })"
          >
            <i class="bi bi-plus-circle fs-5"></i> Nuevo n\xFAmero
          </button>
        }
      </div>

      <!-- Notificaciones Toast Integradas -->
      @if (toastMessage()) {
        <div class="alert alert-{{ toastType() }} alert-dismissible fade show shadow-sm mb-4" role="alert">
          {{ toastMessage() }}
        </div>
      }

      <!-- Listado de N\xFAmeros y Art\xEDculos -->
      @for (group of articles(); track group._id; let i = $index) {
        <div class="card shadow border-0 mb-5 border bg-info">
          <div class="card-header bg-info py-3 d-flex justify-content-between align-items-center">
            <div>
              <h4 class="text-light m-0">N.{{ i + 1 }} V.{{ group.volumen==='2026'?'1':'2' }}: {{ group.title }}</h4>
            </div>
            <div class="d-flex align-items-center gap-2">
             <button
  class="btn d-flex align-items-center gap-1"
  [disabled]="isMerging()"
  (click)="handleAddGeneratedSections(i, group.title)"
>
  <i class="bi bi-printer"></i>
  <span>{{ isMerging() ? 'Procesando...' : 'Generar' }}</span>
</button>

              @if (currentUser()) {
                <button
                  class="btn"
                  title="A\xF1adir Art\xEDculo"
                  (click)="openModal('create', null, { number: i + 1, tipoarticulo: 'articulo', parentId: group._id })"
                >
                  <i class="bi bi-plus-circle"></i>
                </button>
              }
              @if (currentUser()?.rol === '1') {
                <button class="btn" title="Editar Metadatos" (click)="openModal('update', group)">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="btn" title="Retirar Publicaci\xF3n" (click)="handleDelete(group._id)">
                  <i class="bi bi-trash"></i>
                </button>
              }
            </div>
          </div>

          <div class="card-body p-0">
            <!-- 1. VISTA DE TABLA TRADICIONAL -->
            <div class="table-responsive d-none d-md-block">
              <table class="table table-hover mb-0 align-middle">
                <thead>
                  <tr>
                    <th class="ps-3">T\xEDtulo del Art\xEDculo</th>
                    <th>Autor</th>
                    <th>Editor / Revisor Asignado</th>
                    <th class="text-center pe-3">Gesti\xF3n</th>
                  </tr>
                </thead>
                <tbody>
                  @if (group.arTicles && group.arTicles.length > 0) {
                    @for (article of group.arTicles; track article._id) {
                      <tr>
                        <td class="ps-3">{{ article.title }}</td>
                        <td>{{ getUserName(article.user) }}</td>
                        <td>{{ article.email || 'Comit\xE9 Editorial' }} {{ article.filename }}</td>
                        <td class="text-center pe-3">
                          <div class="btn-group btn-group-sm">
                            <a
                              class="btn"
                              target="_blank"
                              rel="noopener noreferrer"
                              [href]="apiUrlfile + '/article/' + article.filename"
                              title="Ver Archivo"
                            >
                              <i class="bi bi-arrows-angle-expand"></i>
                            </a>

                            @if (currentUser()?.email === article.email || currentUser()?.rol === '1') {
                              <button class="btn" title="Editar Metadatos" (click)="openModal('update', article)">
                                <i class="bi bi-pencil"></i>
                              </button>
                              <button class="btn" title="Retirar Publicaci\xF3n" (click)="handleDelete(article._id)">
                                <i class="bi bi-trash"></i>
                              </button>
                            }
                          </div>
                        </td>
                      </tr>
                    }
                  } @else {
                    <tr>
                      <td colspan="6" class="text-center text-muted py-4">
                        No se registran art\xEDculos activos en este n\xFAmero.
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>

            <!-- 2. VISTA DE TARJETAS (M\xF3vil) -->
            <div class="d-block d-md-none p-3">
              @if (group.arTicles && group.arTicles.length > 0) {
                @for (article of group.arTicles; track article._id) {
                  <div class="card mb-3 border-secondary bg-dark text-white shadow-sm">
                    <div class="card-body">
                      <h6 class="fw-bold text-warning mb-2">{{ article.title }}</h6>
                      <p class="mb-1 small text-secondary">
                        <strong class="text-light">Autor:</strong> {{ getUserName(article.user) }}
                      </p>
                      <p class="mb-1 small text-secondary">
                        <strong class="text-light">Vol / N\xFAm:</strong> Vol. {{ article.volumen }} - N\xB0 {{ article.number }}
                      </p>
                      <p class="mb-3 small text-secondary">
                        <strong class="text-light">Editor/Revisor:</strong> {{ article.email || 'Comit\xE9 Editorial' }} {{ article.filename }}
                      </p>

                      <div class="d-flex justify-content-end gap-2 pt-2 border-top border-secondary">
                        <a
                          class="btn"
                          target="_blank"
                          rel="noopener noreferrer"
                          [href]="apiUrlfile + '/article/' + article.filename"
                          title="Ver Art\xEDculo"
                        >
                          <i class="bi bi-arrows-angle-expand"></i> Ver
                        </a>

                        @if (currentUser()?.email === article.email || currentUser()?.rol === '1') {
                          <button class="btn" title="Editar Metadatos" (click)="openModal('update', article)">
                            <i class="bi bi-pencil"></i> Editar
                          </button>
                          <button class="btn" title="Retirar Publicaci\xF3n" (click)="handleDelete(article._id)">
                            <i class="bi bi-trash"></i> Retirar
                          </button>
                        }
                      </div>
                    </div>
                  </div>
                }
              } @else {
                <div class="text-center text-muted py-4">
                  No se registran art\xEDculos activos en este n\xFAmero.
                </div>
              }
            </div>
          </div>
        </div>
      }
    </div>

    <!-- Modal Formulario -->
    @if (showModal()) {
      <div class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content shadow-lg border-0">
            <form (ngSubmit)="onSubmitForm()">
              <div class="modal-header bg-dark text-white py-3">
                <h5 class="modal-title">
                  {{ modalType() === 'create' || modalType() === 'numberblock' ? 'Indexar Nuevo Art\xEDculo' : 'Actualizar Metadatos del Art\xEDculo' }}
                </h5>
                <button type="button" class="btn-close btn-close-white" aria-label="Cerrar" (click)="closeModal()"></button>
              </div>

              <div class="modal-body p-4">
                <div class="mb-3">
                  <label class="form-label fw-semibold">T\xEDtulo del Art\xEDculo</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Ej: Avances en Computaci\xF3n Cu\xE1ntica Aplicada"
                    [(ngModel)]="formTitle"
                    name="title"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label fw-semibold">Descripci\xF3n</label>
                  <textarea
                    class="form-control"
                    rows="3"
                    placeholder="Breve resumen o descripci\xF3n del art\xEDculo..."
                    [(ngModel)]="formDescription"
                    name="description"
                  ></textarea>
                </div>

                @if (modalType() === 'create' || modalType() === 'update') {
                  <div class="mb-2">
                    <label class="form-label fw-semibold">Archivo Adjunto (PDF o Imagen)</label>
                    <input
                      #fileInput
                      type="file"
                      class="form-control"
                      accept=".pdf, .jpg, .jpeg, .png"
                      (change)="handleFileSelect($event)"
                    />
                    @if (fileData().name) {
                      <small class="text-muted mt-2 d-block">Seleccionado: {{ fileData().name }}</small>
                    }
                  </div>
                }
              </div>

              <div class="modal-footer bg-light py-3">
                <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancelar</button>
                <button
                  type="submit"
                  class="btn"
                  [ngClass]="modalType() === 'create' || modalType() === 'numberblock' ? 'btn-primary' : 'btn-warning'"
                >
                  {{ modalType() === 'create' || modalType() === 'numberblock' ? 'Registrar Art\xEDculo' : 'Guardar Cambios' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    }
  `
    }]
  }], null, { fileInputRef: [{
    type: ViewChild,
    args: ["fileInput"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ScientificArticlesManagerComponent, { className: "ScientificArticlesManagerComponent", filePath: "src/app/componentes/articulos.ts", lineNumber: 318 });
})();
export {
  AuthService,
  ScientificArticlesManagerComponent
};
//# sourceMappingURL=chunk-BPFLHOIZ.js.map
