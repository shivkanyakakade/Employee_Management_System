import { Component, OnInit } from '@angular/core';
import { Employeeservice } from '../services/employeeservice';
import { MatCardModule } from '@angular/material/card';
import { ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { Auth } from '../services/auth';
// import { Router } from '@angular/router';
// import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
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

  constructor( private empserv: Employeeservice, private cd: ChangeDetectorRef) { }

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

    switch (dept.toLowerCase()) {

      case 'frontend':
        return 'web';

      case 'backend':
        return 'dns';

      case 'java':
        return 'coffee';

      case 'ui':
        return 'palette';

      case 'angular':
        return 'code';

      case 'developer':
        return 'developer_mode';

      case 'support':
        return 'support_agent';

      default:
        return 'business';
    }
  }



}
