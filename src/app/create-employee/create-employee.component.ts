import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employeeClass';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  employee: I_Employee = new Employee();

  constructor(private router: Router) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  saveEmployee() {
    // this.employeeService.createEmployee(this.employee).subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.goToEmployeeList();
    //   },
    //   (error) => console.log(error)
    // );
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
  onSubmit() {}
}
