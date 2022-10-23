import { AppInfo } from "../models/app-info";
import { HelpCallListState } from "../models/help-call-dto";
import { SidenavInfoState } from "../models/sidenav-info";
import { User } from "../models/user";


export interface AppState {
    appInfo: AppInfo;
    sidenavInfo: SidenavInfoState;
    userInfo: User;
    helpCallRequestList: HelpCallListState;
}

