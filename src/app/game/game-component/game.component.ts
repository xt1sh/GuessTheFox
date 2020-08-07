import { Component, OnInit, HostListener, ComponentFactoryResolver, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { WikipediaService } from '../services/wikipedia.service';
import { Question } from '../models/question';
import { UtilsService } from '../../shared/services/utils.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import * as Hammer from 'hammerjs';
import { HammerModule } from '@angular/platform-browser';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

	private _quizArea: ElementRef;
	@ViewChild('quizArea', { static: false })
	set quizArea(el: ElementRef) {
		this._quizArea = el?.nativeElement;
	}
	get quizArea(): ElementRef {
		return this._quizArea
	}

	@ViewChild('overlay')
	set overlay(el: ElementRef) {
		if (el && !this.isOverlayLoaded) {
			this.isOverlayLoaded = true;
			var mc = new Hammer.Manager(el.nativeElement, {
				recognizers: [
					[Hammer.Rotate],
					[Hammer.Pinch, { enable: false }, ['rotate']],
					[Hammer.Swipe,{ direction: Hammer.DIRECTION_ALL }],
				]
			});
			mc.set({ enable: true });
			mc.on("swipeup", (e) => this.onSwipeUp(e));
			mc.on("swipedown", (e) => this.onSwipeDown(e));
		}
	}

	isOverlayLoaded: boolean;

	question: Question;
	nextQuestion: Question;
	isMobile: boolean;
	showQuiz: BehaviorSubject<boolean>;

	constructor(private wiki: WikipediaService,
		private utils: UtilsService ) { }

  ngOnInit() {
		this.showQuiz = new BehaviorSubject<boolean>(false);
		this.isOverlayLoaded = false;
		let questionObs = this.getNewQuestion().subscribe(
			quest => this.question = quest,
			null,
			() => questionObs.unsubscribe()
		);
		let nextQuestionObs = this.getNewQuestion().subscribe(
			quest => this.nextQuestion = quest,
			null,
			() => nextQuestionObs.unsubscribe()
		);
		this.isMobile = window.innerWidth < 768;
	}

	getNewQuestion(): Observable<Question> {
		return this.wiki.getRandomQuestion().pipe(
			map(question => {
				question.options = this.utils.shuffle(question.options);
				return question;
			})
		);
	}

	chooseOption(i: number) {
		if (!this.question || i == null) {
			return;
		}
		this.question = this.nextQuestion;
		let nextQuestionObs = this.getNewQuestion().subscribe(
			quest => this.nextQuestion = quest,
			null,
			() => nextQuestionObs.unsubscribe()
		);
		if (this.question.options[i].isRight) {
			alert('gj');
		} else {
			alert('loh');
		}
	}

	onSwipeUp(event: any): void {
		if (this.isMobile) {
			this.showQuiz.next(true);
		}
	}

	onSwipeDown(event: any): void {
		if (this.isMobile) {
			this.showQuiz.next(false);
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.isMobile = window.innerWidth < 768;
		this.showQuiz.next(false);
	}
}
