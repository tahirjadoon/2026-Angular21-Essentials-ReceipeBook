import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskInput } from '../../common/model/task.model';
import { TasksService } from '../../common/services/tasks.service';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('formEl');

  private tasksService = inject(TasksService);


  onAddTask(title: string, description: string) {
    const taskInput: TaskInput = {
      title,
      description,
    };

    this.tasksService.addTask(taskInput);
    //console.log(taskInput);

    this.formEl()?.nativeElement.reset();
  }
}
