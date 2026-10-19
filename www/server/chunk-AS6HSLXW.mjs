import './polyfills.server.mjs';
import {
  GLTFExporter
} from "./chunk-ALCPEAGU.mjs";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-GIGPJXHS.mjs";
import {
  Navbar
} from "./chunk-QGEJ4V6S.mjs";
import "./chunk-NIVJ4KPM.mjs";
import {
  OrbitControls
} from "./chunk-MD2XOYTT.mjs";
import {
  AmbientLight,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Color,
  ConeGeometry,
  Controls,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  Euler,
  FileLoader,
  Float32BufferAttribute,
  Line,
  LineBasicMaterial,
  Loader,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  OctahedronGeometry,
  PerspectiveCamera,
  PlaneGeometry,
  Quaternion,
  Raycaster,
  RingGeometry,
  SRGBColorSpace,
  Scene,
  SphereGeometry,
  TorusGeometry,
  TorusKnotGeometry,
  Vector2,
  Vector3,
  WebGLRenderer
} from "./chunk-ULG7G2AN.mjs";
import "./chunk-IESDD46D.mjs";
import "./chunk-JRMDAGFP.mjs";
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
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-GYAE75W3.mjs";
import "./chunk-TB3YAHZW.mjs";

// node_modules/three/examples/jsm/controls/TransformControls.js
var _raycaster = new Raycaster();
var _tempVector = new Vector3();
var _tempVector2 = new Vector3();
var _tempQuaternion = new Quaternion();
var _unit = {
  X: new Vector3(1, 0, 0),
  Y: new Vector3(0, 1, 0),
  Z: new Vector3(0, 0, 1)
};
var _changeEvent = { type: "change" };
var _mouseDownEvent = { type: "mouseDown", mode: null };
var _mouseUpEvent = { type: "mouseUp", mode: null };
var _objectChangeEvent = { type: "objectChange" };
var TransformControls = class extends Controls {
  /**
   * Constructs a new controls instance.
   *
   * @param {Camera} camera - The camera of the rendered scene.
   * @param {?HTMLElement} domElement - The HTML element used for event listeners.
   */
  constructor(camera, domElement = null) {
    super(void 0, domElement);
    const root = new TransformControlsRoot(this);
    this._root = root;
    const gizmo = new TransformControlsGizmo();
    this._gizmo = gizmo;
    root.add(gizmo);
    const plane = new TransformControlsPlane();
    this._plane = plane;
    root.add(plane);
    const scope = this;
    function defineProperty(propName, defaultValue) {
      let propValue = defaultValue;
      Object.defineProperty(scope, propName, {
        get: function() {
          return propValue !== void 0 ? propValue : defaultValue;
        },
        set: function(value) {
          if (propValue !== value) {
            propValue = value;
            plane[propName] = value;
            gizmo[propName] = value;
            scope.dispatchEvent({ type: propName + "-changed", value });
            scope.dispatchEvent(_changeEvent);
          }
        }
      });
      scope[propName] = defaultValue;
      plane[propName] = defaultValue;
      gizmo[propName] = defaultValue;
    }
    defineProperty("camera", camera);
    defineProperty("object", void 0);
    defineProperty("enabled", true);
    defineProperty("axis", null);
    defineProperty("mode", "translate");
    defineProperty("translationSnap", null);
    defineProperty("rotationSnap", null);
    defineProperty("scaleSnap", null);
    defineProperty("space", "world");
    defineProperty("size", 1);
    this.viewport = null;
    defineProperty("dragging", false);
    defineProperty("showX", true);
    defineProperty("showY", true);
    defineProperty("showZ", true);
    defineProperty("showXY", true);
    defineProperty("showYZ", true);
    defineProperty("showXZ", true);
    defineProperty("showXYZE", true);
    defineProperty("showE", true);
    defineProperty("minX", -Infinity);
    defineProperty("maxX", Infinity);
    defineProperty("minY", -Infinity);
    defineProperty("maxY", Infinity);
    defineProperty("minZ", -Infinity);
    defineProperty("maxZ", Infinity);
    const worldPosition = new Vector3();
    const worldPositionStart = new Vector3();
    const worldQuaternion = new Quaternion();
    const worldQuaternionStart = new Quaternion();
    const cameraPosition = new Vector3();
    const cameraQuaternion = new Quaternion();
    const pointStart = new Vector3();
    const pointEnd = new Vector3();
    const rotationAxis = new Vector3();
    const rotationAngle = 0;
    const eye = new Vector3();
    defineProperty("worldPosition", worldPosition);
    defineProperty("worldPositionStart", worldPositionStart);
    defineProperty("worldQuaternion", worldQuaternion);
    defineProperty("worldQuaternionStart", worldQuaternionStart);
    defineProperty("cameraPosition", cameraPosition);
    defineProperty("cameraQuaternion", cameraQuaternion);
    defineProperty("pointStart", pointStart);
    defineProperty("pointEnd", pointEnd);
    defineProperty("rotationAxis", rotationAxis);
    defineProperty("rotationAngle", rotationAngle);
    defineProperty("eye", eye);
    this._offset = new Vector3();
    this._startNorm = new Vector3();
    this._endNorm = new Vector3();
    this._cameraScale = new Vector3();
    this._parentPosition = new Vector3();
    this._parentQuaternion = new Quaternion();
    this._parentQuaternionInv = new Quaternion();
    this._parentScale = new Vector3();
    this._worldScaleStart = new Vector3();
    this._worldQuaternionInv = new Quaternion();
    this._worldScale = new Vector3();
    this._positionStart = new Vector3();
    this._quaternionStart = new Quaternion();
    this._scaleStart = new Vector3();
    this._getPointer = getPointer.bind(this);
    this._onPointerDown = onPointerDown.bind(this);
    this._onPointerHover = onPointerHover.bind(this);
    this._onPointerMove = onPointerMove.bind(this);
    this._onPointerUp = onPointerUp.bind(this);
    if (domElement !== null) {
      this.connect(domElement);
    }
  }
  connect(element) {
    super.connect(element);
    this.domElement.addEventListener("pointerdown", this._onPointerDown);
    this.domElement.addEventListener("pointermove", this._onPointerHover);
    this.domElement.addEventListener("pointerup", this._onPointerUp);
    this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown);
    this.domElement.removeEventListener("pointermove", this._onPointerHover);
    this.domElement.removeEventListener("pointermove", this._onPointerMove);
    this.domElement.removeEventListener("pointerup", this._onPointerUp);
    this.domElement.style.touchAction = "";
  }
  /**
   * Returns the visual representation of the controls. Add the helper to your scene to
   * visually transform the attached  3D object.
   *
   * @return {TransformControlsRoot} The helper.
   */
  getHelper() {
    return this._root;
  }
  pointerHover(pointer) {
    if (this.object === void 0 || this.dragging === true) return;
    if (pointer !== null) _raycaster.setFromCamera(pointer, this.camera);
    const intersect = intersectObjectWithRay(this._gizmo.picker[this.mode], _raycaster);
    if (intersect) {
      this.axis = intersect.object.name;
    } else {
      this.axis = null;
    }
  }
  pointerDown(pointer) {
    if (this.object === void 0 || this.dragging === true || pointer != null && pointer.button !== 0) return;
    if (this.axis !== null) {
      if (pointer !== null) _raycaster.setFromCamera(pointer, this.camera);
      const planeIntersect = intersectObjectWithRay(this._plane, _raycaster, true);
      if (planeIntersect) {
        this.object.updateMatrixWorld();
        this.object.parent.updateMatrixWorld();
        this._positionStart.copy(this.object.position);
        this._quaternionStart.copy(this.object.quaternion);
        this._scaleStart.copy(this.object.scale);
        this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this._worldScaleStart);
        this.pointStart.copy(planeIntersect.point).sub(this.worldPositionStart);
      }
      this.dragging = true;
      _mouseDownEvent.mode = this.mode;
      this.dispatchEvent(_mouseDownEvent);
    }
  }
  pointerMove(pointer) {
    const axis = this.axis;
    const mode = this.mode;
    const object = this.object;
    let space = this.space;
    if (mode === "scale") {
      space = "local";
    } else if (axis === "E" || axis === "XYZE" || axis === "XYZ") {
      space = "world";
    }
    if (object === void 0 || axis === null || this.dragging === false || pointer !== null && pointer.button !== -1) return;
    if (pointer !== null) _raycaster.setFromCamera(pointer, this.camera);
    const planeIntersect = intersectObjectWithRay(this._plane, _raycaster, true);
    if (!planeIntersect) return;
    this.pointEnd.copy(planeIntersect.point).sub(this.worldPositionStart);
    if (mode === "translate") {
      this._offset.copy(this.pointEnd).sub(this.pointStart);
      if (space === "local" && axis !== "XYZ") {
        this._offset.applyQuaternion(this._worldQuaternionInv);
      }
      if (axis.indexOf("X") === -1) this._offset.x = 0;
      if (axis.indexOf("Y") === -1) this._offset.y = 0;
      if (axis.indexOf("Z") === -1) this._offset.z = 0;
      if (space === "local" && axis !== "XYZ") {
        this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale);
      } else {
        this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale);
      }
      object.position.copy(this._offset).add(this._positionStart);
      if (this.translationSnap) {
        if (space === "local") {
          object.position.applyQuaternion(_tempQuaternion.copy(this._quaternionStart).invert());
          if (axis.search("X") !== -1) {
            object.position.x = Math.round(object.position.x / this.translationSnap) * this.translationSnap;
          }
          if (axis.search("Y") !== -1) {
            object.position.y = Math.round(object.position.y / this.translationSnap) * this.translationSnap;
          }
          if (axis.search("Z") !== -1) {
            object.position.z = Math.round(object.position.z / this.translationSnap) * this.translationSnap;
          }
          object.position.applyQuaternion(this._quaternionStart);
        }
        if (space === "world") {
          object.getWorldPosition(_tempVector);
          if (axis.search("X") !== -1) {
            _tempVector.x = Math.round(_tempVector.x / this.translationSnap) * this.translationSnap;
          }
          if (axis.search("Y") !== -1) {
            _tempVector.y = Math.round(_tempVector.y / this.translationSnap) * this.translationSnap;
          }
          if (axis.search("Z") !== -1) {
            _tempVector.z = Math.round(_tempVector.z / this.translationSnap) * this.translationSnap;
          }
          object.position.copy(object.parent.worldToLocal(_tempVector));
        }
      }
      object.position.x = Math.max(this.minX, Math.min(this.maxX, object.position.x));
      object.position.y = Math.max(this.minY, Math.min(this.maxY, object.position.y));
      object.position.z = Math.max(this.minZ, Math.min(this.maxZ, object.position.z));
    } else if (mode === "scale") {
      if (axis.search("XYZ") !== -1) {
        let d = this.pointEnd.length() / this.pointStart.length();
        if (this.pointEnd.dot(this.pointStart) < 0) d *= -1;
        _tempVector2.set(d, d, d);
      } else {
        _tempVector.copy(this.pointStart);
        _tempVector2.copy(this.pointEnd);
        _tempVector.applyQuaternion(this._worldQuaternionInv);
        _tempVector2.applyQuaternion(this._worldQuaternionInv);
        _tempVector2.divide(_tempVector);
        if (axis.search("X") === -1) {
          _tempVector2.x = 1;
        }
        if (axis.search("Y") === -1) {
          _tempVector2.y = 1;
        }
        if (axis.search("Z") === -1) {
          _tempVector2.z = 1;
        }
      }
      object.scale.copy(this._scaleStart).multiply(_tempVector2);
      if (this.scaleSnap) {
        if (axis.search("X") !== -1) {
          object.scale.x = Math.round(object.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap;
        }
        if (axis.search("Y") !== -1) {
          object.scale.y = Math.round(object.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap;
        }
        if (axis.search("Z") !== -1) {
          object.scale.z = Math.round(object.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap;
        }
      }
    } else if (mode === "rotate") {
      this._offset.copy(this.pointEnd).sub(this.pointStart);
      const ROTATION_SPEED = 20 / this.worldPosition.distanceTo(_tempVector.setFromMatrixPosition(this.camera.matrixWorld));
      let _inPlaneRotation = false;
      if (axis === "XYZE") {
        this.rotationAxis.copy(this._offset).cross(this.eye).normalize();
        this.rotationAngle = this._offset.dot(_tempVector.copy(this.rotationAxis).cross(this.eye)) * ROTATION_SPEED;
      } else if (axis === "X" || axis === "Y" || axis === "Z") {
        this.rotationAxis.copy(_unit[axis]);
        _tempVector.copy(_unit[axis]);
        if (space === "local") {
          _tempVector.applyQuaternion(this.worldQuaternion);
        }
        _tempVector.cross(this.eye);
        if (_tempVector.length() === 0) {
          _inPlaneRotation = true;
        } else {
          this.rotationAngle = this._offset.dot(_tempVector.normalize()) * ROTATION_SPEED;
        }
      }
      if (axis === "E" || _inPlaneRotation) {
        this.rotationAxis.copy(this.eye);
        this.rotationAngle = this.pointEnd.angleTo(this.pointStart);
        this._startNorm.copy(this.pointStart).normalize();
        this._endNorm.copy(this.pointEnd).normalize();
        this.rotationAngle *= this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1;
      }
      if (this.rotationSnap) this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap;
      if (space === "local" && axis !== "E" && axis !== "XYZE") {
        object.quaternion.copy(this._quaternionStart);
        object.quaternion.multiply(_tempQuaternion.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize();
      } else {
        this.rotationAxis.applyQuaternion(this._parentQuaternionInv);
        object.quaternion.copy(_tempQuaternion.setFromAxisAngle(this.rotationAxis, this.rotationAngle));
        object.quaternion.multiply(this._quaternionStart).normalize();
      }
    }
    this.dispatchEvent(_changeEvent);
    this.dispatchEvent(_objectChangeEvent);
  }
  pointerUp(pointer) {
    if (pointer !== null && pointer.button !== 0) return;
    if (this.dragging && this.axis !== null) {
      _mouseUpEvent.mode = this.mode;
      this.dispatchEvent(_mouseUpEvent);
    }
    this.dragging = false;
    this.axis = null;
  }
  dispose() {
    this.disconnect();
    this._root.dispose();
  }
  /**
   * Sets the 3D object that should be transformed and ensures the controls UI is visible.
   *
   * @param {Object3D} object -  The 3D object that should be transformed.
   * @return {TransformControls} A reference to this controls.
   */
  attach(object) {
    this.object = object;
    this._root.visible = true;
    return this;
  }
  /**
   * Removes the current 3D object from the controls and makes the helper UI invisible.
   *
   * @return {TransformControls} A reference to this controls.
   */
  detach() {
    this.object = void 0;
    this.axis = null;
    this._root.visible = false;
    return this;
  }
  /**
   * Resets the object's position, rotation and scale to when the current transform began.
   */
  reset() {
    if (!this.enabled) return;
    if (this.dragging) {
      this.object.position.copy(this._positionStart);
      this.object.quaternion.copy(this._quaternionStart);
      this.object.scale.copy(this._scaleStart);
      this.dispatchEvent(_changeEvent);
      this.dispatchEvent(_objectChangeEvent);
      this.pointStart.copy(this.pointEnd);
    }
  }
  /**
   * Returns the raycaster that is used for user interaction. This object is shared between all
   * instances of `TransformControls`.
   *
   * @returns {Raycaster} The internal raycaster.
   */
  getRaycaster() {
    return _raycaster;
  }
  /**
   * Returns the transformation mode.
   *
   * @returns {'translate'|'rotate'|'scale'} The transformation mode.
   */
  getMode() {
    return this.mode;
  }
  /**
   * Sets the given transformation mode.
   *
   * @param {'translate'|'rotate'|'scale'} mode - The transformation mode to set.
   */
  setMode(mode) {
    this.mode = mode;
  }
  /**
   * Sets the translation snap.
   *
   * @param {?number} translationSnap - The translation snap to set.
   */
  setTranslationSnap(translationSnap) {
    this.translationSnap = translationSnap;
  }
  /**
   * Sets the rotation snap.
   *
   * @param {?number} rotationSnap - The rotation snap to set.
   */
  setRotationSnap(rotationSnap) {
    this.rotationSnap = rotationSnap;
  }
  /**
   * Sets the scale snap.
   *
   * @param {?number} scaleSnap - The scale snap to set.
   */
  setScaleSnap(scaleSnap) {
    this.scaleSnap = scaleSnap;
  }
  /**
   * Sets the size of the helper UI.
   *
   * @param {number} size - The size to set.
   */
  setSize(size) {
    this.size = size;
  }
  /**
   * Sets the coordinate space in which transformations are applied.
   *
   * @param {'world'|'local'} space - The space to set.
   */
  setSpace(space) {
    this.space = space;
  }
  /**
   * Sets the colors of the control's gizmo.
   *
   * @param {number|Color|string} xAxis - The x-axis color.
   * @param {number|Color|string} yAxis - The y-axis color.
   * @param {number|Color|string} zAxis - The z-axis color.
   * @param {number|Color|string} active - The color for active elements.
   */
  setColors(xAxis, yAxis, zAxis, active) {
    const materialLib = this._gizmo.materialLib;
    materialLib.xAxis.color.set(xAxis);
    materialLib.yAxis.color.set(yAxis);
    materialLib.zAxis.color.set(zAxis);
    materialLib.active.color.set(active);
    materialLib.xAxisTransparent.color.set(xAxis);
    materialLib.yAxisTransparent.color.set(yAxis);
    materialLib.zAxisTransparent.color.set(zAxis);
    materialLib.activeTransparent.color.set(active);
    if (materialLib.xAxis._color) materialLib.xAxis._color.set(xAxis);
    if (materialLib.yAxis._color) materialLib.yAxis._color.set(yAxis);
    if (materialLib.zAxis._color) materialLib.zAxis._color.set(zAxis);
    if (materialLib.active._color) materialLib.active._color.set(active);
    if (materialLib.xAxisTransparent._color) materialLib.xAxisTransparent._color.set(xAxis);
    if (materialLib.yAxisTransparent._color) materialLib.yAxisTransparent._color.set(yAxis);
    if (materialLib.zAxisTransparent._color) materialLib.zAxisTransparent._color.set(zAxis);
    if (materialLib.activeTransparent._color) materialLib.activeTransparent._color.set(active);
  }
};
function getPointer(event) {
  if (this.domElement.ownerDocument.pointerLockElement) {
    return {
      x: 0,
      y: 0,
      button: event.button
    };
  } else {
    const rect = this.domElement.getBoundingClientRect();
    const viewport = this.viewport;
    let originX, originY, regionWidth, regionHeight;
    if (viewport !== null) {
      originX = viewport.x;
      originY = rect.height - viewport.y - viewport.w;
      regionWidth = viewport.z;
      regionHeight = viewport.w;
    } else {
      originX = 0;
      originY = 0;
      regionWidth = rect.width;
      regionHeight = rect.height;
    }
    return {
      x: (event.clientX - rect.left - originX) / regionWidth * 2 - 1,
      y: -(event.clientY - rect.top - originY) / regionHeight * 2 + 1,
      button: event.button
    };
  }
}
function onPointerHover(event) {
  if (!this.enabled) return;
  switch (event.pointerType) {
    case "mouse":
    case "pen":
      this.pointerHover(this._getPointer(event));
      break;
  }
}
function onPointerDown(event) {
  if (!this.enabled) return;
  if (!document.pointerLockElement) {
    this.domElement.setPointerCapture(event.pointerId);
  }
  this.domElement.addEventListener("pointermove", this._onPointerMove);
  this.pointerHover(this._getPointer(event));
  this.pointerDown(this._getPointer(event));
}
function onPointerMove(event) {
  if (!this.enabled) return;
  this.pointerMove(this._getPointer(event));
}
function onPointerUp(event) {
  if (!this.enabled) return;
  this.domElement.releasePointerCapture(event.pointerId);
  this.domElement.removeEventListener("pointermove", this._onPointerMove);
  this.pointerUp(this._getPointer(event));
}
function intersectObjectWithRay(object, raycaster, includeInvisible) {
  const allIntersections = raycaster.intersectObject(object, true);
  for (let i = 0; i < allIntersections.length; i++) {
    if (allIntersections[i].object.visible || includeInvisible) {
      return allIntersections[i];
    }
  }
  return false;
}
var _tempEuler = new Euler();
var _alignVector = new Vector3(0, 1, 0);
var _zeroVector = new Vector3(0, 0, 0);
var _lookAtMatrix = new Matrix4();
var _tempQuaternion2 = new Quaternion();
var _identityQuaternion = new Quaternion();
var _dirVector = new Vector3();
var _tempMatrix = new Matrix4();
var _unitX = new Vector3(1, 0, 0);
var _unitY = new Vector3(0, 1, 0);
var _unitZ = new Vector3(0, 0, 1);
var _v1 = new Vector3();
var _v2 = new Vector3();
var _v3 = new Vector3();
var TransformControlsRoot = class extends Object3D {
  constructor(controls) {
    super();
    this.isTransformControlsRoot = true;
    this.controls = controls;
    this.visible = false;
  }
  // updateMatrixWorld updates key transformation variables
  updateMatrixWorld(force) {
    const controls = this.controls;
    if (controls.object !== void 0) {
      controls.object.updateMatrixWorld();
      if (controls.object.parent === null) {
        console.error("TransformControls: The attached 3D object must be a part of the scene graph.");
      } else {
        controls.object.parent.matrixWorld.decompose(controls._parentPosition, controls._parentQuaternion, controls._parentScale);
      }
      controls.object.matrixWorld.decompose(controls.worldPosition, controls.worldQuaternion, controls._worldScale);
      controls._parentQuaternionInv.copy(controls._parentQuaternion).invert();
      controls._worldQuaternionInv.copy(controls.worldQuaternion).invert();
    }
    controls.camera.updateMatrixWorld();
    controls.camera.matrixWorld.decompose(controls.cameraPosition, controls.cameraQuaternion, controls._cameraScale);
    if (controls.camera.isOrthographicCamera) {
      controls.camera.getWorldDirection(controls.eye).negate();
    } else {
      controls.eye.copy(controls.cameraPosition).sub(controls.worldPosition).normalize();
    }
    if (this.parent) {
      _tempMatrix.copy(this.parent.matrixWorld).invert();
      _tempMatrix.decompose(this.position, this.quaternion, this.scale);
    }
    super.updateMatrixWorld(force);
  }
  dispose() {
    this.traverse(function(child) {
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    });
  }
};
var TransformControlsGizmo = class extends Object3D {
  constructor() {
    super();
    this.isTransformControlsGizmo = true;
    this.type = "TransformControlsGizmo";
    const gizmoMaterial = new MeshBasicMaterial({
      depthTest: false,
      depthWrite: false,
      fog: false,
      toneMapped: false,
      transparent: true
    });
    const gizmoLineMaterial = new LineBasicMaterial({
      depthTest: false,
      depthWrite: false,
      fog: false,
      toneMapped: false,
      transparent: true
    });
    const matInvisible = gizmoMaterial.clone();
    matInvisible.opacity = 0.15;
    const matHelper = gizmoLineMaterial.clone();
    matHelper.opacity = 0.5;
    const matRed = gizmoMaterial.clone();
    matRed.color.setHex(16711680);
    const matGreen = gizmoMaterial.clone();
    matGreen.color.setHex(65280);
    const matBlue = gizmoMaterial.clone();
    matBlue.color.setHex(255);
    const matRedTransparent = gizmoMaterial.clone();
    matRedTransparent.color.setHex(16711680);
    matRedTransparent.opacity = 0.5;
    const matGreenTransparent = gizmoMaterial.clone();
    matGreenTransparent.color.setHex(65280);
    matGreenTransparent.opacity = 0.5;
    const matBlueTransparent = gizmoMaterial.clone();
    matBlueTransparent.color.setHex(255);
    matBlueTransparent.opacity = 0.5;
    const matWhiteTransparent = gizmoMaterial.clone();
    matWhiteTransparent.opacity = 0.25;
    const matYellowTransparent = gizmoMaterial.clone();
    matYellowTransparent.color.setHex(16776960);
    matYellowTransparent.opacity = 0.25;
    const matYellow = gizmoMaterial.clone();
    matYellow.color.setHex(16776960);
    const matGray = gizmoMaterial.clone();
    matGray.color.setHex(7895160);
    this.materialLib = {
      xAxis: matRed,
      yAxis: matGreen,
      zAxis: matBlue,
      active: matYellow,
      xAxisTransparent: matRedTransparent,
      yAxisTransparent: matGreenTransparent,
      zAxisTransparent: matBlueTransparent,
      activeTransparent: matYellowTransparent
    };
    const arrowGeometry = new CylinderGeometry(0, 0.04, 0.1, 12);
    arrowGeometry.translate(0, 0.05, 0);
    const scaleHandleGeometry = new BoxGeometry(0.08, 0.08, 0.08);
    scaleHandleGeometry.translate(0, 0.04, 0);
    const lineGeometry = new BufferGeometry();
    lineGeometry.setAttribute("position", new Float32BufferAttribute([0, 0, 0, 1, 0, 0], 3));
    const lineGeometry2 = new CylinderGeometry(75e-4, 75e-4, 0.5, 3);
    lineGeometry2.translate(0, 0.25, 0);
    function CircleGeometry(radius, arc) {
      const geometry = new TorusGeometry(radius, 75e-4, 3, 64, arc * Math.PI * 2);
      geometry.rotateY(Math.PI / 2);
      geometry.rotateX(Math.PI / 2);
      return geometry;
    }
    function TranslateHelperGeometry() {
      const geometry = new BufferGeometry();
      geometry.setAttribute("position", new Float32BufferAttribute([0, 0, 0, 1, 1, 1], 3));
      return geometry;
    }
    const gizmoTranslate = {
      X: [
        [new Mesh(arrowGeometry, matRed), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new Mesh(arrowGeometry, matRed), [-0.5, 0, 0], [0, 0, Math.PI / 2]],
        [new Mesh(lineGeometry2, matRed), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      Y: [
        [new Mesh(arrowGeometry, matGreen), [0, 0.5, 0]],
        [new Mesh(arrowGeometry, matGreen), [0, -0.5, 0], [Math.PI, 0, 0]],
        [new Mesh(lineGeometry2, matGreen)]
      ],
      Z: [
        [new Mesh(arrowGeometry, matBlue), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new Mesh(arrowGeometry, matBlue), [0, 0, -0.5], [-Math.PI / 2, 0, 0]],
        [new Mesh(lineGeometry2, matBlue), null, [Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new Mesh(new OctahedronGeometry(0.1, 0), matWhiteTransparent), [0, 0, 0]]
      ],
      XY: [
        [new Mesh(new BoxGeometry(0.15, 0.15, 0.01), matBlueTransparent), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new Mesh(new BoxGeometry(0.15, 0.15, 0.01), matRedTransparent), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new Mesh(new BoxGeometry(0.15, 0.15, 0.01), matGreenTransparent), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    };
    const pickerTranslate = {
      X: [
        [new Mesh(new CylinderGeometry(0.2, 0, 0.6, 4), matInvisible), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new Mesh(new CylinderGeometry(0.2, 0, 0.6, 4), matInvisible), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new Mesh(new CylinderGeometry(0.2, 0, 0.6, 4), matInvisible), [0, 0.3, 0]],
        [new Mesh(new CylinderGeometry(0.2, 0, 0.6, 4), matInvisible), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new Mesh(new CylinderGeometry(0.2, 0, 0.6, 4), matInvisible), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new Mesh(new CylinderGeometry(0.2, 0, 0.6, 4), matInvisible), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new Mesh(new OctahedronGeometry(0.2, 0), matInvisible)]
      ],
      XY: [
        [new Mesh(new BoxGeometry(0.2, 0.2, 0.01), matInvisible), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new Mesh(new BoxGeometry(0.2, 0.2, 0.01), matInvisible), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new Mesh(new BoxGeometry(0.2, 0.2, 0.01), matInvisible), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    };
    const helperTranslate = {
      START: [
        [new Mesh(new OctahedronGeometry(0.01, 2), matHelper), null, null, null, "helper"]
      ],
      END: [
        [new Mesh(new OctahedronGeometry(0.01, 2), matHelper), null, null, null, "helper"]
      ],
      DELTA: [
        [new Line(TranslateHelperGeometry(), matHelper), null, null, null, "helper"]
      ],
      X: [
        [new Line(lineGeometry, matHelper), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new Line(lineGeometry, matHelper), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new Line(lineGeometry, matHelper), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    };
    const gizmoRotate = {
      XYZE: [
        [new Mesh(CircleGeometry(0.5, 1), matGray), null, [0, Math.PI / 2, 0]]
      ],
      X: [
        [new Mesh(CircleGeometry(0.5, 0.5), matRed)]
      ],
      Y: [
        [new Mesh(CircleGeometry(0.5, 0.5), matGreen), null, [0, 0, -Math.PI / 2]]
      ],
      Z: [
        [new Mesh(CircleGeometry(0.5, 0.5), matBlue), null, [0, Math.PI / 2, 0]]
      ],
      E: [
        [new Mesh(CircleGeometry(0.75, 1), matYellowTransparent), null, [0, Math.PI / 2, 0]]
      ]
    };
    const helperRotate = {
      AXIS: [
        [new Line(lineGeometry, matHelper), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ]
    };
    const pickerRotate = {
      XYZE: [
        [new Mesh(new SphereGeometry(0.25, 10, 8), matInvisible)]
      ],
      X: [
        [new Mesh(new TorusGeometry(0.5, 0.1, 4, 24), matInvisible), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]
      ],
      Y: [
        [new Mesh(new TorusGeometry(0.5, 0.1, 4, 24), matInvisible), [0, 0, 0], [Math.PI / 2, 0, 0]]
      ],
      Z: [
        [new Mesh(new TorusGeometry(0.5, 0.1, 4, 24), matInvisible), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      E: [
        [new Mesh(new TorusGeometry(0.75, 0.1, 2, 24), matInvisible)]
      ]
    };
    const gizmoScale = {
      X: [
        [new Mesh(scaleHandleGeometry, matRed), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new Mesh(lineGeometry2, matRed), [0, 0, 0], [0, 0, -Math.PI / 2]],
        [new Mesh(scaleHandleGeometry, matRed), [-0.5, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new Mesh(scaleHandleGeometry, matGreen), [0, 0.5, 0]],
        [new Mesh(lineGeometry2, matGreen)],
        [new Mesh(scaleHandleGeometry, matGreen), [0, -0.5, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new Mesh(scaleHandleGeometry, matBlue), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new Mesh(lineGeometry2, matBlue), [0, 0, 0], [Math.PI / 2, 0, 0]],
        [new Mesh(scaleHandleGeometry, matBlue), [0, 0, -0.5], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new Mesh(new BoxGeometry(0.15, 0.15, 0.01), matBlueTransparent), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new Mesh(new BoxGeometry(0.15, 0.15, 0.01), matRedTransparent), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new Mesh(new BoxGeometry(0.15, 0.15, 0.01), matGreenTransparent), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new Mesh(new BoxGeometry(0.1, 0.1, 0.1), matWhiteTransparent)]
      ]
    };
    const pickerScale = {
      X: [
        [new Mesh(new CylinderGeometry(0.2, 0, 0.6, 4), matInvisible), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new Mesh(new CylinderGeometry(0.2, 0, 0.6, 4), matInvisible), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new Mesh(new CylinderGeometry(0.2, 0, 0.6, 4), matInvisible), [0, 0.3, 0]],
        [new Mesh(new CylinderGeometry(0.2, 0, 0.6, 4), matInvisible), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new Mesh(new CylinderGeometry(0.2, 0, 0.6, 4), matInvisible), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new Mesh(new CylinderGeometry(0.2, 0, 0.6, 4), matInvisible), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new Mesh(new BoxGeometry(0.2, 0.2, 0.01), matInvisible), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new Mesh(new BoxGeometry(0.2, 0.2, 0.01), matInvisible), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new Mesh(new BoxGeometry(0.2, 0.2, 0.01), matInvisible), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new Mesh(new BoxGeometry(0.2, 0.2, 0.2), matInvisible), [0, 0, 0]]
      ]
    };
    const helperScale = {
      X: [
        [new Line(lineGeometry, matHelper), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new Line(lineGeometry, matHelper), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new Line(lineGeometry, matHelper), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    };
    function setupGizmo(gizmoMap) {
      const gizmo = new Object3D();
      for (const name in gizmoMap) {
        for (let i = gizmoMap[name].length; i--; ) {
          const object = gizmoMap[name][i][0].clone();
          const position = gizmoMap[name][i][1];
          const rotation = gizmoMap[name][i][2];
          const scale = gizmoMap[name][i][3];
          const tag = gizmoMap[name][i][4];
          object.name = name;
          object.tag = tag;
          if (position) {
            object.position.set(position[0], position[1], position[2]);
          }
          if (rotation) {
            object.rotation.set(rotation[0], rotation[1], rotation[2]);
          }
          if (scale) {
            object.scale.set(scale[0], scale[1], scale[2]);
          }
          object.updateMatrix();
          const tempGeometry = object.geometry.clone();
          tempGeometry.applyMatrix4(object.matrix);
          object.geometry = tempGeometry;
          object.renderOrder = Infinity;
          object.position.set(0, 0, 0);
          object.rotation.set(0, 0, 0);
          object.scale.set(1, 1, 1);
          gizmo.add(object);
        }
      }
      return gizmo;
    }
    this.gizmo = {};
    this.picker = {};
    this.helper = {};
    this.add(this.gizmo["translate"] = setupGizmo(gizmoTranslate));
    this.add(this.gizmo["rotate"] = setupGizmo(gizmoRotate));
    this.add(this.gizmo["scale"] = setupGizmo(gizmoScale));
    this.add(this.picker["translate"] = setupGizmo(pickerTranslate));
    this.add(this.picker["rotate"] = setupGizmo(pickerRotate));
    this.add(this.picker["scale"] = setupGizmo(pickerScale));
    this.add(this.helper["translate"] = setupGizmo(helperTranslate));
    this.add(this.helper["rotate"] = setupGizmo(helperRotate));
    this.add(this.helper["scale"] = setupGizmo(helperScale));
    this.picker["translate"].visible = false;
    this.picker["rotate"].visible = false;
    this.picker["scale"].visible = false;
  }
  // updateMatrixWorld will update transformations and appearance of individual handles
  updateMatrixWorld(force) {
    const space = this.mode === "scale" ? "local" : this.space;
    const quaternion = space === "local" ? this.worldQuaternion : _identityQuaternion;
    this.gizmo["translate"].visible = this.mode === "translate";
    this.gizmo["rotate"].visible = this.mode === "rotate";
    this.gizmo["scale"].visible = this.mode === "scale";
    this.helper["translate"].visible = this.mode === "translate";
    this.helper["rotate"].visible = this.mode === "rotate";
    this.helper["scale"].visible = this.mode === "scale";
    let handles = [];
    handles = handles.concat(this.picker[this.mode].children);
    handles = handles.concat(this.gizmo[this.mode].children);
    handles = handles.concat(this.helper[this.mode].children);
    for (let i = 0; i < handles.length; i++) {
      const handle = handles[i];
      handle.visible = true;
      handle.rotation.set(0, 0, 0);
      handle.position.copy(this.worldPosition);
      let factor;
      if (this.camera.isOrthographicCamera) {
        factor = (this.camera.top - this.camera.bottom) / this.camera.zoom;
      } else {
        factor = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7);
      }
      handle.scale.set(1, 1, 1).multiplyScalar(factor * this.size / 4);
      if (handle.tag === "helper") {
        handle.visible = false;
        if (handle.name === "AXIS") {
          handle.visible = !!this.axis;
          if (this.axis === "X") {
            _tempQuaternion.setFromEuler(_tempEuler.set(0, 0, 0));
            handle.quaternion.copy(quaternion).multiply(_tempQuaternion);
            if (Math.abs(_alignVector.copy(_unitX).applyQuaternion(quaternion).dot(this.eye)) > 0.9) {
              handle.visible = false;
            }
          }
          if (this.axis === "Y") {
            _tempQuaternion.setFromEuler(_tempEuler.set(0, 0, Math.PI / 2));
            handle.quaternion.copy(quaternion).multiply(_tempQuaternion);
            if (Math.abs(_alignVector.copy(_unitY).applyQuaternion(quaternion).dot(this.eye)) > 0.9) {
              handle.visible = false;
            }
          }
          if (this.axis === "Z") {
            _tempQuaternion.setFromEuler(_tempEuler.set(0, Math.PI / 2, 0));
            handle.quaternion.copy(quaternion).multiply(_tempQuaternion);
            if (Math.abs(_alignVector.copy(_unitZ).applyQuaternion(quaternion).dot(this.eye)) > 0.9) {
              handle.visible = false;
            }
          }
          if (this.axis === "XYZE") {
            _tempQuaternion.setFromEuler(_tempEuler.set(0, Math.PI / 2, 0));
            _alignVector.copy(this.rotationAxis);
            handle.quaternion.setFromRotationMatrix(_lookAtMatrix.lookAt(_zeroVector, _alignVector, _unitY));
            handle.quaternion.multiply(_tempQuaternion);
            handle.visible = this.dragging;
          }
          if (this.axis === "E") {
            handle.visible = false;
          }
        } else if (handle.name === "START") {
          handle.position.copy(this.worldPositionStart);
          handle.visible = this.dragging;
        } else if (handle.name === "END") {
          handle.position.copy(this.worldPosition);
          handle.visible = this.dragging;
        } else if (handle.name === "DELTA") {
          handle.position.copy(this.worldPositionStart);
          handle.quaternion.copy(this.worldQuaternionStart);
          _tempVector.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1);
          _tempVector.applyQuaternion(this.worldQuaternionStart.clone().invert());
          handle.scale.copy(_tempVector);
          handle.visible = this.dragging;
        } else {
          handle.quaternion.copy(quaternion);
          if (this.dragging) {
            handle.position.copy(this.worldPositionStart);
          } else {
            handle.position.copy(this.worldPosition);
          }
          if (this.axis) {
            handle.visible = this.axis.search(handle.name) !== -1;
          }
        }
        continue;
      }
      handle.quaternion.copy(quaternion);
      if (this.mode === "translate" || this.mode === "scale") {
        const AXIS_HIDE_THRESHOLD = 0.99;
        const PLANE_HIDE_THRESHOLD = 0.2;
        if (handle.name === "X") {
          if (Math.abs(_alignVector.copy(_unitX).applyQuaternion(quaternion).dot(this.eye)) > AXIS_HIDE_THRESHOLD) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }
        if (handle.name === "Y") {
          if (Math.abs(_alignVector.copy(_unitY).applyQuaternion(quaternion).dot(this.eye)) > AXIS_HIDE_THRESHOLD) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }
        if (handle.name === "Z") {
          if (Math.abs(_alignVector.copy(_unitZ).applyQuaternion(quaternion).dot(this.eye)) > AXIS_HIDE_THRESHOLD) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }
        if (handle.name === "XY") {
          if (Math.abs(_alignVector.copy(_unitZ).applyQuaternion(quaternion).dot(this.eye)) < PLANE_HIDE_THRESHOLD) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }
        if (handle.name === "YZ") {
          if (Math.abs(_alignVector.copy(_unitX).applyQuaternion(quaternion).dot(this.eye)) < PLANE_HIDE_THRESHOLD) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }
        if (handle.name === "XZ") {
          if (Math.abs(_alignVector.copy(_unitY).applyQuaternion(quaternion).dot(this.eye)) < PLANE_HIDE_THRESHOLD) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }
      } else if (this.mode === "rotate") {
        _tempQuaternion2.copy(quaternion);
        _alignVector.copy(this.eye).applyQuaternion(_tempQuaternion.copy(quaternion).invert());
        if (handle.name.search("E") !== -1) {
          handle.quaternion.setFromRotationMatrix(_lookAtMatrix.lookAt(this.eye, _zeroVector, _unitY));
        }
        if (handle.name === "X") {
          _tempQuaternion.setFromAxisAngle(_unitX, Math.atan2(-_alignVector.y, _alignVector.z));
          _tempQuaternion.multiplyQuaternions(_tempQuaternion2, _tempQuaternion);
          handle.quaternion.copy(_tempQuaternion);
        }
        if (handle.name === "Y") {
          _tempQuaternion.setFromAxisAngle(_unitY, Math.atan2(_alignVector.x, _alignVector.z));
          _tempQuaternion.multiplyQuaternions(_tempQuaternion2, _tempQuaternion);
          handle.quaternion.copy(_tempQuaternion);
        }
        if (handle.name === "Z") {
          _tempQuaternion.setFromAxisAngle(_unitZ, Math.atan2(_alignVector.y, _alignVector.x));
          _tempQuaternion.multiplyQuaternions(_tempQuaternion2, _tempQuaternion);
          handle.quaternion.copy(_tempQuaternion);
        }
      }
      handle.visible = handle.visible && (handle.name.indexOf("X") === -1 || this.showX);
      handle.visible = handle.visible && (handle.name.indexOf("Y") === -1 || this.showY);
      handle.visible = handle.visible && (handle.name.indexOf("Z") === -1 || this.showZ);
      handle.visible = handle.visible && (handle.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ);
      handle.visible = handle.visible && (handle.name.indexOf("XY") === -1 || this.showXY);
      handle.visible = handle.visible && (handle.name.indexOf("YZ") === -1 || this.showYZ);
      handle.visible = handle.visible && (handle.name.indexOf("XZ") === -1 || this.showXZ);
      handle.visible = handle.visible && (handle.name !== "E" || this.showE);
      handle.visible = handle.visible && (handle.name !== "XYZE" || this.showXYZE);
      handle.material._color = handle.material._color || handle.material.color.clone();
      handle.material._opacity = handle.material._opacity || handle.material.opacity;
      handle.material.color.copy(handle.material._color);
      handle.material.opacity = handle.material._opacity;
      if (this.enabled && this.axis) {
        if (handle.name === this.axis) {
          handle.material.color.copy(this.materialLib.active.color);
          handle.material.opacity = 1;
        } else if (this.axis.split("").some(function(a) {
          return handle.name === a;
        })) {
          handle.material.color.copy(this.materialLib.active.color);
          handle.material.opacity = 1;
        }
      }
    }
    super.updateMatrixWorld(force);
  }
};
var TransformControlsPlane = class extends Mesh {
  constructor() {
    super(
      new PlaneGeometry(1e5, 1e5, 2, 2),
      new MeshBasicMaterial({ visible: false, wireframe: true, side: DoubleSide, transparent: true, opacity: 0.1, toneMapped: false })
    );
    this.isTransformControlsPlane = true;
    this.type = "TransformControlsPlane";
  }
  updateMatrixWorld(force) {
    let space = this.space;
    this.position.copy(this.worldPosition);
    if (this.mode === "scale") space = "local";
    _v1.copy(_unitX).applyQuaternion(space === "local" ? this.worldQuaternion : _identityQuaternion);
    _v2.copy(_unitY).applyQuaternion(space === "local" ? this.worldQuaternion : _identityQuaternion);
    _v3.copy(_unitZ).applyQuaternion(space === "local" ? this.worldQuaternion : _identityQuaternion);
    _alignVector.copy(_v2);
    switch (this.mode) {
      case "translate":
      case "scale":
        switch (this.axis) {
          case "X":
            _alignVector.copy(this.eye).cross(_v1);
            _dirVector.copy(_v1).cross(_alignVector);
            break;
          case "Y":
            _alignVector.copy(this.eye).cross(_v2);
            _dirVector.copy(_v2).cross(_alignVector);
            break;
          case "Z":
            _alignVector.copy(this.eye).cross(_v3);
            _dirVector.copy(_v3).cross(_alignVector);
            break;
          case "XY":
            _dirVector.copy(_v3);
            break;
          case "YZ":
            _dirVector.copy(_v1);
            break;
          case "XZ":
            _alignVector.copy(_v3);
            _dirVector.copy(_v2);
            break;
          case "XYZ":
          case "E":
            _dirVector.set(0, 0, 0);
            break;
        }
        break;
      case "rotate":
      default:
        _dirVector.set(0, 0, 0);
    }
    if (_dirVector.length() === 0) {
      this.quaternion.copy(this.cameraQuaternion);
    } else {
      _tempMatrix.lookAt(_tempVector.set(0, 0, 0), _dirVector, _alignVector);
      this.quaternion.setFromRotationMatrix(_tempMatrix);
    }
    super.updateMatrixWorld(force);
  }
};

// node_modules/three/examples/jsm/loaders/STLLoader.js
var STLLoader = class extends Loader {
  /**
   * Constructs a new STL loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(manager) {
    super(manager);
  }
  /**
   * Starts loading from the given URL and passes the loaded STL asset
   * to the `onLoad()` callback.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(BufferGeometry)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  load(url, onLoad, onProgress, onError) {
    const scope = this;
    const loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setResponseType("arraybuffer");
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);
    loader.load(url, function(text) {
      try {
        onLoad(scope.parse(text));
      } catch (e) {
        if (onError) {
          onError(e);
        } else {
          console.error(e);
        }
        scope.manager.itemError(url);
      }
    }, onProgress, onError);
  }
  /**
   * Parses the given STL data and returns the resulting geometry.
   *
   * @param {ArrayBuffer} data - The raw STL data as an array buffer.
   * @return {BufferGeometry} The parsed geometry.
   */
  parse(data) {
    function isBinary(data2) {
      const reader = new DataView(data2);
      const face_size = 32 / 8 * 3 + 32 / 8 * 3 * 3 + 16 / 8;
      const n_faces = reader.getUint32(80, true);
      const expect = 80 + 32 / 8 + n_faces * face_size;
      if (expect === reader.byteLength) {
        return true;
      }
      const solid = [115, 111, 108, 105, 100];
      for (let off = 0; off < 5; off++) {
        if (matchDataViewAt(solid, reader, off)) return false;
      }
      return true;
    }
    function matchDataViewAt(query, reader, offset) {
      for (let i = 0, il = query.length; i < il; i++) {
        if (query[i] !== reader.getUint8(offset + i)) return false;
      }
      return true;
    }
    function parseBinary(data2) {
      const reader = new DataView(data2);
      const faces = reader.getUint32(80, true);
      let r, g, b, hasColors = false, colors;
      let defaultR, defaultG, defaultB, alpha;
      for (let index = 0; index < 80 - 10; index++) {
        if (reader.getUint32(index, false) == 1129270351 && reader.getUint8(index + 4) == 82 && reader.getUint8(index + 5) == 61) {
          hasColors = true;
          colors = new Float32Array(faces * 3 * 3);
          defaultR = reader.getUint8(index + 6) / 255;
          defaultG = reader.getUint8(index + 7) / 255;
          defaultB = reader.getUint8(index + 8) / 255;
          alpha = reader.getUint8(index + 9) / 255;
        }
      }
      const dataOffset = 84;
      const faceLength = 12 * 4 + 2;
      const geometry = new BufferGeometry();
      const vertices = new Float32Array(faces * 3 * 3);
      const normals = new Float32Array(faces * 3 * 3);
      const color = new Color();
      for (let face = 0; face < faces; face++) {
        const start = dataOffset + face * faceLength;
        const normalX = reader.getFloat32(start, true);
        const normalY = reader.getFloat32(start + 4, true);
        const normalZ = reader.getFloat32(start + 8, true);
        if (hasColors) {
          const packedColor = reader.getUint16(start + 48, true);
          if ((packedColor & 32768) === 0) {
            r = (packedColor & 31) / 31;
            g = (packedColor >> 5 & 31) / 31;
            b = (packedColor >> 10 & 31) / 31;
          } else {
            r = defaultR;
            g = defaultG;
            b = defaultB;
          }
        }
        for (let i = 1; i <= 3; i++) {
          const vertexstart = start + i * 12;
          const componentIdx = face * 3 * 3 + (i - 1) * 3;
          vertices[componentIdx] = reader.getFloat32(vertexstart, true);
          vertices[componentIdx + 1] = reader.getFloat32(vertexstart + 4, true);
          vertices[componentIdx + 2] = reader.getFloat32(vertexstart + 8, true);
          normals[componentIdx] = normalX;
          normals[componentIdx + 1] = normalY;
          normals[componentIdx + 2] = normalZ;
          if (hasColors) {
            color.setRGB(r, g, b, SRGBColorSpace);
            colors[componentIdx] = color.r;
            colors[componentIdx + 1] = color.g;
            colors[componentIdx + 2] = color.b;
          }
        }
      }
      geometry.setAttribute("position", new BufferAttribute(vertices, 3));
      geometry.setAttribute("normal", new BufferAttribute(normals, 3));
      if (hasColors) {
        geometry.setAttribute("color", new BufferAttribute(colors, 3));
        geometry.hasColors = true;
        geometry.alpha = alpha;
      }
      return geometry;
    }
    function parseASCII(data2) {
      const geometry = new BufferGeometry();
      const patternSolid = /solid([\s\S]*?)endsolid/g;
      const patternFace = /facet([\s\S]*?)endfacet/g;
      const patternName = /solid\s(.+)/;
      let faceCounter = 0;
      const patternFloat = /[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source;
      const patternVertex = new RegExp("vertex" + patternFloat + patternFloat + patternFloat, "g");
      const patternNormal = new RegExp("normal" + patternFloat + patternFloat + patternFloat, "g");
      const vertices = [];
      const normals = [];
      const groupNames = [];
      const normal = new Vector3();
      let result;
      let groupCount = 0;
      let startVertex = 0;
      let endVertex = 0;
      while ((result = patternSolid.exec(data2)) !== null) {
        startVertex = endVertex;
        const solid = result[0];
        const name = (result = patternName.exec(solid)) !== null ? result[1] : "";
        groupNames.push(name);
        while ((result = patternFace.exec(solid)) !== null) {
          let vertexCountPerFace = 0;
          let normalCountPerFace = 0;
          const text = result[0];
          while ((result = patternNormal.exec(text)) !== null) {
            normal.x = parseFloat(result[1]);
            normal.y = parseFloat(result[2]);
            normal.z = parseFloat(result[3]);
            normalCountPerFace++;
          }
          while ((result = patternVertex.exec(text)) !== null) {
            vertices.push(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]));
            normals.push(normal.x, normal.y, normal.z);
            vertexCountPerFace++;
            endVertex++;
          }
          if (normalCountPerFace !== 1) {
            console.error("THREE.STLLoader: Something isn't right with the normal of face number " + faceCounter);
          }
          if (vertexCountPerFace !== 3) {
            console.error("THREE.STLLoader: Something isn't right with the vertices of face number " + faceCounter);
          }
          faceCounter++;
        }
        const start = startVertex;
        const count = endVertex - startVertex;
        geometry.userData.groupNames = groupNames;
        geometry.addGroup(start, count, groupCount);
        groupCount++;
      }
      geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
      geometry.setAttribute("normal", new Float32BufferAttribute(normals, 3));
      return geometry;
    }
    function ensureString(buffer) {
      if (typeof buffer !== "string") {
        return new TextDecoder().decode(buffer);
      }
      return buffer;
    }
    function ensureBinary(buffer) {
      if (typeof buffer === "string") {
        const array_buffer = new Uint8Array(buffer.length);
        for (let i = 0; i < buffer.length; i++) {
          array_buffer[i] = buffer.charCodeAt(i) & 255;
        }
        return array_buffer.buffer || array_buffer;
      } else {
        return buffer;
      }
    }
    const binData = ensureBinary(data);
    return isBinary(binData) ? parseBinary(binData) : parseASCII(ensureString(data));
  }
};

// node_modules/three/examples/jsm/exporters/STLExporter.js
var STLExporter = class {
  /**
   * Parses the given 3D object and generates the STL output.
   *
   * If the 3D object is composed of multiple children and geometry, they are merged into a single mesh in the file.
   *
   * @param {Object3D} scene - A scene, mesh or any other 3D object containing meshes to encode.
   * @param {STLExporter~Options} options - The export options.
   * @return {string|ArrayBuffer} The exported STL.
   */
  parse(scene, options = {}) {
    options = Object.assign({
      binary: false
    }, options);
    const binary = options.binary;
    const objects = [];
    let triangles = 0;
    scene.traverse(function(object) {
      if (object.isMesh) {
        const geometry = object.geometry;
        const index = geometry.index;
        const positionAttribute = geometry.getAttribute("position");
        triangles += index !== null ? index.count / 3 : positionAttribute.count / 3;
        objects.push({
          object3d: object,
          geometry
        });
      }
    });
    let output;
    let offset = 80;
    if (binary === true) {
      const bufferLength = triangles * 2 + triangles * 3 * 4 * 4 + 80 + 4;
      const arrayBuffer = new ArrayBuffer(bufferLength);
      output = new DataView(arrayBuffer);
      output.setUint32(offset, triangles, true);
      offset += 4;
    } else {
      output = "";
      output += "solid exported\n";
    }
    const vA = new Vector3();
    const vB = new Vector3();
    const vC = new Vector3();
    const cb = new Vector3();
    const ab = new Vector3();
    const normal = new Vector3();
    for (let i = 0, il = objects.length; i < il; i++) {
      const object = objects[i].object3d;
      const geometry = objects[i].geometry;
      const index = geometry.index;
      const positionAttribute = geometry.getAttribute("position");
      if (index !== null) {
        for (let j = 0; j < index.count; j += 3) {
          const a = index.getX(j + 0);
          const b = index.getX(j + 1);
          const c = index.getX(j + 2);
          writeFace(a, b, c, positionAttribute, object);
        }
      } else {
        for (let j = 0; j < positionAttribute.count; j += 3) {
          const a = j + 0;
          const b = j + 1;
          const c = j + 2;
          writeFace(a, b, c, positionAttribute, object);
        }
      }
    }
    if (binary === false) {
      output += "endsolid exported\n";
    }
    return output;
    function writeFace(a, b, c, positionAttribute, object) {
      vA.fromBufferAttribute(positionAttribute, a);
      vB.fromBufferAttribute(positionAttribute, b);
      vC.fromBufferAttribute(positionAttribute, c);
      if (object.isSkinnedMesh === true) {
        object.applyBoneTransform(a, vA);
        object.applyBoneTransform(b, vB);
        object.applyBoneTransform(c, vC);
      }
      vA.applyMatrix4(object.matrixWorld);
      vB.applyMatrix4(object.matrixWorld);
      vC.applyMatrix4(object.matrixWorld);
      writeNormal(vA, vB, vC);
      writeVertex(vA);
      writeVertex(vB);
      writeVertex(vC);
      if (binary === true) {
        output.setUint16(offset, 0, true);
        offset += 2;
      } else {
        output += "		endloop\n";
        output += "	endfacet\n";
      }
    }
    function writeNormal(vA2, vB2, vC2) {
      cb.subVectors(vC2, vB2);
      ab.subVectors(vA2, vB2);
      cb.cross(ab).normalize();
      normal.copy(cb).normalize();
      if (binary === true) {
        output.setFloat32(offset, normal.x, true);
        offset += 4;
        output.setFloat32(offset, normal.y, true);
        offset += 4;
        output.setFloat32(offset, normal.z, true);
        offset += 4;
      } else {
        output += "	facet normal " + normal.x + " " + normal.y + " " + normal.z + "\n";
        output += "		outer loop\n";
      }
    }
    function writeVertex(vertex) {
      if (binary === true) {
        output.setFloat32(offset, vertex.x, true);
        offset += 4;
        output.setFloat32(offset, vertex.y, true);
        offset += 4;
        output.setFloat32(offset, vertex.z, true);
        offset += 4;
      } else {
        output += "			vertex " + vertex.x + " " + vertex.y + " " + vertex.z + "\n";
      }
    }
  }
};

// src/app/componentes/editorimg copy 2.ts
var _c0 = ["canvasContainer"];
var _c1 = ["fullscreenContainer"];
function ModelBoradForm_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "button", 46);
    \u0275\u0275listener("click", function ModelBoradForm_Conditional_14_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      const stlInput_r4 = \u0275\u0275reference(16);
      stlInput_r4.click();
      return \u0275\u0275resetView(ctx_r2.isMenuOpen = false);
    });
    \u0275\u0275element(2, "i", 47);
    \u0275\u0275text(3, " Importar STL ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 46);
    \u0275\u0275listener("click", function ModelBoradForm_Conditional_14_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.exportCleanSTL();
      return \u0275\u0275resetView(ctx_r2.isMenuOpen = false);
    });
    \u0275\u0275element(5, "i", 48);
    \u0275\u0275text(6, " Exportar STL Limpio (Seleccionado) ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 46);
    \u0275\u0275listener("click", function ModelBoradForm_Conditional_14_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.exportAllCleanObjectsSTL();
      return \u0275\u0275resetView(ctx_r2.isMenuOpen = false);
    });
    \u0275\u0275element(8, "i", 48);
    \u0275\u0275text(9, " Exportar Todo Limpio (STL) ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 46);
    \u0275\u0275listener("click", function ModelBoradForm_Conditional_14_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.exportCleanGLB();
      return \u0275\u0275resetView(ctx_r2.isMenuOpen = false);
    });
    \u0275\u0275element(11, "i", 48);
    \u0275\u0275text(12, " Exportar GLB Limpio (Esculpir) ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "div", 49);
    \u0275\u0275elementStart(14, "button", 50);
    \u0275\u0275listener("click", function ModelBoradForm_Conditional_14_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.clearScene();
      return \u0275\u0275resetView(ctx_r2.isMenuOpen = false);
    });
    \u0275\u0275element(15, "i", 51);
    \u0275\u0275text(16, " Limpiar Escena ");
    \u0275\u0275elementEnd()();
  }
}
function ModelBoradForm_Conditional_65_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 57)(1, "label", 77);
    \u0275\u0275text(2, "Color de Pincel:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 78);
    \u0275\u0275listener("input", function ModelBoradForm_Conditional_65_Conditional_14_Template_input_input_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updatePaintColor($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r2.paintColor());
  }
}
function ModelBoradForm_Conditional_65_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 68)(1, "div", 79)(2, "span", 80);
    \u0275\u0275text(3, "Detalle Arista:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 81);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "input", 82);
    \u0275\u0275listener("input", function ModelBoradForm_Conditional_65_Conditional_35_Template_input_input_6_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateMaxEdgeLength($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.maxEdgeLength());
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r2.maxEdgeLength());
  }
}
function ModelBoradForm_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h6", 52);
    \u0275\u0275element(1, "i", 53);
    \u0275\u0275text(2, " Herramientas de Esculpido ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 54)(4, "button", 55);
    \u0275\u0275listener("click", function ModelBoradForm_Conditional_65_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setSculptTool("inflate"));
    });
    \u0275\u0275text(5, "Inflar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 55);
    \u0275\u0275listener("click", function ModelBoradForm_Conditional_65_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setSculptTool("deflate"));
    });
    \u0275\u0275text(7, "Hundir");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 55);
    \u0275\u0275listener("click", function ModelBoradForm_Conditional_65_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setSculptTool("smooth"));
    });
    \u0275\u0275text(9, "Suavizar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 55);
    \u0275\u0275listener("click", function ModelBoradForm_Conditional_65_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setSculptTool("flatten"));
    });
    \u0275\u0275text(11, "Aplanar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 56);
    \u0275\u0275listener("click", function ModelBoradForm_Conditional_65_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setSculptTool("paint"));
    });
    \u0275\u0275text(13, "Pintar V\xE9rtices");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(14, ModelBoradForm_Conditional_65_Conditional_14_Template, 4, 1, "div", 57);
    \u0275\u0275elementStart(15, "div", 58)(16, "div", 59)(17, "span");
    \u0275\u0275text(18, "Tama\xF1o Pincel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 60);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "input", 61);
    \u0275\u0275listener("input", function ModelBoradForm_Conditional_65_Template_input_input_21_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateBrushSize($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 58)(23, "div", 62)(24, "span");
    \u0275\u0275text(25, "Intensidad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 60);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "input", 63);
    \u0275\u0275listener("input", function ModelBoradForm_Conditional_65_Template_input_input_28_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateBrushIntensity($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275element(29, "hr", 64);
    \u0275\u0275elementStart(30, "div", 57)(31, "div", 65)(32, "input", 66);
    \u0275\u0275listener("change", function ModelBoradForm_Conditional_65_Template_input_change_32_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleDyntopo($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "label", 67);
    \u0275\u0275text(34, "Topolog\xEDa Din\xE1mica (Dyntopo)");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(35, ModelBoradForm_Conditional_65_Conditional_35_Template, 7, 2, "div", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 57)(37, "div", 69)(38, "input", 70);
    \u0275\u0275listener("change", function ModelBoradForm_Conditional_65_Template_input_change_38_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleSymmetry($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "label", 71);
    \u0275\u0275text(40, "Simetr\xEDa (Eje X)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 65)(42, "input", 72);
    \u0275\u0275listener("change", function ModelBoradForm_Conditional_65_Template_input_change_42_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleWireframe($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "label", 73);
    \u0275\u0275text(44, "Modo Malla (Wireframe)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(45, "div", 74)(46, "div", 75)(47, "span");
    \u0275\u0275text(48, "V\xE9rtices:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "strong", 76);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div", 75)(52, "span");
    \u0275\u0275text(53, "Caras:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "strong", 76);
    \u0275\u0275text(55);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275classProp("btn-warning", ctx_r2.selectedTool() === "inflate")("btn-blender", ctx_r2.selectedTool() !== "inflate");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("btn-warning", ctx_r2.selectedTool() === "deflate")("btn-blender", ctx_r2.selectedTool() !== "deflate");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("btn-warning", ctx_r2.selectedTool() === "smooth")("btn-blender", ctx_r2.selectedTool() !== "smooth");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("btn-warning", ctx_r2.selectedTool() === "flatten")("btn-blender", ctx_r2.selectedTool() !== "flatten");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("btn-success", ctx_r2.selectedTool() === "paint")("btn-blender", ctx_r2.selectedTool() !== "paint");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.selectedTool() === "paint" ? 14 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.brushSize());
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r2.brushSize());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.brushIntensity());
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r2.brushIntensity());
    \u0275\u0275advance(4);
    \u0275\u0275property("checked", ctx_r2.enableDyntopo());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.enableDyntopo() ? 35 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275property("checked", ctx_r2.symmetryX());
    \u0275\u0275advance(4);
    \u0275\u0275property("checked", ctx_r2.wireframe());
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.vertexCount());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.faceCount());
  }
}
function ModelBoradForm_Conditional_66_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 85);
    \u0275\u0275element(1, "i", 86);
    \u0275\u0275text(2, " Objeto activo seleccionado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 87)(4, "button", 88);
    \u0275\u0275listener("click", function ModelBoradForm_Conditional_66_Conditional_3_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setTransformMode("translate"));
    });
    \u0275\u0275element(5, "i", 89);
    \u0275\u0275text(6, " Mover");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 88);
    \u0275\u0275listener("click", function ModelBoradForm_Conditional_66_Conditional_3_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setTransformMode("rotate"));
    });
    \u0275\u0275element(8, "i", 90);
    \u0275\u0275text(9, " Rotar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 88);
    \u0275\u0275listener("click", function ModelBoradForm_Conditional_66_Conditional_3_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setTransformMode("scale"));
    });
    \u0275\u0275element(11, "i", 91);
    \u0275\u0275text(12, " Escalar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 92)(14, "button", 93);
    \u0275\u0275listener("click", function ModelBoradForm_Conditional_66_Conditional_3_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.duplicateSelectedObject());
    });
    \u0275\u0275element(15, "i", 94);
    \u0275\u0275text(16, " Duplicar Objeto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 93);
    \u0275\u0275listener("click", function ModelBoradForm_Conditional_66_Conditional_3_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.rotate90Y());
    });
    \u0275\u0275element(18, "i", 95);
    \u0275\u0275text(19, " Rotar 90\xB0 (Eje Y)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 93);
    \u0275\u0275listener("click", function ModelBoradForm_Conditional_66_Conditional_3_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.resetScale());
    });
    \u0275\u0275element(21, "i", 96);
    \u0275\u0275text(22, " Restablecer Escala");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 93);
    \u0275\u0275listener("click", function ModelBoradForm_Conditional_66_Conditional_3_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.showModal = true);
    });
    \u0275\u0275element(24, "i", 97);
    \u0275\u0275text(25, " Editar Valores Num\xE9ricos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 98);
    \u0275\u0275listener("click", function ModelBoradForm_Conditional_66_Conditional_3_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.deleteSelectedObject());
    });
    \u0275\u0275element(27, "i", 51);
    \u0275\u0275text(28, " Eliminar Objeto");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r2.transformMode === "translate");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("active", ctx_r2.transformMode === "rotate");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("active", ctx_r2.transformMode === "scale");
  }
}
function ModelBoradForm_Conditional_66_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 84);
    \u0275\u0275element(1, "i", 99);
    \u0275\u0275text(2, " Ning\xFAn objeto seleccionado. Selecciona uno en el visor.");
    \u0275\u0275elementEnd();
  }
}
function ModelBoradForm_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h6", 52);
    \u0275\u0275element(1, "i", 83);
    \u0275\u0275text(2, " Propiedades de Objeto ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, ModelBoradForm_Conditional_66_Conditional_3_Template, 29, 6)(4, ModelBoradForm_Conditional_66_Conditional_4_Template, 3, 0, "div", 84);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.selectedObject ? 3 : 4);
  }
}
function ModelBoradForm_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 45)(1, "div", 100)(2, "div", 101)(3, "h6", 102);
    \u0275\u0275element(4, "i", 103);
    \u0275\u0275text(5, " Ajustes Num\xE9ricos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 104);
    \u0275\u0275listener("click", function ModelBoradForm_Conditional_67_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeModal());
    });
    \u0275\u0275elementStart(7, "span", 105);
    \u0275\u0275text(8, "\xD7");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 106)(10, "div")(11, "label", 107);
    \u0275\u0275element(12, "i", 108);
    \u0275\u0275text(13, " Color:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 109);
    \u0275\u0275twoWayListener("ngModelChange", function ModelBoradForm_Conditional_67_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.modalObjectProperties.color, $event) || (ctx_r2.modalObjectProperties.color = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div")(16, "label", 110);
    \u0275\u0275element(17, "i", 111);
    \u0275\u0275text(18, " Posici\xF3n (X, Y, Z):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 112)(20, "div", 113)(21, "input", 114);
    \u0275\u0275twoWayListener("ngModelChange", function ModelBoradForm_Conditional_67_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.modalObjectProperties.positionX, $event) || (ctx_r2.modalObjectProperties.positionX = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 113)(23, "input", 114);
    \u0275\u0275twoWayListener("ngModelChange", function ModelBoradForm_Conditional_67_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.modalObjectProperties.positionY, $event) || (ctx_r2.modalObjectProperties.positionY = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 113)(25, "input", 114);
    \u0275\u0275twoWayListener("ngModelChange", function ModelBoradForm_Conditional_67_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.modalObjectProperties.positionZ, $event) || (ctx_r2.modalObjectProperties.positionZ = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(26, "div")(27, "label", 110);
    \u0275\u0275element(28, "i", 115);
    \u0275\u0275text(29, " Escala (X, Y, Z):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 112)(31, "div", 113)(32, "input", 114);
    \u0275\u0275twoWayListener("ngModelChange", function ModelBoradForm_Conditional_67_Template_input_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.modalObjectProperties.scaleX, $event) || (ctx_r2.modalObjectProperties.scaleX = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 113)(34, "input", 114);
    \u0275\u0275twoWayListener("ngModelChange", function ModelBoradForm_Conditional_67_Template_input_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.modalObjectProperties.scaleY, $event) || (ctx_r2.modalObjectProperties.scaleY = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 113)(36, "input", 114);
    \u0275\u0275twoWayListener("ngModelChange", function ModelBoradForm_Conditional_67_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.modalObjectProperties.scaleZ, $event) || (ctx_r2.modalObjectProperties.scaleZ = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(37, "div", 116)(38, "button", 117);
    \u0275\u0275listener("click", function ModelBoradForm_Conditional_67_Template_button_click_38_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeModal());
    });
    \u0275\u0275text(39, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "button", 118);
    \u0275\u0275listener("click", function ModelBoradForm_Conditional_67_Template_button_click_40_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateObjectProperties());
    });
    \u0275\u0275text(41, "Aplicar");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.modalObjectProperties.color);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.modalObjectProperties.positionX);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.modalObjectProperties.positionY);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.modalObjectProperties.positionZ);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.modalObjectProperties.scaleX);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.modalObjectProperties.scaleY);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.modalObjectProperties.scaleZ);
  }
}
var ModelBoradForm = class _ModelBoradForm {
  ngZone;
  canvasContainer;
  fullscreenContainerRef;
  appMode = signal("sculpt", ...ngDevMode ? [{ debugName: "appMode" }] : []);
  selectedTool = signal("inflate", ...ngDevMode ? [{ debugName: "selectedTool" }] : []);
  brushSize = signal(1.2, ...ngDevMode ? [{ debugName: "brushSize" }] : []);
  brushIntensity = signal(0.03, ...ngDevMode ? [{ debugName: "brushIntensity" }] : []);
  enableDyntopo = signal(true, ...ngDevMode ? [{ debugName: "enableDyntopo" }] : []);
  maxEdgeLength = signal(0.15, ...ngDevMode ? [{ debugName: "maxEdgeLength" }] : []);
  symmetryX = signal(false, ...ngDevMode ? [{ debugName: "symmetryX" }] : []);
  wireframe = signal(false, ...ngDevMode ? [{ debugName: "wireframe" }] : []);
  paintColor = signal("#3b82f6", ...ngDevMode ? [{ debugName: "paintColor" }] : []);
  vertexCount = signal(0, ...ngDevMode ? [{ debugName: "vertexCount" }] : []);
  faceCount = signal(0, ...ngDevMode ? [{ debugName: "faceCount" }] : []);
  renderer;
  scene;
  camera;
  controls;
  transformControls;
  brushHelper;
  objects = [];
  selectedObject = null;
  plane;
  raycaster = new Raycaster();
  mouse = new Vector2();
  isSculpting = false;
  isFullscreen = false;
  isMenuOpen = false;
  showModal = false;
  transformMode = "translate";
  modalObjectProperties = {};
  animationFrameId = 0;
  constructor(ngZone) {
    this.ngZone = ngZone;
  }
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.initThreeJs();
      this.addNewObjectCenter("sphere");
      this.animate();
    });
  }
  ngOnDestroy() {
    if (this.animationFrameId)
      cancelAnimationFrame(this.animationFrameId);
    this.renderer?.dispose();
    this.controls?.dispose();
    this.transformControls?.dispose();
  }
  onResize() {
    const container = this.canvasContainer.nativeElement.parentElement;
    const width = container?.clientWidth || window.innerWidth;
    const height = container?.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
  onFullScreenChange() {
    this.isFullscreen = !!document.fullscreenElement;
    setTimeout(() => this.onResize(), 50);
  }
  toggleFullScreen() {
    const elem = this.fullscreenContainerRef.nativeElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen();
    }
  }
  toggleMenu(event) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }
  closeMenuOnClick() {
    if (this.isMenuOpen)
      this.isMenuOpen = false;
  }
  setAppMode(mode) {
    this.appMode.set(mode);
    if (mode === "sculpt" && this.selectedObject && this.transformControls) {
      this.transformControls.detach();
    } else if (mode === "transform" && this.selectedObject && this.transformControls) {
      this.transformControls.attach(this.selectedObject);
    }
    if (this.brushHelper) {
      this.brushHelper.visible = mode === "sculpt";
    }
  }
  initThreeJs() {
    const container = this.canvasContainer.nativeElement.parentElement;
    const width = container?.clientWidth || window.innerWidth;
    const height = container?.clientHeight || window.innerHeight;
    this.renderer = new WebGLRenderer({ canvas: this.canvasContainer.nativeElement, antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.scene = new Scene();
    this.scene.background = new Color(1710618);
    const ambientLight = new AmbientLight(16777215, 0.6);
    this.scene.add(ambientLight);
    const dirLight1 = new DirectionalLight(16777215, 1.2);
    dirLight1.position.set(5, 10, 7);
    const dirLight2 = new DirectionalLight(31743, 0.6);
    dirLight2.position.set(-5, -5, -5);
    this.scene.add(dirLight1, dirLight2);
    const planeGeometry = new PlaneGeometry(15, 15, 15, 15);
    const planeMaterial = new MeshBasicMaterial({ color: 3355443, side: DoubleSide, wireframe: true });
    this.plane = new Mesh(planeGeometry, planeMaterial);
    this.plane.rotation.x = -Math.PI / 2;
    this.scene.add(this.plane);
    this.camera = new PerspectiveCamera(60, width / height, 0.1, 1e3);
    this.camera.position.set(0, 4, 7);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.transformControls = new TransformControls(this.camera, this.renderer.domElement);
    this.transformControls.addEventListener("change", () => {
      if (this.selectedObject)
        this.updateSelectedObjectProperties();
    });
    this.transformControls.addEventListener("dragging-changed", (event) => {
      this.controls.enabled = !event.value;
    });
    this.scene.add(this.transformControls.getHelper());
    this.setupBrushHelper();
    this.setupInteractions();
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
  setupInteractions() {
    const domElem = this.renderer.domElement;
    domElem.addEventListener("pointerdown", (e) => {
      if (e.button === 0 && this.appMode() === "sculpt") {
        this.isSculpting = true;
        this.controls.enabled = false;
        this.sculpt(e);
      } else if (e.button === 0 && this.appMode() === "transform") {
        this.selectObject(e);
      }
    });
    domElem.addEventListener("pointermove", (e) => {
      if (this.appMode() === "sculpt") {
        this.updateCursorHelper(e);
        if (this.isSculpting)
          this.sculpt(e);
      }
    });
    const stopAction = () => {
      if (this.isSculpting) {
        this.isSculpting = false;
        this.controls.enabled = true;
      }
    };
    domElem.addEventListener("pointerup", stopAction);
    domElem.addEventListener("pointerleave", () => {
      if (this.brushHelper)
        this.brushHelper.visible = false;
      stopAction();
    });
  }
  updateCursorHelper(event) {
    if (!this.selectedObject) {
      this.brushHelper.visible = false;
      return;
    }
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = (event.clientX - rect.left) / rect.width * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.selectedObject);
    if (intersects.length > 0) {
      const hit = intersects[0];
      if (hit.point && hit.face) {
        this.brushHelper.position.copy(hit.point);
        const normal = hit.face.normal.clone().transformDirection(this.selectedObject.matrixWorld);
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
    if (!this.selectedObject)
      return;
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = (event.clientX - rect.left) / rect.width * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.selectedObject);
    if (intersects.length > 0) {
      const hit = intersects[0];
      if (!hit.point || !hit.face)
        return;
      const pointsToProcess = [hit.point.clone()];
      if (this.symmetryX()) {
        const mirror = hit.point.clone();
        mirror.x = -mirror.x;
        pointsToProcess.push(mirror);
      }
      pointsToProcess.forEach((pt) => {
        if (this.selectedTool() !== "paint" && this.enableDyntopo()) {
          this.subdivideTriangles(pt);
        }
        this.applySculpt(pt, hit.face.normal);
      });
      const geom = this.selectedObject.geometry;
      geom.attributes["position"].needsUpdate = true;
      if (geom.attributes["color"])
        geom.attributes["color"].needsUpdate = true;
      geom.computeVertexNormals();
      this.updateMeshStats();
    }
  }
  subdivideTriangles(hitPoint) {
    const geometry = this.selectedObject.geometry;
    const posAttr = geometry.attributes["position"];
    const colAttr = geometry.attributes["color"];
    const radius = this.brushSize();
    const threshold = this.maxEdgeLength();
    const positions = Array.from(posAttr.array);
    const colors = colAttr ? Array.from(colAttr.array) : [];
    const newPos = [];
    const newCol = [];
    let updated = false;
    const vA = new Vector3(), vB = new Vector3(), vC = new Vector3();
    const cA = new Color(), cB = new Color(), cC = new Color();
    for (let i = 0; i < positions.length; i += 9) {
      vA.set(positions[i], positions[i + 1], positions[i + 2]);
      vB.set(positions[i + 3], positions[i + 4], positions[i + 5]);
      vC.set(positions[i + 6], positions[i + 7], positions[i + 8]);
      if (colors.length > 0) {
        cA.setRGB(colors[i], colors[i + 1], colors[i + 2]);
        cB.setRGB(colors[i + 3], colors[i + 4], colors[i + 5]);
        cC.setRGB(colors[i + 6], colors[i + 7], colors[i + 8]);
      }
      if (vA.distanceTo(hitPoint) < radius || vB.distanceTo(hitPoint) < radius || vC.distanceTo(hitPoint) < radius) {
        if (vA.distanceTo(vB) > threshold || vB.distanceTo(vC) > threshold || vC.distanceTo(vA) > threshold) {
          updated = true;
          const mAB = vA.clone().add(vB).multiplyScalar(0.5);
          const mBC = vB.clone().add(vC).multiplyScalar(0.5);
          const mCA = vC.clone().add(vA).multiplyScalar(0.5);
          const cAB = cA.clone().lerp(cB, 0.5);
          const cBC = cB.clone().lerp(cC, 0.5);
          const cCA = cC.clone().lerp(cA, 0.5);
          newPos.push(vA.x, vA.y, vA.z, mAB.x, mAB.y, mAB.z, mCA.x, mCA.y, mCA.z);
          newCol.push(cA.r, cA.g, cA.b, cAB.r, cAB.g, cAB.b, cCA.r, cCA.g, cCA.b);
          newPos.push(mAB.x, mAB.y, mAB.z, vB.x, vB.y, vB.z, mBC.x, mBC.y, mBC.z);
          newCol.push(cAB.r, cAB.g, cAB.b, cB.r, cB.g, cB.b, cBC.r, cBC.g, cBC.b);
          newPos.push(mCA.x, mCA.y, mCA.z, mBC.x, mBC.y, mBC.z, vC.x, vC.y, vC.z);
          newCol.push(cCA.r, cCA.g, cCA.b, cBC.r, cBC.g, cBC.b, cC.r, cC.g, cC.b);
          newPos.push(mAB.x, mAB.y, mAB.z, mBC.x, mBC.y, mBC.z, mCA.x, mCA.y, mCA.z);
          newCol.push(cAB.r, cAB.g, cAB.b, cBC.r, cBC.g, cBC.b, cCA.r, cCA.g, cCA.b);
          continue;
        }
      }
      newPos.push(vA.x, vA.y, vA.z, vB.x, vB.y, vB.z, vC.x, vC.y, vC.z);
      if (colors.length > 0)
        newCol.push(cA.r, cA.g, cA.b, cB.r, cB.g, cB.b, cC.r, cC.g, cC.b);
    }
    if (updated) {
      geometry.setAttribute("position", new Float32BufferAttribute(newPos, 3));
      if (colors.length > 0)
        geometry.setAttribute("color", new Float32BufferAttribute(newCol, 3));
    }
  }
  applySculpt(hitPoint, faceNormal) {
    const geometry = this.selectedObject.geometry;
    const posAttr = geometry.attributes["position"];
    const colAttr = geometry.attributes["color"];
    const vertex = new Vector3();
    const currentC = new Color();
    const targetC = new Color(this.paintColor());
    const radius = this.brushSize();
    const strength = this.brushIntensity();
    const tool = this.selectedTool();
    const normal = faceNormal.clone().transformDirection(this.selectedObject.matrixWorld);
    for (let i = 0; i < posAttr.count; i++) {
      vertex.fromBufferAttribute(posAttr, i);
      const worldV = vertex.clone().applyMatrix4(this.selectedObject.matrixWorld);
      const dist = worldV.distanceTo(hitPoint);
      if (dist < radius) {
        const falloff = Math.pow(1 - dist / radius, 2);
        switch (tool) {
          case "inflate":
            vertex.add(normal.clone().multiplyScalar(falloff * strength));
            posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
            break;
          case "deflate":
            vertex.add(normal.clone().multiplyScalar(-falloff * strength));
            posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
            break;
          case "smooth":
            vertex.add(hitPoint.clone().sub(worldV).multiplyScalar(falloff * strength * 0.5));
            posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
            break;
          case "flatten":
            const distPlane = worldV.clone().sub(hitPoint).dot(normal);
            vertex.add(normal.clone().multiplyScalar(-distPlane * falloff * strength * 2));
            posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
            break;
          case "paint":
            if (colAttr) {
              currentC.fromBufferAttribute(colAttr, i);
              currentC.lerp(targetC, falloff * strength);
              colAttr.setXYZ(i, currentC.r, currentC.g, currentC.b);
            }
            break;
        }
      }
    }
  }
  updateMeshStats() {
    if (!this.selectedObject)
      return;
    const pos = this.selectedObject.geometry.attributes["position"];
    this.vertexCount.set(pos ? pos.count : 0);
    this.faceCount.set(pos ? pos.count / 3 : 0);
  }
  addNewObjectCenter(shape) {
    this.addObject(shape, new Vector3(0, 0, 0));
  }
  addObject(shape, position) {
    let baseGeom;
    switch (shape) {
      case "cube":
        baseGeom = new BoxGeometry(2, 2, 2, 16, 16, 16);
        break;
      case "sphere":
        baseGeom = new SphereGeometry(1.5, 32, 32);
        break;
      case "cylinder":
        baseGeom = new CylinderGeometry(1, 1, 3, 32, 16);
        break;
      case "cone":
        baseGeom = new ConeGeometry(1.5, 3, 32, 16);
        break;
      case "torus":
        baseGeom = new TorusGeometry(1.5, 0.5, 24, 48);
        break;
      case "plane":
        baseGeom = new PlaneGeometry(3, 3, 16, 16);
        break;
      case "knot":
        baseGeom = new TorusKnotGeometry(1.2, 0.4, 64, 16);
        break;
      default:
        baseGeom = new SphereGeometry(1.5, 32, 32);
        break;
    }
    const geometry = baseGeom.toNonIndexed();
    baseGeom.dispose();
    const colors = new Float32Array(geometry.attributes["position"].count * 3);
    colors.fill(0.8);
    geometry.setAttribute("color", new BufferAttribute(colors, 3));
    const material = new MeshStandardMaterial({
      color: 3900150,
      roughness: 0.3,
      metalness: 0.1,
      vertexColors: true,
      wireframe: this.wireframe()
    });
    const mesh = new Mesh(geometry, material);
    mesh.position.copy(position);
    if (shape !== "plane")
      mesh.position.y += 1;
    this.scene.add(mesh);
    this.objects.push(mesh);
    this.selectMeshObject(mesh);
  }
  selectMeshObject(mesh) {
    this.selectedObject = mesh;
    if (this.appMode() === "transform") {
      this.transformControls.attach(mesh);
    }
    this.updateSelectedObjectProperties();
    this.updateMeshStats();
  }
  selectObject(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = (event.clientX - rect.left) / rect.width * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.objects, true);
    if (intersects.length > 0) {
      const clicked = intersects[0].object;
      this.selectMeshObject(clicked);
    } else if (!this.transformControls.dragging) {
      this.transformControls.detach();
      this.selectedObject = null;
    }
  }
  setTransformMode(mode) {
    this.transformMode = mode;
    this.transformControls.setMode(mode);
  }
  setSculptTool(tool) {
    this.selectedTool.set(tool);
  }
  updateBrushSize(e) {
    this.brushSize.set(parseFloat(e.target.value));
  }
  updateBrushIntensity(e) {
    this.brushIntensity.set(parseFloat(e.target.value));
  }
  updatePaintColor(e) {
    this.paintColor.set(e.target.value);
  }
  toggleDyntopo(e) {
    this.enableDyntopo.set(e.target.checked);
  }
  updateMaxEdgeLength(e) {
    this.maxEdgeLength.set(parseFloat(e.target.value));
  }
  toggleSymmetry(e) {
    this.symmetryX.set(e.target.checked);
  }
  toggleWireframe(e) {
    const val = e.target.checked;
    this.wireframe.set(val);
    this.objects.forEach((obj) => {
      if (obj.material instanceof MeshStandardMaterial)
        obj.material.wireframe = val;
    });
  }
  duplicateSelectedObject() {
    if (!this.selectedObject)
      return;
    const geom = this.selectedObject.geometry.clone();
    const mat = this.selectedObject.material.clone();
    const dup = new Mesh(geom, mat);
    dup.position.copy(this.selectedObject.position).add(new Vector3(1, 0, 1));
    this.scene.add(dup);
    this.objects.push(dup);
    this.selectMeshObject(dup);
  }
  rotate90Y() {
    if (this.selectedObject)
      this.selectedObject.rotation.y += Math.PI / 2;
  }
  resetScale() {
    if (this.selectedObject) {
      this.selectedObject.scale.set(1, 1, 1);
      this.updateSelectedObjectProperties();
    }
  }
  deleteSelectedObject() {
    if (this.selectedObject) {
      this.scene.remove(this.selectedObject);
      this.transformControls.detach();
      this.objects = this.objects.filter((o) => o !== this.selectedObject);
      this.selectedObject = null;
    }
  }
  clearScene() {
    if (confirm("\xBFLimpiar toda la escena?")) {
      this.objects.forEach((o) => this.scene.remove(o));
      this.objects = [];
      this.transformControls.detach();
      this.selectedObject = null;
    }
  }
  closeModal() {
    this.showModal = false;
  }
  updateSelectedObjectProperties() {
    if (!this.selectedObject)
      return;
    const { x, y, z } = this.selectedObject.scale;
    const colorHex = this.selectedObject.material.color.getHexString();
    this.modalObjectProperties = {
      scaleX: x,
      scaleY: y,
      scaleZ: z,
      color: `#${colorHex}`,
      positionX: this.selectedObject.position.x,
      positionY: this.selectedObject.position.y,
      positionZ: this.selectedObject.position.z
    };
  }
  updateObjectProperties() {
    if (!this.selectedObject)
      return;
    const mat = this.selectedObject.material;
    mat.color.set(this.modalObjectProperties.color);
    this.selectedObject.position.set(Number(this.modalObjectProperties.positionX), Number(this.modalObjectProperties.positionY), Number(this.modalObjectProperties.positionZ));
    this.selectedObject.scale.set(Number(this.modalObjectProperties.scaleX), Number(this.modalObjectProperties.scaleY), Number(this.modalObjectProperties.scaleZ));
    this.showModal = false;
  }
  onDragStart(e, shape) {
    e.dataTransfer?.setData("text/plain", shape);
  }
  onDragOver(e) {
    e.preventDefault();
  }
  onDrop(e) {
    e.preventDefault();
    const shape = e.dataTransfer?.getData("text/plain");
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = (e.clientX - rect.left) / rect.width * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.plane);
    if (shape && intersects.length > 0) {
      this.addObject(shape, intersects[0].point);
    }
  }
  loadSTL(event) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const buffer = e.target?.result;
        const loader = new STLLoader();
        const geometry = loader.parse(buffer).toNonIndexed();
        const colors = new Float32Array(geometry.attributes["position"].count * 3);
        colors.fill(0.8);
        geometry.setAttribute("color", new BufferAttribute(colors, 3));
        const material = new MeshStandardMaterial({ color: 3066993, vertexColors: true });
        const mesh = new Mesh(geometry, material);
        this.scene.add(mesh);
        this.objects.push(mesh);
        this.selectMeshObject(mesh);
      };
      reader.readAsArrayBuffer(file);
    }
  }
  /**
   * Control mejorado de Vistas de Cámara Estándar (Blender Style)
   */
  setCameraView(view) {
    const target = this.selectedObject ? this.selectedObject.position.clone() : new Vector3(0, 0, 0);
    const distance = 7;
    switch (view) {
      case "front":
        this.camera.position.set(target.x, target.y, target.z + distance);
        break;
      case "right":
        this.camera.position.set(target.x + distance, target.y, target.z);
        break;
      case "top":
        this.camera.position.set(target.x, target.y + distance + 2, target.z + 1e-3);
        break;
      case "iso":
        this.camera.position.set(target.x + 5, target.y + 5, target.z + 5);
        break;
    }
    this.controls.target.copy(target);
    this.controls.update();
  }
  /**
   * Exporta únicamente el objeto seleccionado actualmente de forma limpia (sin plano ni luces).
   */
  exportCleanSTL() {
    if (!this.selectedObject) {
      alert("Por favor, selecciona un objeto para exportar.");
      return;
    }
    const tempScene = new Scene();
    const cloneMesh = this.selectedObject.clone();
    this.selectedObject.updateMatrixWorld(true);
    cloneMesh.applyMatrix4(this.selectedObject.matrixWorld);
    tempScene.add(cloneMesh);
    const exporter = new STLExporter();
    const result = exporter.parse(tempScene);
    const blob = new Blob([result], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `objeto-limpio-${Date.now()}.stl`;
    link.click();
  }
  /**
   * Exporta todos los objetos creados/esculpidos en la escena de manera limpia (sin plano ni luces).
   */
  exportAllCleanObjectsSTL() {
    if (this.objects.length === 0) {
      alert("No hay objetos en la escena.");
      return;
    }
    const tempScene = new Scene();
    this.objects.forEach((obj) => {
      obj.updateMatrixWorld(true);
      const clone = obj.clone();
      clone.applyMatrix4(obj.matrixWorld);
      tempScene.add(clone);
    });
    const exporter = new STLExporter();
    const result = exporter.parse(tempScene);
    const blob = new Blob([result], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `escena-limpia-${Date.now()}.stl`;
    link.click();
  }
  /**
   * Exporta el objeto seleccionado en formato GLB limpio.
   */
  exportCleanGLB() {
    if (!this.selectedObject) {
      alert("Por favor, selecciona un objeto para exportar.");
      return;
    }
    const exporter = new GLTFExporter();
    exporter.parse(this.selectedObject, (gltf) => {
      if (gltf instanceof ArrayBuffer) {
        const blob = new Blob([gltf], { type: "application/octet-stream" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `modelo-esculpido-${Date.now()}.glb`;
        link.click();
      }
    }, (err) => console.error("Error al exportar GLB:", err), { binary: true });
  }
  animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };
  static \u0275fac = function ModelBoradForm_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ModelBoradForm)(\u0275\u0275directiveInject(NgZone));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ModelBoradForm, selectors: [["app-model-form-board"]], viewQuery: function ModelBoradForm_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 7)(_c1, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.canvasContainer = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.fullscreenContainerRef = _t.first);
    }
  }, hostBindings: function ModelBoradForm_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("resize", function ModelBoradForm_resize_HostBindingHandler() {
        return ctx.onResize();
      }, \u0275\u0275resolveWindow)("fullscreenchange", function ModelBoradForm_fullscreenchange_HostBindingHandler() {
        return ctx.onFullScreenChange();
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 68, vars: 17, consts: [["fullscreenContainer", ""], ["stlInput", ""], ["canvasContainer", ""], [1, "py-5"], [1, "d-flex", "flex-column", 2, "height", "calc(100vh - 56px)"], [1, "blender-header", "px-3", "py-2", "d-flex", "justify-content-between", "align-items-center"], [1, "d-flex", "align-items-center", 2, "gap", "15px"], [1, "font-weight-bold", "text-white"], [1, "bi", "bi-box-seam", "mr-1"], [1, "position-relative"], ["type", "button", 1, "btn", "btn-blender", "btn-sm", 3, "click"], [1, "bi", "bi-folder2-open", "mr-1"], [1, "bi", "bi-caret-down-fill", "ml-1", 2, "font-size", "0.6rem"], [1, "custom-dropdown-menu", "py-1"], ["type", "file", "accept", ".stl", 1, "d-none", 3, "change"], [1, "btn-group", "btn-group-sm"], [1, "btn", "btn-sm", "font-weight-bold", 3, "click"], [1, "d-flex", "align-items-center", 2, "gap", "6px"], [1, "text-muted", "small", "mr-1"], [1, "bi", "bi-camera", "mr-1"], [1, "btn", "btn-blender", "btn-sm", 3, "click"], [1, "btn", "btn-blender", "btn-sm", 3, "click", "title"], [1, "bi"], [1, "d-flex", "flex-grow-1", 2, "height", "calc(100vh - 99px)"], [1, "blender-toolbar", "d-flex", "flex-column", "align-items-center", "py-3", 2, "gap", "10px"], [1, "text-muted", "font-weight-bold", "mb-1", 2, "font-size", "0.65rem"], ["title", "Cubo", "draggable", "true", 1, "btn", "btn-blender", "p-2", "rounded", "w-75", "text-center", 3, "dragstart", "click"], [1, "bi", "bi-box", "fs-5"], ["title", "Esfera", "draggable", "true", 1, "btn", "btn-blender", "p-2", "rounded", "w-75", "text-center", 3, "dragstart", "click"], [1, "bi", "bi-globe", "fs-5"], ["title", "Cilindro", "draggable", "true", 1, "btn", "btn-blender", "p-2", "rounded", "w-75", "text-center", 3, "dragstart", "click"], [1, "bi", "bi-capsule", "fs-5"], ["title", "Cono", "draggable", "true", 1, "btn", "btn-blender", "p-2", "rounded", "w-75", "text-center", 3, "dragstart", "click"], [1, "bi", "bi-triangle", "fs-5"], ["title", "Toroide", "draggable", "true", 1, "btn", "btn-blender", "p-2", "rounded", "w-75", "text-center", 3, "dragstart", "click"], [1, "bi", "bi-record-circle", "fs-5"], ["title", "Plano", "draggable", "true", 1, "btn", "btn-blender", "p-2", "rounded", "w-75", "text-center", 3, "dragstart", "click"], [1, "bi", "bi-square", "fs-5"], ["title", "Nudo", "draggable", "true", 1, "btn", "btn-blender", "p-2", "rounded", "w-75", "text-center", 3, "dragstart", "click"], [1, "bi", "bi-infinity", "fs-5"], [1, "viewport-container", "flex-grow-1", 3, "dragover", "drop", "click"], [1, "position-absolute", "text-muted", "small", "px-3", "py-2", "pointer-events-none", 2, "bottom", "10px", "left", "10px", "background", "rgba(0,0,0,0.6)", "border-radius", "4px"], [1, "bi", "bi-info-circle", "mr-1"], [1, "text-warning", "text-uppercase"], [1, "blender-sidebar", "p-3", "d-flex", "flex-column", "overflow-auto", 2, "gap", "12px"], [1, "custom-modal-backdrop"], [1, "custom-dropdown-item", 3, "click"], [1, "bi", "bi-upload", "mr-1"], [1, "bi", "bi-download", "mr-1"], [1, "dropdown-divider", "border-secondary", "my-1"], [1, "custom-dropdown-item", "text-danger", 3, "click"], [1, "bi", "bi-trash", "mr-1"], [1, "text-white", "font-weight-bold", "small", "text-uppercase", "mb-2", "border-bottom", "pb-2"], [1, "bi", "bi-brush", "mr-1"], [1, "d-grid", "gap-2", "mb-2", 2, "display", "grid", "grid-template-columns", "repeat(2, 1fr)", "gap", "6px"], [1, "btn", "btn-sm", "font-weight-bold", "text-truncate", 3, "click"], [1, "btn", "btn-sm", "font-weight-bold", "text-truncate", 2, "grid-column", "span 2", 3, "click"], [1, "bg-secondary", "p-2", "rounded", "mb-2"], [1, "mb-2"], [1, "d-flex", "justify-content-between", "small", "text-ligth", "font-weight-bold", "mb-1"], [1, "badge", "badge-secondary"], ["type", "range", "min", "0.2", "max", "3", "step", "0.1", 1, "form-control-range", 3, "input", "value"], [1, "d-flex", "justify-content-between", "small", "text-light", "font-weight-bold", "mb-1"], ["type", "range", "min", "0.01", "max", "1.0", "step", "0.01", 1, "form-control-range", 3, "input", "value"], [1, "border-secondary", "my-1"], [1, "custom-control", "custom-checkbox"], ["type", "checkbox", "id", "dyntopoCheck", 1, "custom-control-input", 3, "change", "checked"], ["for", "dyntopoCheck", 1, "custom-control-label", "small", "font-weight-bold", "text-light"], [1, "small", "mt-2", "pt-1", "border-top", "border-dark"], [1, "custom-control", "custom-checkbox", "mb-1"], ["type", "checkbox", "id", "symCheck", 1, "custom-control-input", 3, "change", "checked"], ["for", "symCheck", 1, "custom-control-label", "small", "font-weight-bold", "text-light"], ["type", "checkbox", "id", "wireCheck", 1, "custom-control-input", 3, "change", "checked"], ["for", "wireCheck", 1, "custom-control-label", "small", "font-weight-bold", "text-light"], [1, "card", "bg-secondary", "text-light", "p-2", "mb-2", "small", "border-0"], [1, "d-flex", "justify-content-between"], [1, "text-warning"], [1, "small", "font-weight-bold", "mb-1", "text-light"], ["type", "color", 1, "form-control", "form-control-sm", "p-0", "border-0", "bg-transparent", "cursor-pointer", "w-100", 2, "height", "32px", 3, "input", "value"], [1, "d-flex", "justify-content-between", "mb-1"], [1, "text-muted"], [1, "badge", "badge-dark"], ["type", "range", "min", "0.05", "max", "0.5", "step", "0.01", 1, "form-control-range", 3, "input", "value"], [1, "bi", "bi-sliders", "mr-1"], [1, "text-muted", "small", "italic"], [1, "small", "text-muted", "mb-2"], [1, "bi", "bi-check2-circle", "mr-1"], ["role", "group", 1, "btn-group", "btn-group-sm", "w-100", "mb-3"], ["type", "button", 1, "btn", "btn-blender", 3, "click"], [1, "bi", "bi-arrows-move", "mr-1"], [1, "bi", "bi-arrow-repeat", "mr-1"], [1, "bi", "bi-aspect-ratio", "mr-1"], [1, "d-flex", "flex-column", 2, "gap", "8px"], [1, "btn", "btn-blender", "btn-sm", "w-100", "text-left", 3, "click"], [1, "bi", "bi-files", "mr-1"], [1, "bi", "bi-arrow-clockwise", "mr-1"], [1, "bi", "bi-arrow-counterclockwise", "mr-1"], [1, "bi", "bi-gear", "mr-1"], [1, "btn", "btn-outline-danger", "btn-sm", "w-100", "text-left", "mt-2", 3, "click"], [1, "bi", "bi-exclamation-circle", "mr-1"], [1, "card", "bg-dark", "text-light", "border-secondary", "shadow-lg", 2, "width", "380px"], [1, "card-header", "border-secondary", "d-flex", "justify-content-between", "align-items-center"], [1, "mb-0"], [1, "bi", "bi-sliders2", "mr-1"], ["type", "button", "aria-label", "Close", 1, "close", "text-white", "border-0", "bg-transparent", 3, "click"], ["aria-hidden", "true"], [1, "card-body", "small", 2, "display", "flex", "flex-direction", "column", "gap", "12px"], [1, "font-weight-bold", "d-block", "mb-1"], [1, "bi", "bi-palette", "mr-1"], ["type", "color", 1, "form-control", "form-control-sm", "bg-secondary", "border-0", "w-100", 2, "height", "35px", 3, "ngModelChange", "ngModel"], [1, "font-weight-bold", "mb-1", "d-block"], [1, "bi", "bi-geo-alt", "mr-1"], [1, "row"], [1, "col"], ["type", "number", "step", "0.1", 1, "form-control", "form-control-sm", "bg-secondary", "text-light", "border-0", 3, "ngModelChange", "ngModel"], [1, "bi", "bi-arrows-angle-expand", "mr-1"], [1, "card-footer", "border-secondary", "d-flex", "justify-content-end", 2, "gap", "8px"], [1, "btn", "btn-secondary", "btn-sm", 3, "click"], [1, "btn", "btn-primary", "btn-sm", 3, "click"]], template: function ModelBoradForm_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275element(0, "app-navbar")(1, "div", 3);
      \u0275\u0275elementStart(2, "div", 4, 0)(4, "div", 5)(5, "div", 6)(6, "span", 7);
      \u0275\u0275element(7, "i", 8);
      \u0275\u0275text(8, " Blender Sculpt Studio ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 9)(10, "button", 10);
      \u0275\u0275listener("click", function ModelBoradForm_Template_button_click_10_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.toggleMenu($event));
      });
      \u0275\u0275element(11, "i", 11);
      \u0275\u0275text(12, " Archivo ");
      \u0275\u0275element(13, "i", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(14, ModelBoradForm_Conditional_14_Template, 17, 0, "div", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "input", 14, 1);
      \u0275\u0275listener("change", function ModelBoradForm_Template_input_change_15_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.loadSTL($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 15)(18, "button", 16);
      \u0275\u0275listener("click", function ModelBoradForm_Template_button_click_18_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setAppMode("sculpt"));
      });
      \u0275\u0275text(19, " Modo Esculpir ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "button", 16);
      \u0275\u0275listener("click", function ModelBoradForm_Template_button_click_20_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setAppMode("transform"));
      });
      \u0275\u0275text(21, " Modo Transformar ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(22, "div", 6)(23, "div", 17)(24, "span", 18);
      \u0275\u0275element(25, "i", 19);
      \u0275\u0275text(26, " Vista:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "button", 20);
      \u0275\u0275listener("click", function ModelBoradForm_Template_button_click_27_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setCameraView("front"));
      });
      \u0275\u0275text(28, "Frente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "button", 20);
      \u0275\u0275listener("click", function ModelBoradForm_Template_button_click_29_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setCameraView("right"));
      });
      \u0275\u0275text(30, "Der");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "button", 20);
      \u0275\u0275listener("click", function ModelBoradForm_Template_button_click_31_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setCameraView("top"));
      });
      \u0275\u0275text(32, "Arriba");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "button", 20);
      \u0275\u0275listener("click", function ModelBoradForm_Template_button_click_33_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setCameraView("iso"));
      });
      \u0275\u0275text(34, "Iso");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "button", 21);
      \u0275\u0275listener("click", function ModelBoradForm_Template_button_click_35_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.toggleFullScreen());
      });
      \u0275\u0275element(36, "i", 22);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(37, "div", 23)(38, "div", 24)(39, "span", 25);
      \u0275\u0275text(40, "ADD");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "button", 26);
      \u0275\u0275listener("dragstart", function ModelBoradForm_Template_button_dragstart_41_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDragStart($event, "cube"));
      })("click", function ModelBoradForm_Template_button_click_41_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.addNewObjectCenter("cube"));
      });
      \u0275\u0275element(42, "i", 27);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "button", 28);
      \u0275\u0275listener("dragstart", function ModelBoradForm_Template_button_dragstart_43_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDragStart($event, "sphere"));
      })("click", function ModelBoradForm_Template_button_click_43_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.addNewObjectCenter("sphere"));
      });
      \u0275\u0275element(44, "i", 29);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "button", 30);
      \u0275\u0275listener("dragstart", function ModelBoradForm_Template_button_dragstart_45_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDragStart($event, "cylinder"));
      })("click", function ModelBoradForm_Template_button_click_45_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.addNewObjectCenter("cylinder"));
      });
      \u0275\u0275element(46, "i", 31);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "button", 32);
      \u0275\u0275listener("dragstart", function ModelBoradForm_Template_button_dragstart_47_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDragStart($event, "cone"));
      })("click", function ModelBoradForm_Template_button_click_47_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.addNewObjectCenter("cone"));
      });
      \u0275\u0275element(48, "i", 33);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "button", 34);
      \u0275\u0275listener("dragstart", function ModelBoradForm_Template_button_dragstart_49_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDragStart($event, "torus"));
      })("click", function ModelBoradForm_Template_button_click_49_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.addNewObjectCenter("torus"));
      });
      \u0275\u0275element(50, "i", 35);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "button", 36);
      \u0275\u0275listener("dragstart", function ModelBoradForm_Template_button_dragstart_51_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDragStart($event, "plane"));
      })("click", function ModelBoradForm_Template_button_click_51_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.addNewObjectCenter("plane"));
      });
      \u0275\u0275element(52, "i", 37);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "button", 38);
      \u0275\u0275listener("dragstart", function ModelBoradForm_Template_button_dragstart_53_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDragStart($event, "knot"));
      })("click", function ModelBoradForm_Template_button_click_53_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.addNewObjectCenter("knot"));
      });
      \u0275\u0275element(54, "i", 39);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "div", 40);
      \u0275\u0275listener("dragover", function ModelBoradForm_Template_div_dragover_55_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDragOver($event));
      })("drop", function ModelBoradForm_Template_div_drop_55_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDrop($event));
      })("click", function ModelBoradForm_Template_div_click_55_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.closeMenuOnClick());
      });
      \u0275\u0275element(56, "canvas", null, 2);
      \u0275\u0275elementStart(58, "div", 41);
      \u0275\u0275element(59, "i", 42);
      \u0275\u0275text(60, " Modo actual: ");
      \u0275\u0275elementStart(61, "strong", 43);
      \u0275\u0275text(62);
      \u0275\u0275elementEnd();
      \u0275\u0275text(63, ". Clic para seleccionar objeto. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(64, "div", 44);
      \u0275\u0275conditionalCreate(65, ModelBoradForm_Conditional_65_Template, 56, 31)(66, ModelBoradForm_Conditional_66_Template, 5, 1);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(67, ModelBoradForm_Conditional_67_Template, 42, 7, "div", 45);
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275conditional(ctx.isMenuOpen ? 14 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("btn-warning", ctx.appMode() === "sculpt")("btn-blender", ctx.appMode() !== "sculpt");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("btn-warning", ctx.appMode() === "transform")("btn-blender", ctx.appMode() !== "transform");
      \u0275\u0275advance(15);
      \u0275\u0275property("title", ctx.isFullscreen ? "Salir de pantalla completa" : "Pantalla completa");
      \u0275\u0275advance();
      \u0275\u0275classProp("bi-fullscreen", !ctx.isFullscreen)("bi-fullscreen-exit", ctx.isFullscreen);
      \u0275\u0275advance(26);
      \u0275\u0275textInterpolate(ctx.appMode());
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.appMode() === "sculpt" ? 65 : 66);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showModal ? 67 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgModel, Navbar], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  background-color: #ffffffff;\n  color: #cccccc;\n  font-family:\n    system-ui,\n    -apple-system,\n    sans-serif;\n}\n.blender-header[_ngcontent-%COMP%] {\n  background-color: #2d2d2d;\n  border-bottom: 1px solid #3f3f3f;\n  font-size: 0.85rem;\n  position: relative;\n}\n.blender-toolbar[_ngcontent-%COMP%] {\n  background-color: #252525;\n  border-right: 1px solid #3f3f3f;\n  width: 65px;\n}\n.blender-sidebar[_ngcontent-%COMP%] {\n  background-color: #2b2b2b;\n  border-left: 1px solid #3f3f3f;\n  width: 310px;\n}\n.viewport-container[_ngcontent-%COMP%] {\n  position: relative;\n  background-color: #1a1a1a;\n  overflow: hidden;\n}\ncanvas[_ngcontent-%COMP%] {\n  display: block;\n  width: 100% !important;\n  height: 100% !important;\n}\n.btn-blender[_ngcontent-%COMP%] {\n  background-color: #383838;\n  color: #dfdfdf;\n  border: 1px solid #4f4f4f;\n  font-size: 0.8rem;\n}\n.btn-blender[_ngcontent-%COMP%]:hover {\n  background-color: #484848;\n  color: #ffffff;\n  border-color: #606060;\n}\n.btn-blender.active[_ngcontent-%COMP%] {\n  background-color: #e67e22;\n  color: #ffffff;\n  border-color: #d35400;\n}\n.custom-dropdown-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  background-color: #252525;\n  border: 1px solid #4f4f4f;\n  z-index: 1000;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);\n  border-radius: 4px;\n  min-width: 170px;\n}\n.custom-dropdown-item[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  padding: 6px 12px;\n  color: #dfdfdf;\n  text-align: left;\n  background-color: transparent;\n  border: 0;\n  font-size: 0.8rem;\n  cursor: pointer;\n}\n.custom-dropdown-item[_ngcontent-%COMP%]:hover {\n  background-color: #383838;\n  color: #ffffff;\n}\n.custom-modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background: rgba(0, 0, 0, 0.6);\n  z-index: 1050;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.card[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n.card[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: #495057;\n  border-radius: 4px;\n}\n/*# sourceMappingURL=editorimg%20copy%202.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModelBoradForm, [{
    type: Component,
    args: [{ selector: "app-model-form-board", standalone: true, imports: [CommonModule, FormsModule, Navbar], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <app-navbar></app-navbar>
    <div class="py-5"></div>

    <!-- CONTENEDOR PRINCIPAL FULLSCREEN -->
    <div #fullscreenContainer class="d-flex flex-column" style="height: calc(100vh - 56px);">

      <!-- BARRA SUPERIOR ESTILO BLENDER -->
      <div class="blender-header px-3 py-2 d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center" style="gap: 15px;">
          <span class="font-weight-bold text-white">
            <i class="bi bi-box-seam mr-1"></i> Blender Sculpt Studio
          </span>
          
          <!-- Men\xFA Archivo -->
          <div class="position-relative">
            <button class="btn btn-blender btn-sm" type="button" (click)="toggleMenu($event)">
              <i class="bi bi-folder2-open mr-1"></i> Archivo <i class="bi bi-caret-down-fill ml-1" style="font-size: 0.6rem;"></i>
            </button>
            @if (isMenuOpen) {
              <div class="custom-dropdown-menu py-1">
                <button class="custom-dropdown-item" (click)="stlInput.click(); isMenuOpen = false">
                  <i class="bi bi-upload mr-1"></i> Importar STL
                </button>
                <button class="custom-dropdown-item" (click)="exportCleanSTL(); isMenuOpen = false">
                  <i class="bi bi-download mr-1"></i> Exportar STL Limpio (Seleccionado)
                </button>
                <button class="custom-dropdown-item" (click)="exportAllCleanObjectsSTL(); isMenuOpen = false">
                  <i class="bi bi-download mr-1"></i> Exportar Todo Limpio (STL)
                </button>
                <button class="custom-dropdown-item" (click)="exportCleanGLB(); isMenuOpen = false">
                  <i class="bi bi-download mr-1"></i> Exportar GLB Limpio (Esculpir)
                </button>
                <div class="dropdown-divider border-secondary my-1"></div>
                <button class="custom-dropdown-item text-danger" (click)="clearScene(); isMenuOpen = false">
                  <i class="bi bi-trash mr-1"></i> Limpiar Escena
                </button>
              </div>
            }
          </div>
          <input #stlInput type="file" accept=".stl" class="d-none" (change)="loadSTL($event)">

          <!-- Selector de Modo Operativo -->
          <div class="btn-group btn-group-sm">
            <button 
              class="btn btn-sm font-weight-bold" 
              [class.btn-warning]="appMode() === 'sculpt'" 
              [class.btn-blender]="appMode() !== 'sculpt'"
              (click)="setAppMode('sculpt')">
              Modo Esculpir
            </button>
            <button 
              class="btn btn-sm font-weight-bold" 
              [class.btn-warning]="appMode() === 'transform'" 
              [class.btn-blender]="appMode() !== 'transform'"
              (click)="setAppMode('transform')">
              Modo Transformar
            </button>
          </div>
        </div>

        <div class="d-flex align-items-center" style="gap: 15px;">
          <div class="d-flex align-items-center" style="gap: 6px;">
            <span class="text-muted small mr-1"><i class="bi bi-camera mr-1"></i> Vista:</span>
            <button class="btn btn-blender btn-sm" (click)="setCameraView('front')">Frente</button>
            <button class="btn btn-blender btn-sm" (click)="setCameraView('right')">Der</button>
            <button class="btn btn-blender btn-sm" (click)="setCameraView('top')">Arriba</button>
            <button class="btn btn-blender btn-sm" (click)="setCameraView('iso')">Iso</button>
          </div>

          <button class="btn btn-blender btn-sm" (click)="toggleFullScreen()" [title]="isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'">
            <i class="bi" [class.bi-fullscreen]="!isFullscreen" [class.bi-fullscreen-exit]="isFullscreen"></i>
          </button>
        </div>
      </div>

      <!-- CUERPO PRINCIPAL -->
      <div class="d-flex flex-grow-1" style="height: calc(100vh - 99px);">
        
        <!-- BARRA LATERAL IZQUIERDA: A\xF1adir Objetos -->
        <div class="blender-toolbar d-flex flex-column align-items-center py-3" style="gap: 10px;">
          <span class="text-muted font-weight-bold mb-1" style="font-size: 0.65rem;">ADD</span>
          
          <button class="btn btn-blender p-2 rounded w-75 text-center" title="Cubo" draggable="true" (dragstart)="onDragStart($event, 'cube')" (click)="addNewObjectCenter('cube')">
            <i class="bi bi-box fs-5"></i>
          </button>
          <button class="btn btn-blender p-2 rounded w-75 text-center" title="Esfera" draggable="true" (dragstart)="onDragStart($event, 'sphere')" (click)="addNewObjectCenter('sphere')">
            <i class="bi bi-globe fs-5"></i>
          </button>
          <button class="btn btn-blender p-2 rounded w-75 text-center" title="Cilindro" draggable="true" (dragstart)="onDragStart($event, 'cylinder')" (click)="addNewObjectCenter('cylinder')">
            <i class="bi bi-capsule fs-5"></i>
          </button>
          <button class="btn btn-blender p-2 rounded w-75 text-center" title="Cono" draggable="true" (dragstart)="onDragStart($event, 'cone')" (click)="addNewObjectCenter('cone')">
            <i class="bi bi-triangle fs-5"></i>
          </button>
          <button class="btn btn-blender p-2 rounded w-75 text-center" title="Toroide" draggable="true" (dragstart)="onDragStart($event, 'torus')" (click)="addNewObjectCenter('torus')">
            <i class="bi bi-record-circle fs-5"></i>
          </button>
          <button class="btn btn-blender p-2 rounded w-75 text-center" title="Plano" draggable="true" (dragstart)="onDragStart($event, 'plane')" (click)="addNewObjectCenter('plane')">
            <i class="bi bi-square fs-5"></i>
          </button>
          <button class="btn btn-blender p-2 rounded w-75 text-center" title="Nudo" draggable="true" (dragstart)="onDragStart($event, 'knot')" (click)="addNewObjectCenter('knot')">
            <i class="bi bi-infinity fs-5"></i>
          </button>
        </div>

        <!-- VIEWPORT CENTRAL 3D -->
        <div class="viewport-container flex-grow-1" (dragover)="onDragOver($event)" (drop)="onDrop($event)" (click)="closeMenuOnClick()">
          <canvas #canvasContainer></canvas>
          <div class="position-absolute text-muted small px-3 py-2 pointer-events-none" style="bottom: 10px; left: 10px; background: rgba(0,0,0,0.6); border-radius: 4px;">
            <i class="bi bi-info-circle mr-1"></i> Modo actual: <strong class="text-warning text-uppercase">{{ appMode() }}</strong>. Clic para seleccionar objeto.
          </div>
        </div>

        <!-- BARRA LATERAL DERECHA -->
        <div class="blender-sidebar p-3 d-flex flex-column overflow-auto" style="gap: 12px;">
          
          @if (appMode() === 'sculpt') {
            <h6 class="text-white font-weight-bold small text-uppercase mb-2 border-bottom pb-2">
              <i class="bi bi-brush mr-1"></i> Herramientas de Esculpido
            </h6>

            <!-- Grid de Pinceles -->
            <div class="d-grid gap-2 mb-2" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;">
              <button class="btn btn-sm font-weight-bold text-truncate" [class.btn-warning]="selectedTool() === 'inflate'" [class.btn-blender]="selectedTool() !== 'inflate'" (click)="setSculptTool('inflate')">Inflar</button>
              <button class="btn btn-sm font-weight-bold text-truncate" [class.btn-warning]="selectedTool() === 'deflate'" [class.btn-blender]="selectedTool() !== 'deflate'" (click)="setSculptTool('deflate')">Hundir</button>
              <button class="btn btn-sm font-weight-bold text-truncate" [class.btn-warning]="selectedTool() === 'smooth'" [class.btn-blender]="selectedTool() !== 'smooth'" (click)="setSculptTool('smooth')">Suavizar</button>
              <button class="btn btn-sm font-weight-bold text-truncate" [class.btn-warning]="selectedTool() === 'flatten'" [class.btn-blender]="selectedTool() !== 'flatten'" (click)="setSculptTool('flatten')">Aplanar</button>
              <button class="btn btn-sm font-weight-bold text-truncate" [class.btn-success]="selectedTool() === 'paint'" [class.btn-blender]="selectedTool() !== 'paint'" style="grid-column: span 2;" (click)="setSculptTool('paint')">Pintar V\xE9rtices</button>
            </div>

            @if (selectedTool() === 'paint') {
              <div class="bg-secondary p-2 rounded mb-2">
                <label class="small font-weight-bold mb-1 text-light">Color de Pincel:</label>
                <input type="color" [value]="paintColor()" (input)="updatePaintColor($event)" class="form-control form-control-sm p-0 border-0 bg-transparent cursor-pointer w-100" style="height: 32px;" />
              </div>
            }

            <div class="mb-2">
              <div class="d-flex justify-content-between small text-ligth font-weight-bold mb-1">
                <span>Tama\xF1o Pincel</span>
                <span class="badge badge-secondary">{{ brushSize() }}</span>
              </div>
              <input type="range" class="form-control-range" min="0.2" max="3" step="0.1" [value]="brushSize()" (input)="updateBrushSize($event)" />
            </div>

            <div class="mb-2">
              <div class="d-flex justify-content-between small text-light font-weight-bold mb-1">
                <span>Intensidad</span>
                <span class="badge badge-secondary">{{ brushIntensity() }}</span>
              </div>
              <input type="range" class="form-control-range" min="0.01" max="1.0" step="0.01" [value]="brushIntensity()" (input)="updateBrushIntensity($event)" />
            </div>

            <hr class="border-secondary my-1">

            <!-- Dyntopo -->
            <div class="bg-secondary p-2 rounded mb-2">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="dyntopoCheck" [checked]="enableDyntopo()" (change)="toggleDyntopo($event)" />
                <label class="custom-control-label small font-weight-bold text-light" for="dyntopoCheck">Topolog\xEDa Din\xE1mica (Dyntopo)</label>
              </div>
              @if (enableDyntopo()) {
                <div class="small mt-2 pt-1 border-top border-dark">
                  <div class="d-flex justify-content-between mb-1">
                    <span class="text-muted">Detalle Arista:</span>
                    <span class="badge badge-dark">{{ maxEdgeLength() }}</span>
                  </div>
                  <input type="range" class="form-control-range" min="0.05" max="0.5" step="0.01" [value]="maxEdgeLength()" (input)="updateMaxEdgeLength($event)" />
                </div>
              }
            </div>

            <div class="bg-secondary p-2 rounded mb-2">
              <div class="custom-control custom-checkbox mb-1">
                <input type="checkbox" class="custom-control-input" id="symCheck" [checked]="symmetryX()" (change)="toggleSymmetry($event)">
                <label class="custom-control-label small font-weight-bold text-light" for="symCheck">Simetr\xEDa (Eje X)</label>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="wireCheck" [checked]="wireframe()" (change)="toggleWireframe($event)">
                <label class="custom-control-label small font-weight-bold text-light" for="wireCheck">Modo Malla (Wireframe)</label>
              </div>
            </div>

            <div class="card bg-secondary text-light p-2 mb-2 small border-0">
              <div class="d-flex justify-content-between"><span>V\xE9rtices:</span><strong class="text-warning">{{ vertexCount() }}</strong></div>
              <div class="d-flex justify-content-between"><span>Caras:</span><strong class="text-warning">{{ faceCount() }}</strong></div>
            </div>

          } @else {
            <h6 class="text-white font-weight-bold small text-uppercase mb-2 border-bottom pb-2">
              <i class="bi bi-sliders mr-1"></i> Propiedades de Objeto
            </h6>

            @if (selectedObject) {
              <div class="small text-muted mb-2"><i class="bi bi-check2-circle mr-1"></i> Objeto activo seleccionado</div>
              
              <div class="btn-group btn-group-sm w-100 mb-3" role="group">
                <button type="button" class="btn btn-blender" [class.active]="transformMode === 'translate'" (click)="setTransformMode('translate')"><i class="bi bi-arrows-move mr-1"></i> Mover</button>
                <button type="button" class="btn btn-blender" [class.active]="transformMode === 'rotate'" (click)="setTransformMode('rotate')"><i class="bi bi-arrow-repeat mr-1"></i> Rotar</button>
                <button type="button" class="btn btn-blender" [class.active]="transformMode === 'scale'" (click)="setTransformMode('scale')"><i class="bi bi-aspect-ratio mr-1"></i> Escalar</button>
              </div>

              <div class="d-flex flex-column" style="gap: 8px;">
                <button class="btn btn-blender btn-sm w-100 text-left" (click)="duplicateSelectedObject()"><i class="bi bi-files mr-1"></i> Duplicar Objeto</button>
                <button class="btn btn-blender btn-sm w-100 text-left" (click)="rotate90Y()"><i class="bi bi-arrow-clockwise mr-1"></i> Rotar 90\xB0 (Eje Y)</button>
                <button class="btn btn-blender btn-sm w-100 text-left" (click)="resetScale()"><i class="bi bi-arrow-counterclockwise mr-1"></i> Restablecer Escala</button>
                <button class="btn btn-blender btn-sm w-100 text-left" (click)="showModal = true"><i class="bi bi-gear mr-1"></i> Editar Valores Num\xE9ricos</button>
                <button class="btn btn-outline-danger btn-sm w-100 text-left mt-2" (click)="deleteSelectedObject()"><i class="bi bi-trash mr-1"></i> Eliminar Objeto</button>
              </div>
            } @else {
              <div class="text-muted small italic"><i class="bi bi-exclamation-circle mr-1"></i> Ning\xFAn objeto seleccionado. Selecciona uno en el visor.</div>
            }
          }

        </div>

      </div>

    </div>

    <!-- MODAL DE PROPIEDADES NUM\xC9RICAS -->
    @if (showModal) {
      <div class="custom-modal-backdrop">
        <div class="card bg-dark text-light border-secondary shadow-lg" style="width: 380px;">
          <div class="card-header border-secondary d-flex justify-content-between align-items-center">
            <h6 class="mb-0"><i class="bi bi-sliders2 mr-1"></i> Ajustes Num\xE9ricos</h6>
            <button type="button" class="close text-white border-0 bg-transparent" aria-label="Close" (click)="closeModal()"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="card-body small" style="display: flex; flex-direction: column; gap: 12px;">
            <div>
              <label class="font-weight-bold d-block mb-1"><i class="bi bi-palette mr-1"></i> Color:</label>
              <input type="color" class="form-control form-control-sm bg-secondary border-0 w-100" style="height: 35px;" [(ngModel)]="modalObjectProperties.color">
            </div>
            <div>
              <label class="font-weight-bold mb-1 d-block"><i class="bi bi-geo-alt mr-1"></i> Posici\xF3n (X, Y, Z):</label>
              <div class="row">
                <div class="col"><input type="number" step="0.1" class="form-control form-control-sm bg-secondary text-light border-0" [(ngModel)]="modalObjectProperties.positionX"></div>
                <div class="col"><input type="number" step="0.1" class="form-control form-control-sm bg-secondary text-light border-0" [(ngModel)]="modalObjectProperties.positionY"></div>
                <div class="col"><input type="number" step="0.1" class="form-control form-control-sm bg-secondary text-light border-0" [(ngModel)]="modalObjectProperties.positionZ"></div>
              </div>
            </div>
            <div>
              <label class="font-weight-bold mb-1 d-block"><i class="bi bi-arrows-angle-expand mr-1"></i> Escala (X, Y, Z):</label>
              <div class="row">
                <div class="col"><input type="number" step="0.1" class="form-control form-control-sm bg-secondary text-light border-0" [(ngModel)]="modalObjectProperties.scaleX"></div>
                <div class="col"><input type="number" step="0.1" class="form-control form-control-sm bg-secondary text-light border-0" [(ngModel)]="modalObjectProperties.scaleY"></div>
                <div class="col"><input type="number" step="0.1" class="form-control form-control-sm bg-secondary text-light border-0" [(ngModel)]="modalObjectProperties.scaleZ"></div>
              </div>
            </div>
          </div>
          <div class="card-footer border-secondary d-flex justify-content-end" style="gap: 8px;">
            <button class="btn btn-secondary btn-sm" (click)="closeModal()">Cancelar</button>
            <button class="btn btn-primary btn-sm" (click)="updateObjectProperties()">Aplicar</button>
          </div>
        </div>
      </div>
    }
  `, styles: ["/* angular:styles/component:css;d2e36152cb0ac285989fd73b5cada7000a729c038e23f29396ba3721345d8ea2;/home/linuxlite/WebMEAN/src/app/componentes/editorimg copy 2.ts */\n:host {\n  display: block;\n  background-color: #ffffffff;\n  color: #cccccc;\n  font-family:\n    system-ui,\n    -apple-system,\n    sans-serif;\n}\n.blender-header {\n  background-color: #2d2d2d;\n  border-bottom: 1px solid #3f3f3f;\n  font-size: 0.85rem;\n  position: relative;\n}\n.blender-toolbar {\n  background-color: #252525;\n  border-right: 1px solid #3f3f3f;\n  width: 65px;\n}\n.blender-sidebar {\n  background-color: #2b2b2b;\n  border-left: 1px solid #3f3f3f;\n  width: 310px;\n}\n.viewport-container {\n  position: relative;\n  background-color: #1a1a1a;\n  overflow: hidden;\n}\ncanvas {\n  display: block;\n  width: 100% !important;\n  height: 100% !important;\n}\n.btn-blender {\n  background-color: #383838;\n  color: #dfdfdf;\n  border: 1px solid #4f4f4f;\n  font-size: 0.8rem;\n}\n.btn-blender:hover {\n  background-color: #484848;\n  color: #ffffff;\n  border-color: #606060;\n}\n.btn-blender.active {\n  background-color: #e67e22;\n  color: #ffffff;\n  border-color: #d35400;\n}\n.custom-dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  background-color: #252525;\n  border: 1px solid #4f4f4f;\n  z-index: 1000;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);\n  border-radius: 4px;\n  min-width: 170px;\n}\n.custom-dropdown-item {\n  display: block;\n  width: 100%;\n  padding: 6px 12px;\n  color: #dfdfdf;\n  text-align: left;\n  background-color: transparent;\n  border: 0;\n  font-size: 0.8rem;\n  cursor: pointer;\n}\n.custom-dropdown-item:hover {\n  background-color: #383838;\n  color: #ffffff;\n}\n.custom-modal-backdrop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background: rgba(0, 0, 0, 0.6);\n  z-index: 1050;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.card::-webkit-scrollbar {\n  width: 6px;\n}\n.card::-webkit-scrollbar-thumb {\n  background-color: #495057;\n  border-radius: 4px;\n}\n/*# sourceMappingURL=editorimg%20copy%202.css.map */\n"] }]
  }], () => [{ type: NgZone }], { canvasContainer: [{
    type: ViewChild,
    args: ["canvasContainer", { static: true }]
  }], fullscreenContainerRef: [{
    type: ViewChild,
    args: ["fullscreenContainer", { static: true }]
  }], onResize: [{
    type: HostListener,
    args: ["window:resize"]
  }], onFullScreenChange: [{
    type: HostListener,
    args: ["document:fullscreenchange"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ModelBoradForm, { className: "ModelBoradForm", filePath: "src/app/componentes/editorimg copy 2.ts", lineNumber: 382 });
})();
export {
  ModelBoradForm
};
//# sourceMappingURL=chunk-AS6HSLXW.mjs.map
