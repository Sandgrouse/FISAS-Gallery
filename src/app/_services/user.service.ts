import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    private _currentUser: User;
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>('/api/users');
    }

    getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        return user;
    }

/*     get current_user () {
        return this._currentUser;
    }
    set current_user (user) {
        this._currentUser = user;
    } */
}
