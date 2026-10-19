import {
  Component,
  OnInit,
  signal,
  computed,
  inject,
  viewChild,
  ElementRef,
  DestroyRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { parseISO, formatDistanceToNow, format, isValid } from 'date-fns';
import { es } from 'date-fns/locale';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../environments/environment';

import { MarkdownModule } from 'ngx-markdown';
import { Navbar } from './navbar';
import { GeminiChatComponent } from './actualizacionai';
import { ExportToExcelComponent } from './actualizacionprinttest';
import { MathRendererDirective } from './mathrender';

export interface QuizItem {
  prg: string;
  alt?: string[][];
  rpta?: string;
  std: string;
  obs?: string;
  pctgsimilar?: string;
}

export interface Task {
  _id: string;
  task?: string;
  solution?: string;
  items?: QuizItem[];
  dateb?: string;
  datee?: string;
}

export interface UserDetail {
  _id: string;
  name?: string;
  tassk?: Task[];
}

export interface StudentAverage {
  _id: string;
  usser?: UserDetail[];
}

export interface SectionData {
  _id: string;
  tassks?: Task[];
  tasskstd?: Task[];
  timetest: string;
  dateb: string;
  datee: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MarkdownModule,
    MathRendererDirective,
    Navbar,
    GeminiChatComponent,
    ExportToExcelComponent
  ],
  template: `
    <app-navbar />
    <div class="py-5"></div>

    <div class="container">
      @if (currentUser()?.rol === '1') {
        <button class="btn btn-info my-1 text-center w-100" (click)="openModal()">
          Editar
        </button>
        <app-gemini-chat
          [tittle]="'Generar una sesión detallada sobre ' + (locationState()?.title || '') + ', que incluya ecuaciones y video de youtube con ID: &quot;HKBllam1zhA&quot; y ancho de &quot;100%&quot;, además de un apple de geogebra con ID: &quot;cy7eykhk&quot; y ancho de &quot;100%&quot;, además citar bibliografías referentes al tema, todo en código html sin estilos'"
          [type]="'sesión'"
        />
      }

      <h5 class="text-center">
        <span class="ffont h3 text-info">{{ locationState()?.title }}</span>
        <span class="ffont h1 text-center text-dark"> [{{ locationState()?.unittitle }}] </span>
      </h5>

      <div>
        @if (currentUser()?.rol !== '1') {
          <div class="my-2">
            @if (firstStudentTask()?.dateb) {
              <div class="p-1">
                @if (hasAvailableTasks() && isStudentTestActive()) {
                  <button
                    class="btn btn-warning w-100"
                    [disabled]="isDisabled()"
                    (click)="goTest()"
                  >
                    Ir al test 
                    (Inicio: {{ formatTaskDate(firstStudentTask()?.dateb) }}) 
                    (Vence: {{ formatTaskDate(firstStudentTask()?.datee) }})
                    ({{ getTimeAgo(firstStudentTask()?.datee) }}) 
                  </button>
                } @else {
               ''   <!-- <div class="text-center alert alert-warning">---</div> -->
                }
              </div>
            } @else {
              <div>
                @if (isSessionActive()) {
                  @if (hasAvailableTasks()) {
                    <button
                      class="btn btn-primary w-100"
                      [disabled]="isDisabled()"
                      (click)="getRandomIntInclusive()"
                    >
                      Generar test (Acumular crédito)
                    </button>
                  }
                } @else {
                  <div class="text-center alert alert-warning">
                    Intervalo de sesión culminada (No generó test)
                  </div>
                }
              </div>
            }
          </div>
        }

        @if (currentUser()?.rol === '1') {
          <button class="btn btn-primary w-100 mt-1" (click)="createTask()">
            Crear tarea
          </button>

          <div class="row d-flex justify-content-center">
            @for (notew of tassks(); track notew._id) {
              <div class="text-center col-md-3 p-1 m-1">
                <div
                  class="rounded"
                  [style.background-color]="isSessionActive() ? 'orange' : 'skyblue'"
                >
                  [{{ notew.task?.length || 0 }}-{{ notew.solution?.length || 0 }}]
                  <div class="p-1 btn-group w-100">
                    <a
                      class="btn w-100 btn-light"
                      [routerLink]="'/updatetest/' + notew._id"
                    >
                      Actualizar
                    </a>
                    <button
                      class="btn btn-secondary w-100"
                      (click)="cleantaskone(notew._id)"
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>

      <dialog #editModal class="border-0 rounded p-4 shadow-lg" style="max-width: 600px; width: 100%;">
        <div class="modal-header font-weight-bold h5 mb-3 border-bottom pb-2">Actualizar</div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Detalle (Escriba texto en formato Markdown)</label>
            <textarea
              class="form-control scroll"
              placeholder="Contenido"
              rows="9"
              name="description"
              [ngModel]="description()"
              (ngModelChange)="description.set($event)"
              required
            ></textarea>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-end gap-2 border-top pt-3 mt-3">
          <button type="button" class="btn btn-info text-white" (click)="submitTest()">
            Actualizar
          </button>
          <button type="button" class="btn btn-secondary" (click)="closeModal()">
            Cerrar
          </button>
        </div>
      </dialog>

      <!-- VISUALIZACIÓN DE MARKDOWN -->
      <div class="rounded bg-light p-1">
        <div [appMathRenderer]="description()"></div>
      </div>

      <!-- PANEL DOCENTE (ROL 1) DE CONFIGURACIÓN -->
      @if (currentUser()?.rol === '1') {
        <div
          class="p-1 rounded my-3"
          [style.background-color]="isSessionActive() ? 'Gold' : 'WhiteSmoke'"
        >
          <app-gemini-chat
            [tittle]="iaPrompt()"
            [type]="'items'"
          />

          <div class="h3 w-100 text-center ffont font-weight-bold">
            {{ isSessionActive() ? 'FECHA ACTIVADA' : 'FECHA NO ACTIVADA' }}
          </div>

          <div class="row p-1 d-flex justify-content-center align-items-center">
            <!-- FECHA INICIO -->
            <div class="col-md-6 p-1 text-center">
              Inicia {{ getTimeAgo(dateb()) }}
              <br />
              <input
                type="datetime-local"
                class="form-control btn btn-info w-100 mt-1 text-white"
                [ngModel]="formattedDateb()"
                (ngModelChange)="onDatebInputChange($event)"
              />
            </div>

            <!-- FECHA FIN -->
            <div class="col-md-6 p-1 text-center">
              Culmina {{ getTimeAgo(datee()) }}
              <br />
              <input
                type="datetime-local"
                class="form-control btn btn-info w-100 mt-1 text-white"
                [ngModel]="formattedDatee()"
                (ngModelChange)="onDateeInputChange($event)"
              />
            </div>

            <!-- TIEMPO DE EXAMEN -->
            <div class="col-md-2 p-1 text-center">
              Tiempo de examen
              <br />
              <input
                class="form-control"
                name="timetest"
                type="number"
                [ngModel]="timetest()"
                (ngModelChange)="timetest.set($event)"
                step="1"
                min="0"
                max="100"
              />
            </div>
          </div>

          <button class="btn btn-info w-100 my-1 text-white" (click)="submitTest()">
            Actualizar campos
          </button>
          <button class="btn btn-danger w-100" (click)="onSubmitRemove()">
            Remover sesión
          </button>
        </div>
      }

      <!-- PANEL DE ESTUDIANTES PARA ROL 1 -->
      @if (currentUser()?.rol === '1') {
        <div class="p-1 text-center">
          <div class="row justify-content-center align-items-center">
            @for (note of stdaverages(); track note._id) {
              <div class="col-md-4 p-1 m-0 text-center">
                <div class="border rounded p-1">
                  <button
                    class="form-control btn btn-info mb-1 text-white"
                    (click)="removeaddedcurse(note._id)"
                  >
                    Remover del curso
                  </button>

                  {{ note.usser?.[0]?.name || '' }}
                  <br />

                  @if (note.usser?.[0]?.tassk?.[0]; as studentTask) {
                    @if (studentTask.datee) {
                      {{ getTimeAgo(studentTask.datee) }}
                    }
                    <!-- {{ studentTask._id }} -->
                    <app-export-to-excel
                      [idtheme]="curseId()"
                      [codetheme]="themeId()"
                      [usser]="note.usser?.[0]?._id || ''"
                    />
                    <button
                      class="btn btn-warning w-100"
                      (click)="cleantaskone(studentTask._id)"
                    >
                      Borrar tarea
                    </button>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      }

      <div class="py-3"></div>
    </div>
  `
})
export class ThemeComponent implements OnInit {

  readonly currentUser = signal<any>(this.getUserFromStorage());

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastrService);
  private readonly destroyRef = inject(DestroyRef);

  readonly editModal = viewChild<ElementRef<HTMLDialogElement>>('editModal');
  private readonly API_URL = `${environment.apiURL}/api`;

  readonly curseId = signal<string>('');
  readonly themeId = signal<string>('');
  readonly locationState = signal<any>({});

  readonly stdaverages = signal<StudentAverage[]>([]);
  readonly description = signal<string>('');
  readonly timetest = signal<string>('3');
  readonly isDisabled = signal<boolean>(false);
  readonly tassks = signal<Task[]>([]);
  readonly tasskstd = signal<Task[]>([]);
  readonly id = signal<string>('');
  readonly title = signal<string>('');
  readonly dateb = signal<Date>(new Date());
  readonly datee = signal<Date>(new Date());
  readonly noww = signal<Date>(new Date());

  readonly task = signal<string>('task');
  readonly solution = signal<string>('solution');
  readonly items = signal<QuizItem[]>([
    {
      prg: '¿Qué axioma de orden establece que para cualesquiera dos números reales $a$ y $b$, se cumple exactamente una de las relaciones: $a < b$, $a = b$ o $a > b$?',
      alt: [
        ['La ley de tricotomía'],
        ['La propiedad transitiva'],
        ['La propiedad reflexiva'],
        ['La propiedad de simetría']
      ],
      rpta: 'La ley de tricotomía',
      std: ''
    },
    {
      prg: 'Hallar la integral de \\(\\int_1^3z^3dz\\) ',
      obs: 'Para hallar el valor de la integral propuesta, aplicamos el Teorema Fundamental del Cálculo...',
      std: 'Para hallar el valor de la integral propuesta, aplicamos el Teorema Fundamental del Cálculo...',
      pctgsimilar: '97.47126436781609'
    }
  ]);

  readonly firstStudentTask = computed(() => {
    const list = this.tasskstd();
    return list.length > 0 ? list[0] : null;
  });

  readonly hasAvailableTasks = computed(() => this.tassks().length > 0);

  readonly iaPrompt = computed(() => 
    `Generar 12 preguntas 6 cerradas y 6 abiertas sobre ${this.locationState()?.title || ''}, que tenga la siguiente estructura...`
  );

  readonly isSessionActive = computed(() => {
    const start = this.dateb().getTime();
    const end = this.datee().getTime();
    const current = this.noww().getTime();
    return start <= current && current <= end;
  });

  readonly isStudentTestActive = computed(() => {
    const task = this.firstStudentTask();
    if (!task?.datee) return false;
    
    const expiryDate = parseISO(task.datee);
    if (!isValid(expiryDate)) return false;

    // Retorna true si aún NO ha vencido el examen del alumno
    return expiryDate.getTime() >= this.noww().getTime();
  });

  readonly formattedDateb = computed(() => format(this.dateb(), "yyyy-MM-dd'T'HH:mm"));
  readonly formattedDatee = computed(() => format(this.datee(), "yyyy-MM-dd'T'HH:mm"));

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((p) => {
        this.curseId.set(p['idcurso'] || '');
        this.themeId.set(p['idtema'] || '');
        this.locationState.set(history.state || {});
        this.getNotes();
      });
  }

  private getUserFromStorage(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAsignature(): any {
    const asig = localStorage.getItem('asignature');
    return asig ? JSON.parse(asig) : null;
  }

  getTimeAgo(date?: Date | string): string {
    if (!date) return '';
    try {
      const dateObj = typeof date === 'string' ? parseISO(date) : date;
      if (!isValid(dateObj)) return '';
      return formatDistanceToNow(dateObj, { addSuffix: true, locale: es });
    } catch {
      return '';
    }
  }

  formatTaskDate(dateStr?: string, pattern: string = 'yyyy-MM-dd HH:mm'): string {
    if (!dateStr) return '';
    try {
      const parsed = parseISO(dateStr);
      if (!isValid(parsed)) return '';
      return format(parsed, pattern, { locale: es });
    } catch {
      return '';
    }
  }

  openModal(): void {
    this.editModal()?.nativeElement.showModal();
  }

  closeModal(): void {
    this.editModal()?.nativeElement.close();
  }

  onDatebInputChange(value: string): void {
    if (value) {
      this.noww.set(new Date());
      this.dateb.set(new Date(value));
    }
  }

  onDateeInputChange(value: string): void {
    if (value) {
      this.noww.set(new Date());
      this.datee.set(new Date(value));
    }
  }

  async getNotes(): Promise<void> {
    try {
      const user = this.currentUser();
      const res = await firstValueFrom(
        this.http.get<SectionData[]>(
          `${this.API_URL}/seccions/${this.curseId()}/${this.themeId()}/${user?._id}`
        )
      );

      if (!res || res.length === 0) {
        this.router.navigate([`/curso/${this.curseId()}`]);
      } else {
        const data = res[0];
        this.id.set(data._id);
        this.tassks.set(data.tassks || []);
        this.timetest.set(data.timetest || '3');
        this.tasskstd.set(data.tasskstd || []);
        this.dateb.set(data.dateb ? parseISO(data.dateb) : new Date());
        this.datee.set(data.datee ? parseISO(data.datee) : new Date());
        this.title.set(data.title || '');
        this.description.set(data.description || '');
        this.isDisabled.set(false);

        document.title = this.isAsignature()?.title || 'Tema';

        if (user?.rol === '1') {
          this.getStdNativescalification(data._id);
        }
      }
    } catch (err: any) {
      console.error(err);
      this.toast.error(`Error al obtener información: ${err?.statusText || ''}`);
    }
  }

  async getStdNativescalification(seccionId?: string): Promise<void> {
    const currentId = seccionId || this.id();
    if (!currentId) return;

    try {
      const res = await firstValueFrom(
        this.http.get<StudentAverage[]>(
          `${this.API_URL}/users/themeusers/${currentId}/${this.curseId()}`
        )
      );
      this.stdaverages.set(res || []);
    } catch (err) {
      console.error(err);
    }
  }

  async submitTest(): Promise<void> {
    const payload = {
      title: this.locationState()?.title || 'Sin Título',
      description: this.description(),
      dateb: this.dateb().toISOString(),
      datee: this.datee().toISOString(),
      timetest: this.timetest()
    };

    try {
      const res = await firstValueFrom(
        this.http.put<string>(`${this.API_URL}/seccions/${this.id()}`, payload)
      );
      this.closeModal();
      this.getNotes();
      this.toast.info(res);
    } catch (err) {
      console.error(err);
    }
  }

  async createTask(): Promise<void> {
    try {
      await firstValueFrom(
        this.http.post(`${this.API_URL}/tasks`, {
          note: '',
          task: this.task(),
          items: this.items(),
          solution: this.solution(),
          theme: this.id(),
          codetheme: this.themeId(),
          curse: this.curseId(),
          user: this.currentUser()?._id,
          dateb: this.dateb().toISOString(),
          datee: this.datee().toISOString()
        })
      );
      this.getNotes();
    } catch (err) {
      console.error(err);
    }
  }

  async createTaskstd(quizItems: QuizItem[]): Promise<void> {
    const addMinutesOrHours = (timeVal: string): string => {
      const val = Number(timeVal);
      if (isNaN(val)) return new Date().toISOString();
      const now = new Date();
      // Si el tiempo es mayor a 2, se asume minutos (ms), de lo contrario horas (ms)
      const additionInMs = val > 2 
        ? val * 60 * 1000 
        : val * 60 * 60 * 1000;

      return new Date(now.getTime() + additionInMs).toISOString();
    };

    const timestop = addMinutesOrHours(this.timetest());

    try {
      await firstValueFrom(
        this.http.post(`${this.API_URL}/tasks`, {
          note: '',
          task: this.task(),
          items: quizItems,
          solution: this.solution(),
          theme: this.id(),
          codetheme: this.themeId(),
          curse: this.curseId(),
          user: this.currentUser()?._id,
          dateb: new Date().toISOString(),
          datee: timestop
        })
      );
      this.router.navigate([`/tematest/${this.curseId()}/${this.themeId()}`]);
    } catch (err) {
      console.error(err);
    }
  }

  goTest(): void {
    this.router.navigate([`/tematest/${this.curseId()}/${this.themeId()}`]);
  }

  async getRandomIntInclusive(): Promise<void> {
    this.isDisabled.set(true);
    const availableTasks = this.tassks();
    if (availableTasks.length === 0) {
      this.isDisabled.set(false);
      return;
    }

    const rand = Math.floor(Math.random() * availableTasks.length);
    const currentTask = availableTasks[rand];

    if (!currentTask || !currentTask.items) {
      this.isDisabled.set(false);
      return;
    }

    const shuffleArray = <T>(array: T[]): T[] => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const shuffleNestedData = (nestedData: any): any => {
      if (Array.isArray(nestedData)) {
        return shuffleArray(nestedData).map((item) => shuffleNestedData(item));
      }
      if (nestedData !== null && typeof nestedData === 'object') {
        const updatedObject: any = { ...nestedData };
        for (const key in updatedObject) {
          if (Array.isArray(updatedObject[key])) {
            updatedObject[key] = shuffleArray(updatedObject[key]).map((item) =>
              shuffleNestedData(item)
            );
          } else if (typeof updatedObject[key] === 'object') {
            updatedObject[key] = shuffleNestedData(updatedObject[key]);
          }
        }
        return updatedObject;
      }
      return nestedData;
    };

    const randomizedQuiz = shuffleNestedData(currentTask.items);

    if (this.tasskstd().length === 0) {
      await this.createTaskstd(randomizedQuiz);
    } else {
      this.toast.info('Test ya generado');
      this.isDisabled.set(false);
    }
  }

  async cleantaskone(taskId: string): Promise<void> {
    if (window.confirm('¿Desea eliminar la tarea?')) {
      try {
        await firstValueFrom(this.http.delete(`${this.API_URL}/tasks/${taskId}`));
        this.getNotes();
        this.getStdNativescalification();
      } catch (err) {
        console.error(err);
      }
    }
  }

  async onSubmitRemove(): Promise<void> {
    if (window.confirm('¿Deseas eliminar este capítulo?')) {
      try {
        await firstValueFrom(this.http.delete(`${this.API_URL}/seccions/${this.id()}`));
        this.getNotes();
        this.toast.info('Removido correctamente');
      } catch (err) {
        console.error(err);
      }
    }
  }

  async removeaddedcurse(idmycurse: string): Promise<void> {
    if (window.confirm('¿Deseas eliminar estudiante de este curso?')) {
      try {
        await firstValueFrom(
          this.http.delete(`${this.API_URL}/curses/generate/${idmycurse}`)
        );
        this.getStdNativescalification();
        this.toast.info('Removido correctamente');
      } catch (err) {
        console.error(err);
      }
    }
  }
}