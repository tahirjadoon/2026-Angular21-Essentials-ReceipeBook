import { Component, OnInit, signal } from '@angular/core';
import { UserDataService } from './common/data/services/user-data.service';
import { UserData } from './common/data/modals/user-data.model';

@Component({
  selector: 'app-root',
  //imports: [RouterOutlet, CommonModule, Header, User, UserTasks, ToastCustom],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: false
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
