import {
  g
} from "./chunk-YC5JMNYG.js";
import {
  environment
} from "./chunk-5ESGTH3B.js";
import {
  MarkdownComponent,
  MarkdownModule
} from "./chunk-3QOIHUY2.js";
import {
  GLTFLoader
} from "./chunk-C3ORDXL6.js";
import {
  Navbar
} from "./chunk-U3CDTOVP.js";
import "./chunk-DJCOHPHY.js";
import {
  OrbitControls
} from "./chunk-TPI4OM5L.js";
import {
  ACESFilmicToneMapping,
  BoxGeometry,
  CameraHelper,
  Color,
  DirectionalLight,
  FogExp2,
  HemisphereLight,
  LinearFilter,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Raycaster,
  SRGBColorSpace,
  Scene,
  SpotLight,
  SpotLightHelper,
  TextureLoader,
  Vector2,
  Vector3,
  WebGLRenderer
} from "./chunk-ZUJZQ355.js";
import "./chunk-PFU5G7MY.js";
import {
  HttpClient
} from "./chunk-MMWGUNZC.js";
import {
  CommonModule
} from "./chunk-6QD4DAAM.js";
import {
  Component,
  NgZone,
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
  ɵɵviewQuerySignal
} from "./chunk-FXWIEX65.js";
import "./chunk-3WPM564S.js";

// node_modules/three/examples/jsm/renderers/CSS2DRenderer.js
var CSS2DObject = class extends Object3D {
  /**
   * Constructs a new CSS2D object.
   *
   * @param {HTMLElement} [element] - The DOM element.
   */
  constructor(element = document.createElement("div")) {
    super();
    this.isCSS2DObject = true;
    this.element = element;
    this.element.style.position = "absolute";
    this.element.style.userSelect = "none";
    this.element.setAttribute("draggable", false);
    this.center = new Vector2(0.5, 0.5);
    this.addEventListener("removed", function() {
      this.traverse(function(object) {
        if (object.element && object.element instanceof object.element.ownerDocument.defaultView.Element && object.element.parentNode !== null) {
          object.element.remove();
        }
      });
    });
  }
  copy(source, recursive) {
    super.copy(source, recursive);
    this.element = source.element.cloneNode(true);
    this.center = source.center;
    return this;
  }
};
var _vector = new Vector3();
var _viewMatrix = new Matrix4();
var _viewProjectionMatrix = new Matrix4();
var _a = new Vector3();
var _b = new Vector3();
var CSS2DRenderer = class {
  /**
   * Constructs a new CSS2D renderer.
   *
   * @param {CSS2DRenderer~Parameters} [parameters] - The parameters.
   */
  constructor(parameters = {}) {
    const _this = this;
    let _width, _height;
    let _widthHalf, _heightHalf;
    const cache = {
      objects: /* @__PURE__ */ new WeakMap()
    };
    const domElement = parameters.element !== void 0 ? parameters.element : document.createElement("div");
    domElement.style.overflow = "hidden";
    this.domElement = domElement;
    this.sortObjects = true;
    this.getSize = function() {
      return {
        width: _width,
        height: _height
      };
    };
    this.render = function(scene, camera) {
      if (scene.matrixWorldAutoUpdate === true) scene.updateMatrixWorld();
      if (camera.parent === null && camera.matrixWorldAutoUpdate === true) camera.updateMatrixWorld();
      _viewMatrix.copy(camera.matrixWorldInverse);
      _viewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, _viewMatrix);
      renderObject(scene, scene, camera);
      if (this.sortObjects) zOrder(scene);
    };
    this.setSize = function(width, height) {
      _width = width;
      _height = height;
      _widthHalf = _width / 2;
      _heightHalf = _height / 2;
      domElement.style.width = width + "px";
      domElement.style.height = height + "px";
    };
    function hideObject(object) {
      if (object.isCSS2DObject) object.element.style.display = "none";
      for (let i = 0, l = object.children.length; i < l; i++) {
        hideObject(object.children[i]);
      }
    }
    function renderObject(object, scene, camera) {
      if (object.visible === false) {
        hideObject(object);
        return;
      }
      if (object.isCSS2DObject) {
        _vector.setFromMatrixPosition(object.matrixWorld);
        _vector.applyMatrix4(_viewProjectionMatrix);
        const visible = _vector.z >= -1 && _vector.z <= 1 && object.layers.test(camera.layers) === true;
        const element = object.element;
        element.style.display = visible === true ? "" : "none";
        if (visible === true) {
          object.onBeforeRender(_this, scene, camera);
          element.style.transform = "translate(" + -100 * object.center.x + "%," + -100 * object.center.y + "%)translate(" + (_vector.x * _widthHalf + _widthHalf) + "px," + (-_vector.y * _heightHalf + _heightHalf) + "px)";
          if (element.parentNode !== domElement) {
            domElement.appendChild(element);
          }
          object.onAfterRender(_this, scene, camera);
        }
        const objectData = {
          distanceToCameraSquared: getDistanceToSquared(camera, object)
        };
        cache.objects.set(object, objectData);
      }
      for (let i = 0, l = object.children.length; i < l; i++) {
        renderObject(object.children[i], scene, camera);
      }
    }
    function getDistanceToSquared(object1, object2) {
      _a.setFromMatrixPosition(object1.matrixWorld);
      _b.setFromMatrixPosition(object2.matrixWorld);
      return _a.distanceToSquared(_b);
    }
    function filterAndFlatten(scene) {
      const result = [];
      scene.traverseVisible(function(object) {
        if (object.isCSS2DObject) result.push(object);
      });
      return result;
    }
    function zOrder(scene) {
      const sorted = filterAndFlatten(scene).sort(function(a, b) {
        if (a.renderOrder !== b.renderOrder) {
          return b.renderOrder - a.renderOrder;
        }
        const distanceA = cache.objects.get(a).distanceToCameraSquared;
        const distanceB = cache.objects.get(b).distanceToCameraSquared;
        return distanceA - distanceB;
      });
      const zMax = sorted.length;
      for (let i = 0, l = sorted.length; i < l; i++) {
        sorted[i].element.style.zIndex = zMax - i;
      }
    }
  }
};

// src/app/componentes/vector.ts
var _c0 = ["childCanvas"];
var _c1 = ["container"];
var _c2 = ["labelRendererContainer"];
function ChildScene_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7)(2, "div", 8)(3, "div", 9)(4, "h5", 10);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 11);
    \u0275\u0275element(7, "markdown", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 13)(9, "button", 14);
    \u0275\u0275listener("click", function ChildScene_Conditional_7_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeModal());
    });
    \u0275\u0275text(10, "Close");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.selectedNews().title || "News Details");
    \u0275\u0275advance(2);
    \u0275\u0275property("data", ctx_r2.selectedNews().description || ctx_r2.selectedNews().content || "No details available.");
  }
}
var ChildScene = class _ChildScene {
  canvasRef = viewChild.required("childCanvas");
  containerRef = viewChild.required("container");
  labelRendererContainerRef = viewChild.required("labelRendererContainer");
  ngZone = inject(NgZone);
  http = inject(HttpClient);
  scene;
  camera;
  renderer;
  labelRenderer;
  controls;
  spotLight;
  gui;
  animationFrameId;
  resizeObserver;
  raycaster = new Raycaster();
  mouse = new Vector2();
  newsMeshes = [];
  selectedNews = signal(null, ...ngDevMode ? [{ debugName: "selectedNews" }] : []);
  newsCount = signal(0, ...ngDevMode ? [{ debugName: "newsCount" }] : []);
  ngAfterViewInit() {
    if (typeof window !== "undefined") {
      this.initThree();
      this.fetchNewsAndCreateObjects();
      this.ngZone.runOutsideAngular(() => {
        this.animate();
      });
    }
  }
  initThree() {
    const canvas = this.canvasRef().nativeElement;
    const container = this.containerRef().nativeElement;
    const labelContainer = this.labelRendererContainerRef().nativeElement;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;
    this.scene = new Scene();
    this.scene.background = new Color(724761);
    this.scene.fog = new FogExp2(724761, 0.035);
    this.camera = new PerspectiveCamera(75, width / height, 0.1, 1e3);
    this.camera.position.set(-3, 2, 4);
    this.renderer = new WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(width, height);
    this.labelRenderer.domElement.style.position = "absolute";
    this.labelRenderer.domElement.style.top = "0px";
    this.labelRenderer.domElement.style.pointerEvents = "none";
    labelContainer.appendChild(this.labelRenderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 2;
    this.controls.maxDistance = 15;
    const loader = new TextureLoader().setPath("/");
    const filenames = ["disturb.jpg", "www1.svg", "www3.svg"];
    const textures = { none: null };
    for (let i = 0; i < filenames.length; i++) {
      const filename = filenames[i];
      const texture = loader.load(filename);
      texture.minFilter = LinearFilter;
      texture.magFilter = LinearFilter;
      texture.generateMipmaps = false;
      texture.colorSpace = SRGBColorSpace;
      textures[filename] = texture;
    }
    const hemisphereLight = new HemisphereLight(16772829, 1779259, 0.6);
    this.scene.add(hemisphereLight);
    this.spotLight = new SpotLight(16742178, 980);
    this.spotLight.name = "spotLight";
    this.spotLight.map = textures["disturb.jpg"];
    this.spotLight.position.set(4, 8, 4);
    this.spotLight.angle = Math.PI / 5;
    this.spotLight.penumbra = 0.8;
    this.spotLight.decay = 2;
    this.spotLight.distance = 25;
    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.width = 2048;
    this.spotLight.shadow.mapSize.height = 2048;
    this.spotLight.shadow.camera.near = 1;
    this.spotLight.shadow.camera.far = 15;
    this.spotLight.shadow.bias = -1e-3;
    this.scene.add(this.spotLight);
    const rimLight = new DirectionalLight(3377407, 2.5);
    rimLight.position.set(-6, 4, -5);
    this.scene.add(rimLight);
    const fillLight = new PointLight(16755285, 30, 10);
    fillLight.position.set(0, 1, 0);
    this.scene.add(fillLight);
    const slAny = this.spotLight;
    slAny.lightHelper = new SpotLightHelper(this.spotLight);
    slAny.lightHelper.visible = false;
    this.scene.add(slAny.lightHelper);
    slAny.shadowCameraHelper = new CameraHelper(this.spotLight.shadow.camera);
    slAny.shadowCameraHelper.visible = false;
    this.scene.add(slAny.shadowCameraHelper);
    const planeGeometry = new PlaneGeometry(30, 30);
    const planeMaterial = new MeshStandardMaterial({
      color: 461075,
      roughness: 0.7,
      metalness: 0.3
    });
    const floor = new Mesh(planeGeometry, planeMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.5;
    floor.receiveShadow = true;
    this.scene.add(floor);
    this.setupGUI(slAny, textures);
    this.resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: width2, height: height2 } = entry.contentRect;
        if (width2 > 0 && height2 > 0) {
          this.camera.aspect = width2 / height2;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(width2, height2);
          this.labelRenderer.setSize(width2, height2);
        }
      }
    });
    this.resizeObserver.observe(container);
  }
  setupGUI(slAny, textures) {
    this.gui = new g();
    const params = {
      map: textures["disturb.jpg"],
      color: this.spotLight.color.getHex(),
      intensity: this.spotLight.intensity,
      distance: this.spotLight.distance,
      angle: this.spotLight.angle,
      penumbra: this.spotLight.penumbra,
      decay: this.spotLight.decay,
      helpers: false
    };
    const folder = this.gui.addFolder("Iluminaci\xF3n & Texturas");
    folder.add(params, "map", textures).onChange((val) => {
      this.spotLight.map = val;
    });
    folder.addColor(params, "color").onChange((val) => {
      this.spotLight.color.setHex(val);
    });
    folder.add(params, "intensity", 0, 1500).onChange((val) => {
      this.spotLight.intensity = val;
    });
    folder.add(params, "angle", 0, Math.PI / 3).onChange((val) => {
      this.spotLight.angle = val;
    });
    folder.add(params, "penumbra", 0, 1).onChange((val) => {
      this.spotLight.penumbra = val;
    });
    folder.add(params, "helpers").onChange((val) => {
      slAny.lightHelper.visible = val;
      slAny.shadowCameraHelper.visible = val;
    });
    folder.open();
  }
  fetchNewsAndCreateObjects() {
    const loader = new GLTFLoader();
    loader.load("new.glb", (gltf) => {
      const centerModel = gltf.scene.clone();
      centerModel.position.set(0, 1, 0);
      centerModel.scale.set(4, 4, 4);
      centerModel.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            const material = child.material;
            if (material.isMeshStandardMaterial) {
              material.roughness = 0.25;
              material.metalness = 0.5;
            }
          }
        }
      });
      this.scene.add(centerModel);
      this.newsMeshes.push(centerModel);
      this.newsCount.set(this.newsMeshes.length);
    }, void 0, (error) => {
      console.error("Error loading central new.glb model:", error);
    });
    this.http.get(`${environment.apiURL}/api/links/news`).subscribe({
      next: (newsItems) => {
        if (!Array.isArray(newsItems))
          return;
        loader.load("new.glb", (gltf) => {
          const totalItems = newsItems.length;
          newsItems.forEach((news, index) => {
            const modelClone = gltf.scene.clone();
            const angle = index / totalItems * Math.PI * 2;
            const radius = 3.5;
            modelClone.position.x = Math.cos(angle) * radius;
            modelClone.position.y = 0;
            modelClone.position.z = Math.sin(angle) * radius;
            modelClone.scale.set(1, 1, 1);
            modelClone.traverse((child) => {
              child.userData = { newsData: news };
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.material) {
                  const material = child.material;
                  if (material.isMeshStandardMaterial) {
                    material.roughness = 0.2;
                    material.metalness = 0.3;
                  }
                }
              }
            });
            const titleText = news.title || `News ${index + 1}`;
            const p = document.createElement("div");
            p.className = "news-label";
            p.textContent = titleText;
            const cDiv = new CSS2DObject(p);
            cDiv.position.set(0, 1.2, 0);
            modelClone.add(cDiv);
            this.scene.add(modelClone);
            this.newsMeshes.push(modelClone);
          });
          this.newsCount.set(this.newsMeshes.length);
        }, void 0, (error) => {
          console.error("Error loading surrounding new.glb models:", error);
          this.createFallbackObjects(newsItems);
        });
      },
      error: (err) => {
        console.error("Failed to load news items from API", err);
        const fallbackNews = [{
          title: "Default News",
          description: "API could not be reached. **Please check your connection.**"
        }];
        this.createFallbackObjects(fallbackNews);
      }
    });
  }
  createFallbackObjects(newsItems) {
    const geometry = new BoxGeometry(0.8, 0.8, 0.8);
    const totalItems = newsItems.length;
    newsItems.forEach((news, index) => {
      const material = new MeshStandardMaterial({
        color: new Color(`hsl(${index * 360 / totalItems}, 80%, 60%)`),
        roughness: 0.2,
        metalness: 0.2
      });
      const mesh = new Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const angle = index / totalItems * Math.PI * 2;
      const radius = 3.5;
      mesh.position.x = Math.cos(angle) * radius;
      mesh.position.y = 0;
      mesh.position.z = Math.sin(angle) * radius;
      mesh.userData = { newsData: news };
      const titleText = news.title || `News ${index + 1}`;
      const p = document.createElement("div");
      p.className = "news-label";
      p.textContent = titleText;
      const cDiv = new CSS2DObject(p);
      cDiv.position.set(0, 0.8, 0);
      mesh.add(cDiv);
      this.scene.add(mesh);
      this.newsMeshes.push(mesh);
    });
    this.newsCount.set(this.newsMeshes.length);
  }
  onCanvasClick(event) {
    const canvas = this.canvasRef().nativeElement;
    const rect = canvas.getBoundingClientRect();
    this.mouse.x = (event.clientX - rect.left) / rect.width * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.newsMeshes, true);
    if (intersects.length > 0) {
      let currentObj = intersects[0].object;
      let newsData = null;
      while (currentObj) {
        if (currentObj.userData && currentObj.userData["newsData"]) {
          newsData = currentObj.userData["newsData"];
          break;
        }
        currentObj = currentObj.parent;
      }
      if (newsData) {
        this.ngZone.run(() => {
          this.selectedNews.set(newsData);
        });
      }
    }
  }
  closeModal() {
    this.selectedNews.set(null);
  }
  animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    this.newsMeshes.forEach((mesh, index) => {
      mesh.rotation.x += 3e-3 * (index + 1);
      mesh.rotation.y += 7e-3 * (index + 1);
    });
    const slAny = this.spotLight;
    if (slAny.lightHelper) {
      slAny.lightHelper.update();
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  };
  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.gui) {
      this.gui.destroy();
    }
    this.controls?.dispose();
    this.renderer?.dispose();
  }
  static \u0275fac = function ChildScene_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChildScene)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChildScene, selectors: [["app-child-scene"]], viewQuery: function ChildScene_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.canvasRef, _c0, 5)(ctx.containerRef, _c1, 5)(ctx.labelRendererContainerRef, _c2, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(3);
    }
  }, decls: 8, vars: 1, consts: [["container", ""], ["childCanvas", ""], ["labelRendererContainer", ""], [1, "child-container"], [1, "child-canvas", 3, "click"], [1, "label-renderer-container"], ["tabindex", "-1", "role", "dialog", 1, "modal", "fade", "show", "d-block", 2, "background", "rgba(0, 0, 0, 0.6)"], [1, "modal-dialog", "modal-dialog-centered", "modal-dialog-scrollable"], [1, "modal-content"], [1, "modal-header"], [1, "modal-title"], [1, "modal-body"], [3, "data"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-primary", 3, "click"]], template: function ChildScene_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 3, 0);
      \u0275\u0275element(2, "app-navbar");
      \u0275\u0275elementStart(3, "canvas", 4, 1);
      \u0275\u0275listener("click", function ChildScene_Template_canvas_click_3_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onCanvasClick($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(5, "div", 5, 2);
      \u0275\u0275conditionalCreate(7, ChildScene_Conditional_7_Template, 11, 2, "div", 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.selectedNews() ? 7 : -1);
    }
  }, dependencies: [Navbar, CommonModule, MarkdownModule, MarkdownComponent], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n}\n.child-container[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100vh;\n  position: relative;\n  overflow: hidden;\n}\n.child-canvas[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: block;\n  cursor: pointer;\n}\n.label-renderer-container[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  overflow: hidden;\n}\n  .news-label {\n  background: rgba(0, 0, 0, 0.75);\n  color: #ffffff;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 12px;\n  font-family: sans-serif;\n  white-space: nowrap;\n  pointer-events: none;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);\n  margin-top: -30px;\n  transition: opacity 0.2s ease;\n}\n[_nghost-%COMP%]     .lil-gui {\n  --background-color: rgba(22, 33, 62, 0.9);\n  --text-color: #fff;\n  font-family:\n    "Segoe UI",\n    Tahoma,\n    Geneva,\n    Verdana,\n    sans-serif;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);\n  margin-top: calc(60px + 1em);\n}\n/*# sourceMappingURL=vector.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChildScene, [{
    type: Component,
    args: [{ selector: "app-child-scene", standalone: true, imports: [Navbar, CommonModule, MarkdownModule], template: `
    <div class="child-container" #container>
      <app-navbar></app-navbar>
      <canvas #childCanvas class="child-canvas" (click)="onCanvasClick($event)"></canvas>
      <div #labelRendererContainer class="label-renderer-container"></div>

      <!-- Bootstrap 5 Modal -->
      @if (selectedNews()) {
        <div class="modal fade show d-block" tabindex="-1" style="background: rgba(0, 0, 0, 0.6);" role="dialog">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{ selectedNews().title || 'News Details' }}</h5>
              </div>
              <div class="modal-body">
                <markdown [data]="selectedNews().description || selectedNews().content || 'No details available.'"></markdown>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" (click)="closeModal()">Close</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `, styles: ['/* angular:styles/component:css;e5c34bf65f651c5d3179620bf1904ec255fce155c96dd4b2087ced5b2484cada;/home/linuxlite/WebMEAN/src/app/componentes/vector.ts */\n:host {\n  display: block;\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n}\n.child-container {\n  width: 100%;\n  height: 100vh;\n  position: relative;\n  overflow: hidden;\n}\n.child-canvas {\n  width: 100%;\n  height: 100%;\n  display: block;\n  cursor: pointer;\n}\n.label-renderer-container {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  overflow: hidden;\n}\n::ng-deep .news-label {\n  background: rgba(0, 0, 0, 0.75);\n  color: #ffffff;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 12px;\n  font-family: sans-serif;\n  white-space: nowrap;\n  pointer-events: none;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);\n  margin-top: -30px;\n  transition: opacity 0.2s ease;\n}\n:host ::ng-deep .lil-gui {\n  --background-color: rgba(22, 33, 62, 0.9);\n  --text-color: #fff;\n  font-family:\n    "Segoe UI",\n    Tahoma,\n    Geneva,\n    Verdana,\n    sans-serif;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);\n  margin-top: calc(60px + 1em);\n}\n/*# sourceMappingURL=vector.css.map */\n'] }]
  }], null, { canvasRef: [{ type: ViewChild, args: ["childCanvas", { isSignal: true }] }], containerRef: [{ type: ViewChild, args: ["container", { isSignal: true }] }], labelRendererContainerRef: [{ type: ViewChild, args: ["labelRendererContainer", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChildScene, { className: "ChildScene", filePath: "src/app/componentes/vector.ts", lineNumber: 95 });
})();
export {
  ChildScene
};
//# sourceMappingURL=chunk-FYZ77GNB.js.map
