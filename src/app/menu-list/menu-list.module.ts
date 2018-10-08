import {MenuListComponent} from "./menu-list.component";
import {ThemeModule} from "../@theme/theme.module";
import {NgModule} from "@angular/core";
import {NbButtonModule} from "@nebular/theme";
import {ItemFilterPipe} from "../pipes/item-filter.pipe";


@NgModule({
  imports: [
    ThemeModule,
    NbButtonModule,
  ],
  declarations: [
    MenuListComponent,
    ItemFilterPipe,
  ],
})
export class MenuListModule { }
