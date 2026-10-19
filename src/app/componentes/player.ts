import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  NgZone,
  ChangeDetectionStrategy,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Octree } from 'three/addons/math/Octree.js';
import { OctreeHelper } from 'three/addons/helpers/OctreeHelper.js';
import { Capsule } from 'three/addons/math/Capsule.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { Navbar } from './navbar';

@Component({
  selector: 'app-fps-game',
  standalone: true,
  imports: [CommonModule, Navbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    
    <div class="game-container" #container>
      <app-navbar></app-navbar>
      <!-- Pantalla de carga -->
      @if (isLoading()) {
        <div class="loading-overlay">
          <div class="loader-card">
            <h2>Cargando Escenario 3D...</h2>
            <div class="progress-bar-container">
              <div class="progress-bar" [style.width.%]="loadingProgress()"></div>
            </div>
            <p>{{ loadingProgress() }}%</p>
          </div>
        </div>
      }

      <!-- HUD / Mira -->
      <div class="crosshair" [class.hidden]="isLoading()">+</div>

      <!-- Instrucciones / Menú de pausa -->
      <div class="instructions" [class.hidden]="isLocked()" (click)="requestPointerLock()">
        <h1>Juego FPS con Octree</h1>
        <p>Haz clic aquí para <strong>Comenzar / Jugar</strong></p>
        <ul class="controls-list">
          <li><strong>W, A, S, D</strong> : Moverse</li>
          <li><strong>ESPACIO</strong> : Saltar</li>
          <li><strong>CLIC IZQ</strong> : Lanzar esfera (mantén presionado para fuerza)</li>
          <li><strong>ESC</strong> : Liberar cursor / Pausa</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .game-container {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background-color: #88ccee;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      user-select: none;
    }
    .crosshair {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: rgba(255, 255, 255, 0.9);
      font-size: 24px;
      font-weight: bold;
      pointer-events: none;
      z-index: 10;
      transition: opacity 0.3s;
    }
    .crosshair.hidden {
      opacity: 0;
    }
    .instructions {
      position: absolute;
      bottom: 20px;
      left: 20px;
      background: rgba(0, 0, 0, 0.8);
      color: #fff;
      padding: 20px;
      border-radius: 12px;
      cursor: pointer;
      z-index: 20;
      box-shadow: 0 8px 25px rgba(0,0,0,0.6);
      border: 1px solid rgba(255,255,255,0.2);
      transition: opacity 0.3s, background 0.3s;
    }
    .instructions.hidden {
      opacity: 0;
      pointer-events: none;
    }
    .instructions:hover {
      background: rgba(0, 0, 0, 0.9);
    }
    .instructions h1 {
      margin-top: 0;
      font-size: 1.3rem;
      color: #88ccee;
    }
    .controls-list {
      margin: 10px 0 0 0;
      padding-left: 20px;
      font-size: 0.9rem;
      color: #ddd;
    }
    .controls-list li {
      margin-bottom: 5px;
    }
    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #111;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100;
      color: white;
    }
    .loader-card {
      background: #222;
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      width: 320px;
      border: 1px solid #444;
      box-shadow: 0 10px 30px rgba(0,0,0,0.8);
    }
    .loader-card h2 {
      margin-top: 0;
      font-size: 1.1rem;
      color: #88ccee;
    }
    .progress-bar-container {
      width: 100%;
      background: #444;
      height: 10px;
      border-radius: 5px;
      overflow: hidden;
      margin: 15px 0 5px 0;
    }
    .progress-bar {
      height: 100%;
      background: #88ccee;
      width: 0%;
      transition: width 0.1s linear;
    }
  `]
})
export class FpsGameComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  // Signals para UI reactiva moderna de Angular 21
  public isLoading = signal(true);
  public loadingProgress = signal(0);
  public isLocked = signal(false);

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private stats!: Stats;
  private gui!: GUI;

  // Listeners
  private boundKeyDown = (e: KeyboardEvent) => this.onKeyDown(e);
  private boundKeyUp = (e: KeyboardEvent) => this.onKeyUp(e);
  private boundMouseDown = () => this.onMouseDown();
  private boundMouseUp = () => this.onMouseUp();
  private boundMouseMove = (e: MouseEvent) => this.onMouseMove(e);
  private boundResize = () => this.onWindowResize();
  private boundPointerLockChange = () => this.onPointerLockChange();

  private keyStates: { [key: string]: boolean } = {};
  private playerCollider!: Capsule;
  private playerVelocity = new THREE.Vector3();
  private playerDirection = new THREE.Vector3();
  private playerOnFloor = false;
  private mouseTime = 0;
  private worldOctree = new Octree();
  private spheres: Array<{ mesh: THREE.Mesh; collider: THREE.Sphere; velocity: THREE.Vector3 }> = [];
  private sphereIdx = 0;
  private timer = new THREE.Timer();

  private vector1 = new THREE.Vector3();
  private vector2 = new THREE.Vector3();
  private vector3 = new THREE.Vector3();
  private STEPS_PER_FRAME = 5;
  private GRAVITY = 30;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initGame();
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.boundKeyDown);
    document.removeEventListener('keyup', this.boundKeyUp);
    window.removeEventListener('resize', this.boundResize);
    document.removeEventListener('mousemove', this.boundMouseMove);
    document.removeEventListener('pointerlockchange', this.boundPointerLockChange);

    if (this.gui) {
      this.gui.destroy();
    }
    if (this.stats && this.stats.domElement.parentNode) {
      this.stats.domElement.parentNode.removeChild(this.stats.domElement);
    }

    this.renderer?.dispose();
    if (this.renderer?.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }

  public requestPointerLock(): void {
    const container = this.containerRef.nativeElement;
    container.requestPointerLock();
  }

  private onPointerLockChange(): void {
    this.ngZone.run(() => {
      const locked = document.pointerLockElement === this.containerRef.nativeElement;
      this.isLocked.set(locked);
    });
  }

  private initGame(): void {
    const container = this.containerRef.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.timer.connect(document);

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x88ccee);
    this.scene.fog = new THREE.Fog(0x88ccee, 0, 50);

    // Camera
    this.camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
    this.camera.rotation.order = 'YXZ';

    // Lights
    const fillLight1 = new THREE.HemisphereLight(0x8dc1de, 0x00668d, 1.5);
    fillLight1.position.set(2, 1, 1);
    this.scene.add(fillLight1);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight.position.set(-5, 25, -1);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0.01;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.right = 30;
    directionalLight.shadow.camera.left = -30;
    directionalLight.shadow.camera.top = 30;
    directionalLight.shadow.camera.bottom = -30;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.radius = 4;
    directionalLight.shadow.bias = -0.00006;
    this.scene.add(directionalLight);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.renderer.setAnimationLoop(() => this.animate());
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.VSMShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(this.renderer.domElement);

    // Stats
    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.bottom = '0px';
    container.appendChild(this.stats.domElement);

    // Spheres initialization
    const NUM_SPHERES = 100;
    const SPHERE_RADIUS = 0.2;
    const sphereGeometry = new THREE.IcosahedronGeometry(SPHERE_RADIUS, 5);
    const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xdede8d });

    for (let i = 0; i < NUM_SPHERES; i++) {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      this.scene.add(sphere);

      this.spheres.push({
        mesh: sphere,
        collider: new THREE.Sphere(new THREE.Vector3(0, -100, 0), SPHERE_RADIUS),
        velocity: new THREE.Vector3()
      });
    }

    this.playerCollider = new Capsule(
      new THREE.Vector3(0, 0.35, 0),
      new THREE.Vector3(0, 1, 0),
      0.35
    );

    // Event Listeners
    document.addEventListener('keydown', this.boundKeyDown);
    document.addEventListener('keyup', this.boundKeyUp);
    container.addEventListener('mousedown', this.boundMouseDown);
    document.addEventListener('mouseup', this.boundMouseUp);
    document.addEventListener('mousemove', this.boundMouseMove);
    window.addEventListener('resize', this.boundResize);
    document.addEventListener('pointerlockchange', this.boundPointerLockChange);

    // Load World (GLTF) con barra de progreso
    const loader = new GLTFLoader().setPath('/');
    loader.load(
      'collisionworld.glb',
      (gltf) => {
        this.scene.add(gltf.scene);
        this.worldOctree.fromGraphNode(gltf.scene);

        gltf.scene.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material.map) {
              child.material.map.anisotropy = 4;
            }
          }
        });

        const helper = new OctreeHelper(this.worldOctree);
        helper.visible = false;
        this.scene.add(helper);

        this.gui = new GUI({ width: 200 });
        this.gui.add({ debug: false }, 'debug').onChange((value: boolean) => {
          helper.visible = value;
        });

        // Ocultar pantalla de carga de manera reactiva
        this.ngZone.run(() => {
          this.isLoading.set(false);
        });
      },
      (xhr) => {
        if (xhr.lengthComputable) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          this.ngZone.run(() => {
            this.loadingProgress.set(percent);
          });
        }
      },
      (error) => {
        console.error('Error cargando el modelo GLB:', error);
      }
    );
  }

  private onKeyDown(event: KeyboardEvent): void {
    this.keyStates[event.code] = true;
  }

  private onKeyUp(event: KeyboardEvent): void {
    this.keyStates[event.code] = false;
  }

  private onMouseDown(): void {
    this.mouseTime = performance.now();
  }

  private onMouseUp(): void {
    if (document.pointerLockElement !== null) {
      this.throwBall();
    }
  }

  private onMouseMove(event: MouseEvent): void {
    if (document.pointerLockElement === this.containerRef.nativeElement) {
      this.camera.rotation.y -= event.movementX / 500;
      
      // Limitar la rotación vertical para evitar voltear la cámara (Gimlock Protection)
      const pitchLimit = Math.PI / 2 - 0.05;
      this.camera.rotation.x -= event.movementY / 500;
      this.camera.rotation.x = Math.max(-pitchLimit, Math.min(pitchLimit, this.camera.rotation.x));
    }
  }

  private onWindowResize(): void {
    if (!this.containerRef) return;
    const container = this.containerRef.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private throwBall(): void {
    const sphere = this.spheres[this.sphereIdx];
    this.camera.getWorldDirection(this.playerDirection);
    sphere.collider.center
      .copy(this.playerCollider.end)
      .addScaledVector(this.playerDirection, this.playerCollider.radius * 1.5);

    const impulse = 15 + 30 * (1 - Math.exp((this.mouseTime - performance.now()) * 0.001));
    sphere.velocity.copy(this.playerDirection).multiplyScalar(impulse);
    sphere.velocity.addScaledVector(this.playerVelocity, 2);

    this.sphereIdx = (this.sphereIdx + 1) % this.spheres.length;
  }

  private playerCollisions(): void {
    const result = this.worldOctree.capsuleIntersect(this.playerCollider);
    this.playerOnFloor = false;

    if (result) {
      this.playerOnFloor = result.normal.y >= 0.15;
      if (!this.playerOnFloor) {
        this.playerVelocity.addScaledVector(result.normal, -result.normal.dot(this.playerVelocity));
      }
      if (result.depth >= 1e-10) {
        this.playerCollider.translate(result.normal.multiplyScalar(result.depth));
      }
    }
  }

  private updatePlayer(deltaTime: number): void {
    let damping = Math.exp(-4 * deltaTime) - 1;

    if (!this.playerOnFloor) {
      this.playerVelocity.y -= this.GRAVITY * deltaTime;
      damping *= 0.1;
    }

    this.playerVelocity.addScaledVector(this.playerVelocity, damping);
    const deltaPosition = this.playerVelocity.clone().multiplyScalar(deltaTime);
    this.playerCollider.translate(deltaPosition);

    this.playerCollisions();
    this.camera.position.copy(this.playerCollider.end);
  }

  private playerSphereCollision(sphere: any): void {
    const center = this.vector1
      .addVectors(this.playerCollider.start, this.playerCollider.end)
      .multiplyScalar(0.5);
    const sphere_center = sphere.collider.center;
    const r = this.playerCollider.radius + sphere.collider.radius;
    const r2 = r * r;

    for (const point of [this.playerCollider.start, this.playerCollider.end, center]) {
      const d2 = point.distanceToSquared(sphere_center);
      if (d2 < r2) {
        const normal = this.vector1.subVectors(point, sphere_center).normalize();
        const v1 = this.vector2.copy(normal).multiplyScalar(normal.dot(this.playerVelocity));
        const v2 = this.vector3.copy(normal).multiplyScalar(normal.dot(sphere.velocity));

        this.playerVelocity.add(v2).sub(v1);
        sphere.velocity.add(v1).sub(v2);

        const d = (r - Math.sqrt(d2)) / 2;
        sphere_center.addScaledVector(normal, -d);
      }
    }
  }

  private spheresCollisions(): void {
    for (let i = 0, length = this.spheres.length; i < length; i++) {
      const s1 = this.spheres[i];
      for (let j = i + 1; j < length; j++) {
        const s2 = this.spheres[j];
        const d2 = s1.collider.center.distanceToSquared(s2.collider.center);
        const r = s1.collider.radius + s2.collider.radius;
        const r2 = r * r;

        if (d2 < r2) {
          const normal = this.vector1.subVectors(s1.collider.center, s2.collider.center).normalize();
          const v1 = this.vector2.copy(normal).multiplyScalar(normal.dot(s1.velocity));
          const v2 = this.vector3.copy(normal).multiplyScalar(normal.dot(s2.velocity));

          s1.velocity.add(v2).sub(v1);
          s2.velocity.add(v1).sub(v2);

          const d = (r - Math.sqrt(d2)) / 2;
          s1.collider.center.addScaledVector(normal, d);
          s2.collider.center.addScaledVector(normal, -d);
        }
      }
    }
  }

  private updateSpheres(deltaTime: number): void {
    this.spheres.forEach((sphere) => {
      sphere.collider.center.addScaledVector(sphere.velocity, deltaTime);
      const result = this.worldOctree.sphereIntersect(sphere.collider);

      if (result) {
        sphere.velocity.addScaledVector(
          result.normal,
          -result.normal.dot(sphere.velocity) * 1.5
        );
        sphere.collider.center.add(result.normal.multiplyScalar(result.depth));
      } else {
        sphere.velocity.y -= this.GRAVITY * deltaTime;
      }

      const damping = Math.exp(-1.5 * deltaTime) - 1;
      sphere.velocity.addScaledVector(sphere.velocity, damping);

      this.playerSphereCollision(sphere);
    });

    this.spheresCollisions();

    for (const sphere of this.spheres) {
      sphere.mesh.position.copy(sphere.collider.center);
    }
  }

  private getForwardVector(): THREE.Vector3 {
    this.camera.getWorldDirection(this.playerDirection);
    this.playerDirection.y = 0;
    this.playerDirection.normalize();
    return this.playerDirection;
  }

  private getSideVector(): THREE.Vector3 {
    this.camera.getWorldDirection(this.playerDirection);
    this.playerDirection.y = 0;
    this.playerDirection.normalize();
    this.playerDirection.cross(this.camera.up);
    return this.playerDirection;
  }

  private controls(deltaTime: number): void {
    const speedDelta = deltaTime * (this.playerOnFloor ? 25 : 8);

    if (this.keyStates['KeyW']) {
      this.playerVelocity.add(this.getForwardVector().multiplyScalar(speedDelta));
    }
    if (this.keyStates['KeyS']) {
      this.playerVelocity.add(this.getForwardVector().multiplyScalar(-speedDelta));
    }
    if (this.keyStates['KeyA']) {
      this.playerVelocity.add(this.getSideVector().multiplyScalar(-speedDelta));
    }
    if (this.keyStates['KeyD']) {
      this.playerVelocity.add(this.getSideVector().multiplyScalar(speedDelta));
    }
    if (this.playerOnFloor && this.keyStates['Space']) {
      this.playerVelocity.y = 15;
    }
  }

  private teleportPlayerIfOob(): void {
    if (this.camera.position.y <= -25) {
      this.playerCollider.start.set(0, 0.35, 0);
      this.playerCollider.end.set(0, 1, 0);
      this.playerCollider.radius = 0.35;
      this.playerVelocity.set(0, 0, 0); // Limpiar velocidad de caída
      this.camera.position.copy(this.playerCollider.end);
      this.camera.rotation.set(0, 0, 0);
    }
  }

  private animate(): void {
    this.timer.update();
    const deltaTime = Math.min(0.05, this.timer.getDelta()) / this.STEPS_PER_FRAME;

    for (let i = 0; i < this.STEPS_PER_FRAME; i++) {
      this.controls(deltaTime);
      this.updatePlayer(deltaTime);
      this.updateSpheres(deltaTime);
      this.teleportPlayerIfOob();
    }

    this.renderer.render(this.scene, this.camera);
    this.stats.update();
  }
}