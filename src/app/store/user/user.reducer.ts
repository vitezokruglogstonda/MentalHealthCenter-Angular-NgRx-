import { createReducer, on } from "@ngrx/store";
import { LoginStatus } from "src/app/models/app-info";
import { User, UserType } from "src/app/models/user";
//import { logIn } from "./user.action";
import * as Actions from "./user.action";

export const initialState: User = {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    birthDate: {
        year: 0,
        month: 0,
        day: 0
    },
    gender: "",
    JWT: "",
    userType: UserType.Guest,
    profilePicturePath: "",
    password: ""
};

export const userReducer = createReducer(
    initialState,
    on(Actions.logIn, (state, {loginDto}) => ({...state})),
    on(Actions.logInSuccess, (state, {user}) => ({
        ...user,
    })),
    on(Actions.signOut, (state)=>({
        ...initialState
    })),
    on(Actions.register, (state, {registerDto}) => ({...state})),
    on(Actions.checkEmail, (state, {mail}) => ({...state})),
);