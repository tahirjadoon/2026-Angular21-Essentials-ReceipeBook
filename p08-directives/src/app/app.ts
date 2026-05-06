import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LearningResourcesComponent } from "./learning-resources/learning-resources.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthService } from './auth/services/auth.service';
import { AuthDirective } from "./directives/auth.directive";
import { PERMISSION_TYPES } from './auth/models/auth.model';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, LearningResourcesComponent, AuthComponent, AuthDirective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('p08-directives');
  permissionTypes = PERMISSION_TYPES;

  private authService = inject(AuthService);

  //computed properties will update reactively
  //any computed (tracks any signal read) that calls this function will automatically subscribe to that signal.
  isAdmin = computed(() => this.authService.isAdmin());
  isUser = computed(() => this.authService.isUser());
  isGuest = computed(() => this.authService.isGuest());

  //standard getter, will compute but on change detection, not reactive
  get isAdmin2(){
    return this.authService.isAdmin();
  }

  get isUser2(){
    return this.authService.isUser();
  }

  get isGuest2(){
    return this.authService.isGuest();
  }

}
