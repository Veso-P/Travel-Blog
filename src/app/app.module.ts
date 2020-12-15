import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

// Importing custom Modules
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { BlogsModule } from './blogs/blogs.module';
import { UserModule } from './user/user.module';
import { CommonPagesModule } from './layout/common-pages/common-pages.module';

// Routing Module
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AsideComponent } from './layout/aside/aside.component';


@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    FooterComponent,
    AsideComponent,

  ],
  imports: [
    BrowserModule,   
    HttpClientModule,

    AppRoutingModule,
    CoreModule,
    SharedModule,
    BlogsModule,
    UserModule,
    CommonPagesModule, // CommonPagesModule is last, because of the '**' page    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }