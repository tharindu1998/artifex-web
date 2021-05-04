import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginOrRegisterOpinionComponent } from './login-or-register-opinion.component';
import { Routes, RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material';

const routes: Routes=[{
  path:'loginOrRegister',
  component: LoginOrRegisterOpinionComponent
}]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDividerModule,  
  
  ],
  declarations: [
    LoginOrRegisterOpinionComponent
  ]
})
export class LoginOrRegisterOpinionModule { }
