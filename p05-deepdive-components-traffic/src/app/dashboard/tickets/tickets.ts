import { Component } from '@angular/core';
import { NewTicketComponent } from "./new-ticket/new-ticket";

@Component({
  selector: 'app-tickets',
  imports: [NewTicketComponent],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
})
export class TicketsComponent {}
