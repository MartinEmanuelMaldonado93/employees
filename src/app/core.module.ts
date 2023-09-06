import { NgModule } from '@angular/core';
import { EmployeeService } from './employee/employee.service';
import { SharingService } from './sharing.service';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [EmployeeService, SharingService],
})
export class CoreModule { }
