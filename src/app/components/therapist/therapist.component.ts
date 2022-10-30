import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCalendar } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import { TherapistsPatientListItem } from 'src/app/models/therapist';
import { CustomDate } from 'src/app/models/user';
import { AppState } from 'src/app/store/app.state';
import { loadTherapistsPatients } from 'src/app/store/therapist/therapist.action';
import { selectTherapistsPatientList } from 'src/app/store/therapist/therapist.selector';
import { selectUserId } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-therapist',
  templateUrl: './therapist.component.html',
  styleUrls: ['./therapist.component.scss']
})
export class TherapistComponent implements OnInit {

  public therapistId: number | null;
  public patientList: (TherapistsPatientListItem | undefined)[];
  public selected = new FormControl(0);

  constructor(private store: Store<AppState>) { 
    this.therapistId = null;
    this.patientList = [];
  }

  ngOnInit(): void {
    this.store.select(selectUserId).subscribe((state)=>{
      this.therapistId = state;
    })
    this.store.dispatch(loadTherapistsPatients({therapistId: (this.therapistId as number)}));
    this.store.select(selectTherapistsPatientList).subscribe((state) => {
      state.forEach((el: TherapistsPatientListItem | undefined) => {
        this.patientList.push(el);
      })
    });
    // this.calendar.selectedChange.subscribe(x => {
    //   console.log(x);
    // });
  }

  tabChange(index: number){
    this.selected.setValue(index);
    let footer = document.querySelector(".footer1");
    if(index === 0){
      footer?.classList.remove("footer2");
    }else if(index === 1){
      footer?.classList.add("footer2");
    }
  }

  calculateAge(birthDate : CustomDate): String{
    let patientAge: number = 0;
    let currentDate: Date = new Date();
    let splitedDate: String[] =  currentDate.toLocaleDateString().split("/");
    patientAge = Number(splitedDate[2]) - birthDate.year;
    if(Number(splitedDate[0]) < birthDate.month || (Number(splitedDate[0]) === birthDate.month && Number(splitedDate[1]) < birthDate.day)){
      patientAge--;
    }
    if(patientAge < 0)
      patientAge = 0;
    return patientAge.toString();
  }



}
