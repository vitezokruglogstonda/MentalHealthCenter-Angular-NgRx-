import { Component, OnInit } from '@angular/core';
import { TherapistsPatientListItem } from 'src/app/models/therapist';

@Component({
  selector: 'app-schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.scss']
})
export class ScheduleCardComponent implements OnInit {

  public date: String;
  public appointments: Array<[String, TherapistsPatientListItem]>;

  constructor() {
    this.date = "";
    this.appointments = [];
  }

  ngOnInit(): void {
  }

}
