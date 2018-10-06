import { Component, OnInit } from "@angular/core";
import { ItemControllerService } from "../@rest";

@Component({
  selector: "ngx-menu-list",
  templateUrl: "./menu-list.component.html",
  styleUrls: ["./menu-list.component.scss"]
})
export class MenuListComponent implements OnInit {
  data: any = [];
  items: any = [];
  breadCrumb: any = [];
  selectedItem: any;

  constructor(private itemService: ItemControllerService) {}

  ngOnInit() {
    this.itemService.getAllItemsUsingGET().subscribe(
      data => {
        console.log(data);
        this.data = data.payload;
        var menu = this.data.filter(f => f.itemType == "MENU");
        this.items = this.data.filter(
          f => f.itemType == "CATEGORY" && f.parentId == menu[0].id
        );
        console.log(this.items);
      },
      error => {
        console.log(error);
      }
    );
  }

  onSelect(item: any) {
    debugger;
    if (item.itemType !== "PRODUCT" && item !== this.selectedItem) {
      this.items = this.data.filter(f => f.parentId == item.id);
      this.breadCrumb.push(item);
      this.selectedItem = item;
    }
  }

  onSelectBread(item: any) {
    debugger;
    var index = this.breadCrumb.indexOf(item);
    this.breadCrumb = this.breadCrumb.slice(0, index + 1);
    if (item.itemType !== "PRODUCT" && item !== this.selectedItem) {
      this.items = this.data.filter(f => f.parentId == item.id);
      this.selectedItem = item;
    }
    console.log(this.breadCrumb);
  }

  mainCategory(){
    debugger;
    var menu = this.data.filter(f => f.itemType == "MENU");
    this.items = this.data.filter(
      f => f.itemType == "CATEGORY" && f.parentId == menu[0].id
    );
    this.selectedItem = this.items;
    this.breadCrumb = [];
  }
}
