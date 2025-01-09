import { QuestionModel } from "./QuestionModel";

export class ResultModel {
    score: number;
    timeTaken: number;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    userAnswers: string;
    questions: QuestionModel[];
    constructor(score: number, timeTaken: number, totalQuestions: number, correctAnswers: number, incorrectAnswers: number, userAnswers: string, questions: QuestionModel[]) {
        this.score = score;
        this.timeTaken = timeTaken;
        this.totalQuestions = totalQuestions;
        this.correctAnswers = correctAnswers;
        this.incorrectAnswers = incorrectAnswers;
        this.userAnswers = userAnswers;
        this.questions = questions;
    }
}