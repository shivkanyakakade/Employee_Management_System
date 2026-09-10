import { ChangeDetectorRef, Component } from '@angular/core';
import { Employeeservice } from '../services/employeeservice';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-departments',
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './departments.html',
  styleUrl: './departments.css',
})
export class Departments {

  departments: string[] = [];

  constructor(private empservice: Employeeservice, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {

    console.log('Departments component initialized');

    this.empservice.getDepartments()
      .subscribe({
        next: (data) => {

          // console.log("API DATA = ", data);
          // console.log("API DATA LENGTH= ", data.length);

          this.departments = data;

          console.log("Departments= ", this.departments);
          console.log("Departments Length= ", this.departments.length);

          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error('API ERROR : ', error);
        }

      });


  }
}
