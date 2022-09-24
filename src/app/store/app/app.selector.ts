import { createSelector } from "@ngrx/store";
import { LoginStatus } from "src/app/models/app-info";
import { AppState } from "../app.state";

export const selectAppInfo = createSelector(
    (state: AppState) => state.appInfo,
    (account_info) => account_info
); 

export const selectEmailExample = createSelector(
    selectAppInfo,
    (state) => state.emailExample
);

export const selectLoginErrorStatus = createSelector(
    selectAppInfo,
    (state) => state.loginError
);
