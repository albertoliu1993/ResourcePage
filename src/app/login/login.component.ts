import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {AlertService, AuthenticationService } from '../_services';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GetRequestService } from '../service/get-request.service';



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
  arr: Array<string> = [];
  result : string;

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private verify: GetRequestService,
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

console.log(this.loginForm.get('username').value);
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
                  // this.router.navigate([['/resourcepage']]);
                  console.log(data);
                },
                error => {
                    this.alertService.error(error);
                    console.log("Unable to login!")
                    this.loading = false;
                });
                // this.arr.push(this.loginForm.get('username').value,this.loginForm.get('password').value);
    console.log("Return object created by Angular is below as FormGroup");

    
  }



  onClearPosts() {
    // Send Http request
  }

  // onCreatePost(postData: { title: string; content: string[] }) {
  //   // Send Http request
  //   this.http
  //     .post(
  //       'http://192.168.1.247:8080/Project1/user/verify',
  //       postData
  //     )
  //     .subscribe(responseData => {
  //       console.log("The following is response data")
  //       console.log(responseData);
  //     });
  // }

  
  onCreatePost() : void {
    this.arr.push(this.loginForm.get('username').value,this.loginForm.get('password').value);
    this.verify.verifyLogin(this.arr).subscribe (res => {
       this.result = res; 
       if(res == "true") {
        this.router.navigate(['/resourcepage'])
    }
      else{
      console.log("it's wrong")
    }

    })


  }

  



  

  
}
