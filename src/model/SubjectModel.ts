export class SubjectModel{
    subjectId : string;
    name : string;
    nameQuiz : string[];
    constructor(subjectId : string, name : string , nameQuiz : string[]){
        this.subjectId = subjectId;
        this.name = name;
        this.nameQuiz = nameQuiz;
    }
}