import { Component, OnDestroy, OnInit, ViewEncapsulation, ChangeDetectorRef, ViewContainerRef, ViewChild, Input } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';


import { takeUntil } from 'rxjs/operators';
import { Subject, Observable, Subscription } from 'rxjs';
import { ProfileService } from '../../profile.service';
import * as moment from 'moment';

import { IUserProfilePicture, UserProfilePicture } from 'app/shared/model/userProfile/user-profile-picture.model';
import { JhiDataUtils, JhiParseLinks } from 'ng-jhipster';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Principal } from 'app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITEMS_PER_PAGE } from 'app/shared';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'profile-photos-videos',
    templateUrl: './photos-videos.component.html',
    styleUrls: ['./photos-videos.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProfilePhotosVideosComponent implements OnInit, OnDestroy {
    ngOnInit(): void {
    
    }
    ngOnDestroy(): void {
    
    } 
    @Input() index 

    constructor(
        private _profileService: ProfileService,
        private changeDetectorRefs: ChangeDetectorRef,
        private viewContainerRef: ViewContainerRef,
        private router: Router
    ) { 

    }

    createAlbum(){
        this.router.navigate(['/albumCreator']);
    }

}
