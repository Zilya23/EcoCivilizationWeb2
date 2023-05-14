import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ConfigService {
    baseUrl: string = "http://localhost:5189/api/";
  constructor(public client: HttpClient, private router: Router) { }

  public getApplicationList() : Observable<any[]> {
    var url = this.baseUrl + 'Applications';
    return this.client.get<any[]>(url)
  }

  public getApplication(id: any) : Observable<any> {
    var url = this.baseUrl + `Applications/${id}`;
    return this.client.get<any>(url)
  }

  public authorization(login: any, password: any) : Observable<any> {
    var url = this.baseUrl + 'Users/login';
    return this.client.post<any>(url, {
      login: login,
      password: password,
    })
  }

  public registration(name: any, surname: any, telephone: any, idCity: any, 
                      idGender: any, login: any, password: any) : Observable<any> {
    var url = this.baseUrl + 'Users/registration';
    return this.client.post<any>(url, {
      name: name,
      surname: surname, 
      telephone: telephone, 
      idCity: idCity, 
      idGender: idGender,
      login: login,
      password: password
    })
  }
}
