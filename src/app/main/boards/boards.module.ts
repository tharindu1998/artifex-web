import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,  RouterModule } from '@angular/router';
import { TimeAgoPipe } from 'time-ago-pipe';
import { ProfileModule } from './profile/profile.module';
import { ArtdenModule } from './artden/artden.module';
import { UserRouteAccessService } from 'app/core';

const routes: Routes  = [
  {
    path: 'artden',
    loadChildren: './artden/artden.module#ArtdenModule',
    data: {
      authorities: ['ROLE_USER']
  },
  canActivate: [UserRouteAccessService]
  },
  {
    path: 'artden/:routeId',
    loadChildren: './artden/artden.module#ArtdenModule',
    data: {
      authorities: ['ROLE_USER']
  },
  canActivate: [UserRouteAccessService]
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule',
    data: {
      authorities: ['ROLE_USER']
  },
  canActivate: [UserRouteAccessService]
  },
  {
    
    path: 'profile/:routeId',
    loadChildren: './profile/profile.module#ProfileModule',
    data: {
      authorities: ['ROLE_USER']
  },
  canActivate: [UserRouteAccessService]
  }
 
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProfileModule,
    ArtdenModule
  ],
  declarations: [
    // TimeAgoPipe,
  ],
 
 
})
export class BoardsModule { }
