import { Component, inject, Input, output, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { ExportToPdfComponent } from './notasstdpdf';
import { ExportToPdfallComponent } from './notasallstdpdf';

// ==========================================
// 1. INTERFACES Y CONSTANTES
// ==========================================
export interface StudentRecord {
  _id: string;
  dni: string;
  name: string;
  email: string;
  mencion: string;
  ciclo: string;
  tipostd: string;
  rol: string;
}

export interface CycleGroup {
  _id: string;
  records: StudentRecord[];
}

export interface MentionGroup {
  _id: string;
  usser?: CycleGroup[];
}

export interface ConvalidateRecord {
  _id: string;
  user: string;
  useremail: string;
  username: string;
  nota: string;
  title?: string;
  ciclo?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  rol: string;
  mencion?: string;
  ciclo?: string;
  tipostd?: string;
  dni?: string;
  dateb?: string;
  datee?: string;
}

const MENTION_LABELS: Record<string, string> = {
  E: 'Escultura',
  P: 'Pintura',
  G: 'Grabado',
  ED: 'Educación Artística'
};

const API_URL = `${environment.apiURL}/api` || '';

// ==========================================
// 2. COMPONENTE HIJO (TABLA DE ESTUDIANTES)
// ==========================================
@Component({
  selector: 'app-admin-student-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (stds && stds.length > 0) {
      <div class="mt-3">
        @for (message of stds; track message._id || $index) {
          @if (message) {
            <div class="mb-5">
              <h1 class="text-warning text-center w-100 ffont mb-3" style="font-size: 36px;">
                {{ getMentionLabel(message._id) }}
              </h1>

              <div
                class="border-primary rounded p-3"
                [style.background-color]="message._id === 'N' ? '#e3f2fd' : 'transparent'"
              >
                @for (cycleGroup of message.usser; track cycleGroup._id || $index; let index = $index) {
                  <div class="mb-4 bg-white p-3 rounded border">
                    <div class="text-info h5 ffont mb-3">
                      Ciclo {{ cycleGroup._id }} 
                      <span class="text-muted">({{ getMentionLabel(message._id) }})</span>
                    </div>

                    <div class="table-responsive">
                      <table class="table table-hover align-middle">
                        <thead class="table-light">
                          <tr>
                            <th>N°</th>
                            <th>DNI (Editable)</th>
                            <th>Nombre (Editable) / Email</th>
                            <th>Mención</th>
                            <th>Ciclo</th>
                            <th>Tipo</th>
                            <th>Rol</th>
                            <th class="text-center">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          @for (student of cycleGroup.records; track student._id || $index; let i = $index) {
                            <tr>
                              <td>{{ i + 1 }}</td>
                              
                              <td 
                                contenteditable="true"
                                (blur)="handleBlur(student, 'dni', $event)"
                                class="px-2 border-dashed-bottom text-primary"
                                style="outline: none; cursor: edit;"
                              >
                                {{ student.dni }}
                              </td>
                              
                              <td>
                                <span
                                  contenteditable="true"
                                  (blur)="handleBlur(student, 'name', $event)"
                                  class="fw-bold d-block text-primary"
                                  style="outline: none; cursor: edit;"
                                >
                                  {{ student.name }}
                                </span>
                                <div style="font-size: .68em;" class="text-muted">{{ student.email }}</div>
                              </td>

                              <td>{{ student.mencion }}</td>
                              <td>{{ student.ciclo }}</td>
                              <td>{{ student.tipostd }}</td>
                              <td>{{ student.rol }}</td>
                              <td class="text-center">
                                <div class="btn-group d-flex gap-2 justify-content-center">
                                  <button
                                    class="btn btn-warning btn-sm text-white"
                                    type="button"
                                    (click)="getStdCalifications(student._id, student.name)"
                                    style="font-size: 11px;"
                                  >
                                    Notas
                                  </button>
                                  <button
                                    class="btn btn-warning btn-sm text-white"
                                    type="button"
                                    (click)="toggleCollapse(student._id)"
                                    style="font-size: 11px;"
                                  >
                                    Editar
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-primary btn-sm"
                                    style="font-size: 11px;"
                                    (click)="convalidateClick.emit({ student, mentionId: message._id, label: getMentionLabel(message._id) })"
                                  >
                                    Convalidar
                                  </button>
                                </div>
                              </td>
                            </tr>

                            @if (expandedRows().has(student._id)) {
                              <tr>
                                <td colSpan="8" class="bg-light p-3">
                                  <div class="d-flex flex-column gap-2 max-w-100">
                                    <span class="small text-muted fw-bold">Modificar registro para {{ student.email }}:</span>

                                    <div class="btn-group btn-group-sm w-100 my-1">
                                      @for (m of ['P', 'E', 'G', 'ED']; track m) {
                                        <button
                                          type="button"
                                          class="btn btn-outline-info"
                                          [class.active]="student.mencion === m"
                                          (click)="emitUpdate(student, { mencion: m })"
                                        >
                                          {{ m }}
                                        </button>
                                      }
                                    </div>

                                    <div class="btn-group btn-group-sm w-100 my-1">
                                      @for (c of ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']; track c) {
                                        <button
                                          type="button"
                                          class="btn btn-outline-primary p-0"
                                          [class.active]="student.ciclo === c"
                                          (click)="emitUpdate(student, { ciclo: c })"
                                        >
                                          {{ c }}
                                        </button>
                                      }
                                    </div>

                                    <div class="btn-group btn-group-sm w-100 my-1">
                                      @for (t of ['R', 'L']; track t) {
                                        <button
                                          type="button"
                                          class="btn btn-outline-info"
                                          [class.active]="student.tipostd === t"
                                          (click)="emitUpdate(student, { tipostd: t })"
                                        >
                                          {{ t }}
                                        </button>
                                      }
                                    </div>

                                    <div class="btn-group btn-group-sm w-100 my-1">
                                      @for (r of ['1', '2', '3', '4', '5']; track r) {
                                        <button
                                          type="button"
                                          class="btn btn-outline-warning"
                                          [class.active]="student.rol === r"
                                          (click)="emitUpdate(student, { rol: r })"
                                        >
                                          {{ r }}
                                        </button>
                                      }
                                    </div>

                                    <div>
                                      <button
                                        type="button"
                                        class="btn btn-danger btn-sm w-100"
                                        (click)="emitUpdate(student, { mencion: 'N', ciclo: 'N', tipostd: 'N' })"
                                      >
                                        No matriculado
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            }
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        }
      </div>
    }
  `
})
export class AdminStudentTableComponent {
  @Input({ required: true }) stds: MentionGroup[] = [];

  readonly userUpdate = output<{
    id: string;
    rol: string;
    mencion: string;
    ciclo: string;
    tipostd: string;
    dni: string;
    name: string;
  }>();

  readonly convalidateClick = output<{
    student: StudentRecord;
    mentionId: string;
    label: string;
  }>();

  readonly viewGradesClick = output<string>();

  readonly expandedRows = signal<Set<string>>(new Set());

  getMentionLabel(id: string): string {
    return MENTION_LABELS[id] || 'No Matriculados';
  }

  toggleCollapse(studentId: string): void {
    this.expandedRows.update(set => {
      const newSet = new Set(set);
      if (newSet.has(studentId)) {
        newSet.delete(studentId);
      } else {
        newSet.add(studentId);
      }
      return newSet;
    });
  }

  handleBlur(student: StudentRecord, field: 'dni' | 'name', event: FocusEvent): void {
    const target = event.target as HTMLElement;
    const newValue = target.innerText.trim();

    if (newValue === student[field]) return;

    this.userUpdate.emit({
      id: student._id,
      rol: student.rol,
      mencion: student.mencion,
      ciclo: student.ciclo,
      tipostd: student.tipostd,
      dni: field === 'dni' ? newValue : student.dni,
      name: field === 'name' ? newValue : student.name
    });
  }

  emitUpdate(student: StudentRecord, changes: Partial<StudentRecord>): void {
    this.userUpdate.emit({
      id: student._id,
      rol: changes.rol ?? student.rol,
      mencion: changes.mencion ?? student.mencion,
      ciclo: changes.ciclo ?? student.ciclo,
      tipostd: changes.tipostd ?? student.tipostd,
      dni: student.dni,
      name: student.name
    });
  }

  getStdCalifications(studentId: string, student: string): void {
    console.log(studentId,student)
    this.viewGradesClick.emit(studentId);
  }
}

// ==========================================
// 3. COMPONENTE PRINCIPAL / PADRE
// ==========================================
@Component({
  selector: 'app-admin-student-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminStudentTableComponent, ExportToPdfComponent, ExportToPdfallComponent],
  template: `
    <div class="container py-4">
      <h2>Gestión Administrativa de Estudiantes</h2>
      <div class="mb-3 d-flex btn-group justify-content-center align-items-center w-100">
          @for (role of ['1', '2', '3', '4', '5', 'subscriber']; track role) {
            <button type="button" class="btn btn-warning" (click)="getStd(role)">
              {{ role === 'subscriber' ? 'Subscriptor' : role }}
            </button>
          }
        </div>
        <button class="btn btn-secondary" (click)="getConvalidates()">Cargar Convalidados</button>

      <!-- Tabla Principal de Estudiantes con el Output conectado -->
      <app-admin-student-table
        [stds]="stds()"
        (userUpdate)="UserUpdate($event.id, $event.rol, $event.mencion, $event.ciclo, $event.tipostd, $event.dni, $event.name)"
        (convalidateClick)="openConvalidateModal($event)"
        (viewGradesClick)="loadStudentGrades($event)"
      />

      <!-- Tabla de Convalidados -->
      @if (stdsConvalidate().length > 0) {
        <div class="mt-4">
          <h3>Estudiantes Convalidados</h3>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Email</th>
                <th>Nota</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              @for (item of stdsConvalidate(); track item._id) {
                <tr>
                  <td>{{ item.username }}</td>
                  <td>{{ item.useremail }}</td>
                  <td>{{ item.nota }}</td>
                  <td>
                    <button class="btn btn-danger btn-sm" (click)="deleteConvalidate(item._id)">
                      Eliminar
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }

      <!-- Modal de Convalidación -->
      @if (isModalOpen()) {
        <div class="modal d-block bg-dark bg-opacity-50" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Convalidar Estudiante</h5>
                <button type="button" class="btn-close" (click)="closeModal()"></button>
              </div>
              <div class="modal-body">
                <p>Estudiante: <strong>{{ student()?.name }}</strong></p>
                <div class="mb-3">
                  <label class="form-label">Nota:</label>
                  <input
                    type="text"
                    class="form-control"
                    [(ngModel)]="nota"
                    placeholder="Ingrese nota"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancelar</button>
                <button type="button" class="btn btn-primary" (click)="UserConvalidate()">Guardar Convalidación</button>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Modal de Calificaciones (Notas) -->
     @if (isGradesModalOpen()) {
        <div class="modal d-block bg-dark bg-opacity-50" tabindex="-1">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Calificaciones del Estudiante</h5>
                <button type="button" class="btn-close" (click)="closeGradesModal()"></button>
              </div>
              <div class="modal-body">
                @if (stdCalification().length > 0) {
                  <div class="table-responsive">
                    <!-- Pasamos el estudiante actual envuelto en un arreglo para cumplir con el input -->
                    <app-export-to-pdfall [data]="stdCalification()" [student]="student() ? [student()!] : []" />
                    
                    <table class="table table-striped table-bordered mt-2">
                      <thead class="table-dark">
                        <tr>
                          <th>Curso / Total</th>
                          <th>Menciones y Ciclos</th>
                        </tr>
                      </thead>
                      <tbody>
                        @for (item of stdCalification(); track item._id || $index) {
                          <tr>
                            <td class="fw-bold">
                              {{ item._id }}
                              <span class="badge bg-secondary ms-2">Total: {{ item.total }} Ciclo: {{ item._id }}</span>
                            </td>
                            <td>
                              @for (itemm of item.mencions; track itemm._id || $index) {
                                <div class="mb-3 p-2 bg-light rounded border">
                                  <div class="fw-semibold text-primary mb-1">
                                    <i class="bi bi-bookmark me-1"></i>Mención: {{ itemm._id }}
                                  </div>
                                  <app-export-to-pdf [data]="stdCalification()" [cicle]="item._id" [yyear]="itemm._id" />
                                 
                                  <table class="table table-sm table-hover bg-white mb-0 mt-2">
                                    <thead>
                                      <tr>
                                        <th>Título / Ciclo</th>
                                        <th class="text-end">Nota</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      @for (itemmm of itemm.cycles; track $index) {
                                        <tr>
                                          <td>{{ itemmm.title }}</td>
                                          <td class="text-end fw-bold">{{ itemmm.nota === '-0' ? 'Licencia' : itemmm.nota }}</td>
                                        </tr>
                                      }
                                    </tbody>
                                  </table>
                                </div>
                              } @empty {
                                <span class="text-muted fs-7">Sin menciones registradas</span>
                              }
                            </td>
                          </tr>
                        } @empty {
                          <tr>
                            <td colspan="2" class="text-center text-muted py-3">No hay calificaciones disponibles</td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                } @else {
                  <p class="text-center text-muted my-3">No hay calificaciones registradas para este estudiante.</p>
                }
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" (click)="closeGradesModal()">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class AdminStudentManagerComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastrService);

  // Estados de datos (Signals)
  readonly stds = signal<MentionGroup[]>([]);
  readonly stdsConvalidate = signal<ConvalidateRecord[]>([]);
  readonly stdCalification = signal<any[]>([]);

  readonly isModalOpen = signal<boolean>(false);
  readonly isGradesModalOpen = signal<boolean>(false); // Control para el modal de notas
  readonly student = signal<StudentRecord | null>(null);

  // Formulario y Estados de Sesión
  nota = '';
  activeUser = { _id: 'DOC123', email: 'docente@esfa.edu.pe', rol: '2' };
  curseid = 'CURSE123';
  title = 'Curso Arte';
  ciclo = '1';
  codigo = 'COD01';
  credito = 4;
  mencion = 'P';

  ngOnInit(): void {
    // this.getStd('3');
  }

  getStd = async (rol: string) => {
    try {
      const data = await firstValueFrom(
        this.http.get<MentionGroup[]>(`${API_URL}/users/userAll/${rol}`)
      );

      let list = Array.isArray(data) ? [...data] : [];
      if (rol === '3' && list.length > 1) {
        const nIndex = list.findIndex(item => item?._id === 'N');
        if (nIndex !== -1) {
          const temp = list[nIndex];
          list[nIndex] = list[list.length - 1];
          list[list.length - 1] = temp;
        }
      }

      this.stds.set(list);
      this.stdsConvalidate.set([]);
    } catch (err) {
      this.toast.error('Error al cargar estudiantes.');
    }
  };

  UserUpdate = async (id: string, rol: string, uMencion: string, uCiclo: string, tipostd: string, dni: string, name: string) => {
    try {
      const res = await firstValueFrom(
        this.http.put<any>(`${API_URL}/users/user/${id}`, { rol, mencion: uMencion, ciclo: uCiclo, tipostd, dni, name })
      );
      this.toast.info(typeof res === 'string' ? res : 'Actualizado correctamente');
    } catch (err: any) {
      this.toast.error(`Error al actualizar usuario: ${err?.error?.message || err.message}`);
    }
  };

  UserConvalidate = async () => {
    if (!this.nota) {
      this.toast.warning('Rellene el campo');
      return;
    }
    try {
      const currentStudent = this.student();
      const res = await firstValueFrom(
        this.http.post<any>(`${API_URL}/curses/average`, {
          user: currentStudent?._id,
          useremail: currentStudent?.email,
          username: currentStudent?.name,
          teacher: this.activeUser?._id,
          teacheremail: this.activeUser?.email,
          teacherrol: this.activeUser?.rol,
          curso: this.curseid,
          title: this.title,
          ciclo: this.ciclo,
          codigo: this.codigo,
          credito: this.credito,
          mencion: this.mencion,
          nota: this.nota,
          year: new Date().getFullYear()
        })
      );
      this.toast.info(typeof res === 'string' ? res : 'Convalidado con éxito');
      this.closeModal();
      this.getConvalidates();
    } catch (err: any) {
      this.toast.error(`Error al convalidar: ${err?.error?.message || err.message}`);
    }
  };

  getConvalidates = async () => {
    try {
      const res = await firstValueFrom(
        this.http.get<ConvalidateRecord[]>(`${API_URL}/curses/averagestd/${this.activeUser?.rol}/${new Date().getFullYear()}`)
      );
      this.stdsConvalidate.set(Array.isArray(res) ? res : []);
      this.stds.set([]);
    } catch (err) {
      console.error(err);
      this.toast.error('Error al cargar convalidados');
    }
  };

  deleteConvalidate = async (noteId: string) => {
    if (window.confirm('¿Deseas eliminar este convalidado?')) {
      try {
        await firstValueFrom(
          this.http.delete(`${API_URL}/curses/average/${noteId}`)
        );
        this.getConvalidates();
        this.toast.info('Removido correctamente');
      } catch (err) {
        this.toast.error('Error al eliminar el curso.');
      }
    }
  };

  loadStudentGrades = async (studentId: string) => {
    try {
      // 1. Buscar y almacenar el objeto estudiante correspondiente en el signal 'student'
      let foundStudent: StudentRecord | null = null;
      for (const mentionGroup of this.stds()) {
        if (mentionGroup.usser) {
          for (const cycleGroup of mentionGroup.usser) {
            const match = cycleGroup.records?.find(s => s._id === studentId);
            if (match) {
              foundStudent = match;
              break;
            }
          }
        }
        if (foundStudent) break;
      }
      
      this.student.set(foundStudent);

      // 2. Cargar calificaciones del estudiante
      const data = await firstValueFrom(
        this.http.get<any[]>(`${API_URL}/users/stdnotes/${studentId}`)
      );
      this.stdCalification.set(Array.isArray(data) ? data : []);
      this.isGradesModalOpen.set(true); // Abre el modal de calificaciones
    } catch (err) {
      this.toast.error('Error al cargar calificaciones del estudiante.');
    }
  };
  
  openConvalidateModal(event: { student: StudentRecord; mentionId: string; label: string }): void {
    this.student.set(event.student);
    this.nota = '';
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.student.set(null);
  }

  closeGradesModal(): void {
    this.isGradesModalOpen.set(false);
    this.stdCalification.set([]);
  }
}