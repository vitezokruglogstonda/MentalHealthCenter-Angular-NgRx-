import { EntityState } from "@ngrx/entity";
import { CustomDate } from "./user";

export interface TherapistListItem{
    id: number|null;
    email: String;
    firstName: String;
    lastName: String;
    gender: String;
    phoneNumber: String;
    profilePicturePath: String;
    description: String;
}

export interface TherapistListState extends EntityState<TherapistListItem>{

}

export interface TherapistDto{
    therapistInfo: TherapistInfoDto | null;
    schedule: ScheduleDto[] | null;
}

export interface TherapistInfoDto{
    id: Number,
    email: String,
    firstName: String,
    lastName: String,
    profilePicturePath: String,
    gender: String,
    description: String
}

export interface ScheduleDto{
    date: String,
    appointmentNumber: number
}