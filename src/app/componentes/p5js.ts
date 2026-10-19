import { 
  Component, 
  ElementRef, 
  AfterViewInit, 
  OnDestroy, 
  viewChild, 
  effect, 
  input, 
  signal,
  NgZone,
  inject
} from '@angular/core';
import p5 from 'p5';
import { Navbar } from './navbar';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  color: string;
  hue: number;
  mass: number;
  angle: number;
}

type ToolMode = 'attract' | 'repel' | 'spawn' | 'vortex' | 'eraser' | 'freeze' | 'explode' | 'gravity' | 'magnet' | 'turbulence' | 'bounce' | 'none';
type RenderMode = 'mesh' | 'circles' | 'trail' | 'rings';
type Shape3DMode = 'none' | 'sphere' | 'box' | 'torus' | 'cylinder' | 'cone' | 'plane';

@Component({
  selector: 'app-complex-canvas',
  standalone: true,
  imports: [Navbar],
  template: `
    <app-navbar></app-navbar>
    <div class="py-5"></div>
    
    <div class="container my-4" [class.container-fluid]="isFullscreen()" [style.max-width]="isFullscreen() ? '100%' : '1100px'" [style.padding]="isFullscreen() ? '0' : 'inherit'">
      <div #fullScreenContainer class="card bg-dark text-light border border-secondary shadow-lg overflow-hidden" [class.vh-100]="isFullscreen()" [style.border-radius]="isFullscreen() ? '0' : 'inherit'">
        
        <!-- Toolbar Superior: Herramientas con btn-group -->
        <div class="card-header bg-secondary d-flex flex-wrap justify-content-between align-items-center py-3 border-secondary">
          <div class="d-flex flex-wrap align-items-center mr-2 mb-2 mb-md-0">
            
            <div class="btn-group btn-group-sm mr-2 mb-1" role="group">
              <button 
                type="button"
                class="btn"
                [class.btn-warning]="selectedTool() === 'spawn'"
                [class.btn-secondary]="selectedTool() !== 'spawn'"
                [class.text-dark]="selectedTool() === 'spawn'"
                (click)="setTool('spawn')" 
                title="Crea partículas al hacer clic o arrastrar">
                  Dibujar
              </button>
              <button 
                type="button"
                class="btn"
                [class.btn-warning]="selectedTool() === 'attract'"
                [class.btn-secondary]="selectedTool() !== 'attract'"
                [class.text-dark]="selectedTool() === 'attract'"
                (click)="setTool('attract')" 
                title="Atrae partículas al cursor mediante campo gravitacional">
                  Atraer
              </button>
              <button 
                type="button"
                class="btn"
                [class.btn-warning]="selectedTool() === 'repel'"
                [class.btn-secondary]="selectedTool() !== 'repel'"
                [class.text-dark]="selectedTool() === 'repel'"
                (click)="setTool('repel')" 
                title="Empuja partículas con fuerza electrostática">
                  Repeler
              </button>
            </div>

            <div class="btn-group btn-group-sm mr-2 mb-1" role="group">
              <button 
                type="button"
                class="btn"
                [class.btn-warning]="selectedTool() === 'vortex'"
                [class.btn-secondary]="selectedTool() !== 'vortex'"
                [class.text-dark]="selectedTool() === 'vortex'"
                (click)="setTool('vortex')" 
                title="Aplica un campo rotacional de vórtice">
                  Vórtice
              </button>
              <button 
                type="button"
                class="btn"
                [class.btn-warning]="selectedTool() === 'magnet'"
                [class.btn-secondary]="selectedTool() !== 'magnet'"
                [class.text-dark]="selectedTool() === 'magnet'"
                (click)="setTool('magnet')" 
                title="Imán de alta potencia orbital">
                  Imán
              </button>
              <button 
                type="button"
                class="btn"
                [class.btn-warning]="selectedTool() === 'turbulence'"
                [class.btn-secondary]="selectedTool() !== 'turbulence'"
                [class.text-dark]="selectedTool() === 'turbulence'"
                (click)="setTool('turbulence')" 
                title="Campo caótico de alta energía">
                  Turbulencia
              </button>
            </div>

            <div class="btn-group btn-group-sm mb-1" role="group">
              <button 
                type="button"
                class="btn"
                [class.btn-warning]="selectedTool() === 'bounce'"
                [class.btn-secondary]="selectedTool() !== 'bounce'"
                [class.text-dark]="selectedTool() === 'bounce'"
                (click)="setTool('bounce')" 
                title="Pared elástica de rebote local">
                  Rebotar
              </button>
              <button 
                type="button"
                class="btn"
                [class.btn-warning]="selectedTool() === 'eraser'"
                [class.btn-secondary]="selectedTool() !== 'eraser'"
                [class.text-dark]="selectedTool() === 'eraser'"
                (click)="setTool('eraser')" 
                title="Elimina partículas al pasar el cursor">
                  Borrador
              </button>
              <button 
                type="button"
                class="btn"
                [class.btn-warning]="selectedTool() === 'freeze'"
                [class.btn-secondary]="selectedTool() !== 'freeze'"
                [class.text-dark]="selectedTool() === 'freeze'"
                (click)="setTool('freeze')" 
                title="Disipa la energía cinética local">
                  Congelar
              </button>
              <button 
                type="button"
                class="btn"
                [class.btn-warning]="selectedTool() === 'explode'"
                [class.btn-secondary]="selectedTool() !== 'explode'"
                [class.text-dark]="selectedTool() === 'explode'"
                (click)="setTool('explode')" 
                title="Onda expansiva de pulso radial">
                  Explosión
              </button>
              <button 
                type="button"
                class="btn"
                [class.btn-warning]="selectedTool() === 'gravity'"
                [class.btn-secondary]="selectedTool() !== 'gravity'"
                [class.text-dark]="selectedTool() === 'gravity'"
                (click)="setTool('gravity')" 
                title="Atractor armónico central">
                  Gravedad
              </button>
            </div>
          </div>

          <div class="btn-group btn-group-sm mb-1" role="group">
            <button type="button" class="btn btn-outline-light" (click)="togglePause()">
              {{ isPaused() ? 'Reanudar' : 'Pausar' }}
            </button>
            <button type="button" class="btn btn-outline-light" (click)="toggleFullScreen()" title="Pantalla Completa">
              {{ isFullscreen() ? 'Minimizar' : 'Pantalla Completa' }}
            </button>
            <button type="button" class="btn btn-outline-light" (click)="resetParticles()" title="Restablecer partículas">
              Reiniciar
            </button>
            <button type="button" class="btn btn-danger" (click)="clearCanvas()" title="Borrar todo">
              Limpiar
            </button>
            <button type="button" class="btn btn-warning font-weight-bold text-dark" (click)="downloadPNG()">
              Descargar PNG
            </button>
          </div>
        </div>

        <!-- Panel de Controles: Ajustes de Brocha, Sistema, Color Dinámico y Objetos 3D -->
        <div class="card-body bg-dark border-bottom border-secondary py-3">
          <div class="row align-items-center">
            <div class="col-md-2 d-flex align-items-center mb-2 mb-md-0">
              <label class="small text-muted mb-0 mr-2 text-nowrap">Color Fijo:</label>
              <input type="color" [value]="brushColor()" (input)="updateBrushColor($event)" class="border-0 bg-transparent" style="width: 32px; height: 32px; cursor: pointer;" [disabled]="isDynamicColor()" />
            </div>
            <div class="col-md-2 d-flex align-items-center mb-2 mb-md-0">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="dynamicColorCheck" [checked]="isDynamicColor()" (change)="toggleDynamicColor()">
                <label class="custom-control-label small text-warning font-weight-bold" for="dynamicColorCheck" style="cursor: pointer;">Color Dinámico</label>
              </div>
            </div>
            <div class="col-md-2 d-flex align-items-center mb-2 mb-md-0">
              <label class="small text-muted mb-0 mr-2 text-nowrap">Tamaño: {{ brushSize() }}px</label>
              <input type="range" min="10" max="150" [value]="brushSize()" (input)="updateBrushSize($event)" class="form-control-range" />
            </div>
            <div class="col-md-2 d-flex align-items-center mb-2 mb-md-0">
              <label class="small text-muted mb-0 mr-2 text-nowrap">Fricción: {{ friction() }}</label>
              <input type="range" min="0.85" max="0.99" step="0.01" [value]="friction()" (input)="updateFriction($event)" class="form-control-range" />
            </div>
            <div class="col-md-4 d-flex align-items-center justify-content-md-end flex-wrap">
              <div class="btn-group btn-group-sm mr-2 mb-1" role="group">
                <button type="button" class="btn" [class.btn-info]="renderMode() === 'mesh'" [class.btn-outline-secondary]="renderMode() !== 'mesh'" (click)="setRenderMode('mesh')" title="Malla Geométrica">Malla</button>
                <button type="button" class="btn" [class.btn-info]="renderMode() === 'circles'" [class.btn-outline-secondary]="renderMode() !== 'circles'" (click)="setRenderMode('circles')" title="Círculos Concéntricos">Orbes</button>
                <button type="button" class="btn" [class.btn-info]="renderMode() === 'trail'" [class.btn-outline-secondary]="renderMode() !== 'trail'" (click)="setRenderMode('trail')" title="Estelas Fluorescentes">Estela</button>
                <button type="button" class="btn" [class.btn-info]="renderMode() === 'rings'" [class.btn-outline-secondary]="renderMode() !== 'rings'" (click)="setRenderMode('rings')" title="Anillos Rotacionales">Anillos</button>
              </div>

              <!-- Selector 3D Desplegable Nativo -->
              <div class="btn-group btn-group-sm mb-1 dropdown user-select-none" [class.show]="isDropdownOpen()" role="group">
                <button 
                  type="button" 
                  class="btn dropdown-toggle btn-warning text-dark font-weight-bold" 
                  (click)="toggleDropdown($event)">
                    Objeto 3D: {{ shape3D().toUpperCase() }}
                </button>
                <div class="dropdown-menu dropdown-menu-right bg-dark border-secondary user-select-none" [class.show]="isDropdownOpen()">
                  <button class="dropdown-item text-light" type="button" (click)="selectShape3D('none')">Ninguno (2D)</button>
                  <div class="dropdown-divider border-secondary"></div>
                  <button class="dropdown-item text-light" type="button" (click)="selectShape3D('sphere')">Esfera 3D</button>
                  <button class="dropdown-item text-light" type="button" (click)="selectShape3D('box')">Cubo 3D</button>
                  <button class="dropdown-item text-light" type="button" (click)="selectShape3D('torus')">Torus 3D</button>
                  <button class="dropdown-item text-light" type="button" (click)="selectShape3D('cylinder')">Cilindro 3D</button>
                  <button class="dropdown-item text-light" type="button" (click)="selectShape3D('cone')">Cono 3D</button>
                  <button class="dropdown-item text-light" type="button" (click)="selectShape3D('plane')">Plano 3D</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Canvas Parent -->
        <div #canvasContainer class="sketch-parent position-relative w-100 bg-dark" [style.height]="isFullscreen() ? 'calc(100vh - 180px)' : '500px'"></div>

        <!-- Barra de Estado Inferior -->
        <div class="card-footer bg-secondary text-muted small border-secondary d-flex justify-content-between align-items-center py-2 font-weight-bold">
          <span>Partículas activas: <strong class="text-white">{{ particlesCount() }}</strong></span>
          <span>Modo Gráfico: <strong class="badge badge-info text-dark text-uppercase mr-3">{{ renderMode() }}</strong> Color: <strong class="badge badge-warning text-dark text-uppercase mr-3">{{ isDynamicColor() ? 'Dinámico (HSB)' : 'Fijo' }}</strong> Herramienta: <strong class="badge badge-warning text-dark text-uppercase">{{ selectedTool() }}</strong></span>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .font-monospace {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .sketch-parent canvas {
      display: block;
      width: 100% !important;
      height: 100% !important;
    }
    .dropdown-menu .dropdown-item:hover {
      background-color: #343a40;
    }
    button, .dropdown-menu, .card-header, .custom-control-label {
      user-select: none;
      -webkit-user-select: none;
    }
  `]
})
export class ComplexCanvasComponent implements AfterViewInit, OnDestroy {
  private readonly canvasContainer = viewChild.required<ElementRef<HTMLDivElement>>('canvasContainer');
  private readonly fullScreenContainer = viewChild.required<ElementRef<HTMLDivElement>>('fullScreenContainer');
  private ngZone = inject(NgZone);

  readonly initialParticleCount = input<number>(140);

  readonly selectedTool = signal<ToolMode>('spawn');
  readonly renderMode = signal<RenderMode>('mesh');
  readonly shape3D = signal<Shape3DMode>('none');
  readonly particlesCount = signal<number>(0);
  readonly isPaused = signal<boolean>(false);
  readonly isFullscreen = signal<boolean>(false);
  readonly isDropdownOpen = signal<boolean>(false);
  readonly isDynamicColor = signal<boolean>(true);
  readonly brushColor = signal<string>('#f0ad4e');
  readonly brushSize = signal<number>(70);
  readonly friction = signal<number>(0.96);

  private p5Instance?: p5;
  private particles: Particle[] = [];
  private resizeObserver?: ResizeObserver;
  private globalClickListener = (event: MouseEvent) => {
    if (this.isDropdownOpen()) {
      this.isDropdownOpen.set(false);
    }
  };

  constructor() {
    effect(() => {
      const targetCount = this.initialParticleCount();
      if (this.p5Instance) {
        this.syncParticles(targetCount);
      }
    });
  }

  ngAfterViewInit(): void {
    this.createSketch();
    this.initResizeObserver();
    document.addEventListener('click', this.globalClickListener);
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    document.removeEventListener('click', this.globalClickListener);
    this.p5Instance?.remove();
  }

  private initResizeObserver(): void {
    const container = this.canvasContainer().nativeElement;
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = entry.contentRect.height;
        if (this.p5Instance && width > 0 && height > 0) {
          this.p5Instance.resizeCanvas(width, height);
        }
      }
    });
    this.resizeObserver.observe(container);
  }

  public setTool(tool: ToolMode): void {
    this.selectedTool.set(tool);
  }

  public toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen.update(v => !v);
  }

  public selectShape3D(shape: Shape3DMode): void {
    this.setShape3D(shape);
    this.isDropdownOpen.set(false);
  }

  public setRenderMode(mode: RenderMode): void {
    this.renderMode.set(mode);
  }

  public setShape3D(shape: Shape3DMode): void {
    this.shape3D.set(shape);
  }

  public toggleDynamicColor(): void {
    this.isDynamicColor.update(v => !v);
  }

  public togglePause(): void {
    this.isPaused.update(v => !v);
    if (this.p5Instance) {
      if (this.isPaused()) {
        this.p5Instance.noLoop();
      } else {
        this.p5Instance.loop();
      }
    }
  }

  public toggleFullScreen(): void {
    const el = this.fullScreenContainer().nativeElement;

    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => {
        this.isFullscreen.set(true);
      }).catch(err => {
        console.error('Error al intentar activar pantalla completa:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        this.isFullscreen.set(false);
      });
    }
  }

  public updateBrushColor(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.brushColor.set(input.value);
  }

  public updateBrushSize(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.brushSize.set(Number(input.value));
  }

  public updateFriction(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.friction.set(Number(input.value));
  }

  public resetParticles(): void {
    if (!this.p5Instance) return;
    this.particles = [];
    this.syncParticles(this.initialParticleCount());
  }

  public clearCanvas(): void {
    this.particles = [];
    this.particlesCount.set(0);
  }

  public downloadPNG(): void {
    if (!this.p5Instance) return;
    const timeStamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.p5Instance.saveCanvas(`pizarra-arte-color-${timeStamp}`, 'png');
  }

  private createParticle(x?: number, y?: number): Particle {
    const width = this.p5Instance?.width || 800;
    const height = this.p5Instance?.height || 500;
    const s = Math.random() * 5 + 3;
    const h = Math.random() * 360;

    return {
      x: x ?? Math.random() * width,
      y: y ?? Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: s,
      baseSize: s,
      color: this.brushColor(),
      hue: h,
      mass: Math.random() * 1.5 + 0.5,
      angle: Math.random() * Math.PI * 2
    };
  }

  private syncParticles(targetCount: number): void {
    const currentCount = this.particles.length;
    if (currentCount < targetCount) {
      const toAdd = targetCount - currentCount;
      for (let i = 0; i < toAdd; i++) {
        this.particles.push(this.createParticle());
      }
    } else if (currentCount > targetCount) {
      this.particles.splice(targetCount);
    }
    this.particlesCount.set(this.particles.length);
  }

  private createSketch(): void {
    const container = this.canvasContainer().nativeElement;

    const sketch = (p: p5) => {
      let noiseZ = 0;
      let waveTimer = 0;

      p.setup = () => {
        const canvas = p.createCanvas(container.offsetWidth || 800, container.offsetHeight || 500, p.WEBGL);
        canvas.parent(container);
        p.colorMode(p.HSB, 360, 100, 100, 255);
        this.syncParticles(this.initialParticleCount());
      };

      p.draw = () => {
        const mode = this.renderMode();
        const s3D = this.shape3D();
        const dynamic = this.isDynamicColor();

        p.background(220, 20, 8, 30);

        const width = p.width;
        const height = p.height;
        const mouseX = p.mouseX - width / 2;
        const mouseY = p.mouseY - height / 2;
        const tool = this.selectedTool();
        const bSize = this.brushSize();
        const fVal = this.friction();

        const isMouseInside = p.mouseX >= 0 && p.mouseX <= width && p.mouseY >= 0 && p.mouseY <= height;

        noiseZ += 0.003;
        waveTimer += 0.05;

        // Renderizado del Objeto 3D Central con color dinámico o fijo
        if (s3D !== 'none') {
          p.push();
          p.rotateX(waveTimer * 0.5);
          p.rotateY(waveTimer * 0.7);
          p.ambientLight(100);
          p.directionalLight(255, 255, 255, 0.5, 0.5, -1);
          
          if (dynamic) {
            const currentHue = (waveTimer * 30) % 360;
            p.fill(currentHue, 80, 90);
            p.stroke((currentHue + 180) % 360, 80, 100, 180);
          } else {
            p.fill(this.brushColor());
            p.stroke(40, 80, 90, 180);
          }
          p.strokeWeight(1.5);

          const size3D = 140;
          if (s3D === 'sphere') {
            p.sphere(size3D * 0.6, 24, 24);
          } else if (s3D === 'box') {
            p.box(size3D);
          } else if (s3D === 'torus') {
            p.torus(size3D * 0.6, size3D * 0.2, 24, 24);
          } else if (s3D === 'cylinder') {
            p.cylinder(size3D * 0.5, size3D, 24, 24);
          } else if (s3D === 'cone') {
            p.cone(size3D * 0.6, size3D, 24, 24);
          } else if (s3D === 'plane') {
            p.plane(size3D * 1.5, size3D * 1.5);
          }
          p.pop();
        }

        if (p.mouseIsPressed && isMouseInside) {
          this.ngZone.run(() => {
            if (tool === 'spawn') {
              for (let k = 0; k < 3; k++) {
                this.particles.push(this.createParticle(mouseX + (Math.random() - 0.5) * 15, mouseY + (Math.random() - 0.5) * 15));
              }
              this.particlesCount.set(this.particles.length);
            } else if (tool === 'eraser') {
              const radiusSq = (bSize / 2) * (bSize / 2);
              this.particles = this.particles.filter(pt => {
                const cx = pt.x - width / 2;
                const cy = pt.y - height / 2;
                const dx = mouseX - cx;
                const dy = mouseY - cy;
                return (dx * dx + dy * dy) > radiusSq;
              });
              this.particlesCount.set(this.particles.length);
            }
          });
        }

        for (let i = 0; i < this.particles.length; i++) {
          const pt = this.particles[i];

          pt.angle += 0.03;
          pt.size = pt.baseSize + Math.sin(waveTimer + i) * 1.5;
          if (dynamic) {
            pt.hue = (pt.hue + 0.5) % 360;
          }

          const angle = p.noise(pt.x * 0.003, pt.y * 0.003, noiseZ) * p.TWO_PI * 2;
          const noiseForce = 0.08;
          pt.vx += Math.cos(angle) * noiseForce;
          pt.vy += Math.sin(angle) * noiseForce;

          if (tool === 'gravity') {
            const dxC = 0 - (pt.x - width / 2);
            const dyC = 0 - (pt.y - height / 2);
            const distC = Math.sqrt(dxC * dxC + dyC * dyC) || 1;
            const harmonicPull = (distC / 200) * 0.08;
            pt.vx += (dxC / distC) * harmonicPull;
            pt.vy += (dyC / distC) * harmonicPull;
          }

          if (isMouseInside && tool !== 'none') {
            const px = pt.x - width / 2;
            const py = pt.y - height / 2;
            const dx = mouseX - px;
            const dy = mouseY - py;
            const distSq = dx * dx + dy * dy;
            const effectArea = (bSize * 1.8) * (bSize * 1.8);

            if (distSq < effectArea) {
              const dist = Math.sqrt(distSq) || 1;
              const normalizedDist = dist / (bSize * 1.8);
              const smoothFactor = 1 - normalizedDist * normalizedDist;

              if (tool === 'attract') {
                const attractionForce = (1 / (distSq * 0.01 + 1)) * 1.8 * smoothFactor;
                pt.vx += (dx / dist) * attractionForce / pt.mass;
                pt.vy += (dy / dist) * attractionForce / pt.mass;
              } else if (tool === 'repel') {
                const repulsionForce = Math.pow(1 - normalizedDist, 2) * 2.5;
                pt.vx -= (dx / dist) * repulsionForce / pt.mass;
                pt.vy -= (dy / dist) * repulsionForce / pt.mass;
              } else if (tool === 'vortex') {
                const perpX = -dy / dist;
                const perpY = dx / dist;
                const vortexStrength = 1.2 * smoothFactor;
                pt.vx += perpX * vortexStrength + (dx / dist) * 0.15;
                pt.vy += perpY * vortexStrength + (dy / dist) * 0.15;
              } else if (tool === 'magnet') {
                const magForce = 3.5 * smoothFactor;
                const perpX = -dy / dist;
                const perpY = dx / dist;
                pt.vx += (dx / dist) * magForce * 0.5 + perpX * magForce * 0.8;
                pt.vy += (dy / dist) * magForce * 0.5 + perpY * magForce * 0.8;
              } else if (tool === 'turbulence') {
                pt.vx += (Math.random() - 0.5) * 3.5 * smoothFactor;
                pt.vy += (Math.random() - 0.5) * 3.5 * smoothFactor;
              } else if (tool === 'bounce') {
                if (dist < bSize) {
                  pt.vx = -(dx / dist) * 4;
                  pt.vy = -(dy / dist) * 4;
                }
              } else if (tool === 'freeze') {
                pt.vx *= 0.1;
                pt.vy *= 0.1;
              }
            }
          }

          pt.vx *= fVal;
          pt.vy *= fVal;
          pt.x += pt.vx;
          pt.y += pt.vy;

          const margin = 10;
          if (pt.x < margin) { pt.x = margin; pt.vx *= -0.8; }
          if (pt.x > width - margin) { pt.x = width - margin; pt.vx *= -0.8; }
          if (pt.y < margin) { pt.y = margin; pt.vy *= -0.8; }
          if (pt.y > height - margin) { pt.y = height - margin; pt.vy *= -0.8; }

          const renderX = pt.x - width / 2;
          const renderY = pt.y - height / 2;

          p.push();
          p.translate(renderX, renderY, 0);

          if (dynamic) {
            p.colorMode(p.HSB, 360, 100, 100, 255);
            if (mode === 'circles') {
              p.noFill();
              p.stroke(pt.hue, 80, 90, 200);
              p.strokeWeight(1);
              p.circle(0, 0, pt.size * 2.5);
            } else if (mode === 'rings') {
              p.noFill();
              p.stroke(pt.hue, 80, 90, 220);
              p.strokeWeight(1.5);
              p.rotate(pt.angle);
              p.rect(-pt.size, -pt.size, pt.size * 2, pt.size * 2);
            } else {
              p.noStroke();
              p.fill(pt.hue, 80, 95, 240);
              p.circle(0, 0, pt.size);
            }
          } else {
            p.colorMode(p.RGB, 255);
            const fixedCol = p.color(this.brushColor());
            if (mode === 'circles') {
              p.noFill();
              p.stroke(fixedCol);
              p.strokeWeight(1);
              p.circle(0, 0, pt.size * 2.5);
            } else if (mode === 'rings') {
              p.noFill();
              p.stroke(fixedCol);
              p.strokeWeight(1.5);
              p.rotate(pt.angle);
              p.rect(-pt.size, -pt.size, pt.size * 2, pt.size * 2);
            } else {
              p.noStroke();
              p.fill(fixedCol);
              p.circle(0, 0, pt.size);
            }
            p.colorMode(p.HSB, 360, 100, 100, 255);
          }
          p.pop();

          if (mode === 'mesh' || mode === 'trail') {
            for (let j = i + 1; j < this.particles.length; j++) {
              const pt2 = this.particles[j];
              const dx = pt.x - pt2.x;
              const dy = pt.y - pt2.y;
              const distSq = dx * dx + dy * dy;

              if (distSq < 5625) {
                const distance = Math.sqrt(distSq);
                const alpha = p.map(distance, 0, 75, mode === 'trail' ? 220 : 160, 0);
                
                if (dynamic) {
                  p.stroke(pt.hue, 70, 90, alpha);
                } else {
                  p.colorMode(p.RGB, 255);
                  const fc = p.color(this.brushColor());
                  p.stroke(p.red(fc), p.green(fc), p.blue(fc), alpha);
                  p.colorMode(p.HSB, 360, 100, 100, 255);
                }

                p.strokeWeight(mode === 'trail' ? 0.8 : 0.5);
                p.line(renderX, renderY, pt2.x - width / 2, pt2.y - height / 2);
              }
            }
          }
        }

        if (isMouseInside) {
          const pulseRadius = bSize + Math.sin(waveTimer * 3) * 4;
          p.push();
          p.translate(mouseX, mouseY, 5);
          p.noFill();
          p.strokeWeight(1.5);
          if (dynamic) {
            p.stroke((waveTimer * 40) % 360, 80, 100, 200);
          } else {
            p.stroke(40, 80, 90, 200);
          }
          p.circle(0, 0, pulseRadius);
          p.pop();
        }
      };

      p.mousePressed = () => {
        const currentTool = this.selectedTool();
        const isMouseInside = p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height;

        if (!isMouseInside) return;

        this.ngZone.run(() => {
          if (currentTool === 'spawn') {
            for (let k = 0; k < 8; k++) {
              this.particles.push(this.createParticle(p.mouseX + (Math.random() - 0.5) * 20, p.mouseY + (Math.random() - 0.5) * 20));
            }
            this.particlesCount.set(this.particles.length);
          } else if (currentTool === 'explode') {
            const bSize = this.brushSize();
            const areaSq = (bSize * 2.5) * (bSize * 2.5);
            const mX = p.mouseX - p.width / 2;
            const mY = p.mouseY - p.height / 2;

            this.particles.forEach(pt => {
              const px = pt.x - p.width / 2;
              const py = pt.y - p.height / 2;
              const dx = px - mX;
              const dy = py - mY;
              const distSq = dx * dx + dy * dy;

              if (distSq < areaSq) {
                const dist = Math.sqrt(distSq) || 1;
                const impulse = 22 * (1 - dist / (bSize * 2.5));
                pt.vx += (dx / dist) * impulse;
                pt.vy += (dy / dist) * impulse;
              }
            });
          }
        });
      };
    };

    this.p5Instance = new p5(sketch);
  }
}