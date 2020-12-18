import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { Blog } from './blog.model';
import { AuthService } from '../user/auth-services/auth.service';

@Injectable()
export class BlogService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getBlogs() {
    //return this.http.get<JSON>('/blogs/blogs.json')
    return this.http.get<{ [key: string]: Blog }>('https://travelblog1-default-rtdb.europe-west1.firebasedatabase.app/blogs.json')
      .pipe(map((responseData) => {
        console.log('This is the response:'); // FOR DEBUGGING
        console.log(typeof responseData); // FOR DEBUGGING
        //responseData = JSON.parse(responseData);
        
     
        let blogsArray: Blog[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            blogsArray.push({ ...responseData[key], id: key })
          }
        }
        // console.log(blogsArray); // FOR DEBUGGING
        // let sortedByCreation = blogsArray.sort((a, b) => b.createdAt - a.createdAt).slice(0, 2); // Old Filter
        // return sortedByCreation;
        //console.log(typeof blogsArray);
        //console.log(blogsArray)
        return blogsArray;
      }))
    //console.log ('This is the array' + arr) // FOR DEBUGGING
    //return this.blogs.slice(); // FOR DEBUGGING

  }

  getBlog(blogId: string) {
    return this.http.get<Blog>(`https://travelblog1-default-rtdb.europe-west1.firebasedatabase.app/blogs/${blogId}.json`)
      .pipe(map((responseData) => {
        //console.log('This is the response:'); // FOR DEBUGGING
        //console.log(responseData); // FOR DEBUGGING
        // let blogArray: Blog[] = [];
        // blogArray.push({blogId: responseData})
        
        responseData['id'] = blogId;
        

        return responseData;
      }))
    //console.log ('This is the array' + arr) // FOR DEBUGGING
    //return this.blogs.slice(); // FOR DEBUGGING

  }

}