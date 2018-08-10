import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './_models';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { AuthenticationService, UserService } from './_services';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  returnUrl: string;
  title = 'FISAS Portfolio';
  user: User;
  color = 'primary';
  switch_checked = false;
  switch_disabled = false;
  switch_label_position: string;
  isAuthenticated = false;


  constructor(
    private router: Router,
    public dialog: MatDialog, private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    /* this.http.get<User>('http://localhost:8200/auth').subscribe(data => {
      console.log(data);
      this.user = data;
    }); */

    const current_user = JSON.parse(localStorage.getItem('currentUser'));

    if (current_user) {
      // logged in so return true
      this.user = current_user.user;
      this.isAuthenticated = true;
    }

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  goToUploadForm () {
    this.router.navigate(['add-a-project']);
  }

  openLoginModal() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '50%',
      /// height: '50%',
      disableClose: true,
      data: {user: this.user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The login dialog was closed', result);
      if (result) {
        this.user = result;
        this.isAuthenticated = true;
      }

    });
  }

  onLogout() {
    this.authenticationService.logout();
    location.reload();
    this.router.navigate([this.returnUrl]);
  }

}