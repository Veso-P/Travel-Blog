import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup ({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'rePassword': new FormControl(null, Validators.required)
    }) 
  }

  onRegister() {
    console.log('You are about to REGISTER!');
    console.log(this.registerForm)
   
      // this.router.navigate(['/home']);
    
  }

}
