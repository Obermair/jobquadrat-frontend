import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { LostComponent } from './lost/lost.component';
import { AdvertisementViewComponent } from './advertisement-view/advertisement-view.component';
import { AdvertisementTableComponent } from './advertisement-table/advertisement-table.component';
import { AdvertisementProfileComponent } from './advertisement-profile/advertisement-profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    LostComponent,
    AdvertisementViewComponent,
    AdvertisementTableComponent,
    AdvertisementProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
