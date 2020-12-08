import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface AuthResponseData  {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}


@Injectable()
export class AuthService {
    loggedIn = false;

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

    login() {
        console.log('You are going to login!')
        this.loggedIn = true;
    }

    logout() {
        console.log('You are going to logout!')
        this.loggedIn = false;
    }

    register(email: string, password: string) {
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-M8hsjvq7nFpsvZ3UXsVUqSl7JPisdcs', {
            email: email,
            password: password,
            returnSecureToken: true,	
        });
    }
}