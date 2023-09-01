import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fakeEmployees } from '../fakeData';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees?: I_Employee[];

  constructor(
    // private employeeService: EmployeeService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.employees = fakeEmployees;
    // this.getEmployees();
  }

  // private getEmployees(): void {
  //   const listEmployeeObs = this.employeeService.getEmployeesList();

  //   listEmployeeObs.subscribe((data) => (this.employees = data));
  // }

  updateEmployee(id: number) {
    this.router.navigate(['update-employee', id]);
  }

  // deleteEmployee(id: number) {
  //   const deletedEmployeeObs = this.employeeService.deleteEmployee(id);

  //   deletedEmployeeObs.subscribe((data) => {
  //     console.log(data); // item deleted
  //     this.getEmployees();
  //   });
  // }
}
