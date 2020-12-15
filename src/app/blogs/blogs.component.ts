import { Component, OnDestroy, OnInit, Input, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlogService } from './blog-list/blog.service';
import {FilterPipe} from './blog-list/blog-pipes/filter.pipe'
import {Blog} from './blog-list/blog.model'

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  providers:[BlogService, FilterPipe]
})
export class BlogsComponent implements OnInit, OnDestroy {
  filteredStatus = '';
  isLoading: boolean = false;
  sub;
  sub2;
  limit: number = 3;
  limitTrending: number = 3;
  @Input() num;
  @Input() numTrending;

  // variables for sorting via PIPES
  trending: boolean = false;
  newest: boolean = false;

  blogs: Blog[] = [];

  constructor(private blogService: BlogService,
              private router: Router,
              private route: ActivatedRoute) {
              console.log('Consturctor called.')
  }

  ngOnInit() {
    this.isLoading = true;
    console.log("YOU ARE IN THE BLOG-LIST component")
    this.sub = this.route.data.subscribe(v => {
      console.log('This is the data snapshot:')
      console.log(v) 
      if (v.hasOwnProperty('trending')) {
        this.trending = v.trending;
        console.log('is trending!')
        this.newest = false;
        console.log('Below are the params:')
        console.log(this.route.snapshot.params);
      } 
      
      if (v.hasOwnProperty('newest')) {
        this.newest = v.newest;
        console.log('is newest!')
        this.trending = false;
        console.log('Below are the params:')
        console.log(this.route.snapshot.params);
      }
    });

    this.limit = Number(this.route.snapshot.params['num']);
    this.limitTrending = Number(this.route.snapshot.params['trending'])
    console.log(this.route.snapshot.params);

    //console.log(this.limit);
    //this.blogs = this.blogService.getBlogs();
    //console.log(typeof this.blogService.getBlogs());
    this.blogService.getBlogs().subscribe(fetchedBlogs=> {
      this.blogs = fetchedBlogs;
      this.isLoading = false;
      // console.log(typeof fetchedBlogs);
      // fetchedBlogs.slice();
    })
    
  }  

  ngDoCheck() {
    this.limit = Number(this.route.snapshot.params['num']);
    // console.log(this.limit); //For Debugging
    this.limitTrending = Number(this.route.snapshot.params['numTrending']);
    // console.log(this.limitTrending); //For Debugging
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe(); 
  }
  

}



// OLD CODE
// // sub // Due to code optimization moved to the child blog-list (operation 1)

// constructor(private route: ActivatedRoute) { }

// ngOnInit(): void {
//   // this.sub = this.route.data.subscribe(v => console.log(v)); // Due to code optimization moved to the child blog-list (operation 1)

// }

// ngOnDestroy() {
//   // this.sub.unsubscribe(); // Due to code optimization moved to the child blog-list (operation 1)
// }
