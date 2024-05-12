import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthStore } from '../stores/auth.store';

export const publicGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);

  return !authStore.isAuthenticated();
};
