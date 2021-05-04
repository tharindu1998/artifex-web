import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPWComponent } from './reset-pw.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
 {
      path: '',
      children: [
          {
              path: '',
              component: ResetPWComponent
          }]
  }
];

@NgModule({
  imports: [

    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FuseSharedModule
    
  ],
  declarations: [ResetPWComponent]
})
export class ResetPWModule { }
