import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, take } from 'rxjs';
import { PatientUser } from './modules/auth/models';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private tokenSubject$: BehaviorSubject<string | null>;
    private session!: string;
    public token$!: Observable<any>;
    private sessionStatusSubject: BehaviorSubject<string>;
    private userModules: BehaviorSubject<Array<string>>;
    public decodedToken!: PatientUser | null;

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
            this.decodedToken = this.decodeToken();
        } else {
            this.sessionStatusSubject = new BehaviorSubject('inactive');
            this.userModules = new BehaviorSubject<string[]>([]);
        }
    }

    public getToken() {
        const codedToken = localStorage.getItem('token');
        if (codedToken) {
            return codedToken;
        }
        return null;
    }

    public decodeToken() {
        const codedToken = this.getToken();
        if (codedToken) {
            try {
                return jwtDecode(codedToken) as PatientUser;
            } catch (error) {
                console.log('Invalid token:', error);
            }
        }
        return null;
    }

    private setSession(user: string) {
        this.session = user;
    }

    private getUserModules(): string[] {
        return this.decodedToken?.role?.modules
            ? this.decodedToken.role.modules.map((module) => module.name)
            : [];
    }

    getUserPermissions(moduleName: string) {
        const module = this.decodedToken?.role?.modules?.find(m => m.name === moduleName);
        return module?.permissions ?? [];
    }
}
