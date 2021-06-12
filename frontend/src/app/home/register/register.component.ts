import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerData: any;
  public successMessage : String;
  public errorMessage:String;

  constructor(private auth: AuthService,private router: Router) {
    this.registerData = {};
    this.successMessage = '';
    this.errorMessage = '';
   }

  ngOnInit(): void {
  }

  registerUser(){
   if (!this.registerData.fullName || !this.registerData.email || !this.registerData.password) {
     console.log("Process Failed: Incomplete Data!");
     this.errorMessage = 'Process Failed: Incomplete Data!';
     this.registerData = {}
     this.closeAlert();
   } else {
     this.auth.registerUser(this.registerData).subscribe(
       (res)=>{
          console.log(res);
          this.successMessage = "Successfull: Register user";
          this.registerData ={}
          this.closeAlert();
       },
       (err)=>{
          console.log(err);
          this.errorMessage = err.error;
          this.registerData ={}
          this.closeAlert();
       }
     );
   }
  }
  closeAlert(){
    setTimeout(() => {
      this.successMessage ='';
      this.errorMessage = '';
      this.registerData ={};
    }, 3000);
  }
  
  closex(){
    this.successMessage ='';
    this.errorMessage = '';
  };

}
