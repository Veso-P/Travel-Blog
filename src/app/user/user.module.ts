import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

// Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

// Routes
import { UserRoutingModule } from './user-routing.module';


@NgModule({
    declarations: [
        UserComponent,
        LoginComponent,
        RegisterComponent,
    ],
    imports: [      
        SharedModule,
        UserRoutingModule,      

    ],

})

export class UserModule { }