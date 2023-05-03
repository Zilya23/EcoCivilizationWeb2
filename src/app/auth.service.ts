import { Injectable } from '@angular/core';
import { ConfigService } from './config/config.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private config: ConfigService) { }
  public signIn(userData: any){
    this.config.authorization(userData.email, userData.password);
    localStorage.setItem('ACCESS_TOKEN', "access_token");
  }
  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
