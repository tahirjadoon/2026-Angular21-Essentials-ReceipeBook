import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tooltip-by-comp',
  templateUrl: './tooltip-by-comp.component.html',
  styleUrl: './tooltip-by-comp.component.css',
})
export class TooltipByCompComponent {
  message = input.required<string>();
  visible = input(false);
  left = input(0);
  top = input(0);
}

