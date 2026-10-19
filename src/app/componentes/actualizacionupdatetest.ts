import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { parseISO } from 'date-fns';
import { environment } from '../../environments/environment';
import { Navbar } from './navbar';
import { MathRendererDirective } from './mathrender';

export interface TestItem {
  prg: string;
  std: string;
  obs?: string;
  alt?: string[];
  nstring?: number;
  pctgsimilar?: number;
  [key: string]: any;
}

export interface TaskData {
  _id: string;
  task: string;
  solution: string;
  items: TestItem[];
  dateb: string;
  datee: string;
}

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MathRendererDirective,
    Navbar,
    CKEditorModule
  ],
  template: `
    <div>
<app-navbar></app-navbar>
    <div class="py-5"></div>
    
      <div class="container my-3">
        <div>
          <div class="row justify-content-center align-items-center border d-flex" style="margin: .5em;">
            @if (itemsnewnew().length > 0) {
              @for (number of itemsnewnew(); track $index) {
                <div [class]="number.alt ? 'col-sm-12 col-md-6 col-lg-6 col-xl-4 p-1' : 'col-sm-12 col-md-12 col-lg-12'">
                  <div>
                    [{{ $index + 1 }}]

                  <div [appMathRenderer]="number.prg"></div>

                    <div class="p-1 bg-warning">
                      @if (number.alt) {
                        <div class="mb-2">
                          <select
                            class="form-select"
                            [ngModel]="number.std"
                            (ngModelChange)="onChangeSelect($index, $event)">
                            @for (option of number.alt; track $index) {
                              <option [value]="option">{{ option }}</option>
                            }
                          </select>
                        </div>
                      } @else {
                        <div>
                          <!-- CKEditor para 'obs' -->
                          <ckeditor
                            [editor]="Editor"
                            [config]="editorConfig"
                            [data]="formatEditorData(number.obs || '')"
                            (blur)="onChangeText($event.editor.getData(), $index, 'obs')">
                          </ckeditor>

                          <!-- CKEditor para 'std' -->
                          <ckeditor
                            [editor]="Editor"
                            [config]="editorConfig"
                            [data]="formatEditorData(number.std || '')"
                            (blur)="onChangeText($event.editor.getData(), $index, 'std')">
                          </ckeditor>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              }
            }
          </div>
        </div>

        <textarea
          class="form-control"
          [ngModel]="itemsnew()"
          (ngModelChange)="onTextareaChange($event)"
          rows="8"
          required>
        </textarea>

        <button
          class="btn btn-warning w-100 my-1"
          (click)="cargarStorage()"
          [disabled]="loading()">
          Cargar Storage
        </button>
        <button
          class="btn btn-info w-100 my-1"
          (click)="submitTest(this.itemsnewnew())"
          [disabled]="loading()">
          Guardar
        </button>
      </div>
    </div>
  `
})
export class TestsComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private toastr = inject(ToastrService);

  // CKEditor
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

  // Reactividad con Signals
  idtest = signal<string>('');
  solution = signal<string>('');
  task = signal<string>('');
  items = signal<TestItem[]>([]);
  itemsnew = signal<string>('');
  itemsnewnew = signal<TestItem[]>([]);
  theme = signal<TaskData | null>(null);
  dateb = signal<Date>(new Date());
  datee = signal<Date | null>(null);
  loading = signal<boolean>(false);

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.idtest.set(params['idtest'] || '');
      if (this.idtest()) {
        // console.log(this.idtest())
        this.getNotes();
      }
    });
  }

  getNotes(): void {
    const url = `${environment.apiURL}/api/tasks/${this.idtest()}`;
    this.http.get<TaskData>(url).subscribe({
      next: (data) => {
        // console.log(this.idtest())
        if (data && Object.keys(data).length !== 0) {
          if (data.dateb) this.dateb.set(parseISO(data.dateb));
          if (data.datee) this.datee.set(parseISO(data.datee));

          this.theme.set(data);
          this.items.set(data.items || []);
          this.itemsnew.set(JSON.stringify(data.items));
          this.solution.set(data.solution || '');
          this.task.set(data.task || '');

          localStorage.setItem('test', JSON.stringify(data.items));
          this.cargarStorage();
        }
      },
      error: (error) => console.error('Error obteniendo notas:', error)
    });
  }

  submitTest(currentItems: TestItem[]): void {
    const payload = {
      task: this.task(),
      solution: this.solution(),
      items: currentItems
    };

    const url = `${environment.apiURL}/api/tasks/${this.idtest()}`;
    this.http.put(url, payload).subscribe({
      next: (res: any) => {
        this.toastr.info(typeof res === 'string' ? res : res?.message || 'Guardado');
      },
      error: (error) => console.error('Error al enviar test:', error)
    });
  }

  cargarStorage(): void {
    const storedTest = localStorage.getItem('test');
    if (storedTest) {
      try {
        console.log(storedTest)
        this.itemsnewnew.set(JSON.parse(storedTest));
      } catch (e) {
        console.error('Error al parsear el LocalStorage', e);
      }
    }
  }

  onChangeSelect(index: number, selectedValue: string): void {
    const updated = [...this.items()];
    updated[index] = {
      ...updated[index],
      std: selectedValue ? selectedValue[0] : ''
    };
    this.items.set(updated);
  }

  onChangeText(text: string, i: number, obsstd: 'std' | 'obs'): void {
    const newww: TestItem[] = this.itemsnewnew().map(item => ({ ...item }));

    for (let j = 0; j < newww.length; j++) {
      if (!newww[j].alt) {
        const rrr = this.cleanString(newww[j].std || '');
        const rrrobs = this.cleanString(newww[j].obs || '');

        newww[j].nstring = rrr.length;
        newww[j].pctgsimilar = this.getLevenshteinSimilarity(rrr, rrrobs);
      }
    }

    if (obsstd === 'std') {
      newww[i].std = text;
    } else {
      newww[i].obs = text;
    }

    this.itemsnewnew.set(newww);

    if (newww !== null) {
      this.submitTest(newww);
    }
  }

  onTextareaChange(value: string): void {
    console.log(value)
    this.itemsnew.set(value);
    // this.itemsnewnew.set(value);
    localStorage.setItem('test', value);
    const parsed = localStorage.getItem('test');
    try {
      console.log(parsed ? JSON.parse(parsed) : 'none');
    } catch {
      console.log('Error parseando JSON');
    }
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

  formatEditorData(content: string): string {
    if (!content) return '';
    return content.includes('math-tex')
      ? content
      : content
        .replace(/\\\]/g, '\\]</span>')
        .replace(/\\\[/g, '<span class="math-tex">\\[')
        .replace(/\\\)/g, '\\)</span>')
        .replace(/\\\(/g, '<span class="math-tex">\\(');
  }

  cleanString(str: string): string {
    return (str || '')
      .replace(/&nbsp;/g, '')
      .replace(/<\/?[^>]+(>|$)/g, '')
      .replace(/\s+/g, '');
  }
}