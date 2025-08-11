import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PatientUser } from './modules/auth/models';

interface Session {
    exp: number;
    user: PatientUser
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private tokenSubject$: BehaviorSubject<string | null>;
    private session!: Session;
    private sessionStatusSubject: BehaviorSubject<string>;
    private userModules: BehaviorSubject<Array<string>>;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
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

    private setSession(session: Session) {
        this.session = session
    }

    private getUserModules(): string[] {
        return this.session?.user?.role?.modules
            ? this.session.user.role.modules.map((module) => module.name)
            : [];
    }
}