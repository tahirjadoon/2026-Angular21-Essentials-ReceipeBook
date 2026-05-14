import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Requires the control value to include at least one `?` character.
 * Empty values return null so `Validators.required` can own that case.
 */
export function mustContainQuestionMark(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null;
    }
    return typeof value === 'string' && value.includes('?')
      ? null
      : { mustContainQuestionMark: true };
  };
}
