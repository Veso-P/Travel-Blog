import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [

  { path: '', redirectTo: '/blogs', pathMatch: 'full' },
  { path: 'home', redirectTo: '/blogs', pathMatch: 'full' },
  // LAZY-LOADING
  { path: 'blogs', loadChildren: () => import('./blogs/blogs.module').then(module => module.BlogsModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(module => module.UserModule) },
  { path: '', loadChildren: () => import('./layout/common-pages/common-pages.module').then(module => module.CommonPagesModule)} // CommonPagesModule is last, because of the '**' page   
   
  // OLD Approach for Lazy-Loading:
  // { path: 'blogs', loadChildren: './blogs/blogs.module#BlogsModule' },
  // { path: 'user', loadChildren: './user/user.module#UserModule' },
  // { path: '', loadChildren: './layout/common-pages/common-pages.module#CommonPagesModule'}
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules} )], // Pre-LAZY-LOADING
  exports: [RouterModule]
})
export class AppRoutingModule { }