import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PatientUser } from './modules/auth/models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private tokenSubject$: BehaviorSubject<string | null>;
    private session!: PatientUser;
    private sessionStatusSubject: BehaviorSubject<string>;
    private userModules: BehaviorSubject<Array<string>>;

    constructor() {
        const token = this.getToken()
        this.tokenSubject$ = new BehaviorSubject(token)

        if (token) {
            this.setSession(JSON.parse(token))
            this.sessionStatusSubject = new BehaviorSubject('active');
            this.userModules = new BehaviorSubject(this.getUserModules());
        } else {
            this.sessionStatusSubject = new BehaviorSubject('inactive');
            this.userModules = new BehaviorSubject<string[]>([]);
        }
    }


    private getToken() {
        return localStorage.getItem('token')
    }

    private setSession(user: PatientUser) {
        this.session = user;
    }

    private getUserModules(): string[] {
        return this.session?.role?.modules
            ? this.session.role.modules.map((module) => module.name)
            : [];
    }

    getUserPermissions(moduleName: string) {
        return this.session.role?.modules ?
            this.session.role?.modules.find(m => m.name === moduleName) : []
    }
}