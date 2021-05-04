import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ISecuritySettings, SecuritySettings, PrivacyPreference } from 'app/shared/model/securitySettings/securitySettings.model';
import { SecuritySettingsService } from 'app/services/security-settings.service';
import { IUser, User, Principal } from 'app/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-security-settings',
  templateUrl: './security-settings.component.html',
  styleUrls: ['./security-settings.component.scss'],
  animations: fuseAnimations
})
export class SecuritySettingsComponent implements OnInit {

  // preferances:PrivacyPreference;
  public selected1 = 'ONLY_ME';
  public selected2 = 'ONLY_ME';
  public selected3 = 'ONLY_ME';
  public selected4 = 'ONLY_ME';
  public selected5 = 'ONLY_ME';

  user: IUser;
  SecuritySettingsDetails: ISecuritySettings;
  securitySettingsForm: FormGroup;
  constructor(private _formBuilder: FormBuilder,
    private principal: Principal,
    private secutiySettings: SecuritySettingsService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.user = new User();
    this.principal.identity().then(
      account => {

        this.user = account;
        this.getSecurityDetails();
        //alert(this.user.id)
      },
      err => {
        // console.log(JSON.stringify(err));
      }
    )

    this.SecuritySettingsDetails = new SecuritySettings();
    this.securitySettingsForm = this._formBuilder.group({
      whoCanSeeMyFuturePosts: ['', Validators.required],
      whoCanSeeMyTaggedPosts: ['', Validators.required],
      whoCanSeeMyPastPosts: ['', Validators.required],
      whoCanSeeMyFriendList: ['', Validators.required],
      whoCanViewMyEmail: ['', Validators.required],
      whoCanViewMyPhoneNumber: ['', Validators.required],
      lastLogInDevice: ['', Validators.required]
    })

    this.securitySettingsForm.valueChanges.subscribe(
      res => {


        this.SecuritySettingsDetails = res;

        //this.SecuritySettingsDetails = res;
        // console.log(JSON.stringify(this.SecuritySettingsDetails));
      },
      err => {
        // console.log(JSON.stringify(err));
      }
    )

  }

  


  sendSecurityDetails() {
    this.SecuritySettingsDetails.userId = this.user.id;

    // alert("form values : " + JSON.stringify(this.SecuritySettingsDetails));

    this.secutiySettings.setSecuritySettingsDetails(this.SecuritySettingsDetails).subscribe(

      res => {
        this.openSnackBar('Sucessfully Saved', 'OK');
        //  console.log("sucessfully saved "+JSON.stringify(res));
      },
      err => {
        // console.log(JSON.stringify(err));
      }
    )

  }

  getSecurityDetails() {
    this.secutiySettings.getSecuritySettingsDetails(this.user.id).subscribe(
      res => {
        this.SecuritySettingsDetails = res.body;
        // console.log("get values of security : " + JSON.stringify(this.SecuritySettingsDetails))
        this.bindValues(res.body);

        //  console.log("THIS IS RES : "+JSON.stringify(res.body))
      },
      err => {
        // console.log(JSON.stringify(err));
      }
    )
  }






  bindValues(secSettings: SecuritySettings) {
    this.securitySettingsForm.patchValue({ whoCanSeeMyFuturePosts:secSettings.whoCanSeeMyFuturePosts })
    this.securitySettingsForm.patchValue({ whoCanSeeMyPastPosts:secSettings.whoCanSeeMyPastPosts })
    this.securitySettingsForm.patchValue({ whoCanSeeMyFriendList: secSettings.whoCanSeeMyFriendList })
    this.securitySettingsForm.patchValue({ whoCanViewMyEmail:secSettings.whoCanViewMyEmail})
    this.securitySettingsForm.patchValue({ whoCanViewMyPhoneNumber: secSettings.whoCanViewMyPhoneNumber })
    this.securitySettingsForm.patchValue({ lastLogInDevice: secSettings.lastLogInDevice })

  }



  goBack() {
    this.router.navigate(['/boards/profile'])
  }

  goToProfile() {
    this.router.navigate(['/boards/profile'])
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  

}
