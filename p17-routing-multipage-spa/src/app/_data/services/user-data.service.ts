import { inject, Injectable } from "@angular/core";
import { UserData } from "../modals/user-data.model";
import { DUMMY_USERS } from "../repo/dummy-users";
import { ToastMessageService } from "../../_common/toast-message/toast-message.service";
import { LocalStorageService } from "../../_common/local-storage/local-storage.service";
import { LocalStorageKey } from "../../_common/local-storage/local-storage-enum";

@Injectable({ providedIn: 'root' })
export class UserDataService {
    private toastMessageService = inject(ToastMessageService);
    private localStorageService = inject(LocalStorageService);

  // -------------------------
  // USERS (static, no signals)
  // -------------------------
  private users: UserData[] = DUMMY_USERS;
  private _users: UserData[] = [];

  constructor() {
    const users = this.localStorageService.getLocal<UserData[]>(LocalStorageKey.Users);
    if(users && users.length > 0) {
      this._users = users;
    } else {
      this._users = DUMMY_USERS;
      this.localStorageService.setLocal(LocalStorageKey.Users, DUMMY_USERS);
    } 
  }

  getUsers(): UserData[] {
    return this._users;
  }

  getUserById(id: string): UserData | undefined {
    return this._users.find(user => user.id === id);
  }

  getUserByName(name: string): UserData | undefined {
    return this._users.find(user => user.name.toLowerCase() === name.toLowerCase());
  }

  
}
