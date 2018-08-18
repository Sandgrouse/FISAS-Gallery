import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    openDialog(): any {
        console.log('Session has ended, please sign in again');
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            const isExpired = this.isTokenExpired(currentUser.token);
            if (!isExpired) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser.token}`
                    }
                });
            } else {
                this.openDialog();
            }
        }

        return next.handle(request);
    }

    getToken () {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser.token;
    }

    private getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);
        if (decoded.exp === undefined) {return null; }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        console.log(date);
        return date;
    }

    private isTokenExpired(token?: string): boolean {
        if (!token) {token = this.getToken(); }
        if (!token) {return true; }

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) {return false; }
        const answer = !(date.valueOf() > new Date().valueOf());
        console.log(answer);
        return !(date.valueOf() > new Date().valueOf());
    }
}
