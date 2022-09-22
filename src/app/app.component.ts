import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import {FormControl} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { selectSidenavInfo } from './store/sidenav/sidenav.selector';
import { CardType } from './models/app-info';

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
  public sidenavItems: Array<String>;
  public showCard_LogIn: boolean = false;
  public showCard_AccountInfo: boolean = false;
  public showCard: [boolean, CardType] = [false, CardType.LogIn];

  constructor(private store: Store<AppState>){
    this.sidenavItems = [];
  }

  ngOnInit(): void{
    this.store.select(selectSidenavInfo).subscribe((state) => {
      state.itemsList.forEach((el:String)=>{
        this.sidenavItems.push(el);
      })
    });
  }

  updateCardComponent(ev: [boolean, CardType]){
    console.log("EVENT: ", ev);
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
