import { Component, OnInit } from "@angular/core";
import { ItemControllerService } from "../@rest";

@Component({
  selector: "ngx-menu-list",
  templateUrl: "./menu-list.component.html",
  styleUrls: ["./menu-list.component.scss"]
})
export class MenuListComponent implements OnInit {

  data : any = [];
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
        this.items = this.data.filter(f => f.itemType == "CATEGORY" && f.parentId == menu[0].id);
        console.log(this.items);
      },
      error => {
        console.log(error);
      }
    );
  }

  onSelect(item: any){
    if(item.itemType != 'PRODUCT' && item != this.selectedItem){
      this.items = this.data.filter(f => f.parentId ==item.id);
      this.breadCrumb.push(item);
      this.selectedItem = item;
    }
  }
}
