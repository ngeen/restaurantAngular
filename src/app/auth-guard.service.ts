
import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {tap} from "rxjs/internal/operators";
import {NbAuthService} from "@nebular/auth";


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  canActivate() {
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
