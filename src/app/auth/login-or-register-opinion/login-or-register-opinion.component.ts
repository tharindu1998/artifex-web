import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-or-register-opinion',
  templateUrl: './login-or-register-opinion.component.html',
  styleUrls: ['./login-or-register-opinion.component.scss']
})
export class LoginOrRegisterOpinionComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  login(){
    this.router.navigate(['/login'])
  }
}
