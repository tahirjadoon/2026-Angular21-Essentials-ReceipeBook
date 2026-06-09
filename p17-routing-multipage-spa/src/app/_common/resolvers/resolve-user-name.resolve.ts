import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { UserDataService } from "../../_data/services/user-data.service";

export const resolveUserName: ResolveFn<string> = 
  (activatedRoute: ActivatedRouteSnapshot, routerstate: RouterStateSnapshot) => {
    let username = '';
    const userDataService = inject(UserDataService);
    const userId = activatedRoute.paramMap.get('userId');
    if(userId){
      const user = userDataService.getUserById(userId);
      username = user ? user.name : '';
    }
    return username;
}