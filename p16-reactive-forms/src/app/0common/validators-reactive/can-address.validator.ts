import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validates that the control value contains:
 * - Letters (A–Z, a–z)
 * - Accented/French letters (É, è, ç, ô, î, etc.)
 * - Numbers (0–9)
 * - Spaces
 * - Hyphens (-)
 *
 * Empty values return null so `Validators.required` can handle that case.
 */
export function canadianAddress(): ValidatorFn {
  // Includes accented letters using Unicode ranges
  const regex = /^[A-Za-z0-9À-ÖØ-öø-ÿ \-]+$/;

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Let required/minlength handle empty values
    if (value === null || value === undefined || value === '') {
      return null;
    }

    return regex.test(value)
      ? null
      : { canadianAddress: true };
  };
}
