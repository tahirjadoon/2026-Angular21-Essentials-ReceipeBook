import { Component } from '@angular/core';
import { SafeLinkDirective } from "../directives/safe-link.directive";
import { LogDirective } from '../directives/log.directive';
import { TooltipDirective } from '../directives/tooltip.directive';

@Component({
  selector: 'app-learning-resources',
  imports: [SafeLinkDirective, TooltipDirective],
  templateUrl: './learning-resources.component.html',
  styleUrl: './learning-resources.component.css',
  hostDirectives:[LogDirective]
})
export class LearningResourcesComponent {}
