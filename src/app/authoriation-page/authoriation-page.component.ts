import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { AuthService } from  '../auth.service';

@Component({
  selector: 'app-authoriation-page',
  templateUrl: './authoriation-page.component.html',
  styleUrls: ['./authoriation-page.component.css']
})


export class AuthComponent implements OnInit {
  authForm: FormGroup | any;
  isSubmitted  =  false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }
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
    this.authService.signIn(this.authForm.value);
    this.router.navigateByUrl('/applications');
  }
}

