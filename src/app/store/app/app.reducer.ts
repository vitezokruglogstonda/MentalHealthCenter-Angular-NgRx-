import {createReducer, on} from "@ngrx/store"
import { AppInfo, LoginStatus } from "src/app/models/app-info";
import { environment } from "src/environments/environment";
import * as Actions from "./app.action";

export const initialState: AppInfo = {
    loginStatus: LoginStatus.Offline,
    accountImagePath: environment.account_icon_basic_URL,
    tooltipText: environment.account_icon_tooltip_text,
    emailExample: environment.login_card_example_email,
    loginError: false
};

export const appReducer = createReducer(
    initialState,
    on(Actions.changeStatus, (state, {loginStatus, imagePath}) => ({
        ...state,
        loginStatus: loginStatus,
        accountImagePath: imagePath,
        loginError: false
    })),
    on(Actions.loginFail, (state) => ({
        ...state,
        loginError: true
    }))
);
