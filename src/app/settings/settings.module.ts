import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { SecuritySettingsComponent } from './security-settings/security-settings.component';
import { Routes, RouterModule } from '@angular/router';
import {  
  MatTabsModule, 
  MatRadioModule, 
  MatDatepickerModule, 
  MatStepperModule, 
  MatSelectModule, 
  MatInputModule, 
  MatIconModule, 
  MatDialogModule,
  MatFormFieldModule, 
  MatButtonModule, 
  MatToolbarModule,
  MatDividerModule} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MaterialCDKModule } from 'app/_material/cdk/material.cdk.module';

const routes :Routes =[
  {
    path : '',
    pathMatch :'full',
    redirectTo:'account'
  },
  {
    path:'general',
    component:GeneralSettingsComponent
  },
  {
    path:'account',
    component:AccountSettingsComponent
  },
  {
    path:'security',
    component:SecuritySettingsComponent
  }
  
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule, 
    MatFormFieldModule, 
    MatIconModule, 
    MatInputModule, 
    MatSelectModule, 
    MatStepperModule,
    FuseSharedModule,
    MatTabsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatRadioModule,
    ImageCropperModule ,
    MatToolbarModule,
    MatDividerModule,
    MaterialCDKModule
  ],
  declarations: 
  [
    GeneralSettingsComponent, 
    AccountSettingsComponent, 
    SecuritySettingsComponent
  ]
})
export class SettingsModule { }
