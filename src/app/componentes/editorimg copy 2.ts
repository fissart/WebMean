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
import { FormsModule } from '@angular/forms';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js';
import { Navbar } from './navbar';

export type SculptTool = 'inflate' | 'deflate' | 'smooth' | 'flatten' | 'paint';
export type BaseShape = 'cube' | 'sphere' | 'cylinder' | 'cone' | 'torus' | 'plane' | 'knot';

@Component({
  selector: 'app-model-form-board',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host {
      display: block;
      background-color: #ffffffff;
      color: #cccccc;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .blender-header {
      background-color: #2d2d2d;
      border-bottom: 1px solid #3f3f3f;
      font-size: 0.85rem;
      position: relative;
    }
    .blender-toolbar {
      background-color: #252525;
      border-right: 1px solid #3f3f3f;
      width: 65px;
    }
    .blender-sidebar {
      background-color: #2b2b2b;
      border-left: 1px solid #3f3f3f;
      width: 310px;
    }
    .viewport-container {
      position: relative;
      background-color: #1a1a1a;
      overflow: hidden;
    }
    canvas {
      display: block;
      width: 100% !important;
      height: 100% !important;
    }
    .btn-blender {
      background-color: #383838;
      color: #dfdfdf;
      border: 1px solid #4f4f4f;
      font-size: 0.8rem;
    }
    .btn-blender:hover {
      background-color: #484848;
      color: #ffffff;
      border-color: #606060;
    }
    .btn-blender.active {
      background-color: #e67e22;
      color: #ffffff;
      border-color: #d35400;
    }
    .custom-dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      background-color: #252525;
      border: 1px solid #4f4f4f;
      z-index: 1000;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      border-radius: 4px;
      min-width: 170px;
    }
    .custom-dropdown-item {
      display: block;
      width: 100%;
      padding: 6px 12px;
      color: #dfdfdf;
      text-align: left;
      background-color: transparent;
      border: 0;
      font-size: 0.8rem;
      cursor: pointer;
    }
    .custom-dropdown-item:hover {
      background-color: #383838;
      color: #ffffff;
    }
    .custom-modal-backdrop {
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.6);
      z-index: 1050;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .card::-webkit-scrollbar {
      width: 6px;
    }
    .card::-webkit-scrollbar-thumb {
      background-color: #495057;
      border-radius: 4px;
    }
  `],
  template: `
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
          
          <!-- Menú Archivo -->
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
        
        <!-- BARRA LATERAL IZQUIERDA: Añadir Objetos -->
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
              <button class="btn btn-sm font-weight-bold text-truncate" [class.btn-success]="selectedTool() === 'paint'" [class.btn-blender]="selectedTool() !== 'paint'" style="grid-column: span 2;" (click)="setSculptTool('paint')">Pintar Vértices</button>
            </div>

            @if (selectedTool() === 'paint') {
              <div class="bg-secondary p-2 rounded mb-2">
                <label class="small font-weight-bold mb-1 text-light">Color de Pincel:</label>
                <input type="color" [value]="paintColor()" (input)="updatePaintColor($event)" class="form-control form-control-sm p-0 border-0 bg-transparent cursor-pointer w-100" style="height: 32px;" />
              </div>
            }

            <div class="mb-2">
              <div class="d-flex justify-content-between small text-ligth font-weight-bold mb-1">
                <span>Tamaño Pincel</span>
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
                <label class="custom-control-label small font-weight-bold text-light" for="dyntopoCheck">Topología Dinámica (Dyntopo)</label>
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
                <label class="custom-control-label small font-weight-bold text-light" for="symCheck">Simetría (Eje X)</label>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="wireCheck" [checked]="wireframe()" (change)="toggleWireframe($event)">
                <label class="custom-control-label small font-weight-bold text-light" for="wireCheck">Modo Malla (Wireframe)</label>
              </div>
            </div>

            <div class="card bg-secondary text-light p-2 mb-2 small border-0">
              <div class="d-flex justify-content-between"><span>Vértices:</span><strong class="text-warning">{{ vertexCount() }}</strong></div>
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
                <button class="btn btn-blender btn-sm w-100 text-left" (click)="rotate90Y()"><i class="bi bi-arrow-clockwise mr-1"></i> Rotar 90° (Eje Y)</button>
                <button class="btn btn-blender btn-sm w-100 text-left" (click)="resetScale()"><i class="bi bi-arrow-counterclockwise mr-1"></i> Restablecer Escala</button>
                <button class="btn btn-blender btn-sm w-100 text-left" (click)="showModal = true"><i class="bi bi-gear mr-1"></i> Editar Valores Numéricos</button>
                <button class="btn btn-outline-danger btn-sm w-100 text-left mt-2" (click)="deleteSelectedObject()"><i class="bi bi-trash mr-1"></i> Eliminar Objeto</button>
              </div>
            } @else {
              <div class="text-muted small italic"><i class="bi bi-exclamation-circle mr-1"></i> Ningún objeto seleccionado. Selecciona uno en el visor.</div>
            }
          }

        </div>

      </div>

    </div>

    <!-- MODAL DE PROPIEDADES NUMÉRICAS -->
    @if (showModal) {
      <div class="custom-modal-backdrop">
        <div class="card bg-dark text-light border-secondary shadow-lg" style="width: 380px;">
          <div class="card-header border-secondary d-flex justify-content-between align-items-center">
            <h6 class="mb-0"><i class="bi bi-sliders2 mr-1"></i> Ajustes Numéricos</h6>
            <button type="button" class="close text-white border-0 bg-transparent" aria-label="Close" (click)="closeModal()"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="card-body small" style="display: flex; flex-direction: column; gap: 12px;">
            <div>
              <label class="font-weight-bold d-block mb-1"><i class="bi bi-palette mr-1"></i> Color:</label>
              <input type="color" class="form-control form-control-sm bg-secondary border-0 w-100" style="height: 35px;" [(ngModel)]="modalObjectProperties.color">
            </div>
            <div>
              <label class="font-weight-bold mb-1 d-block"><i class="bi bi-geo-alt mr-1"></i> Posición (X, Y, Z):</label>
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
  `
})
export class ModelBoradForm implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fullscreenContainer', { static: true }) fullscreenContainerRef!: ElementRef<HTMLDivElement>;

  readonly appMode = signal<'sculpt' | 'transform'>('sculpt');
  readonly selectedTool = signal<SculptTool>('inflate');
  readonly brushSize = signal<number>(1.2);
  readonly brushIntensity = signal<number>(0.03);
  readonly enableDyntopo = signal<boolean>(true);
  readonly maxEdgeLength = signal<number>(0.15);
  readonly symmetryX = signal<boolean>(false);
  readonly wireframe = signal<boolean>(false);
  readonly paintColor = signal<string>('#3b82f6');
  readonly vertexCount = signal<number>(0);
  readonly faceCount = signal<number>(0);

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private transformControls!: TransformControls;
  private brushHelper!: THREE.Mesh;
  
  objects: THREE.Mesh[] = [];
  selectedObject: THREE.Mesh | null = null;
  private plane!: THREE.Mesh;
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private isSculpting = false;

  isFullscreen = false;
  isMenuOpen = false;
  showModal = false;
  transformMode: 'translate' | 'rotate' | 'scale' = 'translate';
  modalObjectProperties: any = {};
  private animationFrameId: number = 0;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initThreeJs();
      this.addNewObjectCenter('sphere');
      this.animate();
    });
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this.renderer?.dispose();
    this.controls?.dispose();
    this.transformControls?.dispose();
  }

  @HostListener('window:resize')
  public onResize(): void {
    const container = this.canvasContainer.nativeElement.parentElement;
    const width = container?.clientWidth || window.innerWidth;
    const height = container?.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  @HostListener('document:fullscreenchange')
  public onFullScreenChange(): void {
    this.isFullscreen = !!document.fullscreenElement;
    setTimeout(() => this.onResize(), 50);
  }

  public toggleFullScreen(): void {
    const elem = this.fullscreenContainerRef.nativeElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen();
    }
  }

  public toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  public closeMenuOnClick(): void {
    if (this.isMenuOpen) this.isMenuOpen = false;
  }

  public setAppMode(mode: 'sculpt' | 'transform'): void {
    this.appMode.set(mode);
    if (mode === 'sculpt' && this.selectedObject && this.transformControls) {
      this.transformControls.detach();
    } else if (mode === 'transform' && this.selectedObject && this.transformControls) {
      this.transformControls.attach(this.selectedObject);
    }
    if (this.brushHelper) {
      this.brushHelper.visible = mode === 'sculpt';
    }
  }

  private initThreeJs(): void {
    const container = this.canvasContainer.nativeElement.parentElement;
    const width = container?.clientWidth || window.innerWidth;
    const height = container?.clientHeight || window.innerHeight;

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasContainer.nativeElement, antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a1a);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 10, 7);
    const dirLight2 = new THREE.DirectionalLight(0x007bff, 0.6);
    dirLight2.position.set(-5, -5, -5);
    this.scene.add(dirLight1, dirLight2);

    const planeGeometry = new THREE.PlaneGeometry(15, 15, 15, 15);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide, wireframe: true });
    this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
    this.plane.rotation.x = -Math.PI / 2;
    this.scene.add(this.plane);

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.set(0, 4, 7);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    this.transformControls = new TransformControls(this.camera, this.renderer.domElement);
    this.transformControls.addEventListener('change', () => {
      if (this.selectedObject) this.updateSelectedObjectProperties();
    });
    this.transformControls.addEventListener('dragging-changed', (event) => {
      this.controls.enabled = !event.value;
    });
    this.scene.add(this.transformControls.getHelper());

    this.setupBrushHelper();
    this.setupInteractions();
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

  private setupInteractions(): void {
    const domElem = this.renderer.domElement;

    domElem.addEventListener('pointerdown', (e: PointerEvent) => {
      if (e.button === 0 && this.appMode() === 'sculpt') {
        this.isSculpting = true;
        this.controls.enabled = false;
        this.sculpt(e);
      } else if (e.button === 0 && this.appMode() === 'transform') {
        this.selectObject(e);
      }
    });

    domElem.addEventListener('pointermove', (e: PointerEvent) => {
      if (this.appMode() === 'sculpt') {
        this.updateCursorHelper(e);
        if (this.isSculpting) this.sculpt(e);
      }
    });

    const stopAction = () => {
      if (this.isSculpting) {
        this.isSculpting = false;
        this.controls.enabled = true;
      }
    };

    domElem.addEventListener('pointerup', stopAction);
    domElem.addEventListener('pointerleave', () => {
      if (this.brushHelper) this.brushHelper.visible = false;
      stopAction();
    });
  }

  private updateCursorHelper(event: PointerEvent): void {
    if (!this.selectedObject) {
      this.brushHelper.visible = false;
      return;
    }
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
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

  private sculpt(event: PointerEvent): void {
    if (!this.selectedObject) return;
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.selectedObject);

    if (intersects.length > 0) {
      const hit = intersects[0];
      if (!hit.point || !hit.face) return;

      const pointsToProcess = [hit.point.clone()];
      if (this.symmetryX()) {
        const mirror = hit.point.clone();
        mirror.x = -mirror.x;
        pointsToProcess.push(mirror);
      }

      pointsToProcess.forEach(pt => {
        if (this.selectedTool() !== 'paint' && this.enableDyntopo()) {
          this.subdivideTriangles(pt);
        }
        this.applySculpt(pt, hit.face!.normal);
      });

      const geom = this.selectedObject.geometry;
      geom.attributes['position'].needsUpdate = true;
      if (geom.attributes['color']) geom.attributes['color'].needsUpdate = true;
      geom.computeVertexNormals();
      this.updateMeshStats();
    }
  }

  private subdivideTriangles(hitPoint: THREE.Vector3): void {
    const geometry = this.selectedObject!.geometry;
    const posAttr = geometry.attributes['position'] as THREE.BufferAttribute;
    const colAttr = geometry.attributes['color'] as THREE.BufferAttribute;
    
    const radius = this.brushSize();
    const threshold = this.maxEdgeLength();

    const positions: number[] = Array.from(posAttr.array);
    const colors: number[] = colAttr ? Array.from(colAttr.array) : [];
    const newPos: number[] = [];
    const newCol: number[] = [];
    let updated = false;

    const vA = new THREE.Vector3(), vB = new THREE.Vector3(), vC = new THREE.Vector3();
    const cA = new THREE.Color(), cB = new THREE.Color(), cC = new THREE.Color();

    for (let i = 0; i < positions.length; i += 9) {
      vA.set(positions[i], positions[i+1], positions[i+2]);
      vB.set(positions[i+3], positions[i+4], positions[i+5]);
      vC.set(positions[i+6], positions[i+7], positions[i+8]);

      if (colors.length > 0) {
        cA.setRGB(colors[i], colors[i+1], colors[i+2]);
        cB.setRGB(colors[i+3], colors[i+4], colors[i+5]);
        cC.setRGB(colors[i+6], colors[i+7], colors[i+8]);
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
      if (colors.length > 0) newCol.push(cA.r, cA.g, cA.b, cB.r, cB.g, cB.b, cC.r, cC.g, cC.b);
    }

    if (updated) {
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(newPos, 3));
      if (colors.length > 0) geometry.setAttribute('color', new THREE.Float32BufferAttribute(newCol, 3));
    }
  }

  private applySculpt(hitPoint: THREE.Vector3, faceNormal: THREE.Vector3): void {
    const geometry = this.selectedObject!.geometry;
    const posAttr = geometry.attributes['position'] as THREE.BufferAttribute;
    const colAttr = geometry.attributes['color'] as THREE.BufferAttribute;
    
    const vertex = new THREE.Vector3();
    const currentC = new THREE.Color();
    const targetC = new THREE.Color(this.paintColor());
    const radius = this.brushSize();
    const strength = this.brushIntensity();
    const tool = this.selectedTool();
    const normal = faceNormal.clone().transformDirection(this.selectedObject!.matrixWorld);

    for (let i = 0; i < posAttr.count; i++) {
      vertex.fromBufferAttribute(posAttr, i);
      const worldV = vertex.clone().applyMatrix4(this.selectedObject!.matrixWorld);
      const dist = worldV.distanceTo(hitPoint);

      if (dist < radius) {
        const falloff = Math.pow(1 - dist / radius, 2);
        switch (tool) {
          case 'inflate':
            vertex.add(normal.clone().multiplyScalar(falloff * strength));
            posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
            break;
          case 'deflate':
            vertex.add(normal.clone().multiplyScalar(-falloff * strength));
            posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
            break;
          case 'smooth':
            vertex.add(hitPoint.clone().sub(worldV).multiplyScalar(falloff * strength * 0.5));
            posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
            break;
          case 'flatten':
            const distPlane = worldV.clone().sub(hitPoint).dot(normal);
            vertex.add(normal.clone().multiplyScalar(-distPlane * falloff * strength * 2));
            posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
            break;
          case 'paint':
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

  private updateMeshStats(): void {
    if (!this.selectedObject) return;
    const pos = this.selectedObject.geometry.attributes['position'];
    this.vertexCount.set(pos ? pos.count : 0);
    this.faceCount.set(pos ? pos.count / 3 : 0);
  }

  public addNewObjectCenter(shape: string): void {
    this.addObject(shape, new THREE.Vector3(0, 0, 0));
  }

  private addObject(shape: string, position: THREE.Vector3): void {
    let baseGeom: THREE.BufferGeometry;
    switch (shape) {
      case 'cube': baseGeom = new THREE.BoxGeometry(2, 2, 2, 16, 16, 16); break;
      case 'sphere': baseGeom = new THREE.SphereGeometry(1.5, 32, 32); break;
      case 'cylinder': baseGeom = new THREE.CylinderGeometry(1, 1, 3, 32, 16); break;
      case 'cone': baseGeom = new THREE.ConeGeometry(1.5, 3, 32, 16); break;
      case 'torus': baseGeom = new THREE.TorusGeometry(1.5, 0.5, 24, 48); break;
      case 'plane': baseGeom = new THREE.PlaneGeometry(3, 3, 16, 16); break;
      case 'knot': baseGeom = new THREE.TorusKnotGeometry(1.2, 0.4, 64, 16); break;
      default: baseGeom = new THREE.SphereGeometry(1.5, 32, 32); break;
    }

    const geometry = baseGeom.toNonIndexed();
    baseGeom.dispose();

    const colors = new Float32Array(geometry.attributes['position'].count * 3);
    colors.fill(0.8);
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      roughness: 0.3,
      metalness: 0.1,
      vertexColors: true,
      wireframe: this.wireframe()
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    if (shape !== 'plane') mesh.position.y += 1.0;

    this.scene.add(mesh);
    this.objects.push(mesh);
    this.selectMeshObject(mesh);
  }

  private selectMeshObject(mesh: THREE.Mesh): void {
    this.selectedObject = mesh;
    if (this.appMode() === 'transform') {
      this.transformControls.attach(mesh);
    }
    this.updateSelectedObjectProperties();
    this.updateMeshStats();
  }

  private selectObject(event: MouseEvent): void {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.objects, true);

    if (intersects.length > 0) {
      const clicked = intersects[0].object as THREE.Mesh;
      this.selectMeshObject(clicked);
    } else if (!this.transformControls.dragging) {
      this.transformControls.detach();
      this.selectedObject = null;
    }
  }

  public setTransformMode(mode: 'translate' | 'rotate' | 'scale'): void {
    this.transformMode = mode;
    this.transformControls.setMode(mode);
  }

  public setSculptTool(tool: SculptTool): void {
    this.selectedTool.set(tool);
  }

  public updateBrushSize(e: Event): void { this.brushSize.set(parseFloat((e.target as HTMLInputElement).value)); }
  public updateBrushIntensity(e: Event): void { this.brushIntensity.set(parseFloat((e.target as HTMLInputElement).value)); }
  public updatePaintColor(e: Event): void { this.paintColor.set((e.target as HTMLInputElement).value); }
  public toggleDyntopo(e: Event): void { this.enableDyntopo.set((e.target as HTMLInputElement).checked); }
  public updateMaxEdgeLength(e: Event): void { this.maxEdgeLength.set(parseFloat((e.target as HTMLInputElement).value)); }
  public toggleSymmetry(e: Event): void { this.symmetryX.set((e.target as HTMLInputElement).checked); }
  
  public toggleWireframe(e: Event): void {
    const val = (e.target as HTMLInputElement).checked;
    this.wireframe.set(val);
    this.objects.forEach(obj => {
      if (obj.material instanceof THREE.MeshStandardMaterial) obj.material.wireframe = val;
    });
  }

  public duplicateSelectedObject(): void {
    if (!this.selectedObject) return;
    const geom = this.selectedObject.geometry.clone();
    const mat = (this.selectedObject.material as THREE.MeshStandardMaterial).clone();
    const dup = new THREE.Mesh(geom, mat);
    dup.position.copy(this.selectedObject.position).add(new THREE.Vector3(1, 0, 1));
    this.scene.add(dup);
    this.objects.push(dup);
    this.selectMeshObject(dup);
  }

  public rotate90Y(): void {
    if (this.selectedObject) this.selectedObject.rotation.y += Math.PI / 2;
  }

  public resetScale(): void {
    if (this.selectedObject) {
      this.selectedObject.scale.set(1, 1, 1);
      this.updateSelectedObjectProperties();
    }
  }

  public deleteSelectedObject(): void {
    if (this.selectedObject) {
      this.scene.remove(this.selectedObject);
      this.transformControls.detach();
      this.objects = this.objects.filter(o => o !== this.selectedObject);
      this.selectedObject = null;
    }
  }

  public clearScene(): void {
    if (confirm('¿Limpiar toda la escena?')) {
      this.objects.forEach(o => this.scene.remove(o));
      this.objects = [];
      this.transformControls.detach();
      this.selectedObject = null;
    }
  }

  public closeModal(): void { this.showModal = false; }

  private updateSelectedObjectProperties(): void {
    if (!this.selectedObject) return;
    const { x, y, z } = this.selectedObject.scale;
    const colorHex = (this.selectedObject.material as THREE.MeshStandardMaterial).color.getHexString();
    this.modalObjectProperties = {
      scaleX: x, scaleY: y, scaleZ: z,
      color: `#${colorHex}`,
      positionX: this.selectedObject.position.x,
      positionY: this.selectedObject.position.y,
      positionZ: this.selectedObject.position.z
    };
  }

  public updateObjectProperties(): void {
    if (!this.selectedObject) return;
    const mat = this.selectedObject.material as THREE.MeshStandardMaterial;
    mat.color.set(this.modalObjectProperties.color);
    this.selectedObject.position.set(
      Number(this.modalObjectProperties.positionX),
      Number(this.modalObjectProperties.positionY),
      Number(this.modalObjectProperties.positionZ)
    );
    this.selectedObject.scale.set(
      Number(this.modalObjectProperties.scaleX),
      Number(this.modalObjectProperties.scaleY),
      Number(this.modalObjectProperties.scaleZ)
    );
    this.showModal = false;
  }

  public onDragStart(e: DragEvent, shape: string): void { e.dataTransfer?.setData('text/plain', shape); }
  public onDragOver(e: DragEvent): void { e.preventDefault(); }
  public onDrop(e: DragEvent): void {
    e.preventDefault();
    const shape = e.dataTransfer?.getData('text/plain');
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.plane);
    if (shape && intersects.length > 0) {
      this.addObject(shape, intersects[0].point);
    }
  }

  public loadSTL(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const buffer = e.target?.result as ArrayBuffer;
        const loader = new STLLoader();
        const geometry = loader.parse(buffer).toNonIndexed();
        const colors = new Float32Array(geometry.attributes['position'].count * 3);
        colors.fill(0.8);
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        const material = new THREE.MeshStandardMaterial({ color: 0x2ecc71, vertexColors: true });
        const mesh = new THREE.Mesh(geometry, material);
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
  public setCameraView(view: 'front' | 'right' | 'top' | 'iso'): void {
    const target = this.selectedObject ? this.selectedObject.position.clone() : new THREE.Vector3(0, 0, 0);
    const distance = 7;

    switch (view) {
      case 'front':
        this.camera.position.set(target.x, target.y, target.z + distance);
        break;
      case 'right':
        this.camera.position.set(target.x + distance, target.y, target.z);
        break;
      case 'top':
        this.camera.position.set(target.x, target.y + distance + 2, target.z + 0.001);
        break;
      case 'iso':
        this.camera.position.set(target.x + 5, target.y + 5, target.z + 5);
        break;
    }
    this.controls.target.copy(target);
    this.controls.update();
  }

  /**
   * Exporta únicamente el objeto seleccionado actualmente de forma limpia (sin plano ni luces).
   */
  public exportCleanSTL(): void {
    if (!this.selectedObject) {
      alert('Por favor, selecciona un objeto para exportar.');
      return;
    }

    const tempScene = new THREE.Scene();
    const cloneMesh = this.selectedObject.clone();
    
    this.selectedObject.updateMatrixWorld(true);
    cloneMesh.applyMatrix4(this.selectedObject.matrixWorld);
    
    tempScene.add(cloneMesh);

    const exporter = new STLExporter();
    const result = exporter.parse(tempScene);
    const blob = new Blob([result], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `objeto-limpio-${Date.now()}.stl`;
    link.click();
  }

  /**
   * Exporta todos los objetos creados/esculpidos en la escena de manera limpia (sin plano ni luces).
   */
  public exportAllCleanObjectsSTL(): void {
    if (this.objects.length === 0) {
      alert('No hay objetos en la escena.');
      return;
    }

    const tempScene = new THREE.Scene();
    this.objects.forEach(obj => {
      obj.updateMatrixWorld(true);
      const clone = obj.clone();
      clone.applyMatrix4(obj.matrixWorld);
      tempScene.add(clone);
    });

    const exporter = new STLExporter();
    const result = exporter.parse(tempScene);
    const blob = new Blob([result], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `escena-limpia-${Date.now()}.stl`;
    link.click();
  }

  /**
   * Exporta el objeto seleccionado en formato GLB limpio.
   */
  public exportCleanGLB(): void {
    if (!this.selectedObject) {
      alert('Por favor, selecciona un objeto para exportar.');
      return;
    }

    const exporter = new GLTFExporter();
    exporter.parse(
      this.selectedObject, 
      (gltf) => {
        if (gltf instanceof ArrayBuffer) {
          const blob = new Blob([gltf], { type: 'application/octet-stream' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `modelo-esculpido-${Date.now()}.glb`;
          link.click();
        }
      }, 
      (err) => console.error('Error al exportar GLB:', err), 
      { binary: true }
    );
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };
}