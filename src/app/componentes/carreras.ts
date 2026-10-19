import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  NgZone,
  ChangeDetectionStrategy
} from '@angular/core';
import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Navbar } from './navbar';

@Component({
  selector: 'app-ply-viewer',
  standalone: true,
  imports: [Navbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <app-navbar></app-navbar>
    <div class="viewer-container" #canvasContainer></div>
  `,
  styles: [`
    .viewer-container {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      margin: 0;
      background-color: #1a1a1a;
    }
    /* Estilo opcional para acomodar lil-gui de forma limpia */
    :host ::ng-deep .lil-gui {
      --background-color: rgba(20, 20, 20, 0.9);
      --text-color: #fff;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    }
  `]
})
export class PlyViewerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef<HTMLDivElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private spotLight!: THREE.SpotLight;
  private controls!: OrbitControls;
  private gui!: GUI;
  private animationFrameId: number | null = null;
  private resizeListener = () => this.onWindowResize();

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initThreeJS();
    });
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.resizeListener);
    
    if (this.gui) {
      this.gui.destroy();
    }

    this.controls?.dispose();
    this.renderer?.dispose();
    if (this.renderer?.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }

  private initThreeJS(): void {
    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    
    // En Angular moderno, es mejor usar animationLoop o requestAnimationFrame dentro del contenedor
    this.renderer.setAnimationLoop(() => this.animate());
    container.appendChild(this.renderer.domElement);

    this.renderer.toneMapping = THREE.NeutralToneMapping;
    this.renderer.toneMappingExposure = 1;

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    this.camera.position.set(7, 4, 1);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 2;
    this.controls.maxDistance = 10;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.target.set(0, 1, 0);
    this.controls.update();

    // Textures
    // Nota: Asegúrate de que la carpeta 'textures/' esté accesible en tu carpeta 'public' o 'assets'
    const loader = new THREE.TextureLoader().setPath('/');
    const filenames = ['www3.svg', 'disturb.jpg', 'www1.svg'];
    const textures: { [key: string]: THREE.Texture | null } = { none: null };

    for (let i = 0; i < filenames.length; i++) {
      const filename = filenames[i];
      const texture = loader.load(filename);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      texture.colorSpace = THREE.SRGBColorSpace;
      textures[filename] = texture;
    }

    // Lights
    const ambient = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 0.25);
    this.scene.add(ambient);

    this.spotLight = new THREE.SpotLight(0xffffff, 300);
    this.spotLight.name = 'spotLight';
    this.spotLight.map = textures['www3.svg']!;
    this.spotLight.position.set(2.5, 5, 2.5);
    this.spotLight.angle = Math.PI / 6;
    this.spotLight.penumbra = 1;
    this.spotLight.decay = 2;
    this.spotLight.distance = 0;

    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.width = 1024;
    this.spotLight.shadow.mapSize.height = 1024;
    this.spotLight.shadow.camera.near = 2;
    this.spotLight.shadow.camera.far = 10;
    this.spotLight.shadow.focus = 1;
    this.spotLight.shadow.bias = -0.003;
    this.spotLight.shadow.intensity = .8;
    this.scene.add(this.spotLight);

    // Helpers añadidos de forma segura al SpotLight con tipado dinámico
    const slAny = this.spotLight as any;
    slAny.lightHelper = new THREE.SpotLightHelper(this.spotLight);
    slAny.lightHelper.visible = false;
    this.scene.add(slAny.lightHelper);

    slAny.shadowCameraHelper = new THREE.CameraHelper(this.spotLight.shadow.camera);
    slAny.shadowCameraHelper.visible = false;
    this.scene.add(slAny.shadowCameraHelper);

    // Plane Geometry
    const geometry = new THREE.PlaneGeometry(10, 10);
    const material = new THREE.MeshLambertMaterial({ color: 0xbcbcbc });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, -1, 0);
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    this.scene.add(mesh);

    // Model (PLY)
    // Nota: Asegúrate de tener el archivo en 'models/ply/binary/Lucy100k.ply'
    new PLYLoader().load('/fractal.ply', (geometry) => {
      geometry.scale(.8, .8, .8);
      geometry.computeVertexNormals();

      const modelMaterial = new THREE.MeshLambertMaterial();
      const modelMesh = new THREE.Mesh(geometry, modelMaterial);
      modelMesh.rotation.z = Math.PI / 2;
      modelMesh.position.y = 0.8;
      modelMesh.castShadow = true;
      modelMesh.receiveShadow = true;
      this.scene.add(modelMesh);
    });

    // Window Resize Event
    window.addEventListener('resize', this.resizeListener);

    // GUI Setup
    this.gui = new GUI();
    const params = {
      map: textures['www3.svg'],
      color: this.spotLight.color.getHex(),
      intensity: this.spotLight.intensity,
      distance: this.spotLight.distance,
      angle: this.spotLight.angle,
      penumbra: this.spotLight.penumbra,
      decay: this.spotLight.decay,
      focus: this.spotLight.shadow.focus,
      shadowIntensity: this.spotLight.shadow.intensity,
      helpers: false
    };

    this.gui.add(params, 'map', textures).onChange((val: any) => {
      this.spotLight.map = val;
    });

    this.gui.addColor(params, 'color').onChange((val: number) => {
      this.spotLight.color.setHex(val);
    });

    this.gui.add(params, 'intensity', 0, 500).onChange((val: number) => {
      this.spotLight.intensity = val;
    });

    this.gui.add(params, 'distance', 0, 20).onChange((val: number) => {
      this.spotLight.distance = val;
    });

    this.gui.add(params, 'angle', 0, Math.PI / 3).onChange((val: number) => {
      this.spotLight.angle = val;
    });

    this.gui.add(params, 'penumbra', 0, 1).onChange((val: number) => {
      this.spotLight.penumbra = val;
    });

    this.gui.add(params, 'decay', 1, 2).onChange((val: number) => {
      this.spotLight.decay = val;
    });

    this.gui.add(params, 'focus', 0, 1).onChange((val: number) => {
      this.spotLight.shadow.focus = val;
    });

    this.gui.add(params, 'shadowIntensity', 0, 1).onChange((val: number) => {
      this.spotLight.shadow.intensity = val;
    });

    this.gui.add(params, 'helpers').onChange((val: boolean) => {
      slAny.lightHelper.visible = val;
      slAny.shadowCameraHelper.visible = val;
    });

    this.gui.open();
  }

  private onWindowResize(): void {
    if (!this.canvasContainer) return;
    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private animate(): void {
    const time = performance.now() / 3000;

    this.spotLight.position.x = Math.cos(time) * 2.5;
    this.spotLight.position.z = Math.sin(time) * 2.5;

    const slAny = this.spotLight as any;
    if (slAny.lightHelper) {
      slAny.lightHelper.update();
    }

    this.renderer.render(this.scene, this.camera);
  }
}