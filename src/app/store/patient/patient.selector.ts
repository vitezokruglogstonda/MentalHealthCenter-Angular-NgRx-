import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectTherapistList = createSelector(
    (state: AppState) => state.patientsTherapistList,
    (patientsTherapistList) => patientsTherapistList.ids.map(id => patientsTherapistList.entities[id])
); 