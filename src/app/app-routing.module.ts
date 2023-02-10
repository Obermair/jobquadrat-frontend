import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertisementViewComponent } from './advertisement-view/advertisement-view.component';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth-guard.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { LostComponent } from './lost/lost.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'advertisements', component: AdvertisementViewComponent, canActivate: [AuthGuardService]},
  {path: '404', component: LostComponent},
  //wildcard routes
  { path: '', component: LandingComponent, pathMatch: 'full'},
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
