import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';

@Injectable()
export class ScoreService {

	private score: BehaviorSubject<number> = new BehaviorSubject(0);
	get score$(): Observable<number> {
		return this.score.asObservable();
	}

	constructor() { }

	win() {
		this.score.next(this.score.value + 1);
	}

	lose() {
		this.score.next(0);
	}
}
