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

  loginUser(){}
  closex(){
    this.successMessage ='';
    this.errorMessage = '';
  };
}
