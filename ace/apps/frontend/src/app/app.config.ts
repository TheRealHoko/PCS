import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { ServicesStore } from './stores/services.store';
import { UsersStore } from './stores/users.store';
import { AuthStore } from './stores/auth.store';
import { PropertiesStore } from './stores/properties.store';

export const appConfig: ApplicationConfig = {
  providers: [
    ServicesStore,
    UsersStore,
    AuthStore,
    PropertiesStore,
    provideClientHydration(),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
  ],
};
