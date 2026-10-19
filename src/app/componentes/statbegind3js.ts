import {
  Component,
  ElementRef,
  inject,
  input,
  effect,
  viewChild
} from '@angular/core';
import * as d3 from 'd3';

export interface AltItemData {
  label: string;
  count: number;
  percentage: number;
}

@Component({
  selector: 'app-alt-chart',
  standalone: true,
  template: `
    <div class="bg-white border rounded p-3 shadow-sm">
      <div #chartContainer class="w-100"></div>
    </div>
  `
})
export class AltChartComponent {
  // Input Signal con la lista de alternativas procesadas
  items = input.required<AltItemData[]>();

  // Referencia al contenedor SVG
  private chartContainer = viewChild<ElementRef<HTMLDivElement>>('chartContainer');

  constructor() {
    // Redibuja con D3 automáticamente cada vez que cambien los datos
    effect(() => {
      const data = this.items();
      const container = this.chartContainer()?.nativeElement;

      if (container && data.length > 0) {
        this.renderChart(container, data);
      }
    });
  }

  private renderChart(container: HTMLElement, data: AltItemData[]): void {
    // Limpia gráficos anteriores
    d3.select(container).selectAll('*').remove();

    // Margen izquierdo amplio para asegurar visibilidad de las etiquetas
    const margin = { top: 10, right: 65, bottom: 10, left: 180 };
    const width = Math.max(container.clientWidth - margin.left - margin.right, 100);
    const barHeight = 28;
    const height = data.length * (barHeight + 12);

    // SVG principal
    const svg = d3
      .select(container)
      .append('svg')
      .attr('width', '100%')
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Escalas de ejes (X e Y)
    const x = d3.scaleLinear().domain([0, 100]).range([0, width]);

    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, height])
      .padding(0.3);

    // Eje Y personalizado con D3 para mostrar todas las etiquetas
    const yAxisGroup = svg
      .append('g')
      .call(d3.axisLeft(y).tickSize(0));

    yAxisGroup.select('.domain').remove();

    // Formatear y renderizar todas las etiquetas
    yAxisGroup
      .selectAll('.tick text')
      .attr('class', 'fw-semibold text-secondary')
      .style('font-size', '13px')
      .style('text-anchor', 'end')
      .text((d) => {
        const textStr = String(d);
        // Trunca si el texto excede los 24 caracteres para evitar superposición
        return textStr.length > 24 ? textStr.substring(0, 22) + '...' : textStr;
      })
      .append('title')
      .text((d) => String(d)); // Agrega tooltip flotante con la etiqueta completa

    // Fondo de las barras (Gris claro)
    svg
      .selectAll('.bg-bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bg-bar')
      .attr('y', (d) => y(d.label)!)
      .attr('width', width)
      .attr('height', y.bandwidth())
      .attr('fill', '#e9ecef')
      .attr('rx', 4);

    // Barras de Progreso Animadas (Bootstrap Warning Color)
    svg
      .selectAll('.progress-bar-d3')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'progress-bar-d3')
      .attr('y', (d) => y(d.label)!)
      .attr('height', y.bandwidth())
      .attr('fill', '#ffc107')
      .attr('rx', 4)
      .attr('width', 0)
      .transition()
      .duration(750)
      .attr('width', (d) => x(d.percentage));

    // Texto del Porcentaje y Conteo al final de la barra
    svg
      .selectAll('.label-text')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label-text fw-bold')
      .attr('y', (d) => y(d.label)! + y.bandwidth() / 2 + 4)
      .attr('x', (d) => x(d.percentage) + 8)
      .attr('fill', '#495057')
      .style('font-size', '12px')
      .text((d) => `${d.count} (${d.percentage}%)`);
  }
}