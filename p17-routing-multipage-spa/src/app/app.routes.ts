import { Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './_common/not-found.component/not-found.coponent';
import { redirectToFirstUserGuard } from './_common/guards/redirect-to-first-user.guard';
import { userRoutes } from './users/users.routes';
import { resolveUserName } from './_common/resolvers/resolve-user-name.resolve';

export const routes: Routes = [
  {
    path: '', canActivate: [redirectToFirstUserGuard], component: NoTaskComponent,
  },
  { path: 'users/:userId/:userName', component: UserTasksComponent,
    children: userRoutes, //user routes moved out to specific routes ts file
    data: {
      messageInput: 'Hello!'
    },
    resolve: {
      userNameViaResolver: resolveUserName
    }
  },
  { path: '**', component: NotFoundComponent } //wildcard route
];
