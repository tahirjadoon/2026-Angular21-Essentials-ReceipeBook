import { inject, Injectable, signal } from '@angular/core';
import { DUMMY_TASKS } from '../repo/dummy-tasks';
import { UserTaskData } from '../modals/user-task-data.mode';
import { UserTaskCreateData } from '../modals/user-task-create.model';
import { ToastMessageType } from '../../common/toast-custom/models/toast-message.model';
import { ToastMessageService } from '../../common/toast-custom/services/toast-message.service';
import { LocalStorageService } from '../../common/local-storage/local-storage.service';
import { LocalStorageKey } from '../../common/local-storage/local-storage-enum';

@Injectable({
  providedIn: 'root',
})
export class UserTaskDataService {
  private toastMessageService = inject(ToastMessageService);
  private localStorageService = inject(LocalStorageService);

  // -------------------------
  // TASKS (reactive, uses signals)
  // -------------------------
  //private initialTasks = DUMMY_TASKS;
  private readonly initialTasks: UserTaskData[] =
    this.localStorageService.getLocal<UserTaskData[]>(LocalStorageKey.UsersTasks) 
    ?? DUMMY_TASKS;

  //private writable signal
  private _tasks = signal<UserTaskData[]>([...this.initialTasks]);

  //public readonly signal if we need to use
  tasks = this._tasks.asReadonly();

  constructor() {
    //if storage was empty, persist the dummy tasks
    if (!this.localStorageService.getLocal<UserTaskData[]>(LocalStorageKey.UsersTasks) && this.initialTasks?.length > 0) {
      this.localStorageService.setLocal(LocalStorageKey.UsersTasks, this.initialTasks);
    }
  }

  private persist() {
    this.localStorageService.setLocal(LocalStorageKey.UsersTasks, this._tasks());
  }

  // Filtering stays in the service
  getTasksByUser(userId: string): UserTaskData[] {
    return this._tasks().filter(t => t.userId === userId);
  }

  addTask(userId: string, taskData: UserTaskCreateData): void {
    const maxId = this._tasks()
      .map(t => Number(t.id.replace('t', '')))
      .reduce((a, b) => Math.max(a, b), 0);

    const newTask: UserTaskData = {
      id: `t${maxId + 1}`,
      userId,
      ...taskData
    };

    this._tasks.update(t => [newTask, ...t]);
    this.persist();
    this.toastMessageService.show(ToastMessageType.Success, 'Task added successfully!');
  }

  completeTask(taskId: string): void {
    this._tasks.update(t => t.filter(task => task.id !== taskId));
    this.persist();
    this.toastMessageService.show(ToastMessageType.Success, 'Task completed successfully!');
  }

  getTasksCountByUser(userId: string): number {
    return this._tasks().filter(t => t.userId === userId).length;
  }
}
