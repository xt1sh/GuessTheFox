import { Component, OnInit } from '@angular/core';
import { WikipediaService } from '../services/wikipedia.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private wiki: WikipediaService) { }

  ngOnInit() {
    this.wiki.getRandomQuestion().subscribe(console.log);
  }

}
