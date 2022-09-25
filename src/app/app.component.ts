import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import {FormControl} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { selectSidenavInfo } from './store/sidenav/sidenav.selector';
import { CardType, LoginStatus } from './models/app-info';
import { Router } from '@angular/router';
import { selectLoginStatus } from './store/app/app.selector';
import { SidenavListItem } from './models/sidenav-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = environment.app_title;
  public toolbarCenterText = environment.toolbar_center_text;
  public menuButtonTooltipText = environment.toolbar_menu_button_tooltip_text;
  public showDelay = new FormControl(environment.toolbar_menu_button_tooltip_show_delay);
  //public sidenavItems: Array<String>;
  public sidenavItems: SidenavListItem[];
  public showCard_LogIn: boolean = false;
  public showCard_AccountInfo: boolean = false;
  public onlineStatus: LoginStatus;

  constructor(private store: Store<AppState>, private router: Router){
    this.sidenavItems = [];
    this.onlineStatus = LoginStatus.Offline;
  }

  ngOnInit(): void{

    this.store.select(selectSidenavInfo).subscribe((state) => {
      // state.itemsList.forEach((el: String)=>{        
      //   this.sidenavItems.push(el);
      // })
      state.itemsList.forEach((el: SidenavListItem)=>{        
        this.sidenavItems.push(el);
      })
    });
    
    this.store.select(selectLoginStatus).subscribe((state)=>{
      if(this.onlineStatus !== state){
        this.onlineStatus = state;
        this.router.navigate([""]);
      }
    });

  }

  updateCardComponent(ev: [boolean, CardType]){
    //console.log("EVENT: ", ev);
    if(!ev[0]){
      this.showCard_LogIn=false;
      this.showCard_AccountInfo=false;
    }
    else if(ev[1] === CardType.LogIn){
      this.showCard_LogIn=true;
      this.showCard_AccountInfo=false;
    }
    else{
      this.showCard_LogIn=false;
      this.showCard_AccountInfo=true;
    }
  }


}
