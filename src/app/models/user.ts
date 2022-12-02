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
    phoneNumber: String;
    profilePicturePath: String;
    password: String;
    therapistID: number | null;
    //ovo izbrisi
    note: String;
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
    phoneNumber: String;
    profilePicture: File | null;
}

export interface CustomDate{
    year: number,
    month: number,
    day: number
}