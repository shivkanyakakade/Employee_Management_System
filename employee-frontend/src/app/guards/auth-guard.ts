import { CanActivateFn, Route, Router } from '@angular/router';
import { inject,  } from '@angular/core';
import { TokenService } from '../services/tokenservice';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = () => {

  const tokenservice = inject(TokenService);
  const router = inject(Router);
  const authservice = inject(Auth);
  const token = localStorage.getItem('token');

  //No Token
  // if (!token) {
  //   authservice.LogOut();
  //   return false;

  // }

  //Token Expired
  if (tokenservice.isTokenExpired()) {
    authservice.LogOut();
    return false;
  }

  // router.navigate(['/login']);

  return true;

};
