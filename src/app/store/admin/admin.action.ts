import { createAction, props } from "@ngrx/store";
import { UserListItem } from "src/app/models/admin";

export const loadUserList = createAction("Load All Users");
export const loadUserListSuccess = createAction("Load All Users - Success", props<{users: UserListItem[]}>());
export const deleteUser = createAction("Delete User", props<{userId: number}>());
export const deleteUserSuccess = createAction("Delete User - Success", props<{userId: number}>());