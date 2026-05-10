import { Component, computed, inject, signal } from '@angular/core';
import { TASK_STATUS_OPTIONS } from '../../common/model/task.model';
import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../../common/services/tasks.service';

@Component({
  selector: 'app-tasks-list',
  imports: [TaskItemComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
})
export class TasksListComponent {
  private tasksService = inject(TasksService);

  private selectedFilter = signal<string>('all');
  statusOptions = TASK_STATUS_OPTIONS;

  tasks = computed(() => {
    const filter = this.selectedFilter();
    const tasks = this.tasksService.getTasks();
    
    if(filter === 'all') return tasks;

    return tasks.filter(t => t.status === filter);
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
