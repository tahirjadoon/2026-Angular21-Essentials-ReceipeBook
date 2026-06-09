import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, 
                  withComponentInputBinding(), //withComponentInputBinding needed for binding route params to component inputs
                  withRouterConfig({ paramsInheritanceStrategy: 'always' }), //passing the parent path parameters to child
                  ), 
  ]
};
