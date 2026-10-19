import {
  require_lib
} from "./chunk-OJLGNVLA.js";
import {
  CKEditorComponent,
  CKEditorModule,
  require_ckeditor
} from "./chunk-BVMCNHEU.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-OAEVIACX.js";
import {
  ToastrService
} from "./chunk-JEAYVHF3.js";
import {
  environment
} from "./chunk-5ESGTH3B.js";
import {
  MarkdownComponent
} from "./chunk-3QOIHUY2.js";
import {
  Navbar
} from "./chunk-U3CDTOVP.js";
import "./chunk-DJCOHPHY.js";
import {
  Router
} from "./chunk-PFU5G7MY.js";
import {
  HttpClient
} from "./chunk-MMWGUNZC.js";
import {
  CommonModule
} from "./chunk-6QD4DAAM.js";
import {
  Component,
  computed,
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
} from "./chunk-FXWIEX65.js";
import {
  __toESM
} from "./chunk-3WPM564S.js";

// src/app/componentes/blogger.ts
var import_ckeditor5_build_classic = __toESM(require_ckeditor());
var import_socket = __toESM(require_lib());
var _forTrack0 = ($index, $item) => $item._id || $index;
function ForumComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function ForumComponent_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openModal("1", "Crear Tema"));
    });
    \u0275\u0275element(1, "i", 15);
    \u0275\u0275text(2, " Nuevo Tema ");
    \u0275\u0275elementEnd();
  }
}
function ForumComponent_For_16_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "button", 36);
    \u0275\u0275listener("click", function ForumComponent_For_16_Conditional_11_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r4 = \u0275\u0275nextContext();
      const note_r6 = ctx_r4.$implicit;
      const \u0275$index_33_r7 = ctx_r4.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openModal("1w", "Actualizar Tema", note_r6.title, note_r6.detail, { i: \u0275$index_33_r7, j: -1, k: -1 }, note_r6._id));
    });
    \u0275\u0275element(2, "i", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 38);
    \u0275\u0275listener("click", function ForumComponent_For_16_Conditional_11_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const note_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeTheme(note_r6._id));
    });
    \u0275\u0275element(4, "i", 39);
    \u0275\u0275elementEnd()();
  }
}
function ForumComponent_For_16_Conditional_29_For_6_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47)(1, "button", 53);
    \u0275\u0275listener("click", function ForumComponent_For_16_Conditional_29_For_6_Conditional_10_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r12 = \u0275\u0275nextContext();
      const notte_r14 = ctx_r12.$implicit;
      const \u0275$index_104_r15 = ctx_r12.$index;
      const ctx_r4 = \u0275\u0275nextContext(2);
      const note_r6 = ctx_r4.$implicit;
      const \u0275$index_33_r7 = ctx_r4.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openModal("2w", "Actualizar Comentario", notte_r14.title || "", notte_r14.detail, { i: \u0275$index_33_r7, j: \u0275$index_104_r15, k: -1 }, note_r6._id));
    });
    \u0275\u0275element(2, "i", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 54);
    \u0275\u0275listener("click", function ForumComponent_For_16_Conditional_29_For_6_Conditional_10_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r12);
      const \u0275$index_104_r15 = \u0275\u0275nextContext().$index;
      const ctx_r4 = \u0275\u0275nextContext(2);
      const note_r6 = ctx_r4.$implicit;
      const \u0275$index_33_r7 = ctx_r4.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeSubTheme(\u0275$index_33_r7, \u0275$index_104_r15, note_r6._id));
    });
    \u0275\u0275element(4, "i", 39);
    \u0275\u0275elementEnd()();
  }
}
function ForumComponent_For_16_Conditional_29_For_6_Conditional_21_For_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 57)(1, "button", 58);
    \u0275\u0275listener("click", function ForumComponent_For_16_Conditional_29_For_6_Conditional_21_For_2_Conditional_10_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r16 = \u0275\u0275nextContext();
      const nottte_r18 = ctx_r16.$implicit;
      const \u0275$index_153_r19 = ctx_r16.$index;
      const \u0275$index_104_r15 = \u0275\u0275nextContext(2).$index;
      const ctx_r4 = \u0275\u0275nextContext(2);
      const note_r6 = ctx_r4.$implicit;
      const \u0275$index_33_r7 = ctx_r4.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openModal("3w", "Actualizar Respuesta", nottte_r18.title || "", nottte_r18.detail, { i: \u0275$index_33_r7, j: \u0275$index_104_r15, k: \u0275$index_153_r19 }, note_r6._id));
    });
    \u0275\u0275element(2, "i", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 59);
    \u0275\u0275listener("click", function ForumComponent_For_16_Conditional_29_For_6_Conditional_21_For_2_Conditional_10_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r16);
      const \u0275$index_153_r19 = \u0275\u0275nextContext().$index;
      const \u0275$index_104_r15 = \u0275\u0275nextContext(2).$index;
      const ctx_r4 = \u0275\u0275nextContext(2);
      const note_r6 = ctx_r4.$implicit;
      const \u0275$index_33_r7 = ctx_r4.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeSubSubTheme(\u0275$index_33_r7, \u0275$index_104_r15, \u0275$index_153_r19, note_r6._id));
    });
    \u0275\u0275element(4, "i", 39);
    \u0275\u0275elementEnd()();
  }
}
function ForumComponent_For_16_Conditional_29_For_6_Conditional_21_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55)(1, "div", 18)(2, "div", 56);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 20)(5, "span", 45);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small", 46);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(9, "markdown", 25);
    \u0275\u0275conditionalCreate(10, ForumComponent_For_16_Conditional_29_For_6_Conditional_21_For_2_Conditional_10_Template, 5, 0, "div", 57);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_40_0;
    const nottte_r18 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getInitial(nottte_r18.user), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(nottte_r18.user);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatDate(nottte_r18.createdAt), " ");
    \u0275\u0275advance();
    \u0275\u0275property("katex", true)("data", nottte_r18.detail);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_40_0 = ctx_r1.userSession()) == null ? null : tmp_40_0.email) === nottte_r18.user ? 10 : -1);
  }
}
function ForumComponent_For_16_Conditional_29_For_6_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275repeaterCreate(1, ForumComponent_For_16_Conditional_29_For_6_Conditional_21_For_2_Template, 11, 6, "div", 55, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const notte_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(notte_r14.themes);
  }
}
function ForumComponent_For_16_Conditional_29_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42)(1, "div", 43)(2, "div", 18)(3, "div", 44);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 20)(6, "span", 45);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "small", 46);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(10, ForumComponent_For_16_Conditional_29_For_6_Conditional_10_Template, 5, 0, "div", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "markdown", 25);
    \u0275\u0275elementStart(12, "div", 48)(13, "button", 49);
    \u0275\u0275listener("click", function ForumComponent_For_16_Conditional_29_For_6_Template_button_click_13_listener() {
      const \u0275$index_104_r15 = \u0275\u0275restoreView(_r11).$index;
      const ctx_r4 = \u0275\u0275nextContext(2);
      const note_r6 = ctx_r4.$implicit;
      const \u0275$index_33_r7 = ctx_r4.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleSubLike(\u0275$index_33_r7, \u0275$index_104_r15, note_r6._id, "like"));
    });
    \u0275\u0275element(14, "i", 29);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 50);
    \u0275\u0275listener("click", function ForumComponent_For_16_Conditional_29_For_6_Template_button_click_16_listener() {
      const \u0275$index_104_r15 = \u0275\u0275restoreView(_r11).$index;
      const ctx_r4 = \u0275\u0275nextContext(2);
      const note_r6 = ctx_r4.$implicit;
      const \u0275$index_33_r7 = ctx_r4.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleSubLike(\u0275$index_33_r7, \u0275$index_104_r15, note_r6._id, "unlike"));
    });
    \u0275\u0275element(17, "i", 32);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 51);
    \u0275\u0275listener("click", function ForumComponent_For_16_Conditional_29_For_6_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r4 = \u0275\u0275nextContext(2);
      const note_r6 = ctx_r4.$implicit;
      const \u0275$index_33_r7 = ctx_r4.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openModal("3", "Responder Comentario", "", "", { i: \u0275$index_33_r7, j: -1, k: -1 }, note_r6._id));
    });
    \u0275\u0275text(20, " Responder ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(21, ForumComponent_For_16_Conditional_29_For_6_Conditional_21_Template, 3, 0, "div", 52);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_26_0;
    const notte_r14 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getInitial(notte_r14.user), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(notte_r14.user);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatDate(notte_r14.createdAt), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_26_0 = ctx_r1.userSession()) == null ? null : tmp_26_0.email) === notte_r14.user || ((tmp_26_0 = ctx_r1.userSession()) == null ? null : tmp_26_0.rol) === "1" ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("katex", true)("data", notte_r14.detail);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (notte_r14.likes == null ? null : notte_r14.likes.length) || 0, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", (notte_r14.unlikes == null ? null : notte_r14.unlikes.length) || 0, " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(notte_r14.themes && notte_r14.themes.length > 0 ? 21 : -1);
  }
}
function ForumComponent_For_16_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 40);
    \u0275\u0275element(2, "i", 41);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(5, ForumComponent_For_16_Conditional_29_For_6_Template, 22, 9, "div", 42, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const note_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Respuestas (", note_r6.units.length, ")");
    \u0275\u0275advance();
    \u0275\u0275repeater(note_r6.units);
  }
}
function ForumComponent_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 12)(1, "div", 16)(2, "div", 17)(3, "div", 18)(4, "div", 19);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 20)(7, "span", 21);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "small", 22);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(11, ForumComponent_For_16_Conditional_11_Template, 5, 0, "div", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "h4", 24);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "markdown", 25);
    \u0275\u0275elementStart(15, "div", 26)(16, "div", 27)(17, "button", 28);
    \u0275\u0275listener("click", function ForumComponent_For_16_Template_button_click_17_listener() {
      const ctx_r7 = \u0275\u0275restoreView(_r3);
      const note_r6 = ctx_r7.$implicit;
      const \u0275$index_33_r7 = ctx_r7.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleLike(\u0275$index_33_r7, note_r6._id, "like"));
    });
    \u0275\u0275element(18, "i", 29);
    \u0275\u0275elementStart(19, "span", 30);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "button", 31);
    \u0275\u0275listener("click", function ForumComponent_For_16_Template_button_click_21_listener() {
      const ctx_r8 = \u0275\u0275restoreView(_r3);
      const note_r6 = ctx_r8.$implicit;
      const \u0275$index_33_r7 = ctx_r8.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleLike(\u0275$index_33_r7, note_r6._id, "unlike"));
    });
    \u0275\u0275element(22, "i", 32);
    \u0275\u0275elementStart(23, "span", 30);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "button", 33);
    \u0275\u0275listener("click", function ForumComponent_For_16_Template_button_click_25_listener() {
      const ctx_r9 = \u0275\u0275restoreView(_r3);
      const note_r6 = ctx_r9.$implicit;
      const \u0275$index_33_r7 = ctx_r9.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openModal("2", "Responder al Tema", "", "", { i: \u0275$index_33_r7, j: -1, k: -1 }, note_r6._id));
    });
    \u0275\u0275element(26, "i", 34);
    \u0275\u0275elementStart(27, "span");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(29, ForumComponent_For_16_Conditional_29_Template, 7, 1, "div", 35);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_14_0;
    const note_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getInitial(note_r6.usser == null ? null : note_r6.usser[0] == null ? null : note_r6.usser[0].email), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", (note_r6.usser == null ? null : note_r6.usser[0] == null ? null : note_r6.usser[0]._id) || "Usuario An\xF3nimo", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Publicado ", ctx_r1.formatDate(note_r6.createdAt), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_14_0 = ctx_r1.userSession()) == null ? null : tmp_14_0.email) === (note_r6.usser == null ? null : note_r6.usser[0] == null ? null : note_r6.usser[0].email) || ((tmp_14_0 = ctx_r1.userSession()) == null ? null : tmp_14_0.rol) === "1" ? 11 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(note_r6.title);
    \u0275\u0275advance();
    \u0275\u0275property("katex", true)("data", note_r6.detail);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate((note_r6.likes == null ? null : note_r6.likes.length) || 0);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((note_r6.unlikes == null ? null : note_r6.unlikes.length) || 0);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Comentar (", (note_r6.units == null ? null : note_r6.units.length) || 0, ")");
    \u0275\u0275advance();
    \u0275\u0275conditional(note_r6.units && note_r6.units.length > 0 ? 29 : -1);
  }
}
function ForumComponent_Conditional_17_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 66)(1, "label", 67);
    \u0275\u0275text(2, "T\xEDtulo de la publicaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 74);
    \u0275\u0275twoWayListener("ngModelChange", function ForumComponent_Conditional_17_Conditional_8_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.formTitle, $event) || (ctx_r1.formTitle = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formTitle);
  }
}
function ForumComponent_Conditional_17_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70)(1, "small", 75);
    \u0275\u0275text(2, "Vista previa:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "div", 76);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("innerHTML", ctx_r1.formDetail, \u0275\u0275sanitizeHtml);
  }
}
function ForumComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 60)(2, "div", 61)(3, "div", 62)(4, "h5", 63);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 64);
    \u0275\u0275listener("click", function ForumComponent_Conditional_17_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 65);
    \u0275\u0275conditionalCreate(8, ForumComponent_Conditional_17_Conditional_8_Template, 4, 1, "div", 66);
    \u0275\u0275elementStart(9, "div", 66)(10, "label", 67);
    \u0275\u0275text(11, "Contenido o detalle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 68)(13, "ckeditor", 69);
    \u0275\u0275twoWayListener("ngModelChange", function ForumComponent_Conditional_17_Template_ckeditor_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formDetail, $event) || (ctx_r1.formDetail = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(14, ForumComponent_Conditional_17_Conditional_14_Template, 4, 1, "div", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 71)(16, "button", 72);
    \u0275\u0275listener("click", function ForumComponent_Conditional_17_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(17, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 73);
    \u0275\u0275listener("click", function ForumComponent_Conditional_17_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleModalSubmit());
    });
    \u0275\u0275text(19, " Guardar ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.submitLabel());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.modalOption() === "1" || ctx_r1.modalOption() === "1w" ? 8 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275property("editor", ctx_r1.Editor)("config", ctx_r1.editorConfig);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formDetail);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.formDetail ? 14 : -1);
  }
}
function isAuth() {
  const authData = localStorage.getItem("user");
  return authData ? JSON.parse(authData) : null;
}
var ForumComponent = class _ForumComponent {
  http = inject(HttpClient);
  router = inject(Router);
  toastr = inject(ToastrService);
  // Configuración CKEditor
  Editor = import_ckeditor5_build_classic.default;
  editorConfig = {
    language: "es",
    placeholder: "Escribe tus comentarios...",
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "blockQuote",
      "insertTable",
      "undo",
      "redo"
    ]
  };
  // Instancia de Socket.IO Client v2.5.0
  socket;
  COURSE_ID = "69e5631506598f7ce9c31e21";
  // Signals para Estado reactivo
  forumThemes = signal([], ...ngDevMode ? [{ debugName: "forumThemes" }] : []);
  showModal = signal(false, ...ngDevMode ? [{ debugName: "showModal" }] : []);
  modalOption = signal("", ...ngDevMode ? [{ debugName: "modalOption" }] : []);
  submitLabel = signal("Crear", ...ngDevMode ? [{ debugName: "submitLabel" }] : []);
  activeId = signal("", ...ngDevMode ? [{ debugName: "activeId" }] : []);
  activeIndices = signal({ i: -1, j: -1, k: -1 }, ...ngDevMode ? [{ debugName: "activeIndices" }] : []);
  // Formularios en Modal
  formTitle = "";
  formDetail = "";
  // Sesión computable
  userSession = computed(() => isAuth(), ...ngDevMode ? [{ debugName: "userSession" }] : []);
  ngOnInit() {
    document.title = `FORO ${environment.title || ""}`;
    this.initSocketIO();
  }
  ngOnDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
  // --- Socket.IO Client v2.5.0 Connection ---
  initSocketIO() {
    this.socket = (0, import_socket.default)(environment.apiURL, {
      transports: ["websocket", "polling"]
    });
    this.socket.on("connect", () => {
      this.getNotes();
    });
    this.socket.on("foro", (data) => {
      this.forumThemes.set(data || []);
    });
    this.socket.on("connect_error", (err) => {
      console.error("Error de conexi\xF3n en Socket.IO:", err);
    });
  }
  getNotes() {
    if (this.socket && this.socket.connected) {
      this.socket.emit("foroesfa", this.COURSE_ID);
      this.socket.emit("temas", this.COURSE_ID);
    }
  }
  // --- Manejo Modal ---
  openModal(option, submitText, title = "", detail = "", indices = { i: -1, j: -1, k: -1 }, id = "") {
    if (!this.userSession()) {
      this.router.navigate(["/login"]);
      return;
    }
    this.modalOption.set(option);
    this.submitLabel.set(submitText);
    this.formTitle = title;
    this.formDetail = detail;
    this.activeIndices.set(indices);
    this.activeId.set(id);
    this.showModal.set(true);
  }
  closeModal() {
    this.showModal.set(false);
    this.formTitle = "";
    this.formDetail = "";
  }
  handleModalSubmit() {
    switch (this.modalOption()) {
      case "1":
        this.createTheme();
        break;
      case "1w":
        this.updateTheme();
        break;
      case "2":
        this.createSubTheme();
        break;
      case "2w":
        this.updateSubTheme();
        break;
      case "3":
        this.createSubSubTheme();
        break;
      case "3w":
        this.updateSubSubTheme();
        break;
    }
  }
  // --- Operaciones HTTP ---
  createTheme() {
    const user = this.userSession();
    const payload = {
      detail: this.formDetail,
      title: this.formTitle,
      type: "foroesfa",
      curse: this.COURSE_ID,
      user: user._id
    };
    this.http.post(`${environment.apiURL}/api/foros/theme`, payload).subscribe({
      next: () => {
        this.getNotes();
        this.closeModal();
        this.toastr.success("Tema publicado con \xE9xito");
      },
      error: () => this.toastr.error("Ocurri\xF3 un error al publicar")
    });
  }
  updateTheme() {
    const payload = { detail: this.formDetail, title: this.formTitle };
    this.http.put(`${environment.apiURL}/api/foros/theme/${this.activeId()}`, payload).subscribe({
      next: () => {
        this.getNotes();
        this.closeModal();
        this.toastr.info("Tema actualizado correctamente");
      },
      error: () => this.toastr.error("Error al actualizar")
    });
  }
  removeTheme(themeId) {
    if (confirm("\xBFEst\xE1s seguro de eliminar este tema?")) {
      this.http.delete(`${environment.apiURL}/api/foros/theme/${themeId}`).subscribe({
        next: () => {
          this.getNotes();
          this.toastr.info("Tema eliminado");
        },
        error: () => this.toastr.error("Error al eliminar")
      });
    }
  }
  saveLikesChanges(updatedData, targetId, index) {
    this.http.put(`${environment.apiURL}/api/foros/theme/${targetId}`, updatedData[index]).subscribe();
  }
  saveSubThemeChanges(updatedData) {
    const { i } = this.activeIndices();
    this.http.put(`${environment.apiURL}/api/foros/theme/${this.activeId()}`, updatedData[i]).subscribe({
      next: () => {
        this.closeModal();
        this.toastr.success("Comentario guardado");
      },
      error: () => this.toastr.error("Error al publicar comentario")
    });
  }
  // --- Reacciones ---
  handleLike(i, targetId, type) {
    const user = this.userSession();
    if (!user)
      return void this.router.navigate(["/login"]);
    const data = structuredClone(this.forumThemes());
    const targetArray = type === "like" ? "likes" : "unlikes";
    if (!data[i][targetArray])
      data[i][targetArray] = [];
    const hasAppreciation = data[i][targetArray]?.some((u) => u.user === user.email);
    if (hasAppreciation) {
      this.toastr.warning("Ya has reaccionado a este tema");
    } else {
      data[i][targetArray]?.unshift({
        user: user.email,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      });
      this.forumThemes.set(data);
      this.saveLikesChanges(data, targetId, i);
    }
  }
  handleSubLike(i, j, targetId, type) {
    const user = this.userSession();
    if (!user)
      return void this.router.navigate(["/login"]);
    const data = structuredClone(this.forumThemes());
    const targetArray = type === "like" ? "likes" : "unlikes";
    if (!data[i].units[j][targetArray])
      data[i].units[j][targetArray] = [];
    const hasAppreciation = data[i].units[j][targetArray]?.some((u) => u.user === user.email);
    if (hasAppreciation) {
      this.toastr.warning("Ya has reaccionado a esta respuesta");
    } else {
      data[i].units[j][targetArray]?.unshift({
        user: user.email,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      });
      this.forumThemes.set(data);
      this.saveLikesChanges(data, targetId, i);
    }
  }
  // --- Sub-temas Nivel 2 ---
  createSubTheme() {
    const user = this.userSession();
    if (!user)
      return void this.router.navigate(["/login"]);
    const { i } = this.activeIndices();
    const data = structuredClone(this.forumThemes());
    if (!data[i].units)
      data[i].units = [];
    data[i].units.unshift({
      user: user.email,
      title: this.formTitle,
      detail: this.formDetail,
      themes: [],
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    });
    this.forumThemes.set(data);
    this.saveSubThemeChanges(data);
  }
  updateSubTheme() {
    const { i, j } = this.activeIndices();
    const data = structuredClone(this.forumThemes());
    data[i].units[j].title = this.formTitle;
    data[i].units[j].detail = this.formDetail;
    data[i].units[j].updatedAt = /* @__PURE__ */ new Date();
    this.forumThemes.set(data);
    this.saveSubThemeChanges(data);
  }
  removeSubTheme(i, j, targetId) {
    if (confirm("\xBFDeseas eliminar este comentario?")) {
      const data = structuredClone(this.forumThemes());
      data[i].units.splice(j, 1);
      this.forumThemes.set(data);
      this.http.put(`${environment.apiURL}/api/foros/theme/${targetId}`, data[i]).subscribe({
        next: () => this.toastr.info("Comentario eliminado"),
        error: (err) => console.error(err)
      });
    }
  }
  // --- Sub-temas Nivel 3 ---
  createSubSubTheme() {
    const user = this.userSession();
    if (!user)
      return void this.router.navigate(["/login"]);
    const { i, j } = this.activeIndices();
    const data = structuredClone(this.forumThemes());
    data[i].units[j].themes.unshift({
      user: user.email,
      title: this.formTitle,
      detail: this.formDetail,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    });
    this.forumThemes.set(data);
    this.saveSubThemeChanges(data);
  }
  updateSubSubTheme() {
    const { i, j, k } = this.activeIndices();
    const data = structuredClone(this.forumThemes());
    data[i].units[j].themes[k].title = this.formTitle;
    data[i].units[j].themes[k].detail = this.formDetail;
    data[i].units[j].themes[k].updatedAt = /* @__PURE__ */ new Date();
    this.forumThemes.set(data);
    this.saveSubThemeChanges(data);
  }
  removeSubSubTheme(i, j, k, targetId) {
    if (confirm("\xBFDeseas eliminar esta respuesta?")) {
      const data = structuredClone(this.forumThemes());
      data[i].units[j].themes.splice(k, 1);
      this.forumThemes.set(data);
      this.http.put(`${environment.apiURL}/api/foros/theme/${targetId}`, data[i]).subscribe({
        next: () => this.toastr.info("Respuesta eliminada"),
        error: (err) => console.error(err)
      });
    }
  }
  // --- Formateadores de Apariencia ---
  getInitial(email) {
    return email ? email.charAt(0).toUpperCase() : "U";
  }
  formatDate(date) {
    if (!date)
      return "";
    const d = new Date(date);
    return d.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
  }
  static \u0275fac = function ForumComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ForumComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ForumComponent, selectors: [["app-forum"]], decls: 18, vars: 2, consts: [[1, "py-5"], [1, "bg-light", "min-vh-100", "pb-5", "pt-4"], [1, "container", "my-4", 2, "max-width", "990px"], [1, "card", "border-0", "shadow-sm", "mb-4", "bg-info", "text-white"], [1, "card-body", "p-4", "p-md-5", "d-flex", "flex-column", "flex-md-row", "justify-content-between", "align-items-md-center"], [1, "mb-3", "mb-md-0"], [1, "d-flex", "align-items-center", "mb-2"], [1, "bi", "bi-chat-square-dots-fill", "fs-2", "me-2", "text-light"], [1, "fw-bold", "mb-0"], [1, "text-white", "mb-0"], [1, "btn", "btn-warning", "text-dark", "fw-bold", "rounded-pill", "px-4", "py-2", "shadow-sm"], [1, "d-flex", "flex-column"], [1, "card", "border-0", "shadow-sm", "mb-3"], ["tabindex", "-1", 1, "modal", "fade", "show", "d-block", "tab-modal-backdrop", 2, "background-color", "rgba(0,0,0,0.5)"], [1, "btn", "btn-warning", "text-dark", "fw-bold", "rounded-pill", "px-4", "py-2", "shadow-sm", 3, "click"], [1, "bi", "bi-plus-lg", "me-1"], [1, "card-body", "p-4"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-3"], [1, "d-flex", "align-items-center"], [1, "rounded-circle", "bg-info", "text-white", "d-inline-flex", "align-items-center", "justify-content-center", "fw-bold", "shadow-sm", "flex-shrink-0", 2, "width", "42px", "height", "42px", "font-size", "16px"], [1, "ms-2"], [1, "fw-bold", "text-dark", "d-block", "mb-0", 2, "line-height", "1.2"], [1, "text-muted"], ["role", "group", 1, "btn-group"], [1, "fw-bold", "text-dark", "mb-3"], [3, "katex", "data"], [1, "d-flex", "align-items-center", "pt-3", "border-top"], ["role", "group", 1, "btn-group", "p-1"], [1, "btn", "btn-sm", "btn-light", "text-danger", "rounded-pill", "px-3", "border-0", "d-flex", "align-items-center", "me-1", "shadow-sm", 3, "click"], [1, "bi", "bi-heart-fill", "me-1"], [1, "fw-bold", "fst-italic", "small"], [1, "btn", "btn-sm", "btn-light", "text-secondary", "rounded-pill", "px-3", "border-0", "d-flex", "align-items-center", "shadow-sm", 3, "click"], [1, "bi", "bi-heart", "me-1"], [1, "btn", "btn-sm", "btn-outline-primary", "rounded-pill", "px-3", "py-2", "ms-auto", "d-flex", "align-items-center", "fw-bold", 3, "click"], [1, "bi", "bi-chat-left-text", "me-1", "fs-5"], [1, "mt-4", "pt-3", "bg-white", "border-start", "border-3", "border-primary", "rounded", "p-3", "p-md-4", "ms-md-2"], ["title", "Editar", 1, "btn", "btn-sm", "btn-outline-secondary", "border-0", "rounded-circle", "me-1", 3, "click"], [1, "bi", "bi-pencil-fill"], ["title", "Eliminar", 1, "btn", "btn-sm", "btn-outline-danger", "border-0", "rounded-circle", 3, "click"], [1, "bi", "bi-trash-fill"], [1, "d-flex", "align-items-center", "text-primary", "fw-bold", "small", "text-uppercase", "mb-3"], [1, "bi", "bi-diagram-3", "me-1", "fs-5"], [1, "mb-3", "pb-3", "border-bottom"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-2"], [1, "rounded-circle", "bg-info", "text-white", "d-inline-flex", "align-items-center", "justify-content-center", "fw-bold", "shadow-sm", "flex-shrink-0", 2, "width", "36px", "height", "36px", "font-size", "14px"], [1, "fw-bold", "text-dark", "small", "d-block", "mb-0"], [1, "text-muted", 2, "font-size", "0.75rem"], [1, "btn-group"], [1, "d-flex", "align-items-center", "ms-4", "ps-1"], [1, "btn", "btn-link", "text-danger", "p-0", "border-0", "d-flex", "align-items-center", "small", "text-decoration-none", "me-3", 3, "click"], [1, "btn", "btn-link", "text-secondary", "p-0", "border-0", "d-flex", "align-items-center", "small", "text-decoration-none", "me-3", 3, "click"], [1, "btn", "btn-link", "p-0", "text-primary", "small", "fw-bold", "ms-auto", "text-decoration-none", 3, "click"], [1, "mt-3", "ms-4", "ps-2", "rounded", "p-2", "border-start"], [1, "btn", "btn-sm", "btn-link", "text-muted", "p-1", 3, "click"], [1, "btn", "btn-sm", "btn-link", "text-danger", "p-1", 3, "click"], [1, "p-2", "bg-white", "rounded", "shadow-sm", "my-2", "border"], [1, "rounded-circle", "bg-info", "text-white", "d-inline-flex", "align-items-center", "justify-content-center", "fw-bold", "shadow-sm", "flex-shrink-0", 2, "width", "28px", "height", "28px", "font-size", "11px"], [1, "d-flex", "justify-content-end", "mt-1"], [1, "btn", "btn-sm", "btn-link", "text-muted", "p-0", "me-2", 3, "click"], [1, "btn", "btn-sm", "btn-link", "text-danger", "p-0", 3, "click"], [1, "modal-dialog", "modal-lg", "modal-dialog-centered"], [1, "modal-content"], [1, "modal-header", "bg-light"], [1, "modal-title", "fw-bold", "text-dark", "mb-0"], ["type", "button", 1, "btn-close", 3, "click"], [1, "modal-body", "p-4"], [1, "mb-3"], [1, "fw-bold", "small", "text-secondary", "form-label"], [1, "border", "rounded", "overflow-hidden"], [3, "ngModelChange", "editor", "config", "ngModel"], [1, "mt-3", "p-3", "bg-light", "rounded", "border"], [1, "modal-footer", "bg-light"], ["type", "button", 1, "btn", "btn-secondary", "rounded-pill", "px-4", 3, "click"], ["type", "button", 1, "btn", "btn-primary", "rounded-pill", "px-4", "fw-bold", 3, "click"], ["type", "text", "placeholder", "Escribe un t\xEDtulo claro e intuitivo...", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "text-uppercase", "text-muted", "fw-bold", "d-block", "mb-1"], [3, "innerHTML"]], template: function ForumComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-navbar")(1, "div", 0);
      \u0275\u0275elementStart(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "div", 5)(7, "div", 6);
      \u0275\u0275element(8, "i", 7);
      \u0275\u0275elementStart(9, "h2", 8);
      \u0275\u0275text(10, "Foro de Discusi\xF3n");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "p", 9);
      \u0275\u0275text(12, "Explora preguntas, debates e interact\xFAa con la comunidad.");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(13, ForumComponent_Conditional_13_Template, 3, 0, "button", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "div", 11);
      \u0275\u0275repeaterCreate(15, ForumComponent_For_16_Template, 30, 11, "article", 12, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(17, ForumComponent_Conditional_17_Template, 20, 6, "div", 13);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(13);
      \u0275\u0275conditional(ctx.userSession() ? 13 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.forumThemes());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showModal() ? 17 : -1);
    }
  }, dependencies: [MarkdownComponent, CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, CKEditorModule, CKEditorComponent, Navbar], styles: ["\n\n.forum-content[_ngcontent-%COMP%]     img {\n  max-width: 100%;\n  height: auto;\n  border-radius: 4px;\n}\n  .ck-editor__editable_inline {\n  min-height: 180px;\n}\n/*# sourceMappingURL=blogger.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ForumComponent, [{
    type: Component,
    args: [{ selector: "app-forum", standalone: true, imports: [MarkdownComponent, CommonModule, FormsModule, CKEditorModule, Navbar], template: `
    <app-navbar></app-navbar>
    <div class="py-5"></div>

    <div class="bg-light min-vh-100 pb-5 pt-4">
      <div class="container my-4" style="max-width: 990px;">

        <!-- Banner Superior -->
        <div class="card border-0 shadow-sm mb-4 bg-info text-white">
          <div class="card-body p-4 p-md-5 d-flex flex-column flex-md-row justify-content-between align-items-md-center">
            <div class="mb-3 mb-md-0">
              <div class="d-flex align-items-center mb-2">
                <i class="bi bi-chat-square-dots-fill fs-2 me-2 text-light"></i>
                <h2 class="fw-bold mb-0">Foro de Discusi\xF3n</h2>
              </div>
              <p class="text-white mb-0">Explora preguntas, debates e interact\xFAa con la comunidad.</p>
            </div>
            
            @if (userSession()) {
              <button
                class="btn btn-warning text-dark fw-bold rounded-pill px-4 py-2 shadow-sm"
                (click)="openModal('1', 'Crear Tema')"
              >
                <i class="bi bi-plus-lg me-1"></i> Nuevo Tema
              </button>
            }
          </div>
        </div>

        <!-- Feed de Temas -->
        <div class="d-flex flex-column">
          @for (note of forumThemes(); track note._id || $index; let i = $index) {
            <article class="card border-0 shadow-sm mb-3">
              <div class="card-body p-4">

                <!-- Cabecera del Post -->
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div class="d-flex align-items-center">
                    <div class="rounded-circle bg-info text-white d-inline-flex align-items-center justify-content-center fw-bold shadow-sm flex-shrink-0" style="width: 42px; height: 42px; font-size: 16px;">
                      {{ getInitial(note.usser?.[0]?.email) }}
                    </div>
                    <div class="ms-2">
                      <span class="fw-bold text-dark d-block mb-0" style="line-height: 1.2;">
                        {{ note.usser?.[0]?._id || 'Usuario An\xF3nimo' }}
                      </span>
                      <small class="text-muted">
                        Publicado {{ formatDate(note.createdAt) }}
                      </small>
                    </div>
                  </div>

                  @if (userSession()?.email === note.usser?.[0]?.email || userSession()?.rol === '1') {
                    <div class="btn-group" role="group">
                      <button
                        class="btn btn-sm btn-outline-secondary border-0 rounded-circle me-1"
                        title="Editar"
                        (click)="openModal('1w', 'Actualizar Tema', note.title, note.detail, { i, j: -1, k: -1 }, note._id)"
                      >
                        <i class="bi bi-pencil-fill"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-outline-danger border-0 rounded-circle"
                        title="Eliminar"
                        (click)="removeTheme(note._id)"
                      >
                        <i class="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  }
                </div>

                <!-- T\xEDtulo y Contenido -->
                <h4 class="fw-bold text-dark mb-3">{{ note.title }}</h4>
                  <markdown [katex]="true" [data]="note.detail"></markdown>
                <!-- <div class="text-secondary mb-4 forum-content" [innerHTML]="note.detail"></div> -->

                <!-- Footer del Post -->
                <div class="d-flex align-items-center pt-3 border-top">
                  <div class="btn-group p-1" role="group">
                    <button
                      class="btn btn-sm btn-light text-danger rounded-pill px-3 border-0 d-flex align-items-center me-1 shadow-sm"
                      (click)="handleLike(i, note._id, 'like')"
                    >
                      <i class="bi bi-heart-fill me-1"></i>
                      <span class="fw-bold fst-italic small">{{ note.likes?.length || 0 }}</span>
                    </button>

                    <button
                      class="btn btn-sm btn-light text-secondary rounded-pill px-3 border-0 d-flex align-items-center shadow-sm"
                      (click)="handleLike(i, note._id, 'unlike')"
                    >
                      <i class="bi bi-heart me-1"></i>
                      <span class="fw-bold fst-italic small">{{ note.unlikes?.length || 0 }}</span>
                    </button>
                  </div>

                  <button
                    class="btn btn-sm btn-outline-primary rounded-pill px-3 py-2 ms-auto d-flex align-items-center fw-bold"
                    (click)="openModal('2', 'Responder al Tema', '', '', { i, j: -1, k: -1 }, note._id)"
                  >
                    <i class="bi bi-chat-left-text me-1 fs-5"></i>
                    <span>Comentar ({{ note.units?.length || 0 }})</span>
                  </button>
                </div>

                <!-- Sub-comentarios (Nivel 2) -->
                @if (note.units && note.units.length > 0) {
                  <div class="mt-4 pt-3 bg-white border-start border-3 border-primary rounded p-3 p-md-4 ms-md-2">
                    <div class="d-flex align-items-center text-primary fw-bold small text-uppercase mb-3">
                      <i class="bi bi-diagram-3 me-1 fs-5"></i>
                      <span>Respuestas ({{ note.units.length }})</span>
                    </div>

                    @for (notte of note.units; track $index; let j = $index) {
                      <div class="mb-3 pb-3 border-bottom">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                          <div class="d-flex align-items-center">
                            <div class="rounded-circle bg-info text-white d-inline-flex align-items-center justify-content-center fw-bold shadow-sm flex-shrink-0" style="width: 36px; height: 36px; font-size: 14px;">
                              {{ getInitial(notte.user) }}
                            </div>
                            <div class="ms-2">
                              <span class="fw-bold text-dark small d-block mb-0">{{ notte.user }}</span>
                              <small class="text-muted" style="font-size: 0.75rem;">
                                {{ formatDate(notte.createdAt) }}
                              </small>
                            </div>
                          </div>

                          @if (userSession()?.email === notte.user || userSession()?.rol === '1') {
                            <div class="btn-group">
                              <button
                                class="btn btn-sm btn-link text-muted p-1"
                                (click)="openModal('2w', 'Actualizar Comentario', notte.title || '', notte.detail, { i, j, k: -1 }, note._id)"
                              >
                                <i class="bi bi-pencil-fill"></i>
                              </button>
                              <button
                                class="btn btn-sm btn-link text-danger p-1"
                                (click)="removeSubTheme(i, j, note._id)"
                              >
                                <i class="bi bi-trash-fill"></i>
                              </button>
                            </div>
                          }
                        </div>

                  <markdown [katex]="true" [data]="notte.detail"></markdown>
                        <!-- <div class="small text-secondary mb-2 ms-4 ps-1" [innerHTML]="notte.detail"></div> -->

                        <!-- Reacciones Nivel 2 -->
                        <div class="d-flex align-items-center ms-4 ps-1">
                          <button
                            class="btn btn-link text-danger p-0 border-0 d-flex align-items-center small text-decoration-none me-3"
                            (click)="handleSubLike(i, j, note._id, 'like')"
                          >
                            <i class="bi bi-heart-fill me-1"></i> {{ notte.likes?.length || 0 }}
                          </button>

                          <button
                            class="btn btn-link text-secondary p-0 border-0 d-flex align-items-center small text-decoration-none me-3"
                            (click)="handleSubLike(i, j, note._id, 'unlike')"
                          >
                            <i class="bi bi-heart me-1"></i> {{ notte.unlikes?.length || 0 }}
                          </button>

                          <button
                            class="btn btn-link p-0 text-primary small fw-bold ms-auto text-decoration-none"
                            (click)="openModal('3', 'Responder Comentario', '', '', { i, j: -1, k: -1 }, note._id)"
                          >
                            Responder
                          </button>
                        </div>

                        <!-- Sub-sub-comentarios (Nivel 3) -->
                        @if (notte.themes && notte.themes.length > 0) {
                          <div class="mt-3 ms-4 ps-2 rounded p-2 border-start">
                            @for (nottte of notte.themes; track $index; let k = $index) {
                              <div class="p-2 bg-white rounded shadow-sm my-2 border">
                                <div class="d-flex align-items-center">
                                  <div class="rounded-circle bg-info text-white d-inline-flex align-items-center justify-content-center fw-bold shadow-sm flex-shrink-0" style="width: 28px; height: 28px; font-size: 11px;">
                                    {{ getInitial(nottte.user) }}
                                  </div>
                                  <div class="ms-2">
                                    <span class="fw-bold text-dark small d-block mb-0">{{ nottte.user }}</span>
                                    <small class="text-muted" style="font-size: 0.75rem;">
                                      {{ formatDate(nottte.createdAt) }}
                                    </small>
                                  </div>
                                </div>
                                <markdown [katex]="true" [data]="nottte.detail"></markdown>
                                <!-- <div class="small text-secondary mt-1 ms-4" [innerHTML]="nottte.detail"></div> -->

                                @if (userSession()?.email === nottte.user) {
                                  <div class="d-flex justify-content-end mt-1">
                                    <button
                                      class="btn btn-sm btn-link text-muted p-0 me-2"
                                      (click)="openModal('3w', 'Actualizar Respuesta', nottte.title || '', nottte.detail, { i, j, k }, note._id)"
                                    >
                                      <i class="bi bi-pencil-fill"></i>
                                    </button>
                                    <button
                                      class="btn btn-sm btn-link text-danger p-0"
                                      (click)="removeSubSubTheme(i, j, k, note._id)"
                                    >
                                      <i class="bi bi-trash-fill"></i>
                                    </button>
                                  </div>
                                }
                              </div>
                            }
                          </div>
                        }

                      </div>
                    }
                  </div>
                }

              </div>
            </article>
          }
        </div>
      </div>

      <!-- Modal de Bootstrap 5 -->
      @if (showModal()) {
        <div class="modal fade show d-block tab-modal-backdrop" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header bg-light">
                <h5 class="modal-title fw-bold text-dark mb-0">{{ submitLabel() }}</h5>
                <button type="button" class="btn-close" (click)="closeModal()"></button>
              </div>
              <div class="modal-body p-4">
                @if (modalOption() === '1' || modalOption() === '1w') {
                  <div class="mb-3">
                    <label class="fw-bold small text-secondary form-label">T\xEDtulo de la publicaci\xF3n</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Escribe un t\xEDtulo claro e intuitivo..."
                      [(ngModel)]="formTitle"
                    />
                  </div>
                }

                <div class="mb-3">
                  <label class="fw-bold small text-secondary form-label">Contenido o detalle</label>
                  <div class="border rounded overflow-hidden">
                    <ckeditor
                      [editor]="Editor"
                      [config]="editorConfig"
                      [(ngModel)]="formDetail"
                    ></ckeditor>
                  </div>
                </div>

                @if (formDetail) {
                  <div class="mt-3 p-3 bg-light rounded border">
                    <small class="text-uppercase text-muted fw-bold d-block mb-1">Vista previa:</small>
                    <div [innerHTML]="formDetail"></div>
                  </div>
                }
              </div>
              <div class="modal-footer bg-light">
                <button type="button" class="btn btn-secondary rounded-pill px-4" (click)="closeModal()">
                  Cancelar
                </button>
                <button type="button" class="btn btn-primary rounded-pill px-4 fw-bold" (click)="handleModalSubmit()">
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `, styles: ["/* angular:styles/component:css;632279b88ef040306ccf2ffe88604fb4dcc59ef6c8239dcbb15aa96e69c0137e;/home/linuxlite/WebMEAN/src/app/componentes/blogger.ts */\n.forum-content ::ng-deep img {\n  max-width: 100%;\n  height: auto;\n  border-radius: 4px;\n}\n::ng-deep .ck-editor__editable_inline {\n  min-height: 180px;\n}\n/*# sourceMappingURL=blogger.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ForumComponent, { className: "ForumComponent", filePath: "src/app/componentes/blogger.ts", lineNumber: 345 });
})();
export {
  ForumComponent,
  isAuth
};
//# sourceMappingURL=chunk-HVPQSEJM.js.map
