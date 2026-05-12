import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { BusyService } from '../services/busy.service';

export const busyInterceptor: HttpInterceptorFn = (req, next) => {
  const busy = inject(BusyService);
  busy.begin();
  return next(req).pipe(finalize(() => busy.end()));
};
