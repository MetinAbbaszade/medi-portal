import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SideNavService {
    public state: Observable<string>;
    private _state = new Subject<string>();

    constructor() {
        this.state = this._state.asObservable()
    }

    close() {
        this._state.next('close');
    }

    open() {
        this._state.next('open');
    }

}