import { Component, computed, signal } from '@angular/core';
import { Place } from '../../models/places-model';
import { PlacesContainerComponent } from "../places-container/places-container.component";
import { PlacesComponent } from "../places/places.component";

@Component({
  selector: 'app-available-places',
  imports: [PlacesContainerComponent, PlacesComponent],
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
})
export class AvailablePlacesComponent {
  places = signal<Place[] | undefined>(undefined);

  hasPlaces = computed(() => this.places() && this.places()!.length > 0);


}
