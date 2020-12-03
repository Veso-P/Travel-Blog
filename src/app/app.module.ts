import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AsideComponent } from './layout/aside/aside.component';
import { AboutComponent } from './common-pages/about/about.component';
import { ContactComponent } from './common-pages/contact/contact.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogListComponent } from './blogs/blog-list/blog-list.component';
import {BlogItemComponent} from './blogs/blog-list/blog-item/blog-item.component'
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './blogs/blog-list/filter.pipe';
import { UserComponent } from './user/user/user.component';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { RegisterComponent } from './user/register/register.component';
import { BlogItemDetailsComponent } from './blogs/blog-list/blog-item-details/blog-item-details.component';
import { BlogService } from './blogs/blog.service';

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
    BlogItemDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
