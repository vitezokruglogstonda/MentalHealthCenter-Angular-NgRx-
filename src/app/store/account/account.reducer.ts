import {createReducer, on} from "@ngrx/store"
import { AccountInfo, LoginStatus } from "src/app/models/account-info";
import { environment } from "src/environments/environment";

export const initialState: AccountInfo = {
    loginStatus: LoginStatus.SignedOut,
    accountIcon: environment.account_icon_basic_URL,
    tooltipText: environment.account_icon_tooltip_text,
    emailExample: environment.example_email,
};

export const accountReducer = createReducer(
    initialState
);