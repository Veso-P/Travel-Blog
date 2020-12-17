import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpEventType } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { exhaustMap, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    isLoading: boolean = true;

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        //console.log('Request has been sent!'); // For DEBUGGING
        //console.log('The req is: '); // For DEBUGGING
        // console.log(req); // For DEBUGGING
        // this.isLoading = true;

        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {

                if (req.method === "GET" || !user) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle(modifiedReq)
            })
        )
    }
}


