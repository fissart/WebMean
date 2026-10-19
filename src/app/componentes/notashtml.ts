import { Component, input, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Course {
  _id: string;
  title: string;
  credito?: string;
  codigo?: string;
}

interface UserRecord {
  codigo: string;
  nota: string;
}

interface UserInfo {
  dni?: string;
  name?: string;
}

interface ReportUser {
  records?: UserRecord[];
  total?: number;
  usser?: UserInfo[];
}

interface ReportData {
  ordercurses?: Course[];
  orderTEACHER?: any[];
  order?: ReportUser[];
}

@Component({
  selector: 'app-excel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center">
      <button (click)="exportExcel()" class="btn btn-warning" [disabled]="loading()">
        {{ loading() ? 'Cargando...' : 'Acta en html [' + year() + ' ' + mencion() + ' ' + ciclo() + ']' }}
      </button>
      
      @if (www().length > 0) {
        <div style="display: flex; flex-wrap: nowrap; overflow-x: auto;">
          <div class="w-100" style="max-width: 100%;">
            @if (title()) {
              <div class="text-warning text-center w-100 ffont" style="font-size: 2em;">
                {{ title() }}
              </div>
            }
            
            <table class="table">
              <thead>
                <tr>
                  <th colspan="3"></th>
                  @for (c of curses(); track c._id) {
                    <th colspan="2" class="vertical" style="background: skyblue; text-align: center;">
                      {{ c.title }} [{{ c.credito }}]
                    </th>
                  }
                </tr>
                <tr>
                  <th>#</th>
                  <th>DNI</th>
                  <th>Nombre</th>
                  @for (c of curses(); track c._id; let idx = $index) {
                    <th class="vertical" style="text-align: center;">Nota</th>
                    <th class="vertical" style="text-align: center;">Puntaje</th>
                  }
                </tr>
              </thead>

              <tbody>
                @for (row of www(); track i; let i = $index) {
                  <tr>
@for (val of row; track k; let k = $index) {
  <td [style.color]="(isNaNValue(val) || +val < 11) && k > 2 ? 'orange' : 'black'" class="text-center">
    {{ val }}
  </td>
}                  </tr>
                }
              </tbody>

              <tfoot>
                <!-- Histograma G1 -->
                <tr>
                  <td colspan="3" style="font-weight: bold;">Estadísticas Estado</td>
                  @for (num of histograma(); track idx; let idx = $index) {
                    <td colspan="2" style="background: white; padding: 4px;">
                      <div style="display: flex; justifyContent: space-around; alignItems: flex-end; height: 60px;">
                        @for (val of num; track k; let k = $index) {
                          <div style="display: flex; flexDirection: column; alignItems: center; width: 20%;">
                            <span style="font-size: 9px;">{{ val === 0 ? '-' : ((val / www().length) * 100).toFixed(1) + '%' }}</span>
                            <div [style.height.px]="(val / www().length) * 40" style="width: 100%;" [style.background]="bg[k] || 'gray'"></div>
                            <span style="font-size: 9px;">{{ val }}</span>
                          </div>
                        }
                      </div>
                      <div style="display: flex; justifyContent: space-around; font-size: 8px; border-top: 1px solid #ddd;">
                        <span>Ret</span><span>Lic</span><span>Des</span><span>Apr</span>
                      </div>
                    </td>
                  }
                </tr>

                <!-- Histograma Real -->
                <tr>
                  <td colspan="3" style="font-weight: bold;">Rangos de Notas</td>
                  @for (num of histogramareal(); track idx; let idx = $index) {
                    <td colspan="2" style="background: white; padding: 4px;">
                      <div style="display: flex; justifyContent: space-between; alignItems: flex-end; height: 50px;">
                        @for (val of num; track k; let k = $index) {
                          <div style="display: flex; flexDirection: column; alignItems: center; flex: 1;">
                            <span style="font-size: 7px;">{{ val === 0 ? '-' : ((val / www().length) * 100).toFixed(0) + '%' }}</span>
                            <div [style.height.px]="(val / www().length) * 30" style="width: 80%;" [style.background]="bg[k] || 'gray'"></div>
                            <span style="font-size: 7px; color: #666;">{{ intervalos()[k] }}</span>
                          </div>
                        }
                      </div>
                    </td>
                  }
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      }
    </div>
  `
})
export class ExportTohtmlComponent {
  private http = inject(HttpClient);
  readonly apiUrl = `${environment.apiURL}/api`;

  // Inputs using Angular signals
  year = input.required<string>();
  ciclo = input.required<string>();
  mencion = input.required<string>();

  // Component state signals
  www = signal<any[][]>([]);
  title = signal<string>('');
  teachers = signal<any[]>([]);
  curses = signal<Course[]>([]);
  histograma = signal<any[][]>([]);
  histogramareal = signal<any[][]>([]);
  intervalos = signal<string[]>([]);
  loading = signal<boolean>(false);

  readonly bg = ['orange', 'gray', 'skyblue', 'blue', 'cyan', 'pink', 'yellow', 'teal', 'brown', 'red', 'white', 'orange'];

  async exportExcel() {
    this.loading.set(true);
    try {
      this.http.get<ReportData>(`${this.apiUrl}/users/report/${this.ciclo()}/${this.mencion()}/${this.year()}`)
        .subscribe({
          next: (data) => {
            const currentCurses = data.ordercurses || [];
            this.curses.set(currentCurses);
            this.teachers.set(data.orderTEACHER || []);
            
            const currentOrder = data.order || [];
            console.log(currentOrder)
            const creditosuma = currentCurses.reduce((sum, c) => sum + Number(c.credito || 0), 0);

            const menciones: Record<string, string> = {
              ED: "Educación Artística - Artes Plásticas",
              P: "Artista Profesional - Artes Plásticas y Visuales (Pintura)",
              E: "Artista Profesional - Artes Plásticas y Visuales (Escultura)"
            };
            this.title.set(menciones[this.mencion()] || "Artista Profesional - Artes Plásticas y Visuales (Grabado)");

            const tipo = ['**[L]**', '**[I]**', '**[C]**', '**[E]**', '**[N]**', '**[C]**', '**[I]**', '**[A]**'];
            const tipowww = ['**[R]**', '**[E]**', '**[T]**', '**[I]**', '**[R]**', '**[A]**', '**[D]**', '**[O]**'];

            const nottas: any[][] = [];
            const notttas: any[][] = [];

            currentOrder.forEach((user, k) => {
              const calftns: any[] = Array(35).fill("");
              const notas: string[] = [];
              const recordsMap = new Map(user.records?.map(r => [r.codigo, r.nota]));

              currentCurses.forEach((curse, i) => {
                if (recordsMap.has(curse?.codigo ||'')) {
                  const nota = recordsMap.get(curse?.codigo||'')!;
                  notas.push(nota);

                  const isL = nota === '-0';
                  const isR = nota === '0';
                  
                  calftns[2 * i] = isL ? tipo[i] || '' : isR ? tipowww[i] || '' : Number(nota);
                  calftns[2 * i + 1] = isL || isR ? '' : Number(nota) * Number(curse.credito);
                } else {
                  notas.push('0');
                  calftns[2 * i] = tipowww[i] || '';
                }
              });

              const firstNota = user.records?.[0]?.nota;
              const userTotal = user.total ?? 0;
              calftns[26] = firstNota === '-0' ? 'L' : userTotal === 0 ? 'R' : (userTotal / creditosuma) <= 5 ? 'RP' : userTotal;
              calftns[27] = creditosuma;
              calftns[28] = firstNota === '-0' ? 'L' : userTotal === 0 ? 'R' : (userTotal / creditosuma) <= 5 ? 'RP' : Number((userTotal / creditosuma).toFixed(2));

              const userDni = user.usser?.[0]?.dni || "";
              const userName = user.usser?.[0]?.name || "";
              
              nottas.push(notas);
              notttas.push([k + 1, userDni, userName].concat(calftns));
            });

            this.www.set(notttas);

            const transposedNotas = currentCurses.map((_, i) => nottas.map(row => row[i]));

            const intervalValues = [-0.1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20.1];
            const histogramawreal = transposedNotas.map(col => 
              intervalValues.slice(0, -1).map((inf, k) => col.filter(x => inf < Number(x) && Number(x) <= intervalValues[k + 1]).length)
            );
            this.histogramareal.set(histogramawreal);

            const intervalosnew = intervalValues.slice(0, -1).map((inf, k) => 
              k === 0 ? 'R' : `${inf === -0.1 ? 0 : inf}-${intervalValues[k + 1] === 20.1 ? 20 : intervalValues[k + 1]}`
            );
            this.intervalos.set(intervalosnew);

            const histogramaw = transposedNotas.map(col => [
              col.filter(x => x === '-0').length,
              col.filter(x => x === '0').length,
              col.filter(x => { const n = Number(x); return n <= 10 && n > 0; }).length,
              col.filter(x => { const n = Number(x); return n > 10 && n <= 20; }).length
            ]);
            this.histograma.set(histogramaw);
            this.loading.set(false);
          },
          error: (error) => {
            console.error("Error fetching data:", error);
            this.loading.set(false);
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      this.loading.set(false);
    }
  }

  isNaNValue(val: any): boolean {
    return isNaN(Number(val));
  }
}