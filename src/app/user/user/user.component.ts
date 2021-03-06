import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/blogs/blog.service';
import { Blog } from 'src/app/blogs/blog.model';




@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  data: Blog[];
  info: string;
  isLoading:boolean =false;
  userName: string;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.info = localStorage.getItem('userInfo'); 
    this.isLoading=true;

    // console.log('The user is: ') // For DEBBUGING
     let userId = JSON.parse(this.info).id;
     this.userName = (JSON.parse(this.info)).email;
    //  console.log('The user is: ' + userId); // For DEBBUGING
    this.blogService.getBlogs().subscribe(fetchedBlogs => {

     let sortedByCreator = fetchedBlogs.filter(a => a.creator == userId);
          this.data = sortedByCreator;
          // console.log('The data is: ' + this.data.length); // For DEBBUGING
        this.isLoading=false;
    //  this.data = fetchedBlogs; // For DEBBUGING
    //  console.log(sortedByCreator) // For DEBBUGING
    //  console.log(typeof fetchedBlogs); // For DEBBUGING
    //  fetchedBlogs.slice(); // For DEBBUGING
    })
  }

}
