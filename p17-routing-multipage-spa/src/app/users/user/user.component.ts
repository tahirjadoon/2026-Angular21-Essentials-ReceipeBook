import { Component, computed, inject, input } from '@angular/core';
import { UserData } from '../../_data/modals/user-data.model';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { UtilityService } from '../../_common/services/util.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports: [RouterLink, RouterLinkActive],
})
export class UserComponent {
  user = input.required<UserData>();
  utilService = inject(UtilityService);

  imagePath = computed(() => 'users/' + this.user().avatar);

  slugify(name: string): string {
    return this.utilService.slugify(name);
  }
}
