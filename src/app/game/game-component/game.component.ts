import { Component, OnInit, HostListener, ComponentFactoryResolver, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { WikipediaService } from '../services/wikipedia.service';
import { Question } from '../models/question';
import { UtilsService } from '../../shared/services/utils.service';
import { Subject, BehaviorSubject, Observable, forkJoin, Subscription } from 'rxjs';
import * as Hammer from 'hammerjs';
import { HammerModule } from '@angular/platform-browser';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { map, flatMap } from 'rxjs/operators';
import { LoaderService } from 'src/app/shared/services/loader.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

	private _quizArea: ElementRef;
	@ViewChild('quizArea', { static: false })
	set quizArea(el: ElementRef) {
		this._quizArea = el?.nativeElement;
	}
	get quizArea(): ElementRef {
		return this._quizArea
	}

	@ViewChild('image', { static: false })
	set image(el: ElementRef) {
		if (el && !this.isImageEventSet) {
			this.isImageEventSet = true;
			el.nativeElement.addEventListener('load', () => {
				this.isImageLoaded.next(true);
			});
			el.nativeElement.addEventListener('error', () => {
				this.isImageLoaded.next(true);
			});
		}
	}
	private isImageEventSet: boolean;

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

	subscription: Subscription;

	isOverlayLoaded: boolean;
	isImageLoaded: BehaviorSubject<boolean>;
	question: Question;
	nextQuestion: BehaviorSubject<Question>;
	isMobile: boolean;
	showQuiz: Subject<boolean>;

	constructor(private wiki: WikipediaService,
		private utils: UtilsService,
		private loader: LoaderService) { }

  ngOnInit() {
		this.loader.toggleLoading(true);
		this.subscription = new Subscription();
		this.isImageLoaded = new BehaviorSubject<boolean>(false);
		this.nextQuestion = new BehaviorSubject<Question>(undefined);
		this.showQuiz = new Subject<boolean>();
		this.isOverlayLoaded = false;
		forkJoin([this.getNewQuestion(), this.getNewQuestion()]).subscribe(res => {
			this.question = res[0];
			this.nextQuestion.next(res[1]);
			this.loader.toggleLoading(false);
		})

		let sub = this.nextQuestion.pipe(
			flatMap(nextQuest => {
				if (!nextQuest) {
					return this.getNewQuestion();
				}
			})
		).subscribe(res => {
			if (res) {
				this.nextQuestion.next(res);
			}
		});
		this.subscription.add(sub);

		this.subscription.add(
			this.isImageLoaded.subscribe(loaded => this.loader.toggleLoading(!loaded))
		);

		this.isMobile = window.innerWidth < 768;
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
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
		if (this.question.options[i].isRight) {
			alert('gj');
		} else {
			alert('loh');
		}
		this.isImageLoaded.next(false);
		if (this.nextQuestion.value) {
			this.question = this.nextQuestion.value;
			this.nextQuestion.next(null);
			this.subscription.add(
				this.getNewQuestion().subscribe(
					quest => this.nextQuestion.next(quest)
				));
		} else {
			this.loader.toggleLoading(true);
			var sub = this.nextQuestion.subscribe(quest => {
				if (quest) {
					this.question = quest;
					if (this.isImageLoaded.value) {
						this.loader.toggleLoading(false);
					}
				}
			}, null, () => sub.unsubscribe());
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
