import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdCampaignComponent } from './ad-campaign.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialCDKModule } from 'app/_material/cdk/material.cdk.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule, MatExpansionModule, MatTabsModule, MatButtonModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';

const routes: Routes = [
  {
    path: '',
    component: AdCampaignComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    MaterialCDKModule,
    CommonModule,
    LayoutModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatExpansionModule,
    MatTabsModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,

    FuseSharedModule,
    FuseWidgetModule

  ],
  declarations: [AdCampaignComponent]
})
export class AdCampaignModule { }
