import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { AdminUserListState, UserListItem } from "src/app/models/admin";
import * as AdminActions from "./admin.action";

export const adminUserListAdapter: EntityAdapter<UserListItem> = createEntityAdapter<UserListItem>();

export const initialUserListState: AdminUserListState = adminUserListAdapter.getInitialState({
});

export const adminReducer = createReducer(
    initialUserListState,
    on(AdminActions.loadUserList, (state) => ({
        ...state
    })),
    on(AdminActions.loadUserListSuccess, (state, {users}) => {
        return adminUserListAdapter.addMany(users, state);
    })
);