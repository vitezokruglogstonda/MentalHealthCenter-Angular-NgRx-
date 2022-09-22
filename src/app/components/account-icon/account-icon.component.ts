import { Component, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardType, LoginStatus } from 'src/app/models/app-info';
import { selectAppInfo } from 'src/app/store/app/app.selector';
import { AppState } from 'src/app/store/app.state';
import { EventEmitter } from "@angular/core"
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-account-icon',
  templateUrl: './account-icon.component.html',
  styleUrls: ['./account-icon.component.scss'],

})
export class AccountIconComponent implements OnInit {

  public iconPath : String;
  public tooltipText: String;
  public tooltipPosition: String;
  private showCard: [boolean, CardType];  
  @Output() emitter: EventEmitter<[boolean, CardType]>;

  constructor(private store: Store<AppState>) {
    this.iconPath = "";
    this.tooltipText = "";
    this.tooltipPosition = "";
    this.showCard = [false, CardType.LogIn];
    this.emitter = new EventEmitter<[boolean, CardType]>();
  }

  ngOnInit(): void {
    this.store.select(selectAppInfo).subscribe((state) => {
      this.iconPath = state.accountImagePath;
      this.tooltipText = state.tooltipText;
    });
  }

  toggleCard(){
    if(this.showCard[0] === true){
      this.showCard[0] = false;
      this.emitter.emit(this.showCard);
    }
    else
    {
      this.showCard[0] = true;
      this.store.select(selectAppInfo).subscribe((state) => {
        if(state.loginStatus === LoginStatus.Offline){
          this.showCard[1] = CardType.LogIn;
        }
        else
        {
          this.showCard[1] = CardType.AccountInfo;
        }
        this.emitter.emit(this.showCard);
      });
    }
  }

}

