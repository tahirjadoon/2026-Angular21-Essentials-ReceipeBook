import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Place } from '../../models/places-model';
import { PlacesContainerComponent } from "../places-container/places-container.component";
import { PlacesComponent } from "../places/places.component";
import { PlacesService } from '../../services/places.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-available-places',
  imports: [PlacesContainerComponent, PlacesComponent],
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
})
export class AvailablePlacesComponent implements OnInit {
  
  private httpClient = inject(HttpClient);
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  private baseApiUrl: string = this.placesService.baseApiUrl;
  
  error = signal<string>('');
  places = signal<Place[] | undefined>(undefined);

  hasPlaces = computed(() => this.places() && this.places()!.length > 0);

  ngOnInit(): void {
    const getPlacesSubscription = this.httpClient.get<{ places: Place[] }>(`${this.baseApiUrl}/places`)
    .pipe(
      map((resData) => resData.places), 
      catchError((error) => {
        console.error(error.message);
        return throwError(() => new Error('Something went wrong while fetching places. Please try again later.'));
      })
    )
    .subscribe({
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
    //put is looking for a body param.
    this.httpClient.put<{ userPlaces: Place[] }>(`${this.baseApiUrl}/user-places`, { placeId: selectedPlace.id })
    .pipe(
      map((resData) => resData.userPlaces),
      catchError((error) => {
        console.error(error.message);
        return throwError(() => new Error('Something went wrong while adding place. Please try again later.'));
      })
    )
    .subscribe({
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
  }

}
