import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  keywords = [];
  // isOptional = true;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [''],
      username: [''],
      email: [''],
      firstname: [''],
      lastname: [''],
      phone: [''],
      address: [''],
      country: [''],
      city: [''],
      zip: [''],
      institute: [''],
      department: [''],
    });
    this.secondFormGroup = this._formBuilder.group({
      title: [''],
      coauthor: [''],
      abstract: [''],
      keywords: [''],
    });
  }

  addKeyword(event) {
    this.keywords.push(event.target.value);
  }

}
