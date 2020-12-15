import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { AuthGuard } from '../user/auth-guards/auth-guard.service'; // Guard for non-Authenticated Users
import { AuthGuardTwo } from './auth-guards/auth-guard-two.service'; // Guard for Authenticated Users

// Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';


// User Pages/Routes:
const routes: Routes = [
    {
        path: 'user', children: [
            { path: 'login', component: LoginComponent, canActivate: [AuthGuardTwo], pathMatch: 'full' },
            { path: 'register', component: RegisterComponent, canActivate: [AuthGuardTwo], pathMatch: 'full' },
            { path: 'profile', component: UserComponent, canActivate: [AuthGuard], pathMatch: 'full' },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {

}