import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { busyInterceptor } from './common/interceptors/busy-interceptor/busy-interceptor';
import { loggingInterceptor } from './common/interceptors/logging-interceptors';
import { responseInterceptor } from './common/interceptors/response-iterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([busyInterceptor, loggingInterceptor, responseInterceptor])),
  ]
};
