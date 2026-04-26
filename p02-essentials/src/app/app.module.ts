import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { App } from './app';
import { Header } from './layout/header/header';
import { User } from './user/user';
import { ToastCustom } from './common/toast-custom/toast-custom/toast-custom';
import { Card } from './common/card/card';
import { UserTasks } from './user-tasks/user-tasks';
import { UserTask } from './user-tasks/user-task/user-task';
import { UserNewTask } from './user-tasks/user-new-task/user-new-task';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [App, Header, User, ToastCustom, Card, UserTasks, UserTask, UserNewTask],
  imports: [BrowserModule, CommonModule, FormsModule],
  exports: [],
  bootstrap: [App],
})
export class AppModule {}
