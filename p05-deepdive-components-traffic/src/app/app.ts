import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { ServerStatusComponent } from "./dashboard/server-status/server-status";
import { TrafficComponent } from "./dashboard/traffic/traffic";
import { TicketsComponent } from "./dashboard/tickets/tickets";
import { DashboardItemComponent } from "./dashboard/dashboard-item/dashboard-item";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ServerStatusComponent, TrafficComponent, TicketsComponent, DashboardItemComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('p05-deepdive-components-traffic');

  
  
}
