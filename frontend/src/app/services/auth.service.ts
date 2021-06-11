import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private env: String
  constructor(private http: HttpClient) { 
    this.env = environment.APP_URL;
  }

  registerRole(role: any) {
    return this.http.post(this.env + 'role/registerRole', role)

   }

  registerUser(user: any){
    return this.http.post(this.env +"user/register/",user);
  }
}
