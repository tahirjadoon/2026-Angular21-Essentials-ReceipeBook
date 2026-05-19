import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { mustContainQuestionMark } from '../../0common/validators-reactive/must-contain-question-mark.validator';
import { mustMatch } from '../../0common/validators-reactive/must-match.validator';
import { emailIsUnique } from '../../0common/validators-reactive/email-is-unique.validator';
import { positiveNumber } from '../../0common/validators-reactive/positive-number.validator';
import { postalCode } from '../../0common/validators-reactive/postal-code.validator';
import { canadianAddress } from '../../0common/validators-reactive/can-address.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule],
})
export class SignupComponent {

  private readonly destroyRef = inject(DestroyRef);

  /** Matches "How did you find us?" options in the template. */
  readonly sourceChoices = [
    { id: 'google', value: 'google', label: 'Google' },
    { id: 'friend', value: 'friend', label: 'Referred by friend' },
    { id: 'other', value: 'other', label: 'Other' },
  ] as const;

  signupForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailIsUnique()]
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6), Validators.pattern(/^[A-Za-z0-9?]+$/), mustContainQuestionMark()]
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, mustMatch('password')]
      }),
    }),
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    address: new FormGroup({
      street: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, canadianAddress()]
      }),
      number: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, positiveNumber()]
      }),
      postalCode: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, postalCode()]
      }),
      city: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, canadianAddress()]
      }),
    }),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('other', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    // How did you find us — built from `sourceChoices` (Google checked by default).
    source: new FormArray(
      this.sourceChoices.map((choice) =>
        new FormControl(choice.value === 'google', { nonNullable: true }),
      ),
    ),
    sourceOtherText: new FormControl('', { nonNullable: true }),
    // source: new FormArray([
    //   new FormControl(false),
    //   new FormControl(false),
    //   new FormControl(false),
    // ]),
    // Checkboxes are `false` when unchecked; `Validators.required` does not treat false as empty.
    // Use `requiredTrue` so only `true` (checked) is valid. Error key is still `required`.
    terms: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
  });

  get passwordGroup() {
    return this.signupForm.controls.passwords as FormGroup;
  }

  get addressGroup() {
    return this.signupForm.controls.address as FormGroup;
  }

  get sourceArray() {
    return this.signupForm.controls.source as FormArray<FormControl<boolean>>;
  }

  get sourceOtherTextCtrl() {
    return this.signupForm.controls.sourceOtherText;
  }

  get otherSourceIndex(): number {
    return this.sourceChoices.findIndex((c) => c.value === 'other');
  }

  get isOtherSourceChecked(): boolean {
    const idx = this.otherSourceIndex;
    return idx >= 0 && this.sourceArray.at(idx).value;
  }

  constructor() {
    const otherCheckbox = this.sourceArray.at(this.otherSourceIndex);
    otherCheckbox.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((checked) => this.setSourceOtherTextValidators(checked));
  }

  fillDefaults(): void {
    this.signupForm.reset();
    this.signupForm.patchValue({
      email: 'demo.user@example.org',
      passwords: {
        password: 'pass12?',
        confirmPassword: 'pass12?',
      },
      firstName: 'Jane',
      lastName: 'Doe',
      address: {
        street: 'Main Street',
        number: '42',
        postalCode: 'K1A 0B1',
        city: 'Ottawa',
      },
      role: 'student',
      source: this.sourceChoices.map((choice) => choice.value === 'google'),
      sourceOtherText: '',
      terms: true,
    });
    this.setSourceOtherTextValidators(false);
    this.signupForm.markAllAsDirty();
    this.signupForm.updateValueAndValidity();
  }

  setSourceOtherTextValidators(required: boolean): void {
    const ctrl = this.sourceOtherTextCtrl;
    if (required) {
      ctrl.setValidators([Validators.required]);
    } else {
      ctrl.clearValidators();
      ctrl.setValue('');
    }
    ctrl.updateValueAndValidity();
  }

  onSubmit() {
    console.log("Valid: ", this.signupForm.valid,
      " Invalid: ", this.signupForm.invalid,
      " Touched: ", this.signupForm.touched,
      " Untouched: ", this.signupForm.untouched,
      " Pristine: ", this.signupForm.pristine,
      " Dirty: ", this.signupForm.dirty,
      " Value: ", this.signupForm.value);

    console.log('Sign up form');
    console.log(this.signupForm.value);
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.signupForm.reset();
    this.setSourceOtherTextValidators(false);
  }
}
