import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogItemDetailsComponent } from './blogs/blog-list/blog-item-details/blog-item-details.component';
import { BlogItemComponent } from './blogs/blog-list/blog-item/blog-item.component';

// Components
import { BlogsComponent } from './blogs/blogs.component';
import { AboutComponent } from './common-pages/about/about.component';
import { ContactComponent } from './common-pages/contact/contact.component';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { RegisterComponent } from './user/register/register.component';
import { UserComponent } from './user/user/user.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/blogs', pathMatch: 'full' },
  { path: 'home', redirectTo: '/blogs', pathMatch: 'full' },
  
  // General Pages
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  {path: 'contact', component: ContactComponent, pathMatch: 'full' },
  // Users Routes
  { path: 'user/login', component: LoginComponent, pathMatch: 'full' },
  { path: 'user/logout', component: LogoutComponent, pathMatch: 'full' },
  { path: 'user/register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'user/profile', component: UserComponent, pathMatch: 'full' },  
  // { path: 'user/profile/:id', component: RegisterComponent, pathMatch: 'full' },
  // Aside Pages
  { path: 'blogs/trending', component: LoginComponent, pathMatch: 'full' },
  { path: 'blogs/new', component: LoginComponent, pathMatch: 'full' },
  // Blog Pages
  { path: 'blogs', component: BlogsComponent, pathMatch: 'full' },
  { path: 'blogs/:id', component: BlogItemDetailsComponent, pathMatch: 'full' },

];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
