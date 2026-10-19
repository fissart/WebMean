import { Directive, ElementRef, effect, input, inject } from '@angular/core';
import renderMathInElement from 'katex/contrib/auto-render';

@Directive({
  selector: '[appMathRenderer]',
  standalone: true
})
export class MathRendererDirective {
  private readonly el = inject(ElementRef);

  // Input basado en Signal que recibe el HTML o texto
  readonly content = input<string>('', { alias: 'appMathRenderer' });

  constructor() {
    // Reacciona automáticamente cada vez que el valor del 'content' cambia
    effect(() => {
      const html = this.content() || '';
      const container = this.el.nativeElement as HTMLElement;

      // 1. Asignar el contenido HTML
      container.innerHTML = html;

      // 2. Procesar KaTeX en el elemento
      renderMathInElement(container, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false
      });

      // 3. Detectar y hacer responsivos los iframes (Bootstrap)
      const iframes = container.querySelectorAll('iframe');
      iframes.forEach((iframe: HTMLIFrameElement) => {
        if (!iframe.parentElement?.classList.contains('ratio')) {
          const wrapper = document.createElement('div');
          // 'ratio ratio-16x9' es el estándar de Bootstrap 5 para reemplazo de 'embed-responsive'
          wrapper.className = 'ratio ratio-16x9 my-3 rounded';
          
          iframe.parentNode?.insertBefore(wrapper, iframe);
          wrapper.appendChild(iframe);
        }
      });
    });
  }
}