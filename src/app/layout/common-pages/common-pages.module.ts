import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { CommonPagesComponent } from './common-pages.component';

// Routes
import { CommonPagesRoutingModule } from './common-pages-routing.module';


@NgModule({
    declarations: [
        CommonPagesComponent,
    ],
        
    imports: [      
        SharedModule,
        CommonPagesRoutingModule
    ],

})

export class CommonPagesModule { }