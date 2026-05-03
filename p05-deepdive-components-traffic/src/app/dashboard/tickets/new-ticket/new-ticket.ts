import { Component, ElementRef, viewChild, ViewChild } from '@angular/core';
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
export class NewTicketComponent {

  //@ViewChild('ticketForm') private ticketForm?: ElementRef<HTMLFormElement>;
  private ticketFormSignal = viewChild.required<ElementRef<HTMLFormElement>>('ticketForm');


  onFormSubmit(form: HTMLFormElement, titleElem: HTMLInputElement, requestElem: HTMLTextAreaElement){
    console.log('form submit', titleElem.value, requestElem.value);
    form.reset();
  }

  onFormSubmit2(titleElem: HTMLInputElement, requestElem: HTMLTextAreaElement){
    console.log('form submit', titleElem.value, requestElem.value);
    //this.ticketForm?.nativeElement.reset();
    this.ticketFormSignal()?.nativeElement.reset();
  }

}
