import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, UserService } from '../_services';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from '../_models/user';


interface LoginData {
    isAuthenticated: boolean;
}



@Component({templateUrl: 'login.component.html', styleUrls: ['./login.component.css']})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    isAuthenticated = false;
    user: User;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router, private userService: UserService,
        private authenticationService: AuthenticationService, public dialogRef: MatDialogRef<LoginComponent>,
        @Inject(MAT_DIALOG_DATA) public data: LoginData) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        if (localStorage.getItem('currentUser')) {
            this.authenticationService.logout();

        }

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        this.authenticationService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    // this.router.navigate([this.returnUrl]);
                    this.user = data.user;
                    this.loading = false;
                    this.isAuthenticated = true;
                    setTimeout(this.dialogRef.close(this.user), 1000);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                    console.log(error);
                });
    }

    closeModal(): void {
        this.dialogRef.close();
        this.loginForm.reset();

    }
}
