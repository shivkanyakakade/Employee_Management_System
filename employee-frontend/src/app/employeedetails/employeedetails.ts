import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employeeservice } from '../services/employeeservice';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-employeedetails',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatButtonModule, RouterLink, CommonModule, JsonPipe],
  templateUrl: './employeedetails.html',
  styleUrl: './employeedetails.css',
})

export class Employeedetails implements OnInit, OnDestroy {

  emp = signal<any>(null);

  constructor(private route: ActivatedRoute, private empservice: Employeeservice) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    console.log('ID FROM URL:', id);
    console.log('TYPE OF ID:', typeof id);

    if (id) {
      this.empservice.getEmployeeById({ id }).subscribe({
        next: employee => {

          console.log('EMPLOYEE RESPONSE:', employee);
          this.emp.set(employee);

        },
        error: error => {
          console.error('EMPLOYEE ERROR:', error);
        }
      });
    }
  }


  ngOnDestroy(): void {
    console.log("EmployeeDetails Destroyed...")
  }



}
