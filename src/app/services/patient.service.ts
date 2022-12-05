import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { ScheduleDto, TherapistDto, TherapistInfoDto, TherapistListItem } from "../models/patient";
import { TherapistsScheduleListItem } from "../models/therapist";
import { User, UserType } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    constructor(private http: HttpClient) { }

    getTherapistList(): Observable<TherapistListItem[]> {
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

    chooseTherapist(patientId: number, therapistId: number): Observable<User> {

        //treba 1 poziv, server radi sve ovo, samo prosledi id-eve

        let querry: String = `users/${patientId}`;
        return this.http.get<User>(environment.json_server_url + querry).pipe(
            switchMap((user: User) => {
                let newVersion: User = {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    birthDate: user.birthDate,
                    gender: user.gender,
                    phoneNumber: user.phoneNumber,
                    password: user.password,
                    JWT: user.JWT,
                    userType: user.userType,
                    profilePicturePath: user.profilePicturePath,
                    therapistID: therapistId,
                    note: user.note,
                    description: user.description
                };
                return this.http.put<User>(environment.json_server_url + querry, newVersion).pipe(
                    switchMap((user: User) => {
                        return of(user);
                    })
                );
            })
        )



    }

    loadTherapist(therapistId: number): Observable<TherapistDto> {

        //server treba da proverava da li datum nije prosao (ako je prosao onda ga ne salje)

        let resultDto: TherapistDto;
        let therapistInfo: TherapistInfoDto;
        let schedule: ScheduleDto[];
        let querry: String = `users/${therapistId}`;
        return this.http.get<User>(environment.json_server_url + querry).pipe(
            switchMap((user: User) => {
                therapistInfo = {
                    id: user.id as number,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    profilePicturePath: user.profilePicturePath,
                    gender: user.gender,
                    description: user.description
                };
                let schedule_querry = `schedule/?therapistId=${therapistId}`;
                return this.http.get<TherapistsScheduleListItem[]>(environment.json_server_url + schedule_querry).pipe(
                    switchMap((schedules: TherapistsScheduleListItem[]) => {
                        schedule = [];
                        schedules.forEach((el: TherapistsScheduleListItem) => {
                            schedule.push({
                                date: el.date,
                                appointmentNumber: el.appointmentNumber
                            })
                        });
                        resultDto = {
                            therapistInfo: therapistInfo,
                            schedule: schedule
                        }
                        return of(resultDto);
                    })
                )
            })
        )
    }

}