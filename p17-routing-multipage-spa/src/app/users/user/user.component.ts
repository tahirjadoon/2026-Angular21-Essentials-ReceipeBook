import { Component, computed, inject, input } from '@angular/core';
import { UserData } from '../../_data/modals/user-data.model';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { UtilityService } from '../../_common/services/util.service';
import { UserTaskDataService } from '../../_data/services/user-task-data.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports: [RouterLink, RouterLinkActive],
})
export class UserComponent {
  user = input.required<UserData>();
  utilService = inject(UtilityService);

  private usertaskdataService = inject(UserTaskDataService);


  imagePath = computed(() => 'users/' + this.user().avatar);

  slugify(name: string): string {
    return this.utilService.slugify(name);
  }

  
  taskCount = computed(() => {
    const userData = this.user();
    const count = this.usertaskdataService.getTasksCountByUser(userData.id) || 0;
    //console.log(userData.id, ' = ' ,count);
    return count;
  });
  
  /*
  taskCount = computed(() => {
    this.usertaskdataService.tasks(); // establish dependency
    return this.usertaskdataService.getTasksCountByUser(this.user().id);
  });
  */
}
