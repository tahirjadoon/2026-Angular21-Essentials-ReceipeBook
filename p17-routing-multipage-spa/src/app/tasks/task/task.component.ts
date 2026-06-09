import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { UserTaskDataService } from '../../_data/services/user-task-data.service';
import { CardComponent } from "../../_common/card.component/card.component";
import { UserTaskData } from '../../_data/modals/user-task-data.mode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [DatePipe, CardComponent],
})
export class TaskComponent {
  task = input.required<UserTaskData>();

  userId = input.required<string>();
  userName = input.required<string>();

  private tasksService = inject(UserTaskDataService);
  private router = inject(Router);

  onComplete() {
    this.tasksService.removeTask(this.task().id);

    //this.router.navigate(['/users', this.userId(), this.userName(), 'tasks'], { replaceUrl: true } );
  }
}
