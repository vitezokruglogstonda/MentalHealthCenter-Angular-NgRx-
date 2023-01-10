import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of, switchMap, take } from 'rxjs';
import { UserListItem } from 'src/app/models/admin';
import { CustomDate, UserType } from 'src/app/models/user';
import { deleteUser, loadUserList } from 'src/app/store/admin/admin.action';
import { selectAllUsers } from 'src/app/store/admin/admin.selector';
import { AppState } from 'src/app/store/app.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  animations: [
    trigger("item-fade-out", [
      transition(":leave",
        animate(`${environment.operator_dashboard.request_list_animation_duration}s 0s ease`, style({
          opacity: 0,
          backgroundColor: 'white'
        }))
      )
    ])
  ]
})
export class AdminPageComponent implements OnInit {

  public pageTitle: String;
  public selectedTab: FormControl;
  public allUsersList: UserListItem[];
  public userList: UserListItem[];
  public listItems: boolean[];
  public userTypes: string[];
  public selectedUserType: string;
  public userSearchString: string;

  constructor(private store: Store<AppState>) {
    this.pageTitle = "";
    this.selectedTab = new FormControl(0);
    this.allUsersList = [];
    this.userList = [];
    this.listItems = [];
    this.userTypes = [];
    this.selectedUserType = "All";
    this.userSearchString = "";
  }

  ngOnInit(): void {
    this.pageTitle = environment.admin_page_title;
    this.userTypes.push("All");
    Object.keys(UserType).filter((v) => isNaN(Number(v))).forEach(type => {
      if(type !== "Guest" && type !== "Admin")
        this.userTypes.push(type);
    });
    this.store.dispatch(loadUserList());
    this.store.select(selectAllUsers).subscribe((state) => {
      this.allUsersList.splice(0, this.allUsersList.length);
      this.userList.splice(0, this.userList.length);
      this.listItems.splice(0, this.listItems.length);
      state.forEach(el => {
        if (el) {
          this.allUsersList.push(el);
          this.userList.push(el);
          this.listItems.push(true);
        }
      })
      if (this.allUsersList.length > 3) {
        let footer = document.querySelector(".footer1");
        footer?.classList.add("footer2");
      }
    });
  }

  typeChange(){
    //console.log(this.selectedUserType)
    this.userList.splice(0, this.userList.length);
    if(this.selectedUserType === "All"){
      this.allUsersList.forEach(el => this.userList.push(el))
    }else{
      this.allUsersList.filter(el => UserType[el.userType] === this.selectedUserType).forEach(el => this.userList.push(el))
    }
  }

  findUser(){
    if(this.userSearchString.length === 0){
      // this.userList.splice(0, this.userList.length);
      // this.allUsersList.forEach(el => this.userList.push(el))
      this.typeChange();
    }else{
      //isfiltriraj sta vec postoji u this.userList
      this.userList = this.userList.filter(user => 
        user.firstName.toLowerCase().includes(this.userSearchString.toLowerCase()) || user.lastName.toLowerCase().includes(this.userSearchString.toLowerCase())
      )
    }
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

  deleteUser(ev: Event){
    let button = ((ev.target as HTMLElement).parentElement?.parentElement as HTMLButtonElement)
    let userId = button.value;
    let userId_int: number = Number(userId);
    let listItemElement = button.parentElement?.parentElement?.parentElement?.parentElement;
    listItemElement?.classList.add("request-item-finished");
    this.listItems[this.allUsersList.indexOf(this.allUsersList.find((el) => el?.id === userId_int) as UserListItem)] = false;  

    setTimeout(() => this.store.dispatch(deleteUser({userId: userId_int})), environment.operator_dashboard.request_list_animation_duration * 1000); //zbog animacije
  }

}
