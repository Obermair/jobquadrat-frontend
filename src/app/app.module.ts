import { LOCALE_ID, NgModule } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateAdvertisementComponent } from './create-advertisement/create-advertisement.component';
import { SaveAdvertisementComponent } from './save-advertisement/save-advertisement.component';
import { UpdateAdvertisementComponent } from './update-advertisement/update-advertisement.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsComponent } from './terms/terms.component';
import { ImprintComponent } from './imprint/imprint.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { FaqComponent } from './faq/faq.component';
import { ChatComponent } from './chat/chat.component';
import { ChatConversationsComponent } from './chat-conversations/chat-conversations.component';
import { ChatDiscussionComponent } from './chat-discussion/chat-discussion.component';
import { ReactiveFormsModule } from '@angular/forms';

 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    LostComponent,
    AdvertisementViewComponent,
    AdvertisementTableComponent,
    AdvertisementProfileComponent,
    SpinnerComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    OverviewComponent,
    CreateAdvertisementComponent,
    SaveAdvertisementComponent,
    UpdateAdvertisementComponent,
    PrivacyPolicyComponent,
    TermsComponent,
    ImprintComponent,
    UpdateProfileComponent,
    FaqComponent,
    ChatComponent,
    ChatConversationsComponent,
    ChatDiscussionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
