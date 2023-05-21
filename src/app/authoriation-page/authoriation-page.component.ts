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
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  get formControls() { return this.authForm.controls; }

  signIn(){
    this.isSubmitted = true;
    if(this.authForm.invalid){
      return;
    }
    
    var email = this.authForm.value.email;
    var password = this.authForm.value.password;
    this.configService.authorization(email, password).subscribe(response =>
      {
        localStorage.setItem("AUTH_TOKEN", response.token);
        this.configService.getUserIdentifier(localStorage.getItem('AUTH_TOKEN')).subscribe( resp =>
          localStorage.setItem("USER_IDENTIFIER", resp)
        );
        this.router.navigateByUrl('/applications');
      }, error => {
        this.authForm.controls['email'].setErrors({'incorrect' : true});
        this.authForm.controls['password'].setErrors({'incorrect' : true});
      });
  }
}

