import { Component } from '@angular/core';
import { SafeLinkDirective } from "../directives/safe-link.directive";
import { LogDirective } from '../directives/log.directive';

@Component({
  selector: 'app-learning-resources',
  imports: [SafeLinkDirective],
  templateUrl: './learning-resources.component.html',
  styleUrl: './learning-resources.component.css',
  hostDirectives:[LogDirective]
})
export class LearningResourcesComponent {}
