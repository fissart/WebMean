import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { isAuth } from './auth';

import { MathRendererDirective } from './mathrender';
import { environment } from '../../environments/environment';
import { Navbar } from './navbar';

export interface TestItem {
  prg: string;
  std: string;
  obs?: string;
  alt?: string[];
  nstring?: number;
  pctgsimilar?: number;
  rpta?: string;
  nota?: number;
  [key: string]: any;
}

export interface TaskData {
  _id: string;
  items: TestItem[];
  dateb: string;
  datee: string;
  note: string;
  [key: string]: any;
}

@Component({
  selector: 'app-export-to-excel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule,
    MathRendererDirective,
    Navbar
  ],
  template: `
    <div>
      <app-navbar></app-navbar>
      <div class="py-5"></div>

      @if (taskss() && currentUser()?.rol !== '1') {
        <div class="container">
          <div>
            @if (secondsRemaining() === 0) {
              <div class="text-center w-100">
                <span class="text-center text-warning">
                  Culminó la evaluación {{ value() }} - {{ idtheme() }} {{ codetheme() }}
                </span>
                <br />
                <span class="text-center text-info">Crédito: {{ evaluacion() }}</span>
                <br />
                {{ taskss()?.dateb }} {{ taskss()?.datee }}
              </div>
            } @else {
              @if (show()) {
                <div>
                  <div class="row justify-content-center align-items-center" style="margin: .5em;">
                    @for (number of items(); track $index) {
                      <div [class]="number.alt ? 'col-sm-12 col-md-6 col-lg-6 col-xl-4 p-1' : 'col-sm-12 col-md-12 col-lg-12 p-1'">
                        <div class="p-1 border border-light rounded">
                          [{{ $index + 1 }}]
                          
                          <div class="text-primary" [appMathRenderer]="number.prg"></div>

                          @if (number.alt) {
                            <div class="text-warning" [appMathRenderer]="number.std"></div>
                            
                            <div class="marginbottomp mt-2">
                              <select
                                class="form-select"
                                [ngModel]="number.std"
                                (ngModelChange)="onChange($index, $event)">
                                @for (guest of number.alt; track guest) {
                                  <option [value]="guest">{{ guest }}</option>
                                }
                              </select>
                            </div>
                          } @else {
                            <div>
                              [{{ number.nstring }}n] ({{ number.pctgsimilar }}%)
                              [{{ cleanStringLength(number.obs || '') }}obs]
                              [{{ cleanStringLength(number.std || '') }}std]

                              <ckeditor
                                [editor]="Editor"
                                [config]="editorConfig"
                                [data]="formatEditorData(number.std)"
                                (blur)="onChangett($event.editor.getData(), $index)">
                              </ckeditor>
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </div>

                  <div class="text-center text-warning h5">
                    <button type="button" (click)="EndTest()" class="btn btn-warning">
                      Guardar y evaluar
                    </button>
                  </div>
                </div>
              } @else {
                <div class="text-center text-warning">
                  Mantener la ventana en foco (Actualiza solo esta vez)
                </div>
              }
            }
          </div>
        </div>
      }
    </div>
  `
})
export class ExportToExcelComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  // Editor Config
  public Editor = ClassicEditor;
  public editorConfig = {
    language: 'es',
    placeholder: 'Descripción',
    toolbar: [
      'undo', 'redo', '|', 'bold', 'italic', 'link',
      'bulletedList', 'numberedList', '|', 'indent', 'outdent', '|',
      'blockQuote', 'insertTable', 'mediaEmbed', 'heading'
    ]
  };

  // State via Signals
  value = signal<string>('');
  evaluacion = signal<string>('2');
  show = signal<boolean>(true);
  items = signal<TestItem[]>([]);
  taskId = signal<string | null>(null);
  taskss = signal<TaskData | null>(null);
  datee = signal<string | null>(null);
  secondsRemaining = signal<number>(5);

  // Route Params
  idtheme = signal<string>('');
  codetheme = signal<string>('');

  // Current User como Signal
  currentUser = signal<any>(null);

  ngOnInit(): void {
    this.currentUser.set(isAuth());

    this.route.params.subscribe(params => {
      this.idtheme.set(params['curseid'] || '');
      this.codetheme.set(params['themeid'] || '');
      this.getTask();
    });
  }

  getTask(): void {
    const userId = this.currentUser()?._id;
    if (!userId) return;

    const url = `${environment.apiURL}/api/tasks/test/${this.idtheme()}/${this.codetheme()}/${userId}`;

    this.http.get<TaskData[]>(url).subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          const task = response[0];
          this.taskss.set(task);
          this.items.set(task.items || []);
          this.datee.set(task.datee);
          this.taskId.set(task._id);
          this.evaluacion.set(task.note);
        }
      },
      error: (error) => console.error('Error obteniendo tareas:', error)
    });
  }

  EndTest(): void {
    if (window.confirm('Desea guardar y evaluar su test?')) {
      const url = `${environment.apiURL}/api/tasks/test/${this.taskId()}`;
      this.http.put(url, { datee: new Date() }).subscribe({
        next: (res: any) => {
          this.toastr.success(typeof res === 'string' ? res : res?.message || 'Actualizado');
          // this.getTask();
          this.router.navigate([`/actualizacion/${this.idtheme()}`]);

        },
        error: (error) => console.error('ERROR', error)
      });
    }
  }

  sendTest(updatedItems: TestItem[]): void {
    const countalt = updatedItems.filter(item => item.alt !== undefined).length;
    const rptas: number[] = [];

    for (let j = 0; j < updatedItems.length; j++) {
      if (updatedItems[j].alt) {
        if (updatedItems[j].std === updatedItems[j].rpta) {
          rptas.push(1);
        } else {
          rptas.push(0);
        }
      } else {
        const rrr = this.cleanString(updatedItems[j].std || '');
        const rrrobs = this.cleanString(updatedItems[j].obs || '');
        const percent = this.getLevenshteinSimilarity(rrr, rrrobs);
        const score = ((20 - countalt) / (updatedItems.length - countalt)) / 20 * (20 - 20 * Math.abs(100 - percent) / (100 - (updatedItems[j].pctgsimilar || 0)));

        rptas.push(score);
        updatedItems[j].nota = score;
      }
    }

    const totalSum = rptas.reduce((acc, curr) => acc + curr, 0);
    const url = `${environment.apiURL}/api/tasks/test/${this.taskId()}`;

    this.http.put(url, {
      items: updatedItems,
      note: Math.round(totalSum * 100) / 100
    }).subscribe({
      next: (res: any) => {
        this.toastr.success(typeof res === 'string' ? res : res?.message || 'Guardado');
        this.getTask();
      },
      error: (error) => console.error('ERROR', error)
    });
  }

  onChange(index: number, selectedValue: string): void {
    const encuestas = [...this.items()];
    encuestas[index] = {
      ...encuestas[index],
      std: selectedValue || ''
    };

    if (encuestas.length > 0) {
      this.sendTest(encuestas);
    }
  }

  onChangett(text: string, i: number): void {
    const encuestas = [...this.items()];
    const rrr = this.cleanString(text);
    const rrrobs = this.cleanString(encuestas[i].obs || '');

    if (rrr.length > rrrobs.length) {
      this.toastr.info('Exceso de texto');
    } else {
      const minLen = encuestas[i].nstring || 0;
      if (minLen <= rrr.length && rrr.length <= rrrobs.length) {
        encuestas[i].std = text;
        console.log(encuestas)
        this.items.set(encuestas);
        this.sendTest(encuestas);
      } else {
        this.toastr.info('No puedes eliminar el texto establecido');
      }
    }
  }

  handleDataFromChild(): void {
    this.router.navigate([`/curso/${this.idtheme()}`]);
    this.show.set(false);
  }

  handleFromChild(): void {
    this.secondsRemaining.set(0);
    this.show.set(false);
  }

  getLevenshteinSimilarity(str1: string, str2: string): number {
    const track = Array(str2.length + 1).fill(null).map(() =>
      Array(str1.length + 1).fill(null)
    );

    for (let i = 0; i <= str1.length; i += 1) track[0][i] = i;
    for (let j = 0; j <= str2.length; j += 1) track[j][0] = j;

    for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j - 1][i] + 1,
          track[j][i - 1] + 1,
          track[j - 1][i - 1] + indicator
        );
      }
    }

    const distance = track[str2.length][str1.length];
    const maxLength = Math.max(str1.length, str2.length);
    if (maxLength === 0) return 100;
    return ((maxLength - distance) / maxLength) * 100;
  }

  cleanString(str: string): string {
    return (str || '')
      .replace(/&nbsp;/g, '')
      .replace(/<\/?[^>]+(>|$)/g, '')
      .replace(/\s+/g, '');
  }

  cleanStringLength(str: string): number {
    return this.cleanString(str).length;
  }

  formatEditorData(data: string): string {
    if (!data) return '';
    return data.includes('math-tex')
      ? data
      : data
        .replace(/\\\]/g, '\\]</span>')
        .replace(/\\\[/g, '<span class="math-tex">\\[')
        .replace(/\\\)/g, '\\)</span>')
        .replace(/\\\(/g, '<span class="math-tex">\\(');
  }
}