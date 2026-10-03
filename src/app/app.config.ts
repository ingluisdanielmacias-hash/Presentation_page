import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

// Angular 22: las apps nuevas son "zoneless" por defecto y todo el estado
// de la página se maneja con signals, así que no se necesita zone.js.
export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners()],
};
