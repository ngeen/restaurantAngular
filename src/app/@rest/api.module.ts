import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Configuration } from './configuration';

import { ItemControllerService } from './api/itemController.service';
import { MediaControllerService } from './api/mediaController.service';
import { ProductExtControllerService } from './api/productExtController.service';
import { RestTestService } from './api/restTest.service';
import { UserControllerService } from './api/userController.service';
import { VenueControllerService } from './api/venueController.service';

@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [],
  exports:      [],
  providers: [
    ItemControllerService,
    MediaControllerService,
    ProductExtControllerService,
    RestTestService,
    UserControllerService,
    VenueControllerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        }
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import your base AppModule only.');
        }
    }
}
