import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumFormComponent } from './album-form.component';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatButtonModule, MatChipsModule, MatFormFieldModule, MatExpansionModule, MatRippleModule, MatPaginatorModule, MatInputModule, MatSnackBarModule, MatSortModule, MatSelectModule, MatTabsModule, MatTableModule, MatStepperModule, MatDividerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialCDKModule } from 'app/_material/cdk/material.cdk.module';
const routes=[
  {
    path: '',
    component: AlbumFormComponent
  }
]
@NgModule({
  imports: [
    MaterialCDKModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatDividerModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    FuseSharedModule,
        FuseWidgetModule,
       
  ],
  declarations: [
    AlbumFormComponent

  ]
})
export class AlbumFormModule { }
