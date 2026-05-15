import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Validates that two form controls inside a FormGroup have the same value.
 * Example: password === confirmPassword
 */
export function mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const control = group.get(controlName);
    const matchingControl = group.get(matchingControlName);

    if(!control || !matchingControl)  return null; // controls not found in the group

    const value = control.value;
    const matchingValue = matchingControl.value;

    // don't validate if either control is empty
    if(value === '' || matchingValue === '') return null; 

    return value === matchingValue ? null : { mustMatch: true };
  }
}