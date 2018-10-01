import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject
} from "@angular/core";
import { Router } from "@angular/router";
import { NB_AUTH_OPTIONS, NbAuthResult, NbAuthService } from "@nebular/auth";
import { getDeepFromObject } from "@nebular/auth/helpers";
import { Configuration } from "../@rest";

@Component({
  selector: "nb-login",
  templateUrl: "./login.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NbLoginComponent {
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = "";

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  rememberMe = false;

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router
  ) {
    this.redirectDelay = this.getConfigValue("forms.login.redirectDelay");
    this.showMessages = this.getConfigValue("forms.login.showMessages");
    this.strategy = this.getConfigValue("forms.login.strategy");
    this.rememberMe = this.getConfigValue("forms.login.rememberMe");
  }

  login(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service
      .authenticate(this.strategy, this.user)
      .subscribe((result: NbAuthResult) => {
        this.submitted = false;

        if (result.isSuccess()) {
          this.messages = result.getMessages();
          //this.config.accessToken = result.getToken().getValue();
          //console.log(result.getToken().getValue());
        } else {
          this.errors = result.getErrors();
        }

        const redirect = result.getRedirect();
        if (redirect) {
          setTimeout(() => {
            return this.router.navigateByUrl(redirect);
          }, this.redirectDelay);
        }
        this.cd.detectChanges();
      });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
