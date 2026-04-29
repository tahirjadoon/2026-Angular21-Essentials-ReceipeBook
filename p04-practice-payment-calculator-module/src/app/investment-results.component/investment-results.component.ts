import { Component, computed, inject, input } from '@angular/core';
import { AnnualData } from '../common/caclculator/annual-data.model';
import { CurrencyPipe } from '@angular/common';
import { CalculateInvestmentService } from '../common/caclculator/calculate-investment.service';

@Component({
  selector: 'app-investment-results',
  //imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
  standalone: false,
})
export class InvestmentResultsComponent {
  private calculateInvestmentService: CalculateInvestmentService = inject(CalculateInvestmentService);
  //investmentResults = input.required<AnnualData[]>();

  /*
  hasResults = computed(() => {
    const results = this.investmentResults();
    return Array.isArray(results) && results.length > 0;
  });
  */

  /*
  get hasResults(): boolean {
    const results = this.investmentResults();
    return Array.isArray(results) && results.length > 0;
  }
  */

  //using signal
  investmentResults = this.calculateInvestmentService.getCalculatedResult;
  hasResults = this.calculateInvestmentService.hasCalculatedResult;
}

