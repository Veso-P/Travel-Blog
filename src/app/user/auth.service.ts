import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from './user.model';


interface AuthResponseData {
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

    user = new Subject<User>()



    // isAuthenticated () {
    //     const promise = new Promise ( 
    //         (resolve, reject)=> {
    //             setTimeout(() => {
    //                 resolve(this.loggedIn)
    //             }, 4000);
    //         }
    //     );
    //     return promise;
    // }

    constructor(private http: HttpClient) {

    }

    logout() {
        console.log('You are going to logout!')
        this.loggedIn = false;
    }

    register(email: string, password: string) {
        return this.http.
            post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[KEY]',
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

    private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + Number(expiresIn) * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);

    }

    login(email: string, password: string) {
        console.log('You are going to login!')
        return this.http.
            post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[KEY]',
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
}