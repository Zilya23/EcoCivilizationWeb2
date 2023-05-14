import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { AuthService } from  '../auth.service';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  authForm: FormGroup | any;
  isSubmitted  =  false;

  constructor(private router: Router, private formBuilder: FormBuilder, private configService: ConfigService ) { }

  ngOnInit() {
    this.authForm  =  this.formBuilder.group({
        name:['', Validators.required],
        surname:['', Validators.required],
        telephone:['', Validators.required],
        idCity:['', Validators.required],
        idGender:['', Validators.required],
        login: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  get formControls() { return this.authForm.controls; }

  signIn(){
    // this.isSubmitted = true;
    // if(this.authForm.invalid){
    //   return;
    // }

    var login = this.authForm.value.login.toString();
    var password = this.authForm.value.password.toString();
    var name = this.authForm.value.name;
    var surname = this.authForm.value.surname;
    var telephone = this.authForm.value.telephone.toString();
    var idCity = 6;
    var idGender = 2;

    this.configService.registration(name, surname, telephone, 
                                    idCity, idGender, login, password).subscribe(response =>
      {
        alert("Успешно!");
        this.router.navigateByUrl('/auth');
      }, error => {
          if(error.status === 404)
          {
            this.authForm.controls['login'].setErrors({'incorrect' : true});
            this.authForm.controls['telephone'].setErrors({'incorrect' : true});
          }
          else{
            alert("Ошибка! Попробуйте еще раз")
          }
      }
    );
  }
}
