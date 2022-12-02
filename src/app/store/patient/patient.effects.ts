import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap } from "rxjs";
import { TherapistListItem } from "src/app/models/patient";
import { PatientService } from "src/app/services/patient.service";
import { AppState } from "../app.state";
import * as PatientActions from "./patient.action";

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
}