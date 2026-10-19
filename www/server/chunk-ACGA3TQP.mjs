import './polyfills.server.mjs';
import {
  GLTFLoader
} from "./chunk-5E2DRCFD.mjs";
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
  AudioListener,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Color,
  CubeTextureLoader,
  DirectionalLight,
  Fog,
  GridHelper,
  HemisphereLight,
  Line,
  LineBasicMaterial,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PositionalAudio,
  Scene,
  WebGLRenderer
} from "./chunk-ULG7G2AN.mjs";
import "./chunk-IESDD46D.mjs";
import {
  HttpClient
} from "./chunk-JRMDAGFP.mjs";
import {
  CommonModule,
  NgClass
} from "./chunk-TDOK3CTI.mjs";
import {
  Component,
  NgZone,
  ViewChild,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdeclareLet,
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
  ɵɵreadContextLet,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstoreLet,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-GYAE75W3.mjs";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-TB3YAHZW.mjs";

// node_modules/three/examples/jsm/helpers/PositionalAudioHelper.js
var PositionalAudioHelper = class extends Line {
  /**
   * Constructs a new positional audio helper.
   *
   * @param {PositionalAudio} audio - The audio to visualize.
   * @param {number} [range=1] - The range of the directional cone.
   * @param {number} [divisionsInnerAngle=16] - The number of divisions of the inner part of the directional cone.
   * @param {number} [divisionsOuterAngle=2] The number of divisions of the outer part of the directional cone.
   */
  constructor(audio, range = 1, divisionsInnerAngle = 16, divisionsOuterAngle = 2) {
    const geometry = new BufferGeometry();
    const divisions = divisionsInnerAngle + divisionsOuterAngle * 2;
    const positions = new Float32Array((divisions * 3 + 3) * 3);
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    const materialInnerAngle = new LineBasicMaterial({ color: 65280 });
    const materialOuterAngle = new LineBasicMaterial({ color: 16776960 });
    super(geometry, [materialOuterAngle, materialInnerAngle]);
    this.audio = audio;
    this.range = range;
    this.divisionsInnerAngle = divisionsInnerAngle;
    this.divisionsOuterAngle = divisionsOuterAngle;
    this.type = "PositionalAudioHelper";
    this.update();
  }
  /**
   * Updates the helper. This method must be called whenever the directional cone
   * of the positional audio is changed.
   */
  update() {
    const audio = this.audio;
    const range = this.range;
    const divisionsInnerAngle = this.divisionsInnerAngle;
    const divisionsOuterAngle = this.divisionsOuterAngle;
    const coneInnerAngle = MathUtils.degToRad(audio.panner.coneInnerAngle);
    const coneOuterAngle = MathUtils.degToRad(audio.panner.coneOuterAngle);
    const halfConeInnerAngle = coneInnerAngle / 2;
    const halfConeOuterAngle = coneOuterAngle / 2;
    let start = 0;
    let count = 0;
    let i;
    let stride;
    const geometry = this.geometry;
    const positionAttribute = geometry.attributes.position;
    geometry.clearGroups();
    function generateSegment(from, to, divisions, materialIndex) {
      const step = (to - from) / divisions;
      positionAttribute.setXYZ(start, 0, 0, 0);
      count++;
      for (i = from; i < to; i += step) {
        stride = start + count;
        positionAttribute.setXYZ(stride, Math.sin(i) * range, 0, Math.cos(i) * range);
        positionAttribute.setXYZ(stride + 1, Math.sin(Math.min(i + step, to)) * range, 0, Math.cos(Math.min(i + step, to)) * range);
        positionAttribute.setXYZ(stride + 2, 0, 0, 0);
        count += 3;
      }
      geometry.addGroup(start, count, materialIndex);
      start += count;
      count = 0;
    }
    generateSegment(-halfConeOuterAngle, -halfConeInnerAngle, divisionsOuterAngle, 0);
    generateSegment(-halfConeInnerAngle, halfConeInnerAngle, divisionsInnerAngle, 1);
    generateSegment(halfConeInnerAngle, halfConeOuterAngle, divisionsOuterAngle, 0);
    positionAttribute.needsUpdate = true;
    if (coneInnerAngle === coneOuterAngle) this.material[0].visible = false;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   */
  dispose() {
    this.geometry.dispose();
    this.material[0].dispose();
    this.material[1].dispose();
  }
};

// src/app/componentes/audio.ts
var _c0 = ["audioPlayer"];
var _c1 = ["canvasContainer"];
var _forTrack0 = ($index, $item) => $item.id || $item.globalIndex;
function MultiTrackAudioPlayerComponent_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.currentFolder(), " ");
  }
}
function MultiTrackAudioPlayerComponent_Conditional_3_For_26_Conditional_8_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 27);
    \u0275\u0275listener("click", function MultiTrackAudioPlayerComponent_Conditional_3_For_26_Conditional_8_For_4_Template_div_click_1_listener() {
      const track_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.handleSelectTrack(track_r6.globalIndex));
    });
    \u0275\u0275elementStart(2, "div", 28)(3, "span", 29);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 30);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const track_r6 = ctx.$implicit;
    const isSelected_r7 = track_r6.globalIndex === \u0275\u0275nextContext(4).currentTrackIndex();
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", isSelected_r7 ? "bg-warning text-dark fw-bold shadow-sm" : "bg-white text-secondary");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", isSelected_r7 ? "bg-dark text-white" : "bg-light text-dark");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" #", track_r6.globalIndex + 1, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(track_r6.songTitle);
  }
}
function MultiTrackAudioPlayerComponent_Conditional_3_For_26_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 24)(2, "div", 25);
    \u0275\u0275repeaterCreate(3, MultiTrackAudioPlayerComponent_Conditional_3_For_26_Conditional_8_For_4_Template, 7, 4, "div", 26, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const tracks_r8 = \u0275\u0275readContextLet(0);
    const folderId_r9 = \u0275\u0275readContextLet(1);
    \u0275\u0275property("id", folderId_r9);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(tracks_r8);
  }
}
function MultiTrackAudioPlayerComponent_Conditional_3_For_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275declareLet(0)(1);
    \u0275\u0275elementStart(2, "div", 20)(3, "h5", 21)(4, "button", 22);
    \u0275\u0275listener("click", function MultiTrackAudioPlayerComponent_Conditional_3_For_26_Template_button_click_4_listener() {
      const folder_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleFolder(folder_r4));
    });
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, MultiTrackAudioPlayerComponent_Conditional_3_For_26_Conditional_8_Template, 5, 1, "div", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const folder_r4 = ctx.$implicit;
    const \u0275$index_50_r10 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    const tracks_r11 = \u0275\u0275storeLet(ctx_r1.groupedPlaylist()[folder_r4]);
    const isOpen_r12 = ctx_r1.openFolder() === folder_r4;
    \u0275\u0275advance();
    const folderId_r13 = \u0275\u0275storeLet("folder-collapse-" + \u0275$index_50_r10);
    \u0275\u0275advance(2);
    \u0275\u0275property("id", "heading-" + \u0275$index_50_r10);
    \u0275\u0275advance();
    \u0275\u0275classProp("collapsed", !isOpen_r12);
    \u0275\u0275attribute("aria-expanded", isOpen_r12)("aria-controls", folderId_r13);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(folder_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" [", tracks_r11.length, " ", tracks_r11.length === 1 ? "pista" : "pistas", "] ");
    \u0275\u0275advance();
    \u0275\u0275conditional(isOpen_r12 ? 8 : -1);
  }
}
function MultiTrackAudioPlayerComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5);
    \u0275\u0275conditionalCreate(2, MultiTrackAudioPlayerComponent_Conditional_3_Conditional_2_Template, 2, 1, "span", 6);
    \u0275\u0275elementStart(3, "h3", 7);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 8);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "div", 9);
    \u0275\u0275element(8, "div", 10, 0);
    \u0275\u0275elementStart(10, "div", 11);
    \u0275\u0275element(11, "i", 12);
    \u0275\u0275text(12, " Arrastra para navegar en 3D (Audio Posicional con Orientaci\xF3n) ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 13)(14, "audio", 14, 1);
    \u0275\u0275listener("play", function MultiTrackAudioPlayerComponent_Conditional_3_Template_audio_play_14_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onPlay(ctx_r1.currentTrack().name));
    })("ended", function MultiTrackAudioPlayerComponent_Conditional_3_Template_audio_ended_14_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleNextTrack());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 15)(17, "button", 16);
    \u0275\u0275listener("click", function MultiTrackAudioPlayerComponent_Conditional_3_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handlePrevTrack());
    });
    \u0275\u0275text(18, "Anterior");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 16);
    \u0275\u0275listener("click", function MultiTrackAudioPlayerComponent_Conditional_3_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleNextTrack());
    });
    \u0275\u0275text(20, "Siguiente");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 17)(22, "h4", 18);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 19);
    \u0275\u0275repeaterCreate(25, MultiTrackAudioPlayerComponent_Conditional_3_For_26_Template, 9, 11, "div", 20, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.currentFolder() ? 2 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.currentSongTitle());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.currentTrack().url);
    \u0275\u0275advance(8);
    \u0275\u0275property("src", ctx_r1.currentTrack().url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" HiRes Playlist ", ctx_r1.isTargetHostname ? "ESFAPA" : "FISARTH", " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.groupedPlaylistKeys());
  }
}
var DEFAULT_TRACK = { name: "", url: "" };
var FREE_ONLINE_RADIOS = [
  // Peruvian Live Radios
  { name: "Radios Online/RPP Noticias", url: "https://stream-162.zeno.fm/9146059635?zs=o7qP_w8qS9-bO-S-w7xJEA" },
  { name: "Radios Online/Radio Exitosa", url: "https://stream-159.zeno.fm/3u30w3m318zuv" },
  { name: "Radios Online/Studio 92", url: "https://stream-154.zeno.fm/f3959x90438uv" },
  { name: "Radios Online/Radio Ritmo Rom\xE1ntica", url: "https://stream-151.zeno.fm/1f4x0y35638uv" },
  { name: "Radios Online/Radio La Zona", url: "https://stream-156.zeno.fm/u2f62n44638uv" },
  { name: "Radios Online/Radio Panamericana", url: "https://stream-152.zeno.fm/87a91g35638uv" },
  { name: "Radios Online/Radio Felicidad", url: "https://stream-158.zeno.fm/k2k72155638uv" },
  { name: "Radios Online/Radio Moda", url: "https://stream-150.zeno.fm/9s1v9z35638uv" },
  { name: "Radios Online/Oasis 101.5 FM", url: "https://stream-153.zeno.fm/1f298815638uv" },
  { name: "Radios Online/Radio Mar 106.3 FM", url: "https://stream-155.zeno.fm/a87cbf55638uv" },
  { name: "Radios Online/Radio Doble Nueve 99.1 FM", url: "https://stream-157.zeno.fm/5y219b55638uv" },
  { name: "Radios Online/Radio Ox\xEDgeno", url: "https://stream-160.zeno.fm/82c89655638uv" },
  { name: "Radios Online/Radio Capital 96.7 FM", url: "https://stream-161.zeno.fm/u98a0g55638uv" },
  { name: "Radios Online/Radio Nueva Q", url: "https://stream-163.zeno.fm/96348915638uv" },
  // International News & Public Radio
  { name: "Radios Online/BBC World Service", url: "https://stream.live.vc.bbcmedia.co.uk/bbc_world_service" },
  { name: "Radios Online/NPR Live 24-7", url: "https://npr-ice.streamguys1.com/live.mp3" },
  { name: "Radios Online/Radio France Internationale (RFI Espa\xF1ol)", url: "https://rfiespanol.ice.infomaniak.ch/rfiespanol-64.mp3" },
  { name: "Radios Online/Deutsche Welle Radio", url: "https://dwstream4.akamaized.net/dwstream4_live/index.m3u8" },
  // Music & Indie Streams
  { name: "Radios Online/KEXP Seattle 90.3 FM", url: "https://kexp.streamguys1.com/kexp128.mp3" },
  { name: "Radios Online/SomaFM - Secret Agent", url: "https://ice1.somafm.com/secretagent-128-mp3" },
  { name: "Radios Online/SomaFM - Def Con Radio", url: "https://ice4.somafm.com/defcon-128-mp3" },
  { name: "Radios Online/SomaFM - Drone Zone", url: "https://ice2.somafm.com/dronezone-128-mp3" },
  { name: "Radios Online/SomaFM - Lush", url: "https://ice1.somafm.com/lush-128-mp3" },
  { name: "Radios Online/Chillhop Radio - Lofi Hip Hop", url: "https://stream.chillhop.com/live.mp3" }
];
var MultiTrackAudioPlayerComponent = class _MultiTrackAudioPlayerComponent {
  audioPlayerRef;
  canvasContainerRef;
  http = inject(HttpClient);
  ngZone = inject(NgZone);
  apiUrl = environment.apiURL || process.env["REACT_APP_API_URL"] || "";
  playlist = signal([], ...ngDevMode ? [{ debugName: "playlist" }] : []);
  currentTrackIndex = signal(0, ...ngDevMode ? [{ debugName: "currentTrackIndex" }] : []);
  openFolder = signal(null, ...ngDevMode ? [{ debugName: "openFolder" }] : []);
  // Core Three.js & WebAudio references
  scene;
  camera;
  renderer;
  controls;
  audioListener;
  positionalAudio;
  audioConnected = false;
  boundOnResize = this.onWindowResize.bind(this);
  isTargetHostname = typeof window !== "undefined" && window.location.hostname === "www.esfapa.edu.pe";
  ngOnInit() {
    this.fetchPlaylist();
  }
  initThreeScene() {
    if (!this.canvasContainerRef)
      return;
    const container = this.canvasContainerRef.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.camera = new PerspectiveCamera(45, width / height, 0.1, 50);
    this.camera.position.set(0.5, 1.5, 0.5);
    this.scene = new Scene();
    this.scene.background = new Color(10526880);
    this.scene.fog = new Fog(10526880, 2, 20);
    const reflectionCube = new CubeTextureLoader().setPath("SwedishRoyalCastle/").load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
    const hemiLight = new HemisphereLight(16777215, 9276813, 3);
    hemiLight.position.set(0, 20, 20);
    this.scene.add(hemiLight);
    const dirLight = new DirectionalLight(16777215, 3);
    dirLight.position.set(5, 5, 0);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 1;
    dirLight.shadow.camera.bottom = -1;
    dirLight.shadow.camera.left = -1;
    dirLight.shadow.camera.right = 1;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 20;
    this.scene.add(dirLight);
    const planeMesh = new Mesh(new PlaneGeometry(50, 50), new MeshPhongMaterial({ color: 13355979, depthWrite: false }));
    planeMesh.rotation.x = -Math.PI / 2;
    planeMesh.receiveShadow = true;
    this.scene.add(planeMesh);
    const grid = new GridHelper(50, 50, 12698049, 12698049);
    this.scene.add(grid);
    this.audioListener = new AudioListener();
    this.camera.add(this.audioListener);
    this.positionalAudio = new PositionalAudio(this.audioListener);
    this.positionalAudio.setRefDistance(1);
    this.positionalAudio.setDirectionalCone(180, 230, 0.1);
    const audioHelper = new PositionalAudioHelper(this.positionalAudio, 2);
    this.positionalAudio.add(audioHelper);
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("/new.glb", (gltf) => {
      const boomBox = gltf.scene;
      boomBox.position.set(0, 1, 0);
      boomBox.scale.set(0.9, 0.9, 0.9);
      boomBox.traverse((object) => {
        if (object.isMesh) {
          const mesh = object;
          mesh.material.envMap = reflectionCube;
          mesh.geometry.rotateY(-Math.PI);
          mesh.castShadow = true;
        }
      });
      boomBox.add(this.positionalAudio);
      this.scene.add(boomBox);
    }, void 0, (err) => console.error("Error loading BoomBox GLTF:", err));
    const wallGeometry = new BoxGeometry(2, 1, 0.1);
    const wallMaterial = new MeshBasicMaterial({
      color: "blue",
      transparent: true,
      opacity: 0.5
    });
    const wall = new Mesh(wallGeometry, wallMaterial);
    wall.position.set(0, 1, -0.5);
    this.scene.add(wall);
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    container.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 1, 0);
    this.controls.minDistance = 0.5;
    this.controls.maxDistance = 10;
    this.controls.maxPolarAngle = 0.5 * Math.PI;
    this.controls.update();
    window.addEventListener("resize", this.boundOnResize);
    this.ngZone.runOutsideAngular(() => {
      this.renderer.setAnimationLoop(() => {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
      });
    });
  }
  connectAudioPipeline() {
    if (this.audioConnected || !this.audioPlayerRef?.nativeElement || !this.positionalAudio)
      return;
    const audioElement = this.audioPlayerRef.nativeElement;
    this.positionalAudio.setMediaElementSource(audioElement);
    this.audioConnected = true;
  }
  async ensureAudioContextActive() {
    if (this.audioListener?.context && this.audioListener.context.state === "suspended") {
      await this.audioListener.context.resume();
    }
  }
  playCurrentAudioTrack() {
    setTimeout(async () => {
      await this.ensureAudioContextActive();
      const audioElement = this.audioPlayerRef?.nativeElement;
      if (audioElement) {
        audioElement.load();
        audioElement.play().catch((err) => console.warn("Autoplay prevented or stream unsupported:", err));
      }
    }, 50);
  }
  fetchPlaylist = async () => {
    try {
      this.http.post(`${this.apiUrl}/api/users/audio`, {}).subscribe({
        next: (data) => {
          const apiTracks = Array.isArray(data) ? data : [];
          this.playlist.set([...FREE_ONLINE_RADIOS, ...apiTracks]);
          setTimeout(() => this.initThreeScene(), 0);
        },
        error: (err) => {
          console.error("Error loading playlist from API:", err);
          this.playlist.set([...FREE_ONLINE_RADIOS]);
          setTimeout(() => this.initThreeScene(), 0);
        }
      });
    } catch (err) {
      console.error("Error loading playlist:", err);
      this.playlist.set([...FREE_ONLINE_RADIOS]);
      setTimeout(() => this.initThreeScene(), 0);
    }
  };
  groupedPlaylist = computed(() => {
    return this.playlist().reduce((groups, track, globalIndex) => {
      const parts = (track.name || "").split("/");
      const folderName = parts.length > 1 ? parts[0].trim() : "Varios / Sin Carpeta";
      const songTitle = parts.length > 1 ? parts.slice(1).join("/") : track.name;
      if (!groups[folderName]) {
        groups[folderName] = [];
      }
      groups[folderName].push(__spreadProps(__spreadValues({}, track), {
        songTitle,
        globalIndex
      }));
      return groups;
    }, {});
  }, ...ngDevMode ? [{ debugName: "groupedPlaylist" }] : []);
  groupedPlaylistKeys = computed(() => Object.keys(this.groupedPlaylist()), ...ngDevMode ? [{ debugName: "groupedPlaylistKeys" }] : []);
  currentTrack = computed(() => {
    const list = this.playlist();
    const idx = this.currentTrackIndex();
    return list[idx] || DEFAULT_TRACK;
  }, ...ngDevMode ? [{ debugName: "currentTrack" }] : []);
  currentSongParts = computed(() => (this.currentTrack().name || "").split("/"), ...ngDevMode ? [{ debugName: "currentSongParts" }] : []);
  currentSongTitle = computed(() => {
    const parts = this.currentSongParts();
    return parts.length > 1 ? parts.slice(1).join("/") : this.currentTrack().name;
  }, ...ngDevMode ? [{ debugName: "currentSongTitle" }] : []);
  currentFolder = computed(() => {
    const parts = this.currentSongParts();
    return parts.length > 1 ? parts[0] : null;
  }, ...ngDevMode ? [{ debugName: "currentFolder" }] : []);
  handleNextTrack = () => {
    const len = this.playlist().length;
    if (len === 0)
      return;
    this.currentTrackIndex.update((prev) => prev < len - 1 ? prev + 1 : 0);
    this.syncOpenFolder();
    this.playCurrentAudioTrack();
  };
  handlePrevTrack = () => {
    const len = this.playlist().length;
    if (len === 0)
      return;
    this.currentTrackIndex.update((prev) => prev > 0 ? prev - 1 : len - 1);
    this.syncOpenFolder();
    this.playCurrentAudioTrack();
  };
  handleSelectTrack = (globalIndex) => {
    this.currentTrackIndex.set(globalIndex);
    this.syncOpenFolder();
    this.playCurrentAudioTrack();
  };
  toggleFolder = (folderName) => {
    this.openFolder.update((prev) => prev === folderName ? null : folderName);
  };
  syncOpenFolder() {
    const track = this.currentTrack();
    if (track?.name) {
      const parts = track.name.split("/");
      const folderName = parts.length > 1 ? parts[0].trim() : "Varios / Sin Carpeta";
      this.openFolder.set(folderName);
    }
  }
  async onPlay(trackName) {
    this.connectAudioPipeline();
    await this.ensureAudioContextActive();
    console.log(`Playing spatial audio track: ${trackName}`);
  }
  onWindowResize() {
    if (!this.canvasContainerRef || !this.renderer || !this.camera)
      return;
    const container = this.canvasContainerRef.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
  ngOnDestroy() {
    window.removeEventListener("resize", this.boundOnResize);
    if (this.renderer) {
      this.renderer.setAnimationLoop(null);
      this.renderer.dispose();
    }
    if (this.controls) {
      this.controls.dispose();
    }
    if (this.audioListener?.context) {
      this.audioListener.context.close();
    }
  }
  static \u0275fac = function MultiTrackAudioPlayerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MultiTrackAudioPlayerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MultiTrackAudioPlayerComponent, selectors: [["app-multi-track-audio-player"]], viewQuery: function MultiTrackAudioPlayerComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5)(_c1, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.audioPlayerRef = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.canvasContainerRef = _t.first);
    }
  }, decls: 4, vars: 1, consts: [["canvasContainer", ""], ["audioPlayer", ""], [1, "py-5"], [1, "container", "my-4"], [1, "card", "shadow-sm", "mb-3", "text-center"], [1, "card-body"], [1, "mb-2", "h3", "px-3", "py-2", "fs-6"], [1, "card-title", "fw-bold", "text-dark", "my-2"], [1, "card-text", "text-muted", "small", "text-break"], [1, "card", "shadow-sm", "mb-3", "overflow-hidden", "bg-dark", "position-relative"], [1, "w-100", 2, "height", "420px"], [1, "position-absolute", "bottom-0", "start-0", "p-2", "text-white", "bg-dark", "bg-opacity-75", "small"], [1, "bi", "bi-arrows-move", "me-1"], [1, "shadow-sm", "rounded", "overflow-hidden", "mb-4", "p-3", "bg-white", "text-center"], ["controls", "", "crossOrigin", "anonymous", 1, "w-100", 3, "play", "ended", "src"], [1, "btn-group", "mt-2"], [1, "btn", "btn-outline-secondary", "btn-sm", 3, "click"], [1, "text-center"], [1, "fw-bold", "mb-3", "text-uppercase", "text-secondary"], ["id", "playlistAccordion", 1, "accordion", "shadow-sm"], [1, "accordion-item", "p-1"], [1, "m-0", 3, "id"], ["type", "button", 1, "btn", "btn-info", "w-100", 3, "click"], [1, "w-100", "accordion-collapse", "show", 3, "id"], [1, "accordion-body", "p-3"], [1, "row", "g-2", "justify-content-center"], [1, "col-12", "col-md-6", "col-lg-4"], [1, "h-100", "p-1", "transition-all", "border", 2, "cursor", "pointer", "transition", "0.2s ease-in-out", 3, "click", "ngClass"], [1, "text-left", "p-1", "align-items-center"], [1, "mb-1", "p-1", "rounded", 3, "ngClass"], [1, "text-break"]], template: function MultiTrackAudioPlayerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-navbar")(1, "div", 2);
      \u0275\u0275elementStart(2, "div", 3);
      \u0275\u0275conditionalCreate(3, MultiTrackAudioPlayerComponent_Conditional_3_Template, 27, 5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.playlist().length > 0 ? 3 : -1);
    }
  }, dependencies: [Navbar, CommonModule, NgClass], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MultiTrackAudioPlayerComponent, [{
    type: Component,
    args: [{
      selector: "app-multi-track-audio-player",
      standalone: true,
      imports: [Navbar, CommonModule],
      template: `
    <app-navbar></app-navbar>
    <div class="py-5"></div>

    <div class="container my-4">
      @if (playlist().length > 0) {
        <!-- Track Metadata -->
        <div class="card shadow-sm mb-3 text-center">
          <div class="card-body">
            @if (currentFolder()) {
              <span class="mb-2 h3 px-3 py-2 fs-6">
                {{ currentFolder() }}
              </span>
            }
            <h3 class="card-title fw-bold text-dark my-2">{{ currentSongTitle() }}</h3>
            <p class="card-text text-muted small text-break">{{ currentTrack().url }}</p>
          </div>
        </div>

        <!-- 3D Canvas Spatial Viewport -->
        <div class="card shadow-sm mb-3 overflow-hidden bg-dark position-relative">
          <div #canvasContainer class="w-100" style="height: 420px;"></div>
          <div class="position-absolute bottom-0 start-0 p-2 text-white bg-dark bg-opacity-75 small">
            <i class="bi bi-arrows-move me-1"></i> Arrastra para navegar en 3D (Audio Posicional con Orientaci\xF3n)
          </div>
        </div>

        <!-- Audio Player Controls -->
        <div class="shadow-sm rounded overflow-hidden mb-4 p-3 bg-white text-center">
          <audio
            #audioPlayer
            class="w-100"
            controls
            crossOrigin="anonymous"
            [src]="currentTrack().url"
            (play)="onPlay(currentTrack().name)"
            (ended)="handleNextTrack()"
          ></audio>
          <div class="btn-group mt-2">
            <button class="btn btn-outline-secondary btn-sm" (click)="handlePrevTrack()">Anterior</button>
            <button class="btn btn-outline-secondary btn-sm" (click)="handleNextTrack()">Siguiente</button>
          </div>
        </div>

        <!-- Playlist Accordion -->
        <div class="text-center">
          <h4 class="fw-bold mb-3 text-uppercase text-secondary">
            HiRes Playlist {{ isTargetHostname ? 'ESFAPA' : 'FISARTH' }}
          </h4>

          <div class="accordion shadow-sm" id="playlistAccordion">
            @for (folder of groupedPlaylistKeys(); track folder; let folderIdx = $index) {
              @let tracks = groupedPlaylist()[folder];
              @let isOpen = openFolder() === folder;
              @let folderId = 'folder-collapse-' + folderIdx;

              <div class="accordion-item p-1">
                <h5 class="m-0" [id]="'heading-' + folderIdx">
                  <button
                    class="btn btn-info w-100"
                    [class.collapsed]="!isOpen"
                    type="button"
                    (click)="toggleFolder(folder)"
                    [attr.aria-expanded]="isOpen"
                    [attr.aria-controls]="folderId"
                  >
                    <span>{{ folder }}</span> [{{ tracks.length }} {{ tracks.length === 1 ? 'pista' : 'pistas' }}]
                  </button>
                </h5>

                @if (isOpen) {
                  <div [id]="folderId" class="w-100 accordion-collapse show">
                    <div class="accordion-body p-3">
                      <div class="row g-2 justify-content-center">
                        @for (track of tracks; track track.id || track.globalIndex) {
                          @let isSelected = track.globalIndex === currentTrackIndex();
                          <div class="col-12 col-md-6 col-lg-4">
                            <div
                              (click)="handleSelectTrack(track.globalIndex)"
                              class="h-100 p-1 transition-all border"
                              [ngClass]="isSelected ? 'bg-warning text-dark fw-bold shadow-sm' : 'bg-white text-secondary'"
                              style="cursor: pointer; transition: 0.2s ease-in-out;"
                            >
                              <div class="text-left p-1 align-items-center">
                                <span [ngClass]="isSelected ? 'bg-dark text-white' : 'bg-light text-dark'" class="mb-1 p-1 rounded">
                                  #{{ track.globalIndex + 1 }}
                                </span> 
                                <span class="text-break">{{ track.songTitle }}</span>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      }
    </div>
  `
    }]
  }], null, { audioPlayerRef: [{
    type: ViewChild,
    args: ["audioPlayer"]
  }], canvasContainerRef: [{
    type: ViewChild,
    args: ["canvasContainer"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MultiTrackAudioPlayerComponent, { className: "MultiTrackAudioPlayerComponent", filePath: "src/app/componentes/audio.ts", lineNumber: 164 });
})();
export {
  MultiTrackAudioPlayerComponent
};
//# sourceMappingURL=chunk-ACGA3TQP.mjs.map
