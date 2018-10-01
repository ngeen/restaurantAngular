import { Component, OnInit } from "@angular/core";
import { VenueDTO, VenueControllerService } from "../../@rest";

@Component({
  selector: "ngx-venue",
  templateUrl: "./venue.component.html",
  styleUrls: ["./venue.component.scss"]
})
export class VenueComponent implements OnInit {
  venue: VenueDTO = {};

  constructor(private service: VenueControllerService) {}

  ngOnInit() {}

  login() {
    this.service.newVenueUsingPOST(this.venue).subscribe(
      data => {
        console.log(data);
      },
      error => console.error(JSON.stringify(error)),
      () => console.log("done")
    );
    console.log(this.venue);
  }
}
