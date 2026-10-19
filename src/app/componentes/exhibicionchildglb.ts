import {
  Component,
  ElementRef,
  OnDestroy,
  effect,
  input,
  signal,
  viewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

type ShaderMode = 'original' | 'wireframe' | 'normal' | 'customGlow';

@Component({
  selector: 'app-glb-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
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

      <!-- Botón Flotante para Abrir/Cerrar el Panel -->
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
  `,
  styles: `
    .control-panel {
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: top left;
      opacity: 1;
      transform: scale(1) translateY(0);
    }
    .control-panel.collapsed {
      opacity: 0;
      transform: scale(0.9) translateY(-10px);
      pointer-events: none;
    }
    .custom-range::-webkit-slider-thumb {
      background-color: #d97706;
    }
    .custom-range::-moz-range-thumb {
      background-color: #d97706;
    }
  `
})
export class GlbViewerComponent implements OnDestroy {
  glbSource = input<string | File | null>(null);
  canvasContainer = viewChild<ElementRef<HTMLDivElement>>('canvasContainer');

  isLoading = signal<boolean>(false);
  loadProgress = signal<number>(0);
  errorMessage = signal<string | null>(null);

  isPanelOpen = signal<boolean>(true);

  brightness = signal<number>(1.0);
  lightIntensity = signal<number>(2.5);
  lightColor = signal<string>('#ffffff');
  activeShader = signal<ShaderMode>('original');

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private mainLight!: THREE.DirectionalLight;
  private ambientLight!: THREE.AmbientLight;

  private loader = new GLTFLoader();
  private dracoLoader = new DRACOLoader();
  private objLoader = new OBJLoader();

  private currentModel: THREE.Object3D | null = null;
  private animationFrameId: number | null = null;
  private activeObjectUrl: string | null = null;

  private originalMaterials = new Map<THREE.Mesh, THREE.Material | THREE.Material[]>();
  private normalMaterial = new THREE.MeshNormalMaterial();
  private customGlowMaterial!: THREE.ShaderMaterial;

  constructor() {
    this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
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

  togglePanel(): void {
    this.isPanelOpen.update((prev) => !prev);
  }

  private initCustomShader(): void {
    this.customGlowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(0xd97706) },
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
      blending: THREE.AdditiveBlending
    });
  }

  private initThree(container: HTMLDivElement): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x121212);

    this.camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 2, 5);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = this.brightness();

    container.appendChild(this.renderer.domElement);

    this.ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    this.scene.add(this.ambientLight);

    this.mainLight = new THREE.DirectionalLight(this.lightColor(), this.lightIntensity());
    this.mainLight.position.set(5, 10, 7.5);
    this.scene.add(this.mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
    fillLight.position.set(-5, -5, -5);
    this.scene.add(fillLight);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    window.addEventListener('resize', this.onResize);
    this.animate();
  }

  private isObjFile(source: string | File): boolean {
    if (source instanceof File) {
      return source.name.toLowerCase().endsWith('.obj');
    }
    return source.toLowerCase().split('?')[0].endsWith('.obj');
  }

  private async loadModel(source: string | File): Promise<void> {
    this.cleanupCurrentModel();
    this.isLoading.set(true);
    this.loadProgress.set(0);
    this.errorMessage.set(null);

    let loadUrl: string;

    if (source instanceof File) {
      this.activeObjectUrl = URL.createObjectURL(source);
      loadUrl = this.activeObjectUrl;
      this.loader.setResourcePath('');
    } else {
      loadUrl = source;
      const resourcePath = loadUrl.substring(0, loadUrl.lastIndexOf('/') + 1);
      this.loader.setResourcePath(resourcePath);

      try {
        const headCheck = await fetch(loadUrl, { method: 'HEAD' });
        if (!headCheck.ok) {
          throw new Error(`HTTP ${headCheck.status}: ${headCheck.statusText}`);
        }
      } catch (err) {
        console.error('Failed to reach model resource:', err);
        this.errorMessage.set(`No se pudo obtener el modelo 3D (${loadUrl}).`);
        this.isLoading.set(false);
        return;
      }
    }

    const isObj = this.isObjFile(source);

    const onProgress = (xhr: ProgressEvent) => {
      if (xhr.total > 0) {
        this.loadProgress.set(Math.round((xhr.loaded / xhr.total) * 100));
      }
    };

    const onError = (error: unknown) => {
      console.error('Error parsing 3D model:', error);
      this.errorMessage.set('Error al procesar el modelo 3D.');
      this.isLoading.set(false);
      this.revokeActiveObjectUrl();
    };

    const handleLoadedObject = (object: THREE.Object3D) => {
      this.currentModel = object;

      this.currentModel.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (!mesh.material || (Array.isArray(mesh.material) && mesh.material.length === 0)) {
            mesh.material = new THREE.MeshStandardMaterial({ color: 0xcccccc });
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

  private applyShaderMode(mode: ShaderMode): void {
    if (!this.currentModel) return;

    this.currentModel.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const originalMat = this.originalMaterials.get(mesh);

        switch (mode) {
          case 'wireframe':
            if (originalMat) {
              if (Array.isArray(originalMat)) {
                mesh.material = originalMat.map((mat) => this.setWireframe(mat, true));
              } else {
                mesh.material = this.setWireframe(originalMat, true);
              }
            }
            break;
          case 'normal':
            mesh.material = this.normalMaterial;
            break;
          case 'customGlow':
            mesh.material = this.customGlowMaterial;
            break;
          case 'original':
          default:
            if (originalMat) {
              mesh.material = originalMat;
            }
            break;
        }
      }
    });
  }

  private setWireframe(mat: THREE.Material, wireframe: boolean): THREE.Material {
    const cloned = mat.clone();
    if ('wireframe' in cloned) {
      (cloned as THREE.MeshStandardMaterial).wireframe = wireframe;
    }
    return cloned;
  }

  updateBrightness(event: Event): void {
    this.brightness.set(parseFloat((event.target as HTMLInputElement).value));
  }

  updateLightIntensity(event: Event): void {
    this.lightIntensity.set(parseFloat((event.target as HTMLInputElement).value));
  }

  updateLightColor(event: Event): void {
    this.lightColor.set((event.target as HTMLInputElement).value);
  }

  updateShaderMode(event: Event): void {
    this.activeShader.set((event.target as HTMLSelectElement).value as ShaderMode);
  }

  private fitCameraToModel(model: THREE.Object3D): void {
    const box = new THREE.Box3().setFromObject(model);
    if (box.isEmpty()) return;

    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

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

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    this.controls.update();

    if (this.customGlowMaterial) {
      this.customGlowMaterial.uniforms['uTime'].value = performance.now() / 1000;
    }

    this.renderer.render(this.scene, this.camera);
  };

  private onResize = (): void => {
    const container = this.canvasContainer()?.nativeElement;
    if (!container || !this.renderer) return;

    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  };

  private revokeActiveObjectUrl(): void {
    if (this.activeObjectUrl) {
      URL.revokeObjectURL(this.activeObjectUrl);
      this.activeObjectUrl = null;
    }
  }

  private cleanupCurrentModel(): void {
    if (this.currentModel) {
      this.scene.remove(this.currentModel);
      this.currentModel = null;
    }
    this.originalMaterials.clear();
    this.revokeActiveObjectUrl();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.cleanupCurrentModel();
    this.dracoLoader.dispose();
    this.normalMaterial.dispose();
    this.customGlowMaterial.dispose();
    this.renderer.dispose();
  }
}