import { UpdateUserDto, User } from '@ace/shared';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, pipe, switchMap } from 'rxjs';
import { tapResponse } from "@ngrx/operators";
import { UsersService } from '../services/users.service';

interface RxUpdateUser {
    id: number,
    updateUserDTO: UpdateUserDto
}

export interface UsersState {
    users: User[];
}

export const UsersStore = signalStore(
    withState<UsersState>({
        users: []
    }),
    withMethods((store, users = inject(UsersService)) => ({
        refreshUsers: rxMethod<void>(
            pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap(() => {
                    return users.getUsers()
                        .pipe(
                            tapResponse({
                                next: response => {
                                    patchState(store, { users: response });
                                },
                                error: err => {
                                    console.error(err);
                                }
                            })
                        );
                })
            )
        ),
        deleteUser: rxMethod<number>(
            pipe(
                debounceTime(500),
                switchMap((id: number) => {
                    return users.deleteUser(id)
                        .pipe(
                            tapResponse({
                                next: () => {
                                    patchState(store, {users: store.users().filter(user => user.id != id)});
                                },
                                error: err => {
                                    console.error(err);
                                }
                            })
                        )
                })
            )
        ),
        updateUser: rxMethod<RxUpdateUser>(
            pipe(
                debounceTime(500),
                switchMap((RxUpdateUser: RxUpdateUser) => {
                    return users.updateUser(RxUpdateUser.id, RxUpdateUser.updateUserDTO)
                        .pipe(
                            tapResponse({
                                next: (updatedUser) => {
                                    patchState(store, { users: store.users().map(user => 
                                        user.id === updatedUser.id ? updatedUser : user) });
                                },
                                error: err => {
                                    console.error(err);
                                }
                            })
                        )
                })
            )
        )
    }))
);