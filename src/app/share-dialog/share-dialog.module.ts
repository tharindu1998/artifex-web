import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareDialogComponent } from './share-dialog.component';
import { MatToolbarModule, MatGridListModule, MatProgressBarModule } from '@angular/material';
import { FroalaEditorModule, FroalaViewModule } from 'src';
import { FroalaComponent } from 'app/main/boards/profile/tabs/timeline/froala.component';
import { FormsModule } from '@angular/forms';
import { MaterialCDKModule } from 'app/_material/cdk/material.cdk.module';

@NgModule({
  imports: [
    CommonModule,
   
    FroalaEditorModule,
    FroalaViewModule,
     FormsModule,
    MaterialCDKModule
    // MatGridTile
  ],
  declarations: [
    // FroalaComponent,
    ShareDialogComponent
  ]
})
export class ShareDialogModule { }
