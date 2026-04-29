import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InputData } from '../common/caclculator/input-data.model';
import { CalculateInvestmentService } from '../common/caclculator/calculate-investment.service';

@Component({
  selector: 'app-user-input',
  //imports: [FormsModule, CommonModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
  standalone: false,
})
export class UserInputComponent {
  private calculateInvestmentService: CalculateInvestmentService = inject(CalculateInvestmentService);

  initialInputData: InputData = { initialInvestment: 0, annualInvestment: 0, expectedReturnRate: 5, duration: 10 };

  inputData:InputData = {...this.initialInputData};
  //inputData = signal<InputData>(this.initialInputData);

  //calculate = output<InputData>();

  onFormSubmit(form: NgForm) {
    if(form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    
    // this.calculate.emit(this.inputData);
    this.calculateInvestmentService.calculateInvestmentResults(this.inputData);
    
    this.inputData = {...this.initialInputData};
    
  }
}
