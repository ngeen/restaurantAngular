export * from './itemController.service';
import { ItemControllerService } from './itemController.service';
export * from './restTest.service';
import { RestTestService } from './restTest.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export * from './venueController.service';
import { VenueControllerService } from './venueController.service';
export const APIS = [ItemControllerService, RestTestService, UserControllerService, VenueControllerService];
