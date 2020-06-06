import { SubSink } from 'subsink';
import { IUser } from 'src/app/app-interface/User';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { DataService } from 'src/app/app-service/data-service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  userData: IUser = {
    id: 0,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };
  usersArray: IUser[];
  subscriptions = new SubSink();
  constructor(
    private _auth: AuthService,
    private _data: DataService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.subscriptions.sink = this._data.GetAllUsers().subscribe(
      (getAllUsersResponse) => {
        console.log(getAllUsersResponse);
        this.usersArray = getAllUsersResponse;
      },

      (getAllUsersError) => {
        console.log(getAllUsersError);
      },

      () => {
        console.log('All Users fetched successfully');
      }
    );
  }

  signUp() {
    this.subscriptions.sink = this._auth.Register(this.userData).subscribe(
      (signUpResponse) => {
        localStorage.setItem('Token', signUpResponse.key);
        localStorage.setItem('user', signUpResponse.user.toString());
        console.log(signUpResponse);
        alert('Hit the link sent to your email to activate acount');
      },
      (signUpError) => {
        console.log(signUpError);
        alert(signUpError.error);
      },
      () => {
        console.log('Sign up Successful');
        this._route.navigate(['login']);
      }
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}