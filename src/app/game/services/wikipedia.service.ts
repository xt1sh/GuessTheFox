import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { Question } from '../models/question';
import animalsList from '../../../assets/animals.en.json';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  localization: string;

  constructor() { }

  setLocalization(lang: string = undefined) {
    this.localization = lang;
  }
  
  // getRandomArticle(): Observable<any> {
  //   if (this.localization) {
  //     var promise = wiki({ apiUrl: `https://${this.localization}.wikipedia.org/w/api.php` });
  //   } else {
  //     promise = wiki();
  //   }
  //   return from(promise.page(animalsList[Math.random() * animalsList.length]))
  //     .pipe(tap(res => console.log(res)));
  // }
}
