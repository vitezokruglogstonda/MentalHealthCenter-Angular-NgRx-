import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { LoginDto, RegisterDto, User, CustomDate, UserType } from "../models/user";
import * as UserActions from "../store/user/user.action";
import * as AppActions from "../store/app/app.action";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    // logIn(loginDto: LoginDto): Observable<User[]>{
    //     let querry: String = `users/?email=${loginDto.email}&password=${loginDto.password}`;
    //     return this.http.get<User[]>(environment.json_server_url+querry);
    // }

    logIn(loginDto: LoginDto): Observable<User[]> {
        let querry: String = `users/?email=${loginDto.email}&password=${loginDto.password}`;
        return this.http.get<User[]>(environment.json_server_url + querry);
    }

    register(registerDto: RegisterDto): Observable<User[]> {

        let newAccount: User | null = null;
        if(registerDto.birthDate){
            newAccount = {
                id: null,
                email: registerDto.email,
                firstName: registerDto.firstName,
                lastName: registerDto.lastName,
                birthDate: registerDto.birthDate,
                gender: registerDto.userGender,
                phoneNumber: registerDto.phoneNumber,
                JWT: "",
                userType: UserType.Patient,
                profilePicturePath: environment.account_icon_basic_URL,
                password: registerDto.password,
                therapistID: null,
                note: ""
            }
        }
        let registerQuerry: String = `users`;
        let logInQuerry: String = `users/?email=${registerDto.email}&password=${registerDto.password}`;
        return this.http.post(environment.json_server_url + registerQuerry, newAccount).pipe( 
            switchMap(()=>
               {return this.http.get<User[]>(environment.json_server_url+logInQuerry);}
            )
        );
    }

    findUserByMail(email: String): Observable<User[]>{
        let querry: String = `users/?email=${email}`;
        return this.http.get<User[]>(environment.json_server_url + querry);
    }

}