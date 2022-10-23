import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, switchMap, take } from "rxjs";
import { environment } from "src/environments/environment";
import { HelpCallListItem } from "../models/help-call-dto";

@Injectable({
    providedIn: 'root'
})
export class OperatorService {

    constructor(private http: HttpClient) { }

    getHelpCallRequests(): Observable<HelpCallListItem[]>{
        let querry: String = `helpCalls/?processed=${false}`;
        return this.http.get<HelpCallListItem[]>(environment.json_server_url + querry);
    }

    finishHelpCallRequest(requestId: string): Observable<boolean>{
        let getQuerry: String = `helpCalls/?id=${requestId}`;
        return this.http.get<HelpCallListItem[]>(environment.json_server_url + getQuerry).pipe(
            take(1),
            switchMap((obj: HelpCallListItem[])=>{
                let putQuerry: String = `helpCalls/${requestId}`;
                let newVersion: HelpCallListItem = {
                    id: obj[0].id,
                    guestName: obj[0].guestName,
                    guestPhoneNumber: obj[0].guestPhoneNumber,
                    processed: true
                }
                return this.http.put(environment.json_server_url + putQuerry, newVersion).pipe(
                    switchMap(()=>{
                        return of(true);
                    })
                );
            })
        );
    }

}