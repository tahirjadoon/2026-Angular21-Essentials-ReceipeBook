import { Injectable, signal, Injector, createComponent, EnvironmentInjector, ApplicationRef } from '@angular/core';
import { TOAST_MESSAGE_TYPE, ToastMessage } from '../model/toast-message.model';
import { ToastCustom } from '../components/toast-custom/toast-custom';

@Injectable({ providedIn: 'root' })
export class ToastMessageService {
  private counter = 0;
  private toastHostCreated = false;
  toastmessages = signal<ToastMessage[]>([]);

  constructor(private injector: Injector, private appRef: ApplicationRef) {}

  success(text: string) {
    this.show(TOAST_MESSAGE_TYPE.Success, text);
  }

  error(text: string) {
    this.show(TOAST_MESSAGE_TYPE.Error, text);
  }

  warning(text: string) {
    this.show(TOAST_MESSAGE_TYPE.Warning, text);
  }

  info(text: string) {
    this.show(TOAST_MESSAGE_TYPE.Info, text);
  }

  private show(type: TOAST_MESSAGE_TYPE, text: string) {
    // Create the toast host component on first show() call
    if (!this.toastHostCreated) {
      this.createToastHost();
      this.toastHostCreated = true;
    }

    const toast: ToastMessage = {
      id: ++this.counter,
      type,
      text
    };

    // add to queue
    this.toastmessages.update(list => [...list, toast]);

    setTimeout(() => {
      this.removeToast(toast.id);
    }, 5000);
  }

  private createToastHost() {
    const environmentInjector = this.injector.get(EnvironmentInjector);
    const componentRef = createComponent(ToastCustom, {
      environmentInjector
    });
    document.body.appendChild(componentRef.location.nativeElement);
    this.appRef.attachView(componentRef.hostView);
  }

  private removeToast(id: number) {
    this.toastmessages.update(list => list.filter(t => t.id !== id));
  }
}