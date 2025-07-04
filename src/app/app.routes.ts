import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'employees',
    loadChildren: () => import('./features/employees/employees-module').then(m => m.EmployeesModule)
  },
  {
    path: 'departments',
    loadChildren: () => import('./features/departments/departments-module').then(m => m.DepartmentsModule)
  },
  {
    path: 'domains',
    loadChildren: () => import('./features/domains/domains-module').then(m => m.DomainsModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
