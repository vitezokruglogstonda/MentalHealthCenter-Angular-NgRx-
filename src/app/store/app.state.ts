import { AppInfo } from "../models/app-info";
import { SidenavInfo } from "../models/sidenav-info";
import { User } from "../models/user";


export interface AppState {
    appInfo: AppInfo;
    sidenavInfo: SidenavInfo;
    userInfo: User;
}

