import { Component, OnInit } from '@angular/core';
import { WikipediaService } from '../services/wikipedia.service';
import { Question } from '../models/question';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

	question: Question;

  constructor(private wiki: WikipediaService) { }
  ngOnInit() {
    this.wiki.getRandomQuestion().subscribe(question => this.question = question);
  }

}
