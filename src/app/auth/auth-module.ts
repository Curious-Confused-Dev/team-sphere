import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Login } from './login/login';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: Login },
      { path: 'login', component: Login }
    ]),
    Login
  ]
})
export class AuthModule {}
