import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./core/auth.interceptor";
import {ToastrModule} from "ngx-toastr";
import {SignInComponent} from './pages/sign-in/sign-in.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { SuccessSnackBarComponent } from './shared/components/success-snack-bar/success-snack-bar.component';
import { ErrorSnackBarComponent } from './shared/components/error-snack-bar/error-snack-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SuccessSnackBarComponent,
    ErrorSnackBarComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIcon,
    MatSnackBarModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
