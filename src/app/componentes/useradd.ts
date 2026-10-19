import { Component, WritableSignal, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Navbar } from './navbar';
import { environment } from '../../environments/environment';

interface RolOption {
  value: string;
  label: string;
}

interface MencionOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Navbar],
  styles: [`
    .form-floating > label {
      padding-left: 2.75rem;
    }
    .input-icon-wrapper {
      position: relative;
    }
    .input-icon {
      position: absolute;
      top: 50%;
      left: 1rem;
      transform: translateY(-50%);
      z-index: 5;
      color: #6c757d;
      font-size: 1.15rem;
      transition: color 0.2s ease-in-out;
    }
    .form-control-icon {
      padding-left: 2.85rem !important;
    }
    .input-icon-wrapper:focus-within .input-icon {
      color: #0d6efd;
    }
    .card-gradient-header {
      background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
    }
    .academic-section {
      background-color: #f8f9fa;
      border: 1px dashed #dee2e6;
    }
  `],
  template: `
    <app-navbar />
    <div class="py-5 py-md-5"></div>

    <div class="container my-4 col-12 col-md-10 col-lg-10 col-xl-8">
      <!-- Tarjeta Principal -->
      <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
        
        <!-- Encabezado de la Tarjeta -->
        <div class=" p-1 text-center position-relative">
            <i class="bi bi-person-plus-fill fs-2"></i>
          <h4 class="fw-bold mb-1">Registrar Nuevo Usuario</h4>
          <p class="small mb-0">Complete la información requerida para dar de alta un usuario</p>
        </div>

        <div class="card-body p-1 p-md-2">
          <!-- Toast / Alert de notificaciones -->
          @if (toastMessage()) {
            <div 
              class="alert alert-dismissible fade show d-flex align-items-center rounded-3 mb-4 shadow-sm border-start border-4"
              [ngClass]="toastType() === 'success' ? 'alert-success border-success' : 'alert-danger border-danger'" 
              role="alert"
            >
              <i class="bi me-2 fs-4" [ngClass]="toastType() === 'success' ? 'bi-check-circle-fill text-success' : 'bi-exclamation-triangle-fill text-danger'"></i>
              <div class="small fw-semibold">{{ toastMessage() }}</div>
            </div>
          }

          <form id="new-user-form" (ngSubmit)="handleFormAction($event)">
            
            <!-- Fila 1: Rol, Nombre, Correo -->
            <div class="row g-3 mb-3">
              <!-- Campo: Rol -->
              <div class="col-12 col-md-4 input-icon-wrapper">
                <i class="bi bi-shield-lock input-icon"></i>
                <div class="form-floating">
                  <select
                    class="form-select form-control-icon rounded-3 shadow-sm"
                    id="rolSelect"
                    name="rol"
                    [(ngModel)]="selectedRol"
                    required
                  >
                    @for (opt of rolOptions; track opt.value) {
                      <option [value]="opt.value">{{ opt.label }}</option>
                    }
                  </select>
                  <label for="rolSelect" class="text-secondary">Rol del Usuario *</label>
                </div>
              </div>

              <!-- Campo: Nombre Completo -->
              <div class="col-12 col-md-4 input-icon-wrapper">
                <i class="bi bi-person input-icon"></i>
                <div class="form-floating">
                  <input 
                    type="text" 
                    class="form-control form-control-icon rounded-3 shadow-sm" 
                    id="nameInput"
                    placeholder="Ej. Juan Pérez" 
                    [(ngModel)]="name" 
                    name="name" 
                    required 
                  />
                  <label for="nameInput" class="text-secondary">Nombre Completo *</label>
                </div>
              </div>

              <!-- Campo: Correo Electrónico -->
              <div class="col-12 col-md-4 input-icon-wrapper">
                <i class="bi bi-envelope input-icon"></i>
                <div class="form-floating">
                  <input 
                    type="email" 
                    class="form-control form-control-icon rounded-3 shadow-sm" 
                    id="emailInput"
                    placeholder="correo@ejemplo.com" 
                    [(ngModel)]="email" 
                    name="email" 
                    required 
                  />
                  <label for="emailInput" class="text-secondary">Correo Electrónico *</label>
                </div>
              </div>
            </div>

            <!-- Fila 2: Documento y Contraseña -->
            <div class="row g-3 mb-3">
              <!-- Campo: DNI -->
              <div class="col-12 col-md-6 input-icon-wrapper">
                <i class="bi bi-card-heading input-icon"></i>
                <div class="form-floating">
                  <input 
                    type="text" 
                    class="form-control form-control-icon rounded-3 shadow-sm" 
                    id="dniInput"
                    placeholder="Número de documento" 
                    [(ngModel)]="dni" 
                    name="dni" 
                    maxlength="12" 
                    required 
                  />
                  <label for="dniInput" class="text-secondary">DNI / Documento *</label>
                </div>
              </div>

              <!-- Campo: Contraseña -->
              <div class="col-12 col-md-6 input-icon-wrapper">
                <i class="bi bi-key input-icon"></i>
                <div class="form-floating">
                  <input 
                    type="password" 
                    class="form-control form-control-icon rounded-3 shadow-sm" 
                    id="passInput"
                    placeholder="Contraseña" 
                    [(ngModel)]="password" 
                    name="password" 
                    required 
                  />
                  <label for="passInput" class="text-secondary">Contraseña *</label>
                </div>
              </div>
            </div>

            <!-- Sección Dinámica: Estudiante -->
            @if (selectedRol() === '3') {
              <div class="p-2 rounded-1 academic-section my-1">
                <div class="d-flex align-items-center text-primary mb-3">
                  <div class="p-2 rounded-3 bg-primary bg-opacity-10 me-2">
                    <i class="bi bi-mortarboard-fill fs-5 text-primary"></i>
                  </div>
                  <h6 class="fw-bold mb-0">Datos Académicos (Estudiante)</h6>
                </div>

                <div class="row g-3">
                  <!-- Campo: Mención -->
                  <div class="col-12 col-md-6 input-icon-wrapper">
                    <i class="bi bi-journal-bookmark input-icon"></i>
                    <div class="form-floating">
                      <select class="form-select form-control-icon rounded-3 shadow-sm" id="mencionSelect" [(ngModel)]="mencion" name="mencion" required>
                        <option value="" disabled>-- Seleccionar Mención --</option>
                        @for (opt of mencionOptions; track opt.value) {
                          <option [value]="opt.value">{{ opt.label }}</option>
                        }
                      </select>
                      <label for="mencionSelect" class="text-secondary">Mención *</label>
                    </div>
                  </div>

                  <!-- Campo: Ciclo Académico -->
                  <div class="col-12 col-md-6 input-icon-wrapper">
                    <i class="bi bi-collection input-icon"></i>
                    <div class="form-floating">
                      <select class="form-select form-control-icon rounded-3 shadow-sm" id="cicloSelect" [(ngModel)]="ciclo" name="ciclo" required>
                        <option value="" disabled>-- Seleccionar Ciclo --</option>
                        @for (c of cicloOptions; track c) {
                          <option [value]="c">Ciclo {{ c }}</option>
                        }
                      </select>
                      <label for="cicloSelect" class="text-secondary">Ciclo Académico *</label>
                    </div>
                  </div>
                </div>
              </div>
            }

            <!-- Botón de Envío -->
            <button
              type="submit"
              class="btn btn-primary text-uppercase fw-bold shadow-sm mt-4 w-100 d-flex align-items-center justify-content-center gap-2"
              [disabled]="isPending()"
            >
              @if (isPending()) {
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Guardando Usuario...</span>
              } @else {
                <i class="bi bi-person-check-fill fs-5"></i>
                <span>Guardar Usuario</span>
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class UserFormComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  readonly apiUrl = `${environment.apiURL}/api`;

  readonly rolOptions: RolOption[] = [
    { value: '1', label: 'Administrador (1)' },
    { value: '2', label: 'Docente (2)' },
    { value: '3', label: 'Estudiante (3)' },
    { value: '4', label: 'Rol 4' },
    { value: '5', label: 'Rol 5' }
  ];

  readonly mencionOptions: MencionOption[] = [
    { value: 'ED', label: 'Educación Artística (ED)' },
    { value: 'E', label: 'Escultura (E)' },
    { value: 'G', label: 'Grabado (G)' },
    { value: 'P', label: 'Pintura (P)' }
  ];

  readonly cicloOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  isPending: WritableSignal<boolean> = signal(false);
  selectedRol: WritableSignal<string> = signal('3');
  
  name: WritableSignal<string> = signal('');
  email: WritableSignal<string> = signal('');
  dni: WritableSignal<string> = signal('');
  password: WritableSignal<string> = signal('');
  mencion: WritableSignal<string> = signal('');
  ciclo: WritableSignal<string> = signal('');

  toastMessage: WritableSignal<string> = signal('');
  toastType: WritableSignal<'success' | 'error'> = signal('success');

  private showToast(message: string, type: 'success' | 'error') {
    this.toastMessage.set(message);
    this.toastType.set(type);
    setTimeout(() => {
      this.toastMessage.set('');
    }, 3000);
  }

  handleFormAction(event: Event) {
    event.preventDefault();

    const rolVal = this.selectedRol();
    const nameVal = this.name().trim();
    const emailVal = this.email().trim();
    const dniVal = this.dni().trim();
    const passVal = this.password();
    const mencionVal = rolVal === '3' ? this.mencion() : null;
    const cicloVal = rolVal === '3' ? this.ciclo() : null;

    if (!nameVal || !emailVal || !dniVal || !rolVal || !passVal) {
      this.showToast('Por favor, rellene todos los campos obligatorios.', 'error');
      return;
    }

    if (rolVal === '3' && (!mencionVal || !cicloVal)) {
      this.showToast('Los estudiantes requieren una Mención y un Ciclo.', 'error');
      return;
    }

    const payload = {
      rol: rolVal,
      name: nameVal,
      email: emailVal,
      dni: dniVal,
      password: passVal,
      ...(rolVal === '3' && { mencion: mencionVal, ciclo: cicloVal })
    };

    this.isPending.set(true);

    this.http.post<{ message?: string }>(`${this.apiUrl}/auth/adduser`, payload).subscribe({
      next: (res) => {
        this.isPending.set(false);
        this.showToast(res?.message || 'Usuario registrado con éxito.', 'success');

        // Reset form state
        this.name.set('');
        this.email.set('');
        this.dni.set('');
        this.password.set('');
        this.mencion.set('');
        this.ciclo.set('');
        this.selectedRol.set('3');

        setTimeout(() => {
          this.router.navigate(['/carpeta']);
        }, 1500);
      },
      error: (err: HttpErrorResponse) => {
        this.isPending.set(false);
        console.error(err);
        const errMsg = err.error?.message || err.statusText || err.message;
        this.showToast(`Error al registrar usuario: ${errMsg}`, 'error');
      }
    });
  }
}