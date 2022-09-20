export interface AccountInfo{
    loginStatus: LoginStatus;
    accountIcon: String;
    tooltipText: String;
}

export enum LoginStatus{
    SignedOut,
    LogedIn
}