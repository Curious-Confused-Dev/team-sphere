import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EMPLOYEES_ROUTES } from './employees-routing';
import { EmployeeList } from './employee-list/employee-list';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    EmployeeList,
    RouterModule.forChild(EMPLOYEES_ROUTES)
  ]
})
export class EmployeesModule { }
