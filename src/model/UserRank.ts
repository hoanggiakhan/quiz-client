export class UserRank {
    fullName: string;
    score: number;
    userId: string;

    constructor(fullName: string, score: number, userId: string) {
        this.fullName = fullName;
        this.score = score;
        this.userId = userId;
    }
}