import { Component, inject, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UserTaskData } from '../../common/data/modals/user-task-data.mode';
import { Card } from "../../common/components/card/card";
import { UserTaskDataService } from '../../common/data/services/user-task-data.service';

@Component({
  selector: 'app-user-task',
  //imports: [DatePipe, Card],
  templateUrl: './user-task.html',
  styleUrl: './user-task.css',
  standalone: false,
})
export class UserTask {
  task = input.required<UserTaskData>();

  private userTaskDataService = inject(UserTaskDataService);

  onTaskComplete(){
    this.userTaskDataService.completeTask(this.task().id);
  }

}
