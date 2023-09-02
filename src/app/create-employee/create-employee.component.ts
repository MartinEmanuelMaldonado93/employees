import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employeeClass';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  employee = new Employee();

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  saveEmployee() {
    this.employeeService.createEmployee(this.employee).subscribe({
      next: (data) => {
        console.log(data);
        this.goToEmployeeList();
      },
      error: (error) => console.log(error),
    });
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  onSubmit() {
    console.log(this.employee);
    this.saveEmployee();
  }
}
