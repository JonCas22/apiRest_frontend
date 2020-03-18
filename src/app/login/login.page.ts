import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private alertService: AlertService, 
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  
  }
  
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    
    console.log(this.loginForm.value.username);
    console.log(this.loginForm.value.password);

    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
        .pipe(first())
        .subscribe(
            data => {
              console.log(data);
              
              this.router.navigate(["/home"]);
            },
            error => {
                this.error = error;
                this.loading = false;
    });
}

}
