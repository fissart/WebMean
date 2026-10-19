import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  OnInit,
  AfterViewInit,
  OnDestroy,
  signal,
  computed,
  effect,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import * as d3 from 'd3';
import { environment } from '../../environments/environment';
import { GeminiChatComponent } from './actualizacionai';
import { MathRendererDirective } from './mathrender';
import { isAuth } from './auth';

export interface SurveyItem {
  prg: string;
  alt?: string[][];
  std?: string;
  obs?: any[];
}

export interface SurveyRespondent {
  _id: string;
  email: string;
  name: string;
  solution: string;
  subtipo: string;
  items: SurveyItem[];
}

export interface SurveySource {
  _id?: string;
  subtipo: string;
  nombre?: string;
  surveyCount?: number;
}

export interface SurveyNewData {
  note?: SurveyRespondent[];
  notesource?: SurveyRespondent[];
  [key: string]: any;
}

export interface ChartDataPoint {
  label: string;
  count: number;
  percentage: number;
}

export interface TextResponse {
  respondentName: string;
  text: string;
}

interface ResponseBubbleData {
  text: string;
  value: number;
}

export interface QuestionAnalysis {
  question: string;
  index: number;
  isMultipleChoice: boolean;
  activeDataPoints: ChartDataPoint[];
  textResponses: TextResponse[];
  bubbleWordData: ResponseBubbleData[];
  chartType: 'bar' | 'donut';
  textMode: 'cards' | 'bubble';
}

export class SurveyService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiURL}/api`;

  getSurveysSource(): Observable<SurveySource[]> {
    return this.http.get<SurveySource[]>(`${this.apiUrl}/surveys/source`).pipe(
      catchError(() => of([
        { subtipo: 'egresado', nombre: 'Egresados' },
        { subtipo: 'estudiante', nombre: 'Estudiantes' },
        { subtipo: 'docente', nombre: 'Docentes' }
      ]))
    );
  }

  getSurveysStatsSubtipo(subtipo: string): Observable<SurveyNewData> {
    return this.http.get<SurveyNewData>(`${this.apiUrl}/surveys/newwww/${"analisis"}/${subtipo}`);
  }
}

@Component({
  selector: 'app-survey-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, GeminiChatComponent, MathRendererDirective],
  providers: [SurveyService],
  template: `
    <div class="container py-4">
      @if (userRole === '1') {
        <app-gemini-chat
          [tittle]="getGeminiTitle()"
          [type]="'sesión'"
          (responseEmitted)="onGeminiResponseReceived($event)"
        ></app-gemini-chat>
      }

      <header class="card shadow-sm border-0 mb-4 p-4 bg-white">
        <div class="row align-items-center gy-3">
          <div class="col-lg-6">
            <h1 class="h3 fw-bold text-dark mb-1">Análisis de Encuesta Institucional</h1>
            <p class="text-muted mb-0">Resultados interactivos y métricas de participación</p>
          </div>

          <div class="col-lg-6">
            <div class="d-flex justify-content-lg-end gap-3 flex-wrap">
              <div class="bg-light px-3 py-2 rounded text-center min-w-100">
                <span class="d-block fs-4 fw-bold text-dark">{{ respondents().length }}</span>
                <span class="small text-uppercase text-muted fw-semibold tracking-wider">Encuestados</span>
              </div>
              <div class="bg-light px-3 py-2 rounded text-center min-w-100">
                <span class="d-block fs-4 fw-bold text-dark">{{ uniqueQuestions().length }}</span>
                <span class="small text-uppercase text-muted fw-semibold tracking-wider">Preguntas</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- SUBTIPO SELECTION BUTTONS -->
      <nav class="card shadow-sm border-0 mb-4 p-3 bg-white" aria-label="Filtro por subtipo">
        <div class="d-flex justify-content-center align-items-center flex-wrap gap-3">
          @for (source of sources(); track source.subtipo) {
            <button
              type="button"
              class="btn rounded-pill px-4 fw-semibold {{ selectedSubtipo() === source.subtipo ? 'btn-primary shadow-sm' : 'btn-light text-secondary border' }}"
              (click)="selectSubtipo(source.subtipo)"
            >
              {{ formatSubtipoName(source.nombre || source.subtipo) }} 
              <span class="text-info">{{source.surveyCount}}</span>
            </button>
          }
        </div>
      </nav>

      <!-- GLOBAL CONTROLS FOR ALL QUESTIONS -->
      <div class="card shadow-sm border-0 mb-4 p-3 bg-white">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <span class="fw-bold text-dark mb-0">Mostrando todas las preguntas registradas ({{ questionsAnalysis().length }})</span>
        </div>
      </div>

      <!-- MAIN CONTENT DISPLAY AREA (LIST OF ALL QUESTIONS) -->
      <main class="d-flex flex-column gap-4">
        @if (isLoading()) {
          <div class="card shadow-sm border-0 p-5 bg-white text-center text-muted min-h-300 d-flex flex-column align-items-center justify-content-center">
            <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem;">
              <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mb-0">Cargando datos para <strong class="text-dark">{{ selectedSubtipo() }}</strong>...</p>
          </div>
        } @else {
          @for (qData of questionsAnalysis(); track qData.question; let qIdx = $index) {
            <div class="card shadow-sm border-0 p-4 bg-white">
              <!-- QUESTION HEADER & INDIVIDUAL CONTROLS -->
              <div class="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4 pb-2 border-bottom">
                <div class="d-flex align-items-start gap-2">
                  <span class="badge bg-primary text-white fs-6">P{{ qIdx + 1 }}</span>
                  <h3 class="h5 fw-bold text-dark mb-0 lh-base">{{ qData.question }}</h3>
                </div>

                <!-- Controles individuales por ítem -->
                <div class="d-flex align-items-center gap-2">
                  @if (qData.isMultipleChoice) {
                    <span class="fw-bold small text-muted">Gráfico:</span>
                    <div class="btn-group btn-group-sm" role="group">
                      <button
                        type="button"
                        class="btn {{ qData.chartType === 'bar' ? 'btn-primary' : 'btn-outline-secondary' }}"
                        (click)="setQuestionChartType(qIdx, 'bar')"
                      >
                        Barras
                      </button>
                      <button
                        type="button"
                        class="btn {{ qData.chartType === 'donut' ? 'btn-primary' : 'btn-outline-secondary' }}"
                        (click)="setQuestionChartType(qIdx, 'donut')"
                      >
                        Donut
                      </button>
                    </div>
                  } @else {
                    <span class="fw-bold small text-muted">Vista:</span>
                    <div class="btn-group btn-group-sm" role="group">
                      <button
                        type="button"
                        class="btn {{ qData.textMode === 'cards' ? 'btn-primary' : 'btn-outline-secondary' }}"
                        (click)="setQuestionTextMode(qIdx, 'cards')"
                      >
                        Tarjetas
                      </button>
                      <button
                        type="button"
                        class="btn {{ qData.textMode === 'bubble' ? 'btn-primary' : 'btn-outline-secondary' }}"
                        (click)="setQuestionTextMode(qIdx, 'bubble')"
                      >
                        Burbujas
                      </button>
                    </div>
                  }
                </div>
              </div>

              <!-- QUESTION CONTENT -->
              @if (qData.isMultipleChoice) {
                <div class="row align-items-center gy-4">
                  <div class="col-lg-8">
                    <div #mcChartContainers [attr.data-q-index]="qIdx" class="w-100 d-flex justify-content-center align-items-center position-relative" style="height: 350px;" role="img" aria-label="Gráfico estadístico de respuestas"></div>
                  </div>

                  <div class="col-lg-4">
                    <h4 class="h6 fw-bold mb-3">Frecuencia de Respuestas</h4>
                    <ul class="list-unstyled d-flex flex-column gap-3 mb-0">
                      @for (item of qData.activeDataPoints; track item.label) {
                        <li>
                          <div class="d-flex justify-content-between align-items-center small mb-1">
                            <span class="text-truncate fw-medium text-dark" style="max-width: 200px;" [title]="item.label">{{ item.label }}</span>
                            <span class="badge bg-secondary bg-opacity-10 text-dark fw-bold">{{ item.count }} ({{ item.percentage | number:'1.0-1' }}%)</span>
                          </div>
                          <div class="progress" style="height: 6px;">
                            <div class="progress-bar bg-primary" role="progressbar" [style.width.%]="item.percentage" [aria-valuenow]="item.percentage" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </li>
                      }
                    </ul>
                  </div>
                </div>
              } @else {
                <!-- TARJETAS DE TEXTO -->
                <div [class.d-none]="qData.textMode !== 'cards'">
                  <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
                    @for (res of qData.textResponses; track $index) {
                      <div class="col">
                        <div class="card h-100 border bg-light shadow-none">
                          <div class="card-body">
                            <!-- <div class="d-flex align-items-center gap-2 mb-3">
                              <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold small" style="width: 28px; height: 28px;">
                                {{ res.respondentName.charAt(0).toUpperCase() }}
                              </div>
                            </div> -->
                            <p class="card-text text-secondary small lh-base mb-0">{{ res.text || 'Sin respuesta redactada.' }}</p>
                          </div>
                        </div>
                      </div>
                    } @empty {
                      <div class="col-12 text-center py-4 text-muted fst-italic">No hay respuestas de texto registradas para esta pregunta.</div>
                    }
                  </div>
                </div>

                <!-- BURBUJAS DE TEXTO -->
                <div [class.d-none]="qData.textMode !== 'bubble'">
                  <div class="row align-items-center gy-4">
                    <div class="col-lg-12">
                      <div #bubbleChartContainers [attr.data-q-index]="qIdx" class="w-100 d-flex justify-content-center align-items-center position-relative" style="height: 400px;" role="img" aria-label="Gráfico de burbujas de respuestas abiertas"></div>
                    </div>
                  </div>
                </div>
              }
            </div>
          } @empty {
            <div class="card shadow-sm border-0 p-5 bg-white text-center text-muted py-5">
              No hay preguntas disponibles para este subtipo.
            </div>
          }
        }
      </main>
      <div class="mb-4" [appMathRenderer]="analysis()"></div>
@if (userRole === '1') {
<textarea
  id="jsonEditor"
  class="form-control mb-2 font-monospace"
  [ngModel]="analysis()"
  (ngModelChange)="analysis.set($event)"
  (blur)="submitTest('analisis', [])"
  rows="8"
>
</textarea>
<textarea
  id="jsonEditor"
  class="form-control mb-2 font-monospace"
  [value]="getGeminiTitle()"
  rows="8"
></textarea>
}

    </div>
  `
})
export class SurveyDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('mcChartContainers') private mcChartContainers!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChildren('bubbleChartContainers') private bubbleChartContainers!: QueryList<ElementRef<HTMLDivElement>>;

  private surveyService = inject(SurveyService);
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiURL}/api`;

  public respondents = signal<SurveyRespondent[]>([]);
  public sources = signal<SurveySource[]>([]);
  public selectedSubtipo = signal<string>('egresado');
  public analysis = signal<string>(`www`);
  public isLoading = signal<boolean>(false);
  public userRole: string = '';

  public questionPreferences = signal<{ [key: number]: { chartType: 'bar' | 'donut'; textMode: 'cards' | 'bubble' } }>({});

  private resizeObserver?: ResizeObserver;

  public uniqueQuestions = computed(() => {
    const questionsSet = new Set<string>();
    this.respondents().forEach(resp => {
      resp.items?.forEach(item => {
        if (item.prg) questionsSet.add(item.prg);
      });
    });
    return Array.from(questionsSet);
  });

  public setQuestionChartType(index: number, type: 'bar' | 'donut'): void {
    this.questionPreferences.update(prefs => ({
      ...prefs,
      [index]: {
        chartType: type,
        textMode: prefs[index]?.textMode || 'cards'
      }
    }));
  }

  public setQuestionTextMode(index: number, mode: 'cards' | 'bubble'): void {
    this.questionPreferences.update(prefs => ({
      ...prefs,
      [index]: {
        chartType: prefs[index]?.chartType || 'bar',
        textMode: mode
      }
    }));
  }

  public saveSurvey(data: unknown): Observable<any> {
    return this.http.post(`${this.apiUrl}/surveys`, data);
  }

  public submitTest(tipo: string = 'analisis', itemsData: SurveyItem[] = []): void {
    this.isLoading.set(true);

    const user = isAuth();
    const userId = user?._id;

    const data = {
      user: userId,
      solution: this.analysis(),
      tipo: tipo,
      subtipo: "analisis" + this.selectedSubtipo()
    };

    this.saveSurvey(data).subscribe({
      next: (res) => {
        console.log(res);
        // this.loadSources();
        this.isLoading.set(false);
      },
      error: () => {
        console.error('Error al registrar la encuesta');
        this.isLoading.set(false);
      }
    });
  }

  public questionsAnalysis = computed<QuestionAnalysis[]>(() => {
    const questions = this.uniqueQuestions();
    const allRespondents = this.respondents();
    const prefs = this.questionPreferences();

    return questions.map((qText, index) => {
      const isMultiple = allRespondents.some(r =>
        r.items?.some(i => i.prg === qText && Array.isArray(i.alt) && i.alt.length > 0)
      );

      let dataPoints: ChartDataPoint[] = [];
      let textResList: TextResponse[] = [];
      let bubbleData: ResponseBubbleData[] = [];

      if (isMultiple) {
        let possibleOptions: string[] = [];
        const countsMap = new Map<string, number>();

        allRespondents.forEach(resp => {
          const match = resp.items?.find(i => i.prg === qText);
          if (match) {
            if (match.alt && possibleOptions.length === 0) {
              possibleOptions = match.alt.map(optGroup => optGroup[0]);
              possibleOptions.forEach(opt => countsMap.set(opt, 0));
            }
            if (match.std && countsMap.has(match.std)) {
              countsMap.set(match.std, (countsMap.get(match.std) || 0) + 1);
            }
          }
        });

        const totalResponses = Array.from(countsMap.values()).reduce((a, b) => a + b, 0) || 1;

        dataPoints = possibleOptions.map(option => ({
          label: option,
          count: countsMap.get(option) || 0,
          percentage: ((countsMap.get(option) || 0) / totalResponses) * 100
        }));
      } else {
        allRespondents.forEach(resp => {
          const item = resp.items?.find(i => i.prg === qText);
          if (item && item.std) {
            const cleanText = item.std.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
            if (cleanText) {
              textResList.push({
                respondentName: resp.name || 'Anónimo',
                text: cleanText
              });
            }
          }
        });

        const frequencyMap = new Map<string, number>();
        textResList.forEach(res => {
          const fullText = res.text.trim();
          if (fullText) {
            frequencyMap.set(fullText, (frequencyMap.get(fullText) || 0) + 1);
          }
        });

        bubbleData = Array.from(frequencyMap.entries()).map(([text, value]) => ({
          text,
          value
        }));
      }

      const qPref = prefs[index] || { chartType: 'bar', textMode: 'cards' };

      return {
        question: qText,
        index,
        isMultipleChoice: isMultiple,
        activeDataPoints: dataPoints,
        textResponses: textResList,
        bubbleWordData: bubbleData,
        chartType: qPref.chartType,
        textMode: qPref.textMode
      };
    });
  });

  constructor() {
    effect(() => {
      const analysis = this.questionsAnalysis();

      if (!this.isLoading()) {
        setTimeout(() => {
          this.renderAllCharts(analysis);
        }, 50);
      }
    });
  }

  ngOnInit(): void {
    const authData = isAuth();
    this.userRole = authData?.rol || '';

    this.loadSources();

    this.surveyService.getSurveysStatsSubtipo(this.selectedSubtipo()).subscribe({
      next: (data) => {
        console.log(data)
        if (data && (data.notesource || data.note)) {
          const arr = data.notesource;
          if (Array.isArray(arr) && arr.length > 0) {
            this.analysis.set(arr[0].solution);
          }
        }
      },
      error: () => {
        this.respondents.set([]);
        this.isLoading.set(false);
      }
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(() => {
      if (!this.isLoading()) {
        this.renderAllCharts(this.questionsAnalysis());
      }
    });
    this.resizeObserver.observe(document.body);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  public getGeminiTitle(): string {
    const analysisData = this.questionsAnalysis();
    return `Generar un análisis detallado en html simple sin clases, basado en las siguientes preguntas y resultados analizados de la encuesta: ${JSON.stringify(analysisData)}`;
  }

  public formatSubtipoName(text: string): string {
    return text
      .replace(/(empresario|estudiante|docente)(inversor|productor|intermediario|cole|inst|esfa|uni)/i, '$1 $2')
      .replace(/cole/i, ' colegio')
      .replace(/inst/i, ' instituto')
      .replace(/egresado/i, ' egresado esfa')
      .replace(/uni/i, ' universitario')
      .replace(/esfa/i, ' ESFAPA FGPA')
      .toUpperCase();
  }

  public loadSources(): void {
    this.surveyService.getSurveysSource().subscribe(sources => {
      this.sources.set(sources);
      if (sources.length > 0) {
        this.selectSubtipo(sources[0].subtipo);
      } else {
        this.selectSubtipo('egresado');
      }
    });
  }

  public selectSubtipo(subtipo: string): void {
    this.selectedSubtipo.set(subtipo);
    this.isLoading.set(true);

    this.surveyService.getSurveysStatsSubtipo(subtipo).subscribe({
      next: (data) => {
        console.log(data)
        if (data && (data.notesource || data.note)) {
          const arr = data.notesource;
          if (Array.isArray(arr) && arr.length > 0) {
            this.analysis.set(arr[0].solution);
          }
        }

        const items = Array.isArray(data) ? data : (data?.note || data?.notesource || []);
        this.respondents.set(items);
        this.isLoading.set(false);

        setTimeout(() => {
          this.renderAllCharts(this.questionsAnalysis());
        }, 50);
      },
      error: () => {
        this.respondents.set([]);
        this.isLoading.set(false);
      }
    });
  }

  private renderAllCharts(analysis: QuestionAnalysis[]): void {
    if (this.mcChartContainers) {
      this.mcChartContainers.forEach(containerRef => {
        const el = containerRef.nativeElement;
        const qIdx = Number(el.getAttribute('data-q-index'));
        const qData = analysis[qIdx];
        if (qData && qData.isMultipleChoice) {
          this.renderStatisticalChart(el, qData.activeDataPoints, qData.chartType);
        }
      });
    }

    if (this.bubbleChartContainers) {
      this.bubbleChartContainers.forEach(containerRef => {
        const el = containerRef.nativeElement;
        const qIdx = Number(el.getAttribute('data-q-index'));
        const qData = analysis[qIdx];
        if (qData && !qData.isMultipleChoice && qData.textMode === 'bubble') {
          this.renderBubbleChart(el, qData.bubbleWordData);
        }
      });
    }
  }

  private renderStatisticalChart(container: HTMLDivElement, data: ChartDataPoint[], type: 'bar' | 'donut'): void {
    d3.select(container).selectAll('*').remove();

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 350;

    const svg = d3
      .select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    if (type === 'bar') {
      this.drawBarChart(svg, data, width, height);
    } else {
      this.drawDonutChart(svg, data, width, height);
    }
  }

  private drawBarChart(
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    data: ChartDataPoint[],
    width: number,
    height: number
  ): void {
    const margin = { top: 20, right: 20, bottom: 40, left: 45 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map((_, i) => `Opción ${i + 1}`))
      .range([0, innerWidth])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.count) || 1])
      .nice()
      .range([innerHeight, 0]);

    const color = d3.scaleOrdinal(d3.schemeTableau10);

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('font-size', '11px');

    g.append('g')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format('d')))
      .selectAll('text')
      .style('font-size', '11px');

    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (_, i) => x(`Opción ${i + 1}`) || 0)
      .attr('width', x.bandwidth())
      .attr('y', innerHeight)
      .attr('height', 0)
      .attr('fill', (_, i) => color(i.toString()))
      .attr('rx', 4)
      .transition()
      .duration(600)
      .attr('y', d => y(d.count))
      .attr('height', d => innerHeight - y(d.count));

    g.selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('x', (_, i) => (x(`Opción ${i + 1}`) || 0) + x.bandwidth() / 2)
      .attr('y', d => y(d.count) - 6)
      .attr('text-anchor', 'middle')
      .style('font-size', '11px')
      .style('font-weight', '600')
      .style('fill', '#334155')
      .text(d => d.count);
  }

  private drawDonutChart(
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    data: ChartDataPoint[],
    width: number,
    height: number
  ): void {
    const radius = Math.min(width, height) / 2;
    const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeTableau10);
    const pie = d3.pie<ChartDataPoint>().value(d => d.count).sort(null);

    const arc = d3
      .arc<d3.PieArcDatum<ChartDataPoint>>()
      .innerRadius(radius * 0.55)
      .outerRadius(radius);

    const arcs = g.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc');

    arcs
      .append('path')
      .attr('fill', (_, i) => color(i.toString()))
      .transition()
      .duration(600)
      .attrTween('d', function (d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t) {
          return arc(interpolate(t)) || '';
        };
      });

    const totalCount = d3.sum(data, d => d.count);

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.2em')
      .style('font-size', '1.5rem')
      .style('font-weight', 'bold')
      .style('fill', '#1e293b')
      .text(totalCount);

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.2em')
      .style('font-size', '0.75rem')
      .style('fill', '#64748b')
      .text('TOTAL');
  }

  private renderBubbleChart(element: HTMLDivElement, data: ResponseBubbleData[]): void {
    const allText = (Array.isArray(data) ? data : [])
      .map(item => item.text || '')
      .join(' ')
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¿?¡""„“”«»]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const stopWords = new Set([
      'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'o', 'pero',
      'si', 'no', 'en', 'de', 'del', 'al', 'a', 'por', 'para', 'con', 'sin',
      'sobre', 'entre', 'que', 'es', 'son', 'fue', 'se', 'lo', 'su', 'sus',
      'este', 'alguna', 'manera', 'aún', 'esta', 'estos', 'estas', 'sido', 'también', 'escuela', 'como', 'más', 'mas', 'muy', 'ya',
      'ha', 'han', 'fue', 'ser', 'estar', 'tener', 'hacer', 'todo', 'todos',
      'otra', 'otro', 'otros', 'otras', 'les', 'le', 'me', 'mi', 'mis', 'tu', 'tus'
    ]);

    const wordCounts: { [key: string]: number } = {};
    allText.split(' ').forEach(word => {
      const cleanWord = word.trim();
      if (cleanWord.length > 2 && !stopWords.has(cleanWord)) {
        wordCounts[cleanWord] = (wordCounts[cleanWord] || 0) + 1;
      }
    });

    const flatData: ResponseBubbleData[] = Object.keys(wordCounts)
      .map(word => ({ text: word, value: wordCounts[word] }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 25);

    const width = element.clientWidth || 400;
    const height = element.clientHeight || 400;

    d3.select(element).select('svg').remove();
    d3.select(element).selectAll('.bubble-tooltip').remove();

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('max-width', '100%')
      .style('height', 'auto');

    if (flatData.length === 0) {
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', height / 2)
        .attr('text-anchor', 'middle')
        .style('fill', '#94a3b8')
        .style('font-size', '14px')
        .style('font-weight', '500')
        .text('No hay palabras suficientes para generar el análisis');
      return;
    }

    const minVal = d3.min(flatData, d => d.value) || 1;
    const maxVal = d3.max(flatData, d => d.value) || 1;
    const fontSizeScale = d3.scaleLinear()
      .domain([minVal, maxVal])
      .range([13, 30]);

    const colorScale = d3.scaleOrdinal(d3.schemeTableau10);

    const simulationNodes = flatData.map(d => ({
      ...d,
      radius: fontSizeScale(d.value) * 1.4,
      x: width / 2 + (Math.random() - 0.5) * 100,
      y: height / 2 + (Math.random() - 0.5) * 100
    }));

    const simulation = d3.forceSimulation(simulationNodes as any[])
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('charge', d3.forceManyBody().strength(5))
      .force('collision', d3.forceCollide().radius((d: any) => d.radius + 6))
      .stop();

    for (let i = 0; i < 120; ++i) simulation.tick();

    const tooltip = d3.select(element)
      .append('div')
      .attr('class', 'bubble-tooltip')
      .style('position', 'absolute')
      .style('background', 'rgba(15, 23, 42, 0.95)')
      .style('backdrop-filter', 'blur(6px)')
      .style('color', '#ffffff')
      .style('padding', '8px 12px')
      .style('border-radius', '6px')
      .style('font-size', '12px')
      .style('font-family', 'system-ui, -apple-system, sans-serif')
      .style('pointer-events', 'none')
      .style('display', 'none')
      .style('z-index', '10')
      .style('box-shadow', '0 10px 15px -3px rgba(0,0,0,0.2)');

    const tagGroup = svg.selectAll('.tag-item')
      .data(simulationNodes)
      .enter()
      .append('g')
      .attr('class', 'tag-item')
      .attr('transform', (d: any) => `translate(${d.x}, ${d.y})`)
      .style('cursor', 'pointer');

    tagGroup.append('rect')
      .attr('rx', 14)
      .attr('ry', 14)
      .style('fill', (_, i) => colorScale(i.toString()))
      .style('fill-opacity', 0.1)
      .style('stroke', (_, i) => colorScale(i.toString()))
      .style('stroke-opacity', 0.3)
      .style('stroke-width', 1)
      .on('mouseover', function (event, d: any) {
        d3.select(this)
          .transition()
          .duration(200)
          .style('fill-opacity', 0.25)
          .style('stroke-opacity', 0.8)
          .attr('transform', 'scale(1.08)');

        tooltip
          .style('display', 'block')
          .html(`<strong>Término:</strong> "${d.text}"<br><strong>Frecuencia:</strong> ${d.value}`);
      })
      .on('mousemove', function (event) {
        const [xCoord, yCoord] = d3.pointer(event, element);
        tooltip
          .style('left', `${xCoord + 15}px`)
          .style('top', `${yCoord - 15}px`);
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(200)
          .style('fill-opacity', 0.1)
          .style('stroke-opacity', 0.3)
          .attr('transform', 'scale(1)');

        tooltip.style('display', 'none');
      });

    tagGroup.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('font-family', 'system-ui, -apple-system, sans-serif')
      .style('font-weight', (d: any) => d.value > (maxVal * 0.6) ? '700' : '500')
      .style('font-size', (d: any) => `${fontSizeScale(d.value)}px`)
      .style('fill', (_, i) => colorScale(i.toString()))
      .style('pointer-events', 'none')
      .text((d: any) => d.text);

    tagGroup.each(function (d: any) {
      const textEl = d3.select(this).select('text').node() as SVGTextElement;
      if (textEl) {
        const bbox = textEl.getBBox();
        d3.select(this).select('rect')
          .attr('x', bbox.x - 10)
          .attr('y', bbox.y - 6)
          .attr('width', bbox.width + 20)
          .attr('height', bbox.height + 12);
      }
    });
  }

  public onGeminiResponseReceived(aiResponse: string): void {
    this.analysis.set(aiResponse);
    console.log('Respuesta recibida y asignada en el padre:', aiResponse);
    this.submitTest('encuesta_institucional', []);
  }
}