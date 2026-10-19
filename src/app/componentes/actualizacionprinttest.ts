import {
  Component,
  OnInit,
  signal,
  computed,
  inject,
  viewChild,
  ElementRef,
  input,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { parseISO, isValid } from 'date-fns';
import { NgxPrintModule } from 'ngx-print';
import { firstValueFrom } from 'rxjs';
import { isAuth, isAsignature } from './auth';
import { MathRendererDirective } from './mathrender';
import { environment } from '../../environments/environment';

export interface QuizItem {
  prg: string;
  alt?: string[][];
  rpta?: string;
  std?: string;
  obs?: string;
  nota?: string | number;
}

export interface TaskResponse {
  _id: string;
  note: string;
  items: QuizItem[];
  dateb: string;
  datee: string;
}

@Component({
  selector: 'app-export-to-excel',
  standalone: true,
  imports: [CommonModule, MathRendererDirective, NgxPrintModule],
  template: `
    @if (data().length > 0) {
      <div class="text-center font-weight-bold">
        @if (!isSessionActive()) {
          <button type="button" class="btn btn-outline-info mb-1" (click)="open()">
            {{ evaluacion() === '0' || evaluacion() === '' ? '' : 'Crédito ' + evaluacion() }}
          </button>
        }
      </div>
    }

    <!-- DIALOG NATIVO DE HTML5 PARA REEMPLAZAR REACT-BOOTSTRAP MODAL -->
    <dialog #printModal class="border-0 rounded p-0 shadow-lg" style="max-width: 900px; width: 95%;">
      <div class="modal-content">
        <div class="modal-header font-weight-bold border-bottom p-3">
          <h5 class="modal-title">Detalle de Evaluación</h5>
          <button type="button" class="btn-close" (click)="close()"></button>
        </div>

        <div class="modal-body p-3">
          <!-- SECCIÓN IMPRIMIBLE -->
          <div #printableContent>
            <div class="rounded text-primary fw-bold mb-3">
            www  <!-- {{ auth()?.name || '' }} {{ asignature()?.title || '' }} {{ titletheme() }} U{{ (i() ?? 0) + 1 }} S{{ (j() ?? 0) + 1 }} [{{ evaluacion() }}] -->
            </div>

            <div class="row justify-content-center align-items-center g-2">
              @for (number of data(); track $index) {
                <div [class]="number.alt ? 'col-sm-12 col-md-6 col-lg-6 col-xl-4 p-1' : 'col-sm-12 col-md-12 col-lg-12 p-1'">
                  <div class="border rounded p-2">
                    [{{ $index + 1 }}] {{ number.alt ? '' : 'Nota: ' + (number.nota ?? '') }}
                    
                    <div class="text-success my-1">
                      <div [appMathRenderer]="number.prg"></div>
                    </div>
                    
                    <hr class="my-2" />

                    @if (number.alt) {
                      <div [class]="number.std === number.rpta ? 'text-warning' : 'text-secondary'">
                        <div [appMathRenderer]="number.std ?? ''"></div>
                        [Rpta <div class="d-inline" [appMathRenderer]="number.rpta ?? ''"></div>]
                      </div>
                    } @else {
                      <div class="text-primary">
                        Rpta
                        <div [appMathRenderer]="number.obs ?? ''"></div>
                        <hr class="my-2" />
                        <div class="text-secondary">
                          <div [appMathRenderer]="number.std ?? ''"></div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        <div class="modal-footer d-flex justify-content-end gap-2 border-top p-3">
          <!-- <button
            type="button"
            class="btn btn-info text-white"
            [ngxPrint]="printableContent"
            [useExistingCss]="true"
          >
            Imprimir
          </button> -->
          <button type="button" class="btn btn-warning" (click)="close()">
            Cerrar
          </button>
        </div>
      </div>
    </dialog>
  `
})
export class ExportToExcelComponent implements OnInit {
  // Inputs definidos con Signals (Angular 17.1+)
  readonly idtheme = input.required<string>();
  readonly codetheme = input.required<string>();
  readonly usser = input.required<string>();
  readonly titletheme = input<string>('');
  readonly i = input<number>(0);
  readonly j = input<number>(0);

  private readonly http = inject(HttpClient);
  private readonly API_URL = `${environment.apiURL}/api`;

  // Referencia al elemento HTML Dialog
  readonly printModal = viewChild<ElementRef<HTMLDialogElement>>('printModal');

  // Estado del Componente con Signals
  readonly evaluacion = signal<string>('');
  readonly datew = signal<Date | null>(null);
  readonly dateww = signal<Date | null>(null);
  readonly data = signal<QuizItem[]>([]);
  readonly noww = signal<Date>(new Date());

  // Datos del almacenamiento de sesión
  readonly auth = signal<any>(isAuth());
  readonly asignature = signal<any>(isAsignature());

  // Evalúa el rango de fechas activas
  readonly isSessionActive = computed(() => {
    const start = this.datew()?.getTime();
    const end = this.dateww()?.getTime();
    const current = this.noww().getTime();

    if (!start || !end || isNaN(start) || isNaN(end)) return false;
    return start <= current && current <= end;
  });

  constructor() {
    // Reacciona si cambian los inputs (idtheme, codetheme, usser) automáticamente
    effect(() => {
      if (this.idtheme() && this.codetheme() && this.usser()) {
        this.getTask();
      }
    });
  }

  ngOnInit(): void {
    // Ejecución inicial protegida por la condición del effect o la invocación manual si no cambia
    if (this.data().length === 0) {
      this.getTask();
    }
  }
  
  async getTask(): Promise<void> {
    const id = this.idtheme();
    const code = this.codetheme();
    const user = this.usser();
    
    console.log(id,code,user)
    if (!id || !code || !user) return;
    
    try {
      const endpoint = `${this.API_URL}/tasks/test/${id}/${code}/${user}`;
      const res = await firstValueFrom(this.http.get<TaskResponse[]>(endpoint));
console.log(res)
      if (res && res.length > 0 && res[0]) {
        const firstTask = res[0];
        this.data.set(firstTask.items || []);

        const dateEnd = parseISO(firstTask.datee);
        const dateStart = parseISO(firstTask.dateb);

        this.dateww.set(isValid(dateEnd) ? dateEnd : null);
        this.datew.set(isValid(dateStart) ? dateStart : null);
        this.evaluacion.set(firstTask.note || '');
      } else {
        this.data.set([]);
        this.datew.set(null);
        this.dateww.set(null);
        this.evaluacion.set('');
      }
    } catch (err) {
      console.error('Error al obtener la tarea:', err);
      this.data.set([]);
    }
  }

  open(): void {
    const dialogElement = this.printModal()?.nativeElement;
    if (dialogElement && typeof dialogElement.showModal === 'function') {
      dialogElement.showModal();
    }
  }

  close(): void {
    const dialogElement = this.printModal()?.nativeElement;
    if (dialogElement && typeof dialogElement.close === 'function') {
      dialogElement.close();
    }
  }
}