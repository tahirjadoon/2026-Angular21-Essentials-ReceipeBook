import { Routes } from "@angular/router";
import { TasksComponent } from "../tasks/tasks.component";
import { NewTaskComponent } from "../tasks/new-task/new-task.component";
import { canLeaveEditPageGuard } from "../_common/guards/can-deactiavte.guard";

export const userRoutes: Routes = [
      { path: '', redirectTo: 'tasks', pathMatch: 'full' }, //default child
      { path: 'tasks', component: TasksComponent },
      { path: 'tasks/new', component: NewTaskComponent, canDeactivate: [canLeaveEditPageGuard], },
    ]