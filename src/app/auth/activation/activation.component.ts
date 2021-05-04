import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { ActivationService } from 'app/services/activation.service';
import { MatDialog } from '@angular/material';
import { LoginOrRegisterOpinionComponent } from '../login-or-register-opinion/login-or-register-opinion.component';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {
  key: any;

  constructor( 
    private router:Router,
    private activationService: ActivationService,
    private activatedRouter: ActivatedRoute,
    private _fuseConfigService: FuseConfigService,
    private dialog: MatDialog
  ) { 
    this._fuseConfigService.config = {
      layout: {
          navbar: {
              hidden: true
          },
          toolbar: {
              hidden: true
          },
          footer: {
              hidden: true
          },
          sidepanel: {
              hidden: true
          }
      }
  };
  }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(
      params=>{
        this.key = params["key"];
        console.log(JSON.stringify(this.key))
        if(this.key){
          // this.openDialog();
          this.sendKeyToUAA(this.key)
        }
      }
    )
  }

  sendKeyToUAA(key){
    this.activationService.keyToUAA(key).subscribe(
      res=>{
        this.openDialog();
        // this.router.navigate(['/login'])
      },err=>{
        // alert("cannot send to uaa"+JSON.stringify(err))
      }
    )
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(LoginOrRegisterOpinionComponent, {
      width: '900px',
      minHeight: '40vh'

    });

    dialogRef.afterClosed().subscribe(result => {
      ////console.log('The dialog was closed');

    });
  }

}
