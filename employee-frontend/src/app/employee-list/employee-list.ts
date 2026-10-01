import { Component } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatTableModule, MatSnackBarModule, MatDialogModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule],
  standalone: true,
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})


export class EmployeeList {


  isAdmin = false;
  getEmail: any = '';
  employees: Employeemodal[] = [];

  dataSource = new MatTableDataSource<Employeemodal>();   //with pagination
  searchText = '';

  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator !: MatPaginator;         //pagination
  @ViewChild(MatSort) sort !: MatSort;                        //Sorting Table data according to Headers

  constructor(private aroute: ActivatedRoute, public authservice: Auth, private employeeService: Employeeservice, private cdr: ChangeDetectorRef, private router: Router, private snackbar: MatSnackBar, private dialog: MatDialog) {
  }



  ngOnInit(): void {

    console.log(this.authservice.getEmail());

    this.isAdmin = this.authservice.isAdmin();
    this.getEmail = this.authservice.getEmail();

    this.displayedColumns = [
      'id',
      'name',
      'email',
      'mobile',
      'department',
      'action'
    ]

    // Check URL query parameter
    this.aroute.queryParams.subscribe(params => {
      const department = params['department'];
      console.log("SELECTED DEPARTMENT : ", department);

      if (department) {

        // Department selected from Dashboard
        this.employeeService.getEmployeesByDepartment(department).subscribe({
          next: (data) => {

            console.log('Department employees:', data);

            this.employees = [...data];
            this.dataSource.data = data;

          },

          error: (err) => {
            console.log(err);
          }
        });
      }
      else {

        // No department selected → show all employees
        this.employeeService
          .getEmployees().subscribe({
            next: (data) => {

              console.log('All employees:', data);

              this.employees = [...data];
              this.dataSource.data = data;

            },

            error: (err) => {
              console.log(err);
            }
          });

      }
    });


  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  viewEmployee(id: string): void {

    console.log('Employee ID:', id);

    this.router.navigate(['/employees', id]);
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

    this.router.navigate([
      '/edit-employee',
      employee._id
    ]);

  }

  searchEmployee() {

    this.dataSource.filter = this.searchText.trim().toLowerCase();   //pagination
  }
}
