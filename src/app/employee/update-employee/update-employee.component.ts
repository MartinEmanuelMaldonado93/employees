import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employeeClass';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  id: number = 0;
  employee: Employee = new Employee();

  constructor() {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employeeService.getEmployeeById(this.id).subscribe({
      next: (emp) => (this.employee = emp),
      error: (error) => console.log(error),
    });
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.id, this.employee).subscribe({
      next: (data) => this.goToEmployeeList(),
      error: (error) => console.log(error),
    });
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
}
