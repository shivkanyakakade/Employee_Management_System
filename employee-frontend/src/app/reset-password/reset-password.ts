import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Auth } from '../services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {

  resetPasswordForm: FormGroup;

  constructor(public fb: FormBuilder, public router: Router, public authservice: Auth, public snackbar: MatSnackBar) {

    this.resetPasswordForm = this.fb.group({

      currentPassword: ['', Validators.required],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]

    });
  }


  onSubmit() {

    console.log("Form Value : ", this.resetPasswordForm.value);

    if (
      this.resetPasswordForm.value.newPassword !==
      this.resetPasswordForm.value.confirmPassword
    ) {

      alert('Passwords do not match');
      return;
    }

    const data = {
      currentPassword: this.resetPasswordForm.value.currentPassword,
      newPassword: this.resetPasswordForm.value.newPassword
    };

    this.authservice.resetPassword(data).subscribe({
      next: (res: any) => {
        console.log(res);
        this.snackbar.open(
          'Password Reset Successfully !!! Please Login with New Password',
          'close', {
          duration: 3000
        }
        );

        this.authservice.LogOut();
        this.router.navigate(['/login']);

      },
      error: (err) => {
        console.log(err);
      }
    });


  }


}
