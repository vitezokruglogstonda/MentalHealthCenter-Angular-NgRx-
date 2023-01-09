import { createAction, props } from "@ngrx/store";
import { UserListItem } from "src/app/models/admin";

export const loadUserList = createAction("Load All Users");
export const loadUserListSuccess = createAction("Load All Users - Success", props<{users: UserListItem[]}>());