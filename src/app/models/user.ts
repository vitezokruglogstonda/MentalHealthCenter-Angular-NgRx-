export interface User{
    id: number;
    email: String;
    userName: String;
    JWT: String;
    userType: UserType;
    profilePicturePath: String;
    password: String;
}

export enum UserType{
    Admin,
    Therapist,
    Patient,
    CallOperator,
    Guest
}

export interface LoginDto{
    email: String;
    password: String;
}