import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule, BsDatepickerModule } from 'ngx-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { TabsModule } from 'ngx-bootstrap';

import { AuthService } from './_services/auth.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { EventComponent } from './event/event.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';
import { SubmissionComponent } from './submission/submission.component';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      EventComponent,
      LoginComponent,
      RegisterComponent,
      FooterComponent,
      ContentComponent,
      HomeComponent,
      SubmissionComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      NgxSpinnerModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MatStepperModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatCheckboxModule,
      TabsModule.forRoot()
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
