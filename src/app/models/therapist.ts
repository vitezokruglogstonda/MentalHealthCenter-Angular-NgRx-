import { EntityState } from "@ngrx/entity";
import { CustomDate } from "./user";

export interface TherapistsPatientListItem{
    id: number|null;
    email: String;
    firstName: String;
    lastName: String;
    birthDate: CustomDate;
    gender: String;
    phoneNumber: String;
    profilePicturePath: String;
}

export interface TherapistsPatientListState extends EntityState<TherapistsPatientListItem>{

}