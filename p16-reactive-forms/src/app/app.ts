import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from './auth/signup/signup.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, SignupComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('p16-reactive-forms');

  selectedTab = signal('login');

  onTabClick(tab: string) {
    this.selectedTab.set(tab);
  }
}
