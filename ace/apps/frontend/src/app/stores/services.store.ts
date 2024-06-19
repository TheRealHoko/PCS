import { Service, UpdateServiceDto } from '@ace/shared';
import { signalStore, withState, withMethods, patchState, withComputed, withHooks } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ServicesService } from '../services/services.service';
import { computed, inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, pipe, repeat, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';

interface RxUpdateService {
  id: number;
  updateServiceDTO: UpdateServiceDto;
}

export interface ServicesState {
  services: Service[];
}

export const ServicesStore = signalStore(
  withState<ServicesState>({
    services: [],
  }),
  withComputed((store) => ({
    serviceCount: computed(() => store.services().length)
  })),
  withMethods((store, service = inject(ServicesService), users = inject(UsersService), auth = inject(AuthService)) => ({
    refreshServices: rxMethod<void>(
      pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(() => {
          return service.getServices().pipe(
            tapResponse({
              next: (response) => {
                patchState(store, { services: response });
              },
              error: (err) => {
                console.error(err);
              },
            })
          );
        }),
        repeat()
      )
    ),
    getOwnServices: rxMethod<void>(
      pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(() => {
          const userId = auth.getDecodedToken()?.sub;
          return users.getUser(+userId!).pipe(
            tapResponse({
              next: (response) => {
                patchState(store, { services: response.services?.filter(service => service.status !== "OFFLINE") });
              },
              error: (err) => {
                console.error(err);
              },
            })
          );
        })
      )
    ),
    deleteService: rxMethod<number>(
      pipe(
        debounceTime(500),
        switchMap((id: number) => {
          return service.deleteService(id).pipe(
            tapResponse({
              next: () => {
                patchState(store, {
                  services: store
                    .services()
                    .filter((service) => service.id != id),
                });
              },
              error: (err) => {
                console.error(err);
              },
            })
          );
        })
      )
    ),
    validateService: rxMethod<number>(
      pipe(
        debounceTime(500),
        switchMap((id: number) => {
          return service.validateService(id).pipe(
            tapResponse({
              next: (updatedService) => {
                patchState(store, {
                  services: store
                    .services()
                    .map((service) =>
                      service.id === updatedService.id
                        ? updatedService
                        : service
                    ),
                });
              },
              error: (err) => {
                console.error(err);
              },
            })
          );
        })
      )
    ),
    invalidateService: rxMethod<number>(
      pipe(
        debounceTime(500),
        switchMap((id: number) => {
          return service.invalidateService(id).pipe(
            tapResponse({
              next: (updatedService) => {
                patchState(store, {
                  services: store
                    .services()
                    .map((service) =>
                      service.id === updatedService.id
                        ? updatedService
                        : service
                    ),
                });
              },
              error: (err) => {
                console.error(err);
              },
            })
          );
        })
      )
    ),
    updateService: rxMethod<RxUpdateService>(
      pipe(
        debounceTime(500),
        switchMap((rxUpdateService: RxUpdateService) => {
          return service
            .updateService(rxUpdateService.id, rxUpdateService.updateServiceDTO)
            .pipe(
              tapResponse({
                next: (updatedService) => {
                  patchState(store, {
                    services: store
                      .services()
                      .map((service) =>
                        service.id === updatedService.id
                          ? updatedService
                          : service
                      ),
                  });
                },
                error: (err) => {
                  console.error(err);
                },
              })
            );
        })
      )
    ),
  })),
  withHooks({
    onInit: (store) => {
      store.refreshServices();
    }
  }),
);
