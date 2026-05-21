import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserDataService } from '../../_data/services/user-data.service';
import { ActivatedRoute, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { UtilityService } from '../../_common/services/util.service';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLinkWithHref],
})
export class UserTasksComponent implements OnInit {
  private userDataService = inject(UserDataService);
  private utilService = inject(UtilityService);
  private browserTitle = inject(Title);
  private destroyRef = inject(DestroyRef);

  //recives userId and userName as route params, userName is slugified, so we need to unslugify it before displaying
  //two ways of reading the path parmaters, new input and observables. userName will be using observable
  
  //1
  userId = input.required<string>();

  //2
  private activatedRoute = inject(ActivatedRoute);
  
  //1
  userData = computed(() => {
    const user = this.userDataService.getUserById(this.userId());

    //update browser tab title
    if(user){
      this.browserTitle.setTitle(`p17 ${user.name} Tasks`);
    }

    return user;
  });

  //data passed via route
  messageInput = input.required<string>();

  //2

  ngOnInit(): void {
    console.log("message=", this.messageInput());
    
    //2
    const paramSubscription = this.activatedRoute.paramMap.subscribe({
      next:paramMap => {
        const userName = paramMap.get('userName');
        //console.log(this.utilService.unslugify(userName ?? ''));
      }
    });
    this.destroyRef.onDestroy(() => {
      paramSubscription.unsubscribe();
    });
  }


}
