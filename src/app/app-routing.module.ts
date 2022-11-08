import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { LostComponent } from './lost/lost.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
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
