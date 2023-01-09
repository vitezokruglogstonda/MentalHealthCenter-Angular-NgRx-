import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap } from "rxjs";
import { UserListItem } from "src/app/models/admin";
import { AdminService } from "src/app/services/admin.service";
import { AppState } from "../app.state";
import * as AdminActions from "./admin.action";

@Injectable()
export class AdminEffects{
    constructor(private actions$: Actions, private adminService: AdminService, private store: Store<AppState>) { }

    loadUserList = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.loadUserList),
            switchMap((action) =>
                this.adminService.getUserList().pipe(
                    switchMap((users: UserListItem[]) => {
                        return [
                            AdminActions.loadUserListSuccess({ users: users })
                        ];
                    })
                )
            )
        )
    );
}