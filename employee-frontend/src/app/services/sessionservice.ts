import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TokenService } from './tokenservice';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private logoutTimer: ReturnType<typeof setTimeout> | null = null;
    sessionExpired = new Subject<void>();

    constructor(
        private tokenService: TokenService
    ) { }

    startSessionTimer(): void {

        this.clearTimer();

        const remainingTime = this.tokenService.getRemainingTime();
        console.log("Token Remaining Time : ", remainingTime);

        if (remainingTime <= 0) {

            console.log("Token already expired....");
            // this.authService.LogOut();
            this.sessionExpired.next();
            return;

        }

        this.logoutTimer = setTimeout(() => {
            console.log("Session Expired..");

            this.sessionExpired.next();
        }, remainingTime);

    }

    clearTimer(): void {

        if (this.logoutTimer) {
            clearTimeout(this.logoutTimer);
            this.logoutTimer = null;
        }

    }

}