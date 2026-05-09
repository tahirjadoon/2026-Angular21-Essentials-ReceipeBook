import { Injectable, signal } from '@angular/core';
import { ToastMessage, ToastMessageType } from '../model/toast-message.model';

@Injectable({ providedIn: 'root' })
export class ToastMessageService {
  private counter = 0;
  //toastmessage = signal<ToastMessage | null>(null);
  toastmessages = signal<ToastMessage[]>([]);

  show(type: ToastMessageType, text: string) {

    const toast: ToastMessage = {
      id: ++this.counter,
      type,
      text
    };

    //this.toastmessage.set({ type, text });

    // add to queue
    this.toastmessages.update(list => [...list, toast]);

    setTimeout(() => {
      this.removeToast(toast.id);
    }, 5000);
  }

  removeToast(id: number) {
    this.toastmessages.update(list => list.filter(t => t.id !== id));
  }
}