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

  //getting the username via resolver now
  userNameViaResolver = input.required<string>();

  //1
  //now getting username via resolve
  /*
  userData = computed(() => {
    const user = this.userDataService.getUserById(this.userId());

    ////getting via the resolver now
    ////update browser tab title
    //if(user){
    //  this.browserTitle.setTitle(`p17 ${user.name} Tasks`);
    //}

    return user;
  });
  */

  //data passed via route
  messageInput = input.required<string>();

  //2

  ngOnInit(): void {
    console.log("message=", this.messageInput());

    //display title from the resolver user name 
    this.browserTitle.setTitle(`p17r ${this.userNameViaResolver()} Tasks`);
    
    //2
    const paramSubscription = this.activatedRoute.paramMap.subscribe({
      next:paramMap => {
        const userName = paramMap.get('userName');
        //console.log(this.utilService.unslugify(userName ?? ''));
      }
    });

    //getting static data and dynamic data (resolvers) via activated routes
    const dataSubscripton= this.activatedRoute.data.subscribe({
      next: data => {
        console.log("data via activated route: ", data);
      }
    });

    this.destroyRef.onDestroy(() => {
      paramSubscription.unsubscribe();
      dataSubscripton.unsubscribe();
    });
  }


}
