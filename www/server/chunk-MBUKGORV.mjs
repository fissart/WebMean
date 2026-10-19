import './polyfills.server.mjs';
import {
  g
} from "./chunk-BGK72KJH.mjs";
import {
  Navbar
} from "./chunk-QGEJ4V6S.mjs";
import "./chunk-NIVJ4KPM.mjs";
import {
  OrbitControls
} from "./chunk-MD2XOYTT.mjs";
import {
  BufferAttribute,
  BufferGeometry,
  CameraHelper,
  Color,
  FileLoader,
  Float32BufferAttribute,
  HemisphereLight,
  Int16BufferAttribute,
  Int32BufferAttribute,
  Int8BufferAttribute,
  LinearFilter,
  Loader,
  Mesh,
  MeshLambertMaterial,
  NeutralToneMapping,
  PCFShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  SRGBColorSpace,
  Scene,
  SpotLight,
  SpotLightHelper,
  TextureLoader,
  Uint16BufferAttribute,
  Uint32BufferAttribute,
  Uint8BufferAttribute,
  WebGLRenderer
} from "./chunk-ULG7G2AN.mjs";
import "./chunk-IESDD46D.mjs";
import "./chunk-JRMDAGFP.mjs";
import "./chunk-TDOK3CTI.mjs";
import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  ViewChild,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵloadQuery,
  ɵɵqueryRefresh,
  ɵɵviewQuery
} from "./chunk-GYAE75W3.mjs";
import "./chunk-TB3YAHZW.mjs";

// node_modules/three/examples/jsm/loaders/PLYLoader.js
var _color = new Color();
var PLYLoader = class extends Loader {
  /**
   * Constructs a new PLY loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(manager) {
    super(manager);
    this.propertyNameMapping = {};
    this.customPropertyMapping = {};
  }
  /**
   * Starts loading from the given URL and passes the loaded PLY asset
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
   * Sets a property name mapping that maps default property names
   * to custom ones. For example, the following maps the properties
   * “diffuse_(red|green|blue)” in the file to standard color names.
   *
   * ```js
   * loader.setPropertyNameMapping( {
   * 	diffuse_red: 'red',
   * 	diffuse_green: 'green',
   * 	diffuse_blue: 'blue'
   * } );
   * ```
   *
   * @param {Object} mapping - The mapping dictionary.
   */
  setPropertyNameMapping(mapping) {
    this.propertyNameMapping = mapping;
  }
  /**
   * Custom properties outside of the defaults for position, uv, normal
   * and color attributes can be added using the setCustomPropertyNameMapping method.
   * For example, the following maps the element properties “custom_property_a”
   * and “custom_property_b” to an attribute “customAttribute” with an item size of 2.
   * Attribute item sizes are set from the number of element properties in the property array.
   *
   * ```js
   * loader.setCustomPropertyNameMapping( {
   *	customAttribute: ['custom_property_a', 'custom_property_b'],
   * } );
   * ```
   * @param {Object} mapping - The mapping dictionary.
   */
  setCustomPropertyNameMapping(mapping) {
    this.customPropertyMapping = mapping;
  }
  /**
   * Parses the given PLY data and returns the resulting geometry.
   *
   * @param {ArrayBuffer} data - The raw PLY data as an array buffer.
   * @return {BufferGeometry} The parsed geometry.
   */
  parse(data) {
    function parseHeader(data2, headerLength = 0) {
      const patternHeader = /^ply([\s\S]*)end_header(\r\n|\r|\n)/;
      let headerText = "";
      const result = patternHeader.exec(data2);
      if (result !== null) {
        headerText = result[1];
      }
      const header = {
        comments: [],
        elements: [],
        headerLength,
        objInfo: ""
      };
      const lines = headerText.split(/\r\n|\r|\n/);
      let currentElement;
      function make_ply_element_property(propertyValues, propertyNameMapping) {
        const property = { type: propertyValues[0] };
        if (property.type === "list") {
          property.name = propertyValues[3];
          property.countType = propertyValues[1];
          property.itemType = propertyValues[2];
        } else {
          property.name = propertyValues[1];
        }
        if (property.name in propertyNameMapping) {
          property.name = propertyNameMapping[property.name];
        }
        return property;
      }
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        line = line.trim();
        if (line === "") continue;
        const lineValues = line.split(/\s+/);
        const lineType = lineValues.shift();
        line = lineValues.join(" ");
        switch (lineType) {
          case "format":
            header.format = lineValues[0];
            header.version = lineValues[1];
            break;
          case "comment":
            header.comments.push(line);
            break;
          case "element":
            if (currentElement !== void 0) {
              header.elements.push(currentElement);
            }
            currentElement = {};
            currentElement.name = lineValues[0];
            currentElement.count = parseInt(lineValues[1]);
            currentElement.properties = [];
            break;
          case "property":
            currentElement.properties.push(make_ply_element_property(lineValues, scope.propertyNameMapping));
            break;
          case "obj_info":
            header.objInfo = line;
            break;
          default:
            console.log("unhandled", lineType, lineValues);
        }
      }
      if (currentElement !== void 0) {
        header.elements.push(currentElement);
      }
      return header;
    }
    function parseASCIINumber(n, type) {
      switch (type) {
        case "char":
        case "uchar":
        case "short":
        case "ushort":
        case "int":
        case "uint":
        case "int8":
        case "uint8":
        case "int16":
        case "uint16":
        case "int32":
        case "uint32":
          return parseInt(n);
        case "float":
        case "double":
        case "float32":
        case "float64":
          return parseFloat(n);
      }
    }
    function parseASCIIElement(properties, tokens) {
      const element = {};
      for (let i = 0; i < properties.length; i++) {
        if (tokens.empty()) return null;
        if (properties[i].type === "list") {
          const list = [];
          const n = parseASCIINumber(tokens.next(), properties[i].countType);
          for (let j = 0; j < n; j++) {
            if (tokens.empty()) return null;
            list.push(parseASCIINumber(tokens.next(), properties[i].itemType));
          }
          element[properties[i].name] = list;
        } else {
          element[properties[i].name] = parseASCIINumber(tokens.next(), properties[i].type);
        }
      }
      return element;
    }
    function createBuffer() {
      const buffer = {
        indices: [],
        vertices: [],
        normals: [],
        uvs: [],
        faceVertexUvs: [],
        colors: [],
        faceVertexColors: [],
        descriptors: {}
      };
      for (const customProperty of Object.keys(scope.customPropertyMapping)) {
        buffer[customProperty] = [];
      }
      return buffer;
    }
    function getBufferAttributeClass(type) {
      switch (type) {
        case "int8":
        case "char":
          return Int8BufferAttribute;
        case "uint8":
        case "uchar":
          return Uint8BufferAttribute;
        case "int16":
        case "short":
          return Int16BufferAttribute;
        case "uint16":
        case "ushort":
          return Uint16BufferAttribute;
        case "int32":
        case "int":
          return Int32BufferAttribute;
        case "uint32":
        case "uint":
          return Uint32BufferAttribute;
        case "float32":
        case "float":
          return Float32BufferAttribute;
        case "float64":
        case "double":
          return Float64BufferAttribute;
      }
    }
    function getColorScale(type) {
      switch (type) {
        case "uchar":
        case "uint8":
          return 1 / 255;
        case "ushort":
        case "uint16":
          return 1 / 65535;
        case "float":
        case "float32":
        case "double":
        case "float64":
          return 1;
        default:
          return 1 / 255;
      }
    }
    function isFloatType(type) {
      return type === "float" || type === "float32" || type === "double" || type === "float64";
    }
    function getAttributeDescriptor(properties) {
      function findProperty(names) {
        for (const name of names) {
          const property = properties.find((p) => p.name === name);
          if (property) return property;
        }
        return null;
      }
      const x = findProperty(["x", "px", "posx"]);
      const y = findProperty(["y", "py", "posy"]);
      const z = findProperty(["z", "pz", "posz"]);
      const nx = findProperty(["nx", "normalx"]);
      const ny = findProperty(["ny", "normaly"]);
      const nz = findProperty(["nz", "normalz"]);
      const s = findProperty(["s", "u", "texture_u", "tx"]);
      const t = findProperty(["t", "v", "texture_v", "ty"]);
      const r = findProperty(["red", "diffuse_red", "r", "diffuse_r"]);
      const g2 = findProperty(["green", "diffuse_green", "g", "diffuse_g"]);
      const b = findProperty(["blue", "diffuse_blue", "b", "diffuse_b"]);
      const texcoord = findProperty(["texcoord"]);
      const custom = {};
      for (const customAttr of Object.keys(scope.customPropertyMapping)) {
        const propNames = scope.customPropertyMapping[customAttr];
        const matched = propNames.map((name) => properties.find((p) => p.name === name));
        const types = matched.filter((p) => p).map((p) => p.type);
        const uniform = types.length > 0 && types.every((type) => type === types[0]);
        custom[customAttr] = {
          type: uniform ? types[0] : "float32",
          usage: matched.every((p) => p !== void 0)
        };
      }
      return {
        position: {
          names: [x ? x.name : "x", y ? y.name : "y", z ? z.name : "z"],
          type: x ? x.type : "float32",
          usage: !!(x && y && z)
        },
        normal: {
          names: [nx ? nx.name : "nx", ny ? ny.name : "ny", nz ? nz.name : "nz"],
          type: nx ? nx.type : "float32",
          usage: !!(nx && ny && nz)
        },
        uv: {
          names: [s ? s.name : "s", t ? t.name : "t"],
          type: s ? s.type : "float32",
          usage: !!(s && t)
        },
        texcoord: {
          type: texcoord ? texcoord.itemType : "float32",
          usage: !!texcoord
        },
        color: {
          names: [r ? r.name : "red", g2 ? g2.name : "green", b ? b.name : "blue"],
          type: r ? r.type : "uchar",
          usage: !!(r && g2 && b)
        },
        custom
      };
    }
    function parseASCII(data2, header) {
      const buffer = createBuffer();
      const patternBody = /end_header\s+(\S[\s\S]*\S|\S)\s*$/;
      let body, matches;
      if ((matches = patternBody.exec(data2)) !== null) {
        body = matches[1].split(/\s+/);
      } else {
        body = [];
      }
      const tokens = new ArrayStream(body);
      loop: for (let i = 0; i < header.elements.length; i++) {
        const elementDesc = header.elements[i];
        const attributeDescriptor = getAttributeDescriptor(elementDesc.properties);
        buffer.descriptors[elementDesc.name] = attributeDescriptor;
        for (let j = 0; j < elementDesc.count; j++) {
          const element = parseASCIIElement(elementDesc.properties, tokens);
          if (!element) break loop;
          handleElement(buffer, elementDesc.name, element, attributeDescriptor);
        }
      }
      return postProcess(buffer);
    }
    function postProcess(buffer) {
      let geometry2 = new BufferGeometry();
      const vertexDescriptor = buffer.descriptors.vertex;
      if (buffer.indices.length > 0) {
        geometry2.setIndex(buffer.indices);
      }
      const PositionClass = getBufferAttributeClass(vertexDescriptor ? vertexDescriptor.position.type : "float32");
      geometry2.setAttribute("position", new PositionClass(buffer.vertices, 3));
      if (buffer.normals.length > 0) {
        const NormalClass = getBufferAttributeClass(vertexDescriptor.normal.type);
        geometry2.setAttribute("normal", new NormalClass(buffer.normals, 3));
      }
      if (buffer.uvs.length > 0) {
        const UvClass = getBufferAttributeClass(vertexDescriptor.uv.type);
        geometry2.setAttribute("uv", new UvClass(buffer.uvs, 2));
      }
      if (buffer.colors.length > 0) {
        const colorType = vertexDescriptor.color.type;
        const normalized = !isFloatType(colorType);
        const ColorClass = getBufferAttributeClass(colorType);
        geometry2.setAttribute("color", new ColorClass(buffer.colors, 3, normalized));
      }
      if (buffer.faceVertexUvs.length > 0 || buffer.faceVertexColors.length > 0) {
        geometry2 = geometry2.toNonIndexed();
        if (buffer.faceVertexUvs.length > 0) {
          const UvClass = getBufferAttributeClass(buffer.descriptors.face.texcoord.type);
          geometry2.setAttribute("uv", new UvClass(buffer.faceVertexUvs, 2));
        }
        if (buffer.faceVertexColors.length > 0) {
          const colorType = buffer.descriptors.face.color.type;
          const normalized = !isFloatType(colorType);
          const ColorClass = getBufferAttributeClass(colorType);
          geometry2.setAttribute("color", new ColorClass(buffer.faceVertexColors, 3, normalized));
        }
      }
      for (const customProperty of Object.keys(scope.customPropertyMapping)) {
        if (buffer[customProperty].length > 0) {
          const CustomClass = getBufferAttributeClass(vertexDescriptor.custom[customProperty].type);
          geometry2.setAttribute(customProperty, new CustomClass(buffer[customProperty], scope.customPropertyMapping[customProperty].length));
        }
      }
      geometry2.computeBoundingSphere();
      return geometry2;
    }
    function handleElement(buffer, elementName, element, attributeDescriptor) {
      if (elementName === "vertex") {
        const { position, normal, uv, color } = attributeDescriptor;
        if (position.usage) {
          buffer.vertices.push(
            element[position.names[0]],
            element[position.names[1]],
            element[position.names[2]]
          );
        }
        if (normal.usage) {
          buffer.normals.push(
            element[normal.names[0]],
            element[normal.names[1]],
            element[normal.names[2]]
          );
        }
        if (uv.usage) {
          buffer.uvs.push(
            element[uv.names[0]],
            element[uv.names[1]]
          );
        }
        if (color.usage) {
          const scale = getColorScale(color.type);
          const isFloat = isFloatType(color.type);
          _color.setRGB(
            element[color.names[0]] * scale,
            element[color.names[1]] * scale,
            element[color.names[2]] * scale,
            SRGBColorSpace
          );
          const invScale = 1 / scale;
          buffer.colors.push(
            isFloat ? _color.r : Math.round(_color.r * invScale),
            isFloat ? _color.g : Math.round(_color.g * invScale),
            isFloat ? _color.b : Math.round(_color.b * invScale)
          );
        }
        for (const customProperty of Object.keys(scope.customPropertyMapping)) {
          for (const elementProperty of scope.customPropertyMapping[customProperty]) {
            buffer[customProperty].push(element[elementProperty]);
          }
        }
      } else if (elementName === "face") {
        const vertex_indices = element.vertex_indices || element.vertex_index;
        const texcoord = element.texcoord;
        if (vertex_indices.length === 3) {
          buffer.indices.push(vertex_indices[0], vertex_indices[1], vertex_indices[2]);
          if (texcoord && texcoord.length === 6) {
            buffer.faceVertexUvs.push(texcoord[0], texcoord[1]);
            buffer.faceVertexUvs.push(texcoord[2], texcoord[3]);
            buffer.faceVertexUvs.push(texcoord[4], texcoord[5]);
          }
        } else if (vertex_indices.length === 4) {
          buffer.indices.push(vertex_indices[0], vertex_indices[1], vertex_indices[3]);
          buffer.indices.push(vertex_indices[1], vertex_indices[2], vertex_indices[3]);
        }
        const { color } = attributeDescriptor;
        if (color.usage) {
          const scale = getColorScale(color.type);
          _color.setRGB(
            element[color.names[0]] * scale,
            element[color.names[1]] * scale,
            element[color.names[2]] * scale,
            SRGBColorSpace
          );
          const invScale = 1 / scale;
          const r = _color.r * invScale;
          const g2 = _color.g * invScale;
          const b = _color.b * invScale;
          buffer.faceVertexColors.push(r, g2, b);
          buffer.faceVertexColors.push(r, g2, b);
          buffer.faceVertexColors.push(r, g2, b);
        }
      }
    }
    function binaryReadElement(at, properties) {
      const element = {};
      let read = 0;
      for (let i = 0; i < properties.length; i++) {
        const property = properties[i];
        const valueReader = property.valueReader;
        if (property.type === "list") {
          const list = [];
          const n = property.countReader.read(at + read);
          read += property.countReader.size;
          for (let j = 0; j < n; j++) {
            list.push(valueReader.read(at + read));
            read += valueReader.size;
          }
          element[property.name] = list;
        } else {
          element[property.name] = valueReader.read(at + read);
          read += valueReader.size;
        }
      }
      return [element, read];
    }
    function setPropertyBinaryReaders(properties, body, little_endian) {
      function getBinaryReader(dataview, type, little_endian2) {
        switch (type) {
          // correspondences for non-specific length types here match rply:
          case "int8":
          case "char":
            return { read: (at) => {
              return dataview.getInt8(at);
            }, size: 1 };
          case "uint8":
          case "uchar":
            return { read: (at) => {
              return dataview.getUint8(at);
            }, size: 1 };
          case "int16":
          case "short":
            return { read: (at) => {
              return dataview.getInt16(at, little_endian2);
            }, size: 2 };
          case "uint16":
          case "ushort":
            return { read: (at) => {
              return dataview.getUint16(at, little_endian2);
            }, size: 2 };
          case "int32":
          case "int":
            return { read: (at) => {
              return dataview.getInt32(at, little_endian2);
            }, size: 4 };
          case "uint32":
          case "uint":
            return { read: (at) => {
              return dataview.getUint32(at, little_endian2);
            }, size: 4 };
          case "float32":
          case "float":
            return { read: (at) => {
              return dataview.getFloat32(at, little_endian2);
            }, size: 4 };
          case "float64":
          case "double":
            return { read: (at) => {
              return dataview.getFloat64(at, little_endian2);
            }, size: 8 };
        }
      }
      for (let i = 0, l = properties.length; i < l; i++) {
        const property = properties[i];
        if (property.type === "list") {
          property.countReader = getBinaryReader(body, property.countType, little_endian);
          property.valueReader = getBinaryReader(body, property.itemType, little_endian);
        } else {
          property.valueReader = getBinaryReader(body, property.type, little_endian);
        }
      }
    }
    function parseBinary(data2, header) {
      const buffer = createBuffer();
      const little_endian = header.format === "binary_little_endian";
      const body = new DataView(data2, header.headerLength);
      let result, loc = 0;
      for (let currentElement = 0; currentElement < header.elements.length; currentElement++) {
        const elementDesc = header.elements[currentElement];
        const properties = elementDesc.properties;
        const attributeDescriptor = getAttributeDescriptor(properties);
        buffer.descriptors[elementDesc.name] = attributeDescriptor;
        setPropertyBinaryReaders(properties, body, little_endian);
        for (let currentElementCount = 0; currentElementCount < elementDesc.count; currentElementCount++) {
          result = binaryReadElement(loc, properties);
          loc += result[1];
          const element = result[0];
          handleElement(buffer, elementDesc.name, element, attributeDescriptor);
        }
      }
      return postProcess(buffer);
    }
    function extractHeaderText(bytes) {
      let i = 0;
      let cont = true;
      let line = "";
      const lines = [];
      const startLine = new TextDecoder().decode(bytes.subarray(0, 5));
      const hasCRNL = /^ply\r\n/.test(startLine);
      do {
        const c = String.fromCharCode(bytes[i++]);
        if (c !== "\n" && c !== "\r") {
          line += c;
        } else {
          if (line === "end_header") cont = false;
          if (line !== "") {
            lines.push(line);
            line = "";
          }
        }
      } while (cont && i < bytes.length);
      if (hasCRNL === true) i++;
      return { headerText: lines.join("\r") + "\r", headerLength: i };
    }
    let geometry;
    const scope = this;
    if (data instanceof ArrayBuffer) {
      const bytes = new Uint8Array(data);
      const { headerText, headerLength } = extractHeaderText(bytes);
      const header = parseHeader(headerText, headerLength);
      if (header.format === "ascii") {
        const text = new TextDecoder().decode(bytes);
        geometry = parseASCII(text, header);
      } else {
        geometry = parseBinary(data, header);
      }
    } else {
      geometry = parseASCII(data, parseHeader(data));
    }
    return geometry;
  }
};
var Float64BufferAttribute = class extends BufferAttribute {
  constructor(array, itemSize, normalized) {
    super(new Float64Array(array), itemSize, normalized);
  }
};
var ArrayStream = class {
  constructor(arr) {
    this.arr = arr;
    this.i = 0;
  }
  empty() {
    return this.i >= this.arr.length;
  }
  next() {
    return this.arr[this.i++];
  }
};

// src/app/componentes/carreras.ts
var _c0 = ["canvasContainer"];
var PlyViewerComponent = class _PlyViewerComponent {
  ngZone;
  canvasContainer;
  renderer;
  scene;
  camera;
  spotLight;
  controls;
  gui;
  animationFrameId = null;
  resizeListener = () => this.onWindowResize();
  constructor(ngZone) {
    this.ngZone = ngZone;
  }
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.initThreeJS();
    });
  }
  ngOnDestroy() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener("resize", this.resizeListener);
    if (this.gui) {
      this.gui.destroy();
    }
    this.controls?.dispose();
    this.renderer?.dispose();
    if (this.renderer?.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
  initThreeJS() {
    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.renderer.setAnimationLoop(() => this.animate());
    container.appendChild(this.renderer.domElement);
    this.renderer.toneMapping = NeutralToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFShadowMap;
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(40, width / height, 0.1, 100);
    this.camera.position.set(7, 4, 1);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 2;
    this.controls.maxDistance = 10;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.target.set(0, 1, 0);
    this.controls.update();
    const loader = new TextureLoader().setPath("/");
    const filenames = ["www3.svg", "disturb.jpg", "www1.svg"];
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
    const ambient = new HemisphereLight(16777215, 9276813, 0.25);
    this.scene.add(ambient);
    this.spotLight = new SpotLight(16777215, 300);
    this.spotLight.name = "spotLight";
    this.spotLight.map = textures["www3.svg"];
    this.spotLight.position.set(2.5, 5, 2.5);
    this.spotLight.angle = Math.PI / 6;
    this.spotLight.penumbra = 1;
    this.spotLight.decay = 2;
    this.spotLight.distance = 0;
    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.width = 1024;
    this.spotLight.shadow.mapSize.height = 1024;
    this.spotLight.shadow.camera.near = 2;
    this.spotLight.shadow.camera.far = 10;
    this.spotLight.shadow.focus = 1;
    this.spotLight.shadow.bias = -3e-3;
    this.spotLight.shadow.intensity = 0.8;
    this.scene.add(this.spotLight);
    const slAny = this.spotLight;
    slAny.lightHelper = new SpotLightHelper(this.spotLight);
    slAny.lightHelper.visible = false;
    this.scene.add(slAny.lightHelper);
    slAny.shadowCameraHelper = new CameraHelper(this.spotLight.shadow.camera);
    slAny.shadowCameraHelper.visible = false;
    this.scene.add(slAny.shadowCameraHelper);
    const geometry = new PlaneGeometry(10, 10);
    const material = new MeshLambertMaterial({ color: 12369084 });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(0, -1, 0);
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    new PLYLoader().load("/fractal.ply", (geometry2) => {
      geometry2.scale(0.8, 0.8, 0.8);
      geometry2.computeVertexNormals();
      const modelMaterial = new MeshLambertMaterial();
      const modelMesh = new Mesh(geometry2, modelMaterial);
      modelMesh.rotation.z = Math.PI / 2;
      modelMesh.position.y = 0.8;
      modelMesh.castShadow = true;
      modelMesh.receiveShadow = true;
      this.scene.add(modelMesh);
    });
    window.addEventListener("resize", this.resizeListener);
    this.gui = new g();
    const params = {
      map: textures["www3.svg"],
      color: this.spotLight.color.getHex(),
      intensity: this.spotLight.intensity,
      distance: this.spotLight.distance,
      angle: this.spotLight.angle,
      penumbra: this.spotLight.penumbra,
      decay: this.spotLight.decay,
      focus: this.spotLight.shadow.focus,
      shadowIntensity: this.spotLight.shadow.intensity,
      helpers: false
    };
    this.gui.add(params, "map", textures).onChange((val) => {
      this.spotLight.map = val;
    });
    this.gui.addColor(params, "color").onChange((val) => {
      this.spotLight.color.setHex(val);
    });
    this.gui.add(params, "intensity", 0, 500).onChange((val) => {
      this.spotLight.intensity = val;
    });
    this.gui.add(params, "distance", 0, 20).onChange((val) => {
      this.spotLight.distance = val;
    });
    this.gui.add(params, "angle", 0, Math.PI / 3).onChange((val) => {
      this.spotLight.angle = val;
    });
    this.gui.add(params, "penumbra", 0, 1).onChange((val) => {
      this.spotLight.penumbra = val;
    });
    this.gui.add(params, "decay", 1, 2).onChange((val) => {
      this.spotLight.decay = val;
    });
    this.gui.add(params, "focus", 0, 1).onChange((val) => {
      this.spotLight.shadow.focus = val;
    });
    this.gui.add(params, "shadowIntensity", 0, 1).onChange((val) => {
      this.spotLight.shadow.intensity = val;
    });
    this.gui.add(params, "helpers").onChange((val) => {
      slAny.lightHelper.visible = val;
      slAny.shadowCameraHelper.visible = val;
    });
    this.gui.open();
  }
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
  animate() {
    const time = performance.now() / 3e3;
    this.spotLight.position.x = Math.cos(time) * 2.5;
    this.spotLight.position.z = Math.sin(time) * 2.5;
    const slAny = this.spotLight;
    if (slAny.lightHelper) {
      slAny.lightHelper.update();
    }
    this.renderer.render(this.scene, this.camera);
  }
  static \u0275fac = function PlyViewerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlyViewerComponent)(\u0275\u0275directiveInject(NgZone));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlyViewerComponent, selectors: [["app-ply-viewer"]], viewQuery: function PlyViewerComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.canvasContainer = _t.first);
    }
  }, decls: 3, vars: 0, consts: [["canvasContainer", ""], [1, "viewer-container"]], template: function PlyViewerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-navbar")(1, "div", 1, 0);
    }
  }, dependencies: [Navbar], styles: ['\n\n.viewer-container[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  height: 100vh;\n  overflow: hidden;\n  margin: 0;\n  background-color: #1a1a1a;\n}\n[_nghost-%COMP%]     .lil-gui {\n  --background-color: rgba(20, 20, 20, 0.9);\n  --text-color: #fff;\n  font-family:\n    "Segoe UI",\n    Tahoma,\n    Geneva,\n    Verdana,\n    sans-serif;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);\n}\n/*# sourceMappingURL=carreras.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlyViewerComponent, [{
    type: Component,
    args: [{ selector: "app-ply-viewer", standalone: true, imports: [Navbar], changeDetection: ChangeDetectionStrategy.OnPush, template: `
      <app-navbar></app-navbar>
    <div class="viewer-container" #canvasContainer></div>
  `, styles: ['/* angular:styles/component:css;5dfa4ac4ebbeb8703599b9a76181d4c46e119b67984982a72747708aaed6d14e;/home/linuxlite/WebMEAN/src/app/componentes/carreras.ts */\n.viewer-container {\n  position: relative;\n  width: 100%;\n  height: 100vh;\n  overflow: hidden;\n  margin: 0;\n  background-color: #1a1a1a;\n}\n:host ::ng-deep .lil-gui {\n  --background-color: rgba(20, 20, 20, 0.9);\n  --text-color: #fff;\n  font-family:\n    "Segoe UI",\n    Tahoma,\n    Geneva,\n    Verdana,\n    sans-serif;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);\n}\n/*# sourceMappingURL=carreras.css.map */\n'] }]
  }], () => [{ type: NgZone }], { canvasContainer: [{
    type: ViewChild,
    args: ["canvasContainer", { static: true }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlyViewerComponent, { className: "PlyViewerComponent", filePath: "src/app/componentes/carreras.ts", lineNumber: 45 });
})();
export {
  PlyViewerComponent
};
//# sourceMappingURL=chunk-MBUKGORV.mjs.map
