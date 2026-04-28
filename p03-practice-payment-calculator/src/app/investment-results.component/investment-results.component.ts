import { Component, computed, input } from '@angular/core';
import { AnnualData } from '../common/caclculator/annual-data.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-investment-results',
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {
  investmentResults = input.required<AnnualData[]>();
  
  /*
  hasResults = computed(() => {
    const results = this.investmentResults();
    return Array.isArray(results) && results.length > 0;
  });
  */

  get hasResults(): boolean {
    const results = this.investmentResults();
    return Array.isArray(results) && results.length > 0;
  }

}

