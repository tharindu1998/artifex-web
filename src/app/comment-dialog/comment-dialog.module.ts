import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CommentDialogComponent } from './comment-dialog.component';
import { MatMenuModule, MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { TimeagoModule } from 'ngx-timeago';
import { UserRouteAccessService } from 'app/core';
import { MaterialCDKModule } from 'app/_material/cdk/material.cdk.module';


  // const routes: Routes = [
  //   {
  //     path: 'comment-dialog',
  //     component: CommentDialogComponent,
  //   }
  // ]

@NgModule({
  imports: [
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MaterialCDKModule,
    FormsModule,
    ReactiveFormsModule,
    PickerModule,
    EmojiModule,
    TimeagoModule,
    // RouterModule.forChild(routes)
    
  ],
  declarations: []
})
export class CommentDialogModule { }
