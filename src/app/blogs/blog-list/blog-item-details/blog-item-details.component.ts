import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators'
import { FormControl, FormGroup, Validators } from '@angular/forms';


import { Blog } from '../../blog.model'
import { BlogService } from '../../blog.service';
import { AuthService } from 'src/app/user/auth.service';


@Component({
  selector: 'app-blog-item-details',
  templateUrl: './blog-item-details.component.html',
  styleUrls: ['./blog-item-details.component.css']
})
export class BlogItemDetailsComponent implements OnInit {
  @Input() blog: Blog;
  id: string;
  selectedBlog: Blog;
  allowComment: Boolean = false;
  allowEdit: Boolean = false;
  isLoading: boolean = false;
  isDeleted: boolean = false;  
  pleaseEdit: boolean = false;
  buttonName: string = 'Edit';

  //Details of Edit form
  editForm: FormGroup;
  dataToSend: Blog;
  updateToSend: {};


  constructor(private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) { }
  // constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']

    //console.log('The id is: ' + this.id);
    let userId = '';
    let info =JSON.parse(localStorage.getItem('userInfo'));
    if (info && info.hasOwnProperty('id')){
      userId = info.id;
      console.log('The user is: ' + userId);

    }    
    
    this.blogService.getBlogs().subscribe(fetchedBlogs => {
      this.selectedBlog = fetchedBlogs.find(item => item.id == this.id);
      // console.log(typeof fetchedBlogs);
      console.log(this.selectedBlog)
      if (this.selectedBlog.creator == userId){
        this.allowEdit = true;
      }

      this.editForm = new FormGroup({
        'name': new FormControl(this.selectedBlog.name, [Validators.required, Validators.minLength(6)]), //  
        'imagePath': new FormControl(this.selectedBlog.imagePath, Validators.required),
        'description': new FormControl(this.selectedBlog.description, [Validators.required, Validators.minLength(50)])

  
  
      });

      
      this.editForm.valueChanges.subscribe(
        (value) => { this.dataToSend = value }
      );
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
    // let modifiedArray = JSON.parse(this.selectedBlog.comments);    

    let comment = 'Just a Comment!';
    console.log('You are about to add comment!');
    //modifiedArray.push(comment);

    if (this.selectedBlog.hasOwnProperty('comments')) {
      this.selectedBlog.comments.push(comment);
    } else {
      this.selectedBlog.comments = [comment];
    }
    // this.selectedBlog.comments=(JSON.stringify(modifiedArray))
    // console.log(this.selectedBlog.comments)
    // this.selectedBlog.comments=JSON.parse(this.selectedBlog.comments)
  }

  onEditBlog() {
    this.pleaseEdit=!this.pleaseEdit;
    if(this.pleaseEdit == true) {
      this.buttonName = "Cancel Editing!"
    } else {
      this.buttonName = 'Edit';
    }
  }

  onDeleteBlog() {
    //console.log('You are about to delete the blog with id:' + this.id);
    this.isLoading = true;


    // send HTTP DELETE request (subscription is obligatory as it is Observable)
    // this.http.delete(`/blogs/blogs/${this.id}.json`).subscribe(responseData => {console.log(responseData)} ); // used for testing!

    //////
    this.authService.user.pipe(take(1)).subscribe(user => {
      console.log(user);

      this.http.delete(`/blogs/blogs/${this.id}.json?auth=` + user.token).subscribe(responseData => {
        console.log(responseData);
        
        this.isDeleted = true;

        setTimeout(() => {
          this.isDeleted = false;
          this.isLoading = false;
          this.router.navigate(['/user/profile'])
        }, 2500);
      });
    })


    ////

    // this.router.navigate(['edit'], {relativeTo: this.route});
    //this.router.navigate(['/blogs'])

  }


  sendEdit() {
    console.log('You are going to update the blog!')
    console.log(this.editForm.value);
    this.updateToSend=this.editForm.value;

    this.isLoading = true; 
    
       // this.dataToSend.comments = ['first comment', 'second comment'];
    this.authService.user.pipe(take(1)).subscribe(user => {
      console.log(user);
      this.http.patch<{}>(`https://my-exam-1e19a.firebaseio.com/blogs/${this.selectedBlog.id}.json?auth=` + user.token, this.updateToSend).subscribe(responseData => {
        console.log(`this is the response of the update:`)
        console.log(responseData);
        
        this.selectedBlog.name = this.editForm.value.name;
        this.selectedBlog.description=this.editForm.value.description;
        this.selectedBlog.imagePath=this.editForm.value.imagePath;
        this.isLoading = false;
        this.pleaseEdit = !this.pleaseEdit;
       
       this.router.navigate(['/blogs/'+this.selectedBlog.id])
       
      })
      
    })

    // send HTTP request (subscription is obligatory as it is Observable)


    // this.createForm.reset()
    // // to be removed in the HTTP request

  }

}
