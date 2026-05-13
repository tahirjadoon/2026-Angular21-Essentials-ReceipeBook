import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

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
  private httpClient = inject(HttpClient);
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  private baseApiUrl: string = this.placesService.baseApiUrl;
  
  error = signal<string>('');
  places = signal<Place[] | undefined>(undefined);
  hasPlaces = computed(() => this.places() && this.places()!.length > 0);

  ngOnInit(): void {
    const getPlacesSubscription = this.httpClient.get<{ places: Place[] }>(`${this.baseApiUrl}/user-places`)
    .pipe(
      map((resData) => resData.places), 
      catchError((error) => {
        console.error(error.message);
        return throwError(() => new Error('Something went wrong fetching your favorite places. Please try again later.'));
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
  
}
