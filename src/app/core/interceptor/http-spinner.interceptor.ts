import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  let counter: number = 0;
  let spinner = inject(NgxSpinnerService);

  if (counter == 0) {
    spinner.show();
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  }
  counter++;
  return next(req).pipe(
    finalize(() => {
      counter--;
      if (counter == 0) {
        setTimeout(() => {
          spinner.hide();
        }, 300);

        document.getElementsByTagName('html')[0].style.overflow = 'auto';
      }
    })
  );
};
