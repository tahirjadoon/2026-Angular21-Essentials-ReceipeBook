import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from "../places-container/places-container.component";
import { PlacesComponent } from "../places/places.component";
import { PlacesService } from '../../services/places.service';
import { Place } from '../../models/places-model';

@Component({
  selector: 'app-user-places',
  imports: [PlacesContainerComponent, PlacesComponent],
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
})
export class UserPlacesComponent implements OnInit {
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  
  error = signal<string>('');
  places = this.placesService.loadedUserPlaces; //signal<Place[] | undefined>(undefined);
  hasPlaces = computed(() => this.places() && this.places()!.length > 0);

  ngOnInit(): void {
    const getPlacesSubscription = this.placesService.loadUserPlaces().subscribe({
      //only handling error and complete. the service method has a tap which is pushing data to the signal, used above
      // next: (places) => {
      //   this.places.set(places);
      // },
      error: (error: Error) => {
        this.error.set(error.message);
      },
    });

    this.destroyRef.onDestroy(() => {
        getPlacesSubscription.unsubscribe();
    });

  }
  
}
