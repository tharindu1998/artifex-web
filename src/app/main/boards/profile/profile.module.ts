import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatDividerModule, MatIconModule, MatTabsModule, MatMenuModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSortModule, MatSelectModule, MatTableModule, MatSnackBarModule, MatListModule, MatToolbarModule, MatDialogModule, MatButtonToggleModule, MatProgressSpinnerModule, MatOptionModule, MatGridListModule, MatCardModule } from '@angular/material';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FuseSharedModule } from '@fuse/shared.module';
import { ProfileComponent, PopUp } from './profile.component';

import { ProfileTimelineComponent } from './tabs/timeline/timeline.component';
import { ProfileService } from './profile.service';
import { ProfileAboutComponent } from './tabs/about/about.component';
import { ProfilePhotosVideosComponent } from './tabs/photos-videos/photos-videos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'src';
import { FuseSidebarModule, FuseDemoModule, FuseWidgetModule } from '@fuse/components';
import { PicturesComponent } from './tabs/photos-videos/pictures/pictures.component';
import { AlbumsComponent } from './tabs/photos-videos/albums/albums.component';
import { SharedAlbumsComponent } from './tabs/photos-videos/shared_albums/shared-albums.component';
import { StoriesComponent } from './tabs/photos-videos/stories/stories.component';
import { MaterialCDKModule } from 'app/_material/cdk/material.cdk.module';
import { MessageService } from 'app/services/message.service';
import { AllDetailsService } from 'app/services/all-details.service';
import { AlbumPreviewComponent } from './tabs/photos-videos/albums/album-preview/album-preview.component';
import { BrowserModule } from '@angular/platform-browser';
import { AlbumService } from 'app/services/album.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'environments/environment';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from 'time-ago-pipe';
import { PostPublicityService } from 'app/services/post-publicity.service';
import { ImagePostUploadService } from 'app/services/post-handle.service';
import { FroalaComponent } from './tabs/timeline/froala.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TimeagoModule } from 'ngx-timeago';


const routes = [
    {
        path: '',
        component: ProfileComponent,
        // resolve: {
        //     profile: ProfileService
        // }
    },
    {
        path: 'photo',
        component: ProfilePhotosVideosComponent
    },
    {
        path: 'albumPreview',
        component: AlbumPreviewComponent
    },

];

@NgModule({
    declarations: [

        // TimeAgoPipe,

        ProfileComponent,

        ProfileTimelineComponent,

        ProfileAboutComponent,

        ProfilePhotosVideosComponent,


        PicturesComponent,


        AlbumsComponent,

        SharedAlbumsComponent,

        StoriesComponent,

        PopUp,

        AlbumPreviewComponent,

    ],
    imports: [
        PickerModule, EmojiModule,
        TimeagoModule,
        CommonModule,
        RouterModule.forChild(routes),
        ImageCropperModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        MatMenuModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        FuseSharedModule,
        MatDividerModule,
        MatListModule,
        MatButtonToggleModule,
        MatGridListModule,
        InfiniteScrollModule,
        MatCardModule,
        FuseSidebarModule,
        MaterialCDKModule,
        FuseDemoModule,


        MatToolbarModule,


        MatProgressSpinnerModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatMenuModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatOptionModule,
        MatIconModule,
        MatButtonModule,
        FuseWidgetModule,
        FroalaEditorModule, FroalaViewModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,


    ],
    providers: [
        ProfileService,
        AlbumService,
        MessageService,
        AllDetailsService,
        AngularFireStorage,
        PostPublicityService,
        ImagePostUploadService,

    ],
    entryComponents: [PopUp]
})
export class ProfileModule {
}
