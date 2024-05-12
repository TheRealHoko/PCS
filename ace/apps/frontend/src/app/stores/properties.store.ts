import { Property } from '@ace/shared';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { PropertiesService } from '../services/properties.service';

export interface PropertiesState {
  properties: Property[];
}

export const PropertiesStore = signalStore(
  withState<PropertiesState>({
    properties: [],
  }),
  withMethods((store, properties = inject(PropertiesService)) => ({
    refreshProperties: rxMethod<void>(
      pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(() => {
          return properties.getProperties().pipe(
            tapResponse({
              next: (response) => {
                patchState(store, { properties: response });
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
