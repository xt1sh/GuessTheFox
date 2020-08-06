import { Component, OnInit, HostListener, ComponentFactoryResolver, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
export class GameComponent implements OnInit, AfterViewInit {
	@ViewChild('quizArea', {static: false})
	quizArea: any;

	question: Question;
	nextQuestion: Question;
	isMobile: boolean;
	showQuiz: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private wiki: WikipediaService,
		private utils: UtilsService ) { }

  ngOnInit() {
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
		this.showQuiz = new BehaviorSubject<boolean>(false);
	}

	async ngAfterViewInit() {
		var overlay =  await new Promise((resolve) => {
			let interval = setInterval(function () {
				if (document.getElementById('overlay')) {
					clearInterval(interval);
					resolve(document.getElementById('overlay'));
			 	}}, 200);
		});
		var mc = new Hammer.Manager(overlay,{
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
			console.log(this.quizArea);
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
