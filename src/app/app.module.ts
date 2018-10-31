/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "./@core/core.module";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ThemeModule } from "./@theme/theme.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthGuard } from "./auth-guard.service";
import { ApiModule, Configuration, ConfigurationParameters } from "./@rest";
import {MenuListModule} from "./menu-list/menu-list.module";
import {ToasterModule} from "angular2-toaster";
import {NotificationsComponent} from "./pages/components/notifications/notifications.component";
import {NbOAuth2AuthStrategy} from "./auth/oauth2-strategy";
import {
  NbAuthModule, NbAuthOAuth2JWTToken, NbOAuth2AuthStrategyOptions, NbOAuth2ClientAuthMethod,
  NbOAuth2GrantType
} from "@nebular/auth";
import {NbLoginModule} from "./login/login.module";
import {NbLoginComponent} from "./login/login.component";
import {NbAlertModule, NbCardModule, NbCheckboxModule, NbInputModule, NbLayoutModule} from "@nebular/theme";

@NgModule({
  declarations: [AppComponent, NbLoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbCardModule,
    NbLayoutModule,
    NbAlertModule,
    NbInputModule,
    NbCheckboxModule,

    MenuListModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    ApiModule.forRoot(apiConfigFactory),

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

  ],
  bootstrap: [AppComponent],
  providers: [{ provide: APP_BASE_HREF, useValue: "/" }, NbOAuth2AuthStrategy, AuthGuard]
})
export class AppModule {}

export function apiConfigFactory() {
  const params: ConfigurationParameters = {
    //basePath : 'http://localhost:8081' ,
    apiKeys: {
      Authorization: "fiwoo"
    }
  };
  return new Configuration(params);
}
