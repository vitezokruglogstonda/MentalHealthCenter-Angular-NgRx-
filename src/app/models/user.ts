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
    //ovo izbrisi (imaju samo pacijenti, u posebnoj tabeli)
    therapistID: number | null;
    //ovo isto izbrisi (imaju samo pacijenti, u posebnoj tabeli)
    note: String;
    //i ovo izbrisi (imaju samo terapeuti, u posebnoj tabeli)
    description: String | null;
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