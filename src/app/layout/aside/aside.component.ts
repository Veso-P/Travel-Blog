import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, DoCheck, AfterContentChecked, AfterViewChecked, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/user/auth-services/auth.service';


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit, OnChanges, OnDestroy {
  isAuthenticated: boolean = false;
  private userSubscription: Subscription;
  num;
  numTrending;

  constructor(private router: Router,
    private route: ActivatedRoute, private authService: AuthService) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log('We have changes!')
    console.log(changes);
  }


  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
      //console.log('Data about the user:');
      //console.log(user);
    })
  }

  onNewBlog() {
    this.router.navigate(['/create']);
  }


  // ngDoCheck() {
  //   console.log('NG DoCheck!');
  //   console.log(this.num)
  //   this.onNewBlogs();
  // }

  // ngAfterContentChecked() {
  //   this.router.navigate['/about']

  //   console.log('NG AfterContentChecked!');
  //   // console.log(this.num)
  // }

  // ngAfterViewChecked() {
  //   console.log('NG afterVIEWchecked!');
  //   // console.log(this.num)
  //   this.router.navigate['/about'];
  //   this.onNewBlogs();
  // }

  onNewBlogs() {
    this.router.navigate['/about']
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
