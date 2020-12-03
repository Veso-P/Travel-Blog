import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Blog } from '../../blog.model'
import { BlogService } from '../../blog.service';


@Component({
  selector: 'app-blog-item-details',
  templateUrl: './blog-item-details.component.html',
  styleUrls: ['./blog-item-details.component.css']
})
export class BlogItemDetailsComponent implements OnInit {
  @Input() blog: Blog;
  id: string;
  selectedBlog


  constructor(private blogService: BlogService,
    private route: ActivatedRoute,
  ) { }
  // constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    console.log('The id is: ' + this.id);
    
    this.selectedBlog = this.blogService.getBlog(this.id)
    console.log('The selected blog is: ' + this.selectedBlog);

  }

}
