import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginform!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private authservice: Auth, private snackbar: MatSnackBar, private cd: ChangeDetectorRef) {
    this.loginform = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        '',
        Validators.required
      ]
    });
  }

  onSubmit() {

    if (this.loginform.invalid) return;

    this.authservice.login(this.loginform.value).subscribe({
      next: (response: any) => {

        console.log("Login Component : ", response);

        //Localstorage token
        localStorage.setItem('token',response.token);

        //Localstorage NAME
        localStorage.setItem('username', response.user.name );

        localStorage.setItem('email',response.user.email);

        //Localstorage ROLE
        localStorage.setItem('role', response.user.role);

        this.router.navigate(['/dashboard']);

        // console.log("Localstorage Token : ", localStorage.getItem('token'));
        // console.log("Localstorage USername : ", localStorage.getItem('username'));
        // console.log("Localstorage Role", localStorage.getItem('role'));
        // console.log("localstorage email = ",localStorage.getItem('email'));

        // This forces AppComponent to reload and read the new username....
        // window.location.reload();

        this.snackbar.open(
          `Welcome ${this.loginform.value.email} \n to EMPLOYEE MANAGEMENT SYSTEM `,
          'close',
          {
            duration: 3000
          }
        )


        // this.cd.detectChanges();

        
      }
    })
  }
} 
