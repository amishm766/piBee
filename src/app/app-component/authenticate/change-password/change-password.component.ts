import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  subscriptions = new SubSink();
  changePasswordFormData = {
    user : {
      id : +localStorage.getItem('user'),
      oldPassword : '',
      password : ''
    }
  }

  constructor(private _auth : AuthService, private _route : Router) { }

  ngOnInit(): void {
  }

  confirmUser() {
    let loginFormData = {
      "user" : {
        "username" : localStorage.getItem('username'),
        "password" : this.changePasswordFormData.user.oldPassword,
        "email" : 'amishm7@gmail.com'
      }
    }
    this.subscriptions.sink = this._auth.LogIn(loginFormData)
    .subscribe(
      logInResponse => {
        console.log(logInResponse)
       this.changePassword()
       alert("Check your email to reactivate account with this password")
      },

      logInError => {
        console.log(logInError)
        alert(logInError.error.error)
      },

      () => {console.log("Logged In Successfully")}
    )
  }

  changePassword() {
    this.subscriptions.sink = this._auth.EditUserDetails(this.changePasswordFormData)
    .subscribe(
      editUserDetailsResponse => {
        console.log(editUserDetailsResponse);
        this._route.navigate(['']);
      },

      editUserDetailsError => {
        console.log(editUserDetailsError);
        alert(editUserDetailsError.error);
      },

      () => {
        console.log("Sign up Successful");
      }
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
