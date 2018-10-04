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
  breadCrumb
  constructor(private itemService: ItemControllerService) {}

  ngOnInit() {
    this.itemService.getAllItemsUsingGET().subscribe(
      data => {
        console.log(data);
        this.data = data.payload;
        this.items = this.data.filter(f => f.itemType == "MENU");
        console.log(this.items);
      },
      error => {
        console.log(error);
      }
    );
  }

  onSelect(item: any){
    if(item.itemType != 'PRODUCT')
      this.items = this.data.filter(f => f.parentId ==item.id);
  }
}
