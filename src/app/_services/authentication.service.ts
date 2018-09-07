import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { User } from '../_models';
import { api_base } from '../constants';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private apiUrl = api_base;

    constructor(private http: HttpClient) { }

    getToken(): string {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        return user.token;
    }

    setToken(token: string, email: string, res): void {
        localStorage.setItem('currentUser', JSON.stringify({ email, token: res.access_token, user: res.user }));
    }

    register (name: string, email: string, password: string) {
        return this.http.post<any>(this.apiUrl + 'register', { name: name, email: email, password: password })
        .pipe(map((res: any) => {
            // login successful if there's a jwt token in the response
            console.log(res);

            if (res && res.access_token) {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                // this.setToken(res.access_token, email, res);
            }

            return res;
        }));
    }


    login(email: string, password: string) {
        return this.http.post<any>(this.apiUrl + 'login', { email: email, password: password })
        .pipe(map((res: any) => {
            // login successful if there's a jwt token in the response
            console.log(res);

            if (res && res.access_token) {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                this.setToken(res.access_token, email, res);
            }

            return res;
        }));
    }

    logout() {
        // remove user from local storage to log user out
        this.http.get<any>(this.apiUrl + 'logout').subscribe((data) => {
            console.log(data);
        });
        localStorage.removeItem('currentUser');
    }
}
