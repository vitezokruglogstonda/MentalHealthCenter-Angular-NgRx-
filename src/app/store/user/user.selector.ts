import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectUserInfo = createSelector(
    (state: AppState) => state.userInfo,
    (userInfo) => userInfo
); 


