import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('other', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    // Checkboxes are `false` when unchecked; `Validators.required` does not treat false as empty.
    // Use `requiredTrue` so only `true` (checked) is valid. Error key is still `required`.
    terms: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
  });

  get passwordGroup() {
    return this.signupForm.controls.passwords as FormGroup;
  }

  onSubmit() {
    console.log("Valid: ", this.signupForm.valid,
      " Invalid: ", this.signupForm.invalid,
      " Touched: ", this.signupForm.touched,
      " Untouched: ", this.signupForm.untouched,
      " Pristine: ", this.signupForm.pristine,
      " Dirty: ", this.signupForm.dirty,
      " Value: ", this.signupForm.value);

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.signupForm.reset();
  }
}
