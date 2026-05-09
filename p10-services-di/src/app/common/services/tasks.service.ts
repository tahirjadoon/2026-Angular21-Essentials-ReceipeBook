import { Injectable, signal } from "@angular/core";
import { Task, TASK_STATUS, TaskInput, TaskStatus } from "../model/task.model";

@Injectable({ providedIn: 'root' })
export class TasksService{

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
  }  

  removeTask(taskId: string) {
    this._tasks.update(tasks => tasks.filter(t => t.id !== taskId));
  }

  updateTaskStatus(taskId: string, status: TaskStatus) {
    this._tasks.update(tasks =>
      tasks.map(t =>
        t.id === taskId ? { ...t, status } : t //not mutating but rather adding new data so that the signal emits change
      )
    );
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