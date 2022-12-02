import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TherapistListItem } from 'src/app/models/patient';
import { UserType } from 'src/app/models/user';
import { AppState } from 'src/app/store/app.state';
import { loadTherapistList } from 'src/app/store/patient/patient.action';
import { selectTherapistList } from 'src/app/store/patient/patient.selector';
import { selectUserId, selectUserInfo } from 'src/app/store/user/user.selector';
import { environment } from 'src/environments/environment';

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

  constructor(private store: Store<AppState>) { 
    this.pageTitle = "";
    this.patientId = null;
    this.showSchedule = false;
    this.showTherapistList = false;
    this.therapistList = [];
  }

  ngOnInit(): void {
    this.store.select(selectUserInfo).subscribe((state)=>{
      if(state.id !== null){
        this.patientId = state.id;
        if(state.userType === UserType.Patient){
          if(state.therapistID !== null){
            this.displaySchedule();
          }else{
            this.displayTherapistList();
          }
        }
      }
    })
  }

  displayTherapistList(){
    this.pageTitle = environment.patient_page.page_title_chose_therapist;
    this.showSchedule = false;
    this.showTherapistList = true;
    this.store.dispatch(loadTherapistList());
    this.store.select(selectTherapistList).subscribe((state) => {
      state.forEach((el: TherapistListItem | undefined) => {
        this.therapistList.push(el);
      })
    });
  }

  displaySchedule(){
    this.pageTitle = environment.patient_page.page_title_schedule;
    this.showTherapistList = false;
    this.showSchedule = true;
  }


}
