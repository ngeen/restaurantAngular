import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { ECommerceModule } from "./e-commerce/e-commerce.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { ThemeModule } from "../@theme/theme.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { VenueComponent } from "./venue/venue.component";
import {ApiModule, Configuration, ConfigurationParameters} from "../@rest";
import {ToasterModule} from "angular2-toaster";
import {NotificationsComponent} from "./components/notifications/notifications.component";
import {Ng2SmartTableModule} from "ng2-smart-table";
import { ToastrModule } from 'ng6-toastr-notifications';
import { MenuComponent } from './menu/menu.component';

const PAGES_COMPONENTS = [PagesComponent];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    ToasterModule.forRoot(),
    Ng2SmartTableModule,
    ToastrModule.forRoot(),
  ],
  declarations: [...PAGES_COMPONENTS, VenueComponent, NotificationsComponent, MenuComponent,]
})
export class PagesModule {}
