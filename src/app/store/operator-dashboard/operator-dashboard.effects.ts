import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, tap } from "rxjs";
import { HelpCallListItem } from "src/app/models/help-call-dto";
import { OperatorService } from "src/app/services/operator.service";
import { AppState } from "../app.state";
import * as OpDashboardActions from "./operator-dashboard.action";

@Injectable()
export class OperatorEffects {
    constructor(private actions$: Actions, private operatorService: OperatorService, private store: Store<AppState>) { }

    loadHelpCallRequests = createEffect(() =>
        this.actions$.pipe(
            ofType(OpDashboardActions.loadHelpCallsRequests),
            switchMap((action) =>
                this.operatorService.getHelpCallRequests().pipe(
                    switchMap((items: HelpCallListItem[]) => {
                        return [
                            OpDashboardActions.loadHelpCallsRequestsSuccess({ items: items })
                        ];
                    })
                )
            )
        )
    );

    finishRequest = createEffect(() =>
        this.actions$.pipe(
            ofType(OpDashboardActions.finishRequest),
            switchMap((action) =>
                this.operatorService.finishHelpCallRequest(action.requestId).pipe(
                    switchMap(()=>{
                        return [OpDashboardActions.finishRequestSuccess()];
                    })
                )
            )
        )
    );

}