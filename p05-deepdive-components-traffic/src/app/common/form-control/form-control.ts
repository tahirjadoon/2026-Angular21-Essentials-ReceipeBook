import { Component, contentChild, ContentChild, ElementRef, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-form-control',
  imports: [],
  templateUrl: './form-control.html',
  styleUrl: './form-control.css',
  encapsulation: ViewEncapsulation.None,
})
export class FormControlComponent {
  //template name variable = input
  @ContentChild('input') private control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;
  private control2 = contentChild.required<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');


  label = input.required<string>();

  //console.log('control', this.control);
  //console.log('control2', this.control2());

}
