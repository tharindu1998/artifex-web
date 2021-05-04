import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed.component';
import { RouterModule, Route, Routes } from '@angular/router';
import { TimeAgoPipe } from 'time-ago-pipe';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { MatGridListModule, MatDivider, MatDividerModule, MatMenu, MatMenuModule, MatIconModule, MatButtonModule, MatTabsModule, MatDialogModule, MatListModule, MatButtonToggleModule, MatToolbarModule, MatProgressSpinnerModule, MatChipsModule, MatFormFieldModule, MatExpansionModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSortModule, MatSnackBarModule, MatTableModule, MatOptionModule, MatCardModule } from '@angular/material';
import { FroalaEditorModule, FroalaViewModule } from 'src';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseDemoModule, FuseWidgetModule } from '@fuse/components';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { TimeagoModule } from 'ngx-timeago';
import { TruncateModule } from 'ng2-truncate';

const appRoutes: Routes = [
  {
    path: '',
    component: FeedComponent
  }
]

@NgModule({
  imports: [
    MatCardModule,
    TruncateModule,
    CommonModule,
    RouterModule.forChild(appRoutes),
    MatDividerModule,
    MatMenuModule,
    MatIconModule,
    EmojiModule,
    PickerModule,
    MatGridListModule,
    FroalaEditorModule, FroalaViewModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,

    ImageCropperModule,
    
    MatDividerModule,
    
    MatTabsModule,
    
    MatDialogModule,
    
    
    FuseSharedModule,
    
    MatListModule,
    MatButtonToggleModule,
    
    TimeagoModule,

    FuseSidebarModule,

    FuseDemoModule,


    MatToolbarModule,


    MatProgressSpinnerModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    
    MatOptionModule,
    
    
    FuseWidgetModule,
    FroalaEditorModule, FroalaViewModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    // TimeAgoPipe,
    // TimeAgoPipe
   
  ],
  declarations: [
    
    FeedComponent
  ]
})
export class FeedModule { }
