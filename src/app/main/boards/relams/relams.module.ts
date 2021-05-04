import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelamsComponent } from './relams.component'; 
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatDividerModule, MatIconModule, MatTabsModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { FeedComponent } from './feed/feed.component';

const appRoutes: Routes = [

  {
    path: '',
    component: RelamsComponent,
    children:[
      {
        path:'',
        component: FeedComponent
       
      }
    ]
  }

];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTabsModule,

    FuseSharedModule,
    FuseWidgetModule
  ],
  declarations: [RelamsComponent, FeedComponent]
})
export class RelamsModule { }
