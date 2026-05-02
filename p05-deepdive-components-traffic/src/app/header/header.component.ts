import { Component } from '@angular/core';
import { ButtonCommonComponent } from "../common/button-common/button-common";

@Component({
  selector: 'app-header',
  imports: [ButtonCommonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
