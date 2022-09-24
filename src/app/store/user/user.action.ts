import { createAction, props } from "@ngrx/store";
import { LoginDto, User } from "src/app/models/user";

export const logIn = createAction("Log In", props<{loginDto : LoginDto}>());
export const logInSuccess = createAction("Log In Success", props<{user: User}>());
