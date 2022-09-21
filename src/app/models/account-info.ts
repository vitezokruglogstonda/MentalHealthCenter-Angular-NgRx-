export interface AccountInfo{
    loginStatus: LoginStatus;
    accountIcon: String;
    tooltipText: String;
    emailExample: String;
}

export enum LoginStatus{
    SignedOut,
    LogedIn
}