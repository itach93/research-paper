import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  baseUrl = environment.apiUrl;
  file: File = null;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>; // To make attributes of BsDatepickerConfig class optionals
  errorMsg = '';
  hasError = false;

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService,
              private fb: FormBuilder, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    // this.model.role_id = 1;
    this.bsConfig = {
      containerClass: 'theme-default'
    },
      this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['M'],
      username: ['', Validators.required],
      email: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      dbirth: [null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required],
      user_image: [null]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
  }

  fileChange(event) {
    console.log(event);
  }


  onFileChanged(event) {
    this.file = event.target.files[0] as File;
    // this.model.user_image = this.file;
    console.log(this.file);
  }

  register() {
    const roleId = '1';
    if (this.registerForm.valid) {
      this.spinner.show();
      if (this.registerForm.get('user_image').value === null) {
        this.user = Object.assign({}, this.registerForm.value);
        this.authService.register(this.user).subscribe(() => {
          this.alertify.success('Registration successful');
        }, error => {
          this.hasError = true;
          this.errorMsg = error;
          this.alertify.error(error);
          this.spinner.hide();
        }, () => {
          this.spinner.hide();
          this.authService.login(this.user).subscribe(() => {
            this.authService.changeUserImage('../../../assets/user.png');
            this.router.navigate(['/']);
          });
        });
      } else {
        const fd = new FormData();
        fd.append('user_image', this.file, this.file.name);
        fd.append('gender', this.registerForm.get('gender').value);
        fd.append('username', this.registerForm.get('username').value);
        fd.append('password', this.registerForm.get('password').value);
        fd.append('email', this.registerForm.get('email').value);
        fd.append('firstname', this.registerForm.get('firstname').value);
        fd.append('lastname', this.registerForm.get('lastname').value);
        fd.append('dbirth', this.registerForm.get('dbirth').value);
        fd.append('role_id', roleId);

        this.authService.register(fd).subscribe(() => {
          this.alertify.success('Registration successful');
        }, error => {
          this.hasError = true;
          this.errorMsg = error;
          this.alertify.error(error);
          this.spinner.hide();
        }, () => {
          this.spinner.hide();
          const tmpUser: any = {};
          tmpUser.username = fd.get('username');
          tmpUser.password = fd.get('password');
          // this.user = Object.assign({username, password}, fd.get('username'), fd.get('password'));
          this.authService.login(tmpUser).subscribe(() => {
            this.router.navigate(['/']);
          });
        });
      }
    } else {
      // this.hasError = true;
      // this.errorMsg = 'Please fill in all required fields marked with an asterisk (*)';
      this.validateAllFormFields(this.registerForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
