import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('formState', [
      state('normal', style({
        'background-color': 'transparent',
        //transform: 'translateX(0)'
      })),
      state('danger', style({
        'background-color': 'transparent',
      })),
      transition('normal => danger',
        [style({
          'background-color': 'red'
        }),
        animate(200, style({
          'background-color': 'transparent'
        })),
        animate(200, style({
          'background-color': 'red'
        })),
        animate(200, style({
          'background-color': 'transparent'
        })),
        animate(200, style({
          'background-color': 'red'
        })),
        animate(200)
        ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  state = 'normal';

  loginForm: FormGroup;
  currentUsername = '';
  isLoading: boolean = false;
  error: string = null;
  isLogging: boolean = false;

  constructor(private router: Router, private authService: AuthService, formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(6)]), //  
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.loginForm.valueChanges.subscribe(
      (value) => { this.currentUsername = value }
    )
  }

  onLogin() {
    //console.log('You are about to login!'); // For DEBUGGING
    //console.log(this.loginForm.value); // For DEBUGGING

    const email = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    // console.log(email); // For DEBUGGING

    this.isLoading = true;
    this.authService.login(email, password)
      .subscribe(
        responseData => {
          // console.log(responseData); // For DEBUGGING
          this.error = null;
          this.isLogging = true;
          setTimeout(() => {
            this.isLoading = false;
            this.isLogging = false;
            this.router.navigate(['/blogs'])
          }, 2500);

        },
        errorMessage => {
          if (this.state == 'normal') {
            this.state = 'danger';
          }
          // console.log(errorMessage); // For DEBUGGING
          this.error = errorMessage;
          this.isLoading = false;

        }
      );


    this.loginForm.reset();

  }

  onHandleError() {
    this.error = null;
  }

  animationEnded() {
    this.state = 'normal';
  }

}
