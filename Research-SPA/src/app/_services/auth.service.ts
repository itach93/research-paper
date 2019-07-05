import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  jwHelper = new JwtHelperService();
  decodedToken: any;
  userImage = new BehaviorSubject<string>('../../assets/user.png');
  currentUserImage = this.userImage.asObservable();

  constructor(private http: HttpClient) { }

  changeUserImage(userimage: string) {
    this.userImage.next(userimage);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'auth/login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.meta);
          this.decodedToken = this.jwHelper.decodeToken(user.meta);
          // debugger;
          if (this.decodedToken.user_image !== null) {
            this.changeUserImage(this.baseUrl + this.decodedToken.user_image);
          } else {
            this.changeUserImage('../../assets/user.png');
          }
        }
      })
    );
  }

  register(user) {
    return this.http.post(this.baseUrl + 'auth/register', user);
  }

  update(id, user) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwHelper.isTokenExpired(token);
  }

}
