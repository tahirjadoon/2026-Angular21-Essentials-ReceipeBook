import { Injectable } from '@angular/core';
import { InputData } from './input-data.model';
import { AnnualData } from './annual-data.model';

@Injectable({
  providedIn: 'root',
})
export class CalculateInvestmentService {
  
  calculateInvestmentResults(data: InputData) {
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

    return annualData;
  }

}
