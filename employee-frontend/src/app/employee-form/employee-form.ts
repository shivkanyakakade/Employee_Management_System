import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Employeeservice } from '../services/employeeservice';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { email } from '@angular/forms/signals';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatSnackBarModule, CommonModule, MatSelectModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})

export class EmployeeForm implements OnInit {

  editMode = false;
  selectedEmployeeId: any;
  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder, private employeeservice: Employeeservice, private router: Router, private route: ActivatedRoute, private snackbar: MatSnackBar) {



    this.employeeForm = this.fb.group({

      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      department: ['', Validators.required],
      password: ['', Validators.required],
      role: ['employee', Validators.required]

      // name: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      // mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      // department: ['', [Validators.required]],
      // password: ['', Validators.required]
    });


    // if (this.editMode) {
    //   console.log("Password Feild Removing....");

    //   this.employeeForm.get('password')?.clearValidators();
    //   this.employeeForm.get('password')?.updateValueAndValidity();
    // }

  }

  ngOnInit(): void {

    //for JSon Server version: have to remove Number()
    const id = this.route.snapshot.paramMap.get('id');
    console.log("ID From Route : ", id);

    //works while localstorage and BahaviurSubject()
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    // console.log("Edit EMP ID: ", id);

    //JSON Server Version----
    if (id) {

      this.editMode = true;
      this.employeeForm.get('password')?.clearValidators();
      this.employeeForm.get('password')?.updateValueAndValidity();

      this.employeeservice.getEmployeeById(id).subscribe(employee => {

        this.selectedEmployeeId = employee._id;
        this.employeeForm.patchValue({
          name: employee.name,
          email: employee.email,
          mobile: employee.mobile,
          department: employee.department
        })
      })
    }

    console.log("editMode : ", this.editMode);
    //LocalStorage Version----

    // if (id) {
    //   const employee =
    //     this.employeeservice.getEmployeeById(id);

    //   if (employee) {
    //     this.editMode = true;
    //     this.selectedEmployeeId = employee.id;

    //     this.employeeForm.patchValue({
    //       name: employee.name,
    //       email: employee.email,
    //       mobile: employee.mobile,
    //       department: employee.department
    //     });
    //   }
    // }

    //BehaviorSubject ------

    // this.employeeservice.selectedemp$        
    //   .subscribe(employee => {
    //     if (employee) {
    //       
    //       });
    //     }
    //   });

  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      console.log("Form data invalid");
      return;
    }

    console.log("Emloyee Form : ",this.employeeForm.value);

    const newEmployee = {
      //no need to add id in json , it will create automatically

      _id: this.editMode
        ? this.selectedEmployeeId
        : undefined,
      // : Date.now(),

      name: this.employeeForm.value.name || '',
      email: this.employeeForm.value.email || '',
      mobile: this.employeeForm.value.mobile || '',
      department: this.employeeForm.value.department || '',
      password: this.employeeForm.value.password ||'',
      role: this.employeeForm.value.role
    };

    console.log("New EMP: ",newEmployee);

    if (this.editMode) {

      //JSON Server Version----

      console.log("Updating employee", newEmployee);

      this.employeeservice.updateEmployee(newEmployee).subscribe(() => {
        this.snackbar.open(
          'Employee Updated Successfully',
          'close',
          {
            duration: 3000
          }
        );
        this.employeeForm.reset();
        this.editMode = false;

        this.router.navigate(
          ['/employees']
        );

      });
      return;

      //LocalStorage Version---

      // this.employeeservice.updateEmployee(newEmployee);
      // this.snackbar.open(
      //   'Employee Updated Successfully',
      //   'Close',
      //   {
      //     duration: 3000
      //   }
      // );
    }

    else {
      //JSON Server Version---

      this.employeeservice
        .addEmployee(newEmployee)
        .subscribe(() => {

          this.snackbar.open(
            'Employee Added Successfully',
            'Close',
            {
              duration: 3000
            }
          );

          this.employeeForm.reset();
          this.router.navigate(['/employees']);

        });

      //LocalStorage Version---

      // this.employeeservice.addEmployee(newEmployee);
      // this.snackbar.open(
      //   'Employee Added Successfully',
      //   'Close',
      //   {
      //     duration: 3000
      //   }
      // );
      return;
    }

    // this.employeeForm.reset();
    this.editMode = false;
    // this.employeeservice.addEmployee(newEmployee);
    // console.log("employee Added....")
    // console.log(this.employeeForm.value);
    // this.employeeForm.reset();

    // Navigate back to employee list
    // this.router.navigate(['/employees']);

  }
}
