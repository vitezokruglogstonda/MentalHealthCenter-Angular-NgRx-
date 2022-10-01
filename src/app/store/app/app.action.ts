import { createAction, props } from "@ngrx/store";
import { LoginStatus } from "src/app/models/app-info";
import { User } from "src/app/models/user";

export const changeStatus = createAction("Change Account Status", props<{loginStatus: LoginStatus, imagePath: String}>());
export const loginFail = createAction("Log In Fail");
export const registerFail = createAction("Registration Failed");
export const updateEmailError = createAction("Update Email Error", props<{status: boolean}>());