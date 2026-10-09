import { Component, OnInit } from '@angular/core';
import { Employeeservice } from '../services/employeeservice';
import { MatCardModule } from '@angular/material/card';
import { ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Departmentservice } from '../services/departmentservice';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatIconModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard implements OnInit {

  today = new Date();
  username: any = '';
  departmentcounts: any[] = [];

  tokenrole: any = '';
  totalemployees: any = 0;
  totaldept: any = 0;

  employess: any[] = [];

  constructor(private deptserv: Departmentservice, private empserv: Employeeservice, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {


    this.username = localStorage.getItem('username');
    // this.tokenrole=localStorage.getItem('token.role');
    // this.username=localStorage.getItem(this.username)

    console.log('Dashboard Loaded');
    console.log("Token", localStorage.getItem('token'));
    // console.log("Role : ",localStorage.getItem(this.tokenrole))

    this.empserv.getEmployees().subscribe(data => {

      console.log('Data Received');
      this.employess = data;
      console.log("employee: ", this.employess);

      //For Total employees and Departments
      this.totalemployees = data.length;

      this.totaldept =
        new Set(
          data.map(emp => emp.department)
        ).size;

      console.log(this.totalemployees);
      console.log(this.totaldept);

      this.cd.detectChanges();

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

      console.log(this.departmentcounts);

      //immediate value updates
      this.cd.detectChanges();
    });

  }

  //For Icons...
  getDepartmentIcon(dept: string) {
    return this.deptserv.getDepartmenticon(dept);
  }


}
