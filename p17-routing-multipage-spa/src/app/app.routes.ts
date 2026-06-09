import { Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './_common/not-found.component/not-found.coponent';
import { redirectToFirstUserGuard } from './_common/guards/redirect-to-first-user.guard';
import { userRoutes } from './users/users.routes';
import { resolveUserName } from './_common/resolvers/resolve-user-name.resolve';
import { resolveTitle } from './_common/resolvers/resolve-title.resolve';
import { dummyCanMatch } from './_common/guards/dummy-can-match.guard';

export const routes: Routes = [
  {
    path: '', canActivate: [redirectToFirstUserGuard], component: NoTaskComponent, title: 'No task selected',
  },
  { path: 'users/:userId/:userName', component: UserTasksComponent,
    children: userRoutes, //user routes moved out to specific routes ts file
    canMatch: [dummyCanMatch],
    data: {
      messageInput: 'Hello!'
    },
    resolve: {
      userNameViaResolver: resolveUserName
    },
    title: resolveTitle,
  },
  { path: '**', component: NotFoundComponent } //wildcard route
];
