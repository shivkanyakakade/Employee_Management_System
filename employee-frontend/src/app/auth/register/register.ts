import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { email } from '@angular/forms/signals';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatSelectModule],
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerForm !: FormGroup;
  constructor(private fb: FormBuilder, private auth: Auth, private router: Router, private snackbar: MatSnackBar) {

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '', Validators.required
      ],
      confirmpassword: [
        '', Validators.required
      ],
      // role: ['employee']
    });
  }

  onSubmit() {

    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerForm.value);
    console.log("Password", this.registerForm.value.password);
    console.log("Confirm Password", this.registerForm.value.confirmpassword);

    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmpassword
    ) {

      this.snackbar.open(
        'Passwords do not match',
        'Close'
      );

      return;
    }


    //this object should be match with database schema object feilds
    const user = {

      username:
        this.registerForm.value.name,

      email:
        this.registerForm.value.email,

      password:
        this.registerForm.value.password,

      // role:
      //   this.registerForm.value.role

    };

    this.auth
      .register(user)
      .subscribe(() => {

        console.log(user);

        this.snackbar.open(
          'Registration Successful',
          'Close',
          {
            duration: 3000
          }
        );

        this.router.navigate(
          ['/login']
        );

      });
    this.registerForm.reset();
  }
}
