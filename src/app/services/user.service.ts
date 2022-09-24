import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { LoginDto, User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class UserService{

    constructor(private http: HttpClient){}

    // logIn(loginDto: LoginDto): Observable<User[]>{
    //     let querry: String = `users/?email=${loginDto.email}&password=${loginDto.password}`;
    //     return this.http.get<User[]>(environment.json_server_url+querry);
    // }

    logIn(loginDto: LoginDto): Observable<User[]>{
        let querry: String = `users/?email=${loginDto.email}&password=${loginDto.password}`;
        return this.http.get<User[]>(environment.json_server_url+querry);
    }
}