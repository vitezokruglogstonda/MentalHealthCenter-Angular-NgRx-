import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import {FormControl} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { selectSidenavInfo } from './store/sidenav/sidenav.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MentalHealthCenter';
  public toolbarCenterText = environment.toolbar_center_text;
  public menuButtonTooltipText = environment.toolbar_menu_button_tooltip_text;
  public showDelay = new FormControl(environment.toolbar_menu_button_tooltip_show_delay);
  public sidenavItems: Array<String>;
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

}
