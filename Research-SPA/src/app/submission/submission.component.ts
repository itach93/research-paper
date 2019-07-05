import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { Paper } from '../_models/paper';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { PaperService } from '../_services/paper.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  jwHelper = new JwtHelperService();
  keywords = [];
  phon: any;
  titles = ['', 'Mr', 'Mrs', 'Dr', 'Phd', 'Prof'];
  departments = ['', 'Computer Science', 'Management', 'Theology'];
  currentUser: User;
  paper: Paper;
  phoneObject: any;
  userChange: User;
  areas: any;
  file: File = null;
  countries = { "BD": "Bangladesh", "BE": "Belgium", "BF": "Burkina Faso", "BG": "Bulgaria", "BA": "Bosnia and Herzegovina", "BB": "Barbados", "WF": "Wallis and Futuna", "BL": "Saint Barthelemy", "BM": "Bermuda", "BN": "Brunei", "BO": "Bolivia", "BH": "Bahrain", "BI": "Burundi", "BJ": "Benin", "BT": "Bhutan", "JM": "Jamaica", "BV": "Bouvet Island", "BW": "Botswana", "WS": "Samoa", "BQ": "Bonaire, Saint Eustatius and Saba ", "BR": "Brazil", "BS": "Bahamas", "JE": "Jersey", "BY": "Belarus", "BZ": "Belize", "RU": "Russia", "RW": "Rwanda", "RS": "Serbia", "TL": "East Timor", "RE": "Reunion", "TM": "Turkmenistan", "TJ": "Tajikistan", "RO": "Romania", "TK": "Tokelau", "GW": "Guinea-Bissau", "GU": "Guam", "GT": "Guatemala", "GS": "South Georgia and the South Sandwich Islands", "GR": "Greece", "GQ": "Equatorial Guinea", "GP": "Guadeloupe", "JP": "Japan", "GY": "Guyana", "GG": "Guernsey", "GF": "French Guiana", "GE": "Georgia", "GD": "Grenada", "GB": "United Kingdom", "GA": "Gabon", "SV": "El Salvador", "GN": "Guinea", "GM": "Gambia", "GL": "Greenland", "GI": "Gibraltar", "GH": "Ghana", "OM": "Oman", "TN": "Tunisia", "JO": "Jordan", "HR": "Croatia", "HT": "Haiti", "HU": "Hungary", "HK": "Hong Kong", "HN": "Honduras", "HM": "Heard Island and McDonald Islands", "VE": "Venezuela", "PR": "Puerto Rico", "PS": "Palestinian Territory", "PW": "Palau", "PT": "Portugal", "SJ": "Svalbard and Jan Mayen", "PY": "Paraguay", "IQ": "Iraq", "PA": "Panama", "PF": "French Polynesia", "PG": "Papua New Guinea", "PE": "Peru", "PK": "Pakistan", "PH": "Philippines", "PN": "Pitcairn", "PL": "Poland", "PM": "Saint Pierre and Miquelon", "ZM": "Zambia", "EH": "Western Sahara", "EE": "Estonia", "EG": "Egypt", "ZA": "South Africa", "EC": "Ecuador", "IT": "Italy", "VN": "Vietnam", "SB": "Solomon Islands", "ET": "Ethiopia", "SO": "Somalia", "ZW": "Zimbabwe", "SA": "Saudi Arabia", "ES": "Spain", "ER": "Eritrea", "ME": "Montenegro", "MD": "Moldova", "MG": "Madagascar", "MF": "Saint Martin", "MA": "Morocco", "MC": "Monaco", "UZ": "Uzbekistan", "MM": "Myanmar", "ML": "Mali", "MO": "Macao", "MN": "Mongolia", "MH": "Marshall Islands", "MK": "Macedonia", "MU": "Mauritius", "MT": "Malta", "MW": "Malawi", "MV": "Maldives", "MQ": "Martinique", "MP": "Northern Mariana Islands", "MS": "Montserrat", "MR": "Mauritania", "IM": "Isle of Man", "UG": "Uganda", "TZ": "Tanzania", "MY": "Malaysia", "MX": "Mexico", "IL": "Israel", "FR": "France", "IO": "British Indian Ocean Territory", "SH": "Saint Helena", "FI": "Finland", "FJ": "Fiji", "FK": "Falkland Islands", "FM": "Micronesia", "FO": "Faroe Islands", "NI": "Nicaragua", "NL": "Netherlands", "NO": "Norway", "NA": "Namibia", "VU": "Vanuatu", "NC": "New Caledonia", "NE": "Niger", "NF": "Norfolk Island", "NG": "Nigeria", "NZ": "New Zealand", "NP": "Nepal", "NR": "Nauru", "NU": "Niue", "CK": "Cook Islands", "XK": "Kosovo", "CI": "Ivory Coast", "CH": "Switzerland", "CO": "Colombia", "CN": "China", "CM": "Cameroon", "CL": "Chile", "CC": "Cocos Islands", "CA": "Canada", "CG": "Republic of the Congo", "CF": "Central African Republic", "CD": "Democratic Republic of the Congo", "CZ": "Czech Republic", "CY": "Cyprus", "CX": "Christmas Island", "CR": "Costa Rica", "CW": "Curacao", "CV": "Cape Verde", "CU": "Cuba", "SZ": "Swaziland", "SY": "Syria", "SX": "Sint Maarten", "KG": "Kyrgyzstan", "KE": "Kenya", "SS": "South Sudan", "SR": "Suriname", "KI": "Kiribati", "KH": "Cambodia", "KN": "Saint Kitts and Nevis", "KM": "Comoros", "ST": "Sao Tome and Principe", "SK": "Slovakia", "KR": "South Korea", "SI": "Slovenia", "KP": "North Korea", "KW": "Kuwait", "SN": "Senegal", "SM": "San Marino", "SL": "Sierra Leone", "SC": "Seychelles", "KZ": "Kazakhstan", "KY": "Cayman Islands", "SG": "Singapore", "SE": "Sweden", "SD": "Sudan", "DO": "Dominican Republic", "DM": "Dominica", "DJ": "Djibouti", "DK": "Denmark", "VG": "British Virgin Islands", "DE": "Germany", "YE": "Yemen", "DZ": "Algeria", "US": "United States", "UY": "Uruguay", "YT": "Mayotte", "UM": "United States Minor Outlying Islands", "LB": "Lebanon", "LC": "Saint Lucia", "LA": "Laos", "TV": "Tuvalu", "TW": "Taiwan", "TT": "Trinidad and Tobago", "TR": "Turkey", "LK": "Sri Lanka", "LI": "Liechtenstein", "LV": "Latvia", "TO": "Tonga", "LT": "Lithuania", "LU": "Luxembourg", "LR": "Liberia", "LS": "Lesotho", "TH": "Thailand", "TF": "French Southern Territories", "TG": "Togo", "TD": "Chad", "TC": "Turks and Caicos Islands", "LY": "Libya", "VA": "Vatican", "VC": "Saint Vincent and the Grenadines", "AE": "United Arab Emirates", "AD": "Andorra", "AG": "Antigua and Barbuda", "AF": "Afghanistan", "AI": "Anguilla", "VI": "U.S. Virgin Islands", "IS": "Iceland", "IR": "Iran", "AM": "Armenia", "AL": "Albania", "AO": "Angola", "AQ": "Antarctica", "AS": "American Samoa", "AR": "Argentina", "AU": "Australia", "AT": "Austria", "AW": "Aruba", "IN": "India", "AX": "Aland Islands", "AZ": "Azerbaijan", "IE": "Ireland", "ID": "Indonesia", "UA": "Ukraine", "QA": "Qatar", "MZ": "Mozambique" };


  // decodedToken: any;
  // isOptional = true;

  constructor(public userService: UserService, private fb: FormBuilder, private route: ActivatedRoute,
    private alertify: AlertifyService, private paperService: PaperService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(response => {
      this.currentUser = response.user.data;
      console.log(this.currentUser);
    });

    this.route.data.subscribe(response => {
      this.areas = response.area.data;
      console.log(this.areas);
    })

    this.createFirstFormGroup(this.currentUser);
    this.createSecondFormGroup();
  }

  decodedToken(token: any) {
    return this.jwHelper.decodeToken(token);
  }

  createFirstFormGroup(user: User) {
    this.firstFormGroup = this.fb.group({
      username: [user.username, Validators.required],
      email: [user.email, Validators.required],
      title: [user.title, Validators.required],
      firstname: [user.firstname, Validators.required],
      lastname: [user.lastname, Validators.required],
      phone: [user.phone, Validators.required],
      country: [user.country],
      address: [''],
      zip: [''],
      city: [''],
      institute: [''],
      department: ['']
    });
  }

  createSecondFormGroup() {
    this.secondFormGroup = this.fb.group({
      area: [this.areas[0].name, Validators.required],
      title: ['', Validators.required],
      abstract: ['', Validators.required],
      coauthor: [''],
      keywords: ['', Validators.required],
      manuscript: ['', Validators.required]
    });
  }

  addKeyword(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (this.keywords.indexOf(event.target.value) === -1) {
        this.keywords.push(event.target.value);
        event.target.value = '';
        // event.preventDefault();
      } else {
        this.alertify.error('You have already enter this keyword');
      }
      // event.preventDefault();
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

  onFileChanged(event) {
    this.file = event.target.files[0] as File;
    console.log(this.file);
  }

  submitPaper() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      this.userChange = Object.assign({}, this.firstFormGroup.value);
      if (!!this.firstFormGroup && this.firstFormGroup.dirty) {
        this.userService.updateUser(this.currentUser.id, this.userChange).subscribe(() => {
          this.alertify.success('Update Successful');
        }, error => {
          this.alertify.error(error);
        }, () => {
          const fd = new FormData();
          const currentArea = this.areas.find(i => i.name === this.secondFormGroup.get('area'));
          fd.append('manuscript', this.file, this.file.name);
          fd.append('title', this.secondFormGroup.get('title').value);
          fd.append('abstract', this.secondFormGroup.get('abstract').value);
          fd.append('keywords', this.keywords.toString());
          fd.append('area_id', currentArea.id);
          fd.append('user_id', this.currentUser.id.toString());

          this.paperService.createPaper(fd).subscribe(() => {
            this.alertify.success('Submission successful!! Check your email to get your Submission Code')
            this.router.navigate(['/home']);
          }, error => {
            this.alertify.error(error);
          });
        })
      } else {
        const fd = new FormData();
        const currentArea = this.areas.find(i => i.name === this.secondFormGroup.get('area').value);
        fd.append('manuscript', this.file, this.file.name);
        fd.append('title', this.secondFormGroup.get('title').value);
        fd.append('abstract', this.secondFormGroup.get('abstract').value);
        fd.append('keywords', this.keywords.toString());
        fd.append('area_id', currentArea.id);
        fd.append('user_id', this.currentUser.id.toString());

        this.paperService.createPaper(fd).subscribe(() => {
          this.alertify.success('Submission successful!! Check your email to get your Submission Code')
          this.router.navigate(['/home']);
        }, error => {
          this.alertify.error(error);
        });
      }
    } else {
      this.alertify.error('Your forms are not filled well')
    }
  }

  removeKeywords(keyword) {
    this.keywords.splice(this.keywords.indexOf(keyword), 1);
  }

}
