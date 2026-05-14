import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule]
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });


  onSubmit() {
    console.log("Valid: ", this.loginForm.valid, 
                " Invalid: ", this.loginForm.invalid, 
                " Touched: ", this.loginForm.touched, 
                " Untouched: ", this.loginForm.untouched, 
                " Pristine: ", this.loginForm.pristine,
                " Dirty: ", this.loginForm.dirty );
    console.log("this.loginForm.value: ", this.loginForm.value);
    console.log("this.loginForm.get('email').value: ", this.loginForm.get('email')?.value);
    console.log("this.loginForm.controls['email'].value:", this.loginForm.controls['email'].value);
    console.log("this.loginForm.value.email: ", this.loginForm.value.email);
    console.log("this.loginForm.value.password: ", this.loginForm.value.password);
  }


}