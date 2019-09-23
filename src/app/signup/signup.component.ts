import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService, AlertService } from '../_services';
import { first } from 'rxjs/operators';
import { CustomValidators } from '../customValidators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading= false;
  submitted=false;
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    ) { }

  

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      signupEmail: ['', Validators.required],
      signupPassword: ['', Validators.compose([
        Validators.required,
        // check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, {
          hasNumber: true
        }),
        // check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, {
          hasCapitalCase: true
        }),
        // check whether the entered password has a lower case letter
        CustomValidators.patternValidator(/[a-z]/, {
          hasSmallCase: true
        }),
        // check whether the entered password has a special character
        CustomValidators.patternValidator(
          /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
          {
            hasSpecialCharacters: true
          }
        ),
        Validators.minLength(6)
      ])
    ],

   confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );
  }

  // Getter for easy access to form fields
  get formFieldsGetter() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log("onSubmit executing...")
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      console.log("Submission failed!")
      return;
      
  }

  this.loading = true;
  this.userService.register(this.signupForm.value)
      .pipe(first())
      .subscribe(
          data => {
              this.alertService.success('Registration successful', true);
              this.router.navigate(['/login']);
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
              console.log("Return object created by Angular is below as FormGroup");
              console.log(this.signupForm);
          });

    
    this.signupForm.reset();
    
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
        resolve({'emailIsForbidden': true});
        } else{
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post(
        'https://post-request.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(){
    this.http.get('https://post-request.firebaseio.com/posts.json')
    .subscribe(posts => {
      console.log(posts);
    });    
  }

}
