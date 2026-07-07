import { Component, OnInit, viewChild } from '@angular/core';
import { Employeemodal } from '../models/employee.model';
import { Employeeservice } from '../services/employeeservice';
import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { delay } from 'rxjs';


@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatTableModule, MatSnackBarModule, MatDialogModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule],
  standalone: true,
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})


export class EmployeeList {

  // loading = false;

  isAdmin = false;
  getEmail: any = '';
  employees: Employeemodal[] = [];
  // filteredemployees: Employeemodal[] = [];   

  dataSource = new MatTableDataSource<Employeemodal>();   //with pagination
  searchText = '';

  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator !: MatPaginator;         //pagination
  @ViewChild(MatSort) sort !: MatSort;                        //Sorting Table data according to Headers

  constructor(public authservice: Auth, private employeeService: Employeeservice, private cdr: ChangeDetectorRef, private router: Router, private snackbar: MatSnackBar, private dialog: MatDialog) {
    // this.employees = this.employeeService.getEmployees();
  }


  ngOnInit(): void {

    console.log(this.authservice.getEmail());

    this.isAdmin = this.authservice.isAdmin();
    this.getEmail = this.authservice.getEmail();

    // if (this.isAdmin) {
    this.displayedColumns = [
      'id',
      'name',
      'email',
      'mobile',
      'department',
      'action'
    ]
    // }
    // else {
    //   this.displayedColumns = [
    //     'id',
    //     'name',
    //     'email',
    //     'mobile',
    //     'department'
    //   ]
    // }


    // console.log(this.employees);

    // this.loading = true;
    this.employeeService.getEmployees().pipe(delay(1000)).subscribe({
      next: (data) => {
        console.log("received Data", data);     //debug
        this.employees = [...data];
        this.dataSource.data = data;
        // this.loading = false;
        // this.cdr.detectChanges();
        // console.log(this.loading);            //debug
      }
      ,
      error: (err) => {
        console.log(err);
        // this.loading = false;
      }
    });
    //   data => {
    //   console.log("received Data", data);
    //   // console.log("Length",data.length);

    //   this.employees = [...data];           //original array 
    //   // this.filteredemployees = [...data];  //for search employee
    //   this.dataSource.data = data;           //pagination

    //   if (this.paginator) {
    //     this.dataSource.paginator = this.paginator;
    //   }

    //   // if (this.sort) {
    //   //   this.dataSource.sort = this.sort;
    //   // }

    //   this.cdr.detectChanges();
    //   console.log("Emp in compo ????", this.employees);

    // }


  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  deleteEmployee(id: number) {

    // const confirmdel = confirm("Are you sure you want to delete this employee...");
    const dialogRef = this.dialog.open(
      ConfirmDialog,
      {
        width: '350px',
        data: {
          message:
            'Are you sure you want to delete this employee?'
        }
      }
    );

    dialogRef.afterClosed().subscribe(confirmdel => {
      console.log("Dialog Result", confirmdel);

      //For using confirm prompt only need this inside part no need to subscribe()
      if (confirmdel) {

        //For BehabiorSubject And LocalStorage
        // this.employeeService.deleteEmployee(id);

        //For JSON Server API
        this.employeeService.deleteEmployee(id).subscribe(() => {
          this.snackbar.open(
            'Employee Deleted Successfully',
            'Close',
            {
              duration: 3000
            }
          );

          this.employeeService.getEmployees().subscribe(data => {
            this.dataSource.data = data;
          });
        });

      }
    });

  }

  editEmployee(employee: Employeemodal) {
    // this.employeeService.editEmployee(employee);   //without routing only by behaviourSubject

    this.router.navigate([
      '/edit-employee',
      employee._id
    ]);

  }

  searchEmployee() {
    // when it "" empty string value then-> all values include this "" (empty string) so display all records

    // const search = this.searchText.toLowerCase();

    // this.filteredemployees = this.employees.filter(emp =>
    //   emp.name.toLowerCase().includes(search) ||
    //   emp.email.toLowerCase().includes(search) ||
    //   emp.department.toLowerCase().includes(search)
    // );

    this.dataSource.filter = this.searchText.trim().toLowerCase();   //pagination
  }
}
