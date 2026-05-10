import { Component, signal } from '@angular/core';
import { ToastMessageService } from '../../services/toast-message.service';

@Component({
  selector: 'app-toast-custom',
  standalone: true,
  templateUrl: './toast-custom.html',
  styleUrl: './toast-custom.css',
})
export class ToastCustom {
  displayNumber = signal(true);

  constructor(public toastMessageService: ToastMessageService) {
    // Service sets this to true by default
    this.toastMessageService.setDisplayNumber(true);
  }
}
