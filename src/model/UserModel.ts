export class UserModel {
    fullName: string;
    username: string;
    password: string;
    email: string;
    role: string;
    avatarUrl: string;

    constructor(
        fullName: string,
        username: string,
        password: string,
        email: string,
        role: string,
        avatarUrl: string
    ) {
        this.fullName = fullName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.avatarUrl = avatarUrl;
    }
}