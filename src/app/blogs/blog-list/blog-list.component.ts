import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Blog } from '../blog.model';
import { BlogService } from '../blog.service';
import {FilterPipe} from './filter.pipe'

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  providers:[FilterPipe]
})
export class BlogListComponent implements OnInit, OnChanges, OnDestroy, DoCheck {
  filteredStatus = '';
  isLoading: boolean = false;
  sub;
  limit: number = 3;
  @Input() num;

  // variables for sorting via PIPES
  trending: boolean = false;

  blogs: Blog[] = [];

  constructor(private blogService: BlogService,
              private router: Router,
              private route: ActivatedRoute) {
              console.log('Consturctor called')
  }

  ngOnInit() {
    this.isLoading = true;
    console.log("YOU ARE IN THE BLOG-LIST component")
    this.sub = this.route.data.subscribe(v => {
      console.log(v) 
      if (v.hasOwnProperty('trending')) {
        this.trending = v.trending;
      }  
    });

    this.limit = Number(this.route.snapshot.params['num']);


    console.log(this.limit);
    //this.blogs = this.blogService.getBlogs();
    //console.log(typeof this.blogService.getBlogs());
    this.blogService.getBlogs().subscribe(fetchedBlogs=> {
      this.blogs = fetchedBlogs;
      this.isLoading = false;
      // console.log(typeof fetchedBlogs);
      // fetchedBlogs.slice();
    })


    
  }

  ngOnChanges() {

  }

  ngDoCheck() {
    this.limit = Number(this.route.snapshot.params['num']);


    console.log(this.limit);
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe(); 
  }
  

}
