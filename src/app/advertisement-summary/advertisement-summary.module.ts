import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementSummaryComponent } from './advertisement-summary.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialCDKModule } from 'app/_material/cdk/material.cdk.module';
import { TimeagoModule } from 'ngx-timeago';

const routes: Routes = [
  {
    path: '',
    component: AdvertisementSummaryComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialCDKModule,
    TimeagoModule,
  ],
  declarations: [
    AdvertisementSummaryComponent
  ]
})
export class AdvertisementSummaryModule { }
