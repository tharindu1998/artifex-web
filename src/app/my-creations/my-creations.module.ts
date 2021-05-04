import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCreationsComponent } from './my-creations.component';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatRippleModule, MatMenuTrigger, MatTabsModule, MatToolbarModule, MatMenu, MatMenuModule, MatExpansionModule, MatDividerModule, MatProgressBarModule, MatGridListModule, MatProgressSpinnerModule, MatTooltipModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WritingsComponent } from './writings/writings.component';
import { NewWritingFormComponent } from './writings/new-writing-form/new-writing-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NovelViewerComponent } from './writings/novel-viewer/novel-viewer.component';



import { BrowserModule } from '@angular/platform-browser';

import 'froala-editor/js/plugins.pkgd.min.js';
import { FroalaEditorModule, FroalaViewModule } from 'src';
import { FroalaComponent } from './writings/novel-viewer/froala.component';
import { ComicsComponent } from './comics/comics.component';

import { ComicFormComponent } from './comics/comic-form/comic-form.component';
import { ComicEditorComponent } from './comics/comic-editor/comic-editor.component';

const routes = [
  {
    path: '',
    component: MyCreationsComponent
  },
  {
    path: 'writings',
    component: WritingsComponent
  },
  {
    path: 'writingForm',
    component: NewWritingFormComponent
  },
  {
    path: 'viewContent',
    component: NovelViewerComponent
  },
  {
    path: 'viewContent/:action',
    component: NovelViewerComponent
  },
  {
    path: 'viewContent/:action/:pageid',
    component: NovelViewerComponent
  },
  {
    path: 'comics',
    component: ComicsComponent
  },
  {
    path: 'comic-form',
    component: ComicFormComponent
  },
  {
    path: 'comic-editor',
    component: ComicEditorComponent
  }
 
  
]

@NgModule({
  imports: [
    // BrowserAnimationsModule,
    CommonModule,
    MatMenuModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule,
    MatTabsModule,
    MatToolbarModule,
    MatExpansionModule,
    FroalaEditorModule, FroalaViewModule,
    MatDividerModule,
    MatProgressBarModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  declarations: [
    MyCreationsComponent,
    WritingsComponent,
    NewWritingFormComponent,
    NovelViewerComponent,
    FroalaComponent,
    ComicsComponent,

    ComicFormComponent,
  
    ComicEditorComponent,
  
   
  ],
  
})
export class MyCreationsModule { }
