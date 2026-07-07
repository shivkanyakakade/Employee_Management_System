import { Routes } from '@angular/router';
import { EmployeeForm } from './employee-form/employee-form';
import { EmployeeList } from './employee-list/employee-list';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Dashboard } from './dashboard/dashboard';

import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-guard';
import { roleGuard } from './guards/role-guard';
import { ResetPassword } from './reset-password/reset-password';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        // canActivate: [guestGuard]
    },

    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [authGuard]
    },

    {
        path: 'login',
        component: Login,
        canActivate: [guestGuard]
    },

    // {
    //     path: 'register',
    //     component: Register,
    //     canActivate: [guestGuard]
    // },

    {
        path: 'employees',
        component: EmployeeList,
        canActivate: [authGuard]
    },

    {
        path: 'add-employee',
        component: EmployeeForm,
        canActivate: [authGuard ,roleGuard]
    },

    {
        path: 'edit-employee/:id',
        component: EmployeeForm,
        canActivate: [authGuard]
    },
    
    {
        path: 'reset-password',
        component: ResetPassword,
        canActivate : [authGuard]
    },

    {
        path: '**',
        component: Login
    }
];

