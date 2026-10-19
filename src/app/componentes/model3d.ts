import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  signal,
  inject,
  NgZone,
  Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { MarkdownComponent } from 'ngx-markdown';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { Navbar } from './navbar';

export interface ArtworkCuratorship {
  title: string;
  artist?: string;
  year?: string;
  description?: string;
  content?: string;
  imageUrl?: string;
  [key: string]: any;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MarkdownComponent, Navbar],
  template: `
    <div class="museum-container position-relative w-100 h-100 overflow-hidden">
      <!-- Navbar superior -->
      <app-navbar />

      <!-- Loading Overlay -->
      @if (isLoading()) {
        <div class="loading-overlay position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center">
          <div class="spinner-border text-warning mb-3" role="status" style="width: 3rem; height: 3rem;">
            <!-- <span class="sr-only">Cargando...</span> -->
          </div>
          <h4 class="text-white font-weight-bold">Cargando Galería y Escultura 3D...</h4>
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
              <span class="badge badge-warning mb-2 text-dark font-weight-bold px-2 py-1">Obra en Exhibición</span>
              <h3 class="card-title h5 mb-1 text-light">{{ art.title || 'Obra Sin Título' }}</h3>
              <p class="subtitle text-muted font-italic mb-2 small">{{ art.artist || 'Artista Anónimo' }} ({{ art.year || 'S/F' }})</p>
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
                <div class="hint-item d-flex justify-content-between align-items-center mb-1"><span class="key badge badge-dark text-warning border border-warning">Rueda Mouse</span><span class="small">Zoom en órbita</span></div>
                <div class="hint-item d-flex justify-content-between align-items-center"><span class="key badge badge-dark text-warning border border-warning">ESC / Clic Der.</span><span class="small">Salir de órbita</span></div>
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
  `,
  styles: [`
    :host {
      display: block; width: 100vw; height: 100vh; margin: 0; overflow: hidden;
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      touch-action: none; -webkit-user-select: none; user-select: none;
    }
    .museum-container { background: #0d0d11; pointer-events: none; }
    .canvas-wrapper { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: auto; z-index: 1; }
    .loading-overlay { background: rgba(10, 10, 14, 0.95); backdrop-filter: blur(12px); z-index: 100; pointer-events: auto; }
    .crosshair {
      top: 50%; left: 50%; width: 8px; height: 8px;
      background-color: rgba(255, 255, 255, 0.8);
      border: 1px solid rgba(0, 0, 0, 0.5);
      transform: translate(-50%, -50%);
      pointer-events: none; z-index: 5;
    }
    .artwork-card {
      position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%);
      background: rgba(18, 18, 24, 0.92) !important; backdrop-filter: blur(12px);
      max-width: 420px; width: 85%; z-index: 10; animation: fadeIn 0.3s ease-out; pointer-events: auto;
    }
    .markdown-scroll-container { max-height: 140px; overflow-y: auto; padding-right: 6px; margin-top: 8px; font-size: 0.9rem; }
    .markdown-scroll-container::-webkit-scrollbar { width: 4px; }
    .markdown-scroll-container::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.6); border-radius: 4px; }
    .orbit-controls-overlay {
      position: absolute; top: 95px; left: 50%; transform: translateX(-50%);
      background: rgba(18, 18, 24, 0.85) !important; backdrop-filter: blur(8px);
      z-index: 12; animation: fadeIn 0.3s ease-out; pointer-events: auto; white-space: nowrap;
    }
    .overlay { background: rgba(10, 10, 14, 0.88); backdrop-filter: blur(10px); cursor: pointer; z-index: 20; pointer-events: auto; }
    .instructions-card { background: #16161e !important; width: 400px; max-width: 90%; text-align: center; }
    .controls-hint { background: #1f1f2c !important; font-size: 12px; }
    .touch-joystick-zone { bottom: 30px; left: 30px; width: 120px; height: 120px; z-index: 15; touch-action: none; pointer-events: auto; }
    .joystick-base { width: 100%; height: 100%; background: rgba(255, 255, 255, 0.1); }
    .joystick-stick { width: 50px; height: 50px; background: rgba(212, 175, 55, 0.7); top: 35px; left: 35px; transform: translate(0px, 0px); pointer-events: none; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translate(-50%, 10px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true })
  private canvasContainer!: ElementRef<HTMLDivElement>;

  @Input() worksParam: string = '';

  private route = inject(ActivatedRoute);
  private ngZone = inject(NgZone);
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);

  readonly isLocked = signal<boolean>(false);
  readonly activeArtwork = signal<ArtworkCuratorship | null>(null);
  readonly artworkExhibits = signal<ArtworkCuratorship[]>([]);

  readonly isLoading = signal<boolean>(true);
  readonly loadingProgress = signal<number>(0);

  public isMobile = false;
  public isMobileActive = false;
  public isOrbiting = false;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private pointerLockControls!: PointerLockControls;
  private orbitControls!: OrbitControls;
  private raycaster = new THREE.Raycaster();

  private animationFrameId: number | null = null;
  private interactiveObjects: THREE.Object3D[] = [];
  private lastRaycastTime = 0;

  private touchLookId: number | null = null;
  private touchLookLast = { x: 0, y: 0 };
  private cameraPitch = 0;
  private cameraYaw = 0;

  public joystickStyle = { transform: 'translate(0px, 0px)' };
  private joystickCenter = { x: 0, y: 0 };
  private joystickMove = { x: 0, y: 0 };

  private moveForward = false;
  private moveBackward = false;
  private moveLeft = false;
  private moveRight = false;
  private prevTime = performance.now();
  private velocity = new THREE.Vector3();
  private direction = new THREE.Vector3();

  private readonly forwardVector = new THREE.Vector3();
  private readonly sideVector = new THREE.Vector3();

  ngOnInit(): void {
    if (!this.worksParam) {
      this.worksParam = this.route.snapshot.paramMap.get('id') || '';
    }

    this.detectDeviceType();
    this.initThree();
    this.loadHdriEnvironment();
    this.initControls();
    this.buildMuseumArchitecture();
    this.fetchExhibitionData();

    window.addEventListener('resize', this.onWindowResize);
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
    document.addEventListener('click', this.onPointerClick);
    document.addEventListener('contextmenu', this.onRightClick);

    const canvasEl = this.canvasContainer.nativeElement;
    canvasEl.addEventListener('touchstart', this.onTouchStart, { passive: false });
    canvasEl.addEventListener('touchmove', this.onTouchMove, { passive: false });
    canvasEl.addEventListener('touchend', this.onTouchEnd);

    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }

  ngOnDestroy(): void {
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

    window.removeEventListener('resize', this.onWindowResize);
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
    document.removeEventListener('click', this.onPointerClick);
    document.removeEventListener('contextmenu', this.onRightClick);

    if (this.scene) {
      this.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
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

    if (this.orbitControls) this.orbitControls.dispose();
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.domElement.remove();
    }
  }

  private disposeMaterial(material: THREE.Material): void {
    for (const key of Object.keys(material)) {
      const value = (material as any)[key];
      if (value && typeof value === 'object' && 'isTexture' in value) {
        (value as THREE.Texture).dispose();
      }
    }
    material.dispose();
  }

  private detectDeviceType(): void {
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      || window.innerWidth <= 768;
  }

  private initThree(): void {
    const container = this.canvasContainer.nativeElement;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#0c0c12');
    this.scene.fog = new THREE.FogExp2('#0c0c12', 0.03);

    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(0, 1.7, 5);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    container.appendChild(this.renderer.domElement);

    const hemiLight = new THREE.HemisphereLight(0xfff5ea, 0x080820, 0.8);
    this.scene.add(hemiLight);

    const mainLight = new THREE.DirectionalLight(0xfff3e0, 1.5);
    mainLight.position.set(10, 15, 10);
    mainLight.castShadow = true;

    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 30;
    mainLight.shadow.bias = -0.0005;
    this.scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x8090b0, 0.5);
    fillLight.position.set(-10, 10, -10);
    this.scene.add(fillLight);
  }

  private loadHdriEnvironment(): void {
    const rgbeLoader = new RGBELoader();
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();

    rgbeLoader.load('music_hall_01_4k.hdr', (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      this.scene.environment = envMap;
      texture.dispose();
      pmremGenerator.dispose();
    }, undefined, () => {
      pmremGenerator.dispose();
    });
  }

  private initControls(): void {
    this.pointerLockControls = new PointerLockControls(this.camera, document.body);

    this.pointerLockControls.addEventListener('lock', () => this.isLocked.set(true));
    this.pointerLockControls.addEventListener('unlock', () => {
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
    this.orbitControls.maxDistance = 6.0;
  }

  private buildMuseumArchitecture(): void {
    const floorGeometry = new THREE.PlaneGeometry(50, 50);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x18181c,
      roughness: 0.15,
      metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);
  }

  private createPedestal(x: number, z: number): void {
    const baseGeo = new THREE.CylinderGeometry(0.7, 0.8, 1.0, 32);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x121216, roughness: 0.3, metalness: 0.1 });
    const pedestal = new THREE.Mesh(baseGeo, baseMat);
    pedestal.position.set(x, 0.5, z);
    pedestal.castShadow = true;
    pedestal.receiveShadow = true;
    this.scene.add(pedestal);

    const spotlight = new THREE.SpotLight(0xfff3d6, 12, 12, Math.PI / 6, 0.4, 1);
    spotlight.position.set(x, 4.5, z + 1.2);
    spotlight.target = pedestal;
    spotlight.castShadow = true;

    spotlight.shadow.mapSize.width = 512;
    spotlight.shadow.mapSize.height = 512;
    spotlight.shadow.bias = -0.0001;

    this.scene.add(spotlight);
    this.scene.add(spotlight.target);
  }

  private normalizeModelScale(object: THREE.Object3D, targetSize: number = 1.2): void {
    object.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    box.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scaleFactor = targetSize / maxDim;
      object.scale.setScalar(scaleFactor);

      object.updateMatrixWorld(true);
      const updatedBox = new THREE.Box3().setFromObject(object);
      object.position.y -= updatedBox.min.y;
    }
  }

  private fetchExhibitionData(): void {
    const gltfLoader = new GLTFLoader();
    const objLoader = new OBJLoader();

    this.http.get<ArtworkCuratorship[]>(`${environment.apiURL}/api/exhibitiones/${this.worksParam}`).subscribe({
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
          const percent = Math.round((loadedCount / total) * 100);
          this.ngZone.run(() => this.loadingProgress.set(percent));

          if (loadedCount >= total) {
            setTimeout(() => {
              this.ngZone.run(() => this.isLoading.set(false));
            }, 300);
          }
        };

        exhibits.forEach((item, index) => {
          const angle = (index / total) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;

          this.createPedestal(x, z);

          const relativePath = item.imageUrl || 'new.glb';
          const modelUrl = relativePath.startsWith('http')
            ? relativePath
            : `${environment.apiURL}/${relativePath}`;

          const lowerUrl = modelUrl.toLowerCase();
          const isSvg3DIcon = lowerUrl.includes('badge-3d') || lowerUrl === 'bi-3d';
          const isImage = /\.(jpg|jpeg|png|webp)$/i.test(lowerUrl);
          const isObj = lowerUrl.endsWith('.obj');

          if (isSvg3DIcon || lowerUrl.endsWith('.svg')) {
            this.loadBootstrap3DIcon(x, z, item, checkCompletion);
          } else if (isImage) {
            this.createImageArtwork(modelUrl, x, z, angle, item, checkCompletion);
          } else if (isObj) {
            objLoader.load(modelUrl, (object) => {
              this.normalizeModelScale(object, 1.2);
              object.position.add(new THREE.Vector3(x, 1.0, z));

              object.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
                  child.userData = { artwork: item, parentModel: object };
                  this.interactiveObjects.push(child);
                }
              });

              this.scene.add(object);
              checkCompletion();
            }, undefined, (err) => {
              console.error(`Error al cargar el modelo OBJ: ${modelUrl}`, err);
              checkCompletion();
            });
          } else {
            gltfLoader.load(modelUrl, (gltf) => {
              const model = gltf.scene;
              this.normalizeModelScale(model, 1.2);
              model.position.add(new THREE.Vector3(x, 1.0, z));

              model.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
                  child.userData = { artwork: item, parentModel: model };
                  this.interactiveObjects.push(child);
                }
              });

              this.scene.add(model);
              checkCompletion();
            }, undefined, (err) => {
              console.error(`Error al cargar el modelo GLTF/GLB: ${modelUrl}`, err);
              checkCompletion();
            });
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener la galería:', err);
        this.toastr.error('Error al cargar la galería de muestras');
        this.loadCentralFallbackModel(gltfLoader);
      }
    });
  }

  private loadBootstrap3DIcon(x: number, z: number, item: ArtworkCuratorship, onComplete: () => void): void {
    const svgLoader = new SVGLoader();
    const svgUrl = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/badge-3d.svg';

    svgLoader.load(svgUrl, (data) => {
      const paths = data.paths;
      const group = new THREE.Group();

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

          const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
          const material = new THREE.MeshStandardMaterial({
            color: 0xd4af37, // Dorado de galería
            roughness: 0.2,
            metalness: 0.8
          });

          const mesh = new THREE.Mesh(geometry, material);
          group.add(mesh);
        });
      });

      const box = new THREE.Box3().setFromObject(group);
      const center = new THREE.Vector3();
      box.getCenter(center);
      group.position.sub(center);

      group.scale.y *= -1;
      group.scale.setScalar(2.2);
      group.position.set(x, 1.3, z);

      group.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.userData = { artwork: item, parentModel: group };
          this.interactiveObjects.push(child);
        }
      });

      this.scene.add(group);
      onComplete();
    }, undefined, (err) => {
      console.error('Error al cargar el icono SVG 3D:', err);
      onComplete();
    });
  }

  private loadCentralFallbackModel(loader: GLTFLoader): void {
    this.createPedestal(0, -3);
    loader.load('new.glb', (gltf) => {
      const model = gltf.scene;
      this.normalizeModelScale(model, 1.2);
      model.position.add(new THREE.Vector3(0, 1.0, -3));

      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.userData = {
            artwork: {
              title: 'Obra Principal',
              artist: 'Galería Virtual',
              year: '2026',
              description: 'Exhibición por defecto del museo.'
            },
            parentModel: model
          };
          this.interactiveObjects.push(child);
        }
      });
      this.scene.add(model);
      this.ngZone.run(() => this.isLoading.set(false));
    }, undefined, () => {
      this.ngZone.run(() => this.isLoading.set(false));
    });
  }

  private createImageArtwork(imageUrl: string, x: number, z: number, angle: number, item: ArtworkCuratorship, onComplete: () => void): void {
    const textureLoader = new THREE.TextureLoader();

    textureLoader.load(imageUrl, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;

      const imgWidth = texture.image.width || 1;
      const imgHeight = texture.image.height || 1;
      const aspectRatio = imgWidth / imgHeight;

      let planeWidth = 1.4;
      let planeHeight = planeWidth / aspectRatio;

      if (planeHeight > 1.6) {
        planeHeight = 1.6;
        planeWidth = planeHeight * aspectRatio;
      }

      const group = new THREE.Group();

      const frameGeo = new THREE.BoxGeometry(planeWidth + 0.1, planeHeight + 0.1, 0.05);
      const frameMat = new THREE.MeshStandardMaterial({ color: 0x1f1f23, roughness: 0.4 });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      frame.position.set(0, 2.3, 0);
      frame.castShadow = true;
      group.add(frame);

      const planeGeo = new THREE.PlaneGeometry(planeWidth, planeHeight);
      const planeMat = new THREE.MeshBasicMaterial({ map: texture });
      const plane = new THREE.Mesh(planeGeo, planeMat);
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
    }, undefined, (err) => {
      console.error(`Error al cargar la imagen de la obra: ${imageUrl}`, err);
      onComplete();
    });
  }

  public startTour(): void {
    if (this.isMobile) {
      this.isMobileActive = true;
      const euler = new THREE.Euler().setFromQuaternion(this.camera.quaternion, 'YXZ');
      this.cameraYaw = euler.y;
      this.cameraPitch = euler.x;
    } else {
      this.lockControls();
    }
  }

  public lockControls(): void {
    if (!this.isOrbiting && !this.isMobile) {
      this.pointerLockControls.lock();
    }
  }

  private onTouchStart = (event: TouchEvent): void => {
    if (this.isOrbiting || this.isLoading()) return;

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

  private onTouchMove = (event: TouchEvent): void => {
    if (this.isOrbiting || this.isLoading()) return;

    if (this.isMobileActive && this.touchLookId !== null) {
      for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = event.changedTouches[i];
        if (touch.identifier === this.touchLookId) {
          const deltaX = touch.clientX - this.touchLookLast.x;
          const deltaY = touch.clientY - this.touchLookLast.y;

          this.cameraYaw -= deltaX * 0.004;
          this.cameraPitch -= deltaY * 0.004;
          this.cameraPitch = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, this.cameraPitch));

          const euler = new THREE.Euler(this.cameraPitch, this.cameraYaw, 0, 'YXZ');
          this.camera.quaternion.setFromEuler(euler);

          this.touchLookLast = { x: touch.clientX, y: touch.clientY };
        }
      }
    }
  };

  private onTouchEnd = (event: TouchEvent): void => {
    if (this.isOrbiting) return;

    for (let i = 0; i < event.changedTouches.length; i++) {
      if (event.changedTouches[i].identifier === this.touchLookId) {
        this.touchLookId = null;
      }
    }
  };

  public onTouchJoystickStart(event: TouchEvent): void {
    if (this.isLoading()) return;
    const touch = event.touches[0];
    this.joystickCenter = { x: touch.clientX, y: touch.clientY };
  }

  public onTouchJoystickMove(event: TouchEvent): void {
    if (this.isLoading() || !this.joystickCenter.x) return;
    const touch = event.touches[0];
    const maxRadius = 40;

    let deltaX = touch.clientX - this.joystickCenter.x;
    let deltaY = touch.clientY - this.joystickCenter.y;
    const dist = Math.hypot(deltaX, deltaY);

    if (dist > maxRadius) {
      deltaX = (deltaX / dist) * maxRadius;
      deltaY = (deltaY / dist) * maxRadius;
    }

    this.joystickStyle = { transform: `translate(${deltaX}px, ${deltaY}px)` };
    this.joystickMove = { x: deltaX / maxRadius, y: deltaY / maxRadius };
  }

  public onTouchJoystickEnd(event: TouchEvent): void {
    this.joystickStyle = { transform: 'translate(0px, 0px)' };
    this.joystickMove = { x: 0, y: 0 };
    this.joystickCenter = { x: 0, y: 0 };
  }

  private onPointerClick = (event: MouseEvent): void => {
    if (this.isOrbiting || this.isLoading()) return;
    if (!this.pointerLockControls.isLocked) return;

    this.raycaster.setFromCamera(new THREE.Vector2(0, 0), this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveObjects, true);

    if (intersects.length > 0 && intersects[0].distance < 6) {
      const hitMesh = intersects[0].object;
      const rootModel = hitMesh.userData['parentModel'] || hitMesh;
      this.startOrbitMode(rootModel);
    }
  };

  public triggerMobileInspect(event: Event): void {
    if (this.isLoading()) return;
    event.stopPropagation();
    this.raycaster.setFromCamera(new THREE.Vector2(0, 0), this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveObjects, true);
    if (intersects.length > 0) {
      const rootModel = intersects[0].object.userData['parentModel'] || intersects[0].object;
      this.startOrbitMode(rootModel);
    }
  }

  private onRightClick = (event: MouseEvent): void => {
    if (this.isOrbiting) {
      event.preventDefault();
      this.exitOrbitMode();
    }
  };

  public startOrbitMode(object: THREE.Object3D): void {
    this.isOrbiting = true;

    if (this.pointerLockControls.isLocked) {
      this.pointerLockControls.unlock();
    }

    const box = new THREE.Box3().setFromObject(object);
    const center = new THREE.Vector3();
    box.getCenter(center);

    this.orbitControls.enabled = true;
    this.orbitControls.target.copy(center);
    this.camera.position.set(center.x, center.y + 0.3, center.z + 2.5);
    this.orbitControls.update();
  }

  public exitOrbitMode(): void {
    this.isOrbiting = false;
    this.orbitControls.enabled = false;

    if (!this.isMobile) {
      this.lockControls();
    }
  }

  private onKeyDown = (event: KeyboardEvent): void => {
    if (this.isLoading()) return;

    if (event.code === 'Escape') {
      if (this.isOrbiting) {
        this.exitOrbitMode();
      } else if (this.pointerLockControls.isLocked) {
        this.pointerLockControls.unlock();
      }
      return;
    }

    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW': this.moveForward = true; break;
      case 'ArrowLeft':
      case 'KeyA': this.moveLeft = true; break;
      case 'ArrowDown':
      case 'KeyS': this.moveBackward = true; break;
      case 'ArrowRight':
      case 'KeyD': this.moveRight = true; break;
    }
  };

  private onKeyUp = (event: KeyboardEvent): void => {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW': this.moveForward = false; break;
      case 'ArrowLeft':
      case 'KeyA': this.moveLeft = false; break;
      case 'ArrowDown':
      case 'KeyS': this.moveBackward = false; break;
      case 'ArrowRight':
      case 'KeyD': this.moveRight = false; break;
    }
  };

  private onWindowResize = (): void => {
    this.detectDeviceType();
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  private checkArtworkInteractions(time: number): void {
    if (this.isOrbiting || this.isLoading()) return;

    if (time - this.lastRaycastTime < 100) return;
    this.lastRaycastTime = time;

    this.raycaster.setFromCamera(new THREE.Vector2(0, 0), this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveObjects, true);

    if (intersects.length > 0 && intersects[0].distance < 6) {
      const data = intersects[0].object.userData['artwork'] as ArtworkCuratorship;
      if (data && this.activeArtwork() !== data) {
        this.ngZone.run(() => this.activeArtwork.set(data));
      }
    } else {
      if (this.activeArtwork() !== null) {
        this.ngZone.run(() => this.activeArtwork.set(null));
      }
    }
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    const time = performance.now();
    const delta = (time - this.prevTime) / 1000;
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
      if (this.direction.lengthSq() > 0) this.direction.normalize();

      const walkSpeed = 25.0;
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
}


