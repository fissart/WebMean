import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Navbar } from './navbar';
import { MarkdownComponent } from 'ngx-markdown';
import { GlbViewerComponent } from './exhibicionchildglb';
import { CheckoutIzipayComponent } from './isipay';
import { MathRendererDirective } from './mathrender';
import { TextToSpeechComponent } from './speech';

export interface Appreciation {
  user: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface CriticalAnnotation {
  user: string;
  title?: string;
  detail: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Usser {
  _id?: string;
  name: string;
  filosophy: string;
  email: string;
  dni?: string;
  cell?: string;
  celular?: string;
  foto?: string;
  about?: string;
}

export interface CuratorialEssay {
  user: string;
  title?: string;
  detail: string;
  themes: CriticalAnnotation[];
  likes?: Appreciation[];
  unlikes?: Appreciation[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ArtworkCuratorship {
  _id: string;
  title: string;
  type: string;
  email: string;
  audioEsUrl?: string;
  audioQuUrl?: string;
  imageUrl?: string;
  curator: string;
  detail: string;
  usser?: { email: string; _id: string; name: string; curator?: string; detail?: string }[];
  likes?: Appreciation[];
  unlikes?: Appreciation[];
  units?: CuratorialEssay[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

export function isAuth(): any {
  const authData = localStorage.getItem('user');
  return authData ? JSON.parse(authData) : null;
}

@Component({
  selector: 'app-art-curatorship',
  standalone: true,
  imports: [
    MarkdownComponent,
    CommonModule,
    FormsModule,
    CKEditorModule,
    MathRendererDirective,
    TextToSpeechComponent,
    Navbar,
    CheckoutIzipayComponent,
    GlbViewerComponent
  ],
  template: `
    <app-navbar></app-navbar>
    <div class="py-5"></div>
    
    @if (userSession()?.rol === '1') {
      <app-checkout-izipay></app-checkout-izipay>
    }
    
    <div class="bg-dark text-light min-vh-100 pb-5 pt-4">
      <div class="container my-4" style="max-width: 1080px;">
        
        <!-- Tarjeta de Información del Usuario/Curador (USSER) -->
        @if (usser(); as userProfile) {
          <div class="card border-0 shadow-lg mb-4 bg-secondary-dark text-white border-left border-info" style="border-left-width: 4px !important;">
            <div class="card-body p-4 border rounded">
              <div class="align-items-center mb-3">
                <div class="text-center mb-3">
                  @if (userProfile.foto) {
                    <img
                      class="rounded-circle border-info shadow-sm object-fit-cover-style"
                      [src]="getPerfilImageUrl(userProfile.foto)"
                      [alt]="userProfile.name || 'Foto del usuario'"
                      style="width: 194px; height: 194px; object-fit: cover;"
                    />
                  } @else {
                    <div class="rounded-circle bg-info text-dark d-inline-flex align-items-center justify-content-center font-weight-bold shadow-sm" style="width: 54px; height: 54px; font-size: 22px;">
                      {{ getInitial(userProfile.name || userProfile.email) }}
                    </div>
                  }
                </div>

                <div class="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between">
                  <div>
                    <h4 class="font-weight-bold mb-0 text-white">{{ userProfile.name }}</h4>
                    <small class="text-info d-block">{{ userProfile.email }}</small>
                    @if (userProfile.cell || userProfile.celular) {
                      <small class="text-light d-block mt-1"><strong>Teléfono:</strong> {{ userProfile.cell || userProfile.celular }}</small>
                    }
                  </div>

                  @if (userProfile.cell || userProfile.celular) {
                    <div class="btn-group mt-3 mt-sm-0" role="group">
                      <a
                        [href]="'tel:' + (userProfile.cell || userProfile.celular)"
                        class="btn btn-info"
                        title="Llamar"
                      >
                        <i class="bi bi-telephone-fill"></i>
                      </a>
                      <button
                        type="button"
                        class="btn btn-success"
                        title="WhatsApp"
                        (click)="sendWhatsAppMessage(userProfile.cell || userProfile.celular, userProfile.name)"
                      >
                        <i class="bi bi-whatsapp"></i>
                      </button>
                    </div>
                  }
                </div>

                @if (userProfile.filosophy) {
                  <div class="col-12 mt-3 pt-3 border-top border-secondary text-light px-0">
                    <strong class="text-info">Sobre el curador/usuario:</strong>
                    <div [appMathRenderer]="userProfile.filosophy"></div>
                  </div>
                }
              </div>
            </div>
          </div>
          
          <!-- Banner Superior Galería -->
          <div class="card border-0 shadow-lg mb-4 bg-gradient-dark text-white border-left border-warning" style="border-left-width: 4px !important;">
          <div class="card-body p-4 p-md-5 d-flex flex-column flex-md-row justify-content-between align-items-md-center">
            <div class="mb-3 mb-md-0">
              <div class="d-flex align-items-center mb-2">
                <!-- <i class="bi bi-palette-fill h2 mb-0 text-warning mr-2"></i> -->
                <h2 class="font-weight-bold mb-0 text-uppercase tracking-wider">Curaduría & Galería de Arte</h2>
              </div>
              <p class="text-secondary mb-0">
                Espacio de exhibición, análisis crítico y debate sobre colecciones visuales de {{userProfile.name}}.
              </p>
            </div>
            @if ((userSession() && emailWorks === userSession()?._id) || userSession()?.rol === '1') {
              <button
                class="btn btn-warning"
                (click)="openModal('1', 'Publicar Nueva Obra/Muestra')"
              >
                <i class="bi bi-plus-lg mr-1"></i> Nueva obra
              </button>
            }
          </div>
        </div>
      }
        
        <!-- Muestras de la Galería -->
        <div>
          @for (artwork of artworkExhibits(); track artwork._id || $index; let i = $index) {
            <article class="card bg-secondary-dark text-light border-0 shadow-lg overflow-hidden mb-4">
              <div class="card-body p-4 p-md-5">
                <div class="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary">
                  <div class="d-flex align-items-center">
                    <div class="rounded-circle bg-warning text-dark d-inline-flex align-items-center justify-content-center font-weight-bold shadow-sm flex-shrink-0 mr-3" style="width: 46px; height: 46px; font-size: 18px;">
                      {{ getInitial(artwork.curator || artwork.email) }}
                    </div>
                    <div>
                      <span class="font-weight-bold text-warning d-block mb-0" style="line-height: 1.2;">
                        Curador: {{ artwork.curator || 'Curador Anónimo' }}
                      </span>
                      <small class="text-muted">
                        Exhibido el {{ formatDate(artwork.createdAt) }}
                      </small>
                    </div>
                  </div>
                  @if (userSession()?.email === artwork.email || userSession()?.rol === '1') {
                    <div class="btn-group" role="group">
                      <button
                        class="btn btn-sm btn-outline-light border-0 rounded-circle mr-1"
                        title="Editar Muestra"
                        (click)="openModal('1w', 'Actualizar Obra/Muestra', artwork.title, artwork.detail, { i, j: -1, k: -1 }, artwork._id)"
                      >
                        <i class="bi bi-pencil-fill"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-outline-danger border-0 rounded-circle"
                        title="Eliminar de Galería"
                        (click)="removeTheme(artwork._id)"
                      >
                        <i class="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  }
                </div>
                
                <h3 class="font-weight-bold text-white mb-3 text-uppercase font-serif">{{ artwork.title }}</h3>
                
                @if (artwork.imageUrl) {
                  <div class="card-image-wrapper position-relative mb-3 overflow-hidden rounded">
                    @if (artwork.imageUrl.endsWith('.glb') || artwork.imageUrl.endsWith('.obj') || artwork.imageUrl.endsWith('.gltf')) {
                      <app-glb-viewer [glbSource]="getImageUrl(artwork.imageUrl)"></app-glb-viewer>
                    } @else {
                      <img [src]="getImageUrl(artwork.imageUrl)" [alt]="artwork.title" class="img-fluid w-100 object-fit-cover-style" style="max-height: 450px;" />
                    }
                  </div>
                }

                @if (artwork.audioEsUrl || artwork.audioQuUrl) {
                  <div class="p-3 bg-dark border border-secondary rounded mb-3">
                    <small class="font-weight-bold text-warning text-uppercase d-block mb-2">
                      <i class="bi bi-volume-up-fill mr-1"></i> Audioguía de la Muestra
                    </small>    
                    <div class="row">
                      @if (artwork.audioEsUrl) {
                        <div class="col-md-6 mb-2 mb-md-0">
                          <div class="d-flex align-items-center bg-secondary-dark p-2 rounded">
                            <span class="badge badge-warning text-dark mr-2">ES</span>
                            <audio controls class="w-100" style="height: 32px;" [src]="getImageUrl(artwork.audioEsUrl)"></audio>
                          </div>
                        </div>
                      }
                      @if (artwork.audioQuUrl) {
                        <div class="col-md-6">
                          <div class="d-flex align-items-center bg-secondary-dark p-2 rounded">
                            <span class="badge badge-info text-dark mr-2">QU</span>
                            <audio controls class="w-100" style="height: 32px;" [src]="getImageUrl(artwork.audioQuUrl)"></audio>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                }

                <div class="artwork-markdown-container mb-4">
                  <markdown [katex]="true" [data]="artwork.detail"></markdown>
                </div>

                <app-text-to-speech [text]="artwork.detail.replace(/<[^>]*>/g, '')" />

                <div class="d-flex align-items-center pt-3 border-top border-secondary flex-wrap">
                  <div class="btn-group p-1 mr-auto mb-2 mb-sm-0" role="group">
                    <button
                      class="btn btn-sm btn-outline-warning rounded-0 px-3 border-0 d-flex align-items-center mr-1"
                      title="Apreciación Favorable"
                      (click)="handleLike(i, artwork._id, 'like')"
                    >
                      <i class="bi bi-award-fill mr-1"></i>
                      <span class="font-weight-bold font-italic small">{{ artwork.likes?.length || 0 }}</span>
                    </button>
                    <button
                      class="btn btn-sm btn-outline-secondary rounded-0 px-3 border-0 d-flex align-items-center"
                      title="En Revisión"
                      (click)="handleLike(i, artwork._id, 'unlike')"
                    >
                      <i class="bi bi-award mr-1"></i>
                      <span class="font-weight-bold font-italic small">{{ artwork.unlikes?.length || 0 }}</span>
                    </button>
                  </div>

                  <button
                    class="btn btn-sm btn-outline-warning rounded-0 px-3 py-2 d-flex align-items-center font-weight-bold text-uppercase"
                    (click)="openModal('2', 'Redactar Ensayo Crítico', '', '', { i, j: -1, k: -1 }, artwork._id)"
                  >
                    <i class="bi bi-journal-text h5 mb-0 mr-2"></i>
                    <span>Ensayos Críticos ({{ artwork.units?.length || 0 }})</span>
                  </button>
                </div>

                @if (artwork.units && artwork.units.length > 0) {
                  <div class="mt-4 pt-4 border-left border-warning rounded-0 p-3 p-md-4 ml-md-2 bg-dark" style="border-left-width: 3px !important; background-color: rgba(0,0,0,0.25) !important;"> 
                    <div class="d-flex align-items-center text-warning font-weight-bold small text-uppercase mb-3 tracking-wider">
                      <i class="bi bi-vector-pen h5 mb-0 mr-2"></i>
                      <span>Críticas & Análisis Ensayísticos ({{ artwork.units.length }})</span>
                    </div>

                    @for (essay of artwork.units; track $index; let j = $index) {
                      <div class="mb-4 pb-3 border-bottom border-secondary">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                          <div class="d-flex align-items-center">
                            <div class="rounded-circle bg-secondary text-warning d-inline-flex align-items-center justify-content-center font-weight-bold shadow-sm flex-shrink-0 mr-2" style="width: 36px; height: 36px; font-size: 14px;">
                              {{ getInitial(essay.user) }}
                            </div>
                            <div>
                              <span class="font-weight-bold text-light small d-block mb-0">{{ essay.user }}</span>
                              <small class="text-muted" style="font-size: 0.75rem;">
                                Crítica redactada el {{ formatDate(essay.createdAt) }}
                              </small>
                            </div>
                          </div>

                          @if (userSession()?.email === essay.user || userSession()?.rol === '1') {
                            <div class="btn-group">
                              <button
                                class="btn btn-sm btn-link text-muted p-1 mr-1"
                                (click)="openModal('2w', 'Actualizar Ensayo', essay.title || '', essay.detail, { i, j, k: -1 }, artwork._id)"
                              >
                                <i class="bi bi-pencil-fill"></i>
                              </button>
                              <button
                                class="btn btn-sm btn-link text-danger p-1"
                                (click)="removeSubTheme(i, j, artwork._id)"
                              >
                                <i class="bi bi-trash-fill"></i>
                              </button>
                            </div>
                          }
                        </div>

                        <div class="ml-4 pl-1 text-light">
                          <markdown [katex]="true" [data]="essay.detail"></markdown>
                        </div>

                        <div class="d-flex align-items-center ml-4 pl-1 mt-2 flex-wrap">
                          <button
                            class="btn btn-link text-warning p-0 border-0 d-flex align-items-center small text-decoration-none mr-3"
                            (click)="handleSubLike(i, j, artwork._id, 'like')"
                          >
                            <i class="bi bi-star-fill mr-1"></i> {{ essay.likes?.length || 0 }}
                          </button>
                          <button
                            class="btn btn-link text-secondary p-0 border-0 d-flex align-items-center small text-decoration-none mr-3"
                            (click)="handleSubLike(i, j, artwork._id, 'unlike')"
                          >
                            <i class="bi bi-star mr-1"></i> {{ essay.unlikes?.length || 0 }}
                          </button>
                          <button
                            class="btn btn-link p-0 text-warning small font-weight-bold ml-auto text-decoration-none text-uppercase"
                            (click)="openModal('3', 'Añadir Anotación', '', '', { i, j, k: -1 }, artwork._id)"
                          >
                            Añadir Anotación
                          </button>
                        </div>

                        @if (essay.themes && essay.themes.length > 0) {
                          <div class="mt-3 ml-4 pl-3 border-left border-secondary">
                            @for (annotation of essay.themes; track $index; let k = $index) {
                              <div class="p-3 bg-dark rounded-0 my-2 border border-secondary shadow-sm">
                                <div class="d-flex align-items-center mb-2">
                                  <div class="rounded-circle bg-secondary text-white d-inline-flex align-items-center justify-content-center font-weight-bold flex-shrink-0 mr-2" style="width: 28px; height: 28px; font-size: 11px;">
                                    {{ getInitial(annotation.user) }}
                                  </div>
                                  <div>
                                    <span class="font-weight-bold text-light small d-block mb-0">{{ annotation.user }}</span>
                                    <small class="text-muted" style="font-size: 0.75rem;">
                                      {{ formatDate(annotation.createdAt) }}
                                    </small>
                                  </div>
                                </div>
                                
                                <div class="small text-light">
                                  <markdown [katex]="true" [data]="annotation.detail"></markdown>
                                </div>

                                @if (userSession()?.email === annotation.user || userSession()?.rol === '1') {
                                  <div class="d-flex justify-content-end mt-1">
                                    <button
                                      class="btn btn-sm btn-link text-muted p-0 mr-2"
                                      (click)="openModal('3w', 'Editar Anotación', annotation.title || '', annotation.detail, { i, j, k }, artwork._id)"
                                    >
                                      <i class="bi bi-pencil-fill"></i>
                                    </button>
                                    <button
                                      class="btn btn-sm btn-link text-danger p-0"
                                      (click)="removeSubSubTheme(i, j, k, artwork._id)"
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

      <!-- MODAL COMPATIBLE CON BOOTSTRAP 4 -->
      @if (showModal()) {
        <div class="modal show d-block fade" tabindex="-1" style="background-color: rgba(0,0,0,0.85);">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content bg-dark text-light border border-secondary">
              <div class="modal-header border-secondary">
                <h5 class="modal-title font-weight-bold text-warning mb-0 text-uppercase">{{ submitLabel() }}</h5>
                <button type="button" class="close text-white" aria-label="Close" (click)="closeModal()">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body p-4">
                @if (modalOption() === '1' || modalOption() === '1w') {
                  <div class="form-group mb-3">
                    <label class="font-weight-bold small text-warning text-uppercase">Título de la Muestra / Obra</label>
                    <input
                      type="text"
                      class="form-control bg-secondary-dark text-light border-secondary"
                      placeholder="Ej: El Claroscuro en el Arte Barroco..."
                      [(ngModel)]="formTitle"
                    />
                  </div>

                  <div class="form-group mb-3">
                    <label class="font-weight-bold small text-warning text-uppercase">Adjuntar Archivo / Imagen de la Obra</label>
                    <input
                      type="file"
                      class="form-control text-light bg-secondary-dark border-secondary"
                      [disabled]="isUploading()"
                      (change)="onFileSelected($event)"
                    />
                    @if (selectedFile) {
                      <small class="text-warning mt-1 d-block">
                        <i class="bi bi-paperclip mr-1"></i>
                        Archivo seleccionado: <strong>{{ selectedFile.name }}</strong> ({{ (selectedFile.size / 1024).toFixed(1) }} KB)
                      </small>
                    }
                  </div>

                  <div class="row mb-3">
                    <div class="col-md-6 mb-3 mb-md-0">
                      <div class="form-group mb-0">
                        <label class="font-weight-bold small text-warning text-uppercase mb-1">
                          <i class="bi bi-mic-fill mr-1"></i> Audio en Español (MP3/WAV)
                        </label>
                        <input
                          type="file"
                          accept="audio/*"
                          class="form-control text-light bg-secondary-dark border-secondary"
                          [disabled]="isUploading()"
                          (change)="onAudioEsSelected($event)"
                        />
                        @if (selectedAudioEs) {
                          <small class="text-info mt-1 d-block text-truncate">
                            <i class="bi bi-music-note mr-1"></i> {{ selectedAudioEs.name }}
                          </small>
                        }
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group mb-0">
                        <label class="font-weight-bold small text-warning text-uppercase mb-1">
                          <i class="bi bi-mic-fill mr-1"></i> Audio en Quechua (MP3/WAV)
                        </label>
                        <input
                          type="file"
                          accept="audio/*"
                          class="form-control text-light bg-secondary-dark border-secondary"
                          [disabled]="isUploading()"
                          (change)="onAudioQuSelected($event)"
                        />
                        @if (selectedAudioQu) {
                          <small class="text-info mt-1 d-block text-truncate">
                            <i class="bi bi-music-note mr-1"></i> {{ selectedAudioQu.name }}
                          </small>
                        }
                      </div>
                    </div>
                  </div>
                }

                <div class="form-group mb-3">
                  <label class="font-weight-bold small text-warning text-uppercase mb-1">Texto Curatorial / Ficha Técnica</label>
                  <div class="border border-secondary rounded overflow-hidden">
                    <ckeditor
                      [editor]="Editor"
                      [config]="editorConfig"
                      [(ngModel)]="formDetail"
                    ></ckeditor>
                  </div>
                </div>

                @if (formDetail) {
                  <div class="mt-3 p-3 bg-secondary-dark rounded border border-secondary">
                    <small class="text-uppercase text-warning font-weight-bold d-block mb-1">Vista previa del análisis:</small>
                    <div [innerHTML]="formDetail" class="text-light"></div>
                  </div>
                }

                @if (isUploading()) {
                  <div class="mt-3">
                    <div class="d-flex justify-content-between text-warning small mb-1 font-weight-bold">
                      <span>Subiendo archivo...</span>
                      <span>{{ uploadProgress() }}%</span>
                    </div>
                    <div class="progress rounded-0 bg-secondary" style="height: 10px;">
                      <div
                        class="progress-bar bg-warning progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        [style.width.%]="uploadProgress()"
                        [attr.aria-valuenow]="uploadProgress()"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                }
              </div>
              <div class="modal-footer border-secondary">
                <button
                  type="button"
                  class="btn btn-outline-secondary rounded-0 px-4"
                  [disabled]="isUploading()"
                  (click)="closeModal()"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  class="btn btn-warning rounded-0 px-4 font-weight-bold text-uppercase d-flex align-items-center"
                  [disabled]="isUploading()"
                  (click)="handleModalSubmit()"
                >
                  @if (isUploading()) {
                    <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                    Subiendo...
                  } @else {
                    Guardar en Galería
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .bg-gradient-dark {
      background: linear-gradient(145deg, #1e2229 0%, #121418 100%);
    }
    .bg-secondary-dark {
      background-color: #1a1d24;
    }
    .font-serif {
      font-family: 'Georgia', 'Times New Roman', serif;
    }
    .tracking-wider {
      letter-spacing: 0.08em;
    }
    .object-fit-cover-style {
      object-fit: cover;
    }
    .card-image-wrapper img {
      border-radius: 4px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    }
    .artwork-markdown-container ::ng-deep img { 
      max-width: 100%; 
      height: auto; 
      border-radius: 2px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.5);
      margin: 15px 0;
    }
    ::ng-deep .ck-editor__editable_inline { 
      min-height: 200px; 
      background-color: #ffffff !important;
      color: #212529 !important;
    }
  `]
})
export class ArtCuratorshipComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private route = inject(ActivatedRoute);

  public Editor: any = ClassicEditor;
  public editorConfig = {
    language: 'es',
    placeholder: 'Escribe el análisis o ficha técnica...',
    toolbar: [
      'heading', '|',
      'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
      'blockQuote', 'insertTable', 'undo', 'redo'
    ]
  };

  currentWorksParam!: string;
  emailWorks!: string;

  usser = signal<Usser | null>(null);
  artworkExhibits = signal<ArtworkCuratorship[]>([]);
  showModal = signal<boolean>(false);
  modalOption = signal<string>('');
  submitLabel = signal<string>('Publicar');
  activeId = signal<string>('');
  activeIndices = signal<{ i: number; j: number; k: number }>({ i: -1, j: -1, k: -1 });

  formTitle = '';
  formDetail = '';

  uploadProgress = signal<number>(0);
  isUploading = signal<boolean>(false);
  selectedFile: File | null = null;
  selectedAudioEs: File | null = null;
  selectedAudioQu: File | null = null;

  userSession = computed(() => isAuth());

  ngOnInit(): void {
    document.title = `CURADURÍA DE ARTE | ${environment.title || ''}`;

    this.route.params.subscribe((params: Params) => {
      this.currentWorksParam = params['id'];
      this.emailWorks = params['email'];

      if (this.currentWorksParam) {
        this.getNotes(this.currentWorksParam);
      }
      if (this.emailWorks) {
        this.getUsser(this.emailWorks);
      }
    });
  }

  getImageUrl(imageUrl?: string): string {
    if (!imageUrl) return '';
    return imageUrl.startsWith('http') ? imageUrl : `${environment.apiURL}/${imageUrl}`;
  }
  
  getPerfilImageUrl(imageUrl?: string): string {
    if (!imageUrl) return '';
    return imageUrl.startsWith('http') ? imageUrl : `${environment.apiURL}/collections/${imageUrl}`;
  }

  onAudioEsSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedAudioEs = input.files[0];
    }
  }

  onAudioQuSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedAudioQu = input.files[0];
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  getInitial(text?: string): string {
    if (!text) return 'U';
    return text.charAt(0).toUpperCase();
  }

  formatDate(date: string | Date): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }

  sendWhatsAppMessage(phone?: string, name?: string): void {
    if (!phone) return;
    const cleanPhone = phone.replace(/\D/g, '');
    const url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=Hola%20${encodeURIComponent(name || '')},%20me%20comunico%20desde%20la%20Galería%20de%20Arte.`;
    window.open(url, '_blank');
  }

  private getNotes(worksParam: string): void {
    this.http.get<ArtworkCuratorship[]>(`${environment.apiURL}/api/exhibitiones/${worksParam}`).subscribe({
      next: (data) => {
        this.artworkExhibits.set(data || []);
      },
      error: (err) => {
        console.error('Error al obtener la galería:', err);
        this.toastr.error('Error al cargar la galería de muestras');
      }
    });
  }

  private getUsser(emailParam: string): void {
    this.http.get<Usser>(`${environment.apiURL}/api/users/userrfree/${emailParam}`).subscribe({
      next: (data) => {
        this.usser.set(data || null);
      },
      error: (err) => console.error('Error al obtener usuario:', err)
    });
  }

  openModal(
    option: string,
    submitText: string,
    title = '',
    detail = '',
    indices = { i: -1, j: -1, k: -1 },
    id = ''
  ): void {
    this.modalOption.set(option);
    this.submitLabel.set(submitText);
    this.formTitle = title;
    this.formDetail = detail;
    this.activeIndices.set(indices);
    this.activeId.set(id);
    this.selectedFile = null;
    this.selectedAudioEs = null;
    this.selectedAudioQu = null;
    this.showModal.set(true);
  }

  closeModal(): void {
    if (this.isUploading()) return;
    this.showModal.set(false);
    this.formTitle = '';
    this.formDetail = '';
    this.selectedFile = null;
    this.selectedAudioEs = null;
    this.selectedAudioQu = null;
  }

  handleModalSubmit(): void {
    const opt = this.modalOption();
    const currentUser = this.userSession()?.name || this.userSession()?.email || 'Anónimo';

    if (opt === '1' || opt === '1w') {
      const formData = new FormData();
      formData.append('title', this.formTitle);
      formData.append('detail', this.formDetail);
      formData.append('curator', currentUser);
      formData.append('email', this.userSession()?.email || '');
      formData.append('type', 'curatorship');

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }
      if (this.selectedAudioEs) {
        formData.append('audioEs', this.selectedAudioEs);
      }
      if (this.selectedAudioQu) {
        formData.append('audioQu', this.selectedAudioQu);
      }

      const url = opt === '1'
        ? `${environment.apiURL}/api/exhibitiones/${this.currentWorksParam}`
        : `${environment.apiURL}/api/exhibitiones/item/${this.activeId()}`;
      
      const req = new HttpRequest(opt === '1' ? 'POST' : 'PUT', url, formData, {
        reportProgress: true
      });

      this.isUploading.set(true);
      this.uploadProgress.set(0);

      this.http.request(req).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            const percent = Math.round((100 * event.loaded) / event.total);
            this.uploadProgress.set(percent);
          } else if (event instanceof HttpResponse) {
            this.isUploading.set(false);
            this.toastr.success(opt === '1' ? 'Obra publicada con éxito' : 'Obra actualizada con éxito');
            this.closeModal();
            this.getNotes(this.currentWorksParam);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isUploading.set(false);
          console.error('Error al guardar la muestra:', err);
          this.toastr.error('Error al procesar la solicitud');
        }
      });
    }
  }

  removeTheme(id: string): void {
    if (confirm('¿Estás seguro de eliminar esta muestra de la galería?')) {
      this.http.delete(`${environment.apiURL}/api/exhibitiones/item/${id}`).subscribe({
        next: () => {
          this.toastr.success('Muestra eliminada');
          this.getNotes(this.currentWorksParam);
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          this.toastr.error('No se pudo eliminar la muestra');
        }
      });
    }
  }

  removeSubTheme(i: number, j: number, artworkId: string): void {}
  removeSubSubTheme(i: number, j: number, k: number, artworkId: string): void {}
  handleLike(i: number, artworkId: string, type: string): void {}
  handleSubLike(i: number, j: number, artworkId: string, type: string): void {}
}