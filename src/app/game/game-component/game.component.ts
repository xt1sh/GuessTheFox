import { Component, OnInit } from '@angular/core';
import { WikipediaService } from '../services/wikipedia.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  questions: Array<string> = ["question 1", "question 2"];
  constructor(private wiki: WikipediaService) { }
  ngOnInit() {
    // this.wiki.getRandomArticle().subscribe(res => console.log(res))
  }

}
