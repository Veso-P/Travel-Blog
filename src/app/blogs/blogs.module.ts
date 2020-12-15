import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { BlogsComponent } from './blogs.component';
import { BlogItemComponent } from './blog-item/blog-item.component';
import { BlogItemCreateComponent } from './blog-item-create/blog-item-create.component';
import { BlogItemDetailsComponent } from './blog-item-details/blog-item-details.component';

import { SpinnerComponent } from '../shared/spinner/spinner.component';


// PIPEs
import { FilterPipe } from './blog-pipes/filter.pipe';
// => Custom Pipes
import { SortDatePipe } from './blog-pipes/sort-date.pipe';
import { TrendingPipe } from './blog-pipes/trending.pipe';

// Routes
import { BlogsRoutingModule } from './blogs-routing.module';



@NgModule({
    declarations: [
        BlogsComponent,
        BlogItemComponent,
        BlogItemCreateComponent,
        BlogItemDetailsComponent,

        FilterPipe,
        SortDatePipe,
        TrendingPipe,

        SpinnerComponent,

    ],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        
        BlogsRoutingModule
    ],

})

export class BlogsModule { }










 // exports: [
    //     BlogsComponent,
    //     BlogItemComponent,
    //     BlogItemCreateComponent,
    //     BlogItemDetailsComponent,
    //     BlogsRoutingModule
    // ]