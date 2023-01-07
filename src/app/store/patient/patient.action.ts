import { createAction, props } from "@ngrx/store";
import { TherapistDto, TherapistListItem } from "src/app/models/patient";

export const loadTherapistList = createAction("Load Therapist List");
export const loadTherapistListSuccess = createAction("Load Therapist List - Success", props<{items: TherapistListItem[]}>());
export const chooseTherapist = createAction("Choose Therapist", props<{patientId: number, therapistId: number}>());
export const loadTherapist = createAction("Load Therapist", props<{patientId: number, therapistId: number}>());
export const loadTherapistSuccess = createAction("Load Therapist", props<{therapist: TherapistDto}>());
export const makeAnAppointment = createAction("Make An Appointment", props<{patientId: number, therapistId: number, date: string, appointmentNumber: number}>());
export const makeAnAppointmentSuccess = createAction("Make An Appointment - Success", props<{patientId: number, therapistId: number, date: string, appointmentNumber: number, usersAppointment: boolean}>());