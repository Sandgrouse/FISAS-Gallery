import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';
import { first } from 'rxjs/operators';
import { PasswordValidation } from './password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  isSuccessful = false;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService, public dialogRef: MatDialogRef<RegisterComponent>,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword // your validation method
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.isSuccessful = false;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;

    this.authenticationService.register(this.f.name.value, this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          // this.router.navigate([this.returnUrl]);
          this.user = data.user;
          this.loading = false;
          this.isSuccessful = true;
          setTimeout(this.closeModal(), 1000);
        },
        error => {
          this.error = error;
          this.loading = false;
          console.log(error);
        }
    );
  }

  closeModal(): void {
    this.dialogRef.close();
    this.registerForm.reset();
  }

}
