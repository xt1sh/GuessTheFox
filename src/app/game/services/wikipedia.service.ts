import { Injectable, Query } from '@angular/core';
import { from, Observable, pipe, Subscription, forkJoin } from 'rxjs';
import { map, tap, flatMap, filter } from 'rxjs/operators'
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
		let words = animalsList.sort(() => Math.random() - Math.random()).slice(0, 2);
		let question: Question = {
			keyWord: words[0],
			imageUrl: '',
			options: [
				{
					word: words[0],
					isRight: true,
					encryptedText: ''
				},
				{
					word: words[1],
					isRight: false,
					encryptedText: ''
				}
			]
		}

		return from(question.options).pipe(
			flatMap((opt: QuestionOption) => {
				return from(wiki.sections(opt.word)).pipe(
					map((sections: any[]) => {
						question.keyWord = question.keyWord.replace('_', ' ');
						let content = sections.filter((sec: any) =>
							this.categories.includes(this.htmlHelper.getSectionName(sec.innerText))
						)[0]
						if (content) {
							return content;
						}
						return sections[Math.floor(Math.random() * (sections.length - 2) + 1)];
					}
					),
					map((sec: any) => this.htmlHelper.extractContent(sec)),
					map((sec: string) => this.encryptText(this.htmlHelper.removeNumberTags(sec.split('.')[0]), opt.word.split(' '))),
					map((encryptedText: string) => { return { encryptedText: encryptedText, word: opt.word } })
				);
			}),
			map((res: { encryptedText: string, word: string }) => {
				question.options.filter(opt => opt.word === res.word)[0].encryptedText = res.encryptedText;
				return question;
			}),
			flatMap((quest: Question) => this.imageService.getImageSrc(quest.keyWord)),
			map((imageUrl: string) => {
				question.imageUrl = imageUrl;
				return question;
			})
		);
  }

  private encryptText(text: string, params?: string[]): string {
		if (!params || !params.length) {
			return text;
		}
		let words = text.split(' ');
		params.forEach(param => {
			for (let i = 0; i < words.length; i++) {
				let word = words[i];
				if (word.toLowerCase().includes(param.toLowerCase())) {
					words[i] = '___';
				}
			}
		});
		return words.join(' ');
	}
}
