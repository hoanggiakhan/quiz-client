export class QuizModel{
    quizId : string;
    title : string;
    description : string;
    duration : string;
    isActive : number;
    nameSubject : string;
    grade : number;
    status : string;
     constructor(quizId : string, 
        title : string, 
        description : string, 
        duration : string, 
        isActive : number, 
        nameSubject : string,
        grade : number,
       status : string
      ){
        this.quizId = quizId;
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.isActive = isActive;
        this.nameSubject = nameSubject;
        this.grade = grade;
        this.status=status
     }
}