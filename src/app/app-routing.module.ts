import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Components
import { BlogsComponent } from './blogs/blogs.component';
import { AboutComponent } from './common-pages/about/about.component';
import { ContactComponent } from './common-pages/contact/contact.component';
import { PageNotFoundComponent } from './common-pages/page-not-found/page-not-found.component';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { RegisterComponent } from './user/register/register.component';
import { UserComponent } from './user/user/user.component';
import { BlogItemDetailsComponent } from './blogs/blog-list/blog-item-details/blog-item-details.component';
import { BlogItemEditComponent } from './blogs/blog-list/blog-item-edit/blog-item-edit.component';
import { BlogItemComponent } from './blogs/blog-list/blog-item/blog-item.component';
// import { AuthGuard } from './user/auth-guard.service';
import { BlogItemCreateComponent } from './blogs/blog-list/blog-item-create/blog-item-create.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/blogs', pathMatch: 'full' },
  { path: 'home', redirectTo: '/blogs', pathMatch: 'full' },

  // General Pages
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  { path: 'contact', component: ContactComponent, pathMatch: 'full' },
  // Users Routes
  { path: 'user/login', component: LoginComponent, pathMatch: 'full' },
  { path: 'user/logout', component: LogoutComponent, pathMatch: 'full' },
  { path: 'user/register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'user/profile', component: UserComponent, pathMatch: 'full' },
  // { path: 'user/profile/:id', component: RegisterComponent, pathMatch: 'full' },
  // Blog Pages
  { path: 'blogs', component: BlogsComponent, pathMatch: 'full', },
  { path: 'blogs/trending', redirectTo: '/blogs', pathMatch: 'full' },
  { path: 'blogs/create', component: BlogItemCreateComponent, pathMatch: 'full' },
  { path: 'blogs/new', redirectTo: '/blogs', pathMatch: 'full' },
  { path: 'blogs/:id', component: BlogItemDetailsComponent, pathMatch: 'full' },
  { path: 'blogs/:id/edit', component: BlogItemEditComponent, pathMatch: 'full' },
  

  // Page Not Found
  {path: '**', component: PageNotFoundComponent}



];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
