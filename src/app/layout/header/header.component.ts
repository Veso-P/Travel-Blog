import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggingout = false;
  isAuthenticated = false;
  private userSubscription : Subscription;

  constructor(private router: Router, 
    private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
      console.log('Data about the user:');
      console.log(user);
      //this.router.navigate(['/blogs']);
      
    })
  }

  onLogout() {
    this.isLoggingout = true;
      setTimeout(()=> {
        this.isLoggingout = false;
        this.authService.logout();
      }, 2500)
    
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  } 

}
