import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Blog } from '../blog.model'


@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css']
})
export class BlogItemComponent implements OnInit {
  @Input() blog: Blog;
  @Input() index: number;
  
  constructor() {}

  ngOnInit(): void {
    console.log(this.blog)
    
  }

}
