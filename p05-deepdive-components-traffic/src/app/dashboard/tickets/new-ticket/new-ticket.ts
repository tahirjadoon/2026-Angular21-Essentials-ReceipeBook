import { AfterViewInit, Component, ElementRef, OnInit, output, viewChild, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ButtonCommonComponent } from '../../../common/button-common/button-common';
import { FormControlComponent } from '../../../common/form-control/form-control';


@Component({
  selector: 'app-new-ticket',
  imports: [CommonModule, ButtonCommonComponent, FormControlComponent, FormsModule],
  templateUrl: './new-ticket.html',
  styleUrl: './new-ticket.css',
})
export class NewTicketComponent implements OnInit, AfterViewInit {
    //@ViewChild('ticketForm') private ticketForm?: ElementRef<HTMLFormElement>;
  private ticketFormSignal = viewChild.required<ElementRef<HTMLFormElement>>('ticketForm');

  newTicket = output<{title: string, request: string}>();

  ngOnInit(): void {
    console.log('on init: not guaranteed the template has been initialized');
  }

  ngAfterViewInit(): void {
    console.log('After view init: guaranteed the template has been initialized');
  }

  onFormSubmit(form: HTMLFormElement, titleElem: HTMLInputElement, requestElem: HTMLTextAreaElement){
    console.log('form submit', titleElem.value, requestElem.value);
    form.reset();
  }

  onFormSubmit2(titleElem: HTMLInputElement, requestElem: HTMLTextAreaElement){
    console.log('form submit', titleElem.value, requestElem.value);
    //this.ticketForm?.nativeElement.reset();
    
    const ticket = {
      title: titleElem.value,
      request: requestElem.value
    };

    this.newTicket.emit(ticket);
    
    this.ticketFormSignal()?.nativeElement.reset();

  }

}
