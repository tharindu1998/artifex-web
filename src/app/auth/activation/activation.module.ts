import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ActivationComponent } from './activation.component';

const routes: Routes = [
  {
    path: '',
    component: ActivationComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ActivationComponent
  ]
})
export class ActivationModule { }
