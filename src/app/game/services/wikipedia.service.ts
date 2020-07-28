import { Injectable } from '@angular/core';
import { from, Observable, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import animalsList from '../../../assets/animals.en.json';
import * as wiki from '@drumtj/wiki';
import { HtmlHelperService } from '../../shared/services/html-helper.service';
import { Question } from "../models/question";
import { ImageService } from './image.service';

@Injectable()
export class WikipediaService {

  categories: string[] = ['Etymology', 'In culture', 'History']

  localization: string;

  constructor(private htmlHelper: HtmlHelperService,
              private imageService: ImageService) {
    wiki.setLanguage('en');
   }

  setLocalization(lang: string = undefined) {
    this.localization = lang;
    wiki.setLanguage(lang);
  }
  
  getRandomQuestion(): Observable<any> {
    let word = animalsList[Math.floor(Math.random() * animalsList.length)];
    console.log(word)
    return from(wiki.sections(word)).pipe(
      map(async (sections: any) => {
        console.log(sections)
        let categories = sections.filter((sec: any) => pipe(this.htmlHelper.getSectionName, this.categories.includes)(sec.innerText))
        console.log(categories) 
        let question: Question = { 
          encryptedText: this.encryptText(this.htmlHelper.removeNumberTags(categories[0])),
          keyWord: word,
          options: [
            {
              imageUrl: await this.imageService.getImageSrc(word),
              word: word,
              isRight: true
            },
            {
              imageUrl: await this.imageService.getImageSrc(word),
              word: word,
              isRight: false
            }
          ]
        }
        return question;
      }),
      tap(res => {
        console.log(res)
      })
    );
  }

  encryptText(text: string, params?): string {
    return text;
  }
}
