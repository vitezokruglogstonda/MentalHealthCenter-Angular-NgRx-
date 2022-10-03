import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { signOut } from 'src/app/store/user/user.action';
import { selectUserInfo } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-account-info-card',
  templateUrl: './account-info-card.component.html',
  styleUrls: ['./account-info-card.component.scss']
})
export class AccountInfoCardComponent implements OnInit {

  public accountImagePath: String;
  public userName: String;
  public email: String;
  @Output() loginCardEmitter: EventEmitter<boolean>;

  constructor(private store: Store<AppState>, private elRef: ElementRef) {
    this.accountImagePath = "";
    this.userName = "";
    this.email = "";
    this.loginCardEmitter = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.store.select(selectUserInfo).subscribe((state) => {
      this.accountImagePath = state.profilePicturePath;
      this.userName = `${state.firstName} ${state.lastName}`;
      this.email = state.email;
    });
  }

  signOut(){
    this.store.dispatch(signOut());
    //bez online property-ja u objektu
    //ne obraca se serveru
    //akcija direktno triggeruje reducer koji brise obj iz store-a i menja stanje appInfo
      //(2 reducera ga hvataju)
  }

  @HostListener('document:click', ['$event'])
  hideCard(){
    let card: any = (<HTMLElement>this.elRef.nativeElement).querySelector(".card-container");
    let icon: any = (document).querySelector(".icon-container");
    if(event && card && icon){
      if(!card.contains(event.target) && !icon.contains(event.target)){
        this.loginCardEmitter.emit(true);
      }
    }
  }

}
