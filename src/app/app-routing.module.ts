import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { CommonPagesComponent } from './common-pages/common-pages.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/blogs', pathMatch: 'full' },
  { path: 'home', redirectTo: '/blogs', pathMatch: 'full' },   
  
  // General Pages/Routes:
  { path: 'about', component: CommonPagesComponent, pathMatch: 'full', data: {page: 'about'}},
  { path: 'contact', component: CommonPagesComponent, pathMatch: 'full', data: {page: 'contact'} },
  // // Page Not Found (404):
  { path: '**', component: CommonPagesComponent, data: {page: 'page404'} }

];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }





// // Guards
// import { AuthGuard } from './user/auth-guards/auth-guard.service'; // Guard for non-Authenticated Users
// import { AuthGuardTwo } from './user/auth-guards/auth-guard-two.service'; // Guard for Authenticated Users

// // Components

// import { LoginComponent } from './user/login/login.component';
// import { RegisterComponent } from './user/register/register.component';
// import { UserComponent } from './user/user/user.component';


// OLD ROUTES:
// { path: 'blogs/trending', redirectTo: '/blogs', pathMatch: 'full' },
// { path: 'blogs/new', redirectTo: '/blogs', pathMatch: 'full' },  
// { path: 'user/profile/:id', component: RegisterComponent, pathMatch: 'full' },

// Blogs:
// { path: 'blogs/trending/:numTrending', component: BlogsComponent, pathMatch: 'full', data: { trending: true } },
// { path: 'blogs/new/:num', component: BlogsComponent, pathMatch: 'full', data: { newest: true } },
// { path: 'blogs/trending/:numTrending', component: BlogsComponent, pathMatch: 'full', data: { trending: true } },
// { path: 'blogs/new/:num', component: BlogsComponent, pathMatch: 'full', data: { newest: true } },

// import { BlogsComponent } from './blogs/blogs.component';
// import { BlogItemDetailsComponent } from './blogs/blog-item-details/blog-item-details.component';
// import { BlogItemCreateComponent } from './blogs/blog-item-create/blog-item-create.component';



