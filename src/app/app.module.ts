import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

// Importing custom Modules
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { BlogsModule } from './blogs/blogs.module';
import { UserModule } from './user/user.module';
import { LayoutModule } from './layout/layout.module';
import { CommonPagesModule } from './layout/common-pages/common-pages.module';

// Routing Module
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,       
  ],
  imports: [
    BrowserModule,   
    HttpClientModule,

    AppRoutingModule,
    CoreModule,
    SharedModule,
    BlogsModule,
    UserModule,
    LayoutModule,
    CommonPagesModule, // CommonPagesModule is last, because of the '**' page    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }