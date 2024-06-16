import { AceJwtPayload, RoleEnum } from '@ace/shared';
import { InjectionToken, computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { AuthService } from '../services/auth.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { concatMap, map, pipe, repeat, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

export interface AuthenticateType {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: AceJwtPayload | void;
  roles: RoleEnum[] | void;
  isLoading: boolean;
}

const AUTH_STATE = new InjectionToken<AuthState>('AuthState', {
  factory: (authService = inject(AuthService)) => ({
    isAuthenticated: authService.isLoggedIn(),
    token: authService.getDecodedToken(),
    roles: authService.getDecodedToken()?.roles,
    isLoading: false,
  }),
});

export const AuthStore = signalStore(
  withState<AuthState>(() => inject(AUTH_STATE)),
  withComputed(({ roles }) => ({
    isProvider: computed(() => roles()?.includes(RoleEnum.PROVIDER)),
    isRenter: computed(() => roles()?.includes(RoleEnum.RENTER)),
    isAdmin: computed(() => roles()?.includes(RoleEnum.ADMIN)),
  })),
  withMethods(
    (
      store,
      authService = inject(AuthService),
      alertService = inject(AlertService),
      usersService = inject(UsersService),
      router = inject(Router)
    ) => ({
      authenticate: rxMethod<AuthenticateType>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          concatMap((input) => {
            return authService.login(input.email, input.password).pipe(
              tapResponse({
                next: (response) => {
                  authService.setToken(response.token);
                  patchState(store, {
                    isAuthenticated: true,
                    token: authService.getDecodedToken(),
                    isLoading: false,
                  });
                  alertService.info('Logged in successfully');
                  router.navigateByUrl('/');
                },
                error: (err) => {
                  alertService.info('Login failed');
                  console.error(err);
                },
              })
            );
          })
        )
      ),
      refreshRoles: rxMethod<void>(
        pipe(
          tap(() => {
            const id = authService.getDecodedToken()?.sub;
            if (!id) {
              return;
            }
            return usersService.getUser(+id).pipe(
              tapResponse({
                next: (response) => {
                  console.log(response);
                  patchState(store, { roles: response.roles?.map(role => role.name) as RoleEnum[] });
                },
                error: (err) => {
                  console.error(err);
                },
              })
            );
          })
        )
      ),
      logout: () => {
        authService.logout();
        patchState(store, { isAuthenticated: false, token: undefined});
      },
    })
  )
);
