import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validates Canadian postal codes in formats:
 * - A1A1A1
 * - A1A 1A1
 */
export function postalCode(): ValidatorFn {
  // Canada Post official pattern (space optional)
  const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/;

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Let required validator handle empty values
    if (!value) {
      return null;
    }

    return postalCodeRegex.test(value)
      ? null
      : { postalCode: true };
  };
}
