export class QuestionModel{
    questionId: string;
    content : string;
    questionType : string;
    choices : string[];
    correctAnswers : string[];
    nameQuiz : string;
    createdAt : Date;
    constructor(questionId: string, 
        content : string, 
        questionType : string, 
        choices : string[], 
        correctAnswers : string[], 
        nameQuiz : string, 
        createdAt : Date){
        this.questionId = questionId;
        this.content = content;
        this.questionType = questionType;
        this.choices = choices;
        this.correctAnswers = correctAnswers;
        this.nameQuiz = nameQuiz;
        this.createdAt = createdAt;
    }
}