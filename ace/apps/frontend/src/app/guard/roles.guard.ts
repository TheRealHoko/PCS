import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoleEnum } from '@ace/shared';
import { catchError, map, of } from 'rxjs';

export const rolesGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRoles = route.data['roles'] as RoleEnum[];

  // change to fetch from localstorage
  return authService.hasRoles(requiredRoles).pipe(
    map((hasRole) => {
      if (hasRole) {
        return true;
      } else {
        return router.parseUrl('/');
      }
    }),
    catchError((err) => {
      console.error('Error in roles checking', err);
      return of(router.parseUrl('/'));
    })
  );
};
