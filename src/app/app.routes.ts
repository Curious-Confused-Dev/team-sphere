import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { authGuard } from './shared/auth.guard';
import { inject } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { Admin } from './features/admin/admin';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: 'employees',
    loadChildren: () => import('./features/employees/employees-module').then(m => m.EmployeesModule),
    canActivate: [authGuard]
  },
  {
    path: 'departments',
    loadChildren: () => import('./features/departments/departments-module').then(m => m.DepartmentsModule),
    canActivate: [authGuard]
  },
  {
    path: 'domains',
    loadChildren: () => import('./features/domains/domains-module').then(m => m.DomainsModule),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: Admin,
    canActivate: [authGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: 'logout',
    resolve: {
      logout: () => {
        const auth = inject(AuthService);
        const router = inject(Router);
        auth.logout();
        return router.createUrlTree(['/auth']);
      }
    },
    component: Dashboard // Dummy, will redirect
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
