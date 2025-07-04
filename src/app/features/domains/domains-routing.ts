import { Routes } from '@angular/router';
import { Hr } from './hr/hr';
import { Finance } from './finance/finance';
import { Accounts } from './accounts/accounts';

export const DOMAINS_ROUTES: Routes = [
  { path: '', component: Hr },
  { path: 'finance', component: Finance },
  { path: 'accounts', component: Accounts },
]; 