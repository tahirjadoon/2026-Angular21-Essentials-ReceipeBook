import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InputData } from '../common/caclculator/input-data.model';

@Component({
  selector: 'app-user-input',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {

  inputData:InputData = { initialInvestment: 0, annualInvestment: 0, expectedReturnRate: 5, duration: 10 };

  calculate = output<InputData>();

  onNumberInput(event: any) {
    let value = event.target.value;

    // Remove all characters except digits, dot, minus
    value = value.replace(/[^0-9.-]/g, '');

    // If minus appears after the first character → remove it
    if (value.indexOf('-') > 0) {
      value = value.replace(/-/g, '');
    }

    // Allow only ONE minus
    const minusCount = (value.match(/-/g) || []).length;
    if (minusCount > 1) {
      value = value.replace(/-/g, '');
    }

    // Allow only ONE dot
    const dotCount = (value.match(/\./g) || []).length;
    if (dotCount > 1) {
      // keep the first dot, remove the rest
      const firstDotIndex = value.indexOf('.');
      value = value.substring(0, firstDotIndex + 1) +
              value.substring(firstDotIndex + 1).replace(/\./g, '');
    }

    // Dot cannot be the first character
    if (value.startsWith('.')) {
      value = value.substring(1);
    }

    event.target.value = value;
  }

  onFormSubmit(form: NgForm) {
    if(form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    
    this.calculate.emit(this.inputData);
  }
}
