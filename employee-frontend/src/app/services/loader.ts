import { Service, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Loader {

    private loadingsubject = new BehaviorSubject<boolean>(false);

    loading$ = this.loadingsubject.asObservable();

    show() {
        console.log("Loader ON");
        this.loadingsubject.next(true);
    }

    hide() {
         console.log("Loader OFF");
        this.loadingsubject.next(false);
    }
}
