import {
  Component,
  input,
  output,
  signal,
  effect,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface ModelOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-gemini-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card shadow-sm border-0 p-3 bg-white mb-4">
      <div class="mb-3">
        <label class="form-label small fw-bold text-muted text-uppercase tracking-wider">Seleccionar Modelo IA</label>
        
        <!-- Botones en Grupo (Btn Group) modernos y responsivos -->
        <div class="d-flex flex-wrap gap-1" role="group" aria-label="Selección de modelos">
          @for (item of modelOptions; track item.value) {
            <button
              type="button"
              class="btn btn-sm {{ selectedModel() === item.value ? 'btn-primary shadow-sm' : 'btn-outline-secondary' }}"
              [disabled]="loading()"
              (click)="selectedModel.set(item.value)"
            >
              {{ item.label }}
            </button>
          }
        </div>
      </div>

      <button
        class="btn btn-outline-info w-100 fw-semibold mb-3 py-2"
        (click)="generarContenido()"
        [disabled]="loading()"
      >
        @if (loading()) {
          <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Pensando...
        } @else {
          <i class="bi bi-cpu me-1"></i> Enviar prompt {{ type() }} asociado al tema
        }
      </button>

      <div>
        @if (response()) {
          <textarea
            class="form-control bg-light text-secondary small"
            [value]="response()"
            rows="6"
            readonly
          ></textarea>
        }
      </div>
    </div>
  `
})
export class GeminiChatComponent {
  private readonly http = inject(HttpClient);

  // Inputs
  readonly tittle = input<string>('');
  readonly type = input<string>('');

  // Output hacia el padre
  readonly responseEmitted = output<string>();

  // Opciones de modelos
  readonly modelOptions: ModelOption[] = [
    { value: 'gemini-3.5-flash', label: 'Flash 3.5' },
    { value: 'gemini-3.1-flash-lite', label: 'Flash 3.1 Lite' },
    { value: 'gemini-3-pro-preview', label: 'Pro 3' },
    { value: 'gemini-2.5-flash', label: 'Flash 2.5' },
    { value: 'gemini-2.5-pro', label: 'Pro 2.5' }
  ];

  // Estado del componente con Signals
  readonly prompt = signal<string>('');
  readonly selectedModel = signal<string>('gemini-3.5-flash');
  readonly response = signal<string>('');
  readonly loading = signal<boolean>(false);

  private readonly API_URL = `${environment.apiURL}/api`;

  constructor() {
    effect(() => {
      const currentTitle = this.tittle();
      this.prompt.set(currentTitle);
    });
  }

  generarContenido(): void {
    const currentPrompt = this.prompt();
    if (!currentPrompt) return;

    this.loading.set(true);
    this.response.set('');

    console.log('Enviando datos al servidor:', {
      prompt: currentPrompt,
      model: this.selectedModel()
    });

    // Usando subscribe clásico en lugar de firstValueFrom
    this.http.post<{ response: string }>(`${this.API_URL}/users/userCr`, {
      prompt: currentPrompt,
      model: this.selectedModel()
    }).subscribe({
      next: (res) => {
        this.response.set(res.response);
        // Emitimos el resultado hacia el componente padre
        this.responseEmitted.emit(res.response);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al generar contenido:', err);
        this.loading.set(false);
      }
    });
  }
}