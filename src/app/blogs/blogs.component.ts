import { Component, OnDestroy, OnInit, Input, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlogService } from './blog.service';
import {FilterPipe} from './blog-pipes/filter.pipe'
import {Blog} from './blog.model'

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  providers:[BlogService, FilterPipe]
})
export class BlogsComponent implements OnInit, DoCheck, OnDestroy {
  filteredStatus = '';
  isLoading: boolean = false;
  sub;
  sub2;
  limit: number = 3; // Default value of 3 for the newest blogs (to be overwritten onInit)
  limitTrending: number = 3; // Default value of 3 for the treding blogs (to be overwritten onInit)
  @Input() num;
  @Input() numTrending;

  // variables for sorting via PIPES
  trending: boolean = false;
  newest: boolean = false;

  blogs: Blog[] = [];

  constructor(private blogService: BlogService,
              private router: Router,
              private route: ActivatedRoute) {
              // console.log('Consturctor called.') // For DEBUGGING
  }

  ngOnInit() {
    this.isLoading = true;
    //console.log("YOU ARE IN THE BLOG-LIST component") // FOR DEBUGGING
    this.sub = this.route.data.subscribe(v => {
      //console.log('This is the data snapshot:') // FOR DEBUGGING
      //console.log(v) // FOR DEBUGGING
      if (v.hasOwnProperty('trending')) {
        this.trending = v.trending;
        //console.log('is trending!')
        this.newest = false;
        //console.log('Below are the params:') // FOR DEBUGGING
        //console.log(this.route.snapshot.params); // FOR DEBUGGING
      } 
      
      if (v.hasOwnProperty('newest')) {
        this.newest = v.newest;
        //console.log('is newest!') // // FOR DEBUGGING
        this.trending = false;
        //console.log('Below are the params:') // FOR DEBUGGING
        //console.log(this.route.snapshot.params); // FOR DEBUGGING
      }
    });

    this.limit = Number(this.route.snapshot.params['num']);
    this.limitTrending = Number(this.route.snapshot.params['trending'])
    // console.log(this.route.snapshot.params); // FOR DEBUGGING

    //console.log(this.limit); // FOR DEBUGGING
    //this.blogs = this.blogService.getBlogs(); // FOR DEBUGGING
    //console.log(typeof this.blogService.getBlogs()); // FOR DEBUGGING
    this.blogService.getBlogs().subscribe(fetchedBlogs=> {
      this.blogs = fetchedBlogs;
      this.isLoading = false;
      // console.log(typeof fetchedBlogs); // FOR DEBUGGING
      // fetchedBlogs.slice(); // FOR DEBUGGING
    })
    
  }  

  ngDoCheck() {
    this.limit = Number(this.route.snapshot.params['num']);
    // console.log('The limit of newest blog is: ' + this.limit); // FOR DEBUGGING
    this.limitTrending = Number(this.route.snapshot.params['numTrending']);
    // console.log(this.limitTrending); // FOR DEBUGGING
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe(); 
  }
  
}


