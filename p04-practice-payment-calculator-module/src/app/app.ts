import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./common/components/header.component/header.component";
import { UserInputComponent } from "./user-input.component/user-input.component";
import { InputData } from './common/caclculator/input-data.model';
import { CalculateInvestmentService } from './common/caclculator/calculate-investment.service';
import { AnnualData } from './common/caclculator/annual-data.model';
import { InvestmentResultsComponent } from "./investment-results.component/investment-results.component";

@Component({
  selector: 'app-root',
  //imports: [RouterOutlet, HeaderComponent, UserInputComponent, InvestmentResultsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: false,
})
export class App {
  protected readonly title = signal('p04-practice-payment-calculator-module');

  private calculateInestmentService: CalculateInvestmentService = inject(CalculateInvestmentService);

  //inputData: InputData = <InputData>{};

  //annualData: AnnualData[] = [];
  //annualData = signal<AnnualData[]>([]);

  /*  
  onCalculateInvestmentResults(inputData: InputData){
    const result = this.calculateInestmentService.calculateInvestmentResults(inputData);
    
    //this.annualData= result;
    //this.annualData.update(() => result);
    this.annualData.set(result);
  }
    */
}
