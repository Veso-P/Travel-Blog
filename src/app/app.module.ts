import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {   FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'

// Routing Module
import { AppRoutingModule } from './app-routing.module';

// Services and Pipes
import { FilterPipe } from './blogs/blog-list/filter.pipe';
import { BlogService } from './blogs/blog.service';
import { AuthService } from './user/auth.service';
import { AuthGuard } from './user/auth-guard.service';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AsideComponent } from './layout/aside/aside.component';
import { AboutComponent } from './common-pages/about/about.component';
import { ContactComponent } from './common-pages/contact/contact.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogListComponent } from './blogs/blog-list/blog-list.component';
import { BlogItemComponent } from './blogs/blog-list/blog-item/blog-item.component';
import { UserComponent } from './user/user/user.component';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { RegisterComponent } from './user/register/register.component';
import { BlogItemDetailsComponent } from './blogs/blog-list/blog-item-details/blog-item-details.component';
import { BlogItemEditComponent } from './blogs/blog-list/blog-item-edit/blog-item-edit.component';
import { PageNotFoundComponent } from './common-pages/page-not-found/page-not-found.component';
import { BlogItemCreateComponent } from './blogs/blog-list/blog-item-create/blog-item-create.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    AboutComponent,
    ContactComponent,
    BlogsComponent,
    BlogListComponent,
    BlogItemComponent,
    FilterPipe,
    UserComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    BlogItemDetailsComponent,
    BlogItemEditComponent,
    PageNotFoundComponent,
    BlogItemCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,    
    FormsModule, HttpClientModule  ],
  providers: [BlogService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
