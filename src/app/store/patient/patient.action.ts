import { createAction, props } from "@ngrx/store";
import { ScheduleDto, TherapistListItem } from "src/app/models/patient";

export const loadTherapistList = createAction("Load Therapist List");
export const loadTherapistListSuccess = createAction("Load Therapist List - Success", props<{items: TherapistListItem[]}>());
export const chooseTherapist = createAction("Choose Therapist", props<{patientId: number, therapistId: number}>());
export const loadTherapistSchedule = createAction("Load Therapist Schedule", props<{patientId: number, therapistId: number}>());
export const loadTherapistScheduleSuccess = createAction("Load Therapist Schedule - Success", props<{schedule: ScheduleDto[]}>());
export const makeAnAppointment = createAction("Make An Appointment", props<{patientId: number, therapistId: number, date: string, appointmentNumber: number}>());
export const makeAnAppointmentSuccess = createAction("Make An Appointment - Success", props<{scheduleDto: ScheduleDto}>());
export const cancelAppointment = createAction("Cancel An Appointment", props<{scheduleId: number}>());
export const cancelAppointmentSuccess = createAction("Cancel An Appointment - Success", props<{scheduleId: number}>());