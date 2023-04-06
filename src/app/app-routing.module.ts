import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from 'src/app/services/auth-guard.service';
import {NonAuthGuardService} from 'src/app/services/non-auth-guard.service';

const routes: Routes = [
  {path:'',redirectTo:'/home', pathMatch:'full'},
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),canActivate: [NonAuthGuardService]},
  { path: 'signUp', loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule),canActivate: [NonAuthGuardService] },
  { path: '', loadChildren: () => import('./pages/main-container/main-container.module').then(m => m.MainContainerModule) ,canActivate: [AuthGuardService] },
  {path:'**',redirectTo:'/home', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
