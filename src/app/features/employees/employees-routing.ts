import { Routes } from '@angular/router';
import { EmployeeDetail } from './employee-detail/employee-detail';

export const EMPLOYEES_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./employee-list/employee-list').then(m => m.EmployeeList) },
  { path: ':id', component: EmployeeDetail }
]; 