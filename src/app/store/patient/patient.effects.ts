import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap } from "rxjs";
import { TherapistDto, TherapistListItem } from "src/app/models/patient";
import { User } from "src/app/models/user";
import { PatientService } from "src/app/services/patient.service";
import { AppState } from "../app.state";
import * as PatientActions from "./patient.action";
import * as UserActions from "../user/user.action";
import { TherapistsScheduleListItem } from "src/app/models/therapist";

@Injectable()
export class PatientEffects{
    constructor(private actions$: Actions, private patientService: PatientService, private store: Store<AppState>) { }

    loadTherapistList = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientActions.loadTherapistList),
            switchMap(() =>
                this.patientService.getTherapistList().pipe(
                    switchMap((items: TherapistListItem[]) => {
                        return [
                            PatientActions.loadTherapistListSuccess({ items: items })
                        ];
                    })
                )
            )
        )
    );

    chooseTherapist = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientActions.chooseTherapist),
            switchMap((action) =>
                this.patientService.chooseTherapist(action.patientId, action.therapistId).pipe(
                    switchMap((user: User) => {
                        return [
                            UserActions.chooseTherapistSuccess({ user: user })
                        ];
                    })
                )
            )
        )
    );

    loadTherapist = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientActions.loadTherapist),
            switchMap((action) =>
                this.patientService.loadTherapist(action.patientId, action.therapistId).pipe(
                    switchMap((therapist: TherapistDto) => {
                        return [
                            PatientActions.loadTherapistSuccess({ therapist: therapist })
                        ];
                    })
                )
            )
        )
    );

    makeAnAppointment = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientActions.makeAnAppointment),
            switchMap((action) =>
                this.patientService.makeAnAppointment(action.patientId, action.therapistId, action.date, action.appointmentNumber).pipe(
                    switchMap((schedule: TherapistsScheduleListItem) => {
                        return [
                            PatientActions.makeAnAppointmentSuccess({patientId: schedule.patientId, therapistId: schedule.therapistID, date: schedule.date as string, appointmentNumber: schedule.appointmentNumber, usersAppointment: true})
                        ];
                    })
                )
            )
        )
    );
}