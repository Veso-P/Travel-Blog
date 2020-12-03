import { Component, OnInit } from '@angular/core';
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
export class BlogListComponent implements OnInit {
  filteredStatus = '';

  blogs: Blog[];

  constructor(private blogService: BlogService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.blogs = this.blogService.getBlogs();
  }

  onNewBlog() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
