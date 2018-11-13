import {EmployeeComponent} from "./employee/employee.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {RouterModule, Routes} from "@angular/router";
import {MainWindowComponent} from "./main-window/main-window.component";
import {NgModule} from "@angular/core";
import {AreaComponent} from "./area/area.component";
import {ClinicComponent} from "./clinic/clinic.component";
import {AuthGuard} from "./guards/auth.guard";
import {ClinicAllocationComponent} from "./clinic/clinic-allocation/clinic-allocation.component";
import {PersonComponent} from "./person/person.component";
import {ClinicCreationComponent} from "./clinic/clinic-creation/clinic-creation.component";
import {UserComponent} from "./user/user.component";
import {CampaignComponent} from "./campaign/campaign.component";
import {CampaignCreationComponent} from "./campaign/campaign-creation/campaign-creation.component";
import {CampaignAllocationComponent} from "./campaign/campaign-allocation/campaign-allocation.component";

const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'main', component:MainWindowComponent, canActivate: [AuthGuard]},
  {path:'employee', component:EmployeeComponent},
  {path:'area', component:AreaComponent},
  {path:'clinic', component:ClinicComponent},
  {path:'clinicalloc', component:ClinicAllocationComponent},
  {path:'cliniccr', component:ClinicCreationComponent},
  {path:'person', component:PersonComponent},
  {path:'user',component:UserComponent},
  {path:'campaign',component:CampaignComponent},
  {path:'campaigncr',component:CampaignCreationComponent},
  {path:'campaignalloc',component:CampaignAllocationComponent}
];

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes),
],
  exports:[
    RouterModule
  ]
})

export class AppRoutingModule{

}

