import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

// Components
import { BlogsComponent } from './blogs.component';
import { BlogItemComponent } from './blog-item/blog-item.component';
import { BlogItemCreateComponent } from './blog-item-create/blog-item-create.component';
import { BlogItemDetailsComponent } from './blog-item-details/blog-item-details.component';

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
    ],
    imports: [
        SharedModule,
        BlogsRoutingModule
    ],

})

export class BlogsModule { }