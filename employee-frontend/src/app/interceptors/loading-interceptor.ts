import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Inject } from '@angular/core';
import { finalize } from 'rxjs';
import { Loader } from '../services/loader';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const loader = inject(Loader);
  loader.show();

  return next(req).pipe(
    finalize(() => {
      //for testing Spinner before loading data
      // setTimeout(() => {
      //   loader.hide();
      // }, 500);

      loader.hide();
    })
  );
};
