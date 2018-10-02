import {Component, inject, OnInit} from "@angular/core";
import {VenueDTO, VenueControllerService, Configuration} from "../../@rest";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: "ngx-venue",
  templateUrl: "./venue.component.html",
  styleUrls: ["./venue.component.scss"]
})
export class VenueComponent implements OnInit {
  venue: VenueDTO = {};

  constructor(private service: VenueControllerService, private config: Configuration) {}

  ngOnInit() {
    this.service.defaultHeaders = new HttpHeaders().set("Authorization" , String(this.config.accessToken));
  }

  login() {
    this.service.newVenueUsingPOST(this.venue).subscribe(
      data => {
        console.log(data);
      },
      error => console.error(JSON.stringify(error)),
      () => console.log("done")
    );
  }
}
