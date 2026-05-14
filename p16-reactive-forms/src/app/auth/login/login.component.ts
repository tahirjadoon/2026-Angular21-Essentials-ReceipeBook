import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule]
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6), Validators.pattern(/^[A-Za-z0-9]+$/)] }),
  });

  constructor(){
    this.loginForm.updateValueAndValidity();
  }

  ngOnInit(): void {
    console.log("Valid: ", this.loginForm.valid,
      " Invalid: ", this.loginForm.invalid,
      " Touched: ", this.loginForm.touched,
      " Untouched: ", this.loginForm.untouched,
      " Pristine: ", this.loginForm.pristine,
      " Dirty: ", this.loginForm.dirty);
  }

  get emailCtrl() {
    return this.loginForm.controls.email;
  }
  get emailIsInvalid(){
    const emailCtrl = this.loginForm.controls.email;
    return emailCtrl.invalid && emailCtrl.dirty && emailCtrl.touched;
  }

  get passwordCtrl() {
    return this.loginForm.controls.password;
  }
  get passwordIsInvalid(){
    const passwordCtrl = this.loginForm.controls.password;
    return passwordCtrl.invalid && passwordCtrl.dirty && passwordCtrl.touched;
  }

  onSubmit() {
    console.log("Valid: ", this.loginForm.valid,
      " Invalid: ", this.loginForm.invalid,
      " Touched: ", this.loginForm.touched,
      " Untouched: ", this.loginForm.untouched,
      " Pristine: ", this.loginForm.pristine,
      " Dirty: ", this.loginForm.dirty);
    console.log("this.loginForm.value: ", this.loginForm.value);
    console.log("this.loginForm.get('email').value: ", this.loginForm.get('email')?.value);
    console.log("this.loginForm.controls['email'].value:", this.loginForm.controls['email'].value);
    console.log("this.loginForm.value.email: ", this.loginForm.value.email);
    console.log("this.loginForm.value.password: ", this.loginForm.value.password);

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loginForm.reset();
  }


}