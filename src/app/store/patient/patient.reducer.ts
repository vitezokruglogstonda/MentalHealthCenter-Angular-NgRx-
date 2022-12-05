import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { TherapistDto, TherapistListItem, TherapistListState } from "src/app/models/patient";
import * as PatientActions from "./patient.action";

export const initialPatientState: TherapistDto = {
    therapistInfo: null,
    schedule: null
}

export const patientsTherapistListAdapter: EntityAdapter<TherapistListItem> = createEntityAdapter<TherapistListItem>();

export const initialPatientListState: TherapistListState = patientsTherapistListAdapter.getInitialState({
});

export const patientsTherapistListReducer = createReducer(
    initialPatientListState,
    on(PatientActions.loadTherapistList, (state) => ({
        ...state
    })),
    on(PatientActions.loadTherapistListSuccess, (state, {items}) => {
        return patientsTherapistListAdapter.addMany(items, state);
    }),
    on(PatientActions.chooseTherapist, (state, {patientId, therapistId}) => ({
        ...state
    }))    
);

export const patientReducer = createReducer(
    initialPatientState,
    on(PatientActions.loadTherapist, (state, {therapistId}) => ({
        ...state
    })),
    on(PatientActions.loadTherapistSuccess, (state, {therapist}) => ({
        ...therapist
    })),
);