import { createAction, props } from "@ngrx/store";
import { TherapistListItem } from "src/app/models/patient";

export const loadTherapistList = createAction("Load Therapist List");
export const loadTherapistListSuccess = createAction("Load Therapist List - Success", props<{items: TherapistListItem[]}>());