import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { Blog } from './blog.model';
import { AuthService } from '../user/auth-services/auth.service';

@Injectable()
export class BlogService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getBlogs() {
    return this.http.get<{ [key: string]: Blog }>('/blogs/blogs.json')
      .pipe(map((responseData) => {
        //console.log('This is the response:'); // FOR DEBUGGING
        //console.log(responseData); // FOR DEBUGGING
        let blogsArray: Blog[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            blogsArray.push({ ...responseData[key], id: key })
          }
        }
        // console.log(blogsArray); // FOR DEBUGGING
        // let sortedByCreation = blogsArray.sort((a, b) => b.createdAt - a.createdAt).slice(0, 2); // Old Filter
        // return sortedByCreation;
        return blogsArray;
      }))
    //console.log ('This is the array' + arr) // FOR DEBUGGING
    //return this.blogs.slice(); // FOR DEBUGGING

  }

}