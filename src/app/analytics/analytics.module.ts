import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSelectModule, MatTabsModule, MatToolbarModule, MatCardModule, MatDividerModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsService } from './analytics.service';
import { TimeagoModule } from 'ngx-timeago';




const routes: Routes = [
  {
    path      : '',
    component : AnalyticsComponent,
    resolve   : {
      data: AnalyticsService
    }
  }
];


@NgModule({
  imports: [
    TimeagoModule,
    MatDividerModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
MatCardModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
    }),
    ChartsModule,
    NgxChartsModule,

    FuseSharedModule,
    FuseWidgetModule

  ],
  declarations: [
    AnalyticsComponent
  ],
  providers :[
    AnalyticsService
  ]
})
export class AnalyticsModule { }
