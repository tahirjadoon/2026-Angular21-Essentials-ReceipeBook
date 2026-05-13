import { HttpEventType, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { finalize, tap } from "rxjs";

export const responseInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  // const req = request.clone({
  //   headers: request.headers.set('X-DEBUG', 'TESTING')
  // });

  console.log('responseInterceptor - Request started:');
  console.log(request);
  return next(request).pipe(
    tap({
      next: event => {
        if(event.type === HttpEventType.Response) {
          console.log('responseInterceptor - Response received:');
          console.log(event.status);
          console.log(event.body);
        }
      }
    })
  );
};