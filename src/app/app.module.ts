import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import {StoreDevtoolsModule} from "@ngrx/store-devtools"

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';

import { AccountIconComponent } from './components/account-icon/account-icon.component';
import { appReducer } from './store/app/app.reducer';
import { AppState } from './store/app.state';
import { sidenavItemsReducer } from './store/sidenav/sidenav.reducer';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { AccountInfoCardComponent } from './components/account-info-card/account-info-card.component';
import { userReducer } from './store/user/user.reducer';
import { UserEffects } from './store/user/user.effects';
import { UploadPictureDialogComponent } from './components/upload-picture-dialog/upload-picture-dialog.component';
import { SidenavEffects } from './store/sidenav/sidenav.effects';
import { FooterComponentComponent } from './components/footer-component/footer-component.component';
import { AppEffects } from './store/app/app.effects';
import { SeekHelpComponent } from './components/seek-help/seek-help.component';
import { OperatorDashboardComponent } from './components/operator-dashboard/operator-dashboard.component';
import { helpCallRequestsReducer } from './store/operator-dashboard/operator-dashboard.reducer';
import { OperatorEffects } from './store/operator-dashboard/operator-dashboard.effects';
import { TherapistComponent } from './components/therapist/therapist.component';
import { therapistReducer } from './store/therapist/therapist.reducer';
import { TherapistEffects } from './store/therapist/therapist.effects';
//import { RegisterComponent } from './components/register/register.component';
//import { HomePageComponent } from './components/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountIconComponent,
    LoginCardComponent,
    AccountInfoCardComponent,
    routingComponents,
    UploadPictureDialogComponent,
    FooterComponentComponent,
    SeekHelpComponent,
    OperatorDashboardComponent,
    TherapistComponent,
  ],
  entryComponents:[UploadPictureDialogComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot<AppState>({
      appInfo: appReducer,
      sidenavInfo: sidenavItemsReducer,
      userInfo: userReducer,
      helpCallRequestList: helpCallRequestsReducer,
      therapistsPatientList: therapistReducer,
    }),
    EffectsModule.forRoot([UserEffects, SidenavEffects, AppEffects, OperatorEffects, TherapistEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 20, 
      autoPause: true
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTabsModule,
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
