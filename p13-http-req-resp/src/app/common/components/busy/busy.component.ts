import { Component } from '@angular/core';
import { BusyService } from '../../services/busy.service';

@Component({
  selector: 'app-busy',
  standalone: true,
  templateUrl: './busy.component.html',
  styleUrl: './busy.component.css',
})
export class BusyComponent {
  constructor(public busy: BusyService) {}
}
