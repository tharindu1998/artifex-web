import { Injectable } from '@angular/core';
import { User, Principal } from 'app/core';
import { ICreator, Creator } from 'app/shared/model/userProfile/creator.model';
import { ProfileService } from 'app/main/boards/profile/profile.service';
import { IFullProfileDetails, FullProfileDetails } from 'app/shared/model/userProfile/FullProfileDetails.model';
import { Observable, Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { UserProfilePicture } from 'app/shared/model/userProfile/user-profile-picture.model';

@Injectable({
  providedIn: 'root'
})
export class AllDetailsService {

  public user: IFullProfileDetails;

  constructor(
    private principal: Principal,
    private profileService: ProfileService
  ) { }

  getAllUserDetails() {

   this.user = new FullProfileDetails();

    this.principal.identity().then(account => {

         //console.log(JSON.stringify(account));
        this.user.account = account;

    this.profileService.getDetails(account.id).subscribe(
          res => {
            
            this.user.userProfileDetails = new Creator(res.body.userProfile,res.body.userProfilePicture);
             // console.log(JSON.stringify(this.user));
             this.notificationeSource.next(  { topic : "UUU" , message: this.user}  )  
              
          },
          err => {
              // alert("Cannot get details");
              return;
          }
      );

    });
  //  alert('From all details' + JSON.stringify(this.user));
    return this.notificationeSource.asObservable();


  }

  private notificationeSource = new Subject<{ topic: string, message: any }>();







}
