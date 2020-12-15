import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Services
import { BlogService } from './blogs/blog.service';
import { AuthService } from './user/auth-services/auth.service';

// Guards
import { AuthGuard } from './user/auth-guards/auth-guard.service';
import { AuthGuardTwo } from './user/auth-guards/auth-guard-two.service';

// Interceptors:
import { AuthInterceptorService } from './user/auth-services/auth-interceptor.service';
import { LoggingInterceptorService } from './user/auth-services/logging-interceptor.service';

@NgModule({
    providers: [BlogService, AuthService, AuthGuard, AuthGuardTwo,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoggingInterceptorService,
            multi: true
        }
    ],
}
)

export class CoreModule{}
    