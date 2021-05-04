import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { FuseNavigationModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { NavbarVerticalStyle1Component } from 'app/layout/components/navbar/vertical/style-1/style-1.component';
import { ProfileService } from 'app/main/boards/profile/profile.service';
import { MessageService } from 'app/services/message.service';

import {MatChipsModule} from '@angular/material/chips';
@NgModule({
    declarations: [
        NavbarVerticalStyle1Component
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,

        FuseSharedModule,
        FuseNavigationModule,
        MatChipsModule
       
    ],
    exports     : [
        NavbarVerticalStyle1Component
    ],
    providers:[
        ProfileService,
        MessageService
    ]
})
export class NavbarVerticalStyle1Module
{
}
