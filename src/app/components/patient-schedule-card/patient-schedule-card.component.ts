import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { TherapistsPatientListItem, TherapistsScheduleListItem } from 'src/app/models/therapist';
import { CustomDate } from 'src/app/models/user';
import { AppState } from 'src/app/store/app.state';
import { selectScheduleByDate, selectTherapistDto } from 'src/app/store/patient/patient.selector';
import { loadTherapistsScheduleForDate } from 'src/app/store/therapist/therapist.action';
import { selectTherapistsPatient, selectTherapistsScheduleListByDate } from 'src/app/store/therapist/therapist.selector';
import { selectUserInfo } from 'src/app/store/user/user.selector';
import { environment } from 'src/environments/environment';
import * as Actions from 'src/app/store/patient/patient.action';
import { ScheduleDto } from 'src/app/models/patient';

@Component({
  selector: 'app-patient-schedule-card',
  templateUrl: './patient-schedule-card.component.html',
  styleUrls: ['./patient-schedule-card.component.scss']
})
export class PatientScheduleCardComponent implements OnInit {

  @Input() date: Date | null;
  public customDate: CustomDate;
  public dateString: String;
  public appointmentsLabel: String[];
  public appointments: boolean[][];

  constructor(private store: Store<AppState>) {
    this.date = null;
    this.customDate = {
      year: 0,
      month: 0,
      day: 0
    };
    this.dateString = "";
    this.appointmentsLabel = [];
    this.appointments = [];
  }

  ngOnInit(): void {
    environment.day_schadule.forEach(label => {
      this.appointmentsLabel.push(label);
      //this.appointments.push([false, false]);
    });
    //this.dateString = this.convertDate(this.date as Date);
    this.fillSchedule();
  }

  ngOnChanges() {
    this.appointments.splice(0, this.appointments.length);
    this.appointments = [];
    // environment.day_schadule.forEach(label => {
    //   this.appointments.push([false, false]);
    // });
    this.fillSchedule();
  }

  headerText(): string {
    return this.dateString as string;
  }

  fillSchedule() {
    this.dateString = this.convertDate(this.date as Date);
    this.store.select(selectScheduleByDate(this.dateString)).subscribe((state) => {  
      if(state){
        environment.day_schadule.forEach((el, i) => {
          let tmpAppointment = state.find(el => el.appointmentNumber===i);
          if(tmpAppointment !== undefined){
            this.appointments.push([true, tmpAppointment.usersAppointment]);
          }else{
            this.appointments.push([false,false]);
          }
        });
      }
    });
  }

  convertDate(dateObject: Date): string {
    let rawStringDate: string = dateObject.toString();
    let rawStringDate_decomposed = rawStringDate?.split(" ", 4);
    if (rawStringDate_decomposed) {
      let _month: number;
      switch (rawStringDate_decomposed[1]) {
        case "Jan": {
          _month = 1;
          break;
        }
        case "Feb": {
          _month = 2;
          break;
        }
        case "Mar": {
          _month = 3;
          break;
        }
        case "Apr": {
          _month = 4;
          break;
        }
        case "May": {
          _month = 5;
          break;
        }
        case "Jun": {
          _month = 6;
          break;
        }
        case "Jul": {
          _month = 7;
          break;
        }
        case "Aug": {
          _month = 8;
          break;
        }
        case "Sep": {
          _month = 9;
          break;
        }
        case "Oct": {
          _month = 10;
          break;
        }
        case "Nov": {
          _month = 11;
          break;
        }
        case "Dec": {
          _month = 12;
          break;
        }
        default: {
          _month = 0;
          break;
        }
      }
      this.customDate = {
        year: Number(rawStringDate_decomposed[3]),
        month: _month,
        day: Number(rawStringDate_decomposed[2])
      }
    }
    return `${this.customDate.day}.${this.customDate.month}.${this.customDate.year}.`
  }

  makeAnAppointment(ev: any) {
    //datum pored app-number, zajedno sa id-em terapeuta i pacijenta
    //menja sadrzaj dugmeta u otkazi (i menja boju)

    //console.log((ev.target as HTMLElement).parentNode);

    let userId: number;
    let therapistID: number;
    let appointmentButton: HTMLElement;
    let tmpAppointmentNumber: Number;
    this.store.select(selectUserInfo).pipe(take(1)).subscribe((state) => {
      userId = state.id as number;
      this.store.select(selectTherapistDto).pipe(take(1)).subscribe((state) => {
        therapistID = state.therapistInfo?.id as number;
        appointmentButton = (ev.srcElement as HTMLElement);
        tmpAppointmentNumber = Number(appointmentButton.id);
        if (appointmentButton.innerHTML === "Free") {
          appointmentButton.innerHTML = "scheduled";
          appointmentButton.classList.add("scheduledButton");
          //zakazivanje
          this.store.dispatch(Actions.makeAnAppointment({ patientId: userId, therapistId: therapistID, date: this.dateString as string, appointmentNumber: tmpAppointmentNumber as number}))
        } else {
          appointmentButton.innerHTML = "Free";
          appointmentButton.classList.remove("scheduledButton");
          //otkazivanje
        }
      }).unsubscribe();
    }).unsubscribe();



  }

}
