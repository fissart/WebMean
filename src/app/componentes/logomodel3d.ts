import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
  OnDestroy,
  NgZone,
  inject,
  signal,
  effect
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

@Component({
  selector: 'app-three-html-canvas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="three-container" 
      #rendererContainer 
      (click)="onCanvasClick()"
      (mousemove)="onCanvasMouseMove($event)"
      (mouseleave)="onCanvasMouseLeave()"
    >
      <!-- Botón flotante posicionado sobre la cara del cubo -->
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
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
    }

    .three-container {
      width: 100%;
      height: 100%;
      min-width: 100px;
      min-height: 100px;
      overflow: hidden;
      cursor: default;
      position: relative;
    }

    .three-container ::ng-deep canvas {
      display: block;
      width: 100% !important;
      height: 100% !important;
    }

    .face-action-btn {
      position: absolute;
      transform: translate(-50%, -50%);
      background: rgba(37, 99, 235, 0.9);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 6px 12px;
      border-radius: 20px;
      cursor: pointer;
      font-weight: 500;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 6px;
      backdrop-filter: blur(4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 15;
      transition: background 0.2s, transform 0.1s;
      white-space: nowrap;
      pointer-events: auto;
    }

    .face-action-btn:hover {
      background: rgba(29, 78, 216, 0.95);
      transform: translate(-50%, -50%) scale(1.05);
    }

    .info-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      color: #fff;
      padding: 8px 12px;
      border-radius: 4px;
      z-index: 10;
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .face-html-content button {
      pointer-events: auto;
    }

    .info-badge button {
      background: #17459aff;
      color: white;
      border: none;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .info-badge button:hover {
      background: #1d4ed8;
    }
  `]
})
export class ThreeHtmlCanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('rendererContainer', { static: true })
  private containerRef!: ElementRef<HTMLDivElement>;

  private ngZone = inject(NgZone);
  private router = inject(Router);

  readonly imageSrc = signal<string>('/www1.svg');
  private svgIndex = 1;

  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;
  private mesh!: THREE.Mesh;
  private controls!: OrbitControls;
  private material!: THREE.MeshStandardMaterial;
  private pmremGenerator?: THREE.PMREMGenerator;
  private resizeObserver?: ResizeObserver;

  private cssRenderer!: CSS3DRenderer;

  // Utilidades para raycasting y posicionamiento de botones
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();

  public hoveredButtonData: { label: string; path: string; x: number; y: number } | null = null;
  private currentIntersectedRoute: { label: string; path: string } | null = null;

  constructor() {
    effect(() => {
      const src = this.imageSrc();
      if (this.material) {
        this.updateTextureFromUrl(src);
      }
    });
  }

  ngOnInit(): void {
    const today = new Date().getDay();
    this.svgIndex = today === 0 ? 7 : today;
    this.imageSrc.set(`/www${this.svgIndex}.svg`);
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initThree();
      this.setupResizeObserver();
    });
  }

  ngOnDestroy(): void {
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

  private initThree(): void {
    const container = this.containerRef.nativeElement;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    this.cssRenderer = new CSS3DRenderer();
    this.cssRenderer.setSize(width, height);
    this.cssRenderer.domElement.style.position = 'absolute';
    this.cssRenderer.domElement.style.top = '0';
    this.cssRenderer.domElement.style.pointerEvents = 'none';
    container.appendChild(this.cssRenderer.domElement);

    // 1. Configuración avanzada del WebGLRenderer con antialiasing
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.3;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height, false);
    container.appendChild(this.renderer.domElement);

    // 2. Cámara y Escena
    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 2000);
    this.camera.position.z = 395;

    this.scene = new THREE.Scene();

    // 3. Controles de Órbita
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = true;
    this.controls.enablePan = false;

    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    const roomEnv = new RoomEnvironment();
    const envTexture = this.pmremGenerator.fromScene(roomEnv, 0.03).texture;
    this.scene.environment = envTexture;

    // Sistema de Iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x38bdf8, 3.5);
    mainLight.position.set(300, 400, 500);
    this.scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0x818cf8, 2.5);
    rimLight.position.set(-300, -200, -300);
    this.scene.add(rimLight);

    const pointLight = new THREE.PointLight(0xffffff, 2, 800);
    pointLight.position.set(0, 0, 400);
    this.scene.add(pointLight);

    // 4. Geometría y Material PBR optimizado
    const geometry = new RoundedBoxGeometry(200, 200, 200, 12, 12);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffffff, // <--- Color de fondo del cubo (Cambiar por ej. a 0xf8fafc para un gris muy claro o 0x0f172a para oscuro)
      // transparent: true,
      opacity: 1,
      roughness: 0.15,
      metalness: 0.25,
      envMapIntensity: 1.8
    });

    this.mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.mesh);

    // Creación segura del HTML dinámico para CSS3DObject
    const htmlDiv = document.createElement('div');
    htmlDiv.className = 'face-html-content';
    htmlDiv.innerHTML = `
      <div class="bg-info" style="background: white; padding: 20px; border-radius: 8px; width: 160px; text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
        <h3 style="margin-bottom: 10px; color: #333;">ESFA FGPA</h3>
        <button class="btn btn-info dynamic-btn" style="background: #7079c9ff; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">Trámite</button>
      </div>
    `;

    const dynamicBtn = htmlDiv.querySelector('.dynamic-btn');
    if (dynamicBtn) {
      dynamicBtn.addEventListener('click', () => {
        this.ngZone.run(() => {
          this.router.navigate(['/tramite']);
        });
      });
    }

    const cssObject = new CSS3DObject(htmlDiv);
    cssObject.position.set(0, 0, 100);
    cssObject.scale.set(1, 1, 1);
    this.scene.add(cssObject);

    // 5. Cargar Textura Anti-Pixelación
    this.updateTextureFromUrl(this.imageSrc());

    // 6. Iniciar Render Loop
    this.renderer.setAnimationLoop(() => this.animate());
  }

  private setupResizeObserver(): void {
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

  private resizeRendererToContainer(width: number, height: number): void {
    if (!this.renderer || !this.camera) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);

    if (this.cssRenderer) {
      this.cssRenderer.setSize(width, height);
    }
  }

  private updateTextureFromUrl(url: string): void {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 2048;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const padding = 256;
        ctx.drawImage(img, padding, padding, canvas.width - (padding * 2), canvas.height - (padding * 2));
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;

      if (this.renderer) {
        texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
      }

      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;

      texture.repeat.set(-1, -1);
      texture.offset.set(1, 1);

      if (this.material.map) this.material.map.dispose();
      this.material.map = texture;
      this.material.needsUpdate = true;
    };

    img.onerror = () => {
      this.loadFallbackCanvas();
    };
  }

  private loadFallbackCanvas(): void {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#2563eb';
      ctx.font = 'bold 120px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Contenido Adaptado', canvas.width / 2, canvas.height / 2);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;

    if (this.renderer) {
      texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
    }

    texture.repeat.set(-1, 1);
    texture.offset.set(1, 0);

    if (this.material.map) this.material.map.dispose();
    this.material.map = texture;
    this.material.needsUpdate = true;
  }

  public changeSvgIndex(): void {
    this.svgIndex = this.svgIndex >= 7 ? 1 : this.svgIndex + 1;
    this.imageSrc.set(`/www${this.svgIndex}.svg`);
  }

  public onCanvasMouseMove(event: MouseEvent): void {
    const container = this.containerRef.nativeElement;
    const rect = container.getBoundingClientRect();

    const clientX = event.clientX - rect.left;
    const clientY = event.clientY - rect.top;

    this.mouse.x = (clientX / container.clientWidth) * 2 - 1;
    this.mouse.y = -(clientY / container.clientHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.mesh);

    if (intersects.length > 0) {
      container.style.cursor = 'pointer';
      this.material.emissive.setHex(0x224488);
      this.material.roughness = 0.1;
      this.material.needsUpdate = true;

      const hit = intersects[0];
      if (hit.face) {
        const normalMatrix = new THREE.Matrix3().getNormalMatrix(this.mesh.matrixWorld);
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

  public onCanvasMouseLeave(): void {
    const container = this.containerRef.nativeElement;
    container.style.cursor = 'default';
    this.material.emissive.setHex(0x000000);
    this.material.roughness = 0.15;
    this.material.needsUpdate = true;
    this.hoveredButtonData = null;
    this.currentIntersectedRoute = null;
  }

  private vector3ToScreenPosition(vector: THREE.Vector3, container: HTMLDivElement): { x: number; y: number } {
    const clonedVector = vector.clone();
    clonedVector.project(this.camera);

    const widthHalf = container.clientWidth / 2;
    const heightHalf = container.clientHeight / 2;

    return {
      x: clonedVector.x * widthHalf + widthHalf,
      y: -(clonedVector.y * heightHalf) + heightHalf
    };
  }

  public onCanvasClick(): void {
    if (this.currentIntersectedRoute) {
      this.router.navigate([this.currentIntersectedRoute.path]);
    }
  }

  public onButtonClick(event: MouseEvent, path: string): void {
    event.stopPropagation();
    this.router.navigate([path]);
  }

  private getRouteByFaceNormal(normal: THREE.Vector3): { label: string; path: string } | null {
    const x = normal.x;
    const y = normal.y;
    const z = normal.z;

    const absX = Math.abs(x);
    const absY = Math.abs(y);
    const absZ = Math.abs(z);

    if (absX > absY && absX > absZ) {
      return x > 0 ? { label: 'Blog', path: '/blog' } : { label: 'Foro', path: '/foro' };
    } else if (absY > absX && absY > absZ) {
      return y > 0 ? { label: 'Trámite', path: '/tramite' } : { label: 'Landing', path: '/land' };
    } else {
      return z > 0 ? { label: 'Tramite', path: '/tramite' } : { label: 'Landing', path: '/land' };
    }
  }

  private animate = (): void => {
    if (this.controls) {
      this.controls.update();
    }
    this.renderer.render(this.scene, this.camera);
    this.cssRenderer.render(this.scene, this.camera);
  };
}