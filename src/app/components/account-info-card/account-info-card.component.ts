import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
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

  constructor(private store: Store<AppState>) {
    this.accountImagePath = "";
    this.userName = "";
    this.email = "";
  }

  ngOnInit(): void {
    this.store.select(selectUserInfo).subscribe((state) => {
      this.accountImagePath = state.profilePicturePath;
      this.userName = state.userName;
      this.email = state.email;
    });
  }

}
