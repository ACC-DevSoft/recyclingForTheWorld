import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-role',
  templateUrl: './register-role.component.html',
  styleUrls: ['./register-role.component.css'],
})
export class RegisterRoleComponent implements OnInit {
  public registerData: any;
  public succesMessage: String;
  public errorMessage: String;
  constructor(private auth: AuthService, private router: Router) {
    this.registerData = {};
    this.succesMessage = '';
    this.errorMessage = '';
  }

  ngOnInit(): void {}

  registerRole() {
    if (!this.registerData.name || !this.registerData.description) {
      console.log('Failed Process: Incomplete Data');
      this.errorMessage = 'Failed Process: Incomplete Data';
      this.closeAlert();
      this.registerData = {};
    } else {
      this.auth.registerRole(this.registerData).subscribe(
        (res) => {
          console.log(res);
          this.succesMessage = 'Register Role: successfull';
          this.closeAlert();
          this.registerData = {};
        },
        (err) => {
          console.log(err);
          this.errorMessage = err.error();
          this.closeAlert();
        }
      );
    }
  }

  closeAlert() {
    setTimeout(() => {
      this.succesMessage = '';
      this.errorMessage = '';
    }, 3000);
  }
}
