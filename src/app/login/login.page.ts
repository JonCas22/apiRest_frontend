import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import { MessageService, Message } from 'primeng/api';

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
  msgs: Message[] = [];
  
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private alertService: AlertService, 
    private authenticationService: AuthenticationService, private messageService: MessageService) { 
      this.loading = false;
    }

  ionViewWillEnter(){
    this.ngOnInit();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loading = false;
  
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
    
    console.log(this.loginForm.value);

    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {            
              this.router.navigate(["/"]);
            },
            error => {
              console.log(error);
              this.msgs = [];
              this.msgs.push({severity:'error', summary:'Error', detail:'Login failed'});
              this.error = error;
              this.loading = false;
    });


}

}
