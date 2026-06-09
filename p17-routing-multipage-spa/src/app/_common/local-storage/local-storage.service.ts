import { inject, Injectable } from '@angular/core';
import { LocalStorageKey } from './local-storage-enum';
import { ToastMessageService } from '../toast-message/toast-message.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private toastMessageService = inject(ToastMessageService);


  // ---------- Local Storage ----------
  setLocal<T>(key: LocalStorageKey, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocal<T>(key: LocalStorageKey): T | null {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    
    try {
      return JSON.parse(raw) as T;
    } catch {
      this.toastMessageService.error(`Error occurred while parsing local storage for key: ${key}`);
      return null;
    }
  }

  removeLocal(key: LocalStorageKey): void {
    localStorage.removeItem(key);
  }

  clearLocal(): void {
    localStorage.clear();
  }

  // ---------- Session Storage ----------
  setSession<T>(key: LocalStorageKey, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getSession<T>(key: LocalStorageKey): T | null {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as T;
    } catch {
      this.toastMessageService.error(`Error occurred while parsing session storage for key: ${key}`);
      return null;
    }
  }

  removeSession(key: LocalStorageKey): void {
    sessionStorage.removeItem(key);
  }

  clearSession(): void {
    sessionStorage.clear();
  }
}
