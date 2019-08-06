import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';

export const PROFILE_ERRORS = {
  name: {
    pattern: 'El nombre debe ser solo letras',
    required: 'El nombre es requirido',
  },
  birthday: {
    required: 'La fecha de nacimiento es requirida',
    pattern: 'La fecha debe tener el formato dd/mm/yyyy',
  }
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('[A-Za-z ]*')])],
      lastname: [''],
      birthday: ['', Validators.compose([Validators.required, Validators.pattern('[0-3][0-9]/[0-1][0-9]/[1-9][0-9][0-9][0-9]')])],
      country: ['', Validators.compose([Validators.required])],
      image: ['', Validators.compose([Validators.required])],
      genre: ['', Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    console.warn(this.form.value);
  }

  onCancel() {
    this.form.reset();
  }

  getErrorMessage(control: string): string {
    const controlErrors = this.form.get(control).errors;
    let errorMessage = '';
    if (controlErrors) {
      const errorKey = Object.keys(controlErrors)[0];
      errorMessage = PROFILE_ERRORS[control][errorKey];
    }
    return errorMessage;
  }
}
