import {
  g
} from "./chunk-YC5JMNYG.js";
import {
  GLTFLoader
} from "./chunk-C3ORDXL6.js";
import {
  Navbar
} from "./chunk-U3CDTOVP.js";
import "./chunk-DJCOHPHY.js";
import {
  ACESFilmicToneMapping,
  Box3,
  BufferGeometry,
  Color,
  DirectionalLight,
  Float32BufferAttribute,
  Fog,
  HemisphereLight,
  IcosahedronGeometry,
  Layers,
  Line3,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshLambertMaterial,
  PerspectiveCamera,
  Plane,
  Scene,
  Sphere,
  Timer,
  Triangle,
  VSMShadowMap,
  Vector3,
  WebGLRenderer
} from "./chunk-ZUJZQ355.js";
import "./chunk-PFU5G7MY.js";
import "./chunk-MMWGUNZC.js";
import {
  CommonModule
} from "./chunk-6QD4DAAM.js";
import {
  ChangeDetectionStrategy,
  Component,
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
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-FXWIEX65.js";
import "./chunk-3WPM564S.js";

// node_modules/three/examples/jsm/libs/stats.module.js
var Stats = function() {
  var mode = 0;
  var container = document.createElement("div");
  container.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";
  container.addEventListener("click", function(event) {
    event.preventDefault();
    showPanel(++mode % container.children.length);
  }, false);
  function addPanel(panel) {
    container.appendChild(panel.dom);
    return panel;
  }
  function showPanel(id) {
    for (var i = 0; i < container.children.length; i++) {
      container.children[i].style.display = i === id ? "block" : "none";
    }
    mode = id;
  }
  var beginTime = (performance || Date).now(), prevTime = beginTime, frames = 0;
  var fpsPanel = addPanel(new Stats.Panel("FPS", "#0ff", "#002"));
  var msPanel = addPanel(new Stats.Panel("MS", "#0f0", "#020"));
  if (self.performance && self.performance.memory) {
    var memPanel = addPanel(new Stats.Panel("MB", "#f08", "#201"));
  }
  showPanel(0);
  return {
    REVISION: 16,
    dom: container,
    addPanel,
    showPanel,
    begin: function() {
      beginTime = (performance || Date).now();
    },
    end: function() {
      frames++;
      var time = (performance || Date).now();
      msPanel.update(time - beginTime, 200);
      if (time >= prevTime + 1e3) {
        fpsPanel.update(frames * 1e3 / (time - prevTime), 100);
        prevTime = time;
        frames = 0;
        if (memPanel) {
          var memory = performance.memory;
          memPanel.update(memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576);
        }
      }
      return time;
    },
    update: function() {
      beginTime = this.end();
    },
    // Backwards Compatibility
    domElement: container,
    setMode: showPanel
  };
};
Stats.Panel = function(name, fg, bg) {
  var min = Infinity, max = 0, round = Math.round;
  var PR = round(window.devicePixelRatio || 1);
  var WIDTH = 80 * PR, HEIGHT = 48 * PR, TEXT_X = 3 * PR, TEXT_Y = 2 * PR, GRAPH_X = 3 * PR, GRAPH_Y = 15 * PR, GRAPH_WIDTH = 74 * PR, GRAPH_HEIGHT = 30 * PR;
  var canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  canvas.style.cssText = "width:80px;height:48px";
  var context = canvas.getContext("2d");
  context.font = "bold " + 9 * PR + "px Helvetica,Arial,sans-serif";
  context.textBaseline = "top";
  context.fillStyle = bg;
  context.fillRect(0, 0, WIDTH, HEIGHT);
  context.fillStyle = fg;
  context.fillText(name, TEXT_X, TEXT_Y);
  context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);
  context.fillStyle = bg;
  context.globalAlpha = 0.9;
  context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);
  return {
    dom: canvas,
    update: function(value, maxValue) {
      min = Math.min(min, value);
      max = Math.max(max, value);
      context.fillStyle = bg;
      context.globalAlpha = 1;
      context.fillRect(0, 0, WIDTH, GRAPH_Y);
      context.fillStyle = fg;
      context.fillText(round(value) + " " + name + " (" + round(min) + "-" + round(max) + ")", TEXT_X, TEXT_Y);
      context.drawImage(canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT);
      context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT);
      context.fillStyle = bg;
      context.globalAlpha = 0.9;
      context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round((1 - value / maxValue) * GRAPH_HEIGHT));
    }
  };
};
var stats_module_default = Stats;

// node_modules/three/examples/jsm/math/Capsule.js
var Capsule = class {
  /**
   * Constructs a new capsule.
   *
   * @param {Vector3} [start] - The start vector.
   * @param {Vector3} [end] - The end vector.
   * @param {number} [radius=1] - The capsule's radius.
   */
  constructor(start = new Vector3(0, 0, 0), end = new Vector3(0, 1, 0), radius = 1) {
    this.start = start;
    this.end = end;
    this.radius = radius;
  }
  /**
   * Returns a new capsule with copied values from this instance.
   *
   * @return {Capsule} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Sets the capsule components to the given values.
   * Please note that this method only copies the values from the given objects.
   *
   * @param {Vector3} start - The start vector.
   * @param {Vector3} end - The end vector
   * @param {number} radius - The capsule's radius.
   * @return {Capsule} A reference to this capsule.
   */
  set(start, end, radius) {
    this.start.copy(start);
    this.end.copy(end);
    this.radius = radius;
    return this;
  }
  /**
   * Copies the values of the given capsule to this instance.
   *
   * @param {Capsule} capsule - The capsule to copy.
   * @return {Capsule} A reference to this capsule.
   */
  copy(capsule) {
    this.start.copy(capsule.start);
    this.end.copy(capsule.end);
    this.radius = capsule.radius;
    return this;
  }
  /**
   * Returns the center point of this capsule.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The center point.
   */
  getCenter(target) {
    return target.copy(this.end).add(this.start).multiplyScalar(0.5);
  }
  /**
   * Adds the given offset to this capsule, effectively moving it in 3D space.
   *
   * @param {Vector3} v - The offset that should be used to translate the capsule.
   * @return {Capsule} A reference to this capsule.
   */
  translate(v) {
    this.start.add(v);
    this.end.add(v);
    return this;
  }
  /**
   * Returns `true` if the given bounding box intersects with this capsule.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the given bounding box intersects with this capsule.
   */
  intersectsBox(box) {
    return checkAABBAxis(
      this.start.x,
      this.start.y,
      this.end.x,
      this.end.y,
      box.min.x,
      box.max.x,
      box.min.y,
      box.max.y,
      this.radius
    ) && checkAABBAxis(
      this.start.x,
      this.start.z,
      this.end.x,
      this.end.z,
      box.min.x,
      box.max.x,
      box.min.z,
      box.max.z,
      this.radius
    ) && checkAABBAxis(
      this.start.y,
      this.start.z,
      this.end.y,
      this.end.z,
      box.min.y,
      box.max.y,
      box.min.z,
      box.max.z,
      this.radius
    );
  }
};
function checkAABBAxis(p1x, p1y, p2x, p2y, minx, maxx, miny, maxy, radius) {
  return (minx - p1x < radius || minx - p2x < radius) && (p1x - maxx < radius || p2x - maxx < radius) && (miny - p1y < radius || miny - p2y < radius) && (p1y - maxy < radius || p2y - maxy < radius);
}

// node_modules/three/examples/jsm/math/Octree.js
var _v1 = new Vector3();
var _v2 = new Vector3();
var _point1 = new Vector3();
var _point2 = new Vector3();
var _plane = new Plane();
var _line1 = new Line3();
var _line2 = new Line3();
var _box = new Box3();
var _sphere = new Sphere();
var _capsule = new Capsule();
var _center = new Vector3();
var _temp1 = new Vector3();
var _temp2 = new Vector3();
var _temp3 = new Vector3();
var EPS = 1e-10;
function lineToLineClosestPoints(line1, line2, target1 = null, target2 = null) {
  const r = _temp1.copy(line1.end).sub(line1.start);
  const s = _temp2.copy(line2.end).sub(line2.start);
  const w = _temp3.copy(line2.start).sub(line1.start);
  const a = r.dot(s), b = r.dot(r), c = s.dot(s), d = s.dot(w), e = r.dot(w);
  let t1, t2;
  const divisor = b * c - a * a;
  if (Math.abs(divisor) < EPS) {
    const d1 = -d / c;
    const d2 = (a - d) / c;
    if (Math.abs(d1 - 0.5) < Math.abs(d2 - 0.5)) {
      t1 = 0;
      t2 = d1;
    } else {
      t1 = 1;
      t2 = d2;
    }
  } else {
    t1 = (d * a + e * c) / divisor;
    t2 = (t1 * a - d) / c;
  }
  t2 = Math.max(0, Math.min(1, t2));
  t1 = Math.max(0, Math.min(1, t1));
  if (target1) {
    target1.copy(r).multiplyScalar(t1).add(line1.start);
  }
  if (target2) {
    target2.copy(s).multiplyScalar(t2).add(line2.start);
  }
}
var Octree = class _Octree {
  /**
   * Constructs a new Octree.
   *
   * @param {Box3} [box] - The base box with enclose the entire Octree.
   */
  constructor(box) {
    this.box = box;
    this.bounds = new Box3();
    this.layers = new Layers();
    this.trianglesPerLeaf = 8;
    this.maxLevel = 16;
    this.subTrees = [];
    this.triangles = [];
  }
  /**
   * Adds the given triangle to the Octree. The triangle vertices are clamped if they exceed
   * the bounds of the Octree.
   *
   * @param {Triangle} triangle - The triangle to add.
   * @return {Octree} A reference to this Octree.
   */
  addTriangle(triangle) {
    this.bounds.min.x = Math.min(this.bounds.min.x, triangle.a.x, triangle.b.x, triangle.c.x);
    this.bounds.min.y = Math.min(this.bounds.min.y, triangle.a.y, triangle.b.y, triangle.c.y);
    this.bounds.min.z = Math.min(this.bounds.min.z, triangle.a.z, triangle.b.z, triangle.c.z);
    this.bounds.max.x = Math.max(this.bounds.max.x, triangle.a.x, triangle.b.x, triangle.c.x);
    this.bounds.max.y = Math.max(this.bounds.max.y, triangle.a.y, triangle.b.y, triangle.c.y);
    this.bounds.max.z = Math.max(this.bounds.max.z, triangle.a.z, triangle.b.z, triangle.c.z);
    this.triangles.push(triangle);
    return this;
  }
  /**
   * Prepares {@link Octree#box} for the build.
   *
   * @return {Octree} A reference to this Octree.
   */
  calcBox() {
    this.box = this.bounds.clone();
    this.box.min.x -= 0.01;
    this.box.min.y -= 0.01;
    this.box.min.z -= 0.01;
    return this;
  }
  /**
   * Splits the Octree. This method is used recursively when
   * building the Octree.
   *
   * @param {number} level - The current level.
   * @return {Octree} A reference to this Octree.
   */
  split(level) {
    if (!this.box) return;
    const subTrees = [];
    const halfsize = _v2.copy(this.box.max).sub(this.box.min).multiplyScalar(0.5);
    for (let x = 0; x < 2; x++) {
      for (let y = 0; y < 2; y++) {
        for (let z = 0; z < 2; z++) {
          const box = new Box3();
          const v = _v1.set(x, y, z);
          box.min.copy(this.box.min).add(v.multiply(halfsize));
          box.max.copy(box.min).add(halfsize);
          subTrees.push(new _Octree(box));
        }
      }
    }
    let triangle;
    while (triangle = this.triangles.pop()) {
      for (let i = 0; i < subTrees.length; i++) {
        if (subTrees[i].box.intersectsTriangle(triangle)) {
          subTrees[i].triangles.push(triangle);
        }
      }
    }
    for (let i = 0; i < subTrees.length; i++) {
      const len = subTrees[i].triangles.length;
      if (len > this.trianglesPerLeaf && level < this.maxLevel) {
        subTrees[i].split(level + 1);
      }
      if (len !== 0) {
        this.subTrees.push(subTrees[i]);
      }
    }
    return this;
  }
  /**
   * Builds the Octree.
   *
   * @return {Octree} A reference to this Octree.
   */
  build() {
    this.calcBox();
    this.split(0);
    return this;
  }
  /**
   * Computes the triangles that potentially intersect with the given ray.
   *
   * @param {Ray} ray - The ray to test.
   * @param {Array<Triangle>} triangles - The target array that holds the triangles.
   */
  getRayTriangles(ray, triangles) {
    for (let i = 0; i < this.subTrees.length; i++) {
      const subTree = this.subTrees[i];
      if (!ray.intersectsBox(subTree.box)) continue;
      if (subTree.triangles.length > 0) {
        for (let j = 0; j < subTree.triangles.length; j++) {
          if (triangles.indexOf(subTree.triangles[j]) === -1) triangles.push(subTree.triangles[j]);
        }
      } else {
        subTree.getRayTriangles(ray, triangles);
      }
    }
  }
  /**
   * Computes the intersection between the given capsule and triangle.
   *
   * @param {Capsule} capsule - The capsule to test.
   * @param {Triangle} triangle - The triangle to test.
   * @return {Object|false} The intersection object. If no intersection
   * is detected, the method returns `false`.
   */
  triangleCapsuleIntersect(capsule, triangle) {
    triangle.getPlane(_plane);
    const d1 = _plane.distanceToPoint(capsule.start) - capsule.radius;
    const d2 = _plane.distanceToPoint(capsule.end) - capsule.radius;
    if (d1 > 0 && d2 > 0 || d1 < -capsule.radius && d2 < -capsule.radius) {
      return false;
    }
    const delta = Math.abs(d1 / (Math.abs(d1) + Math.abs(d2)));
    const intersectPoint = _v1.copy(capsule.start).lerp(capsule.end, delta);
    if (triangle.containsPoint(intersectPoint)) {
      return { normal: _plane.normal.clone(), point: intersectPoint.clone(), depth: Math.abs(Math.min(d1, d2)) };
    }
    const r2 = capsule.radius * capsule.radius;
    const line1 = _line1.set(capsule.start, capsule.end);
    const lines = [
      [triangle.a, triangle.b],
      [triangle.b, triangle.c],
      [triangle.c, triangle.a]
    ];
    for (let i = 0; i < lines.length; i++) {
      const line2 = _line2.set(lines[i][0], lines[i][1]);
      lineToLineClosestPoints(line1, line2, _point1, _point2);
      if (_point1.distanceToSquared(_point2) < r2) {
        return {
          normal: _point1.clone().sub(_point2).normalize(),
          point: _point2.clone(),
          depth: capsule.radius - _point1.distanceTo(_point2)
        };
      }
    }
    return false;
  }
  /**
   * Computes the intersection between the given bounding box and triangle.
   *
   * @param {Box3} box - The bounding box to test.
   * @param {Triangle} triangle - The triangle to test.
   * @return {Object|false} The intersection object. If no intersection
   * is detected, the method returns `false`.
   */
  triangleBoxIntersect(box, triangle) {
    if (Math.max(triangle.a.x, triangle.b.x, triangle.c.x) < box.min.x || Math.min(triangle.a.x, triangle.b.x, triangle.c.x) > box.max.x || Math.max(triangle.a.y, triangle.b.y, triangle.c.y) < box.min.y || Math.min(triangle.a.y, triangle.b.y, triangle.c.y) > box.max.y || Math.max(triangle.a.z, triangle.b.z, triangle.c.z) < box.min.z || Math.min(triangle.a.z, triangle.b.z, triangle.c.z) > box.max.z) {
      return false;
    }
    if (!box.intersectsTriangle(triangle)) return false;
    triangle.getPlane(_plane);
    _v1.x = _plane.normal.x > 0 ? box.min.x : box.max.x;
    _v1.y = _plane.normal.y > 0 ? box.min.y : box.max.y;
    _v1.z = _plane.normal.z > 0 ? box.min.z : box.max.z;
    const distance = _plane.distanceToPoint(_v1);
    const intersection = {
      depth: -distance,
      // Flip sign so depth is positive
      normal: _plane.normal.clone(),
      point: _v1.clone()
    };
    intersection.point.addScaledVector(intersection.normal, distance);
    return intersection;
  }
  /**
   * Computes the intersection between the given sphere and triangle.
   *
   * @param {Sphere} sphere - The sphere to test.
   * @param {Triangle} triangle - The triangle to test.
   * @return {Object|false} The intersection object. If no intersection
   * is detected, the method returns `false`.
   */
  triangleSphereIntersect(sphere, triangle) {
    triangle.getPlane(_plane);
    if (!sphere.intersectsPlane(_plane)) return false;
    const depth = Math.abs(_plane.distanceToSphere(sphere));
    const r2 = sphere.radius * sphere.radius - depth * depth;
    const plainPoint = _plane.projectPoint(sphere.center, _v1);
    if (triangle.containsPoint(sphere.center)) {
      return { normal: _plane.normal.clone(), point: plainPoint.clone(), depth: Math.abs(_plane.distanceToSphere(sphere)) };
    }
    const lines = [
      [triangle.a, triangle.b],
      [triangle.b, triangle.c],
      [triangle.c, triangle.a]
    ];
    for (let i = 0; i < lines.length; i++) {
      _line1.set(lines[i][0], lines[i][1]);
      _line1.closestPointToPoint(plainPoint, true, _v2);
      const d = _v2.distanceToSquared(sphere.center);
      if (d < r2) {
        return { normal: sphere.center.clone().sub(_v2).normalize(), point: _v2.clone(), depth: sphere.radius - Math.sqrt(d) };
      }
    }
    return false;
  }
  /**
   * Computes the triangles that potentially intersect with the given bounding sphere.
   *
   * @param {Sphere} sphere - The sphere to test.
   * @param {Array<Triangle>} triangles - The target array that holds the triangles.
   */
  getSphereTriangles(sphere, triangles) {
    for (let i = 0; i < this.subTrees.length; i++) {
      const subTree = this.subTrees[i];
      if (!sphere.intersectsBox(subTree.box)) continue;
      if (subTree.triangles.length > 0) {
        for (let j = 0; j < subTree.triangles.length; j++) {
          if (triangles.indexOf(subTree.triangles[j]) === -1) triangles.push(subTree.triangles[j]);
        }
      } else {
        subTree.getSphereTriangles(sphere, triangles);
      }
    }
  }
  /**
   * Computes the triangles that potentially intersect with the given bounding box.
   *
   * @param {Box3} box - The bounding box.
   * @param {Array<Triangle>} triangles - The target array that holds the triangles.
   */
  getBoxTriangles(box, triangles) {
    for (let i = 0; i < this.subTrees.length; i++) {
      const subTree = this.subTrees[i];
      if (!box.intersectsBox(subTree.box)) continue;
      if (subTree.triangles.length > 0) {
        for (let j = 0; j < subTree.triangles.length; j++) {
          if (triangles.indexOf(subTree.triangles[j]) === -1) triangles.push(subTree.triangles[j]);
        }
      } else {
        subTree.getBoxTriangles(box, triangles);
      }
    }
  }
  /**
   * Computes the triangles that potentially intersect with the given capsule.
   *
   * @param {Capsule} capsule - The capsule to test.
   * @param {Array<Triangle>} triangles - The target array that holds the triangles.
   */
  getCapsuleTriangles(capsule, triangles) {
    for (let i = 0; i < this.subTrees.length; i++) {
      const subTree = this.subTrees[i];
      if (!capsule.intersectsBox(subTree.box)) continue;
      if (subTree.triangles.length > 0) {
        for (let j = 0; j < subTree.triangles.length; j++) {
          if (triangles.indexOf(subTree.triangles[j]) === -1) triangles.push(subTree.triangles[j]);
        }
      } else {
        subTree.getCapsuleTriangles(capsule, triangles);
      }
    }
  }
  /**
   * Performs a bounding box intersection test with this Octree.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {Object|boolean} The intersection object. If no intersection
   * is detected, the method returns `false`.
   */
  boxIntersect(box) {
    _box.copy(box);
    const triangles = [];
    let result, hit = false;
    this.getBoxTriangles(box, triangles);
    for (let i = 0; i < triangles.length; i++) {
      if (result = this.triangleBoxIntersect(_box, triangles[i])) {
        hit = true;
        _box.translate(result.normal.multiplyScalar(result.depth));
      }
    }
    if (hit) {
      const collisionVector = _box.getCenter(_center).sub(box.getCenter(_v1));
      const depth = collisionVector.length();
      return { normal: collisionVector.normalize(), depth };
    }
    return false;
  }
  /**
   * Performs a bounding sphere intersection test with this Octree.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {Object|boolean} The intersection object. If no intersection
   * is detected, the method returns `false`.
   */
  sphereIntersect(sphere) {
    _sphere.copy(sphere);
    const triangles = [];
    let result, hit = false;
    this.getSphereTriangles(sphere, triangles);
    for (let i = 0; i < triangles.length; i++) {
      if (result = this.triangleSphereIntersect(_sphere, triangles[i])) {
        hit = true;
        _sphere.center.add(result.normal.multiplyScalar(result.depth));
      }
    }
    if (hit) {
      const collisionVector = _sphere.center.clone().sub(sphere.center);
      const depth = collisionVector.length();
      return { normal: collisionVector.normalize(), depth };
    }
    return false;
  }
  /**
   * Performs a capsule intersection test with this Octree.
   *
   * @param {Capsule} capsule - The capsule to test.
   * @return {Object|boolean} The intersection object. If no intersection
   * is detected, the method returns `false`.
   */
  capsuleIntersect(capsule) {
    _capsule.copy(capsule);
    const triangles = [];
    let result, hit = false;
    this.getCapsuleTriangles(_capsule, triangles);
    for (let i = 0; i < triangles.length; i++) {
      if (result = this.triangleCapsuleIntersect(_capsule, triangles[i])) {
        hit = true;
        _capsule.translate(result.normal.multiplyScalar(result.depth));
      }
    }
    if (hit) {
      const collisionVector = _capsule.getCenter(_center).sub(capsule.getCenter(_v1));
      const depth = collisionVector.length();
      return { normal: collisionVector.normalize(), depth };
    }
    return false;
  }
  /**
   * Performs a ray intersection test with this Octree.
   *
   * @param {Ray} ray - The ray to test.
   * @return {Object|boolean} The nearest intersection object. If no intersection
   * is detected, the method returns `false`.
   */
  rayIntersect(ray) {
    const triangles = [];
    let triangle, position, distance = 1e100;
    this.getRayTriangles(ray, triangles);
    for (let i = 0; i < triangles.length; i++) {
      const result = ray.intersectTriangle(triangles[i].a, triangles[i].b, triangles[i].c, true, _v1);
      if (result) {
        const newdistance = result.sub(ray.origin).length();
        if (distance > newdistance) {
          position = result.clone().add(ray.origin);
          distance = newdistance;
          triangle = triangles[i];
        }
      }
    }
    return distance < 1e100 ? { distance, triangle, position } : false;
  }
  /**
   * Constructs the Octree from the given 3D object.
   *
   * @param {Object3D} group - The scene graph node.
   * @return {Octree} A reference to this Octree.
   */
  fromGraphNode(group) {
    group.updateWorldMatrix(true, true);
    group.traverse((obj) => {
      if (obj.isMesh === true) {
        if (this.layers.test(obj.layers)) {
          let geometry, isTemp = false;
          if (obj.geometry.index !== null) {
            isTemp = true;
            geometry = obj.geometry.toNonIndexed();
          } else {
            geometry = obj.geometry;
          }
          const positionAttribute = geometry.getAttribute("position");
          for (let i = 0; i < positionAttribute.count; i += 3) {
            const v1 = new Vector3().fromBufferAttribute(positionAttribute, i);
            const v2 = new Vector3().fromBufferAttribute(positionAttribute, i + 1);
            const v3 = new Vector3().fromBufferAttribute(positionAttribute, i + 2);
            v1.applyMatrix4(obj.matrixWorld);
            v2.applyMatrix4(obj.matrixWorld);
            v3.applyMatrix4(obj.matrixWorld);
            this.addTriangle(new Triangle(v1, v2, v3));
          }
          if (isTemp) {
            geometry.dispose();
          }
        }
      }
    });
    this.build();
    return this;
  }
  /**
   * Clears the Octree by making it empty.
   *
   * @return {Octree} A reference to this Octree.
   */
  clear() {
    this.box = null;
    this.bounds.makeEmpty();
    this.subTrees.length = 0;
    this.triangles.length = 0;
    return this;
  }
};

// node_modules/three/examples/jsm/helpers/OctreeHelper.js
var OctreeHelper = class extends LineSegments {
  /**
   * Constructs a new Octree helper.
   *
   * @param {Octree} octree - The octree to visualize.
   * @param {number|Color|string} [color=0xffff00] - The helper's color.
   */
  constructor(octree, color = 16776960) {
    super(new BufferGeometry(), new LineBasicMaterial({ color, toneMapped: false }));
    this.octree = octree;
    this.color = color;
    this.type = "OctreeHelper";
    this.update();
  }
  /**
   * Updates the helper. This method must be called whenever the Octree's
   * structure is changed.
   */
  update() {
    const vertices = [];
    function traverse(tree) {
      for (let i = 0; i < tree.length; i++) {
        const min = tree[i].box.min;
        const max = tree[i].box.max;
        vertices.push(max.x, max.y, max.z);
        vertices.push(min.x, max.y, max.z);
        vertices.push(min.x, max.y, max.z);
        vertices.push(min.x, min.y, max.z);
        vertices.push(min.x, min.y, max.z);
        vertices.push(max.x, min.y, max.z);
        vertices.push(max.x, min.y, max.z);
        vertices.push(max.x, max.y, max.z);
        vertices.push(max.x, max.y, min.z);
        vertices.push(min.x, max.y, min.z);
        vertices.push(min.x, max.y, min.z);
        vertices.push(min.x, min.y, min.z);
        vertices.push(min.x, min.y, min.z);
        vertices.push(max.x, min.y, min.z);
        vertices.push(max.x, min.y, min.z);
        vertices.push(max.x, max.y, min.z);
        vertices.push(max.x, max.y, max.z);
        vertices.push(max.x, max.y, min.z);
        vertices.push(min.x, max.y, max.z);
        vertices.push(min.x, max.y, min.z);
        vertices.push(min.x, min.y, max.z);
        vertices.push(min.x, min.y, min.z);
        vertices.push(max.x, min.y, max.z);
        vertices.push(max.x, min.y, min.z);
        traverse(tree[i].subTrees);
      }
    }
    traverse(this.octree.subTrees);
    this.geometry.dispose();
    this.geometry = new BufferGeometry();
    this.geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   */
  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
};

// src/app/componentes/player.ts
var _c0 = ["container"];
function FpsGameComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 6)(2, "h2");
    \u0275\u0275text(3, "Cargando Escenario 3D...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 7);
    \u0275\u0275element(5, "div", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275styleProp("width", ctx_r1.loadingProgress(), "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.loadingProgress(), "%");
  }
}
var FpsGameComponent = class _FpsGameComponent {
  ngZone;
  containerRef;
  // Signals para UI reactiva moderna de Angular 21
  isLoading = signal(true, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  loadingProgress = signal(0, ...ngDevMode ? [{ debugName: "loadingProgress" }] : []);
  isLocked = signal(false, ...ngDevMode ? [{ debugName: "isLocked" }] : []);
  renderer;
  scene;
  camera;
  stats;
  gui;
  // Listeners
  boundKeyDown = (e) => this.onKeyDown(e);
  boundKeyUp = (e) => this.onKeyUp(e);
  boundMouseDown = () => this.onMouseDown();
  boundMouseUp = () => this.onMouseUp();
  boundMouseMove = (e) => this.onMouseMove(e);
  boundResize = () => this.onWindowResize();
  boundPointerLockChange = () => this.onPointerLockChange();
  keyStates = {};
  playerCollider;
  playerVelocity = new Vector3();
  playerDirection = new Vector3();
  playerOnFloor = false;
  mouseTime = 0;
  worldOctree = new Octree();
  spheres = [];
  sphereIdx = 0;
  timer = new Timer();
  vector1 = new Vector3();
  vector2 = new Vector3();
  vector3 = new Vector3();
  STEPS_PER_FRAME = 5;
  GRAVITY = 30;
  constructor(ngZone) {
    this.ngZone = ngZone;
  }
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.initGame();
    });
  }
  ngOnDestroy() {
    document.removeEventListener("keydown", this.boundKeyDown);
    document.removeEventListener("keyup", this.boundKeyUp);
    window.removeEventListener("resize", this.boundResize);
    document.removeEventListener("mousemove", this.boundMouseMove);
    document.removeEventListener("pointerlockchange", this.boundPointerLockChange);
    if (this.gui) {
      this.gui.destroy();
    }
    if (this.stats && this.stats.domElement.parentNode) {
      this.stats.domElement.parentNode.removeChild(this.stats.domElement);
    }
    this.renderer?.dispose();
    if (this.renderer?.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
  requestPointerLock() {
    const container = this.containerRef.nativeElement;
    container.requestPointerLock();
  }
  onPointerLockChange() {
    this.ngZone.run(() => {
      const locked = document.pointerLockElement === this.containerRef.nativeElement;
      this.isLocked.set(locked);
    });
  }
  initGame() {
    const container = this.containerRef.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.timer.connect(document);
    this.scene = new Scene();
    this.scene.background = new Color(8965358);
    this.scene.fog = new Fog(8965358, 0, 50);
    this.camera = new PerspectiveCamera(70, width / height, 0.1, 1e3);
    this.camera.rotation.order = "YXZ";
    const fillLight1 = new HemisphereLight(9290206, 26253, 1.5);
    fillLight1.position.set(2, 1, 1);
    this.scene.add(fillLight1);
    const directionalLight = new DirectionalLight(16777215, 2.5);
    directionalLight.position.set(-5, 25, -1);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0.01;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.right = 30;
    directionalLight.shadow.camera.left = -30;
    directionalLight.shadow.camera.top = 30;
    directionalLight.shadow.camera.bottom = -30;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.radius = 4;
    directionalLight.shadow.bias = -6e-5;
    this.scene.add(directionalLight);
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.renderer.setAnimationLoop(() => this.animate());
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = VSMShadowMap;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    container.appendChild(this.renderer.domElement);
    this.stats = new stats_module_default();
    this.stats.domElement.style.position = "absolute";
    this.stats.domElement.style.bottom = "0px";
    container.appendChild(this.stats.domElement);
    const NUM_SPHERES = 100;
    const SPHERE_RADIUS = 0.2;
    const sphereGeometry = new IcosahedronGeometry(SPHERE_RADIUS, 5);
    const sphereMaterial = new MeshLambertMaterial({ color: 14605965 });
    for (let i = 0; i < NUM_SPHERES; i++) {
      const sphere = new Mesh(sphereGeometry, sphereMaterial);
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      this.scene.add(sphere);
      this.spheres.push({
        mesh: sphere,
        collider: new Sphere(new Vector3(0, -100, 0), SPHERE_RADIUS),
        velocity: new Vector3()
      });
    }
    this.playerCollider = new Capsule(new Vector3(0, 0.35, 0), new Vector3(0, 1, 0), 0.35);
    document.addEventListener("keydown", this.boundKeyDown);
    document.addEventListener("keyup", this.boundKeyUp);
    container.addEventListener("mousedown", this.boundMouseDown);
    document.addEventListener("mouseup", this.boundMouseUp);
    document.addEventListener("mousemove", this.boundMouseMove);
    window.addEventListener("resize", this.boundResize);
    document.addEventListener("pointerlockchange", this.boundPointerLockChange);
    const loader = new GLTFLoader().setPath("/");
    loader.load("collisionworld.glb", (gltf) => {
      this.scene.add(gltf.scene);
      this.worldOctree.fromGraphNode(gltf.scene);
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material.map) {
            child.material.map.anisotropy = 4;
          }
        }
      });
      const helper = new OctreeHelper(this.worldOctree);
      helper.visible = false;
      this.scene.add(helper);
      this.gui = new g({ width: 200 });
      this.gui.add({ debug: false }, "debug").onChange((value) => {
        helper.visible = value;
      });
      this.ngZone.run(() => {
        this.isLoading.set(false);
      });
    }, (xhr) => {
      if (xhr.lengthComputable) {
        const percent = Math.round(xhr.loaded / xhr.total * 100);
        this.ngZone.run(() => {
          this.loadingProgress.set(percent);
        });
      }
    }, (error) => {
      console.error("Error cargando el modelo GLB:", error);
    });
  }
  onKeyDown(event) {
    this.keyStates[event.code] = true;
  }
  onKeyUp(event) {
    this.keyStates[event.code] = false;
  }
  onMouseDown() {
    this.mouseTime = performance.now();
  }
  onMouseUp() {
    if (document.pointerLockElement !== null) {
      this.throwBall();
    }
  }
  onMouseMove(event) {
    if (document.pointerLockElement === this.containerRef.nativeElement) {
      this.camera.rotation.y -= event.movementX / 500;
      const pitchLimit = Math.PI / 2 - 0.05;
      this.camera.rotation.x -= event.movementY / 500;
      this.camera.rotation.x = Math.max(-pitchLimit, Math.min(pitchLimit, this.camera.rotation.x));
    }
  }
  onWindowResize() {
    if (!this.containerRef)
      return;
    const container = this.containerRef.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
  throwBall() {
    const sphere = this.spheres[this.sphereIdx];
    this.camera.getWorldDirection(this.playerDirection);
    sphere.collider.center.copy(this.playerCollider.end).addScaledVector(this.playerDirection, this.playerCollider.radius * 1.5);
    const impulse = 15 + 30 * (1 - Math.exp((this.mouseTime - performance.now()) * 1e-3));
    sphere.velocity.copy(this.playerDirection).multiplyScalar(impulse);
    sphere.velocity.addScaledVector(this.playerVelocity, 2);
    this.sphereIdx = (this.sphereIdx + 1) % this.spheres.length;
  }
  playerCollisions() {
    const result = this.worldOctree.capsuleIntersect(this.playerCollider);
    this.playerOnFloor = false;
    if (result) {
      this.playerOnFloor = result.normal.y >= 0.15;
      if (!this.playerOnFloor) {
        this.playerVelocity.addScaledVector(result.normal, -result.normal.dot(this.playerVelocity));
      }
      if (result.depth >= 1e-10) {
        this.playerCollider.translate(result.normal.multiplyScalar(result.depth));
      }
    }
  }
  updatePlayer(deltaTime) {
    let damping = Math.exp(-4 * deltaTime) - 1;
    if (!this.playerOnFloor) {
      this.playerVelocity.y -= this.GRAVITY * deltaTime;
      damping *= 0.1;
    }
    this.playerVelocity.addScaledVector(this.playerVelocity, damping);
    const deltaPosition = this.playerVelocity.clone().multiplyScalar(deltaTime);
    this.playerCollider.translate(deltaPosition);
    this.playerCollisions();
    this.camera.position.copy(this.playerCollider.end);
  }
  playerSphereCollision(sphere) {
    const center = this.vector1.addVectors(this.playerCollider.start, this.playerCollider.end).multiplyScalar(0.5);
    const sphere_center = sphere.collider.center;
    const r = this.playerCollider.radius + sphere.collider.radius;
    const r2 = r * r;
    for (const point of [this.playerCollider.start, this.playerCollider.end, center]) {
      const d2 = point.distanceToSquared(sphere_center);
      if (d2 < r2) {
        const normal = this.vector1.subVectors(point, sphere_center).normalize();
        const v1 = this.vector2.copy(normal).multiplyScalar(normal.dot(this.playerVelocity));
        const v2 = this.vector3.copy(normal).multiplyScalar(normal.dot(sphere.velocity));
        this.playerVelocity.add(v2).sub(v1);
        sphere.velocity.add(v1).sub(v2);
        const d = (r - Math.sqrt(d2)) / 2;
        sphere_center.addScaledVector(normal, -d);
      }
    }
  }
  spheresCollisions() {
    for (let i = 0, length = this.spheres.length; i < length; i++) {
      const s1 = this.spheres[i];
      for (let j = i + 1; j < length; j++) {
        const s2 = this.spheres[j];
        const d2 = s1.collider.center.distanceToSquared(s2.collider.center);
        const r = s1.collider.radius + s2.collider.radius;
        const r2 = r * r;
        if (d2 < r2) {
          const normal = this.vector1.subVectors(s1.collider.center, s2.collider.center).normalize();
          const v1 = this.vector2.copy(normal).multiplyScalar(normal.dot(s1.velocity));
          const v2 = this.vector3.copy(normal).multiplyScalar(normal.dot(s2.velocity));
          s1.velocity.add(v2).sub(v1);
          s2.velocity.add(v1).sub(v2);
          const d = (r - Math.sqrt(d2)) / 2;
          s1.collider.center.addScaledVector(normal, d);
          s2.collider.center.addScaledVector(normal, -d);
        }
      }
    }
  }
  updateSpheres(deltaTime) {
    this.spheres.forEach((sphere) => {
      sphere.collider.center.addScaledVector(sphere.velocity, deltaTime);
      const result = this.worldOctree.sphereIntersect(sphere.collider);
      if (result) {
        sphere.velocity.addScaledVector(result.normal, -result.normal.dot(sphere.velocity) * 1.5);
        sphere.collider.center.add(result.normal.multiplyScalar(result.depth));
      } else {
        sphere.velocity.y -= this.GRAVITY * deltaTime;
      }
      const damping = Math.exp(-1.5 * deltaTime) - 1;
      sphere.velocity.addScaledVector(sphere.velocity, damping);
      this.playerSphereCollision(sphere);
    });
    this.spheresCollisions();
    for (const sphere of this.spheres) {
      sphere.mesh.position.copy(sphere.collider.center);
    }
  }
  getForwardVector() {
    this.camera.getWorldDirection(this.playerDirection);
    this.playerDirection.y = 0;
    this.playerDirection.normalize();
    return this.playerDirection;
  }
  getSideVector() {
    this.camera.getWorldDirection(this.playerDirection);
    this.playerDirection.y = 0;
    this.playerDirection.normalize();
    this.playerDirection.cross(this.camera.up);
    return this.playerDirection;
  }
  controls(deltaTime) {
    const speedDelta = deltaTime * (this.playerOnFloor ? 25 : 8);
    if (this.keyStates["KeyW"]) {
      this.playerVelocity.add(this.getForwardVector().multiplyScalar(speedDelta));
    }
    if (this.keyStates["KeyS"]) {
      this.playerVelocity.add(this.getForwardVector().multiplyScalar(-speedDelta));
    }
    if (this.keyStates["KeyA"]) {
      this.playerVelocity.add(this.getSideVector().multiplyScalar(-speedDelta));
    }
    if (this.keyStates["KeyD"]) {
      this.playerVelocity.add(this.getSideVector().multiplyScalar(speedDelta));
    }
    if (this.playerOnFloor && this.keyStates["Space"]) {
      this.playerVelocity.y = 15;
    }
  }
  teleportPlayerIfOob() {
    if (this.camera.position.y <= -25) {
      this.playerCollider.start.set(0, 0.35, 0);
      this.playerCollider.end.set(0, 1, 0);
      this.playerCollider.radius = 0.35;
      this.playerVelocity.set(0, 0, 0);
      this.camera.position.copy(this.playerCollider.end);
      this.camera.rotation.set(0, 0, 0);
    }
  }
  animate() {
    this.timer.update();
    const deltaTime = Math.min(0.05, this.timer.getDelta()) / this.STEPS_PER_FRAME;
    for (let i = 0; i < this.STEPS_PER_FRAME; i++) {
      this.controls(deltaTime);
      this.updatePlayer(deltaTime);
      this.updateSpheres(deltaTime);
      this.teleportPlayerIfOob();
    }
    this.renderer.render(this.scene, this.camera);
    this.stats.update();
  }
  static \u0275fac = function FpsGameComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FpsGameComponent)(\u0275\u0275directiveInject(NgZone));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FpsGameComponent, selectors: [["app-fps-game"]], viewQuery: function FpsGameComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.containerRef = _t.first);
    }
  }, decls: 30, vars: 5, consts: [["container", ""], [1, "game-container"], [1, "loading-overlay"], [1, "crosshair"], [1, "instructions", 3, "click"], [1, "controls-list"], [1, "loader-card"], [1, "progress-bar-container"], [1, "progress-bar"]], template: function FpsGameComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1, 0);
      \u0275\u0275element(2, "app-navbar");
      \u0275\u0275conditionalCreate(3, FpsGameComponent_Conditional_3_Template, 8, 3, "div", 2);
      \u0275\u0275elementStart(4, "div", 3);
      \u0275\u0275text(5, "+");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 4);
      \u0275\u0275listener("click", function FpsGameComponent_Template_div_click_6_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.requestPointerLock());
      });
      \u0275\u0275elementStart(7, "h1");
      \u0275\u0275text(8, "Juego FPS con Octree");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p");
      \u0275\u0275text(10, "Haz clic aqu\xED para ");
      \u0275\u0275elementStart(11, "strong");
      \u0275\u0275text(12, "Comenzar / Jugar");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "ul", 5)(14, "li")(15, "strong");
      \u0275\u0275text(16, "W, A, S, D");
      \u0275\u0275elementEnd();
      \u0275\u0275text(17, " : Moverse");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "li")(19, "strong");
      \u0275\u0275text(20, "ESPACIO");
      \u0275\u0275elementEnd();
      \u0275\u0275text(21, " : Saltar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "li")(23, "strong");
      \u0275\u0275text(24, "CLIC IZQ");
      \u0275\u0275elementEnd();
      \u0275\u0275text(25, " : Lanzar esfera (mant\xE9n presionado para fuerza)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "li")(27, "strong");
      \u0275\u0275text(28, "ESC");
      \u0275\u0275elementEnd();
      \u0275\u0275text(29, " : Liberar cursor / Pausa");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.isLoading() ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("hidden", ctx.isLoading());
      \u0275\u0275advance(2);
      \u0275\u0275classProp("hidden", ctx.isLocked());
    }
  }, dependencies: [CommonModule, Navbar], styles: ['\n\n.game-container[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  height: 100vh;\n  overflow: hidden;\n  background-color: #88ccee;\n  font-family:\n    "Segoe UI",\n    Tahoma,\n    Geneva,\n    Verdana,\n    sans-serif;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.crosshair[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  color: rgba(255, 255, 255, 0.9);\n  font-size: 24px;\n  font-weight: bold;\n  pointer-events: none;\n  z-index: 10;\n  transition: opacity 0.3s;\n}\n.crosshair.hidden[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n.instructions[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 20px;\n  left: 20px;\n  background: rgba(0, 0, 0, 0.8);\n  color: #fff;\n  padding: 20px;\n  border-radius: 12px;\n  cursor: pointer;\n  z-index: 20;\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  transition: opacity 0.3s, background 0.3s;\n}\n.instructions.hidden[_ngcontent-%COMP%] {\n  opacity: 0;\n  pointer-events: none;\n}\n.instructions[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 0, 0, 0.9);\n}\n.instructions[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin-top: 0;\n  font-size: 1.3rem;\n  color: #88ccee;\n}\n.controls-list[_ngcontent-%COMP%] {\n  margin: 10px 0 0 0;\n  padding-left: 20px;\n  font-size: 0.9rem;\n  color: #ddd;\n}\n.controls-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 5px;\n}\n.loading-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: #111;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 100;\n  color: white;\n}\n.loader-card[_ngcontent-%COMP%] {\n  background: #222;\n  padding: 30px;\n  border-radius: 12px;\n  text-align: center;\n  width: 320px;\n  border: 1px solid #444;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);\n}\n.loader-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-top: 0;\n  font-size: 1.1rem;\n  color: #88ccee;\n}\n.progress-bar-container[_ngcontent-%COMP%] {\n  width: 100%;\n  background: #444;\n  height: 10px;\n  border-radius: 5px;\n  overflow: hidden;\n  margin: 15px 0 5px 0;\n}\n.progress-bar[_ngcontent-%COMP%] {\n  height: 100%;\n  background: #88ccee;\n  width: 0%;\n  transition: width 0.1s linear;\n}\n/*# sourceMappingURL=player.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FpsGameComponent, [{
    type: Component,
    args: [{ selector: "app-fps-game", standalone: true, imports: [CommonModule, Navbar], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    
    <div class="game-container" #container>
      <app-navbar></app-navbar>
      <!-- Pantalla de carga -->
      @if (isLoading()) {
        <div class="loading-overlay">
          <div class="loader-card">
            <h2>Cargando Escenario 3D...</h2>
            <div class="progress-bar-container">
              <div class="progress-bar" [style.width.%]="loadingProgress()"></div>
            </div>
            <p>{{ loadingProgress() }}%</p>
          </div>
        </div>
      }

      <!-- HUD / Mira -->
      <div class="crosshair" [class.hidden]="isLoading()">+</div>

      <!-- Instrucciones / Men\xFA de pausa -->
      <div class="instructions" [class.hidden]="isLocked()" (click)="requestPointerLock()">
        <h1>Juego FPS con Octree</h1>
        <p>Haz clic aqu\xED para <strong>Comenzar / Jugar</strong></p>
        <ul class="controls-list">
          <li><strong>W, A, S, D</strong> : Moverse</li>
          <li><strong>ESPACIO</strong> : Saltar</li>
          <li><strong>CLIC IZQ</strong> : Lanzar esfera (mant\xE9n presionado para fuerza)</li>
          <li><strong>ESC</strong> : Liberar cursor / Pausa</li>
        </ul>
      </div>
    </div>
  `, styles: ['/* angular:styles/component:css;69a927a1c8bc882002d403c73e55d608fedb665edcbbbf0e92fd89adf05a8d1a;/home/linuxlite/WebMEAN/src/app/componentes/player.ts */\n.game-container {\n  position: relative;\n  width: 100%;\n  height: 100vh;\n  overflow: hidden;\n  background-color: #88ccee;\n  font-family:\n    "Segoe UI",\n    Tahoma,\n    Geneva,\n    Verdana,\n    sans-serif;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.crosshair {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  color: rgba(255, 255, 255, 0.9);\n  font-size: 24px;\n  font-weight: bold;\n  pointer-events: none;\n  z-index: 10;\n  transition: opacity 0.3s;\n}\n.crosshair.hidden {\n  opacity: 0;\n}\n.instructions {\n  position: absolute;\n  bottom: 20px;\n  left: 20px;\n  background: rgba(0, 0, 0, 0.8);\n  color: #fff;\n  padding: 20px;\n  border-radius: 12px;\n  cursor: pointer;\n  z-index: 20;\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  transition: opacity 0.3s, background 0.3s;\n}\n.instructions.hidden {\n  opacity: 0;\n  pointer-events: none;\n}\n.instructions:hover {\n  background: rgba(0, 0, 0, 0.9);\n}\n.instructions h1 {\n  margin-top: 0;\n  font-size: 1.3rem;\n  color: #88ccee;\n}\n.controls-list {\n  margin: 10px 0 0 0;\n  padding-left: 20px;\n  font-size: 0.9rem;\n  color: #ddd;\n}\n.controls-list li {\n  margin-bottom: 5px;\n}\n.loading-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: #111;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 100;\n  color: white;\n}\n.loader-card {\n  background: #222;\n  padding: 30px;\n  border-radius: 12px;\n  text-align: center;\n  width: 320px;\n  border: 1px solid #444;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);\n}\n.loader-card h2 {\n  margin-top: 0;\n  font-size: 1.1rem;\n  color: #88ccee;\n}\n.progress-bar-container {\n  width: 100%;\n  background: #444;\n  height: 10px;\n  border-radius: 5px;\n  overflow: hidden;\n  margin: 15px 0 5px 0;\n}\n.progress-bar {\n  height: 100%;\n  background: #88ccee;\n  width: 0%;\n  transition: width 0.1s linear;\n}\n/*# sourceMappingURL=player.css.map */\n'] }]
  }], () => [{ type: NgZone }], { containerRef: [{
    type: ViewChild,
    args: ["container", { static: true }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FpsGameComponent, { className: "FpsGameComponent", filePath: "src/app/componentes/player.ts", lineNumber: 162 });
})();
export {
  FpsGameComponent
};
//# sourceMappingURL=chunk-U3ENRMOZ.js.map
