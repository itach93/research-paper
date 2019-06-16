import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  errorMsg = '';
  hasError = false;

  constructor(public authService: AuthService, private router: Router, private alertify: AlertifyService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  login() {
    this.spinner.show();
    this.authService.login(this.model).subscribe(next => {
      console.log(next);
      this.alertify.success('Logged is successfully');
      this.router.navigate(['/']);
    }, error => {
      this.hasError = true;
      this.errorMsg = error;
      this.alertify.error(error);
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
  }
  // login() {
  //   console.log(this.model);
  // }

}
