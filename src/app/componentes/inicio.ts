import { Component, ChangeDetectionStrategy, computed } from '@angular/core';
import { Navbar } from './navbar';
import { Wwww } from './inicio3d';
import { isAuth } from './auth';
// import { AdminComponent } from './chat';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    Navbar,
    // AdminComponent,
    Wwww
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-navbar />
    <app-www />
    <!-- <app-admin /> -->

  `
})
export class InicioComponent {
  // Estado de autenticación optimizado para solo lectura
  readonly auth = isAuth();
}