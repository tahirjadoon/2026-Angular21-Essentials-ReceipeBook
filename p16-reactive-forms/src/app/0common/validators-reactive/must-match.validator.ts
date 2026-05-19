import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Validates that two form controls inside a FormGroup have the same value.
 * Example: password === confirmPassword
 */
export function mustMatch(otherControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) {
      return null; // parent not ready yet
    }

    const otherControl = control.parent.get(otherControlName);
    if (!otherControl) {
      return null; // other control not found
    }

    const value = control.value;
    const otherValue = otherControl.value;

    // Let required/minlength handle empty cases
    if (value === '' || otherValue === '') {
      return null;
    }

    return value === otherValue
      ? null
      : { mustMatch: true };
  }
}