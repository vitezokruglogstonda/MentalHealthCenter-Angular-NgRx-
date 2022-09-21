import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginStatus } from 'src/app/models/account-info';
import { selectAccountInfo } from 'src/app/store/account/account.selector';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-account-icon',
  templateUrl: './account-icon.component.html',
  styleUrls: ['./account-icon.component.scss'],

})
export class AccountIconComponent implements OnInit {

  public iconPath : String;
  public tooltipText: String;
  public tooltipPosition: String;
  public showCard: boolean;
  constructor(private store: Store<AppState>) {
    this.iconPath = "";
    this.tooltipText = "";
    this.tooltipPosition = "";
    this.showCard = false;
  }

  ngOnInit(): void {
    this.store.select(selectAccountInfo).subscribe((state) => {
      this.iconPath = state.accountIcon;
      this.tooltipText = state.tooltipText;
    });
  }

  toggleCard(){
    if(this.showCard === true){
      this.showCard = false;
    }
    else
    {
      this.showCard = true;
      //ako je ulogovan da prikazuje login-card
      //ako nije logout-card
    }
  }

}
