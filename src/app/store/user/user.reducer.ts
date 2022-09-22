import { createReducer } from "@ngrx/store";
import { User, UserType } from "src/app/models/user";

export const initialState: User = {
    email: "kurac@kurac.rs",
    userName: "Mandrila",
    JWT: "String",
    userType: UserType.Patient,
    profilePicturePath: "/assets/UserData/user1.png",
    password: "123"
};

export const userReducer = createReducer(
    initialState
);