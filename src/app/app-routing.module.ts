import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListApplicationComponent } from './list-application/list-application.component';
import { ApplicationInfoComponent } from './application-info/application-info.component';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './authoriation-page/authoriation-page.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: '', redirectTo: '/applications', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'applications', component: ListApplicationComponent, canActivate: [AuthGuard]},
  { path: 'application/:id', component: ApplicationInfoComponent, canActivate: [AuthGuard]},
  { path: 'registration', component: RegistrationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
