import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectTherapistsPatientList = createSelector(
    (state: AppState) => state.therapistsPatientList,
    (therapistsPatientList) => therapistsPatientList.ids.map(id => therapistsPatientList.entities[id])
); 
