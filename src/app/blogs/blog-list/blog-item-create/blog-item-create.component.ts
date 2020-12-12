import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators'

import { Blog } from '../../blog.model';
import { AuthService } from 'src/app/user/auth.service';


@Component({
  selector: 'app-blog-item-create',
  templateUrl: './blog-item-create.component.html',
  styleUrls: ['./blog-item-create.component.css']
})
export class BlogItemCreateComponent implements OnInit {
  createForm: FormGroup;
  dataToSend: Blog;
  createdAt: number;
  isLoading: boolean = false;
  userId: string;
  info: string;


  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {

     // receivig user info:
     this.info = localStorage.getItem('userInfo');
     
     

    this.createForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(6)]), //  
      'imagePath': new FormControl(null, Validators.required),
      'description': new FormControl(null, [Validators.required, Validators.minLength(200)])


    });
    this.createForm.valueChanges.subscribe(
      (value) => { this.dataToSend = value }
    );

  }

  onCreate() {
    this.isLoading = true;
    this.dataToSend['creator'] = JSON.parse(this.info).id;    
    
    this.createdAt = Date.now();

    this.dataToSend.createdAt = this.createdAt;
    console.log('The data to be send is: ');
    console.log(this.dataToSend);
    // this.dataToSend.comments = ['first comment', 'second comment'];
    this.authService.user.pipe(take(1)).subscribe(user => {
      console.log(user);
      this.http.post<{ name: string }>('https://my-exam-1e19a.firebaseio.com/blogs.json?auth=' + user.token, this.dataToSend).subscribe(responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/blogs'])
      })
    })

    // send HTTP request (subscription is obligatory as it is Observable)


    this.createForm.reset()
    // to be removed in the HTTP request
  }

}
