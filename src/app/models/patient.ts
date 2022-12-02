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