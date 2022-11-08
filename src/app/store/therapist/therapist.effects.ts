import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap } from "rxjs";
import { TherapistsPatientListItem, TherapistsScheduleListItem } from "src/app/models/therapist";
import { TherapistService } from "src/app/services/therapist.service";
import { AppState } from "../app.state";
import * as TherapistActions from "./therapist.action";

@Injectable()
export class TherapistEffects{
    constructor(private actions$: Actions, private therapistService: TherapistService, private store: Store<AppState>) { }

    loadTherapistsPatients = createEffect(() =>
        this.actions$.pipe(
            ofType(TherapistActions.loadTherapistsPatients),
            switchMap((action) =>
                this.therapistService.getPatientList(action.therapistId).pipe(
                    switchMap((items: TherapistsPatientListItem[]) => {
                        return [
                            TherapistActions.loadTherapistsPatientsSuccess({ items: items })
                        ];
                    })
                )
            )
        )
    );

    loadScheduleForDate = createEffect(() => 
        this.actions$.pipe(
            ofType(TherapistActions.loadTherapistsScheduleForDate),
            switchMap((action) =>
                this.therapistService.getSchedule(action.therapistId, action.date).pipe(
                    switchMap((appointments: TherapistsScheduleListItem[]) => {
                        return [TherapistActions.loadTherapistsScheduleForDateSuccess({appointmentList: appointments})];
                    })
                )
            )
        )
    );

}