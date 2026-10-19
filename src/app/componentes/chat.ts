import {
  Component,
  OnInit,
  OnDestroy,
  Signal,
  WritableSignal,
  signal,
  computed,
  inject,
  Pipe,
  PipeTransform,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import io from 'socket.io-client';
import * as L from 'leaflet';
import * as timeago from 'timeago.js';
import es from 'timeago.js/lib/lang/es';

import { environment } from '../../environments/environment';

// Register timeago locale
timeago.register('es', es);

// ==========================================
// 1. MODELOS E INTERFACES
// ==========================================

export interface UserAuth {
  _id: string;
  email: string;
  name: string;
  rol: string | number;
  foto?: string;
}

export interface ChatUser {
  user?: string;
  email: string;
  name: string;
  id?: string;
  foto: string;
  ref?: string;
  geometry: [number | string, number | string];
  accuracy?: number;
  time?: string | Date;
  ip?: string;
}

export interface ChatMessage {
  mensaje: string;
  email: string;
  name: string;
  create: string | Date;
  foto?: string;
  user?: string;
}

export interface UserLocation {
  id: string;
  name: string;
  geometry: [number | string, number | string];
}

// Custom Leaflet Marker Icon
const VenueLocationIcon = L.icon({
  iconUrl: 'assets/venue_location_icon.svg',
  iconSize: [35, 35],
  iconAnchor: [17, 45],
  popupAnchor: [0, -40]
});

// ==========================================
// 2. PIPE PERSONALIZADO PARA TIMEAGO
// ==========================================
@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | number | Date | undefined | null): string {
    if (!value) return '';
    return timeago.format(value, 'es');
  }
}

// ==========================================
// 3. COMPONENTE PRINCIPAL (SINGLE FILE)
// ==========================================
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, CKEditorModule, TimeAgoPipe],
  template: `
    <!-- Toast de Notificaciones -->
    @if (toastMessage()) {
      <div class="position-fixed top-0 end-0 p-3" style="z-index: 1050">
        <div class="toast show bg-warning text-dark p-2 rounded shadow">
          {{ toastMessage() }}
        </div>
      </div>
    }

    <div class="container border my-3 rounded">
      <div class="row">
        <!-- Sidebar: Usuarios Activos -->
        <div class="col-md-4 rounded-left p-3 border-right bg-light" style="max-height: 80vh; overflow-y: auto;">
          <h6 class="mb-3 px-1" style="font-size: 0.8rem; letter-spacing: 1px;">
            Usuarios activos ({{ users().length }})
          </h6>

          @for (user of users(); track $index) {
            <div
              class="d-flex align-items-center p-2 rounded mb-2 border-0 bg-white shadow-sm position-relative"
              style="cursor: pointer;"
            >
              <!-- Índice del Usuario -->
              <span class="badge badge-secondary mr-2 text-muted bg-transparent border p-1" style="font-size: 0.7rem; min-width: 20px;">
                {{ $index + 1 }}
              </span>

              <!-- Avatar -->
              <div class="position-relative mr-3" style="width: 40px; height: 40px;">
                <img
                  class="rounded-circle border w-100 h-100 object-cover"
                  [alt]="user.email"
                  [src]="baseUrl + '/profile/' + user.foto"
                  (error)="onImageError($event)"
                />
                <span class="position-absolute bg-success rounded-circle border border-white" style="width: 10px; height: 10px; bottom: 0; right: 0;"></span>
              </div>

              <!-- Metadata del Usuario -->
              <div class="flex-grow-1 text-truncate" style="min-width: 0;">
                <div class="text-dark font-weight-bold text-truncate" style="font-size: 0.9rem;">
                  {{ user.email }}
                </div>

                @if (auth()?.rol === 1 || auth()?.rol === '1') {
                  <div class="text-muted" style="font-size: 0.75rem;">
                    <span class="badge badge-light mr-1 border">{{ user.ip ? user.ip.substring(7) : '' }}</span>
                    <span class="badge badge-light border">{{ user.ref }}</span>
                  </div>
                }
              </div>

              <!-- Tiempo transcurrido -->
              <div class="text-muted text-right ml-2" style="font-size: 0.7rem; min-width: 65px;">
                {{ user.time | timeAgo }}
              </div>
            </div>
          }
        </div>

        <!-- Columna Principal: Editor y Mensajes -->
        <div class="col-md-8 rounded-right p-2">
          <ckeditor
            [editor]="Editor"
            [config]="editorConfig"
            [(ngModel)]="mensaje"
          ></ckeditor>

          <div class="w-100">
            <button class="btn btn-info w-100 rounded-0" (click)="sendMessage()">Enviar</button>
          </div>

          <!-- Listado de Mensajes -->
          @for (message of messages(); track $index) {
            <div
              class="my-2 p-1"
              [ngClass]="{
                'border-right border-warning text-right': auth()?.email === message.email,
                'border-left border-primary border-3 text-left': auth()?.email !== message.email
              }"
              [style.float]="auth()?.email === message.email ? 'right' : 'left'"
              style="font-size: 14px; clear: both;"
            >
              <div
                [ngClass]="auth()?.email === message.email ? 'text-info' : 'text-primary'"
                style="font-size: 14px;"
              >
                {{ message.name }} - {{ message.email }}
              </div>

              <!-- Renderizado de HTML enviado desde el CKEditor -->
              <div [innerHTML]="message.mensaje"></div>

              <div class="text-secondary text-right" style="font-size: 12px;">
                {{ message.create | timeAgo }}
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Coordenadas para Administrador -->
      @if ((auth()?.rol === 1 || auth()?.rol === '1') && latitude() && longitude()) {
        <div>
          @for (loc of locations(); track $index) {
            <div>
              {{ $index + 1 }} {{ loc.name }} {{ loc.geometry[1] }} {{ loc.geometry[0] }}
            </div>
          }
        </div>

        <!-- Mapa Interactivo Leaflet -->
        <div #mapContainer style="height: 500px; width: 100%; margin-top: 15px;"></div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .object-cover {
      object-fit: cover;
    }
    .border-3 {
      border-width: 3px !important;
    }
  `]
})
export class AdminComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private router = inject(Router);

  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;

  // Configuración de Servidor
  readonly baseUrl = environment.apiURL || '';
  readonly socketUrl = environment.apiURL || '';
  readonly authSvgwww = 'assets/foto.png';

  // Reactividad con Signals
  userr: WritableSignal<any> = signal(null);
  messages: WritableSignal<ChatMessage[]> = signal([]);
  users: WritableSignal<ChatUser[]> = signal([]);
  locations: WritableSignal<UserLocation[]> = signal([]);
  latitude: WritableSignal<number | null> = signal(null);
  longitude: WritableSignal<number | null> = signal(null);
  accuracy: WritableSignal<number | null> = signal(null);
  toastMessage: WritableSignal<string | null> = signal(null);

  // Form State
  mensaje = '';

  // CKEditor 5
  public Editor = ClassicEditor;
  public editorConfig = {
    language: 'es',
    toolbar: [
      'heading', '|', 'bold', 'italic', 'link', 'bulletedList',
      'numberedList', '|', 'indent', 'outdent', '|',
      'blockQuote', 'insertTable', '|', 'undo', 'redo'
    ],
    placeholder: 'Descripción'
  };

  private socket!: ReturnType<typeof io>;
  private map?: L.Map;
  private markers: L.Marker[] = [];

  // Helper auth reactivo
  readonly auth = computed<UserAuth | null>(() => this.getIsAuth());

  ngOnInit(): void {
    this.socket = io(this.socketUrl);

    // Geolocalización HTML5
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.longitude.set(pos.coords.longitude);
          this.latitude.set(pos.coords.latitude);
          this.accuracy.set(pos.coords.accuracy);
          this.sendUser(pos.coords.longitude, pos.coords.latitude, pos.coords.accuracy);
        },
        (error) => {
          this.sendUser('', '', '');
          if (error.code === 1) {
            console.log('User denied location access.');
          } else {
            console.log('An error occurred or location timed out.');
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      this.sendUser('', '', '');
    }

    // Eventos de Socket.io
    this.socket.on('mesages', (ww: ChatMessage) => {
      const currentAuth = this.auth();
      if (currentAuth && currentAuth._id !== ww.user) {
        this.showToast(`Mensaje de ${ww.name}`);
      }
      this.messages.update((prev) => [ww, ...prev]);
    });

    this.socket.on('usersss', (ww: ChatUser[]) => {
      const newUsers: ChatUser[] = [];
      const newLocations: UserLocation[] = [];

      for (let i = 0; i < ww.length; i++) {
        newUsers.push(ww[i]);
        if (JSON.stringify(ww[i].geometry) !== '["",""]') {
          newLocations.push({
            id: ww[i].email,
            name: ww[i].name,
            geometry: ww[i].geometry
          });
        }
      }

      this.users.set(newUsers);
      this.locations.set(newLocations);
      this.updateMapMarkers();
    });

    this.socket.on('load old msgs', (ww: any[]) => {
      const oldMsgs: ChatMessage[] = ww.map((item) => ({
        mensaje: item.mensaje,
        email: item.email,
        name: item.name,
        create: item.createdAt,
        foto: item.foto
      }));
      this.messages.update((prev) => [...oldMsgs, ...prev]);
    });
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
    if (this.map) {
      this.map.remove();
    }
  }

  // Identificación del usuario en el Socket
  private sendUser(longitude: any, latitude: any, accuracy: any): void {
    const currentUser = this.auth();
    if (currentUser && currentUser._id) {
      this.getUser(longitude, latitude, accuracy);
    } else {
      const date = Math.random().toString(36).substring(2, 11).toUpperCase();
      const www = {
        user: date,
        email: date,
        name: date,
        id: 'id',
        foto: 'foto',
        ref: window.location.href,
        geometry: [longitude, latitude],
        accuracy: accuracy
      };
      this.socket.emit('usssers', www);
    }
  }

  // Petición HTTP al Backend
  getUser(longitude: any, latitude: any, accuracy: any): void {
    const token = this.getCookie('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json; charset=UTF-8',
      Accept: 'application/json'
    });

    const currentUser = this.auth();
    if (!currentUser) return;

    this.http.get<any>(`${this.baseUrl}/users/user/${currentUser._id}`, { headers }).subscribe({
      next: (res) => {
        this.userr.set(res);
        const www = {
          user: res._id,
          email: res.email,
          name: res.name ? res.name.replace(/[^\x00-\x7F]/g, 'Ñ') : res.email,
          id: res._id,
          foto: res.foto,
          ref: window.location.href,
          geometry: [longitude, latitude],
          accuracy: accuracy
        };
        this.socket.emit('usssers', www);
        this.initMapIfNeeded();
      },
      error: (err) => {
        if (err.status === 401) {
          this.signout(() => {
            this.router.navigate(['/login']);
          });
        }
      }
    });
  }

  // Enviar mensaje mediante Socket
  sendMessage(): void {
    const currentUser = this.userr();
    const user = this.auth()?._id;
    const name = currentUser?.name;
    const email = currentUser?.email;

    if (this.mensaje && name && email) {
      this.socket.emit('mesagess', { mensaje: this.mensaje, user, name, email });
    }
    this.mensaje = '';
  }

  // Manejador de error para cargar avatar por defecto
  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = this.authSvgwww;
    target.style.padding = '5px';
  }

  // Toast temporal simplificado
  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }

  // Inicialización dinámica del mapa de Leaflet
  private initMapIfNeeded(): void {
    setTimeout(() => {
      const lat = this.latitude();
      const lng = this.longitude();
      if (!this.map && this.mapContainer && lat && lng) {
        this.map = L.map(this.mapContainer.nativeElement).setView([lat, lng], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(this.map);
        this.updateMapMarkers();
      }
    }, 100);
  }

  // Actualización de marcadores en el mapa
  private updateMapMarkers(): void {
    if (!this.map) return;

    this.markers.forEach((m) => m.remove());
    this.markers = [];

    this.locations().forEach((loc) => {
      const lat = Number(loc.geometry[1]);
      const lng = Number(loc.geometry[0]);
      if (!isNaN(lat) && !isNaN(lng)) {
        const marker = L.marker([lat, lng], { icon: VenueLocationIcon })
          .addTo(this.map!)
          .bindPopup(loc.name);
        this.markers.push(marker);
      }
    });
  }

  // Helpers de autenticación (reemplazo de helpers/auth.ts)
  private getIsAuth(): UserAuth | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  private signout(callback: () => void): void {
    localStorage.removeItem('user');
    document.cookie = 'token=; Max-Age=0; path=/;';
    callback();
  }
}