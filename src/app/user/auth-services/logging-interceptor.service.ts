import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { exhaustMap, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class LoggingInterceptorService implements HttpInterceptor {
    isLoading: boolean = true;

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (req.method === "POST") {
            //console.log('You are receiving a request from POST Http'); // For DEBUGGING
            //console.log('The req is'); // For DEBUGGING
            //console.log(req); // For DEBUGGING
            return next.handle(req).pipe(
                tap(event => {
                    // console.log(event) // For DEBUGGING
                    if (event.type === HttpEventType.Response) {
                        // console.log('This is the event type:')  // For DEBUGGING
                        // console.log(event.body); // For DEBUGGING

                    };
                }));
        };

        return next.handle(req);
        // this.isLoading = true;

        // return this.authService.user.pipe(
        //     take(1),
        //     exhaustMap(user => {

        //         if (req.method === "GET" || !user) {
        //             return next.handle(req);
        //         }
        //         const modifiedReq = req.clone({
        //             params: new HttpParams().set('auth', user.token)
        //         });
        //         return next.handle(modifiedReq)
        //     })
        // )
    }
}