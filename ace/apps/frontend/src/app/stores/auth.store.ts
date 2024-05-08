import { RoleEnum } from "@ace/shared";
import { InjectionToken, computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { AuthService } from "../services/auth.service";
import { JwtPayload } from "jwt-decode";
import { UsersService } from "../services/users.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { concatMap, pipe, switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";
import { AlertService } from "../services/alert.service";
import { Router } from "@angular/router";

export interface AuthenticateType {
    email: string;
    password: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    roles: RoleEnum[];
    isLoading: boolean;
}

const AUTH_STATE = new InjectionToken<AuthState>('AuthState', {
    factory: (authService = inject(AuthService)) => ({
        isAuthenticated: authService.isLoggedIn(),
        roles: authService.getDecodedToken()?.roles as RoleEnum[] || [],
        isLoading: false
    })
});

export const AuthStore = signalStore(
    withState<AuthState>(() => inject(AUTH_STATE)),
    withComputed(({roles}) => ({
        isAdmin: computed(() => roles().includes(RoleEnum.ADMIN))
    })),
    withMethods((
        store, 
        authService = inject(AuthService),
        alertService = inject(AlertService),
        router = inject(Router)
    ) => ({
        authenticate: rxMethod<AuthenticateType>(
            pipe(
                tap(() => patchState(store, { isLoading: true })),
                concatMap(input => {
                    return authService.login(input.email, input.password)
                    .pipe(
                        tapResponse({
                            next: (response) => {
                                authService.setToken(response.token);
                                patchState(store, { isAuthenticated: true, roles: authService.getDecodedToken()?.roles as RoleEnum[] || [], isLoading: false });
                                alertService.info('Logged in successfully');
                                router.navigateByUrl('/home');
                            },
                            error: (err) => {
                                alertService.info('Login failed');
                                console.error(err);
                            }
                        }))
                })
            )
        ),
        logout: () => {
            authService.logout();
            patchState(store, {isAuthenticated: false, roles: []})
        }
    }))
)