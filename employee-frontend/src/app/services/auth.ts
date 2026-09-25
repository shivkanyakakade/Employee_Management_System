import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { SessionService } from './sessionservice';

@Injectable({
    providedIn: 'root'
})

export class Auth {

    private apiURL = 'http://localhost:5000/api/auth';
    private router = inject(Router);
    // private sessionservice = inject(SessionService);

    constructor(private http: HttpClient) {

    }

    login(credentials: any) {
        return this.http.post(`${this.apiURL}/login`, credentials);
    }

    register(user: any) {

        return this.http.post(
            `${this.apiURL}/register`,
            user
        );

    }

    resetPassword(data: { currentPassword: string; newPassword: string; }) {
        return this.http.post(`${this.apiURL}/reset-password`, data);
    }


    isLoggedIn() {
        return !!localStorage.getItem('token');
    }

    LogOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('role');

        // localStorage.clear();

        this.router.navigate(['/login']);
    }

    getRole() {
        return localStorage.getItem('role');
    }

    isAdmin() {
        return this.getRole() === 'admin';
    }

    getEmail() {
        return localStorage.getItem('email');
    }


}
