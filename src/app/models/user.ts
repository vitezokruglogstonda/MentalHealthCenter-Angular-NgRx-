export interface User{
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
    CallOperator
}