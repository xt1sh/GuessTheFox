import { QuestionOption } from "./question-option";

export interface Question {
	keyWord: string;
	imageUrl: string;
	options: QuestionOption[];
}
