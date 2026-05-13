import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from '../models/places-model';
import { catchError, map, tap, throwError } from 'rxjs';
import { ToastMessageService } from '../../common/toast-message/toast-message.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private toastMessageService = inject(ToastMessageService);

  baseApiUrl = 'http://localhost:3000';

  private _userPlaces = signal<Place[]>([]);
  loadedUserPlaces = this._userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(`${this.baseApiUrl}/places`, 'Something went wrong fetching available places. Please try again later.');
  }

  loadUserPlaces() {
    return this.fetchPlaces(`${this.baseApiUrl}/user-places`, 'Something went wrong fetching your favorite places. Please try again later.')
    .pipe(
      //execute like subscribing but without sbscribing
      tap({
        next: (userPlaces) => {
          this._userPlaces.set(userPlaces);
        },

      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const previousPlaces = this._userPlaces();
    if(!previousPlaces.some(p => p.id === place.id)){
      // 1. Optimistic update
      this._userPlaces.set([...previousPlaces, place]);
    }
    else{
      this.toastMessageService.error("The place is already added to your favorite places.");
    }
    
    //put is looking for a body param.
    return this.httpClient.put<{ userPlaces: Place[] }>(`${this.baseApiUrl}/user-places`, { placeId: place.id })
    .pipe(
      map((resData) => resData.userPlaces),

      // 2. Rollback on error
      catchError((error) => {
        this._userPlaces.set(previousPlaces);
        this.toastMessageService.error(error.message);
        return throwError(() => new Error('Something went wrong while adding place. Please try again later.'));
      }),
      // 3. Final sync ONLY if backend differs
      tap({
        next: (userPlaces) => {
          const current = this._userPlaces();
          if (JSON.stringify(current) !== JSON.stringify(userPlaces)) {
            this._userPlaces.set(userPlaces);
          }
        },
      })
    );
  }

  removeUserPlace(place: Place) {}

  private fetchPlaces(url: string, errorMessage: string){
    return this.httpClient.get<{ places: Place[] }>(url)
    .pipe(
      map((resData) => resData.places), 
      catchError((error) => {
        this.toastMessageService.error(error.message);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
