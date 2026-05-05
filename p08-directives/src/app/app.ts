import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LearningResourcesComponent } from "./learning-resources/learning-resources.component";
import { AuthComponent } from "./auth/auth.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LearningResourcesComponent, AuthComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('p08-directives');
}
