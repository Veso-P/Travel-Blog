import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

// Importing custom Modules
import { BlogsModule } from './blogs/blogs.module';
import { UserModule } from './user/user.module';

// Routing Module
import { AppRoutingModule } from './app-routing.module';

// Services
import { BlogService } from './blogs/blog.service';
import { AuthService } from './user/auth-services/auth.service';

// Guards
import { AuthGuard } from './user/auth-guards/auth-guard.service';
import { AuthGuardTwo } from './user/auth-guards/auth-guard-two.service';

// Interceptors:
import { AuthInterceptorService } from './user/auth-services/auth-interceptor.service';
import { LoggingInterceptorService } from './user/auth-services/logging-interceptor.service';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AsideComponent } from './layout/aside/aside.component';

import { CommonPagesComponent } from './common-pages/common-pages.component';

//import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AlertComponent } from './shared/alert/alert.component';


@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    FooterComponent,
    AsideComponent,

    CommonPagesComponent,
    
    AlertComponent,
    //SpinnerComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    BlogsModule,
    UserModule,
    AppRoutingModule, // AppRoutinModule is last, because of the '**' page.
  ],
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
    }], // 
  bootstrap: [AppComponent]
})
export class AppModule { }









// OLD CODE:

// import { BlogsComponent } from './blogs/blogs.component';
// import { BlogItemComponent } from './blogs/blog-item/blog-item.component';
// import { BlogItemDetailsComponent } from './blogs/blog-item-details/blog-item-details.component';
// import { BlogItemCreateComponent } from './blogs/blog-item-create/blog-item-create.component';

// // PIPEs
// import { FilterPipe } from './blogs/blog-pipes/filter.pipe';

// // Custom Pipes
// import { SortDatePipe } from './blogs/blog-pipes/sort-date.pipe';
// import { TrendingPipe } from './blogs/blog-pipes/trending.pipe';

// FilterPipe,
    // SortDatePipe,
    // TrendingPipe,

//     import { UserComponent } from './user/user/user.component';
// import { LoginComponent } from './user/login/login.component';
// import { RegisterComponent } from './user/register/register.component';