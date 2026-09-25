import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, Inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Auth } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authservice = inject(Auth);
  const token = localStorage.getItem("token");

  //Add JWT token To request
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization:
          `Bearer ${token}`
      }
    })
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      // Token expired / invalid 
      if (error.status === 401) {
        console.log('Token expired or unauthorized. Logging out...');

        authservice.LogOut();
      }
      return throwError(() => error);
    })
  );


};
