import { AppInfo } from "../models/app-info";
import { SidenavInfoState } from "../models/sidenav-info";
import { User } from "../models/user";


export interface AppState {
    appInfo: AppInfo;
    sidenavInfo: SidenavInfoState;
    userInfo: User;
}

