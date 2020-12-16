import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [

  { path: '', redirectTo: '/blogs', pathMatch: 'full' },
  { path: 'home', redirectTo: '/blogs', pathMatch: 'full' },
  // LAZY-LOADING
  { path: 'blogs', loadChildren: './blogs/blogs.module#BlogsModule' },
  { path: 'user', loadChildren: './user/user.module#UserModule' },
  { path: '', loadChildren: './layout/common-pages/common-pages.module#CommonPagesModule'}
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }