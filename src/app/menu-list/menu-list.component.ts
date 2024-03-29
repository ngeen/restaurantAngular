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
  productFilter = {itemType: 'PRODUCT'};
  categoryFilter = {itemType: 'CATEGORY'};
  showDetail = false;

  constructor(private itemService: ItemControllerService) {}

  ngOnInit() {
    this.itemService.getAllItemsUsingGET().subscribe(
      data => {
        debugger;
        console.log(data);
        this.data = data.payload;
        var menu = this.data.filter(f => f.itemType === "MENU")[0];
        var menuId = menu.id;
        this.items = this.data.filter(
          f => f.itemType === "CATEGORY" && f.parentId === menuId
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
      this.items = this.data.filter(f => f.parentId === item.id);
      this.breadCrumb.push(item);
      this.selectedItem = item;
      window.scrollTo(0, 0);
      this.showDetail = false;
    }
  }

  onSelectBread(item: any) {
    debugger;
    var index = this.breadCrumb.indexOf(item);
    this.breadCrumb = this.breadCrumb.slice(0, index + 1);
    this.showDetail = false;
    //if (item.itemType !== "PRODUCT" && item !== this.selectedItem) {
      this.items = this.data.filter(f => f.parentId === item.id);
      this.selectedItem = item;
    window.scrollTo(0, 0);
    //}
    console.log(this.breadCrumb);
  }

  mainCategory(){
    debugger;
    this.showDetail = false;
    var menu = this.data.filter(f => f.itemType === "MENU")[0];
    var menuId = menu.id;
    this.items = this.data.filter(
      f => f.itemType === "CATEGORY" && f.parentId === menuId
    );
    this.selectedItem = this.items;
    this.breadCrumb = [];
    window.scrollTo(0, 0);
  }

  showProductDetail(item: any){
   this.selectedItem = item;
   this.showDetail = true;
   window.scrollTo(0, 0);
  }
}
