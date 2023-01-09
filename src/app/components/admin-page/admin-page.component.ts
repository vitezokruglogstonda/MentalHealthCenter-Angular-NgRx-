import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of, switchMap, take } from 'rxjs';
import { UserListItem } from 'src/app/models/admin';
import { CustomDate, UserType } from 'src/app/models/user';
import { loadUserList } from 'src/app/store/admin/admin.action';
import { selectAllUsers } from 'src/app/store/admin/admin.selector';
import { AppState } from 'src/app/store/app.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  public pageTitle: String;
  public selectedTab: FormControl;
  public allUsersList: UserListItem[];
  public userList: UserListItem[];

  constructor(private store: Store<AppState>) {
    this.pageTitle = "";
    this.selectedTab = new FormControl(0);
    this.allUsersList = [];
    this.userList = [];
  }

  ngOnInit(): void {
    this.pageTitle = environment.admin_page_title;
    this.store.dispatch(loadUserList());
    this.store.select(selectAllUsers).subscribe((state) => {
      state.forEach(el => {
        if (el) {
          this.allUsersList.push(el);
          this.userList.push(el);
        }
      })
      if (this.allUsersList.length > 3) {
        let footer = document.querySelector(".footer1");
        footer?.classList.add("footer2");
      }
    });
  }

  tabChange(index: number) {
    // this.selectedTab.setValue(index);
    // let footer = document.querySelector(".footer1");
    // if(index === 0){
    //   footer?.classList.remove("footer2");
    // }else if(index === 1){
    //   footer?.classList.add("footer2");
    // }
  }

  calculateAge(birthDate: CustomDate): String {
    let patientAge: number = 0;
    let currentDate: Date = new Date();
    let splitedDate: String[] = currentDate.toLocaleDateString().split("/");
    patientAge = Number(splitedDate[2]) - birthDate.year;
    if (Number(splitedDate[0]) < birthDate.month || (Number(splitedDate[0]) === birthDate.month && Number(splitedDate[1]) < birthDate.day)) {
      patientAge--;
    }
    if (patientAge < 0)
      patientAge = 0;
    return patientAge.toString();
  }

  findUserById(id: number): UserListItem {
    // return this.store.select(selectAllUsers).pipe(
    //   switchMap((users)=>{
    //     return of(users.find(el => el?.id === id))
    //   })
    // );
    return this.allUsersList.find(el => el?.id === id) as UserListItem;
  }
  getUserType(i: number): string {
    return UserType[i];    
  }

}
