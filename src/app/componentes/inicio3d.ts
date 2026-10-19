import { Component, ElementRef, ViewChild, afterNextRender, OnDestroy, inject, NgZone } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { isAuth } from './auth';
import { WwwwwwComponent } from "./iniciofront";

@Component({
  selector: 'app-www',
  standalone: true,
  imports: [WwwwwwComponent],
  template: `
    <div class="landing-container">
      <canvas #canvasRef></canvas>
      
      <div class="footer-overlay">
        <app-wwwwww></app-wwwwww>
      </div>
    </div>
  `,
  styles: [`
    .landing-container {
      position: relative;
      width: 100%;
      min-height: 100vh;
      overflow-x: hidden;
      background: #fcfcfcff;
      font-family: system-ui, -apple-system, sans-serif;
    }
    canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
      z-index: 1;
    }
    .footer-overlay {
      position: absolute;
      top: 55.5%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      z-index: 10;
      pointer-events: auto;
    }
  `]
})
export class Wwww implements OnDestroy {
  @ViewChild('canvasRef', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  auth = isAuth();

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private loadedModel?: THREE.Object3D;
  private pmremGenerator?: THREE.PMREMGenerator;
  private clock = new THREE.Clock();

  private animationFrameId = 0;
  private ngZone = inject(NgZone);

  private mouseX = 0;
  private mouseY = 0;
  private targetX = 0;
  private targetY = 0;

  private boundOnResize = this.onWindowResize.bind(this);
  private boundOnMouseMove = this.onMouseMove.bind(this);

  constructor() {
    afterNextRender(() => {
      this.initScene();
    });
  }

  private initScene() {
    const canvas = this.canvasRef.nativeElement;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Escena y Cámara
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.z = 6;

    // Renderizador optimizado
    this.renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance' 
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;

    // OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    // Entorno de iluminación realista
    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = this.pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

    // Luces
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.1));

    const pointLight = new THREE.PointLight(0x38bdf8, 1.0);
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x818cf8, 3.0);
    pointLight2.position.set(-5, -5, 5);
    this.scene.add(pointLight2);

    // Carga del modelo GLB
    const loader = new GLTFLoader();
    loader.load(
      'new.glb',
      (gltf) => {
        this.loadedModel = gltf.scene;
        this.loadedModel.scale.set(8, 8, 8);
        this.loadedModel.position.set(0, -.3, 0);

        this.loadedModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (mesh.material) {
              const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
              
              materials.forEach((mat: any) => {
                if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
                  mat.transparent = true;

                  if (mat.isMeshPhysicalMaterial) {
                    mat.transmission = 0.8;
                    mat.roughness = 0.15;
                    mat.metalness = 0.1;
                    mat.ior = 1.5;
                  } else {
                    mat.roughness = 0.2;
                    mat.metalness = 0.4;
                  }

                  mat.envMapIntensity = 1.8;
                  if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace;
                  mat.needsUpdate = true;
                }
              });
            }
          }
        });

        this.scene.add(this.loadedModel);
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo GLB:', error);
      }
    );

    // Bucle de renderizado fuera de Angular Zone
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('resize', this.boundOnResize, { passive: true });
      window.addEventListener('mousemove', this.boundOnMouseMove, { passive: true });

      const animate = () => {
        this.animationFrameId = requestAnimationFrame(animate);

        const elapsedTime = this.clock.getElapsedTime();

        this.targetX += (this.mouseX - this.targetX) * 0.05;
        this.targetY += (this.mouseY - this.targetY) * 0.05;

        if (this.loadedModel) {
          this.loadedModel.rotation.x = this.targetY * 0.5 + elapsedTime * 0.3;
          this.loadedModel.rotation.y = this.targetX * 0.5 + elapsedTime * 0.5;
        }

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
      };
      animate();
    });
  }

  private onMouseMove(event: MouseEvent) {
    this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  private onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    window.removeEventListener('resize', this.boundOnResize);
    window.removeEventListener('mousemove', this.boundOnMouseMove);

    if (this.controls) {
      this.controls.dispose();
    }

    if (this.pmremGenerator) {
      this.pmremGenerator.dispose();
    }

    if (this.loadedModel) {
      this.scene.remove(this.loadedModel);
      this.loadedModel.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          
          if (mesh.material) {
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            materials.forEach((mat: any) => {
              for (const key of Object.keys(mat)) {
                const value = mat[key];
                if (value && typeof value === 'object' && 'dispose' in value && typeof value.dispose === 'function') {
                  value.dispose();
                }
              }
              mat.dispose();
            });
          }
        }
      });
    }

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
    }
  }
}