import { Component, OnInit, signal, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { isAuth } from './auth';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { Navbar } from './navbar';
import { ThreeHtmlCanvasComponent } from './logomodel3d';
import { PdfGeneratorService } from './tramitepdf';

// ==========================================
// INTERFACES & MODELOS
// ==========================================
export interface Remiter {
  dni: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombreCompleto?: string;
}

export interface ProveidoItem {
  dependencel: string;
  dependencev: string;
  user: string;
  observacion: string;
  recibido: string | null;
  archivado: string | null;
  createdAt: string;
}

export interface Tramite {
  _id?: string;
  title: string;
  tipo: string;
  dni: string;
  nombres: string;
  apellidopaterno: string;
  apellidomaterno: string;
  size?: number;
  type?: string;
  file?: string;
  createdAt?: string;
  detail?: string;
  folios?: number;
  proveido: ProveidoItem[];
}

interface DependenceOption {
  value: string;
  label: string;
}

interface UserAuth {
  email: string;
  rol: string;
  cargo: string;
  name: string;
}

// ==========================================
// COMPONENTE STANDALONE
// ==========================================
@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Navbar,
    CKEditorModule,
    ThreeHtmlCanvasComponent,
    DatePipe
  ],
  template: `
    <app-navbar></app-navbar>
    <div class="py-5"></div>
    <div class="container py-1">
      <div class="text-center py-1">
        @if (authUser(); as user) {
          <span class="user-info fw-bold text-secondary">
            {{ user.name }}
            @if (user.cargo) {
              <span class="text-muted">({{ user.cargo }})</span>
            }
          </span>
        }
      </div>
      <div class="mb-3">
        <div class="btn-group text-center w-100 shadow-sm">
          <button class="btn btn-primary py-2" type="button" (click)="openModalW('Enviar tramite')">
            <i class="bi bi-file-earmark-text me-1"></i> Enviar trámite
          </button>
          <button class="btn btn-warning text-dark fw-semibold py-2" type="button" (click)="openModalW('Tramites enviados')">
            <i class="bi bi-file-earmark-arrow-up me-1"></i> Trámites enviados
          </button>
        </div>
      </div>
      
      @if(!remiter() && tramites().length === 0) {
        <div class="text-center mb-1" style="height: 11cm;">
          <app-three-html-canvas></app-three-html-canvas>
        </div>
      }

      <!-- Formulario de Remitente -->
      @if (remiter(); as currentRemiter) {
        <div class="card card-body bg-light mb-4 shadow-sm border-0">
          <div class="text-center mb-3 text-secondary p-2 bg-white rounded shadow-sm">
            <strong>Nombres:</strong> {{ currentRemiter.nombres }} |
            <strong>Apellido Paterno:</strong> {{ currentRemiter.apellidoPaterno }} |
            <strong>Apellido Materno:</strong> {{ currentRemiter.apellidoMaterno }} |
            <strong>DNI:</strong> {{ currentRemiter.dni }} 
            <input #fileInput type="file" class="d-none" (change)="handleFileSelect($event)" />
          </div>

          <div class="form-group mb-3 row d-flex justify-content-center align-items-center">
            <div class="col-sm-12 col-md-6 col-lg-4">
              <label class="form-label fw-bold text-info">Dependencia a enviar</label>
              <select 
                class="form-control mb-3 shadow-sm" 
                [ngModel]="dependence().value" 
                (ngModelChange)="onDependenceChange($event)"
                (change)="onFieldBlur()">
                @for (opt of dependenceOptions; track opt.value) {
                  <option [value]="opt.value">{{ opt.label }}</option>
                }
              </select>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-4">
              <label class="form-label fw-bold text-info mt-1">Tipo de documento</label>
              <select 
                class="form-control mb-3 shadow-sm" 
                [ngModel]="tipo().value" 
                (ngModelChange)="onTipoChange($event)"
                (change)="onFieldBlur()">
                @for (opt of tipoOptions; track opt.value) {
                  <option [value]="opt.value">{{ opt.label }}</option>
                }
              </select>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-4">
              <label class="form-label fw-bold text-info">Correo electrónico (necesario)</label>
              <input
                type="email"
                class="form-control mb-3 shadow-sm" 
                [class.is-invalid]="email() && !isEmailValid(email())"
                placeholder="Correo electrónico"
                [ngModel]="email()"
                (ngModelChange)="email.set($event)"
                (blur)="onFieldBlur()"
              />
              @if (email() && !isEmailValid(email())) {
                <div class="invalid-feedback d-block mb-2">
                  Por favor, ingrese un correo electrónico válido.
                </div>
              }
            </div>
            
            <div class="col-sm-12 col-md-3 col-lg-3">
              <label class="form-label fw-bold text-info">Celular (necesario)</label>
              <input
                type="text"
                class="form-control mb-3 shadow-sm"
                [class.is-invalid]="celular() && !isCellValid(celular())"
                placeholder="Número de celular"
                [ngModel]="celular()"
                (ngModelChange)="celular.set($event)"
                (blur)="onFieldBlur()"
              />
              @if (celular() && !isCellValid(celular())) {
                <div class="invalid-feedback d-block mb-2">
                  Ingrese un número de celular válido (mínimo 9 dígitos).
                </div>
              }
            </div>

            <div class="col-sm-12 col-md-3 col-lg-3">
              <label class="form-label fw-bold text-info">Nro. de Folios</label>
              <input
                type="number"
                class="form-control mb-3 shadow-sm"
                placeholder="Total de folios"
                min="1"
                [ngModel]="folios()"
                (ngModelChange)="folios.set($event)"
                (blur)="onFieldBlur()"
              />
            </div>

            <div class="col-sm-12 col-md-9 col-lg-6">
              <label class="form-label fw-bold text-info">Asunto (necesario)</label>
              <input
                type="text"
                class="form-control mb-3 shadow-sm"
                placeholder="Asunto del trámite"
                [ngModel]="title()"
                (ngModelChange)="title.set($event)"
                (blur)="onFieldBlur()"
              />
            </div>

            <div class="d-flex justify-content-between align-items-center mt-3 mb-1">
              <label class="form-label fw-bold text-info m-0">Detalles</label>
            </div>
            @if (email() && celular() && title()) {          
              <div class="mb-3">
                <ckeditor
                  [editor]="Editor"
                  [config]="editorConfig"
                  [ngModel]="detail()"
                  (ngModelChange)="detail.set($event)">
                </ckeditor>
              </div>
              <button class="btn btn-outline-info w-100 my-2 py-2" type="button" (click)="fileInput.click()">
                <i class="bi bi-paperclip me-1"></i> Cargar archivo adjunto
              </button>
            } @else {
              <div class="text-muted text-center py-3 bg-white rounded shadow-sm my-2">
                Rellene todos los campos necesarios (email, celular y asunto) para generar la descripción y cargar archivo.
              </div>
            }
          </div>

          @if (fileData().file) {
            <div class="alert alert-success text-center shadow-sm">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span>
                  <strong>Nombre:</strong> {{ fileData().name }} |
                  <strong>Tamaño:</strong> {{ (fileData().size / (1024 * 1024)).toFixed(2) }} MB
                </span>
                <button class="btn btn-sm btn-outline-danger" type="button" (click)="fileData.set({ file: null, name: '', size: 0, type: '' })">
                  Cerrar
                </button>
              </div>
              <button class="btn btn-success w-15 py-2 fw-bold" type="button" (click)="sendSurvey()" [disabled]="loading()">
                {{ loading() ? 'Enviando...' : 'Enviar trámite con archivo' }}
              </button>
            </div>
          } @else {
            @if (email() && celular() && title()) {          
              <button class="btn btn-success w-100 py-2 fw-bold shadow-sm" type="button" (click)="sendSurvey()" [disabled]="loading()">
                {{ loading() ? 'Enviando...' : 'Enviar trámite sin archivo' }}
              </button>
            }  
          }
        </div>
      }

      <!-- Lista de Trámites -->
      @if (tramites().length > 0) {
        <h4 class="mt-4 mb-3 text-secondary border-bottom pb-2">Trámites en Sistema</h4>
      }

      <div class="row">
        @for (number of tramites(); track number._id || $index; let i = $index) {
          <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
            <div class="card h-100 p-3 bg-white shadow-sm border-0 rounded-3">
              <div class="d-flex align-items-center gap-2 mb-2">
                <i class="bi bi-file-earmark-text text-primary fs-4"></i>
                <h5 class="card-title text-dark text-uppercase fw-bold m-0 text-truncate" [title]="number.title">
                  {{ number.title }}
                </h5>
              </div>
              <div class="text-muted small mb-2">
                <span class="fw-semibold text-secondary">{{ number.nombres }} {{ number.apellidopaterno }} {{ number.apellidomaterno }}</span> <span class="text-info fw-bold">(DNI {{ number.dni }})</span>
                <div class="text-muted text-end mt-1" style="font-size: 11px;">
                  @if (number.createdAt) {
                    <span>Creado: {{ number.createdAt | date:'medium' }}</span>
                  } 
                  <span class="badge bg-secondary ms-1">{{ number.tipo }}</span>
                </div>
              </div>
              <div class="small text-muted mb-3 bg-light p-2 rounded">
                <i class="bi bi-paperclip me-1"></i>
                {{ number.size ? (number.size / (1024 * 1024)).toFixed(2) + ' MB' : 'Sin archivo' }}
                {{ number.type ? '(' + number.type + ')' : '' }} | <strong>Folios:</strong> {{ number.folios || 1 }}
              </div>

              <div class="btn-group w-100 mb-3 shadow-sm">
                @if (number.file !== '') {
                  <a 
                    class="btn btn-outline-info btn-sm" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Descargar archivo"
                    [href]="apiUrlfile + '/tramite/' + number.file" 
                    (click)="recibido(i, '')">
                    <i class="bi bi-download"></i> Revisar
                  </a>
                }
                <button 
                  class="btn btn-outline-primary btn-sm" 
                  type="button"
                  title="Abrir modal detalles"
                  (click)="openModal(number.title, number.detail || ''); recibido(i, '')">
                  <i class="bi bi-info-circle"></i> Recibir
                </button>

                <button class="btn btn-outline-secondary btn-sm text-dark" type="button" 
                  title="Descargar cargo y procesos"
                  (click)="exportToPdf(number)" [disabled]="loading()">
                  <i class="bi bi-file-earmark-pdf text-danger"></i> PDF
                </button>

                @if (isRecentTramite(number.createdAt) || authUser()?.rol === '1') {
                  <button class="btn btn-outline-danger btn-sm" type="button" 
                    title="Eliminar tramite"
                    (click)="deleteSurvey(number._id!)">
                    <i class="bi bi-dash-circle"></i>
                  </button>
                }
              </div>

              <div class="proveidos-container mb-3">
                @for (nnumber of number.proveido; track $index; let j = $index) {
                  <div class="p-2 small rounded my-2 shadow-sm border"
                      [ngClass]="{
                        'bg-danger text-white border-danger': !!nnumber.observacion,
                        'bg-light text-dark border-light': !nnumber.recibido && !nnumber.observacion,
                        'bg-success text-white border-success': !!nnumber.recibido && !nnumber.observacion
                      }">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                      <strong class="text-truncate" style="max-width: 75%;">{{ j + 1 }}. {{ nnumber.dependencel || 'General' }}</strong>
{{nnumber.dependencev}}
                      @if (authUser()?.rol === '1' || authUser()?.rol === '4') {
                        <div class="d-flex gap-1">
                          @if (j + 1 === number.proveido.length && nnumber.recibido) {
                            <button
                              class="btn btn-sm border-0 p-1 bg-transparent text-white"
                              type="button"
                              [disabled]="!!nnumber.archivado"
                              [title]="nnumber.archivado ? 'archivado' : 'archivar'"
                              (click)="archivado(i, j)"
                            >
                              <i class="bi-folder-fill fs-6" [style.color]="nnumber.archivado ? '#d1e7dd' : '#ffc107'"></i>
                            </button>
                          }
                          
                          @if (j + 1 === number.proveido.length && !nnumber.archivado) {
                            <button class="btn btn-sm border-0 p-1" type="button" title="Eliminar proveído" (click)="removeSubTheme(i, j)">
                              <i class="bi bi-trash"></i>
                            </button>
                          }
                          
                          @if (authUser()?.rol === '1') {
                            <button class="btn btn-sm border-0 p-1 fw-bold" type="button" title="Remover" (click)="removeSubTheme(i, j)">
                              ✕
                            </button>
                          }
                        </div>
                      }
                    </div>
                    <div class="text-opacity-75 small">
                      <span>Enviado por: {{ nnumber.user || 'Sistema' }} </span> <span class="" style="font-size: 10px;">[{{ nnumber.createdAt | date:'short' }}]</span>
                    </div> 

                    @if (authUser()?.cargo === nnumber.dependencev && !nnumber.archivado) {
                      <div class="mt-2">
                        <label [for]="'observacion-' + i" class="form-label small fw-bold mb-1">
                          Observación
                        </label>
                        <textarea 
                          class="form-control form-control-sm bg-white text-dark border-0 shadow-sm" 
                          [id]="'observacion-' + i"
                          (blur)="recibido(i, getInputValue($event))" 
                          [value]="nnumber.observacion" 
                          placeholder="Escribe una observación..."
                        ></textarea>
                      </div>
                    } @else {
                      @if (nnumber.observacion) {
                        <div class="small mt-1 p-1 rounded bg-black bg-opacity-10">
                          <strong>Observación:</strong> {{ nnumber.observacion }}
                        </div>
                      }
                    }

                    @if (nnumber.recibido) {
                      <div class="small mt-1 text-warning">
                        <strong><i class="bi-check-circle-fill"></i> Recibido:</strong> {{ nnumber.recibido | date:'medium' }}
                      </div>
                    }

                    @if (nnumber.archivado) {
                      <div class="small mt-1 text-info bg-danger bg-opacity-75 p-1 rounded text-light">
                        <strong><i class="bi-folder-check"></i> Archivado:</strong> {{ nnumber.archivado | date:'medium' }}
                      </div>
                    }
                  </div>
                }
              </div>

              @if (((authUser()?.rol === '1' || authUser()?.rol === '4') && number.proveido[number.proveido.length - 1] && !number.proveido[number.proveido.length - 1].archivado) || number.proveido.length === 0 || authUser()?.rol === '1') {
                <div class="mt-auto pt-2">
                  <select class="form-select form-select-sm border-primary shadow-sm" (change)="proveidoChange(getSelectValue($event), i)">
                    <option value="" disabled selected>Enviar a dependencia...</option>
                    @for (opt of dependenceOptions; track opt.value) {
                      <option [value]="opt.value">{{ opt.label }}</option>
                    }
                  </select>
                </div>
              }
            </div>
          </div>
        }
      </div>

      <!-- Modal Detalle -->
      @if (showModal()) {
        <div class="modal d-block bg-dark bg-opacity-50" tabindex="-1">
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg">
              <div class="modal-header bg-primary text-white">
                <h5 class="modal-title">{{ tittleModal() }}</h5>
                <!-- <button type="button" class="btn-close btn-close-white" (click)="showModal.set(false)"></button> -->
              </div>
              <div class="modal-body p-4" [innerHTML]="resumen()"></div>
              <div class="modal-footer bg-light">
                <button type="button" class="btn btn-secondary px-4" (click)="showModal.set(false)">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Modal Búsqueda / Identificación -->
      @if (showModalw()) {
        <div class="modal d-block bg-dark bg-opacity-50" tabindex="-1">
          <div class="modal-dialog modal-md modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg">
              <div class="modal-header text-dark">
                <h5 class="modal-title fw-bold">{{ tittleModal() }}</h5>
                <!-- <button type="button" class="btn-close" (click)="showModalw.set(false)"></button> -->
              </div>
              <div class="modal-body p-4">
                @if (tittleModal() !== 'Enviar tramite') {
                  <div class="form-group">
                    <label class="form-label fw-bold">Búsqueda por DNI</label>
                    <div class="input-group my-2">
                      <input
                        type="text"
                        class="form-control border-warning shadow-sm"
                        placeholder="Ingrese su DNI"
                        [disabled]="loading()"
                        [ngModel]="dni()"
                        (ngModelChange)="dni.set($event)"
                      />
                      <button class="btn btn-warning px-3 fw-semibold" type="button" (click)="getRemiterData()" [disabled]="loading()">
                        Buscar
                      </button>
                    </div>
                    <small class="form-text text-muted">Consulte los trámites vinculados a su número de documento.</small>
                  </div>
                } @else {
                  <div class="form-group">
                    <label class="form-label fw-bold">Identificación de Remitente</label>
                    <div class="input-group my-2">
                      <input
                        type="text"
                        class="form-control border-primary shadow-sm"
                        placeholder="Ingrese su DNI"
                        [disabled]="loading()"
                        [ngModel]="dni()"
                        (ngModelChange)="dni.set($event)"
                      />
                      <button class="btn btn-primary px-3 fw-semibold" type="button" (click)="getRemiter()" [disabled]="loading()">
                        Identificarte
                      </button>
                    </div>
                    <small class="form-text text-muted">Ingrese su DNI para verificar sus datos y proceder con el envío.</small>
                  </div>
                }
              </div>
              <div class="modal-footer bg-light">
                <button type="button" class="btn btn-secondary px-4" (click)="showModalw.set(false)">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class CreateNoteComponent implements OnInit {
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  private pdfService = inject(PdfGeneratorService);

  readonly apiUrl = `${environment.apiURL}/api`;
  readonly apiUrlfile = `${environment.apiURL}`;

  public Editor = ClassicEditor;
  public editorConfig = {
    language: 'es',
    placeholder: 'Descripción de trámite',
    toolbar: [
      'undo', 'redo', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
      'indent', 'outdent', '|', 'blockQuote', 'insertTable', 'mediaEmbed', 'heading'
    ]
  };

  readonly dependenceOptions: DependenceOption[] = [
    { value: 'direccion', label: 'DIRECCIÓN' },
    { value: 'unidadacademica', label: 'UNIDAD ACADÉMICA' },
    { value: 'unidadadministrativa', label: 'UNIDAD ADMINISTRATIVA' },
    { value: 'secretariogeneral', label: 'SECRETARÍA GENERAL' },
    { value: 'uaeducacion', label: 'UNIDAD ACADÉMICA DE EDUCACIÓN ARTÍSTICA' },
    { value: 'uaartista', label: 'UNIDAD ACADÉMICA DE ARTISTA PROFESIONAL' },
    { value: 'jefeservicio', label: 'UNIDAD EN SERVICIO' },
    { value: 'biblioteca', label: 'BIBLIOTECA' },
  ];

  readonly tipoOptions: DependenceOption[] = [
    { value: "ACTA", label: "ACTA" },
    { value: "ACTA DE CONCILIACION", label: "ACTA DE CONCILIACION" },
    { value: "ACTA DE ENTREGA DE CARGO", label: "ACTA DE ENTREGA DE CARGO" },
    { value: "ACTA DE ENTREGA-RECEPCION DE CARGO", label: "ACTA DE ENTREGA-RECEPCION DE CARGO" },
    { value: "CARTA", label: "CARTA" },
    { value: "OFICIO", label: "OFICIO" },
    { value: "SOLICITUD", label: "SOLICITUD" },
    { value: "INFORME", label: "INFORME" },
    { value: "MEMORANDO", label: "MEMORANDO" }
  ];

  readonly MAX_FILE_SIZE = 105048576; // ~100MB
  readonly ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

  showModal = signal<boolean>(false);
  showModalw = signal<boolean>(false);
  title = signal<string>('');

  dependence = signal<DependenceOption>({ label: 'DIRECCIÓN', value: 'direccion' });
  tipo = signal<DependenceOption>({ label: 'SOLICITUD', value: 'SOLICITUD' });
  email = signal<string>('');
  celular = signal<string>('');

  folios = signal<number | string>(1);
  observacion = signal<string>('');

  dni = signal<string>('');
  remiter = signal<Remiter | null>(null);

  fileData = signal<{ file: File | null; name: string; size: number; type: string }>({
    file: null, name: '', size: 0, type: ''
  });

  detail = signal<string>('');
  tramites = signal<Tramite[]>([]);
  loading = signal<boolean>(false);
  resumen = signal<string>('');
  tittleModal = signal<string>('');

  authUser = signal<UserAuth | null>(isAuth() as UserAuth);

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.resetTemplate();
    const user = this.authUser();
    if (user && (user.rol === '1' || user.rol === '4')) {
      this.getTramites();
    }
  }

  resetTemplate(): void {
    this.detail.set(this.generateTemplate());
    this.toastr.info('Plantilla cargada');
  }

  onFieldBlur(): void {
    this.detail.set(this.generateTemplate());
  }

  private generateTemplate(): string {
    const dep = this.dependence();
    const t = this.tipo();
    const rem = this.remiter();
    const em = this.email();
    const ce = this.celular();
    const fo = this.folios();
    const asunto = this.title();

    return `
<p><strong>Sr./Sra. encargado(a) de la ${dep.label} de la Escuela Superior de Formación Artística Pública “FELIPE GUAMÁN POMA DE AYALA” Ayacucho R.M. No 0195-ED</strong></p>
<p>Yo, con <strong>APELLIDOS Y NOMBRES: </strong>${rem?.apellidoPaterno || ''} ${rem?.apellidoMaterno || ''} ${rem?.nombreCompleto || ''}, <strong>DNI: </strong> ${rem?.dni || ''}, <strong>EMAIL: </strong> ${em} y <strong>CELULAR: </strong> ${ce}</p>
<p><strong>DEPENDENCIA A LA SE DIRIGE:</strong> ${dep.label} | <strong>TIPO DE TRAMITE:</strong> ${t.label} | <strong>NRO. FOLIOS:</strong> ${fo}</p>
<p><strong>DOMICILIADO EN</strong>: </p>
<p><strong>CARGO ACTUAL</strong>: </p>
<p><strong>ASUNTO</strong>: ${asunto}</p>
<p><strong>DESCRIPCIÓN</strong>: </p>
<p><strong>DOCUMENTOS QUE SE ADJUNTA:</strong> </p>
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
<p><strong>Lugar y Fecha: </strong> Huamanga Ayacucho ${new Date().toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
<p><a href="https://esfapa.edu.pe" target="_blank" class="text-decoration-none">https://esfapa.edu.pe</a> <a href="mailto:mesadepartes@esfapa.edu.pe" class="text-decoration-none">mesadepartes@esfapa.edu.pe</a></p>      
    `;
  }

  onDependenceChange(value: string): void {
    const selected = this.dependenceOptions.find((opt) => opt.value === value);
    if (selected) {
      this.dependence.set(selected);
    }
  }

  onTipoChange(value: string): void {
    const selected = this.tipoOptions.find((opt) => opt.value === value);
    if (selected) {
      this.tipo.set(selected);
    }
  }

  private cleanProveidoList(list: unknown[]): ProveidoItem[] {
    if (!Array.isArray(list)) return [];
    return list.map((item) => {
      if (typeof item !== 'object' || item === null) {
        return {
          dependencel: 'General',
          dependencev: 'general',
          user: 'Sistema',
          observacion: '',
          recibido: null,
          archivado: null,
          createdAt: new Date().toISOString()
        };
      }
      const typedItem = item as Record<string, unknown>;
      return {
        dependencel: String(typedItem['dependencel'] || 'General'),
        dependencev: String(typedItem['dependencev'] || 'general'),
        user: String(typedItem['user'] || 'Sistema'),
        observacion: String(typedItem['observacion'] || ''),
        recibido: typedItem['recibido'] ? String(typedItem['recibido']) : null,
        archivado: typedItem['archivado'] ? String(typedItem['archivado']) : null,
        createdAt: String(typedItem['createdAt'] || new Date().toISOString())
      };
    });
  }

  getTramites(): void {
    this.http.get<Tramite[]>(`${this.apiUrl}/tramites`).subscribe({
      next: (rawData) => {
        const formattedData = (rawData || []).map((t) => ({
          ...t,
          proveido: this.cleanProveidoList(t.proveido)
        }));

        const user = this.authUser();
        if (user && (user.cargo === 'control' || user.rol === '1')) {
          this.tramites.set(formattedData);
        } else {
          const selectedData = formattedData.filter((t) =>
            t.proveido.some((prov) => prov.dependencev === user?.cargo)
          );
          this.tramites.set(selectedData);
        }
      },
      error: () => this.toastr.error('Error obteniendo los trámites.')
    });
  }

  validateDni(): boolean {
    if (this.dni().length <= 5) {
      this.toastr.warning('Ingrese un DNI válido');
      return false;
    }
    return true;
  }

  getRemiter(): void {
    if (!this.validateDni()) return;
    this.loading.set(true);

    this.http.post<{ data: Remiter }>(`${this.apiUrl}/users/userDni`, { dni: this.dni() }).subscribe({
      next: (res) => {
        this.remiter.set(res.data);
        this.showModalw.set(false);
      },
      error: () => this.toastr.error('Error al verificar los datos del DNI'),
      complete: () => this.loading.set(false)
    });
  }

  getRemiterData(): void {
    if (!this.validateDni()) return;
    this.loading.set(true);

    this.http.get<Tramite[]>(`${this.apiUrl}/tramites/${this.dni()}`).subscribe({
      next: (rawData) => {
        const formattedData = (rawData || []).map((t) => ({
          ...t,
          proveido: this.cleanProveidoList(t.proveido)
        }));
        this.tramites.set(formattedData);
        this.showModalw.set(false);
      },
      error: () => this.toastr.error('Error al buscar trámites'),
      complete: () => this.loading.set(false)
    });
  }

  isEmailValid(email: string): boolean {
    if (!email) return true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  isCellValid(celular: string): boolean {
    if (!celular) return true;
    const cellRegex = /^\+?([0-9]{9,9})$/;
    return cellRegex.test(celular);
  }

  sendSurvey(): void {
    const rem = this.remiter();
    if (!this.title() || !this.detail() || !rem || !this.email() || !this.celular()) {
      this.toastr.info('Complete los campos obligatorios');
      return;
    }

    if (!this.isEmailValid(this.email())) {
      this.toastr.warning('El formato del correo electrónico no es válido');
      return;
    }

    this.loading.set(true);

    const user = this.authUser();
    const proveidoItem: ProveidoItem = {
      dependencel: this.dependence().label,
      dependencev: this.dependence().value,
      user: user?.email || `${rem.nombres} ${rem.apellidoPaterno} ${rem.apellidoMaterno}`,
      observacion: this.observacion(),
      recibido: null,
      archivado: null,
      createdAt: new Date().toISOString()
    };

    const formData = new FormData();
    formData.append('title', this.title());
    formData.append('dependence', JSON.stringify(this.dependence()));
    formData.append('proveido', JSON.stringify([proveidoItem]));

    const fileObj = this.fileData().file;
    if (fileObj) formData.append('archivo', fileObj);

    formData.append('size', this.fileData().size.toString());
    formData.append('type', this.fileData().type);
    formData.append('dni', rem.dni);
    formData.append('nombres', rem.nombres);
    formData.append('apellidomaterno', rem.apellidoMaterno);
    formData.append('apellidopaterno', rem.apellidoPaterno);
    formData.append('asunto', this.title());
    formData.append('celular', this.celular());
    formData.append('folios', this.folios().toString());
    formData.append('tipo', this.tipo().value);
    formData.append('email', this.email());
    formData.append('detail', this.detail());

    this.http.post<{ saved: Tramite }>(`${this.apiUrl}/tramites/`, formData).subscribe({
      next: async (res) => {
        if (res?.saved) {
          const savedItem: Tramite = {
            ...res.saved,
            proveido: this.cleanProveidoList(res.saved.proveido)
          };
          this.tramites.update((prev) => [savedItem, ...prev]);

          const currentLocal = JSON.parse(localStorage.getItem('tramite') || '[]');
          currentLocal.push(savedItem);
          localStorage.setItem('tramite', JSON.stringify(currentLocal));

          try {
            await this.pdfService.generateTramiteReport(savedItem, rem);
            this.toastr.success('Trámite enviado y PDF generado exitosamente');
          } catch {
            this.toastr.warning('Trámite enviado, pero hubo un error al generar el PDF');
          }
        }

        this.remiter.set(null);
        this.title.set('');
        this.email.set('');
        this.celular.set('');
        this.folios.set(1);
        this.dependence.set({ label: 'DIRECCIÓN', value: 'direccion' });
        this.fileData.set({ file: null, name: '', size: 0, type: '' });
        this.dni.set('');
        this.resetTemplate();
      },
      error: () => this.toastr.error('Error al enviar el trámite'),
      complete: () => this.loading.set(false)
    });
  }

  handleFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const selectedFile = input.files[0];
    if (selectedFile.size <= this.MAX_FILE_SIZE && this.ALLOWED_TYPES.includes(selectedFile.type)) {
      this.fileData.set({
        file: selectedFile,
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type
      });
    } else {
      this.toastr.info('Formatos permitidos: PDF, JPEG, JPG, PNG (máx. 100MB)');
    }
  }

  deleteSurvey(id: string): void {
    if (!confirm('¿Deseas eliminar este trámite?')) return;

    this.http.delete(`${this.apiUrl}/tramites/${id}`).subscribe({
      next: () => {
        this.tramites.update((prev) => prev.filter((t) => t._id !== id));
        this.toastr.success('Trámite eliminado');
      },
      error: () => this.toastr.error('Error al eliminar el trámite')
    });
  }

  proveidoChange(selectedOptionValue: string, index: number): void {
    const selectedOption = this.dependenceOptions.find((d) => d.value === selectedOptionValue);
    if (!selectedOption) return;

    const user = this.authUser();
    if (user?.cargo === selectedOption.value) {
      this.toastr.warning('No puede enviar a la dependencia a la que pertenece');
      return;
    }

    const updated = [...this.tramites()];
    const target = { ...updated[index] };
    target.proveido = this.cleanProveidoList(target.proveido);

    const now = new Date().toISOString();

    target.proveido.push({
      dependencel: selectedOption.label,
      dependencev: selectedOption.value,
      user: user?.email || 'usuario@demo.com',
      observacion: this.observacion(),
      recibido: null,
      archivado: null,
      createdAt: now
    });

    updated[index] = target;
    this.tramites.set(updated);

    if (target._id) {
      this.http.put(`${this.apiUrl}/tramites/${target._id}`, target.proveido).subscribe({
        next: () => this.toastr.success('Proveído actualizado'),
        error: () => this.toastr.error('Error actualizando el proveído')
      });
    }
  }

  recibido(i: number, observacion: string): void {
    const cargoUser = this.authUser()?.cargo;

    if (!cargoUser) {
      this.toastr.warning('No se pudo identificar el cargo del usuario actual.');
      return;
    }

    const timestamp = new Date().toISOString();
    const tramitesActuales = this.tramites();

    if (!tramitesActuales[i]) {
      this.toastr.warning('El trámite seleccionado no es válido.');
      return;
    }

    const target = { ...tramitesActuales[i] };
    let proveidosLimpios = this.cleanProveidoList(target.proveido);
    let updatedCount = 0;

    proveidosLimpios = proveidosLimpios.map(p => {
      if (p.dependencev?.includes(cargoUser)) {
        updatedCount++;
        return {
          ...p,
          recibido: p.recibido ?? timestamp,
          observacion: observacion
        };
      }
      return p;
    });

    if (updatedCount === 0) {
      this.toastr.warning('No se encontró ningún proveído asociado a tu cargo.');
      return;
    }

    target.proveido = proveidosLimpios;
    const updatedTramites = [...tramitesActuales];
    updatedTramites[i] = target;
    this.tramites.set(updatedTramites);

    if (target._id) {
      this.http.put(`${this.apiUrl}/tramites/${target._id}`, target.proveido).subscribe({
        next: () => this.toastr.success('Recibidos actualizados'),
        error: () => this.toastr.error('Error actualizando los proveídos')
      });
    }
  }

  archivado(i: number, j: number): void {
    if (!confirm('¿Deseas archivar este ítem?')) return;

    const timestamp = new Date().toISOString();
    const updated = [...this.tramites()];
    const target = { ...updated[i] };
    let proveido = this.cleanProveidoList(target.proveido);

    if (!proveido[j]) return;
    proveido[j] = { ...proveido[j], archivado: timestamp };

    target.proveido = proveido;
    updated[i] = target;
    this.tramites.set(updated);

    if (target._id) {
      this.http.put(`${this.apiUrl}/tramites/${target._id}`, target.proveido).subscribe({
        next: () => this.toastr.success('Archivado actualizado'),
        error: () => this.toastr.error('Error actualizando el proveído')
      });
    }
  }

  removeSubTheme(i: number, j: number): void {
    if (!confirm('¿Deseas eliminar este ítem?')) return;

    const updated = [...this.tramites()];
    const target = { ...updated[i] };
    target.proveido = this.cleanProveidoList(target.proveido).filter((_, idx) => idx !== j);
    updated[i] = target;

    this.tramites.set(updated);

    if (target._id) {
      this.http.put(`${this.apiUrl}/tramites/${target._id}`, target.proveido).subscribe({
        next: () => this.toastr.success('Ítem eliminado'),
        error: () => this.toastr.error('Error al eliminar subtema')
      });
    }
  }

  isRecentTramite(createdAt?: string): boolean {
    if (!createdAt) return false;
    const targetDate = new Date(createdAt);
    const limitDate = new Date(targetDate.getTime() + 60 * 60 * 1000);
    return new Date() < limitDate;
  }

  openModal(title: string, summary: string = ''): void {
    this.tittleModal.set(title);
    this.resumen.set(summary);
    this.showModal.set(true);
  }

  openModalW(title: string): void {
    this.tittleModal.set(title);
    this.showModalw.set(true);
  }

  async exportToPdf(tramiteItem: Tramite): Promise<void> {
    try {
      this.loading.set(true);
      await this.pdfService.generateTramiteReport(tramiteItem, this.remiter());
      this.toastr.success('Reporte PDF generado exitosamente');
    } catch (error) {
      console.error(error);
      this.toastr.error('Error al generar el reporte PDF');
    } finally {
      this.loading.set(false);
    }
  }

  getInputValue(event: Event): string {
    return (event.target as HTMLInputElement)?.value || '';
  }

  getSelectValue(event: Event): string {
    return (event.target as HTMLSelectElement)?.value || '';
  }
}