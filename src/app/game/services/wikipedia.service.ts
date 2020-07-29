import { Injectable } from '@angular/core';
import { from, Observable, pipe } from 'rxjs';
import { map, tap, flatMap } from 'rxjs/operators'
import animalsList from '../../../assets/animals.en.json';
import * as wiki from '@drumtj/wiki';
import { HtmlHelperService } from '../../shared/services/html-helper.service';
import { Question } from "../models/question";
import { ImageService } from './image.service';
import { QuestionOption } from '../models/question-option';

@Injectable()
export class WikipediaService {

  categories: string[] = ['Etymology', 'In culture', 'History', 'Species']

  localization: string;

  constructor(private htmlHelper: HtmlHelperService,
              private imageService: ImageService) {
    wiki.setLanguage('en');
   }

  setLocalization(lang?: string) {
    this.localization = lang;
    wiki.setLanguage(lang);
  }

  getRandomQuestion(): Observable<Question> {
    let rand = Math.random() * animalsList.length;
    let word = animalsList[Math.floor(rand)];
    console.log(animalsList.splice(rand, 1))
		return from(wiki.sections(word) as Promise<any>).pipe(
      map((sections: any) => {
				let categories = sections
					.filter((sec: any) => this.categories.includes(this.htmlHelper.getSectionName(sec.innerText)))
          .map((sec: any) => this.htmlHelper.extractContent(sec));
        let question: Question = {
          encryptedText: this.encryptText(this.htmlHelper.removeNumberTags(categories[0])),
          keyWord: word,
          options: [
            {
              imageUrl: '',
              word: word,
              isRight: true
            },
            {
              imageUrl: '',
              word: animalsList[Math.floor(Math.random() * animalsList.length)],
              isRight: false
            }
          ]
				}
        return question;
			}),
			flatMap((question: Question) => {
				return from(question.options).pipe(
					flatMap((opt: QuestionOption) => {
						return this.imageService.getImageSrc(opt.word).pipe(
							map(imageSrc => { return { imageSrc: imageSrc, word: opt.word } }),
						);
					}),
					map(res => {
						question.options.filter(opt => opt.word === res.word)[0].imageUrl = res.imageSrc;
						return question;
					}),
				);
			})
    );
  }

  encryptText(text: string, params?): string {
    return text;
  }
}
