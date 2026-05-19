import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { type Task } from './task.model';
import { UserTaskDataService } from '../../_data/services/user-task-data.service';
import { CardComponent } from "../../_common/card.component/card.component";

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [DatePipe, CardComponent],
})
export class TaskComponent {
  task = input.required<Task>();
  private tasksService = inject(UserTaskDataService);

  onComplete() {
    this.tasksService.removeTask(this.task().id);
  }
}
