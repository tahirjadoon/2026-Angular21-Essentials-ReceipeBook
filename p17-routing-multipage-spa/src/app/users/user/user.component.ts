import { Component, computed, input } from '@angular/core';
import { UserData } from '../../_data/modals/user-data.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  user = input.required<UserData>();

  imagePath = computed(() => 'users/' + this.user().avatar);
}
