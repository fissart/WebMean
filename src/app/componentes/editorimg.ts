import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contenedor-iframe',
  standalone: true,
  template: `
    <div class="editor-container">
      <iframe 
        #miniPaintIframe 
        src="/www/index.html" 
        width="100%" 
        height="600px" 
        style="border: none;">
      </iframe>
      
    </div>
  `
})
export class ContenedorIframeComponent {
  // Obtenemos una referencia al iframe del template
  @ViewChild('miniPaintIframe') iframeRef!: ElementRef<HTMLIFrameElement>;

}