import { Component, OnInit, signal, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { isAuth } from './auth';


interface ChatMessage {
  sender: string;
  data: string;
}

const SERVER_URL = environment.apiURL;

const PEER_CONNECTION_CONFIG: RTCConfiguration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

@Component({
  selector: 'app-video-call',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (!isChrome()) {
      <div class="unsupported-browser">
        <h1>Sorry, this works only with Google Chrome</h1>
      </div>
    } @else {
      @if (askForUsername()) {
        <div class="username-container">
          <p class="title">Define tu nombre de usuario</p>
          <input
            type="text"
            class="form-control mb-3"
            placeholder="Username"
            [(ngModel)]="username"
          />
          <button class="btn btn-primary" (click)="connect()">Conectarse a {{currentUrl}}</button>
        </div>

        <div class="local-preview-container">
          <video
            #localVideo
            autoplay
            muted
            playsinline
            class="local-video-preview"
          ></video>
        </div>
      } @else {
        <!-- Controls Footer -->
        <div class="btn-down d-flex justify-content-center gap-3 py-2 bg-light border-top">
          <button class="btn btn-secondary" (click)="toggleVideo()">
            <i class="bi" [ngClass]="video() ? 'bi-camera-video-fill' : 'bi-camera-video-off-fill'"></i>
          </button>

          <button class="btn btn-danger" (click)="handleEndCall()">
            <i class="bi bi-telephone-x-fill"></i>
          </button>

          <button class="btn btn-secondary" (click)="toggleAudio()">
            <i class="bi" [ngClass]="audio() ? 'bi-mic-fill' : 'bi-mic-mute-fill'"></i>
          </button>

          @if (screenAvailable()) {
            <button class="btn btn-secondary" (click)="toggleScreen()">
              <i class="bi" [ngClass]="screen() ? 'bi-display-fill' : 'bi-slash-square-fill'"></i>
            </button>
          }

          <button class="btn btn-secondary position-relative" (click)="openChat()">
            <i class="bi bi-chat-dots-fill"></i>
            @if (newMessages() > 0) {
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{ newMessages() }}
              </span>
            }
          </button>
        </div>

        <!-- Chat Modal -->
        @if (showModal()) {
          <div class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5); z-index: 999999;">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Chat del grupo</h5>
                  <button type="button" class="btn-close" (click)="closeChat()"></button>
                </div>

                <div class="modal-body chat-box" style="height: 400px; overflow-y: auto;">
                  @if (messages().length > 0) {
                    @for (msg of messages(); track $index) {
                      <p class="text-start text-break">
                        <strong>{{ msg.sender }}</strong>: {{ msg.data }}
                      </p>
                    }
                  } @else {
                    <p class="text-muted">Todavía no hay mensajes</p>
                  }
                </div>

                <div class="modal-footer">
                  <input
                    type="text"
                    class="form-control me-2"
                    placeholder="Message"
                    [(ngModel)]="chatInput"
                    (keyup.enter)="sendMessage()"
                  />
                  <button class="btn btn-primary" (click)="sendMessage()">Enviar</button>
                </div>
              </div>
            </div>
          </div>
        }

        <!-- Main Video Grid Container -->
        <div class="container py-3">
 <div class="align-items-center text-center mb-3">
  <!-- <input type="text" class="form-control" [value]="currentUrl" readonly /> -->
  <!-- Botón Copiar -->
  <button class="btn btn-outline-primary ms-2 text-nowrap" (click)="copyUrl()">
    <i class="bi bi-copy"></i> Copiar enlace de invitación
  </button>
  
  <!-- Botón Compartir (Nuevo) -->
  <button class="btn btn-outline-secondary ms-2 text-nowrap" (click)="shareUrl()" title="Compartir enlace">
    <i class="bi bi-share"></i> Compartir
  </button>
      <hr/>
  <span class="text-info">{{username}}</span>
</div>
          <div #mainContainer id="main" class="d-flex flex-wrap justify-content-center align-items-center">
            <video
              #localVideo
              autoplay
              muted
              playsinline
              class="local-video-grid"
            ></video>
          </div>
        </div>
      }
    }
  `,
  styles: [`
    .unsupported-browser, .username-container {
      background: white;
      width: 30%;
      min-width: 400px;
      padding: 20px;
      text-align: center;
      margin: 50px auto;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .local-preview-container {
      text-align: center;
      padding-top: 40px;
    }
    .local-video-preview {
      border: 2px solid #bdbdbd;
      object-fit: cover;
      width: 60%;
      height: 300px;
    }
    .local-video-grid {
      border: 2px solid #bdbdbd;
      margin: 10px;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    .btn-down {
      position: fixed;
      bottom: 0;
      width: 100%;
      z-index: 1000;
    }
  `]
})
export class VideoComponent implements OnInit, OnDestroy {
  @ViewChild('localVideo') localVideoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('mainContainer') mainContainerRef!: ElementRef<HTMLDivElement>;
  auth: any = isAuth();

  // Signals
  video = signal(false);
  audio = signal(false);
  screen = signal(false);
  showModal = signal(false);
  screenAvailable = signal(false);
  askForUsername = signal(true);
  newMessages = signal(0);
  messages = signal<ChatMessage[]>([]);

  // Local State
username = this.auth?.name ?? `User_${Math.floor(Math.random() * 10000)}`;
  chatInput = '';
  currentUrl = window.location.href;

  private socket!: SocketIOClient.Socket;
  private socketId: string | null = null;
  private connections: { [key: string]: RTCPeerConnection } = {};
  private localStream!: MediaStream;
  private videoAvailable = false;
  private audioAvailable = false;
  private elms = 0;

  ngOnInit(): void {
    this.getPermissions();
  }

  ngOnDestroy(): void {
    this.cleanUpStreams();
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  isChrome(): boolean {
    const userAgent = (navigator?.userAgent || '').toLowerCase();
    const vendor = (navigator?.vendor || '').toLowerCase();
    return /google inc/.test(vendor) && /(?:chrome|crios)\/(\d+)/.test(userAgent);
  }

  private async getPermissions(): Promise<void> {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => (this.videoAvailable = true))
        .catch(() => (this.videoAvailable = false));

      await navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => (this.audioAvailable = true))
        .catch(() => (this.audioAvailable = false));

      this.screenAvailable.set(!!navigator.mediaDevices.getDisplayMedia);

      if (this.videoAvailable || this.audioAvailable) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: this.videoAvailable,
          audio: this.audioAvailable
        });
        this.localStream = stream;
        if (this.localVideoRef?.nativeElement) {
          this.localVideoRef.nativeElement.srcObject = stream;
        }
      }
    } catch (e) {
      console.error('Error getting permissions:', e);
    }
  }

  connect(): void {
    this.askForUsername.set(false);
    this.getMedia();
  }

  getMedia(): void {
    this.video.set(this.videoAvailable);
    this.audio.set(this.audioAvailable);
    this.getUserMedia();
    this.connectToSocketServer();
  }

  getUserMedia(): void {
    if ((this.video() && this.videoAvailable) || (this.audio() && this.audioAvailable)) {
      navigator.mediaDevices.getUserMedia({ video: this.video(), audio: this.audio() })
        .then(this.getUserMediaSuccess)
        .catch((e) => console.error(e));
    } else {
      this.stopLocalTracks();
    }
  }

  private getUserMediaSuccess = (stream: MediaStream): void => {
    this.stopLocalTracks();

    this.localStream = stream;
    if (this.localVideoRef?.nativeElement) {
      this.localVideoRef.nativeElement.srcObject = stream;
    }

    for (const id in this.connections) {
      if (id === this.socketId) continue;

      this.addTracksToPeer(this.connections[id], this.localStream);

      this.connections[id].createOffer().then((description) => {
        this.connections[id].setLocalDescription(description).then(() => {
          this.socket.emit('signal', id, JSON.stringify({ sdp: this.connections[id].localDescription }));
        });
      });
    }

    stream.getTracks().forEach((track) => {
      track.onended = () => {
        this.video.set(false);
        this.audio.set(false);
        this.stopLocalTracks();

        this.localStream = this.createBlackSilenceStream();
        if (this.localVideoRef?.nativeElement) {
          this.localVideoRef.nativeElement.srcObject = this.localStream;
        }

        for (const id in this.connections) {
          this.addTracksToPeer(this.connections[id], this.localStream);
          this.connections[id].createOffer().then((description) => {
            this.connections[id].setLocalDescription(description).then(() => {
              this.socket.emit('signal', id, JSON.stringify({ sdp: this.connections[id].localDescription }));
            });
          });
        }
      };
    });
  };

  getDisplayMedia(): void {
    if (this.screen() && navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
        .then(this.getDisplayMediaSuccess)
        .catch((e) => console.error(e));
    }
  }

  private getDisplayMediaSuccess = (stream: MediaStream): void => {
    this.stopLocalTracks();

    this.localStream = stream;
    if (this.localVideoRef?.nativeElement) {
      this.localVideoRef.nativeElement.srcObject = stream;
    }

    for (const id in this.connections) {
      if (id === this.socketId) continue;

      this.addTracksToPeer(this.connections[id], this.localStream);

      this.connections[id].createOffer().then((description) => {
        this.connections[id].setLocalDescription(description).then(() => {
          this.socket.emit('signal', id, JSON.stringify({ sdp: this.connections[id].localDescription }));
        });
      });
    }

    stream.getTracks().forEach((track) => {
      track.onended = () => {
        this.screen.set(false);
        this.stopLocalTracks();
        this.localStream = this.createBlackSilenceStream();
        if (this.localVideoRef?.nativeElement) {
          this.localVideoRef.nativeElement.srcObject = this.localStream;
        }
        this.getUserMedia();
      };
    });
  };

  private connectToSocketServer(): void {
    // socket.io-client@2.5.0 instantiation
    this.socket = io(SERVER_URL, { secure: true });

    this.socket.on('signal', this.gotMessageFromServer);

    this.socket.on('connect', () => {
      this.socket.emit('join-call', window.location.href);
      this.socketId = this.socket.id || null;

      this.socket.on('chat-message', (data: string, sender: string, senderId: string) => {
        this.messages.update((prev) => [...prev, { sender, data }]);
        if (senderId !== this.socketId) {
          this.newMessages.update((count) => count + 1);
        }
      });

      this.socket.on('user-left', (id: string) => {
        const videoEl = document.querySelector(`[data-socket="${id}"]`);
        if (videoEl) {
          this.elms--;
          videoEl.remove();
          if (this.mainContainerRef?.nativeElement) {
            this.changeCssVideos(this.mainContainerRef.nativeElement);
          }
        }
      });

      this.socket.on('user-joined', (id: string, clients: string[]) => {
        clients.forEach((socketListId) => {
          this.connections[socketListId] = new RTCPeerConnection(PEER_CONNECTION_CONFIG);

          this.connections[socketListId].onicecandidate = (event) => {
            if (event.candidate) {
              this.socket.emit('signal', socketListId, JSON.stringify({ ice: event.candidate }));
            }
          };

          this.connections[socketListId].ontrack = (event) => {
            const existingVideo = document.querySelector(`[data-socket="${socketListId}"]`) as HTMLVideoElement;
            if (existingVideo) {
              existingVideo.srcObject = event.streams[0];
            } else {
              this.elms = clients.length;
              const main = this.mainContainerRef.nativeElement;
              const cssMeasure = this.changeCssVideos(main);

              const video = document.createElement('video');
              video.style.minWidth = cssMeasure.minWidth;
              video.style.minHeight = cssMeasure.minHeight;
              video.style.maxHeight = '100%';
              video.style.margin = '10px';
              video.style.borderStyle = 'solid';
              video.style.borderColor = '#bdbdbd';
              video.style.objectFit = 'fill';
              video.style.setProperty('width', cssMeasure.width);
              video.style.setProperty('height', cssMeasure.height);
              video.setAttribute('data-socket', socketListId);
              video.srcObject = event.streams[0];
              video.autoplay = true;
              video.playsInline = true;

              main.appendChild(video);
            }
          };

          if (this.localStream) {
            this.addTracksToPeer(this.connections[socketListId], this.localStream);
          } else {
            this.localStream = this.createBlackSilenceStream();
            this.addTracksToPeer(this.connections[socketListId], this.localStream);
          }
        });

        if (id === this.socketId) {
          for (const id2 in this.connections) {
            if (id2 === this.socketId) continue;
            try {
              this.addTracksToPeer(this.connections[id2], this.localStream);
            } catch (e) {}

            this.connections[id2].createOffer().then((description) => {
              this.connections[id2].setLocalDescription(description).then(() => {
                this.socket.emit('signal', id2, JSON.stringify({ sdp: this.connections[id2].localDescription }));
              });
            });
          }
        }
      });
    });
  }

  private gotMessageFromServer = (fromId: string, message: string): void => {
    const signalData = JSON.parse(message);

    if (fromId !== this.socketId) {
      if (signalData.sdp) {
        this.connections[fromId].setRemoteDescription(new RTCSessionDescription(signalData.sdp)).then(() => {
          if (signalData.sdp.type === 'offer') {
            this.connections[fromId].createAnswer().then((description) => {
              this.connections[fromId].setLocalDescription(description).then(() => {
                this.socket.emit('signal', fromId, JSON.stringify({ sdp: this.connections[fromId].localDescription }));
              });
            });
          }
        });
      }

      if (signalData.ice) {
        this.connections[fromId].addIceCandidate(new RTCIceCandidate(signalData.ice)).catch((e) => console.error(e));
      }
    }
  };

  private addTracksToPeer(peer: RTCPeerConnection, stream: MediaStream): void {
    stream.getTracks().forEach((track) => {
      peer.addTrack(track, stream);
    });
  }

  private changeCssVideos(main: HTMLElement) {
    const widthMain = main.offsetWidth;
    let minWidth = '30%';
    if ((widthMain * 30) / 100 < 300) {
      minWidth = '300px';
    }
    const minHeight = '40%';

    let height = String(100 / this.elms) + '%';
    let width = '';
    if (this.elms === 0 || this.elms === 1) {
      width = '100%';
      height = '100%';
    } else if (this.elms === 2) {
      width = '45%';
      height = '100%';
    } else if (this.elms === 3 || this.elms === 4) {
      width = '35%';
      height = '50%';
    } else {
      width = String(100 / this.elms) + '%';
    }

    const videos = main.querySelectorAll('video');
    videos.forEach((vid) => {
      const v = vid as HTMLVideoElement;
      v.style.minWidth = minWidth;
      v.style.minHeight = minHeight;
      v.style.setProperty('width', width);
      v.style.setProperty('height', height);
    });

    return { minWidth, minHeight, width, height };
  }

  private createBlackSilenceStream(): MediaStream {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const dst = oscillator.connect(ctx.createMediaStreamDestination()) as any;
    oscillator.start();
    ctx.resume();
    const audioTrack = Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });

    const canvas = Object.assign(document.createElement('canvas'), { width: 640, height: 480 });
    canvas.getContext('2d')?.fillRect(0, 0, 640, 480);
    const stream = canvas.captureStream();
    const videoTrack = Object.assign(stream.getVideoTracks()[0], { enabled: false });

    return new MediaStream([videoTrack, audioTrack]);
  }

  toggleVideo(): void {
    this.video.update((v) => !v);
    this.getUserMedia();
  }

  toggleAudio(): void {
    this.audio.update((a) => !a);
    this.getUserMedia();
  }

  toggleScreen(): void {
    this.screen.update((s) => !s);
    this.getDisplayMedia();
  }

  handleEndCall(): void {
    this.stopLocalTracks();
    window.location.href = '/';
  }

  openChat(): void {
    this.showModal.set(true);
    this.newMessages.set(0);
  }

  closeChat(): void {
    this.showModal.set(false);
  }

  sendMessage(): void {
    if (!this.chatInput.trim()) return;
    this.socket.emit('chat-message', this.chatInput, this.username, this.socketId);
    this.chatInput = '';
  }

  copyUrl(): void {
    navigator.clipboard.writeText(this.currentUrl).then(
      () => alert('Link copiado a portapapeles!'),
      () => alert('Falló la copia')
    );
  }

  async shareUrl(): Promise<void> {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Invitación',
        text: 'Te invito a unirte a este enlace:',
        url: this.currentUrl,
      });
    } catch (error) {
      // El usuario canceló o hubo un error al compartir
      console.log('Error al compartir o compartido cancelado', error);
    }
  } else {
    // Plan de respaldo si el navegador no soporta Web Share API
    this.copyUrl();
  }
}

  private stopLocalTracks(): void {
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
    }
  }

  private cleanUpStreams(): void {
    this.stopLocalTracks();
    for (const key in this.connections) {
      this.connections[key].close();
    }
    this.connections = {};
  }
}