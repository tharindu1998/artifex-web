import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from 'time-ago-pipe';
import { MatMenuModule, MatIconModule, MatDialogModule, MatCardModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatChipsModule, MatRippleModule, MatSelectModule, MatPaginatorModule, MatSortModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatOptionModule, MatGridListModule, MatButtonToggleModule, MatDividerModule } from '@angular/material';
import { PreviewDialogComponent } from './preview-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { LayoutModule } from '@angular/cdk/layout';
import { SampleModule } from 'app/main/sample/sample.module';
import { TimeagoModule } from 'ngx-timeago';
import { TruncateModule } from 'ng2-truncate';
import { FroalaViewModule, FroalaEditorDirective, FroalaEditorModule } from 'src';
import { FroalaComponent } from 'app/main/boards/profile/tabs/timeline/froala.component';
@NgModule({
  imports: [
    TruncateModule,
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,

    MatButtonToggleModule,
    TimeagoModule,
    // Material moment date module
    MatMomentDateModule,
    MatDividerModule,
    // Material
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    // Fuse modules
    FroalaViewModule,
    FroalaEditorModule,

    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,

    // App modules
    LayoutModule,
    SampleModule,

    MatChipsModule,

    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,

    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatOptionModule,
    MatIconModule,
    MatButtonModule,

    // J-Hipster modules


  ],
  declarations: [
    
    PreviewDialogComponent

  ]
})
export class PreviewDialogModule { }
