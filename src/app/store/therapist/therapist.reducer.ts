import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { TherapistsPatientListItem, TherapistsPatientListState } from "src/app/models/therapist";
import * as TherapistActions from "./therapist.action";

export const therapistsPatientListAdapter: EntityAdapter<TherapistsPatientListItem> = createEntityAdapter<TherapistsPatientListItem>();

export const initialState: TherapistsPatientListState = therapistsPatientListAdapter.getInitialState({
});

export const therapistReducer = createReducer(
    initialState,
    on(TherapistActions.loadTherapistsPatients, (state, {therapistId}) => ({
        ...state
    })),
    on(TherapistActions.loadTherapistsPatientsSuccess, (state, {items}) => {
        return therapistsPatientListAdapter.addMany(items, state);
    })
);