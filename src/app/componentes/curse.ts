import { Component, ElementRef, viewChild, AfterViewInit, OnDestroy, NgZone, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { environment } from '../../environments/environment';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { Navbar } from './navbar';

@Component({
  selector: 'app-land-scene',
  standalone: true,
  imports: [Navbar, CommonModule, MarkdownModule],
  template: `
    <app-navbar></app-navbar>
    <div class="faculties-container" #container>
      <app-navbar class="app-navbar-overlay"></app-navbar>
      <canvas #facultiesCanvas class="faculties-canvas" (click)="onCanvasClick($event)"></canvas>
      <div #labelRendererContainer class="label-renderer-container"></div>

      <!-- Modal for selected faculty item with markdown description -->
      @if (selectedFaculty()) {
        <div class="faculty-modal">
          <div class="modal-content">
            <h3>{{ selectedFaculty().name || selectedFaculty().title || 'Detalles de la Facultad' }}</h3>
            <div class="modal-body">
              <markdown [data]="selectedFaculty().description || selectedFaculty().content || 'No hay información disponible para esta facultad.'"></markdown>
            </div>
            <button (click)="closeModal()">Cerrar</button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .faculties-container {
      width: 100%;
      height: 100vh;
      position: relative;
      overflow: hidden;
    }
    .app-navbar-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 50;
      pointer-events: auto;
    }
    .faculties-canvas {
      width: 100%;
      height: 100%;
      display: block;
      cursor: pointer;
    }
    .label-renderer-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: hidden;
      z-index: 10;
    }
    ::ng-deep .faculty-label {
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(6px);
      color: #38bdf8;
      padding: 6px 12px;
      border-radius: 9999px;
      font-size: 13px;
      font-family: system-ui, sans-serif;
      font-weight: 500;
      white-space: nowrap;
      pointer-events: none;
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
      border: 1px solid rgba(56, 189, 248, 0.3);
      margin-top: -35px;
      transition: opacity 0.2s ease;
    }
    .faculty-modal {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(2, 6, 23, 0.75);
      backdrop-filter: blur(4px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100;
      pointer-events: auto;
    }
    .modal-content {
      background: #0f172a;
      border: 1px solid rgba(56, 189, 248, 0.2);
      color: #f8fafc;
      padding: 28px;
      border-radius: 16px;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
      font-family: system-ui, sans-serif;
    }
    .modal-content h3 {
      margin-top: 0;
      color: #38bdf8;
      font-size: 1.5rem;
    }
    .modal-body {
      margin: 20px 0;
      color: #94a3b8;
      line-height: 1.6;
    }
    .modal-content button {
      background: #38bdf8;
      color: #020617;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 10px;
      transition: background 0.2s ease;
    }
    .modal-content button:hover {
      background: #0ea5e9;
    }
  `]
})
export class Land implements AfterViewInit, OnDestroy {
  private canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('facultiesCanvas');
  private containerRef = viewChild.required<ElementRef<HTMLDivElement>>('container');
  private labelRendererContainerRef = viewChild.required<ElementRef<HTMLDivElement>>('labelRendererContainer');
  
  private ngZone = inject(NgZone);
  private http = inject(HttpClient);

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private labelRenderer!: CSS2DRenderer;
  private controls!: OrbitControls;
  private animationFrameId!: number;
  private resizeObserver!: ResizeObserver;

  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private facultyMeshes: THREE.Object3D[] = [];
  private infiniteLandTiles: THREE.Mesh[] = [];

  selectedFaculty = signal<any | null>(null);

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      this.initThree();
      this.fetchFacultiesAndCreateObjects();

      this.ngZone.runOutsideAngular(() => {
        this.animate();
      });
    }
  }

  private initThree(): void {
    const canvas = this.canvasRef().nativeElement;
    const container = this.containerRef().nativeElement;
    const labelContainer = this.labelRendererContainerRef().nativeElement;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x020617);
    this.scene.fog = new THREE.FogExp2(0x020617, 0.015);

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.set(4, 0.5, -4);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x38bdf8, 2);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.bias = -0.0001;
    this.scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x818cf8, 2, 15);
    pointLight.position.set(-5, 5, 3);
    this.scene.add(pointLight);

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(width, height);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    this.labelRenderer.domElement.style.pointerEvents = 'none';
    labelContainer.appendChild(this.labelRenderer.domElement);

    // Replaced flat plane with an infinite grid-based land layout (expanding landscape tiles)
    const tileSize = 40;
    const tileRange = 2; // Creates a 5x5 tile patch around origin giving the impression of infinite land

    const landMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.9,
      metalness: 0.1
    });

    for (let x = -tileRange; x <= tileRange; x++) {
      for (let z = -tileRange; z <= tileRange; z++) {
        const tileGeometry = new THREE.PlaneGeometry(tileSize, tileSize);
        const tile = new THREE.Mesh(tileGeometry, landMaterial);
        tile.rotation.x = -Math.PI / 2;
        tile.position.set(x * tileSize, -1.5, z * tileSize);
        tile.receiveShadow = true;
        this.scene.add(tile);
        this.infiniteLandTiles.push(tile);
      }
    }

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.05;

    this.resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          this.camera.aspect = width / height;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(width, height);
          this.labelRenderer.setSize(width, height);
        }
      }
    });
    this.resizeObserver.observe(container);
  }

  private fetchFacultiesAndCreateObjects(): void {
    const loader = new GLTFLoader();

    loader.load(
      'new.glb',
      (gltf) => {
        const centerModel = gltf.scene.clone();
        centerModel.position.set(0, 0, 0);
        centerModel.scale.set(4, 4, 4);

        centerModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            if ((child as THREE.Mesh).material) {
              const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
              if (material.isMeshStandardMaterial) {
                material.roughness = 0.25;
                material.metalness = 0.5;
              }
            }
          }
        });

        this.scene.add(centerModel);
        this.facultyMeshes.push(centerModel);
      },
      undefined,
      (error) => {
        console.error('Error cargando el modelo central del campus:', error);
      }
    );

    this.http.get<any[]>(`${environment.apiURL}/api/links/news`).subscribe({
      next: (faculties) => {
        if (!Array.isArray(faculties)) return;

        loader.load(
          'new.glb',
          (gltf) => {
            const totalItems = faculties.length;

            faculties.forEach((faculty, index) => {
              const modelClone = gltf.scene.clone();

              const angle = (index / totalItems) * Math.PI * 2;
              const radius = 4.2;
              modelClone.position.x = Math.cos(angle) * radius;
              modelClone.position.y = 0;
              modelClone.position.z = Math.sin(angle) * radius;

              modelClone.scale.set(1.2, 1.2, 1.2);

              modelClone.traverse((child) => {
                child.userData = { facultyData: faculty };
                if ((child as THREE.Mesh).isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;

                  if ((child as THREE.Mesh).material) {
                    const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
                    if (material.isMeshStandardMaterial) {
                      material.roughness = 0.3;
                      material.metalness = 0.2;
                    }
                  }
                }
              });

              const facultyName = faculty.name || faculty.title || `Facultad ${index + 1}`;
              const p = document.createElement('div');
              p.className = 'faculty-label';
              p.textContent = facultyName;
              
              const cDiv = new CSS2DObject(p);
              cDiv.position.set(0, 1.4, 0);
              modelClone.add(cDiv);

              this.scene.add(modelClone);
              this.facultyMeshes.push(modelClone);
            });
          },
          undefined,
          (error) => {
            console.error('Error cargando modelos de facultades, usando geometría alternativa:', error);
            this.createFallbackObjects(faculties);
          }
        );
      },
      error: (err) => {
        console.error('Error al conectar con la API de facultades', err);
        const fallbackFaculties = [{
          name: 'Facultad de Ingeniería',
          description: 'Facultad enfocada en innovación tecnológica, sistemas e investigación avanzada.'
        }];
        this.createFallbackObjects(fallbackFaculties);
      }
    });
  }

  private createFallbackObjects(faculties: any[]): void {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const totalItems = faculties.length;

    faculties.forEach((faculty, index) => {
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(`hsl(${(index * 360) / totalItems}, 70%, 55%)`),
        roughness: 0.3,
        metalness: 0.2
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const angle = (index / totalItems) * Math.PI * 2;
      const radius = 4.2;
      mesh.position.x = Math.cos(angle) * radius;
      mesh.position.y = 0;
      mesh.position.z = Math.sin(angle) * radius;

      mesh.userData = { facultyData: faculty };

      const facultyName = faculty.name || faculty.title || `Facultad ${index + 1}`;
      const p = document.createElement('div');
      p.className = 'faculty-label';
      p.textContent = facultyName;
      
      const cDiv = new CSS2DObject(p);
      cDiv.position.set(0, 1.0, 0);
      mesh.add(cDiv);

      this.scene.add(mesh);
      this.facultyMeshes.push(mesh);
    });
  }

  public onCanvasClick(event: MouseEvent): void {
    const canvas = this.canvasRef().nativeElement;
    const rect = canvas.getBoundingClientRect();

    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.facultyMeshes, true);

    if (intersects.length > 0) {
      let currentObj: THREE.Object3D | null = intersects[0].object;
      let facultyData = null;

      while (currentObj) {
        if (currentObj.userData && currentObj.userData['facultyData']) {
          facultyData = currentObj.userData['facultyData'];
          break;
        }
        currentObj = currentObj.parent;
      }

      if (facultyData) {
        this.ngZone.run(() => {
          this.selectedFaculty.set(facultyData);
        });
      }
    }
  }

  closeModal(): void {
    this.selectedFaculty.set(null);
  }

  private updateInfiniteLand(): void {
    const tileSize = 40;
    const cameraPos = this.camera.position;

    this.infiniteLandTiles.forEach((tile) => {
      const distX = cameraPos.x - tile.position.x;
      const distZ = cameraPos.z - tile.position.z;

      if (Math.abs(distX) > tileSize * 2.5) {
        tile.position.x += Math.sign(distX) * tileSize * 5;
      }
      if (Math.abs(distZ) > tileSize * 2.5) {
        tile.position.z += Math.sign(distZ) * tileSize * 5;
      }
    });
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    this.updateInfiniteLand();

    this.facultyMeshes.forEach((mesh, index) => {
      mesh.rotation.y += 0.004 * (index % 2 === 0 ? 1 : -1);
    });

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    this.controls?.dispose();
    this.renderer?.dispose();
  }
}