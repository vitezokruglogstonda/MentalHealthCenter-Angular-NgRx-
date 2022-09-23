import {createReducer, on} from "@ngrx/store"
import { AppInfo, LoginStatus } from "src/app/models/app-info";
import { environment } from "src/environments/environment";

export const initialState: AppInfo = {
    loginStatus: LoginStatus.Offline,
    accountImagePath: environment.account_icon_basic_URL,
    tooltipText: environment.account_icon_tooltip_text,
    emailExample: environment.login_card_example_email,
};

export const appReducer = createReducer(
    initialState
);