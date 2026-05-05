import { Component, inject, signal } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  email = signal('');
  password = signal('');

  private authServide = inject(AuthService)

  onSubmit(){
    this.authServide.authenticate(this.email(), this.password());
  }
}
