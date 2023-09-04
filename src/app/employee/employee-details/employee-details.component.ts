import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employeeClass';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  id: number;
  employee: Employee;
  private route = inject(ActivatedRoute);
  private employeService = inject(EmployeeService);

  constructor() {
    this.employee = new Employee();
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.employeService.getEmployeeById(this.id).subscribe((emp) => {
      this.employee = emp;
    });
  }
}
