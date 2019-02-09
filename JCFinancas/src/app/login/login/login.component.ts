import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { User, UserResponse } from '../models';
import { LoginService } from '../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    private user : User;
    private userResponse : UserResponse;
    private possuiErro : boolean;
    private msgErro :string;
    private lembrarUserName:boolean;
    
@ViewChild("loginForm") loginForm: NgForm;
    
constructor(private loginService : LoginService,
            private router: Router) { }

  ngOnInit() {
    this.init();
  }
    
  init(): void {
  	this.user = new User();
  	this.possuiErro = false;
    this.msgErro = 'Erro obtendo dados. Tente novamente.';
  
    this.lembrarUserName = 'true' == localStorage.lembrarUserName;
  
    if (this.lembrarUserName === true){
        this.user.email = localStorage.userName;
    }else{
        this.user.email = null;
        delete localStorage.userName;
    }
  }

logar(): void {
  	if (this.loginForm.form.valid) {
        
       localStorage.lembrarUserName = this.lembrarUserName;
       
        
  	  this.loginService
        .authenticate(this.user)
        .subscribe(
          response => this.processarLogin( response),
          error => this.possuiErro = true
        );

        if (this.lembrarUserName === true){
            localStorage.userName = this.user.email;
        }else{
            delete localStorage.userName;
        }
  	}
  } 
    
processarLogin(response : UserResponse){
    this.userResponse = response
    if (this.userResponse.type){
        this.possuiErro = false;
        sessionStorage.token = response.token; 
        sessionStorage.config = JSON.stringify(response.config); 
        
       // console.log(JSON.parse(sessionStorage.config);
        this.router.navigate(["/home"]);
        
    }else{
        this.possuiErro = true;
        this.msgErro = response.msg;
    } 
}
    

    
}
