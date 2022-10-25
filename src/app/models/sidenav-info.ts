import { EntityState } from "@ngrx/entity";

export interface SidenavListItem{
    id: number;
    title: String;
    route: String;
}

export interface SidenavInfoState extends EntityState<SidenavListItem>{

}