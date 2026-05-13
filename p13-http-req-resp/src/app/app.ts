import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvailablePlacesComponent } from './places/components/available-places/available-places.component';
import { UserPlacesComponent } from './places/components/user-places/user-places.component';
import { ErrorService } from './common/error-modal/error.ervice';
import { ErrorModalComponent } from "./common/error-modal/error-modal.component/error-modal.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AvailablePlacesComponent, UserPlacesComponent, ErrorModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('p13-http-req-resp');

  private errorService = inject(ErrorService);

  //signal
  error = this.errorService.error;
}
