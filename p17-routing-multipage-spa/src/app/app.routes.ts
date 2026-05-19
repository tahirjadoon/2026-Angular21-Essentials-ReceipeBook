import { Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { TasksComponent } from './tasks/tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';

export const routes: Routes = [
  { path: '', component: NoTaskComponent }, //default route
  { path: 'users/:userId/:userName', component: UserTasksComponent,
    children: [
      { path: '', redirectTo: 'tasks', pathMatch: 'full' }, //default child
      { path: 'tasks', component: TasksComponent },
      { path: 'tasks/new', component: NewTaskComponent }
    ]
  },
];
