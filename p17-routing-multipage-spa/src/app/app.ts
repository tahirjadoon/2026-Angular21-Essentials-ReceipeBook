import { Component, signal } from '@angular/core';
import { HeaderComponent } from "./_layout/header/header.component";
import { UsersComponent } from "./users/users.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UsersComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('p17-routing-multipage-spa');
}
