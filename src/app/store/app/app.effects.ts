import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap } from "rxjs";
import { Quote } from "src/app/models/home-page-quotes";
import { AppService } from "src/app/services/app.service";
import { AppState } from "../app.state";
import * as AppActions from "./app.action";

@Injectable()
export class AppEffects {
    constructor(private actions$: Actions, private appService: AppService, private store: Store<AppState>) { }

    fatchQuotes = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.fetchQuotes),
            switchMap((action) =>
                this.appService.getUserQuotes().pipe(
                    switchMap((quotes: Quote[]) => {
                        return [
                            AppActions.fetchQuotesSuccess({ quotes: quotes })
                        ];
                    })
                )
            )
        )
    );
}