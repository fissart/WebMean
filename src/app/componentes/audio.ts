import {
  Component,
  OnInit,
  signal,
  computed,
  inject,
  ViewChild,
  ElementRef,
  OnDestroy,
  NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Navbar } from './navbar';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PositionalAudioHelper } from 'three/examples/jsm/helpers/PositionalAudioHelper.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const DEFAULT_TRACK = { name: '', url: '' };

const FREE_ONLINE_RADIOS = [
  // Peruvian Live Radios
  { name: 'Radios Online/RPP Noticias', url: 'https://stream-162.zeno.fm/9146059635?zs=o7qP_w8qS9-bO-S-w7xJEA' },
  { name: 'Radios Online/Radio Exitosa', url: 'https://stream-159.zeno.fm/3u30w3m318zuv' },
  { name: 'Radios Online/Studio 92', url: 'https://stream-154.zeno.fm/f3959x90438uv' },
  { name: 'Radios Online/Radio Ritmo Romántica', url: 'https://stream-151.zeno.fm/1f4x0y35638uv' },
  { name: 'Radios Online/Radio La Zona', url: 'https://stream-156.zeno.fm/u2f62n44638uv' },
  { name: 'Radios Online/Radio Panamericana', url: 'https://stream-152.zeno.fm/87a91g35638uv' },
  { name: 'Radios Online/Radio Felicidad', url: 'https://stream-158.zeno.fm/k2k72155638uv' },
  { name: 'Radios Online/Radio Moda', url: 'https://stream-150.zeno.fm/9s1v9z35638uv' },
  { name: 'Radios Online/Oasis 101.5 FM', url: 'https://stream-153.zeno.fm/1f298815638uv' },
  { name: 'Radios Online/Radio Mar 106.3 FM', url: 'https://stream-155.zeno.fm/a87cbf55638uv' },
  { name: 'Radios Online/Radio Doble Nueve 99.1 FM', url: 'https://stream-157.zeno.fm/5y219b55638uv' },
  { name: 'Radios Online/Radio Oxígeno', url: 'https://stream-160.zeno.fm/82c89655638uv' },
  { name: 'Radios Online/Radio Capital 96.7 FM', url: 'https://stream-161.zeno.fm/u98a0g55638uv' },
  { name: 'Radios Online/Radio Nueva Q', url: 'https://stream-163.zeno.fm/96348915638uv' },

  // International News & Public Radio
  { name: 'Radios Online/BBC World Service', url: 'https://stream.live.vc.bbcmedia.co.uk/bbc_world_service' },
  { name: 'Radios Online/NPR Live 24-7', url: 'https://npr-ice.streamguys1.com/live.mp3' },
  { name: 'Radios Online/Radio France Internationale (RFI Español)', url: 'https://rfiespanol.ice.infomaniak.ch/rfiespanol-64.mp3' },
  { name: 'Radios Online/Deutsche Welle Radio', url: 'https://dwstream4.akamaized.net/dwstream4_live/index.m3u8' },

  // Music & Indie Streams
  { name: 'Radios Online/KEXP Seattle 90.3 FM', url: 'https://kexp.streamguys1.com/kexp128.mp3' },
  { name: 'Radios Online/SomaFM - Secret Agent', url: 'https://ice1.somafm.com/secretagent-128-mp3' },
  { name: 'Radios Online/SomaFM - Def Con Radio', url: 'https://ice4.somafm.com/defcon-128-mp3' },
  { name: 'Radios Online/SomaFM - Drone Zone', url: 'https://ice2.somafm.com/dronezone-128-mp3' },
  { name: 'Radios Online/SomaFM - Lush', url: 'https://ice1.somafm.com/lush-128-mp3' },
  { name: 'Radios Online/Chillhop Radio - Lofi Hip Hop', url: 'https://stream.chillhop.com/live.mp3' }
];

@Component({
  selector: 'app-multi-track-audio-player',
  standalone: true,
  imports: [Navbar, CommonModule],
  template: `
    <app-navbar></app-navbar>
    <div class="py-5"></div>

    <div class="container my-4">
      @if (playlist().length > 0) {
        <!-- Track Metadata -->
        <div class="card shadow-sm mb-3 text-center">
          <div class="card-body">
            @if (currentFolder()) {
              <span class="mb-2 h3 px-3 py-2 fs-6">
                {{ currentFolder() }}
              </span>
            }
            <h3 class="card-title fw-bold text-dark my-2">{{ currentSongTitle() }}</h3>
            <p class="card-text text-muted small text-break">{{ currentTrack().url }}</p>
          </div>
        </div>

        <!-- 3D Canvas Spatial Viewport -->
        <div class="card shadow-sm mb-3 overflow-hidden bg-dark position-relative">
          <div #canvasContainer class="w-100" style="height: 420px;"></div>
          <div class="position-absolute bottom-0 start-0 p-2 text-white bg-dark bg-opacity-75 small">
            <i class="bi bi-arrows-move me-1"></i> Arrastra para navegar en 3D (Audio Posicional con Orientación)
          </div>
        </div>

        <!-- Audio Player Controls -->
        <div class="shadow-sm rounded overflow-hidden mb-4 p-3 bg-white text-center">
          <audio
            #audioPlayer
            class="w-100"
            controls
            crossOrigin="anonymous"
            [src]="currentTrack().url"
            (play)="onPlay(currentTrack().name)"
            (ended)="handleNextTrack()"
          ></audio>
          <div class="btn-group mt-2">
            <button class="btn btn-outline-secondary btn-sm" (click)="handlePrevTrack()">Anterior</button>
            <button class="btn btn-outline-secondary btn-sm" (click)="handleNextTrack()">Siguiente</button>
          </div>
        </div>

        <!-- Playlist Accordion -->
        <div class="text-center">
          <h4 class="fw-bold mb-3 text-uppercase text-secondary">
            HiRes Playlist {{ isTargetHostname ? 'ESFAPA' : 'FISARTH' }}
          </h4>

          <div class="accordion shadow-sm" id="playlistAccordion">
            @for (folder of groupedPlaylistKeys(); track folder; let folderIdx = $index) {
              @let tracks = groupedPlaylist()[folder];
              @let isOpen = openFolder() === folder;
              @let folderId = 'folder-collapse-' + folderIdx;

              <div class="accordion-item p-1">
                <h5 class="m-0" [id]="'heading-' + folderIdx">
                  <button
                    class="btn btn-info w-100"
                    [class.collapsed]="!isOpen"
                    type="button"
                    (click)="toggleFolder(folder)"
                    [attr.aria-expanded]="isOpen"
                    [attr.aria-controls]="folderId"
                  >
                    <span>{{ folder }}</span> [{{ tracks.length }} {{ tracks.length === 1 ? 'pista' : 'pistas' }}]
                  </button>
                </h5>

                @if (isOpen) {
                  <div [id]="folderId" class="w-100 accordion-collapse show">
                    <div class="accordion-body p-3">
                      <div class="row g-2 justify-content-center">
                        @for (track of tracks; track track.id || track.globalIndex) {
                          @let isSelected = track.globalIndex === currentTrackIndex();
                          <div class="col-12 col-md-6 col-lg-4">
                            <div
                              (click)="handleSelectTrack(track.globalIndex)"
                              class="h-100 p-1 transition-all border"
                              [ngClass]="isSelected ? 'bg-warning text-dark fw-bold shadow-sm' : 'bg-white text-secondary'"
                              style="cursor: pointer; transition: 0.2s ease-in-out;"
                            >
                              <div class="text-left p-1 align-items-center">
                                <span [ngClass]="isSelected ? 'bg-dark text-white' : 'bg-light text-dark'" class="mb-1 p-1 rounded">
                                  #{{ track.globalIndex + 1 }}
                                </span> 
                                <span class="text-break">{{ track.songTitle }}</span>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class MultiTrackAudioPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;
  @ViewChild('canvasContainer') canvasContainerRef!: ElementRef<HTMLDivElement>;

  private http = inject(HttpClient);
  private ngZone = inject(NgZone);
  private apiUrl = environment.apiURL || process.env['REACT_APP_API_URL'] || '';

  playlist = signal<any[]>([]);
  currentTrackIndex = signal(0);
  openFolder = signal<string | null>(null);

  // Core Three.js & WebAudio references
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private audioListener!: THREE.AudioListener;
  private positionalAudio!: THREE.PositionalAudio;
  private audioConnected = false;

  private boundOnResize = this.onWindowResize.bind(this);

  isTargetHostname = typeof window !== 'undefined' && window.location.hostname === 'www.esfapa.edu.pe';

  ngOnInit(): void {
    this.fetchPlaylist();
  }

  private initThreeScene() {
    if (!this.canvasContainerRef) return;

    const container = this.canvasContainerRef.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    // Posicionamos la cámara un poco alejada y elevada mirando hacia (0, 1, 0)
    this.camera.position.set(.5, 1.5, .5);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xa0a0a0);
    this.scene.fog = new THREE.Fog(0xa0a0a0, 2, 20);

    const reflectionCube = new THREE.CubeTextureLoader()
      .setPath('SwedishRoyalCastle/')
      .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
    hemiLight.position.set(0, 20, 20);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(5, 5, 0);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 1;
    dirLight.shadow.camera.bottom = -1;
    dirLight.shadow.camera.left = -1;
    dirLight.shadow.camera.right = 1;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 20;
    this.scene.add(dirLight);

    const planeMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 50),
      new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false })
    );
    planeMesh.rotation.x = -Math.PI / 2;
    planeMesh.receiveShadow = true;
    this.scene.add(planeMesh);

    const grid = new THREE.GridHelper(50, 50, 0xc1c1c1, 0xc1c1c1);
    this.scene.add(grid);

    // AudioListener & PositionalAudio setup
    this.audioListener = new THREE.AudioListener();
    this.camera.add(this.audioListener);

    this.positionalAudio = new THREE.PositionalAudio(this.audioListener);
    this.positionalAudio.setRefDistance(1);
    this.positionalAudio.setDirectionalCone(180, 230, 0.1);

    const audioHelper = new PositionalAudioHelper(this.positionalAudio, 2);
    this.positionalAudio.add(audioHelper);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/new.glb',
      (gltf) => {
        const boomBox = gltf.scene;
        // Fijamos la posición del modelo en (0, 1, 0)
        boomBox.position.set(0, 1, 0);
        boomBox.scale.set(.9, .9, .9);

        boomBox.traverse((object) => {
          if ((object as THREE.Mesh).isMesh) {
            const mesh = object as THREE.Mesh;
            (mesh.material as THREE.MeshStandardMaterial).envMap = reflectionCube;
            mesh.geometry.rotateY(-Math.PI);
            mesh.castShadow = true;
          }
        });

        boomBox.add(this.positionalAudio);
        this.scene.add(boomBox);
      },
      undefined,
      (err) => console.error('Error loading BoomBox GLTF:', err)
    );

    const wallGeometry = new THREE.BoxGeometry(2, 1, 0.1);
    const wallMaterial = new THREE.MeshBasicMaterial({
      color: 'blue',
      transparent: true,
      opacity: 0.5
    });
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.set(0, 1, -0.5); // Ajustado también acorde al nuevo eje Y
    this.scene.add(wall);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // Establecemos el punto de enfoque y rotación exactamente en (0, 1, 0)
    this.controls.target.set(0, 1, 0);
    this.controls.minDistance = 0.5;
    this.controls.maxDistance = 10;
    this.controls.maxPolarAngle = 0.5 * Math.PI;
    this.controls.update();

    window.addEventListener('resize', this.boundOnResize);

    this.ngZone.runOutsideAngular(() => {
      this.renderer.setAnimationLoop(() => {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
      });
    });
  }

  private connectAudioPipeline() {
    if (this.audioConnected || !this.audioPlayerRef?.nativeElement || !this.positionalAudio) return;

    const audioElement = this.audioPlayerRef.nativeElement;
    this.positionalAudio.setMediaElementSource(audioElement);
    this.audioConnected = true;
  }

  private async ensureAudioContextActive() {
    if (this.audioListener?.context && this.audioListener.context.state === 'suspended') {
      await this.audioListener.context.resume();
    }
  }

  private playCurrentAudioTrack() {
    setTimeout(async () => {
      await this.ensureAudioContextActive();
      const audioElement = this.audioPlayerRef?.nativeElement;
      
      if (audioElement) {
        audioElement.load();
        audioElement.play().catch((err) => console.warn('Autoplay prevented or stream unsupported:', err));
      }
    }, 50);
  }

  private fetchPlaylist = async () => {
    try {
      this.http.post<any[]>(`${this.apiUrl}/api/users/audio`, {}).subscribe({
        next: (data) => {
          const apiTracks = Array.isArray(data) ? data : [];
          this.playlist.set([...FREE_ONLINE_RADIOS, ...apiTracks]);
          setTimeout(() => this.initThreeScene(), 0);
        },
        error: (err) => {
          console.error('Error loading playlist from API:', err);
          this.playlist.set([...FREE_ONLINE_RADIOS]);
          setTimeout(() => this.initThreeScene(), 0);
        }
      });
    } catch (err) {
      console.error('Error loading playlist:', err);
      this.playlist.set([...FREE_ONLINE_RADIOS]);
      setTimeout(() => this.initThreeScene(), 0);
    }
  };

  groupedPlaylist = computed(() => {
    return this.playlist().reduce((groups: Record<string, any[]>, track, globalIndex) => {
      const parts = (track.name || '').split('/');
      const folderName = parts.length > 1 ? parts[0].trim() : 'Varios / Sin Carpeta';
      const songTitle = parts.length > 1 ? parts.slice(1).join('/') : track.name;

      if (!groups[folderName]) {
        groups[folderName] = [];
      }

      groups[folderName].push({
        ...track,
        songTitle,
        globalIndex,
      });

      return groups;
    }, {});
  });

  groupedPlaylistKeys = computed(() => Object.keys(this.groupedPlaylist()));

  currentTrack = computed(() => {
    const list = this.playlist();
    const idx = this.currentTrackIndex();
    return list[idx] || DEFAULT_TRACK;
  });

  currentSongParts = computed(() => (this.currentTrack().name || '').split('/'));
  currentSongTitle = computed(() => {
    const parts = this.currentSongParts();
    return parts.length > 1 ? parts.slice(1).join('/') : this.currentTrack().name;
  });
  currentFolder = computed(() => {
    const parts = this.currentSongParts();
    return parts.length > 1 ? parts[0] : null;
  });

  handleNextTrack = () => {
    const len = this.playlist().length;
    if (len === 0) return;
    this.currentTrackIndex.update((prev) => (prev < len - 1 ? prev + 1 : 0));
    this.syncOpenFolder();
    this.playCurrentAudioTrack();
  };

  handlePrevTrack = () => {
    const len = this.playlist().length;
    if (len === 0) return;
    this.currentTrackIndex.update((prev) => (prev > 0 ? prev - 1 : len - 1));
    this.syncOpenFolder();
    this.playCurrentAudioTrack();
  };

  handleSelectTrack = (globalIndex: number) => {
    this.currentTrackIndex.set(globalIndex);
    this.syncOpenFolder();
    this.playCurrentAudioTrack();
  };

  toggleFolder = (folderName: string) => {
    this.openFolder.update((prev) => (prev === folderName ? null : folderName));
  };

  private syncOpenFolder() {
    const track = this.currentTrack();
    if (track?.name) {
      const parts = track.name.split('/');
      const folderName = parts.length > 1 ? parts[0].trim() : 'Varios / Sin Carpeta';
      this.openFolder.set(folderName);
    }
  }

  async onPlay(trackName: string) {
    this.connectAudioPipeline();
    await this.ensureAudioContextActive();
    console.log(`Playing spatial audio track: ${trackName}`);
  }

  private onWindowResize() {
    if (!this.canvasContainerRef || !this.renderer || !this.camera) return;

    const container = this.canvasContainerRef.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.boundOnResize);

    if (this.renderer) {
      this.renderer.setAnimationLoop(null);
      this.renderer.dispose();
    }

    if (this.controls) {
      this.controls.dispose();
    }

    if (this.audioListener?.context) {
      this.audioListener.context.close();
    }
  }
}