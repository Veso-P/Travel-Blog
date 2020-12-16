import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { AuthService } from 'src/app/user/auth-services/auth.service';
import * as bcrypt from 'bcryptjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, OnChanges {
  isLoggingout = false;
  isAuthenticated = false;
  currentUser: string;
  userToken: string;
  private userSubscription: Subscription;

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      //console.log('The user info on OnInit is:'); // For DEBUGGING 
      //console.log(user); // For DEBUGGING 

      if (!user) {
        this.isAuthenticated = false;

      } else {

        this.isAuthenticated = true;
        this.currentUser = user.email;
        this.userToken = user.token;

        // console.log('The user token is: ' + user.token) // For DEBUGGING
        // console.log('To compare with: ' + JSON.parse(localStorage.getItem('EI'))); // For DEBUGGING 
      }


      // this.isAuthenticated = !user ? false : true; 
      //console.log('Data about the user:'); // For DEBUGGING 
      //console.log(user); // For DEBUGGING 
      //this.router.navigate(['/blogs']);  // Old authentication

    })

    let hash = JSON.parse(localStorage.getItem('EI'));
    if (!hash) {
      this.isAuthenticated = false
    } else {
      if (bcrypt.compareSync(this.userToken, hash)) {
        //console.log('Is real token'); // For DEBUGGING 
        this.isAuthenticated = true;

      } else {
        //console.log('Is not a real token!'); // For DEBUGGING 
        this.isAuthenticated = false;
        this.onLogout();
      }
    }
  }

  onLogout() {
    this.isLoggingout = true;
    setTimeout(() => {      
      this.isLoggingout = false;
      this.authService.logout();
    }, 2000)
  }

  ngOnChanges() {

  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
