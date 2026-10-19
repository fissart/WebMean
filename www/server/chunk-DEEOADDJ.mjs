import './polyfills.server.mjs';
import {
  GLTFExporter
} from "./chunk-ALCPEAGU.mjs";
import {
  OrbitControls
} from "./chunk-MD2XOYTT.mjs";
import {
  AmbientLight,
  BoxGeometry,
  BufferAttribute,
  Color,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  Float32BufferAttribute,
  MOUSE,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Raycaster,
  RingGeometry,
  Scene,
  SphereGeometry,
  TorusGeometry,
  Vector2,
  Vector3,
  WebGLRenderer
} from "./chunk-ULG7G2AN.mjs";
import {
  CommonModule
} from "./chunk-TDOK3CTI.mjs";
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  NgZone,
  ViewChild,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-GYAE75W3.mjs";
import "./chunk-TB3YAHZW.mjs";

// src/app/componentes/sculpt.ts
var _c0 = ["canvasContainer"];
function MeshSculptorComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 13)(1, "label", 65);
    \u0275\u0275text(2, "Color de Pincel:");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "input", 66);
    \u0275\u0275domListener("input", function MeshSculptorComponent_Conditional_23_Template_input_input_3_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updatePaintColor($event));
    });
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("value", ctx_r2.paintColor());
  }
}
function MeshSculptorComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 25)(1, "div", 67)(2, "span", 68);
    \u0275\u0275text(3, "Detalle M\xE1x. Arista:");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "span", 34);
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "input", 69);
    \u0275\u0275domListener("input", function MeshSculptorComponent_Conditional_44_Template_input_input_6_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateMaxEdgeLength($event));
    });
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.maxEdgeLength());
    \u0275\u0275advance();
    \u0275\u0275domProperty("value", ctx_r2.maxEdgeLength());
  }
}
function MeshSculptorComponent_Conditional_91_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 49)(1, "span", 68);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "input", 70);
    \u0275\u0275domListener("input", function MeshSculptorComponent_Conditional_91_Template_input_input_3_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateAutoRotateSpeed($event));
    });
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Velocidad: ", ctx_r2.autoRotateSpeed());
    \u0275\u0275advance();
    \u0275\u0275domProperty("value", ctx_r2.autoRotateSpeed());
  }
}
var MeshSculptorComponent = class _MeshSculptorComponent {
  ngZone;
  canvasContainer;
  isToolbarHidden = signal(false, ...ngDevMode ? [{ debugName: "isToolbarHidden" }] : []);
  brushSize = signal(1.2, ...ngDevMode ? [{ debugName: "brushSize" }] : []);
  brushIntensity = signal(0.08, ...ngDevMode ? [{ debugName: "brushIntensity" }] : []);
  selectedTool = signal("inflate", ...ngDevMode ? [{ debugName: "selectedTool" }] : []);
  selectedShape = signal("sphere", ...ngDevMode ? [{ debugName: "selectedShape" }] : []);
  symmetryX = signal(false, ...ngDevMode ? [{ debugName: "symmetryX" }] : []);
  wireframe = signal(false, ...ngDevMode ? [{ debugName: "wireframe" }] : []);
  canvasRotation = signal(0, ...ngDevMode ? [{ debugName: "canvasRotation" }] : []);
  paintColor = signal("#3b82f6", ...ngDevMode ? [{ debugName: "paintColor" }] : []);
  enableDyntopo = signal(true, ...ngDevMode ? [{ debugName: "enableDyntopo" }] : []);
  maxEdgeLength = signal(0.15, ...ngDevMode ? [{ debugName: "maxEdgeLength" }] : []);
  enableRotate = signal(true, ...ngDevMode ? [{ debugName: "enableRotate" }] : []);
  enableZoom = signal(true, ...ngDevMode ? [{ debugName: "enableZoom" }] : []);
  enablePan = signal(true, ...ngDevMode ? [{ debugName: "enablePan" }] : []);
  autoRotateCamera = signal(false, ...ngDevMode ? [{ debugName: "autoRotateCamera" }] : []);
  autoRotateSpeed = signal(2, ...ngDevMode ? [{ debugName: "autoRotateSpeed" }] : []);
  vertexCount = signal(0, ...ngDevMode ? [{ debugName: "vertexCount" }] : []);
  faceCount = signal(0, ...ngDevMode ? [{ debugName: "faceCount" }] : []);
  scene;
  camera;
  renderer;
  controls;
  mesh;
  material;
  brushHelper;
  raycaster = new Raycaster();
  mouse = new Vector2();
  isSculpting = false;
  animationFrameId = null;
  constructor(ngZone) {
    this.ngZone = ngZone;
  }
  toggleToolbar() {
    this.isToolbarHidden.update((v) => !v);
  }
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.initThreeJS();
      this.setupSculptMesh(this.selectedShape());
      this.setupBrushHelper();
      this.setupEvents();
      this.animate();
    });
  }
  ngOnDestroy() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.controls?.dispose();
    this.renderer?.dispose();
  }
  initThreeJS() {
    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.scene = new Scene();
    this.scene.background = new Color(1184274);
    this.camera = new PerspectiveCamera(60, width / height, 0.1, 1e3);
    this.camera.position.set(0, 0, 8);
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableRotate = this.enableRotate();
    this.controls.enableZoom = this.enableZoom();
    this.controls.enablePan = this.enablePan();
    this.controls.autoRotate = this.autoRotateCamera();
    this.controls.autoRotateSpeed = this.autoRotateSpeed();
    this.controls.mouseButtons = {
      LEFT: null,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.ROTATE
    };
    const ambientLight = new AmbientLight(16777215, 0.6);
    const dirLight1 = new DirectionalLight(16777215, 1.2);
    dirLight1.position.set(5, 10, 7);
    const dirLight2 = new DirectionalLight(31743, 0.8);
    dirLight2.position.set(-5, -5, -5);
    this.scene.add(ambientLight, dirLight1, dirLight2);
  }
  setupSculptMesh(shape) {
    if (this.mesh) {
      this.scene.remove(this.mesh);
      this.mesh.geometry.dispose();
    }
    let baseGeometry;
    switch (shape) {
      case "box":
        baseGeometry = new BoxGeometry(4, 4, 4, 32, 32, 32);
        break;
      case "cylinder":
        baseGeometry = new CylinderGeometry(2, 2, 5, 32, 32);
        break;
      case "torus":
        baseGeometry = new TorusGeometry(2.5, 0.8, 32, 64);
        break;
      case "sphere":
      default:
        baseGeometry = new SphereGeometry(3, 48, 48);
        break;
    }
    const nonIndexedGeometry = baseGeometry.toNonIndexed();
    baseGeometry.dispose();
    const posCount = nonIndexedGeometry.attributes["position"].count;
    const colors = new Float32Array(posCount * 3);
    for (let i = 0; i < colors.length; i++) {
      colors[i] = 0.8;
    }
    nonIndexedGeometry.setAttribute("color", new BufferAttribute(colors, 3));
    this.material = new MeshStandardMaterial({
      roughness: 0.3,
      metalness: 0.1,
      wireframe: this.wireframe(),
      vertexColors: true
    });
    this.mesh = new Mesh(nonIndexedGeometry, this.material);
    this.mesh.name = "SculptedMesh";
    this.mesh.rotation.z = MathUtils.degToRad(this.canvasRotation());
    this.scene.add(this.mesh);
    this.updateMeshStats();
  }
  updateMeshStats() {
    if (!this.mesh || !this.mesh.geometry)
      return;
    const pos = this.mesh.geometry.attributes["position"];
    this.vertexCount.set(pos ? pos.count : 0);
    this.faceCount.set(pos ? pos.count / 3 : 0);
  }
  setupBrushHelper() {
    const helperGeo = new RingGeometry(0.98, 1, 32);
    const helperMat = new MeshBasicMaterial({
      color: 16761095,
      side: DoubleSide,
      depthTest: false,
      transparent: true,
      opacity: 0.8
    });
    this.brushHelper = new Mesh(helperGeo, helperMat);
    this.brushHelper.visible = false;
    this.scene.add(this.brushHelper);
  }
  setupEvents() {
    const domElement = this.renderer.domElement;
    domElement.addEventListener("contextmenu", (e) => e.preventDefault());
    domElement.addEventListener("pointerdown", (event) => {
      if (event.button === 0) {
        this.isSculpting = true;
        this.controls.enabled = false;
        this.sculpt(event);
      }
    });
    domElement.addEventListener("pointermove", (event) => {
      this.updateCursorHelper(event);
      if (this.isSculpting) {
        this.sculpt(event);
      }
    });
    const stopSculpting = () => {
      if (this.isSculpting) {
        this.isSculpting = false;
        this.controls.enabled = true;
      }
    };
    domElement.addEventListener("pointerup", stopSculpting);
    domElement.addEventListener("pointerleave", () => {
      this.brushHelper.visible = false;
      stopSculpting();
    });
  }
  updateCursorHelper(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = (event.clientX - rect.left) / rect.width * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.mesh);
    if (intersects.length > 0) {
      const hit = intersects[0];
      if (hit.point && hit.face) {
        this.brushHelper.position.copy(hit.point);
        const normal = hit.face.normal.clone().transformDirection(this.mesh.matrixWorld);
        this.brushHelper.lookAt(hit.point.clone().add(normal));
        const scale = this.brushSize();
        this.brushHelper.scale.set(scale, scale, scale);
        this.brushHelper.visible = true;
        return;
      }
    }
    this.brushHelper.visible = false;
  }
  sculpt(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = (event.clientX - rect.left) / rect.width * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.mesh);
    if (intersects.length > 0) {
      const hit = intersects[0];
      if (!hit.point || !hit.face)
        return;
      const pointsToProcess = [hit.point.clone()];
      if (this.symmetryX()) {
        const mirrorPoint = hit.point.clone();
        mirrorPoint.x = -mirrorPoint.x;
        pointsToProcess.push(mirrorPoint);
      }
      pointsToProcess.forEach((targetPoint) => {
        if (this.selectedTool() !== "paint" && this.enableDyntopo()) {
          this.subdivideTrianglesNearBrush(targetPoint);
        }
        this.applySculptTool(targetPoint, hit.face.normal);
      });
      const positionAttr = this.mesh.geometry.attributes["position"];
      const colorAttr = this.mesh.geometry.attributes["color"];
      positionAttr.needsUpdate = true;
      if (colorAttr)
        colorAttr.needsUpdate = true;
      this.mesh.geometry.computeVertexNormals();
      this.updateMeshStats();
    }
  }
  subdivideTrianglesNearBrush(hitPoint) {
    const geometry = this.mesh.geometry;
    const posAttr = geometry.attributes["position"];
    const colAttr = geometry.attributes["color"];
    const radius = this.brushSize();
    const threshold = this.maxEdgeLength();
    const positions = Array.from(posAttr.array);
    const colors = colAttr ? Array.from(colAttr.array) : [];
    const newPositions = [];
    const newColors = [];
    let needsUpdate = false;
    const vA = new Vector3();
    const vB = new Vector3();
    const vC = new Vector3();
    const cA = new Color();
    const cB = new Color();
    const cC = new Color();
    for (let i = 0; i < positions.length; i += 9) {
      vA.set(positions[i], positions[i + 1], positions[i + 2]);
      vB.set(positions[i + 3], positions[i + 4], positions[i + 5]);
      vC.set(positions[i + 6], positions[i + 7], positions[i + 8]);
      if (colors.length > 0) {
        cA.setRGB(colors[i], colors[i + 1], colors[i + 2]);
        cB.setRGB(colors[i + 3], colors[i + 4], colors[i + 5]);
        cC.setRGB(colors[i + 6], colors[i + 7], colors[i + 8]);
      }
      const distA = vA.distanceTo(hitPoint);
      const distB = vB.distanceTo(hitPoint);
      const distC = vC.distanceTo(hitPoint);
      if (distA < radius || distB < radius || distC < radius) {
        const lenAB = vA.distanceTo(vB);
        const lenBC = vB.distanceTo(vC);
        const lenCA = vC.distanceTo(vA);
        if (lenAB > threshold || lenBC > threshold || lenCA > threshold) {
          needsUpdate = true;
          const mAB = new Vector3().addVectors(vA, vB).multiplyScalar(0.5);
          const mBC = new Vector3().addVectors(vB, vC).multiplyScalar(0.5);
          const mCA = new Vector3().addVectors(vC, vA).multiplyScalar(0.5);
          const cAB = cA.clone().lerp(cB, 0.5);
          const cBC = cB.clone().lerp(cC, 0.5);
          const cCA = cC.clone().lerp(cA, 0.5);
          newPositions.push(vA.x, vA.y, vA.z, mAB.x, mAB.y, mAB.z, mCA.x, mCA.y, mCA.z);
          newColors.push(cA.r, cA.g, cA.b, cAB.r, cAB.g, cAB.b, cCA.r, cCA.g, cCA.b);
          newPositions.push(mAB.x, mAB.y, mAB.z, vB.x, vB.y, vB.z, mBC.x, mBC.y, mBC.z);
          newColors.push(cAB.r, cAB.g, cAB.b, cB.r, cB.g, cB.b, cBC.r, cBC.g, cBC.b);
          newPositions.push(mCA.x, mCA.y, mCA.z, mBC.x, mBC.y, mBC.z, vC.x, vC.y, vC.z);
          newColors.push(cCA.r, cCA.g, cCA.b, cBC.r, cBC.g, cBC.b, cC.r, cC.g, cC.b);
          newPositions.push(mAB.x, mAB.y, mAB.z, mBC.x, mBC.y, mBC.z, mCA.x, mCA.y, mCA.z);
          newColors.push(cAB.r, cAB.g, cAB.b, cBC.r, cBC.g, cBC.b, cCA.r, cCA.g, cCA.b);
          continue;
        }
      }
      newPositions.push(vA.x, vA.y, vA.z, vB.x, vB.y, vB.z, vC.x, vC.y, vC.z);
      if (colors.length > 0) {
        newColors.push(cA.r, cA.g, cA.b, cB.r, cB.g, cB.b, cC.r, cC.g, cC.b);
      }
    }
    if (needsUpdate) {
      geometry.setAttribute("position", new Float32BufferAttribute(newPositions, 3));
      geometry.setAttribute("color", new Float32BufferAttribute(newColors, 3));
      geometry.attributes["position"].needsUpdate = true;
      geometry.attributes["color"].needsUpdate = true;
    }
  }
  applySculptTool(hitPoint, faceNormal) {
    const geometry = this.mesh.geometry;
    const positionAttr = geometry.attributes["position"];
    const colorAttr = geometry.attributes["color"];
    const vertex = new Vector3();
    const currentColor = new Color();
    const targetColor = new Color(this.paintColor());
    const radius = this.brushSize();
    const strength = this.brushIntensity();
    const tool = this.selectedTool();
    const normal = faceNormal.clone().transformDirection(this.mesh.matrixWorld);
    for (let i = 0; i < positionAttr.count; i++) {
      vertex.fromBufferAttribute(positionAttr, i);
      const worldVertex = vertex.clone().applyMatrix4(this.mesh.matrixWorld);
      const distance = worldVertex.distanceTo(hitPoint);
      if (distance < radius) {
        const falloff = Math.pow(1 - distance / radius, 2);
        switch (tool) {
          case "inflate": {
            const displacement = normal.clone().multiplyScalar(falloff * strength);
            vertex.add(displacement);
            positionAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
            break;
          }
          case "deflate": {
            const displacement = normal.clone().multiplyScalar(-falloff * strength);
            vertex.add(displacement);
            positionAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
            break;
          }
          case "smooth": {
            const targetVec = hitPoint.clone().sub(worldVertex).multiplyScalar(falloff * strength * 0.5);
            vertex.add(targetVec);
            positionAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
            break;
          }
          case "flatten": {
            const vToP = worldVertex.clone().sub(hitPoint);
            const distToPlane = vToP.dot(normal);
            const projection = normal.clone().multiplyScalar(-distToPlane * falloff * strength * 2);
            vertex.add(projection);
            positionAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
            break;
          }
          case "paint": {
            if (colorAttr) {
              currentColor.fromBufferAttribute(colorAttr, i);
              currentColor.lerp(targetColor, falloff * strength);
              colorAttr.setXYZ(i, currentColor.r, currentColor.g, currentColor.b);
            }
            break;
          }
        }
      }
    }
  }
  updatePaintColor(event) {
    const val = event.target.value;
    this.paintColor.set(val);
  }
  toggleDyntopo(event) {
    const checked = event.target.checked;
    this.enableDyntopo.set(checked);
  }
  updateMaxEdgeLength(event) {
    const val = parseFloat(event.target.value);
    this.maxEdgeLength.set(val);
  }
  updateCanvasRotation(event) {
    const val = parseFloat(event.target.value);
    this.canvasRotation.set(val);
    if (this.mesh) {
      this.mesh.rotation.z = MathUtils.degToRad(val);
    }
  }
  resetCanvasRotation() {
    this.canvasRotation.set(0);
    if (this.mesh) {
      this.mesh.rotation.z = 0;
    }
  }
  toggleEnableRotate(event) {
    const checked = event.target.checked;
    this.enableRotate.set(checked);
    if (this.controls)
      this.controls.enableRotate = checked;
  }
  toggleEnableZoom(event) {
    const checked = event.target.checked;
    this.enableZoom.set(checked);
    if (this.controls)
      this.controls.enableZoom = checked;
  }
  toggleEnablePan(event) {
    const checked = event.target.checked;
    this.enablePan.set(checked);
    if (this.controls)
      this.controls.enablePan = checked;
  }
  toggleAutoRotateCamera(event) {
    const checked = event.target.checked;
    this.autoRotateCamera.set(checked);
    if (this.controls)
      this.controls.autoRotate = checked;
  }
  updateAutoRotateSpeed(event) {
    const val = parseFloat(event.target.value);
    this.autoRotateSpeed.set(val);
    if (this.controls)
      this.controls.autoRotateSpeed = val;
  }
  resetCamera() {
    if (!this.controls || !this.camera)
      return;
    this.camera.position.set(0, 0, 8);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }
  animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };
  onWindowResize() {
    if (!this.canvasContainer)
      return;
    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
  setTool(tool) {
    this.selectedTool.set(tool);
  }
  updateBrushSize(event) {
    const val = parseFloat(event.target.value);
    this.brushSize.set(val);
  }
  updateBrushIntensity(event) {
    const val = parseFloat(event.target.value);
    this.brushIntensity.set(val);
  }
  changeBaseShape(event) {
    const shape = event.target.value;
    this.selectedShape.set(shape);
    this.setupSculptMesh(shape);
  }
  toggleSymmetry(event) {
    const checked = event.target.checked;
    this.symmetryX.set(checked);
  }
  toggleWireframe(event) {
    const checked = event.target.checked;
    this.wireframe.set(checked);
    if (this.material) {
      this.material.wireframe = checked;
    }
  }
  resetMesh() {
    this.setupSculptMesh(this.selectedShape());
  }
  downloadGLB() {
    const exporter = new GLTFExporter();
    exporter.parse(this.mesh, (gltf) => {
      if (gltf instanceof ArrayBuffer) {
        const blob = new Blob([gltf], { type: "application/octet-stream" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `sculpted-${this.selectedShape()}-${Date.now()}.glb`;
        link.click();
        URL.revokeObjectURL(link.href);
      }
    }, (error) => {
      console.error("An error occurred while exporting GLTF", error);
    }, { binary: true });
  }
  rotateCameraAngle(angleDegrees) {
    if (!this.controls || !this.camera)
      return;
    const rad = MathUtils.degToRad(angleDegrees);
    const currentX = this.camera.position.x - this.controls.target.x;
    const currentZ = this.camera.position.z - this.controls.target.z;
    const currentRadius = Math.sqrt(currentX * currentX + currentZ * currentZ);
    const currentAngle = Math.atan2(currentZ, currentX);
    const newAngle = currentAngle + rad;
    this.camera.position.x = this.controls.target.x + currentRadius * Math.cos(newAngle);
    this.camera.position.z = this.controls.target.z + currentRadius * Math.sin(newAngle);
    this.controls.update();
  }
  static \u0275fac = function MeshSculptorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MeshSculptorComponent)(\u0275\u0275directiveInject(NgZone));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MeshSculptorComponent, selectors: [["app-mesh-sculptor"]], viewQuery: function MeshSculptorComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.canvasContainer = _t.first);
    }
  }, hostBindings: function MeshSculptorComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("resize", function MeshSculptorComponent_resize_HostBindingHandler() {
        return ctx.onWindowResize();
      }, \u0275\u0275resolveWindow);
    }
  }, decls: 122, vars: 45, consts: [["canvasContainer", ""], [1, "container-fluid", "vh-100", "p-0", "overflow-hidden", "bg-dark", "position-relative"], [1, "btn", "btn-primary", "btn-sm", "shadow-lg", "position-absolute", "rounded-pill", "px-3", "py-2", "font-weight-bold", 2, "top", "15px", "left", "15px", "z-index", "1050", 3, "click"], [1, "fa", "fa-bars", "mr-1"], [1, "card", "bg-dark", "text-light", "border-secondary", "shadow-lg", "position-absolute", "h-100", "rounded-0", "overflow-auto", "transition-all", 2, "width", "350px", "z-index", "1040", "top", "0", "left", "0", "padding-top", "60px"], [1, "card-body", "px-3", "py-3"], [1, "card-title", "font-weight-bold", "text-primary", "mb-3"], [1, "fas", "fa-cube", "mr-2"], [1, "form-group", "mb-3"], [1, "small", "text-muted", "font-weight-bold", "text-uppercase", "mb-2"], [1, "d-grid", "gap-2", 2, "display", "grid", "grid-template-columns", "repeat(2, 1fr)", "gap", "6px"], ["type", "button", 1, "btn", "btn-sm", "text-truncate", "font-weight-bold", 3, "click"], ["type", "button", 1, "btn", "btn-sm", "text-truncate", "font-weight-bold", 2, "grid-column", "span 2", 3, "click"], [1, "form-group", "mb-3", "bg-secondary", "p-2", "rounded", "border", "border-dark"], [1, "form-group", "mb-2"], [1, "d-flex", "justify-content-between", "small"], [1, "text-muted", "font-weight-bold", "mb-1"], [1, "badge", "badge-secondary", "px-2", "py-1"], ["type", "range", "min", "0.2", "max", "3", "step", "0.1", 1, "form-control-range", 3, "input", "value"], ["type", "range", "min", "0.01", "max", "1.0", "step", "0.01", 1, "form-control-range", 3, "input", "value"], [1, "border-secondary"], [1, "form-group", "mb-3", "bg-secondary", "p-2", "rounded"], [1, "custom-control", "custom-checkbox", "mb-1"], ["type", "checkbox", "id", "dyntopoCheck", 1, "custom-control-input", 3, "change", "checked"], ["for", "dyntopoCheck", 1, "custom-control-label", "small", "font-weight-bold", "text-light"], [1, "small", "mt-2", "pt-1", "border-top", "border-dark"], [1, "small", "text-muted", "font-weight-bold", "text-uppercase"], [1, "custom-select", "custom-select-sm", "bg-secondary", "text-light", "border-secondary", 3, "change"], ["value", "sphere", 3, "selected"], ["value", "box", 3, "selected"], ["value", "cylinder", 3, "selected"], ["value", "torus", 3, "selected"], [1, "d-flex", "justify-content-between", "small", "mb-1"], [1, "text-light", "font-weight-bold", "mb-0"], [1, "badge", "badge-dark"], ["type", "range", "min", "0", "max", "360", "step", "1", 1, "form-control-range", "mb-2", 3, "input", "value"], [1, "btn", "btn-outline-light", "btn-sm", "btn-block", 3, "click"], [1, "btn-group", "btn-group-sm", "w-100", "mb-2"], [1, "btn", "btn-outline-secondary", 3, "click"], [1, "custom-control", "custom-checkbox", "small", "mb-1"], ["type", "checkbox", "id", "rotCheck", 1, "custom-control-input", 3, "change", "checked"], ["for", "rotCheck", 1, "custom-control-label"], ["type", "checkbox", "id", "zoomCheck", 1, "custom-control-input", 3, "change", "checked"], ["for", "zoomCheck", 1, "custom-control-label"], ["type", "checkbox", "id", "panCheck", 1, "custom-control-input", 3, "change", "checked"], ["for", "panCheck", 1, "custom-control-label"], [1, "custom-control", "custom-checkbox", "small", "mb-2", "mt-2"], ["type", "checkbox", "id", "autoRotCheck", 1, "custom-control-input", 3, "change", "checked"], ["for", "autoRotCheck", 1, "custom-control-label", "font-weight-bold"], [1, "small", "mb-2"], [1, "btn", "btn-outline-secondary", "btn-sm", "btn-block", "mt-2", 3, "click"], [1, "custom-control", "custom-checkbox", "small", "mb-2"], ["type", "checkbox", "id", "symCheck", 1, "custom-control-input", 3, "change", "checked"], ["for", "symCheck", 1, "custom-control-label", "font-weight-bold", "text-light"], [1, "custom-control", "custom-checkbox", "small"], ["type", "checkbox", "id", "wireCheck", 1, "custom-control-input", 3, "change", "checked"], ["for", "wireCheck", 1, "custom-control-label", "font-weight-bold", "text-light"], [1, "card", "bg-secondary", "text-light", "p-2", "mb-3", "small", "border-0"], [1, "d-flex", "justify-content-between"], [1, "text-warning", "font-weight-bold"], [1, "form-group", "mb-4"], [1, "btn", "btn-success", "btn-block", "mb-2", "font-weight-bold", "shadow-sm", 3, "click"], [1, "fas", "fa-download", "mr-1"], [1, "btn", "btn-outline-danger", "btn-block", "font-weight-bold", 3, "click"], [1, "w-100", "h-100", "position-absolute", 2, "top", "0", "left", "0", "z-index", "1"], [1, "small", "font-weight-bold", "mb-1", "text-light"], ["type", "color", 1, "form-control", "form-control-sm", "p-1", "border-0", "bg-transparent", "cursor-pointer", "w-100", 2, "height", "38px", 3, "input", "value"], [1, "d-flex", "justify-content-between", "mb-1"], [1, "text-muted"], ["type", "range", "min", "0.05", "max", "0.5", "step", "0.01", 1, "form-control-range", 3, "input", "value"], ["type", "range", "min", "0.5", "max", "10", "step", "0.5", 1, "form-control-range", 3, "input", "value"]], template: function MeshSculptorComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275domElementStart(0, "div", 1)(1, "button", 2);
      \u0275\u0275domListener("click", function MeshSculptorComponent_Template_button_click_1_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.toggleToolbar());
      });
      \u0275\u0275domElement(2, "i", 3);
      \u0275\u0275text(3);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "div", 4)(5, "div", 5)(6, "h5", 6);
      \u0275\u0275domElement(7, "i", 7);
      \u0275\u0275text(8, "Sculpting Tool Studio ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(9, "div", 8)(10, "label", 9);
      \u0275\u0275text(11, "Herramienta Activa");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(12, "div", 10)(13, "button", 11);
      \u0275\u0275domListener("click", function MeshSculptorComponent_Template_button_click_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setTool("inflate"));
      });
      \u0275\u0275text(14, " Inflar ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(15, "button", 11);
      \u0275\u0275domListener("click", function MeshSculptorComponent_Template_button_click_15_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setTool("deflate"));
      });
      \u0275\u0275text(16, " Hundir ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(17, "button", 11);
      \u0275\u0275domListener("click", function MeshSculptorComponent_Template_button_click_17_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setTool("smooth"));
      });
      \u0275\u0275text(18, " Suavizar ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(19, "button", 11);
      \u0275\u0275domListener("click", function MeshSculptorComponent_Template_button_click_19_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setTool("flatten"));
      });
      \u0275\u0275text(20, " Aplanar ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(21, "button", 12);
      \u0275\u0275domListener("click", function MeshSculptorComponent_Template_button_click_21_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setTool("paint"));
      });
      \u0275\u0275text(22, " Pintar V\xE9rtices ");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275conditionalCreate(23, MeshSculptorComponent_Conditional_23_Template, 4, 1, "div", 13);
      \u0275\u0275domElementStart(24, "div", 14)(25, "div", 15)(26, "label", 16);
      \u0275\u0275text(27, "Tama\xF1o Pincel");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(28, "span", 17);
      \u0275\u0275text(29);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(30, "input", 18);
      \u0275\u0275domListener("input", function MeshSculptorComponent_Template_input_input_30_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.updateBrushSize($event));
      });
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(31, "div", 8)(32, "div", 15)(33, "label", 16);
      \u0275\u0275text(34, "Intensidad");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(35, "span", 17);
      \u0275\u0275text(36);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(37, "input", 19);
      \u0275\u0275domListener("input", function MeshSculptorComponent_Template_input_input_37_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.updateBrushIntensity($event));
      });
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElement(38, "hr", 20);
      \u0275\u0275domElementStart(39, "div", 21)(40, "div", 22)(41, "input", 23);
      \u0275\u0275domListener("change", function MeshSculptorComponent_Template_input_change_41_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.toggleDyntopo($event));
      });
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(42, "label", 24);
      \u0275\u0275text(43, " Topolog\xEDa Din\xE1mica (Dyntopo) ");
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(44, MeshSculptorComponent_Conditional_44_Template, 7, 2, "div", 25);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(45, "div", 8)(46, "label", 26);
      \u0275\u0275text(47, "Forma Base");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(48, "select", 27);
      \u0275\u0275domListener("change", function MeshSculptorComponent_Template_select_change_48_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.changeBaseShape($event));
      });
      \u0275\u0275domElementStart(49, "option", 28);
      \u0275\u0275text(50, "Esfera");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(51, "option", 29);
      \u0275\u0275text(52, "Cubo");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(53, "option", 30);
      \u0275\u0275text(54, "Cilindro");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(55, "option", 31);
      \u0275\u0275text(56, "Toroide");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(57, "div", 21)(58, "div", 32)(59, "label", 33);
      \u0275\u0275text(60, "Rotaci\xF3n Canvas (Z)");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(61, "span", 34);
      \u0275\u0275text(62);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(63, "input", 35);
      \u0275\u0275domListener("input", function MeshSculptorComponent_Template_input_input_63_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.updateCanvasRotation($event));
      });
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(64, "button", 36);
      \u0275\u0275domListener("click", function MeshSculptorComponent_Template_button_click_64_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.resetCanvasRotation());
      });
      \u0275\u0275text(65, " Restablecer Rotaci\xF3n ");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElement(66, "hr", 20);
      \u0275\u0275domElementStart(67, "div", 8)(68, "label", 9);
      \u0275\u0275text(69, "Control de C\xE1mara (Orbit)");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(70, "div", 37)(71, "button", 38);
      \u0275\u0275domListener("click", function MeshSculptorComponent_Template_button_click_71_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.rotateCameraAngle(90));
      });
      \u0275\u0275text(72, "Girar 90\xB0");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(73, "button", 38);
      \u0275\u0275domListener("click", function MeshSculptorComponent_Template_button_click_73_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.rotateCameraAngle(-90));
      });
      \u0275\u0275text(74, "Girar -90\xB0");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(75, "div", 39)(76, "input", 40);
      \u0275\u0275domListener("change", function MeshSculptorComponent_Template_input_change_76_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.toggleEnableRotate($event));
      });
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(77, "label", 41);
      \u0275\u0275text(78, "Permitir Rotaci\xF3n");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(79, "div", 39)(80, "input", 42);
      \u0275\u0275domListener("change", function MeshSculptorComponent_Template_input_change_80_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.toggleEnableZoom($event));
      });
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(81, "label", 43);
      \u0275\u0275text(82, "Permitir Zoom");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(83, "div", 39)(84, "input", 44);
      \u0275\u0275domListener("change", function MeshSculptorComponent_Template_input_change_84_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.toggleEnablePan($event));
      });
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(85, "label", 45);
      \u0275\u0275text(86, "Permitir Desplazamiento (Pan)");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(87, "div", 46)(88, "input", 47);
      \u0275\u0275domListener("change", function MeshSculptorComponent_Template_input_change_88_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.toggleAutoRotateCamera($event));
      });
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(89, "label", 48);
      \u0275\u0275text(90, "Autorrotaci\xF3n C\xE1mara");
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(91, MeshSculptorComponent_Conditional_91_Template, 4, 2, "div", 49);
      \u0275\u0275domElementStart(92, "button", 50);
      \u0275\u0275domListener("click", function MeshSculptorComponent_Template_button_click_92_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.resetCamera());
      });
      \u0275\u0275text(93, " Restablecer C\xE1mara ");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(94, "div", 21)(95, "div", 51)(96, "input", 52);
      \u0275\u0275domListener("change", function MeshSculptorComponent_Template_input_change_96_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.toggleSymmetry($event));
      });
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(97, "label", 53);
      \u0275\u0275text(98, "Simetr\xEDa (Eje X)");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(99, "div", 54)(100, "input", 55);
      \u0275\u0275domListener("change", function MeshSculptorComponent_Template_input_change_100_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.toggleWireframe($event));
      });
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(101, "label", 56);
      \u0275\u0275text(102, "Modo Malla (Wireframe)");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(103, "div", 57)(104, "div", 58)(105, "span");
      \u0275\u0275text(106, "V\xE9rtices:");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(107, "strong", 59);
      \u0275\u0275text(108);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(109, "div", 58)(110, "span");
      \u0275\u0275text(111, "Caras:");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(112, "strong", 59);
      \u0275\u0275text(113);
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(114, "div", 60)(115, "button", 61);
      \u0275\u0275domListener("click", function MeshSculptorComponent_Template_button_click_115_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.downloadGLB());
      });
      \u0275\u0275domElement(116, "i", 62);
      \u0275\u0275text(117, " Descargar GLB ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(118, "button", 63);
      \u0275\u0275domListener("click", function MeshSculptorComponent_Template_button_click_118_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.resetMesh());
      });
      \u0275\u0275text(119, " Reiniciar Malla ");
      \u0275\u0275domElementEnd()()()();
      \u0275\u0275domElement(120, "div", 64, 0);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.isToolbarHidden() ? "Mostrar Men\xFA" : "Ocultar Men\xFA", " ");
      \u0275\u0275advance();
      \u0275\u0275classProp("d-none", ctx.isToolbarHidden());
      \u0275\u0275advance(9);
      \u0275\u0275classProp("btn-primary", ctx.selectedTool() === "inflate")("btn-outline-secondary", ctx.selectedTool() !== "inflate");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("btn-primary", ctx.selectedTool() === "deflate")("btn-outline-secondary", ctx.selectedTool() !== "deflate");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("btn-primary", ctx.selectedTool() === "smooth")("btn-outline-secondary", ctx.selectedTool() !== "smooth");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("btn-primary", ctx.selectedTool() === "flatten")("btn-outline-secondary", ctx.selectedTool() !== "flatten");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("btn-success", ctx.selectedTool() === "paint")("btn-outline-secondary", ctx.selectedTool() !== "paint");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.selectedTool() === "paint" ? 23 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.brushSize());
      \u0275\u0275advance();
      \u0275\u0275domProperty("value", ctx.brushSize());
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.brushIntensity());
      \u0275\u0275advance();
      \u0275\u0275domProperty("value", ctx.brushIntensity());
      \u0275\u0275advance(4);
      \u0275\u0275domProperty("checked", ctx.enableDyntopo());
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.enableDyntopo() ? 44 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275domProperty("selected", ctx.selectedShape() === "sphere");
      \u0275\u0275advance(2);
      \u0275\u0275domProperty("selected", ctx.selectedShape() === "box");
      \u0275\u0275advance(2);
      \u0275\u0275domProperty("selected", ctx.selectedShape() === "cylinder");
      \u0275\u0275advance(2);
      \u0275\u0275domProperty("selected", ctx.selectedShape() === "torus");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1("", ctx.canvasRotation(), "\xB0");
      \u0275\u0275advance();
      \u0275\u0275domProperty("value", ctx.canvasRotation());
      \u0275\u0275advance(13);
      \u0275\u0275domProperty("checked", ctx.enableRotate());
      \u0275\u0275advance(4);
      \u0275\u0275domProperty("checked", ctx.enableZoom());
      \u0275\u0275advance(4);
      \u0275\u0275domProperty("checked", ctx.enablePan());
      \u0275\u0275advance(4);
      \u0275\u0275domProperty("checked", ctx.autoRotateCamera());
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.autoRotateCamera() ? 91 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275domProperty("checked", ctx.symmetryX());
      \u0275\u0275advance(4);
      \u0275\u0275domProperty("checked", ctx.wireframe());
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.vertexCount());
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.faceCount());
    }
  }, dependencies: [CommonModule], styles: ["\n\n.transition-all[_ngcontent-%COMP%] {\n  transition: all 0.3s ease-in-out;\n}\n.cursor-pointer[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.card[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n.card[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: #495057;\n  border-radius: 4px;\n}\n/*# sourceMappingURL=sculpt.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MeshSculptorComponent, [{
    type: Component,
    args: [{ selector: "app-mesh-sculptor", standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="container-fluid vh-100 p-0 overflow-hidden bg-dark position-relative">
      
      <!-- Floating Toolbar Toggle Button (Bootstrap 4) -->
      <button 
        class="btn btn-primary btn-sm shadow-lg position-absolute rounded-pill px-3 py-2 font-weight-bold" 
        style="top: 15px; left: 15px; z-index: 1050;"
        (click)="toggleToolbar()">
        <i class="fa fa-bars mr-1"></i> {{ isToolbarHidden() ? 'Mostrar Men\xFA' : 'Ocultar Men\xFA' }}
      </button>

      <!-- Main UI Panel (Bootstrap 4 Sidebar Card) -->
      <div 
        class="card bg-dark text-light border-secondary shadow-lg position-absolute h-100 rounded-0 overflow-auto transition-all"
        [class.d-none]="isToolbarHidden()"
        style="width: 350px; z-index: 1040; top: 0; left: 0; padding-top: 60px;">
        
        <div class="card-body px-3 py-3">
          <h5 class="card-title font-weight-bold text-primary mb-3">
            <i class="fas fa-cube mr-2"></i>Sculpting Tool Studio
          </h5>

          <!-- Sculpt Tools Grid -->
          <div class="form-group mb-3">
            <label class="small text-muted font-weight-bold text-uppercase mb-2">Herramienta Activa</label>
            <div class="d-grid gap-2" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;">
              <button 
                type="button" 
                class="btn btn-sm text-truncate font-weight-bold"
                [class.btn-primary]="selectedTool() === 'inflate'"
                [class.btn-outline-secondary]="selectedTool() !== 'inflate'"
                (click)="setTool('inflate')">
                Inflar
              </button>
              <button 
                type="button" 
                class="btn btn-sm text-truncate font-weight-bold"
                [class.btn-primary]="selectedTool() === 'deflate'"
                [class.btn-outline-secondary]="selectedTool() !== 'deflate'"
                (click)="setTool('deflate')">
                Hundir
              </button>
              <button 
                type="button" 
                class="btn btn-sm text-truncate font-weight-bold"
                [class.btn-primary]="selectedTool() === 'smooth'"
                [class.btn-outline-secondary]="selectedTool() !== 'smooth'"
                (click)="setTool('smooth')">
                Suavizar
              </button>
              <button 
                type="button" 
                class="btn btn-sm text-truncate font-weight-bold"
                [class.btn-primary]="selectedTool() === 'flatten'"
                [class.btn-outline-secondary]="selectedTool() !== 'flatten'"
                (click)="setTool('flatten')">
                Aplanar
              </button>
              <button 
                type="button" 
                class="btn btn-sm text-truncate font-weight-bold"
                [class.btn-success]="selectedTool() === 'paint'"
                [class.btn-outline-secondary]="selectedTool() !== 'paint'"
                style="grid-column: span 2;"
                (click)="setTool('paint')">
                Pintar V\xE9rtices
              </button>
            </div>
          </div>

          <!-- Paint Color Option -->
          @if (selectedTool() === 'paint') {
            <div class="form-group mb-3 bg-secondary p-2 rounded border border-dark">
              <label class="small font-weight-bold mb-1 text-light">Color de Pincel:</label>
              <input 
                type="color" 
                [value]="paintColor()" 
                (input)="updatePaintColor($event)" 
                class="form-control form-control-sm p-1 border-0 bg-transparent cursor-pointer w-100"
                style="height: 38px;"
              />
            </div>
          }

          <!-- Brush Size & Intensity -->
          <div class="form-group mb-2">
            <div class="d-flex justify-content-between small">
              <label class="text-muted font-weight-bold mb-1">Tama\xF1o Pincel</label>
              <span class="badge badge-secondary px-2 py-1">{{ brushSize() }}</span>
            </div>
            <input 
              type="range" 
              class="form-control-range" 
              min="0.2" 
              max="3" 
              step="0.1" 
              [value]="brushSize()" 
              (input)="updateBrushSize($event)" 
            />
          </div>

          <div class="form-group mb-3">
            <div class="d-flex justify-content-between small">
              <label class="text-muted font-weight-bold mb-1">Intensidad</label>
              <span class="badge badge-secondary px-2 py-1">{{ brushIntensity() }}</span>
            </div>
            <input 
              type="range" 
              class="form-control-range" 
              min="0.01" 
              max="1.0" 
              step="0.01" 
              [value]="brushIntensity()" 
              (input)="updateBrushIntensity($event)" 
            />
          </div>

          <hr class="border-secondary">

          <!-- Dyntopo / Dynamic Topology -->
          <div class="form-group mb-3 bg-secondary p-2 rounded">
            <div class="custom-control custom-checkbox mb-1">
              <input 
                type="checkbox" 
                class="custom-control-input" 
                id="dyntopoCheck"
                [checked]="enableDyntopo()" 
                (change)="toggleDyntopo($event)" 
              />
              <label class="custom-control-label small font-weight-bold text-light" for="dyntopoCheck">
                Topolog\xEDa Din\xE1mica (Dyntopo)
              </label>
            </div>

            @if (enableDyntopo()) {
              <div class="small mt-2 pt-1 border-top border-dark">
                <div class="d-flex justify-content-between mb-1">
                  <span class="text-muted">Detalle M\xE1x. Arista:</span>
                  <span class="badge badge-dark">{{ maxEdgeLength() }}</span>
                </div>
                <input 
                  type="range" 
                  class="form-control-range" 
                  min="0.05" 
                  max="0.5" 
                  step="0.01" 
                  [value]="maxEdgeLength()" 
                  (input)="updateMaxEdgeLength($event)" 
                />
              </div>
            }
          </div>

          <!-- Base Shape Selector -->
          <div class="form-group mb-3">
            <label class="small text-muted font-weight-bold text-uppercase">Forma Base</label>
            <select class="custom-select custom-select-sm bg-secondary text-light border-secondary" (change)="changeBaseShape($event)">
              <option value="sphere" [selected]="selectedShape() === 'sphere'">Esfera</option>
              <option value="box" [selected]="selectedShape() === 'box'">Cubo</option>
              <option value="cylinder" [selected]="selectedShape() === 'cylinder'">Cilindro</option>
              <option value="torus" [selected]="selectedShape() === 'torus'">Toroide</option>
            </select>
          </div>

          <!-- Canvas Rotation (Z) -->
          <div class="form-group mb-3 bg-secondary p-2 rounded">
            <div class="d-flex justify-content-between small mb-1">
              <label class="text-light font-weight-bold mb-0">Rotaci\xF3n Canvas (Z)</label>
              <span class="badge badge-dark">{{ canvasRotation() }}\xB0</span>
            </div>
            <input 
              type="range" 
              class="form-control-range mb-2" 
              min="0" 
              max="360" 
              step="1" 
              [value]="canvasRotation()" 
              (input)="updateCanvasRotation($event)" 
            />
            <button class="btn btn-outline-light btn-sm btn-block" (click)="resetCanvasRotation()">
              Restablecer Rotaci\xF3n
            </button>
          </div>

          <hr class="border-secondary">

          <!-- Orbit Controls / Camera Options -->
          <div class="form-group mb-3">
            <label class="small text-muted font-weight-bold text-uppercase mb-2">Control de C\xE1mara (Orbit)</label>
            
            <div class="btn-group btn-group-sm w-100 mb-2">
              <button class="btn btn-outline-secondary" (click)="rotateCameraAngle(90)">Girar 90\xB0</button>
              <button class="btn btn-outline-secondary" (click)="rotateCameraAngle(-90)">Girar -90\xB0</button>
            </div>

            <div class="custom-control custom-checkbox small mb-1">
              <input type="checkbox" class="custom-control-input" id="rotCheck" [checked]="enableRotate()" (change)="toggleEnableRotate($event)">
              <label class="custom-control-label" for="rotCheck">Permitir Rotaci\xF3n</label>
            </div>

            <div class="custom-control custom-checkbox small mb-1">
              <input type="checkbox" class="custom-control-input" id="zoomCheck" [checked]="enableZoom()" (change)="toggleEnableZoom($event)">
              <label class="custom-control-label" for="zoomCheck">Permitir Zoom</label>
            </div>

            <div class="custom-control custom-checkbox small mb-1">
              <input type="checkbox" class="custom-control-input" id="panCheck" [checked]="enablePan()" (change)="toggleEnablePan($event)">
              <label class="custom-control-label" for="panCheck">Permitir Desplazamiento (Pan)</label>
            </div>

            <div class="custom-control custom-checkbox small mb-2 mt-2">
              <input type="checkbox" class="custom-control-input" id="autoRotCheck" [checked]="autoRotateCamera()" (change)="toggleAutoRotateCamera($event)">
              <label class="custom-control-label font-weight-bold" for="autoRotCheck">Autorrotaci\xF3n C\xE1mara</label>
            </div>

            @if (autoRotateCamera()) {
              <div class="small mb-2">
                <span class="text-muted">Velocidad: {{ autoRotateSpeed() }}</span>
                <input type="range" class="form-control-range" min="0.5" max="10" step="0.5" [value]="autoRotateSpeed()" (input)="updateAutoRotateSpeed($event)">
              </div>
            }

            <button class="btn btn-outline-secondary btn-sm btn-block mt-2" (click)="resetCamera()">
              Restablecer C\xE1mara
            </button>
          </div>

          <!-- Extra Toggles: Symmetry & Wireframe -->
          <div class="form-group mb-3 bg-secondary p-2 rounded">
            <div class="custom-control custom-checkbox small mb-2">
              <input type="checkbox" class="custom-control-input" id="symCheck" [checked]="symmetryX()" (change)="toggleSymmetry($event)">
              <label class="custom-control-label font-weight-bold text-light" for="symCheck">Simetr\xEDa (Eje X)</label>
            </div>
            <div class="custom-control custom-checkbox small">
              <input type="checkbox" class="custom-control-input" id="wireCheck" [checked]="wireframe()" (change)="toggleWireframe($event)">
              <label class="custom-control-label font-weight-bold text-light" for="wireCheck">Modo Malla (Wireframe)</label>
            </div>
          </div>

          <!-- Mesh Statistics Box -->
          <div class="card bg-secondary text-light p-2 mb-3 small border-0">
            <div class="d-flex justify-content-between">
              <span>V\xE9rtices:</span>
              <strong class="text-warning font-weight-bold">{{ vertexCount() }}</strong>
            </div>
            <div class="d-flex justify-content-between">
              <span>Caras:</span>
              <strong class="text-warning font-weight-bold">{{ faceCount() }}</strong>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="form-group mb-4">
            <button class="btn btn-success btn-block mb-2 font-weight-bold shadow-sm" (click)="downloadGLB()">
              <i class="fas fa-download mr-1"></i> Descargar GLB
            </button>
            <button class="btn btn-outline-danger btn-block font-weight-bold" (click)="resetMesh()">
              Reiniciar Malla
            </button>
          </div>

        </div>
      </div>

      <!-- Three.js Canvas Container -->
      <div #canvasContainer class="w-100 h-100 position-absolute" style="top: 0; left: 0; z-index: 1;"></div>
    </div>
  `, styles: ["/* angular:styles/component:css;3b49651a8728a645f865186a2c9e451a877602a5e64f78861a96008f0f3f030d;/home/linuxlite/WebMEAN/src/app/componentes/sculpt.ts */\n.transition-all {\n  transition: all 0.3s ease-in-out;\n}\n.cursor-pointer {\n  cursor: pointer;\n}\n.card::-webkit-scrollbar {\n  width: 6px;\n}\n.card::-webkit-scrollbar-thumb {\n  background-color: #495057;\n  border-radius: 4px;\n}\n/*# sourceMappingURL=sculpt.css.map */\n"] }]
  }], () => [{ type: NgZone }], { canvasContainer: [{
    type: ViewChild,
    args: ["canvasContainer", { static: true }]
  }], onWindowResize: [{
    type: HostListener,
    args: ["window:resize"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MeshSculptorComponent, { className: "MeshSculptorComponent", filePath: "src/app/componentes/sculpt.ts", lineNumber: 310 });
})();
export {
  MeshSculptorComponent
};
//# sourceMappingURL=chunk-DEEOADDJ.mjs.map
