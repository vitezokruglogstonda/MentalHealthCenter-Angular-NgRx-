import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectTherapistsPatientList = createSelector(
    (state: AppState) => state.therapistsPatientList,
    (therapistsPatientList) => therapistsPatientList.ids.map(id => therapistsPatientList.entities[id])
); 

export const selectTherapistsPatient = (ids: number[]) => createSelector(
    selectTherapistsPatientList,
    (therapistsPatientList) => therapistsPatientList.filter((patient) => {
        if(patient)
            if(patient.id)
                return ids.includes(patient.id);
        return null;
    })
);

export const selectTherapistsScheduleList = createSelector(
    (state: AppState) => state.therapistsScheduleList,
    (therapistsScheduleList) => therapistsScheduleList
);

export const selectTherapistsScheduleListByDate = (date: String) => createSelector(
    selectTherapistsScheduleList,
    (therapistsScheduleList) => therapistsScheduleList.ids.map(id => {
        if(therapistsScheduleList.entities[id]?.date===date){
            return therapistsScheduleList.entities[id]
        }else{
            return null;
        }
    })
    //ili da vrati niz ceo pa profiltriraj datum (da ne filtrira entity)?
);