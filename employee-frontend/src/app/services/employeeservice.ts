import { BehaviorSubject } from 'rxjs';
import { Employeemodal } from '../models/employee.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class Employeeservice {

    //JSON Server HTTP
    // private apiurl = 'http://localhost:3000/employees';

    //Node.js + MongoDB HTTP
    private apiurl = 'http://localhost:5000/employees';

    // -------------------------
    //Array declaration
    //--------------------------
    employees: Employeemodal[] = [
        {
            _id: '1',
            name: 'Shivkanya Kakade',
            email: 'shivkanyakakade99@gmail.com',
            mobile: '9021473771',
            department: 'IT'
        },
        {
            _id: '2',
            name: 'Rahul Patil',
            email: 'rahul@gmail.com',
            mobile: '9876543210',
            department: 'HR'
        }
    ];

    private empsubject = new BehaviorSubject(this.employees);
    private selectedemp = new BehaviorSubject<any>(null);
    selectedemp$ = this.selectedemp.asObservable();

    constructor(private http: HttpClient) {

        // -------------------------
        //LocalStorage Version 
        //--------------------------

        const savedEmployees = localStorage.getItem('employees');
        if (savedEmployees) {
            this.employees = JSON.parse(savedEmployees);
        }
        this.empsubject.next(this.employees);
    }

    getEmployees(): Observable<Employeemodal[]> {

        // -------------------------
        //JSON server Version
        //--------------------------

        return this.http.get<Employeemodal[]>(this.apiurl);


        // -------------------------
        //Array Version
        //--------------------------

        // getEmployees(): Employeemodal[] {
        //     return this.employees;
        // }

        //of() emits data only once
        // getEmployees(): Observable<Employeemodal[]> {
        //     return of(this.employees);
        // }

        // -------------------------
        //BehaviorSubject Version
        //--------------------------

        //because BehaviorSubject can .next() and change data BUT Observable can only subscribe() : 
        // So components can read data but cannot accidentally modify it.
        // getEmployees() {
        //     return this.empsubject.asObservable();
        // }

    }


    addEmployee(employee: any) {

        // -------------------------
        //JSON server Version
        //--------------------------
        //using HTTP POST
        return this.http.post<Employeemodal>(
            this.apiurl,
            employee
        );

        // -------------------------
        //ARRRAY Version
        //--------------------------
        // this.employees.push(employee);
        // this.empsubject.next(this.employees);

        // -------------------------
        //BehaviorSubject Version
        //--------------------------
        // const updated = [...this.employees, employee];
        // this.employees = updated;

        // -------------------------
        //LocalStorage Version
        //--------------------------
        // this.employees = [...this.employees, employee];
        // localStorage.setItem('employees', JSON.stringify(this.employees));
        // this.empsubject.next(this.employees);

    }


    deleteEmployee(id: any) {

        //JSON Server Version
        console.log('deleting', `${this.apiurl}/${id}`)
        return this.http.delete(
            `${this.apiurl}/${id}`
        );

        //Array-Version
        // this.employees = this.employees.filter(
        //     emp => emp.id !== id
        // );

        //LocalStorage-Version
        // localStorage.setItem('employees', JSON.stringify(this.employees));

        //BehaviorSubject Version
        // this.empsubject.next(this.employees);



    }

    updateEmployee(updatedEmployee: any) {

        //JSON Server Version
        console.log("Service REceived ", updatedEmployee);
        return this.http.put(`${this.apiurl}/${updatedEmployee._id}`, updatedEmployee);

        //Array Version

        // this.employees = this.employees.map(emp =>
        //     emp.id === updatedEmployee.id
        //         ? updatedEmployee
        //         : emp
        // );

        //LocalStorage Version

        // localStorage.setItem(
        //     'employees',
        //     JSON.stringify(this.employees)
        // );


        //BehaviorSubject Version
        // this.empsubject.next(this.employees);
    }


    editEmployee(employee: Employeemodal) {
        this.selectedemp.next(employee);
    }


    getEmployeeById(id: any) {

        //Json Server VErsion

        return this.http.get<Employeemodal>(`${this.apiurl}/${id}`);

        //Array-VErsion

        // return this.employees.find(
        //     emp => emp.id === id
        // );

    }


}




