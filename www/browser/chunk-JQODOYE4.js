import {
  GLTFLoader
} from "./chunk-C3ORDXL6.js";
import {
  Navbar
} from "./chunk-U3CDTOVP.js";
import {
  isAuth
} from "./chunk-DJCOHPHY.js";
import {
  RoomEnvironment
} from "./chunk-FUFS4GQK.js";
import {
  OrbitControls
} from "./chunk-TPI4OM5L.js";
import {
  ACESFilmicToneMapping,
  AmbientLight,
  Clock,
  PMREMGenerator,
  PerspectiveCamera,
  PointLight,
  SRGBColorSpace,
  Scene,
  WebGLRenderer
} from "./chunk-ZUJZQ355.js";
import {
  DomSanitizer,
  Router
} from "./chunk-PFU5G7MY.js";
import "./chunk-MMWGUNZC.js";
import "./chunk-6QD4DAAM.js";
import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  ViewChild,
  afterNextRender,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeResourceUrl,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-FXWIEX65.js";
import "./chunk-3WPM564S.js";

// src/app/componentes/iniciofront.ts
var _c0 = ["mapDialog"];
var _c1 = ["menuDialog"];
var _forTrack0 = ($index, $item) => $item.title;
var _forTrack1 = ($index, $item) => $item.label;
function WwwwwwComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "iframe", 7);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("src", ctx, \u0275\u0275sanitizeResourceUrl)("title", ctx_r2.modalTitle());
  }
}
function WwwwwwComponent_For_21_Conditional_6_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 41);
    \u0275\u0275domListener("click", function WwwwwwComponent_For_21_Conditional_6_For_3_Template_button_click_0_listener() {
      const btn_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.navigateTo(btn_r8));
    });
    \u0275\u0275domElement(1, "i");
    \u0275\u0275domElementStart(2, "span", 42);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const btn_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap(btn_r8.iconClass + " text-info fs-6");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(btn_r8.label);
  }
}
function WwwwwwComponent_For_21_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 38)(1, "div", 39);
    \u0275\u0275repeaterCreate(2, WwwwwwComponent_For_21_Conditional_6_For_3_Template, 4, 3, "button", 40, _forTrack1);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r8 = \u0275\u0275nextContext();
    const cat_r10 = ctx_r8.$implicit;
    const \u0275$index_35_r6 = ctx_r8.$index;
    \u0275\u0275domProperty("id", "collapse" + \u0275$index_35_r6);
    \u0275\u0275attribute("aria-labelledby", "heading" + \u0275$index_35_r6);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(cat_r10.buttons);
  }
}
function WwwwwwComponent_For_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 17)(1, "h2", 35)(2, "button", 36);
    \u0275\u0275domListener("click", function WwwwwwComponent_For_21_Template_button_click_2_listener() {
      const \u0275$index_35_r6 = \u0275\u0275restoreView(_r5).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleCategory(\u0275$index_35_r6));
    });
    \u0275\u0275domElement(3, "i");
    \u0275\u0275domElementStart(4, "span", 37);
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275conditionalCreate(6, WwwwwwComponent_For_21_Conditional_6_Template, 4, 2, "div", 38);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const cat_r10 = ctx.$implicit;
    const \u0275$index_35_r6 = ctx.$index;
    const isOpen_r11 = \u0275\u0275nextContext().activeCategoryIndex() === \u0275$index_35_r6;
    \u0275\u0275advance();
    \u0275\u0275domProperty("id", "heading" + \u0275$index_35_r6);
    \u0275\u0275advance();
    \u0275\u0275classProp("collapsed", !isOpen_r11);
    \u0275\u0275attribute("aria-expanded", isOpen_r11)("aria-controls", "collapse" + \u0275$index_35_r6);
    \u0275\u0275advance();
    \u0275\u0275classMap(cat_r10.icon + " me-2 text-info fs-5");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cat_r10.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(isOpen_r11 ? 6 : -1);
  }
}
function WwwwwwComponent_For_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 43);
    \u0275\u0275domListener("click", function WwwwwwComponent_For_48_Template_button_click_0_listener() {
      const social_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openInNewTab(social_r13.url));
    });
    \u0275\u0275domElement(1, "i", 44);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const social_r13 = ctx.$implicit;
    \u0275\u0275attribute("aria-label", social_r13.label);
    \u0275\u0275advance();
    \u0275\u0275classMap(social_r13.iconClass);
    \u0275\u0275styleProp("color", social_r13.color);
  }
}
var NAV_CATEGORIES = [
  {
    title: "Acad\xE9mico e Institucional",
    icon: "bi bi-mortarboard-fill",
    buttons: [
      { label: "Tr\xE1mite (Mesa de partes)", route: "tramite", iconClass: "bi bi-receipt" },
      { label: "Estad\xEDstica institucional", route: "stats", iconClass: "bi bi-bar-chart-fill" },
      { label: "Art\xEDculos cient\xEDficos", route: "articulo", iconClass: "bi bi-journal-text" },
      { label: "Blog", route: "blog", iconClass: "bi bi-file-post" },
      { label: "Carreras", route: "carreras", iconClass: "bi bi-star" },
      { label: "Cursos", route: "curses", iconClass: "bi bi-mortarboard-fill" }
    ]
  },
  {
    title: "Arte y Cultura",
    icon: "bi-brush-fill",
    buttons: [
      { label: "Museo virtual", route: "exhibicion", iconClass: "bi bi-bank" },
      { label: "Editor Latex ESFA", route: "newww", iconClass: "bi bi-text-right" },
      { label: "Video conferencia", route: "video", iconClass: "bi bi-camera-video-fill", isDynamic: true }
    ]
  },
  {
    title: "Herramientas y Extras",
    icon: "bi-gear-fill",
    buttons: [
      { label: "Video game", route: "game", iconClass: "bi bi-controller" },
      { label: "Pintura digital", route: "pintura", iconClass: "bi bi-palette" },
      { label: "Editor de im\xE1genes", route: "imagen", iconClass: "bi bi-image" },
      { label: "Editor de im\xE1genes2", route: "imagen2", iconClass: "bi bi-image" },
      { label: "Editor objetos 3D", route: "blender", iconClass: "bi bi-bezier2" },
      { label: "Audio HD", route: "audio", iconClass: "bi bi-badge-hd" }
    ]
  }
];
var SOCIAL_LINKS = [
  { label: "WhatsApp", url: "https://api.whatsapp.com/send?phone=+51966999215&text=Hola%20bienvenido", iconClass: "bi bi-whatsapp", color: "#069d12" },
  { label: "Facebook", url: "https://web.facebook.com/bellasartes.ayacucho", iconClass: "bi bi-facebook", color: "#0672a0" },
  { label: "Messenger", url: "https://m.me/bellasartes.ayacucho", iconClass: "bi bi-messenger", color: "#00B2FF" },
  { label: "Instagram", url: "https://instagram.com/bellasartes.ayacucho", iconClass: "bi bi-instagram", color: "#ff00ee" },
  { label: "Google / Blogspot", url: "https://bellasartes.blogspot.com", iconClass: "bi bi-google", color: "#ff4800" },
  { label: "YouTube", url: "https://www.youtube.com/channel/UCkYf1NyZ1kUl3965WgeL6rw", iconClass: "bi bi-youtube", color: "#ff0011" },
  { label: "TikTok", url: "https://www.tiktok.com/@bellasartes.ayacucho", iconClass: "bi bi-tiktok", color: "#8531caff" }
];
var WwwwwwComponent = class _WwwwwwComponent {
  mapDialog;
  menuDialog;
  sanitizer = inject(DomSanitizer);
  router = inject(Router);
  currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  imageSrc = signal("", ...ngDevMode ? [{ debugName: "imageSrc" }] : []);
  auth = signal(isAuth(), ...ngDevMode ? [{ debugName: "auth" }] : []);
  currentIframeUrl = signal(null, ...ngDevMode ? [{ debugName: "currentIframeUrl" }] : []);
  modalTitle = signal("", ...ngDevMode ? [{ debugName: "modalTitle" }] : []);
  // Señal para rastrear qué acordeón está abierto actualmente (null = todos cerrados)
  activeCategoryIndex = signal(null, ...ngDevMode ? [{ debugName: "activeCategoryIndex" }] : []);
  socialLinks = SOCIAL_LINKS;
  navCategories = NAV_CATEGORIES;
  iframeSources = {
    mapa: {
      title: "Ubicaci\xF3n - ESFAPA Ayacucho",
      url: this.sanitizer.bypassSecurityTrustResourceUrl("https://maps.google.com/maps?width=100%25&height=500&hl=es&q=+(Escuela%20de%20Bellas%20Artes%20Felipe%20Guam%C3%A1n%20Poma%20de%20Ayala-Ayacucho)&t=k&z=18&ie=UTF8&iwloc=B&output=embed")
    },
    streetview: {
      title: "Street View - ESFAPA Ayacucho",
      url: this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed?pb=!4v1750534065961!6m8!1m7!1syWFe4Rj4ga1j6fqlrkocMA!2m2!1d-13.15626194436401!2d-74.21787224051161!3f200.16657941141062!4f3.2355809602561294!5f0.7820865974627469")
    }
  };
  ngOnInit() {
    const day = (/* @__PURE__ */ new Date()).getDay();
    const svgIndex = day === 0 ? 7 : day;
    this.imageSrc.set(`/www${svgIndex}.svg`);
  }
  openMapModal(type) {
    const selectedSource = this.iframeSources[type];
    this.modalTitle.set(selectedSource.title);
    this.currentIframeUrl.set(selectedSource.url);
    if (this.mapDialog?.nativeElement) {
      this.mapDialog.nativeElement.showModal();
    }
  }
  closeMapModal() {
    if (this.mapDialog?.nativeElement?.open) {
      this.mapDialog.nativeElement.close();
    }
    this.currentIframeUrl.set(null);
  }
  openMenuModal() {
    if (this.menuDialog?.nativeElement) {
      this.menuDialog.nativeElement.showModal();
    }
  }
  closeMenuModal() {
    if (this.menuDialog?.nativeElement?.open) {
      this.menuDialog.nativeElement.close();
    }
    this.activeCategoryIndex.set(null);
  }
  /**
   * Alterna el estado del acordeón: si ya está abierto, lo cierra (null); si está cerrado, lo abre.
   */
  toggleCategory(index) {
    this.activeCategoryIndex.update((current) => current === index ? null : index);
  }
  onDialogClick(event, dialogElement) {
    const rect = dialogElement.getBoundingClientRect();
    const isClickOutside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (isClickOutside) {
      dialogElement.close();
      if (dialogElement === this.mapDialog?.nativeElement) {
        this.currentIframeUrl.set(null);
      }
      if (dialogElement === this.menuDialog?.nativeElement) {
        this.activeCategoryIndex.set(null);
      }
    }
  }
  openInNewTab(url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }
  navigateTo(btn) {
    this.closeMenuModal();
    if (btn.isDynamic) {
      const randomRoomId = Math.random().toString(36).substring(2, 11).toUpperCase();
      this.router.navigate([`/${btn.route}`, randomRoomId]);
      return;
    }
    this.router.navigate([btn.route]);
  }
  static \u0275fac = function WwwwwwComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WwwwwwComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WwwwwwComponent, selectors: [["app-wwwwww"]], viewQuery: function WwwwwwComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5)(_c1, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.mapDialog = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.menuDialog = _t.first);
    }
  }, decls: 49, vars: 7, consts: [["mapDialog", ""], ["menuDialog", ""], [1, "custom-native-modal", "shadow-lg", 3, "click"], [1, "modal-content", "bg-dark", "text-light", "border-secondary", "h-100", "d-flex", "flex-column"], [1, "modal-header", "border-secondary", "p-3", "d-flex", "justify-content-between", "align-items-center", "flex-shrink-0"], [1, "modal-title", "mb-0"], [1, "modal-body", "p-0", "flex-grow-1", "h-100", "overflow-hidden"], ["allowfullscreen", "", "loading", "lazy", 1, "w-100", "h-100", "d-block", "border-0", 3, "src", "title"], [1, "modal-footer", "p-2", "border-secondary", "d-flex", "justify-content-end"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], [1, "custom-native-modal", "shadow-lg", "p-0", "border-0", "rounded-3", 3, "click"], [1, "modal-content", "bg-white", "text-dark", "border-0", "h-100", "d-flex", "flex-column"], [1, "modal-header", "border-bottom", "border-light", "p-3", "d-flex", "justify-content-between", "align-items-center", "flex-shrink-0", "bg-light", "rounded-top-3"], [1, "modal-title", "mb-0", "fw-semibold", "text-secondary"], [1, "bi", "bi-grid-fill", "me-2", "text-info"], [1, "modal-body", "p-3", "flex-grow-1", "overflow-auto", "custom-scrollbar"], ["id", "navAccordion", 1, "accordion", "accordion-flush"], [1, "accordion-item", "bg-white", "border", "border-light", "mb-2", "rounded", "overflow-hidden", "shadow-sm"], [1, "modal-footer", "p-3", "border-top", "border-light", "bg-light", "d-flex", "justify-content-end", "rounded-bottom-3"], ["type", "button", 1, "btn", "btn-outline-secondary", "px-4", 3, "click"], [1, "container", "py-3"], [1, "text-center"], [1, "my-0", "ffont"], [1, "h5", "ffont"], [1, "w-100", "py-3", "d-flex", "justify-content-center"], ["type", "button", 1, "btn", "btn-primary", "gap-1", "d-flex", "align-items-center", "init-hover", 3, "click"], [1, "bi", "bi-list"], [1, "mb-0", "style-location", "ffont"], [1, "text-muted", "ffont"], [1, "d-flex", "justify-content-center", "flex-wrap", "gap-1", "my-2", "mt-3"], ["type", "button", "aria-label", "Ver Street View", 1, "btn", "p-1", 3, "click"], [1, "bi", "bi-person-walking", 2, "font-size", "26px", "color", "#15b5a7"], ["type", "button", "aria-label", "Ver Mapa", 1, "btn", "p-1", 3, "click"], [1, "bi", "bi-geo-alt-fill", 2, "font-size", "26px", "color", "#1b39d4"], ["type", "button", 1, "btn", "p-1"], [1, "accordion-header", 3, "id"], ["type", "button", 1, "accordion-button", "bg-white", "text-dark", "fw-medium", "shadow-none", "py-3", "px-3", 3, "click"], [1, "flex-grow-1"], [1, "accordion-collapse", "show", 3, "id"], [1, "accordion-body", "bg-light", "bg-opacity-50", "d-flex", "flex-column", "gap-2", "p-3", "pt-0"], ["type", "button", 1, "btn", "btn-light", "border", "border-info", "border-opacity-25", "text-dark", "text-start", "d-flex", "align-items-center", "gap-3", "py-2", "px-3", "action-btn-hover", "shadow-sm"], ["type", "button", 1, "btn", "btn-light", "border", "border-info", "border-opacity-25", "text-dark", "text-start", "d-flex", "align-items-center", "gap-3", "py-2", "px-3", "action-btn-hover", "shadow-sm", 3, "click"], [1, "small", "fw-medium"], ["type", "button", 1, "btn", "p-1", 3, "click"], [2, "font-size", "26px"]], template: function WwwwwwComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275domElementStart(0, "dialog", 2, 0);
      \u0275\u0275domListener("click", function WwwwwwComponent_Template_dialog_click_0_listener($event) {
        \u0275\u0275restoreView(_r1);
        const mapDialog_r2 = \u0275\u0275reference(1);
        return \u0275\u0275resetView(ctx.onDialogClick($event, mapDialog_r2));
      });
      \u0275\u0275domElementStart(2, "div", 3)(3, "div", 4)(4, "h5", 5);
      \u0275\u0275text(5);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(6, "div", 6);
      \u0275\u0275conditionalCreate(7, WwwwwwComponent_Conditional_7_Template, 1, 2, "iframe", 7);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "div", 8)(9, "button", 9);
      \u0275\u0275domListener("click", function WwwwwwComponent_Template_button_click_9_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.closeMapModal());
      });
      \u0275\u0275text(10, "Cerrar");
      \u0275\u0275domElementEnd()()()();
      \u0275\u0275domElementStart(11, "dialog", 10, 1);
      \u0275\u0275domListener("click", function WwwwwwComponent_Template_dialog_click_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        const menuDialog_r4 = \u0275\u0275reference(12);
        return \u0275\u0275resetView(ctx.onDialogClick($event, menuDialog_r4));
      });
      \u0275\u0275domElementStart(13, "div", 11)(14, "div", 12)(15, "h5", 13);
      \u0275\u0275domElement(16, "i", 14);
      \u0275\u0275text(17, " Men\xFA de Navegaci\xF3n");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(18, "div", 15)(19, "div", 16);
      \u0275\u0275repeaterCreate(20, WwwwwwComponent_For_21_Template, 7, 9, "div", 17, _forTrack0);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(22, "div", 18)(23, "button", 19);
      \u0275\u0275domListener("click", function WwwwwwComponent_Template_button_click_23_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.closeMenuModal());
      });
      \u0275\u0275text(24, "Cerrar");
      \u0275\u0275domElementEnd()()()();
      \u0275\u0275domElementStart(25, "div", 20)(26, "div", 21)(27, "h3", 22);
      \u0275\u0275text(28, " ESCUELA SUPERIOR DE FORMACI\xD3N ART\xCDSTICA ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(29, "div", 23);
      \u0275\u0275text(30, '"FELIPE GUAM\xC1N POMA DE AYALA"');
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(31, "div", 24)(32, "button", 25);
      \u0275\u0275domListener("click", function WwwwwwComponent_Template_button_click_32_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openMenuModal());
      });
      \u0275\u0275domElement(33, "i", 26);
      \u0275\u0275domElementStart(34, "span");
      \u0275\u0275text(35, "MEN\xDA INSTITUCIONAL");
      \u0275\u0275domElementEnd()()()();
      \u0275\u0275domElementStart(36, "div", 21)(37, "div", 27);
      \u0275\u0275text(38, " Jr. Mariano Melgar N\xBA 398, Distrito Jes\xFAs Nazareno - Huamanga, Ayacucho. Tel\xE9fono: 066-287499 ");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(39, "div", 21)(40, "div", 28);
      \u0275\u0275text(41);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(42, "div", 29)(43, "button", 30);
      \u0275\u0275domListener("click", function WwwwwwComponent_Template_button_click_43_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openMapModal("streetview"));
      });
      \u0275\u0275domElement(44, "i", 31);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(45, "button", 32);
      \u0275\u0275domListener("click", function WwwwwwComponent_Template_button_click_45_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openMapModal("mapa"));
      });
      \u0275\u0275domElement(46, "i", 33);
      \u0275\u0275domElementEnd();
      \u0275\u0275repeaterCreate(47, WwwwwwComponent_For_48_Template, 2, 5, "button", 34, _forTrack1);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      let tmp_3_0;
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.modalTitle());
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_3_0 = ctx.currentIframeUrl()) ? 7 : -1, tmp_3_0);
      \u0275\u0275advance(13);
      \u0275\u0275repeater(ctx.navCategories);
      \u0275\u0275advance(17);
      \u0275\u0275styleMap("font-size: .8em");
      \u0275\u0275advance(3);
      \u0275\u0275styleMap("font-size: .8em");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" Copyright \xA9 ESFAPA Ayacucho ", ctx.currentYear, " ");
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.socialLinks);
    }
  }, styles: ["\n\n.style-subtext[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n.style-location[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n}\n.action-btn-hover[_ngcontent-%COMP%] {\n  transition: all 0.2s ease-in-out;\n}\n.action-btn-hover[_ngcontent-%COMP%]:hover {\n  background-color: rgba(13, 110, 253, 0.15) !important;\n  border-color: rgba(13, 110, 253, 0.4) !important;\n  transform: translateX(4px);\n}\n.init-hover[_ngcontent-%COMP%]:hover {\n  padding: 0.85rem 1.25rem;\n  font-size: 1.05rem;\n  border-radius: 8px;\n}\n.custom-native-modal[_ngcontent-%COMP%] {\n  width: 90vw;\n  height: 80vh;\n  max-width: 600px;\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  border-radius: 12px;\n  padding: 0;\n  background: #0f172a;\n  margin: auto;\n}\n.custom-native-modal[_ngcontent-%COMP%]::backdrop {\n  background: rgba(0, 0, 0, 0.75);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n/*# sourceMappingURL=iniciofront.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WwwwwwComponent, [{
    type: Component,
    args: [{ selector: "app-wwwwww", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <!-- Modal gen\xE9rico para Mapas / StreetView -->
    <dialog #mapDialog class="custom-native-modal shadow-lg" (click)="onDialogClick($event, mapDialog)">
      <div class="modal-content bg-dark text-light border-secondary h-100 d-flex flex-column">
        <div class="modal-header border-secondary p-3 d-flex justify-content-between align-items-center flex-shrink-0">
          <h5 class="modal-title mb-0">{{ modalTitle() }}</h5>
          <!-- <button type="button" class="btn-close btn-close-white" (click)="closeMapModal()"></button> -->
        </div>
        <div class="modal-body p-0 flex-grow-1 h-100 overflow-hidden">
          @if (currentIframeUrl(); as iframeUrl) {
            <iframe
              [src]="iframeUrl"
              [title]="modalTitle()"
              allowfullscreen
              loading="lazy"
              class="w-100 h-100 d-block border-0"
            ></iframe>
          }
        </div>
        <div class="modal-footer p-2 border-secondary d-flex justify-content-end">
          <button type="button" class="btn btn-secondary" (click)="closeMapModal()">Cerrar</button>
        </div>
      </div>
    </dialog>

    <!-- Modal con Acorde\xF3n para los Botones de Navegaci\xF3n -->
    <dialog #menuDialog class="custom-native-modal shadow-lg p-0 border-0 rounded-3" (click)="onDialogClick($event, menuDialog)">
      <div class="modal-content bg-white text-dark border-0 h-100 d-flex flex-column">
        <div class="modal-header border-bottom border-light p-3 d-flex justify-content-between align-items-center flex-shrink-0 bg-light rounded-top-3">
          <h5 class="modal-title mb-0 fw-semibold text-secondary"><i class="bi bi-grid-fill me-2 text-info"></i> Men\xFA de Navegaci\xF3n</h5>
        </div>
        
        <div class="modal-body p-3 flex-grow-1 overflow-auto custom-scrollbar">
          <!-- Acorde\xF3n personalizado controlado por Signal -->
          <div class="accordion accordion-flush" id="navAccordion">
            @for (cat of navCategories; track cat.title; let i = $index) {
              @let isOpen = activeCategoryIndex() === i;
              <div class="accordion-item bg-white border border-light mb-2 rounded overflow-hidden shadow-sm">
                <h2 class="accordion-header" [id]="'heading' + i">
                  <button 
                    class="accordion-button bg-white text-dark fw-medium shadow-none py-3 px-3" 
                    [class.collapsed]="!isOpen"
                    type="button" 
                    (click)="toggleCategory(i)"
                    [attr.aria-expanded]="isOpen" 
                    [attr.aria-controls]="'collapse' + i"
                  >
                    <i [class]="cat.icon + ' me-2 text-info fs-5'"></i> 
                    <span class="flex-grow-1">{{ cat.title }}</span>
                  </button>
                </h2>
                
                @if (isOpen) {
                  <div [id]="'collapse' + i" class="accordion-collapse show" [attr.aria-labelledby]="'heading' + i">
                    <div class="accordion-body bg-light bg-opacity-50 d-flex flex-column gap-2 p-3 pt-0">
                      @for (btn of cat.buttons; track btn.label) {
                        <button 
                          type="button"
                          class="btn btn-light border border-info border-opacity-25 text-dark text-start d-flex align-items-center gap-3 py-2 px-3 action-btn-hover shadow-sm" 
                          (click)="navigateTo(btn)"
                        >
                          <i [class]="btn.iconClass + ' text-info fs-6'"></i>
                          <span class="small fw-medium">{{ btn.label }}</span>
                        </button>
                      }
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </div>

        <div class="modal-footer p-3 border-top border-light bg-light d-flex justify-content-end rounded-bottom-3">
          <button type="button" class="btn btn-outline-secondary px-4" (click)="closeMenuModal()">Cerrar</button>
        </div>
      </div>
    </dialog>


    <div class="container py-3">
      <!-- Informaci\xF3n Institucional -->
      <div class="text-center">
        <h3 class=" my-0 ffont">
          ESCUELA SUPERIOR DE FORMACI\xD3N ART\xCDSTICA
        </h3>
        <div class="h5 ffont">"FELIPE GUAM\xC1N POMA DE AYALA"</div>

        <!-- <div class="text-center" style="height: 6cm;">
          <app-three-html-canvas></app-three-html-canvas>
        </div> -->

        <!-- Bot\xF3n \xFAnico para desplegar el Modal con Acorde\xF3n de Navegaci\xF3n -->
        <div class="w-100 py-3 d-flex justify-content-center">
          <button 
            type="button"
            class="btn btn-primary gap-1 d-flex align-items-center init-hover" 
            (click)="openMenuModal()"
          >
            <i class="bi bi-list"></i>
            <span>MEN\xDA INSTITUCIONAL</span>
          </button>
        </div>
      </div>


<!-- Direcci\xF3n -->
      <div class="text-center">
        <div class="mb-0 style-location ffont" [style]="'font-size: .8em'">
          Jr. Mariano Melgar N\xBA 398, Distrito Jes\xFAs Nazareno - Huamanga, Ayacucho.
          Tel\xE9fono: 066-287499
        </div>
      </div>

      <!-- Redes Sociales y Modales de Mapas -->
      <div class="text-center">
        <div class="text-muted ffont" [style]="'font-size: .8em'">
          Copyright &copy; ESFAPA Ayacucho {{ currentYear }}
        </div>
      </div>

      <div class="d-flex justify-content-center flex-wrap gap-1 my-2  mt-3">
        <button
          type="button"
          class="btn p-1"
          aria-label="Ver Street View"
          (click)="openMapModal('streetview')"
        >
          <i style="font-size: 26px; color: #15b5a7;" class="bi bi-person-walking"></i> 
        </button>
        <button
          type="button"
          class="btn p-1"
          aria-label="Ver Mapa"
          (click)="openMapModal('mapa')"
        >
          <i style="font-size: 26px; color: #1b39d4;" class="bi bi-geo-alt-fill"></i> 
        </button>

        @for (social of socialLinks; track social.label) {
          <button
            type="button"
            class="btn p-1"
            [attr.aria-label]="social.label"
            (click)="openInNewTab(social.url)"
          >
            <i
              [class]="social.iconClass"
              [style.color]="social.color"
              style="font-size: 26px;"
            ></i>
          </button>
        }
      </div>

      
    </div>
  `, styles: ["/* angular:styles/component:css;6cfdbad29dd09f42ebd2b6eac6048d60b3fc720fb458de62ca6339df98b81c8f;/home/linuxlite/WebMEAN/src/app/componentes/iniciofront.ts */\n.style-subtext {\n  font-size: 0.75rem;\n}\n.style-location {\n  font-size: 0.9rem;\n}\n.action-btn-hover {\n  transition: all 0.2s ease-in-out;\n}\n.action-btn-hover:hover {\n  background-color: rgba(13, 110, 253, 0.15) !important;\n  border-color: rgba(13, 110, 253, 0.4) !important;\n  transform: translateX(4px);\n}\n.init-hover:hover {\n  padding: 0.85rem 1.25rem;\n  font-size: 1.05rem;\n  border-radius: 8px;\n}\n.custom-native-modal {\n  width: 90vw;\n  height: 80vh;\n  max-width: 600px;\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  border-radius: 12px;\n  padding: 0;\n  background: #0f172a;\n  margin: auto;\n}\n.custom-native-modal::backdrop {\n  background: rgba(0, 0, 0, 0.75);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n/*# sourceMappingURL=iniciofront.css.map */\n"] }]
  }], null, { mapDialog: [{
    type: ViewChild,
    args: ["mapDialog"]
  }], menuDialog: [{
    type: ViewChild,
    args: ["menuDialog"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WwwwwwComponent, { className: "WwwwwwComponent", filePath: "src/app/componentes/iniciofront.ts", lineNumber: 290 });
})();

// src/app/componentes/inicio3d.ts
var _c02 = ["canvasRef"];
var Wwww = class _Wwww {
  canvasRef;
  auth = isAuth();
  renderer;
  scene;
  camera;
  controls;
  loadedModel;
  pmremGenerator;
  clock = new Clock();
  animationFrameId = 0;
  ngZone = inject(NgZone);
  mouseX = 0;
  mouseY = 0;
  targetX = 0;
  targetY = 0;
  boundOnResize = this.onWindowResize.bind(this);
  boundOnMouseMove = this.onMouseMove.bind(this);
  constructor() {
    afterNextRender(() => {
      this.initScene();
    });
  }
  initScene() {
    const canvas = this.canvasRef.nativeElement;
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(60, width / height, 0.1, 1e3);
    this.camera.position.z = 6;
    this.renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.pmremGenerator = new PMREMGenerator(this.renderer);
    this.scene.environment = this.pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.add(new AmbientLight(16777215, 0.1));
    const pointLight = new PointLight(3718648, 1);
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);
    const pointLight2 = new PointLight(8490232, 3);
    pointLight2.position.set(-5, -5, 5);
    this.scene.add(pointLight2);
    const loader = new GLTFLoader();
    loader.load("new.glb", (gltf) => {
      this.loadedModel = gltf.scene;
      this.loadedModel.scale.set(8, 8, 8);
      this.loadedModel.position.set(0, -0.3, 0);
      this.loadedModel.traverse((child) => {
        if (child.isMesh) {
          const mesh = child;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          if (mesh.material) {
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            materials.forEach((mat) => {
              if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
                mat.transparent = true;
                if (mat.isMeshPhysicalMaterial) {
                  mat.transmission = 0.8;
                  mat.roughness = 0.15;
                  mat.metalness = 0.1;
                  mat.ior = 1.5;
                } else {
                  mat.roughness = 0.2;
                  mat.metalness = 0.4;
                }
                mat.envMapIntensity = 1.8;
                if (mat.map)
                  mat.map.colorSpace = SRGBColorSpace;
                mat.needsUpdate = true;
              }
            });
          }
        }
      });
      this.scene.add(this.loadedModel);
    }, void 0, (error) => {
      console.error("Error al cargar el modelo GLB:", error);
    });
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener("resize", this.boundOnResize, { passive: true });
      window.addEventListener("mousemove", this.boundOnMouseMove, { passive: true });
      const animate = () => {
        this.animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = this.clock.getElapsedTime();
        this.targetX += (this.mouseX - this.targetX) * 0.05;
        this.targetY += (this.mouseY - this.targetY) * 0.05;
        if (this.loadedModel) {
          this.loadedModel.rotation.x = this.targetY * 0.5 + elapsedTime * 0.3;
          this.loadedModel.rotation.y = this.targetX * 0.5 + elapsedTime * 0.5;
        }
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
      };
      animate();
    });
  }
  onMouseMove(event) {
    this.mouseX = event.clientX / window.innerWidth * 2 - 1;
    this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener("resize", this.boundOnResize);
    window.removeEventListener("mousemove", this.boundOnMouseMove);
    if (this.controls) {
      this.controls.dispose();
    }
    if (this.pmremGenerator) {
      this.pmremGenerator.dispose();
    }
    if (this.loadedModel) {
      this.scene.remove(this.loadedModel);
      this.loadedModel.traverse((child) => {
        if (child.isMesh) {
          const mesh = child;
          if (mesh.geometry)
            mesh.geometry.dispose();
          if (mesh.material) {
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            materials.forEach((mat) => {
              for (const key of Object.keys(mat)) {
                const value = mat[key];
                if (value && typeof value === "object" && "dispose" in value && typeof value.dispose === "function") {
                  value.dispose();
                }
              }
              mat.dispose();
            });
          }
        }
      });
    }
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
    }
  }
  static \u0275fac = function Wwww_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Wwww)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Wwww, selectors: [["app-www"]], viewQuery: function Wwww_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c02, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.canvasRef = _t.first);
    }
  }, decls: 5, vars: 0, consts: [["canvasRef", ""], [1, "landing-container"], [1, "footer-overlay"]], template: function Wwww_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275element(1, "canvas", null, 0);
      \u0275\u0275elementStart(3, "div", 2);
      \u0275\u0275element(4, "app-wwwwww");
      \u0275\u0275elementEnd()();
    }
  }, dependencies: [WwwwwwComponent], styles: ["\n\n.landing-container[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  min-height: 100vh;\n  overflow-x: hidden;\n  background: #fcfcfcff;\n  font-family:\n    system-ui,\n    -apple-system,\n    sans-serif;\n}\ncanvas[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: block;\n  z-index: 1;\n}\n.footer-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 55.5%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 100%;\n  z-index: 10;\n  pointer-events: auto;\n}\n/*# sourceMappingURL=inicio3d.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Wwww, [{
    type: Component,
    args: [{ selector: "app-www", standalone: true, imports: [WwwwwwComponent], template: `
    <div class="landing-container">
      <canvas #canvasRef></canvas>
      
      <div class="footer-overlay">
        <app-wwwwww></app-wwwwww>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;beed99cfdc84c822b83742a5d6b059c49019fd9f8b0650c5c98d4eb56b7267cf;/home/linuxlite/WebMEAN/src/app/componentes/inicio3d.ts */\n.landing-container {\n  position: relative;\n  width: 100%;\n  min-height: 100vh;\n  overflow-x: hidden;\n  background: #fcfcfcff;\n  font-family:\n    system-ui,\n    -apple-system,\n    sans-serif;\n}\ncanvas {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: block;\n  z-index: 1;\n}\n.footer-overlay {\n  position: absolute;\n  top: 55.5%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 100%;\n  z-index: 10;\n  pointer-events: auto;\n}\n/*# sourceMappingURL=inicio3d.css.map */\n"] }]
  }], () => [], { canvasRef: [{
    type: ViewChild,
    args: ["canvasRef", { static: true }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Wwww, { className: "Wwww", filePath: "src/app/componentes/inicio3d.ts", lineNumber: 51 });
})();

// src/app/componentes/inicio.ts
var InicioComponent = class _InicioComponent {
  // Estado de autenticación optimizado para solo lectura
  auth = isAuth();
  static \u0275fac = function InicioComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InicioComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InicioComponent, selectors: [["app-inicio"]], decls: 2, vars: 0, template: function InicioComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-navbar")(1, "app-www");
    }
  }, dependencies: [
    Navbar,
    // AdminComponent,
    Wwww
  ], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InicioComponent, [{
    type: Component,
    args: [{
      selector: "app-inicio",
      standalone: true,
      imports: [
        Navbar,
        // AdminComponent,
        Wwww
      ],
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <app-navbar />
    <app-www />
    <!-- <app-admin /> -->

  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InicioComponent, { className: "InicioComponent", filePath: "src/app/componentes/inicio.ts", lineNumber: 23 });
})();
export {
  InicioComponent
};
//# sourceMappingURL=chunk-JQODOYE4.js.map
