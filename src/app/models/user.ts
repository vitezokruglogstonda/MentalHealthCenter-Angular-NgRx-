export interface User {
    id: number | null;
    email: String;
    // userName: String;
    firstName: String;
    lastName: String;
    birthDate: CustomDate;
    gender: String;
    JWT: String;
    userType: UserType;
    profilePicturePath: String;
    password: String;
}

export enum UserType {
    Admin,
    Therapist,
    Patient,
    CallOperator,
    Guest
}

export interface LoginDto {
    email: String;
    password: String;
}

export interface RegisterDto {
    email: String;
    password: String;
    firstName: String;
    lastName: String;
    birthDate: CustomDate | null;
    userGender: String;
    profilePicture: File | null;
}

export interface CustomDate{
    year: number,
    month: number,
    day: number
}