import { Component } from '@angular/core';
import { ButtonCommonComponent } from '../../../common/button-common/button-common';
import { FormControlComponent } from '../../../common/form-control/form-control';

@Component({
  selector: 'app-new-ticket',
  imports: [ButtonCommonComponent, FormControlComponent],
  templateUrl: './new-ticket.html',
  styleUrl: './new-ticket.css',
})
export class NewTicketComponent {}
