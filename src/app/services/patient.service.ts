import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { ScheduleDto, TherapistListItem } from "../models/patient";
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

    loadTherapistSchedule(patientId: number, therapistId: number): Observable<ScheduleDto[]> {

        //server treba da proverava da li datum nije prosao (ako je prosao onda ga ne salje)

        // let resultDto: any;
        // let therapistInfo: TherapistInfoDto;
        // let schedule: ScheduleDto[];
        // let querry: String = `users/${therapistId}`;
        // return this.http.get<User>(environment.json_server_url + querry).pipe(
        //     switchMap((user: User) => {
        //         therapistInfo = {
        //             id: user.id as number,
        //             email: user.email,
        //             firstName: user.firstName,
        //             lastName: user.lastName,
        //             profilePicturePath: user.profilePicturePath,
        //             gender: user.gender,
        //             description: user.description
        //         };
        //         let schedule_querry = `schedule/?therapistId=${therapistId}`;
        //         return this.http.get<TherapistsScheduleListItem[]>(environment.json_server_url + schedule_querry).pipe(
        //             switchMap((schedules: TherapistsScheduleListItem[]) => {
        //                 schedule = [];
        //                 schedules.forEach((el: TherapistsScheduleListItem) => {
        //                     let usersApp: boolean = false;
        //                     if(el.patientId === patientId){
        //                         usersApp = true;
        //                     }
        //                     schedule.push({
        //                         date: el.date,
        //                         appointmentNumber: el.appointmentNumber,
        //                         usersAppointment: usersApp
        //                     })
        //                 });
        //                 resultDto = {
        //                     therapistInfo: therapistInfo,
        //                     schedule: schedule
        //                 }
        //                 return of(resultDto);
        //             })
        //         )
        //     })
        // )

        let schedule: ScheduleDto[] = [];
        let querry = `schedule/?therapistId=${therapistId}`;
        return this.http.get<TherapistsScheduleListItem[]>(environment.json_server_url + querry).pipe(
            switchMap((schedules: TherapistsScheduleListItem[]) => {
                schedules.forEach((el: TherapistsScheduleListItem) => {
                    let usersApp: boolean = false;
                    if (el.patientId === patientId) {
                        usersApp = true;
                    }
                    schedule.push({
                        id: el.id,
                        date: el.date,
                        appointmentNumber: el.appointmentNumber,
                        usersAppointment: usersApp
                    })
                });
                return of(schedule);
            })
        )
    }

    makeAnAppointment(patientId: number, therapistId: number, date: string, appointmentNumber: number): Observable<ScheduleDto> {
        let querry: String = `schedule`;
        let scheduleObject: TherapistsScheduleListItem = {
            id: null,
            therapistID: therapistId,
            date: date,
            appointmentNumber: appointmentNumber,
            patientId: patientId
        };
        let result: ScheduleDto;
        return this.http.post<TherapistsScheduleListItem>(environment.json_server_url + querry, scheduleObject).pipe(
            switchMap((resultDto: TherapistsScheduleListItem) => {
                result = {
                    id: resultDto.id,
                    date: date,
                    appointmentNumber: appointmentNumber,
                    usersAppointment: true
                }
                return of(result); 
            })
        );
    }

    cancelAnAppointment(scheduleId: number): Observable<number>{
        let querry: String = `schedule/${scheduleId}`;
        return this.http.delete(environment.json_server_url + querry).pipe(
            switchMap(() => {
                return of (scheduleId);
            })
        );
    }

}