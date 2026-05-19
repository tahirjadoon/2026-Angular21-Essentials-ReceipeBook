import { Component, inject } from '@angular/core';
import { UserComponent } from './user/user.component';
import { UserDataService } from '../_data/services/user-data.service';
import { TooltipDirective } from "../_common/directives/tooltip.directive";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  imports: [UserComponent, TooltipDirective],
})
export class UsersComponent {
  private usersService = inject(UserDataService);
  users = this.usersService.getUsers();
}
