import { Property } from '@ace/shared';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { PropertiesService } from '../services/properties.service';

export interface PropertiesState {
  properties: Property[];
  isLoading: boolean;
}

export const PropertiesStore = signalStore(
  withState<PropertiesState>({
    properties: [],
    isLoading: false,
  }),
  withMethods((store, properties = inject(PropertiesService)) => ({
    refreshProperties: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(() => {
          return properties.getProperties().pipe(
            tapResponse({
              next: (response) => {
                patchState(store, { properties: response, isLoading: false});
              },
              error: (err) => {
                console.error(err);
              },
            })
          );
        })
      )
    )
  }))
);
