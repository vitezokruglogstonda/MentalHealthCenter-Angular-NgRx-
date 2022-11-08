import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { TherapistsPatientListItem, TherapistsScheduleListItem } from 'src/app/models/therapist';
import { CustomDate } from 'src/app/models/user';
import { AppState } from 'src/app/store/app.state';
import { loadTherapistsScheduleForDate } from 'src/app/store/therapist/therapist.action';
import { selectTherapistsScheduleList, selectTherapistsScheduleListByDate } from 'src/app/store/therapist/therapist.selector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.scss']
})
export class ScheduleCardComponent implements OnInit {

  @Input() therapistId: number | null;
  @Input() date: Date | null;
  public customDate: CustomDate;
  public dateString: String;
  public appointments: Array<[String, TherapistsScheduleListItem, TherapistsPatientListItem]>;

  constructor(private store: Store<AppState>) {
    this.therapistId = null;
    this.date = null;
    this.customDate = {
      year: 0,
      month: 0,
      day: 0
    };
    this.dateString = "";
    this.appointments = [];
  }

  ngOnInit(): void {
    this.fillSchedule();
  }

  ngOnChanges(){
    this.fillSchedule();
  }

  fillSchedule(){
    this.dateString = this.convertDate(this.date as Date);
    let dispatched: boolean = false;
    //pokusaj da nadjes vec u store-u, ako nema onda zovi reducer
    this.store.select(selectTherapistsScheduleListByDate(this.dateString)).subscribe((state) => {
      if(state.length !== 0){
        this.appointments.splice(0, this.appointments.length);
        state.forEach((el) => {
          if(el){
            this.appointments.push([environment.day_schadule[el.appointmentNumber], el])
          }
        })
        
      }else if(!dispatched){
        console.log("eo me")
        this.store.dispatch(loadTherapistsScheduleForDate({therapistId: (this.therapistId as number), date: this.dateString}))
        dispatched = true;
      }
    })
    //mozda treba sredjivanje selektora (da ne pribavlja termin po termin, nego po danima)
      //onda to zahteva i promenu listItem-a za state?
    //ako nema objekata u bazi, onda ostaje prazna lista => ne prikazuje nista
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
