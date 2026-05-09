import { Component, computed, inject, input } from '@angular/core';
import { Task, TASK_STATUS, TASK_STATUS_FALLBACK_LABEL, TASK_STATUS_LABELS, TASK_STATUS_OPTIONS, TaskStatus } from '../../../common/model/task.model';
import { TasksService } from '../../../common/services/tasks.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  imports: [FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  private tasksService = inject(TasksService);

  task = input.required<Task>();
  taskStatusConst = TASK_STATUS;
  statusOptions = TASK_STATUS_OPTIONS;

  taskStatus = computed(() => 
    TASK_STATUS_LABELS[this.task().status] ?? TASK_STATUS_FALLBACK_LABEL
  );

  onChangeTaskStatus(taskId: string, status: string) {
    if(status === this.task().status) return;
    const newStatus: TaskStatus = status as TaskStatus;
    this.tasksService.updateTaskStatus(taskId, newStatus);
  }


}
