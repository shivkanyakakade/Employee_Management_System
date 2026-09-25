import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TokenService } from './tokenservice';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private logoutTimer: any;
    sessionExpired = new Subject<void>();

    constructor(
        // private authService: Auth,
        private tokenService: TokenService
    ) { }

    startSessionTimer(): void {

        const remainingTime = this.tokenService.getRemainingTime();

        if (remainingTime <= 0) {

            // this.authService.LogOut();
            this.sessionExpired.next();
            return;

        }

        this.logoutTimer = setTimeout(() => {
            // alert('Session Expired. Please login again.');
            // this.authService.LogOut();

            this.sessionExpired.next();
        }, remainingTime);

    }

    clearTimer(): void {

        // if (this.logoutTimer) {
        clearTimeout(this.logoutTimer);
        // }

    }

}