import { NgModule } from '@angular/core';
//import { CoreModule } from '../core.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { AsideComponent } from './aside/aside.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        AsideComponent,
    ],
    imports: [
        SharedModule,
        //CoreModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        AsideComponent,
    ]
})

export class LayoutModule { }