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

    NbAuthModule.forRoot({
      forms: {
        login: {
          redirectDelay: 3000,
          showMessages: {
            error: true,
            success: false
          },
          strategy: "password"
        }
      },
      strategies: [
        NbOAuth2AuthStrategy.setup(<NbOAuth2AuthStrategyOptions>{
          name: "password",
          clientId: "web",
          clientSecret: "12345",
          clientAuthMethod: NbOAuth2ClientAuthMethod.BASIC,
          baseEndpoint: "https://restapi.oenginoz.com/oauth/",
          token: {
            endpoint: "token",
            grantType: NbOAuth2GrantType.PASSWORD,
            class: NbAuthOAuth2JWTToken,
            requireValidToken: true
          },
          redirect: {
            success: "/pages"
          }
        })
      ]
    }),

    NbCardModule,
    NbLayoutModule,
    NbAlertModule,
    NbInputModule,
    NbCheckboxModule
  ],
  declarations: [NbLoginComponent],
  providers: [NbOAuth2AuthStrategy]
})
export class NbLoginModule {}
