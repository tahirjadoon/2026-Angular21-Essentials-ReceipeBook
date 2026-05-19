import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { UserTaskDataService } from '../../_data/services/user-task-data.service';
import { CardComponent } from "../../_common/card.component/card.component";
import { UserTaskData } from '../../_data/modals/user-task-data.mode';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [DatePipe, CardComponent],
})
export class TaskComponent {
  task = input.required<UserTaskData>();
  private tasksService = inject(UserTaskDataService);

  onComplete() {
    this.tasksService.removeTask(this.task().id);
  }
}
