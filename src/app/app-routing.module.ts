import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [

  { path: '', redirectTo: '/blogs', pathMatch: 'full' },
  { path: 'home', redirectTo: '/blogs', pathMatch: 'full' },
  // LAZY-LOADING
  { path: 'blogs', loadChildren: './blogs/blogs.module#BlogsModule' },
  { path: 'user', loadChildren: './user/user.module#UserModule' },
  { path: '', loadChildren: './layout/common-pages/common-pages.module#CommonPagesModule'} // CommonPagesModule is last, because of the '**' page   
  // another approach for lazy-loading:
  // { path: 'blogs', loadChildren: () => import('./blogs/blogs.module).then(module => module.BlogsModule) }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }