import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TherapistDto, TherapistListItem } from 'src/app/models/patient';
import { UserType } from 'src/app/models/user';
import { AppState } from 'src/app/store/app.state';
import { chooseTherapist, loadTherapistList } from 'src/app/store/patient/patient.action';
import { selectTherapistDto, selectTherapistList } from 'src/app/store/patient/patient.selector';
import { selectUserId, selectUserInfo } from 'src/app/store/user/user.selector';
import { environment } from 'src/environments/environment';

import * as PatientActions from 'src/app/store/patient/patient.action';
import { take } from 'rxjs';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  public pageTitle: String;
  public patientId: number | null;
  public showTherapistList: boolean;
  public showSchedule: boolean;
  public therapistList: (TherapistListItem | undefined)[];
  public itemExpanded: number;
  public therapistDto: TherapistDto | null;
  public selectedDate: Date | null;
  public upcomingScheduleDate: Date;
  public occupiedDates: Date[];

  constructor(private store: Store<AppState>) {
    this.pageTitle = "";
    this.patientId = null;
    this.showSchedule = false;
    this.showTherapistList = false;
    this.therapistList = [];
    this.itemExpanded = 0;
    this.therapistDto = null;
    this.selectedDate = new Date();
    this.upcomingScheduleDate = new Date();
    this.occupiedDates = [];
  }

  ngOnInit(): void {
    this.store.select(selectUserInfo).subscribe((state) => {
      if (state.id !== null) {
        this.patientId = state.id;
        if (state.userType === UserType.Patient) {
          if (state.therapistID !== null) {
            this.displaySchedule(state.therapistID);
          } else {
            this.displayTherapistList();
          }
        }
      }
    })
    this.upcomingScheduleDate = this.getUpcomingSchaduleDate();
    this.selectedDate = this.upcomingScheduleDate;
  }

  displayTherapistList() {
    this.pageTitle = environment.patient_page.page_title_chose_therapist;
    this.showSchedule = false;
    this.showTherapistList = true;
    this.store.dispatch(PatientActions.loadTherapistList());
    this.store.select(selectTherapistList).subscribe((state) => {
      state.forEach((el: TherapistListItem | undefined) => {
        this.therapistList.push(el);
      })
    });
  }

  displaySchedule(therapistId: number) {
    this.pageTitle = environment.patient_page.page_title_schedule;
    this.showTherapistList = false;
    this.showSchedule = true;
    let footer = document.querySelector(".footer1");
    footer?.classList.add("footer2");
    this.store.dispatch(PatientActions.loadTherapist({ therapistId }));
    this.store.select(selectTherapistDto).subscribe((state) => {
      this.therapistDto = {...state};
    })
  }

  filterCalendar = (d: Date): boolean => {
    if(this.therapistDto?.schedule?.length !== 0){      
      this.findOccupiedDates();
    }
    //let time: string = d.toUTCString();
    let fullSchedule: Date | undefined = this.occupiedDates.find(el => {
      console.log(el.getDay())
      if(el.getDay() === d.getDay())
        if(el.getMonth() === d.getMonth())
          if(el.getFullYear() === d.getFullYear())
            return true;
      return false;
    });
    //console.log("OCCUPIED: ", fullSchedule)
    if(fullSchedule){
      return false;
    }
    let rawStringDate: string = d.toString();
    let rawStringDate_decomposed: string[] = rawStringDate?.split(" ", 4);
    let dayOfWeek: number;
    switch (rawStringDate_decomposed[0]) {
      case "Sat": {
        dayOfWeek = 6;
        break;
      }
      case "Sun": {
        dayOfWeek = 7;
        break;
      }
      default: {
        dayOfWeek = 0;
        break;
      }
    }
    if (dayOfWeek === 6 || dayOfWeek === 7)
      return false;
    return true;
  }

  findOccupiedDates(){
    console.log("EO ME", this.therapistDto)
    this.occupiedDates.splice(0, this.occupiedDates.length);
    let scheduleCounter: [String, number][] = [];
    let tmp: [String, number] | undefined;
    this.therapistDto?.schedule?.forEach(sch => {
      tmp = scheduleCounter.find(el => el[0] === sch.date);
      if(tmp){
        let index = scheduleCounter.indexOf(tmp);
        if(scheduleCounter[index][1] < environment.day_schadule.length){
          scheduleCounter[index][1]++;
        }
      }else{
        scheduleCounter.push([sch.date, 1]);
      }
    })
    scheduleCounter.filter(el => el[1] === environment.day_schadule.length).forEach(el => {
      let splited: string[] = el[0].split(".", 3);
      this.occupiedDates.push(new Date(`${splited[1]}/${splited[0]}/${splited[2]}`));
    })
  }

  getUpcomingSchaduleDate(): Date {
    let returnDate: Date = new Date();
    let dayIncrement;
    if (this.selectedDate) {
      let rawStringDate: string = this.selectedDate?.toString();
      let rawStringDate_decomposed: string[] = rawStringDate?.split(" ", 4);
      switch (rawStringDate_decomposed[0]) {
        case "Sat": {
          dayIncrement = 2;
          break;
        }
        case "Sun": {
          dayIncrement = 1;
          break;
        }
        default: {
          dayIncrement = 0;
          break;
        }
      }
    }
    returnDate.setDate(returnDate.getDate() + (dayIncrement as number));
    return returnDate;
  }

  expandItem() {
    if (this.itemExpanded === 0) {
      let footer = document.querySelector(".footer1");
      footer?.classList.add("footer2");
    }
    this.itemExpanded++;
  }

  shrinkItem() {
    this.itemExpanded--;
    if (this.itemExpanded === 0) {
      let footer = document.querySelector(".footer1");
      footer?.classList.remove("footer2");
    }
  }

  chooseTherapist(ev: Event) {
    let index: number = Number((ev.target as HTMLElement).parentElement?.id);
    this.store.dispatch(PatientActions.chooseTherapist({ patientId: this.patientId as number, therapistId: index }));
  }

}
