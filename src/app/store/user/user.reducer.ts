import { createReducer, on } from "@ngrx/store";
import { LoginStatus } from "src/app/models/app-info";
import { User, UserType } from "src/app/models/user";
//import { logIn } from "./user.action";
import * as Actions from "./user.action";

// export const initialState: User = {
//     id: 1,
//     email: "kurac@kurac.rs",
//     userName: "Mandrila",
//     JWT: "String",
//     userType: UserType.Patient,
//     profilePicturePath: "/assets/UserData/user1.png",
//     password: "123"
// };

export const initialState: User = {
    id: 0,
    email: "",
    userName: "",
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
    }))
);