import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InputData } from '../common/caclculator/input-data.model';

@Component({
  selector: 'app-user-input',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {

  initialInputData: InputData = { initialInvestment: 0, annualInvestment: 0, expectedReturnRate: 5, duration: 10 };

  inputData:InputData = {...this.initialInputData};
  //inputData = signal<InputData>(this.initialInputData);

  calculate = output<InputData>();

  onFormSubmit(form: NgForm) {
    if(form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    
    this.calculate.emit(this.inputData);
    
    this.inputData = {...this.initialInputData};
    
  }
}
