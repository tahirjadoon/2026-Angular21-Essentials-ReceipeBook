import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemperaturePipe } from './pipes/temperature.pipe';
import { TEMP_UNITS } from './models/temperature.model';
import { SortArrayPipe } from './pipes/sort-array.pipe';
import { SORT_ORDER } from './models/sortOrder.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DatePipe, DecimalPipe, TemperaturePipe, SortArrayPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('p09-pipes');

  tempUnits = TEMP_UNITS;
  sortOrder = SORT_ORDER;


  currentDate = new Date();
  currentTemperaturs = {
    berlin: 4.2749812,
    newYork: 18.1214,
    paris: 72.1209001,
    chicago: 65.0775238,
  };

  historicTemperatures = [
    25, 37, 19, -4, 28, 21, 19, 28, 33, 31, 9, 11, 5, -12, -5,
  ];

  onReset(index: number) {
    //since we have a sort pipe applied, we need to change the array as a whole or the click result will not be updated
    this.historicTemperatures[index] = 18;

    //applied pure=false to the pipe so above will not work again
    // const newTemps = [...this.historicTemperatures];
    // newTemps[index] = 18;
    // this.historicTemperatures = newTemps;
  }

}
