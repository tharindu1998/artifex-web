import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserProfile, UserProfile } from 'app/shared/model/userProfile/user-profile.model';
import { Principal, IUser, User } from 'app/core';
import { UserProfileSettingsService } from 'app/services/user-profile-settings.service';
import { fuseAnimations } from '@fuse/animations';
import { HttpResponse } from '@angular/common/http';
import { IAddress } from 'app/shared/model/userProfile/address.model';
import { ProfileService } from 'app/main/boards/profile/profile.service';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { MessageTestService } from 'app/services/messageTest.service';




@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss'],
  animations: fuseAnimations
})
export class GeneralSettingsComponent implements OnInit {

  allDetails:IUserProfile;
  completeUserDetails: IUserProfile;
  user: IUser;
  address : IAddress;
 
  
  // address1: string;
  // address2: string;
  // city:string;
  // state:string;
  // country: string;
  // postalCode: string;

  form: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private principal: Principal,
    private userProfileService: UserProfileSettingsService,
    private profileService: ProfileService,
    private router:Router,
    private _snackBar: MatSnackBar,
    private messageTestService: MessageTestService
    ) {
      
     }

  ngOnInit() {
    this.user = new User();
    this.principal.identity().then(
      account => {
        this.user = account;
        // console.log(this.user.id)
        this.getGeneralDetails();
      },
      err => {
        // console.log(JSON.stringify(err));
      }
    )

    this.completeUserDetails = new UserProfile();
    this.form = this._formBuilder.group({

      firstName: ['', Validators.required],
      otherNames: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      genderLabel: [{ value: 'Gender', disabled: true }, Validators.required],
      sex: ['', Validators.required],

      mobile: ['', Validators.required],
      landNo: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.maxLength(5)]],
      country: ['', Validators.required],
      email: ['', Validators.required],
      academy: ['', Validators.required],
      type: ['', Validators.required],
      achievements: ['', Validators.required],
      organization: ['', Validators.required],
      designation: ['', Validators.required],
      posts: ['', Validators.required],
      duration: ['', Validators.required]

    });

    this.form.valueChanges.subscribe(
      response => {
        this.completeUserDetails = response;

        //  console.log(JSON.stringify(this.completeUserDetails));
      }
    )

    

  }

  sendGeneralDetails() {
    this.completeUserDetails.id = this.user.id;
    this.completeUserDetails.displayName = this.completeUserDetails.firstName + " " + this.completeUserDetails.lastName;
    
    // this.completeUserDetails.address = this.address1+","+this.address2+","+this.city+","+this.country+","+this.postalCode;
    
    
    this.userProfileService.setProfileDetails(this.completeUserDetails).subscribe(
      res=>{
        this.messageTestService.pushNotification('REQUEST_USER_DATA_AFTER_UPDATE_PP')
     
        this.openSnackBar('Sucessfully Saved','OK');
      },
      err=>{
        // console.log(JSON.stringify(err));
      }
    )

  }


   getGeneralDetails(){
    //  console.log(this.user.id)
     
   this.userProfileService.getProfileDetails(this.user.id).subscribe(
     res=>{ 
      // alert("get values"+JSON.stringify(res.body));
      this.completeUserDetails=res.body;

      this.bindValues(res.body);
      // console.log("received values "+JSON.stringify(this.completeUserDetails))
     },
     err=>{
      //  console.log(JSON.stringify(err));
     }
   )
  } 



  bindValues(data){

    this.form.patchValue({firstName: data.firstName})
    this.form.patchValue({otherNames: data.otherNames})
    this.form.patchValue({lastName: data.lastName})
    this.form.patchValue({dob: data.dob})
    this.form.patchValue({sex: data.sex})
    this.form.patchValue({mobile: data.mobile})
    this.form.patchValue({landNo: data.landNo})
    this.form.patchValue({address1: data.address1})
    this.form.patchValue({address2: data.address2})
    this.form.patchValue({city: data.city})
    this.form.patchValue({state: data.state})
    this.form.patchValue({postalCode: data.postalCode})
    this.form.patchValue({country: data.country})
    this.form.patchValue({email: data.email})
    this.form.patchValue({academy: data.academy})
    this.form.patchValue({type: data.type})
    this.form.patchValue({achievements: data.achievements})
    this.form.patchValue({organization: data.organization})
    this.form.patchValue({designation: data.designation})
    this.form.patchValue({posts: data.posts})
    this.form.patchValue({duration: data.duration})


  }

  
  goBack() {
    this.router.navigate(['/boards/profile'])
  }

  goToProfile(){
    this.router.navigate(['/boards/profile'])
    
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
  


}

