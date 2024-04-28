import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.clone({
      headers: req.headers.append('Authorization,', token)
    })
  }
  return next(req);
};
