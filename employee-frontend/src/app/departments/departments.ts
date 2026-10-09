import { ChangeDetectorRef, Component } from '@angular/core';
import { Employeeservice } from '../services/employeeservice';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Departmentservice } from '../services/departmentservice';

@Component({
  selector: 'app-departments',
  imports: [MatCardModule, MatIconModule, CommonModule, RouterLink],
  templateUrl: './departments.html',
  styleUrl: './departments.css',
})
export class Departments {

  departmentcounts: any[] = [];
  departments: string[] = [];

  constructor(private deptserv: Departmentservice, private empservice: Employeeservice, private cdr: ChangeDetectorRef) {

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

    this.empservice.getEmployees().subscribe(data => {

      //for Departmentwise count
      this.departmentcounts = [];

      const deptMap = new Map();

      data.forEach(emp => {
        const dept = emp.department;

        deptMap.set(
          dept,
          (deptMap.get(dept) || 0) + 1
        );
      });

      this.departmentcounts =
        Array.from(deptMap, ([name, count]) => ({
          name,
          count
        }));

      console.log("Department count : ", this.departmentcounts);
      this.cdr.detectChanges();

    })



  }


  getDepartmentIcon(dept: string) {
    return this.deptserv.getDepartmenticon(dept);

  }
}
