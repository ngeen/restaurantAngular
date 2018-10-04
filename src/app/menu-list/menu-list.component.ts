import { Component, OnInit } from "@angular/core";
import { ItemControllerService } from "../@rest";

@Component({
  selector: "ngx-menu-list",
  templateUrl: "./menu-list.component.html",
  styleUrls: ["./menu-list.component.scss"]
})
export class MenuListComponent implements OnInit {
  constructor(private itemService: ItemControllerService) {}

  ngOnInit() {
    this.itemService.getAllItemsUsingGET().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
