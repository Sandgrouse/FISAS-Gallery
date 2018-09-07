import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    private _currentUser: User;
    constructor(private http: HttpClient) { }


    getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        if (user) {
            this._currentUser = JSON.parse(user);
        }
        return this._currentUser;
    }


}
