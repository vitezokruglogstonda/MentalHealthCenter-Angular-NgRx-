import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { SidenavListItem } from "../models/sidenav-info";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) { }

    getSidenavItems_offline(): Observable<SidenavListItem[]>{
        let querry: String = `sidenav_items_list`;
        return this.http.get<SidenavListItem[]>(environment.json_server_url + querry);
    }

}