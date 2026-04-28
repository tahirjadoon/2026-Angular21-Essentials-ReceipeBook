import { computed, Injectable, signal } from '@angular/core';
import { InputData } from './input-data.model';
import { AnnualData } from './annual-data.model';

@Injectable({
  providedIn: 'root',
})
export class CalculateInvestmentService {

  //private writable signal
  private _annualData = signal<AnnualData[]>([]);
  
  //public readonly signal if we need to use
  annualData = this._annualData.asReadonly();

  //called by thhe user-input component
  calculateInvestmentResults(data: InputData): void {
    const annualData:AnnualData[] = [];
    let investmentValue = data.initialInvestment;

    for (let i = 0; i < data.duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (data.expectedReturnRate / 100);
      investmentValue += interestEarnedInYear + data.annualInvestment;
      const totalInterest = investmentValue -  data.annualInvestment * year - data.initialInvestment;
      
      const calculated: AnnualData = {
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: data.annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: data.initialInvestment + data.annualInvestment * year,
      }
      annualData.push(calculated);

    }

    this._annualData.set(annualData);
  }

  //used inside investment-results component to get the calculated result
  getCalculatedResult = computed(() => this._annualData());

  hasCalculatedResult = computed(() => this._annualData().length > 0);

}
