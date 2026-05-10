import { Component } from '@angular/core';
import { NewTaskComponent } from "./new-task/new-task.component";
import { TasksListComponent } from "./tasks-list/tasks-list.component";

@Component({
  selector: 'app-tasks',
  imports: [NewTaskComponent, TasksListComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {}
