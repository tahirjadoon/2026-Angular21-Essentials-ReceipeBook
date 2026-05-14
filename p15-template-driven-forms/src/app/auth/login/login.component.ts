import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule]
})
export class LoginComponent  {

  private storageIdentifier = 'tdfloginFormEmail';
  private form = viewChild.required<NgForm>('loginForm');
  private destroyRef = inject(DestroyRef);

  constructor(){

    //store the email as the user is typing in locastorage and then display it the next time user comes to the page
    afterNextRender(() => {

      const storedEmail = localStorage.getItem(this.storageIdentifier);
      if(storedEmail) { 
        const loginEmail = JSON.parse(storedEmail).email;
        setTimeout(() => { //wait 1ms
          //this.form().setValue({email: loginEmail, password: ''}); 
          this.form().controls['email'].setValue(loginEmail);
        }, 1);
      }

      const subscription = this.form().valueChanges?.pipe(
        debounceTime(500) //wait for 500ms before emitting the latest value, to avoid excessive localStorage updates
      ).subscribe({
        next: (value) => {
          //console.log('Form value changed:', value.email);
          localStorage.setItem(this.storageIdentifier, JSON.stringify({email: value.email}));
        }
      });

      this.destroyRef.onDestroy(() => {
        subscription?.unsubscribe();
      });

    });

  }

  onSubmit(loginForm: NgForm) {
    //console.log('Form submitted:', loginForm);
    if(loginForm.form.invalid) {
      loginForm.control.markAllAsTouched();
      return;
    }
    
    const email = loginForm.form.value.email;
    const password = loginForm.form.value.password;

    console.log(loginForm.form)
    console.log('Email:', email);
    console.log('Password:', password); 
    loginForm.form.reset();
  }

}
