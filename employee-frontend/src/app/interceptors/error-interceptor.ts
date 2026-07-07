import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const snackbar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error) => {

      console.log('Full Error',error);
      console.log('Error Message',error.message);
      console.log('Error',error.error);

      // let errormessage = "something went wrong";

      //improve backend message "message"="Employee Not found"
      let errormessage =
        error.error?.message ||
        error.message ||
        'Something went wrong';

      switch (error.status) {

        case 0:
          errormessage = "Unable to Connect to Server";
          break;

        case 400:
          errormessage = "Bad Request";
          break;

        case 401:
          errormessage = "Unauthorized : Please Login again";
          break;

        case 403:
          errormessage = "Access Denied";
          break;

        case 404:
          errormessage = 
          error.error?.message|| "Resource Not Found";
          break;

        case 500:
          errormessage = "Internal Server Error";
          break;
      }

      snackbar.open(
        errormessage,
        'close',
        { duration: 3000 }
      );

      return throwError(() => error);
    })
  );
};
