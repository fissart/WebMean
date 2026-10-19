import {
  Component,
  OnInit,
  signal,
  computed,
  inject,
  ElementRef,
  viewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { isAuth, getCokie, signout } from './auth';
import { Navbar } from './navbar';

@Component({
  selector: 'app-private',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, CKEditorModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-navbar />
    
    <div class="py-5"></div>
    <div class="container py-4">
      <div class="row justify-content-center">
        <div class="col-lg-10 col-xl-9">
          
          <!-- Card Contenedora Principal -->
          <div class="card bg-dark text-light border-secondary shadow-lg rounded-4 overflow-hidden">
            
            <!-- Encabezado de la Card -->
            <div class="card-header border-secondary bg-dark bg-gradient p-3 p-md-4 d-flex justify-content-between align-items-center">
              <div>
                <h4 class="card-title fw-bold text-info mb-1">
                  <i class="bi bi-person-circle me-2"></i>Perfil de Usuario
                </h4>
                <p class="small mb-0">Gestiona la información personal y de seguridad</p>
              </div>
              <button
                (click)="handleLogout()"
                type="button"
                class="btn btn-outline-danger btn-sm px-3 rounded-pill d-flex align-items-center gap-2"
              >
                <i class="bi bi-box-arrow-right"></i>
                <span class="d-none d-sm-inline">Cerrar sesión</span>
              </button>
            </div>

            <!-- Cuerpo de la Card -->
            <div class="card-body p-4 p-md-5">
              <div class="row g-4 align-items-center flex-column-reverse flex-md-row">
                
                <!-- Columna Izquierda: Formulario -->
                <div class="col-md-7">
                  <form (ngSubmit)="handleSubmit($event)" class="d-flex flex-column gap-3">
                    
                    <div>
                      <label class="form-label text-info-emphasis small fw-semibold">Rol del Sistema</label>
                      <div class="input-group">
                        <span class="input-group-text bg-secondary border-secondary text-light">
                          <i class="bi bi-shield-lock"></i>
                        </span>
                        <input
                          class="form-control bg-dark text-light border-secondary shadow-none"
                          disabled
                          type="text"
                          [value]="rol()"
                        />
                      </div>
                    </div>

                    <div>
                      <label class="form-label text-info-emphasis small fw-semibold">Correo Electrónico</label>
                      <div class="input-group">
                        <span class="input-group-text bg-secondary border-secondary text-light">
                          <i class="bi bi-envelope"></i>
                        </span>
                        <input
                          class="form-control bg-dark text-light border-secondary shadow-none"
                          disabled
                          type="email"
                          [value]="email()"
                        />
                      </div>
                    </div>

                    <div>
                      <label class="form-label text-info-emphasis small fw-semibold">Nombre Completo</label>
                      <div class="input-group">
                        <span class="input-group-text bg-secondary border-secondary text-light">
                          <i class="bi bi-person"></i>
                        </span>
                        <input
                          class="form-control bg-dark text-light border-secondary shadow-none"
                          disabled
                          type="text"
                          [value]="name()"
                        />
                      </div>
                    </div>

                    <!-- Editor CKEditor -->
                    <div>
                      <label class="form-label text-info small fw-semibold">Actualizar tu reseña</label>
                      <div class="ckeditor-wrapper text-dark rounded overflow-hidden">
                        <ckeditor
                          [editor]="Editor"
                          [config]="editorConfig"
                          [(ngModel)]="filosophyContent"
                          name="filosophyContent"
                        ></ckeditor>
                      </div>
                    </div>

                    <div>
                      <label class="form-label text-info small fw-semibold">Actualizar celular</label>
                      <div class="input-group">
                        <span class="input-group-text bg-secondary border-secondary text-light">
                          <i class="bi bi-telephone"></i>
                        </span>
                        <input
                          class="form-control bg-dark text-light border-secondary shadow-none"
                          type="text"
                          placeholder="Escribe el número del celular"
                          [ngModel]="celular()"
                          (ngModelChange)="celular.set($event)"
                          name="celular"
                          autocomplete="tel"
                        />
                      </div>
                    </div>

                    <div>
                      <label class="form-label text-info small fw-semibold">Cambiar Contraseña</label>
                      <div class="input-group">
                        <span class="input-group-text bg-secondary border-secondary text-light">
                          <i class="bi bi-key"></i>
                        </span>
                        <input
                          class="form-control bg-dark text-light border-secondary shadow-none"
                          type="password"
                          placeholder="Escribe la nueva contraseña"
                          [ngModel]="password()"
                          (ngModelChange)="password.set($event)"
                          name="password"
                          autocomplete="new-password"
                        />
                      </div>
                    </div>

                    <input
                      #fileInput
                      type="file"
                      class="d-none"
                      (change)="fileSelectHandler($event)"
                      accept="image/*"
                    />

                    <button 
                      type="submit" 
                      class="btn btn-warning fw-bold py-2.5 mt-3 shadow-sm rounded-3 d-flex justify-content-center align-items-center gap-2"
                    >
                      <i class="bi bi-save"></i>
                      <span>{{ textChange() }}</span>
                      @if (namefile()) {
                        <span class="badge bg-dark text-warning ms-1 text-truncate" style="max-width: 150px;">
                          {{ namefile() }}
                        </span>
                      }
                    </button>
                  </form>
                </div>

                <!-- Columna Derecha: Avatar de Perfil -->
                <div class="col-md-5 text-center">
                  <div class="avatar-container position-relative d-inline-block mx-auto mb-2">
                    <img
                      class="rounded-circle border border-3 border-info shadow-lg cursor-pointer avatar-img"
                      [src]="avatarSrc()"
                      alt="Avatar Perfil"
                      (click)="handleButtonClick()"
                      (error)="handleImageError($event)"
                    />
                    <div 
                      class="avatar-overlay rounded-circle d-flex flex-column align-items-center justify-content-center text-light"
                      (click)="handleButtonClick()"
                    >
                      <i class="bi bi-camera-fill fs-3"></i>
                      <span class="small fw-semibold mt-1">Cambiar</span>
                    </div>
                  </div>
                  <p class="text-secondary small mt-2 mb-0">Haz clic en la imagen para actualizar tu foto</p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .avatar-container {
      width: 180px;
      height: 180px;
      cursor: pointer;
    }

    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .avatar-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(218, 47, 47, 0.6);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .avatar-container:hover .avatar-overlay {
      opacity: 1;
    }

    .avatar-container:hover .avatar-img {
      transform: scale(1.03);
    }

    .form-control:disabled {
      background-color: #1a1e21 !important;
      opacity: 0.7;
    }

    /* Estilos para asegurar legibilidad en CKEditor sobre fondo oscuro */
    ::ng-deep .ck-editor__editable_inline {
      min-height: 150px;
      color: #212529 !important;
      background-color: #ffffff !important;
    }
  `]
})
export class PrivateComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);

  readonly fileInputRef = viewChild<ElementRef<HTMLInputElement>>('fileInput');
  readonly authSvgwww = '/logo.svg';

  public Editor = ClassicEditor;
  public filosophyContent = ''; // Propiedad estándar de clase usada con [(ngModel)] en CKEditor
  
  public editorConfig = {
    placeholder: 'Actualiza tu reseña personal...',
    toolbar: [
      'undo', 'redo', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
      'indent', 'outdent', '|', 'blockQuote', 'insertTable', 'mediaEmbed', 'heading'
    ]
  };

  name = signal<string>('');
  email = signal<string>('');
  celular = signal<string>('');
  rol = signal<string>('');
  foto = signal<string>('');
  password = signal<string>('');

  photoSelected = signal<string>('');
  namefile = signal<string>('');
  selectedFile = signal<File | null>(null);
  textChange = signal<string>('Actualizar perfil');

  avatarSrc = computed(() => {
    if (this.photoSelected()) {
      return this.photoSelected();
    }
    if (this.foto()) {
      const urlApp = `${environment.apiURL}`;
      return `${urlApp}/collections/${this.foto()}`;
    }
    return this.authSvgwww;
  });

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    const user = isAuth();
    const token = getCokie('token');

    if (!user?._id) return;

    const apiUrl = `${environment.apiURL}/api`;
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any>(`${apiUrl}/users/user/${user._id}`, { headers }).subscribe({
      next: (res) => {
        this.rol.set(res.rol || '');
        this.name.set(res.name || '');
        this.celular.set(res.celular || '');
        this.password.set(res.password || '');
        this.filosophyContent = res.filosophy || ''; // Se le asigna el valor al cargar el perfil
        this.email.set(res.email || '');
        this.foto.set(res.foto || '');
      },
      error: (err) => {
        console.error('Error al cargar perfil:', err);
        const errorMsg = err.error?.error || err.statusText || err.message;
        alert(`Error al cargar la información: ${errorMsg}`);

        if (err.status === 401) {
          signout(() => this.router.navigate(['/login']));
        }
      }
    });
  }

  fileSelectHandler(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.selectedFile.set(file);
      this.photoSelected.set(URL.createObjectURL(file));
      this.namefile.set(file.name);
    }
  }

  handleSubmit(e: Event): void {
    e.preventDefault();
    const user = isAuth();
    const token = getCokie('token');

    if (!user?._id) return;

    this.textChange.set('Actualizando...');

    const formData = new FormData();
    const file = this.selectedFile();
    if (file) {
      formData.append('foto', file);
    }
    formData.append('rol', this.rol());
    formData.append('celular', this.celular());
    formData.append('name', this.name());
    formData.append('filosophy', this.filosophyContent); // Envía el valor guardado en el editor
    formData.append('email', this.email());
    
    if (this.password()) {
      formData.append('password', this.password());
    }

    const apiUrl = `${environment.apiURL}/api`;
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.put(`${apiUrl}/users/user/${user._id}`, formData, { headers }).subscribe({
      next: () => {
        this.textChange.set('Actualizar perfil');
        this.password.set('');
        this.selectedFile.set(null);
        this.namefile.set('');
        alert('Perfil actualizado satisfactoriamente');
        this.loadProfile();
      },
      error: (err) => {
        this.textChange.set('Actualizar perfil');
        console.error('Error al actualizar:', err);
        const errorMsg = err.error?.error || err.statusText || err.message;
        alert(`Error al actualizar: ${errorMsg}`);
      }
    });
  }

  handleLogout(): void {
    signout(() => this.router.navigate(['/login']));
  }

  handleButtonClick(): void {
    this.fileInputRef()?.nativeElement.click();
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.onerror = null;
    imgElement.src = this.authSvgwww;
  }
}