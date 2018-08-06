import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private apiUrl = 'http://localhost:8200/api/';

    constructor(private http: HttpClient) { }


    login(email: string, password: string) {
        return this.http.post<any>(this.apiUrl + 'login', { email: email, password: password })
            .pipe(map((res: any) => {
                // login successful if there's a jwt token in the response
                console.log(res);

                if (res && res.access_token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ email, token: res.access_token, user: res.user }));
                }

                return res;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        this.http.get<any>(this.apiUrl + 'logout').subscribe((data) => {
            console.table(data);
        });
        localStorage.removeItem('currentUser');
    }
}
