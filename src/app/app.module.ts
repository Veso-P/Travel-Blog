import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

// Importing custom Modules
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
// other modules are lazy-loaded


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
    LayoutModule,
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }