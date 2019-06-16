import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  apiUrl = environment.apiUrl;
  jwHelper = new JwtHelperService();
  user_image: string;
  default_image: string = '../../assets/user.png';

  constructor(private alertify: AlertifyService, public authService: AuthService, private sanitization: DomSanitizer) { }

  ngOnInit() {
    // this.user_image = this.getUserImage();
    this.authService.currentUserImage.subscribe(userImage => this.user_image = userImage);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  // getUserImage() {
  //   if (this.authService.loggedIn()) {
  //     const token = localStorage.getItem('token');
  //     let decodedToken = this.jwHelper.decodeToken(token);
  //     console.log(decodedToken);
  //     let image_path = (this.apiUrl + decodedToken.user_image);
  //     console.log(image_path);
  //     return image_path;
  //   }
  // }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
  }

}
