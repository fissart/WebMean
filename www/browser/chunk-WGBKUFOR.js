import {
  RoomEnvironment
} from "./chunk-FUFS4GQK.js";
import {
  OrbitControls
} from "./chunk-TPI4OM5L.js";
import {
  ACESFilmicToneMapping,
  AmbientLight,
  BoxGeometry,
  CanvasTexture,
  DirectionalLight,
  LinearFilter,
  LinearMipmapLinearFilter,
  Matrix3,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PMREMGenerator,
  PerspectiveCamera,
  PointLight,
  Quaternion,
  Raycaster,
  RepeatWrapping,
  SRGBColorSpace,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer
} from "./chunk-ZUJZQ355.js";
import {
  Router
} from "./chunk-PFU5G7MY.js";
import {
  CommonModule,
  NgIf
} from "./chunk-6QD4DAAM.js";
import {
  Component,
  NgZone,
  ViewChild,
  effect,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-FXWIEX65.js";

// node_modules/three/examples/jsm/geometries/RoundedBoxGeometry.js
var _tempNormal = new Vector3();
function getUv(faceDirVector, normal, uvAxis, projectionAxis, radius, sideLength) {
  const totArcLength = 2 * Math.PI * radius / 4;
  const centerLength = Math.max(sideLength - 2 * radius, 0);
  const halfArc = Math.PI / 4;
  _tempNormal.copy(normal);
  _tempNormal[projectionAxis] = 0;
  _tempNormal.normalize();
  const arcUvRatio = 0.5 * totArcLength / (totArcLength + centerLength);
  const arcAngleRatio = 1 - _tempNormal.angleTo(faceDirVector) / halfArc;
  if (Math.sign(_tempNormal[uvAxis]) === 1) {
    return arcAngleRatio * arcUvRatio;
  } else {
    const lenUv = centerLength / (totArcLength + centerLength);
    return lenUv + arcUvRatio + arcUvRatio * (1 - arcAngleRatio);
  }
}
var RoundedBoxGeometry = class _RoundedBoxGeometry extends BoxGeometry {
  /**
   * Constructs a new rounded box geometry.
   *
   * @param {number} [width=1] - The width. That is, the length of the edges parallel to the X axis.
   * @param {number} [height=1] - The height. That is, the length of the edges parallel to the Y axis.
   * @param {number} [depth=1] - The depth. That is, the length of the edges parallel to the Z axis.
   * @param {number} [segments=2] - Number of segments that form the rounded corners.
   * @param {number} [radius=0.1] - The radius of the rounded corners.
   */
  constructor(width = 1, height = 1, depth = 1, segments = 2, radius = 0.1) {
    const totalSegments = segments * 2 + 1;
    radius = Math.min(width / 2, height / 2, depth / 2, radius);
    super(1, 1, 1, totalSegments, totalSegments, totalSegments);
    this.type = "RoundedBoxGeometry";
    this.parameters = {
      width,
      height,
      depth,
      segments,
      radius
    };
    if (totalSegments === 1) return;
    const geometry2 = this.toNonIndexed();
    this.index = null;
    this.attributes.position = geometry2.attributes.position;
    this.attributes.normal = geometry2.attributes.normal;
    this.attributes.uv = geometry2.attributes.uv;
    const position = new Vector3();
    const normal = new Vector3();
    const box = new Vector3(width, height, depth).divideScalar(2).subScalar(radius);
    const positions = this.attributes.position.array;
    const normals = this.attributes.normal.array;
    const uvs = this.attributes.uv.array;
    const faceTris = positions.length / 6;
    const faceDirVector = new Vector3();
    const halfSegmentSize = 0.5 / totalSegments;
    for (let i = 0, j = 0; i < positions.length; i += 3, j += 2) {
      position.fromArray(positions, i);
      normal.copy(position);
      normal.x -= Math.sign(normal.x) * halfSegmentSize;
      normal.y -= Math.sign(normal.y) * halfSegmentSize;
      normal.z -= Math.sign(normal.z) * halfSegmentSize;
      normal.normalize();
      positions[i + 0] = box.x * Math.sign(position.x) + normal.x * radius;
      positions[i + 1] = box.y * Math.sign(position.y) + normal.y * radius;
      positions[i + 2] = box.z * Math.sign(position.z) + normal.z * radius;
      normals[i + 0] = normal.x;
      normals[i + 1] = normal.y;
      normals[i + 2] = normal.z;
      const side = Math.floor(i / faceTris);
      switch (side) {
        case 0:
          faceDirVector.set(1, 0, 0);
          uvs[j + 0] = getUv(faceDirVector, normal, "z", "y", radius, depth);
          uvs[j + 1] = 1 - getUv(faceDirVector, normal, "y", "z", radius, height);
          break;
        case 1:
          faceDirVector.set(-1, 0, 0);
          uvs[j + 0] = 1 - getUv(faceDirVector, normal, "z", "y", radius, depth);
          uvs[j + 1] = 1 - getUv(faceDirVector, normal, "y", "z", radius, height);
          break;
        case 2:
          faceDirVector.set(0, 1, 0);
          uvs[j + 0] = 1 - getUv(faceDirVector, normal, "x", "z", radius, width);
          uvs[j + 1] = getUv(faceDirVector, normal, "z", "x", radius, depth);
          break;
        case 3:
          faceDirVector.set(0, -1, 0);
          uvs[j + 0] = 1 - getUv(faceDirVector, normal, "x", "z", radius, width);
          uvs[j + 1] = 1 - getUv(faceDirVector, normal, "z", "x", radius, depth);
          break;
        case 4:
          faceDirVector.set(0, 0, 1);
          uvs[j + 0] = 1 - getUv(faceDirVector, normal, "x", "y", radius, width);
          uvs[j + 1] = 1 - getUv(faceDirVector, normal, "y", "x", radius, height);
          break;
        case 5:
          faceDirVector.set(0, 0, -1);
          uvs[j + 0] = getUv(faceDirVector, normal, "x", "y", radius, width);
          uvs[j + 1] = 1 - getUv(faceDirVector, normal, "y", "x", radius, height);
          break;
      }
    }
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @returns {RoundedBoxGeometry} A new instance.
   */
  static fromJSON(data) {
    return new _RoundedBoxGeometry(
      data.width,
      data.height,
      data.depth,
      data.segments,
      data.radius
    );
  }
};

// node_modules/three/examples/jsm/renderers/CSS3DRenderer.js
var _position = new Vector3();
var _quaternion = new Quaternion();
var _scale = new Vector3();
var CSS3DObject = class extends Object3D {
  /**
   * Constructs a new CSS3D object.
   *
   * @param {HTMLElement} [element] - The DOM element.
   */
  constructor(element = document.createElement("div")) {
    super();
    this.isCSS3DObject = true;
    this.element = element;
    this.element.style.position = "absolute";
    this.element.style.pointerEvents = "auto";
    this.element.style.userSelect = "none";
    this.element.setAttribute("draggable", false);
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
    return this;
  }
};
var _matrix = new Matrix4();
var _matrix2 = new Matrix4();
var CSS3DRenderer = class {
  /**
   * Constructs a new CSS3D renderer.
   *
   * @param {CSS3DRenderer~Parameters} [parameters] - The parameters.
   */
  constructor(parameters = {}) {
    const _this = this;
    let _width, _height;
    let _widthHalf, _heightHalf;
    const cache = {
      camera: { style: "" },
      objects: /* @__PURE__ */ new WeakMap()
    };
    const domElement = parameters.element !== void 0 ? parameters.element : document.createElement("div");
    domElement.style.overflow = "hidden";
    this.domElement = domElement;
    const viewElement = document.createElement("div");
    viewElement.style.transformOrigin = "0 0";
    viewElement.style.pointerEvents = "none";
    domElement.appendChild(viewElement);
    const cameraElement = document.createElement("div");
    cameraElement.style.transformStyle = "preserve-3d";
    viewElement.appendChild(cameraElement);
    this.getSize = function() {
      return {
        width: _width,
        height: _height
      };
    };
    this.render = function(scene, camera) {
      const fov = camera.projectionMatrix.elements[5] * _heightHalf;
      if (camera.view && camera.view.enabled) {
        viewElement.style.transform = `translate( ${-camera.view.offsetX * (_width / camera.view.width)}px, ${-camera.view.offsetY * (_height / camera.view.height)}px )`;
        viewElement.style.transform += `scale( ${camera.view.fullWidth / camera.view.width}, ${camera.view.fullHeight / camera.view.height} )`;
      } else {
        viewElement.style.transform = "";
      }
      if (scene.matrixWorldAutoUpdate === true) scene.updateMatrixWorld();
      if (camera.parent === null && camera.matrixWorldAutoUpdate === true) camera.updateMatrixWorld();
      let tx, ty;
      if (camera.isOrthographicCamera) {
        tx = -(camera.right + camera.left) / 2;
        ty = (camera.top + camera.bottom) / 2;
      }
      const scaleByViewOffset = camera.view && camera.view.enabled ? camera.view.height / camera.view.fullHeight : 1;
      const cameraCSSMatrix = camera.isOrthographicCamera ? `scale( ${scaleByViewOffset} )scale(` + fov + ")translate(" + epsilon(tx) + "px," + epsilon(ty) + "px)" + getCameraCSSMatrix(camera.matrixWorldInverse) : `scale( ${scaleByViewOffset} )translateZ(` + fov + "px)" + getCameraCSSMatrix(camera.matrixWorldInverse);
      const perspective = camera.isPerspectiveCamera ? "perspective(" + fov + "px) " : "";
      const style = perspective + cameraCSSMatrix + "translate(" + _widthHalf + "px," + _heightHalf + "px)";
      if (cache.camera.style !== style) {
        cameraElement.style.transform = style;
        cache.camera.style = style;
      }
      renderObject(scene, scene, camera, cameraCSSMatrix);
    };
    this.setSize = function(width, height) {
      _width = width;
      _height = height;
      _widthHalf = _width / 2;
      _heightHalf = _height / 2;
      domElement.style.width = width + "px";
      domElement.style.height = height + "px";
      viewElement.style.width = width + "px";
      viewElement.style.height = height + "px";
      cameraElement.style.width = width + "px";
      cameraElement.style.height = height + "px";
    };
    function epsilon(value) {
      return Math.abs(value) < 1e-10 ? 0 : value;
    }
    function getCameraCSSMatrix(matrix) {
      const elements = matrix.elements;
      return "matrix3d(" + epsilon(elements[0]) + "," + epsilon(-elements[1]) + "," + epsilon(elements[2]) + "," + epsilon(elements[3]) + "," + epsilon(elements[4]) + "," + epsilon(-elements[5]) + "," + epsilon(elements[6]) + "," + epsilon(elements[7]) + "," + epsilon(elements[8]) + "," + epsilon(-elements[9]) + "," + epsilon(elements[10]) + "," + epsilon(elements[11]) + "," + epsilon(elements[12]) + "," + epsilon(-elements[13]) + "," + epsilon(elements[14]) + "," + epsilon(elements[15]) + ")";
    }
    function getObjectCSSMatrix(matrix) {
      const elements = matrix.elements;
      const matrix3d = "matrix3d(" + epsilon(elements[0]) + "," + epsilon(elements[1]) + "," + epsilon(elements[2]) + "," + epsilon(elements[3]) + "," + epsilon(-elements[4]) + "," + epsilon(-elements[5]) + "," + epsilon(-elements[6]) + "," + epsilon(-elements[7]) + "," + epsilon(elements[8]) + "," + epsilon(elements[9]) + "," + epsilon(elements[10]) + "," + epsilon(elements[11]) + "," + epsilon(elements[12]) + "," + epsilon(elements[13]) + "," + epsilon(elements[14]) + "," + epsilon(elements[15]) + ")";
      return "translate(-50%,-50%)" + matrix3d;
    }
    function hideObject(object) {
      if (object.isCSS3DObject) object.element.style.display = "none";
      for (let i = 0, l = object.children.length; i < l; i++) {
        hideObject(object.children[i]);
      }
    }
    function renderObject(object, scene, camera, cameraCSSMatrix) {
      if (object.visible === false) {
        hideObject(object);
        return;
      }
      if (object.isCSS3DObject) {
        const visible = object.layers.test(camera.layers) === true;
        const element = object.element;
        element.style.display = visible === true ? "" : "none";
        if (visible === true) {
          object.onBeforeRender(_this, scene, camera);
          let style;
          if (object.isCSS3DSprite) {
            _matrix.copy(camera.matrixWorldInverse);
            _matrix.transpose();
            if (object.rotation2D !== 0) _matrix.multiply(_matrix2.makeRotationZ(object.rotation2D));
            object.matrixWorld.decompose(_position, _quaternion, _scale);
            _matrix.setPosition(_position);
            _matrix.scale(_scale);
            _matrix.elements[3] = 0;
            _matrix.elements[7] = 0;
            _matrix.elements[11] = 0;
            _matrix.elements[15] = 1;
            style = getObjectCSSMatrix(_matrix);
          } else {
            style = getObjectCSSMatrix(object.matrixWorld);
          }
          const cachedObject = cache.objects.get(object);
          if (cachedObject === void 0 || cachedObject.style !== style) {
            element.style.transform = style;
            const objectData = { style };
            cache.objects.set(object, objectData);
          }
          if (element.parentNode !== cameraElement) {
            cameraElement.appendChild(element);
          }
          object.onAfterRender(_this, scene, camera);
        }
      }
      for (let i = 0, l = object.children.length; i < l; i++) {
        renderObject(object.children[i], scene, camera, cameraCSSMatrix);
      }
    }
  }
};

// src/app/componentes/logomodel3d.ts
var _c0 = ["rendererContainer"];
function ThreeHtmlCanvasComponent_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function ThreeHtmlCanvasComponent_button_2_Template_button_click_0_listener($event) {
      const btn_r3 = \u0275\u0275restoreView(_r2).ngIf;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onButtonClick($event, btn_r3.path));
    });
    \u0275\u0275element(1, "i", 7);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const btn_r3 = ctx.ngIf;
    \u0275\u0275styleProp("left", btn_r3.x, "px")("top", btn_r3.y, "px");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", btn_r3.label, " ");
  }
}
var ThreeHtmlCanvasComponent = class _ThreeHtmlCanvasComponent {
  containerRef;
  ngZone = inject(NgZone);
  router = inject(Router);
  imageSrc = signal("/www1.svg", ...ngDevMode ? [{ debugName: "imageSrc" }] : []);
  svgIndex = 1;
  camera;
  scene;
  renderer;
  mesh;
  controls;
  material;
  pmremGenerator;
  resizeObserver;
  cssRenderer;
  // Utilidades para raycasting y posicionamiento de botones
  raycaster = new Raycaster();
  mouse = new Vector2();
  hoveredButtonData = null;
  currentIntersectedRoute = null;
  constructor() {
    effect(() => {
      const src = this.imageSrc();
      if (this.material) {
        this.updateTextureFromUrl(src);
      }
    });
  }
  ngOnInit() {
    const today = (/* @__PURE__ */ new Date()).getDay();
    this.svgIndex = today === 0 ? 7 : today;
    this.imageSrc.set(`/www${this.svgIndex}.svg`);
  }
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.initThree();
      this.setupResizeObserver();
    });
  }
  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.controls) {
      this.controls.dispose();
    }
    if (this.pmremGenerator) {
      this.pmremGenerator.dispose();
    }
    if (this.renderer) {
      this.renderer.setAnimationLoop(null);
      this.renderer.dispose();
      this.renderer.domElement.remove();
    }
  }
  initThree() {
    const container = this.containerRef.nativeElement;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;
    this.cssRenderer = new CSS3DRenderer();
    this.cssRenderer.setSize(width, height);
    this.cssRenderer.domElement.style.position = "absolute";
    this.cssRenderer.domElement.style.top = "0";
    this.cssRenderer.domElement.style.pointerEvents = "none";
    container.appendChild(this.cssRenderer.domElement);
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.3;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height, false);
    container.appendChild(this.renderer.domElement);
    this.camera = new PerspectiveCamera(50, width / height, 1, 2e3);
    this.camera.position.z = 395;
    this.scene = new Scene();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = true;
    this.controls.enablePan = false;
    this.pmremGenerator = new PMREMGenerator(this.renderer);
    const roomEnv = new RoomEnvironment();
    const envTexture = this.pmremGenerator.fromScene(roomEnv, 0.03).texture;
    this.scene.environment = envTexture;
    const ambientLight = new AmbientLight(16777215, 0.6);
    this.scene.add(ambientLight);
    const mainLight = new DirectionalLight(3718648, 3.5);
    mainLight.position.set(300, 400, 500);
    this.scene.add(mainLight);
    const rimLight = new DirectionalLight(8490232, 2.5);
    rimLight.position.set(-300, -200, -300);
    this.scene.add(rimLight);
    const pointLight = new PointLight(16777215, 2, 800);
    pointLight.position.set(0, 0, 400);
    this.scene.add(pointLight);
    const geometry = new RoundedBoxGeometry(200, 200, 200, 12, 12);
    this.material = new MeshStandardMaterial({
      color: 16777215,
      // <--- Color de fondo del cubo (Cambiar por ej. a 0xf8fafc para un gris muy claro o 0x0f172a para oscuro)
      // transparent: true,
      opacity: 1,
      roughness: 0.15,
      metalness: 0.25,
      envMapIntensity: 1.8
    });
    this.mesh = new Mesh(geometry, this.material);
    this.scene.add(this.mesh);
    const htmlDiv = document.createElement("div");
    htmlDiv.className = "face-html-content";
    htmlDiv.innerHTML = `
      <div class="bg-info" style="background: white; padding: 20px; border-radius: 8px; width: 160px; text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
        <h3 style="margin-bottom: 10px; color: #333;">ESFA FGPA</h3>
        <button class="btn btn-info dynamic-btn" style="background: #7079c9ff; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">Tr\xE1mite</button>
      </div>
    `;
    const dynamicBtn = htmlDiv.querySelector(".dynamic-btn");
    if (dynamicBtn) {
      dynamicBtn.addEventListener("click", () => {
        this.ngZone.run(() => {
          this.router.navigate(["/tramite"]);
        });
      });
    }
    const cssObject = new CSS3DObject(htmlDiv);
    cssObject.position.set(0, 0, 100);
    cssObject.scale.set(1, 1, 1);
    this.scene.add(cssObject);
    this.updateTextureFromUrl(this.imageSrc());
    this.renderer.setAnimationLoop(() => this.animate());
  }
  setupResizeObserver() {
    const container = this.containerRef.nativeElement;
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          this.resizeRendererToContainer(width, height);
        }
      }
    });
    this.resizeObserver.observe(container);
  }
  resizeRendererToContainer(width, height) {
    if (!this.renderer || !this.camera)
      return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    if (this.cssRenderer) {
      this.cssRenderer.setSize(width, height);
    }
  }
  updateTextureFromUrl(url) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 2048;
      canvas.height = 2048;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const padding = 256;
        ctx.drawImage(img, padding, padding, canvas.width - padding * 2, canvas.height - padding * 2);
      }
      const texture = new CanvasTexture(canvas);
      texture.colorSpace = SRGBColorSpace;
      texture.minFilter = LinearMipmapLinearFilter;
      texture.magFilter = LinearFilter;
      texture.generateMipmaps = true;
      if (this.renderer) {
        texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
      }
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(-1, -1);
      texture.offset.set(1, 1);
      if (this.material.map)
        this.material.map.dispose();
      this.material.map = texture;
      this.material.needsUpdate = true;
    };
    img.onerror = () => {
      this.loadFallbackCanvas();
    };
  }
  loadFallbackCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#2563eb";
      ctx.font = "bold 120px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Contenido Adaptado", canvas.width / 2, canvas.height / 2);
    }
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    texture.minFilter = LinearMipmapLinearFilter;
    texture.magFilter = LinearFilter;
    texture.generateMipmaps = true;
    if (this.renderer) {
      texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
    }
    texture.repeat.set(-1, 1);
    texture.offset.set(1, 0);
    if (this.material.map)
      this.material.map.dispose();
    this.material.map = texture;
    this.material.needsUpdate = true;
  }
  changeSvgIndex() {
    this.svgIndex = this.svgIndex >= 7 ? 1 : this.svgIndex + 1;
    this.imageSrc.set(`/www${this.svgIndex}.svg`);
  }
  onCanvasMouseMove(event) {
    const container = this.containerRef.nativeElement;
    const rect = container.getBoundingClientRect();
    const clientX = event.clientX - rect.left;
    const clientY = event.clientY - rect.top;
    this.mouse.x = clientX / container.clientWidth * 2 - 1;
    this.mouse.y = -(clientY / container.clientHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.mesh);
    if (intersects.length > 0) {
      container.style.cursor = "pointer";
      this.material.emissive.setHex(2245768);
      this.material.roughness = 0.1;
      this.material.needsUpdate = true;
      const hit = intersects[0];
      if (hit.face) {
        const normalMatrix = new Matrix3().getNormalMatrix(this.mesh.matrixWorld);
        const worldNormal = hit.face.normal.clone().applyMatrix3(normalMatrix).normalize();
        const routeData = this.getRouteByFaceNormal(worldNormal);
        if (routeData) {
          this.currentIntersectedRoute = routeData;
          const screenPosition = this.vector3ToScreenPosition(hit.point, container);
          this.hoveredButtonData = {
            label: routeData.label,
            path: routeData.path,
            x: screenPosition.x,
            y: screenPosition.y
          };
        }
      }
    } else {
      this.onCanvasMouseLeave();
    }
  }
  onCanvasMouseLeave() {
    const container = this.containerRef.nativeElement;
    container.style.cursor = "default";
    this.material.emissive.setHex(0);
    this.material.roughness = 0.15;
    this.material.needsUpdate = true;
    this.hoveredButtonData = null;
    this.currentIntersectedRoute = null;
  }
  vector3ToScreenPosition(vector, container) {
    const clonedVector = vector.clone();
    clonedVector.project(this.camera);
    const widthHalf = container.clientWidth / 2;
    const heightHalf = container.clientHeight / 2;
    return {
      x: clonedVector.x * widthHalf + widthHalf,
      y: -(clonedVector.y * heightHalf) + heightHalf
    };
  }
  onCanvasClick() {
    if (this.currentIntersectedRoute) {
      this.router.navigate([this.currentIntersectedRoute.path]);
    }
  }
  onButtonClick(event, path) {
    event.stopPropagation();
    this.router.navigate([path]);
  }
  getRouteByFaceNormal(normal) {
    const x = normal.x;
    const y = normal.y;
    const z = normal.z;
    const absX = Math.abs(x);
    const absY = Math.abs(y);
    const absZ = Math.abs(z);
    if (absX > absY && absX > absZ) {
      return x > 0 ? { label: "Blog", path: "/blog" } : { label: "Foro", path: "/foro" };
    } else if (absY > absX && absY > absZ) {
      return y > 0 ? { label: "Tr\xE1mite", path: "/tramite" } : { label: "Landing", path: "/land" };
    } else {
      return z > 0 ? { label: "Tramite", path: "/tramite" } : { label: "Landing", path: "/land" };
    }
  }
  animate = () => {
    if (this.controls) {
      this.controls.update();
    }
    this.renderer.render(this.scene, this.camera);
    this.cssRenderer.render(this.scene, this.camera);
  };
  static \u0275fac = function ThreeHtmlCanvasComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ThreeHtmlCanvasComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ThreeHtmlCanvasComponent, selectors: [["app-three-html-canvas"]], viewQuery: function ThreeHtmlCanvasComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.containerRef = _t.first);
    }
  }, decls: 6, vars: 1, consts: [["rendererContainer", ""], [1, "three-container", 3, "click", "mousemove", "mouseleave"], ["class", "face-action-btn", 3, "left", "top", "click", 4, "ngIf"], [1, "info-badge"], [3, "click"], [1, "bi", "bi-arrow-clockwise"], [1, "face-action-btn", 3, "click"], [1, "bi", "bi-arrow-right-circle"]], template: function ThreeHtmlCanvasComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1, 0);
      \u0275\u0275listener("click", function ThreeHtmlCanvasComponent_Template_div_click_0_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onCanvasClick());
      })("mousemove", function ThreeHtmlCanvasComponent_Template_div_mousemove_0_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onCanvasMouseMove($event));
      })("mouseleave", function ThreeHtmlCanvasComponent_Template_div_mouseleave_0_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onCanvasMouseLeave());
      });
      \u0275\u0275template(2, ThreeHtmlCanvasComponent_button_2_Template, 3, 5, "button", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 3)(4, "button", 4);
      \u0275\u0275listener("click", function ThreeHtmlCanvasComponent_Template_button_click_4_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.changeSvgIndex());
      });
      \u0275\u0275element(5, "i", 5);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.hoveredButtonData);
    }
  }, dependencies: [CommonModule, NgIf], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n.three-container[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  min-width: 100px;\n  min-height: 100px;\n  overflow: hidden;\n  cursor: default;\n  position: relative;\n}\n.three-container[_ngcontent-%COMP%]     canvas {\n  display: block;\n  width: 100% !important;\n  height: 100% !important;\n}\n.face-action-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  background: rgba(37, 99, 235, 0.9);\n  color: white;\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  padding: 6px 12px;\n  border-radius: 20px;\n  cursor: pointer;\n  font-weight: 500;\n  font-size: 0.85rem;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\n  z-index: 15;\n  transition: background 0.2s, transform 0.1s;\n  white-space: nowrap;\n  pointer-events: auto;\n}\n.face-action-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(29, 78, 216, 0.95);\n  transform: translate(-50%, -50%) scale(1.05);\n}\n.info-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  color: #fff;\n  padding: 8px 12px;\n  border-radius: 4px;\n  z-index: 10;\n  display: flex;\n  gap: 10px;\n  align-items: center;\n}\n.face-html-content[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  pointer-events: auto;\n}\n.info-badge[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: #17459aff;\n  color: white;\n  border: none;\n  padding: 4px 8px;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.info-badge[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background: #1d4ed8;\n}\n/*# sourceMappingURL=logomodel3d.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThreeHtmlCanvasComponent, [{
    type: Component,
    args: [{ selector: "app-three-html-canvas", standalone: true, imports: [CommonModule], template: `
    <div 
      class="three-container" 
      #rendererContainer 
      (click)="onCanvasClick()"
      (mousemove)="onCanvasMouseMove($event)"
      (mouseleave)="onCanvasMouseLeave()"
    >
      <!-- Bot\xF3n flotante posicionado sobre la cara del cubo -->
      <button 
        *ngIf="hoveredButtonData as btn"
        class="face-action-btn"
        [style.left.px]="btn.x"
        [style.top.px]="btn.y"
        (click)="onButtonClick($event, btn.path)"
      >
        <i class="bi bi-arrow-right-circle"></i> {{ btn.label }}
      </button>
    </div>

    <div class="info-badge">
      <button (click)="changeSvgIndex()">
        <i class="bi bi-arrow-clockwise"></i>
      </button>
    </div>
  `, styles: ["/* angular:styles/component:css;b3531b5dd794d7ffe2d8de088894e06d59bab7877899ed2ee51613a892fc3ad2;/home/linuxlite/WebMEAN/src/app/componentes/logomodel3d.ts */\n:host {\n  display: block;\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n.three-container {\n  width: 100%;\n  height: 100%;\n  min-width: 100px;\n  min-height: 100px;\n  overflow: hidden;\n  cursor: default;\n  position: relative;\n}\n.three-container ::ng-deep canvas {\n  display: block;\n  width: 100% !important;\n  height: 100% !important;\n}\n.face-action-btn {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  background: rgba(37, 99, 235, 0.9);\n  color: white;\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  padding: 6px 12px;\n  border-radius: 20px;\n  cursor: pointer;\n  font-weight: 500;\n  font-size: 0.85rem;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\n  z-index: 15;\n  transition: background 0.2s, transform 0.1s;\n  white-space: nowrap;\n  pointer-events: auto;\n}\n.face-action-btn:hover {\n  background: rgba(29, 78, 216, 0.95);\n  transform: translate(-50%, -50%) scale(1.05);\n}\n.info-badge {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  color: #fff;\n  padding: 8px 12px;\n  border-radius: 4px;\n  z-index: 10;\n  display: flex;\n  gap: 10px;\n  align-items: center;\n}\n.face-html-content button {\n  pointer-events: auto;\n}\n.info-badge button {\n  background: #17459aff;\n  color: white;\n  border: none;\n  padding: 4px 8px;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.info-badge button:hover {\n  background: #1d4ed8;\n}\n/*# sourceMappingURL=logomodel3d.css.map */\n"] }]
  }], () => [], { containerRef: [{
    type: ViewChild,
    args: ["rendererContainer", { static: true }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ThreeHtmlCanvasComponent, { className: "ThreeHtmlCanvasComponent", filePath: "src/app/componentes/logomodel3d.ts", lineNumber: 133 });
})();

export {
  ThreeHtmlCanvasComponent
};
//# sourceMappingURL=chunk-WGBKUFOR.js.map
