import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatCardModule, MatProgressBar, MatProgressBarModule, MatToolbarModule, MatDividerModule, MatSelectModule, MatRadioModule, MatTabsModule, MatGridListModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';

import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeDbService } from './fake-db/fake-db.service';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';
import { GatewaySharedModule } from './shared';
import { GatewayCoreModule, UserRouteAccessService } from './core';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreviewDialogComponent } from './preview-dialog/preview-dialog.component';
import { AlbumFormComponent } from './album-form/album-form.component';
import { environment } from 'environments/environment';
import { AngularFireModule } from '@angular/fire';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from 'time-ago-pipe';
import { PreviewDialogModule } from './preview-dialog/preview-dialog.module';
import { EditorComponent } from './editor/editor.component';
import { FroalaEditorModule, FroalaViewModule } from 'src';
import { MyCreationsComponent } from './my-creations/my-creations.component';
import { AcademyCoursesService } from './services/courses.service';
import { AcademyCourseService } from './services/course.service';
import { TooltipContentComponent } from './tooltip-content/tooltip-content.component';
import { FriendRequestViewerComponent } from './friend-request-viewer/friend-request-viewer.component';
import { FriendRequestMainComponent } from './friend-request-main/friend-request-main.component';


import { ComicTemplatesComponent } from './comic-templates/comic-templates.component';

import { PublishNovelComponent } from './publish-novel/publish-novel.component';
import { ChatService } from './services/chat.service';
import { MessageTestService } from './services/messageTest.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { MessagingService } from './services/messaging.service';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TimeagoModule } from 'ngx-timeago';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component'; 
import { ArticleWriterComponent } from './article-writer/article-writer.component';
import { CommentDialogModule } from './comment-dialog/comment-dialog.module';
import { FroalaComponent } from './main/boards/profile/tabs/timeline/froala.component';
import { ShareDialogModule } from './share-dialog/share-dialog.module';
import { MaterialCDKModule } from './_material/cdk/material.cdk.module';
import { ActivationComponent } from './auth/activation/activation.component';
import { ActivationModule } from './auth/activation/activation.module';
import { ActivationService } from './services/activation.service';
import { LoginOrRegisterOpinionComponent } from './auth/login-or-register-opinion/login-or-register-opinion.component';
import { AdvertisementSummaryComponent } from './advertisement-summary/advertisement-summary.component';
import { ReportComponent } from './report/report.component';
import { CommonDialogComponent } from './common-dialog/common-dialog.component';





const appRoutes: Routes = [

    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'comicThumbs',
        loadChildren: './comic-templates/comic-templates.module#ComicTemplatesModule',
        // data: {
        //     authorities: ['ROLE_USER']
        // },
        // canActivate: [UserRouteAccessService]
    },

    {
        path: 'home',
        loadChildren: './landing/landing.module#LandingModule'
    },
    {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule',
        // data: {
        //     authorities: ['ROLE_USER']
        // },
        // canActivate: [UserRouteAccessService]
    },
    {
        path: 'signup',
        loadChildren: './auth/signup/signup.module#SignupModule'
    },
    {
        path: 'activation',
        loadChildren: './auth/activation/activation.module#ActivationModule'
    },
    {
        path: 'login',
        loadChildren: './auth/login/login.module#LoginModule'
    },
    {
        path: 'reset',
        loadChildren: './auth/reset-pw/reset-pw.module#ResetPWModule'
    },
    {
        path: 'forgotPassword',
        loadChildren: './auth/forgot-pw/forgot-pw.module#ForgotPWModule'
    },
    {
        path: 'login/accessdenied',
        loadChildren: './auth/login/login.module#LoginModule'
    },
    {
        path: 'previewDialog',
        loadChildren: './preview-dialog/preview-dialog.module#PreviewDialogModule',
        // data: {
        //     authorities: ['ROLE_USER']
        // },
        // canActivate: [UserRouteAccessService]
    },
    {
        path: 'shareDialog',
        loadChildren: './share-dialog/share-dialog.module#ShareDialogModule',
        // data: {
        //     authorities: ['ROLE_USER']
        // },
        // canActivate: [UserRouteAccessService]
    },
    // {
    //     path: 'create-ad',
    //     loadChildren: './create-ad-form/create-ad-form.module#CreateAdFormModule',
     
    // }, 
      {
        path: 'create-ad',
        loadChildren: './ad-campaign/ad-campaign.module#AdCampaignModule',
 
    },
   
    {
        path: 'tooltip',
        loadChildren: './tooltip-content/tooltip-content.module#TooltipContentModule',
        // data: {
        //     authorities: ['ROLE_USER']
        // },
        // canActivate: [UserRouteAccessService]
    },
    {
        path: 'albumCreator',
        loadChildren: './album-form/album-form.module#AlbumFormModule',
        // data: {
        //     authorities: ['ROLE_USER']
        // },
        // canActivate: [UserRouteAccessService]
    },
    {
        path: 'textEditor',
        loadChildren: './editor/editor.module#EditorModule',
        // data: {
        //     authorities: ['ROLE_USER']
        // },
        // canActivate: [UserRouteAccessService]
    },

    {
        path: 'creations',
        loadChildren: './my-creations/my-creations.module#MyCreationsModule',
        // data: {
        //     authorities: ['ROLE_USER']
        // },
        // canActivate: [UserRouteAccessService]
    },
    {
        path: 'friendRequestViewer',
        component: FriendRequestViewerComponent
    },
    {
        path: 'friendRequestMain',
        component: FriendRequestMainComponent
    },
    {
        path: 'publish',
        component: PublishNovelComponent
    },
    {
        path: 'comment-dialog',
        component: CommentDialogComponent
    },
    {
        path: 'boards',
        loadChildren: './main/boards/boards.module#BoardsModule',
        data: {
            authorities: ['ROLE_USER']
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'analytics',
        loadChildren: './analytics/analytics.module#AnalyticsModule',
      
    },
    {
        path:'LoginOrRegister',
        loadChildren:'./auth/login-or-register-opinion/login-or-register-opinion.module#LoginOrRegisterOpinionModule'
    },
    {
        path: 'advertisement-summary',
        loadChildren: './advertisement-summary/advertisement-summary.module#AdvertisementSummaryModule'
    },
    {
        path: 'commonDialog',
        loadChildren: './common-dialog/common-dialog.module#CommonDialogModule'

    }
  
    // {
    //     path: 'artden',
    //     loadChildren: './main/boards/artden/artden.module#ArtdenModule',
    //     data: {
    //         authorities: ['ROLE_USER']
    //     },
    //  canActivate: [UserRouteAccessService]
    // }, {
    //         path: 'relams',
    //         loadChildren: './main/boards/relams/relams.module#RelamsModule',
    //         data: {
    //             authorities: ['ROLE_USER']
    //         },
    // //    canActivate: [UserRouteAccessService]
    //     },  {
    //         path: 'profile',
    //         loadChildren: './main/boards/profile/profile.module#ProfileModule',
    //         data: {
    //             authorities: ['ROLE_USER']
    //         },
    //     // canActivate: [UserRouteAccessService]
    //     },
    // {
    //     path: 'profile/:routeId',
    //     loadChildren: './main/boards/profile/profile.module#ProfileModule',
    //     data: {
    //         authorities: ['ROLE_USER']
    //     },
    // canActivate: [UserRouteAccessService]
    // }


];

@NgModule({
    declarations: [
        TimeAgoPipe,
        AppComponent,
        DialogBoxComponent,
        TooltipContentComponent,
        FriendRequestViewerComponent,
        FriendRequestMainComponent,
        ComicTemplatesComponent,
        PublishNovelComponent,
        CommentDialogComponent,
        FroalaComponent,
       
        ReportComponent,
        // CommonDialogComponent,
       




    ],
    imports: [
       
        ShareDialogModule,
        // CommentDialogModule,
        MatGridListModule,
        MatToolbarModule,
        PreviewDialogModule,
        FormsModule,
        ReactiveFormsModule,
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),

        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),


        // Material moment date module
        MatMomentDateModule,
        MatProgressBarModule,
        // Material
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatDialogModule,
        MatTableModule,
        MatDividerModule,
        MatTabsModule,
        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        MatDividerModule,
        MatSelectModule,
        MatRadioModule,
        // App modules
        LayoutModule,
        SampleModule,
        InfiniteScrollModule,
        // J-Hipster modules
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            alertTimeout: 5000
        }),
        GatewaySharedModule.forRoot(),
        GatewayCoreModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        FroalaEditorModule, FroalaViewModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireMessagingModule,
        MaterialCDKModule,
        TimeagoModule.forRoot()
    ],
    bootstrap: [
        AppComponent
    ],

    entryComponents: [
        // CommonDialogComponent,
        DialogBoxComponent, PreviewDialogComponent, ShareDialogComponent, ComicTemplatesComponent, CommentDialogComponent,TooltipContentComponent],
    providers:
        [
            ActivationService,
            AngularFireStorage,
            AcademyCoursesService,
            AcademyCourseService,
            ChatService,
            MessageTestService,
            MessagingService,
            { provide: MatDialogRef, useValue: {} },
            { provide: MAT_DIALOG_DATA, useValue: [] }]
})
export class AppModule {
}


