import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {AuthGuard} from "./auth-guard.service";
import {NbLoginModule} from "./login/login.module";
import {NbAuthComponent} from "@nebular/auth";

const routes: Routes = [
  { path: 'pages', canActivate: [AuthGuard], loadChildren: 'app/pages/pages.module#PagesModule' },
  //{ path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
  {path: 'auth',
  component: NbAuthComponent,
  children: [
  {
    path: '',
    loadChildren : './login/login.module#NbLoginModule',
  },
  {
    path: 'login',
    loadChildren : './login/login.module#NbLoginModule',
  },
  ]},
  // {
  //   path: 'auth',
  //   component: NbAuthComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: NbLoginComponent,
  //     },
  //     {
  //       path: 'login',
  //       component: NbLoginComponent,
  //     },
  //     {
  //       path: 'register',
  //       component: NbRegisterComponent,
  //     },
  //     {
  //       path: 'logout',
  //       component: NbLogoutComponent,
  //     },
  //     {
  //       path: 'request-password',
  //       component: NbRequestPasswordComponent,
  //     },
  //     {
  //       path: 'reset-password',
  //       component: NbResetPasswordComponent,
  //     },
  //   ],
  // },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
