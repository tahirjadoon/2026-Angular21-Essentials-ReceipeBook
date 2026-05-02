import { Component } from '@angular/core';
import { ɵEmptyOutletComponent } from "@angular/router";

//controls the button that has an attibute[appButton]
@Component({
  selector: 'button[appButton]', //app-button-common
  imports: [ɵEmptyOutletComponent],
  templateUrl: './button-common.html',
  styleUrl: './button-common.css',
})
export class ButtonCommonComponent {}
