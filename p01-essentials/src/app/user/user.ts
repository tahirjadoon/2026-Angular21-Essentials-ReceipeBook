import { Component, computed, EventEmitter, inject, Input, input, output, Output, signal } from '@angular/core';
import { UserData } from '../data/modals/user-data.model';
import { Card } from "../common/card/card";
import { UserTaskDataService } from '../data/services/user-task-data.service';

@Component({
  selector: 'app-user',
  imports: [Card],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  private usertaskdataService = inject(UserTaskDataService);
  /*
  //selectedUser = DUMMY_USERS[this.getRandomUserIndex];
  selectedUser = signal(DUMMY_USERS[this.getRandomUserIndex]);

  //instead of getter getUserImagePath, which we can still use with the signal, the better way is to use a computed signal
  getUserImagePath2  = computed(() => `assets/users/${this.selectedUser().avatar}`);
  //getters
  get getUserImagePath(){
    //return `assets/users/${this.selectedUser.avatar}`;  
     return `assets/users/${this.selectedUser().avatar}`;
  }
  private get getRandomUserIndex() {
    const randomUserIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    return randomUserIndex;
  }
  */

  //standard input
  /*
  @Input({required: true}) avatar!: string;
  @Input({required: true}) name!: string;
  */

  //signal input
  /*
  avatar = input<string>('');
  name = input<string>('');
  */
  user = input.required<UserData>();
  selected = input.required<boolean>();
  
  getUserImagePath3  = computed(() => `assets/users/${this.user().avatar}`);

  //standard Output
  //@Output() selectedUserId = new EventEmitter<string>();

  //signal output
  selectedUser = output<UserData>();

  taskCount = computed(() => {
    const userData = this.user();
    return this.usertaskdataService.getTasksCountByUser(userData.id) || 0;
  });

  onUserClick(){
    //this.selectedUser = DUMMY_USERS[this.getRandomUserIndex];
    //this.selectedUser.set(DUMMY_USERS[this.getRandomUserIndex]);
    this.selectedUser.emit(this.user());
  }

}
