import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { SharedModule } from "../common/modules/shared.module";

import { UserTasks } from "./user-tasks";
import { UserTask } from "./user-task/user-task";
import { UserNewTask } from "./user-new-task/user-new-task";

@NgModule({
  declarations: [UserTasks, UserTask, UserNewTask],
  imports: [CommonModule, FormsModule, SharedModule],
  exports: [UserTasks],
})
export class UserTasksModule {}