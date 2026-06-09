import { inject } from "@angular/core";
import { CanMatchFn, RedirectCommand, Router } from "@angular/router";
import { ToastMessageService } from "../toast-message/toast-message.service";

export const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);

  //do something
  const shouldGetAccess = Math.random(); 
  //returns true/false/observable
  if(shouldGetAccess < 0.5)
    return true;

  const toastService = inject(ToastMessageService);
  toastService.error(`Blocked points=${shouldGetAccess.toFixed(2)} < 0.5... Click/refresh again to try your luck!`);

  return new RedirectCommand(router.parseUrl('/unauthorized'));

}