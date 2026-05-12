import { Component, signal } from '@angular/core';
import { ToastMessageService } from '../toast-message.service';

@Component({
  selector: 'app-toast-custom',
  standalone: true,
  templateUrl: './toast-custom.component.html',
  styleUrl: './toast-custom.component.css',
})
export class ToastCustom {
  displayNumber = signal(true);

  constructor(public toastMessageService: ToastMessageService) {
    // Service sets this to true by default
    this.toastMessageService.setDisplayNumber(true);
  }
}
