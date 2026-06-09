import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { resolveUserName } from "./resolve-user-name.resolve";

export const resolveTitle: ResolveFn<string> = 
  (activatedRoute: ActivatedRouteSnapshot, routerstate: RouterStateSnapshot) => {
    //call the resolveName resolver 
    const userName = resolveUserName(activatedRoute, routerstate);
    const title = `p17r2 ${userName}'s Tasks`;
    return title;
}