import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ofType } from "@ngrx/effects";
import { onRunEffectsKey } from "@ngrx/effects/src/lifecycle_hooks";
import { Observable, of, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { UserListItem } from "../models/admin";
import { User, UserType } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    constructor(private http: HttpClient) { }

    getUserList(): Observable<UserListItem[]>{
        let querry: String = `users`;
        return this.http.get<User[]>(environment.json_server_url + querry).pipe(
            switchMap((userList: User[]) => {
                let users: UserListItem[] = [];
                userList.forEach((el: User) => {
                    if(el.userType!=UserType.Admin){
                        let user: UserListItem = {
                            id: el.id,
                            email: el.email,
                            firstName: el.firstName,
                            lastName: el.lastName,
                            birthDate: el.birthDate,
                            gender: el.gender,
                            userType: el.userType,
                            phoneNumber: el.phoneNumber,
                            profilePicturePath: el.profilePicturePath,
                            therapistID: el.therapistID,
                            description: el.description
                        };
                        users.push(user);
                    }
                })
                return of(users);
            })
        )
    }

    deleteUser(userId: number): Observable<number>{
        let querry: String = `users/${userId}`;
        //console.log(querry)
        return this.http.delete(environment.json_server_url+querry).pipe(
            switchMap(()=> {
                return of(userId)}
            )
        );
    }

}