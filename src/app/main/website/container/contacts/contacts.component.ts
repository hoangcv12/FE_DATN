import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styles: [
  ]
})
export class ContactsComponent implements OnInit {

  constructor(fb: FormBuilder) {
    this.form = fb.group(
      {
        mail: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirm: [null, [Validators.required, Validators.minLength(6)]],
        captcha: [null, [Validators.required]],
        fullname: [null, [Validators.required]],
        username: [null, [Validators.required]]
      }
    )
  }
  form: FormGroup;


  ngOnInit(): void {

  }

}
