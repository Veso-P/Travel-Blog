import { Component, OnInit } from '@angular/core';
import { AuthService } from './user/auth-services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'travel-blog';

  constructor(private authService: AuthService) {}

  ngOnInit( ) {
    this.authService.autoLogin();
  }


}
