import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Place } from '../../models/places-model';
import { PlacesContainerComponent } from "../places-container/places-container.component";
import { PlacesComponent } from "../places/places.component";
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-available-places',
  imports: [PlacesContainerComponent, PlacesComponent],
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
})
export class AvailablePlacesComponent implements OnInit {
  
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  
  error = signal<string>('');
  places = signal<Place[] | undefined>(undefined);

  hasPlaces = computed(() => this.places() && this.places()!.length > 0);

  ngOnInit(): void {
    const getPlacesSubscription = this.placesService.loadAvailablePlaces().subscribe({
      next: (places) => {
        this.places.set(places);
      },
      error: (error: Error) => {
        this.error.set(error.message);
      },
    });

    this.destroyRef.onDestroy(() => {
        getPlacesSubscription.unsubscribe();
    });

  }

  onSelectPlace(selectedPlace: Place) {
    const addPlaceSubscription = this.placesService.addPlaceToUserPlaces(selectedPlace.id).subscribe({
      next: (userPlaces: Place[]) => {
        console.log(userPlaces);
      },
      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.error.set('');
      }
    });
    this.destroyRef.onDestroy(() => {
      addPlaceSubscription.unsubscribe();
    });
  }

}
