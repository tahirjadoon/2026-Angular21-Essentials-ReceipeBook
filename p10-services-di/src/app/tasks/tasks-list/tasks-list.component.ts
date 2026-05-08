import { Component, signal } from '@angular/core';
import { TASK_STATUS_OPTIONS } from '../../model/task.model';
import { TaskItemComponent } from './task-item/task-item.component';

@Component({
  selector: 'app-tasks-list',
  imports: [TaskItemComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
})
export class TasksListComponent {
  selectedFilter = signal<string>('all');
  tasks = [];
  statusOptions = TASK_STATUS_OPTIONS;

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
