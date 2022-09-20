import { createReducer } from "@ngrx/store";
import { SidenavInfo } from "src/app/models/sidenav-info";
import { environment } from "src/environments/environment";

export const initialState: SidenavInfo = {
    itemsList: environment.sidenav_items_list
};

export const sidenavItemsReducer = createReducer(
    initialState
  );