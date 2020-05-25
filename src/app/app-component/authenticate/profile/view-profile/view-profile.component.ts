import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { IProfile } from 'src/app/app-interface/Profile';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit, OnDestroy {

  subscriptions = new SubSink();
  profileData : IProfile = {
    "user" : 0,
    "bio" : "",
    "location" : "",
    "birth_date" : "",
    "email_confirmed" : "",
    "image" : '' 
  }

  constructor(private _auth : AuthService) { }

  ngOnInit(): void {
    this.profileData.user = +localStorage.getItem('user')
    this.viewProfile()
  }

  viewProfile() {
    this.subscriptions.sink = this._auth.GetUserProfile(+localStorage.getItem('user'))
    .subscribe(
      getUserProfileResponse => {
        console.log(getUserProfileResponse)
        this.profileData = getUserProfileResponse;
      },

      getUserProfileError => {
        console.log(getUserProfileError)
      },

      () => {console.log("Fetched profile data Successfully")}
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
