import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ControlContainer, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  forbiddenUsernames = ['Veso', 'Pesho'];
  currentUsername = ''

  constructor(private router: Router, private authService: AuthService, formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup ({
      'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this), Validators.minLength(6) ]), //  
      'password': new FormControl(null, [Validators.required, Validators.minLength(6) ])      
    }) ;

    this.loginForm.valueChanges.subscribe (
      (value)=> {this.currentUsername = value}
    )
  }

  onLogin() {
    console.log('You are about to login!');
    console.log(this.loginForm);
    this.loginForm.reset();


    // this.authService.login();

    // setTimeout(() => {
    //   this.router.navigate(['/home']);
    // }, 3000);
  }

  // usernameLength():{[s: string]: boolean} {
  //   if (this.currentUsername.length <5){
  //     //console.log(control.value)
  //     return {'usernameLengthIsInvalid' : true} 
  //   }
  //   //return null;
  // }

  forbiddenNames (control: FormControl) : {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true}
    }
  }
}
