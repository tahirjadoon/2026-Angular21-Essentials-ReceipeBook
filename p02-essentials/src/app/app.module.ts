import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from './common/modules/shared.module';
import { UserTasksModule } from './user-tasks/user-tasks.module';

import { App } from './app';
import { Header } from './layout/header/header';
import { User } from './user/user';


@NgModule({
  declarations: [App, Header, User],
  imports: [BrowserModule, SharedModule, UserTasksModule],
  exports: [],
  bootstrap: [App],
})
export class AppModule {}
