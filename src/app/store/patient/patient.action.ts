import { createAction, props } from "@ngrx/store";
import { TherapistDto, TherapistListItem } from "src/app/models/patient";

export const loadTherapistList = createAction("Load Therapist List");
export const loadTherapistListSuccess = createAction("Load Therapist List - Success", props<{items: TherapistListItem[]}>());
export const chooseTherapist = createAction("Choose Therapist", props<{patientId: number, therapistId: number}>());
export const loadTherapist = createAction("Load Therapist", props<{therapistId: number}>());
export const loadTherapistSuccess = createAction("Load Therapist", props<{therapist: TherapistDto}>());