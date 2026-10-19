import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Navbar } from './navbar';
import { MarkdownComponent } from 'ngx-markdown';

// --- INTERFACES DE DATOS ---
export interface Appreciation {
  user: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface SubSubTheme {
  user: string;
  title?: string;
  detail: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface SubTheme {
  user: string;
  title?: string;
  detail: string;
  themes: SubSubTheme[];
  likes?: Appreciation[];
  unlikes?: Appreciation[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ForumTheme {
  _id: string;
  title: string;
  detail: string;
  usser?: { email: string, _id: string, name: string }[];
  likes?: Appreciation[];
  unlikes?: Appreciation[];
  units?: SubTheme[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

// Auxiliar de Autenticación
export function isAuth(): any {
  const authData = localStorage.getItem('user');
  return authData ? JSON.parse(authData) : null;
}

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [MarkdownComponent, CommonModule, FormsModule, CKEditorModule, Navbar],
  template: `
    <app-navbar></app-navbar>
    <div class="py-5"></div>

    <div class="bg-light min-vh-100 pb-5 pt-4">
      <div class="container my-4" style="max-width: 990px;">

        <!-- Banner Superior -->
        <div class="card border-0 shadow-sm mb-4 bg-info text-white">
          <div class="card-body p-4 p-md-5 d-flex flex-column flex-md-row justify-content-between align-items-md-center">
            <div class="mb-3 mb-md-0">
              <div class="d-flex align-items-center mb-2">
                <i class="bi bi-chat-square-dots-fill fs-2 me-2 text-light"></i>
                <h2 class="fw-bold mb-0">Foro de Discusión</h2>
              </div>
              <p class="text-white mb-0">Explora preguntas, debates e interactúa con la comunidad.</p>
            </div>
            
            @if (userSession()) {
              <button
                class="btn btn-warning text-dark fw-bold rounded-pill px-4 py-2 shadow-sm"
                (click)="openModal('1', 'Crear Tema')"
              >
                <i class="bi bi-plus-lg me-1"></i> Nuevo Tema
              </button>
            }
          </div>
        </div>

        <!-- Feed de Temas -->
        <div class="d-flex flex-column">
          @for (note of forumThemes(); track note._id || $index; let i = $index) {
            <article class="card border-0 shadow-sm mb-3">
              <div class="card-body p-4">

                <!-- Cabecera del Post -->
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div class="d-flex align-items-center">
                    <div class="rounded-circle bg-info text-white d-inline-flex align-items-center justify-content-center fw-bold shadow-sm flex-shrink-0" style="width: 42px; height: 42px; font-size: 16px;">
                      {{ getInitial(note.usser?.[0]?.email) }}
                    </div>
                    <div class="ms-2">
                      <span class="fw-bold text-dark d-block mb-0" style="line-height: 1.2;">
                        {{ note.usser?.[0]?._id || 'Usuario Anónimo' }}
                      </span>
                      <small class="text-muted">
                        Publicado {{ formatDate(note.createdAt) }}
                      </small>
                    </div>
                  </div>

                  @if (userSession()?.email === note.usser?.[0]?.email || userSession()?.rol === '1') {
                    <div class="btn-group" role="group">
                      <button
                        class="btn btn-sm btn-outline-secondary border-0 rounded-circle me-1"
                        title="Editar"
                        (click)="openModal('1w', 'Actualizar Tema', note.title, note.detail, { i, j: -1, k: -1 }, note._id)"
                      >
                        <i class="bi bi-pencil-fill"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-outline-danger border-0 rounded-circle"
                        title="Eliminar"
                        (click)="removeTheme(note._id)"
                      >
                        <i class="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  }
                </div>

                <!-- Título y Contenido -->
                <h4 class="fw-bold text-dark mb-3">{{ note.title }}</h4>
                  <markdown [katex]="true" [data]="note.detail"></markdown>
                <!-- <div class="text-secondary mb-4 forum-content" [innerHTML]="note.detail"></div> -->

                <!-- Footer del Post -->
                <div class="d-flex align-items-center pt-3 border-top">
                  <div class="btn-group p-1" role="group">
                    <button
                      class="btn btn-sm btn-light text-danger rounded-pill px-3 border-0 d-flex align-items-center me-1 shadow-sm"
                      (click)="handleLike(i, note._id, 'like')"
                    >
                      <i class="bi bi-heart-fill me-1"></i>
                      <span class="fw-bold fst-italic small">{{ note.likes?.length || 0 }}</span>
                    </button>

                    <button
                      class="btn btn-sm btn-light text-secondary rounded-pill px-3 border-0 d-flex align-items-center shadow-sm"
                      (click)="handleLike(i, note._id, 'unlike')"
                    >
                      <i class="bi bi-heart me-1"></i>
                      <span class="fw-bold fst-italic small">{{ note.unlikes?.length || 0 }}</span>
                    </button>
                  </div>

                  <button
                    class="btn btn-sm btn-outline-primary rounded-pill px-3 py-2 ms-auto d-flex align-items-center fw-bold"
                    (click)="openModal('2', 'Responder al Tema', '', '', { i, j: -1, k: -1 }, note._id)"
                  >
                    <i class="bi bi-chat-left-text me-1 fs-5"></i>
                    <span>Comentar ({{ note.units?.length || 0 }})</span>
                  </button>
                </div>

                <!-- Sub-comentarios (Nivel 2) -->
                @if (note.units && note.units.length > 0) {
                  <div class="mt-4 pt-3 bg-white border-start border-3 border-primary rounded p-3 p-md-4 ms-md-2">
                    <div class="d-flex align-items-center text-primary fw-bold small text-uppercase mb-3">
                      <i class="bi bi-diagram-3 me-1 fs-5"></i>
                      <span>Respuestas ({{ note.units.length }})</span>
                    </div>

                    @for (notte of note.units; track $index; let j = $index) {
                      <div class="mb-3 pb-3 border-bottom">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                          <div class="d-flex align-items-center">
                            <div class="rounded-circle bg-info text-white d-inline-flex align-items-center justify-content-center fw-bold shadow-sm flex-shrink-0" style="width: 36px; height: 36px; font-size: 14px;">
                              {{ getInitial(notte.user) }}
                            </div>
                            <div class="ms-2">
                              <span class="fw-bold text-dark small d-block mb-0">{{ notte.user }}</span>
                              <small class="text-muted" style="font-size: 0.75rem;">
                                {{ formatDate(notte.createdAt) }}
                              </small>
                            </div>
                          </div>

                          @if (userSession()?.email === notte.user || userSession()?.rol === '1') {
                            <div class="btn-group">
                              <button
                                class="btn btn-sm btn-link text-muted p-1"
                                (click)="openModal('2w', 'Actualizar Comentario', notte.title || '', notte.detail, { i, j, k: -1 }, note._id)"
                              >
                                <i class="bi bi-pencil-fill"></i>
                              </button>
                              <button
                                class="btn btn-sm btn-link text-danger p-1"
                                (click)="removeSubTheme(i, j, note._id)"
                              >
                                <i class="bi bi-trash-fill"></i>
                              </button>
                            </div>
                          }
                        </div>

                  <markdown [katex]="true" [data]="notte.detail"></markdown>
                        <!-- <div class="small text-secondary mb-2 ms-4 ps-1" [innerHTML]="notte.detail"></div> -->

                        <!-- Reacciones Nivel 2 -->
                        <div class="d-flex align-items-center ms-4 ps-1">
                          <button
                            class="btn btn-link text-danger p-0 border-0 d-flex align-items-center small text-decoration-none me-3"
                            (click)="handleSubLike(i, j, note._id, 'like')"
                          >
                            <i class="bi bi-heart-fill me-1"></i> {{ notte.likes?.length || 0 }}
                          </button>

                          <button
                            class="btn btn-link text-secondary p-0 border-0 d-flex align-items-center small text-decoration-none me-3"
                            (click)="handleSubLike(i, j, note._id, 'unlike')"
                          >
                            <i class="bi bi-heart me-1"></i> {{ notte.unlikes?.length || 0 }}
                          </button>

                          <button
                            class="btn btn-link p-0 text-primary small fw-bold ms-auto text-decoration-none"
                            (click)="openModal('3', 'Responder Comentario', '', '', { i, j: -1, k: -1 }, note._id)"
                          >
                            Responder
                          </button>
                        </div>

                        <!-- Sub-sub-comentarios (Nivel 3) -->
                        @if (notte.themes && notte.themes.length > 0) {
                          <div class="mt-3 ms-4 ps-2 rounded p-2 border-start">
                            @for (nottte of notte.themes; track $index; let k = $index) {
                              <div class="p-2 bg-white rounded shadow-sm my-2 border">
                                <div class="d-flex align-items-center">
                                  <div class="rounded-circle bg-info text-white d-inline-flex align-items-center justify-content-center fw-bold shadow-sm flex-shrink-0" style="width: 28px; height: 28px; font-size: 11px;">
                                    {{ getInitial(nottte.user) }}
                                  </div>
                                  <div class="ms-2">
                                    <span class="fw-bold text-dark small d-block mb-0">{{ nottte.user }}</span>
                                    <small class="text-muted" style="font-size: 0.75rem;">
                                      {{ formatDate(nottte.createdAt) }}
                                    </small>
                                  </div>
                                </div>
                                <markdown [katex]="true" [data]="nottte.detail"></markdown>
                                <!-- <div class="small text-secondary mt-1 ms-4" [innerHTML]="nottte.detail"></div> -->

                                @if (userSession()?.email === nottte.user) {
                                  <div class="d-flex justify-content-end mt-1">
                                    <button
                                      class="btn btn-sm btn-link text-muted p-0 me-2"
                                      (click)="openModal('3w', 'Actualizar Respuesta', nottte.title || '', nottte.detail, { i, j, k }, note._id)"
                                    >
                                      <i class="bi bi-pencil-fill"></i>
                                    </button>
                                    <button
                                      class="btn btn-sm btn-link text-danger p-0"
                                      (click)="removeSubSubTheme(i, j, k, note._id)"
                                    >
                                      <i class="bi bi-trash-fill"></i>
                                    </button>
                                  </div>
                                }
                              </div>
                            }
                          </div>
                        }

                      </div>
                    }
                  </div>
                }

              </div>
            </article>
          }
        </div>
      </div>

      <!-- Modal de Bootstrap 5 -->
      @if (showModal()) {
        <div class="modal fade show d-block tab-modal-backdrop" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header bg-light">
                <h5 class="modal-title fw-bold text-dark mb-0">{{ submitLabel() }}</h5>
                <button type="button" class="btn-close" (click)="closeModal()"></button>
              </div>
              <div class="modal-body p-4">
                @if (modalOption() === '1' || modalOption() === '1w') {
                  <div class="mb-3">
                    <label class="fw-bold small text-secondary form-label">Título de la publicación</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Escribe un título claro e intuitivo..."
                      [(ngModel)]="formTitle"
                    />
                  </div>
                }

                <div class="mb-3">
                  <label class="fw-bold small text-secondary form-label">Contenido o detalle</label>
                  <div class="border rounded overflow-hidden">
                    <ckeditor
                      [editor]="Editor"
                      [config]="editorConfig"
                      [(ngModel)]="formDetail"
                    ></ckeditor>
                  </div>
                </div>

                @if (formDetail) {
                  <div class="mt-3 p-3 bg-light rounded border">
                    <small class="text-uppercase text-muted fw-bold d-block mb-1">Vista previa:</small>
                    <div [innerHTML]="formDetail"></div>
                  </div>
                }
              </div>
              <div class="modal-footer bg-light">
                <button type="button" class="btn btn-secondary rounded-pill px-4" (click)="closeModal()">
                  Cancelar
                </button>
                <button type="button" class="btn btn-primary rounded-pill px-4 fw-bold" (click)="handleModalSubmit()">
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .forum-content ::ng-deep img { max-width: 100%; height: auto; border-radius: 4px; }
    ::ng-deep .ck-editor__editable_inline { min-height: 180px; }
  `]
})
export class ForumComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  // Configuración CKEditor
  public Editor: any = ClassicEditor;
  public editorConfig = {
    language: 'es',
    placeholder: 'Escribe tus comentarios...',
    toolbar: [
      'heading', '|',
      'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
      'blockQuote', 'insertTable', 'undo', 'redo'
    ]
  };

  // Instancia de Socket.IO Client v2.5.0
  private socket!: SocketIOClient.Socket;
  private readonly COURSE_ID = '69e5631506598f7ce9c31e21';

  // Signals para Estado reactivo
  forumThemes = signal<ForumTheme[]>([]);
  showModal = signal<boolean>(false);
  modalOption = signal<string>('');
  submitLabel = signal<string>('Crear');
  activeId = signal<string>('');
  activeIndices = signal<{ i: number; j: number; k: number }>({ i: -1, j: -1, k: -1 });

  // Formularios en Modal
  formTitle = '';
  formDetail = '';

  // Sesión computable
  userSession = computed(() => isAuth());

  ngOnInit(): void {
    document.title = `FORO ${environment.title || ''}`;
    this.initSocketIO();
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  // --- Socket.IO Client v2.5.0 Connection ---
  private initSocketIO(): void {
    this.socket = io(environment.apiURL, {
      transports: ['websocket', 'polling']
    });

    // Escuchar evento de conexión exitosa
    this.socket.on('connect', () => {
      this.getNotes();
    });

    // Escuchar el evento 'foro' emitido por el servidor
    this.socket.on('foro', (data: ForumTheme[]) => {
      this.forumThemes.set(data || []);
    });

    // Capturar errores de conexión
    this.socket.on('connect_error', (err: any) => {
      console.error('Error de conexión en Socket.IO:', err);
    });
  }

  private getNotes(): void {
    if (this.socket && this.socket.connected) {
      this.socket.emit('foroesfa', this.COURSE_ID);
      this.socket.emit('temas', this.COURSE_ID);
    }
  }

  // --- Manejo Modal ---
  openModal(
    option: string,
    submitText: string,
    title = '',
    detail = '',
    indices = { i: -1, j: -1, k: -1 },
    id = ''
  ): void {
    if (!this.userSession()) {
      this.router.navigate(['/login']);
      return;
    }

    this.modalOption.set(option);
    this.submitLabel.set(submitText);
    this.formTitle = title;
    this.formDetail = detail;
    this.activeIndices.set(indices);
    this.activeId.set(id);
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.formTitle = '';
    this.formDetail = '';
  }

  handleModalSubmit(): void {
    switch (this.modalOption()) {
      case '1': this.createTheme(); break;
      case '1w': this.updateTheme(); break;
      case '2': this.createSubTheme(); break;
      case '2w': this.updateSubTheme(); break;
      case '3': this.createSubSubTheme(); break;
      case '3w': this.updateSubSubTheme(); break;
    }
  }

  // --- Operaciones HTTP ---
  createTheme(): void {
    const user = this.userSession();
    const payload = {
      detail: this.formDetail,
      title: this.formTitle,
      type: 'foroesfa',
      curse: this.COURSE_ID,
      user: user._id
    };

    this.http.post(`${environment.apiURL}/api/foros/theme`, payload).subscribe({
      next: () => {
        this.getNotes();
        this.closeModal();
        this.toastr.success('Tema publicado con éxito');
      },
      error: () => this.toastr.error('Ocurrió un error al publicar')
    });
  }

  updateTheme(): void {
    const payload = { detail: this.formDetail, title: this.formTitle };
    this.http.put(`${environment.apiURL}/api/foros/theme/${this.activeId()}`, payload).subscribe({
      next: () => {
        this.getNotes();
        this.closeModal();
        this.toastr.info('Tema actualizado correctamente');
      },
      error: () => this.toastr.error('Error al actualizar')
    });
  }

  removeTheme(themeId: string): void {
    if (confirm('¿Estás seguro de eliminar este tema?')) {
      this.http.delete(`${environment.apiURL}/api/foros/theme/${themeId}`).subscribe({
        next: () => {
          this.getNotes();
          this.toastr.info('Tema eliminado');
        },
        error: () => this.toastr.error('Error al eliminar')
      });
    }
  }

  private saveLikesChanges(updatedData: ForumTheme[], targetId: string, index: number): void {
    this.http.put(`${environment.apiURL}/api/foros/theme/${targetId}`, updatedData[index]).subscribe();
  }

  private saveSubThemeChanges(updatedData: ForumTheme[]): void {
    const { i } = this.activeIndices();
    this.http.put(`${environment.apiURL}/api/foros/theme/${this.activeId()}`, updatedData[i]).subscribe({
      next: () => {
        this.closeModal();
        this.toastr.success('Comentario guardado');
      },
      error: () => this.toastr.error('Error al publicar comentario')
    });
  }

  // --- Reacciones ---
  handleLike(i: number, targetId: string, type: 'like' | 'unlike'): void {
    const user = this.userSession();
    if (!user) return void this.router.navigate(['/login']);

    const data = structuredClone(this.forumThemes());
    const targetArray = type === 'like' ? 'likes' : 'unlikes';

    if (!data[i][targetArray]) data[i][targetArray] = [];

    const hasAppreciation = data[i][targetArray]?.some(u => u.user === user.email);

    if (hasAppreciation) {
      this.toastr.warning('Ya has reaccionado a este tema');
    } else {
      data[i][targetArray]?.unshift({
        user: user.email,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      this.forumThemes.set(data);
      this.saveLikesChanges(data, targetId, i);
    }
  }

  handleSubLike(i: number, j: number, targetId: string, type: 'like' | 'unlike'): void {
    const user = this.userSession();
    if (!user) return void this.router.navigate(['/login']);

    const data = structuredClone(this.forumThemes());
    const targetArray = type === 'like' ? 'likes' : 'unlikes';

    if (!data[i].units![j][targetArray]) data[i].units![j][targetArray] = [];

    const hasAppreciation = data[i].units![j][targetArray]?.some(u => u.user === user.email);

    if (hasAppreciation) {
      this.toastr.warning('Ya has reaccionado a esta respuesta');
    } else {
      data[i].units![j][targetArray]?.unshift({
        user: user.email,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      this.forumThemes.set(data);
      this.saveLikesChanges(data, targetId, i);
    }
  }

  // --- Sub-temas Nivel 2 ---
  createSubTheme(): void {
    const user = this.userSession();
    if (!user) return void this.router.navigate(['/login']);

    const { i } = this.activeIndices();
    const data = structuredClone(this.forumThemes());

    if (!data[i].units) data[i].units = [];
    data[i].units!.unshift({
      user: user.email,
      title: this.formTitle,
      detail: this.formDetail,
      themes: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    this.forumThemes.set(data);
    this.saveSubThemeChanges(data);
  }

  updateSubTheme(): void {
    const { i, j } = this.activeIndices();
    const data = structuredClone(this.forumThemes());

    data[i].units![j].title = this.formTitle;
    data[i].units![j].detail = this.formDetail;
    data[i].units![j].updatedAt = new Date();

    this.forumThemes.set(data);
    this.saveSubThemeChanges(data);
  }

  removeSubTheme(i: number, j: number, targetId: string): void {
    if (confirm('¿Deseas eliminar este comentario?')) {
      const data = structuredClone(this.forumThemes());
      data[i].units!.splice(j, 1);
      this.forumThemes.set(data);

      this.http.put(`${environment.apiURL}/api/foros/theme/${targetId}`, data[i]).subscribe({
        next: () => this.toastr.info('Comentario eliminado'),
        error: (err) => console.error(err)
      });
    }
  }

  // --- Sub-temas Nivel 3 ---
  createSubSubTheme(): void {
    const user = this.userSession();
    if (!user) return void this.router.navigate(['/login']);

    const { i, j } = this.activeIndices();
    const data = structuredClone(this.forumThemes());

    data[i].units![j].themes.unshift({
      user: user.email,
      title: this.formTitle,
      detail: this.formDetail,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    this.forumThemes.set(data);
    this.saveSubThemeChanges(data);
  }

  updateSubSubTheme(): void {
    const { i, j, k } = this.activeIndices();
    const data = structuredClone(this.forumThemes());

    data[i].units![j].themes[k].title = this.formTitle;
    data[i].units![j].themes[k].detail = this.formDetail;
    data[i].units![j].themes[k].updatedAt = new Date();

    this.forumThemes.set(data);
    this.saveSubThemeChanges(data);
  }

  removeSubSubTheme(i: number, j: number, k: number, targetId: string): void {
    if (confirm('¿Deseas eliminar esta respuesta?')) {
      const data = structuredClone(this.forumThemes());
      data[i].units![j].themes.splice(k, 1);
      this.forumThemes.set(data);

      this.http.put(`${environment.apiURL}/api/foros/theme/${targetId}`, data[i]).subscribe({
        next: () => this.toastr.info('Respuesta eliminada'),
        error: (err) => console.error(err)
      });
    }
  }

  // --- Formateadores de Apariencia ---
  getInitial(email?: string): string {
    return email ? email.charAt(0).toUpperCase() : 'U';
  }

  formatDate(date: string | Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}