import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public registerData: any;
  public successMessage: String;
  public errorMessage: String;
  
  constructor(private router: Router) {
    this.registerData = {};
    this.successMessage = '';
    this.errorMessage = '';
  }

  ngOnInit(): void {
  }

  loginUser(){
    if(!this.registerData.email || !this.registerData.password){
      this.errorMessage = "Los campos estan vacíos!";
      this.registerData = {};
      this.closeAlert(); 
    }else{
      console.log('Procceso para login');
      this.successMessage = 'Proceso login';
      this.closeAlert();
    }
  }

  closeAlert(){
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
      this.registerData = {};
      this.closeAlert(); 
    }, 3000);
  }
  closex(){
    this.successMessage ='';
    this.errorMessage = '';
  };
}
