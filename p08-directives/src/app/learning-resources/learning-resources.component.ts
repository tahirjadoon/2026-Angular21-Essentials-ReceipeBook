import { Component } from '@angular/core';
import { SafeLinkDirective } from "../directives/safe-link.directive";

@Component({
  selector: 'app-learning-resources',
  imports: [SafeLinkDirective],
  templateUrl: './learning-resources.component.html',
  styleUrl: './learning-resources.component.css',
})
export class LearningResourcesComponent {}
