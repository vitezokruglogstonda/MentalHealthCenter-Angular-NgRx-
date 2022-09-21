import { createSelector } from "@ngrx/store";
import { LoginStatus } from "src/app/models/account-info";
import { AppState } from "../app.state";

export const selectAccountInfo = createSelector(
    (state: AppState) => state.accountInfo,
    (account_info) => account_info
); 

export const selectEmailExample = createSelector(
    selectAccountInfo,
    (state) => state.emailExample
);
