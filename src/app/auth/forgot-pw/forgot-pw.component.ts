import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { PasswordResetInitService } from './password-reset-init.service';
import { EMAIL_NOT_FOUND_TYPE } from 'app/shared/constants/error.constants';
import { DialogBoxComponent } from 'app/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'forgot-pw',
    templateUrl: './forgot-pw.component.html',
    styleUrls: ['./forgot-pw.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ForgotPWComponent {
    forgotPasswordForm: FormGroup;
    email: string;
    error: string;
    errorEmailNotExists: string;
    resetAccount: any;
    success: string;




    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */


    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private passwordResetInitService: PasswordResetInitService,
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


        this.forgotPasswordForm = this._formBuilder.group({

            email: ['', [Validators.required, Validators.email]]
            
        });


    }

    showErrorMessage(message: string) {

        const dialogRef = this.dialog.open(DialogBoxComponent, {
            
            width: '550px',

            data: { error1: message}

        });

        dialogRef.afterClosed().subscribe(result => {

        });
    }


    requestReset() {


        this.email = this.forgotPasswordForm.get('email').value;
        this.error = null;
        this.errorEmailNotExists = null;

        this.passwordResetInitService.save(this.email).subscribe(
            () => {
                
                this.success = 'OK';
                
                this.showErrorMessage('Your password reset link is sent to your email. Login from there');
            
            },


            response => {

                this.success = null;
                
                if (response.status === 400 && response.error.type === EMAIL_NOT_FOUND_TYPE) {
                  
                    this.errorEmailNotExists = 'ERROR';
                  
                    this.showErrorMessage('Email does not exist');
                
                } else {

                    this.error = 'ERROR';
                    
                    this.showErrorMessage('Internal Server Error');
                
                }
            }
        );
    }



}




