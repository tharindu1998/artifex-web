import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule
} from '@angular/material';
import { SignupComponent } from './signup.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { PasswordStrengthBarComponent } from './password-strength-bar.component';



const routes = [
    {
        path: '',
        component: SignupComponent
    }
];

@NgModule({ 
    declarations: [
        SignupComponent,
        PasswordStrengthBarComponent
    ],
    imports: [
        
        RouterModule.forChild(routes),
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        FuseSharedModule,
        MatDialogModule

    ],
  
})
export class SignupModule {
}
