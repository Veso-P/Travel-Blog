import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { CommonPagesComponent } from './common-pages.component';


// General Pages/Routes:
const routes: Routes = [   
  { path: 'about', component: CommonPagesComponent, pathMatch: 'full', data: {page: 'about'}},
  { path: 'contact', component: CommonPagesComponent, pathMatch: 'full', data: {page: 'contact'} },
  // // Page Not Found (404):
  { path: '**', component: CommonPagesComponent, data: {page: 'page404'} }    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CommonPagesRoutingModule {

}