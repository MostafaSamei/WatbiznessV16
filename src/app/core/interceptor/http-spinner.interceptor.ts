import {inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpInterceptorFn, HttpHandlerFn,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import {AuthService} from "../services/auth.service";

export const LoadingSpinnerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  let counter = 0;

  const spinner = inject(NgxSpinnerService);

  spinner.show().then(r => console.log(r));

  if (counter == 0) {
    spinner.show('loading');
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  }

  counter++;

  return next(req).pipe(
    finalize(() => {
      counter--;
      if (counter == 0) {
        spinner.hide('loading');
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
      }
    })
  );
};
