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
  cities: any[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private configService: ConfigService ) {
    this.configService.getCities()
      .subscribe((cities:any[])=>{
        cities.forEach(city =>{
        this.cities.push(city)
      })
    })
   }

  ngOnInit() {
    this.authForm  =  this.formBuilder.group({
        name:['', Validators.required],
        surname:['', Validators.required],
        telephone:['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        repeatPassword: ['', Validators.required],
        gender : ['', Validators.required],
        city : ['', Validators.required],
    });
  }

  get formControls() { return this.authForm.controls; }

  signIn(){
    this.isSubmitted = true;
    
    if(this.authForm.invalid){
      return;
    }

    var email = this.authForm.value.email.toString();
    var password = this.authForm.value.password.toString();
    var name = this.authForm.value.name.toString();
    var surname = this.authForm.value.surname.toString();
    var telephone = this.authForm.value.telephone.toString();
    var idCity = this.authForm.value.city;
    var idGender = this.authForm.value.gender;
    var repeatPassword = this.authForm.value.repeatPassword.toString();

    if(password === repeatPassword) {
      this.configService.registration(name, surname, telephone, 
                    idCity, idGender, email, password).subscribe(response =>
            {
            alert("Успешно!");
            this.router.navigateByUrl('/auth');
            }, error => {
            if(error.status === 404)
            {
            this.authForm.controls['email'].setErrors({'incorrect' : true});
            this.authForm.controls['telephone'].setErrors({'incorrect' : true});
            }
            else{
              alert("Ошибка! Попробуйте еще раз")
            }
            }
            );
    }
    this.authForm.controls['repeatPassword'].setErrors({'incorrect' : true});
  }
}
