import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserTaskDataService } from '../../_data/services/user-task-data.service';
import { UserTaskCreateData } from '../../_data/modals/user-task-data.mode';


@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  private tasksService = inject(UserTaskDataService);

  onSubmit() {
    const newTask: UserTaskCreateData = {
      title: this.enteredTitle(),
      summary: this.enteredSummary(),
      dueDate: this.enteredDate()
    };

    this.tasksService.addTask(this.userId(), newTask);
  }
}
