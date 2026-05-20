import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserDataService } from '../../_data/services/user-data.service';
import { UtilityService } from '../services/util.service';

export const redirectToFirstUserGuard: CanActivateFn = () => {
  const router = inject(Router);
  const firstUser = inject(UserDataService).getUsers()[0];

  if (!firstUser) {
    return true;
  }

  return router.createUrlTree([
    '/users',
    firstUser.id,
    inject(UtilityService).slugify(firstUser.name),
    'tasks',
  ]);
};
