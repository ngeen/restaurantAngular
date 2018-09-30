import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {tap} from "rxjs/internal/operators";
import {NbAuthService} from "../framework/auth/services";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  canActivate() {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['/login']);
          }
        }),
      );
  }
}
