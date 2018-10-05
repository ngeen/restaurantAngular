import {MenuListComponent} from "./menu-list.component";
import {ThemeModule} from "../@theme/theme.module";
import {NgModule} from "@angular/core";
import {NbButtonModule} from "@nebular/theme";


@NgModule({
  imports: [
    ThemeModule,
    NbButtonModule,
  ],
  declarations: [
    MenuListComponent,
  ],
})
export class MenuListModule { }
