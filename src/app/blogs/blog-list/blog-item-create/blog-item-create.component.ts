import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../../blog.model';


@Component({
  selector: 'app-blog-item-create',
  templateUrl: './blog-item-create.component.html',
  styleUrls: ['./blog-item-create.component.css']
})
export class BlogItemCreateComponent implements OnInit {
  createForm: FormGroup;
  dataToSend: Blog;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.createForm = new FormGroup ({
      'name': new FormControl(null, [Validators.required, Validators.minLength(4) ]), //  
      'imagePath': new FormControl(null, Validators.required),   
      'description': new FormControl(null, [Validators.required, Validators.minLength(50) ])  
    }) ;
    this.createForm.valueChanges.subscribe (
      (value)=> {this.dataToSend = value}
    )
  }

  onCreate () {
    console.log(this.dataToSend);

    // send HTTP request (subscription is obligatory as it is Observable)
    this.http.post<{name: string}>('https://my-exam-1e19a.firebaseio.com/blogs.json', this.dataToSend ).subscribe(responseData => {console.log(responseData)} )

    this.createForm.reset()
  }

}
