export interface SidenavInfo{
    //itemsList: Array<String>;
    itemsList: SidenavListItem[];
}

export interface SidenavListItem{
    title: String;
    route: String;
}