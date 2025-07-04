import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DEPARTMENTS_ROUTES } from './departments-routing';
import { DepartmentList } from './department-list/department-list';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DepartmentList,
    RouterModule.forChild(DEPARTMENTS_ROUTES)
  ]
})
export class DepartmentsModule { }
