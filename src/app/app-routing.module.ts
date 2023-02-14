import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertisementViewComponent } from './advertisement-view/advertisement-view.component';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth-guard.service';
import { CreateAdvertisementComponent } from './create-advertisement/create-advertisement.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { LostComponent } from './lost/lost.component';
import { OverviewComponent } from './overview/overview.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SaveAdvertisementComponent } from './save-advertisement/save-advertisement.component';
import { UpdateAdvertisementComponent } from './update-advertisement/update-advertisement.component';

const routes: Routes = [
  {path: 'reset-password/:code', component: ResetPasswordComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'advertisements', component: OverviewComponent, canActivate: [AuthGuardService]
  , children: [
    {path: '', redirectTo: 'view', pathMatch: 'full'},
    {path: 'view', component: AdvertisementViewComponent},
    {path: 'create', component: CreateAdvertisementComponent},
    {path: 'create/save', component: SaveAdvertisementComponent},
    {path: 'create/update/:id', component: UpdateAdvertisementComponent}
  ]},
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
