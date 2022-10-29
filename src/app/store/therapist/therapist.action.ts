import { createAction, props } from "@ngrx/store";
import { TherapistsPatientListItem } from "src/app/models/therapist";

export const loadTherapistsPatients = createAction("Load Patient List For Therapist", props<{therapistId: number}>());
export const loadTherapistsPatientsSuccess = createAction("Load Patient List For Therapist - Success", props<{items: TherapistsPatientListItem[]}>());