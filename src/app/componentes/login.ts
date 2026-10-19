import { Component, OnInit, inject, signal, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { authenticate, isAuth } from './auth'; // Adjust path if needed
import { Navbar } from './navbar'; // Adjust path if needed
import { environment } from '../../environments/environment';

// Declare the global google object provided by the GIS script
declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, Navbar],
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
    .google-btn-wrapper {
      min-height: 44px;
    }
  `],
  template: `
    <app-navbar />
    <div class="py-4 py-md-5"></div>

    <div class="container my-4 col-12 col-md-8 col-lg-6 col-xl-5">
      <!-- Tarjeta Principal -->
      <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
        
        <!-- Encabezado de la Tarjeta -->
        <div class="p-2 text-center position-relative">
            <i class="bi bi-person-fill-lock fs-2"></i>
          <h4 class="fw-bold mb-1">Iniciar Sesión</h4>
          <p class="small mb-0">Ingrese sus credenciales para acceder al sistema</p>
        </div>

        <div class="card-body p-2 p-md-2">
          
          <!-- Banner Google -->
          <div class="text-center mb-2">
            <p class="small text-muted mb-2 fw-semibold">
              <i class="bi bi-shield-check text-primary me-1"></i> Inicie con Google para mayor seguridad
            </p>
            <div class="d-flex justify-content-center google-btn-wrapper">
              <div #googleBtnRef></div>
            </div>
          </div>

          <!-- Separador Visual -->
          <div class="d-flex align-items-center text-muted">
            <hr class="flex-grow-1 my-0" />
            <span class="px-2 small text-uppercase fw-semibold text-secondary">o ingrese con correo</span>
            <hr class="flex-grow-1 my-0" />
          </div>

          <!-- Formulario Tradicional -->
          <form [formGroup]="loginForm" (ngSubmit)="handleSubmit()" class="mt-2">
            
            <!-- Campo: Email -->
            <div class="mb-2 input-icon-wrapper">
              <i class="bi bi-envelope input-icon"></i>
              <div class="form-floating">
                <input
                  type="email"
                  class="form-control form-control-icon shadow-sm"
                  id="loginEmail"
                  placeholder="correo@ejemplo.com"
                  formControlName="email"
                />
                <label for="loginEmail" class="text-secondary">Correo Electrónico</label>
              </div>
            </div>

            <!-- Campo: Contraseña -->
            <div class="mb-2 input-icon-wrapper">
              <i class="bi bi-key input-icon"></i>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control form-control-icon shadow-sm"
                  id="loginPassword"
                  placeholder="Contraseña"
                  formControlName="password"
                />
                <label for="loginPassword" class="text-secondary">Contraseña</label>
              </div>
            </div>

            <!-- Botón Submit -->
            <button
              type="submit"
              class="btn btn-primary text-uppercase fw-bold shadow-sm py-1 mt-2 w-100 d-flex align-items-center justify-content-center gap-1"
              [disabled]="loading()"
            >
              @if (loading()) {
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>{{ textChange() }}...</span>
              } @else {
                <i class="bi bi-box-arrow-in-right fs-5"></i>
                <span>{{ textChange() }}</span>
              }
            </button>

            <!-- Enlace Recuperar Contraseña -->
            <div class="text-center mt-1">
              <a routerLink="/users/password/forget" class="text-decoration-none small text-muted hover-underline">
                <i class="bi bi-question-circle me-1"></i> ¿Olvidaste tu contraseña?
              </a>
            </div>

          </form>

        </div>
      </div>
    </div>
  `
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private http = inject(HttpClient);

  // Reference to the div where the Google Button will be rendered
  readonly googleBtnRef = viewChild<ElementRef>('googleBtnRef');

  // Signals for local state control
  readonly loading = signal(false);
  readonly textChange = signal('Iniciar sesión');

  ipData: any = null;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  ngOnInit(): void {
    // Fetch IP location equivalent to React useEffect
    // this.http.get('https://ipapi.co/json/').subscribe({
    //   next: (data) => {
    //     this.ipData = data;
    //   },
    //   error: (err) => console.error('Error fetching IP location:', err)
    // });

    // Initialize Google Auth
    this.initGoogleAuth();
  }

  initGoogleAuth(): void {
    // Wait briefly to ensure the View Child and Google script are ready
    setTimeout(() => {
      if (typeof google !== 'undefined') {
        google.accounts.id.initialize({
          client_id: environment.googleClientId, // Ensure this exists in your environment files
          callback: (response: any) => this.handleGoogleResponse(response.credential)
        });

        const container = this.googleBtnRef()?.nativeElement;
        if (container) {
          google.accounts.id.renderButton(container, {
            theme: 'outline',
            size: 'large',
            width: '320' // Matches your React styling
          });
        }
      } else {
        console.warn('Google scripts no cargada');
      }
    }, 500);
  }

  handleGoogleResponse(idToken: string): void {
    const apiUrl = environment.apiURL;
    this.http.post(`${apiUrl}/api/auth/googlelogin`, {
      idToken,
      ip: this.ipData
    }).subscribe({
      next: (res: any) => {
        this.informParent(res);
      },
      error: (error) => {
        console.error('GOOGLE SIGNIN ERROR', error);
      }
    });
  }

  informParent(response: any): void {
    authenticate(response, () => {
      const auth = isAuth();
      if (auth && auth.rol === 3) {
        this.router.navigate(['/carpeta']);
      } else {
        this.router.navigate(['/carpeta']);
      }
    });
  }

  handleSubmit(): void {
    if (this.loginForm.valid) {
      this.loading.set(true);
      this.textChange.set('Cargando');

      const { email, password } = this.loginForm.value;
      const apiUrl = environment.apiURL;

      this.http.post(`${apiUrl}/api/auth/login`, {
        email,
        password,
        ip: this.ipData
      }).subscribe({
        next: (res: any) => {
          this.loading.set(false);
          authenticate(res, () => {
            const auth = isAuth();
            if (auth && auth.rol === 1) {
              this.router.navigate(['/']);
            } else {
              this.router.navigate(['/carpeta']);
            }
          });
        },
        error: (err) => {
          this.loading.set(false);
          this.textChange.set('Iniciar sesión');
          console.error(err);
          alert(err.error?.errors || 'Error en el servidor');
        }
      });
    } else {
      alert('Rellene todos los campos correctamente');
    }
  }
}