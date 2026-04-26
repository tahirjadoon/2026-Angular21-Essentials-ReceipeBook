import { NgModule } from '@angular/core';
import { SharedModule } from './common/modules/shared.module';

import { App } from './app';
import { Header } from './layout/header/header';
import { User } from './user/user';
import { UserTasks } from './user-tasks/user-tasks';
import { UserTask } from './user-tasks/user-task/user-task';
import { UserNewTask } from './user-tasks/user-new-task/user-new-task';

@NgModule({
  declarations: [App, Header, User, UserTasks, UserTask, UserNewTask],
  imports: [SharedModule],
  exports: [],
  bootstrap: [App],
})
export class AppModule {}
