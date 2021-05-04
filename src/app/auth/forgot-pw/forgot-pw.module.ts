import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPWComponent } from './forgot-pw.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
const routes = [
  {
      path: '',
      children: [
          {
              path: '',
              component: ForgotPWComponent
          }]
  }
];

@NgModule({
  imports: [
    
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FuseSharedModule

  ],
  declarations: [ForgotPWComponent]
})
export class ForgotPWModule { }
