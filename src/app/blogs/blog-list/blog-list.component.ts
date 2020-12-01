import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Blog } from '../blog.model';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

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
