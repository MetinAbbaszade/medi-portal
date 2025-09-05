import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, take } from 'rxjs';
import { PatientUser } from './modules/auth/models';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private tokenSubject$: BehaviorSubject<PatientUser | null>;
    private session!: PatientUser;
    public token$!: Observable<any>;
    private sessionStatusSubject: BehaviorSubject<string>;
    private userModules: BehaviorSubject<Array<string>>;

    constructor() {
        const token = this.getToken();
        this.tokenSubject$ = new BehaviorSubject(token);
        this.token$ = this.tokenSubject$.pipe(
            filter((token) => token !== null),
            take(1)
        )

        if (token) {
            this.setSession(token);
            this.sessionStatusSubject = new BehaviorSubject('active');
            this.userModules = new BehaviorSubject(this.getUserModules());
        } else {
            this.sessionStatusSubject = new BehaviorSubject('inactive');
            this.userModules = new BehaviorSubject<string[]>([]);
        }
    }

    public getToken() {
        const codedToken = localStorage.getItem('token');
        if (codedToken) {
            try {
                return jwtDecode(codedToken) as PatientUser;
            } catch (error) {
                console.log('Invalid token:', error);
            }
        }
        return null;
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
        const module = this.session?.role?.modules?.find(m => m.name === moduleName);
        return module?.permissions ?? [];
    }
}
