import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


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
  selectedBlog;
  allowEdit: Boolean = true;


  constructor(private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }
  // constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    console.log('The id is: ' + this.id);

    this.blogService.getBlogs().subscribe(fetchedBlogs=> {
      this.selectedBlog = fetchedBlogs.find(item => item.id == this.id);
      // console.log(typeof fetchedBlogs);
      // fetchedBlogs.slice();
    })
  
    
    // this.selectedBlog = this.blogService.getBlog(this.id)
    // console.log('The selected blog is: ' + this.selectedBlog);

    // subscribing to the observable for changes
    // this.route.params.subscribe(
    //   (params: Params)=> {
    //     console.log(params)
    //   }
    // );   

  }

  // Add comment functionality integrated. Later, I have to connect the textarea field with the 'Add comment' button.
  onAddComment() {
      console.log('You are about to add comment!');
      this.selectedBlog.comments.push('Added Comment!')
  }

  onEditBlog() {
    console.log('You are about to edit the blog with id:' + this.id);
    this.router.navigate(['edit'], {relativeTo: this.route});
    //    this.router.navigate(['/blogs', this.id, 'edit']);

  }

  onDeleteBlog() {
    console.log('You are about to delete the blog with id:' + this.id);

    // send HTTP DELETE request (subscription is obligatory as it is Observable)
    this.http.delete(`https://my-exam-1e19a.firebaseio.com/blogs/${this.id}.json}`).subscribe(responseData => {console.log(responseData)} );

    // this.router.navigate(['edit'], {relativeTo: this.route});
    this.router.navigate(['/blogs'])

  }

}
