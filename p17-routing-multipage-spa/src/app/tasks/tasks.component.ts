import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { UserTaskDataService } from '../_data/services/user-task-data.service';
import { UserTaskData } from '../_data/modals/user-task-data.mode';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  private userTaskDataService = inject(UserTaskDataService);
  private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);

  //1 userId here is coming from the parent route, 
  //userId = input.required<string>();
  //not passed from in so can't use input
  /*
  userId = toSignal(
    this.activatedRoute.parent!.paramMap.pipe(
      map(params => params.get('userId') ?? '')
    ),
    { initialValue: '' }
  );
  */
  //hhowever check app.config.ts, added withRouterConfig so now the userid will be available
  userId = input.required<string>();
  userName = input.required<string>();

  order = input<'asc' | 'desc'>('desc');

  //userTasks: UserTaskData[] = [];
  
  //#1
  userTasks = computed(() => {
    const order = this.order() ?? 'desc'; // fallback default
    
    //userId is coming from the parent route
    return this.userTaskDataService.getTasksByUser(this.userId())
    .sort((a, b) => {
      //console.log("order=", this.order());
      if (order === 'desc') {
        return a.dueDate > b.dueDate ? -1 : 1;
      } else {
        return a.dueDate > b.dueDate ? 1 : -1;
      }
    });
  });

  hasTasks = computed(() => {
    const tasks = this.userTasks();
    return tasks && tasks.length > 0;
  });

  tasksCountMoreThanOne = computed(() => {
    const tasks = this.userTasks();
    return tasks && tasks.length > 1;
  });

  sort = computed(() => {
    const order = this.order();
    return order === 'asc' ? 'desc' : 'asc';
  })

  //#2


  ngOnInit(): void {
    //2
    const userIdSubscripton = this.activatedRoute.parent!.paramMap.subscribe({
      next: paramMap => {
        const userId = paramMap.get('userId');
        console.log("ngOnInit ", userId);
        //this.userTasks = this.userTaskDataService.getTasksByUser(userId ?? '');
      }
    });

    //alternative for query params
    const queryParamsSubscription = this.activatedRoute.queryParams.subscribe({
      next: queryParams => {  
        const param = queryParams['order'];
        console.log(param);
      }
    });
    this.destroyRef.onDestroy(() => {
      userIdSubscripton.unsubscribe();
      queryParamsSubscription.unsubscribe();
    });
  }
}
