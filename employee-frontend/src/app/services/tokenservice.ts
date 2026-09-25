import { Service } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Service()
export class TokenService {


    isTokenExpired(): boolean {

        const token = localStorage.getItem('token');

        if (!token) return true;

        try {

            const decoded: any = jwtDecode(token);

            return decoded.exp * 1000 < Date.now();

        } catch {

            return true;

        }
    }

    getRemainingTime(): number {

        const token = localStorage.getItem('token');

        if (!token) return 0;

        try {
            const decoded: any = jwtDecode(token);
            // const expiry = decoded.exp * 1000;
            return decoded.exp * 1000 - Date.now();
        }

        catch {
            return 0;
        }

    }
}
