import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyRelamComponent } from './my-relam.component'; 
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatDividerModule, MatIconModule, MatTabsModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FeedComponent } from './feed/feed.component';

const appRoutes: Routes = [

  {
    path: '',
    component: MyRelamComponent,
    children: [
      {
        path: '',
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

    FuseSharedModule
  ],
  declarations: [MyRelamComponent, FeedComponent]
})
export class MyRelamModule { }
