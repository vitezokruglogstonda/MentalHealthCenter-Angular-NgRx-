export interface AppInfo{
    loginStatus: LoginStatus;
    accountImagePath: String;
    tooltipText: String;
    emailExample: String;
    loginError: boolean;
    registerError: boolean;
    emailTaken: boolean;
}

export enum LoginStatus{
    Offline,
    Online
}

export enum CardType{
    LogIn,
    AccountInfo
  }
  