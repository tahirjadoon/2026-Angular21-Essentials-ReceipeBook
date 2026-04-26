import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { User } from "./user/user";
import { CommonModule } from '@angular/common';
import { UserTasks } from "./user-tasks/user-tasks";
import { UserDataService } from './data/services/user-data.service';
import { UserData } from './data/modals/user-data.model';
import { ToastCustom } from "./common/toast-custom/toast-custom/toast-custom";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Header, User, UserTasks, ToastCustom],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  selectedUser: UserData = <UserData>{};
  users: UserData[] = [];
  //protected readonly title = signal('p02-essentials');

  constructor(private userDataService: UserDataService) {
    this.users = this.userDataService.getUsers();
  }

  ngOnInit() {
    const user = this.users[0];
    if(user) {
      this.selectedUser = user;
    }
  }

  onUserSelected(user: UserData) {
    if (user) {
      this.selectedUser = user;
    }
  }
}
