import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';

/** Dummy address treated as already taken (simulates existing user). */
const TAKEN_DUMMY_EMAIL = 'test@example.com';

/**
 * Dummy async check: `test@example.com` is considered not unique.
 * Uses a short delay to simulate a server round-trip.
 */
export function emailIsUnique(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const raw = control.value;
    if (typeof raw !== 'string' || raw.trim() === '') {
      return of(null);
    }

    const normalized = raw.trim().toLowerCase();

    return timer(450).pipe(
      map((): ValidationErrors | null =>
        normalized === TAKEN_DUMMY_EMAIL ? { emailIsUnique: true } : null,
      ),
    );
  };
}
