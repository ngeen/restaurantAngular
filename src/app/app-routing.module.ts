import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./auth-guard.service";
import { NbAuthComponent, NbLogoutComponent } from "@nebular/auth";
import { MenuListComponent } from "./menu-list/menu-list.component";

const routes: Routes = [
  {
    path: "pages",
    canActivate: [AuthGuard],
    loadChildren: "app/pages/pages.module#PagesModule"
  },
  { path: "menu", component: MenuListComponent },
  //{ path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
  {
    path: "auth",
    component: NbAuthComponent,
    children: [
      {
        path: "",
        loadChildren: "./login/login.module#NbLoginModule"
      },
      {
        path: "login",
        loadChildren: "./login/login.module#NbLoginModule"
      },
      {
        path: "logout",
        component: NbLogoutComponent
      }
    ]
  },
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
  { path: "", redirectTo: "pages", pathMatch: "full" },
  { path: "**", redirectTo: "pages" }
];

const config: ExtraOptions = {
  useHash: true
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
