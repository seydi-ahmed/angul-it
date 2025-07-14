import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig = () => [
  provideRouter(routes),
  provideHttpClient(),
  // Ajoute ici d'autres providers globaux si besoin
];
