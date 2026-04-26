import { Component, inject, input, output, signal } from '@angular/core';
import { UserTaskCreateData } from '../../data/modals/user-task-create.model';
import { FormsModule, NgForm } from '@angular/forms';
import { UserTaskDataService } from '../../data/services/user-task-data.service';

@Component({
  selector: 'app-user-new-task',
  //imports: [FormsModule],
  templateUrl: './user-new-task.html',
  styleUrl: './user-new-task.css',
  standalone: false,
})
export class UserNewTask {
  private userTaskDataService = inject(UserTaskDataService);

  userId = input.required<string>();
  closeDialog = output<void>();
  task: UserTaskCreateData = {
    title: '',
    summary: '',
    dueDate: ''
  };

  onCancel(){
    this.closeDialog.emit();
  }

  onCreateTask(form: NgForm){
    if(form.invalid){
      form.control.markAllAsTouched();
      return;
    }
    this.userTaskDataService.addTask(this.userId(), this.task);
    this.onCancel();
  }
}
