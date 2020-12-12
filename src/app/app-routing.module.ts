import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { AuthGuard } from './user/auth-guard.service'; // Guard for non-Authenticated Users
import { AuthGuardTwo } from './user/auth-guard-two.service'; // Guard for Authenticated Users


// Components
import { BlogsComponent } from './blogs/blogs.component';
import { AboutComponent } from './common-pages/about/about.component';
import { ContactComponent } from './common-pages/contact/contact.component';
import { PageNotFoundComponent } from './common-pages/page-not-found/page-not-found.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserComponent } from './user/user/user.component';
import { BlogItemDetailsComponent } from './blogs/blog-list/blog-item-details/blog-item-details.component';
import { BlogItemComponent } from './blogs/blog-list/blog-item/blog-item.component';

import { BlogItemCreateComponent } from './blogs/blog-list/blog-item-create/blog-item-create.component';


const appRoutes: Routes = [
  {
    path: 'blogs', children: [
      { path: '', component: BlogsComponent, pathMatch: 'full' },
      { path: 'new', component: BlogsComponent, pathMatch: 'full', data: { newest: true } },
      { path: 'trending', component: BlogsComponent, pathMatch: 'full', data: { trending: true }}
    ]
  },
  { path: '', redirectTo: '/blogs', pathMatch: 'full' },
  { path: 'home', redirectTo: '/blogs', pathMatch: 'full' },


  // General Pages:
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  { path: 'contact', component: ContactComponent, pathMatch: 'full' },

  // User Routes:
  { path: 'user/login', component: LoginComponent, canActivate: [AuthGuardTwo], pathMatch: 'full' },
  { path: 'user/register', component: RegisterComponent, canActivate: [AuthGuardTwo], pathMatch: 'full' },
  { path: 'user/profile', component: UserComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  // { path: 'user/profile/:id', component: RegisterComponent, pathMatch: 'full' },

  // Blog Pages: 
  { path: 'create', component: BlogItemCreateComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'blogs/trending/:numTrending', component: BlogsComponent, pathMatch: 'full', data: { trending: true } },
  { path: 'blogs/new/:num', component: BlogsComponent, pathMatch: 'full', data: { newest: true } },
  { path: 'blogs/:id', component: BlogItemDetailsComponent, pathMatch: 'full' },
  // { path: 'blogs/trending', redirectTo: '/blogs', pathMatch: 'full' },
  // { path: 'blogs/new', redirectTo: '/blogs', pathMatch: 'full' },
  
  // Page Not Found:
  { path: '**', component: PageNotFoundComponent }


];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
