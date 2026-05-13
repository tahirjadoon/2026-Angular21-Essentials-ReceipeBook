import { Component, inject, input, output } from '@angular/core';
import { Place } from '../../models/places-model';
import { PlacesService } from '../../services/places.service';
import { TooltipDirective } from '../../../common/directives/tooltip.directive';

@Component({
  selector: 'app-places',
  imports: [TooltipDirective],
  templateUrl: './places.component.html',
  styleUrl: './places.component.css',
})
export class PlacesComponent {
  private placesService = inject(PlacesService);
  baseApiUrl: string = '';

  tooltipText = input<string>('');
  places = input.required<Place[]>();
  selectPlace = output<Place>();

  ngOnInit(): void {
    this.baseApiUrl = this.placesService.baseApiUrl;
  }

  onSelectPlace(place: Place) {
    this.selectPlace.emit(place);
  }
  
}
