import { Component, signal } from '@angular/core';
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
import { SessionService } from './services/sessionservice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatButtonModule, MatToolbarModule, LoadingSpinner, CommonModule, MatIconModule, MatCardModule, MatMenuModule],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('employee-management');

  username: any = '';

  constructor(private sessionservice: SessionService, public authservice: Auth, private router: Router, private snackbar: MatSnackBar) {



  }


  ngOnInit() {

    if (localStorage.getItem('token')) {
      this.sessionservice.startSessionTimer();
    }

    this.sessionservice.sessionExpired.subscribe(() => {

      this.snackbar
        .open(
          "Session Expired. Please Login Again.",
          "Close",
          {
            duration: 2000
          }
        )
        .afterDismissed()
        .subscribe(() => {

          this.logout();

        });

    });


    //This code runs only when AppComponent is created. 
    // After login, the component doesn't recreate itself, so the header still has the old value.
    // this.username = localStorage.getItem('username');

    //this will calls everytime when app loaded...
    // this.loadusername();


    // this.sessionservice.sessionExpired.subscribe(() => {

    //   console.log('SESSION EXPIRED');

    //   this.snackbar.open(
    //     'Session Expired. Please Login Again.',
    //     'Close',
    //     {
    //       duration: 2000
    //     }
    //   );

    //   this.logout();
    // });


    // this.cd.detectChanges();

  }


  //Now whenever Angular performs change detection, it fetches the latest username from localStorage...
  getUsername() {
    return localStorage.getItem('username');
  }


  getRole() {
    return localStorage.getItem('role');
  }

  logout() {
    this.sessionservice.clearTimer();
    this.authservice.LogOut();

  }


  isLoggedIn() {

    return !!localStorage.getItem('token');

  }
}
