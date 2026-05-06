import { Directive, ElementRef, inject } from "@angular/core";

@Directive({
  selector: '[appLog]',
  host: {
    '(click)': 'onLog()'
  }
})
export class LogDirective{
  private elemntRef = inject(ElementRef);

  constructor() {}

  onLog() {
    console.log('clicked');
    console.log(this.elemntRef.nativeElement);
  
  }
}