import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonDialogComponent } from './common-dialog.component';
import { Routes, RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';


const routes:Routes=[
  {
    path: '',
    component: CommonDialogComponent

  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule
  ],
  declarations: [
    CommonDialogComponent
  ]
})
export class CommonDialogModule { }
