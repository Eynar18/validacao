import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "./pages/sign-in/sign-in.component";
import {authGuard} from "./core/auth.guard";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {TaskComponent} from "./pages/task/task.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'task',
    component: TaskComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
