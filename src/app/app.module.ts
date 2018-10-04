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
import { MenuListComponent } from "./menu-list/menu-list.component";

@NgModule({
  declarations: [AppComponent, MenuListComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    ApiModule.forRoot(apiConfigFactory)
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: APP_BASE_HREF, useValue: "/" }, AuthGuard]
})
export class AppModule {}

export function apiConfigFactory() {
  const params: ConfigurationParameters = {
    apiKeys: {
      Authorization: "fiwoo"
    }
  };
  return new Configuration(params);
}
