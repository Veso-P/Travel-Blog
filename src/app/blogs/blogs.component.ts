import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogService } from './blog.service';


@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  providers:[BlogService]
})
export class BlogsComponent implements OnInit, OnDestroy {
  // sub // Due to code optimization moved to the child blog-list (operation 1)

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.sub = this.route.data.subscribe(v => console.log(v)); // Due to code optimization moved to the child blog-list (operation 1)

  }

  ngOnDestroy() {
    // this.sub.unsubscribe(); // Due to code optimization moved to the child blog-list (operation 1)
  }

}
