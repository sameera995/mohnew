import {EmployeeComponent} from "./employee/employee.component";
import {HomeComponent} from "./home/home.component";
import {RouterModule, Routes} from "@angular/router";
import {MainWindowComponent} from "./main-window/main-window.component";
import {NgModule} from "@angular/core";
import {AreaComponent} from "./area/area.component";
import {ClinicComponent} from "./clinic/clinic.component";
import {ClinicAllocationComponent} from "./clinic/clinic-allocation/clinic-allocation.component";
import {PersonComponent} from "./person/person.component";
import {ClinicCreationComponent} from "./clinic/clinic-creation/clinic-creation.component";
import {UserComponent} from "./user/user.component";
import {CampaignComponent} from "./campaign/campaign.component";
import {CampaignCreationComponent} from "./campaign/campaign-creation/campaign-creation.component";
import {CampaignAllocationComponent} from "./campaign/campaign-allocation/campaign-allocation.component";
import {LoginComponent} from "./auth/login/login.component";
import {MainComponent} from "./main/main.component";
import {MothersClinicComponent} from "./clinic/mothers-clinic/mothers-clinic.component";
import {ReportComponent} from "./report/report.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'main', component: MainComponent, children: [
      {path: '', component: MainWindowComponent},
      {path: 'employee', component: EmployeeComponent},
      {path: 'area', component: AreaComponent},
      {path: 'babyclinic', component: ClinicComponent},
      {path: 'clinicalloc', component: ClinicAllocationComponent},
      {path: 'cliniccr', component: ClinicCreationComponent},
      {path: 'person', component: PersonComponent},
      {path: 'user', component: UserComponent},
      {path: 'campaign', component: CampaignComponent},
      {path: 'campaigncr', component: CampaignCreationComponent},
      {path: 'campaignalloc', component: CampaignAllocationComponent},
      {path: 'mothersclinic', component: MothersClinicComponent},
      {path: 'report', component: ReportComponent},
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}

