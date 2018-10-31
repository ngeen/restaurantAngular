import { Component, OnInit } from '@angular/core';
import {ItemControllerService, ItemDTO, MediaControllerService, ProductDTO} from "../../@rest";
import {HttpHeaders} from "@angular/common/http";
import {NbTokenStorage} from "@nebular/auth";
import {ToastrManager} from "ng6-toastr-notifications";

@Component({
  selector: 'ngx-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  breadCrumb: any = [];
  data: any = [];
  items: any = [];
  selectedItem: any;
  describeMenuCategory : boolean;
  describeProduct: boolean;
  item: ProductDTO = {};
  savedImages: any = [];
  image: File;

  constructor(private mediaService : MediaControllerService, private itemService : ItemControllerService, private nbTokenStorage: NbTokenStorage, public toastr: ToastrManager) { }

  ngOnInit() {
    var tokens : any = JSON.parse(this.nbTokenStorage.get().toString());
    //console.log(tokens);
    this.itemService.defaultHeaders = new HttpHeaders().set("Authorization" , String('Bearer '+ tokens.access_token));
    this.mediaService.defaultHeaders = new HttpHeaders().set("Authorization" , String('Bearer '+ tokens.access_token));
    this.itemService.getUserItemsUsingGET().subscribe(data => {
        console.log(data);
        this.data = data.payload;
        this.items = this.data.filter(f => f.itemType === "MENU");
      },
      error => {
        console.error(error);
      },
      () => {
        console.log("done");
      });
  }

  deActive(){
    this.describeMenuCategory = false;
    this.describeProduct= false;
    this.item = {};
  }

  onSelect(item){
    this.deActive();
    if (item.itemType !== "PRODUCT" && item !== this.selectedItem) {
      this.items = this.data.filter(f => f.parentId === item.id);
      this.breadCrumb.push(item);
      this.selectedItem = item;
    }
  }

  onSelectBread(item: any) {
    this.deActive();
    var index = this.breadCrumb.indexOf(item);
    this.breadCrumb = this.breadCrumb.slice(0, index + 1);
    this.items = this.data.filter(f => f.parentId === item.id);
    this.selectedItem = item;
    window.scrollTo(0, 0);
    console.log(this.breadCrumb);
  }

  mainCategory(){
    this.deActive();
    this.items = this.data.filter(f => f.itemType === "MENU");
    this.selectedItem = null;
    this.breadCrumb = [];
    window.scrollTo(0, 0);
  }

  private showToast(type: string, title: string, body: string) {
    if(type === "success")
      this.toastr.successToastr(body, title);
    else
      this.toastr.errorToastr(body, title);
  }

  onReset(){
    this.deActive();
  }

  saveMenuCategory(){
    if(this.item.itemGuid == null && !this.selectedItem){
      this.itemService.createMenuUsingPOST(this.item).subscribe(data => {
          this.showToast("success","Bilgilendirme", "Menu ekleme işlemi başarılı");
          console.log(data);
          this.data.push(data.payload);
          this.items.push(data.payload);
          this.deActive();
        },
        error => {
          this.showToast("error","Hata", "Menu ekleme işleminde hata oluştu.");
          console.error(JSON.stringify(error))
        },
        () => {
          console.log("done")
        },);
    } else if(this.item.itemGuid == null && this.selectedItem){
      this.item.parentId = this.selectedItem.id;
      this.itemService.createCategoryUsingPOST(this.item).subscribe(data => {
          this.showToast("success","Bilgilendirme", "Kategori ekleme işlemi başarılı");
          console.log(data);
          this.data.push(data.payload);
          this.items.push(data.payload);
          this.deActive();
        },
        error => {
          this.showToast("error","Hata", "kategori ekleme işleminde hata oluştu.");
          console.error(JSON.stringify(error))
        },
        () => {
          console.log("done")
        },);
    } else {
      this.itemService.updateItemUsingPOST(this.item).subscribe(data => {
          this.showToast("success","Bilgilendirme", "Düzenleme işlemi başarılı");
          var index = this.items.indexOf(this.item);
          this.items.splice(index, 1);
          var index = this.data.indexOf(this.item);
          this.data.splice(index, 1);
          this.data.push(data.payload);
          this.items.push(data.payload);
          this.deActive();
        },
        error => {
          this.showToast("error","Hata", "Düzenleme işleminde hata oluştu.");
          console.error(JSON.stringify(error))
        },
        () => {
          console.log("done")
        },);
    }
  }

  saveProduct(){
    if(this.item.itemGuid == null) {
      this.item.parentId = this.selectedItem.id;
      this.itemService.createProductUsingPOST(this.item).subscribe(data => {
          this.showToast("success","Bilgilendirme", "Ürün ekleme işlemi başarılı");
          console.log(data);
          this.data.push(data.payload);
          this.items.push(data.payload);
          this.deActive();
        },
        error => {
          this.showToast("error","Hata", "Ürün ekleme işleminde hata oluştu.");
          console.error(JSON.stringify(error))
        },
        () => {
          console.log("done")
        },);
    } else {
      this.itemService.updateItemUsingPOST(this.item).subscribe(data => {
          this.showToast("success","Bilgilendirme", "Ürün düzenleme işlemi başarılı");
          var index = this.items.indexOf(this.item);
          this.items.splice(index, 1);
          var index = this.data.indexOf(this.item);
          this.data.splice(index, 1);
          this.data.push(data.payload);
          this.items.push(data.payload);
          this.deActive();
        },
        error => {
          this.showToast("error","Hata", "Ürün düzenleme işleminde hata oluştu.");
          console.error(JSON.stringify(error))
        },
        () => {
          console.log("done")
        },);
    }
  }

  onUpdate(item){
    this.item=item;
    if(item.itemType === "MENU" || item.itemType === "CATEGORY")
      this.describeMenuCategory = true
    else if(item.itemType === "PRODUCT"){
      this.describeProduct = true;
      this.savedImages = item.medias;
    }

  }

  onDelete(item){
    this.deActive();
    if (window.confirm(item.name+" silmek istediğinize emin misiniz?")) {
      this.itemService.deleteItemUsingPOST(item).subscribe(data => {
          this.showToast("success", "Bilgilendirme", "Silme işlemi başarılı");
          var index = this.items.indexOf(item);
          this.items.splice(index, 1);
          var index = this.data.indexOf(item);
          this.data.splice(index, 1);
        },
        error => {
          this.showToast("error", "Hata", "Silme işleminde hata oluştu.");
          console.error(JSON.stringify(error))
        },
        () => {
          console.log("done")
        },);
    }
  }

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      this.image = event.target.files[0];
      /*var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.image = (<FileReader>event.target).result;
      }

      reader.readAsDataURL(event.target.files[0]);*/
    }
  }

  addImage(itemId){
    this.mediaService.saveMediaUsingPOST(this.image, itemId, "", "").subscribe(
      data => {
        this.showToast("success", "Bilgilendirme", "İmaj ekleme işlemi başarılı");
        this.savedImages.push(data.payload);
      },
      error => {
        this.showToast("error", "Hata", "İmaj ekleme işleminde hata oluştu.");
        console.error(JSON.stringify(error))
      },
      () => {
        console.log("done")
      },
    );
  }

  onImageDelete(media){
    this.mediaService.deleteMediaUsingPOST(media).subscribe(
      data => {
        this.showToast("success", "Bilgilendirme", "İmaj silme işlemi başarılı");
        let index = this.savedImages.findIndex( c => c.mediaGuid == media.mediaGuid);
        this.savedImages.splice(index,1);
      },
      error => {
        this.showToast("error", "Hata", "İmaj silme işleminde hata oluştu.");
        console.error(JSON.stringify(error))
      },
      () => {
        console.log("done")
      },
    );
  }

}
