import { Component, ElementRef, AfterViewInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Canvas, Rect, Circle, Triangle, Polygon, Line, FabricText, FabricImage, FabricObject } from 'fabric';
import { Navbar } from './navbar';

@Component({
  selector: 'app-fabric-editor',
  standalone: true,
  imports: [Navbar],
  styles: [`
    .canvas-wrapper {
      position: relative;
      border-radius: 0.35rem;
      overflow: hidden;
      border: 1px solid #ced4da;
      background-color: #f8f9fa;
      background-image: radial-gradient(#adb5bd 1px, transparent 1px);
      background-size: 16px 16px;
    }
    .toolbar-title {
      font-size: 0.7rem;
      font-weight: 700;
      color: #6c757d;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    /* Clases de utilidad para gap compatibles con Bootstrap 4 */
    .gap-2 { gap: 8px; }
    .gap-3 { gap: 12px; }
  `],
  template: `
    <!-- CONTENEDOR PRINCIPAL PARA FULLSCREEN -->
    <div #fullscreenContainer class="bg-white" style="min-height: 100vh;">
      <app-navbar></app-navbar>
      <div class="py-5"></div>

      <div class="container bg-white p-4 rounded shadow-sm border">
        
        <!-- BARRA SUPERIOR: Insertar Elementos y Atributos -->
        <div class="d-flex flex-wrap align-items-center justify-content-between bg-light p-3 rounded border mb-3 gap-3">
          <div class="d-flex flex-wrap align-items-center gap-2">
            <span class="toolbar-title">Insertar:</span>
            <button class="btn btn-primary btn-sm d-inline-flex align-items-center gap-2" (click)="addShape('rect')"><i class="bi bi-square-fill"></i> Rectángulo</button>
            <button class="btn btn-success btn-sm d-inline-flex align-items-center gap-2" (click)="addShape('circle')"><i class="bi bi-circle-fill"></i> Círculo</button>
            <button class="btn btn-warning btn-sm text-white d-inline-flex align-items-center gap-2" (click)="addShape('triangle')"><i class="bi bi-triangle-fill"></i> Triángulo</button>
            <button class="btn btn-info btn-sm text-white d-inline-flex align-items-center gap-2" (click)="addShape('star')"><i class="bi bi-star-fill"></i> Estrella</button>
            <button class="btn btn-secondary btn-sm d-inline-flex align-items-center gap-2" (click)="addShape('line')"><i class="bi bi-dash-lg"></i> Línea</button>
            <button class="btn btn-dark btn-sm d-inline-flex align-items-center gap-2" (click)="addShape('text')"><i class="bi bi-type"></i> Texto</button>
            <button class="btn btn-danger btn-sm d-inline-flex align-items-center gap-2" (click)="fileInput.click()"><i class="bi bi-image"></i> Imagen</button>
            <input #fileInput type="file" accept="image/*" (change)="onFileSelected($event)" class="d-none">
          </div>

          <div class="d-flex align-items-center gap-3">
            <div class="d-flex align-items-center gap-2">
              <label class="small font-weight-bold text-muted mb-0">Color:</label>
              <input type="color" class="form-control form-control-sm p-1" style="width: 34px; height: 32px; cursor: pointer;" (change)="changeColor($event)" title="Cambiar color">
            </div>

            @if (selectedTextObject) {
              <input type="text" class="form-control form-control-sm" [value]="selectedTextObject.text" (input)="updateTextContent($event)" placeholder="Texto..." style="width: 140px;">
            }

            <!-- BOTÓN DE PANTALLA COMPLETA -->
            <button class="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-2" (click)="toggleFullScreen()" [title]="isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'">
              <i class="bi" [class.bi-fullscreen]="!isFullscreen" [class.bi-fullscreen-exit]="isFullscreen"></i>
              <span class="d-none d-md-inline">{{ isFullscreen ? 'Restaurar' : 'Pantalla Completa' }}</span>
            </button>
          </div>
        </div>

        <!-- FILA CENTRAL: Canvas y Barra Lateral Derecha -->
        <div class="row align-items-start">
          
          <!-- Canvas al centro -->
          <div class="col d-flex justify-content-center mb-3 mb-md-0">
            <div class="canvas-wrapper shadow-sm">
              <canvas #htmlCanvas width="720" height="420"></canvas>
            </div>
          </div>

          <!-- Barra Lateral Derecha: Edición de Objeto -->
          <div class="col-auto">
            <div class="d-flex flex-column bg-light p-3 rounded border gap-2" style="width: 165px;">
              <span class="toolbar-title mb-1">Edición</span>
              <button class="btn btn-outline-secondary btn-sm text-left d-flex align-items-center gap-2" (click)="duplicateSelected()"><i class="bi bi-files"></i> Duplicar</button>
              <button class="btn btn-outline-secondary btn-sm text-left d-flex align-items-center gap-2" (click)="rotateObject(45)"><i class="bi bi-arrow-clockwise"></i> Girar 45°</button>
              <button class="btn btn-outline-secondary btn-sm text-left d-flex align-items-center gap-2" (click)="centerHorizontal()"><i class="bi bi-align-center"></i> Centrar H.</button>
              <button class="btn btn-outline-secondary btn-sm text-left d-flex align-items-center gap-2" (click)="toggleLock()"><i class="bi bi-lock-fill"></i> Bloquear</button>
              <button class="btn btn-outline-secondary btn-sm text-left d-flex align-items-center gap-2" (click)="moveLayer('forward')"><i class="bi bi-layer-forward"></i> Al frente</button>
              <button class="btn btn-outline-danger btn-sm text-left d-flex align-items-center gap-2" (click)="deleteSelected()"><i class="bi bi-trash3"></i> Borrar</button>
            </div>
          </div>

        </div>

        <!-- BARRA INFERIOR: Exportar y Guardar Proyecto -->
        <div class="d-flex flex-wrap align-items-center justify-content-between bg-light p-3 rounded border mt-3 gap-2">
          <div class="d-flex flex-wrap align-items-center gap-2">
            <span class="toolbar-title">Proyecto / Exportación:</span>
            <button class="btn btn-outline-dark btn-sm d-inline-flex align-items-center gap-2" (click)="exportAsPNG()"><i class="bi bi-file-earmark-image"></i> PNG</button>
            <button class="btn btn-outline-dark btn-sm d-inline-flex align-items-center gap-2" (click)="exportAsSVG()"><i class="bi bi-filetype-svg"></i> SVG</button>
            <button class="btn btn-outline-dark btn-sm d-inline-flex align-items-center gap-2" (click)="exportAsPDF()"><i class="bi bi-file-earmark-pdf"></i> PDF</button>
            <button class="btn btn-outline-dark btn-sm d-inline-flex align-items-center gap-2" (click)="saveAsJSON()"><i class="bi bi-floppy"></i> Guardar</button>
            <button class="btn btn-outline-dark btn-sm d-inline-flex align-items-center gap-2" (click)="loadFromJSON()" [disabled]="!savedJsonProject"><i class="bi bi-folder2-open"></i> Cargar</button>
          </div>
          
          <button class="btn btn-outline-danger btn-sm d-inline-flex align-items-center gap-2" (click)="clearCanvas()"><i class="bi bi-x-circle"></i> Limpiar Todo</button>
        </div>

      </div>
    </div>
  `
})
export class FabricEditorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('htmlCanvas') private htmlCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fullscreenContainer', { static: true }) private fullscreenContainerRef!: ElementRef<HTMLDivElement>;

  private canvas!: Canvas;
  public savedJsonProject = '';
  public selectedTextObject: FabricText | null = null;
  public isFullscreen = false;

  ngAfterViewInit(): void {
    this.canvas = new Canvas(this.htmlCanvas.nativeElement, { backgroundColor: '#ffffff' });

    this.canvas.on('selection:created', (e) => this.checkSelectedObject(e.selected[0]));
    this.canvas.on('selection:updated', (e) => this.checkSelectedObject(e.selected[0]));
    this.canvas.on('selection:cleared', () => { this.selectedTextObject = null; });
  }

  ngOnDestroy(): void {
    if (this.canvas) this.canvas.dispose();
  }

  @HostListener('document:fullscreenchange')
  public onFullScreenChange(): void {
    this.isFullscreen = !!document.fullscreenElement;
  }

  public toggleFullScreen(): void {
    const elem = this.fullscreenContainerRef.nativeElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        console.error(`Error al intentar activar pantalla completa: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  private checkSelectedObject(obj: FabricObject): void {
    this.selectedTextObject = obj instanceof FabricText ? obj : null;
  }

  public updateTextContent(event: Event): void {
    if (!this.selectedTextObject) return;
    this.selectedTextObject.set({ text: (event.target as HTMLInputElement).value });
    this.canvas.requestRenderAll();
  }

  private addObject(obj: FabricObject): void {
    if (!this.canvas) return;
    this.canvas.add(obj);
    this.canvas.setActiveObject(obj);
    this.checkSelectedObject(obj);
    this.canvas.requestRenderAll();
  }

  public addShape(type: 'rect' | 'circle' | 'triangle' | 'star' | 'line' | 'text'): void {
    let shape: FabricObject | null = null;
    switch (type) {
      case 'rect':
        shape = new Rect({ left: 100, top: 100, fill: '#007bff', width: 120, height: 70, rx: 6, ry: 6 });
        break;
      case 'circle':
        shape = new Circle({ left: 200, top: 120, radius: 50, fill: '#28a745' });
        break;
      case 'triangle':
        shape = new Triangle({ left: 250, top: 150, width: 90, height: 90, fill: '#ffc107' });
        break;
      case 'star':
        const starPoints = [
          { x: 50, y: 0 }, { x: 65, y: 35 }, { x: 100, y: 35 },
          { x: 72, y: 55 }, { x: 82, y: 90 }, { x: 50, y: 70 },
          { x: 18, y: 90 }, { x: 28, y: 55 }, { x: 0, y: 35 }, { x: 35, y: 35 }
        ];
        shape = new Polygon(starPoints, { left: 180, top: 180, fill: '#17a2b8', objectCaching: false });
        break;
      case 'line':
        shape = new Line([50, 50, 200, 50], { left: 150, top: 200, stroke: '#6c757d', strokeWidth: 4 });
        break;
      case 'text':
        shape = new FabricText('¡Hola Bootstrap 4!', { left: 150, top: 220, fontSize: 24, fill: '#343a40', fontFamily: 'system-ui' });
        break;
    }
    if (shape) this.addObject(shape);
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const imageUrl = e.target?.result as string;
        if (imageUrl) {
          FabricImage.fromURL(imageUrl).then((img) => {
            img.scaleToWidth(180);
            img.set({ left: 150, top: 150 });
            this.addObject(img);
          });
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  public changeColor(event: Event): void {
    const activeObj = this.canvas?.getActiveObject();
    if (!activeObj) return;
    activeObj.set('fill', (event.target as HTMLInputElement).value);
    this.canvas.requestRenderAll();
  }

  public duplicateSelected(): void {
    const activeObj = this.canvas?.getActiveObject();
    if (!activeObj) return;
    activeObj.clone().then((cloned: FabricObject) => {
      cloned.set({ left: (activeObj.left || 0) + 25, top: (activeObj.top || 0) + 25 });
      this.addObject(cloned);
    });
  }

  public rotateObject(angleChange: number): void {
    const activeObj = this.canvas?.getActiveObject();
    if (!activeObj) return;
    activeObj.rotate((activeObj.angle || 0) + angleChange);
    this.canvas.requestRenderAll();
  }

  public centerHorizontal(): void {
    const activeObj = this.canvas?.getActiveObject();
    if (!activeObj || !this.canvas) return;
    this.canvas.centerObjectH(activeObj);
    activeObj.setCoords();
    this.canvas.requestRenderAll();
  }

  public toggleLock(): void {
    const activeObj = this.canvas?.getActiveObject();
    if (!activeObj) return;
    const isLocked = activeObj.lockMovementX;
    activeObj.set({
      lockMovementX: !isLocked, lockMovementY: !isLocked,
      lockScalingX: !isLocked, lockScalingY: !isLocked,
      lockRotation: !isLocked, hasControls: isLocked
    });
    this.canvas.requestRenderAll();
  }

  public moveLayer(direction: 'forward' | 'backward'): void {
    const activeObj = this.canvas?.getActiveObject();
    if (!activeObj) return;
    if (direction === 'forward') {
      this.canvas.bringObjectForward(activeObj);
    } else {
      this.canvas.sendObjectBackwards(activeObj);
    }
    this.canvas.requestRenderAll();
  }

  public deleteSelected(): void {
    const activeObj = this.canvas?.getActiveObject();
    if (activeObj) {
      this.canvas.remove(activeObj);
      this.canvas.discardActiveObject();
      this.selectedTextObject = null;
      this.canvas.requestRenderAll();
    }
  }

  public exportAsPNG(): void {
    if (!this.canvas) return;
    const link = document.createElement('a');
    link.href = this.canvas.toDataURL({ format: 'png', quality: 1, multiplier: 1 });
    link.download = 'diseno-canvas.png';
    link.click();
  }

  public exportAsSVG(): void {
    if (!this.canvas) return;
    const blob = new Blob([this.canvas.toSVG()], { type: 'image/svg+xml;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'diseno-canvas.svg';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  public exportAsPDF(): void {
    if (!this.canvas) return;
    const dataURL = this.canvas.toDataURL({ format: 'png', quality: 1, multiplier: 2 });
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html><head><title>Exportar PDF</title><style>
        body{margin:0;display:flex;justify-content:center;align-items:center;height:100vh;background:#fff}
        img{max-width:100%;height:auto;box-shadow:0 0 10px rgba(0,0,0,0.1)}
        </style></head><body><img src="${dataURL}" onload="window.print();window.close();"/></body></html>
      `);
      printWindow.document.close();
    }
  }

  public saveAsJSON(): void {
    if (!this.canvas) return;
    this.savedJsonProject = JSON.stringify(this.canvas.toJSON());
    alert('¡Proyecto guardado con éxito!');
  }

  public loadFromJSON(): void {
    if (!this.savedJsonProject || !this.canvas) return;
    this.canvas.loadFromJSON(this.savedJsonProject).then(() => {
      this.canvas.requestRenderAll();
      alert('¡Proyecto cargado con éxito!');
    });
  }

  public clearCanvas(): void {
    if (confirm('¿Estás seguro de que deseas limpiar el lienzo?')) {
      this.canvas.clear();
      this.canvas.backgroundColor = '#ffffff';
      this.selectedTextObject = null;
      this.canvas.renderAll();
    }
  }
}