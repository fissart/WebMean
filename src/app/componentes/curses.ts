import { Component, OnInit, signal, inject, ElementRef, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { Navbar } from './navbar';
// import { ThreeHtmlCanvasComponent } from './logomodel3d';

export interface Curse {
  _id: string;
  title: string;
  description: string;
  img?: string;
  usser?: Array<{ email: string }>;
}

export interface GeneratedCurse {
  _id: string;
  curses: Curse[];
}

@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [CommonModule, Navbar, FormsModule, RouterLink],
  template: `
        <app-navbar></app-navbar>
    <div class="py-5"></div>

    <div class="container my-1">
      <!-- Botón Crear Curso (Solo Rol 1) -->
      @if (currentUser?.rol === '1') {
        <button class="btn w-100 my-1" (click)="openCreateModal()">
          <i class="bi bi-plus-lg text-primary fs-3"></i>
        </button>
      }

      <!-- Modal Custom Bootstrap Native -->
      @if (showModal()) {
        <div class="modal d-block tab-index-1 bg-dark bg-opacity-50" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header fw-bold">
                {{ updateOrCreate() === 'create' ? 'Crear Nuevo Curso' : 'Actualizar Curso' }}
                <button type="button" class="btn-close" (click)="closeModal()"></button>
              </div>
              <div class="modal-body">
                <div class="card form-group mb-3 p-2">
                  <label class="form-label text-start">Nombre</label>
                  <input 
                    type="text" 
                    class="form-control border-0 rounded-0" 
                    placeholder="Nombre" 
                    [ngModel]="title()" 
                    (ngModelChange)="title.set($event)" 
                    required />
                </div>
                <div class="card form-group mb-3 p-2">
                  <label class="form-label text-start">Contenido</label>
                  <textarea 
                    class="form-control border-0 rounded-0" 
                    placeholder="Contenido" 
                    rows="2" 
                    [ngModel]="description()" 
                    (ngModelChange)="description.set($event)" 
                    required></textarea>
                </div>

                <input #fileInput type="file" class="d-none" (change)="onFileSelected($event)" />

                <img 
                  class="img-fluid border rounded style-pointer" 
                  [src]="photoSelected() || (staticUrl + '/collections/' + foto())" 
                  alt="Thumb" 
                  (click)="triggerFileInput()" 
                  (error)="handleImageError($event)"
                  style="cursor: pointer;" />
              </div>
              <div class="modal-footer">
                <button class="btn btn-info" (click)="saveCourse()">
                  {{ updateOrCreate() === 'create' ? 'Crear nuevo curso' : 'Actualizar curso' }}
                </button>
                <button type="button" class="btn btn-secondary" (click)="closeModal()">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Bloque: Cursos Generados -->
      <div class="row justify-content-center align-items-stretch bg-info rounded my-2" [style.padding]="generatedCurses().length > 0 ? '.1em' : '0'">
        @for (message of generatedCurses(); track message._id || $index) {
          <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 p-2 d-flex align-items-stretch">
            <div class="p-1 border rounded contenedor bg-white w-100 h-100 d-flex flex-column position-relative">
              <img 
                class="image w-100" 
                [src]="staticUrl + '/collections/' + message.curses[0]?.img" 
                (error)="handleImageError($event)"
                alt="curso" 
                style="height: 220px; object-fit: cover;" />

              <div class="overlay-text d-flex flex-column justify-content-between h-100 w-100 p-2">
                <div class="h5 mb-2 ffont text-center p-2" >
                  {{ message.curses[0]?.title }}
                </div>
                <div class="btn-group w-100 mt-auto">
                  <button type="button" class="btn btn-outline-light" (click)="deleteCurseGenerate(message._id)">
                    <i class="bi bi-dash-circle text-danger fs-4"></i>
                  </button>
                  @if (message.curses[0]?._id) {
                    <a 
                      class="btn btn-outline-light"                      
                      [routerLink]="['/actualizacion', message.curses[0]._id]"
                      (click)="selectCurseStorage(curses()[$index])">
                      <i class="bi bi-arrows-angle-expand text-primary fs-4"></i>
                    </a>
                  }
                </div>
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Bloque: Catálogo General de Cursos -->
      <div class="row justify-content-center align-items-stretch" style="padding: .1em;">
        @for (message of curses(); track message._id || $index) {
          <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 p-2 d-flex align-items-stretch">
            <div class="p-0 m-0 contenedor p-1 card border border-info rounded w-100 h-100 d-flex flex-column position-relative">
              <img 
                class="image w-100 rounded" 
                [src]="staticUrl + '/collections/' + message.img" 
                (error)="handleImageError($event)"
                alt="curso catálogo" 
                style="height: 220px; object-fit: cover;" />
                <!-- <div style="height: 520px; object-fit: cover;" class="image w-100 rounded">
                  <app-three-html-canvas></app-three-html-canvas>
                </div>
               -->
              <div class="overlay-text d-flex flex-column justify-content-center h-100 w-100 p-2">
                <div class="text-center h5">
                  {{ message.title }}
                  <!-- <br /> {{ message.usser?.[0]?.email || '' }} -->
                </div>

                @if (currentUser?.rol !== '1') {
                  <div class="w-100 mt-auto">
                    <button [disabled]="enableBtn()" type="button" class="btn btn-outline-light w-100" (click)="generateCurse(message._id, message.description)">
                      <i class="bi bi-mortarboard-fill text-warning fs-3"></i>
                    </button>
                  </div>
                }

                @if (currentUser?.rol === '1') {
                  <div class="btn-group w-100 mt-auto">
                    <a class="btn btn-outline-info" [routerLink]="['/actualizacion', message._id]" (click)="selectCurseStorage(message)">
                      <i class="bi bi-arrows-angle-expand text-primary fs-4"></i>
                    </a>
                    <button type="button" class="btn btn-outline-info" (click)="deleteCurse(message._id)">
                      <i class="bi bi-dash-circle text-danger fs-4"></i>
                    </button>
                    <button type="button" class="btn btn-outline-info" (click)="openUpdateModal(message)">
                      <i class="bi bi-pencil text-warning fs-4"></i>
                    </button>
                  </div>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class CreateNoteComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private titleService = inject(Title);

  @Input() name?: string;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // Variables de configuración de API
  readonly apiUrl = `${environment.apiURL}/api`;
  readonly staticUrl = `${environment.apiURL}`;
  readonly fallbackImage = '/logo.svg';

  // Reactividad con Signals de Angular
  curses = signal<Curse[]>([]);
  generatedCurses = signal<GeneratedCurse[]>([]);
  showModal = signal<boolean>(false);
  enableBtn = signal<boolean>(false);

  // Formulario
  title = signal<string>('');
  description = signal<string>('');
  idCurse = signal<string>('');
  foto = signal<string>('');
  photoSelected = signal<string | null>(null);
  selectedFile: File | null = null;
  updateOrCreate = signal<'create' | 'update'>('create');

  ngOnInit(): void {
    if (this.name) {
      this.titleService.setTitle(`Page - ${this.name}`);
    }

    this.clearCurseStorage();
    this.loadCurses();

    if (this.currentUser) {
      this.loadGeneratedCurses();
    }
  }

  get currentUser(): any {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  loadCurses(): void {
    this.http.get<Curse[]>(`${this.apiUrl}/curses/cursosculqui/cursos`).subscribe({
      next: (data) => this.curses.set(data),
      error: (err) => console.error('Error al cargar cursos', err)
    });
  }

  loadGeneratedCurses(): void {
    const user = this.currentUser;
    if (!user?._id) return;

    this.http.get<GeneratedCurse[]>(`${this.apiUrl}/curses/Getgeneratecursosculqui/${user._id}/true`).subscribe({
      next: (data) => {
        this.enableBtn.set(false);
        this.generatedCurses.set(data);
      },
      error: (err) => console.error('Error al obtener cursos generados', err)
    });
  }

  openCreateModal(): void {
    this.title.set('');
    this.description.set('');
    this.photoSelected.set(null);
    this.selectedFile = null;
    this.updateOrCreate.set('create');
    this.showModal.set(true);
  }

  openUpdateModal(curse: Curse): void {
    this.idCurse.set(curse._id);
    this.title.set(curse.title);
    this.description.set(curse.description);
    this.foto.set(curse.img || '');
    this.photoSelected.set(null);
    this.selectedFile = null;
    this.updateOrCreate.set('update');
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      const file = input.files[0];
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => this.photoSelected.set(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.fallbackImage;
    imgElement.style.padding = '3px';
    imgElement.style.margin = '1px';
  }

  saveCourse(): void {
    if (this.updateOrCreate() === 'create') {
      const authUser = this.currentUser;
      const payload = {
        title: this.title(),
        description: this.description(),
        type: 'cursos',
        show: 'true',
        ciclo: '1',
        mencion: 'Artes',
        codigo: 'WCW',
        credito: '355',
        year: String(new Date().getFullYear()),
        user: authUser?._id
      };

      this.http.post(`${this.apiUrl}/curses/cursosculqui`, payload).subscribe({
        next: () => {
          this.closeModal();
          this.loadCurses();
        },
        error: (err) => console.error(err)
      });
    } else {
      const formData = new FormData();
      if (this.selectedFile) {
        formData.append('img', this.selectedFile);
      }
      formData.append('description', this.description());
      formData.append('title', this.title());

      this.http.put(`${this.apiUrl}/curses/${this.idCurse()}`, formData).subscribe({
        next: () => {
          this.closeModal();
          this.loadCurses();
        },
        error: (err) => console.error(err)
      });
    }
  }

  generateCurse(idcurse: string, desc: string): void {
    const authUser = this.currentUser;
    if (!authUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.enableBtn.set(true);
    const domain = authUser.email?.split('@')[1];

    if (domain === desc || desc === 'free') {
      this.http.post(`${this.apiUrl}/curses/generatecursosculqui`, {
        user: authUser._id,
        curse: idcurse,
        type: 'cursos'
      }).subscribe({
        next: () => this.loadGeneratedCurses(),
        error: (err) => {
          this.enableBtn.set(false);
          console.error(err);
        }
      });
    } else {
      this.enableBtn.set(false);
      alert('No puede agregarse a este curso');
    }
  }

  deleteCurse(noteId: string): void {
    if (confirm('Deseas eliminar este curso?')) {
      this.http.delete(`${this.apiUrl}/curses/${noteId}`).subscribe({
        next: () => this.loadCurses()
      });
    }
  }

  deleteCurseGenerate(noteId: string): void {
    if (confirm('Deseas eliminar este curso?')) {
      this.http.delete(`${this.apiUrl}/curses/generate/${noteId}`).subscribe({
        next: () => this.loadGeneratedCurses()
      });
    }
  }

  selectCurseStorage(curse: Curse): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('curse', JSON.stringify(curse));
    }
  }

  private clearCurseStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('idc');
      localStorage.removeItem('idcat');
      localStorage.removeItem('curse');
    }
  }
}