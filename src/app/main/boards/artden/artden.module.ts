import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtdenComponent } from './artden.component';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { MatButtonModule, MatDividerModule, MatIconModule, MatTabsModule, MatSelectModule, MatOptionModule, MatMenuModule, MatGridList, MatGridListModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { ProfileService } from './profile.service';
import { TimeAgoPipe } from 'time-ago-pipe';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { FroalaEditorModule, FroalaViewModule } from 'src';
import { FeedModule } from './feed/feed.module';
import { TimeagoModule } from 'ngx-timeago';
import { TruncateModule } from 'ng2-truncate';
const appRoutes: Routes = [

  {
    path: '',
    loadChildren: './feed/feed.module#FeedModule'
  }

];


@NgModule({
  imports: [
    FeedModule,
    CommonModule,
    RouterModule.forChild(appRoutes),
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
    MatOptionModule,
    FuseSharedModule,
    MatMenuModule,
    MatGridListModule,
    EmojiModule,
    PickerModule,
    FroalaEditorModule, FroalaViewModule,
    TimeagoModule,
    TruncateModule

  ],
  providers: [
    ProfileService,

  ],
  declarations: [
    ArtdenComponent,
    // TimeAgoPipe
  ]
})
export class ArtdenModule { }
