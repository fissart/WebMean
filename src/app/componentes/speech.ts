import {
  Component,
  signal,
  input,
  inject,
  PLATFORM_ID,
  OnInit,
  OnDestroy
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-to-speech',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="tts-container">
      <h2>Rimayman Tukuchiq (Quechua)</h2>

      <!-- Input de Texto recibido del padre -->
      <!-- <div class="form-group">
        <label for="textInput">Rimay qillqa (Texto en Español y Quechua):</label>
        <textarea
          id="textInput"
          rows="4"
          [value]="text()"
          readonly
          placeholder="Kaypi qillqay..."
        ></textarea>
      </div> -->

      <!-- Selector de Voces -->
      <div class="form-group">
        <label for="voiceSelect">Voz (Rimana):</label>
        <select
          id="voiceSelect"
          [ngModel]="selectedVoiceName()"
          (ngModelChange)="selectedVoiceName.set($event)"
        >
          @for (voice of voices(); track voice.name) {
            <option [value]="voice.name">
              {{ voice.name }} ({{ voice.lang }})
            </option>
          }
        </select>
      </div>

      <!-- Controles de Audio (Velocidad y Tono) -->
      <div class="sliders-grid">
        <div class="form-group">
          <label>Utqaylla (Velocidad): {{ rate() }}x</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            [ngModel]="rate()"
            (ngModelChange)="rate.set($event)"
          />
        </div>

        <div class="form-group">
          <label>Kunkap sayaynin (Tono): {{ pitch() }}</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            [ngModel]="pitch()"
            (ngModelChange)="pitch.set($event)"
          />
        </div>
      </div>

      <!-- Botones de Acción -->
      <div class="controls">
        @if (isSpeaking() && isPaused()) {
          <button class="btn btn-resume" (click)="resume()">Kutinariy (Reanudar)</button>
        } @else if (isSpeaking()) {
          <button class="btn btn-pause" (click)="pause()">Sayachiy (Pausar)</button>
        } @else {
          <button class="btn btn-play" (click)="speak()" [disabled]="!text()">
            Uyariway (Reproducir)
          </button>
        }

        <button
          class="btn btn-stop"
          (click)="stop()"
          [disabled]="!isSpeaking()"
        >
          Tukuypaq sayachiy (Detener)
        </button>
      </div>
    </div>
  `,
  styles: [`
    .tts-container {
      max-width: 500px;
      margin: 2rem auto;
      padding: 1.5rem;
      border-radius: 12px;
      background-color: #1e293b;
      color: #f8fafc;
      font-family: system-ui, -apple-system, sans-serif;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    }

    h2 {
      margin-top: 0;
      color: #38bdf8;
      text-align: center;
    }

    .form-group {
      margin-bottom: 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    label {
      font-size: 0.9rem;
      color: #94a3b8;
    }

    textarea, select, input[type="range"] {
      width: 100%;
      padding: 0.6rem;
      border-radius: 6px;
      border: 1px solid #334155;
      background-color: #0f172a;
      color: #f8fafc;
      box-sizing: border-box;
    }

    textarea:focus, select:focus {
      outline: 2px solid #38bdf8;
      border-color: transparent;
    }

    .sliders-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .controls {
      display: flex;
      gap: 0.8rem;
      margin-top: 1rem;
    }

    .btn {
      flex: 1;
      padding: 0.75rem;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.2s, opacity 0.2s;
    }

    .btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .btn-play { background-color: #22c55e; color: #052e16; }
    .btn-play:hover:not(:disabled) { background-color: #16a34a; }

    .btn-pause { background-color: #eab308; color: #422006; }
    .btn-pause:hover:not(:disabled) { background-color: #ca8a04; }

    .btn-resume { background-color: #3b82f6; color: #1e3a8a; }
    .btn-resume:hover:not(:disabled) { background-color: #2563eb; }

    .btn-stop { background-color: #ef4444; color: #450a0a; }
    .btn-stop:hover:not(:disabled) { background-color: #dc2626; }
  `]
})
export class TextToSpeechComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private synth?: SpeechSynthesis;
  private utterance?: SpeechSynthesisUtterance;

  // Recibe el texto directamente del componente padre
  public text = input<string>('');

  public voices = signal<SpeechSynthesisVoice[]>([]);
  public rate = signal<number>(1);
  public pitch = signal<number>(1);
  public isSpeaking = signal<boolean>(false);
  public isPaused = signal<boolean>(false);
  public selectedVoiceName = signal<string>('');

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();

      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  ngOnDestroy(): void {
    this.stop();
    if (this.synth) {
      this.synth.onvoiceschanged = null;
    }
  }

  private loadVoices(): void {
    if (!this.synth) return;
    const availableVoices = this.synth.getVoices();
    this.voices.set(availableVoices);

    let targetVoice = availableVoices.find(v => v.lang.toLowerCase().startsWith('qu'));
    if (!targetVoice) {
      targetVoice = availableVoices.find(v => v.lang.toLowerCase().startsWith('es'));
    }

    if (targetVoice) {
      this.selectedVoiceName.set(targetVoice.name);
    } else if (availableVoices.length > 0) {
      this.selectedVoiceName.set(availableVoices[0].name);
    }
  }

  public speak(): void {
    if (!this.synth || !this.text()) return;

    this.synth.cancel();

    this.utterance = new SpeechSynthesisUtterance(this.text());
    this.utterance.lang = 'qu-PE';

    const voice = this.voices().find(v => v.name === this.selectedVoiceName());
    if (voice) {
      this.utterance.voice = voice;
    }

    this.utterance.rate = this.rate();
    this.utterance.pitch = this.pitch();

    this.utterance.onstart = () => {
      this.isSpeaking.set(true);
      this.isPaused.set(false);
    };

    this.utterance.onend = () => {
      this.isSpeaking.set(false);
      this.isPaused.set(false);
    };

    this.utterance.onerror = (event) => {
      console.error('Error en SpeechSynthesis:', event);
      this.isSpeaking.set(false);
      this.isPaused.set(false);
    };

    this.synth.speak(this.utterance);
  }

  public pause(): void {
    if (this.synth && this.isSpeaking()) {
      this.synth.pause();
      this.isPaused.set(true);
    }
  }

  public resume(): void {
    if (this.synth && this.isPaused()) {
      this.synth.resume();
      this.isPaused.set(false);
    }
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking.set(false);
      this.isPaused.set(false);
    }
  }
}