import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/user/auth.service';



@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  isAuthenticated: boolean = false;
  private userSubscription : Subscription;

  constructor(private router: Router,
    private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
      console.log('Data about the user:');
      console.log(user);
    })
  }

  onNewBlog() {
    this.router.navigate(['/blogs/create']);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  } 
}
