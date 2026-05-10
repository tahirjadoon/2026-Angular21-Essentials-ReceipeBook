import { inject, Injectable, signal } from "@angular/core";
import { Task, TASK_STATUS, TaskInput, TaskStatus } from "../model/task.model";
import { ToastMessageService } from "./toast-message.service";
import { TOAST_MESSAGE_TYPE } from "../model/toast-message.model";

@Injectable({ providedIn: 'root' })
export class TasksService{
  private toastService = inject(ToastMessageService);

  private _tasks = signal<Task[]>([]);
  private tasks = this._tasks.asReadonly();

  getTasks(){
    return this.tasks(); //readonly returned
  }

  getTask(taskId: string){
    return this.tasks().find(t => t.id === taskId); //read only returned
  }

  addTask(taskData: TaskInput){
    const newId = this.generateId();

    const newTask: Task = {
      id: newId,
      title: taskData.title,
      description: taskData.description,
      status: TASK_STATUS.open,
    };

    this._tasks.update(tasks => [...tasks, newTask]); //not mutating but rather adding new data so that the signal emits change
    this.toastService.show(TOAST_MESSAGE_TYPE.Success, 'Task added successfully!');
  }  

  removeTask(taskId: string) {
    this._tasks.update(tasks => tasks.filter(t => t.id !== taskId));
    this.toastService.show(TOAST_MESSAGE_TYPE.Success, 'Task removed successfully!');
  }

  updateTaskStatus(taskId: string, status: TaskStatus) {
    this._tasks.update(tasks =>
      tasks.map(t =>
        t.id === taskId ? { ...t, status } : t //not mutating but rather adding new data so that the signal emits change
      )
    );
    this.toastService.show(TOAST_MESSAGE_TYPE.Success, 'Task updated successfully!');
  }

  private generateId(): string {
    const tasks = this._tasks();

    if (tasks.length === 0) return 't1';

    const maxNum = tasks
      .map(t => Number(t.id.replace('t', '')))
      .reduce((a, b) => Math.max(a, b), 0);

    return `t${maxNum + 1}`;
  }

}