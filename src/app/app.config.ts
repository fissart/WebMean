import { ApplicationConfig, SecurityContext } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideMarkdown, KATEX_OPTIONS, SANITIZE } from 'ngx-markdown';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';

// 2. Registrar los datos del locale
registerLocaleData(localeEs, 'es');

import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
  withPreloading,
  PreloadAllModules
} from '@angular/router';
import { routes } from './app.routes';
import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';

// Configuración global de KaTeX para marcado en Markdown
marked.use(markedKatex({
  throwOnError: false
}));

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions(),
      withPreloading(PreloadAllModules)
    ),
    // 3. Proveer el LOCALE_ID globalmente para toda la aplicación
    { provide: LOCALE_ID, useValue: 'es' },
    provideHttpClient(),
    provideAnimationsAsync(),
    provideToastr({
      timeOut: 1500,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    provideMarkdown({
      // sanitize: {
      //   provide: SANITIZE,
      //   useValue: SecurityContext.HTML
      // },
      katexOptions: {
        provide: KATEX_OPTIONS,
        useValue: {
          displayMode: true,
          errorColor: '#cc0000'
        }
      }
    })
  ]
}