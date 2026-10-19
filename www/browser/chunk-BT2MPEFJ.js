import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  RequiredValidator
} from "./chunk-OAEVIACX.js";
import {
  environment
} from "./chunk-5ESGTH3B.js";
import {
  Navbar
} from "./chunk-U3CDTOVP.js";
import "./chunk-DJCOHPHY.js";
import {
  Router,
  RouterLink,
  Title
} from "./chunk-PFU5G7MY.js";
import {
  HttpClient
} from "./chunk-MMWGUNZC.js";
import {
  CommonModule
} from "./chunk-6QD4DAAM.js";
import {
  Component,
  Input,
  ViewChild,
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
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-FXWIEX65.js";
import "./chunk-3WPM564S.js";

// src/app/componentes/curses.ts
var _c0 = ["fileInput"];
var _c1 = (a0) => ["/actualizacion", a0];
var _forTrack0 = ($index, $item) => $item._id || $index;
function CreateNoteComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function CreateNoteComponent_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openCreateModal());
    });
    \u0275\u0275element(1, "i", 9);
    \u0275\u0275elementEnd();
  }
}
function CreateNoteComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 10)(2, "div", 11)(3, "div", 12);
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "button", 13);
    \u0275\u0275listener("click", function CreateNoteComponent_Conditional_4_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 14)(7, "div", 15)(8, "label", 16);
    \u0275\u0275text(9, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 17);
    \u0275\u0275listener("ngModelChange", function CreateNoteComponent_Conditional_4_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.title.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 15)(12, "label", 16);
    \u0275\u0275text(13, "Contenido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "textarea", 18);
    \u0275\u0275listener("ngModelChange", function CreateNoteComponent_Conditional_4_Template_textarea_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.description.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "input", 19, 0);
    \u0275\u0275listener("change", function CreateNoteComponent_Conditional_4_Template_input_change_15_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "img", 20);
    \u0275\u0275listener("click", function CreateNoteComponent_Conditional_4_Template_img_click_17_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.triggerFileInput());
    })("error", function CreateNoteComponent_Conditional_4_Template_img_error_17_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleImageError($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 21)(19, "button", 22);
    \u0275\u0275listener("click", function CreateNoteComponent_Conditional_4_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveCourse());
    });
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 23);
    \u0275\u0275listener("click", function CreateNoteComponent_Conditional_4_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(22, "Cerrar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.updateOrCreate() === "create" ? "Crear Nuevo Curso" : "Actualizar Curso", " ");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngModel", ctx_r1.title());
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.description());
    \u0275\u0275advance(3);
    \u0275\u0275property("src", ctx_r1.photoSelected() || ctx_r1.staticUrl + "/collections/" + ctx_r1.foto(), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.updateOrCreate() === "create" ? "Crear nuevo curso" : "Actualizar curso", " ");
  }
}
function CreateNoteComponent_For_7_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 32);
    \u0275\u0275listener("click", function CreateNoteComponent_For_7_Conditional_9_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const $index_r7 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectCurseStorage(ctx_r1.curses()[$index_r7]));
    });
    \u0275\u0275element(1, "i", 33);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const message_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c1, message_r5.curses[0]._id));
  }
}
function CreateNoteComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 24)(2, "img", 25);
    \u0275\u0275listener("error", function CreateNoteComponent_For_7_Template_img_error_2_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleImageError($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 26)(4, "div", 27);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 28)(7, "button", 29);
    \u0275\u0275listener("click", function CreateNoteComponent_For_7_Template_button_click_7_listener() {
      const message_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteCurseGenerate(message_r5._id));
    });
    \u0275\u0275element(8, "i", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, CreateNoteComponent_For_7_Conditional_9_Template, 2, 3, "a", 31);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const message_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r1.staticUrl + "/collections/" + (message_r5.curses[0] == null ? null : message_r5.curses[0].img), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", message_r5.curses[0] == null ? null : message_r5.curses[0].title, " ");
    \u0275\u0275advance(4);
    \u0275\u0275conditional((message_r5.curses[0] == null ? null : message_r5.curses[0]._id) ? 9 : -1);
  }
}
function CreateNoteComponent_For_10_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "button", 39);
    \u0275\u0275listener("click", function CreateNoteComponent_For_10_Conditional_6_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r9);
      const message_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.generateCurse(message_r10._id, message_r10.description));
    });
    \u0275\u0275element(2, "i", 40);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.enableBtn());
  }
}
function CreateNoteComponent_For_10_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "a", 41);
    \u0275\u0275listener("click", function CreateNoteComponent_For_10_Conditional_7_Template_a_click_1_listener() {
      \u0275\u0275restoreView(_r11);
      const message_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectCurseStorage(message_r10));
    });
    \u0275\u0275element(2, "i", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 42);
    \u0275\u0275listener("click", function CreateNoteComponent_For_10_Conditional_7_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r11);
      const message_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteCurse(message_r10._id));
    });
    \u0275\u0275element(4, "i", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 42);
    \u0275\u0275listener("click", function CreateNoteComponent_For_10_Conditional_7_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r11);
      const message_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openUpdateModal(message_r10));
    });
    \u0275\u0275element(6, "i", 43);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const message_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c1, message_r10._id));
  }
}
function CreateNoteComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 34)(2, "img", 35);
    \u0275\u0275listener("error", function CreateNoteComponent_For_10_Template_img_error_2_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleImageError($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 36)(4, "div", 37);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, CreateNoteComponent_For_10_Conditional_6_Template, 3, 1, "div", 38);
    \u0275\u0275conditionalCreate(7, CreateNoteComponent_For_10_Conditional_7_Template, 7, 3, "div", 28);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const message_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r1.staticUrl + "/collections/" + message_r10.img, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", message_r10.title, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r1.currentUser == null ? null : ctx_r1.currentUser.rol) !== "1" ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r1.currentUser == null ? null : ctx_r1.currentUser.rol) === "1" ? 7 : -1);
  }
}
var CreateNoteComponent = class _CreateNoteComponent {
  http = inject(HttpClient);
  router = inject(Router);
  titleService = inject(Title);
  name;
  fileInput;
  // Variables de configuración de API
  apiUrl = `${environment.apiURL}/api`;
  staticUrl = `${environment.apiURL}`;
  fallbackImage = "/logo.svg";
  // Reactividad con Signals de Angular
  curses = signal([], ...ngDevMode ? [{ debugName: "curses" }] : []);
  generatedCurses = signal([], ...ngDevMode ? [{ debugName: "generatedCurses" }] : []);
  showModal = signal(false, ...ngDevMode ? [{ debugName: "showModal" }] : []);
  enableBtn = signal(false, ...ngDevMode ? [{ debugName: "enableBtn" }] : []);
  // Formulario
  title = signal("", ...ngDevMode ? [{ debugName: "title" }] : []);
  description = signal("", ...ngDevMode ? [{ debugName: "description" }] : []);
  idCurse = signal("", ...ngDevMode ? [{ debugName: "idCurse" }] : []);
  foto = signal("", ...ngDevMode ? [{ debugName: "foto" }] : []);
  photoSelected = signal(null, ...ngDevMode ? [{ debugName: "photoSelected" }] : []);
  selectedFile = null;
  updateOrCreate = signal("create", ...ngDevMode ? [{ debugName: "updateOrCreate" }] : []);
  ngOnInit() {
    if (this.name) {
      this.titleService.setTitle(`Page - ${this.name}`);
    }
    this.clearCurseStorage();
    this.loadCurses();
    if (this.currentUser) {
      this.loadGeneratedCurses();
    }
  }
  get currentUser() {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  }
  loadCurses() {
    this.http.get(`${this.apiUrl}/curses/cursosculqui/cursos`).subscribe({
      next: (data) => this.curses.set(data),
      error: (err) => console.error("Error al cargar cursos", err)
    });
  }
  loadGeneratedCurses() {
    const user = this.currentUser;
    if (!user?._id)
      return;
    this.http.get(`${this.apiUrl}/curses/Getgeneratecursosculqui/${user._id}/true`).subscribe({
      next: (data) => {
        this.enableBtn.set(false);
        this.generatedCurses.set(data);
      },
      error: (err) => console.error("Error al obtener cursos generados", err)
    });
  }
  openCreateModal() {
    this.title.set("");
    this.description.set("");
    this.photoSelected.set(null);
    this.selectedFile = null;
    this.updateOrCreate.set("create");
    this.showModal.set(true);
  }
  openUpdateModal(curse) {
    this.idCurse.set(curse._id);
    this.title.set(curse.title);
    this.description.set(curse.description);
    this.foto.set(curse.img || "");
    this.photoSelected.set(null);
    this.selectedFile = null;
    this.updateOrCreate.set("update");
    this.showModal.set(true);
  }
  closeModal() {
    this.showModal.set(false);
  }
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }
  onFileSelected(event) {
    const input = event.target;
    if (input.files?.[0]) {
      const file = input.files[0];
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => this.photoSelected.set(reader.result);
      reader.readAsDataURL(file);
    }
  }
  handleImageError(event) {
    const imgElement = event.target;
    imgElement.src = this.fallbackImage;
    imgElement.style.padding = "3px";
    imgElement.style.margin = "1px";
  }
  saveCourse() {
    if (this.updateOrCreate() === "create") {
      const authUser = this.currentUser;
      const payload = {
        title: this.title(),
        description: this.description(),
        type: "cursos",
        show: "true",
        ciclo: "1",
        mencion: "Artes",
        codigo: "WCW",
        credito: "355",
        year: String((/* @__PURE__ */ new Date()).getFullYear()),
        user: authUser?._id
      };
      this.http.post(`${this.apiUrl}/curses/cursosculqui`, payload).subscribe({
        next: () => {
          this.closeModal();
          this.loadCurses();
        },
        error: (err) => console.error(err)
      });
    } else {
      const formData = new FormData();
      if (this.selectedFile) {
        formData.append("img", this.selectedFile);
      }
      formData.append("description", this.description());
      formData.append("title", this.title());
      this.http.put(`${this.apiUrl}/curses/${this.idCurse()}`, formData).subscribe({
        next: () => {
          this.closeModal();
          this.loadCurses();
        },
        error: (err) => console.error(err)
      });
    }
  }
  generateCurse(idcurse, desc) {
    const authUser = this.currentUser;
    if (!authUser) {
      this.router.navigate(["/login"]);
      return;
    }
    this.enableBtn.set(true);
    const domain = authUser.email?.split("@")[1];
    if (domain === desc || desc === "free") {
      this.http.post(`${this.apiUrl}/curses/generatecursosculqui`, {
        user: authUser._id,
        curse: idcurse,
        type: "cursos"
      }).subscribe({
        next: () => this.loadGeneratedCurses(),
        error: (err) => {
          this.enableBtn.set(false);
          console.error(err);
        }
      });
    } else {
      this.enableBtn.set(false);
      alert("No puede agregarse a este curso");
    }
  }
  deleteCurse(noteId) {
    if (confirm("Deseas eliminar este curso?")) {
      this.http.delete(`${this.apiUrl}/curses/${noteId}`).subscribe({
        next: () => this.loadCurses()
      });
    }
  }
  deleteCurseGenerate(noteId) {
    if (confirm("Deseas eliminar este curso?")) {
      this.http.delete(`${this.apiUrl}/curses/generate/${noteId}`).subscribe({
        next: () => this.loadGeneratedCurses()
      });
    }
  }
  selectCurseStorage(curse) {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("curse", JSON.stringify(curse));
    }
  }
  clearCurseStorage() {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("idc");
      localStorage.removeItem("idcat");
      localStorage.removeItem("curse");
    }
  }
  static \u0275fac = function CreateNoteComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CreateNoteComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateNoteComponent, selectors: [["app-create-note"]], viewQuery: function CreateNoteComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.fileInput = _t.first);
    }
  }, inputs: { name: "name" }, decls: 11, vars: 4, consts: [["fileInput", ""], [1, "py-5"], [1, "container", "my-1"], [1, "btn", "w-100", "my-1"], ["tabindex", "-1", 1, "modal", "d-block", "tab-index-1", "bg-dark", "bg-opacity-50"], [1, "row", "justify-content-center", "align-items-stretch", "bg-info", "rounded", "my-2"], [1, "col-sm-12", "col-md-6", "col-lg-6", "col-xl-4", "p-2", "d-flex", "align-items-stretch"], [1, "row", "justify-content-center", "align-items-stretch", 2, "padding", ".1em"], [1, "btn", "w-100", "my-1", 3, "click"], [1, "bi", "bi-plus-lg", "text-primary", "fs-3"], [1, "modal-dialog"], [1, "modal-content"], [1, "modal-header", "fw-bold"], ["type", "button", 1, "btn-close", 3, "click"], [1, "modal-body"], [1, "card", "form-group", "mb-3", "p-2"], [1, "form-label", "text-start"], ["type", "text", "placeholder", "Nombre", "required", "", 1, "form-control", "border-0", "rounded-0", 3, "ngModelChange", "ngModel"], ["placeholder", "Contenido", "rows", "2", "required", "", 1, "form-control", "border-0", "rounded-0", 3, "ngModelChange", "ngModel"], ["type", "file", 1, "d-none", 3, "change"], ["alt", "Thumb", 1, "img-fluid", "border", "rounded", "style-pointer", 2, "cursor", "pointer", 3, "click", "error", "src"], [1, "modal-footer"], [1, "btn", "btn-info", 3, "click"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], [1, "p-1", "border", "rounded", "contenedor", "bg-white", "w-100", "h-100", "d-flex", "flex-column", "position-relative"], ["alt", "curso", 1, "image", "w-100", 2, "height", "220px", "object-fit", "cover", 3, "error", "src"], [1, "overlay-text", "d-flex", "flex-column", "justify-content-between", "h-100", "w-100", "p-2"], [1, "h5", "mb-2", "ffont", "text-center", "p-2"], [1, "btn-group", "w-100", "mt-auto"], ["type", "button", 1, "btn", "btn-outline-light", 3, "click"], [1, "bi", "bi-dash-circle", "text-danger", "fs-4"], [1, "btn", "btn-outline-light", 3, "routerLink"], [1, "btn", "btn-outline-light", 3, "click", "routerLink"], [1, "bi", "bi-arrows-angle-expand", "text-primary", "fs-4"], [1, "p-0", "m-0", "contenedor", "p-1", "card", "border", "border-info", "rounded", "w-100", "h-100", "d-flex", "flex-column", "position-relative"], ["alt", "curso cat\xE1logo", 1, "image", "w-100", "rounded", 2, "height", "220px", "object-fit", "cover", 3, "error", "src"], [1, "overlay-text", "d-flex", "flex-column", "justify-content-center", "h-100", "w-100", "p-2"], [1, "text-center", "h5"], [1, "w-100", "mt-auto"], ["type", "button", 1, "btn", "btn-outline-light", "w-100", 3, "click", "disabled"], [1, "bi", "bi-mortarboard-fill", "text-warning", "fs-3"], [1, "btn", "btn-outline-info", 3, "click", "routerLink"], ["type", "button", 1, "btn", "btn-outline-info", 3, "click"], [1, "bi", "bi-pencil", "text-warning", "fs-4"]], template: function CreateNoteComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-navbar")(1, "div", 1);
      \u0275\u0275elementStart(2, "div", 2);
      \u0275\u0275conditionalCreate(3, CreateNoteComponent_Conditional_3_Template, 2, 0, "button", 3);
      \u0275\u0275conditionalCreate(4, CreateNoteComponent_Conditional_4_Template, 23, 5, "div", 4);
      \u0275\u0275elementStart(5, "div", 5);
      \u0275\u0275repeaterCreate(6, CreateNoteComponent_For_7_Template, 10, 3, "div", 6, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 7);
      \u0275\u0275repeaterCreate(9, CreateNoteComponent_For_10_Template, 8, 4, "div", 6, _forTrack0);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275conditional((ctx.currentUser == null ? null : ctx.currentUser.rol) === "1" ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showModal() ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275styleProp("padding", ctx.generatedCurses().length > 0 ? ".1em" : "0");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.generatedCurses());
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.curses());
    }
  }, dependencies: [CommonModule, Navbar, FormsModule, DefaultValueAccessor, NgControlStatus, RequiredValidator, NgModel, RouterLink], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateNoteComponent, [{
    type: Component,
    args: [{
      selector: "app-create-note",
      standalone: true,
      imports: [CommonModule, Navbar, FormsModule, RouterLink],
      template: `
        <app-navbar></app-navbar>
    <div class="py-5"></div>

    <div class="container my-1">
      <!-- Bot\xF3n Crear Curso (Solo Rol 1) -->
      @if (currentUser?.rol === '1') {
        <button class="btn w-100 my-1" (click)="openCreateModal()">
          <i class="bi bi-plus-lg text-primary fs-3"></i>
        </button>
      }

      <!-- Modal Custom Bootstrap Native -->
      @if (showModal()) {
        <div class="modal d-block tab-index-1 bg-dark bg-opacity-50" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header fw-bold">
                {{ updateOrCreate() === 'create' ? 'Crear Nuevo Curso' : 'Actualizar Curso' }}
                <button type="button" class="btn-close" (click)="closeModal()"></button>
              </div>
              <div class="modal-body">
                <div class="card form-group mb-3 p-2">
                  <label class="form-label text-start">Nombre</label>
                  <input 
                    type="text" 
                    class="form-control border-0 rounded-0" 
                    placeholder="Nombre" 
                    [ngModel]="title()" 
                    (ngModelChange)="title.set($event)" 
                    required />
                </div>
                <div class="card form-group mb-3 p-2">
                  <label class="form-label text-start">Contenido</label>
                  <textarea 
                    class="form-control border-0 rounded-0" 
                    placeholder="Contenido" 
                    rows="2" 
                    [ngModel]="description()" 
                    (ngModelChange)="description.set($event)" 
                    required></textarea>
                </div>

                <input #fileInput type="file" class="d-none" (change)="onFileSelected($event)" />

                <img 
                  class="img-fluid border rounded style-pointer" 
                  [src]="photoSelected() || (staticUrl + '/collections/' + foto())" 
                  alt="Thumb" 
                  (click)="triggerFileInput()" 
                  (error)="handleImageError($event)"
                  style="cursor: pointer;" />
              </div>
              <div class="modal-footer">
                <button class="btn btn-info" (click)="saveCourse()">
                  {{ updateOrCreate() === 'create' ? 'Crear nuevo curso' : 'Actualizar curso' }}
                </button>
                <button type="button" class="btn btn-secondary" (click)="closeModal()">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Bloque: Cursos Generados -->
      <div class="row justify-content-center align-items-stretch bg-info rounded my-2" [style.padding]="generatedCurses().length > 0 ? '.1em' : '0'">
        @for (message of generatedCurses(); track message._id || $index) {
          <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 p-2 d-flex align-items-stretch">
            <div class="p-1 border rounded contenedor bg-white w-100 h-100 d-flex flex-column position-relative">
              <img 
                class="image w-100" 
                [src]="staticUrl + '/collections/' + message.curses[0]?.img" 
                (error)="handleImageError($event)"
                alt="curso" 
                style="height: 220px; object-fit: cover;" />

              <div class="overlay-text d-flex flex-column justify-content-between h-100 w-100 p-2">
                <div class="h5 mb-2 ffont text-center p-2" >
                  {{ message.curses[0]?.title }}
                </div>
                <div class="btn-group w-100 mt-auto">
                  <button type="button" class="btn btn-outline-light" (click)="deleteCurseGenerate(message._id)">
                    <i class="bi bi-dash-circle text-danger fs-4"></i>
                  </button>
                  @if (message.curses[0]?._id) {
                    <a 
                      class="btn btn-outline-light"                      
                      [routerLink]="['/actualizacion', message.curses[0]._id]"
                      (click)="selectCurseStorage(curses()[$index])">
                      <i class="bi bi-arrows-angle-expand text-primary fs-4"></i>
                    </a>
                  }
                </div>
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Bloque: Cat\xE1logo General de Cursos -->
      <div class="row justify-content-center align-items-stretch" style="padding: .1em;">
        @for (message of curses(); track message._id || $index) {
          <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 p-2 d-flex align-items-stretch">
            <div class="p-0 m-0 contenedor p-1 card border border-info rounded w-100 h-100 d-flex flex-column position-relative">
              <img 
                class="image w-100 rounded" 
                [src]="staticUrl + '/collections/' + message.img" 
                (error)="handleImageError($event)"
                alt="curso cat\xE1logo" 
                style="height: 220px; object-fit: cover;" />
                <!-- <div style="height: 520px; object-fit: cover;" class="image w-100 rounded">
                  <app-three-html-canvas></app-three-html-canvas>
                </div>
               -->
              <div class="overlay-text d-flex flex-column justify-content-center h-100 w-100 p-2">
                <div class="text-center h5">
                  {{ message.title }}
                  <!-- <br /> {{ message.usser?.[0]?.email || '' }} -->
                </div>

                @if (currentUser?.rol !== '1') {
                  <div class="w-100 mt-auto">
                    <button [disabled]="enableBtn()" type="button" class="btn btn-outline-light w-100" (click)="generateCurse(message._id, message.description)">
                      <i class="bi bi-mortarboard-fill text-warning fs-3"></i>
                    </button>
                  </div>
                }

                @if (currentUser?.rol === '1') {
                  <div class="btn-group w-100 mt-auto">
                    <a class="btn btn-outline-info" [routerLink]="['/actualizacion', message._id]" (click)="selectCurseStorage(message)">
                      <i class="bi bi-arrows-angle-expand text-primary fs-4"></i>
                    </a>
                    <button type="button" class="btn btn-outline-info" (click)="deleteCurse(message._id)">
                      <i class="bi bi-dash-circle text-danger fs-4"></i>
                    </button>
                    <button type="button" class="btn btn-outline-info" (click)="openUpdateModal(message)">
                      <i class="bi bi-pencil text-warning fs-4"></i>
                    </button>
                  </div>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
    }]
  }], null, { name: [{
    type: Input
  }], fileInput: [{
    type: ViewChild,
    args: ["fileInput"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateNoteComponent, { className: "CreateNoteComponent", filePath: "src/app/componentes/curses.ts", lineNumber: 177 });
})();
export {
  CreateNoteComponent
};
//# sourceMappingURL=chunk-BT2MPEFJ.js.map
