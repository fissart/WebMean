import './polyfills.server.mjs';
import {
  MathRendererDirective
} from "./chunk-ROD4NZUR.mjs";
import {
  OBJLoader
} from "./chunk-TA25AXBB.mjs";
import {
  MarkdownComponent
} from "./chunk-ZSE5J3GM.mjs";
import {
  GLTFLoader
} from "./chunk-5E2DRCFD.mjs";
import {
  CKEditorComponent,
  CKEditorModule,
  require_ckeditor
} from "./chunk-ME3KNJBH.mjs";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  RangeValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-GIGPJXHS.mjs";
import {
  ToastrService
} from "./chunk-UOBCH2C2.mjs";
import {
  environment
} from "./chunk-SF7RHBD5.mjs";
import {
  Navbar
} from "./chunk-QGEJ4V6S.mjs";
import "./chunk-NIVJ4KPM.mjs";
import {
  OrbitControls
} from "./chunk-MD2XOYTT.mjs";
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  AmbientLight,
  Box3,
  BufferAttribute,
  BufferGeometry,
  Color,
  ColorManagement,
  DirectionalLight,
  FileLoader,
  InterleavedBuffer,
  InterleavedBufferAttribute,
  LinearSRGBColorSpace,
  Loader,
  LoaderUtils,
  MeshNormalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  SRGBColorSpace,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer
} from "./chunk-ULG7G2AN.mjs";
import {
  ActivatedRoute,
  Router
} from "./chunk-IESDD46D.mjs";
import {
  HttpClient,
  HttpEventType,
  HttpRequest,
  HttpResponse
} from "./chunk-JRMDAGFP.mjs";
import {
  CommonModule,
  isPlatformBrowser
} from "./chunk-TDOK3CTI.mjs";
import {
  Component,
  Injectable,
  Input,
  PLATFORM_ID,
  ViewChild,
  computed,
  effect,
  inject,
  input,
  setClassMetadata,
  signal,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuerySignal
} from "./chunk-GYAE75W3.mjs";
import {
  __toESM
} from "./chunk-TB3YAHZW.mjs";

// src/app/componentes/exhibicionfiles.ts
var import_ckeditor5_build_classic = __toESM(require_ckeditor());

// node_modules/three/examples/jsm/loaders/DRACOLoader.js
var _taskCache = /* @__PURE__ */ new WeakMap();
var WASM_BIN_URL = new URL("../libs/draco/draco_decoder.wasm", import.meta.url).toString();
var WASM_JS_URL = new URL("../libs/draco/draco_wasm_wrapper.js", import.meta.url).toString();
var JS_URL = new URL("../libs/draco/draco_decoder.js", import.meta.url).toString();
var DRACO_GLTF_CONFIG = {
  js: new URL("../libs/draco/gltf/draco_wasm_wrapper.js", import.meta.url).toString(),
  wasm: new URL("../libs/draco/gltf/draco_decoder.wasm", import.meta.url).toString()
};
var DRACOLoader = class extends Loader {
  /**
   * Constructs a new Draco loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(manager) {
    super(manager);
    this.decoderPaths = {
      js: WASM_JS_URL,
      wasm: WASM_BIN_URL,
      dep_js: JS_URL
    };
    this.decoderConfig = {};
    this.decoderBinary = null;
    this.decoderPending = null;
    this.workerLimit = 4;
    this.workerPool = [];
    this.workerNextTaskID = 1;
    this.workerSourceURL = "";
    this.defaultAttributeIDs = {
      position: "POSITION",
      normal: "NORMAL",
      color: "COLOR",
      uv: "TEX_COORD"
    };
    this.defaultAttributeTypes = {
      position: "Float32Array",
      normal: "Float32Array",
      color: "Float32Array",
      uv: "Float32Array"
    };
  }
  /**
   * Provides configuration for the decoder libraries. Configuration cannot be changed after decoding begins.
   *
   * @param {string|{js:string, wasm:string}} path - The decoder path, or a config object with explicit URLs for each decoder file.
   * @return {DRACOLoader} A reference to this loader.
   */
  setDecoderPath(path) {
    const { decoderPaths } = this;
    if (typeof path === "object") {
      decoderPaths.js = path.js;
      decoderPaths.wasm = path.wasm;
      decoderPaths.dep_js = null;
    } else {
      decoderPaths.js = LoaderUtils.resolveURL("draco_wasm_wrapper.js", path);
      decoderPaths.wasm = LoaderUtils.resolveURL("draco_decoder.wasm", path);
      decoderPaths.dep_js = LoaderUtils.resolveURL("draco_decoder.js", path);
    }
    return this;
  }
  /**
   * Provides configuration for the decoder libraries. Configuration cannot be changed after decoding begins.
   *
   * @deprecated
   * @param {{type:('js'|'wasm')}} config - The decoder config.
   * @return {DRACOLoader} A reference to this loader.
   */
  setDecoderConfig(config) {
    console.warn("THREE.DRACOLoader: setDecoderConfig to has been deprecated and will be removed in r194.");
    this.decoderConfig = config;
    return this;
  }
  /**
   * Sets the maximum number of Web Workers to be used during decoding.
   * A lower limit may be preferable if workers are also for other tasks in the application.
   *
   * @param {number} workerLimit - The worker limit.
   * @return {DRACOLoader} A reference to this loader.
   */
  setWorkerLimit(workerLimit) {
    this.workerLimit = workerLimit;
    return this;
  }
  /**
   * Starts loading from the given URL and passes the loaded Draco asset
   * to the `onLoad()` callback.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(BufferGeometry)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  load(url, onLoad, onProgress, onError) {
    const loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setResponseType("arraybuffer");
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);
    loader.load(url, (buffer) => {
      this.parse(buffer, onLoad, onError);
    }, onProgress, onError);
  }
  /**
   * Parses the given Draco data.
   *
   * @param {ArrayBuffer} buffer - The raw Draco data as an array buffer.
   * @param {function(BufferGeometry)} onLoad - Executed when the loading/parsing process has been finished.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  parse(buffer, onLoad, onError = () => {
  }) {
    this.decodeDracoFile(buffer, onLoad, null, null, SRGBColorSpace, onError).catch(onError);
  }
  //
  decodeDracoFile(buffer, callback, attributeIDs, attributeTypes, vertexColorSpace = LinearSRGBColorSpace, onError = () => {
  }) {
    const taskConfig = {
      attributeIDs: attributeIDs || this.defaultAttributeIDs,
      attributeTypes: attributeTypes || this.defaultAttributeTypes,
      useUniqueIDs: !!attributeIDs,
      vertexColorSpace
    };
    return this.decodeGeometry(buffer, taskConfig).then(callback).catch(onError);
  }
  decodeGeometry(buffer, taskConfig) {
    const taskKey = JSON.stringify(taskConfig);
    if (_taskCache.has(buffer)) {
      const cachedTask = _taskCache.get(buffer);
      if (cachedTask.key === taskKey) {
        return cachedTask.promise;
      } else if (buffer.byteLength === 0) {
        throw new Error(
          "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred."
        );
      }
    }
    let worker;
    const taskID = this.workerNextTaskID++;
    const taskCost = buffer.byteLength;
    const geometryPending = this._getWorker(taskID, taskCost).then((_worker) => {
      worker = _worker;
      return new Promise((resolve, reject) => {
        worker._callbacks[taskID] = { resolve, reject };
        worker.postMessage({ type: "decode", id: taskID, taskConfig, buffer }, [buffer]);
      });
    }).then((message) => this._createGeometry(message.geometry));
    geometryPending.catch(() => true).then(() => {
      if (worker && taskID) {
        this._releaseTask(worker, taskID);
      }
    });
    _taskCache.set(buffer, {
      key: taskKey,
      promise: geometryPending
    });
    return geometryPending;
  }
  _createGeometry(geometryData) {
    const geometry = new BufferGeometry();
    if (geometryData.index) {
      geometry.setIndex(new BufferAttribute(geometryData.index.array, 1));
    }
    for (let i = 0; i < geometryData.attributes.length; i++) {
      const { name, array, itemSize, stride, vertexColorSpace } = geometryData.attributes[i];
      let attribute;
      if (itemSize === stride) {
        attribute = new BufferAttribute(array, itemSize);
      } else {
        const buffer = new InterleavedBuffer(array, stride);
        attribute = new InterleavedBufferAttribute(buffer, itemSize, 0);
      }
      if (name === "color") {
        this._assignVertexColorSpace(attribute, vertexColorSpace);
        attribute.normalized = array instanceof Float32Array === false;
      }
      geometry.setAttribute(name, attribute);
    }
    return geometry;
  }
  _assignVertexColorSpace(attribute, inputColorSpace) {
    if (inputColorSpace !== SRGBColorSpace) return;
    const _color = new Color();
    for (let i = 0, il = attribute.count; i < il; i++) {
      _color.fromBufferAttribute(attribute, i);
      ColorManagement.colorSpaceToWorking(_color, SRGBColorSpace);
      attribute.setXYZ(i, _color.r, _color.g, _color.b);
    }
  }
  _loadLibrary(url, responseType) {
    const loader = new FileLoader(this.manager);
    loader.setResponseType(responseType);
    loader.setWithCredentials(this.withCredentials);
    return new Promise((resolve, reject) => {
      loader.load(url, resolve, void 0, reject);
    });
  }
  preload() {
    this._initDecoder();
    return this;
  }
  _initDecoder() {
    if (this.decoderPending) return this.decoderPending;
    const useJS = typeof WebAssembly !== "object" || this.decoderConfig.type === "js";
    const librariesPending = [];
    const { decoderPaths } = this;
    if (useJS) {
      if (decoderPaths.dep_js === null) {
        throw new Error("THREE.DRACOLoader: WebAssembly is required when using a custom decoder paths.");
      }
      librariesPending.push(this._loadLibrary(decoderPaths.dep_js, "text"));
    } else {
      librariesPending.push(this._loadLibrary(decoderPaths.js, "text"));
      librariesPending.push(this._loadLibrary(decoderPaths.wasm, "arraybuffer"));
    }
    this.decoderPending = Promise.all(librariesPending).then((libraries) => {
      const jsContent = libraries[0];
      if (!useJS) {
        this.decoderConfig.wasmBinary = libraries[1];
      }
      const fn = DRACOWorker.toString();
      const body = [
        "/* draco decoder */",
        jsContent,
        "",
        "/* worker */",
        fn.substring(fn.indexOf("{") + 1, fn.lastIndexOf("}"))
      ].join("\n");
      this.workerSourceURL = URL.createObjectURL(new Blob([body]));
    });
    return this.decoderPending;
  }
  _getWorker(taskID, taskCost) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const worker2 = new Worker(this.workerSourceURL);
        worker2._callbacks = {};
        worker2._taskCosts = {};
        worker2._taskLoad = 0;
        worker2.postMessage({ type: "init", decoderConfig: this.decoderConfig });
        worker2.onmessage = function(e) {
          const message = e.data;
          switch (message.type) {
            case "decode":
              worker2._callbacks[message.id].resolve(message);
              break;
            case "error":
              worker2._callbacks[message.id].reject(message);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + message.type + '"');
          }
        };
        this.workerPool.push(worker2);
      } else {
        this.workerPool.sort(function(a, b) {
          return a._taskLoad > b._taskLoad ? -1 : 1;
        });
      }
      const worker = this.workerPool[this.workerPool.length - 1];
      worker._taskCosts[taskID] = taskCost;
      worker._taskLoad += taskCost;
      return worker;
    });
  }
  _releaseTask(worker, taskID) {
    worker._taskLoad -= worker._taskCosts[taskID];
    delete worker._callbacks[taskID];
    delete worker._taskCosts[taskID];
  }
  debug() {
    console.log("Task load: ", this.workerPool.map((worker) => worker._taskLoad));
  }
  dispose() {
    for (let i = 0; i < this.workerPool.length; ++i) {
      this.workerPool[i].terminate();
    }
    this.workerPool.length = 0;
    if (this.workerSourceURL !== "") {
      URL.revokeObjectURL(this.workerSourceURL);
    }
    return this;
  }
};
function DRACOWorker() {
  let decoderConfig;
  let decoderPending;
  onmessage = function(e) {
    const message = e.data;
    switch (message.type) {
      case "init":
        decoderConfig = message.decoderConfig;
        decoderPending = new Promise(function(resolve) {
          decoderConfig.onModuleLoaded = function(draco) {
            resolve({ draco });
          };
          DracoDecoderModule(decoderConfig);
        });
        break;
      case "decode":
        const buffer = message.buffer;
        const taskConfig = message.taskConfig;
        decoderPending.then((module) => {
          const draco = module.draco;
          const decoder = new draco.Decoder();
          try {
            const geometry = decodeGeometry(draco, decoder, new Int8Array(buffer), taskConfig);
            const buffers = geometry.attributes.map((attr) => attr.array.buffer);
            if (geometry.index) buffers.push(geometry.index.array.buffer);
            self.postMessage({ type: "decode", id: message.id, geometry }, buffers);
          } catch (error) {
            console.error(error);
            self.postMessage({ type: "error", id: message.id, error: error.message });
          } finally {
            draco.destroy(decoder);
          }
        });
        break;
    }
  };
  function decodeGeometry(draco, decoder, array, taskConfig) {
    const attributeIDs = taskConfig.attributeIDs;
    const attributeTypes = taskConfig.attributeTypes;
    let dracoGeometry;
    let decodingStatus;
    const geometryType = decoder.GetEncodedGeometryType(array);
    if (geometryType === draco.TRIANGULAR_MESH) {
      dracoGeometry = new draco.Mesh();
      decodingStatus = decoder.DecodeArrayToMesh(array, array.byteLength, dracoGeometry);
    } else if (geometryType === draco.POINT_CLOUD) {
      dracoGeometry = new draco.PointCloud();
      decodingStatus = decoder.DecodeArrayToPointCloud(array, array.byteLength, dracoGeometry);
    } else {
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    }
    if (!decodingStatus.ok() || dracoGeometry.ptr === 0) {
      throw new Error("THREE.DRACOLoader: Decoding failed: " + decodingStatus.error_msg());
    }
    const geometry = { index: null, attributes: [] };
    for (const attributeName in attributeIDs) {
      const attributeType = self[attributeTypes[attributeName]];
      let attribute;
      let attributeID;
      if (taskConfig.useUniqueIDs) {
        attributeID = attributeIDs[attributeName];
        attribute = decoder.GetAttributeByUniqueId(dracoGeometry, attributeID);
      } else {
        attributeID = decoder.GetAttributeId(dracoGeometry, draco[attributeIDs[attributeName]]);
        if (attributeID === -1) continue;
        attribute = decoder.GetAttribute(dracoGeometry, attributeID);
      }
      const attributeResult = decodeAttribute(draco, decoder, dracoGeometry, attributeName, attributeType, attribute);
      if (attributeName === "color") {
        attributeResult.vertexColorSpace = taskConfig.vertexColorSpace;
      }
      geometry.attributes.push(attributeResult);
    }
    if (geometryType === draco.TRIANGULAR_MESH) {
      geometry.index = decodeIndex(draco, decoder, dracoGeometry);
    }
    draco.destroy(dracoGeometry);
    return geometry;
  }
  function decodeIndex(draco, decoder, dracoGeometry) {
    const numFaces = dracoGeometry.num_faces();
    const numIndices = numFaces * 3;
    const byteLength = numIndices * 4;
    const ptr = draco._malloc(byteLength);
    decoder.GetTrianglesUInt32Array(dracoGeometry, byteLength, ptr);
    const index = new Uint32Array(draco.HEAPF32.buffer, ptr, numIndices).slice();
    draco._free(ptr);
    return { array: index, itemSize: 1 };
  }
  function decodeAttribute(draco, decoder, dracoGeometry, attributeName, TypedArray, attribute) {
    const count = dracoGeometry.num_points();
    const itemSize = attribute.num_components();
    const dracoDataType = getDracoDataType(draco, TypedArray);
    const srcByteStride = itemSize * TypedArray.BYTES_PER_ELEMENT;
    const dstByteStride = Math.ceil(srcByteStride / 4) * 4;
    const dstStride = dstByteStride / TypedArray.BYTES_PER_ELEMENT;
    const srcByteLength = count * srcByteStride;
    const dstByteLength = count * dstByteStride;
    const ptr = draco._malloc(srcByteLength);
    decoder.GetAttributeDataArrayForAllPoints(dracoGeometry, attribute, dracoDataType, srcByteLength, ptr);
    const srcArray = new TypedArray(draco.HEAPF32.buffer, ptr, srcByteLength / TypedArray.BYTES_PER_ELEMENT);
    let dstArray;
    if (srcByteStride === dstByteStride) {
      dstArray = srcArray.slice();
    } else {
      dstArray = new TypedArray(dstByteLength / TypedArray.BYTES_PER_ELEMENT);
      let dstOffset = 0;
      for (let i = 0, il = srcArray.length; i < il; i++) {
        for (let j = 0; j < itemSize; j++) {
          dstArray[dstOffset + j] = srcArray[i * itemSize + j];
        }
        dstOffset += dstStride;
      }
    }
    draco._free(ptr);
    return {
      name: attributeName,
      count,
      itemSize,
      array: dstArray,
      stride: dstStride
    };
  }
  function getDracoDataType(draco, TypedArray) {
    switch (TypedArray) {
      case Float32Array:
        return draco.DT_FLOAT32;
      case Int8Array:
        return draco.DT_INT8;
      case Int16Array:
        return draco.DT_INT16;
      case Int32Array:
        return draco.DT_INT32;
      case Uint8Array:
        return draco.DT_UINT8;
      case Uint16Array:
        return draco.DT_UINT16;
      case Uint32Array:
        return draco.DT_UINT32;
    }
  }
}

// node_modules/three/examples/jsm/libs/meshopt_decoder.module.js
var MeshoptDecoder = (function() {
  var wasm_base = "b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuixkbeeeddddillviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WboY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbrl79IV9Rbwq:VZkdbk:XYi5ud9:du8Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz:jjjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCabaOad2fhXaAcethQaxaDfhiaOaeaoaeao6E9RhLalcl4cifcd4hKazcj;cbfaAfhYcbh8AazcjdfhEaHh3incbh5dnawTmbaxa8Acd4fRbbh5kcbh8Eazcj;cbfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcj;cbfa8EaA2fa8FaAz:jjjjb8Aa8FaAfhixdkazcj;cbfa8EaA2fcbaAz:kjjjb8Aa8FhixekaPa8F9RaK6mva8FaKfhidnaCTmbaPai9RcK6mbaocdtc:q:G:cjbfcj:G:cjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bwar9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfcbaicdfa8J9c8N1:NfghRbbag9cjjjjjw:dg8J9qE86bbarcVfcbaha8J9c8M1:NfghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fcbaha8J9c8N1:NfgiRbbag9cjjjjjw:dg8J9qE86bbarc96fcbaia8J9c8M1:NfgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbw83bwarai8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasa8Acd4fRbbgociGPlbedrbkaATmdaza8Afh8Fazcj;cbfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeaza8Afhaazcj;cbfhhcbhoceh8EaYh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaLaocefgofmbka8FaQfh8FcdhoaacdfhaahaQfhha8EceGhlcbh8EalmbxdkkaATmbaocl4h8Eaza8AfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaYhainazcj;cbfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E94aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3a8Aclfg8Aad6mbkaXazcjdfaAad2z:jjjjb8AazazcjdfaAcufad2fadz:jjjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaok:ysezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:kjjjb8Aav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk:4ioiue99dud99dud99dnaeTmbcbhiabhlindndnal8Uebgv:YgoJ:ji:1Salcof8UebgrciVgw:Y:vgDNJbbbZJbbb:;avcu9kEMgq:lJbbb9p9DTmbaq:Ohkxekcjjjj94hkkalclf8Uebhvalcdf8UebhxalarcefciGcetfak87ebdndnax:YgqaDNJbbbZJbbb:;axcu9kEMgm:lJbbb9p9DTmbam:Ohxxekcjjjj94hxkabaiarciGgkfcd7cetfax87ebdndnav:YgmaDNJbbbZJbbb:;avcu9kEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkalarcufciGcetfav87ebdndnawaw2:ZgPaPMaoaoN:taqaqN:tamamN:tgoJbbbbaoJbbbb9GE:raDNJbbbZMgD:lJbbb9p9DTmbaD:Ohrxekcjjjj94hrkalakcetfar87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk:Tvirud99eudndnadcl9hmbaeTmeindndnabRbbgiabcefgl8Sbbgvabcdfgo8Sbbgrf9R:YJbbuJabcifgwRbbgdce4adVgDcd4aDVgDcl4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax86bbdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao86bbdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai86bbdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad86bbabclfhbaecufgembxdkkaeTmbindndnab8Vebgiabcdfgl8Uebgvabclfgo8Uebgrf9R:YJbFu9habcofgw8Vebgdce4adVgDcd4aDVgDcl4aDVgDcw4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax87ebdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao87ebdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai87ebdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad87ebabcwfhbaecufgembkkk9teiucbcbyd:K:G:cjbgeabcifc98GfgbBd:K:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk83dbcj:Gdk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:K:Gdkl8W:qbb";
  var wasm_simd = "b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuixkbbebeeddddilve9Weeeviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WbwY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbDl79IV9Rbqq:W9Dklbzik94evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaeai86b:q:W:cjbaecitab8Piw83i:q:G:cjbaecefgecjd9hmbkk:JBl8Aud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaialfgxar9RhodnadTgmmbavaoad;8qbbkaicefhPcj;abad9Uc;WFbGcjdadca0EhsdndndnadTmbaoadfhzcbhHinaeaH9nmdaxaP9RaD6miabaHad2fhOaPaDfhAasaeaH9RaHasfae6EgCcsfgocl4cifcd4hXavcj;cbfaoc9WGgQcetfhLavcj;cbfaQci2fhKavcj;cbfaQfhYcbh8Aaoc;ab6hEincbh3dnawTmbaPa8Acd4fRbbh3kcbh5avcj;cbfh8Eindndndndna3a5cet4ciGgoc9:fPdebdkaxaA9RaQ6mwdnaQTmbavcj;cbfa5aQ2faAaQ;8qbbkaAaCfhAxdkaQTmeavcj;cbfa5aQ2fcbaQ;8kbxekaxaA9RaX6moaoclVcbawEhraAaXfhocbhidnaEmbaxao9Rc;Gb6mbcbhlina8EalfhidndndndndndnaAalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiczfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaicafaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaoclffaqRb:q:W:cjbfhoxikaic8Wfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaocwffaqRb:q:W:cjbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitpbi:q:G:cjbaiRb:q:W:cjbgipsaoRbegqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqRb:q:W:cjbfhokalc;abfhialcjefaQ0meaihlaxao9Rc;Fb0mbkkdnaiaQ9pmbaici4hlinaxao9RcK6mwa8EaifhqdndndndndndnaAaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaoclffagRb:q:W:cjbfhoxikaqaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaocwffagRb:q:W:cjbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpkbbahaocdffagRb:q:W:cjbfhokalcdfhlaiczfgiaQ6mbkkaohAaoTmoka8EaQfh8Ea5cefg5cl9hmbkdndndndnawTmbaza8Acd4fRbbglciGPlbedwbkaQTmdavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep9Ta8Fpxeeeeeeeeeeeeeeeegap9op9Hp9rg8Fa8Jp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ugap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp9Ugap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp9Ugap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9AbbbaladfhlaoczfgoaQ6mbxikkaQTmeavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep:nea8Fpxebebebebebebebebgap9op:bep9rg8Fa8Jp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oegap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp:oegap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp:oegap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9AbbbaladfhlaoczfgoaQ6mbxdkkaQTmbcbhocbalcl4gl9Rc8FGhiavcjdfa8Afhrava8Afpbdbhainaravcj;cbfaofpblbg8JaYaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaLaofpblbg8MaKaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Faap9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8LaypmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9AbbbaradfhraoczfgoaQ6mbkka8Aclfg8Aad6mbkdnaCad2goTmbaOavcjdfao;8qbbkdnammbavavcjdfaCcufad2fad;8qbbkaCaHfhHc9:hoaAhPaAmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdasaeao9Raoasfae6Eaofgoae6mbkaial9RhPkcbc99axaP9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbkNsezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk;Toio97eue97aec98Ghedndnadcl9hmbaeTmecbhdinababpbbbgicKp:RecKp:Sep;6eglaicwp:RecKp:Sep;6ealp;Geaiczp:RecKp:Sep;6egvp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgwp9op9rp;Keglpxbb;:9cbb;:9cbb;:9cbb;:9calalp;Meaoaop;Meavaravawp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFbbbFbbbFbbbFbbbp9oaipxbbbFbbbFbbbFbbbFp9op9qalavp;Mearp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaoavp;Mearp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgDaDpbbbgipxbbbbbbFFbbbbbbFFgwp9oabpbbbgoaipmbediwDqkzHOAKY8AEgvczp:Reczp:Sep;6eglaoaipmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eavczp:Sep;6egvp;Gealp;Gep;Kep;Legipxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgqp9op9rp;Keglpxb;:FSb;:FSb;:FSb;:FSalalp;Meaiaip;Meavaravaqp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbp9oaiavp;Mearp;Keczp:Rep9qgialavp;Mearp;KepxFFbbFFbbFFbbFFbbp9oglpmwDKYqk8AExm35Ps8E8Fp9qpkbbabaoawp9oaialpmbezHdiOAlvCXorQLp9qpkbbabcafhbadclfgdae6mbkkk;2ileue97euo97dnaec98GgiTmbcbheinabcKfpx:ji:1S:ji:1S:ji:1S:ji:1SabpbbbglabczfgvpbbbgopmlvorxmPsCXQL358E8Fgrczp:Segwpxibbbibbbibbbibbbp9qp;6egDp;NegqaDaDp;MegDaDp;KealaopmbediwDqkzHOAKY8AEgDczp:Reczp:Sep;6eglalp;MeaDczp:Sep;6egoaop;Mearczp:Reczp:Sep;6egrarp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jep;Mepxbbn0bbn0bbn0bbn0gDp;KepxFFbbFFbbFFbbFFbbgkp9oaqaop;MeaDp;Keczp:Rep9qgoaqalp;MeaDp;Keakp9oaqarp;MeaDp;Keczp:Rep9qgDpmwDKYqk8AExm35Ps8E8Fglp5eawclp:RegqpEi:T:j83ibavalp5baqpEd:T:j83ibabcwfaoaDpmbezHdiOAlvCXorQLgDp5eaqpEe:T:j83ibabaDp5baqpEb:T:j83ibabcafhbaeclfgeai6mbkkkuee97dnadcd4ae2c98GgeTmbcbhdinababpbbbgicwp:Recwp:Sep;6eaicep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbabczfhbadclfgdae6mbkkk:Sodw97euaec98Ghedndnadcl9hmbaeTmecbhdinabpxbbuJbbuJbbuJbbuJabpbbbgicKp:TeglaicYp:Tep9qgvcdp:Teavp9qgvclp:Teavp9qgop;6ep;Negvaicwp:RecKp:SegraipxFbbbFbbbFbbbFbbbgwp9ogDp:Uep;6ep;Mepxbbn0bbn0bbn0bbn0gqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9oavaDarp:Xeaiczp:RecKp:Segip:Uep;6ep;Meaqp;Keawp9op9qavaDaraip:Uep:Xep;6ep;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qavaoalcep:Rep9oalpxebbbebbbebbbebbbp9op9qp;6ep;Meaqp;KecKp:Rep9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgkpxbFu9hbFu9hbFu9hbFu9habpbbbglakpbbbgrpmlvorxmPsCXQL358E8Fgvczp:TegqavcHp:Tep9qgicdp:Teaip9qgiclp:Teaip9qgicwp:Teaip9qgop;6ep;NegialarpmbediwDqkzHOAKY8AEgDpxFFbbFFbbFFbbFFbbglp9ograDczp:Segwp:Ueavczp:Reczp:SegDp:Xep;6ep;Mepxbbn0bbn0bbn0bbn0gvp;Kealp9oaiarawaDp:Uep:Xep;6ep;Meavp;Keczp:Rep9qgwaiaoaqcep:Rep9oaqpxebbbebbbebbbebbbp9op9qp;6ep;Meavp;Keczp:ReaiaDarp:Uep;6ep;Meavp;Kealp9op9qgipmwDKYqk8AExm35Ps8E8FpkbbabawaipmbezHdiOAlvCXorQLpkbbabcafhbadclfgdae6mbkkk9teiucbcbydj:G:cjbgeabcifc98GfgbBdj:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkxebcj:Gdklz:zbb";
  var detector = new Uint8Array([
    0,
    97,
    115,
    109,
    1,
    0,
    0,
    0,
    1,
    4,
    1,
    96,
    0,
    0,
    3,
    3,
    2,
    0,
    0,
    5,
    3,
    1,
    0,
    1,
    12,
    1,
    0,
    10,
    22,
    2,
    12,
    0,
    65,
    0,
    65,
    0,
    65,
    0,
    252,
    10,
    0,
    0,
    11,
    7,
    0,
    65,
    0,
    253,
    15,
    26,
    11
  ]);
  var wasmpack = new Uint8Array([
    32,
    0,
    65,
    2,
    1,
    106,
    34,
    33,
    3,
    128,
    11,
    4,
    13,
    64,
    6,
    253,
    10,
    7,
    15,
    116,
    127,
    5,
    8,
    12,
    40,
    16,
    19,
    54,
    20,
    9,
    27,
    255,
    113,
    17,
    42,
    67,
    24,
    23,
    146,
    148,
    18,
    14,
    22,
    45,
    70,
    69,
    56,
    114,
    101,
    21,
    25,
    63,
    75,
    136,
    108,
    28,
    118,
    29,
    73,
    115
  ]);
  if (typeof WebAssembly !== "object") {
    return {
      supported: false
    };
  }
  var wasm = WebAssembly.validate(detector) ? unpack(wasm_simd) : unpack(wasm_base);
  var instance;
  var ready = WebAssembly.instantiate(wasm, {}).then(function(result) {
    instance = result.instance;
    instance.exports.__wasm_call_ctors();
  });
  function unpack(data) {
    var result = new Uint8Array(data.length);
    for (var i = 0; i < data.length; ++i) {
      var ch = data.charCodeAt(i);
      result[i] = ch > 96 ? ch - 97 : ch > 64 ? ch - 39 : ch + 4;
    }
    var write = 0;
    for (var i = 0; i < data.length; ++i) {
      result[write++] = result[i] < 60 ? wasmpack[result[i]] : (result[i] - 60) * 64 + result[++i];
    }
    return result.buffer.slice(0, write);
  }
  function decode(instance2, fun, target, count, size, source, filter) {
    var sbrk = instance2.exports.sbrk;
    var count4 = count + 3 & ~3;
    var tp = sbrk(count4 * size);
    var sp = sbrk(source.length);
    var heap = new Uint8Array(instance2.exports.memory.buffer);
    heap.set(source, sp);
    var res = fun(tp, count, size, sp, source.length);
    if (res == 0 && filter) {
      filter(tp, count4, size);
    }
    target.set(heap.subarray(tp, tp + count * size));
    sbrk(tp - sbrk(0));
    if (res != 0) {
      throw new Error("Malformed buffer data: " + res);
    }
  }
  var filters = {
    NONE: "",
    OCTAHEDRAL: "meshopt_decodeFilterOct",
    QUATERNION: "meshopt_decodeFilterQuat",
    EXPONENTIAL: "meshopt_decodeFilterExp",
    COLOR: "meshopt_decodeFilterColor"
  };
  var decoders = {
    ATTRIBUTES: "meshopt_decodeVertexBuffer",
    TRIANGLES: "meshopt_decodeIndexBuffer",
    INDICES: "meshopt_decodeIndexSequence"
  };
  var workers = [];
  var requestId = 0;
  function createWorker(url) {
    var worker = {
      object: new Worker(url),
      pending: 0,
      requests: {}
    };
    worker.object.onmessage = function(event) {
      var data = event.data;
      worker.pending -= data.count;
      worker.requests[data.id][data.action](data.value);
      delete worker.requests[data.id];
    };
    return worker;
  }
  function initWorkers(count) {
    var source = "self.ready = WebAssembly.instantiate(new Uint8Array([" + new Uint8Array(wasm) + "]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = " + workerProcess.name + ";" + decode.toString() + workerProcess.toString();
    var blob = new Blob([source], { type: "text/javascript" });
    var url = URL.createObjectURL(blob);
    for (var i = workers.length; i < count; ++i) {
      workers[i] = createWorker(url);
    }
    for (var i = count; i < workers.length; ++i) {
      workers[i].object.postMessage({});
    }
    workers.length = count;
    URL.revokeObjectURL(url);
  }
  function decodeWorker(count, size, source, mode, filter) {
    var worker = workers[0];
    for (var i = 1; i < workers.length; ++i) {
      if (workers[i].pending < worker.pending) {
        worker = workers[i];
      }
    }
    return new Promise(function(resolve, reject) {
      var data = new Uint8Array(source);
      var id = ++requestId;
      worker.pending += count;
      worker.requests[id] = { resolve, reject };
      worker.object.postMessage({ id, count, size, source: data, mode, filter }, [data.buffer]);
    });
  }
  function workerProcess(event) {
    var data = event.data;
    self.ready.then(function(instance2) {
      if (!data.id) {
        return self.close();
      }
      try {
        var target = new Uint8Array(data.count * data.size);
        decode(instance2, instance2.exports[data.mode], target, data.count, data.size, data.source, instance2.exports[data.filter]);
        self.postMessage({ id: data.id, count: data.count, action: "resolve", value: target }, [target.buffer]);
      } catch (error) {
        self.postMessage({ id: data.id, count: data.count, action: "reject", value: error });
      }
    });
  }
  return {
    ready,
    supported: true,
    useWorkers: function(count) {
      initWorkers(count);
    },
    decodeVertexBuffer: function(target, count, size, source, filter) {
      decode(instance, instance.exports.meshopt_decodeVertexBuffer, target, count, size, source, instance.exports[filters[filter]]);
    },
    decodeIndexBuffer: function(target, count, size, source) {
      decode(instance, instance.exports.meshopt_decodeIndexBuffer, target, count, size, source);
    },
    decodeIndexSequence: function(target, count, size, source) {
      decode(instance, instance.exports.meshopt_decodeIndexSequence, target, count, size, source);
    },
    decodeGltfBuffer: function(target, count, size, source, mode, filter) {
      decode(instance, instance.exports[decoders[mode]], target, count, size, source, instance.exports[filters[filter]]);
    },
    decodeGltfBufferAsync: function(count, size, source, mode, filter) {
      if (workers.length > 0) {
        return decodeWorker(count, size, source, decoders[mode], filters[filter]);
      }
      return ready.then(function() {
        var target = new Uint8Array(count * size);
        decode(instance, instance.exports[decoders[mode]], target, count, size, source, instance.exports[filters[filter]]);
        return target;
      });
    }
  };
})();

// src/app/componentes/exhibicionchildglb.ts
var _c0 = ["canvasContainer"];
function GlbViewerComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 3);
    \u0275\u0275domElement(1, "div", 39);
    \u0275\u0275domElementStart(2, "span", 40);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "div", 41);
    \u0275\u0275domElement(5, "div", 42);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Cargando modelo 3D / Ruraq rimay: ", ctx_r1.loadProgress(), "%");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.loadProgress(), "%");
  }
}
function GlbViewerComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 4);
    \u0275\u0275domElement(1, "i", 43);
    \u0275\u0275domElementStart(2, "p", 44);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage());
  }
}
var GlbViewerComponent = class _GlbViewerComponent {
  glbSource = input(null, ...ngDevMode ? [{ debugName: "glbSource" }] : []);
  canvasContainer = viewChild("canvasContainer", ...ngDevMode ? [{ debugName: "canvasContainer" }] : []);
  isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  loadProgress = signal(0, ...ngDevMode ? [{ debugName: "loadProgress" }] : []);
  errorMessage = signal(null, ...ngDevMode ? [{ debugName: "errorMessage" }] : []);
  isPanelOpen = signal(true, ...ngDevMode ? [{ debugName: "isPanelOpen" }] : []);
  brightness = signal(1, ...ngDevMode ? [{ debugName: "brightness" }] : []);
  lightIntensity = signal(2.5, ...ngDevMode ? [{ debugName: "lightIntensity" }] : []);
  lightColor = signal("#ffffff", ...ngDevMode ? [{ debugName: "lightColor" }] : []);
  activeShader = signal("original", ...ngDevMode ? [{ debugName: "activeShader" }] : []);
  scene;
  camera;
  renderer;
  controls;
  mainLight;
  ambientLight;
  loader = new GLTFLoader();
  dracoLoader = new DRACOLoader();
  objLoader = new OBJLoader();
  currentModel = null;
  animationFrameId = null;
  activeObjectUrl = null;
  originalMaterials = /* @__PURE__ */ new Map();
  normalMaterial = new MeshNormalMaterial();
  customGlowMaterial;
  constructor() {
    this.dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
    this.loader.setDRACOLoader(this.dracoLoader);
    this.loader.setMeshoptDecoder(MeshoptDecoder);
    this.initCustomShader();
    effect(() => {
      const container = this.canvasContainer()?.nativeElement;
      const source = this.glbSource();
      if (container && !this.renderer) {
        this.initThree(container);
      }
      if (source) {
        this.loadModel(source);
      }
    });
    effect(() => {
      const intensity = this.lightIntensity();
      const color = this.lightColor();
      if (this.mainLight) {
        this.mainLight.intensity = intensity;
        this.mainLight.color.set(color);
      }
    });
    effect(() => {
      const exp = this.brightness();
      if (this.renderer) {
        this.renderer.toneMappingExposure = exp;
      }
    });
    effect(() => {
      const mode = this.activeShader();
      if (this.currentModel) {
        this.applyShaderMode(mode);
      }
    });
  }
  togglePanel() {
    this.isPanelOpen.update((prev) => !prev);
  }
  initCustomShader() {
    this.customGlowMaterial = new ShaderMaterial({
      uniforms: {
        uColor: { value: new Color(14251782) },
        uTime: { value: 0 }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);
          float pulse = 0.8 + 0.2 * sin(uTime * 3.0);
          gl_FragColor = vec4(uColor * fresnel * pulse, fresnel);
        }
      `,
      transparent: true,
      blending: AdditiveBlending
    });
  }
  initThree(container) {
    this.scene = new Scene();
    this.scene.background = new Color(1184274);
    this.camera = new PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1e3);
    this.camera.position.set(0, 2, 5);
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = this.brightness();
    container.appendChild(this.renderer.domElement);
    this.ambientLight = new AmbientLight(16777215, 1);
    this.scene.add(this.ambientLight);
    this.mainLight = new DirectionalLight(this.lightColor(), this.lightIntensity());
    this.mainLight.position.set(5, 10, 7.5);
    this.scene.add(this.mainLight);
    const fillLight = new DirectionalLight(16777215, 0.8);
    fillLight.position.set(-5, -5, -5);
    this.scene.add(fillLight);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    window.addEventListener("resize", this.onResize);
    this.animate();
  }
  isObjFile(source) {
    if (source instanceof File) {
      return source.name.toLowerCase().endsWith(".obj");
    }
    return source.toLowerCase().split("?")[0].endsWith(".obj");
  }
  async loadModel(source) {
    this.cleanupCurrentModel();
    this.isLoading.set(true);
    this.loadProgress.set(0);
    this.errorMessage.set(null);
    let loadUrl;
    if (source instanceof File) {
      this.activeObjectUrl = URL.createObjectURL(source);
      loadUrl = this.activeObjectUrl;
      this.loader.setResourcePath("");
    } else {
      loadUrl = source;
      const resourcePath = loadUrl.substring(0, loadUrl.lastIndexOf("/") + 1);
      this.loader.setResourcePath(resourcePath);
      try {
        const headCheck = await fetch(loadUrl, { method: "HEAD" });
        if (!headCheck.ok) {
          throw new Error(`HTTP ${headCheck.status}: ${headCheck.statusText}`);
        }
      } catch (err) {
        console.error("Failed to reach model resource:", err);
        this.errorMessage.set(`No se pudo obtener el modelo 3D (${loadUrl}).`);
        this.isLoading.set(false);
        return;
      }
    }
    const isObj = this.isObjFile(source);
    const onProgress = (xhr) => {
      if (xhr.total > 0) {
        this.loadProgress.set(Math.round(xhr.loaded / xhr.total * 100));
      }
    };
    const onError = (error) => {
      console.error("Error parsing 3D model:", error);
      this.errorMessage.set("Error al procesar el modelo 3D.");
      this.isLoading.set(false);
      this.revokeActiveObjectUrl();
    };
    const handleLoadedObject = (object) => {
      this.currentModel = object;
      this.currentModel.traverse((child) => {
        if (child.isMesh) {
          const mesh = child;
          if (!mesh.material || Array.isArray(mesh.material) && mesh.material.length === 0) {
            mesh.material = new MeshStandardMaterial({ color: 13421772 });
          }
          this.originalMaterials.set(mesh, mesh.material);
        }
      });
      this.applyShaderMode(this.activeShader());
      this.scene.add(this.currentModel);
      this.fitCameraToModel(this.currentModel);
      this.isLoading.set(false);
      this.revokeActiveObjectUrl();
    };
    if (isObj) {
      this.objLoader.load(loadUrl, (obj) => handleLoadedObject(obj), onProgress, onError);
    } else {
      this.loader.load(loadUrl, (gltf) => handleLoadedObject(gltf.scene), onProgress, onError);
    }
  }
  applyShaderMode(mode) {
    if (!this.currentModel)
      return;
    this.currentModel.traverse((child) => {
      if (child.isMesh) {
        const mesh = child;
        const originalMat = this.originalMaterials.get(mesh);
        switch (mode) {
          case "wireframe":
            if (originalMat) {
              if (Array.isArray(originalMat)) {
                mesh.material = originalMat.map((mat) => this.setWireframe(mat, true));
              } else {
                mesh.material = this.setWireframe(originalMat, true);
              }
            }
            break;
          case "normal":
            mesh.material = this.normalMaterial;
            break;
          case "customGlow":
            mesh.material = this.customGlowMaterial;
            break;
          case "original":
          default:
            if (originalMat) {
              mesh.material = originalMat;
            }
            break;
        }
      }
    });
  }
  setWireframe(mat, wireframe) {
    const cloned = mat.clone();
    if ("wireframe" in cloned) {
      cloned.wireframe = wireframe;
    }
    return cloned;
  }
  updateBrightness(event) {
    this.brightness.set(parseFloat(event.target.value));
  }
  updateLightIntensity(event) {
    this.lightIntensity.set(parseFloat(event.target.value));
  }
  updateLightColor(event) {
    this.lightColor.set(event.target.value);
  }
  updateShaderMode(event) {
    this.activeShader.set(event.target.value);
  }
  fitCameraToModel(model) {
    const box = new Box3().setFromObject(model);
    if (box.isEmpty())
      return;
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    model.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = this.camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.8;
    cameraZ = Math.max(cameraZ, 2);
    this.camera.position.set(0, maxDim * 0.3, cameraZ);
    this.camera.lookAt(0, 0, 0);
    this.camera.near = cameraZ / 100;
    this.camera.far = cameraZ * 100;
    this.camera.updateProjectionMatrix();
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }
  animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    this.controls.update();
    if (this.customGlowMaterial) {
      this.customGlowMaterial.uniforms["uTime"].value = performance.now() / 1e3;
    }
    this.renderer.render(this.scene, this.camera);
  };
  onResize = () => {
    const container = this.canvasContainer()?.nativeElement;
    if (!container || !this.renderer)
      return;
    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  };
  revokeActiveObjectUrl() {
    if (this.activeObjectUrl) {
      URL.revokeObjectURL(this.activeObjectUrl);
      this.activeObjectUrl = null;
    }
  }
  cleanupCurrentModel() {
    if (this.currentModel) {
      this.scene.remove(this.currentModel);
      this.currentModel = null;
    }
    this.originalMaterials.clear();
    this.revokeActiveObjectUrl();
  }
  ngOnDestroy() {
    window.removeEventListener("resize", this.onResize);
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.cleanupCurrentModel();
    this.dracoLoader.dispose();
    this.normalMaterial.dispose();
    this.customGlowMaterial.dispose();
    this.renderer.dispose();
  }
  static \u0275fac = function GlbViewerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GlbViewerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GlbViewerComponent, selectors: [["app-glb-viewer"]], viewQuery: function GlbViewerComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.canvasContainer, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { glbSource: [1, "glbSource"] }, decls: 62, vars: 17, consts: [["canvasContainer", ""], [1, "viewer-wrapper", "position-relative", "w-100", "overflow-hidden", "rounded-4", "shadow-lg", "bg-dark", 2, "height", "520px"], [1, "w-100", "h-100"], [1, "position-absolute", "inset-0", "d-flex", "flex-column", "align-items-center", "justify-content-center", "bg-dark", "bg-opacity-75", "text-light", "p-3", "w-100", "h-100", 2, "top", "0", "left", "0", "z-index", "10"], [1, "position-absolute", "inset-0", "d-flex", "flex-column", "align-items-center", "justify-content-center", "bg-dark", "bg-opacity-90", "text-danger", "p-4", "text-center", 2, "top", "0", "left", "0", "z-index", "20"], [1, "btn", "btn-dark", "border", "border-secondary", "bg-dark", "bg-opacity-75", "text-light", "position-absolute", "top-0", "end-0", "m-3", "d-flex", "align-items-center", "gap-2", "px-3", "py-2", "rounded-pill", "shadow-sm", "transition-all", 2, "z-index", "12", "backdrop-filter", "blur(8px)", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"], ["d", "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"], ["d", "M12 2v2"], ["d", "M12 20v2"], ["d", "m4.93 4.93 1.41 1.41"], ["d", "m17.66 17.66 1.41 1.41"], ["d", "M2 12h2"], ["d", "M20 12h2"], ["d", "m6.34 17.66-1.41 1.41"], ["d", "m18.07 4.93-1.41 1.41"], [1, "small", "fw-semibold"], [1, "control-panel", "card", "position-absolute", "top-0", "start-0", "m-3", "bg-dark", "bg-opacity-85", "border", "border-secondary", "text-light", "shadow-lg", "rounded-3", 2, "width", "280px", "z-index", "11", "backdrop-filter", "blur(12px)"], [1, "card-header", "d-flex", "justify-content-between", "align-items-center", "py-2", "px-3", "bg-transparent", "border-bottom", "border-secondary"], [1, "d-flex", "flex-column"], [1, "fw-bold", "text-light", 2, "font-size", "13px"], [1, "text-warning", "fst-italic", 2, "font-size", "10px"], ["type", "button", "aria-label", "Close", 1, "btn", "btn-light", 3, "click"], [1, "card-body", "p-3", "d-flex", "flex-column", "gap-3"], [1, "d-flex", "flex-column", "gap-1"], [1, "d-flex", "justify-content-between", "align-items-center", "text-secondary", "small"], [1, "text-warning", "font-monospace"], ["type", "range", "min", "0.1", "max", "3", "step", "0.1", 1, "form-range", "custom-range", 3, "input", "value"], ["type", "range", "min", "0", "max", "5", "step", "0.1", 1, "form-range", "custom-range", 3, "input", "value"], [1, "text-secondary", "small"], [1, "d-flex", "align-items-center", "gap-2"], ["type", "color", 1, "form-control", "form-control-color", "bg-transparent", "border-secondary", "rounded-circle", "p-0", 2, "width", "32px", "height", "32px", "cursor", "pointer", 3, "input", "value"], [1, "font-monospace", "text-secondary", "small"], [1, "form-select", "form-select-sm", "bg-secondary", "text-light", "border-secondary", 3, "change", "value"], ["value", "original"], ["value", "wireframe"], ["value", "normal"], ["value", "customGlow"], ["role", "status", 1, "spinner-border", "text-warning", "mb-2"], [1, "fw-bold", "text-warning", "small"], [1, "progress", "w-50", "mt-2", "bg-secondary", "rounded-pill", 2, "height", "6px"], [1, "progress-bar", "bg-warning", "rounded-pill"], [1, "bi", "bi-exclamation-triangle-fill", "fs-2", "mb-2"], [1, "mb-0", "fw-semibold"]], template: function GlbViewerComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275domElementStart(0, "div", 1);
      \u0275\u0275domElement(1, "div", 2, 0);
      \u0275\u0275conditionalCreate(3, GlbViewerComponent_Conditional_3_Template, 6, 3, "div", 3);
      \u0275\u0275conditionalCreate(4, GlbViewerComponent_Conditional_4_Template, 4, 1, "div", 4);
      \u0275\u0275domElementStart(5, "button", 5);
      \u0275\u0275domListener("click", function GlbViewerComponent_Template_button_click_5_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.togglePanel());
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(6, "svg", 6);
      \u0275\u0275domElement(7, "path", 7)(8, "path", 8)(9, "path", 9)(10, "path", 10)(11, "path", 11)(12, "path", 12)(13, "path", 13)(14, "path", 14)(15, "path", 15)(16, "path", 16);
      \u0275\u0275domElementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(17, "span", 17);
      \u0275\u0275text(18);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(19, "div", 18)(20, "div", 19)(21, "div", 20)(22, "span", 21);
      \u0275\u0275text(23, "Control de Visor");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(24, "span", 22);
      \u0275\u0275text(25, "Rikuchina Llika");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(26, "button", 23);
      \u0275\u0275domListener("click", function GlbViewerComponent_Template_button_click_26_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.togglePanel());
      });
      \u0275\u0275text(27, "Cerrar");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(28, "div", 24)(29, "div", 25)(30, "label", 26)(31, "span");
      \u0275\u0275text(32, "Brillo / Kanchay:");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(33, "strong", 27);
      \u0275\u0275text(34);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(35, "input", 28);
      \u0275\u0275domListener("input", function GlbViewerComponent_Template_input_input_35_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.updateBrightness($event));
      });
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(36, "div", 25)(37, "label", 26)(38, "span");
      \u0275\u0275text(39, "Intensidad Luz / Akchi Rapra:");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(40, "strong", 27);
      \u0275\u0275text(41);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(42, "input", 29);
      \u0275\u0275domListener("input", function GlbViewerComponent_Template_input_input_42_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.updateLightIntensity($event));
      });
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(43, "div", 25)(44, "label", 30);
      \u0275\u0275text(45, "Color Luz / Akchi Llimp'i");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(46, "div", 31)(47, "input", 32);
      \u0275\u0275domListener("input", function GlbViewerComponent_Template_input_input_47_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.updateLightColor($event));
      });
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(48, "span", 33);
      \u0275\u0275text(49);
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(50, "div", 25)(51, "label", 30);
      \u0275\u0275text(52, "Renderizado / Modo");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(53, "select", 34);
      \u0275\u0275domListener("change", function GlbViewerComponent_Template_select_change_53_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.updateShaderMode($event));
      });
      \u0275\u0275domElementStart(54, "option", 35);
      \u0275\u0275text(55, "Original / Unay Llimp'i");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(56, "option", 36);
      \u0275\u0275text(57, "Malla / Llika Wirpa");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(58, "option", 37);
      \u0275\u0275text(59, "Visualizador Normales");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(60, "option", 38);
      \u0275\u0275text(61, "Resplandor Fresnel (Glow)");
      \u0275\u0275domElementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.isLoading() ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("btn-warning", !ctx.isPanelOpen())("text-dark", !ctx.isPanelOpen());
      \u0275\u0275attribute("aria-label", ctx.isPanelOpen() ? "Ocultar controles" : "Mostrar controles");
      \u0275\u0275advance(13);
      \u0275\u0275textInterpolate(ctx.isPanelOpen() ? "Ocultar" : "Ajustes 3D");
      \u0275\u0275advance();
      \u0275\u0275classProp("collapsed", !ctx.isPanelOpen());
      \u0275\u0275advance(15);
      \u0275\u0275textInterpolate(ctx.brightness());
      \u0275\u0275advance();
      \u0275\u0275domProperty("value", ctx.brightness());
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.lightIntensity());
      \u0275\u0275advance();
      \u0275\u0275domProperty("value", ctx.lightIntensity());
      \u0275\u0275advance(5);
      \u0275\u0275domProperty("value", ctx.lightColor());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.lightColor());
      \u0275\u0275advance(4);
      \u0275\u0275domProperty("value", ctx.activeShader());
    }
  }, dependencies: [CommonModule], styles: ["\n\n.control-panel[_ngcontent-%COMP%] {\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  transform-origin: top left;\n  opacity: 1;\n  transform: scale(1) translateY(0);\n}\n.control-panel.collapsed[_ngcontent-%COMP%] {\n  opacity: 0;\n  transform: scale(0.9) translateY(-10px);\n  pointer-events: none;\n}\n.custom-range[_ngcontent-%COMP%]::-webkit-slider-thumb {\n  background-color: #d97706;\n}\n.custom-range[_ngcontent-%COMP%]::-moz-range-thumb {\n  background-color: #d97706;\n}\n/*# sourceMappingURL=exhibicionchildglb.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GlbViewerComponent, [{
    type: Component,
    args: [{ selector: "app-glb-viewer", standalone: true, imports: [CommonModule], template: `
    <div class="viewer-wrapper position-relative w-100 overflow-hidden rounded-4 shadow-lg bg-dark" style="height: 520px;">
      <div #canvasContainer class="w-100 h-100"></div>

      <!-- Overlay de Carga -->
      @if (isLoading()) {
        <div class="position-absolute inset-0 d-flex flex-column align-items-center justify-content-center bg-dark bg-opacity-75 text-light p-3 w-100 h-100" style="top:0; left:0; z-index: 10;">
          <div class="spinner-border text-warning mb-2" role="status"></div>
          <span class="fw-bold text-warning small">Cargando modelo 3D / Ruraq rimay: {{ loadProgress() }}%</span>
          <div class="progress w-50 mt-2 bg-secondary rounded-pill" style="height: 6px;">
            <div class="progress-bar bg-warning rounded-pill" [style.width.%]="loadProgress()"></div>
          </div>
        </div>
      }

      <!-- Overlay de Error -->
      @if (errorMessage()) {
        <div class="position-absolute inset-0 d-flex flex-column align-items-center justify-content-center bg-dark bg-opacity-90 text-danger p-4 text-center" style="top:0; left:0; z-index: 20;">
          <i class="bi bi-exclamation-triangle-fill fs-2 mb-2"></i>
          <p class="mb-0 fw-semibold">{{ errorMessage() }}</p>
        </div>
      }

      <!-- Bot\xF3n Flotante para Abrir/Cerrar el Panel -->
      <button 
        class="btn btn-dark border border-secondary bg-dark bg-opacity-75 text-light position-absolute top-0 end-0 m-3 d-flex align-items-center gap-2 px-3 py-2 rounded-pill shadow-sm transition-all"
        style="z-index: 12; backdrop-filter: blur(8px);"
        [class.btn-warning]="!isPanelOpen()"
        [class.text-dark]="!isPanelOpen()"
        (click)="togglePanel()" 
        [attr.aria-label]="isPanelOpen() ? 'Ocultar controles' : 'Mostrar controles'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/>
          <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
          <path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m18.07 4.93-1.41 1.41"/>
        </svg>
        <span class="small fw-semibold">{{ isPanelOpen() ? 'Ocultar' : 'Ajustes 3D' }}</span>
      </button>

      <!-- Panel de Control Desplegable -->
      <div class="control-panel card position-absolute top-0 start-0 m-3 bg-dark bg-opacity-85 border border-secondary text-light shadow-lg rounded-3" 
           style="width: 280px; z-index: 11; backdrop-filter: blur(12px);"
           [class.collapsed]="!isPanelOpen()">
        <div class="card-header d-flex justify-content-between align-items-center py-2 px-3 bg-transparent border-bottom border-secondary">
          <div class="d-flex flex-column">
            <span class="fw-bold text-light" style="font-size: 13px;">Control de Visor</span>
            <span class="text-warning fst-italic" style="font-size: 10px;">Rikuchina Llika</span>
          </div>
          <button type="button" class="btn btn-light" aria-label="Close" (click)="togglePanel()">Cerrar</button>
        </div>

        <div class="card-body p-3 d-flex flex-column gap-3">
          <!-- Brillo -->
          <div class="d-flex flex-column gap-1">
            <label class="d-flex justify-content-between align-items-center text-secondary small">
              <span>Brillo / Kanchay:</span>
              <strong class="text-warning font-monospace">{{ brightness() }}</strong>
            </label>
            <input
              type="range"
              class="form-range custom-range"
              min="0.1"
              max="3"
              step="0.1"
              [value]="brightness()"
              (input)="updateBrightness($event)"
            />
          </div>

          <!-- Intensidad de Luz -->
          <div class="d-flex flex-column gap-1">
            <label class="d-flex justify-content-between align-items-center text-secondary small">
              <span>Intensidad Luz / Akchi Rapra:</span>
              <strong class="text-warning font-monospace">{{ lightIntensity() }}</strong>
            </label>
            <input
              type="range"
              class="form-range custom-range"
              min="0"
              max="5"
              step="0.1"
              [value]="lightIntensity()"
              (input)="updateLightIntensity($event)"
            />
          </div>

          <!-- Color de Luz -->
          <div class="d-flex flex-column gap-1">
            <label class="text-secondary small">Color Luz / Akchi Llimp'i</label>
            <div class="d-flex align-items-center gap-2">
              <input
                type="color"
                class="form-control form-control-color bg-transparent border-secondary rounded-circle p-0"
                style="width: 32px; height: 32px; cursor: pointer;"
                [value]="lightColor()"
                (input)="updateLightColor($event)"
              />
              <span class="font-monospace text-secondary small">{{ lightColor() }}</span>
            </div>
          </div>

          <!-- Modo Shader -->
          <div class="d-flex flex-column gap-1">
            <label class="text-secondary small">Renderizado / Modo</label>
            <select class="form-select form-select-sm bg-secondary text-light border-secondary" [value]="activeShader()" (change)="updateShaderMode($event)">
              <option value="original">Original / Unay Llimp'i</option>
              <option value="wireframe">Malla / Llika Wirpa</option>
              <option value="normal">Visualizador Normales</option>
              <option value="customGlow">Resplandor Fresnel (Glow)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;4f5d394c8cc55832d11124615f28d9b18bfa76c3363cec1ab829b2d1e1e4acd2;/home/linuxlite/WebMEAN/src/app/componentes/exhibicionchildglb.ts */\n.control-panel {\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  transform-origin: top left;\n  opacity: 1;\n  transform: scale(1) translateY(0);\n}\n.control-panel.collapsed {\n  opacity: 0;\n  transform: scale(0.9) translateY(-10px);\n  pointer-events: none;\n}\n.custom-range::-webkit-slider-thumb {\n  background-color: #d97706;\n}\n.custom-range::-moz-range-thumb {\n  background-color: #d97706;\n}\n/*# sourceMappingURL=exhibicionchildglb.css.map */\n"] }]
  }], () => [], { glbSource: [{ type: Input, args: [{ isSignal: true, alias: "glbSource", required: false }] }], canvasContainer: [{ type: ViewChild, args: ["canvasContainer", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GlbViewerComponent, { className: "GlbViewerComponent", filePath: "src/app/componentes/exhibicionchildglb.ts", lineNumber: 160 });
})();

// src/app/componentes/isipay.ts
function CheckoutIzipayComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 13);
    \u0275\u0275domElement(1, "i", 18);
    \u0275\u0275domElementStart(2, "div");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.errorMessage());
  }
}
function CheckoutIzipayComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 14);
    \u0275\u0275domElement(1, "i", 19);
    \u0275\u0275domElementStart(2, "h5", 9);
    \u0275\u0275text(3, "\xA1Pago Confirmado!");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "p", 20);
    \u0275\u0275text(5, "Transacci\xF3n completada exitosamente.");
    \u0275\u0275domElementEnd()();
  }
}
function CheckoutIzipayComponent_Conditional_25_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "span", 22);
    \u0275\u0275domElementStart(1, "span");
    \u0275\u0275text(2, "Procesando...");
    \u0275\u0275domElementEnd();
  }
}
function CheckoutIzipayComponent_Conditional_25_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "i", 23);
    \u0275\u0275domElementStart(1, "span");
    \u0275\u0275text(2, "Pagar con Izipay / Yape");
    \u0275\u0275domElementEnd();
  }
}
function CheckoutIzipayComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 21);
    \u0275\u0275domListener("click", function CheckoutIzipayComponent_Conditional_25_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.processCheckout());
    });
    \u0275\u0275conditionalCreate(1, CheckoutIzipayComponent_Conditional_25_Conditional_1_Template, 3, 0)(2, CheckoutIzipayComponent_Conditional_25_Conditional_2_Template, 3, 0);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("disabled", ctx_r0.isLoading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isLoading() ? 1 : 2);
  }
}
var IzipayService = class _IzipayService {
  http = inject(HttpClient);
  createSession(amount, orderId) {
    return this.http.post(`${environment.apiURL}/api/payments/izipay/session`, { amount, orderId });
  }
  verifyPayment(paymentResult) {
    return this.http.post(`${environment.apiURL}/api/payments/izipay/verify`, paymentResult);
  }
  static \u0275fac = function IzipayService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _IzipayService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _IzipayService, factory: _IzipayService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IzipayService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var CheckoutIzipayComponent = class _CheckoutIzipayComponent {
  izipayService = inject(IzipayService);
  checkoutAmount = signal(150, ...ngDevMode ? [{ debugName: "checkoutAmount" }] : []);
  orderId = signal(`ORD${Date.now().toString().slice(-8)}`, ...ngDevMode ? [{ debugName: "orderId" }] : []);
  isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  errorMessage = signal("", ...ngDevMode ? [{ debugName: "errorMessage" }] : []);
  paymentSuccess = signal(false, ...ngDevMode ? [{ debugName: "paymentSuccess" }] : []);
  ngOnInit() {
  }
  processCheckout() {
    this.isLoading.set(true);
    this.errorMessage.set("");
    this.izipayService.createSession(this.checkoutAmount(), this.orderId()).subscribe({
      next: (session) => {
        this.isLoading.set(false);
        console.log(session);
        this.openIzipayCheckout(session);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set("No se pudo iniciar la pasarela de pago. Int\xE9ntelo m\xE1s tarde.");
        console.error("Error Izipay Session:", err);
      }
    });
  }
  formatIzipayDate(date = /* @__PURE__ */ new Date()) {
    const pad = (n) => n < 10 ? "0" + n : n;
    return date.getFullYear().toString() + pad(date.getMonth() + 1) + pad(date.getDate()) + pad(date.getHours()) + pad(date.getMinutes()) + pad(date.getSeconds());
  }
  openIzipayCheckout(session) {
    if (typeof Izipay === "undefined") {
      this.errorMessage.set("El SDK de Izipay no est\xE1 cargado.");
      return;
    }
    const validDateTime = this.formatIzipayDate();
    const iziConfig = {
      action: "pay",
      merchantCode: String(session.merchantCode),
      transactionId: String(Date.now()),
      order: {
        orderNumber: String(session.orderNumber),
        currency: "PEN",
        amount: Number(session.amount).toFixed(2),
        processType: "AT",
        merchantBuyerId: "USER-12345",
        dateTimeTransaction: validDateTime
      },
      billing: {
        firstName: "Juan",
        lastName: "Perez",
        email: "juan.perez@example.com",
        phoneNumber: "989897960",
        street: "Av Javier Prado 123",
        city: "Lima",
        state: "Lima",
        country: "PE",
        postalCode: "15000",
        documentType: "DNI",
        document: "12345678"
      },
      render: {
        typeForm: "pop-up"
      }
    };
    try {
      const checkout = new Izipay({ config: iziConfig });
      const callbackResponsePayment = (response) => {
        console.log("Respuesta de Izipay:", response);
        if (response && (response.code === "00" || response.message === "SUCCESS" || response.status === "SUCCESS")) {
          this.izipayService.verifyPayment(response).subscribe({
            next: () => this.paymentSuccess.set(true),
            error: () => this.errorMessage.set("Error al verificar la transacci\xF3n en el servidor.")
          });
        } else {
          this.errorMessage.set("La transacci\xF3n fue rechazada o cancelada.");
        }
      };
      if (checkout && typeof checkout.LoadForm === "function") {
        checkout.LoadForm({
          authorization: session.authorization,
          // Token recibido del backend
          keyRSA: session.keyRSA,
          // Llave pública de tu comercio
          callbackResponse: callbackResponsePayment
        });
      } else {
        this.errorMessage.set("El m\xE9todo LoadForm no est\xE1 disponible en el SDK.");
      }
    } catch (error) {
      console.error("Error al iniciar el SDK de Izipay:", error);
      this.errorMessage.set("No se pudo inicializar la pasarela de pago.");
    }
  }
  static \u0275fac = function CheckoutIzipayComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CheckoutIzipayComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CheckoutIzipayComponent, selectors: [["app-checkout-izipay"]], decls: 30, vars: 3, consts: [[1, "container", "py-5"], [1, "row", "justify-content-center"], [1, "col-md-6", "col-lg-5"], [1, "card", "bg-dark", "text-white", "border-secondary", "shadow-lg"], [1, "card-header", "border-secondary", "text-center", "py-3"], [1, "mb-0", "text-warning", "text-uppercase", "fw-bold"], [1, "card-body", "p-4"], [1, "d-flex", "justify-content-between", "mb-2"], [1, "text-secondary"], [1, "fw-bold"], [1, "d-flex", "justify-content-between", "mb-3", "pb-3", "border-bottom", "border-secondary"], [1, "d-flex", "justify-content-between", "fs-5", "fw-bold", "mb-4"], [1, "text-warning"], ["role", "alert", 1, "alert", "alert-danger", "d-flex", "align-items-center", "small"], ["role", "alert", 1, "alert", "alert-success", "text-center"], ["type", "button", 1, "btn", "btn-warning", "w-100", "py-2", "fw-bold", "text-uppercase", "d-flex", "align-items-center", "justify-content-center", "gap-2", 3, "disabled"], [1, "card-footer", "border-secondary", "text-center", "py-2"], [1, "bi", "bi-shield-lock-fill", "me-1"], [1, "bi", "bi-exclamation-triangle-fill", "me-2"], [1, "bi", "bi-check-circle-fill", "fs-2", "d-block", "mb-2"], [1, "mb-0", "small"], ["type", "button", 1, "btn", "btn-warning", "w-100", "py-2", "fw-bold", "text-uppercase", "d-flex", "align-items-center", "justify-content-center", "gap-2", 3, "click", "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm"], [1, "bi", "bi-credit-card-fill", "fs-5"]], template: function CheckoutIzipayComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "h4", 5);
      \u0275\u0275text(6, "Resumen de Compra");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(7, "div", 6)(8, "div", 7)(9, "span", 8);
      \u0275\u0275text(10, "Producto:");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(11, "span", 9);
      \u0275\u0275text(12, "Muestra / Cat\xE1logo Virtual");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(13, "div", 10)(14, "span", 8);
      \u0275\u0275text(15, "Moneda:");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(16, "span", 9);
      \u0275\u0275text(17, "Soles (PEN)");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(18, "div", 11)(19, "span");
      \u0275\u0275text(20, "Total a pagar:");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(21, "span", 12);
      \u0275\u0275text(22);
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(23, CheckoutIzipayComponent_Conditional_23_Template, 4, 1, "div", 13);
      \u0275\u0275conditionalCreate(24, CheckoutIzipayComponent_Conditional_24_Template, 6, 0, "div", 14)(25, CheckoutIzipayComponent_Conditional_25_Template, 3, 2, "button", 15);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(26, "div", 16)(27, "small", 8);
      \u0275\u0275domElement(28, "i", 17);
      \u0275\u0275text(29, " Transacci\xF3n 100% segura ");
      \u0275\u0275domElementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(22);
      \u0275\u0275textInterpolate1("S/ ", ctx.checkoutAmount().toFixed(2));
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 23 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.paymentSuccess() ? 24 : 25);
    }
  }, dependencies: [CommonModule], styles: ["\n\n.card[_ngcontent-%COMP%] {\n  border-radius: 8px;\n}\n/*# sourceMappingURL=isipay.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckoutIzipayComponent, [{
    type: Component,
    args: [{ selector: "app-checkout-izipay", standalone: true, imports: [CommonModule], template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card bg-dark text-white border-secondary shadow-lg">
            <div class="card-header border-secondary text-center py-3">
              <h4 class="mb-0 text-warning text-uppercase fw-bold">Resumen de Compra</h4>
            </div>
            
            <div class="card-body p-4">
              <div class="d-flex justify-content-between mb-2">
                <span class="text-secondary">Producto:</span>
                <span class="fw-bold">Muestra / Cat\xE1logo Virtual</span>
              </div>
              <div class="d-flex justify-content-between mb-3 pb-3 border-bottom border-secondary">
                <span class="text-secondary">Moneda:</span>
                <span class="fw-bold">Soles (PEN)</span>
              </div>
              <div class="d-flex justify-content-between fs-5 fw-bold mb-4">
                <span>Total a pagar:</span>
                <span class="text-warning">S/ {{ checkoutAmount().toFixed(2) }}</span>
              </div>

              @if (errorMessage()) {
                <div class="alert alert-danger d-flex align-items-center small" role="alert">
                  <i class="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>{{ errorMessage() }}</div>
                </div>
              }

              @if (paymentSuccess()) {
                <div class="alert alert-success text-center" role="alert">
                  <i class="bi bi-check-circle-fill fs-2 d-block mb-2"></i>
                  <h5 class="fw-bold">\xA1Pago Confirmado!</h5>
                  <p class="mb-0 small">Transacci\xF3n completada exitosamente.</p>
                </div>
              } @else {
                <button
                  type="button"
                  class="btn btn-warning w-100 py-2 fw-bold text-uppercase d-flex align-items-center justify-content-center gap-2"
                  [disabled]="isLoading()"
                  (click)="processCheckout()"
                >
                  @if (isLoading()) {
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>Procesando...</span>
                  } @else {
                    <i class="bi bi-credit-card-fill fs-5"></i>
                    <span>Pagar con Izipay / Yape</span>
                  }
                </button>
              }
            </div>

            <div class="card-footer border-secondary text-center py-2">
              <small class="text-secondary">
                <i class="bi bi-shield-lock-fill me-1"></i> Transacci\xF3n 100% segura
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;ee1816b5e880f8888f62c5078a93704231639024387124c27db4f9aefae4ffe0;/home/linuxlite/WebMEAN/src/app/componentes/isipay.ts */\n.card {\n  border-radius: 8px;\n}\n/*# sourceMappingURL=isipay.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CheckoutIzipayComponent, { className: "CheckoutIzipayComponent", filePath: "src/app/componentes/isipay.ts", lineNumber: 116 });
})();

// src/app/componentes/speech.ts
var _forTrack0 = ($index, $item) => $item.name;
function TextToSpeechComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const voice_r1 = ctx.$implicit;
    \u0275\u0275property("value", voice_r1.name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", voice_r1.name, " (", voice_r1.lang, ") ");
  }
}
function TextToSpeechComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function TextToSpeechComponent_Conditional_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.resume());
    });
    \u0275\u0275text(1, "Kutinariy (Reanudar)");
    \u0275\u0275elementEnd();
  }
}
function TextToSpeechComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", function TextToSpeechComponent_Conditional_20_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.pause());
    });
    \u0275\u0275text(1, "Sayachiy (Pausar)");
    \u0275\u0275elementEnd();
  }
}
function TextToSpeechComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function TextToSpeechComponent_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.speak());
    });
    \u0275\u0275text(1, " Uyariway (Reproducir) ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !ctx_r2.text());
  }
}
var TextToSpeechComponent = class _TextToSpeechComponent {
  platformId = inject(PLATFORM_ID);
  synth;
  utterance;
  // Recibe el texto directamente del componente padre
  text = input("", ...ngDevMode ? [{ debugName: "text" }] : []);
  voices = signal([], ...ngDevMode ? [{ debugName: "voices" }] : []);
  rate = signal(1, ...ngDevMode ? [{ debugName: "rate" }] : []);
  pitch = signal(1, ...ngDevMode ? [{ debugName: "pitch" }] : []);
  isSpeaking = signal(false, ...ngDevMode ? [{ debugName: "isSpeaking" }] : []);
  isPaused = signal(false, ...ngDevMode ? [{ debugName: "isPaused" }] : []);
  selectedVoiceName = signal("", ...ngDevMode ? [{ debugName: "selectedVoiceName" }] : []);
  ngOnInit() {
    if (isPlatformBrowser(this.platformId) && "speechSynthesis" in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== void 0) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }
  ngOnDestroy() {
    this.stop();
    if (this.synth) {
      this.synth.onvoiceschanged = null;
    }
  }
  loadVoices() {
    if (!this.synth)
      return;
    const availableVoices = this.synth.getVoices();
    this.voices.set(availableVoices);
    let targetVoice = availableVoices.find((v) => v.lang.toLowerCase().startsWith("qu"));
    if (!targetVoice) {
      targetVoice = availableVoices.find((v) => v.lang.toLowerCase().startsWith("es"));
    }
    if (targetVoice) {
      this.selectedVoiceName.set(targetVoice.name);
    } else if (availableVoices.length > 0) {
      this.selectedVoiceName.set(availableVoices[0].name);
    }
  }
  speak() {
    if (!this.synth || !this.text())
      return;
    this.synth.cancel();
    this.utterance = new SpeechSynthesisUtterance(this.text());
    this.utterance.lang = "qu-PE";
    const voice = this.voices().find((v) => v.name === this.selectedVoiceName());
    if (voice) {
      this.utterance.voice = voice;
    }
    this.utterance.rate = this.rate();
    this.utterance.pitch = this.pitch();
    this.utterance.onstart = () => {
      this.isSpeaking.set(true);
      this.isPaused.set(false);
    };
    this.utterance.onend = () => {
      this.isSpeaking.set(false);
      this.isPaused.set(false);
    };
    this.utterance.onerror = (event) => {
      console.error("Error en SpeechSynthesis:", event);
      this.isSpeaking.set(false);
      this.isPaused.set(false);
    };
    this.synth.speak(this.utterance);
  }
  pause() {
    if (this.synth && this.isSpeaking()) {
      this.synth.pause();
      this.isPaused.set(true);
    }
  }
  resume() {
    if (this.synth && this.isPaused()) {
      this.synth.resume();
      this.isPaused.set(false);
    }
  }
  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking.set(false);
      this.isPaused.set(false);
    }
  }
  static \u0275fac = function TextToSpeechComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TextToSpeechComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TextToSpeechComponent, selectors: [["app-text-to-speech"]], inputs: { text: [1, "text"] }, decls: 24, vars: 7, consts: [[1, "tts-container"], [1, "form-group"], ["for", "voiceSelect"], ["id", "voiceSelect", 3, "ngModelChange", "ngModel"], [3, "value"], [1, "sliders-grid"], ["type", "range", "min", "0.5", "max", "2", "step", "0.1", 3, "ngModelChange", "ngModel"], [1, "controls"], [1, "btn", "btn-resume"], [1, "btn", "btn-pause"], [1, "btn", "btn-play", 3, "disabled"], [1, "btn", "btn-stop", 3, "click", "disabled"], [1, "btn", "btn-resume", 3, "click"], [1, "btn", "btn-pause", 3, "click"], [1, "btn", "btn-play", 3, "click", "disabled"]], template: function TextToSpeechComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2");
      \u0275\u0275text(2, "Rimayman Tukuchiq (Quechua)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 1)(4, "label", 2);
      \u0275\u0275text(5, "Voz (Rimana):");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "select", 3);
      \u0275\u0275listener("ngModelChange", function TextToSpeechComponent_Template_select_ngModelChange_6_listener($event) {
        return ctx.selectedVoiceName.set($event);
      });
      \u0275\u0275repeaterCreate(7, TextToSpeechComponent_For_8_Template, 2, 3, "option", 4, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 5)(10, "div", 1)(11, "label");
      \u0275\u0275text(12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "input", 6);
      \u0275\u0275listener("ngModelChange", function TextToSpeechComponent_Template_input_ngModelChange_13_listener($event) {
        return ctx.rate.set($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "div", 1)(15, "label");
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "input", 6);
      \u0275\u0275listener("ngModelChange", function TextToSpeechComponent_Template_input_ngModelChange_17_listener($event) {
        return ctx.pitch.set($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(18, "div", 7);
      \u0275\u0275conditionalCreate(19, TextToSpeechComponent_Conditional_19_Template, 2, 0, "button", 8)(20, TextToSpeechComponent_Conditional_20_Template, 2, 0, "button", 9)(21, TextToSpeechComponent_Conditional_21_Template, 2, 1, "button", 10);
      \u0275\u0275elementStart(22, "button", 11);
      \u0275\u0275listener("click", function TextToSpeechComponent_Template_button_click_22_listener() {
        return ctx.stop();
      });
      \u0275\u0275text(23, " Tukuypaq sayachiy (Detener) ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275property("ngModel", ctx.selectedVoiceName());
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.voices());
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("Utqaylla (Velocidad): ", ctx.rate(), "x");
      \u0275\u0275advance();
      \u0275\u0275property("ngModel", ctx.rate());
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("Kunkap sayaynin (Tono): ", ctx.pitch());
      \u0275\u0275advance();
      \u0275\u0275property("ngModel", ctx.pitch());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isSpeaking() && ctx.isPaused() ? 19 : ctx.isSpeaking() ? 20 : 21);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", !ctx.isSpeaking());
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, RangeValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.tts-container[_ngcontent-%COMP%] {\n  max-width: 500px;\n  margin: 2rem auto;\n  padding: 1.5rem;\n  border-radius: 12px;\n  background-color: #1e293b;\n  color: #f8fafc;\n  font-family:\n    system-ui,\n    -apple-system,\n    sans-serif;\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);\n}\nh2[_ngcontent-%COMP%] {\n  margin-top: 0;\n  color: #38bdf8;\n  text-align: center;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1.2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.4rem;\n}\nlabel[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #94a3b8;\n}\ntextarea[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%], \ninput[type=range][_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.6rem;\n  border-radius: 6px;\n  border: 1px solid #334155;\n  background-color: #0f172a;\n  color: #f8fafc;\n  box-sizing: border-box;\n}\ntextarea[_ngcontent-%COMP%]:focus, \nselect[_ngcontent-%COMP%]:focus {\n  outline: 2px solid #38bdf8;\n  border-color: transparent;\n}\n.sliders-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.8rem;\n  margin-top: 1rem;\n}\n.btn[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 0.75rem;\n  border: none;\n  border-radius: 6px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: background-color 0.2s, opacity 0.2s;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.btn-play[_ngcontent-%COMP%] {\n  background-color: #22c55e;\n  color: #052e16;\n}\n.btn-play[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #16a34a;\n}\n.btn-pause[_ngcontent-%COMP%] {\n  background-color: #eab308;\n  color: #422006;\n}\n.btn-pause[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #ca8a04;\n}\n.btn-resume[_ngcontent-%COMP%] {\n  background-color: #3b82f6;\n  color: #1e3a8a;\n}\n.btn-resume[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #2563eb;\n}\n.btn-stop[_ngcontent-%COMP%] {\n  background-color: #ef4444;\n  color: #450a0a;\n}\n.btn-stop[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #dc2626;\n}\n/*# sourceMappingURL=speech.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextToSpeechComponent, [{
    type: Component,
    args: [{ selector: "app-text-to-speech", standalone: true, imports: [CommonModule, FormsModule], template: `
    <div class="tts-container">
      <h2>Rimayman Tukuchiq (Quechua)</h2>

      <!-- Input de Texto recibido del padre -->
      <!-- <div class="form-group">
        <label for="textInput">Rimay qillqa (Texto en Espa\xF1ol y Quechua):</label>
        <textarea
          id="textInput"
          rows="4"
          [value]="text()"
          readonly
          placeholder="Kaypi qillqay..."
        ></textarea>
      </div> -->

      <!-- Selector de Voces -->
      <div class="form-group">
        <label for="voiceSelect">Voz (Rimana):</label>
        <select
          id="voiceSelect"
          [ngModel]="selectedVoiceName()"
          (ngModelChange)="selectedVoiceName.set($event)"
        >
          @for (voice of voices(); track voice.name) {
            <option [value]="voice.name">
              {{ voice.name }} ({{ voice.lang }})
            </option>
          }
        </select>
      </div>

      <!-- Controles de Audio (Velocidad y Tono) -->
      <div class="sliders-grid">
        <div class="form-group">
          <label>Utqaylla (Velocidad): {{ rate() }}x</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            [ngModel]="rate()"
            (ngModelChange)="rate.set($event)"
          />
        </div>

        <div class="form-group">
          <label>Kunkap sayaynin (Tono): {{ pitch() }}</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            [ngModel]="pitch()"
            (ngModelChange)="pitch.set($event)"
          />
        </div>
      </div>

      <!-- Botones de Acci\xF3n -->
      <div class="controls">
        @if (isSpeaking() && isPaused()) {
          <button class="btn btn-resume" (click)="resume()">Kutinariy (Reanudar)</button>
        } @else if (isSpeaking()) {
          <button class="btn btn-pause" (click)="pause()">Sayachiy (Pausar)</button>
        } @else {
          <button class="btn btn-play" (click)="speak()" [disabled]="!text()">
            Uyariway (Reproducir)
          </button>
        }

        <button
          class="btn btn-stop"
          (click)="stop()"
          [disabled]="!isSpeaking()"
        >
          Tukuypaq sayachiy (Detener)
        </button>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;67a0dd0b24276149ac00c1a00ce22cfb0ab3c0c1482f7e51e9f85daf3580b601;/home/linuxlite/WebMEAN/src/app/componentes/speech.ts */\n.tts-container {\n  max-width: 500px;\n  margin: 2rem auto;\n  padding: 1.5rem;\n  border-radius: 12px;\n  background-color: #1e293b;\n  color: #f8fafc;\n  font-family:\n    system-ui,\n    -apple-system,\n    sans-serif;\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);\n}\nh2 {\n  margin-top: 0;\n  color: #38bdf8;\n  text-align: center;\n}\n.form-group {\n  margin-bottom: 1.2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.4rem;\n}\nlabel {\n  font-size: 0.9rem;\n  color: #94a3b8;\n}\ntextarea,\nselect,\ninput[type=range] {\n  width: 100%;\n  padding: 0.6rem;\n  border-radius: 6px;\n  border: 1px solid #334155;\n  background-color: #0f172a;\n  color: #f8fafc;\n  box-sizing: border-box;\n}\ntextarea:focus,\nselect:focus {\n  outline: 2px solid #38bdf8;\n  border-color: transparent;\n}\n.sliders-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.controls {\n  display: flex;\n  gap: 0.8rem;\n  margin-top: 1rem;\n}\n.btn {\n  flex: 1;\n  padding: 0.75rem;\n  border: none;\n  border-radius: 6px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: background-color 0.2s, opacity 0.2s;\n}\n.btn:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.btn-play {\n  background-color: #22c55e;\n  color: #052e16;\n}\n.btn-play:hover:not(:disabled) {\n  background-color: #16a34a;\n}\n.btn-pause {\n  background-color: #eab308;\n  color: #422006;\n}\n.btn-pause:hover:not(:disabled) {\n  background-color: #ca8a04;\n}\n.btn-resume {\n  background-color: #3b82f6;\n  color: #1e3a8a;\n}\n.btn-resume:hover:not(:disabled) {\n  background-color: #2563eb;\n}\n.btn-stop {\n  background-color: #ef4444;\n  color: #450a0a;\n}\n.btn-stop:hover:not(:disabled) {\n  background-color: #dc2626;\n}\n/*# sourceMappingURL=speech.css.map */\n"] }]
  }], null, { text: [{ type: Input, args: [{ isSignal: true, alias: "text", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TextToSpeechComponent, { className: "TextToSpeechComponent", filePath: "src/app/componentes/speech.ts", lineNumber: 183 });
})();

// src/app/componentes/exhibicionfiles.ts
var _forTrack02 = ($index, $item) => $item._id || $index;
function ArtCuratorshipComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-checkout-izipay");
  }
}
function ArtCuratorshipComponent_Conditional_5_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 9);
  }
  if (rf & 2) {
    const userProfile_r1 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.getPerfilImageUrl(userProfile_r1.foto), \u0275\u0275sanitizeUrl)("alt", userProfile_r1.name || "Foto del usuario");
  }
}
function ArtCuratorshipComponent_Conditional_5_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const userProfile_r1 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getInitial(userProfile_r1.name || userProfile_r1.email), " ");
  }
}
function ArtCuratorshipComponent_Conditional_5_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 14)(1, "strong");
    \u0275\u0275text(2, "Tel\xE9fono:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const userProfile_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", userProfile_r1.cell || userProfile_r1.celular);
  }
}
function ArtCuratorshipComponent_Conditional_5_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "a", 24);
    \u0275\u0275element(2, "i", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 26);
    \u0275\u0275listener("click", function ArtCuratorshipComponent_Conditional_5_Conditional_13_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const userProfile_r1 = \u0275\u0275nextContext();
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sendWhatsAppMessage(userProfile_r1.cell || userProfile_r1.celular, userProfile_r1.name));
    });
    \u0275\u0275element(4, "i", 27);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const userProfile_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("href", "tel:" + (userProfile_r1.cell || userProfile_r1.celular), \u0275\u0275sanitizeUrl);
  }
}
function ArtCuratorshipComponent_Conditional_5_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "strong", 28);
    \u0275\u0275text(2, "Sobre el curador/usuario:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "div", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const userProfile_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("appMathRenderer", userProfile_r1.filosophy);
  }
}
function ArtCuratorshipComponent_Conditional_5_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275listener("click", function ArtCuratorshipComponent_Conditional_5_Conditional_23_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openModal("1", "Publicar Nueva Obra/Muestra"));
    });
    \u0275\u0275element(1, "i", 31);
    \u0275\u0275text(2, " Nueva obra ");
    \u0275\u0275elementEnd();
  }
}
function ArtCuratorshipComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "div", 7)(3, "div", 8);
    \u0275\u0275conditionalCreate(4, ArtCuratorshipComponent_Conditional_5_Conditional_4_Template, 1, 2, "img", 9)(5, ArtCuratorshipComponent_Conditional_5_Conditional_5_Template, 2, 1, "div", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 11)(7, "div")(8, "h4", 12);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "small", 13);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, ArtCuratorshipComponent_Conditional_5_Conditional_12_Template, 4, 1, "small", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(13, ArtCuratorshipComponent_Conditional_5_Conditional_13_Template, 5, 1, "div", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, ArtCuratorshipComponent_Conditional_5_Conditional_14_Template, 4, 1, "div", 16);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 17)(16, "div", 18)(17, "div", 19)(18, "div", 20)(19, "h2", 21);
    \u0275\u0275text(20, "Curadur\xEDa & Galer\xEDa de Arte");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "p", 22);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(23, ArtCuratorshipComponent_Conditional_5_Conditional_23_Template, 3, 0, "button", 23);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_9_0;
    const userProfile_r1 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(userProfile_r1.foto ? 4 : 5);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(userProfile_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(userProfile_r1.email);
    \u0275\u0275advance();
    \u0275\u0275conditional(userProfile_r1.cell || userProfile_r1.celular ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(userProfile_r1.cell || userProfile_r1.celular ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(userProfile_r1.filosophy ? 14 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" Espacio de exhibici\xF3n, an\xE1lisis cr\xEDtico y debate sobre colecciones visuales de ", userProfile_r1.name, ". ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.userSession() && ctx_r1.emailWorks === ((tmp_9_0 = ctx_r1.userSession()) == null ? null : tmp_9_0._id) || ((tmp_9_0 = ctx_r1.userSession()) == null ? null : tmp_9_0.rol) === "1" ? 23 : -1);
  }
}
function ArtCuratorshipComponent_For_8_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "button", 55);
    \u0275\u0275listener("click", function ArtCuratorshipComponent_For_8_Conditional_11_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r6 = \u0275\u0275nextContext();
      const artwork_r8 = ctx_r6.$implicit;
      const \u0275$index_86_r9 = ctx_r6.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openModal("1w", "Actualizar Obra/Muestra", artwork_r8.title, artwork_r8.detail, { i: \u0275$index_86_r9, j: -1, k: -1 }, artwork_r8._id));
    });
    \u0275\u0275element(2, "i", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 57);
    \u0275\u0275listener("click", function ArtCuratorshipComponent_For_8_Conditional_11_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r6);
      const artwork_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeTheme(artwork_r8._id));
    });
    \u0275\u0275element(4, "i", 58);
    \u0275\u0275elementEnd()();
  }
}
function ArtCuratorshipComponent_For_8_Conditional_14_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-glb-viewer", 59);
  }
  if (rf & 2) {
    const artwork_r8 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("glbSource", ctx_r1.getImageUrl(artwork_r8.imageUrl));
  }
}
function ArtCuratorshipComponent_For_8_Conditional_14_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 60);
  }
  if (rf & 2) {
    const artwork_r8 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.getImageUrl(artwork_r8.imageUrl), \u0275\u0275sanitizeUrl)("alt", artwork_r8.title);
  }
}
function ArtCuratorshipComponent_For_8_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275conditionalCreate(1, ArtCuratorshipComponent_For_8_Conditional_14_Conditional_1_Template, 1, 1, "app-glb-viewer", 59)(2, ArtCuratorshipComponent_For_8_Conditional_14_Conditional_2_Template, 1, 2, "img", 60);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const artwork_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(artwork_r8.imageUrl.endsWith(".glb") || artwork_r8.imageUrl.endsWith(".obj") || artwork_r8.imageUrl.endsWith(".gltf") ? 1 : 2);
  }
}
function ArtCuratorshipComponent_For_8_Conditional_15_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64)(1, "div", 66)(2, "span", 67);
    \u0275\u0275text(3, "ES");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "audio", 68);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const artwork_r8 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("src", ctx_r1.getImageUrl(artwork_r8.audioEsUrl), \u0275\u0275sanitizeUrl);
  }
}
function ArtCuratorshipComponent_For_8_Conditional_15_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "div", 66)(2, "span", 69);
    \u0275\u0275text(3, "QU");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "audio", 68);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const artwork_r8 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("src", ctx_r1.getImageUrl(artwork_r8.audioQuUrl), \u0275\u0275sanitizeUrl);
  }
}
function ArtCuratorshipComponent_For_8_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "small", 61);
    \u0275\u0275element(2, "i", 62);
    \u0275\u0275text(3, " Audiogu\xEDa de la Muestra ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 63);
    \u0275\u0275conditionalCreate(5, ArtCuratorshipComponent_For_8_Conditional_15_Conditional_5_Template, 5, 1, "div", 64);
    \u0275\u0275conditionalCreate(6, ArtCuratorshipComponent_For_8_Conditional_15_Conditional_6_Template, 5, 1, "div", 65);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const artwork_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275conditional(artwork_r8.audioEsUrl ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(artwork_r8.audioQuUrl ? 6 : -1);
  }
}
function ArtCuratorshipComponent_For_8_Conditional_33_For_6_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 77)(1, "button", 86);
    \u0275\u0275listener("click", function ArtCuratorshipComponent_For_8_Conditional_33_For_6_Conditional_10_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r14 = \u0275\u0275nextContext();
      const essay_r16 = ctx_r14.$implicit;
      const \u0275$index_200_r17 = ctx_r14.$index;
      const ctx_r6 = \u0275\u0275nextContext(2);
      const artwork_r8 = ctx_r6.$implicit;
      const \u0275$index_86_r9 = ctx_r6.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openModal("2w", "Actualizar Ensayo", essay_r16.title || "", essay_r16.detail, { i: \u0275$index_86_r9, j: \u0275$index_200_r17, k: -1 }, artwork_r8._id));
    });
    \u0275\u0275element(2, "i", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 87);
    \u0275\u0275listener("click", function ArtCuratorshipComponent_For_8_Conditional_33_For_6_Conditional_10_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r14);
      const \u0275$index_200_r17 = \u0275\u0275nextContext().$index;
      const ctx_r6 = \u0275\u0275nextContext(2);
      const artwork_r8 = ctx_r6.$implicit;
      const \u0275$index_86_r9 = ctx_r6.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeSubTheme(\u0275$index_86_r9, \u0275$index_200_r17, artwork_r8._id));
    });
    \u0275\u0275element(4, "i", 58);
    \u0275\u0275elementEnd()();
  }
}
function ArtCuratorshipComponent_For_8_Conditional_33_For_6_Conditional_22_For_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 91)(1, "button", 92);
    \u0275\u0275listener("click", function ArtCuratorshipComponent_For_8_Conditional_33_For_6_Conditional_22_For_2_Conditional_11_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r18 = \u0275\u0275nextContext();
      const annotation_r20 = ctx_r18.$implicit;
      const \u0275$index_251_r21 = ctx_r18.$index;
      const \u0275$index_200_r17 = \u0275\u0275nextContext(2).$index;
      const ctx_r6 = \u0275\u0275nextContext(2);
      const artwork_r8 = ctx_r6.$implicit;
      const \u0275$index_86_r9 = ctx_r6.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openModal("3w", "Editar Anotaci\xF3n", annotation_r20.title || "", annotation_r20.detail, { i: \u0275$index_86_r9, j: \u0275$index_200_r17, k: \u0275$index_251_r21 }, artwork_r8._id));
    });
    \u0275\u0275element(2, "i", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 93);
    \u0275\u0275listener("click", function ArtCuratorshipComponent_For_8_Conditional_33_For_6_Conditional_22_For_2_Conditional_11_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r18);
      const \u0275$index_251_r21 = \u0275\u0275nextContext().$index;
      const \u0275$index_200_r17 = \u0275\u0275nextContext(2).$index;
      const ctx_r6 = \u0275\u0275nextContext(2);
      const artwork_r8 = ctx_r6.$implicit;
      const \u0275$index_86_r9 = ctx_r6.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeSubSubTheme(\u0275$index_86_r9, \u0275$index_200_r17, \u0275$index_251_r21, artwork_r8._id));
    });
    \u0275\u0275element(4, "i", 58);
    \u0275\u0275elementEnd()();
  }
}
function ArtCuratorshipComponent_For_8_Conditional_33_For_6_Conditional_22_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 88)(1, "div", 20)(2, "div", 89);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "span", 75);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small", 76);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 90);
    \u0275\u0275element(10, "markdown", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, ArtCuratorshipComponent_For_8_Conditional_33_For_6_Conditional_22_For_2_Conditional_11_Template, 5, 0, "div", 91);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_40_0;
    const annotation_r20 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getInitial(annotation_r20.user), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(annotation_r20.user);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatDate(annotation_r20.createdAt), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("katex", true)("data", annotation_r20.detail);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_40_0 = ctx_r1.userSession()) == null ? null : tmp_40_0.email) === annotation_r20.user || ((tmp_40_0 = ctx_r1.userSession()) == null ? null : tmp_40_0.rol) === "1" ? 11 : -1);
  }
}
function ArtCuratorshipComponent_For_8_Conditional_33_For_6_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 85);
    \u0275\u0275repeaterCreate(1, ArtCuratorshipComponent_For_8_Conditional_33_For_6_Conditional_22_For_2_Template, 12, 6, "div", 88, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const essay_r16 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(essay_r16.themes);
  }
}
function ArtCuratorshipComponent_For_8_Conditional_33_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 72)(1, "div", 73)(2, "div", 34)(3, "div", 74);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "span", 75);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "small", 76);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(10, ArtCuratorshipComponent_For_8_Conditional_33_For_6_Conditional_10_Template, 5, 0, "div", 77);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 78);
    \u0275\u0275element(12, "markdown", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 79)(14, "button", 80);
    \u0275\u0275listener("click", function ArtCuratorshipComponent_For_8_Conditional_33_For_6_Template_button_click_14_listener() {
      const \u0275$index_200_r17 = \u0275\u0275restoreView(_r13).$index;
      const ctx_r6 = \u0275\u0275nextContext(2);
      const artwork_r8 = ctx_r6.$implicit;
      const \u0275$index_86_r9 = ctx_r6.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleSubLike(\u0275$index_86_r9, \u0275$index_200_r17, artwork_r8._id, "like"));
    });
    \u0275\u0275element(15, "i", 81);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 82);
    \u0275\u0275listener("click", function ArtCuratorshipComponent_For_8_Conditional_33_For_6_Template_button_click_17_listener() {
      const \u0275$index_200_r17 = \u0275\u0275restoreView(_r13).$index;
      const ctx_r6 = \u0275\u0275nextContext(2);
      const artwork_r8 = ctx_r6.$implicit;
      const \u0275$index_86_r9 = ctx_r6.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleSubLike(\u0275$index_86_r9, \u0275$index_200_r17, artwork_r8._id, "unlike"));
    });
    \u0275\u0275element(18, "i", 83);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 84);
    \u0275\u0275listener("click", function ArtCuratorshipComponent_For_8_Conditional_33_For_6_Template_button_click_20_listener() {
      const \u0275$index_200_r17 = \u0275\u0275restoreView(_r13).$index;
      const ctx_r6 = \u0275\u0275nextContext(2);
      const artwork_r8 = ctx_r6.$implicit;
      const \u0275$index_86_r9 = ctx_r6.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openModal("3", "A\xF1adir Anotaci\xF3n", "", "", { i: \u0275$index_86_r9, j: \u0275$index_200_r17, k: -1 }, artwork_r8._id));
    });
    \u0275\u0275text(21, " A\xF1adir Anotaci\xF3n ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(22, ArtCuratorshipComponent_For_8_Conditional_33_For_6_Conditional_22_Template, 3, 0, "div", 85);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_26_0;
    const essay_r16 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getInitial(essay_r16.user), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(essay_r16.user);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Cr\xEDtica redactada el ", ctx_r1.formatDate(essay_r16.createdAt), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_26_0 = ctx_r1.userSession()) == null ? null : tmp_26_0.email) === essay_r16.user || ((tmp_26_0 = ctx_r1.userSession()) == null ? null : tmp_26_0.rol) === "1" ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("katex", true)("data", essay_r16.detail);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (essay_r16.likes == null ? null : essay_r16.likes.length) || 0, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", (essay_r16.unlikes == null ? null : essay_r16.unlikes.length) || 0, " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(essay_r16.themes && essay_r16.themes.length > 0 ? 22 : -1);
  }
}
function ArtCuratorshipComponent_For_8_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54)(1, "div", 70);
    \u0275\u0275element(2, "i", 71);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(5, ArtCuratorshipComponent_For_8_Conditional_33_For_6_Template, 23, 9, "div", 72, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const artwork_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Cr\xEDticas & An\xE1lisis Ensay\xEDsticos (", artwork_r8.units.length, ")");
    \u0275\u0275advance();
    \u0275\u0275repeater(artwork_r8.units);
  }
}
function ArtCuratorshipComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 3)(1, "div", 32)(2, "div", 33)(3, "div", 34)(4, "div", 35);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "span", 36);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "small", 37);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(11, ArtCuratorshipComponent_For_8_Conditional_11_Template, 5, 0, "div", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "h3", 39);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, ArtCuratorshipComponent_For_8_Conditional_14_Template, 3, 1, "div", 40);
    \u0275\u0275conditionalCreate(15, ArtCuratorshipComponent_For_8_Conditional_15_Template, 7, 2, "div", 41);
    \u0275\u0275elementStart(16, "div", 42);
    \u0275\u0275element(17, "markdown", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "app-text-to-speech", 44);
    \u0275\u0275elementStart(19, "div", 45)(20, "div", 46)(21, "button", 47);
    \u0275\u0275listener("click", function ArtCuratorshipComponent_For_8_Template_button_click_21_listener() {
      const ctx_r9 = \u0275\u0275restoreView(_r5);
      const artwork_r8 = ctx_r9.$implicit;
      const \u0275$index_86_r9 = ctx_r9.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleLike(\u0275$index_86_r9, artwork_r8._id, "like"));
    });
    \u0275\u0275element(22, "i", 48);
    \u0275\u0275elementStart(23, "span", 49);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "button", 50);
    \u0275\u0275listener("click", function ArtCuratorshipComponent_For_8_Template_button_click_25_listener() {
      const ctx_r10 = \u0275\u0275restoreView(_r5);
      const artwork_r8 = ctx_r10.$implicit;
      const \u0275$index_86_r9 = ctx_r10.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleLike(\u0275$index_86_r9, artwork_r8._id, "unlike"));
    });
    \u0275\u0275element(26, "i", 51);
    \u0275\u0275elementStart(27, "span", 49);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "button", 52);
    \u0275\u0275listener("click", function ArtCuratorshipComponent_For_8_Template_button_click_29_listener() {
      const ctx_r11 = \u0275\u0275restoreView(_r5);
      const artwork_r8 = ctx_r11.$implicit;
      const \u0275$index_86_r9 = ctx_r11.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openModal("2", "Redactar Ensayo Cr\xEDtico", "", "", { i: \u0275$index_86_r9, j: -1, k: -1 }, artwork_r8._id));
    });
    \u0275\u0275element(30, "i", 53);
    \u0275\u0275elementStart(31, "span");
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(33, ArtCuratorshipComponent_For_8_Conditional_33_Template, 7, 1, "div", 54);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_14_0;
    const artwork_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getInitial(artwork_r8.curator || artwork_r8.email), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Curador: ", artwork_r8.curator || "Curador An\xF3nimo", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Exhibido el ", ctx_r1.formatDate(artwork_r8.createdAt), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_14_0 = ctx_r1.userSession()) == null ? null : tmp_14_0.email) === artwork_r8.email || ((tmp_14_0 = ctx_r1.userSession()) == null ? null : tmp_14_0.rol) === "1" ? 11 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(artwork_r8.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(artwork_r8.imageUrl ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(artwork_r8.audioEsUrl || artwork_r8.audioQuUrl ? 15 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("katex", true)("data", artwork_r8.detail);
    \u0275\u0275advance();
    \u0275\u0275property("text", artwork_r8.detail.replace(/<[^>]*>/g, ""));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate((artwork_r8.likes == null ? null : artwork_r8.likes.length) || 0);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((artwork_r8.unlikes == null ? null : artwork_r8.unlikes.length) || 0);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Ensayos Cr\xEDticos (", (artwork_r8.units == null ? null : artwork_r8.units.length) || 0, ")");
    \u0275\u0275advance();
    \u0275\u0275conditional(artwork_r8.units && artwork_r8.units.length > 0 ? 33 : -1);
  }
}
function ArtCuratorshipComponent_Conditional_9_Conditional_10_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 113);
    \u0275\u0275element(1, "i", 120);
    \u0275\u0275text(2, " Archivo seleccionado: ");
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.selectedFile.name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (", (ctx_r1.selectedFile.size / 1024).toFixed(1), " KB) ");
  }
}
function ArtCuratorshipComponent_Conditional_9_Conditional_10_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 119);
    \u0275\u0275element(1, "i", 121);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedAudioEs.name, " ");
  }
}
function ArtCuratorshipComponent_Conditional_9_Conditional_10_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 119);
    \u0275\u0275element(1, "i", 121);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedAudioQu.name, " ");
  }
}
function ArtCuratorshipComponent_Conditional_9_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 101)(1, "label", 110);
    \u0275\u0275text(2, "T\xEDtulo de la Muestra / Obra");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 111);
    \u0275\u0275twoWayListener("ngModelChange", function ArtCuratorshipComponent_Conditional_9_Conditional_10_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.formTitle, $event) || (ctx_r1.formTitle = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 101)(5, "label", 110);
    \u0275\u0275text(6, "Adjuntar Archivo / Imagen de la Obra");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 112);
    \u0275\u0275listener("change", function ArtCuratorshipComponent_Conditional_9_Conditional_10_Template_input_change_7_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, ArtCuratorshipComponent_Conditional_9_Conditional_10_Conditional_8_Template, 6, 2, "small", 113);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 114)(10, "div", 115)(11, "div", 116)(12, "label", 102);
    \u0275\u0275element(13, "i", 117);
    \u0275\u0275text(14, " Audio en Espa\xF1ol (MP3/WAV) ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 118);
    \u0275\u0275listener("change", function ArtCuratorshipComponent_Conditional_9_Conditional_10_Template_input_change_15_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onAudioEsSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, ArtCuratorshipComponent_Conditional_9_Conditional_10_Conditional_16_Template, 3, 1, "small", 119);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 65)(18, "div", 116)(19, "label", 102);
    \u0275\u0275element(20, "i", 117);
    \u0275\u0275text(21, " Audio en Quechua (MP3/WAV) ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 118);
    \u0275\u0275listener("change", function ArtCuratorshipComponent_Conditional_9_Conditional_10_Template_input_change_22_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onAudioQuSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(23, ArtCuratorshipComponent_Conditional_9_Conditional_10_Conditional_23_Template, 3, 1, "small", 119);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formTitle);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.isUploading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectedFile ? 8 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", ctx_r1.isUploading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectedAudioEs ? 16 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx_r1.isUploading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectedAudioQu ? 23 : -1);
  }
}
function ArtCuratorshipComponent_Conditional_9_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 105)(1, "small", 122);
    \u0275\u0275text(2, "Vista previa del an\xE1lisis:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "div", 123);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("innerHTML", ctx_r1.formDetail, \u0275\u0275sanitizeHtml);
  }
}
function ArtCuratorshipComponent_Conditional_9_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 106)(1, "div", 124)(2, "span");
    \u0275\u0275text(3, "Subiendo archivo...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 125);
    \u0275\u0275element(7, "div", 126);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.uploadProgress(), "%");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.uploadProgress(), "%");
    \u0275\u0275attribute("aria-valuenow", ctx_r1.uploadProgress());
  }
}
function ArtCuratorshipComponent_Conditional_9_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 127);
    \u0275\u0275text(1, " Subiendo... ");
  }
}
function ArtCuratorshipComponent_Conditional_9_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Guardar en Galer\xEDa ");
  }
}
function ArtCuratorshipComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 94)(2, "div", 95)(3, "div", 96)(4, "h5", 97);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 98);
    \u0275\u0275listener("click", function ArtCuratorshipComponent_Conditional_9_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275elementStart(7, "span", 99);
    \u0275\u0275text(8, "\xD7");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 100);
    \u0275\u0275conditionalCreate(10, ArtCuratorshipComponent_Conditional_9_Conditional_10_Template, 24, 7);
    \u0275\u0275elementStart(11, "div", 101)(12, "label", 102);
    \u0275\u0275text(13, "Texto Curatorial / Ficha T\xE9cnica");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 103)(15, "ckeditor", 104);
    \u0275\u0275twoWayListener("ngModelChange", function ArtCuratorshipComponent_Conditional_9_Template_ckeditor_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formDetail, $event) || (ctx_r1.formDetail = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(16, ArtCuratorshipComponent_Conditional_9_Conditional_16_Template, 4, 1, "div", 105);
    \u0275\u0275conditionalCreate(17, ArtCuratorshipComponent_Conditional_9_Conditional_17_Template, 8, 4, "div", 106);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 107)(19, "button", 108);
    \u0275\u0275listener("click", function ArtCuratorshipComponent_Conditional_9_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(20, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 109);
    \u0275\u0275listener("click", function ArtCuratorshipComponent_Conditional_9_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleModalSubmit());
    });
    \u0275\u0275conditionalCreate(22, ArtCuratorshipComponent_Conditional_9_Conditional_22_Template, 2, 0)(23, ArtCuratorshipComponent_Conditional_9_Conditional_23_Template, 1, 0);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.submitLabel());
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.modalOption() === "1" || ctx_r1.modalOption() === "1w" ? 10 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275property("editor", ctx_r1.Editor)("config", ctx_r1.editorConfig);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formDetail);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.formDetail ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isUploading() ? 17 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.isUploading());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.isUploading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isUploading() ? 22 : 23);
  }
}
function isAuth() {
  const authData = localStorage.getItem("user");
  return authData ? JSON.parse(authData) : null;
}
var ArtCuratorshipComponent = class _ArtCuratorshipComponent {
  http = inject(HttpClient);
  router = inject(Router);
  toastr = inject(ToastrService);
  route = inject(ActivatedRoute);
  Editor = import_ckeditor5_build_classic.default;
  editorConfig = {
    language: "es",
    placeholder: "Escribe el an\xE1lisis o ficha t\xE9cnica...",
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
  currentWorksParam;
  emailWorks;
  usser = signal(null, ...ngDevMode ? [{ debugName: "usser" }] : []);
  artworkExhibits = signal([], ...ngDevMode ? [{ debugName: "artworkExhibits" }] : []);
  showModal = signal(false, ...ngDevMode ? [{ debugName: "showModal" }] : []);
  modalOption = signal("", ...ngDevMode ? [{ debugName: "modalOption" }] : []);
  submitLabel = signal("Publicar", ...ngDevMode ? [{ debugName: "submitLabel" }] : []);
  activeId = signal("", ...ngDevMode ? [{ debugName: "activeId" }] : []);
  activeIndices = signal({ i: -1, j: -1, k: -1 }, ...ngDevMode ? [{ debugName: "activeIndices" }] : []);
  formTitle = "";
  formDetail = "";
  uploadProgress = signal(0, ...ngDevMode ? [{ debugName: "uploadProgress" }] : []);
  isUploading = signal(false, ...ngDevMode ? [{ debugName: "isUploading" }] : []);
  selectedFile = null;
  selectedAudioEs = null;
  selectedAudioQu = null;
  userSession = computed(() => isAuth(), ...ngDevMode ? [{ debugName: "userSession" }] : []);
  ngOnInit() {
    document.title = `CURADUR\xCDA DE ARTE | ${environment.title || ""}`;
    this.route.params.subscribe((params) => {
      this.currentWorksParam = params["id"];
      this.emailWorks = params["email"];
      if (this.currentWorksParam) {
        this.getNotes(this.currentWorksParam);
      }
      if (this.emailWorks) {
        this.getUsser(this.emailWorks);
      }
    });
  }
  getImageUrl(imageUrl) {
    if (!imageUrl)
      return "";
    return imageUrl.startsWith("http") ? imageUrl : `${environment.apiURL}/${imageUrl}`;
  }
  getPerfilImageUrl(imageUrl) {
    if (!imageUrl)
      return "";
    return imageUrl.startsWith("http") ? imageUrl : `${environment.apiURL}/collections/${imageUrl}`;
  }
  onAudioEsSelected(event) {
    const input2 = event.target;
    if (input2.files && input2.files.length > 0) {
      this.selectedAudioEs = input2.files[0];
    }
  }
  onAudioQuSelected(event) {
    const input2 = event.target;
    if (input2.files && input2.files.length > 0) {
      this.selectedAudioQu = input2.files[0];
    }
  }
  onFileSelected(event) {
    const input2 = event.target;
    if (input2.files && input2.files.length > 0) {
      this.selectedFile = input2.files[0];
    }
  }
  getInitial(text) {
    if (!text)
      return "U";
    return text.charAt(0).toUpperCase();
  }
  formatDate(date) {
    if (!date)
      return "";
    return new Date(date).toLocaleDateString();
  }
  sendWhatsAppMessage(phone, name) {
    if (!phone)
      return;
    const cleanPhone = phone.replace(/\D/g, "");
    const url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=Hola%20${encodeURIComponent(name || "")},%20me%20comunico%20desde%20la%20Galer\xEDa%20de%20Arte.`;
    window.open(url, "_blank");
  }
  getNotes(worksParam) {
    this.http.get(`${environment.apiURL}/api/exhibitiones/${worksParam}`).subscribe({
      next: (data) => {
        this.artworkExhibits.set(data || []);
      },
      error: (err) => {
        console.error("Error al obtener la galer\xEDa:", err);
        this.toastr.error("Error al cargar la galer\xEDa de muestras");
      }
    });
  }
  getUsser(emailParam) {
    this.http.get(`${environment.apiURL}/api/users/userrfree/${emailParam}`).subscribe({
      next: (data) => {
        this.usser.set(data || null);
      },
      error: (err) => console.error("Error al obtener usuario:", err)
    });
  }
  openModal(option, submitText, title = "", detail = "", indices = { i: -1, j: -1, k: -1 }, id = "") {
    this.modalOption.set(option);
    this.submitLabel.set(submitText);
    this.formTitle = title;
    this.formDetail = detail;
    this.activeIndices.set(indices);
    this.activeId.set(id);
    this.selectedFile = null;
    this.selectedAudioEs = null;
    this.selectedAudioQu = null;
    this.showModal.set(true);
  }
  closeModal() {
    if (this.isUploading())
      return;
    this.showModal.set(false);
    this.formTitle = "";
    this.formDetail = "";
    this.selectedFile = null;
    this.selectedAudioEs = null;
    this.selectedAudioQu = null;
  }
  handleModalSubmit() {
    const opt = this.modalOption();
    const currentUser = this.userSession()?.name || this.userSession()?.email || "An\xF3nimo";
    if (opt === "1" || opt === "1w") {
      const formData = new FormData();
      formData.append("title", this.formTitle);
      formData.append("detail", this.formDetail);
      formData.append("curator", currentUser);
      formData.append("email", this.userSession()?.email || "");
      formData.append("type", "curatorship");
      if (this.selectedFile) {
        formData.append("image", this.selectedFile);
      }
      if (this.selectedAudioEs) {
        formData.append("audioEs", this.selectedAudioEs);
      }
      if (this.selectedAudioQu) {
        formData.append("audioQu", this.selectedAudioQu);
      }
      const url = opt === "1" ? `${environment.apiURL}/api/exhibitiones/${this.currentWorksParam}` : `${environment.apiURL}/api/exhibitiones/item/${this.activeId()}`;
      const req = new HttpRequest(opt === "1" ? "POST" : "PUT", url, formData, {
        reportProgress: true
      });
      this.isUploading.set(true);
      this.uploadProgress.set(0);
      this.http.request(req).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            const percent = Math.round(100 * event.loaded / event.total);
            this.uploadProgress.set(percent);
          } else if (event instanceof HttpResponse) {
            this.isUploading.set(false);
            this.toastr.success(opt === "1" ? "Obra publicada con \xE9xito" : "Obra actualizada con \xE9xito");
            this.closeModal();
            this.getNotes(this.currentWorksParam);
          }
        },
        error: (err) => {
          this.isUploading.set(false);
          console.error("Error al guardar la muestra:", err);
          this.toastr.error("Error al procesar la solicitud");
        }
      });
    }
  }
  removeTheme(id) {
    if (confirm("\xBFEst\xE1s seguro de eliminar esta muestra de la galer\xEDa?")) {
      this.http.delete(`${environment.apiURL}/api/exhibitiones/item/${id}`).subscribe({
        next: () => {
          this.toastr.success("Muestra eliminada");
          this.getNotes(this.currentWorksParam);
        },
        error: (err) => {
          console.error("Error al eliminar:", err);
          this.toastr.error("No se pudo eliminar la muestra");
        }
      });
    }
  }
  removeSubTheme(i, j, artworkId) {
  }
  removeSubSubTheme(i, j, k, artworkId) {
  }
  handleLike(i, artworkId, type) {
  }
  handleSubLike(i, j, artworkId, type) {
  }
  static \u0275fac = function ArtCuratorshipComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ArtCuratorshipComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ArtCuratorshipComponent, selectors: [["app-art-curatorship"]], decls: 10, vars: 3, consts: [[1, "py-5"], [1, "bg-dark", "text-light", "min-vh-100", "pb-5", "pt-4"], [1, "container", "my-4", 2, "max-width", "1080px"], [1, "card", "bg-secondary-dark", "text-light", "border-0", "shadow-lg", "overflow-hidden", "mb-4"], ["tabindex", "-1", 1, "modal", "show", "d-block", "fade", 2, "background-color", "rgba(0,0,0,0.85)"], [1, "card", "border-0", "shadow-lg", "mb-4", "bg-secondary-dark", "text-white", "border-left", "border-info", 2, "border-left-width", "4px !important"], [1, "card-body", "p-4", "border", "rounded"], [1, "align-items-center", "mb-3"], [1, "text-center", "mb-3"], [1, "rounded-circle", "border-info", "shadow-sm", "object-fit-cover-style", 2, "width", "194px", "height", "194px", "object-fit", "cover", 3, "src", "alt"], [1, "rounded-circle", "bg-info", "text-dark", "d-inline-flex", "align-items-center", "justify-content-center", "font-weight-bold", "shadow-sm", 2, "width", "54px", "height", "54px", "font-size", "22px"], [1, "d-flex", "flex-column", "flex-sm-row", "align-items-sm-center", "justify-content-between"], [1, "font-weight-bold", "mb-0", "text-white"], [1, "text-info", "d-block"], [1, "text-light", "d-block", "mt-1"], ["role", "group", 1, "btn-group", "mt-3", "mt-sm-0"], [1, "col-12", "mt-3", "pt-3", "border-top", "border-secondary", "text-light", "px-0"], [1, "card", "border-0", "shadow-lg", "mb-4", "bg-gradient-dark", "text-white", "border-left", "border-warning", 2, "border-left-width", "4px !important"], [1, "card-body", "p-4", "p-md-5", "d-flex", "flex-column", "flex-md-row", "justify-content-between", "align-items-md-center"], [1, "mb-3", "mb-md-0"], [1, "d-flex", "align-items-center", "mb-2"], [1, "font-weight-bold", "mb-0", "text-uppercase", "tracking-wider"], [1, "text-secondary", "mb-0"], [1, "btn", "btn-warning"], ["title", "Llamar", 1, "btn", "btn-info", 3, "href"], [1, "bi", "bi-telephone-fill"], ["type", "button", "title", "WhatsApp", 1, "btn", "btn-success", 3, "click"], [1, "bi", "bi-whatsapp"], [1, "text-info"], [3, "appMathRenderer"], [1, "btn", "btn-warning", 3, "click"], [1, "bi", "bi-plus-lg", "mr-1"], [1, "card-body", "p-4", "p-md-5"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4", "pb-3", "border-bottom", "border-secondary"], [1, "d-flex", "align-items-center"], [1, "rounded-circle", "bg-warning", "text-dark", "d-inline-flex", "align-items-center", "justify-content-center", "font-weight-bold", "shadow-sm", "flex-shrink-0", "mr-3", 2, "width", "46px", "height", "46px", "font-size", "18px"], [1, "font-weight-bold", "text-warning", "d-block", "mb-0", 2, "line-height", "1.2"], [1, "text-muted"], ["role", "group", 1, "btn-group"], [1, "font-weight-bold", "text-white", "mb-3", "text-uppercase", "font-serif"], [1, "card-image-wrapper", "position-relative", "mb-3", "overflow-hidden", "rounded"], [1, "p-3", "bg-dark", "border", "border-secondary", "rounded", "mb-3"], [1, "artwork-markdown-container", "mb-4"], [3, "katex", "data"], [3, "text"], [1, "d-flex", "align-items-center", "pt-3", "border-top", "border-secondary", "flex-wrap"], ["role", "group", 1, "btn-group", "p-1", "mr-auto", "mb-2", "mb-sm-0"], ["title", "Apreciaci\xF3n Favorable", 1, "btn", "btn-sm", "btn-outline-warning", "rounded-0", "px-3", "border-0", "d-flex", "align-items-center", "mr-1", 3, "click"], [1, "bi", "bi-award-fill", "mr-1"], [1, "font-weight-bold", "font-italic", "small"], ["title", "En Revisi\xF3n", 1, "btn", "btn-sm", "btn-outline-secondary", "rounded-0", "px-3", "border-0", "d-flex", "align-items-center", 3, "click"], [1, "bi", "bi-award", "mr-1"], [1, "btn", "btn-sm", "btn-outline-warning", "rounded-0", "px-3", "py-2", "d-flex", "align-items-center", "font-weight-bold", "text-uppercase", 3, "click"], [1, "bi", "bi-journal-text", "h5", "mb-0", "mr-2"], [1, "mt-4", "pt-4", "border-left", "border-warning", "rounded-0", "p-3", "p-md-4", "ml-md-2", "bg-dark", 2, "border-left-width", "3px !important", "background-color", "rgba(0,0,0,0.25) !important"], ["title", "Editar Muestra", 1, "btn", "btn-sm", "btn-outline-light", "border-0", "rounded-circle", "mr-1", 3, "click"], [1, "bi", "bi-pencil-fill"], ["title", "Eliminar de Galer\xEDa", 1, "btn", "btn-sm", "btn-outline-danger", "border-0", "rounded-circle", 3, "click"], [1, "bi", "bi-trash-fill"], [3, "glbSource"], [1, "img-fluid", "w-100", "object-fit-cover-style", 2, "max-height", "450px", 3, "src", "alt"], [1, "font-weight-bold", "text-warning", "text-uppercase", "d-block", "mb-2"], [1, "bi", "bi-volume-up-fill", "mr-1"], [1, "row"], [1, "col-md-6", "mb-2", "mb-md-0"], [1, "col-md-6"], [1, "d-flex", "align-items-center", "bg-secondary-dark", "p-2", "rounded"], [1, "badge", "badge-warning", "text-dark", "mr-2"], ["controls", "", 1, "w-100", 2, "height", "32px", 3, "src"], [1, "badge", "badge-info", "text-dark", "mr-2"], [1, "d-flex", "align-items-center", "text-warning", "font-weight-bold", "small", "text-uppercase", "mb-3", "tracking-wider"], [1, "bi", "bi-vector-pen", "h5", "mb-0", "mr-2"], [1, "mb-4", "pb-3", "border-bottom", "border-secondary"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-2"], [1, "rounded-circle", "bg-secondary", "text-warning", "d-inline-flex", "align-items-center", "justify-content-center", "font-weight-bold", "shadow-sm", "flex-shrink-0", "mr-2", 2, "width", "36px", "height", "36px", "font-size", "14px"], [1, "font-weight-bold", "text-light", "small", "d-block", "mb-0"], [1, "text-muted", 2, "font-size", "0.75rem"], [1, "btn-group"], [1, "ml-4", "pl-1", "text-light"], [1, "d-flex", "align-items-center", "ml-4", "pl-1", "mt-2", "flex-wrap"], [1, "btn", "btn-link", "text-warning", "p-0", "border-0", "d-flex", "align-items-center", "small", "text-decoration-none", "mr-3", 3, "click"], [1, "bi", "bi-star-fill", "mr-1"], [1, "btn", "btn-link", "text-secondary", "p-0", "border-0", "d-flex", "align-items-center", "small", "text-decoration-none", "mr-3", 3, "click"], [1, "bi", "bi-star", "mr-1"], [1, "btn", "btn-link", "p-0", "text-warning", "small", "font-weight-bold", "ml-auto", "text-decoration-none", "text-uppercase", 3, "click"], [1, "mt-3", "ml-4", "pl-3", "border-left", "border-secondary"], [1, "btn", "btn-sm", "btn-link", "text-muted", "p-1", "mr-1", 3, "click"], [1, "btn", "btn-sm", "btn-link", "text-danger", "p-1", 3, "click"], [1, "p-3", "bg-dark", "rounded-0", "my-2", "border", "border-secondary", "shadow-sm"], [1, "rounded-circle", "bg-secondary", "text-white", "d-inline-flex", "align-items-center", "justify-content-center", "font-weight-bold", "flex-shrink-0", "mr-2", 2, "width", "28px", "height", "28px", "font-size", "11px"], [1, "small", "text-light"], [1, "d-flex", "justify-content-end", "mt-1"], [1, "btn", "btn-sm", "btn-link", "text-muted", "p-0", "mr-2", 3, "click"], [1, "btn", "btn-sm", "btn-link", "text-danger", "p-0", 3, "click"], ["role", "document", 1, "modal-dialog", "modal-lg", "modal-dialog-centered"], [1, "modal-content", "bg-dark", "text-light", "border", "border-secondary"], [1, "modal-header", "border-secondary"], [1, "modal-title", "font-weight-bold", "text-warning", "mb-0", "text-uppercase"], ["type", "button", "aria-label", "Close", 1, "close", "text-white", 3, "click"], ["aria-hidden", "true"], [1, "modal-body", "p-4"], [1, "form-group", "mb-3"], [1, "font-weight-bold", "small", "text-warning", "text-uppercase", "mb-1"], [1, "border", "border-secondary", "rounded", "overflow-hidden"], [3, "ngModelChange", "editor", "config", "ngModel"], [1, "mt-3", "p-3", "bg-secondary-dark", "rounded", "border", "border-secondary"], [1, "mt-3"], [1, "modal-footer", "border-secondary"], ["type", "button", 1, "btn", "btn-outline-secondary", "rounded-0", "px-4", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-warning", "rounded-0", "px-4", "font-weight-bold", "text-uppercase", "d-flex", "align-items-center", 3, "click", "disabled"], [1, "font-weight-bold", "small", "text-warning", "text-uppercase"], ["type", "text", "placeholder", "Ej: El Claroscuro en el Arte Barroco...", 1, "form-control", "bg-secondary-dark", "text-light", "border-secondary", 3, "ngModelChange", "ngModel"], ["type", "file", 1, "form-control", "text-light", "bg-secondary-dark", "border-secondary", 3, "change", "disabled"], [1, "text-warning", "mt-1", "d-block"], [1, "row", "mb-3"], [1, "col-md-6", "mb-3", "mb-md-0"], [1, "form-group", "mb-0"], [1, "bi", "bi-mic-fill", "mr-1"], ["type", "file", "accept", "audio/*", 1, "form-control", "text-light", "bg-secondary-dark", "border-secondary", 3, "change", "disabled"], [1, "text-info", "mt-1", "d-block", "text-truncate"], [1, "bi", "bi-paperclip", "mr-1"], [1, "bi", "bi-music-note", "mr-1"], [1, "text-uppercase", "text-warning", "font-weight-bold", "d-block", "mb-1"], [1, "text-light", 3, "innerHTML"], [1, "d-flex", "justify-content-between", "text-warning", "small", "mb-1", "font-weight-bold"], [1, "progress", "rounded-0", "bg-secondary", 2, "height", "10px"], ["role", "progressbar", "aria-valuemin", "0", "aria-valuemax", "100", 1, "progress-bar", "bg-warning", "progress-bar-striped", "progress-bar-animated"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "mr-2"]], template: function ArtCuratorshipComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-navbar")(1, "div", 0);
      \u0275\u0275conditionalCreate(2, ArtCuratorshipComponent_Conditional_2_Template, 1, 0, "app-checkout-izipay");
      \u0275\u0275elementStart(3, "div", 1)(4, "div", 2);
      \u0275\u0275conditionalCreate(5, ArtCuratorshipComponent_Conditional_5_Template, 24, 8);
      \u0275\u0275elementStart(6, "div");
      \u0275\u0275repeaterCreate(7, ArtCuratorshipComponent_For_8_Template, 34, 14, "article", 3, _forTrack02);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(9, ArtCuratorshipComponent_Conditional_9_Template, 24, 10, "div", 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      let tmp_1_0;
      \u0275\u0275advance(2);
      \u0275\u0275conditional(((tmp_0_0 = ctx.userSession()) == null ? null : tmp_0_0.rol) === "1" ? 2 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional((tmp_1_0 = ctx.usser()) ? 5 : -1, tmp_1_0);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.artworkExhibits());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showModal() ? 9 : -1);
    }
  }, dependencies: [
    MarkdownComponent,
    CommonModule,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    CKEditorModule,
    CKEditorComponent,
    MathRendererDirective,
    TextToSpeechComponent,
    Navbar,
    CheckoutIzipayComponent,
    GlbViewerComponent
  ], styles: ['\n\n.bg-gradient-dark[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      145deg,\n      #1e2229 0%,\n      #121418 100%);\n}\n.bg-secondary-dark[_ngcontent-%COMP%] {\n  background-color: #1a1d24;\n}\n.font-serif[_ngcontent-%COMP%] {\n  font-family:\n    "Georgia",\n    "Times New Roman",\n    serif;\n}\n.tracking-wider[_ngcontent-%COMP%] {\n  letter-spacing: 0.08em;\n}\n.object-fit-cover-style[_ngcontent-%COMP%] {\n  object-fit: cover;\n}\n.card-image-wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  border-radius: 4px;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);\n}\n.artwork-markdown-container[_ngcontent-%COMP%]     img {\n  max-width: 100%;\n  height: auto;\n  border-radius: 2px;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);\n  margin: 15px 0;\n}\n  .ck-editor__editable_inline {\n  min-height: 200px;\n  background-color: #ffffff !important;\n  color: #212529 !important;\n}\n/*# sourceMappingURL=exhibicionfiles.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ArtCuratorshipComponent, [{
    type: Component,
    args: [{ selector: "app-art-curatorship", standalone: true, imports: [
      MarkdownComponent,
      CommonModule,
      FormsModule,
      CKEditorModule,
      MathRendererDirective,
      TextToSpeechComponent,
      Navbar,
      CheckoutIzipayComponent,
      GlbViewerComponent
    ], template: `
    <app-navbar></app-navbar>
    <div class="py-5"></div>
    
    @if (userSession()?.rol === '1') {
      <app-checkout-izipay></app-checkout-izipay>
    }
    
    <div class="bg-dark text-light min-vh-100 pb-5 pt-4">
      <div class="container my-4" style="max-width: 1080px;">
        
        <!-- Tarjeta de Informaci\xF3n del Usuario/Curador (USSER) -->
        @if (usser(); as userProfile) {
          <div class="card border-0 shadow-lg mb-4 bg-secondary-dark text-white border-left border-info" style="border-left-width: 4px !important;">
            <div class="card-body p-4 border rounded">
              <div class="align-items-center mb-3">
                <div class="text-center mb-3">
                  @if (userProfile.foto) {
                    <img
                      class="rounded-circle border-info shadow-sm object-fit-cover-style"
                      [src]="getPerfilImageUrl(userProfile.foto)"
                      [alt]="userProfile.name || 'Foto del usuario'"
                      style="width: 194px; height: 194px; object-fit: cover;"
                    />
                  } @else {
                    <div class="rounded-circle bg-info text-dark d-inline-flex align-items-center justify-content-center font-weight-bold shadow-sm" style="width: 54px; height: 54px; font-size: 22px;">
                      {{ getInitial(userProfile.name || userProfile.email) }}
                    </div>
                  }
                </div>

                <div class="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between">
                  <div>
                    <h4 class="font-weight-bold mb-0 text-white">{{ userProfile.name }}</h4>
                    <small class="text-info d-block">{{ userProfile.email }}</small>
                    @if (userProfile.cell || userProfile.celular) {
                      <small class="text-light d-block mt-1"><strong>Tel\xE9fono:</strong> {{ userProfile.cell || userProfile.celular }}</small>
                    }
                  </div>

                  @if (userProfile.cell || userProfile.celular) {
                    <div class="btn-group mt-3 mt-sm-0" role="group">
                      <a
                        [href]="'tel:' + (userProfile.cell || userProfile.celular)"
                        class="btn btn-info"
                        title="Llamar"
                      >
                        <i class="bi bi-telephone-fill"></i>
                      </a>
                      <button
                        type="button"
                        class="btn btn-success"
                        title="WhatsApp"
                        (click)="sendWhatsAppMessage(userProfile.cell || userProfile.celular, userProfile.name)"
                      >
                        <i class="bi bi-whatsapp"></i>
                      </button>
                    </div>
                  }
                </div>

                @if (userProfile.filosophy) {
                  <div class="col-12 mt-3 pt-3 border-top border-secondary text-light px-0">
                    <strong class="text-info">Sobre el curador/usuario:</strong>
                    <div [appMathRenderer]="userProfile.filosophy"></div>
                  </div>
                }
              </div>
            </div>
          </div>
          
          <!-- Banner Superior Galer\xEDa -->
          <div class="card border-0 shadow-lg mb-4 bg-gradient-dark text-white border-left border-warning" style="border-left-width: 4px !important;">
          <div class="card-body p-4 p-md-5 d-flex flex-column flex-md-row justify-content-between align-items-md-center">
            <div class="mb-3 mb-md-0">
              <div class="d-flex align-items-center mb-2">
                <!-- <i class="bi bi-palette-fill h2 mb-0 text-warning mr-2"></i> -->
                <h2 class="font-weight-bold mb-0 text-uppercase tracking-wider">Curadur\xEDa & Galer\xEDa de Arte</h2>
              </div>
              <p class="text-secondary mb-0">
                Espacio de exhibici\xF3n, an\xE1lisis cr\xEDtico y debate sobre colecciones visuales de {{userProfile.name}}.
              </p>
            </div>
            @if ((userSession() && emailWorks === userSession()?._id) || userSession()?.rol === '1') {
              <button
                class="btn btn-warning"
                (click)="openModal('1', 'Publicar Nueva Obra/Muestra')"
              >
                <i class="bi bi-plus-lg mr-1"></i> Nueva obra
              </button>
            }
          </div>
        </div>
      }
        
        <!-- Muestras de la Galer\xEDa -->
        <div>
          @for (artwork of artworkExhibits(); track artwork._id || $index; let i = $index) {
            <article class="card bg-secondary-dark text-light border-0 shadow-lg overflow-hidden mb-4">
              <div class="card-body p-4 p-md-5">
                <div class="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary">
                  <div class="d-flex align-items-center">
                    <div class="rounded-circle bg-warning text-dark d-inline-flex align-items-center justify-content-center font-weight-bold shadow-sm flex-shrink-0 mr-3" style="width: 46px; height: 46px; font-size: 18px;">
                      {{ getInitial(artwork.curator || artwork.email) }}
                    </div>
                    <div>
                      <span class="font-weight-bold text-warning d-block mb-0" style="line-height: 1.2;">
                        Curador: {{ artwork.curator || 'Curador An\xF3nimo' }}
                      </span>
                      <small class="text-muted">
                        Exhibido el {{ formatDate(artwork.createdAt) }}
                      </small>
                    </div>
                  </div>
                  @if (userSession()?.email === artwork.email || userSession()?.rol === '1') {
                    <div class="btn-group" role="group">
                      <button
                        class="btn btn-sm btn-outline-light border-0 rounded-circle mr-1"
                        title="Editar Muestra"
                        (click)="openModal('1w', 'Actualizar Obra/Muestra', artwork.title, artwork.detail, { i, j: -1, k: -1 }, artwork._id)"
                      >
                        <i class="bi bi-pencil-fill"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-outline-danger border-0 rounded-circle"
                        title="Eliminar de Galer\xEDa"
                        (click)="removeTheme(artwork._id)"
                      >
                        <i class="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  }
                </div>
                
                <h3 class="font-weight-bold text-white mb-3 text-uppercase font-serif">{{ artwork.title }}</h3>
                
                @if (artwork.imageUrl) {
                  <div class="card-image-wrapper position-relative mb-3 overflow-hidden rounded">
                    @if (artwork.imageUrl.endsWith('.glb') || artwork.imageUrl.endsWith('.obj') || artwork.imageUrl.endsWith('.gltf')) {
                      <app-glb-viewer [glbSource]="getImageUrl(artwork.imageUrl)"></app-glb-viewer>
                    } @else {
                      <img [src]="getImageUrl(artwork.imageUrl)" [alt]="artwork.title" class="img-fluid w-100 object-fit-cover-style" style="max-height: 450px;" />
                    }
                  </div>
                }

                @if (artwork.audioEsUrl || artwork.audioQuUrl) {
                  <div class="p-3 bg-dark border border-secondary rounded mb-3">
                    <small class="font-weight-bold text-warning text-uppercase d-block mb-2">
                      <i class="bi bi-volume-up-fill mr-1"></i> Audiogu\xEDa de la Muestra
                    </small>    
                    <div class="row">
                      @if (artwork.audioEsUrl) {
                        <div class="col-md-6 mb-2 mb-md-0">
                          <div class="d-flex align-items-center bg-secondary-dark p-2 rounded">
                            <span class="badge badge-warning text-dark mr-2">ES</span>
                            <audio controls class="w-100" style="height: 32px;" [src]="getImageUrl(artwork.audioEsUrl)"></audio>
                          </div>
                        </div>
                      }
                      @if (artwork.audioQuUrl) {
                        <div class="col-md-6">
                          <div class="d-flex align-items-center bg-secondary-dark p-2 rounded">
                            <span class="badge badge-info text-dark mr-2">QU</span>
                            <audio controls class="w-100" style="height: 32px;" [src]="getImageUrl(artwork.audioQuUrl)"></audio>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                }

                <div class="artwork-markdown-container mb-4">
                  <markdown [katex]="true" [data]="artwork.detail"></markdown>
                </div>

                <app-text-to-speech [text]="artwork.detail.replace(/<[^>]*>/g, '')" />

                <div class="d-flex align-items-center pt-3 border-top border-secondary flex-wrap">
                  <div class="btn-group p-1 mr-auto mb-2 mb-sm-0" role="group">
                    <button
                      class="btn btn-sm btn-outline-warning rounded-0 px-3 border-0 d-flex align-items-center mr-1"
                      title="Apreciaci\xF3n Favorable"
                      (click)="handleLike(i, artwork._id, 'like')"
                    >
                      <i class="bi bi-award-fill mr-1"></i>
                      <span class="font-weight-bold font-italic small">{{ artwork.likes?.length || 0 }}</span>
                    </button>
                    <button
                      class="btn btn-sm btn-outline-secondary rounded-0 px-3 border-0 d-flex align-items-center"
                      title="En Revisi\xF3n"
                      (click)="handleLike(i, artwork._id, 'unlike')"
                    >
                      <i class="bi bi-award mr-1"></i>
                      <span class="font-weight-bold font-italic small">{{ artwork.unlikes?.length || 0 }}</span>
                    </button>
                  </div>

                  <button
                    class="btn btn-sm btn-outline-warning rounded-0 px-3 py-2 d-flex align-items-center font-weight-bold text-uppercase"
                    (click)="openModal('2', 'Redactar Ensayo Cr\xEDtico', '', '', { i, j: -1, k: -1 }, artwork._id)"
                  >
                    <i class="bi bi-journal-text h5 mb-0 mr-2"></i>
                    <span>Ensayos Cr\xEDticos ({{ artwork.units?.length || 0 }})</span>
                  </button>
                </div>

                @if (artwork.units && artwork.units.length > 0) {
                  <div class="mt-4 pt-4 border-left border-warning rounded-0 p-3 p-md-4 ml-md-2 bg-dark" style="border-left-width: 3px !important; background-color: rgba(0,0,0,0.25) !important;"> 
                    <div class="d-flex align-items-center text-warning font-weight-bold small text-uppercase mb-3 tracking-wider">
                      <i class="bi bi-vector-pen h5 mb-0 mr-2"></i>
                      <span>Cr\xEDticas & An\xE1lisis Ensay\xEDsticos ({{ artwork.units.length }})</span>
                    </div>

                    @for (essay of artwork.units; track $index; let j = $index) {
                      <div class="mb-4 pb-3 border-bottom border-secondary">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                          <div class="d-flex align-items-center">
                            <div class="rounded-circle bg-secondary text-warning d-inline-flex align-items-center justify-content-center font-weight-bold shadow-sm flex-shrink-0 mr-2" style="width: 36px; height: 36px; font-size: 14px;">
                              {{ getInitial(essay.user) }}
                            </div>
                            <div>
                              <span class="font-weight-bold text-light small d-block mb-0">{{ essay.user }}</span>
                              <small class="text-muted" style="font-size: 0.75rem;">
                                Cr\xEDtica redactada el {{ formatDate(essay.createdAt) }}
                              </small>
                            </div>
                          </div>

                          @if (userSession()?.email === essay.user || userSession()?.rol === '1') {
                            <div class="btn-group">
                              <button
                                class="btn btn-sm btn-link text-muted p-1 mr-1"
                                (click)="openModal('2w', 'Actualizar Ensayo', essay.title || '', essay.detail, { i, j, k: -1 }, artwork._id)"
                              >
                                <i class="bi bi-pencil-fill"></i>
                              </button>
                              <button
                                class="btn btn-sm btn-link text-danger p-1"
                                (click)="removeSubTheme(i, j, artwork._id)"
                              >
                                <i class="bi bi-trash-fill"></i>
                              </button>
                            </div>
                          }
                        </div>

                        <div class="ml-4 pl-1 text-light">
                          <markdown [katex]="true" [data]="essay.detail"></markdown>
                        </div>

                        <div class="d-flex align-items-center ml-4 pl-1 mt-2 flex-wrap">
                          <button
                            class="btn btn-link text-warning p-0 border-0 d-flex align-items-center small text-decoration-none mr-3"
                            (click)="handleSubLike(i, j, artwork._id, 'like')"
                          >
                            <i class="bi bi-star-fill mr-1"></i> {{ essay.likes?.length || 0 }}
                          </button>
                          <button
                            class="btn btn-link text-secondary p-0 border-0 d-flex align-items-center small text-decoration-none mr-3"
                            (click)="handleSubLike(i, j, artwork._id, 'unlike')"
                          >
                            <i class="bi bi-star mr-1"></i> {{ essay.unlikes?.length || 0 }}
                          </button>
                          <button
                            class="btn btn-link p-0 text-warning small font-weight-bold ml-auto text-decoration-none text-uppercase"
                            (click)="openModal('3', 'A\xF1adir Anotaci\xF3n', '', '', { i, j, k: -1 }, artwork._id)"
                          >
                            A\xF1adir Anotaci\xF3n
                          </button>
                        </div>

                        @if (essay.themes && essay.themes.length > 0) {
                          <div class="mt-3 ml-4 pl-3 border-left border-secondary">
                            @for (annotation of essay.themes; track $index; let k = $index) {
                              <div class="p-3 bg-dark rounded-0 my-2 border border-secondary shadow-sm">
                                <div class="d-flex align-items-center mb-2">
                                  <div class="rounded-circle bg-secondary text-white d-inline-flex align-items-center justify-content-center font-weight-bold flex-shrink-0 mr-2" style="width: 28px; height: 28px; font-size: 11px;">
                                    {{ getInitial(annotation.user) }}
                                  </div>
                                  <div>
                                    <span class="font-weight-bold text-light small d-block mb-0">{{ annotation.user }}</span>
                                    <small class="text-muted" style="font-size: 0.75rem;">
                                      {{ formatDate(annotation.createdAt) }}
                                    </small>
                                  </div>
                                </div>
                                
                                <div class="small text-light">
                                  <markdown [katex]="true" [data]="annotation.detail"></markdown>
                                </div>

                                @if (userSession()?.email === annotation.user || userSession()?.rol === '1') {
                                  <div class="d-flex justify-content-end mt-1">
                                    <button
                                      class="btn btn-sm btn-link text-muted p-0 mr-2"
                                      (click)="openModal('3w', 'Editar Anotaci\xF3n', annotation.title || '', annotation.detail, { i, j, k }, artwork._id)"
                                    >
                                      <i class="bi bi-pencil-fill"></i>
                                    </button>
                                    <button
                                      class="btn btn-sm btn-link text-danger p-0"
                                      (click)="removeSubSubTheme(i, j, k, artwork._id)"
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

      <!-- MODAL COMPATIBLE CON BOOTSTRAP 4 -->
      @if (showModal()) {
        <div class="modal show d-block fade" tabindex="-1" style="background-color: rgba(0,0,0,0.85);">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content bg-dark text-light border border-secondary">
              <div class="modal-header border-secondary">
                <h5 class="modal-title font-weight-bold text-warning mb-0 text-uppercase">{{ submitLabel() }}</h5>
                <button type="button" class="close text-white" aria-label="Close" (click)="closeModal()">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body p-4">
                @if (modalOption() === '1' || modalOption() === '1w') {
                  <div class="form-group mb-3">
                    <label class="font-weight-bold small text-warning text-uppercase">T\xEDtulo de la Muestra / Obra</label>
                    <input
                      type="text"
                      class="form-control bg-secondary-dark text-light border-secondary"
                      placeholder="Ej: El Claroscuro en el Arte Barroco..."
                      [(ngModel)]="formTitle"
                    />
                  </div>

                  <div class="form-group mb-3">
                    <label class="font-weight-bold small text-warning text-uppercase">Adjuntar Archivo / Imagen de la Obra</label>
                    <input
                      type="file"
                      class="form-control text-light bg-secondary-dark border-secondary"
                      [disabled]="isUploading()"
                      (change)="onFileSelected($event)"
                    />
                    @if (selectedFile) {
                      <small class="text-warning mt-1 d-block">
                        <i class="bi bi-paperclip mr-1"></i>
                        Archivo seleccionado: <strong>{{ selectedFile.name }}</strong> ({{ (selectedFile.size / 1024).toFixed(1) }} KB)
                      </small>
                    }
                  </div>

                  <div class="row mb-3">
                    <div class="col-md-6 mb-3 mb-md-0">
                      <div class="form-group mb-0">
                        <label class="font-weight-bold small text-warning text-uppercase mb-1">
                          <i class="bi bi-mic-fill mr-1"></i> Audio en Espa\xF1ol (MP3/WAV)
                        </label>
                        <input
                          type="file"
                          accept="audio/*"
                          class="form-control text-light bg-secondary-dark border-secondary"
                          [disabled]="isUploading()"
                          (change)="onAudioEsSelected($event)"
                        />
                        @if (selectedAudioEs) {
                          <small class="text-info mt-1 d-block text-truncate">
                            <i class="bi bi-music-note mr-1"></i> {{ selectedAudioEs.name }}
                          </small>
                        }
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group mb-0">
                        <label class="font-weight-bold small text-warning text-uppercase mb-1">
                          <i class="bi bi-mic-fill mr-1"></i> Audio en Quechua (MP3/WAV)
                        </label>
                        <input
                          type="file"
                          accept="audio/*"
                          class="form-control text-light bg-secondary-dark border-secondary"
                          [disabled]="isUploading()"
                          (change)="onAudioQuSelected($event)"
                        />
                        @if (selectedAudioQu) {
                          <small class="text-info mt-1 d-block text-truncate">
                            <i class="bi bi-music-note mr-1"></i> {{ selectedAudioQu.name }}
                          </small>
                        }
                      </div>
                    </div>
                  </div>
                }

                <div class="form-group mb-3">
                  <label class="font-weight-bold small text-warning text-uppercase mb-1">Texto Curatorial / Ficha T\xE9cnica</label>
                  <div class="border border-secondary rounded overflow-hidden">
                    <ckeditor
                      [editor]="Editor"
                      [config]="editorConfig"
                      [(ngModel)]="formDetail"
                    ></ckeditor>
                  </div>
                </div>

                @if (formDetail) {
                  <div class="mt-3 p-3 bg-secondary-dark rounded border border-secondary">
                    <small class="text-uppercase text-warning font-weight-bold d-block mb-1">Vista previa del an\xE1lisis:</small>
                    <div [innerHTML]="formDetail" class="text-light"></div>
                  </div>
                }

                @if (isUploading()) {
                  <div class="mt-3">
                    <div class="d-flex justify-content-between text-warning small mb-1 font-weight-bold">
                      <span>Subiendo archivo...</span>
                      <span>{{ uploadProgress() }}%</span>
                    </div>
                    <div class="progress rounded-0 bg-secondary" style="height: 10px;">
                      <div
                        class="progress-bar bg-warning progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        [style.width.%]="uploadProgress()"
                        [attr.aria-valuenow]="uploadProgress()"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                }
              </div>
              <div class="modal-footer border-secondary">
                <button
                  type="button"
                  class="btn btn-outline-secondary rounded-0 px-4"
                  [disabled]="isUploading()"
                  (click)="closeModal()"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  class="btn btn-warning rounded-0 px-4 font-weight-bold text-uppercase d-flex align-items-center"
                  [disabled]="isUploading()"
                  (click)="handleModalSubmit()"
                >
                  @if (isUploading()) {
                    <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                    Subiendo...
                  } @else {
                    Guardar en Galer\xEDa
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `, styles: ['/* angular:styles/component:css;20abf2c6dc0d040c6d52e0e0fcd20933cf639d8d92dee015e14a87f775eca603;/home/linuxlite/WebMEAN/src/app/componentes/exhibicionfiles.ts */\n.bg-gradient-dark {\n  background:\n    linear-gradient(\n      145deg,\n      #1e2229 0%,\n      #121418 100%);\n}\n.bg-secondary-dark {\n  background-color: #1a1d24;\n}\n.font-serif {\n  font-family:\n    "Georgia",\n    "Times New Roman",\n    serif;\n}\n.tracking-wider {\n  letter-spacing: 0.08em;\n}\n.object-fit-cover-style {\n  object-fit: cover;\n}\n.card-image-wrapper img {\n  border-radius: 4px;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);\n}\n.artwork-markdown-container ::ng-deep img {\n  max-width: 100%;\n  height: auto;\n  border-radius: 2px;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);\n  margin: 15px 0;\n}\n::ng-deep .ck-editor__editable_inline {\n  min-height: 200px;\n  background-color: #ffffff !important;\n  color: #212529 !important;\n}\n/*# sourceMappingURL=exhibicionfiles.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ArtCuratorshipComponent, { className: "ArtCuratorshipComponent", filePath: "src/app/componentes/exhibicionfiles.ts", lineNumber: 595 });
})();
export {
  ArtCuratorshipComponent,
  isAuth
};
//# sourceMappingURL=chunk-OO4DGE3U.mjs.map
