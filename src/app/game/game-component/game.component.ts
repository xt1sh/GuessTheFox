import { Component, OnInit } from '@angular/core';
import { WikipediaService } from '../services/wikipedia.service';
import { Question } from '../models/question';
import { UtilsService } from '../../shared/services/utils.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

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

}
