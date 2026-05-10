import { Injectable, signal, Injector, createComponent, EnvironmentInjector, ApplicationRef } from '@angular/core';
import { TOAST_MESSAGE_TYPE, ToastMessage } from '../model/toast-message.model';
import { ToastCustom } from '../components/toast-custom/toast-custom';

@Injectable({ providedIn: 'root' })
export class ToastMessageService {
  private counter = 0;
  private toastHostCreated = false;
  toastmessages = signal<ToastMessage[]>([]);
  exitingIds = signal<Set<number>>(new Set());
  private displayNumber = signal(true);

  constructor(private injector: Injector, private appRef: ApplicationRef) {}

  setDisplayNumber(value: boolean) {
    this.displayNumber.set(value);
  }

  getDisplayNumber() {
    return this.displayNumber();
  }

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
    // Mark as exiting to trigger exit animation
    this.exitingIds.update(ids => new Set([...ids, id]));
    
    // Wait for animation to complete (300ms) then remove from DOM
    setTimeout(() => {
      this.toastmessages.update(list => list.filter(t => t.id !== id));
      this.exitingIds.update(ids => {
        ids.delete(id);
        return new Set(ids);
      });
    }, 300);
  }
}