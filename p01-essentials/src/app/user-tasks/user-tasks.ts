import { Component, computed, effect, input} from '@angular/core';
import { UserData } from '../data/modals/user-data.model';
import { UserTask } from "./user-task/user-task";
import { UserTaskData } from '../data/modals/user-task-data.mode';
import { UserNewTask } from "./user-new-task/user-new-task";
import { UserTaskDataService } from '../data/services/user-task-data.service';

@Component({
  selector: 'app-user-tasks',
  imports: [UserTask, UserNewTask],
  templateUrl: './user-tasks.html',
  styleUrl: './user-tasks.css',
})
export class UserTasks {
  user = input.required<UserData>();
  //userTasks: UserTaskData[] = []; 
  isAddingTask: boolean = false;

  constructor(private userTaskDataService: UserTaskDataService) {

    /*
    //since signals is used to get the user from the child
    effect(() => {
      const currentUser = this.user();   // read the signal
      if (currentUser) {
        this.userTasks = this.userDataService.getTasksByUser(currentUser.id);
      }
    });
    */
  }

  /*
    when tasks will be completed or added then these will get refreshed, old way of subject subscribe
    */
  userTasks = computed(() => {
      const currentUser = this.user();
      return this.userTaskDataService.getTasksByUser(currentUser.id);
    });

  /*
  get getUserTasks(): UserTaskData[] {
    return this.userTaskDataService.getTasksByUser(this.user().id);
  }
  */

  onStartAddTask(){
    this.isAddingTask = true;
  }

  onCloseDialog(){
    this.isAddingTask = false;
  }

}
