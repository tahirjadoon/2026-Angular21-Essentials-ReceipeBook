import { Component, inject, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UserTaskData } from '../../data/modals/user-task-data.mode';
import { Card } from "../../common/card/card";
import { UserTaskDataService } from '../../data/services/user-task-data.service';

@Component({
  selector: 'app-user-task',
  imports: [DatePipe, Card],
  templateUrl: './user-task.html',
  styleUrl: './user-task.css',
})
export class UserTask {
  task = input.required<UserTaskData>();

  private userTaskDataService = inject(UserTaskDataService);

  onTaskComplete(){
    this.userTaskDataService.completeTask(this.task().id);
  }

}
