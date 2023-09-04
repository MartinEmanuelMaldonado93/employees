import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employeeClass';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  private router = inject(Router);
  private employeeService = inject(EmployeeService);

  employee = new Employee();

  constructor() {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    console.log('on init...');
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
