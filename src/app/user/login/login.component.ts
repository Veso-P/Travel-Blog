import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ControlContainer, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
    console.log('You are about to login!');
    console.log(this.loginForm.value);

    const email = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    console.log(email);

    this.isLoading = true;
    this.authService.login(email, password)
      .subscribe(
        responseData => {
          console.log(responseData);
          this.error = null;
          this.isLogging = true;
          setTimeout(() => {
            this.isLoading = false;
            this.isLogging=false;
            this.router.navigate(['/blogs'])
          }, 2500);

        },
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;

        }
      );


    this.loginForm.reset();

  }

  onHandleError() {
    this.error = null;
  }

}
