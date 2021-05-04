import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IUserRegistration } from './signup.model';
import { RegisterService } from './signup.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LOGIN_ALREADY_USED_TYPE, EMAIL_ALREADY_USED_TYPE } from 'app/shared/constants/error.constants';

import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from 'app/dialog-box/dialog-box.component';



@Component({
    selector: 'register-2',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SignupComponent implements OnInit, OnDestroy {

    public pwdPattern = '^(?=.*[a-z ])(?=.*[A-Z ])(?=.*[0-9 ])';
    public loginPattern = '^(?=.*[a-z ])';
    
    private interval: any;
    img1: SafeStyle;
    
    success: boolean;
    confirmPassword: string;
    doNotMatch: string;
    error: string;
    errorEmailExists: string;
    errorUserExists: string;
    registerForm: FormGroup;
    registerModal: IUserRegistration;
    _user: IUserRegistration;
    isCheck: boolean;
    checked: boolean;
    checkSet: boolean;
    hide: boolean;
    confirmHide: boolean;
    private _unsubscribeAll: Subject<any>;
    img: SafeStyle;
    password: any;

    constructor(

        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private sanitizer: DomSanitizer,
        private signupService: RegisterService,
        private dialog: MatDialog,

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
        this.registerForm = this._formBuilder.group({
            login: ['', [Validators.required, patternValidator(new RegExp(this.loginPattern))]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, patternValidator(new RegExp(this.pwdPattern))]],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
            isCheck: ['', Validators.required]
        });

        this.registerForm.valueChanges.subscribe(
            res=>{
                this.password = res['password']

            } 
        )


    }

    ngOnInit(): void {
        
        this.success = false;
        this.checked = this.isCheck;

        if (this.checked === true) {
        
            this.checkSet = false;
        }

        this.registerForm.valueChanges.subscribe(res => {
        
            this.registerModal = res;

        });


        this.registerForm.get('password').valueChanges

            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {

                this.registerForm.get('passwordConfirm').updateValueAndValidity();
            
            });
          
        this.img1 = this.sanitizer.bypassSecurityTrustStyle('url(./assets/wallpaper/cards/png/' + Number(this.getRandomArbitrary(1, 27)).toFixed(0) + '.png)');


        setInterval(() => {
            this.img1 = this.sanitizer.bypassSecurityTrustStyle('url(./assets/wallpaper/cards/png/' + Number(this.getRandomArbitrary(1, 27)).toFixed(0) + '.png)');
        }, 5000);

    }


    showErrorMessage(message: string){

        const dialogRef = this.dialog.open(DialogBoxComponent, {
           
            width: '550px',
            
            data: { error1: message }

        });

        dialogRef.afterClosed().subscribe(result => {

        });

    }

    
    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }


    ngOnDestroy(): void {
       
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

    }

    register(): void {
       
        this.doNotMatch = null;
       
        this.error = null;
       
        this.errorUserExists = null;
       
        this.errorEmailExists = null;
       
        this.registerModal.langKey = 'en';
        // alert(JSON.stringify(this.registerModal))
       
        this.signupService.save(this.registerModal).subscribe(
            
            res => {

                this.success = true;
                this.showErrorMessage('Activate your account using the provided link to your email');
            
            },
            
            response => this.processError(response)
        
            );

    }

    
    private processError(response: HttpErrorResponse) {

        this.success = null;
        
        if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
            
            this.errorUserExists = 'ERROR';
            
            this.showErrorMessage('The username already exists');

        } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
            
            this.errorEmailExists = 'ERROR';
            
            this.showErrorMessage('The email address already exists');
        } else {
            
            this.error = 'ERROR';
        }
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


export function patternValidator(regexp: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const value = control.value;
        if (value === '') {
            return null;
        }
        return !regexp.test(value) ? { 'patternInvalid': { regexp } } : null;
    };
}





// @Component({
//     templateUrl: './dialog-box/dialog-box.component.html',
//     styleUrls: ['./dialog-box/dialog-box.component.scss']
// })
// // tslint:disable-next-line:component-class-suffix
// export class DialogBox {



//     constructor(public dialog: MatDialog) { }

// }
