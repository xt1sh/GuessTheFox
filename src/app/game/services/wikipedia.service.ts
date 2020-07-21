import { Injectable } from '@angular/core';
import wiki from 'wikijs';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  localization: string;

  constructor() { }

  setLocalization(lang: string = undefined) {
    this.localization = lang;
  }
  
  getRandomArticle(): Observable<any> {
    if (this.localization) {
      var promise = wiki({ apiUrl: `https://${this.localization}.wikipedia.org/w/api.php` });
    } else {
      promise = wiki();
    }
    return from(promise.page('Fox'))
      .pipe();
  }
}
