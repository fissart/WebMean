import { Component, OnInit, signal, computed, inject, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { jsPDF } from 'jspdf';
import { environment } from '../../environments/environment';
import { Navbar } from './navbar';
import { MarkdownComponent } from 'ngx-markdown';

// --- INTERFACES & MODELOS ---
export interface SurveyItem {
  prg: string;
  std?: string;
  alt?: string[][];
  obs?: string[];
}

export interface SurveyResponse {
  _id: string;
  subtipo: string;
  items: SurveyItem[];
}

// SIMULACIÓN / SERVICIO AUTH
export function isAuth(): any {
  const authData = localStorage.getItem('user');
  return authData ? JSON.parse(authData) : null;
}

// --- SERVICIO DE API EN EL MISMO ARCHIVO ---
@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiURL}/api`; 

  getSurveyBySubtipo(subtipo: string): Observable<SurveyResponse[]> {
    return this.http.get<SurveyResponse[]>(`${this.apiUrl}/surveys/www/${subtipo}`);
  }

  saveSurvey(payload: any): Observable<SurveyResponse> {
    return this.http.post<SurveyResponse>(`${this.apiUrl}/surveys/savesurvey`, payload);
  }

  updateSurvey(id: string, items: SurveyItem[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/surveys/${id}`, { items });
  }
}

// --- COMPONENTE PRINCIPAL STANDALONE ---
@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [MarkdownComponent, Navbar, CommonModule, FormsModule, CKEditorModule],
  template: `
    <app-navbar></app-navbar>
    <div class="py-5"></div>
    <div class="container w-100 p-1 my-3 rounded">
      <h3 class="text-center w-100 ffont d-block mb-3">
        Estudio de mercado de la {{ instituteName() }}
      </h3>

      @if (items().length > 0) {
        @if (isSubmitted()) {
          <div class="text-center p-5 bg-light border rounded my-4">
            <h2 class="text-success fw-bold mb-3">¡Muchas gracias por participar!</h2>
            <p class="text-muted">Tus respuestas han sido registradas correctamente en la base de datos.</p>
            @if (id()) {
              <p class="badge bg-secondary fs-6 p-2">ID Registro: {{ id() }}</p>
            }
            <div class="spinner-border text-info mt-3 d-block mx-auto" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
          </div>
        } @else {
          @if (subtipo()) {
            <div class="text-uppercase text-center w-100 my-1">
              Seleccionaste {{ formatSubtipo(subtipo()) }}
            </div>
          }

          <div class="row justify-content-center align-items-center" style="margin: 0.5em;">
            @for (number of items(); track $index; let i = $index) {
              <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 p-1">
                <div class="p-1 bg-light rounded border" [ngClass]="cardBorderClass()">
                  [{{ i + 1 }}]
                  <p class="mb-1 fw-bold">{{ number.prg }}</p>
                  <!-- <p class="text-info mb-2">{{ number.std }}</p> -->
                  <markdown [katex]="true" [data]="number.std"></markdown>

                  @if (number.alt) {
                    <div class="marginbottomp">
                      <select
                        class="form-select"
                        [ngModel]="number.std"
                        (ngModelChange)="handleItemChange(i, $event)"
                      >
                        <option value="" disabled selected>Seleccione opción</option>
                        @for (guest of number.alt; track $index) {
                          <option [value]="guest[0]">{{ guest[0] }}</option>
                        }
                      </select>
                    </div>
                  } @else {
                    <ckeditor
                      [editor]="Editor"
                      [config]="editorConfig"
                      [data]="number.std || ''"
                      (blur)="handleItemChange(i, $event.editor.getData())"
                    ></ckeditor>
                  }
                </div>
              </div>
            }
          </div>

          <button
            type="button"
            class="btn btn-info w-100"
            style="margin: 0.1em;"
            (click)="sendTest()"
          >
            Enviar
          </button>
        }
      }
    </div>
  `
})
export class TestsComponent implements OnInit {
  private surveyService = inject(SurveyService);
  private toastr = inject(ToastrService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // CKEditor 5
  public Editor: any = ClassicEditor;
  public editorConfig = {
    language: 'es',
    placeholder: 'Descripción',
    toolbar: ['undo', 'redo', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList']
  };

  // State Management con Signals
  items = signal<SurveyItem[]>([]);
  subtipo = signal<string>('');
  subtipostats = signal<string>('');
  id = signal<string>('');
  author = signal<string>('nauth');
  isSubmitted = signal<boolean>(false);
  
  // Parámetros de ruta
  emailParam = signal<string>('');
  tipoParam = signal<string>('');

  // Propiedades Computadas
  isTargetHostname = computed(() => window.location.hostname === 'www.esfapa.edu.pe');
  instituteName = computed(() => 
     this.isTargetHostname() ? 'ESFAPA Web' : environment.title
  );

  cardBorderClass = computed(() => {
    switch (this.emailParam()) {
      case 'estudiantecole':
      case 'estudianteesfa':
      case 'estudianteuni':
      case 'estudianteinst': 
        return 'border-info';
      case 'egresado':
      case 'apoderado': 
        return 'border-success';
      case 'empresarioinversor':
      case 'empresarioproductor':
      case 'empresariointermediario': 
        return 'border-primary';
      case 'docenteuni':
      case 'docenteesfa': 
        return 'border-warning';
      default: 
        return 'border-info';
    }
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const email = params['email'] || '';
      const tipo = params['tipo'] || 'egresado';

      this.emailParam.set(email);
      this.tipoParam.set(tipo);

      // Gestión de sesión local
      sessionStorage.setItem('auth', JSON.stringify(email));
      const itemGuardado = JSON.parse(sessionStorage.getItem('auth') || '""');

      if (itemGuardado === 'nauth') {
        this.author.set('nauth');
      } else if (itemGuardado) {
        const datosAuth = Number(itemGuardado);
        const ahora = new Date().getTime();

        if (!isNaN(datosAuth) && ahora > datosAuth) {
          this.author.set('nauth');
        } else {
          this.author.set('auth');
        }
      }

      this.subtipo.set(tipo);
      this.getSurveysStatsSubtipo(tipo);
    });
  }

  getSurveysStatsSubtipo(subtipoVal: string): void {
    this.surveyService.getSurveyBySubtipo(subtipoVal).subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.subtipo.set(subtipoVal);
          this.subtipostats.set(subtipoVal);
          this.items.set(res[0].items || []);
        }
      },
      error: () => this.toastr.error('Error al cargar la encuesta y estadísticas')
    });
  }

  handleItemChange(index: number, value: string): void {
    const updated = [...this.items()];
    updated[index] = { ...updated[index], std: value };
    this.items.set(updated);
  }

  updatesurveyStd(data: SurveyItem[]): void {
    const user = isAuth();

    if (!this.id()) {
      const payload = {
        user: user?._id || '6a382709c284038205961561',
        email: user?.email || 'anónimo',
        name: user?.name || 'anónimo',
        ip: [],
        items: data,
        author: this.author(),
        tipo: 'std',
        subtipo: this.subtipo()
      };

      this.surveyService.saveSurvey(payload).subscribe({
        next: (res) => {
          this.items.set(res.items);
          this.subtipo.set(res.subtipo);
          this.id.set(res._id);

          // Genera y descarga el comprobante en PDF con la respuesta de la BD
          this.generateSurveyPDF(res._id, res.items, res.subtipo, user);
        },
        error: () => this.toastr.error('Error al procesar la encuesta')
      });
    } else {
      this.surveyService.updateSurvey(this.id(), data).subscribe({
        next: () => {
          // Genera PDF al actualizar
          this.generateSurveyPDF(this.id(), data, this.subtipo(), user);
        },
        error: () => this.toastr.error('Error al actualizar la encuesta')
      });
    }
  }

  sendTest(): void {
    const currentItems = this.items();

    for (let i = 0; i < currentItems.length; i++) {
      const stdValue = currentItems[i]?.std;
      if (stdValue === undefined || stdValue === null || String(stdValue).trim() === '') {
        this.toastr.warning(`Por favor, completa el item ${i + 1}.`, 'Campos incompletos');
        return;
      }
    }

    this.isSubmitted.set(true);
    this.toastr.success('¡Encuesta enviada con éxito!');
    this.updatesurveyStd(currentItems);

    setTimeout(() => {
      this.router.navigate(['/stats']);
    }, 5500);
  }

  formatSubtipo(text: string): string {
    if (!text) return '';
    return text
      .replace(/(empresario|estudiante|docente)(inversor|productor|intermediario|cole|inst|esfa|uni)/i, '$1 $2')
      .replace(/cole/i, ' colegio')
      .replace(/inst/i, ' instituto')
      .replace(/uni/i, ' universitario')
      .replace(/egresado/i, ' egresado esfa')
      .replace(/esfa/i, ' ESFAPA FGPA')
      .toUpperCase();
  }

  // --- LÓGICA DE GENERACIÓN DE REPORTE CON JSPDF ---
  private generateSurveyPDF(surveyId: string, items: SurveyItem[], subtipoVal: string, user: any): void {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Encabezado
    doc.setFillColor(13, 110, 253); // Color azul primario
    doc.rect(0, 0, pageWidth, 25, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`Comprobante de Respuesta - ${this.instituteName()}`, 10, 16);

    // Estado del registro y BD ID
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    
    doc.text('Estado en Base de Datos:', 10, 35);
    doc.setTextColor(25, 135, 84); // Color verde éxito
    doc.text('GUARDADO CORRECTAMENTE', 60, 35);

    doc.setTextColor(40, 40, 40);
    doc.text('ID de Encuesta:', 10, 43);
    doc.setFont('helvetica', 'normal');
    doc.text(surveyId || 'N/A', 60, 43);

    doc.setFont('helvetica', 'bold');
    doc.text('Tipo/Subtipo:', 10, 51);
    doc.setFont('helvetica', 'normal');
    doc.text(this.formatSubtipo(subtipoVal), 60, 51);

    doc.setFont('helvetica', 'bold');
    doc.text('Usuario:', 10, 59);
    doc.setFont('helvetica', 'normal');
    doc.text(`${user?.name || 'Anónimo'} (${user?.email || 'Sin correo'})`, 60, 59);

    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.line(10, 65, pageWidth - 10, 65);

    // // Listado de preguntas y respuestas
    // let y = 73;
    // doc.setFont('helvetica', 'bold');
    // doc.setFontSize(11);
    // doc.text('Detalle de Respuestas:', 10, y);
    // y += 8;

    // items.forEach((item, idx) => {
    //   // Control de salto de página si sobrepasa el límite vertical
    //   if (y > 270) {
    //     doc.addPage();
    //     y = 20;
    //   }

    //   doc.setFont('helvetica', 'bold');
    //   doc.setFontSize(9);
    //   doc.setTextColor(0, 0, 0);

    //   const preguntaText = `${idx + 1}. ${item.prg}`;
    //   const splitPregunta = doc.splitTextToSize(preguntaText, pageWidth - 20);
    //   doc.text(splitPregunta, 10, y);
    //   y += (splitPregunta.length * 4) + 2;

    //   // Limpia tags HTML provenientes de CKEditor
    //   const cleanStd = this.stripHtml(item.std || 'Sin respuesta');

    //   doc.setFont('helvetica', 'normal');
    //   doc.setTextColor(60, 60, 60);
    //   const respuestaText = `Respuesta: ${cleanStd}`;
    //   const splitRespuesta = doc.splitTextToSize(respuestaText, pageWidth - 25);
      
    //   doc.text(splitRespuesta, 15, y);
    //   y += (splitRespuesta.length * 4) + 5;
    // });

    // Pie de página
    const fecha = new Date().toLocaleString();
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Reporte generado el: ${fecha}`, 10, 290);

    // Descargar archivo PDF
    doc.save(`encuesta_${surveyId || 'registro'}.pdf`);
  }

  // Método auxiliar para eliminar etiquetas HTML de textos ricos
  private stripHtml(html: string): string {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
}