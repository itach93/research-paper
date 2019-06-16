import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwHelper = new JwtHelperService();
  apiUrl = environment.apiUrl;

  constructor(public router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwHelper.decodeToken(token);
      if (this.authService.decodedToken.user_image !== null) {
        this.authService.changeUserImage(this.apiUrl + this.authService.decodedToken.user_image);
      } else {
        this.authService.changeUserImage('../assets/user.png');
      }
    }
  }
}
