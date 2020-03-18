import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { UserServiceService } from '../services/user-service.service';
import { User } from '../models/user';

//import { MustMatch } from './_helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;


  
  constructor(private formBuilder: FormBuilder, private router: Router, private alertService: AlertService, private userService:UserServiceService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$")]],
      //confirmPassword: ['', Validators.required]
    }/*,{
      validator: MustMatch('password', 'confirmPassword')
    }*/);
  }

      // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    //this.loading = true;
    console.log(this.registerForm.value);
    var user:User = {firstname: this.registerForm.value.firstName, lastname: this.registerForm.value.lastName, username: this.registerForm.value.username, 
      password: this.registerForm.value.password, rol: "default"};
    console.log(user);
    
    this.userService.addItem(user).subscribe(()=>{
      this.router.navigate(["/login"]);
    });
    
  }
}
