import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvailablePlacesComponent } from './places/components/available-places/available-places.component';
import { UserPlacesComponent } from './places/components/user-places/user-places.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AvailablePlacesComponent, UserPlacesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('p13-http-req-resp');
}
