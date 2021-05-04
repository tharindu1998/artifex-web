import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetFinishService } from './password-reset-finish.service';
import { DialogBoxComponent } from 'app/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material';
import { Route } from '@angular/compiler/src/core';

@Component({
    selector: 'reset-password',
    templateUrl: './reset-pw.component.html',
    styleUrls: ['./reset-pw.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ResetPWComponent implements OnInit, OnDestroy {
    
    resetPasswordForm: FormGroup;
    confirmPassword: string;
    doNotMatch: string;
    error: string;
    keyMissing: boolean;
    resetAccount: any;
    success: string;
    key: string;
    newPassword: string;

  
    private _unsubscribeAll: Subject<any>;

    constructor(

        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private passwordResetFinishService: PasswordResetFinishService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private router: Router

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

        
        this._unsubscribeAll = new Subject();
    }

    
    ngOnInit(): void {

        this.route.queryParams.subscribe(
            params=>{
              this.key = params["key"];
              console.log(JSON.stringify(this.key))
              
            }
          )

        this.resetPasswordForm = this._formBuilder.group({
            password: ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]

        });

        
        this.resetPasswordForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {

                this.resetPasswordForm.get('passwordConfirm').updateValueAndValidity();
            
            });

        this.route.queryParams.subscribe(params => {

            this.key = params['key'];

        });

        this.resetAccount = {};
        
        this.keyMissing = !this.key;
        
    }

    
    ngOnDestroy(): void {
        
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    login(){

        this.router.navigate(['/login']);

    }

    showMessage(message: string){

        const dialogRef = this.dialog.open(DialogBoxComponent, {
            
            width: '550px',
            
            data: { error1: message }
        });

        dialogRef.afterClosed().subscribe(result => {

        });

    }

    finishReset() {

        this.newPassword = this.resetPasswordForm.get('password').value;
        this.confirmPassword = this.resetPasswordForm.get('passwordConfirm').value;


        this.passwordResetFinishService.save({ key: this.key, newPassword: this.newPassword }).subscribe(
            () => {

                this.success = 'OK';
                             
            },

            () => {

                this.success = null;
                this.error = 'ERROR';
                this.showMessage('Internal Server Error');

            }
        );
        
    }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { 'passwordsNotMatching': true };
};
