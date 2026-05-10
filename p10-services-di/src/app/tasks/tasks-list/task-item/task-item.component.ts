import { Component, computed, inject, input, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TASK_STATUS, TASK_STATUS_FALLBACK_LABEL, TASK_STATUS_LABELS, TASK_STATUS_OPTIONS, TaskStatus } from '../../../common/model/task.model';
import { TasksService } from '../../../common/services/tasks.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent implements OnInit {
  private tasksService = inject(TasksService);

  task = input.required<Task>();
  taskStatusConst = TASK_STATUS;
  statusOptions = TASK_STATUS_OPTIONS;
  selectedStatus = signal<TaskStatus | null>(null);

  taskStatus = computed(() => 
    TASK_STATUS_LABELS[this.task().status] ?? TASK_STATUS_FALLBACK_LABEL
  );

  isStatusDisabled = computed(() => {
    const selected = this.selectedStatus();
    return selected === null ? true : selected === this.task().status;
  });

  selectedStatusColor = computed(() => {
    const status = this.selectedStatus();
    if (!status) return '#575754';
    if (status === this.taskStatusConst.open) return '#f8d63c';
    if (status === this.taskStatusConst.inprogress) return '#3ceff8';
    if (status === this.taskStatusConst.done) return '#c484fc';
    return '#575754';
  });

  ngOnInit() {
    this.selectedStatus.set(this.task().status);
  }

  onStatusChange(status: string) {
    this.selectedStatus.set(status as TaskStatus);
  }

  onChangeTaskStatus(taskId: string) {
    const newStatus = this.selectedStatus();
    if (!newStatus || newStatus === this.task().status) return;
    this.tasksService.updateTaskStatus(taskId, newStatus);
    this.selectedStatus.set(this.task().status);
  }

}
