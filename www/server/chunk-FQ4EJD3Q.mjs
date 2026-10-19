import './polyfills.server.mjs';
import {
  DefaultValueAccessor,
  FormsModule,
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
import {
  isAuth
} from "./chunk-NIVJ4KPM.mjs";
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule
} from "./chunk-IESDD46D.mjs";
import {
  HttpClient,
  HttpClientModule
} from "./chunk-JRMDAGFP.mjs";
import {
  CommonModule
} from "./chunk-TDOK3CTI.mjs";
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
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-GYAE75W3.mjs";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-TB3YAHZW.mjs";

// src/app/componentes/exhibicion.ts
var _c0 = ["fileInput"];
var _c1 = (a0, a1) => ["/exhibicion", a0, a1];
var _c2 = (a0, a1) => ["/model", a0, a1];
var _forTrack0 = ($index, $item) => $item._id || $item.id || $index;
function VirtualMuseumComponent_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r1 = ctx.$implicit;
    \u0275\u0275property("value", cat_r1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r1);
  }
}
function VirtualMuseumComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function VirtualMuseumComponent_Conditional_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openCreateModal());
    });
    \u0275\u0275text(1, " Curar Nueva Sala ");
    \u0275\u0275elementEnd();
  }
}
function VirtualMuseumComponent_For_18_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function VirtualMuseumComponent_For_18_Conditional_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const item_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openEditModal(item_r5));
    });
    \u0275\u0275element(1, "i", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 30);
    \u0275\u0275listener("click", function VirtualMuseumComponent_For_18_Conditional_19_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r4);
      const item_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteItem(item_r5._id || item_r5.id));
    });
    \u0275\u0275element(3, "i", 31);
    \u0275\u0275elementEnd();
  }
}
function VirtualMuseumComponent_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 11)(1, "div", 15);
    \u0275\u0275element(2, "img", 16);
    \u0275\u0275elementStart(3, "span", 17);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 18)(6, "h3", 19);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 20);
    \u0275\u0275text(9, " Curador: ");
    \u0275\u0275elementStart(10, "strong", 21);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "p", 22);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 23)(15, "button", 24);
    \u0275\u0275element(16, "i", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 26);
    \u0275\u0275element(18, "i", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(19, VirtualMuseumComponent_For_18_Conditional_19_Template, 4, 0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const \u0275$index_34_r6 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("src", item_r5.imageUrl || "https://picsum.photos/600/400?random=" + (item_r5._id || item_r5.id || \u0275$index_34_r6), \u0275\u0275sanitizeUrl)("alt", item_r5.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.category);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r5.title);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r5.curator);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r5.detail, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction2(9, _c1, item_r5._id || item_r5.id, item_r5.user));
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction2(12, _c2, item_r5._id || item_r5.id, item_r5.user));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.auth && (item_r5.curator === ctx_r2.auth.name || ctx_r2.auth.rol === "1") ? 19 : -1);
  }
}
function VirtualMuseumComponent_ForEmpty_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "p", 32);
    \u0275\u0275text(2, "No se encontraron salas o tem\xE1ticas en este museo.");
    \u0275\u0275elementEnd()();
  }
}
function VirtualMuseumComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275listener("click", function VirtualMuseumComponent_Conditional_20_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeModal());
    });
    \u0275\u0275elementStart(1, "div", 34);
    \u0275\u0275listener("click", function VirtualMuseumComponent_Conditional_20_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "form", 35);
    \u0275\u0275listener("ngSubmit", function VirtualMuseumComponent_Conditional_20_Template_form_ngSubmit_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveExhibition());
    });
    \u0275\u0275elementStart(5, "div", 36)(6, "label");
    \u0275\u0275text(7, "T\xEDtulo de la Sala / Tem\xE1tica");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 37);
    \u0275\u0275twoWayListener("ngModelChange", function VirtualMuseumComponent_Conditional_20_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.formData.title, $event) || (ctx_r2.formData.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 36)(10, "label");
    \u0275\u0275text(11, "Categor\xEDa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", function VirtualMuseumComponent_Conditional_20_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.formData.category, $event) || (ctx_r2.formData.category = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 36)(14, "label");
    \u0275\u0275text(15, "Subir imagen de la portada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 39, 0);
    \u0275\u0275listener("change", function VirtualMuseumComponent_Conditional_20_Template_input_change_16_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onFileSelected($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 36)(19, "label");
    \u0275\u0275text(20, "Descripci\xF3n curatorial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "textarea", 40);
    \u0275\u0275twoWayListener("ngModelChange", function VirtualMuseumComponent_Conditional_20_Template_textarea_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.formData.detail, $event) || (ctx_r2.formData.detail = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 41)(23, "button", 42);
    \u0275\u0275listener("click", function VirtualMuseumComponent_Conditional_20_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeModal());
    });
    \u0275\u0275text(24, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 43);
    \u0275\u0275text(26, "Guardar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.isEditing() ? "Editar Sala del Museo" : "Curar Nueva Sala");
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.formData.title);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.formData.category);
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.formData.detail);
  }
}
var MuseumService = class _MuseumService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiURL}/api`;
  baseUrl = environment.apiURL || "";
  exhibitionsSignal = signal([], ...ngDevMode ? [{ debugName: "exhibitionsSignal" }] : []);
  exhibitions = this.exhibitionsSignal.asReadonly();
  formatImageUrl(item) {
    if (!item.imageUrl)
      return item;
    if (item.imageUrl.startsWith("http://") || item.imageUrl.startsWith("https://")) {
      return item;
    }
    const cleanPath = item.imageUrl.startsWith("/") ? item.imageUrl : `/${item.imageUrl}`;
    return __spreadProps(__spreadValues({}, item), {
      imageUrl: `${this.baseUrl}${cleanPath}`
    });
  }
  loadExhibitions() {
    this.http.get(`${this.apiUrl}/exhibitions`).subscribe({
      next: (data) => {
        const formattedData = data.map((item) => this.formatImageUrl(item));
        this.exhibitionsSignal.set(formattedData);
      },
      error: (err) => {
        console.warn("Backend no disponible. Cargando datos por defecto:", err);
        if (this.exhibitionsSignal().length === 0) {
          this.exhibitionsSignal.set([
            {
              id: "1",
              title: "Cultura Preincaica",
              category: "Historia",
              user: "admin@museum.org",
              detail: "Muestra virtual de ceramios e imaginer\xEDa ancestral.",
              imageUrl: "https://picsum.photos/seed/history/600/400",
              curator: "Juan P\xE9rez"
            }
          ]);
        }
      }
    });
  }
  createExhibition(formData) {
    this.http.post(`${this.apiUrl}/exhibitions`, formData).subscribe({
      next: (newExhibition) => {
        const formatted = this.formatImageUrl(newExhibition);
        this.exhibitionsSignal.update((list) => [formatted, ...list]);
      },
      error: (err) => console.error("Error al guardar exposici\xF3n:", err)
    });
  }
  updateExhibition(id, formData) {
    this.http.put(`${this.apiUrl}/exhibitions/${id}`, formData).subscribe({
      next: (updated) => {
        const formatted = this.formatImageUrl(updated);
        this.exhibitionsSignal.update((list) => list.map((e) => (e._id || e.id) === id ? formatted : e));
      },
      error: (err) => console.error("Error al actualizar exposici\xF3n:", err)
    });
  }
  deleteExhibition(id) {
    this.http.delete(`${this.apiUrl}/exhibitions/${id}`).subscribe({
      next: () => {
        this.exhibitionsSignal.update((list) => list.filter((e) => (e._id || e.id) !== id));
      },
      error: (err) => console.error("Error al eliminar exposici\xF3n:", err)
    });
  }
  static \u0275fac = function MuseumService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MuseumService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MuseumService, factory: _MuseumService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MuseumService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var VirtualMuseumComponent = class _VirtualMuseumComponent {
  fileInputElement;
  museumService = inject(MuseumService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  auth = isAuth();
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  selectedCategory = signal("Todas", ...ngDevMode ? [{ debugName: "selectedCategory" }] : []);
  showModal = signal(false, ...ngDevMode ? [{ debugName: "showModal" }] : []);
  isEditing = signal(false, ...ngDevMode ? [{ debugName: "isEditing" }] : []);
  currentEditId = null;
  selectedFile = null;
  formData = {
    title: "",
    user: "",
    detail: "",
    category: "",
    imageUrl: "",
    curator: ""
  };
  categories = computed(() => {
    const list = this.museumService.exhibitions();
    const uniqueCategories = new Set(list.map((item) => item.category));
    return Array.from(uniqueCategories);
  }, ...ngDevMode ? [{ debugName: "categories" }] : []);
  filteredExhibitions = computed(() => {
    const search = this.searchTerm().toLowerCase();
    const category = this.selectedCategory();
    return this.museumService.exhibitions().filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(search) || item.curator.toLowerCase().includes(search) || item.detail.toLowerCase().includes(search);
      const matchesCategory = category === "Todas" || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, ...ngDevMode ? [{ debugName: "filteredExhibitions" }] : []);
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params["search"]) {
        this.searchTerm.set(params["search"]);
      }
    });
    this.museumService.loadExhibitions();
  }
  onSearchChange(value) {
    this.searchTerm.set(value);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: value || null },
      queryParamsHandling: "merge"
    });
  }
  onFileSelected(event) {
    const target = event.target;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
    }
  }
  openCreateModal() {
    this.isEditing.set(false);
    this.currentEditId = null;
    this.selectedFile = null;
    this.formData = { title: "", user: "", category: "", detail: "", imageUrl: "", curator: "" };
    this.showModal.set(true);
  }
  openEditModal(item) {
    this.isEditing.set(true);
    this.currentEditId = item._id || item.id || null;
    this.selectedFile = null;
    this.formData = {
      title: item.title,
      user: item.user || "",
      category: item.category,
      detail: item.detail,
      imageUrl: item.imageUrl,
      curator: item.curator
    };
    this.showModal.set(true);
  }
  closeModal() {
    this.showModal.set(false);
    this.selectedFile = null;
    if (this.fileInputElement?.nativeElement) {
      this.fileInputElement.nativeElement.value = "";
    }
  }
  saveExhibition() {
    if (!this.formData.title || !this.formData.category)
      return;
    const payload = new FormData();
    payload.append("title", this.formData.title);
    payload.append("type", "general");
    if (this.auth?.email)
      payload.append("email", this.auth.email);
    payload.append("curator", this.auth?.name || this.formData.curator);
    if (this.auth?._id)
      payload.append("user", this.auth._id);
    payload.append("detail", this.formData.detail || "");
    payload.append("category", this.formData.category);
    if (this.selectedFile) {
      payload.append("image", this.selectedFile);
    }
    if (this.isEditing() && this.currentEditId !== null) {
      this.museumService.updateExhibition(this.currentEditId, payload);
    } else {
      this.museumService.createExhibition(payload);
    }
    this.closeModal();
  }
  deleteItem(id) {
    if (!id)
      return;
    if (confirm("\xBFEst\xE1s seguro de que deseas eliminar esta tem\xE1tica del museo?")) {
      this.museumService.deleteExhibition(id);
    }
  }
  static \u0275fac = function VirtualMuseumComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VirtualMuseumComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VirtualMuseumComponent, selectors: [["app-virtual-museum"]], viewQuery: function VirtualMuseumComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.fileInputElement = _t.first);
    }
  }, decls: 21, vars: 5, consts: [["fileInput", ""], [1, "py-5"], [1, "museum-container", "p-1"], [1, "museum-header"], [1, "toolbar"], ["type", "text", "placeholder", "Buscar tem\xE1tica o curador...", 1, "input-search", 3, "ngModelChange", "ngModel"], [1, "select-category", 3, "ngModelChange", "ngModel"], ["value", "Todas"], [3, "value"], [1, "btn", "btn-primary"], [1, "gallery-grid"], [1, "museum-card", "card", "bg-dark", "text-light", "border-secondary", "mb-4", "shadow-sm"], [1, "empty-state", "text-center", "py-5", "w-100"], [1, "modal-backdrop"], [1, "btn", "btn-primary", 3, "click"], [1, "card-image-wrapper", "position-relative", "overflow-hidden"], ["loading", "lazy", 1, "card-img-top", "object-fit-cover-style", 3, "src", "alt"], [1, "badge", "badge-warning", "position-absolute", "style-badge"], [1, "card-body", "d-flex", "flex-column"], [1, "h5", "font-weight-bold", "text-white", "mb-2"], [1, "curator", "small", "mb-2"], [1, "text-warning"], [1, "description", "small", "text-secondary", "mb-3", "text-truncate-2"], [1, "btn-group"], ["type", "button", "title", "Ir a la exposici\xF3n", 1, "btn", "btn-sm", "btn-warning", 3, "routerLink"], [1, "bi", "bi-sliders"], ["type", "button", "title", "Ir a la exposici\xF3n", 1, "btn", "btn-sm", "btn-light", 3, "routerLink"], [1, "bi", "bi-box-seam-fill"], ["type", "button", "title", "Editar", 1, "btn", "btn-sm", "btn-info", 3, "click"], [1, "bi", "bi-pencil-fill"], ["type", "button", "title", "Eliminar", 1, "btn", "btn-sm", "btn-danger", 3, "click"], [1, "bi", "bi-trash-fill"], [1, "text-muted", "h5", "font-italic"], [1, "modal-backdrop", 3, "click"], [1, "modal-card", 3, "click"], [3, "ngSubmit"], [1, "form-group"], ["type", "text", "name", "title", "required", "", "placeholder", "Ej: Arte Renacentista", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "category", "required", "", "placeholder", "Ej: Arte, Historia, Ciencia", 3, "ngModelChange", "ngModel"], ["type", "file", "accept", "image/*", 1, "file-input", 3, "change"], ["name", "detail", "rows", "3", "placeholder", "Resumen de la tem\xE1tica...", 3, "ngModelChange", "ngModel"], [1, "modal-actions"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "submit", 1, "btn", "btn-primary"]], template: function VirtualMuseumComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-navbar")(1, "div", 1);
      \u0275\u0275elementStart(2, "div", 2)(3, "header", 3)(4, "h1");
      \u0275\u0275text(5, "Museo Virtual Interactivo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p");
      \u0275\u0275text(7, "Plataforma para que cada usuario cure y organice sus propias salas tem\xE1ticas");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "section", 4)(9, "input", 5);
      \u0275\u0275listener("ngModelChange", function VirtualMuseumComponent_Template_input_ngModelChange_9_listener($event) {
        return ctx.onSearchChange($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "select", 6);
      \u0275\u0275listener("ngModelChange", function VirtualMuseumComponent_Template_select_ngModelChange_10_listener($event) {
        return ctx.selectedCategory.set($event);
      });
      \u0275\u0275elementStart(11, "option", 7);
      \u0275\u0275text(12, "Todas las Categor\xEDas");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(13, VirtualMuseumComponent_For_14_Template, 2, 2, "option", 8, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(15, VirtualMuseumComponent_Conditional_15_Template, 2, 0, "button", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "main", 10);
      \u0275\u0275repeaterCreate(17, VirtualMuseumComponent_For_18_Template, 20, 15, "article", 11, _forTrack0, false, VirtualMuseumComponent_ForEmpty_19_Template, 3, 0, "div", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(20, VirtualMuseumComponent_Conditional_20_Template, 27, 4, "div", 13);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275property("ngModel", ctx.searchTerm());
      \u0275\u0275advance();
      \u0275\u0275property("ngModel", ctx.selectedCategory());
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.categories());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.auth ? 15 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.filteredExhibitions());
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.showModal() ? 20 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, HttpClientModule, RouterModule, RouterLink, Navbar], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  font-family:\n    "Segoe UI",\n    Tahoma,\n    Geneva,\n    Verdana,\n    sans-serif;\n  min-height: 100vh;\n  padding: 20px;\n}\n.museum-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.museum-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 30px;\n  border-bottom: 1px solid #2d3748;\n  padding-bottom: 20px;\n}\n.museum-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  color: #38bdf8;\n  margin: 0 0 10px 0;\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 15px;\n  margin-bottom: 30px;\n  flex-wrap: wrap;\n}\n.input-search[_ngcontent-%COMP%], \n.select-category[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  background-color: #1e293b;\n  border: 1px solid #334155;\n  color: #fff;\n  border-radius: 6px;\n  outline: none;\n}\n.input-search[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 200px;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 10px 18px;\n  border: none;\n  border-radius: 6px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: #0284c7;\n  color: white;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background-color: #0369a1;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background-color: #475569;\n  color: white;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background-color: #334155;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background-color: #e11d48;\n  color: white;\n}\n.btn-danger[_ngcontent-%COMP%]:hover {\n  background-color: #be123c;\n}\n.gallery-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 25px;\n}\n.museum-card[_ngcontent-%COMP%] {\n  background-color: #1e293b;\n  border-radius: 10px;\n  overflow: hidden;\n  border: 1px solid #334155;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);\n}\n.card-image-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  height: 200px;\n}\n.card-image-wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  background-color: rgba(15, 23, 42, 0.85);\n  color: #38bdf8;\n  padding: 4px 10px;\n  border-radius: 12px;\n  font-size: 0.8rem;\n  border: 1px solid #38bdf8;\n}\n.card-content[_ngcontent-%COMP%] {\n  padding: 15px;\n  flex: 1;\n}\n.card-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  color: #f8fafc;\n}\n.curator[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #94a3b8;\n  margin-bottom: 10px;\n}\n.description[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #cbd5e1;\n  line-height: 1.4;\n}\n.card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  padding: 15px;\n  background-color: #0f172a;\n  border-top: 1px solid #334155;\n}\n.card-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 0.85rem;\n}\n.modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background-color: rgba(0, 0, 0, 0.75);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background-color: #1e293b;\n  padding: 25px;\n  border-radius: 12px;\n  width: 100%;\n  max-width: 500px;\n  border: 1px solid #475569;\n}\n.modal-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-top: 0;\n  color: #38bdf8;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 15px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 5px;\n  font-size: 0.85rem;\n  color: #94a3b8;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 8px 12px;\n  background-color: #0f172a;\n  border: 1px solid #334155;\n  color: white;\n  border-radius: 6px;\n  box-sizing: border-box;\n}\n.file-input[_ngcontent-%COMP%] {\n  background: transparent !important;\n  border: none !important;\n  padding: 0 !important;\n}\n.modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 20px;\n}\n.empty-state[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  text-align: center;\n  padding: 40px;\n  color: #64748b;\n}\n.style-badge[_ngcontent-%COMP%] {\n  top: 12px;\n  right: 12px;\n  font-size: 0.75rem;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n}\n.object-fit-cover-style[_ngcontent-%COMP%] {\n  object-fit: cover;\n  height: 220px;\n}\n.text-truncate-2[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/*# sourceMappingURL=exhibicion.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VirtualMuseumComponent, [{
    type: Component,
    args: [{ selector: "app-virtual-museum", standalone: true, imports: [CommonModule, FormsModule, HttpClientModule, RouterModule, Navbar], template: `
    <app-navbar></app-navbar>
    <div class="py-5"></div>

    <div class="museum-container p-1">
      <header class="museum-header">
        <h1>Museo Virtual Interactivo</h1>
        <p>Plataforma para que cada usuario cure y organice sus propias salas tem\xE1ticas</p>
      </header>

      <section class="toolbar">
        <input 
          type="text" 
          placeholder="Buscar tem\xE1tica o curador..." 
          [ngModel]="searchTerm()"
          (ngModelChange)="onSearchChange($event)"
          class="input-search"
        />
        
        <select [ngModel]="selectedCategory()" (ngModelChange)="selectedCategory.set($event)" class="select-category">
          <option value="Todas">Todas las Categor\xEDas</option>
          @for (cat of categories(); track cat) {
            <option [value]="cat">{{ cat }}</option>
          }
        </select>

        @if (auth) {
          <button class="btn btn-primary" (click)="openCreateModal()">
             Curar Nueva Sala
          </button>
        }
      </section>

     <main class="gallery-grid">
  @for (item of filteredExhibitions(); track (item._id || item.id || $index); let i = $index) {
    <article class="museum-card card bg-dark text-light border-secondary mb-4 shadow-sm">
      <div class="card-image-wrapper position-relative overflow-hidden">
        <img 
          [src]="item.imageUrl || ('https://picsum.photos/600/400?random=' + (item._id || item.id || i))" 
          [alt]="item.title"
          class="card-img-top object-fit-cover-style"
          loading="lazy"
        />
        <span class="badge badge-warning position-absolute style-badge">{{ item.category }}</span>
      </div>
      
      <div class="card-body d-flex flex-column">
        <h3 class="h5 font-weight-bold text-white mb-2">{{ item.title }}</h3>
        <p class="curator small mb-2">
          Curador: <strong class="text-warning">{{ item.curator }}</strong>
        </p>
        <p class="description small text-secondary mb-3 text-truncate-2">
          {{ item.detail }}
        </p>

        <div class="btn-group">
          <button 
            type="button" 
            class="btn btn-sm btn-warning" 
            title="Ir a la exposici\xF3n" 
            [routerLink]="['/exhibicion', item._id || item.id, item.user]">
            <!-- <span class="text-uppercase small mr-1">Explorar</span> -->
            <i class="bi bi-sliders"></i>
          </button>
          <button 
            type="button" 
            class="btn btn-sm btn-light" 
            title="Ir a la exposici\xF3n" 
            [routerLink]="['/model', item._id || item.id, item.user]">
            <!-- <span class="text-uppercase small mr-1">Game3d</span> -->
            <i class="bi bi-box-seam-fill"></i>
          </button>
          @if (auth && (item.curator === auth.name || auth.rol === '1')) {
            <button 
              type="button" 
              class="btn btn-sm btn-info" 
              title="Editar" 
              (click)="openEditModal(item)">
              <i class="bi bi-pencil-fill"></i>
            </button>

            <button 
              type="button" 
              class="btn btn-sm btn-danger" 
              title="Eliminar" 
              (click)="deleteItem(item._id || item.id)">
              <i class="bi bi-trash-fill"></i>
            </button>
          }
        </div>
      </div>
    </article>
  } @empty {
    <div class="empty-state text-center py-5 w-100">
      <p class="text-muted h5 font-italic">No se encontraron salas o tem\xE1ticas en este museo.</p>
    </div>
  }
</main>
      @if (showModal()) {
        <div class="modal-backdrop" (click)="closeModal()">
          <div class="modal-card" (click)="$event.stopPropagation()">
            <h2>{{ isEditing() ? 'Editar Sala del Museo' : 'Curar Nueva Sala' }}</h2>
            
            <form (ngSubmit)="saveExhibition()">
              <div class="form-group">
                <label>T\xEDtulo de la Sala / Tem\xE1tica</label>
                <input type="text" [(ngModel)]="formData.title" name="title" required placeholder="Ej: Arte Renacentista" />
              </div>

              <div class="form-group">
                <label>Categor\xEDa</label>
                <input type="text" [(ngModel)]="formData.category" name="category" required placeholder="Ej: Arte, Historia, Ciencia" />
              </div>

              <div class="form-group">
                <label>Subir imagen de la portada</label>
                <input #fileInput type="file" accept="image/*" (change)="onFileSelected($event)" class="file-input" />
              </div>

              <div class="form-group">
                <label>Descripci\xF3n curatorial</label>
                <textarea [(ngModel)]="formData.detail" name="detail" rows="3" placeholder="Resumen de la tem\xE1tica..."></textarea>
              </div>

              <div class="modal-actions">
                <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancelar</button>
                <button type="submit" class="btn btn-primary">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `, styles: ['/* angular:styles/component:css;fde6e9b3166bd6b435aa89b984e3fb83ea1b71f50472eaaf7aa24efbcea73dee;/home/linuxlite/WebMEAN/src/app/componentes/exhibicion.ts */\n:host {\n  display: block;\n  font-family:\n    "Segoe UI",\n    Tahoma,\n    Geneva,\n    Verdana,\n    sans-serif;\n  min-height: 100vh;\n  padding: 20px;\n}\n.museum-container {\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.museum-header {\n  text-align: center;\n  margin-bottom: 30px;\n  border-bottom: 1px solid #2d3748;\n  padding-bottom: 20px;\n}\n.museum-header h1 {\n  font-size: 2.5rem;\n  color: #38bdf8;\n  margin: 0 0 10px 0;\n}\n.toolbar {\n  display: flex;\n  gap: 15px;\n  margin-bottom: 30px;\n  flex-wrap: wrap;\n}\n.input-search,\n.select-category {\n  padding: 10px 14px;\n  background-color: #1e293b;\n  border: 1px solid #334155;\n  color: #fff;\n  border-radius: 6px;\n  outline: none;\n}\n.input-search {\n  flex: 1;\n  min-width: 200px;\n}\n.btn {\n  padding: 10px 18px;\n  border: none;\n  border-radius: 6px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-primary {\n  background-color: #0284c7;\n  color: white;\n}\n.btn-primary:hover {\n  background-color: #0369a1;\n}\n.btn-secondary {\n  background-color: #475569;\n  color: white;\n}\n.btn-secondary:hover {\n  background-color: #334155;\n}\n.btn-danger {\n  background-color: #e11d48;\n  color: white;\n}\n.btn-danger:hover {\n  background-color: #be123c;\n}\n.gallery-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 25px;\n}\n.museum-card {\n  background-color: #1e293b;\n  border-radius: 10px;\n  overflow: hidden;\n  border: 1px solid #334155;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);\n}\n.card-image-wrapper {\n  position: relative;\n  height: 200px;\n}\n.card-image-wrapper img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.badge {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  background-color: rgba(15, 23, 42, 0.85);\n  color: #38bdf8;\n  padding: 4px 10px;\n  border-radius: 12px;\n  font-size: 0.8rem;\n  border: 1px solid #38bdf8;\n}\n.card-content {\n  padding: 15px;\n  flex: 1;\n}\n.card-content h3 {\n  margin: 0 0 8px 0;\n  color: #f8fafc;\n}\n.curator {\n  font-size: 0.85rem;\n  color: #94a3b8;\n  margin-bottom: 10px;\n}\n.description {\n  font-size: 0.9rem;\n  color: #cbd5e1;\n  line-height: 1.4;\n}\n.card-actions {\n  display: flex;\n  gap: 10px;\n  padding: 15px;\n  background-color: #0f172a;\n  border-top: 1px solid #334155;\n}\n.card-actions .btn {\n  flex: 1;\n  font-size: 0.85rem;\n}\n.modal-backdrop {\n  position: fixed;\n  inset: 0;\n  background-color: rgba(0, 0, 0, 0.75);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n}\n.modal-card {\n  background-color: #1e293b;\n  padding: 25px;\n  border-radius: 12px;\n  width: 100%;\n  max-width: 500px;\n  border: 1px solid #475569;\n}\n.modal-card h2 {\n  margin-top: 0;\n  color: #38bdf8;\n}\n.form-group {\n  margin-bottom: 15px;\n}\n.form-group label {\n  display: block;\n  margin-bottom: 5px;\n  font-size: 0.85rem;\n  color: #94a3b8;\n}\n.form-group input,\n.form-group textarea {\n  width: 100%;\n  padding: 8px 12px;\n  background-color: #0f172a;\n  border: 1px solid #334155;\n  color: white;\n  border-radius: 6px;\n  box-sizing: border-box;\n}\n.file-input {\n  background: transparent !important;\n  border: none !important;\n  padding: 0 !important;\n}\n.modal-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 20px;\n}\n.empty-state {\n  grid-column: 1 / -1;\n  text-align: center;\n  padding: 40px;\n  color: #64748b;\n}\n.style-badge {\n  top: 12px;\n  right: 12px;\n  font-size: 0.75rem;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n}\n.object-fit-cover-style {\n  object-fit: cover;\n  height: 220px;\n}\n.text-truncate-2 {\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/*# sourceMappingURL=exhibicion.css.map */\n'] }]
  }], null, { fileInputElement: [{
    type: ViewChild,
    args: ["fileInput"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VirtualMuseumComponent, { className: "VirtualMuseumComponent", filePath: "src/app/componentes/exhibicion.ts", lineNumber: 313 });
})();
export {
  MuseumService,
  VirtualMuseumComponent
};
//# sourceMappingURL=chunk-FQ4EJD3Q.mjs.map
