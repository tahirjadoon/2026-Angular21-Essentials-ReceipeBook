import { Component } from '@angular/core';
import { ToastMessageService } from '../../services/toast-message.service';

@Component({
  selector: 'app-toast-custom',
  standalone: true,
  templateUrl: './toast-custom.html',
  styleUrl: './toast-custom.css',
})
export class ToastCustom {
  constructor(public toastMessageService: ToastMessageService) {}

}
