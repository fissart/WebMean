import { Component, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Navbar } from './navbar';
import { getCokie, removeCokie, removeLocalStorage, isAuth } from './auth';


// Nota: Para CKEditor y React-Bootstrap se requerirían adaptaciones nativas en Angular.
// Aquí se presenta una estructura moderna con Angular 21 (Signals, Control Flow, standalone components).

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [Navbar, CommonModule, FormsModule],
  template: `
  <app-navbar></app-navbar>
            <div class="py-5"></div>

    <div class="container p-1">
      <!-- Botón Administrador -->
      @if (isAdministrator()) {
        <div class="card-body p-3 text-center">
          <button class="btn btn-secondary px-4" (click)="openCreateModal()">
            Generar documentos
          </button>
        </div>
      }

      <!-- Listado de Documentos del Servidor -->
      <div id="section-one" class="my-1" style="min-height: 100vh;">
        @for (note of zz(); track note._id; let i = $index) {
          <div class="border border-primary p-1 mt-3 rounded bg-white shadow-sm">
            <div class="text-primary text-center h2 p-1">{{ note.title }}</div>
            
            @if (isAdministrator()) {
              <div class="text-center">
                <button class="btn btn-warning btn-sm w-50" type="button" (click)="toggleCollapse(note._id)">
                  Controles de Estructura
                </button>
                @if (collapsedStates()[note._id]) {
                  <div class="mt-2">
                    <div class="btn-group w-100 shadow-sm">
                      <button class="btn btn-info" (click)="openSubclassModal(i)">
                        Agregar Subclase
                      </button>
                      <button class="btn btn-success" (click)="openEditModal(note, i)">
                        Editar Clase
                      </button>
                      <button class="btn btn-danger" (click)="removeLink(note._id)">
                        Eliminar
                      </button>
                    </div>
                  </div>
                }
              </div>
            }

            @if (note.description) {
              <div class="text-muted p-2 bg-light rounded" [innerHTML]="note.description"></div>
            }

            <div class="row d-flex justify-content-center align-items-center mt-3 g-2">
              @for (notte of note.usertask; track $index; let j = $index) {
                <div class="col-md-6 col-lg-4 p-1">
                  <button class="btn btn-outline-primary text-truncate w-100" (click)="openExternalLink(notte.detail)">
                    {{ notte.title }}
                  </button>
                    <div class="text-center">
 @if (!isLink(notte.detail)) {
  {{ notte.detail }}
}
</div>
                  
                  @if (isAdministrator()) {
                    <div class="mt-2 text-center">
                      <button class="btn btn-primary btn-sm w-100" style="font-size: 11px;" type="button" (click)="toggleSubCollapse(i, j)">
                        Acciones de Nodo
                      </button>
                      @if (subCollapsedStates()[i + '_' + j]) {
                        <div class="mt-1">
                          <div class="btn-group w-100 size-sm">
                            <button class="btn btn-sm btn-outline-info" (click)="openSubclassModal(i, j)">
                              +
                            </button>
                            <button class="btn btn-sm btn-outline-success" (click)="openEditSubclassModal(notte, i, j)">
                              Editar
                            </button>
                            <button class="btn btn-sm btn-outline-danger" (click)="removeSubtask(i, j)">
                              X
                            </button>
                          </div>
                        </div>
                      }
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        }
      </div>

      <!-- MODAL UNIFICADO (Simulado con Bootstrap/HTML nativo) -->
      @if (showFormModal()) {
        <div class="modal show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5);">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-capitalize">{{ selectMode() || 'Formulario de Gestión' }}</h5>
                <button type="button" class="btn-close" (click)="resetFormModal()"></button>
              </div>
              <div class="modal-body">
                @if (selectMode() === 'subclase' || typePayload() === 'nuevas') {
                  <div class="card form-group p-2 mb-2">
                    <input type="file" class="form-control" (change)="fileSelectHandler($event)" />
                  </div>
                }
                <div class="card form-group mb-2 p-2">
                  <input type="text" placeholder="Título corporativo" class="form-control" [(ngModel)]="formState.title" required />
                </div>
                <div class="card form-group p-2">
                  @if (selectMode() === 'subclase') {
                    <textarea placeholder="Detalles de URL o texto plano..." class="form-control" rows="4" [(ngModel)]="formState.detail" required></textarea>
                  } @else {
                    <textarea placeholder="Descripción académica..." class="form-control" rows="6" [(ngModel)]="formState.detail"></textarea>
                  }
                </div>
              </div>
              <div class="modal-footer">
                @if (selectMode() === 'crear') {
                  <button class="btn btn-info" (click)="crearGeneral($event)">Crear Documento</button>
                }
                @if (selectMode() === 'subclase') {
                  <button class="btn btn-info" (click)="updateSubTaskText()">Actualizar Subclase</button>
                }
                @if (selectMode() === 'clase') {
                  <button class="btn btn-info" (click)="onSubmitUpdate($event)">Actualizar Clase</button>
                }
                @if (selectMode() === 'newclass') {
                  <button class="btn btn-info" (click)="createSesion()">Confirmar Subclase</button>
                }
                <button class="btn btn-outline-dark" (click)="createSesionw()">Inyectar Sub-Nodo</button>
                <button type="button" class="btn btn-secondary" (click)="resetFormModal()">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiURL}/api` || '';

  zz = signal<any[]>([]);
  showFormModal = signal(false);
  selectMode = signal('');
  typePayload = signal('');
  subtype = signal('');
  targetId = signal('');
  indices = signal({ i: '', j: '', k: '' });

  formState = {
    title: '',
    detail: '',
    files: [] as File[]
  };

  currentUser: any = null;
  isAdministrator = signal(false);

  collapsedStates = signal<Record<string, boolean>>({});
  subCollapsedStates = signal<Record<string, boolean>>({});

  ngOnInit(): void {
    // Simulación de autenticación (reemplazar con helper o servicio de auth)
    this.currentUser = isAuth();
    this.isAdministrator.set(this.currentUser?.rol === '1');

    this.getNotes();

    // Limpieza de datos obsoletos
    const storageKeys = ['idc', 'idcat', 'curse'];
    storageKeys.forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
  }

  ngOnDestroy(): void {}

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getNotes = async () => {
    try {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
      this.http.get<any[]>(`${this.apiUrl}/links/lands`, { headers }).subscribe({
        next: (data) => {this.zz.set(data); console.log(data)},
        error: (err) => console.error('Error al cargar documentos', err)
      });
    } catch (err) {
      console.error(err);
    }
  };

  resetFormModal = () => {
    this.showFormModal.set(false);
    this.formState = { title: '', detail: '', files: [] };
    this.selectMode.set('');
    this.typePayload.set('');
    this.subtype.set('');
    this.targetId.set('');
    this.indices.set({ i: '', j: '', k: '' });
  };

  fileSelectHandler = (event: any) => {
    const selectedFiles = event.target.files;
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
    if (selectedFiles?.length > 0) {
      if (selectedFiles[0].size < 105048576 && allowedTypes.includes(selectedFiles[0].type)) {
        this.formState.files = [selectedFiles[0]];
      } else {
        alert('Solo se aceptan imágenes menores a 1MB');
      }
    }
  };

  crearGeneral = async (e: Event) => {
    e.preventDefault();
    const data = new FormData();
    data.append('type', this.typePayload());
    data.append('subtype', this.subtype());
    data.append('title', this.formState.title);
    data.append('detail', this.formState.detail);
    data.append('foreign', this.currentUser?._id || '');
    data.append('user', this.currentUser?._id || '');
    if (this.formState.files[0]) data.append('foto', this.formState.files[0]);
    console.log(data)

    this.http.post(`${this.apiUrl}/links/lands`, data).subscribe({
      next: () => {
        this.resetFormModal();
    this.getNotes();
        
        if (this.typePayload() === 'general') this.getNotes();
      },
      error: (err) => console.error(err)
    });
  };

  onSubmitUpdate = async (e: Event) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', this.formState.title);
    data.append('description', this.formState.detail);
    data.append('user', this.currentUser?._id || '');
    if (this.formState.files[0]) data.append('foto', this.formState.files[0]);

    this.http.put(`${this.apiUrl}/links/lands/${this.targetId()}`, data).subscribe({
      next: () => {
        this.resetFormModal();
        this.getNotes();
      },
      error: (err) => console.error(err)
    });
  };

  saveCollectionDirectly = async (dataToSave: any, id: string) => {
    try {
      this.http.put(`${this.apiUrl}/links/landswithoutfile/${id}`, dataToSave).subscribe({
        next: () => this.resetFormModal(),
        error: (err) => console.error(err)
      });
    } catch (error) {
      console.error(error);
    }
  };

  removeLink = async (idLink: string) => {
    if (!window.confirm('¿Deseas eliminar este item definitivo?')) return;
    this.http.delete(`${this.apiUrl}/links/${idLink}`).subscribe({
      next: () => this.getNotes(),
      error: (err) => console.error(err)
    });
  };

  removeSubtask = (i: number, j: number) => {
    if (!window.confirm('¿Deseas eliminar este item de la lista?')) return;
    const data = [...this.zz()];
    data[i].usertask.splice(j, 1);
    this.zz.set(data);
    this.saveCollectionDirectly(data[i], data[i]._id);
  };

  updateSubTaskText = () => {
    const idx = this.indices() as any;
    if (this.typePayload() === 'general') {
      const data = [...this.zz()];
      data[idx.i].usertask[idx.j].title = this.formState.title;
      data[idx.i].usertask[idx.j].detail = this.formState.detail;
      this.zz.set(data);
      this.saveCollectionDirectly(data[idx.i], data[idx.i]._id);
    }
  };

  createSesion = () => {
    const idx = this.indices() as any;
    const data = [...this.zz()];
    if (data[idx.i]) {
      data[idx.i].usertask.push({ title: this.formState.title, detail: this.formState.detail, link: '' });
      this.zz.set(data);
      this.saveCollectionDirectly(data[idx.i], data[idx.i]._id);
    }
  };

  createSesionw = () => {
    const idx = this.indices() as any;
    const data = [...this.zz()];
    const targetTask = data[idx.i]?.usertask[idx.j];
    if (targetTask) {
      if (!targetTask.usertast) targetTask.usertast = [];
      targetTask.usertast.push({ title: this.formState.title, detail: this.formState.detail, link: '' });
      this.zz.set(data);
      this.saveCollectionDirectly(data[idx.i], data[idx.i]._id);
    }
  };

  openCreateModal() {
    this.selectMode.set('crear');
    this.typePayload.set('general');
    this.subtype.set('image');
    this.showFormModal.set(true);
  }

  openSubclassModal(i: any, j: any = '') {
    this.selectMode.set('newclass');
    this.typePayload.set('general');
    this.indices.set({ i, j, k: '' });
    this.showFormModal.set(true);
  }

  openEditModal(note: any, i: number) {
    this.selectMode.set('clase');
    this.typePayload.set('general');
    this.formState = { title: note.title, detail: note.description, files: [] };
    this.targetId.set(note._id);
    this.showFormModal.set(true);
  }

  openEditSubclassModal(notte: any, i: number, j: number) {
    this.selectMode.set('subclase');
    this.typePayload.set('general');
    this.formState = { title: notte.title, detail: notte.detail, files: [] };
    this.indices.set({ i: i as any, j: j as any, k: '' });
    this.showFormModal.set(true);
  }

  toggleCollapse(id: string) {
    this.collapsedStates.update(state => ({ ...state, [id]: !state[id] }));
  }

  toggleSubCollapse(i: number, j: number) {
    const key = `${i}_${j}`;
    this.subCollapsedStates.update(state => ({ ...state, [key]: !state[key] }));
  }

  openExternalLink(url: string) {
    window.open(url, '_blank', 'noreferrer');
  }

  isLink(value: string | null | undefined): boolean {
    if (!value) return false;
    return /^https?:\/\//i.test(value.trim());
  }
}