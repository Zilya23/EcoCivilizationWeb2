import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ConfigService {
    baseUrl: string = "http://10.3.6.143:5189/api/";
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
    console.log('start request')
    return this.client.post<any>(url, {
      login: login,
      password: password,
    })
  }
}
