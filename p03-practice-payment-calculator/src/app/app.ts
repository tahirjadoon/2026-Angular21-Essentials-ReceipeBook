import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./common/components/header.component/header.component";
import { UserInputComponent } from "./user-input.component/user-input.component";
import { InputData } from './common/caclculator/input-data.model';
import { CalculateInvestmentService } from './common/caclculator/calculate-investment.service';
import { AnnualData } from './common/caclculator/annual-data.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, UserInputComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('p03-practice-payment-calculator');

  private calculateInestmentService: CalculateInvestmentService = inject(CalculateInvestmentService);

  inputData: InputData = <InputData>{};
  annualData: AnnualData[] = [];

  onCalculateInvestmentResults(inputData: InputData){
    this.inputData = inputData;
    const result = this.calculateInestmentService.calculateInvestmentResults(inputData);
    this.annualData = result;
  }
}
