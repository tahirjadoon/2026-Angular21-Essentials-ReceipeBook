import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { ToastCustom } from "./common/components/toast-custom/toast-custom";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TasksComponent, ToastCustom],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('p10-services-di');
}
