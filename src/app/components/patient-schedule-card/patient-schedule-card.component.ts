import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { TherapistsPatientListItem, TherapistsScheduleListItem } from 'src/app/models/therapist';
import { CustomDate } from 'src/app/models/user';
import { AppState } from 'src/app/store/app.state';
import { selectScheduleByDate } from 'src/app/store/patient/patient.selector';
import { loadTherapistsScheduleForDate } from 'src/app/store/therapist/therapist.action';
import { selectTherapistsPatient, selectTherapistsScheduleListByDate } from 'src/app/store/therapist/therapist.selector';
import { environment } from 'src/environments/environment';

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
  public appointments: Array<boolean>;

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
      this.appointments.push(false);
    });
    //this.dateString = this.convertDate(this.date as Date);
    this.fillSchedule();
  }

  ngOnChanges(){
    this.appointments.splice(0, this.appointments.length);
    environment.day_schadule.forEach(label => {
      this.appointments.push(false);
    });
    this.fillSchedule();
  }

  headerText(): string{
    return this.dateString as string;
  }

  fillSchedule(){

    this.dateString = this.convertDate(this.date as Date);
    
    //pozovi novi selektor od pacijenta, pribavi termine, i stavi bool-ove u listu (appointments) po njima
    //na osnovu te liste checkboxovi ce da budu omoguceni ili onemoguceni
      //mozda ne checkboxovi, nego dugmad

    //lista appointments da bude tuple [boolean,boolean] da bi mogao da razlikuje sopstvena zakazivanja od tudjih
    //da u parent komponenti pribavlja listu sa sopstvenim vec zakazanim terminima, koju prosledjuje child komponenti
      //ili da ovo pamti u store-u
    //zakazivanje i otkazivanje termina preko chips-a

    this.store.select(selectScheduleByDate(this.dateString)).subscribe((state) => {
      state?.forEach(schedule => {
        this.appointments[schedule.appointmentNumber] = true;
      })
    });
  }

  convertDate(dateObject: Date) : string{
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

}
