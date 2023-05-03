import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { ListApplicationComponent } from './list-application/list-application.component';
import { ApplicationInfoComponent } from './application-info/application-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthComponent } from './authoriation-page/authoriation-page.component';
import { ConfigService } from './config/config.service';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    ListApplicationComponent,
    ApplicationInfoComponent,
    AuthComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ConfigService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
