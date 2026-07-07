import { Component, signal } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
// import {EmployeeList} from './employee-list/employee-list';
// import { EmployeeForm } from './employee-form/employee-form';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LoadingSpinner } from './shared/loading-spinner/loading-spinner';
import { Auth } from './services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatButtonModule, MatToolbarModule, LoadingSpinner, CommonModule, MatIconModule,MatCardModule,MatMenuModule],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {



  protected readonly title = signal('employee-management');

  username: any = '';



  constructor(public authservice: Auth, private router: Router, private snackbar: MatSnackBar, private cd: ChangeDetectorRef) { }


  ngOnInit() {

    //This code runs only when AppComponent is created. 
    // After login, the component doesn't recreate itself, so the header still has the old value.
    // this.username = localStorage.getItem('username');

    //this will calls everytime when app loaded...
    // this.loadusername();

    this.cd.detectChanges();
  }

  //simple and working...
  //Now whenever Angular performs change detection, it fetches the latest username from localStorage...
  getUsername() {
    return localStorage.getItem('username');
  }

  // loadusername() {
  //   this.username = localStorage.getItem('username') || '';
  // }

getRole(){
  return localStorage.getItem('role');
}

  logout() {
    this.authservice.LogOut();
    this.router.navigate(['/login']);

    this.snackbar.open(
      'Removed Token & Logged OUT',
      'close',

      {
        duration: 3000
      }
    )

  }


  isLoggedIn() {
    // this.authservice.isLoggedIn();
    // console.log("Token in App.ts : ", localStorage.getItem('token'));

    return !!localStorage.getItem('token');

  }
}
