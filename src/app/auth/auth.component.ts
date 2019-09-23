// import { Component } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Observable } from 'rxjs';
// import { AuthenticationService } from '../_services';
// import { AuthResponseData } from './auth.service';

// // import { AuthService, AuthResponseData } from './auth.service';

// @Component({
//   selector: 'app-auth',
//   templateUrl: './auth.component.html'
// })
// export class AuthComponent {
//   isLoginMode = true;
//   isLoading = false;
//   error: string = null;

//   constructor(private authService: AuthenticationService) {}

//   onSwitchMode() {
//     this.isLoginMode = !this.isLoginMode;
//   }

//   onSubmit(form: NgForm) {
//     if (!form.valid) {
//       return;
//     }
//     const username = form.value.username;
//     const password = form.value.password;

//     let authObs: Observable<AuthResponseData>;

//     this.isLoading = true;

//     if (this.isLoginMode) {
//       authObs = this.authService.login(username, password);
//     } else {
//       authObs = this.authService.signup(username, password);
//     }

//     authObs.subscribe(
//       resData => {
//         console.log(resData);
//         this.isLoading = false;
//       },
//       errorMessage => {
//         console.log(errorMessage);
//         this.error = errorMessage;
//         this.isLoading = false;
//       }
//     );

//     form.reset();
//   }
// }
