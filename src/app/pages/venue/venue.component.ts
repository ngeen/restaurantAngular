import {Component, inject, OnInit} from "@angular/core";
import {VenueDTO, VenueControllerService, Configuration} from "../../@rest";
import {HttpHeaders} from "@angular/common/http";
import {NbTokenLocalStorage, NbTokenStorage} from "@nebular/auth";
import {BodyOutputType, Toast, ToasterConfig, ToasterService} from "angular2-toaster";

@Component({
  selector: "ngx-venue",
  templateUrl: "./venue.component.html",
  styleUrls: ["./venue.component.scss"]
})
export class VenueComponent implements OnInit {

  venue: VenueDTO = {};

  config: ToasterConfig;

  position = 'toast-top-right';
  animationType = 'fade';
  timeout = 5000;
  toastsLimit = 5;
  type = 'success';

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      venueGuid: {
        title: 'Venue Id',
        type: 'string',
      },
      venueName: {
        title: 'İşletme Adı',
        type: 'string',
      },
      foursquareId : {
        title: 'Foursquare Id',
        type: 'string',
      },
      foursquareToken : {
        title: 'Foursquare Auth Key',
        type: 'string',
      },
      venueImage : {
        title: 'İşletme Resmi',
        type: 'string',
      },
    },
  };

  source : any;

  constructor(private service: VenueControllerService, private nbTokenStorage: NbTokenStorage, private toasterService: ToasterService) {}

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

  ngOnInit() {
    var token : any = JSON.parse(this.nbTokenStorage.get().getValue());
    this.service.defaultHeaders = new HttpHeaders().set("Authorization" , String('Bearer '+ token.access_token));
    this.service.getUserVenuesUsingGET().subscribe(data => {
      console.log(data);
      this.source  = data.payload;
    },
      error => {
      console.error(error);
      },
      () => {
        console.log("done");
      });
  }

  saveVenue() {
    this.service.newVenueUsingPOST(this.venue).subscribe(
      data => {
        this.showToast("success","Bilgilendirme", "İşletme Ekleme Başarılı");
        console.log(data);
      },
      error => {
        this.showToast("error","Hata", "İşletme Ekleme İşleminde Hata Oluştu.");
        console.error(JSON.stringify(error))
      },
      () => {
        console.log("done")
      },
    );
  }

  onDeleteConfirm(event): void {
    console.log("silme")
    if (window.confirm(event.data.venueName+" işletmesini silmek istediğinize emin misiniz?")) {
      this.service.deleteVenueUsingPOST(event.data).subscribe(
        data => {
          this.showToast("success","Bilgilendirme", "İşletme silme başarılı");
          console.log(data);
          event.confirm.resolve();
        },
        error => {
          this.showToast("error","Hata", "İşletme silinmesi sırasında hata oluştu");
          console.error(JSON.stringify(error))
          event.confirm.reject();
        },
        () => {
          console.log("done")
        },
      );
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event) : void {
    console.log("düzenleme")
    this.service.updateVenueUsingPOST(event.newData).subscribe(
      data => {
        this.showToast("success","Bilgilendirme", "İşletme düzenleme başarılı");
        console.log(data);
        event.confirm.resolve();
      },
      error => {
        this.showToast("error","Hata", "İşletme düzenlemesi sırasında hata oluştu");
        console.error(JSON.stringify(error))
        event.confirm.reject();
      },
      () => {
        console.log("done")
      },
    );
  }

  onCreateConfirm(event) : void {
    console.log("ekleme")
    this.service.newVenueUsingPOST(event.newData).subscribe(
      data => {
        this.showToast("success","Bilgilendirme", "İşletme Ekleme Başarılı");
        console.log(data);
        event.newData.venueGuid = data.payload;
        event.confirm.resolve(event.newData);
      },
      error => {
        this.showToast("error","Hata", "İşletme Ekleme İşleminde Hata Oluştu.");
        console.error(JSON.stringify(error))
        event.confirm.reject();
      },
      () => {
        console.log("done")
      },
    );
  }
}
