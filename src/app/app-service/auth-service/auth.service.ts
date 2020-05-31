import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IProfile } from 'src/app/app-interface/Profile';
import { IToken } from 'src/app/app-interface/Token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'https://pibeedjango.herokuapp.com/api/';

  constructor(private _http: HttpClient) {}

  Register(userData): Observable<IToken> {
    return this._http
      .post<IToken>(this.baseUrl + 'register/', userData)
      .pipe(catchError(this.errorHandler));
  }

  EditUserDetails(userData): Observable<IToken> {
    return this._http
      .patch<IToken>(this.baseUrl + 'register/', userData)
      .pipe(catchError(this.errorHandler));
  }

  LogIn(loginData): Observable<IToken> {
    return this._http
      .post<IToken>(this.baseUrl + 'login/', loginData)
      .pipe(catchError(this.errorHandler));
  }

  LogOut(): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:
          'Token ' + JSON.parse(sessionStorage.getItem('userToken')).key,
      }),
    };
    return this._http
      .post<boolean>(this.baseUrl + 'logout/', '', httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  EditProfile(profileData): Observable<IProfile> {
    return this._http
      .patch<IProfile>(this.baseUrl + 'profile/', profileData)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.error || 'Server Error');
  }
}
