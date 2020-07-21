import { QuestionOption } from "./question-option";

export interface Question {
	encryptedText: string;
	keyWord: string;
	options: QuestionOption[];
}
