import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import {environment} from '../../../environments/environment';

import { User } from '../user.model';

interface AuthResponseData {  // Interface for the FireBase response
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}


@Injectable()
export class AuthService {
    loggedIn = false; // I am not using it now;

    user = new BehaviorSubject<User>(null);
    token: string = null;

    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router,) {

    }

    logout() {
        // console.log('You are going to logout!'); // Use for DEBBUGING

        localStorage.removeItem('userInfo');
        localStorage.removeItem('EI');

        this.user.next(null);
        this.router.navigate(['/user/login']);

        // setTimeout(() => {
        //     // After logout redirection to main page.

        // }, 500);

        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;

    }

    register(email: string, password: string) {
        return this.http.
            post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=` + environment.fbAPIKey,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }
            )
            .pipe((
                catchError((errorRes: HttpErrorResponse) => {
                    let errorMessage = 'An unknown error!';
                    if (!errorRes.error || !errorRes.error.error) {
                        return throwError(errorMessage);
                    }
                    switch (errorRes.error.error.message) {
                        case 'EMAIL_EXISTS': errorMessage = 'This email exists already! Please, use another one.'; break;

                    }
                    return throwError(errorMessage);
                })),
                tap(resData => {
                    this.handleAuth(resData.email, resData.localId, resData.idToken, Number(resData.expiresIn))

                })
            );
    }

    // TO BE used for a Response Interceptor
    private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + Number(expiresIn) * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000)
        localStorage.setItem('userInfo', JSON.stringify(user)); //Using local storage for the user
        //console.log('The user info to be ecnrypted is:') // Use for DEBUGGING
        localStorage.getItem('userInfo');

        const salt = bcrypt.genSaltSync(10);
        //console.log('ToBeDcrypted!') // Use for DEBUGGING
        //console.log(user.token) // Use for DEBUGGING
        const hashedInfo = bcrypt.hashSync(user.token, salt);
        // console.log('The hashed info is: ' + hashedInfo); // Use for DEBUGGING
        localStorage.setItem('EI', JSON.stringify(hashedInfo));

    }

    login(email: string, password: string) {
        // console.log('You are going to login!') // For DEBUGGING
        return this.http.
            post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=` + environment.fbAPIKey,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }
            )
            .pipe(
                catchError((errorRes: HttpErrorResponse) => {
                    let errorMessage = 'An unknown error!';
                    if (!errorRes.error || !errorRes.error.error) {
                        return throwError(errorMessage);
                    }
                    switch (errorRes.error.error.message) {
                        case 'INVALID_PASSWORD': errorMessage = 'Invalid password! Please, try again!'; break;
                        case 'EMAIL_NOT_FOUND': errorMessage = 'There is no user with this email.'; break;
                    }
                    return throwError(errorMessage);
                }), tap(resData => {
                    this.handleAuth(resData.email, resData.localId, resData.idToken, Number(resData.expiresIn))

                })
            );

    }

    autoLogin() {
        const userInfo: {
            email: string;
            id: string;
            _token: string;
            _tokenExpiration: string;
        } = JSON.parse(localStorage.getItem('userInfo'));

        if (!userInfo) {
            // console.log('You are here in the AUTO LOGIN!'); // For DEBUGGING
            return;
        }

        const loadedUser = new User(userInfo.email, userInfo.id, userInfo._token, new Date(userInfo._tokenExpiration));
        if (loadedUser.token) {

            this.user.next(loadedUser);
            const expirationDuration = new Date(userInfo._tokenExpiration).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }

    }

    autoLogout(expirationTime: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationTime)
    }
}