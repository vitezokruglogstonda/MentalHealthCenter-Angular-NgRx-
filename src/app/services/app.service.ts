import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ofType } from "@ngrx/effects";
import { Observable, of, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { HelpCallStatus } from "../models/app-info";
import { HelpCallListItem } from "../models/help-call-dto";
//import { helpCallDto, Quote } from "../models/home-page-objects";
import { Quote } from "../models/home-page-objects";
import { SidenavListItem } from "../models/sidenav-info";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) { }

    getSidenavItems_offline(): Observable<SidenavListItem[]> {
        let querry: String = `sidenav_items_list`;
        return this.http.get<SidenavListItem[]>(environment.json_server_url + querry);
    }

    getUserQuotes(): Observable<Quote[]> {
        let querry: String = `userQuotes`;
        return this.http.get<Quote[]>(environment.json_server_url + querry);
    }

    helpCallRequest(name: String, phone: String): Observable<HelpCallStatus> {
        let querryCheck: String = `helpCalls/?guestPhoneNumber=${phone}&processed=false`;
        return this.http.get<HelpCallListItem[]>(environment.json_server_url + querryCheck).pipe(
            switchMap((response) => {
                let responseObject: HelpCallListItem = response[0];
                if (responseObject) {
                    return of(HelpCallStatus.Pending);
                } else {
                    let dto: HelpCallListItem = {
                        id: null,
                        guestName: name,
                        guestPhoneNumber: phone,
                        processed: false
                    };
                    let querryPost: String = `helpCalls`;
                    return this.http.post<HelpCallListItem>(environment.json_server_url + querryPost, dto).pipe(
                        switchMap(()=>{
                            return of(HelpCallStatus.Requested);
                        })
                    );
                }                
            })
        );
    }

}