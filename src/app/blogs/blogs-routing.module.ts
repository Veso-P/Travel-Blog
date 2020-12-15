import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { AuthGuard } from '../user/auth-guards/auth-guard.service'; // Guard for non-Authenticated Users

// Components
import { BlogItemCreateComponent } from './blog-item-create/blog-item-create.component';
import { BlogItemDetailsComponent } from './blog-item-details/blog-item-details.component';
import { BlogsComponent } from './blogs.component';


// Blog Pages/Routes:
const routes: Routes = [
  {
    path: 'blogs', children: [
      { path: '', component: BlogsComponent, pathMatch: 'full' },
      {
        path: 'new', children: [
          { path: '', component: BlogsComponent, pathMatch: 'full', data: { newest: true } },
          { path: ':num', component: BlogsComponent, pathMatch: 'full', data: { newest: true } },
        ]
      },
      {
        path: 'trending', children: [
          { path: '', component: BlogsComponent, pathMatch: 'full', data: { trending: true } },
          { path: ':numTrending', component: BlogsComponent, pathMatch: 'full', data: { trending: true } },
        ]
      },
      { path: ':id', component: BlogItemDetailsComponent, pathMatch: 'full' },
    ]
  },
  // => Create Page/Route: 
  { path: 'create', component: BlogItemCreateComponent, canActivate: [AuthGuard], pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule {

}