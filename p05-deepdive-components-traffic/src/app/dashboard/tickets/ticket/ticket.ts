import { Component, input, output, signal } from '@angular/core';
import { Ticket, TICKET_STATUS } from '../ticket.model';

@Component({
  selector: 'app-ticket',
  imports: [],
  templateUrl: './ticket.html',
  styleUrl: './ticket.css',
})
export class TicketComponent {
  ticket = input.required<Ticket>();
  first = input.required<boolean>();
  last = input.required<boolean>();
  odd = input.required<boolean>();
  even = input.required<boolean>();
  count = input.required<number>();

  complete = output();

  isDetailsVisible = signal<boolean>(false);

  get isOpen(){
    return this.ticket().status === TICKET_STATUS.open;
  } 

  onToggleDetals(){
    //this.isDetailsVisible.set(!this.isDetailsVisible());
    this.isDetailsVisible.update((wasVisible) => !wasVisible);
  }

  onCompleteTicket(){
    this.complete.emit();
  }


}
