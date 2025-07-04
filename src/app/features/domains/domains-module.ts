import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DOMAINS_ROUTES } from './domains-routing';
import { Hr } from './hr/hr';
import { Finance } from './finance/finance';
import { Accounts } from './accounts/accounts';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Hr, Finance, Accounts,
    RouterModule.forChild(DOMAINS_ROUTES)
  ]
})
export class DomainsModule { }
