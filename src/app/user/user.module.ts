import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

//import { SpinnerComponent } from '../shared/spinner/spinner.component';

// Routes
import { UserRoutingModule } from './user-routing.module';


@NgModule({
    declarations: [
        UserComponent,
        LoginComponent,
        RegisterComponent,

        //SpinnerComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,

        UserRoutingModule
    ],

})

export class UserModule { }