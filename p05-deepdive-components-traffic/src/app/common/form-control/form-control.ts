import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-control',
  imports: [],
  templateUrl: './form-control.html',
  styleUrl: './form-control.css',
})
export class FormControlComponent {
  label = input.required<string>();
}
