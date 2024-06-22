import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getRawToken();
  const newReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
  return next(newReq);
};