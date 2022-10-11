import { createAction, props } from "@ngrx/store";
import { LoginStatus } from "src/app/models/app-info";
import { Quote } from "src/app/models/home-page-quotes";
import { User } from "src/app/models/user";

export const changeStatus = createAction("Change Account Status", props<{loginStatus: LoginStatus, imagePath: String}>());
export const loginFail = createAction("Log In Fail");
export const registerFail = createAction("Registration Failed");
export const updateEmailError = createAction("Update Email Error", props<{status: boolean}>());
export const fetchQuotes = createAction("Get Users Quotes For Home Page");
export const fetchQuotesSuccess = createAction("Users Quotes Fatched Successfuly", props<{quotes: Quote[]}>());