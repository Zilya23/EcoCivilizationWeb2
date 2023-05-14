import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { AuthService } from  '../auth.service';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-authoriation-page',
  templateUrl: './authoriation-page.component.html',
  styleUrls: ['./authoriation-page.component.css']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup | any;
  isSubmitted  =  false;

  constructor(private router: Router, private formBuilder: FormBuilder, private configService: ConfigService ) { }

  ngOnInit() {
    this.authForm  =  this.formBuilder.group({
        login: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  get formControls() { return this.authForm.controls; }

  signIn(){
    this.isSubmitted = true;
    if(this.authForm.invalid){
      return;
    }
    
    var login = this.authForm.value.login;
    var password = this.authForm.value.password;
    this.configService.authorization(login, password).subscribe(response =>
      {
        this.router.navigateByUrl('/applications');
        localStorage.setItem("AUTH_TOKEN", response.token);
      }, error => {
        this.authForm.controls['login'].setErrors({'incorrect' : true});
        this.authForm.controls['password'].setErrors({'incorrect' : true});
      });
  }
}

