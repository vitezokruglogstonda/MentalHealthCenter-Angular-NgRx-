import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { OperatorDashboardComponent } from './components/operator-dashboard/operator-dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { TherapistComponent } from './components/therapist/therapist.component';

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "operator-dashboard",
    component: OperatorDashboardComponent
  },
  {
    path: "therapist",
    component: TherapistComponent
  }
];

export const routingComponents = [HomePageComponent, RegisterComponent, OperatorDashboardComponent, TherapistComponent];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
