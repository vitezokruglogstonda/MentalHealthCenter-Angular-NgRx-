import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TherapistsPatientListItem, TherapistsScheduleListItem } from "../models/therapist";
import { User, UserType } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class TherapistService {

    constructor(private http: HttpClient) { }

    getPatientList(therapistId: number): Observable<TherapistsPatientListItem[]> {
        let querry: String = `users/?userType=${UserType.Patient}&therapistID=${therapistId}`;
        return this.http.get<User[]>(environment.json_server_url + querry).pipe(
            map((userList: User[]) => {
                let patients: TherapistsPatientListItem[] = [];
                userList.forEach((el: User)=>{
                    let patient: TherapistsPatientListItem = {
                        id: el.id,
                        email: el.email,
                        firstName: el.firstName,
                        lastName: el.lastName,
                        birthDate: el.birthDate,
                        gender: el.gender,
                        phoneNumber: el.phoneNumber,
                        profilePicturePath: el.profilePicturePath
                    };
                    patients.push(patient);
                })
                return patients;
            })
        );
    }

    getSchedule(therapistId: number, date: String): Observable<TherapistsScheduleListItem[]>{
        let querry: String = `scadule/?therapistID=${therapistId}&date=${date}`;
        return this.http.get<TherapistsScheduleListItem[]>(environment.json_server_url + querry);
    }

}