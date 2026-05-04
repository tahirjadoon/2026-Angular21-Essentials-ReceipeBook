import { Component } from '@angular/core';
import { NewTicketComponent } from "./new-ticket/new-ticket";
import { Ticket, TICKET_STATUS } from './ticket.model';
import { TicketComponent } from "./ticket/ticket";

@Component({
  selector: 'app-tickets',
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
})
export class TicketsComponent {
  tickets : Ticket[] = [];

  onNewTicketAdd(newTicketInfo: {title: string, request: string} ){
    if(!newTicketInfo) return;
    const newTicket: Ticket = {
      id: Date.now().toString(36),
      title: newTicketInfo.title,
      request: newTicketInfo.request,
      status: TICKET_STATUS.open
    };
    this.tickets.push(newTicket);

  }

  onCompleteTicket(ticketId: string){
    /*
    const ticket = this.tickets.find(t => t.id === ticketId);
    if(!ticket) return;
    ticket.status = TICKET_STATUS.close;
    */
    //alternate with map
    this.tickets = this.tickets.map((t) => {
      if(t.id === ticketId){
        return {...t, status: TICKET_STATUS.close }
      }
      return t;
    });
    
  }
}
