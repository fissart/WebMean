import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { Navbar } from './navbar';

@Component({
  selector: 'app-math-demo',
  standalone: true,
  imports: [MarkdownComponent, Navbar],
  template: `
    <app-navbar></app-navbar>
    <div class="py-5"></div>

    <div class="container">  
      <markdown [katex]="true" [data]="combinedMathContent"></markdown>

      <markdown [katex]="true">
        $$
         e = mc^2 
         $$
      </markdown>

      <markdown [katex]="true">
        La formula de la relatividad es $e = mc^2$.
      </markdown>
    </div>
  `
})
export class Acerca {
  combinedMathContent = `
    The equation $E = mc^{2}$ revolutionized physics. 

    Below is a more complex integral formula:

    $$
    f(x) = \\int_{-\\infty} ^ {\\infty} \\hat{f}(\\xi)\\,e^{2\\pi i \\xi x}\\,d\\xi
    $$

    And you can continue writing normal text with more inline math like $\\alpha + \\beta = \\gamma$ right here.
  `;
}