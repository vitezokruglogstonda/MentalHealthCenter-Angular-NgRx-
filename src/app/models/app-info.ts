export interface AppInfo{
    loginStatus: LoginStatus;
    accountImagePath: String;
    tooltipText: String;
    emailExample: String;
}

export enum LoginStatus{
    Offline,
    Online
}

export enum CardType{
    LogIn,
    AccountInfo
  }
  