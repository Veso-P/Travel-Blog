import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators'

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardTwo implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean| UrlTree> | boolean | UrlTree {
        return this.authService.user.pipe(take(1), map(user => {
            console.log('The user in isAuth is:' + user);
            const isAuth = ! user;
            if (isAuth){
                return true;
            }

            return this.router.createUrlTree(['/blogs'])
        }),
            // tap(isAuth => {
            //     if (!isAuth) {
            //         this.router.navigate['/blogs'];
            //     }
            // }
            // )
        )

    }
}