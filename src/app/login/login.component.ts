import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {AlertService, AuthenticationService } from '../_services';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  //added vars
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
      ) { }

      ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });

        // reset login status
        this.authenticationService.logout();
// get return url from route parameters or default to '/'
this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // Getter for easy access to form fields
    get formFieldsGetter() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
console.log("onSubmit executing...")
        // stop here if form is invalid
        if (this.loginForm.invalid) {
          console.log("Submission failed!")
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.formFieldsGetter.username.value, this.formFieldsGetter.password.value)
            .pipe(first())
            .subscribe(
                data => {
                  this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    console.log("Unable to login!")
                    this.loading = false;
                });
    console.log("Return object created by Angular is below as FormGroup");
    console.log( this.loginForm);
  }



  onClearPosts() {
    // Send Http request
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post(
        'http://192.168.1.247:8080/Project1/user/verify',
        postData
      )
      .subscribe(responseData => {
        console.log("The following is response data")
        console.log(responseData);
      });
  }

  
}
