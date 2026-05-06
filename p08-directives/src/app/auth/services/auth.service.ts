import { Injectable, signal } from '@angular/core';
import { DefaultUserInfo, Permission, PERMISSION_TYPES } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _defaultUsers: DefaultUserInfo = {
    admin: {
      email: 'admin@example.com',
      password: 'admin',
    },
    user: {
      email: 'user@example.com',
      password: 'user',
    },
    guest: {
      email: 'guest@example.com',
      password: 'guest',
    }
  };

  private _activePermission = signal<Permission>(PERMISSION_TYPES.guest);
  activePermission = this._activePermission.asReadonly();


  authenticate(email: string, password: string){
    console.log(email, password);
    
    let permission: Permission= PERMISSION_TYPES.guest;

    if (email === this._defaultUsers.admin.email && password === this._defaultUsers.admin.password) {
      permission = PERMISSION_TYPES.admin;
    } else if (email === this._defaultUsers.user.email && password === this._defaultUsers.user.password) {
      permission = PERMISSION_TYPES.user;
    } else {
      permission = PERMISSION_TYPES.guest;
    }

    this._activePermission.set(permission);
  }

  hasPermission(permission: Permission){
    return this._activePermission() === permission;
  }

  isAdmin = () => this._activePermission() === PERMISSION_TYPES.admin;
  isUser = () => this._activePermission() === PERMISSION_TYPES.user;
  isGuest = () => this._activePermission() === PERMISSION_TYPES.guest;

  logout(){
    this._activePermission.set(PERMISSION_TYPES.guest);
  }
  
}
