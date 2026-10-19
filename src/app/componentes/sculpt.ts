import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  NgZone,
  HostListener,
  signal,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

export type SculptTool = 'inflate' | 'deflate' | 'smooth' | 'flatten' | 'paint';
export type BaseShape = 'sphere' | 'box' | 'cylinder' | 'torus';

@Component({
  selector: 'app-mesh-sculptor',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container-fluid vh-100 p-0 overflow-hidden bg-dark position-relative">
      
      <!-- Floating Toolbar Toggle Button (Bootstrap 4) -->
      <button 
        class="btn btn-primary btn-sm shadow-lg position-absolute rounded-pill px-3 py-2 font-weight-bold" 
        style="top: 15px; left: 15px; z-index: 1050;"
        (click)="toggleToolbar()">
        <i class="fa fa-bars mr-1"></i> {{ isToolbarHidden() ? 'Mostrar Menú' : 'Ocultar Menú' }}
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
                Pintar Vértices
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
              <label class="text-muted font-weight-bold mb-1">Tamaño Pincel</label>
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
                Topología Dinámica (Dyntopo)
              </label>
            </div>

            @if (enableDyntopo()) {
              <div class="small mt-2 pt-1 border-top border-dark">
                <div class="d-flex justify-content-between mb-1">
                  <span class="text-muted">Detalle Máx. Arista:</span>
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
              <label class="text-light font-weight-bold mb-0">Rotación Canvas (Z)</label>
              <span class="badge badge-dark">{{ canvasRotation() }}°</span>
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
              Restablecer Rotación
            </button>
          </div>

          <hr class="border-secondary">

          <!-- Orbit Controls / Camera Options -->
          <div class="form-group mb-3">
            <label class="small text-muted font-weight-bold text-uppercase mb-2">Control de Cámara (Orbit)</label>
            
            <div class="btn-group btn-group-sm w-100 mb-2">
              <button class="btn btn-outline-secondary" (click)="rotateCameraAngle(90)">Girar 90°</button>
              <button class="btn btn-outline-secondary" (click)="rotateCameraAngle(-90)">Girar -90°</button>
            </div>

            <div class="custom-control custom-checkbox small mb-1">
              <input type="checkbox" class="custom-control-input" id="rotCheck" [checked]="enableRotate()" (change)="toggleEnableRotate($event)">
              <label class="custom-control-label" for="rotCheck">Permitir Rotación</label>
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
              <label class="custom-control-label font-weight-bold" for="autoRotCheck">Autorrotación Cámara</label>
            </div>

            @if (autoRotateCamera()) {
              <div class="small mb-2">
                <span class="text-muted">Velocidad: {{ autoRotateSpeed() }}</span>
                <input type="range" class="form-control-range" min="0.5" max="10" step="0.5" [value]="autoRotateSpeed()" (input)="updateAutoRotateSpeed($event)">
              </div>
            }

            <button class="btn btn-outline-secondary btn-sm btn-block mt-2" (click)="resetCamera()">
              Restablecer Cámara
            </button>
          </div>

          <!-- Extra Toggles: Symmetry & Wireframe -->
          <div class="form-group mb-3 bg-secondary p-2 rounded">
            <div class="custom-control custom-checkbox small mb-2">
              <input type="checkbox" class="custom-control-input" id="symCheck" [checked]="symmetryX()" (change)="toggleSymmetry($event)">
              <label class="custom-control-label font-weight-bold text-light" for="symCheck">Simetría (Eje X)</label>
            </div>
            <div class="custom-control custom-checkbox small">
              <input type="checkbox" class="custom-control-input" id="wireCheck" [checked]="wireframe()" (change)="toggleWireframe($event)">
              <label class="custom-control-label font-weight-bold text-light" for="wireCheck">Modo Malla (Wireframe)</label>
            </div>
          </div>

          <!-- Mesh Statistics Box -->
          <div class="card bg-secondary text-light p-2 mb-3 small border-0">
            <div class="d-flex justify-content-between">
              <span>Vértices:</span>
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
  `,
  styles: [`
    .transition-all {
      transition: all 0.3s ease-in-out;
    }
    .cursor-pointer {
      cursor: pointer;
    }
    /* Estética scrollbar sutil para el panel lateral */
    .card::-webkit-scrollbar {
      width: 6px;
    }
    .card::-webkit-scrollbar-thumb {
      background-color: #495057;
      border-radius: 4px;
    }
  `]
})
export class MeshSculptorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef<HTMLDivElement>;

  readonly isToolbarHidden = signal<boolean>(false);
  readonly brushSize = signal<number>(1.2);
  readonly brushIntensity = signal<number>(0.08);
  readonly selectedTool = signal<SculptTool>('inflate');
  readonly selectedShape = signal<BaseShape>('sphere');
  readonly symmetryX = signal<boolean>(false);
  readonly wireframe = signal<boolean>(false);
  
  readonly canvasRotation = signal<number>(0);
  readonly paintColor = signal<string>('#3b82f6');

  readonly enableDyntopo = signal<boolean>(true);
  readonly maxEdgeLength = signal<number>(0.15);

  readonly enableRotate = signal<boolean>(true);
  readonly enableZoom = signal<boolean>(true);
  readonly enablePan = signal<boolean>(true);
  readonly autoRotateCamera = signal<boolean>(false);
  readonly autoRotateSpeed = signal<number>(2.0);

  readonly vertexCount = signal<number>(0);
  readonly faceCount = signal<number>(0);

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private mesh!: THREE.Mesh;
  private material!: THREE.MeshStandardMaterial;
  private brushHelper!: THREE.Mesh;
  
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private isSculpting = false;
  private animationFrameId: number | null = null;

  constructor(private ngZone: NgZone) {}

  toggleToolbar(): void {
    this.isToolbarHidden.update(v => !v);
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initThreeJS();
      this.setupSculptMesh(this.selectedShape());
      this.setupBrushHelper();
      this.setupEvents();
      this.animate();
    });
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.controls?.dispose();
    this.renderer?.dispose();
  }

  private initThreeJS(): void {
    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x121212);

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 8);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
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
      LEFT: null as unknown as THREE.MOUSE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.ROTATE
    };

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 10, 7);
    const dirLight2 = new THREE.DirectionalLight(0x007bff, 0.8);
    dirLight2.position.set(-5, -5, -5);

    this.scene.add(ambientLight, dirLight1, dirLight2);
  }

  private setupSculptMesh(shape: BaseShape): void {
    if (this.mesh) {
      this.scene.remove(this.mesh);
      this.mesh.geometry.dispose();
    }

    let baseGeometry: THREE.BufferGeometry;

    switch (shape) {
      case 'box':
        baseGeometry = new THREE.BoxGeometry(4, 4, 4, 32, 32, 32);
        break;
      case 'cylinder':
        baseGeometry = new THREE.CylinderGeometry(2, 2, 5, 32, 32);
        break;
      case 'torus':
        baseGeometry = new THREE.TorusGeometry(2.5, 0.8, 32, 64);
        break;
      case 'sphere':
      default:
        baseGeometry = new THREE.SphereGeometry(3, 48, 48);
        break;
    }

    const nonIndexedGeometry = baseGeometry.toNonIndexed();
    baseGeometry.dispose();

    const posCount = nonIndexedGeometry.attributes['position'].count;
    const colors = new Float32Array(posCount * 3);
    for (let i = 0; i < colors.length; i++) {
      colors[i] = 0.8;
    }
    nonIndexedGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    this.material = new THREE.MeshStandardMaterial({
      roughness: 0.3,
      metalness: 0.1,
      wireframe: this.wireframe(),
      vertexColors: true
    });

    this.mesh = new THREE.Mesh(nonIndexedGeometry, this.material);
    this.mesh.name = 'SculptedMesh';
    this.mesh.rotation.z = THREE.MathUtils.degToRad(this.canvasRotation());

    this.scene.add(this.mesh);
    this.updateMeshStats();
  }

  private updateMeshStats(): void {
    if (!this.mesh || !this.mesh.geometry) return;
    const pos = this.mesh.geometry.attributes['position'];

    this.vertexCount.set(pos ? pos.count : 0);
    this.faceCount.set(pos ? pos.count / 3 : 0);
  }

  private setupBrushHelper(): void {
    const helperGeo = new THREE.RingGeometry(0.98, 1, 32);
    const helperMat = new THREE.MeshBasicMaterial({
      color: 0xffc107,
      side: THREE.DoubleSide,
      depthTest: false,
      transparent: true,
      opacity: 0.8
    });
    this.brushHelper = new THREE.Mesh(helperGeo, helperMat);
    this.brushHelper.visible = false;
    this.scene.add(this.brushHelper);
  }

  private setupEvents(): void {
    const domElement = this.renderer.domElement;

    domElement.addEventListener('contextmenu', (e) => e.preventDefault());

    domElement.addEventListener('pointerdown', (event: PointerEvent) => {
      if (event.button === 0) {
        this.isSculpting = true;
        this.controls.enabled = false;
        this.sculpt(event);
      }
    });

    domElement.addEventListener('pointermove', (event: PointerEvent) => {
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

    domElement.addEventListener('pointerup', stopSculpting);
    domElement.addEventListener('pointerleave', () => {
      this.brushHelper.visible = false;
      stopSculpting();
    });
  }

  private updateCursorHelper(event: PointerEvent): void {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
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

  private sculpt(event: PointerEvent): void {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.mesh);

    if (intersects.length > 0) {
      const hit = intersects[0];
      if (!hit.point || !hit.face) return;

      const pointsToProcess = [hit.point.clone()];

      if (this.symmetryX()) {
        const mirrorPoint = hit.point.clone();
        mirrorPoint.x = -mirrorPoint.x;
        pointsToProcess.push(mirrorPoint);
      }

      pointsToProcess.forEach(targetPoint => {
        if (this.selectedTool() !== 'paint' && this.enableDyntopo()) {
          this.subdivideTrianglesNearBrush(targetPoint);
        }
        this.applySculptTool(targetPoint, hit.face!.normal);
      });

      const positionAttr = this.mesh.geometry.attributes['position'] as THREE.BufferAttribute;
      const colorAttr = this.mesh.geometry.attributes['color'] as THREE.BufferAttribute;

      positionAttr.needsUpdate = true;
      if (colorAttr) colorAttr.needsUpdate = true;

      this.mesh.geometry.computeVertexNormals();
      this.updateMeshStats();
    }
  }

  private subdivideTrianglesNearBrush(hitPoint: THREE.Vector3): void {
    const geometry = this.mesh.geometry;
    const posAttr = geometry.attributes['position'] as THREE.BufferAttribute;
    const colAttr = geometry.attributes['color'] as THREE.BufferAttribute;
    
    const radius = this.brushSize();
    const threshold = this.maxEdgeLength();

    const positions: number[] = Array.from(posAttr.array);
    const colors: number[] = colAttr ? Array.from(colAttr.array) : [];
    
    const newPositions: number[] = [];
    const newColors: number[] = [];
    let needsUpdate = false;

    const vA = new THREE.Vector3();
    const vB = new THREE.Vector3();
    const vC = new THREE.Vector3();

    const cA = new THREE.Color();
    const cB = new THREE.Color();
    const cC = new THREE.Color();

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

          const mAB = new THREE.Vector3().addVectors(vA, vB).multiplyScalar(0.5);
          const mBC = new THREE.Vector3().addVectors(vB, vC).multiplyScalar(0.5);
          const mCA = new THREE.Vector3().addVectors(vC, vA).multiplyScalar(0.5);

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
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(newPositions, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(newColors, 3));
      geometry.attributes['position'].needsUpdate = true;
      geometry.attributes['color'].needsUpdate = true;
    }
  }

  private applySculptTool(hitPoint: THREE.Vector3, faceNormal: THREE.Vector3): void {
    const geometry = this.mesh.geometry;
    const positionAttr = geometry.attributes['position'] as THREE.BufferAttribute;
    const colorAttr = geometry.attributes['color'] as THREE.BufferAttribute;
    
    const vertex = new THREE.Vector3();
    const currentColor = new THREE.Color();
    const targetColor = new THREE.Color(this.paintColor());

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
          case 'inflate': {
            const displacement = normal.clone().multiplyScalar(falloff * strength);
            vertex.add(displacement);
            positionAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
            break;
          }
          case 'deflate': {
            const displacement = normal.clone().multiplyScalar(-falloff * strength);
            vertex.add(displacement);
            positionAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
            break;
          }
          case 'smooth': {
            const targetVec = hitPoint.clone().sub(worldVertex).multiplyScalar(falloff * strength * 0.5);
            vertex.add(targetVec);
            positionAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
            break;
          }
          case 'flatten': {
            const vToP = worldVertex.clone().sub(hitPoint);
            const distToPlane = vToP.dot(normal);
            const projection = normal.clone().multiplyScalar(-distToPlane * falloff * strength * 2);
            vertex.add(projection);
            positionAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
            break;
          }
          case 'paint': {
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

  updatePaintColor(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.paintColor.set(val);
  }

  toggleDyntopo(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.enableDyntopo.set(checked);
  }

  updateMaxEdgeLength(event: Event): void {
    const val = parseFloat((event.target as HTMLInputElement).value);
    this.maxEdgeLength.set(val);
  }

  updateCanvasRotation(event: Event): void {
    const val = parseFloat((event.target as HTMLInputElement).value);
    this.canvasRotation.set(val);
    if (this.mesh) {
      this.mesh.rotation.z = THREE.MathUtils.degToRad(val);
    }
  }

  resetCanvasRotation(): void {
    this.canvasRotation.set(0);
    if (this.mesh) {
      this.mesh.rotation.z = 0;
    }
  }

  toggleEnableRotate(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.enableRotate.set(checked);
    if (this.controls) this.controls.enableRotate = checked;
  }

  toggleEnableZoom(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.enableZoom.set(checked);
    if (this.controls) this.controls.enableZoom = checked;
  }

  toggleEnablePan(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.enablePan.set(checked);
    if (this.controls) this.controls.enablePan = checked;
  }

  toggleAutoRotateCamera(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.autoRotateCamera.set(checked);
    if (this.controls) this.controls.autoRotate = checked;
  }

  updateAutoRotateSpeed(event: Event): void {
    const val = parseFloat((event.target as HTMLInputElement).value);
    this.autoRotateSpeed.set(val);
    if (this.controls) this.controls.autoRotateSpeed = val;
  }

  resetCamera(): void {
    if (!this.controls || !this.camera) return;
    this.camera.position.set(0, 0, 8);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  @HostListener('window:resize')
  onWindowResize(): void {
    if (!this.canvasContainer) return;
    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  setTool(tool: SculptTool): void {
    this.selectedTool.set(tool);
  }

  updateBrushSize(event: Event): void {
    const val = parseFloat((event.target as HTMLInputElement).value);
    this.brushSize.set(val);
  }

  updateBrushIntensity(event: Event): void {
    const val = parseFloat((event.target as HTMLInputElement).value);
    this.brushIntensity.set(val);
  }

  changeBaseShape(event: Event): void {
    const shape = (event.target as HTMLSelectElement).value as BaseShape;
    this.selectedShape.set(shape);
    this.setupSculptMesh(shape);
  }

  toggleSymmetry(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.symmetryX.set(checked);
  }

  toggleWireframe(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.wireframe.set(checked);
    if (this.material) {
      this.material.wireframe = checked;
    }
  }

  resetMesh(): void {
    this.setupSculptMesh(this.selectedShape());
  }

  downloadGLB(): void {
    const exporter = new GLTFExporter();

    exporter.parse(
      this.mesh,
      (gltf) => {
        if (gltf instanceof ArrayBuffer) {
          const blob = new Blob([gltf], { type: 'application/octet-stream' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `sculpted-${this.selectedShape()}-${Date.now()}.glb`;
          link.click();
          URL.revokeObjectURL(link.href);
        }
      },
      (error) => {
        console.error('An error occurred while exporting GLTF', error);
      },
      { binary: true }
    );
  }

  rotateCameraAngle(angleDegrees: number): void {
    if (!this.controls || !this.camera) return;
    
    const rad = THREE.MathUtils.degToRad(angleDegrees);
    const currentX = this.camera.position.x - this.controls.target.x;
    const currentZ = this.camera.position.z - this.controls.target.z;
    const currentRadius = Math.sqrt(currentX * currentX + currentZ * currentZ);
    const currentAngle = Math.atan2(currentZ, currentX);

    const newAngle = currentAngle + rad;

    this.camera.position.x = this.controls.target.x + currentRadius * Math.cos(newAngle);
    this.camera.position.z = this.controls.target.z + currentRadius * Math.sin(newAngle);
    
    this.controls.update();
  }
}