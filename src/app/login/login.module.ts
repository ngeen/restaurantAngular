import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { NbLoginComponent } from "./login.component";
import {
  NbAuthModule,
  NbAuthOAuth2JWTToken,
  NbOAuth2AuthStrategyOptions,
  NbOAuth2ClientAuthMethod,
  NbOAuth2GrantType
} from "@nebular/auth";
import { NbOAuth2AuthStrategy } from "../auth/oauth2-strategy";
import {
  NbAlertModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbLayoutModule
} from "@nebular/theme";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {Configuration} from "../@rest";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forChild([
      {
        path: "",
        component: NbLoginComponent
      }
    ]),

    NbCardModule,
    NbLayoutModule,
    NbAlertModule,
    NbInputModule,
    NbCheckboxModule
  ],
  declarations: [NbLoginComponent],
  providers: []
})
export class NbLoginModule {}
