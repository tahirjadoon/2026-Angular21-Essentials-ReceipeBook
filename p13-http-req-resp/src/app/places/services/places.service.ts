import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from '../models/places-model';
import { catchError, map, throwError } from 'rxjs';
import { ToastMessageService } from '../../common/toast-message/toast-message.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private toastMessageService = inject(ToastMessageService);

  baseApiUrl = 'http://localhost:3000';

  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(`${this.baseApiUrl}/places`, 'Something went wrong fetching available places. Please try again later.');
  }

  loadUserPlaces() {
    return this.fetchPlaces(`${this.baseApiUrl}/user-places`, 'Something went wrong fetching your favorite places. Please try again later.');
  }

  addPlaceToUserPlaces(placeId: string) {
    //put is looking for a body param.
    return this.httpClient.put<{ userPlaces: Place[] }>(`${this.baseApiUrl}/user-places`, { placeId: placeId })
    .pipe(
      map((resData) => resData.userPlaces),
      catchError((error) => {
        this.toastMessageService.error(error.message);
        return throwError(() => new Error('Something went wrong while adding place. Please try again later.'));
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
