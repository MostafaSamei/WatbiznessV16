import {inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpInterceptorFn, HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import {AuthService} from "../services/auth.service";

export const JwtInterceptor: HttpInterceptorFn = (req: HttpRequest<any>,  next: HttpHandlerFn): Observable<HttpEvent<any>> => {

  const authService = inject(AuthService);

  let currentUser = authService.getCurrentUser();

  if (currentUser && currentUser.token) {
    const cloned = req.clone({
      setHeaders: {
        authorization: `Bearer ${currentUser.token}`,
      },
    });
    return next(cloned);
  } else {
    return next(req);
  }
};
