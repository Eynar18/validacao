import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./core/auth.interceptor";
import {ToastrModule} from "ngx-toastr";
import {SignInComponent} from './pages/sign-in/sign-in.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatError, MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardActions, MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {TaskComponent} from './pages/task/task.component';
import {NavBarComponent} from './core/nav-bar/nav-bar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {AgGridModule} from "ag-grid-angular";
import {MatTableModule} from "@angular/material/table";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatNativeDateModule} from "@angular/material/core";
import {TaskFormComponent} from './components/task-form/task-form.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatTooltip} from "@angular/material/tooltip";
import { HasPassedPipe } from './shared/pipes/has-passed.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    TaskComponent,
    NavBarComponent,
    TaskFormComponent,
    ConfirmDialogComponent,
    HasPassedPipe,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIcon,
    MatToolbarModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatTableModule,
    AgGridModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    FormsModule,
    MatDialogClose,
    MatDatepickerToggle,
    MatSelect,
    MatOption,
    MatDatepicker,
    MatDatepickerInput,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardActions,
    MatError,
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
    }),
    MatTooltip,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
