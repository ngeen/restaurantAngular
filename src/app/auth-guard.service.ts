
import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {tap} from "rxjs/internal/operators";
import {NbAuthService, NbTokenStorage} from "@nebular/auth";


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private nbTokenStorage: NbTokenStorage, private authService: NbAuthService, private router: Router) {
  }

  canActivate() {
    //this.authService.refreshToken("password", this.nbTokenStorage.get()).subscribe(data => console.log(data));
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          }
        }),
      );
  }
}
