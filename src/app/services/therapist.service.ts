import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, Subject, switchMap, take } from "rxjs";
import { environment } from "src/environments/environment";
import { TherapistsPatientListItem, TherapistsScheduleListItem } from "../models/therapist";
import { User, UserType } from "../models/user";

interface Note {
    id: number;
    patientId: number;
    note: String;
}

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
                userList.forEach((el: User) => {
                    let patient: TherapistsPatientListItem = {
                        id: el.id,
                        email: el.email,
                        firstName: el.firstName,
                        lastName: el.lastName,
                        birthDate: el.birthDate,
                        gender: el.gender,
                        phoneNumber: el.phoneNumber,
                        profilePicturePath: el.profilePicturePath,
                        note: el.note
                    };
                    patients.push(patient);
                })
                return patients;
            })
        );
    }

    updateNoteForPatient(patientId: number, note: String): Observable<TherapistsPatientListItem> {

        //ovo bi trebalo server da radi (preradi u jednostavnije)

        let querry: String = `users/?userType=${UserType.Patient}&id=${patientId}`;
        return this.http.get<User[]>(environment.json_server_url + querry).pipe(
            switchMap((users: User[]) => {
                let newVersion: User = {
                    id: users[0].id,
                    email: users[0].email,
                    firstName: users[0].firstName,
                    lastName: users[0].lastName,
                    birthDate: users[0].birthDate,
                    gender: users[0].gender,
                    phoneNumber: users[0].phoneNumber,
                    password: users[0].password,
                    JWT: users[0].JWT,
                    userType: users[0].userType,
                    profilePicturePath: users[0].profilePicturePath,
                    therapistID: users[0].therapistID,
                    note: note,
                    description: users[0].description
                };
                return this.http.put<User[]>(environment.json_server_url + `users/${users[0].id}`, newVersion).pipe(
                    switchMap(() => {
                        let returnObject: TherapistsPatientListItem  = {
                            id: newVersion.id,
                            email: newVersion.email,
                            firstName: newVersion.firstName,
                            lastName: newVersion.lastName,
                            birthDate: newVersion.birthDate,
                            gender: newVersion.gender,
                            phoneNumber: newVersion.phoneNumber,
                            profilePicturePath: newVersion.profilePicturePath,
                            note: newVersion.note
                        }
                        return of(returnObject);
                    })
                );
            })
        )
    }

    getSchedule(therapistId: number, date: String): Observable<TherapistsScheduleListItem[]> {
        let querry: String = `schedule/?therapistID=${therapistId}&date=${date}`;
        return this.http.get<TherapistsScheduleListItem[]>(environment.json_server_url + querry);
    }

}