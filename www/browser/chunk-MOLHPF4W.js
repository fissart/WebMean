import {
  OBJLoader
} from "./chunk-LVB3Z422.js";
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
  Box2,
  Box3,
  BoxGeometry,
  BufferGeometry,
  CanvasTexture,
  ClampToEdgeWrapping,
  Color,
  Controls,
  CylinderGeometry,
  DataTextureLoader,
  DataUtils,
  DirectionalLight,
  DoubleSide,
  Euler,
  ExtrudeGeometry,
  FileLoader,
  Float32BufferAttribute,
  FloatType,
  FogExp2,
  Group,
  HalfFloatType,
  HemisphereLight,
  LinearFilter,
  LinearSRGBColorSpace,
  Loader,
  Matrix3,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MirroredRepeatWrapping,
  PCFSoftShadowMap,
  PMREMGenerator,
  Path,
  PerspectiveCamera,
  PlaneGeometry,
  Raycaster,
  RepeatWrapping,
  SRGBColorSpace,
  Scene,
  ShapePath,
  ShapeUtils,
  SpotLight,
  TextureLoader,
  Vector2,
  Vector3,
  WebGLRenderer
} from "./chunk-ZUJZQ355.js";
import {
  ActivatedRoute
} from "./chunk-PFU5G7MY.js";
import {
  HttpClient
} from "./chunk-MMWGUNZC.js";
import {
  CommonModule,
  NgStyle
} from "./chunk-6QD4DAAM.js";
import {
  Component,
  Input,
  NgZone,
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
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-FXWIEX65.js";
import "./chunk-3WPM564S.js";

// node_modules/three/examples/jsm/loaders/HDRLoader.js
var HDRLoader = class extends DataTextureLoader {
  /**
      * Constructs a new RGBE/HDR loader.
      *
      * @param {LoadingManager} [manager] - The loading manager.
      */
  constructor(manager) {
    super(manager);
    this.type = HalfFloatType;
  }
  /**
      * Parses the given RGBE texture data.
      *
      * @param {ArrayBuffer} buffer - The raw texture data.
      * @return {DataTextureLoader~TexData} An object representing the parsed texture data.
      */
  parse(buffer) {
    const rgbe_read_error = 1, rgbe_write_error = 2, rgbe_format_error = 3, rgbe_memory_error = 4, rgbe_error = function(rgbe_error_code, msg) {
      switch (rgbe_error_code) {
        case rgbe_read_error:
          throw new Error("THREE.HDRLoader: Read Error: " + (msg || ""));
        case rgbe_write_error:
          throw new Error("THREE.HDRLoader: Write Error: " + (msg || ""));
        case rgbe_format_error:
          throw new Error("THREE.HDRLoader: Bad File Format: " + (msg || ""));
        default:
        case rgbe_memory_error:
          throw new Error("THREE.HDRLoader: Memory Error: " + (msg || ""));
      }
    }, RGBE_VALID_PROGRAMTYPE = 1, RGBE_VALID_FORMAT = 2, RGBE_VALID_DIMENSIONS = 4, NEWLINE = "\n", fgets = function(buffer2, lineLimit, consume) {
      const chunkSize = 128;
      lineLimit = !lineLimit ? 1024 : lineLimit;
      let p = buffer2.pos, i = -1, len = 0, s = "", chunk = String.fromCharCode.apply(null, new Uint16Array(buffer2.subarray(p, p + chunkSize)));
      while (0 > (i = chunk.indexOf(NEWLINE)) && len < lineLimit && p < buffer2.byteLength) {
        s += chunk;
        len += chunk.length;
        p += chunkSize;
        chunk = String.fromCharCode.apply(null, new Uint16Array(buffer2.subarray(p, p + chunkSize)));
      }
      if (-1 < i) {
        if (false !== consume) buffer2.pos += len + i + 1;
        return s + chunk.slice(0, i);
      }
      return false;
    }, RGBE_ReadHeader = function(buffer2) {
      const magic_token_re = /^#\?(\S+)/, gamma_re = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, exposure_re = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, format_re = /^\s*FORMAT=(\S+)\s*$/, dimensions_re = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, header = {
        valid: 0,
        /* indicate which fields are valid */
        string: "",
        /* the actual header string */
        comments: "",
        /* comments found in header */
        programtype: "RGBE",
        /* listed at beginning of file to identify it after "#?". defaults to "RGBE" */
        format: "",
        /* RGBE format, default 32-bit_rle_rgbe */
        gamma: 1,
        /* image has already been gamma corrected with given gamma. defaults to 1.0 (no correction) */
        exposure: 1,
        /* a value of 1.0 in an image corresponds to <exposure> watts/steradian/m^2. defaults to 1.0 */
        width: 0,
        height: 0
        /* image dimensions, width/height */
      };
      let line, match;
      if (buffer2.pos >= buffer2.byteLength || !(line = fgets(buffer2))) {
        rgbe_error(rgbe_read_error, "no header found");
      }
      if (!(match = line.match(magic_token_re))) {
        rgbe_error(rgbe_format_error, "bad initial token");
      }
      header.valid |= RGBE_VALID_PROGRAMTYPE;
      header.programtype = match[1];
      header.string += line + "\n";
      while (true) {
        line = fgets(buffer2);
        if (false === line) break;
        header.string += line + "\n";
        if ("#" === line.charAt(0)) {
          header.comments += line + "\n";
          continue;
        }
        if (match = line.match(gamma_re)) {
          header.gamma = parseFloat(match[1]);
        }
        if (match = line.match(exposure_re)) {
          header.exposure = parseFloat(match[1]);
        }
        if (match = line.match(format_re)) {
          header.valid |= RGBE_VALID_FORMAT;
          header.format = match[1];
        }
        if (match = line.match(dimensions_re)) {
          header.valid |= RGBE_VALID_DIMENSIONS;
          header.height = parseInt(match[1], 10);
          header.width = parseInt(match[2], 10);
        }
        if (header.valid & RGBE_VALID_FORMAT && header.valid & RGBE_VALID_DIMENSIONS) break;
      }
      if (!(header.valid & RGBE_VALID_FORMAT)) {
        rgbe_error(rgbe_format_error, "missing format specifier");
      }
      if (!(header.valid & RGBE_VALID_DIMENSIONS)) {
        rgbe_error(rgbe_format_error, "missing image size specifier");
      }
      return header;
    }, RGBE_ReadPixels_RLE = function(buffer2, w2, h2) {
      const scanline_width = w2;
      if (
        // run length encoding is not allowed so read flat
        scanline_width < 8 || scanline_width > 32767 || // this file is not run length encoded
        (2 !== buffer2[0] || 2 !== buffer2[1] || buffer2[2] & 128)
      ) {
        return new Uint8Array(buffer2);
      }
      if (scanline_width !== (buffer2[2] << 8 | buffer2[3])) {
        rgbe_error(rgbe_format_error, "wrong scanline width");
      }
      const data_rgba = new Uint8Array(4 * w2 * h2);
      if (!data_rgba.length) {
        rgbe_error(rgbe_memory_error, "unable to allocate buffer space");
      }
      let offset = 0, pos = 0;
      const ptr_end = 4 * scanline_width;
      const rgbeStart = new Uint8Array(4);
      const scanline_buffer = new Uint8Array(ptr_end);
      let num_scanlines = h2;
      while (num_scanlines > 0 && pos < buffer2.byteLength) {
        if (pos + 4 > buffer2.byteLength) {
          rgbe_error(rgbe_read_error);
        }
        rgbeStart[0] = buffer2[pos++];
        rgbeStart[1] = buffer2[pos++];
        rgbeStart[2] = buffer2[pos++];
        rgbeStart[3] = buffer2[pos++];
        if (2 != rgbeStart[0] || 2 != rgbeStart[1] || (rgbeStart[2] << 8 | rgbeStart[3]) != scanline_width) {
          rgbe_error(rgbe_format_error, "bad rgbe scanline format");
        }
        let ptr = 0, count;
        while (ptr < ptr_end && pos < buffer2.byteLength) {
          count = buffer2[pos++];
          const isEncodedRun = count > 128;
          if (isEncodedRun) count -= 128;
          if (0 === count || ptr + count > ptr_end) {
            rgbe_error(rgbe_format_error, "bad scanline data");
          }
          if (isEncodedRun) {
            const byteValue = buffer2[pos++];
            for (let i = 0; i < count; i++) {
              scanline_buffer[ptr++] = byteValue;
            }
          } else {
            scanline_buffer.set(buffer2.subarray(pos, pos + count), ptr);
            ptr += count;
            pos += count;
          }
        }
        const l = scanline_width;
        for (let i = 0; i < l; i++) {
          let off = 0;
          data_rgba[offset] = scanline_buffer[i + off];
          off += scanline_width;
          data_rgba[offset + 1] = scanline_buffer[i + off];
          off += scanline_width;
          data_rgba[offset + 2] = scanline_buffer[i + off];
          off += scanline_width;
          data_rgba[offset + 3] = scanline_buffer[i + off];
          offset += 4;
        }
        num_scanlines--;
      }
      return data_rgba;
    };
    const RGBEByteToRGBFloat = function(sourceArray, sourceOffset, destArray, destOffset) {
      const e = sourceArray[sourceOffset + 3];
      const scale = Math.pow(2, e - 128) / 255;
      destArray[destOffset + 0] = sourceArray[sourceOffset + 0] * scale;
      destArray[destOffset + 1] = sourceArray[sourceOffset + 1] * scale;
      destArray[destOffset + 2] = sourceArray[sourceOffset + 2] * scale;
      destArray[destOffset + 3] = 1;
    };
    const RGBEByteToRGBHalf = function(sourceArray, sourceOffset, destArray, destOffset) {
      const e = sourceArray[sourceOffset + 3];
      const scale = Math.pow(2, e - 128) / 255;
      destArray[destOffset + 0] = DataUtils.toHalfFloat(Math.min(sourceArray[sourceOffset + 0] * scale, 65504));
      destArray[destOffset + 1] = DataUtils.toHalfFloat(Math.min(sourceArray[sourceOffset + 1] * scale, 65504));
      destArray[destOffset + 2] = DataUtils.toHalfFloat(Math.min(sourceArray[sourceOffset + 2] * scale, 65504));
      destArray[destOffset + 3] = DataUtils.toHalfFloat(1);
    };
    const byteArray = new Uint8Array(buffer);
    byteArray.pos = 0;
    const rgbe_header_info = RGBE_ReadHeader(byteArray);
    const w = rgbe_header_info.width, h = rgbe_header_info.height, image_rgba_data = RGBE_ReadPixels_RLE(byteArray.subarray(byteArray.pos), w, h);
    let data, type;
    let numElements;
    switch (this.type) {
      case FloatType:
        numElements = image_rgba_data.length / 4;
        const floatArray = new Float32Array(numElements * 4);
        for (let j = 0; j < numElements; j++) {
          RGBEByteToRGBFloat(image_rgba_data, j * 4, floatArray, j * 4);
        }
        data = floatArray;
        type = FloatType;
        break;
      case HalfFloatType:
        numElements = image_rgba_data.length / 4;
        const halfArray = new Uint16Array(numElements * 4);
        for (let j = 0; j < numElements; j++) {
          RGBEByteToRGBHalf(image_rgba_data, j * 4, halfArray, j * 4);
        }
        data = halfArray;
        type = HalfFloatType;
        break;
      default:
        throw new Error("THREE.HDRLoader: Unsupported type: " + this.type);
    }
    return {
      width: w,
      height: h,
      data,
      header: rgbe_header_info.string,
      gamma: rgbe_header_info.gamma,
      exposure: rgbe_header_info.exposure,
      type,
      colorSpace: LinearSRGBColorSpace,
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      generateMipmaps: false,
      flipY: true
    };
  }
  /**
      * Sets the texture type.
      *
      * @param {(HalfFloatType|FloatType)} value - The texture type to set.
      * @return {HDRLoader} A reference to this loader.
      */
  setDataType(value) {
    this.type = value;
    return this;
  }
};

// node_modules/three/examples/jsm/loaders/RGBELoader.js
var RGBELoader = class extends HDRLoader {
  constructor(manager) {
    console.warn("RGBELoader has been deprecated. Please use HDRLoader instead.");
    super(manager);
  }
};

// node_modules/three/examples/jsm/controls/PointerLockControls.js
var _euler = new Euler(0, 0, 0, "YXZ");
var _vector = new Vector3();
var _changeEvent = { type: "change" };
var _lockEvent = { type: "lock" };
var _unlockEvent = { type: "unlock" };
var _MOUSE_SENSITIVITY = 2e-3;
var _PI_2 = Math.PI / 2;
var PointerLockControls = class extends Controls {
  /**
   * Constructs a new controls instance.
   *
   * @param {Camera} camera - The camera that is managed by the controls.
   * @param {?HTMLElement} domElement - The HTML element used for event listeners.
   */
  constructor(camera, domElement = null) {
    super(camera, domElement);
    this.isLocked = false;
    this.minPolarAngle = 0;
    this.maxPolarAngle = Math.PI;
    this.pointerSpeed = 1;
    this._onMouseMove = onMouseMove.bind(this);
    this._onPointerlockChange = onPointerlockChange.bind(this);
    this._onPointerlockError = onPointerlockError.bind(this);
    if (this.domElement !== null) {
      this.connect(this.domElement);
    }
  }
  connect(element) {
    super.connect(element);
    this.domElement.ownerDocument.addEventListener("mousemove", this._onMouseMove);
    this.domElement.ownerDocument.addEventListener("pointerlockchange", this._onPointerlockChange);
    this.domElement.ownerDocument.addEventListener("pointerlockerror", this._onPointerlockError);
  }
  disconnect() {
    this.domElement.ownerDocument.removeEventListener("mousemove", this._onMouseMove);
    this.domElement.ownerDocument.removeEventListener("pointerlockchange", this._onPointerlockChange);
    this.domElement.ownerDocument.removeEventListener("pointerlockerror", this._onPointerlockError);
  }
  dispose() {
    this.disconnect();
  }
  /**
   * Returns the look direction of the camera.
   *
   * @param {Vector3} v - The target vector that is used to store the method's result.
   * @return {Vector3} The normalized direction vector.
   */
  getDirection(v) {
    return v.set(0, 0, -1).applyQuaternion(this.object.quaternion);
  }
  /**
   * Moves the camera forward parallel to the xz-plane. Assumes camera.up is y-up.
   *
   * @param {number} distance - The signed distance.
   */
  moveForward(distance) {
    if (this.enabled === false) return;
    const camera = this.object;
    _vector.setFromMatrixColumn(camera.matrix, 0);
    _vector.crossVectors(camera.up, _vector);
    camera.position.addScaledVector(_vector, distance);
  }
  /**
   * Moves the camera sidewards parallel to the xz-plane.
   *
   * @param {number} distance - The signed distance.
   */
  moveRight(distance) {
    if (this.enabled === false) return;
    const camera = this.object;
    _vector.setFromMatrixColumn(camera.matrix, 0);
    camera.position.addScaledVector(_vector, distance);
  }
  /**
   * Activates the pointer lock.
   *
   * @param {boolean} [unadjustedMovement=false] - Disables OS-level adjustment for mouse acceleration, and accesses raw mouse input instead.
   * Setting it to true will disable mouse acceleration.
   */
  lock(unadjustedMovement = false) {
    this.domElement.requestPointerLock({
      unadjustedMovement
    });
  }
  /**
   * Exits the pointer lock.
   */
  unlock() {
    this.domElement.ownerDocument.exitPointerLock();
  }
};
function onMouseMove(event) {
  if (this.enabled === false || this.isLocked === false) return;
  const camera = this.object;
  _euler.setFromQuaternion(camera.quaternion);
  _euler.y -= event.movementX * _MOUSE_SENSITIVITY * this.pointerSpeed;
  _euler.x -= event.movementY * _MOUSE_SENSITIVITY * this.pointerSpeed;
  _euler.x = Math.max(_PI_2 - this.maxPolarAngle, Math.min(_PI_2 - this.minPolarAngle, _euler.x));
  camera.quaternion.setFromEuler(_euler);
  this.dispatchEvent(_changeEvent);
}
function onPointerlockChange() {
  if (this.domElement.ownerDocument.pointerLockElement === this.domElement) {
    this.dispatchEvent(_lockEvent);
    this.isLocked = true;
  } else {
    this.dispatchEvent(_unlockEvent);
    this.isLocked = false;
  }
}
function onPointerlockError() {
  console.error("THREE.PointerLockControls: Unable to use Pointer Lock API");
}

// node_modules/three/examples/jsm/loaders/SVGLoader.js
var COLOR_SPACE_SVG = SRGBColorSpace;
var SVGLoader = class _SVGLoader extends Loader {
  /**
   * Constructs a new SVG loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(manager) {
    super(manager);
    this.defaultDPI = 90;
    this.defaultUnit = "px";
  }
  /**
   * Starts loading from the given URL and passes the loaded SVG asset
   * to the `onLoad()` callback.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function({paths:Array<ShapePath>,xml:string})} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  load(url, onLoad, onProgress, onError) {
    const scope = this;
    const loader = new FileLoader(scope.manager);
    loader.setPath(scope.path);
    loader.setRequestHeader(scope.requestHeader);
    loader.setWithCredentials(scope.withCredentials);
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
   * Parses the given SVG data and returns the resulting data.
   *
   * @param {string} text - The raw SVG data as a string.
   * @return {{paths:Array<ShapePath>,xml:string}} An object holding an array of shape paths and the
   * SVG XML document.
   */
  parse(text) {
    const scope = this;
    function parseNode(node, style) {
      if (node.nodeType !== 1) return;
      if (node.hasAttribute("filter")) {
        console.warn("THREE.SVGLoader: Filters are not supported.");
      }
      const transform = getNodeTransform(node);
      let isDefsNode = false;
      let path = null;
      switch (node.nodeName) {
        case "svg":
          style = parseStyle(node, style);
          break;
        case "style":
          parseCSSStylesheet(node);
          break;
        case "g":
          style = parseStyle(node, style);
          break;
        case "path":
          style = parseStyle(node, style);
          if (node.hasAttribute("d")) path = parsePathNode(node);
          break;
        case "rect":
          style = parseStyle(node, style);
          path = parseRectNode(node);
          break;
        case "polygon":
          style = parseStyle(node, style);
          path = parsePolygonNode(node);
          break;
        case "polyline":
          style = parseStyle(node, style);
          path = parsePolylineNode(node);
          break;
        case "circle":
          style = parseStyle(node, style);
          path = parseCircleNode(node);
          break;
        case "ellipse":
          style = parseStyle(node, style);
          path = parseEllipseNode(node);
          break;
        case "line":
          style = parseStyle(node, style);
          path = parseLineNode(node);
          break;
        case "defs":
          isDefsNode = true;
          break;
        case "use":
          style = parseStyle(node, style);
          const href = node.getAttributeNS("http://www.w3.org/1999/xlink", "href") || "";
          const usedNodeId = href.substring(1);
          const usedNode = node.viewportElement.getElementById(usedNodeId);
          if (usedNode) {
            parseNode(usedNode, style);
          } else {
            console.warn("SVGLoader: 'use node' references non-existent node id: " + usedNodeId);
          }
          break;
        default:
      }
      if (path) {
        if (style.fill !== void 0 && style.fill !== "none" && !style.fill.startsWith("url")) {
          path.color.setStyle(style.fill, COLOR_SPACE_SVG);
        }
        transformPath(path, currentTransform);
        paths.push(path);
        const pathStyle = Object.assign({}, style);
        pathStyle.strokeWidth = style.strokeWidth * getTransformScale(currentTransform);
        path.userData = { node, style: pathStyle, transform: currentTransform.clone(), gradients };
      }
      const childNodes = node.childNodes;
      for (let i = 0; i < childNodes.length; i++) {
        const node2 = childNodes[i];
        if (isDefsNode && node2.nodeName !== "style" && node2.nodeName !== "defs") {
          continue;
        }
        parseNode(node2, style);
      }
      if (transform) {
        transformStack.pop();
        if (transformStack.length > 0) {
          currentTransform.copy(transformStack[transformStack.length - 1]);
        } else {
          currentTransform.identity();
        }
      }
    }
    function parsePathNode(node) {
      const path = new ShapePath();
      const point = new Vector2();
      const control = new Vector2();
      const firstPoint = new Vector2();
      let isFirstPoint = true;
      let doSetFirstPoint = false;
      const d = node.getAttribute("d");
      if (d === "" || d === "none") return null;
      const commands = d.match(/[a-df-z][^a-df-z]*/ig);
      for (let i = 0, l = commands.length; i < l; i++) {
        const command = commands[i];
        const type = command.charAt(0);
        const data2 = command.slice(1).trim();
        if (isFirstPoint === true) {
          doSetFirstPoint = true;
          isFirstPoint = false;
        }
        let numbers;
        switch (type) {
          case "M":
            numbers = parseFloats(data2);
            for (let j = 0, jl = numbers.length; j < jl; j += 2) {
              point.x = numbers[j + 0];
              point.y = numbers[j + 1];
              control.x = point.x;
              control.y = point.y;
              if (j === 0) {
                path.moveTo(point.x, point.y);
              } else {
                path.lineTo(point.x, point.y);
              }
              if (j === 0) firstPoint.copy(point);
            }
            break;
          case "H":
            numbers = parseFloats(data2);
            for (let j = 0, jl = numbers.length; j < jl; j++) {
              point.x = numbers[j];
              control.x = point.x;
              control.y = point.y;
              path.lineTo(point.x, point.y);
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
            }
            break;
          case "V":
            numbers = parseFloats(data2);
            for (let j = 0, jl = numbers.length; j < jl; j++) {
              point.y = numbers[j];
              control.x = point.x;
              control.y = point.y;
              path.lineTo(point.x, point.y);
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
            }
            break;
          case "L":
            numbers = parseFloats(data2);
            for (let j = 0, jl = numbers.length; j < jl; j += 2) {
              point.x = numbers[j + 0];
              point.y = numbers[j + 1];
              control.x = point.x;
              control.y = point.y;
              path.lineTo(point.x, point.y);
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
            }
            break;
          case "C":
            numbers = parseFloats(data2);
            for (let j = 0, jl = numbers.length; j < jl; j += 6) {
              path.bezierCurveTo(
                numbers[j + 0],
                numbers[j + 1],
                numbers[j + 2],
                numbers[j + 3],
                numbers[j + 4],
                numbers[j + 5]
              );
              control.x = numbers[j + 2];
              control.y = numbers[j + 3];
              point.x = numbers[j + 4];
              point.y = numbers[j + 5];
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
            }
            break;
          case "S":
            numbers = parseFloats(data2);
            for (let j = 0, jl = numbers.length; j < jl; j += 4) {
              path.bezierCurveTo(
                getReflection(point.x, control.x),
                getReflection(point.y, control.y),
                numbers[j + 0],
                numbers[j + 1],
                numbers[j + 2],
                numbers[j + 3]
              );
              control.x = numbers[j + 0];
              control.y = numbers[j + 1];
              point.x = numbers[j + 2];
              point.y = numbers[j + 3];
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
            }
            break;
          case "Q":
            numbers = parseFloats(data2);
            for (let j = 0, jl = numbers.length; j < jl; j += 4) {
              path.quadraticCurveTo(
                numbers[j + 0],
                numbers[j + 1],
                numbers[j + 2],
                numbers[j + 3]
              );
              control.x = numbers[j + 0];
              control.y = numbers[j + 1];
              point.x = numbers[j + 2];
              point.y = numbers[j + 3];
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
            }
            break;
          case "T":
            numbers = parseFloats(data2);
            for (let j = 0, jl = numbers.length; j < jl; j += 2) {
              const rx = getReflection(point.x, control.x);
              const ry = getReflection(point.y, control.y);
              path.quadraticCurveTo(
                rx,
                ry,
                numbers[j + 0],
                numbers[j + 1]
              );
              control.x = rx;
              control.y = ry;
              point.x = numbers[j + 0];
              point.y = numbers[j + 1];
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
            }
            break;
          case "A":
            numbers = parseFloats(data2, [3, 4], 7);
            for (let j = 0, jl = numbers.length; j < jl; j += 7) {
              if (numbers[j + 5] == point.x && numbers[j + 6] == point.y) continue;
              const start = point.clone();
              point.x = numbers[j + 5];
              point.y = numbers[j + 6];
              control.x = point.x;
              control.y = point.y;
              parseArcCommand(
                path,
                numbers[j],
                numbers[j + 1],
                numbers[j + 2],
                numbers[j + 3],
                numbers[j + 4],
                start,
                point
              );
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
            }
            break;
          case "m":
            numbers = parseFloats(data2);
            for (let j = 0, jl = numbers.length; j < jl; j += 2) {
              point.x += numbers[j + 0];
              point.y += numbers[j + 1];
              control.x = point.x;
              control.y = point.y;
              if (j === 0) {
                path.moveTo(point.x, point.y);
              } else {
                path.lineTo(point.x, point.y);
              }
              if (j === 0) firstPoint.copy(point);
            }
            break;
          case "h":
            numbers = parseFloats(data2);
            for (let j = 0, jl = numbers.length; j < jl; j++) {
              point.x += numbers[j];
              control.x = point.x;
              control.y = point.y;
              path.lineTo(point.x, point.y);
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
            }
            break;
          case "v":
            numbers = parseFloats(data2);
            for (let j = 0, jl = numbers.length; j < jl; j++) {
              point.y += numbers[j];
              control.x = point.x;
              control.y = point.y;
              path.lineTo(point.x, point.y);
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
            }
            break;
          case "l":
            numbers = parseFloats(data2);
            for (let j = 0, jl = numbers.length; j < jl; j += 2) {
              point.x += numbers[j + 0];
              point.y += numbers[j + 1];
              control.x = point.x;
              control.y = point.y;
              path.lineTo(point.x, point.y);
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
            }
            break;
          case "c":
            numbers = parseFloats(data2);
            for (let j = 0, jl = numbers.length; j < jl; j += 6) {
              path.bezierCurveTo(
                point.x + numbers[j + 0],
                point.y + numbers[j + 1],
                point.x + numbers[j + 2],
                point.y + numbers[j + 3],
                point.x + numbers[j + 4],
                point.y + numbers[j + 5]
              );
              control.x = point.x + numbers[j + 2];
              control.y = point.y + numbers[j + 3];
              point.x += numbers[j + 4];
              point.y += numbers[j + 5];
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
            }
            break;
          case "s":
            numbers = parseFloats(data2);
            for (let j = 0, jl = numbers.length; j < jl; j += 4) {
              path.bezierCurveTo(
                getReflection(point.x, control.x),
                getReflection(point.y, control.y),
                point.x + numbers[j + 0],
                point.y + numbers[j + 1],
                point.x + numbers[j + 2],
                point.y + numbers[j + 3]
              );
              control.x = point.x + numbers[j + 0];
              control.y = point.y + numbers[j + 1];
              point.x += numbers[j + 2];
              point.y += numbers[j + 3];
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
            }
            break;
          case "q":
            numbers = parseFloats(data2);
            for (let j = 0, jl = numbers.length; j < jl; j += 4) {
              path.quadraticCurveTo(
                point.x + numbers[j + 0],
                point.y + numbers[j + 1],
                point.x + numbers[j + 2],
                point.y + numbers[j + 3]
              );
              control.x = point.x + numbers[j + 0];
              control.y = point.y + numbers[j + 1];
              point.x += numbers[j + 2];
              point.y += numbers[j + 3];
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
            }
            break;
          case "t":
            numbers = parseFloats(data2);
            for (let j = 0, jl = numbers.length; j < jl; j += 2) {
              const rx = getReflection(point.x, control.x);
              const ry = getReflection(point.y, control.y);
              path.quadraticCurveTo(
                rx,
                ry,
                point.x + numbers[j + 0],
                point.y + numbers[j + 1]
              );
              control.x = rx;
              control.y = ry;
              point.x = point.x + numbers[j + 0];
              point.y = point.y + numbers[j + 1];
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
            }
            break;
          case "a":
            numbers = parseFloats(data2, [3, 4], 7);
            for (let j = 0, jl = numbers.length; j < jl; j += 7) {
              if (numbers[j + 5] == 0 && numbers[j + 6] == 0) continue;
              const start = point.clone();
              point.x += numbers[j + 5];
              point.y += numbers[j + 6];
              control.x = point.x;
              control.y = point.y;
              parseArcCommand(
                path,
                numbers[j],
                numbers[j + 1],
                numbers[j + 2],
                numbers[j + 3],
                numbers[j + 4],
                start,
                point
              );
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
            }
            break;
          case "Z":
          case "z":
            path.currentPath.autoClose = true;
            if (path.currentPath.curves.length > 0) {
              point.copy(firstPoint);
              path.currentPath.currentPoint.copy(point);
              isFirstPoint = true;
            }
            break;
          default:
            console.warn(command);
        }
        doSetFirstPoint = false;
      }
      return path;
    }
    function parseCSSStylesheet(node) {
      if (!node.sheet || !node.sheet.cssRules || !node.sheet.cssRules.length) return;
      for (let i = 0; i < node.sheet.cssRules.length; i++) {
        const stylesheet = node.sheet.cssRules[i];
        if (stylesheet.type !== 1) continue;
        const selectorList = stylesheet.selectorText.split(/,/gm).filter(Boolean).map((i2) => i2.trim());
        for (let j = 0; j < selectorList.length; j++) {
          const definitions = Object.fromEntries(
            Object.entries(stylesheet.style).filter(([, v]) => v !== "")
          );
          stylesheets[selectorList[j]] = Object.assign(
            stylesheets[selectorList[j]] || {},
            definitions
          );
        }
      }
    }
    function parseArcCommand(path, rx, ry, x_axis_rotation, large_arc_flag, sweep_flag, start, end) {
      if (rx == 0 || ry == 0) {
        path.lineTo(end.x, end.y);
        return;
      }
      x_axis_rotation = x_axis_rotation * Math.PI / 180;
      rx = Math.abs(rx);
      ry = Math.abs(ry);
      const dx2 = (start.x - end.x) / 2;
      const dy2 = (start.y - end.y) / 2;
      const x1p = Math.cos(x_axis_rotation) * dx2 + Math.sin(x_axis_rotation) * dy2;
      const y1p = -Math.sin(x_axis_rotation) * dx2 + Math.cos(x_axis_rotation) * dy2;
      let rxs = rx * rx;
      let rys = ry * ry;
      const x1ps = x1p * x1p;
      const y1ps = y1p * y1p;
      const cr = x1ps / rxs + y1ps / rys;
      if (cr > 1) {
        const s = Math.sqrt(cr);
        rx = s * rx;
        ry = s * ry;
        rxs = rx * rx;
        rys = ry * ry;
      }
      const dq = rxs * y1ps + rys * x1ps;
      const pq = (rxs * rys - dq) / dq;
      let q = Math.sqrt(Math.max(0, pq));
      if (large_arc_flag === sweep_flag) q = -q;
      const cxp = q * rx * y1p / ry;
      const cyp = -q * ry * x1p / rx;
      const cx = Math.cos(x_axis_rotation) * cxp - Math.sin(x_axis_rotation) * cyp + (start.x + end.x) / 2;
      const cy = Math.sin(x_axis_rotation) * cxp + Math.cos(x_axis_rotation) * cyp + (start.y + end.y) / 2;
      const theta = svgAngle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
      const delta = svgAngle((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry) % (Math.PI * 2);
      path.currentPath.absellipse(cx, cy, rx, ry, theta, theta + delta, sweep_flag === 0, x_axis_rotation);
    }
    function svgAngle(ux, uy, vx, vy) {
      const dot = ux * vx + uy * vy;
      const len = Math.sqrt(ux * ux + uy * uy) * Math.sqrt(vx * vx + vy * vy);
      let ang = Math.acos(Math.max(-1, Math.min(1, dot / len)));
      if (ux * vy - uy * vx < 0) ang = -ang;
      return ang;
    }
    function parseRectNode(node) {
      const x = parseFloatWithUnits(node.getAttribute("x") || 0);
      const y = parseFloatWithUnits(node.getAttribute("y") || 0);
      const rx = parseFloatWithUnits(node.getAttribute("rx") || node.getAttribute("ry") || 0);
      const ry = parseFloatWithUnits(node.getAttribute("ry") || node.getAttribute("rx") || 0);
      const w = parseFloatWithUnits(node.getAttribute("width"));
      const h = parseFloatWithUnits(node.getAttribute("height"));
      const bci = 1 - 0.551915024494;
      const path = new ShapePath();
      path.moveTo(x + rx, y);
      path.lineTo(x + w - rx, y);
      if (rx !== 0 || ry !== 0) {
        path.bezierCurveTo(
          x + w - rx * bci,
          y,
          x + w,
          y + ry * bci,
          x + w,
          y + ry
        );
      }
      path.lineTo(x + w, y + h - ry);
      if (rx !== 0 || ry !== 0) {
        path.bezierCurveTo(
          x + w,
          y + h - ry * bci,
          x + w - rx * bci,
          y + h,
          x + w - rx,
          y + h
        );
      }
      path.lineTo(x + rx, y + h);
      if (rx !== 0 || ry !== 0) {
        path.bezierCurveTo(
          x + rx * bci,
          y + h,
          x,
          y + h - ry * bci,
          x,
          y + h - ry
        );
      }
      path.lineTo(x, y + ry);
      if (rx !== 0 || ry !== 0) {
        path.bezierCurveTo(x, y + ry * bci, x + rx * bci, y, x + rx, y);
      }
      return path;
    }
    function parsePolygonNode(node) {
      function iterator(match, a, b) {
        const x = parseFloatWithUnits(a);
        const y = parseFloatWithUnits(b);
        if (index === 0) {
          path.moveTo(x, y);
        } else {
          path.lineTo(x, y);
        }
        index++;
      }
      const regex = /([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g;
      const path = new ShapePath();
      let index = 0;
      node.getAttribute("points").replace(regex, iterator);
      path.currentPath.autoClose = true;
      return path;
    }
    function parsePolylineNode(node) {
      function iterator(match, a, b) {
        const x = parseFloatWithUnits(a);
        const y = parseFloatWithUnits(b);
        if (index === 0) {
          path.moveTo(x, y);
        } else {
          path.lineTo(x, y);
        }
        index++;
      }
      const regex = /([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g;
      const path = new ShapePath();
      let index = 0;
      node.getAttribute("points").replace(regex, iterator);
      path.currentPath.autoClose = false;
      return path;
    }
    function parseCircleNode(node) {
      const x = parseFloatWithUnits(node.getAttribute("cx") || 0);
      const y = parseFloatWithUnits(node.getAttribute("cy") || 0);
      const r = parseFloatWithUnits(node.getAttribute("r") || 0);
      const subpath = new Path();
      subpath.absarc(x, y, r, 0, Math.PI * 2);
      const path = new ShapePath();
      path.subPaths.push(subpath);
      return path;
    }
    function parseEllipseNode(node) {
      const x = parseFloatWithUnits(node.getAttribute("cx") || 0);
      const y = parseFloatWithUnits(node.getAttribute("cy") || 0);
      const rx = parseFloatWithUnits(node.getAttribute("rx") || 0);
      const ry = parseFloatWithUnits(node.getAttribute("ry") || 0);
      const subpath = new Path();
      subpath.absellipse(x, y, rx, ry, 0, Math.PI * 2);
      const path = new ShapePath();
      path.subPaths.push(subpath);
      return path;
    }
    function parseLineNode(node) {
      const x1 = parseFloatWithUnits(node.getAttribute("x1") || 0);
      const y1 = parseFloatWithUnits(node.getAttribute("y1") || 0);
      const x2 = parseFloatWithUnits(node.getAttribute("x2") || 0);
      const y2 = parseFloatWithUnits(node.getAttribute("y2") || 0);
      const path = new ShapePath();
      path.moveTo(x1, y1);
      path.lineTo(x2, y2);
      path.currentPath.autoClose = false;
      return path;
    }
    function parseGradients(xml2) {
      const HREF_NS = "http://www.w3.org/1999/xlink";
      const gradientNodes = xml2.querySelectorAll("linearGradient, radialGradient");
      const ATTRS = ["x1", "y1", "x2", "y2", "cx", "cy", "r", "fx", "fy", "gradientUnits", "gradientTransform", "spreadMethod"];
      const parsed = {};
      for (const node of gradientNodes) {
        const id = node.getAttribute("id");
        if (!id) continue;
        const entry = {
          type: node.nodeName === "radialGradient" ? "radialGradient" : "linearGradient",
          attrs: {},
          stops: null,
          href: null
        };
        const href = node.getAttributeNS(HREF_NS, "href") || node.getAttribute("href") || "";
        if (href.startsWith("#")) entry.href = href.substring(1);
        for (const name of ATTRS) {
          if (node.hasAttribute(name)) entry.attrs[name] = node.getAttribute(name);
        }
        const stopNodes = node.querySelectorAll("stop");
        if (stopNodes.length > 0) {
          entry.stops = [];
          for (const s of stopNodes) {
            let color = s.getAttribute("stop-color");
            if (!color && s.style) color = s.style["stop-color"];
            if (!color) color = "#000";
            let opacity = s.getAttribute("stop-opacity");
            if ((opacity === null || opacity === "") && s.style) opacity = s.style["stop-opacity"];
            opacity = opacity === null || opacity === "" || opacity === void 0 ? 1 : Math.max(0, Math.min(1, parseFloat(opacity)));
            const offset = Math.max(0, Math.min(1, parseFloat(s.getAttribute("offset") || "0")));
            entry.stops.push({ offset, color, opacity });
          }
        }
        parsed[id] = entry;
      }
      function inherit(id, visited) {
        const entry = parsed[id];
        if (!entry || visited.has(id)) return entry;
        visited.add(id);
        if (entry.href && parsed[entry.href]) {
          const parent = inherit(entry.href, visited);
          if (parent) {
            if (!entry.stops) entry.stops = parent.stops;
            for (const key in parent.attrs) {
              if (!(key in entry.attrs)) entry.attrs[key] = parent.attrs[key];
            }
          }
        }
        return entry;
      }
      for (const id in parsed) inherit(id, /* @__PURE__ */ new Set());
      for (const id in parsed) {
        let coord2 = function(str) {
          if (typeof str !== "string") return 0;
          if (str.endsWith("%")) return parseFloat(str) / 100;
          return parseFloatWithUnits(str);
        };
        var coord = coord2;
        const entry = parsed[id];
        const a = entry.attrs;
        const units2 = a.gradientUnits === "userSpaceOnUse" ? "userSpaceOnUse" : "objectBoundingBox";
        const gradient = {
          type: entry.type,
          gradientUnits: units2,
          spreadMethod: a.spreadMethod === "reflect" || a.spreadMethod === "repeat" ? a.spreadMethod : "pad",
          gradientTransform: null,
          stops: (entry.stops || []).slice().sort((x, y) => x.offset - y.offset)
        };
        if (a.gradientTransform) {
          gradient.gradientTransform = new Matrix3();
          parseTransformString(a.gradientTransform, gradient.gradientTransform);
        }
        if (entry.type === "linearGradient") {
          gradient.x1 = a.x1 !== void 0 ? coord2(a.x1) : 0;
          gradient.y1 = a.y1 !== void 0 ? coord2(a.y1) : 0;
          gradient.x2 = a.x2 !== void 0 ? coord2(a.x2) : units2 === "objectBoundingBox" ? 1 : 0;
          gradient.y2 = a.y2 !== void 0 ? coord2(a.y2) : 0;
        } else {
          const defCenter = units2 === "objectBoundingBox" ? 0.5 : 0;
          const defR = units2 === "objectBoundingBox" ? 0.5 : 0;
          gradient.cx = a.cx !== void 0 ? coord2(a.cx) : defCenter;
          gradient.cy = a.cy !== void 0 ? coord2(a.cy) : defCenter;
          gradient.r = a.r !== void 0 ? coord2(a.r) : defR;
          gradient.fx = a.fx !== void 0 ? coord2(a.fx) : gradient.cx;
          gradient.fy = a.fy !== void 0 ? coord2(a.fy) : gradient.cy;
        }
        gradients[id] = gradient;
      }
    }
    function parseStyle(node, style) {
      style = Object.assign({}, style);
      let stylesheetStyles = {};
      if (node.hasAttribute("class")) {
        const classSelectors = node.getAttribute("class").split(/\s/).filter(Boolean).map((i) => i.trim());
        for (let i = 0; i < classSelectors.length; i++) {
          stylesheetStyles = Object.assign(stylesheetStyles, stylesheets["." + classSelectors[i]]);
        }
      }
      if (node.hasAttribute("id")) {
        stylesheetStyles = Object.assign(stylesheetStyles, stylesheets["#" + node.getAttribute("id")]);
      }
      function addStyle(svgName, jsName, adjustFunction) {
        if (adjustFunction === void 0) adjustFunction = function copy(v) {
          return v;
        };
        if (node.hasAttribute(svgName)) style[jsName] = adjustFunction(node.getAttribute(svgName));
        if (stylesheetStyles[jsName]) style[jsName] = adjustFunction(stylesheetStyles[jsName]);
        if (node.style && node.style[svgName] !== "") style[jsName] = adjustFunction(node.style[svgName]);
      }
      function clamp(v) {
        return Math.max(0, Math.min(1, parseFloatWithUnits(v)));
      }
      function positive(v) {
        return Math.max(0, parseFloatWithUnits(v));
      }
      addStyle("fill", "fill");
      addStyle("fill-opacity", "fillOpacity", clamp);
      addStyle("fill-rule", "fillRule");
      addStyle("opacity", "opacity", clamp);
      addStyle("stroke", "stroke");
      addStyle("stroke-opacity", "strokeOpacity", clamp);
      addStyle("stroke-width", "strokeWidth", positive);
      addStyle("stroke-linejoin", "strokeLineJoin");
      addStyle("stroke-linecap", "strokeLineCap");
      addStyle("stroke-miterlimit", "strokeMiterLimit", positive);
      addStyle("visibility", "visibility");
      return style;
    }
    function getReflection(a, b) {
      return a - (b - a);
    }
    function parseFloats(input, flags, stride) {
      if (typeof input !== "string") {
        throw new TypeError("Invalid input: " + typeof input);
      }
      const RE = {
        SEPARATOR: /[ \t\r\n\,.\-+]/,
        WHITESPACE: /[ \t\r\n]/,
        DIGIT: /[\d]/,
        SIGN: /[-+]/,
        POINT: /\./,
        COMMA: /,/,
        EXP: /e/i,
        FLAGS: /[01]/
      };
      const SEP = 0;
      const INT = 1;
      const FLOAT = 2;
      const EXP = 3;
      let state = SEP;
      let seenComma = true;
      let number = "", exponent = "";
      const result = [];
      function throwSyntaxError(current2, i, partial) {
        const error = new SyntaxError('Unexpected character "' + current2 + '" at index ' + i + ".");
        error.partial = partial;
        throw error;
      }
      function newNumber() {
        if (number !== "") {
          if (exponent === "") result.push(Number(number));
          else result.push(Number(number) * Math.pow(10, Number(exponent)));
        }
        number = "";
        exponent = "";
      }
      let current;
      const length = input.length;
      for (let i = 0; i < length; i++) {
        current = input[i];
        if (Array.isArray(flags) && flags.includes(result.length % stride) && RE.FLAGS.test(current)) {
          state = INT;
          number = current;
          newNumber();
          continue;
        }
        if (state === SEP) {
          if (RE.WHITESPACE.test(current)) {
            continue;
          }
          if (RE.DIGIT.test(current) || RE.SIGN.test(current)) {
            state = INT;
            number = current;
            continue;
          }
          if (RE.POINT.test(current)) {
            state = FLOAT;
            number = current;
            continue;
          }
          if (RE.COMMA.test(current)) {
            if (seenComma) {
              throwSyntaxError(current, i, result);
            }
            seenComma = true;
          }
        }
        if (state === INT) {
          if (RE.DIGIT.test(current)) {
            number += current;
            continue;
          }
          if (RE.POINT.test(current)) {
            number += current;
            state = FLOAT;
            continue;
          }
          if (RE.EXP.test(current)) {
            state = EXP;
            continue;
          }
          if (RE.SIGN.test(current) && number.length === 1 && RE.SIGN.test(number[0])) {
            throwSyntaxError(current, i, result);
          }
        }
        if (state === FLOAT) {
          if (RE.DIGIT.test(current)) {
            number += current;
            continue;
          }
          if (RE.EXP.test(current)) {
            state = EXP;
            continue;
          }
          if (RE.POINT.test(current) && number[number.length - 1] === ".") {
            throwSyntaxError(current, i, result);
          }
        }
        if (state === EXP) {
          if (RE.DIGIT.test(current)) {
            exponent += current;
            continue;
          }
          if (RE.SIGN.test(current)) {
            if (exponent === "") {
              exponent += current;
              continue;
            }
            if (exponent.length === 1 && RE.SIGN.test(exponent)) {
              throwSyntaxError(current, i, result);
            }
          }
        }
        if (RE.WHITESPACE.test(current)) {
          newNumber();
          state = SEP;
          seenComma = false;
        } else if (RE.COMMA.test(current)) {
          newNumber();
          state = SEP;
          seenComma = true;
        } else if (RE.SIGN.test(current)) {
          newNumber();
          state = INT;
          number = current;
        } else if (RE.POINT.test(current)) {
          newNumber();
          state = FLOAT;
          number = current;
        } else {
          throwSyntaxError(current, i, result);
        }
      }
      newNumber();
      return result;
    }
    const units = ["mm", "cm", "in", "pt", "pc", "px"];
    const unitConversion = {
      "mm": {
        "mm": 1,
        "cm": 0.1,
        "in": 1 / 25.4,
        "pt": 72 / 25.4,
        "pc": 6 / 25.4,
        "px": -1
      },
      "cm": {
        "mm": 10,
        "cm": 1,
        "in": 1 / 2.54,
        "pt": 72 / 2.54,
        "pc": 6 / 2.54,
        "px": -1
      },
      "in": {
        "mm": 25.4,
        "cm": 2.54,
        "in": 1,
        "pt": 72,
        "pc": 6,
        "px": -1
      },
      "pt": {
        "mm": 25.4 / 72,
        "cm": 2.54 / 72,
        "in": 1 / 72,
        "pt": 1,
        "pc": 6 / 72,
        "px": -1
      },
      "pc": {
        "mm": 25.4 / 6,
        "cm": 2.54 / 6,
        "in": 1 / 6,
        "pt": 72 / 6,
        "pc": 1,
        "px": -1
      },
      "px": {
        "px": 1
      }
    };
    function parseFloatWithUnits(string) {
      let theUnit = "px";
      if (typeof string === "string" || string instanceof String) {
        for (let i = 0, n = units.length; i < n; i++) {
          const u = units[i];
          if (string.endsWith(u)) {
            theUnit = u;
            string = string.substring(0, string.length - u.length);
            break;
          }
        }
      }
      let scale = void 0;
      if (theUnit === "px" && scope.defaultUnit !== "px") {
        scale = unitConversion["in"][scope.defaultUnit] / scope.defaultDPI;
      } else {
        scale = unitConversion[theUnit][scope.defaultUnit];
        if (scale < 0) {
          scale = unitConversion[theUnit]["in"] * scope.defaultDPI;
        }
      }
      return scale * parseFloat(string);
    }
    function getNodeTransform(node) {
      if (!(node.hasAttribute("transform") || node.nodeName === "use" && (node.hasAttribute("x") || node.hasAttribute("y")))) {
        return null;
      }
      const transform = parseNodeTransform(node);
      if (transformStack.length > 0) {
        transform.premultiply(transformStack[transformStack.length - 1]);
      }
      currentTransform.copy(transform);
      transformStack.push(transform);
      return transform;
    }
    function parseNodeTransform(node) {
      const transform = new Matrix3();
      if (node.nodeName === "use" && (node.hasAttribute("x") || node.hasAttribute("y"))) {
        const tx = parseFloatWithUnits(node.getAttribute("x") || 0);
        const ty = parseFloatWithUnits(node.getAttribute("y") || 0);
        transform.makeTranslation(tx, ty);
      }
      if (node.hasAttribute("transform")) {
        parseTransformString(node.getAttribute("transform"), transform);
      }
      return transform;
    }
    function parseTransformString(text2, transform) {
      const currentTransform2 = tempTransform0;
      const transformsTexts = text2.split(")");
      for (let tIndex = transformsTexts.length - 1; tIndex >= 0; tIndex--) {
        const transformText = transformsTexts[tIndex].trim();
        if (transformText === "") continue;
        const openParPos = transformText.indexOf("(");
        const closeParPos = transformText.length;
        if (openParPos > 0 && openParPos < closeParPos) {
          const transformType = transformText.slice(0, openParPos);
          const array = parseFloats(transformText.slice(openParPos + 1));
          currentTransform2.identity();
          switch (transformType) {
            case "translate":
              if (array.length >= 1) {
                const tx = array[0];
                let ty = 0;
                if (array.length >= 2) {
                  ty = array[1];
                }
                currentTransform2.makeTranslation(tx, ty);
              }
              break;
            case "rotate":
              if (array.length >= 1) {
                let angle = 0;
                let cx = 0;
                let cy = 0;
                angle = array[0] * Math.PI / 180;
                if (array.length >= 3) {
                  cx = array[1];
                  cy = array[2];
                }
                tempTransform1.makeTranslation(-cx, -cy);
                tempTransform2.makeRotation(angle);
                tempTransform3.multiplyMatrices(tempTransform2, tempTransform1);
                tempTransform1.makeTranslation(cx, cy);
                currentTransform2.multiplyMatrices(tempTransform1, tempTransform3);
              }
              break;
            case "scale":
              if (array.length >= 1) {
                const scaleX = array[0];
                let scaleY = scaleX;
                if (array.length >= 2) {
                  scaleY = array[1];
                }
                currentTransform2.makeScale(scaleX, scaleY);
              }
              break;
            case "skewX":
              if (array.length === 1) {
                currentTransform2.set(
                  1,
                  Math.tan(array[0] * Math.PI / 180),
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  1
                );
              }
              break;
            case "skewY":
              if (array.length === 1) {
                currentTransform2.set(
                  1,
                  0,
                  0,
                  Math.tan(array[0] * Math.PI / 180),
                  1,
                  0,
                  0,
                  0,
                  1
                );
              }
              break;
            case "matrix":
              if (array.length === 6) {
                currentTransform2.set(
                  array[0],
                  array[2],
                  array[4],
                  array[1],
                  array[3],
                  array[5],
                  0,
                  0,
                  1
                );
              }
              break;
          }
          transform.premultiply(currentTransform2);
        }
      }
      return transform;
    }
    function transformPath(path, m) {
      function transfVec2(v2) {
        tempV3.set(v2.x, v2.y, 1).applyMatrix3(m);
        v2.set(tempV3.x, tempV3.y);
      }
      function transfEllipseGeneric(curve) {
        const a = curve.xRadius;
        const b = curve.yRadius;
        const cosTheta = Math.cos(curve.aRotation);
        const sinTheta = Math.sin(curve.aRotation);
        const v1 = new Vector3(a * cosTheta, a * sinTheta, 0);
        const v2 = new Vector3(-b * sinTheta, b * cosTheta, 0);
        const f1 = v1.applyMatrix3(m);
        const f2 = v2.applyMatrix3(m);
        const mF = tempTransform0.set(
          f1.x,
          f2.x,
          0,
          f1.y,
          f2.y,
          0,
          0,
          0,
          1
        );
        const mFInv = tempTransform1.copy(mF).invert();
        const mFInvT = tempTransform2.copy(mFInv).transpose();
        const mQ = mFInvT.multiply(mFInv);
        const mQe = mQ.elements;
        const ed = eigenDecomposition(mQe[0], mQe[1], mQe[4]);
        const rt1sqrt = Math.sqrt(ed.rt1);
        const rt2sqrt = Math.sqrt(ed.rt2);
        curve.xRadius = 1 / rt1sqrt;
        curve.yRadius = 1 / rt2sqrt;
        curve.aRotation = Math.atan2(ed.sn, ed.cs);
        const isFullEllipse = (curve.aEndAngle - curve.aStartAngle) % (2 * Math.PI) < Number.EPSILON;
        if (!isFullEllipse) {
          const mDsqrt = tempTransform1.set(
            rt1sqrt,
            0,
            0,
            0,
            rt2sqrt,
            0,
            0,
            0,
            1
          );
          const mRT = tempTransform2.set(
            ed.cs,
            ed.sn,
            0,
            -ed.sn,
            ed.cs,
            0,
            0,
            0,
            1
          );
          const mDRF = mDsqrt.multiply(mRT).multiply(mF);
          const transformAngle = (phi) => {
            const { x: cosR, y: sinR } = new Vector3(Math.cos(phi), Math.sin(phi), 0).applyMatrix3(mDRF);
            return Math.atan2(sinR, cosR);
          };
          curve.aStartAngle = transformAngle(curve.aStartAngle);
          curve.aEndAngle = transformAngle(curve.aEndAngle);
          if (isTransformFlipped(m)) {
            curve.aClockwise = !curve.aClockwise;
          }
        }
      }
      function transfEllipseNoSkew(curve) {
        const sx = getTransformScaleX(m);
        const sy = getTransformScaleY(m);
        curve.xRadius *= sx;
        curve.yRadius *= sy;
        const theta = sx > Number.EPSILON ? Math.atan2(m.elements[1], m.elements[0]) : Math.atan2(-m.elements[3], m.elements[4]);
        curve.aRotation += theta;
        if (isTransformFlipped(m)) {
          curve.aStartAngle *= -1;
          curve.aEndAngle *= -1;
          curve.aClockwise = !curve.aClockwise;
        }
      }
      const subPaths = path.subPaths;
      for (let i = 0, n = subPaths.length; i < n; i++) {
        const subPath = subPaths[i];
        const curves = subPath.curves;
        for (let j = 0; j < curves.length; j++) {
          const curve = curves[j];
          if (curve.isLineCurve) {
            transfVec2(curve.v1);
            transfVec2(curve.v2);
          } else if (curve.isCubicBezierCurve) {
            transfVec2(curve.v0);
            transfVec2(curve.v1);
            transfVec2(curve.v2);
            transfVec2(curve.v3);
          } else if (curve.isQuadraticBezierCurve) {
            transfVec2(curve.v0);
            transfVec2(curve.v1);
            transfVec2(curve.v2);
          } else if (curve.isEllipseCurve) {
            tempV2.set(curve.aX, curve.aY);
            transfVec2(tempV2);
            curve.aX = tempV2.x;
            curve.aY = tempV2.y;
            if (isTransformSkewed(m)) {
              transfEllipseGeneric(curve);
            } else {
              transfEllipseNoSkew(curve);
            }
          }
        }
      }
    }
    function isTransformFlipped(m) {
      const te = m.elements;
      return te[0] * te[4] - te[1] * te[3] < 0;
    }
    function isTransformSkewed(m) {
      const te = m.elements;
      const basisDot = te[0] * te[3] + te[1] * te[4];
      if (basisDot === 0) return false;
      const sx = getTransformScaleX(m);
      const sy = getTransformScaleY(m);
      return Math.abs(basisDot / (sx * sy)) > Number.EPSILON;
    }
    function getTransformScaleX(m) {
      const te = m.elements;
      return Math.sqrt(te[0] * te[0] + te[1] * te[1]);
    }
    function getTransformScaleY(m) {
      const te = m.elements;
      return Math.sqrt(te[3] * te[3] + te[4] * te[4]);
    }
    function getTransformScale(m) {
      const te = m.elements;
      const det = te[0] * te[4] - te[1] * te[3];
      return Math.sqrt(Math.abs(det));
    }
    function eigenDecomposition(A, B, C) {
      let rt1, rt2, cs, sn, t;
      const sm = A + C;
      const df = A - C;
      const rt = Math.sqrt(df * df + 4 * B * B);
      if (sm > 0) {
        rt1 = 0.5 * (sm + rt);
        t = 1 / rt1;
        rt2 = A * t * C - B * t * B;
      } else if (sm < 0) {
        rt2 = 0.5 * (sm - rt);
      } else {
        rt1 = 0.5 * rt;
        rt2 = -0.5 * rt;
      }
      if (df > 0) {
        cs = df + rt;
      } else {
        cs = df - rt;
      }
      if (Math.abs(cs) > 2 * Math.abs(B)) {
        t = -2 * B / cs;
        sn = 1 / Math.sqrt(1 + t * t);
        cs = t * sn;
      } else if (Math.abs(B) === 0) {
        cs = 1;
        sn = 0;
      } else {
        t = -0.5 * cs / B;
        cs = 1 / Math.sqrt(1 + t * t);
        sn = t * cs;
      }
      if (df > 0) {
        t = cs;
        cs = -sn;
        sn = t;
      }
      return { rt1, rt2, cs, sn };
    }
    const paths = [];
    const stylesheets = {};
    const gradients = {};
    const transformStack = [];
    const tempTransform0 = new Matrix3();
    const tempTransform1 = new Matrix3();
    const tempTransform2 = new Matrix3();
    const tempTransform3 = new Matrix3();
    const tempV2 = new Vector2();
    const tempV3 = new Vector3();
    const currentTransform = new Matrix3();
    const xml = new DOMParser().parseFromString(text, "image/svg+xml");
    parseGradients(xml);
    parseNode(xml.documentElement, {
      fill: "#000",
      fillOpacity: 1,
      strokeOpacity: 1,
      strokeWidth: 1,
      strokeLineJoin: "miter",
      strokeLineCap: "butt",
      strokeMiterLimit: 4
    });
    const data = { paths, gradients, xml: xml.documentElement };
    return data;
  }
  /**
   * Creates a material for rendering the fill of the given path.
   *
   * @param {ShapePath} shapePath - The shape path.
   * @return {?MeshBasicMaterial} The fill material. `null` if the path has no fill.
   */
  static createFillMaterial(shapePath) {
    const style = shapePath.userData.style;
    if (style.fill === void 0 || style.fill === "none") return null;
    const color = shapePath.color;
    let texture = null;
    const urlMatch = GRADIENT_URL_RE.exec(style.fill);
    if (urlMatch) {
      const gradient = shapePath.userData.gradients && shapePath.userData.gradients[urlMatch[1]];
      texture = buildGradientTexture(gradient, shapePath);
    }
    const material = new MeshBasicMaterial({
      opacity: style.fillOpacity * (style.opacity || 1),
      transparent: true,
      side: DoubleSide,
      depthWrite: false
    });
    if (texture !== null) {
      material.map = texture;
    } else {
      material.color = color;
    }
    return material;
  }
  /**
   * Creates a material for rendering the stroke of the given path.
   *
   * @param {ShapePath} shapePath - The shape path.
   * @return {?MeshBasicMaterial} The stroke material. `null` if the path has no stroke.
   */
  static createStrokeMaterial(shapePath) {
    const style = shapePath.userData.style;
    if (style.stroke === void 0 || style.stroke === "none") return null;
    if (GRADIENT_URL_RE.test(style.stroke)) {
      console.warn("THREE.SVGLoader: Gradient strokes are not supported.");
    }
    return new MeshBasicMaterial({
      color: new Color().setStyle(style.stroke, COLOR_SPACE_SVG),
      opacity: style.strokeOpacity * (style.opacity || 1),
      transparent: true,
      side: DoubleSide,
      depthWrite: false
    });
  }
  /**
   * Creates from the given shape path and array of shapes.
   *
   * @deprecated since 185.
   * @param {ShapePath} shapePath - The shape path.
   * @return {Array<Shape>} An array of shapes.
   */
  static createShapes(shapePath) {
    console.warn("SVGLoader: createShapes() is deprecated. Use shapePath.toShapes() instead.");
    return shapePath.toShapes();
  }
  /**
   * Returns a stroke style object from the given parameters.
   *
   * @param {number} [width=1] - The stroke width.
   * @param {string} [color='#000'] - The stroke color, as  returned by {@link Color#getStyle}.
   * @param {'round'|'bevel'|'miter'|'miter-limit'} [lineJoin='miter'] - The line join style.
   * @param {'round'|'square'|'butt'} [lineCap='butt'] - The line cap style.
   * @param {number} [miterLimit=4] - Maximum join length, in multiples of the `width` parameter (join is truncated if it exceeds that distance).
   * @return {Object} The style object.
   */
  static getStrokeStyle(width, color, lineJoin, lineCap, miterLimit) {
    width = width !== void 0 ? width : 1;
    color = color !== void 0 ? color : "#000";
    lineJoin = lineJoin !== void 0 ? lineJoin : "miter";
    lineCap = lineCap !== void 0 ? lineCap : "butt";
    miterLimit = miterLimit !== void 0 ? miterLimit : 4;
    return {
      strokeColor: color,
      strokeWidth: width,
      strokeLineJoin: lineJoin,
      strokeLineCap: lineCap,
      strokeMiterLimit: miterLimit
    };
  }
  /**
   * Creates a stroke from an array of points.
   *
   * @param {Array<Vector2>} points - The points in 2D space. Minimum 2 points. The path can be open or closed (last point equals to first point).
   * @param {Object} style - Object with SVG properties as returned by `SVGLoader.getStrokeStyle()`, or `SVGLoader.parse()` in the `path.userData.style` object.
   * @param {number} [arcDivisions=12] - Arc divisions for round joins and endcaps.
   * @param {number} [minDistance=0.001] - Points closer to this distance will be merged.
   * @return {?BufferGeometry} The stroke geometry. UV coordinates are generated ('u' along path. 'v' across it, from left to right).
   * Returns `null` if not geometry was generated.
   */
  static pointsToStroke(points, style, arcDivisions, minDistance) {
    const vertices = [];
    const normals = [];
    const uvs = [];
    if (_SVGLoader.pointsToStrokeWithBuffers(points, style, arcDivisions, minDistance, vertices, normals, uvs) === 0) {
      return null;
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
    geometry.setAttribute("normal", new Float32BufferAttribute(normals, 3));
    geometry.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
    return geometry;
  }
  /**
   * Creates a stroke from an array of points.
   *
   * @param {Array<Vector2>} points - The points in 2D space. Minimum 2 points.
   * @param {Object} style - Object with SVG properties as returned by `SVGLoader.getStrokeStyle()`, or `SVGLoader.parse()` in the `path.userData.style` object.
   * @param {number} [arcDivisions=12] - Arc divisions for round joins and endcaps.
   * @param {number} [minDistance=0.001] - Points closer to this distance will be merged.
   * @param {Array<number>} vertices - An array holding vertices.
   * @param {Array<number>} normals - An array holding normals.
   * @param {Array<number>} uvs - An array holding uvs.
   * @param {number} [vertexOffset=0] - The vertex offset.
   * @return {number} The number of vertices.
   */
  static pointsToStrokeWithBuffers(points, style, arcDivisions, minDistance, vertices, normals, uvs, vertexOffset) {
    const tempV2_1 = new Vector2();
    const tempV2_2 = new Vector2();
    const tempV2_3 = new Vector2();
    const tempV2_4 = new Vector2();
    const tempV2_5 = new Vector2();
    const tempV2_6 = new Vector2();
    const tempV2_7 = new Vector2();
    const lastPointL = new Vector2();
    const lastPointR = new Vector2();
    const point0L = new Vector2();
    const point0R = new Vector2();
    const currentPointL = new Vector2();
    const currentPointR = new Vector2();
    const nextPointL = new Vector2();
    const nextPointR = new Vector2();
    const innerPoint = new Vector2();
    const outerPoint = new Vector2();
    arcDivisions = arcDivisions !== void 0 ? arcDivisions : 12;
    minDistance = minDistance !== void 0 ? minDistance : 1e-3;
    vertexOffset = vertexOffset !== void 0 ? vertexOffset : 0;
    points = removeDuplicatedPoints(points);
    const numPoints = points.length;
    if (numPoints < 2) return 0;
    const isClosed = points[0].equals(points[numPoints - 1]);
    let currentPoint;
    let previousPoint = points[0];
    let nextPoint;
    const strokeWidth2 = style.strokeWidth / 2;
    const deltaU = 1 / (numPoints - 1);
    let u0 = 0, u1;
    let innerSideModified;
    let joinIsOnLeftSide;
    let isMiter;
    let initialJoinIsOnLeftSide = false;
    let numVertices = 0;
    let currentCoordinate = vertexOffset * 3;
    let currentCoordinateUV = vertexOffset * 2;
    getNormal(points[0], points[1], tempV2_1).multiplyScalar(strokeWidth2);
    lastPointL.copy(points[0]).sub(tempV2_1);
    lastPointR.copy(points[0]).add(tempV2_1);
    point0L.copy(lastPointL);
    point0R.copy(lastPointR);
    for (let iPoint = 1; iPoint < numPoints; iPoint++) {
      currentPoint = points[iPoint];
      if (iPoint === numPoints - 1) {
        if (isClosed) {
          nextPoint = points[1];
        } else nextPoint = void 0;
      } else {
        nextPoint = points[iPoint + 1];
      }
      const normal1 = tempV2_1;
      getNormal(previousPoint, currentPoint, normal1);
      tempV2_3.copy(normal1).multiplyScalar(strokeWidth2);
      currentPointL.copy(currentPoint).sub(tempV2_3);
      currentPointR.copy(currentPoint).add(tempV2_3);
      u1 = u0 + deltaU;
      innerSideModified = false;
      if (nextPoint !== void 0) {
        getNormal(currentPoint, nextPoint, tempV2_2);
        tempV2_3.copy(tempV2_2).multiplyScalar(strokeWidth2);
        nextPointL.copy(currentPoint).sub(tempV2_3);
        nextPointR.copy(currentPoint).add(tempV2_3);
        joinIsOnLeftSide = true;
        tempV2_3.subVectors(nextPoint, previousPoint);
        if (normal1.dot(tempV2_3) < 0) {
          joinIsOnLeftSide = false;
        }
        if (iPoint === 1) initialJoinIsOnLeftSide = joinIsOnLeftSide;
        tempV2_3.subVectors(nextPoint, currentPoint);
        tempV2_3.normalize();
        const dot = Math.abs(normal1.dot(tempV2_3));
        if (dot > Number.EPSILON) {
          const miterSide = strokeWidth2 / dot;
          tempV2_3.multiplyScalar(-miterSide);
          tempV2_4.subVectors(currentPoint, previousPoint);
          tempV2_5.copy(tempV2_4).setLength(miterSide).add(tempV2_3);
          innerPoint.copy(tempV2_5).negate();
          const miterLength2 = tempV2_5.length();
          const segmentLengthPrev = tempV2_4.length();
          tempV2_4.divideScalar(segmentLengthPrev);
          tempV2_6.subVectors(nextPoint, currentPoint);
          const segmentLengthNext = tempV2_6.length();
          tempV2_6.divideScalar(segmentLengthNext);
          if (tempV2_4.dot(innerPoint) < segmentLengthPrev && tempV2_6.dot(innerPoint) < segmentLengthNext) {
            innerSideModified = true;
          }
          outerPoint.copy(tempV2_5).add(currentPoint);
          innerPoint.add(currentPoint);
          if (innerSideModified) {
            const refPt = joinIsOnLeftSide ? lastPointR : lastPointL;
            const foldCross = (outerPoint.x - refPt.x) * (innerPoint.y - refPt.y) - (outerPoint.y - refPt.y) * (innerPoint.x - refPt.x);
            if (joinIsOnLeftSide && foldCross < 0 || !joinIsOnLeftSide && foldCross > 0) {
              innerPoint.copy(refPt);
            }
          }
          isMiter = false;
          if (innerSideModified) {
            if (joinIsOnLeftSide) {
              nextPointR.copy(innerPoint);
              currentPointR.copy(innerPoint);
            } else {
              nextPointL.copy(innerPoint);
              currentPointL.copy(innerPoint);
            }
          } else {
            makeSegmentTriangles();
          }
          switch (style.strokeLineJoin) {
            case "bevel":
              makeSegmentWithBevelJoin(joinIsOnLeftSide, innerSideModified, u1);
              break;
            case "round":
              createSegmentTrianglesWithMiddleSection(joinIsOnLeftSide, innerSideModified);
              if (joinIsOnLeftSide) {
                makeCircularSector(currentPoint, currentPointL, nextPointL, u1, 0);
              } else {
                makeCircularSector(currentPoint, nextPointR, currentPointR, u1, 1);
              }
              break;
            case "miter":
            case "miter-clip":
            default:
              const miterFraction = strokeWidth2 * style.strokeMiterLimit / miterLength2;
              if (miterFraction < 1) {
                if (style.strokeLineJoin !== "miter-clip") {
                  makeSegmentWithBevelJoin(joinIsOnLeftSide, innerSideModified, u1);
                  break;
                } else {
                  createSegmentTrianglesWithMiddleSection(joinIsOnLeftSide, innerSideModified);
                  if (joinIsOnLeftSide) {
                    tempV2_6.subVectors(outerPoint, currentPointL).multiplyScalar(miterFraction).add(currentPointL);
                    tempV2_7.subVectors(outerPoint, nextPointL).multiplyScalar(miterFraction).add(nextPointL);
                    addVertex(currentPointL, u1, 0);
                    addVertex(tempV2_6, u1, 0);
                    addVertex(currentPoint, u1, 0.5);
                    addVertex(currentPoint, u1, 0.5);
                    addVertex(tempV2_6, u1, 0);
                    addVertex(tempV2_7, u1, 0);
                    addVertex(currentPoint, u1, 0.5);
                    addVertex(tempV2_7, u1, 0);
                    addVertex(nextPointL, u1, 0);
                  } else {
                    tempV2_6.subVectors(outerPoint, currentPointR).multiplyScalar(miterFraction).add(currentPointR);
                    tempV2_7.subVectors(outerPoint, nextPointR).multiplyScalar(miterFraction).add(nextPointR);
                    addVertex(currentPointR, u1, 1);
                    addVertex(tempV2_6, u1, 1);
                    addVertex(currentPoint, u1, 0.5);
                    addVertex(currentPoint, u1, 0.5);
                    addVertex(tempV2_6, u1, 1);
                    addVertex(tempV2_7, u1, 1);
                    addVertex(currentPoint, u1, 0.5);
                    addVertex(tempV2_7, u1, 1);
                    addVertex(nextPointR, u1, 1);
                  }
                }
              } else {
                if (innerSideModified) {
                  if (joinIsOnLeftSide) {
                    addVertex(lastPointR, u0, 1);
                    addVertex(lastPointL, u0, 0);
                    addVertex(outerPoint, u1, 0);
                    addVertex(lastPointR, u0, 1);
                    addVertex(outerPoint, u1, 0);
                    addVertex(innerPoint, u1, 1);
                  } else {
                    addVertex(lastPointR, u0, 1);
                    addVertex(lastPointL, u0, 0);
                    addVertex(outerPoint, u1, 1);
                    addVertex(lastPointL, u0, 0);
                    addVertex(innerPoint, u1, 0);
                    addVertex(outerPoint, u1, 1);
                  }
                  if (joinIsOnLeftSide) {
                    nextPointL.copy(outerPoint);
                  } else {
                    nextPointR.copy(outerPoint);
                  }
                } else {
                  if (joinIsOnLeftSide) {
                    addVertex(currentPointL, u1, 0);
                    addVertex(outerPoint, u1, 0);
                    addVertex(currentPoint, u1, 0.5);
                    addVertex(currentPoint, u1, 0.5);
                    addVertex(outerPoint, u1, 0);
                    addVertex(nextPointL, u1, 0);
                  } else {
                    addVertex(currentPointR, u1, 1);
                    addVertex(outerPoint, u1, 1);
                    addVertex(currentPoint, u1, 0.5);
                    addVertex(currentPoint, u1, 0.5);
                    addVertex(outerPoint, u1, 1);
                    addVertex(nextPointR, u1, 1);
                  }
                }
                isMiter = true;
              }
              break;
          }
        } else {
          makeSegmentTriangles();
        }
      } else {
        makeSegmentTriangles();
      }
      if (!isClosed && iPoint === numPoints - 1) {
        addCapGeometry(points[0], point0L, point0R, joinIsOnLeftSide, true, u0);
      }
      u0 = u1;
      previousPoint = currentPoint;
      lastPointL.copy(nextPointL);
      lastPointR.copy(nextPointR);
    }
    if (!isClosed) {
      addCapGeometry(currentPoint, currentPointL, currentPointR, joinIsOnLeftSide, false, u1);
    } else if (innerSideModified && vertices) {
      let lastOuter = outerPoint;
      let lastInner = innerPoint;
      if (initialJoinIsOnLeftSide !== joinIsOnLeftSide) {
        lastOuter = innerPoint;
        lastInner = outerPoint;
      }
      if (joinIsOnLeftSide) {
        if (isMiter || initialJoinIsOnLeftSide) {
          lastInner.toArray(vertices, 0 * 3);
          lastInner.toArray(vertices, 3 * 3);
          if (isMiter) {
            lastOuter.toArray(vertices, 1 * 3);
          }
        }
      } else {
        if (isMiter || !initialJoinIsOnLeftSide) {
          lastInner.toArray(vertices, 1 * 3);
          lastInner.toArray(vertices, 3 * 3);
          if (isMiter) {
            lastOuter.toArray(vertices, 0 * 3);
          }
        }
      }
    }
    if (vertices) {
      const tri = [new Vector2(), new Vector2(), new Vector2()];
      const startFloat = vertexOffset * 3;
      for (let t = startFloat; t < currentCoordinate; t += 9) {
        tri[0].set(vertices[t], vertices[t + 1]);
        tri[1].set(vertices[t + 3], vertices[t + 4]);
        tri[2].set(vertices[t + 6], vertices[t + 7]);
        if (ShapeUtils.area(tri) < 0) {
          vertices[t + 3] = tri[0].x;
          vertices[t + 4] = tri[0].y;
        }
      }
    }
    return numVertices;
    function getNormal(p1, p2, result) {
      result.subVectors(p2, p1);
      return result.set(-result.y, result.x).normalize();
    }
    function addVertex(position, u, v) {
      if (vertices) {
        vertices[currentCoordinate] = position.x;
        vertices[currentCoordinate + 1] = position.y;
        vertices[currentCoordinate + 2] = 0;
        if (normals) {
          normals[currentCoordinate] = 0;
          normals[currentCoordinate + 1] = 0;
          normals[currentCoordinate + 2] = 1;
        }
        currentCoordinate += 3;
        if (uvs) {
          uvs[currentCoordinateUV] = u;
          uvs[currentCoordinateUV + 1] = v;
          currentCoordinateUV += 2;
        }
      }
      numVertices += 3;
    }
    function makeCircularSector(center, p1, p2, u, v) {
      tempV2_1.copy(p1).sub(center).normalize();
      tempV2_2.copy(p2).sub(center).normalize();
      let angle = Math.PI;
      const dot = tempV2_1.dot(tempV2_2);
      if (Math.abs(dot) < 1) angle = Math.abs(Math.acos(dot));
      angle /= arcDivisions;
      tempV2_3.copy(p1);
      for (let i = 0, il = arcDivisions - 1; i < il; i++) {
        tempV2_4.copy(tempV2_3).rotateAround(center, angle);
        addVertex(tempV2_3, u, v);
        addVertex(tempV2_4, u, v);
        addVertex(center, u, 0.5);
        tempV2_3.copy(tempV2_4);
      }
      addVertex(tempV2_3, u, v);
      addVertex(p2, u, v);
      addVertex(center, u, 0.5);
    }
    function makeSegmentTriangles() {
      addVertex(lastPointR, u0, 1);
      addVertex(lastPointL, u0, 0);
      addVertex(currentPointL, u1, 0);
      addVertex(lastPointR, u0, 1);
      addVertex(currentPointL, u1, 0);
      addVertex(currentPointR, u1, 1);
    }
    function makeSegmentWithBevelJoin(joinIsOnLeftSide2, innerSideModified2, u) {
      if (innerSideModified2) {
        if (joinIsOnLeftSide2) {
          addVertex(lastPointR, u0, 1);
          addVertex(lastPointL, u0, 0);
          addVertex(currentPointL, u1, 0);
          addVertex(lastPointR, u0, 1);
          addVertex(currentPointL, u1, 0);
          addVertex(innerPoint, u1, 1);
          addVertex(currentPointL, u, 0);
          addVertex(nextPointL, u, 0);
          addVertex(innerPoint, u, 0.5);
        } else {
          addVertex(lastPointR, u0, 1);
          addVertex(lastPointL, u0, 0);
          addVertex(currentPointR, u1, 1);
          addVertex(lastPointL, u0, 0);
          addVertex(innerPoint, u1, 0);
          addVertex(currentPointR, u1, 1);
          addVertex(currentPointR, u, 1);
          addVertex(innerPoint, u, 0);
          addVertex(nextPointR, u, 1);
        }
      } else {
        if (joinIsOnLeftSide2) {
          addVertex(currentPointL, u, 0);
          addVertex(nextPointL, u, 0);
          addVertex(currentPoint, u, 0.5);
        } else {
          addVertex(currentPointR, u, 1);
          addVertex(nextPointR, u, 0);
          addVertex(currentPoint, u, 0.5);
        }
      }
    }
    function createSegmentTrianglesWithMiddleSection(joinIsOnLeftSide2, innerSideModified2) {
      if (innerSideModified2) {
        if (joinIsOnLeftSide2) {
          addVertex(lastPointR, u0, 1);
          addVertex(lastPointL, u0, 0);
          addVertex(currentPointL, u1, 0);
          addVertex(lastPointR, u0, 1);
          addVertex(currentPointL, u1, 0);
          addVertex(innerPoint, u1, 1);
          addVertex(currentPointL, u0, 0);
          addVertex(currentPoint, u1, 0.5);
          addVertex(innerPoint, u1, 1);
          addVertex(currentPoint, u1, 0.5);
          addVertex(nextPointL, u0, 0);
          addVertex(innerPoint, u1, 1);
        } else {
          addVertex(lastPointR, u0, 1);
          addVertex(lastPointL, u0, 0);
          addVertex(currentPointR, u1, 1);
          addVertex(lastPointL, u0, 0);
          addVertex(innerPoint, u1, 0);
          addVertex(currentPointR, u1, 1);
          addVertex(currentPointR, u0, 1);
          addVertex(innerPoint, u1, 0);
          addVertex(currentPoint, u1, 0.5);
          addVertex(currentPoint, u1, 0.5);
          addVertex(innerPoint, u1, 0);
          addVertex(nextPointR, u0, 1);
        }
      }
    }
    function addCapGeometry(center, p1, p2, joinIsOnLeftSide2, start, u) {
      switch (style.strokeLineCap) {
        case "round":
          if (start) {
            makeCircularSector(center, p2, p1, u, 0.5);
          } else {
            makeCircularSector(center, p1, p2, u, 0.5);
          }
          break;
        case "square":
          if (start) {
            tempV2_1.subVectors(p1, center);
            tempV2_2.set(tempV2_1.y, -tempV2_1.x);
            tempV2_3.addVectors(tempV2_1, tempV2_2).add(center);
            tempV2_4.subVectors(tempV2_2, tempV2_1).add(center);
            if (joinIsOnLeftSide2) {
              tempV2_3.toArray(vertices, 1 * 3);
              tempV2_4.toArray(vertices, 0 * 3);
              tempV2_4.toArray(vertices, 3 * 3);
            } else {
              tempV2_3.toArray(vertices, 1 * 3);
              uvs[3 * 2 + 1] === 1 ? tempV2_4.toArray(vertices, 3 * 3) : tempV2_3.toArray(vertices, 3 * 3);
              tempV2_4.toArray(vertices, 0 * 3);
            }
          } else {
            tempV2_1.subVectors(p2, center);
            tempV2_2.set(tempV2_1.y, -tempV2_1.x);
            tempV2_3.addVectors(tempV2_1, tempV2_2).add(center);
            tempV2_4.subVectors(tempV2_2, tempV2_1).add(center);
            const vl = vertices.length;
            if (joinIsOnLeftSide2) {
              tempV2_3.toArray(vertices, vl - 1 * 3);
              tempV2_4.toArray(vertices, vl - 2 * 3);
              tempV2_4.toArray(vertices, vl - 4 * 3);
            } else {
              tempV2_4.toArray(vertices, vl - 2 * 3);
              tempV2_3.toArray(vertices, vl - 1 * 3);
              tempV2_4.toArray(vertices, vl - 4 * 3);
            }
          }
          break;
        case "butt":
        default:
          break;
      }
    }
    function removeDuplicatedPoints(points2) {
      let dupPoints = false;
      for (let i = 1, n = points2.length - 1; i < n; i++) {
        if (points2[i].distanceTo(points2[i + 1]) < minDistance) {
          dupPoints = true;
          break;
        }
      }
      if (!dupPoints) return points2;
      const newPoints = [];
      newPoints.push(points2[0]);
      for (let i = 1, n = points2.length - 1; i < n; i++) {
        if (points2[i].distanceTo(points2[i + 1]) >= minDistance) {
          newPoints.push(points2[i]);
        }
      }
      newPoints.push(points2[points2.length - 1]);
      return newPoints;
    }
  }
};
var GRADIENT_URL_RE = /^\s*url\(\s*(?:["']\s*)?#([^)'"\s]+)(?:\s*["'])?\s*\)\s*$/;
function buildGradientTexture(gradient, shapePath, resolution = 256) {
  if (!gradient || !Array.isArray(gradient.stops) || gradient.stops.length === 0) return null;
  const worldTransform = shapePath.userData.transform;
  const isBBoxUnits = gradient.gradientUnits === "objectBoundingBox";
  let localBBox = null;
  if (isBBoxUnits) {
    localBBox = computeLocalBBox(shapePath, worldTransform);
    if (localBBox === null) return null;
  }
  function resolvePoint(x, y, out) {
    out.set(x, y, 1);
    if (gradient.gradientTransform) out.applyMatrix3(gradient.gradientTransform);
    if (isBBoxUnits) out.set(
      localBBox.minX + out.x * localBBox.width,
      localBBox.minY + out.y * localBBox.height,
      1
    );
    if (worldTransform) out.applyMatrix3(worldTransform);
  }
  const canvas = document.createElement("canvas");
  let textureMatrix;
  if (gradient.type === "linearGradient") {
    canvas.width = resolution;
    canvas.height = 1;
    const ctx = canvas.getContext("2d");
    const grad = ctx.createLinearGradient(0, 0, resolution, 0);
    addStops(grad, gradient.stops);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, resolution, 1);
    const p1 = new Vector3();
    const p2 = new Vector3();
    resolvePoint(gradient.x1, gradient.y1, p1);
    resolvePoint(gradient.x2, gradient.y2, p2);
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len2 = dx * dx + dy * dy || 1e-20;
    const a = dx / len2;
    const b = dy / len2;
    const c = -(a * p1.x + b * p1.y);
    textureMatrix = new Matrix3().set(
      a,
      b,
      c,
      0,
      0,
      0.5,
      0,
      0,
      1
    );
  } else {
    let cx = gradient.cx, cy = gradient.cy;
    let fx = gradient.fx, fy = gradient.fy;
    let r = gradient.r;
    if (gradient.gradientTransform) {
      const tmp = new Vector3();
      tmp.set(cx, cy, 1).applyMatrix3(gradient.gradientTransform);
      cx = tmp.x;
      cy = tmp.y;
      tmp.set(fx, fy, 1).applyMatrix3(gradient.gradientTransform);
      fx = tmp.x;
      fy = tmp.y;
    }
    if (isBBoxUnits) {
      cx = localBBox.minX + cx * localBBox.width;
      cy = localBBox.minY + cy * localBBox.height;
      fx = localBBox.minX + fx * localBBox.width;
      fy = localBBox.minY + fy * localBBox.height;
      r = r * Math.sqrt((localBBox.width * localBBox.width + localBBox.height * localBBox.height) / 2);
    }
    if (r <= 0) return null;
    canvas.width = resolution;
    canvas.height = resolution;
    const ctx = canvas.getContext("2d");
    const localMinX = cx - r;
    const localMinY = cy - r;
    const localSpan = 2 * r;
    const scale = resolution / localSpan;
    ctx.setTransform(scale, 0, 0, scale, -localMinX * scale, -localMinY * scale);
    const grad = ctx.createRadialGradient(fx, fy, 0, cx, cy, r);
    addStops(grad, gradient.stops);
    ctx.fillStyle = grad;
    ctx.fillRect(localMinX, localMinY, localSpan, localSpan);
    const inv = worldTransform ? worldTransform.clone().invert() : new Matrix3();
    const norm = new Matrix3().set(
      1 / localSpan,
      0,
      -localMinX / localSpan,
      0,
      1 / localSpan,
      -localMinY / localSpan,
      0,
      0,
      1
    );
    textureMatrix = norm.multiply(inv);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = COLOR_SPACE_SVG;
  texture.flipY = false;
  texture.matrixAutoUpdate = false;
  texture.matrix = textureMatrix;
  const wrap = gradient.spreadMethod === "reflect" ? MirroredRepeatWrapping : gradient.spreadMethod === "repeat" ? RepeatWrapping : ClampToEdgeWrapping;
  texture.wrapS = wrap;
  texture.wrapT = wrap;
  return texture;
}
function computeLocalBBox(shapePath, worldTransform) {
  const inv = worldTransform ? worldTransform.clone().invert() : null;
  const tmp = new Vector2();
  const box = new Box2();
  for (const subPath of shapePath.subPaths) {
    for (const p of subPath.getPoints()) {
      tmp.copy(p);
      if (inv) tmp.applyMatrix3(inv);
      box.expandByPoint(tmp);
    }
  }
  if (box.isEmpty()) return null;
  return { minX: box.min.x, minY: box.min.y, width: box.max.x - box.min.x, height: box.max.y - box.min.y };
}
function addStops(canvasGradient, stops) {
  const tmpColor = new Color();
  for (const stop of stops) {
    let css = stop.color;
    if (stop.opacity < 1) {
      tmpColor.setStyle(stop.color, COLOR_SPACE_SVG);
      const m = /rgb\(([^)]+)\)/.exec(tmpColor.getStyle(COLOR_SPACE_SVG));
      if (m) css = `rgba(${m[1]},${stop.opacity})`;
    }
    canvasGradient.addColorStop(Math.max(0, Math.min(1, stop.offset)), css);
  }
}

// src/app/componentes/model3d.ts
var _c0 = ["canvasContainer"];
function AppComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "div", 8);
    \u0275\u0275elementStart(2, "h4", 9);
    \u0275\u0275text(3, "Cargando Galer\xEDa y Escultura 3D...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 10);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r0.loadingProgress(), "% completado");
  }
}
function AppComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 3);
  }
}
function AppComponent_Conditional_4_Conditional_0_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function AppComponent_Conditional_4_Conditional_0_Conditional_10_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.triggerMobileInspect($event));
    });
    \u0275\u0275text(1, " Inspeccionar 3D ");
    \u0275\u0275elementEnd();
  }
}
function AppComponent_Conditional_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 12)(2, "span", 13);
    \u0275\u0275text(3, "Obra en Exhibici\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3", 14);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 15);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 16);
    \u0275\u0275element(9, "markdown", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, AppComponent_Conditional_4_Conditional_0_Conditional_10_Template, 2, 0, "button", 18);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const art_r3 = \u0275\u0275nextContext();
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(art_r3.title || "Obra Sin T\xEDtulo");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", art_r3.artist || "Artista An\xF3nimo", " (", art_r3.year || "S/F", ")");
    \u0275\u0275advance(2);
    \u0275\u0275property("data", art_r3.description || art_r3.content || "No details available.");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isMobile ? 10 : -1);
  }
}
function AppComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, AppComponent_Conditional_4_Conditional_0_Template, 11, 5, "div", 11);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional((ctx_r0.isLocked() || ctx_r0.isMobile) && !ctx_r0.isOrbiting && !ctx_r0.isLoading() ? 0 : -1);
  }
}
function AppComponent_Conditional_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 20)(1, "p", 22)(2, "strong");
    \u0275\u0275text(3, "Arrastrar:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Rotar \xA0|\xA0 ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6, "Rueda:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " Zoom \xA0|\xA0 ");
    \u0275\u0275elementStart(8, "strong");
    \u0275\u0275text(9, "ESC:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " Salir");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 23);
    \u0275\u0275listener("click", function AppComponent_Conditional_5_Conditional_1_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.exitOrbitMode());
    });
    \u0275\u0275text(12, "Volver");
    \u0275\u0275elementEnd()();
  }
}
function AppComponent_Conditional_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "span", 24)(2, "strong");
    \u0275\u0275text(3, "1 Dedo:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Rotar | ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6, "Pellizcar:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " Zoom");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 23);
    \u0275\u0275listener("click", function AppComponent_Conditional_5_Conditional_2_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.exitOrbitMode());
    });
    \u0275\u0275text(9, "Volver");
    \u0275\u0275elementEnd()();
  }
}
function AppComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275conditionalCreate(1, AppComponent_Conditional_5_Conditional_1_Template, 13, 0, "div", 20)(2, AppComponent_Conditional_5_Conditional_2_Template, 10, 0, "div", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.isMobile ? 1 : 2);
  }
}
function AppComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275listener("touchstart", function AppComponent_Conditional_6_Template_div_touchstart_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onTouchJoystickStart($event));
    })("touchmove", function AppComponent_Conditional_6_Template_div_touchmove_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onTouchJoystickMove($event));
    })("touchend", function AppComponent_Conditional_6_Template_div_touchend_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onTouchJoystickEnd($event));
    });
    \u0275\u0275elementStart(1, "div", 26);
    \u0275\u0275element(2, "div", 27);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngStyle", ctx_r0.joystickStyle);
  }
}
function AppComponent_Conditional_9_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "span", 35);
    \u0275\u0275text(2, "WASD / Flechas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 36);
    \u0275\u0275text(4, "Caminar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 34)(6, "span", 35);
    \u0275\u0275text(7, "Clic Izquierdo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 36);
    \u0275\u0275text(9, "Centrar e Inspeccionar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 34)(11, "span", 35);
    \u0275\u0275text(12, "Rueda Mouse");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 36);
    \u0275\u0275text(14, "Zoom en \xF3rbita");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 37)(16, "span", 35);
    \u0275\u0275text(17, "ESC / Clic Der.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 36);
    \u0275\u0275text(19, "Salir de \xF3rbita");
    \u0275\u0275elementEnd()();
  }
}
function AppComponent_Conditional_9_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "span", 35);
    \u0275\u0275text(2, "Joystick Izq.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 36);
    \u0275\u0275text(4, "Caminar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 34)(6, "span", 35);
    \u0275\u0275text(7, "Deslizar Der.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 36);
    \u0275\u0275text(9, "Mirar alrededor");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 37)(11, "span", 35);
    \u0275\u0275text(12, "Tocar Obra");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 36);
    \u0275\u0275text(14, "Inspeccionar 3D");
    \u0275\u0275elementEnd()();
  }
}
function AppComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275listener("click", function AppComponent_Conditional_9_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.startTour());
    });
    \u0275\u0275elementStart(1, "div", 29);
    \u0275\u0275element(2, "div", 30);
    \u0275\u0275elementStart(3, "h2", 31);
    \u0275\u0275text(4, "Museo Virtual de Arte");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 32);
    \u0275\u0275text(6, "Toca o haz clic en la pantalla para iniciar la experiencia.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 33);
    \u0275\u0275conditionalCreate(8, AppComponent_Conditional_9_Conditional_8_Template, 20, 0)(9, AppComponent_Conditional_9_Conditional_9_Template, 15, 0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275conditional(!ctx_r0.isMobile ? 8 : 9);
  }
}
var AppComponent = class _AppComponent {
  canvasContainer;
  worksParam = "";
  route = inject(ActivatedRoute);
  ngZone = inject(NgZone);
  http = inject(HttpClient);
  toastr = inject(ToastrService);
  isLocked = signal(false, ...ngDevMode ? [{ debugName: "isLocked" }] : []);
  activeArtwork = signal(null, ...ngDevMode ? [{ debugName: "activeArtwork" }] : []);
  artworkExhibits = signal([], ...ngDevMode ? [{ debugName: "artworkExhibits" }] : []);
  isLoading = signal(true, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  loadingProgress = signal(0, ...ngDevMode ? [{ debugName: "loadingProgress" }] : []);
  isMobile = false;
  isMobileActive = false;
  isOrbiting = false;
  scene;
  camera;
  renderer;
  pointerLockControls;
  orbitControls;
  raycaster = new Raycaster();
  animationFrameId = null;
  interactiveObjects = [];
  lastRaycastTime = 0;
  touchLookId = null;
  touchLookLast = { x: 0, y: 0 };
  cameraPitch = 0;
  cameraYaw = 0;
  joystickStyle = { transform: "translate(0px, 0px)" };
  joystickCenter = { x: 0, y: 0 };
  joystickMove = { x: 0, y: 0 };
  moveForward = false;
  moveBackward = false;
  moveLeft = false;
  moveRight = false;
  prevTime = performance.now();
  velocity = new Vector3();
  direction = new Vector3();
  forwardVector = new Vector3();
  sideVector = new Vector3();
  ngOnInit() {
    if (!this.worksParam) {
      this.worksParam = this.route.snapshot.paramMap.get("id") || "";
    }
    this.detectDeviceType();
    this.initThree();
    this.loadHdriEnvironment();
    this.initControls();
    this.buildMuseumArchitecture();
    this.fetchExhibitionData();
    window.addEventListener("resize", this.onWindowResize);
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
    document.addEventListener("click", this.onPointerClick);
    document.addEventListener("contextmenu", this.onRightClick);
    const canvasEl = this.canvasContainer.nativeElement;
    canvasEl.addEventListener("touchstart", this.onTouchStart, { passive: false });
    canvasEl.addEventListener("touchmove", this.onTouchMove, { passive: false });
    canvasEl.addEventListener("touchend", this.onTouchEnd);
    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }
  ngOnDestroy() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.pointerLockControls) {
      this.pointerLockControls.unlock();
      this.pointerLockControls.dispose();
    }
    if (document.exitPointerLock) {
      document.exitPointerLock();
    }
    window.removeEventListener("resize", this.onWindowResize);
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("keyup", this.onKeyUp);
    document.removeEventListener("click", this.onPointerClick);
    document.removeEventListener("contextmenu", this.onRightClick);
    if (this.scene) {
      this.scene.traverse((child) => {
        if (child.isMesh) {
          const mesh = child;
          if (mesh.geometry)
            mesh.geometry.dispose();
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((mat) => this.disposeMaterial(mat));
            } else {
              this.disposeMaterial(mesh.material);
            }
          }
        }
      });
    }
    if (this.orbitControls)
      this.orbitControls.dispose();
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.domElement.remove();
    }
  }
  disposeMaterial(material) {
    for (const key of Object.keys(material)) {
      const value = material[key];
      if (value && typeof value === "object" && "isTexture" in value) {
        value.dispose();
      }
    }
    material.dispose();
  }
  detectDeviceType() {
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  }
  initThree() {
    const container = this.canvasContainer.nativeElement;
    this.scene = new Scene();
    this.scene.background = new Color("#0c0c12");
    this.scene.fog = new FogExp2("#0c0c12", 0.03);
    this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(0, 1.7, 5);
    this.renderer = new WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    container.appendChild(this.renderer.domElement);
    const hemiLight = new HemisphereLight(16774634, 526368, 0.8);
    this.scene.add(hemiLight);
    const mainLight = new DirectionalLight(16774112, 1.5);
    mainLight.position.set(10, 15, 10);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 30;
    mainLight.shadow.bias = -5e-4;
    this.scene.add(mainLight);
    const fillLight = new DirectionalLight(8425648, 0.5);
    fillLight.position.set(-10, 10, -10);
    this.scene.add(fillLight);
  }
  loadHdriEnvironment() {
    const rgbeLoader = new RGBELoader();
    const pmremGenerator = new PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();
    rgbeLoader.load("music_hall_01_4k.hdr", (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      this.scene.environment = envMap;
      texture.dispose();
      pmremGenerator.dispose();
    }, void 0, () => {
      pmremGenerator.dispose();
    });
  }
  initControls() {
    this.pointerLockControls = new PointerLockControls(this.camera, document.body);
    this.pointerLockControls.addEventListener("lock", () => this.isLocked.set(true));
    this.pointerLockControls.addEventListener("unlock", () => {
      this.isLocked.set(false);
      if (!this.isOrbiting && !this.isMobile) {
        this.activeArtwork.set(null);
      }
    });
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.enabled = false;
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.05;
    this.orbitControls.minDistance = 0.5;
    this.orbitControls.maxDistance = 6;
  }
  buildMuseumArchitecture() {
    const floorGeometry = new PlaneGeometry(50, 50);
    const floorMaterial = new MeshStandardMaterial({
      color: 1579036,
      roughness: 0.15,
      metalness: 0.2
    });
    const floor = new Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);
  }
  createPedestal(x, z) {
    const baseGeo = new CylinderGeometry(0.7, 0.8, 1, 32);
    const baseMat = new MeshStandardMaterial({ color: 1184278, roughness: 0.3, metalness: 0.1 });
    const pedestal = new Mesh(baseGeo, baseMat);
    pedestal.position.set(x, 0.5, z);
    pedestal.castShadow = true;
    pedestal.receiveShadow = true;
    this.scene.add(pedestal);
    const spotlight = new SpotLight(16774102, 12, 12, Math.PI / 6, 0.4, 1);
    spotlight.position.set(x, 4.5, z + 1.2);
    spotlight.target = pedestal;
    spotlight.castShadow = true;
    spotlight.shadow.mapSize.width = 512;
    spotlight.shadow.mapSize.height = 512;
    spotlight.shadow.bias = -1e-4;
    this.scene.add(spotlight);
    this.scene.add(spotlight.target);
  }
  normalizeModelScale(object, targetSize = 1.2) {
    object.updateMatrixWorld(true);
    const box = new Box3().setFromObject(object);
    const size = new Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scaleFactor = targetSize / maxDim;
      object.scale.setScalar(scaleFactor);
      object.updateMatrixWorld(true);
      const updatedBox = new Box3().setFromObject(object);
      object.position.y -= updatedBox.min.y;
    }
  }
  fetchExhibitionData() {
    const gltfLoader = new GLTFLoader();
    const objLoader = new OBJLoader();
    this.http.get(`${environment.apiURL}/api/exhibitiones/${this.worksParam}`).subscribe({
      next: (data) => {
        const exhibits = data || [];
        this.artworkExhibits.set(exhibits);
        if (exhibits.length === 0) {
          this.loadCentralFallbackModel(gltfLoader);
          return;
        }
        const total = exhibits.length;
        const radius = 6.5;
        let loadedCount = 0;
        const checkCompletion = () => {
          loadedCount++;
          const percent = Math.round(loadedCount / total * 100);
          this.ngZone.run(() => this.loadingProgress.set(percent));
          if (loadedCount >= total) {
            setTimeout(() => {
              this.ngZone.run(() => this.isLoading.set(false));
            }, 300);
          }
        };
        exhibits.forEach((item, index) => {
          const angle = index / total * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          this.createPedestal(x, z);
          const relativePath = item.imageUrl || "new.glb";
          const modelUrl = relativePath.startsWith("http") ? relativePath : `${environment.apiURL}/${relativePath}`;
          const lowerUrl = modelUrl.toLowerCase();
          const isSvg3DIcon = lowerUrl.includes("badge-3d") || lowerUrl === "bi-3d";
          const isImage = /\.(jpg|jpeg|png|webp)$/i.test(lowerUrl);
          const isObj = lowerUrl.endsWith(".obj");
          if (isSvg3DIcon || lowerUrl.endsWith(".svg")) {
            this.loadBootstrap3DIcon(x, z, item, checkCompletion);
          } else if (isImage) {
            this.createImageArtwork(modelUrl, x, z, angle, item, checkCompletion);
          } else if (isObj) {
            objLoader.load(modelUrl, (object) => {
              this.normalizeModelScale(object, 1.2);
              object.position.add(new Vector3(x, 1, z));
              object.traverse((child) => {
                if (child.isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
                  child.userData = { artwork: item, parentModel: object };
                  this.interactiveObjects.push(child);
                }
              });
              this.scene.add(object);
              checkCompletion();
            }, void 0, (err) => {
              console.error(`Error al cargar el modelo OBJ: ${modelUrl}`, err);
              checkCompletion();
            });
          } else {
            gltfLoader.load(modelUrl, (gltf) => {
              const model = gltf.scene;
              this.normalizeModelScale(model, 1.2);
              model.position.add(new Vector3(x, 1, z));
              model.traverse((child) => {
                if (child.isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
                  child.userData = { artwork: item, parentModel: model };
                  this.interactiveObjects.push(child);
                }
              });
              this.scene.add(model);
              checkCompletion();
            }, void 0, (err) => {
              console.error(`Error al cargar el modelo GLTF/GLB: ${modelUrl}`, err);
              checkCompletion();
            });
          }
        });
      },
      error: (err) => {
        console.error("Error al obtener la galer\xEDa:", err);
        this.toastr.error("Error al cargar la galer\xEDa de muestras");
        this.loadCentralFallbackModel(gltfLoader);
      }
    });
  }
  loadBootstrap3DIcon(x, z, item, onComplete) {
    const svgLoader = new SVGLoader();
    const svgUrl = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/badge-3d.svg";
    svgLoader.load(svgUrl, (data) => {
      const paths = data.paths;
      const group = new Group();
      paths.forEach((path) => {
        const shapes = SVGLoader.createShapes(path);
        shapes.forEach((shape) => {
          const extrudeSettings = {
            depth: 0.15,
            bevelEnabled: true,
            bevelSegments: 3,
            steps: 1,
            bevelSize: 0.02,
            bevelThickness: 0.02
          };
          const geometry = new ExtrudeGeometry(shape, extrudeSettings);
          const material = new MeshStandardMaterial({
            color: 13938487,
            // Dorado de galería
            roughness: 0.2,
            metalness: 0.8
          });
          const mesh = new Mesh(geometry, material);
          group.add(mesh);
        });
      });
      const box = new Box3().setFromObject(group);
      const center = new Vector3();
      box.getCenter(center);
      group.position.sub(center);
      group.scale.y *= -1;
      group.scale.setScalar(2.2);
      group.position.set(x, 1.3, z);
      group.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.userData = { artwork: item, parentModel: group };
          this.interactiveObjects.push(child);
        }
      });
      this.scene.add(group);
      onComplete();
    }, void 0, (err) => {
      console.error("Error al cargar el icono SVG 3D:", err);
      onComplete();
    });
  }
  loadCentralFallbackModel(loader) {
    this.createPedestal(0, -3);
    loader.load("new.glb", (gltf) => {
      const model = gltf.scene;
      this.normalizeModelScale(model, 1.2);
      model.position.add(new Vector3(0, 1, -3));
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.userData = {
            artwork: {
              title: "Obra Principal",
              artist: "Galer\xEDa Virtual",
              year: "2026",
              description: "Exhibici\xF3n por defecto del museo."
            },
            parentModel: model
          };
          this.interactiveObjects.push(child);
        }
      });
      this.scene.add(model);
      this.ngZone.run(() => this.isLoading.set(false));
    }, void 0, () => {
      this.ngZone.run(() => this.isLoading.set(false));
    });
  }
  createImageArtwork(imageUrl, x, z, angle, item, onComplete) {
    const textureLoader = new TextureLoader();
    textureLoader.load(imageUrl, (texture) => {
      texture.colorSpace = SRGBColorSpace;
      const imgWidth = texture.image.width || 1;
      const imgHeight = texture.image.height || 1;
      const aspectRatio = imgWidth / imgHeight;
      let planeWidth = 1.4;
      let planeHeight = planeWidth / aspectRatio;
      if (planeHeight > 1.6) {
        planeHeight = 1.6;
        planeWidth = planeHeight * aspectRatio;
      }
      const group = new Group();
      const frameGeo = new BoxGeometry(planeWidth + 0.1, planeHeight + 0.1, 0.05);
      const frameMat = new MeshStandardMaterial({ color: 2039587, roughness: 0.4 });
      const frame = new Mesh(frameGeo, frameMat);
      frame.position.set(0, 2.3, 0);
      frame.castShadow = true;
      group.add(frame);
      const planeGeo = new PlaneGeometry(planeWidth, planeHeight);
      const planeMat = new MeshBasicMaterial({ map: texture });
      const plane = new Mesh(planeGeo, planeMat);
      plane.position.set(0, 2.3, 0.03);
      plane.userData = { artwork: item, parentModel: group };
      frame.userData = { artwork: item, parentModel: group };
      this.interactiveObjects.push(frame);
      this.interactiveObjects.push(plane);
      group.add(plane);
      group.position.set(x, 0, z);
      group.lookAt(0, 2.3, 0);
      this.scene.add(group);
      onComplete();
    }, void 0, (err) => {
      console.error(`Error al cargar la imagen de la obra: ${imageUrl}`, err);
      onComplete();
    });
  }
  startTour() {
    if (this.isMobile) {
      this.isMobileActive = true;
      const euler = new Euler().setFromQuaternion(this.camera.quaternion, "YXZ");
      this.cameraYaw = euler.y;
      this.cameraPitch = euler.x;
    } else {
      this.lockControls();
    }
  }
  lockControls() {
    if (!this.isOrbiting && !this.isMobile) {
      this.pointerLockControls.lock();
    }
  }
  onTouchStart = (event) => {
    if (this.isOrbiting || this.isLoading())
      return;
    if (this.isMobileActive && !this.isOrbiting) {
      for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = event.changedTouches[i];
        if (touch.clientX > window.innerWidth / 2 && this.touchLookId === null) {
          this.touchLookId = touch.identifier;
          this.touchLookLast = { x: touch.clientX, y: touch.clientY };
        }
      }
    }
  };
  onTouchMove = (event) => {
    if (this.isOrbiting || this.isLoading())
      return;
    if (this.isMobileActive && this.touchLookId !== null) {
      for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = event.changedTouches[i];
        if (touch.identifier === this.touchLookId) {
          const deltaX = touch.clientX - this.touchLookLast.x;
          const deltaY = touch.clientY - this.touchLookLast.y;
          this.cameraYaw -= deltaX * 4e-3;
          this.cameraPitch -= deltaY * 4e-3;
          this.cameraPitch = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, this.cameraPitch));
          const euler = new Euler(this.cameraPitch, this.cameraYaw, 0, "YXZ");
          this.camera.quaternion.setFromEuler(euler);
          this.touchLookLast = { x: touch.clientX, y: touch.clientY };
        }
      }
    }
  };
  onTouchEnd = (event) => {
    if (this.isOrbiting)
      return;
    for (let i = 0; i < event.changedTouches.length; i++) {
      if (event.changedTouches[i].identifier === this.touchLookId) {
        this.touchLookId = null;
      }
    }
  };
  onTouchJoystickStart(event) {
    if (this.isLoading())
      return;
    const touch = event.touches[0];
    this.joystickCenter = { x: touch.clientX, y: touch.clientY };
  }
  onTouchJoystickMove(event) {
    if (this.isLoading() || !this.joystickCenter.x)
      return;
    const touch = event.touches[0];
    const maxRadius = 40;
    let deltaX = touch.clientX - this.joystickCenter.x;
    let deltaY = touch.clientY - this.joystickCenter.y;
    const dist = Math.hypot(deltaX, deltaY);
    if (dist > maxRadius) {
      deltaX = deltaX / dist * maxRadius;
      deltaY = deltaY / dist * maxRadius;
    }
    this.joystickStyle = { transform: `translate(${deltaX}px, ${deltaY}px)` };
    this.joystickMove = { x: deltaX / maxRadius, y: deltaY / maxRadius };
  }
  onTouchJoystickEnd(event) {
    this.joystickStyle = { transform: "translate(0px, 0px)" };
    this.joystickMove = { x: 0, y: 0 };
    this.joystickCenter = { x: 0, y: 0 };
  }
  onPointerClick = (event) => {
    if (this.isOrbiting || this.isLoading())
      return;
    if (!this.pointerLockControls.isLocked)
      return;
    this.raycaster.setFromCamera(new Vector2(0, 0), this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveObjects, true);
    if (intersects.length > 0 && intersects[0].distance < 6) {
      const hitMesh = intersects[0].object;
      const rootModel = hitMesh.userData["parentModel"] || hitMesh;
      this.startOrbitMode(rootModel);
    }
  };
  triggerMobileInspect(event) {
    if (this.isLoading())
      return;
    event.stopPropagation();
    this.raycaster.setFromCamera(new Vector2(0, 0), this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveObjects, true);
    if (intersects.length > 0) {
      const rootModel = intersects[0].object.userData["parentModel"] || intersects[0].object;
      this.startOrbitMode(rootModel);
    }
  }
  onRightClick = (event) => {
    if (this.isOrbiting) {
      event.preventDefault();
      this.exitOrbitMode();
    }
  };
  startOrbitMode(object) {
    this.isOrbiting = true;
    if (this.pointerLockControls.isLocked) {
      this.pointerLockControls.unlock();
    }
    const box = new Box3().setFromObject(object);
    const center = new Vector3();
    box.getCenter(center);
    this.orbitControls.enabled = true;
    this.orbitControls.target.copy(center);
    this.camera.position.set(center.x, center.y + 0.3, center.z + 2.5);
    this.orbitControls.update();
  }
  exitOrbitMode() {
    this.isOrbiting = false;
    this.orbitControls.enabled = false;
    if (!this.isMobile) {
      this.lockControls();
    }
  }
  onKeyDown = (event) => {
    if (this.isLoading())
      return;
    if (event.code === "Escape") {
      if (this.isOrbiting) {
        this.exitOrbitMode();
      } else if (this.pointerLockControls.isLocked) {
        this.pointerLockControls.unlock();
      }
      return;
    }
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        this.moveForward = true;
        break;
      case "ArrowLeft":
      case "KeyA":
        this.moveLeft = true;
        break;
      case "ArrowDown":
      case "KeyS":
        this.moveBackward = true;
        break;
      case "ArrowRight":
      case "KeyD":
        this.moveRight = true;
        break;
    }
  };
  onKeyUp = (event) => {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        this.moveForward = false;
        break;
      case "ArrowLeft":
      case "KeyA":
        this.moveLeft = false;
        break;
      case "ArrowDown":
      case "KeyS":
        this.moveBackward = false;
        break;
      case "ArrowRight":
      case "KeyD":
        this.moveRight = false;
        break;
    }
  };
  onWindowResize = () => {
    this.detectDeviceType();
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };
  checkArtworkInteractions(time) {
    if (this.isOrbiting || this.isLoading())
      return;
    if (time - this.lastRaycastTime < 100)
      return;
    this.lastRaycastTime = time;
    this.raycaster.setFromCamera(new Vector2(0, 0), this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveObjects, true);
    if (intersects.length > 0 && intersects[0].distance < 6) {
      const data = intersects[0].object.userData["artwork"];
      if (data && this.activeArtwork() !== data) {
        this.ngZone.run(() => this.activeArtwork.set(data));
      }
    } else {
      if (this.activeArtwork() !== null) {
        this.ngZone.run(() => this.activeArtwork.set(null));
      }
    }
  }
  animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    const time = performance.now();
    const delta = (time - this.prevTime) / 1e3;
    this.prevTime = time;
    if (this.isLoading()) {
      this.renderer.render(this.scene, this.camera);
      return;
    }
    if (this.isOrbiting) {
      this.orbitControls.update();
    } else if (this.pointerLockControls.isLocked || this.isMobileActive) {
      let moveZ = Number(this.moveForward) - Number(this.moveBackward);
      let moveX = Number(this.moveRight) - Number(this.moveLeft);
      if (this.isMobile && (this.joystickMove.x !== 0 || this.joystickMove.y !== 0)) {
        moveX = this.joystickMove.x;
        moveZ = -this.joystickMove.y;
      }
      this.direction.z = moveZ;
      this.direction.x = moveX;
      if (this.direction.lengthSq() > 0)
        this.direction.normalize();
      const walkSpeed = 25;
      this.velocity.x = -this.direction.x * walkSpeed;
      this.velocity.z = -this.direction.z * walkSpeed;
      if (this.pointerLockControls.isLocked) {
        this.pointerLockControls.moveForward(-this.velocity.z * delta);
        this.pointerLockControls.moveRight(-this.velocity.x * delta);
      } else if (this.isMobileActive) {
        this.forwardVector.set(0, 0, -1).applyQuaternion(this.camera.quaternion);
        this.forwardVector.y = 0;
        this.forwardVector.normalize();
        this.sideVector.set(1, 0, 0).applyQuaternion(this.camera.quaternion);
        this.sideVector.y = 0;
        this.sideVector.normalize();
        this.camera.position.addScaledVector(this.forwardVector, -this.velocity.z * delta);
        this.camera.position.addScaledVector(this.sideVector, -this.velocity.x * delta);
      }
      const maxLimit = 23;
      this.camera.position.x = Math.max(-maxLimit, Math.min(maxLimit, this.camera.position.x));
      this.camera.position.z = Math.max(-maxLimit, Math.min(maxLimit, this.camera.position.z));
      this.camera.position.y = 1.7;
      this.checkArtworkInteractions(time);
    }
    this.renderer.render(this.scene, this.camera);
  };
  static \u0275fac = function AppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], viewQuery: function AppComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.canvasContainer = _t.first);
    }
  }, inputs: { worksParam: "worksParam" }, decls: 10, vars: 6, consts: [["canvasContainer", ""], [1, "museum-container", "position-relative", "w-100", "h-100", "overflow-hidden"], [1, "loading-overlay", "position-absolute", "w-100", "h-100", "d-flex", "flex-column", "justify-content-center", "align-items-center"], [1, "crosshair", "position-absolute", "rounded-circle"], [1, "orbit-controls-overlay", "card", "bg-dark", "text-light", "border-warning", "shadow", "px-3", "py-2", "rounded-pill"], [1, "touch-joystick-zone", "position-absolute"], [1, "canvas-wrapper", "w-100", "h-100"], [1, "overlay", "position-absolute", "w-100", "h-100", "d-flex", "justify-content-center", "align-items-center"], ["role", "status", 1, "spinner-border", "text-warning", "mb-3", 2, "width", "3rem", "height", "3rem"], [1, "text-white", "font-weight-bold"], [1, "text-info", "small", "mt-1"], [1, "artwork-card", "card", "shadow-lg", "text-white", "bg-dark", "border-secondary"], [1, "card-body", "p-3", "text-center"], [1, "badge", "badge-warning", "mb-2", "text-dark", "font-weight-bold", "px-2", "py-1"], [1, "card-title", "h5", "mb-1", "text-light"], [1, "subtitle", "text-muted", "font-italic", "mb-2", "small"], [1, "markdown-scroll-container", "text-left"], [3, "data"], [1, "btn", "btn-warning", "btn-sm", "btn-block", "rounded-pill", "font-weight-bold", "mt-2"], [1, "btn", "btn-warning", "btn-sm", "btn-block", "rounded-pill", "font-weight-bold", "mt-2", 3, "click"], [1, "d-flex", "align-items-center", "justify-content-between", "gap-3"], [1, "d-flex", "align-items-center", "justify-content-between", "w-100", "gap-3"], [1, "mb-0", "small"], [1, "btn", "btn-danger", "btn-sm", "rounded-pill", "py-0", "px-2", "font-weight-bold", 3, "click"], [1, "small", "mb-0"], [1, "touch-joystick-zone", "position-absolute", 3, "touchstart", "touchmove", "touchend"], [1, "joystick-base", "rounded-circle", "border", "border-light", "position-relative"], [1, "joystick-stick", "rounded-circle", "position-absolute", 3, "ngStyle"], [1, "overlay", "position-absolute", "w-100", "h-100", "d-flex", "justify-content-center", "align-items-center", 3, "click"], [1, "instructions-card", "card", "bg-dark", "text-white", "border-secondary", "shadow-lg", "p-4"], [1, "museum-logo", "mb-2"], [1, "h4", "font-weight-bold", "text-warning"], [1, "small", "text-muted"], [1, "controls-hint", "bg-secondary", "text-left", "p-3", "rounded", "mt-2", "border", "border-dark"], [1, "hint-item", "d-flex", "justify-content-between", "align-items-center", "mb-1"], [1, "key", "badge", "badge-dark", "text-warning", "border", "border-warning"], [1, "small"], [1, "hint-item", "d-flex", "justify-content-between", "align-items-center"]], template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275element(1, "app-navbar");
      \u0275\u0275conditionalCreate(2, AppComponent_Conditional_2_Template, 6, 1, "div", 2);
      \u0275\u0275conditionalCreate(3, AppComponent_Conditional_3_Template, 1, 0, "div", 3);
      \u0275\u0275conditionalCreate(4, AppComponent_Conditional_4_Template, 1, 1);
      \u0275\u0275conditionalCreate(5, AppComponent_Conditional_5_Template, 3, 1, "div", 4);
      \u0275\u0275conditionalCreate(6, AppComponent_Conditional_6_Template, 3, 1, "div", 5);
      \u0275\u0275element(7, "div", 6, 0);
      \u0275\u0275conditionalCreate(9, AppComponent_Conditional_9_Template, 10, 1, "div", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_3_0;
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isLoading() ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((ctx.isLocked() || ctx.isMobile) && !ctx.isOrbiting && !ctx.isLoading() ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_3_0 = ctx.activeArtwork()) ? 4 : -1, tmp_3_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isOrbiting ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isMobile && !ctx.isOrbiting && ctx.isMobileActive && !ctx.isLoading() ? 6 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(!ctx.isLocked() && !ctx.isOrbiting && !ctx.isMobileActive && !ctx.isLoading() ? 9 : -1);
    }
  }, dependencies: [CommonModule, NgStyle, MarkdownComponent, Navbar], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100vw;\n  height: 100vh;\n  margin: 0;\n  overflow: hidden;\n  font-family:\n    "Segoe UI",\n    Roboto,\n    Helvetica,\n    Arial,\n    sans-serif;\n  touch-action: none;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.museum-container[_ngcontent-%COMP%] {\n  background: #0d0d11;\n  pointer-events: none;\n}\n.canvas-wrapper[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: auto;\n  z-index: 1;\n}\n.loading-overlay[_ngcontent-%COMP%] {\n  background: rgba(10, 10, 14, 0.95);\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  z-index: 100;\n  pointer-events: auto;\n}\n.crosshair[_ngcontent-%COMP%] {\n  top: 50%;\n  left: 50%;\n  width: 8px;\n  height: 8px;\n  background-color: rgba(255, 255, 255, 0.8);\n  border: 1px solid rgba(0, 0, 0, 0.5);\n  transform: translate(-50%, -50%);\n  pointer-events: none;\n  z-index: 5;\n}\n.artwork-card[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 30px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: rgba(18, 18, 24, 0.92) !important;\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  max-width: 420px;\n  width: 85%;\n  z-index: 10;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-out;\n  pointer-events: auto;\n}\n.markdown-scroll-container[_ngcontent-%COMP%] {\n  max-height: 140px;\n  overflow-y: auto;\n  padding-right: 6px;\n  margin-top: 8px;\n  font-size: 0.9rem;\n}\n.markdown-scroll-container[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 4px;\n}\n.markdown-scroll-container[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(212, 175, 55, 0.6);\n  border-radius: 4px;\n}\n.orbit-controls-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 95px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: rgba(18, 18, 24, 0.85) !important;\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  z-index: 12;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-out;\n  pointer-events: auto;\n  white-space: nowrap;\n}\n.overlay[_ngcontent-%COMP%] {\n  background: rgba(10, 10, 14, 0.88);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  cursor: pointer;\n  z-index: 20;\n  pointer-events: auto;\n}\n.instructions-card[_ngcontent-%COMP%] {\n  background: #16161e !important;\n  width: 400px;\n  max-width: 90%;\n  text-align: center;\n}\n.controls-hint[_ngcontent-%COMP%] {\n  background: #1f1f2c !important;\n  font-size: 12px;\n}\n.touch-joystick-zone[_ngcontent-%COMP%] {\n  bottom: 30px;\n  left: 30px;\n  width: 120px;\n  height: 120px;\n  z-index: 15;\n  touch-action: none;\n  pointer-events: auto;\n}\n.joystick-base[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background: rgba(255, 255, 255, 0.1);\n}\n.joystick-stick[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  background: rgba(212, 175, 55, 0.7);\n  top: 35px;\n  left: 35px;\n  transform: translate(0px, 0px);\n  pointer-events: none;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translate(-50%, 10px);\n  }\n  to {\n    opacity: 1;\n    transform: translate(-50%, 0);\n  }\n}\n/*# sourceMappingURL=model3d.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppComponent, [{
    type: Component,
    args: [{ selector: "app-root", standalone: true, imports: [CommonModule, MarkdownComponent, Navbar], template: `
    <div class="museum-container position-relative w-100 h-100 overflow-hidden">
      <!-- Navbar superior -->
      <app-navbar />

      <!-- Loading Overlay -->
      @if (isLoading()) {
        <div class="loading-overlay position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center">
          <div class="spinner-border text-warning mb-3" role="status" style="width: 3rem; height: 3rem;">
            <!-- <span class="sr-only">Cargando...</span> -->
          </div>
          <h4 class="text-white font-weight-bold">Cargando Galer\xEDa y Escultura 3D...</h4>
          <p class="text-info small mt-1">{{ loadingProgress() }}% completado</p>
        </div>
      }

      <!-- Crosshair for gallery aiming -->
      @if ((isLocked() || isMobile) && !isOrbiting && !isLoading()) {
        <div class="crosshair position-absolute rounded-circle"></div>
      }

      <!-- Artwork Details Card -->
      @if (activeArtwork(); as art) {
        @if ((isLocked() || isMobile) && !isOrbiting && !isLoading()) {
          <div class="artwork-card card shadow-lg text-white bg-dark border-secondary">
            <div class="card-body p-3 text-center">
              <span class="badge badge-warning mb-2 text-dark font-weight-bold px-2 py-1">Obra en Exhibici\xF3n</span>
              <h3 class="card-title h5 mb-1 text-light">{{ art.title || 'Obra Sin T\xEDtulo' }}</h3>
              <p class="subtitle text-muted font-italic mb-2 small">{{ art.artist || 'Artista An\xF3nimo' }} ({{ art.year || 'S/F' }})</p>
              <div class="markdown-scroll-container text-left">
                <markdown [data]="art.description || art.content || 'No details available.'"></markdown>
              </div>
              @if (isMobile) {
                <button class="btn btn-warning btn-sm btn-block rounded-pill font-weight-bold mt-2" (click)="triggerMobileInspect($event)">
                  Inspeccionar 3D
                </button>
              }
            </div>
          </div>
        }
      }
      
      <!-- Orbit Mode Helper Overlay -->
      @if (isOrbiting) {
        <div class="orbit-controls-overlay card bg-dark text-light border-warning shadow px-3 py-2 rounded-pill">
          @if (!isMobile) {
            <div class="d-flex align-items-center justify-content-between gap-3">
              <p class="mb-0 small"><strong>Arrastrar:</strong> Rotar &nbsp;|&nbsp; <strong>Rueda:</strong> Zoom &nbsp;|&nbsp; <strong>ESC:</strong> Salir</p>
              <button class="btn btn-danger btn-sm rounded-pill py-0 px-2 font-weight-bold" (click)="exitOrbitMode()">Volver</button>
            </div>
          } @else {
            <div class="d-flex align-items-center justify-content-between w-100 gap-3">
              <span class="small mb-0"><strong>1 Dedo:</strong> Rotar | <strong>Pellizcar:</strong> Zoom</span>
              <button class="btn btn-danger btn-sm rounded-pill py-0 px-2 font-weight-bold" (click)="exitOrbitMode()">Volver</button>
            </div>
          }
        </div>
      }

      <!-- On-Screen Virtual Touch Joystick (Mobile Only) -->
      @if (isMobile && !isOrbiting && isMobileActive && !isLoading()) {
        <div class="touch-joystick-zone position-absolute" 
             (touchstart)="onTouchJoystickStart($event)" 
             (touchmove)="onTouchJoystickMove($event)" 
             (touchend)="onTouchJoystickEnd($event)">
          <div class="joystick-base rounded-circle border border-light position-relative">
            <div class="joystick-stick rounded-circle position-absolute" [ngStyle]="joystickStyle"></div>
          </div>
        </div>
      }

      <!-- 3D Canvas Container -->
      <div #canvasContainer class="canvas-wrapper w-100 h-100"></div>

      <!-- Welcome / Start Overlay -->
      @if (!isLocked() && !isOrbiting && !isMobileActive && !isLoading()) {
        <div class="overlay position-absolute w-100 h-100 d-flex justify-content-center align-items-center" (click)="startTour()">
          <div class="instructions-card card bg-dark text-white border-secondary shadow-lg p-4">
            <div class="museum-logo mb-2"></div>
            <h2 class="h4 font-weight-bold text-warning">Museo Virtual de Arte</h2>
            <p class="small text-muted">Toca o haz clic en la pantalla para iniciar la experiencia.</p>
            
            <div class="controls-hint bg-secondary text-left p-3 rounded mt-2 border border-dark">
              @if (!isMobile) {
                <div class="hint-item d-flex justify-content-between align-items-center mb-1"><span class="key badge badge-dark text-warning border border-warning">WASD / Flechas</span><span class="small">Caminar</span></div>
                <div class="hint-item d-flex justify-content-between align-items-center mb-1"><span class="key badge badge-dark text-warning border border-warning">Clic Izquierdo</span><span class="small">Centrar e Inspeccionar</span></div>
                <div class="hint-item d-flex justify-content-between align-items-center mb-1"><span class="key badge badge-dark text-warning border border-warning">Rueda Mouse</span><span class="small">Zoom en \xF3rbita</span></div>
                <div class="hint-item d-flex justify-content-between align-items-center"><span class="key badge badge-dark text-warning border border-warning">ESC / Clic Der.</span><span class="small">Salir de \xF3rbita</span></div>
              } @else {
                <div class="hint-item d-flex justify-content-between align-items-center mb-1"><span class="key badge badge-dark text-warning border border-warning">Joystick Izq.</span><span class="small">Caminar</span></div>
                <div class="hint-item d-flex justify-content-between align-items-center mb-1"><span class="key badge badge-dark text-warning border border-warning">Deslizar Der.</span><span class="small">Mirar alrededor</span></div>
                <div class="hint-item d-flex justify-content-between align-items-center"><span class="key badge badge-dark text-warning border border-warning">Tocar Obra</span><span class="small">Inspeccionar 3D</span></div>
              }
            </div>
          </div>
        </div>
      }
    </div>
  `, styles: ['/* angular:styles/component:css;80113300ee071a36461e37c26576744fdd293bbdad731ca1123ed090f864c80e;/home/linuxlite/WebMEAN/src/app/componentes/model3d.ts */\n:host {\n  display: block;\n  width: 100vw;\n  height: 100vh;\n  margin: 0;\n  overflow: hidden;\n  font-family:\n    "Segoe UI",\n    Roboto,\n    Helvetica,\n    Arial,\n    sans-serif;\n  touch-action: none;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.museum-container {\n  background: #0d0d11;\n  pointer-events: none;\n}\n.canvas-wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: auto;\n  z-index: 1;\n}\n.loading-overlay {\n  background: rgba(10, 10, 14, 0.95);\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  z-index: 100;\n  pointer-events: auto;\n}\n.crosshair {\n  top: 50%;\n  left: 50%;\n  width: 8px;\n  height: 8px;\n  background-color: rgba(255, 255, 255, 0.8);\n  border: 1px solid rgba(0, 0, 0, 0.5);\n  transform: translate(-50%, -50%);\n  pointer-events: none;\n  z-index: 5;\n}\n.artwork-card {\n  position: absolute;\n  bottom: 30px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: rgba(18, 18, 24, 0.92) !important;\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  max-width: 420px;\n  width: 85%;\n  z-index: 10;\n  animation: fadeIn 0.3s ease-out;\n  pointer-events: auto;\n}\n.markdown-scroll-container {\n  max-height: 140px;\n  overflow-y: auto;\n  padding-right: 6px;\n  margin-top: 8px;\n  font-size: 0.9rem;\n}\n.markdown-scroll-container::-webkit-scrollbar {\n  width: 4px;\n}\n.markdown-scroll-container::-webkit-scrollbar-thumb {\n  background: rgba(212, 175, 55, 0.6);\n  border-radius: 4px;\n}\n.orbit-controls-overlay {\n  position: absolute;\n  top: 95px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: rgba(18, 18, 24, 0.85) !important;\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  z-index: 12;\n  animation: fadeIn 0.3s ease-out;\n  pointer-events: auto;\n  white-space: nowrap;\n}\n.overlay {\n  background: rgba(10, 10, 14, 0.88);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  cursor: pointer;\n  z-index: 20;\n  pointer-events: auto;\n}\n.instructions-card {\n  background: #16161e !important;\n  width: 400px;\n  max-width: 90%;\n  text-align: center;\n}\n.controls-hint {\n  background: #1f1f2c !important;\n  font-size: 12px;\n}\n.touch-joystick-zone {\n  bottom: 30px;\n  left: 30px;\n  width: 120px;\n  height: 120px;\n  z-index: 15;\n  touch-action: none;\n  pointer-events: auto;\n}\n.joystick-base {\n  width: 100%;\n  height: 100%;\n  background: rgba(255, 255, 255, 0.1);\n}\n.joystick-stick {\n  width: 50px;\n  height: 50px;\n  background: rgba(212, 175, 55, 0.7);\n  top: 35px;\n  left: 35px;\n  transform: translate(0px, 0px);\n  pointer-events: none;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translate(-50%, 10px);\n  }\n  to {\n    opacity: 1;\n    transform: translate(-50%, 0);\n  }\n}\n/*# sourceMappingURL=model3d.css.map */\n'] }]
  }], null, { canvasContainer: [{
    type: ViewChild,
    args: ["canvasContainer", { static: true }]
  }], worksParam: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/componentes/model3d.ts", lineNumber: 181 });
})();
export {
  AppComponent
};
//# sourceMappingURL=chunk-MOLHPF4W.js.map
