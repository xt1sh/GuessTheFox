import { Component, OnInit, HostListener, ComponentFactoryResolver, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { WikipediaService } from '../services/wikipedia.service';
import { Question } from '../models/question';
import { UtilsService } from '../../shared/services/utils.service';
import { Subject, BehaviorSubject } from 'rxjs';
import * as Hammer from 'hammerjs';
import { HammerModule } from '@angular/platform-browser';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {
	@ViewChild('quizArea', {static: false}) 
	quizArea: any;

	public isMobile: boolean;
	public showQuiz: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	private _inputValue: number;
	get inputValue(): number {
		return this._inputValue;
	}
	set inputValue(value: number) {
		this._inputValue = value;
		this.chooseOption(value);
	}

	question: Question;
	constructor(private wiki: WikipediaService,
		private utils: UtilsService ) { }

  ngOnInit() {
		this.inputValue = undefined;
		this.setNewQuestion();
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
	setNewQuestion(): void {
		let sub = this.wiki.getRandomQuestion().subscribe(
			question => {
				question.options = this.utils.shuffle(question.options);
				this.question = question;
			},
			null, () => { sub.unsubscribe() }
		);
	}

	chooseOption(i: number) {
		if (!this.question || i == null) {
			return;
		}
		if (this.question.options[i].isRight) {
			alert('gj');
		} else {
			alert('loh');
		}
		this.ngOnInit();
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
