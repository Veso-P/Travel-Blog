import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import {trigger, state, style, transition, animate} from '@angular/animations';


import { Blog } from '../blog.model'
import { BlogService } from '../blog.service';
import { AuthService } from 'src/app/user/auth-services/auth.service';




@Component({
  selector: 'app-blog-item-details',
  templateUrl: './blog-item-details.component.html',
  styleUrls: ['./blog-item-details.component.css'],
  animations: [
    trigger('pageState', [
      state('normal', style ({
        'background-color': 'transperant', 
        transform:'translateX(0)'       
      })),
      state('colored', style ({
        'background-color': 'lightblue',  
      })),
      transition('normal <=> colored', animate(5000))
    ])
  ]
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
  buttonName: string = 'Edit'; //Default value of 'Edit' used for the Toggle Button

  // Animation logic
  state = 'normal';


  //Details of Edit Form
  editForm: FormGroup;
  dataToSend: Blog;
  updateToSend: {};

  //Details of Comment Form
  commentForm: FormGroup;
  commenterEmail: string;
  commentToSend;

  //Authentication check
  isAuthenticated = false;
  private userSubscription : Subscription;

  constructor(private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) { }
  // constructor(private route: ActivatedRoute) { } 

  ngOnInit(): void {
    this.isLoading=true;
    
    this.id = this.route.snapshot.params['id']

      this.authService.user.pipe(take(1)).subscribe(user => {
      this.isAuthenticated = !user ? false : true;
      //console.log('Data about the user:'); // For DEBUGGING
      //console.log(user); // For DEBUGGING
      //console.log('He is authenticated: ' + this.isAuthenticated); // For DEBUGGING
      //this.router.navigate(['/blogs']);
      if (this.isAuthenticated == true) {
        this.allowComment = true;
        this.commenterEmail = user.email;
      };
      
    });

    //console.log('The id is: ' + this.id); // For DEBUGGING
    let userId = '';
    let info =JSON.parse(localStorage.getItem('userInfo'));
    if (info && info.hasOwnProperty('id')){
      userId = info.id;
      //console.log('The user is: ' + userId); // For DEBUGGING
    };    
    
    this.blogService.getBlogs().subscribe(fetchedBlogs => {
      this.selectedBlog = fetchedBlogs.find(item => item.id == this.id);
      // console.log(typeof fetchedBlogs); // For DEBUGGING
      // console.log(this.selectedBlog);// For DEBUGGING
      this.isLoading=false
      if (this.selectedBlog.creator == userId){
        this.allowEdit = true;
      };

      this.editForm = new FormGroup({
        'name': new FormControl(this.selectedBlog.name, [Validators.required, Validators.minLength(6)]), //  
        'imagePath': new FormControl(this.selectedBlog.imagePath, Validators.required),
        'description': new FormControl(this.selectedBlog.description, [Validators.required, Validators.minLength(50)])   
      });
      
      this.editForm.valueChanges.subscribe(
        (value) => { this.dataToSend = value }
      );
      // fetchedBlogs.slice();
    });

    this.commentForm = new FormGroup({
      'comment': new FormControl(null, [Validators.required, Validators.minLength(6)]), // 
    });
    
  }

  // Add comment functionality integrated
  onAddComment() {
    // let modifiedArray = JSON.parse(this.selectedBlog.comments); // For DEBUGGING 

    let comment = '[' + (new Date()).toString().slice(0,24) +'] '+this.commenterEmail + ': ' + this.commentForm.value.comment ;
    // console.log('You are about to add comment!'); // For DEBUGGING
    //modifiedArray.push(comment);

    if (this.selectedBlog.hasOwnProperty('comments')) {
      this.selectedBlog.comments.push(comment);
    } else {
      this.selectedBlog.comments = [comment];
    };

  
    this.isLoading = true; 
    
    // this.dataToSend.comments = ['first comment', 'second comment']; // For DEBUGGING - used for some dummy comments
    this.authService.user.pipe(take(1)).subscribe(user => {
      // console.log(user); // For DEBUGGING
      this.commentToSend = this.selectedBlog.comments;
      // console.log('You are going to send the array of comments:'); // For DEBUGGING
      let modifiedString = `{"comments": ["${this.commentToSend.join('", "')}"]}`;
      // console.log(modifiedString); // For DEBUGGING
      this.http.patch(`https://travelblog1-default-rtdb.europe-west1.firebasedatabase.app/blogs/${this.selectedBlog.id}.json?`, modifiedString ).subscribe(responseData => {
        //console.log(`this is the response of the update:`) // For DEBUGGING
        //console.log(responseData); // For DEBUGGING
        
        this.isLoading = false;        
       
        this.commentForm.reset();       
      });
      
    });
  };

  onEditBlog() {
    this.pleaseEdit=!this.pleaseEdit;
    if (this.state == 'normal') {
      this.state = 'colored';
    } else if ( this.state == 'colored'){
      this.state = 'normal';
    }
    if(this.pleaseEdit == true) {
      this.buttonName = "Cancel Editing!"
    } else {
      this.buttonName = 'Edit';
    };
  };

  onDeleteBlog() {
    //console.log('You are about to delete the blog with id:' + this.id); // For DEBUGGING
    this.isLoading = true;

    // send HTTP DELETE request (subscription is obligatory as it is Observable)
    // this.http.delete(`/blogs/blogs/${this.id}.json`).subscribe(responseData => {console.log(responseData)} ); // used for testing!
    
    this.authService.user.pipe(take(1)).subscribe(user => {
      //console.log(user); // For DEBUGGING

      this.http.delete(`/blogs/blogs/${this.id}.json?`).subscribe(responseData => {
        // console.log(responseData);// For DEBUGGING
        
        this.isDeleted = true;

        setTimeout(() => {
          this.isDeleted = false;
          this.isLoading = false;
          this.router.navigate(['/user/profile'])
        }, 2500);
      });
    });

    // Routes bellow are to be used, to change the redirection if needed.
    // this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['/blogs'])
  };


  sendEdit() {
    // console.log('You are going to update the blog!') // For DEBUGGING
    // console.log(this.editForm.value); // For DEBUGGING
    this.updateToSend=this.editForm.value;

    this.isLoading = true; 
    
       // this.dataToSend.comments = ['first comment', 'second comment']; // For DEBUGGING - some dummy comments
    this.authService.user.pipe(take(1)).subscribe(user => {
      // console.log(user); // For DEBUGGING
      this.http.patch<{}>(`https://my-exam-1e19a.firebaseio.com/blogs/${this.selectedBlog.id}.json?`, this.updateToSend).subscribe(responseData => {
        //console.log(`this is the response of the update:`) // For DEBUGGING
        // console.log(responseData); // For DEBUGGING
        
        this.selectedBlog.name = this.editForm.value.name;
        this.selectedBlog.description=this.editForm.value.description;
        this.selectedBlog.imagePath=this.editForm.value.imagePath;
        this.isLoading = false;
        //this.pleaseEdit = !this.pleaseEdit; // Old code for toggle-button
        this.onEditBlog();
       
        this.router.navigate(['/blogs/'+this.selectedBlog.id]);       
      });
      
    });

    // send HTTP request (subscription is obligatory as it is Observable)

    // this.createForm.reset()  // To reset the form, if there is no redirection.
  }
  

}
