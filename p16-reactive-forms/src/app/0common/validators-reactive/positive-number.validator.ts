import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validates that the control value is a positive number (> 0).
 * Empty values return null so `Validators.required` can handle that case.
 */
export function positiveNumber(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Let required/min validators handle empty values
    if (value === null || value === undefined || value === '') {
      return null;
    }

    const num = Number(value);

    return !isNaN(num) && num > 0
      ? null
      : { positiveNumber: true };
  };
}
