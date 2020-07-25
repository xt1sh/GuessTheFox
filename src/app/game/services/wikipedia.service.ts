import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { Question } from '../models/question';
import animalsList from '../../../assets/animals.en.json';
import * as wiki from '@drumtj/wiki';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  localization: string;

  constructor() {
    wiki.setLanguage('en');
   }

  setLocalization(lang: string = undefined) {
    this.localization = lang;
  }
  
  getRandomArticle(): Observable<any> {
    return from(wiki.sections("orange"));
  }
}
