import { Component, OnInit, signal, computed, inject, Injectable, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { Navbar } from './navbar';
import { SurveyDashboardComponent } from './d3js';

// --- INTERFACES & MODELOS ---
export interface TechOption {
  value: string;
  label: string;
}

export interface SurveyItem {
  prg: string;
  std?: string;
  alt?: any[];
  obs?: string[];
}

export interface SurveySource {
  _id: string;
  tipo: string;
  subtipo: string;
  surveyCount?: number;
  items?: SurveyItem[];
}

export interface SurveyNewData {
  note: any[];
  notesource: SurveySource[];
}

export interface UserSession {
  _id: string;
  rol: string;
  name?: string;
}

// Lógica de usuario/autenticación SSR-Safe
export function isAuth(): UserSession | null {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }
  const authData = localStorage.getItem('user');
  return authData ? JSON.parse(authData) : null;
}

// --- SERVICIO DE BACKEND ---
@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiURL}/api`;

  getSurveysSource(): Observable<SurveySource[]> {
    return this.http.get<SurveySource[]>(`${this.apiUrl}/surveys/source`);
  }

  getSurveysStatsSubtipo(subtipo: string): Observable<SurveyNewData> {
    return this.http.get<SurveyNewData>(`${this.apiUrl}/surveys/newwww/${subtipo}`);
  }

  getSurveyById(id: string): Observable<SurveySource[]> {
    return this.http.get<SurveySource[]>(`${this.apiUrl}/surveys/${id}`);
  }

  updateSurvey(id: string, items: SurveyItem[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/surveys/${id}`, { items });
  }

  saveSurvey(data: unknown): Observable<any> {
    return this.http.post(`${this.apiUrl}/surveys`, data);
  }

  deleteSurvey(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/surveys/${id}`);
  }
}

// --- COMPONENTE PRINCIPAL STANDALONE ---
@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    CommonModule, 
    Navbar, 
    FormsModule, 
    SurveyDashboardComponent
  ],
  template: `
    <app-navbar></app-navbar>
    <div class="py-5"></div>

    <div class="container mt-5">
      <div class="text-center w-100 ffont h3 mb-4">
        {{ instituteName() }}
      </div>

      <!-- Sección Administrador: Agregar encuesta -->
      @if (userRole() === '1') {
        <div class="mb-4 p-3 border rounded bg-light">
          <label for="techSelect" class="form-label fw-bold">
            Agregar encuesta, seleccione el tipo:
          </label>
          <select
            id="techSelect"
            class="form-select mb-3"
            [ngModel]="subtipo()"
            (ngModelChange)="subtipo.set($event)"
          >
            <option value="" disabled>Seleccione item</option>
            @for (opt of techOptions; track opt.value) {
              <option [value]="opt.value">{{ opt.label }}</option>
            }
          </select>

          <button
            type="button"
            class="btn btn-primary w-100"
            (click)="registerDefaultSurvey()"
            [disabled]="isLoading() || !subtipo()"
          >
            Registrar encuesta fuente {{ subtipo() }}
          </button>
        </div>
      }

      <!-- Listado de Fuentes Header -->
      @if (selectedSubtipoStats()) {
        <div class="text-center w-100 ffont h4 text-primary my-3">
          Seleccionaste {{ formatSubtipo(selectedSubtipoStats()) }}
        </div>
      }

      <!-- Tarjetas de Encuestas -->
      <div class="row p-2 justify-content-center align-items-center g-2 my-2">
        @for (item of source(); track item._id) {
          <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 p-1">
            <div class="p-2 bg-light text-center rounded border shadow-sm">
              ({{ formatSubtipo(item.subtipo) }})

              <div class="btn-group d-flex justify-content-center align-items-center mt-2">
                @if (userRole() === '1') {
                  <button
                    type="button"
                    class="btn btn-outline-info"
                    title="Editar JSON"
                    (click)="getNotes(item._id)"
                  >
                    <i class="bi bi-pencil" style="font-size: 14px; color: #272cc1;"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    title="Eliminar"
                    (click)="removeSurvey(item._id, item.subtipo)"
                  >
                    <i class="bi bi-trash" style="font-size: 14px; color: #ff006a;"></i>
                  </button>
                }

                <button
                  type="button"
                  title="Responder la encuesta"
                  class="btn btn-outline-primary"
                  (click)="getSurveysSourceSubtipo(item.subtipo)"
                >
                  <i class="bi bi-arrows-fullscreen"></i>
                </button>
              
                @if (userRole() === '1' || userRole() === '2') {
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    title="Copiar enlace"
                    (click)="handleCopyLink(item.subtipo)"
                  >
                    <i class="bi bi-copy" style="font-size: 14px; color: #20b6d7;"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-warning"
                    title="Compartir enlace"
                    (click)="handleShareLink(item.subtipo)"
                  >
                    <i class="bi bi-share" style="font-size: 14px; color: #0f72ab;"></i>
                  </button>
                }
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Editor JSON de Encuesta -->
      @if (id()) {
        <div class="my-4 p-3 border rounded bg-white shadow-sm">
          <label class="form-label fw-bold" for="jsonEditor">Editor de Encuesta (JSON):</label>
          <textarea
            id="jsonEditor"
            class="form-control mb-2 font-monospace"
            [ngModel]="itemsJsonString()"
            (ngModelChange)="itemsJsonString.set($event)"
            rows="8"
          ></textarea>
          <button
            type="button"
            class="btn btn-info w-100 text-white fw-bold"
            (click)="updateSurveysId()"
            [disabled]="isLoading()"
          >
            Actualizar JSON
          </button>
        </div>
      }

      <!-- Formulario Dinámico de Preguntas Cargadas -->
      @if (items().length > 0) {
        <div class="row justify-content-center align-items-stretch g-4 my-3">
          @for (question of items(); track $index; let i = $index) {
            <div
              [class]="question.alt ? 'col-12 col-md-6 col-lg-6 col-xl-4 px-3 mb-4' : 'col-12 px-3 mb-4'"
            >
              <div class="card h-100 shadow-sm border p-3 border-info">
                <div class="d-flex align-items-start gap-3 mb-3">
                  <span class="badge bg-primary text-white rounded-pill fs-6 px-3 py-2">
                    {{ i + 1 }}
                  </span>
                  <div class="flex-grow-1 fw-bold text-dark mb-0">
                    {{ question.prg }}
                  </div>
                </div>

                <div>
                  @if (question.alt) {
                    <select
                      class="form-select"
                      [ngModel]="question.std"
                      (ngModelChange)="handleItemSelectChange(i, $event)"
                    >
                      <option value="" disabled selected>Seleccione respuesta...</option>
                      @for (altItem of question.alt; track $index) {
                        <option [value]="getOptionValue(altItem)">
                          {{ getOptionValue(altItem) }}
                        </option>
                      }
                    </select>
                  } @else {
                    <input
                      type="text"
                      class="form-control"
                      [ngModel]="question.std || ''"
                      placeholder="Ingrese su observación/respuesta..."
                      (ngModelChange)="handleInputTextChange(i, $event)"
                    />
                  }
                </div>
              </div>
            </div>
          }
        </div>
      }

      <!-- Panel de Registro de Respuestas (Admin) -->
      @if (userRole() === '1' && stds().length > 0) {
        <div class="mt-4 p-3 border-top">
          <h5 class="mb-3">Respuestas Registradas:</h5>
          @for (std of stds(); track $index; let i = $index) {
            @let minutesDiff = getMinutesDiff(std[1], std[2]);

            <div class="small text-muted mb-1 d-flex align-items-center gap-2">
              <span>{{ i + 1 }}.</span>
              <button
                type="button"
                class="btn btn-sm btn-link text-danger p-0 border-0"
                (click)="removeSurvey(std[3], std[4])"
                title="Eliminar respuesta"
              >
                <i class="bi bi-trash" style="font-size: 14px;"></i>
              </button>
              <span>{{ std[0] || '' }}</span>
              <span class="ms-2" style="font-size: 0.85em;">
                {{ formatDate(std[1]) }}
                @if (minutesDiff !== null) {
                  <span class="text-info">[{{ minutesDiff }} mnts]</span>
                }
              </span>
            </div>
          }
        </div>
      }

      <app-survey-dashboard></app-survey-dashboard>
    </div>
  `
})
export class SStats implements OnInit {
  private readonly statsService = inject(StatsService);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);

  public readonly techOptions: TechOption[] = [
    { value: 'empresarioinversor', label: 'Empresario inversor' },
    { value: 'empresarioproductor', label: 'Empresario productor' },
    { value: 'empresariointermediario', label: 'Empresario intermediario' },
    { value: 'egresado', label: 'Egresado' },
    { value: 'estudiantecole', label: 'Estudiante colegio' },
    { value: 'estudianteinst', label: 'Estudiante instituto' },
    { value: 'estudianteesfa', label: 'Estudiante ESFA' },
    { value: 'estudianteuni', label: 'Estudiante universitario' },
    { value: 'docenteuni', label: 'Docente Universitario' },
    { value: 'docenteesfa', label: 'Docente ESFA' },
    { value: 'apoderado', label: 'Apoderado' }
  ];

  // Reactividad nativa con Signals
  readonly items = signal<SurveyItem[]>([]);
  readonly itemsJsonString = signal<string>('');
  readonly stds = signal<any[]>([]);
  readonly prgs = signal<SurveyItem[]>([]);
  readonly subtipo = signal<string>('');
  readonly selectedSubtipoStats = signal<string>('');
  readonly nsurveys = signal<number>(0);
  readonly id = signal<string>('');
  readonly source = signal<SurveySource[]>([]);
  readonly isLoading = signal<boolean>(false);
  readonly userRole = signal<string>('');
  readonly hostname = signal<string>('');

  // Computados
  readonly isTargetHostname = computed(() => this.hostname() === 'www.esfapa.edu.pe');
  readonly instituteName = computed(() =>
    this.isTargetHostname() ? 'ESFAPA Web' : environment.title
  );

  constructor() {
    afterNextRender(() => {
      this.hostname.set(window.location.hostname);
    });
  }

  ngOnInit(): void {
    const user = isAuth();
    this.userRole.set(user?.rol || '');
    this.getSurveysSource();
  }

  getSurveysSource(): void {
    this.statsService.getSurveysSource().subscribe({
      next: (data) => this.source.set(data || []),
      error: () => this.toastr.error('Error al obtener fuentes de encuestas')
    });
  }

  getSurveysSourceSubtipo(subtipoVal: string): void {
    this.router.navigate([`/statest/${subtipoVal}/nauth`]);
  }

  getSurveyUrl(subtipoVal: string): string {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const minutos = 5;
    const ahora = new Date().getTime();
    return `${baseUrl}/statest/${subtipoVal}/${ahora + minutos * 60 * 1000}`;
  }

  handleCopyLink(subtipoVal: string): void {
    const url = this.getSurveyUrl(subtipoVal);
    if (navigator?.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => this.toastr.success('Enlace copiado al portapapeles'))
        .catch(() => this.toastr.error('Error al copiar el enlace'));
    }
  }

  handleShareLink(subtipoVal: string): void {
    const url = this.getSurveyUrl(subtipoVal);
    if (navigator?.share) {
      navigator
        .share({
          title: `Encuesta: ${subtipoVal}`,
          text: `Participa en la encuesta de ${subtipoVal}`,
          url
        })
        .catch(() => {});
    } else {
      this.handleCopyLink(subtipoVal);
    }
  }

  getNotes(idVal: string): void {
    this.statsService.getSurveyById(idVal).subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          const loadedItems = res[0].items || [];
          this.items.set(loadedItems);
          this.itemsJsonString.set(JSON.stringify(loadedItems, null, 2));
          this.id.set(res[0]._id);
        } else {
          this.items.set([]);
          this.itemsJsonString.set('');
          this.id.set('');
        }
      },
      error: () => this.toastr.error('Error al obtener datos')
    });
  }

  updateSurveysId(): void {
    this.isLoading.set(true);
    try {
      const parsedItems: SurveyItem[] = JSON.parse(this.itemsJsonString());
      this.statsService.updateSurvey(this.id(), parsedItems).subscribe({
        next: (res) => {
          this.items.set(parsedItems);
          this.toastr.info(typeof res === 'string' ? res : 'Actualizado correctamente');
          this.isLoading.set(false);
        },
        error: () => {
          this.toastr.error('Error al actualizar');
          this.isLoading.set(false);
        }
      });
    } catch {
      this.toastr.error('JSON inválido');
      this.isLoading.set(false);
    }
  }

  registerDefaultSurvey(): void {
    const defaultItems: SurveyItem[] = [
      {
        prg: '¿Está satisfecho con nuestro servicio de atención al cliente?',
        alt: [['Si'], ['No']],
        std: ''
      },
      {
        prg: '¿Con qué frecuencia utiliza plataformas de streaming para ver películas?',
        alt: [
          ['Todos los días'],
          ['Varias veces por semana'],
          ['Una vez por semana'],
          ['Rara vez'],
          ['Nunca']
        ],
        std: ''
      },
      {
        prg: '¿Qué es lo que más te gusta de tu nuevo trabajo?',
        obs: [],
        std: ''
      }
    ];

    this.submitTest('source', defaultItems);
  }

  submitTest(tipo: string, itemsData: SurveyItem[]): void {
    this.isLoading.set(true);
    const user = isAuth();
    const data = {
      user: user?._id,
      ip: [],
      items: itemsData,
      tipo,
      subtipo: this.subtipo()
    };

    this.statsService.saveSurvey(data).subscribe({
      next: (res) => {
        this.toastr.success(typeof res === 'string' ? res : 'Guardado exitosamente');
        this.getSurveysSource();
        this.isLoading.set(false);
      },
      error: () => {
        this.toastr.error('Error al registrar la encuesta');
        this.isLoading.set(false);
      }
    });
  }

  removeSurvey(idVal: string, subtipoVal: string): void {
    if (confirm('¿Deseas eliminar este item?')) {
      this.statsService.deleteSurvey(idVal).subscribe({
        next: () => {
          this.toastr.info('Removido correctamente');
          this.getSurveysSource();
        },
        error: () => this.toastr.error('Error al eliminar')
      });
    }
  }

  handleItemSelectChange(index: number, value: string): void {
    this.items.update(currentItems => {
      const updated = [...currentItems];
      updated[index] = { ...updated[index], std: value };
      this.itemsJsonString.set(JSON.stringify(updated, null, 2));
      return updated;
    });
  }

  handleInputTextChange(index: number, value: string): void {
    this.items.update(currentItems => {
      const updated = [...currentItems];
      updated[index] = { ...updated[index], std: value };
      this.itemsJsonString.set(JSON.stringify(updated, null, 2));
      return updated;
    });
  }

  formatSubtipo(text: string): string {
    if (!text) return '';
    return text
      .replace(/(empresario|estudiante|docente)(inversor|productor|intermediario|cole|inst|esfa|uni)/i, '$1 $2')
      .replace(/cole/i, ' colegio')
      .replace(/inst/i, ' instituto')
      .replace(/egresado/i, ' egresado esfa')
      .replace(/uni/i, ' universitario')
      .replace(/esfa/i, ' ESFAPA FGPA')
      .toUpperCase();
  }

  getOptionValue(altItem: any): string {
    return Array.isArray(altItem) ? altItem[0] : altItem;
  }

  getMinutesDiff(start: string, end: string): number | null {
    if (!start || !end) return null;
    const diff = (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60);
    return Math.round(diff * 100) / 100;
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleString();
  }
}
