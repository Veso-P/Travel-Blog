import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { Blog } from './blog.model';
import { AuthService } from '../../user/auth.service';

@Injectable()
export class BlogService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getBlogs() {
    return this.http.get<{ [key: string]: Blog }>('/blogs/blogs.json')
      .pipe(map((responseData) => {
        console.log('This is the response:');
        console.log(responseData);
        let blogsArray: Blog[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            blogsArray.push({ ...responseData[key], id: key })
          }
        }
        console.log(blogsArray);
        //let sortedByCreation = blogsArray.sort((a, b) => b.createdAt - a.createdAt).slice(0, 2);
        //return sortedByCreation;
        return blogsArray;
      }))
    //console.log ('This is the array' + arr) // FOR DEBUGGING
    //return this.blogs.slice(); // FOR DEBUGGING

  }

}


// Initial posts
// private blogs: Blog[] = [
  //   new Blog('1', 'Sofia blog', 'Description of Sofia Blog', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Sofia_%2837536243674%29.jpg/1200px-Sofia_%2837536243674%29.jpg',[]),
  //   new Blog ( '2','Plovdiv blog', 'Plovdiv lies at the foot of the Rhodope Mountains – one of the most stunning mountain ranges on the entire Balkans. The region is known for its incredible biodiversity, countless natural sites, hiking trails and many breathtaking landscapes. The area is well suited for mountain, ecological, hunting and fishing tourism so it’s no wonder so many people explore it each year! If you’re staying in Plovdiv, take out a day (or two) from your schedule to experience its magic for yourself, especially if you’re visiting in the warmer months. Here are some of the best day trips from Plovdiv to the magnificent Rhodope Mountains!', 'https://images.squarespace-cdn.com/content/575e48f1859fd02bebd2f86b/1533221617365-I73JTZQJ8H76N1NON4D3/IMG_1067-2.jpg?format=1500w&content-type=image%2Fjpeg', ['First comment', 'This is really a very nice post!', 'Hey body, nice travel vlog!']),
  //   new Blog ('3','Varna blog', 'Description of Varna blog', 'https://tse4.mm.bing.net/th?id=OIP.r_as_UDbpl9_vegvB2-tHAEyDL&pid=Api', []),
  //   new Blog ('4','Dimitrovgrad blog', 'Description of Dimitrovgrad blog', 'https://vizit-bulgaria.ru/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/12/Dimitrovgrad_bulgari-1024x441.jpg.webp')
  // ];

  // getBlog(index: string) {
  //   // let selectedBlog = '';
  //   // //return this.blogs.find(item => item.id == index);
  //   // console.log(index);

  //   let blogs = this.getBlogs();
  //   console.log(blogs);

  // }