import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TherapistListItem } from "../models/patient";
import { User, UserType } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    constructor(private http: HttpClient) { }

    getTherapistList(): Observable<TherapistListItem[]>{
        let querry: String = `users/?userType=${UserType.Therapist}`;
        return this.http.get<User[]>(environment.json_server_url + querry).pipe(
            map((userList: User[]) => {
                let therapists: TherapistListItem[] = [];
                userList.forEach((el: User) => {
                    let therapist: TherapistListItem = {
                        id: el.id,
                        email: el.email,
                        firstName: el.firstName,
                        lastName: el.lastName,
                        gender: el.gender,
                        phoneNumber: el.phoneNumber,
                        profilePicturePath: el.profilePicturePath,
                        description: el.description
                    };
                    therapists.push(therapist);
                })
                return therapists;
            })
        )
    }

}