import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: I_Employee[] = [];
  loading = false;
  private refresh$ = new Subject<void>();

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refresh$
      .pipe(
        tap(() => (this.loading = true)), // Show loading spinner
        switchMap(() => this.getEmployees()), // Make the HTTP request
        tap(() => (this.loading = false)), // Hide loading spinner
        catchError((error) => {
          // Handle errors and show error message
          console.error('Error fetching employees:', error);
          // You can also display an error message to the user here
          throw error; // Rethrow the error to propagate it further
        })
      )
      .subscribe((employees) => {
        console.log('hello', employees);
        this.employees = employees;
      });
    this.onRefreshClick();
  }
  // Trigger a refresh when the user clicks a button or some other event
  onRefreshClick() {
    this.refresh$.next();
  }

  private getEmployees(): Observable<I_Employee[]> {
    console.log('getEmployees');
    return this.employeeService.getEmployeesList();
    // const listEmployeeObs = this.employeeService.getEmployeesList();
    // listEmployeeObs.subscribe((data) => (this.employees = data));
  }

  updateEmployee(id: number) {
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number) {
    /** TODO should show a spinner and then deleted from the ui */
    this.employeeService.deleteEmployee(id).subscribe({
      complete: () => console.log('simple complete message'), // item deleted
      error: () => console.log('error happends'),
      next: (value) => {
        this.employees = this.employees.filter((emp) => emp.id !== id);
        console.log(value);
      },
    });
  }
}
