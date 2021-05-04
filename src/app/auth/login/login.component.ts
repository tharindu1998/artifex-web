import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import * as PS from 'assets/js/particlesslider/ps-0.9';
import { LoginService, StateStorageService } from '../../core';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogBoxComponent } from 'app/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';


declare function showAlert(): any;

declare function ParticleSlider(a): any;

@Component({
    selector: 'login-2',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    ps: PS;
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    accessdenied: any;
    hide: boolean;
    img1: SafeStyle;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
    ) {

        this.credentials = {};

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

    ngOnInit(): void {
        // this.img1 = this.sanitizer.bypassSecurityTrustStyle('url(./assets/wallpaper/cards/png/' + Number(this.getRandomArbitrary(1, 27)).toFixed(0) + '.png)');


        // setInterval(() => {
        //     this.img1 = this.sanitizer.bypassSecurityTrustStyle('url(./assets/wallpaper/cards/png/' + Number(this.getRandomArbitrary(1, 27)).toFixed(0) + '.png)');
        // }, 5000);


        this.route.params.subscribe(params => {
            
            if (params['accessdenied'] === 'accessdenied') {

                this.accessdenied = params['accessdenied'];
            }

        });

        
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', Validators.required],
            rememberMe: true
        });

        this.loginForm.valueChanges.subscribe(val => {
           
        });

        this.initParticleSlider();
    }
    
    initParticleSlider(): any {

    }

   
    login() {

        this.loginService
            .login({
                username: this.username = this.loginForm.get('email').value,
                password: this.password = this.loginForm.get('password').value,
                rememberMe: this.rememberMe = this.loginForm.get('rememberMe').value
            })

            .then((res) => {

                // alert("login : "+JSON.stringify(res))
                this.authenticationError = false;
                
                if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
                    this.router.navigate(['']);
                }
              
                const redirect = this.stateStorageService.getUrl();
                //console.log(redirect)
                if (redirect) {

                    this.stateStorageService.storeUrl(null);
                    this.router.navigate([redirect]);
                    
                }else{

                    this.router.navigate(['/boards/artden']);
                }
            })

            .catch(() => {

                this.authenticationError = true;
                this.showMessage('Invalid username or password');

            });
    }


    showMessage(message: string){

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

   
    logout() {
        
        this.loginService.logout();

        this.router.navigate(['/login']);
        
    }
}
