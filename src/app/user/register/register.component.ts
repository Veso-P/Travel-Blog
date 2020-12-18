import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-services/auth.service';


import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  currentData;
  currentPassword: string = '';
  currentRePassword: string;
  isLoading: boolean = false;
  error: string = null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'rePassword': new FormControl(null, [Validators.required, this.passwordMatchValidator.bind(this)])
    })

    this.registerForm.valueChanges.subscribe(
      (value) => {
        this.currentData = value;
        this.currentPassword = this.currentData.password;

      }

    )

  }

  passwordMatchValidator(control: FormControl): { [key: string]: boolean } {
    if (control.value != this.currentPassword) {
      return { 'noMatch': true };
    }
  }


  onRegister() {
    // console.log('You are about to REGISTER!'); // For DEBUGGING
    // console.log('Printing the form!'); // For DEBUGGING
     //console.log(this.registerForm.value); // For DEBUGGING
    // console.log(this.registerForm.valid) // For DEBUGGING
    // console.log('End of printing'); // For DEBUGGING

    if (this.registerForm.value.username.length < 6 || this.registerForm.value.password.length < 6 || (this.registerForm.value.rePassword.length < 6)) {
      // console.log('You are to be returned!'); // For DEBUGGING
      
      window.location.href = 'https:/www.sina.com.cn';
    
      //this.router.navigate(['https://www.sina.com.cn/']);
      return // to prevent the user from hacking the HTML
    };

    const email = this.registerForm.value.username;
    const password = this.registerForm.value.password;

    if (this.registerForm.value.password != this.registerForm.value.rePassword) {
      this.error = 'Passwords should match!';
      this.registerForm.reset();
      return
    }

    this.isLoading = true;
    this.authService.register(email, password).subscribe(
      responseData => {
        // console.log(responseData); // For DEBUGGING
        this.isLoading = false;
        this.router.navigate(['/blogs']);
      },
      errorMessage => {
        //console.log(errorMessage); // For DEBUGGING
        this.error = errorMessage;
        this.isLoading = false;

      }
    );

    this.registerForm.reset();
    //this.registerForm.reset();

    // this.router.navigate(['/home']); // For different redirection.

  }


  onHandleError() {
    this.error = null;
  }

}
